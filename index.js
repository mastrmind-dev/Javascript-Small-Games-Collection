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

//rock paper scissors

var rpsImage = document.querySelectorAll(".flex-box-rps img");

getYourChoice();

function getYourChoice() {
    for (var i = 0; i < rpsImage.length; i++){
        rpsImage[i].addEventListener("click", (e) => {
            console.log(e.path[0].id);
            var yourChoice = e.path[0].id;
            rpsGame(yourChoice);
        })
    }
}

function rpsGame(yourChoice){
    botChoice = randomSelection();
    result = decideWinner(yourChoice, botChoice);
    rpsFrontEnd(yourChoice, botChoice, result);
}

function randomSelection(){
    randomNum = Math.floor((Math.random() + 1) * 3);
    console.log("random number - " + randomNum);

    switch (randomNum) {
        case 3:
            return "rock-img";
        case 4:
            return "paper-img";
        case 5:
            return "scissor-img";
        default:
            break;
    }
}


function decideWinner(yourChoice, botChoice){
    if(yourChoice === "rock-img" && botChoice === "paper-img" || yourChoice === "paper-img" && botChoice === "scissor-img" || yourChoice === "scissor-img" && botChoice === "rock-img"){
        return "You Lost!"
    } else if(yourChoice === "paper-img" && botChoice === "rock-img" || yourChoice === "rock-img" && botChoice === "scissor-img" || yourChoice === "scissor-img" && botChoice === "paper-img"){
        return "Yor Won!";
    } else{
        return "Tied!";
    }
}

function rpsFrontEnd(yourChoice, botChoice, result){
    console.log(result)
}