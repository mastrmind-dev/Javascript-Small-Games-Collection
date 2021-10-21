document.querySelector("button").addEventListener("click", () => {
    if (document.querySelector("#ageInDays") === null) {
        var birthYear = prompt("What year were you born... Good Friend?");
        while (isNaN(birthYear) || birthYear === '') {
            var birthYear = prompt("What year were you born... Good Friend?", "Must enter an year");
        };

        console.log(birthYear);

        if (document.querySelector("#ageInDays") === null) {
            if (isFinite(birthYear) && !(birthYear === null)) {
                var date = new Date();
                var ageInDays = (date.getFullYear() - birthYear) * 365;
                var result = document.createElement('h1');
                result.setAttribute("id", "ageInDays");
                var textAnswer = document.createTextNode("You are " + ageInDays + " days old.");
                result.appendChild(textAnswer);
                document.getElementById("flex-box-result").appendChild(result);
            }
        }

    } else {
        alert("Reset the previous one!");
    }


});

document.querySelectorAll('button')[1].addEventListener('click', () => {
    document.getElementById('ageInDays').remove();
});

document.querySelector("#generate-cat-button").addEventListener('click', () => {

    document.querySelector("#generate-cat-button").innerText = "Generating..."

    fetch("https://api.thecatapi.com/v1/images/search").then(response => (response.json())).then(data => {
        document.getElementById("cat-image").setAttribute("src", data[0].url);
        document.querySelector("#cat-image").style.visibility = "visible";
        document.querySelector("#cat-image").addEventListener("load", (e) => {
            if (e.returnValue === true) {
                document.querySelector("#generate-cat-button").innerText = "Generate Another Cat";
            }
        });

    });

})

//rock paper scissors/////////////////////////////////////////////////////////////////////////////

var rpsImages = document.querySelectorAll(".rps-img");
for(let i = 0; i < rpsImages.length; i++){
    rpsImages[i].addEventListener('click', async (e) => {
        await blink(rpsImages[i]);
        var s = await removeRpsResult();
        console.log(s);
        const humanChoice = rpsImages[i].id;
        rpsGame(humanChoice);
    })
}

function blink(image) {
    return new Promise((resolve, reject) => {
        let rpsImage = document.getElementsByClassName('shadowBlue')[0];
        rpsImage.classList.remove("shadowBlue");
        image.className = "clicked";
        setTimeout(() => {
            rpsImage.classList.add("shadowBlue");
            image.classList.remove("clicked");
        }, 200);
        
        resolve ("done");
    })
}

function rpsGame(humanChoice){
    var botChoice = decideBotChoice();
    console.log(botChoice);
    var winner = decideWinner(botChoice, humanChoice);
    rpsFrontEnd(humanChoice, botChoice, winner);
}

function decideBotChoice(){
    var randomNumber = Math.floor(Math.random() * 3);
    
    return ['rock', 'paper', 'scissor'][randomNumber];
}

function decideWinner(botChoice, humanChoice){
    var gatherBothChoices = {
        "rock" : {"rock" : .5, "paper" : 0, "scissor" : 1},
        "paper" : {"rock" : 1, "paper" : .5, "scissor" : 0},
        "scissor" : {"rock" : 0, "paper" : 1, "scissor" : .5}
    }

    var decisionScore = gatherBothChoices[humanChoice][botChoice];
    var resultMessage = isWinner(decisionScore);
    console.log(resultMessage);

    return resultMessage;
}

function isWinner(decisionScore){
    if(decisionScore === 1){
        return "You Won!";
    } else if(decisionScore === .5){
        return "Draw!";
    } else{
        return "You Lost!";
    }
}

function rpsFrontEnd(humanChoice, botChoice, winner){
    showHumnChoice(humanChoice);
    showMessage(winner);
    showBotChoice(botChoice);
}

function showHumnChoice(humanChoice){
    var humanChoiceImg = document.createElement('img');
    humanChoiceImg.classList.add("col-md-3", "rps-result");
    humanChoiceImg.setAttribute('src', 'img/' + humanChoice + ".png");
    document.querySelector(".rps-final-decision").appendChild(humanChoiceImg);
}

function showBotChoice(botChoice) {
    var botChoiceImg = document.createElement('img');
    botChoiceImg.classList.add("col-md-3", "rps-result");
    botChoiceImg.setAttribute('src', 'img/' + botChoice + ".png");
    document.querySelector(".rps-final-decision").appendChild(botChoiceImg);
}

function showMessage(winner){
    let showResult = document.createElement('div');
    if(winner === "Draw!"){
    showResult.innerHTML = "<h2>" + winner +"</h2>"
    } else{
    showResult.innerHTML = "<h2>&larr;" + winner +"</h2>"
    }
    showResult.classList.add("col-md-3", "rps-result", "result-message");
    document.querySelector(".rps-final-decision").appendChild(showResult);   
}

function removeRpsResult() {
    return new Promise((resolve, reject) => {
        let rpsImages = document.getElementsByClassName("rps-result");
        console.log(rpsImages.length + "length")
        let rpsImagesAmount = rpsImages.length;
        for(let i = 0; i < rpsImagesAmount; i++){
            rpsImages[0].remove();
            console.log(i)
        }

        resolve("done");
    })
}

//Change the button color challenge///////////////////////////////////////////////////////////////////////////////////////////////////

//get the button list//
var buttonsToChangeColor = document.querySelectorAll("button");

//get the selected value of "id = background" dropdown list//
var colorChangeOption = document.querySelector("#background");

//store current colors of button to restore them later//
const originalColor = originalColors();

//Change the colors of button//
colorChangeOption.addEventListener("change", () => {
    if(colorChangeOption.value === "red"){
        changeToRed();
    }else if(colorChangeOption.value === "green"){
        changeToGreen();
    }else if(colorChangeOption.value === "random"){
        changeToRandom();
    }if(colorChangeOption.value === "reset"){
        changeToReset();
    }
});
/**
//make random selection to trigger "changeToRandom()" function on click//
document.querySelector("#random").addEventListener('change', () => {
    console.log("");
    changeToRandom();
}); */

function originalColors(){
        var storeOriginalColors = [];
        for (let index = 0; index < buttonsToChangeColor.length; index++) {
            let colorClass = buttonsToChangeColor[index].classList;
            storeOriginalColors.push(colorClass[1]);
    }
    return storeOriginalColors;
}

function changeToRed(){
    for (let index = 0; index < buttonsToChangeColor.length; index++) {
        let colorClass = buttonsToChangeColor[index].classList;
        colorClass.remove(colorClass[1]);
        colorClass.add("btn-danger");
    }
}

function changeToGreen(){
    for (let index = 0; index < buttonsToChangeColor.length; index++) {
        let colorClass = buttonsToChangeColor[index].classList;
        colorClass.remove(colorClass[1]);
        colorClass.add("btn-success");
    }
}

async function changeToReset(){
    for (let index = 0; index < buttonsToChangeColor.length; index++) {
        let colorClass = buttonsToChangeColor[index].classList;
        colorClass.remove(colorClass[1]);
        colorClass.add(originalColor[index]);
    }
}

function changeToRandom(){
    for (let index = 0; index < buttonsToChangeColor.length; index++) {
        let colorClass = buttonsToChangeColor[index].classList;
        colorClass.remove(colorClass[1]);
        colorClass.add(randomColor());
    }
}

function randomColor(){
    let randomNumber = Math.floor(Math.random() * 4);

    if (randomNumber === 0) {
        return "btn-danger";
    }
    else if (randomNumber === 1) {
        return "btn-success";
    }
    else if (randomNumber === 2) {
        return "btn-warning";
    }
    else if (randomNumber === 3) {
        return "btn-primary";
    } else{console.log("Error: No random color is generated!")}
}