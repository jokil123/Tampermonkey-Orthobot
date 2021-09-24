console.log("b");

createButton();

function getSentence() {
  let spanList = document
    .getElementById("uebungsaufgabe")
    .getElementsByTagName("h2")[0]
    .getElementsByTagName("span");
  let satzZusammen = "";
  for (var item of spanList) {
    satzZusammen += item.innerHTML + " ";
  }
  satzZusammen += document
    .getElementById("uebungsaufgabe")
    .getElementsByTagName("h2")[0]
    .lastChild.nodeValue.trim();
  return satzZusammen;
}

function writeSentence(sentence) {
  let arrWörter = sentence.split(" ");
  console.log(arrWörter);
  let sentenceTag = document
    .getElementById("uebungsaufgabe")
    .getElementsByTagName("h2")[0];
  let spanList = sentenceTag.getElementsByTagName("span");
  let index = 0;

  for (let word of arrWörter) {
    console.log(spanList[index]);
    if (word != arrWörter[arrWörter.length - 1]) {
      spanList[index].innerHTML = word;
    }
    console.log(word);

    //let wordspan = document.createElement("span");
    //wordspan.className = "kommasetzung";
    //wordspan.innerHTML = word;
    //sentenceTag.appendChild(wordspan);
    //sentenceTag.append(" ");
    index++;
  }
}

function closePopups() {
  setInterval(() => {
    const closeBtns = document.getElementsByClassName("close");

    for (let btn of closeBtns) {
      btn.click();
    }
  }, 100);
}

function createButton() {
  var button2 = document.createElement("button");
  var buttonBar = document.getElementById("loesung").parentElement;
  console.log(document.getElementById("loesung").parentElement);
  button2.className = "btn btn-primary";
  buttonBar.appendChild(button2);
  button2.innerHTML = "Von Duden ausfüllen lassen!";
  button2.onclick = DoStuff;
}
