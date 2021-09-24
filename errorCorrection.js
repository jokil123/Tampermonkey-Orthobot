console.log("a");

//const axios = require("axios");

function DoStuff() {
  console.log("STARTING JOB!");
  console.log(RequestSentenceErrors("a"), "asdbv");
  CorrectSentence(getSentence());
}

function CorrectSentence(sentence) {
  let correctedSentence = sentence;

  let errorsToCorrect;

  do {
    axios
      .post(
        "https://mentor.duden.de/api/grammarcheck?_format=json",
        GenerateRequestData(correctedSentence)
      )
      .then((res) => {
        errorsToCorrect = FindNotableErrors(res.data);
        correctedSentence = CorrectErrors(correctedSentence, errorsToCorrect);
      });
  } while (errorsToCorrect.length != 0);
}

function FindNotableErrors(json) {
  totalErrors = json.data.spellAdvices;

  sentenceErrors = [];

  totalErrors.forEach((item) => {
    if (errorCodeIndicies.includes(parseInt(item.errorCode))) {
      sentenceErrors.push(item);
    }
  });

  return sentenceErrors;
}

// Correct Errors

function CorrectErrors(sentence, sentenceErrors) {
  var indexShift = 0;
  sentenceErrors.forEach((item) => {
    sentence = ReplaceAtIndex(
      parseInt(item.offset) + indexShift,
      sentence,
      item.originalError,
      item.proposals[0]
    );

    indexShift +=
      parseInt(item.proposals[0].length) - parseInt(item.originalError.length);
  });

  return sentence;
}

function ReplaceAtIndex(index, string, mask, replaceWith) {
  return (
    string.substring(0, index) +
    replaceWith +
    string.substring(index + mask.length)
  );
}

// Request

async function RequestSentenceErrors(testString) {}

function GenerateRequestData(testString) {
  var data = {
    text: testString,
    userInteraction: null,
    documentID: "lite-1616792167663-fhTklcjkox",
    maxProposals: 7,
  };

  return data;
}
