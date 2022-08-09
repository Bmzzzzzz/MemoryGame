
let ipchaCard = [];
let idxflipcard = 0, counterId = 0, firstCard = 0, scoreName1 = 0, scoreName2 = 0;
let name1 = "", name2 = "", numOfCrad = 0, currentName = "monky", element = "", idxPlay = 0;
const card =[];
const container = document.getElementById("container");
const sounds = [
    "./sounds/pop.wav",
    "./sounds/swoosh.wav",
    "./sounds/entry.wav",
    "./sounds/sparkle.wav",
    "./sounds/bloop.wav",
    "./sounds/select-click.wav",
    "./sounds/back-click.wav",
    "./sounds/place-sym.wav",
    "./sounds/win.wav",
];

function playSound(soundInd) {
    const audio = new Audio(sounds[soundInd]);
    audio.play();
}

function genreatedArray(gen) {
    // let gen = 12;
    zora = 0xDD25;
    zora1 = 0xD83E;

    for (i = gen; i > 0; i--) {

        card.push(String.fromCharCode(zora1, zora))
        card.push(String.fromCharCode(zora1, zora))
        zora++;

    }
   
}


function closePopUp() {
    document.getElementById("popup").className = "closepop";
}

function functionrestart() {
    closePopUp();
    location.reload();
}


function openPopUp(winner) {
    const popup = document.getElementById("closepopup");
    const textpopup = document.createElement("div");
    textpopup.innerHTML += "The winner is......" + winner;
    textpopup.className = "textpopup";
    popup.appendChild(textpopup);
    popup.className = "openpop";
    playSound(8);
}

function flipCrad() {

    if (element.id !== this.id || idxflipcard<2) {//bolck type imself
        if (idxflipcard <= 1 ) {
            this.className = 'front'
            playSound(1);
            ipchaCard[idxflipcard] = this.innerText;
            idxflipcard++;
           
            if (idxflipcard > 1 ) {
                if (ipchaCard[1] === ipchaCard[0]) {
                    playSound(2);
                    this.removeEventListener('click', flipCrad);
                    element.removeEventListener('click', flipCrad)
                    idxflipcard = 0;
                    if (currentName === name1) {
                        scoreName1++;
                        buttonopenpage.innerHTML = name2 + ": " + scoreName2 + " " + name1 + ": " + scoreName1
                    } else {
                        scoreName2++;
                        buttonopenpage.innerHTML = name2 + ": " + scoreName2 + " " + name1 + ": " + scoreName1

                    }
                    idxPlay++;
                    console.log(idxPlay + numOfCrad);
                    if (idxPlay == numOfCrad) {
                        if (scoreName1 > scoreName2) {
                            openPopUp(name1)
                        }

                        else {
                            openPopUp(name2)
                        }
                    }
                }

                else {

                    setTimeout(() => {
                        
                        this.className = 'back';
                        element.className = 'back';
                        idxflipcard = 0
                        firstCard = 0;
                        element = ""
                    }, 200)
                    if (currentName === name1) {
                        currentName = name2;
                        console.log(currentName);
                        openpage.innerHTML = "Current player: " + currentName;
                    }
                    else {
                        currentName = name1;
                        console.log(currentName);
                        openpage.innerHTML = "Current player: " + currentName;
                    }
                }
                idxflipcard = 0
            } else {
                firstCard = this.id;
                element = document.getElementById(this.id)
                // console.log(firstCard);
            }





        }

    }
}





function createInputName() {
    const divInput1 = document.createElement("div")
    divInput1.className = "divInput1";
    divInput1.innerText = "Name 1"
    divInput1.id = "divInput1";
    const inputName1 = document.createElement("INPUT");
    inputName1.setAttribute("type", "text");
    inputName1.id = "inputName1";
    divInput1.appendChild(inputName1);
    openpage.appendChild(divInput1);



    const divInput2 = document.createElement("div")
    divInput2.className = "divInput2";
    divInput2.id = "divInput2";
    divInput2.innerText = "Name 2";
    const inputName2 = document.createElement("INPUT");
    inputName2.setAttribute("type", "text");
    inputName2.id = "inputName2";
    divInput2.appendChild(inputName2);
    openpage.appendChild(divInput2);

    const divCardNum = document.createElement("div")
    divCardNum.className = "divCardNum";
    divCardNum.id = "divCardNum";
    divCardNum.innerText = "number of card";
    const cardNum = document.createElement("INPUT");
    cardNum.setAttribute("type", "text");
    cardNum.id = "cardNum";
    divCardNum.appendChild(cardNum);
    openpage.appendChild(divCardNum);

    const buttonOpen = document.createElement("button");
    buttonOpen.id = "buttonOpen";
    buttonOpen.className = "buttonOpen";
    buttonOpen.innerText = "start game";
    buttonopenpage.appendChild(buttonOpen);


}




// openpage.removeChild(openpage);

function craeteCrad(idx) {

    const cardEl = document.createElement("div")
    cardEl.id = counterId++;
    cardEl.className = 'back';
    cardEl.innerText = idx
    cardEl.addEventListener('click', flipCrad)
    container.appendChild(cardEl);
}

function shuffle(arr) {
    arr = arr.sort((a, b) => 0.5 - Math.random());
    return arr;
}




function startgame(cardQty) {
    playSound(6);

    currentName = name1;
    openpage.innerHTML = "Current player: " + currentName;

    const divTable = document.createElement("div");
    divTable.id = "table";
    divTable.className = "table";
    divTable.innerHTML = name2 + ": " + scoreName2 + " " + name1 + ": " + scoreName1
    buttonopenpage.appendChild(divTable);

    genreatedArray(numOfCrad);

  shuffle(card);
    for (i of card) {
        craeteCrad(i)

    }
    
    shuffle(card);
    // console.log(card);
}


function functionstart() {

    name1 = document.getElementById("inputName1").value;
    name2 = document.getElementById("inputName2").value;
    numOfCrad = document.getElementById("cardNum").value;
    console.log(name1 + name2 + numOfCrad);
    //    openpage.removeChild(buttonOpen);
    if (numOfCrad > 0 && name1 != "" && name2 != "") {
        openpage.removeChild(divInput2)
        openpage.removeChild(divInput1)
        openpage.removeChild(divCardNum);
        buttonopenpage.removeChild(buttonOpen)
        error.innerText = "";
        startgame(numOfCrad)
    }

    else {
        error.innerText = "Please enter parmeter"
    }

}

createInputName();

