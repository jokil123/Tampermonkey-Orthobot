function DoStuff(){
    console.log("STARTING JOB!");
    CorrectSentence(getSentence());
}


function CorrectSentence(sentence)
{
    RequestSentenceErrors(sentence, ParseResponse);
}


function CorrectionComplete(correctedSentence)
{
    console.log(correctedSentence);
    writeSentence(correctedSentence);

    finalSentence = ""

    console.log("JOB DONE!");
}


var finalSentence;

function ParseResponse(response, originalSentence)
{
    responesJSON = JSON.parse(response);

    console.log(responesJSON);

    sentenceErrors = FindNotableErrors(responesJSON);

    if (sentenceErrors.length > 0)
    {
        finalSentence = CorrectErrors(originalSentence, sentenceErrors);
        console.log(finalSentence);
        RequestSentenceErrors(finalSentence, ParseResponse);
    }
    else
    {
        CorrectionComplete(finalSentence);
    }
}


function FindNotableErrors(json)
{
    totalErrors = json.data.spellAdvices;

    sentenceErrors = [];

    totalErrors.forEach(item => {
        if (errorCodeIndicies.includes(parseInt(item.errorCode))){
            sentenceErrors.push(item);
        }
    });

    return sentenceErrors;
}



// Correct Errors

function CorrectErrors(sentence, sentenceErrors)
{
    var indexShift = 0;
    sentenceErrors.forEach(item => {
        sentence = ReplaceAtIndex(parseInt(item.offset) + indexShift, sentence, item.originalError, item.proposals[0])

        indexShift += parseInt(item.proposals[0].length) - parseInt(item.originalError.length);
    });

    return sentence;
}


function ReplaceAtIndex(index, string, mask, replaceWith) {

    return string.substring(0, index) + replaceWith + string.substring(index + mask.length);
}



// Request

function RequestSentenceErrors(testString, callback)
{
    var xhr = new XMLHttpRequest();
    var url = "https://mentor.duden.de/api/grammarcheck?_format=json";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(xhr.responseText, testString);
        }
    };


    requestData = GenerateRequestData(testString);
    xhr.send(requestData);
}


function GenerateRequestData(testString)
{
    var data = {
        "text": testString,
        "userInteraction": null,
        "documentID": "lite-1616792167663-fhTklcjkox",
        "maxProposals": 7
    }

    return JSON.stringify(data);
}