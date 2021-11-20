import AwesomeModal from "./modules/awesomeModal-main/AwesomeModal.js";

document.querySelector("button").addEventListener("click", () => {
  if (document.querySelector("#ageInDays") === null) {
    var birthYear = prompt("What year were you born... Good Friend?");
    while (isNaN(birthYear) || birthYear === "") {
      var birthYear = prompt(
        "What year were you born... Good Friend?",
        "Must enter an year"
      );
    }

    console.log(birthYear);

    if (document.querySelector("#ageInDays") === null) {
      if (isFinite(birthYear) && !(birthYear === null)) {
        var date = new Date();
        var ageInDays = (date.getFullYear() - birthYear) * 365;
        var result = document.createElement("h1");
        result.setAttribute("id", "ageInDays");
        var textAnswer = document.createTextNode(
          "You are " + ageInDays + " days old."
        );
        result.appendChild(textAnswer);
        document.getElementById("flex-box-result").appendChild(result);
      }
    }
  } else {
    alert("Reset the previous one!");
  }
});

document.querySelectorAll("button")[1].addEventListener("click", () => {
  document.getElementById("ageInDays").remove();
});

document.querySelector("#generate-cat-button").addEventListener("click", () => {
  document.querySelector("#generate-cat-button").innerText = "Generating...";

  fetch("https://api.thecatapi.com/v1/images/search")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("cat-image").setAttribute("src", data[0].url);
      document.querySelector("#cat-image").style.visibility = "visible";
      document.querySelector("#cat-image").addEventListener("load", (e) => {
        document.querySelector("#generate-cat-button").innerText =
          "Generate Another Cat";
      });
    });
});

//rock paper scissors/////////////////////////////////////////////////////////////////////////////

var rpsImages = document.querySelectorAll(".rps-img");
for (let i = 0; i < rpsImages.length; i++) {
  rpsImages[i].addEventListener("click", async (e) => {
    await blink(rpsImages[i]);
    var s = await removeRpsResult();
    console.log(s);
    const humanChoice = rpsImages[i].id;
    rpsGame(humanChoice);
  });
}

function blink(image) {
  return new Promise((resolve, reject) => {
    let rpsImage = document.getElementsByClassName("shadowBlue")[0];
    rpsImage.classList.remove("shadowBlue");
    image.className = "clicked";
    setTimeout(() => {
      rpsImage.classList.add("shadowBlue");
      image.classList.remove("clicked");
    }, 200);

    resolve("done");
  });
}

function rpsGame(humanChoice) {
  var botChoice = decideBotChoice();
  console.log(botChoice);
  var winner = decideWinner(botChoice, humanChoice);
  rpsFrontEnd(humanChoice, botChoice, winner);
}

function decideBotChoice() {
  var randomNumber = Math.floor(Math.random() * 3);

  return ["rock", "paper", "scissor"][randomNumber];
}

function decideWinner(botChoice, humanChoice) {
  var gatherBothChoices = {
    rock: { rock: 0.5, paper: 0, scissor: 1 },
    paper: { rock: 1, paper: 0.5, scissor: 0 },
    scissor: { rock: 0, paper: 1, scissor: 0.5 },
  };

  var decisionScore = gatherBothChoices[humanChoice][botChoice];
  var resultMessage = isWinner(decisionScore);
  console.log(resultMessage);

  return resultMessage;
}

function isWinner(decisionScore) {
  if (decisionScore === 1) {
    return "You Won!";
  } else if (decisionScore === 0.5) {
    return "Draw!";
  } else {
    return "You Lost!";
  }
}

function rpsFrontEnd(humanChoice, botChoice, winner) {
  showHumnChoice(humanChoice);
  showMessage(winner);
  showBotChoice(botChoice);
}

function showHumnChoice(humanChoice) {
  var humanChoiceImg = document.createElement("img");
  humanChoiceImg.classList.add("col-md-3", "rps-result");
  humanChoiceImg.setAttribute("src", "assets/img/" + humanChoice + ".png");
  document.querySelector(".rps-final-decision").appendChild(humanChoiceImg);
}

function showBotChoice(botChoice) {
  var botChoiceImg = document.createElement("img");
  botChoiceImg.classList.add("col-md-3", "rps-result");
  botChoiceImg.setAttribute("src", "assets/img/" + botChoice + ".png");
  document.querySelector(".rps-final-decision").appendChild(botChoiceImg);
}

function showMessage(winner) {
  let showResult = document.createElement("div");
  if (winner === "Draw!") {
    showResult.innerHTML = "<h2>" + winner + "</h2>";
  } else {
    showResult.innerHTML = "<h2>&larr;" + winner + "</h2>";
  }
  showResult.classList.add("col-md-3", "rps-result", "result-message");
  document.querySelector(".rps-final-decision").appendChild(showResult);
}

function removeRpsResult() {
  return new Promise((resolve, reject) => {
    let rpsImages = document.getElementsByClassName("rps-result");
    console.log(rpsImages.length + "length");
    let rpsImagesAmount = rpsImages.length;
    for (let i = 0; i < rpsImagesAmount; i++) {
      rpsImages[0].remove();
      console.log(i);
    }

    resolve("done");
  });
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
  if (colorChangeOption.value === "red") {
    changeToRed();
  } else if (colorChangeOption.value === "green") {
    changeToGreen();
  } else if (colorChangeOption.value === "random") {
    changeToRandom();
  }
  if (colorChangeOption.value === "reset") {
    changeToReset();
  }
});
/**
//make random selection to trigger "changeToRandom()" function on click//
document.querySelector("#random").addEventListener('change', () => {
    console.log("");
    changeToRandom();
}); */

function originalColors() {
  var storeOriginalColors = [];
  for (let index = 0; index < buttonsToChangeColor.length; index++) {
    let colorClass = buttonsToChangeColor[index].classList;
    storeOriginalColors.push(colorClass[1]);
  }
  return storeOriginalColors;
}

function changeToRed() {
  for (let index = 0; index < buttonsToChangeColor.length; index++) {
    let colorClass = buttonsToChangeColor[index].classList;
    colorClass.remove(colorClass[1]);
    colorClass.add("btn-danger");
  }
}

function changeToGreen() {
  for (let index = 0; index < buttonsToChangeColor.length; index++) {
    let colorClass = buttonsToChangeColor[index].classList;
    colorClass.remove(colorClass[1]);
    colorClass.add("btn-success");
  }
}

async function changeToReset() {
  for (let index = 0; index < buttonsToChangeColor.length; index++) {
    let colorClass = buttonsToChangeColor[index].classList;
    colorClass.remove(colorClass[1]);
    colorClass.add(originalColor[index]);
  }
}

function changeToRandom() {
  for (let index = 0; index < buttonsToChangeColor.length; index++) {
    let colorClass = buttonsToChangeColor[index].classList;
    colorClass.remove(colorClass[1]);
    colorClass.add(randomColor());
  }
}

function randomColor() {
  let randomNumber = Math.floor(Math.random() * 4);

  if (randomNumber === 0) {
    return "btn-danger";
  } else if (randomNumber === 1) {
    return "btn-success";
  } else if (randomNumber === 2) {
    return "btn-warning";
  } else if (randomNumber === 3) {
    return "btn-primary";
  } else {
    console.error("Error: No random color is generated!");
  }
}

//=================================Blackjack Starts======================================//

var blackJackGame = {
  you: { scoreSpan: "#your-blackjack-result", div: "#your-box", score: 0 },
  dealer: {
    scoreSpan: "#dealer-blackjack-result",
    div: "#dealer-box",
    score: 0,
  },
  card: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "A", "K", "Q", "J"],
  cardValue: {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    A: [1, 11],
    K: 10,
    Q: 10,
    J: 10,
  },
};

const you = blackJackGame.you;
const dealer = blackJackGame.dealer;

var hitButton = document.querySelector(".btn-hit");
hitButton.addEventListener("click", blackJackHit); //addEventListener doesn't want a function call, it just want a function name and then eventListener call to that function automatically

document.querySelector(".btn-deal").addEventListener("click", blackJackDeal);
var standButton = document.querySelector(".btn-stand");
standButton.addEventListener("click", blackJackStand);

//disable hit-button if you are busted////////////
var scoreResults = document.querySelectorAll(".flex-blackjack-row-1 h3");
var scores = document.querySelectorAll(".flex-blackjack-row-1 span");

var closeWarningModal = document.querySelector(".warningModal button");
closeWarningModal.addEventListener("click", () => {
  warningModal.close();
});

const config = { childList: true };

const bustedMessage = document.createElement("h2");
bustedMessage.textContent = "BUSTED!";

const busted = function (mutationList, observer) {
  for (let index = 0; index < scoreResults.length; index++) {
    if (parseInt(scores[index].textContent) > 21) {
      scoreResults[index].before(bustedMessage);
      hitButton.setAttribute("disabled", "true"); //if the given value is 'false' it doesn't matter. Because if we add an attribute which gives boolean values, its default value will be set to 'true', we can not change it. But we have to give some value to this attribute otherwise erros will be generated becase setAtrribute method needs two arguments.
      standButton.setAttribute("disabled", "true");

      if (scores[index].id === "your-blackjack-result") {
        document.querySelector("#blackjack-result").textContent = "You Lost!";
        playLostSound();
      } else if (scores[index].id === "dealer-blackjack-result") {
        document.querySelector("#blackjack-result").textContent = "You Won!";
        playWinSound();
      }
    }
  }
};

const observer = new MutationObserver(busted);
scores.forEach((score) => {
  observer.observe(score, config);
});
///////////////////////////////////////////////////

function blackJackDeal() {
  updateBJTable();

  let cardImages = document
    .querySelector(".flex-blackjack-row-1")
    .querySelectorAll("img"); //getElementsBy and querySelectorAll methods output HTMlCollection and NodeList respectively. Those are collections of nodes, not arrays (look like arrays though). And those are live (except the NodeList which is given by querySelectorAll, but other NodeLists are live. Eg -: document.getElementsByName). That means if we remove or add some elements to / from a HTMLCollection or NodeList, they will be updated automatically by themselves.

  //Defferece Between HTMlCollection and NodeList
  /**HTMLCollection gives us id of the element as a reference to that element while NodeList doesn't.*/

  //console.log(cardImages)
  let cardImagesArray = Array.from(cardImages); //Since lists of nodes (HTMLCollection, NodeList) doesn't support for "forEach" loop and "map" method using this line we are converting cardImage list (of nodes) into an array of elements. An array of html elements is not live while it looks like a NodeList. Or we can just use for loop instead of map. but map is easy no?
  //console.log(cardImagesArray)
  let mapOututArray = cardImagesArray.map((cardImage) => cardImage.remove());
  //console.log(mapOututArray) // map method always outpus a new array of return values of parameter function. In this case since we reomve elements map method outputs an array of undefined elements.

  let scores = document
    .querySelector(".flex-blackjack-row-1")
    .querySelectorAll("span");
  scores.forEach((score) => {
    score.textContent = 0;
  });
  you.score = 0;
  dealer.score = 0;

  cardNo = 0; //has defined at the begining of showCard() and has used in it

  //hitButton.setAttribute('disabled', 'false'); // This is not working because these attributes are giving boolean values. And they can not be updated. So we have to remove them when we don't want them, which is done in the following line.
  hitButton.removeAttribute("disabled");
  standButton.removeAttribute("disabled");

  //remove the busted message
  bustedMessage.remove();

  document.querySelector("#blackjack-result").textContent = "Let's Play";
}

async function blackJackHit() {
  await playHitSound();
  await showCard(you);
}
var dealerScoreGlobal;
var warningModal;
async function blackJackStand() {
  let isNotHitPressed =
    document.querySelector("#your-blackjack-result").textContent === "0";

  if (isNotHitPressed) {
    warningModal = new AwesomeModal(".warningModal");
    warningModal.open();

    document.querySelector(".warningModal").removeAttribute("hidden");
  } else {
    hitButton.setAttribute("disabled", "true");

    dealerScoreGlobal = dealer.score;
    while (dealerScoreGlobal < 21) {
      await showCard(dealer);
    }

    winnerOnPoints();
  }
}

function winnerOnPoints() {
  let didYouWin = decideBJWinner();
  if (didYouWin) {
    document.querySelector("#blackjack-result").textContent = "You Won!";
    playWinSound();
  } else if (didYouWin === false) {
    document.querySelector("#blackjack-result").textContent = "You Lost!";
    playLostSound();
  } else {
    document.querySelector("#blackjack-result").textContent = "Draw!";
  }
}

var cardNo = 0;
async function showCard(player) {
  cardNo++;
  let card = randomCard();

  if (player === dealer) {
    let dealerScore = await predictValue(player, card);
    console.log(dealerScore);

    if (dealerScore <= 21) {
      await generateCard(card, cardNo, player);
      await showScore(card, player, cardNo);
    } else {
      dealerScoreGlobal = 21;
    }
  } else {
    await generateCard(card, cardNo, player);
    await showScore(card, player, cardNo);
  }
}

function generateCard(card, cardNo, player) {
  return new Promise(async (resolve) => {
    await playHitSound();
    let cardImage = document.createElement("img");
    cardImage.setAttribute("class", "cardImage");
    cardImage.setAttribute("id", `img${cardNo}`);
    cardImage.style.height = "100px";
    cardImage.style.weight = "100px";
    cardImage.style.padding = "0.5em";
    cardImage.src = `https://raw.githubusercontent.com/mastrmind-dev/Javascript-Small-Games-Collection/main/assets/blackjack_Images/${card}.png`;
    document.querySelector(player.div).appendChild(cardImage);
    setTimeout(() => {
      //to keep time gaps between showing two cards
    }, 500);
    resolve("done!");
  });
}

function predictValue(player, card) {
  return new Promise((resolve) => {
    let dealerScore;
    console.log(card);
    if (card === "A") {
      if (dealerScore <= 10) {
        dealerScore = player.score + 11;
      } else {
        dealerScore = player.score + 1;
      }
    } else {
      dealerScore = player.score + blackJackGame.cardValue[card];
    }
    resolve(dealerScore);
  });
}

function playHitSound() {
  return new Promise((resolve, reject) => {
    const hitSound = new Audio("./assets/sounds/swish.m4a");
    hitSound.play();

    resolve("done!");
  });
}

function playLostSound() {
  const lostSound = new Audio("./assets/sounds/aww.mp3");
  lostSound.play();
}

function playWinSound() {
  const winSound = new Audio("./assets/sounds/cash.mp3");
  winSound.play();
}

function randomCard() {
  let randomNumber = Math.floor(Math.random() * 13);
  return blackJackGame.card[randomNumber];
}

function showScore(card, player, cardNo) {
  return new Promise((resolve, reject) => {
    document
      .querySelector(`#img${cardNo}`)
      .addEventListener("load", async (e) => {
        if (card === "A") {
          let value = await selectValueForA(player);
          player.score += value;
          document.querySelector(player.scoreSpan).textContent = player.score;
          setTimeout(() => {
            resolve("done");
          }, 700);
        } else {
          player.score += blackJackGame.cardValue[card];
          document.querySelector(player.scoreSpan).textContent = player.score;
          setTimeout(() => {
            resolve("done");
          }, 700);
        }
      });
  });
}

function selectValueForA(player) {
  return new Promise((resolve, reject) => {
    if (player === dealer) {
      if (player.score <= 10) {
        resolve(blackJackGame.cardValue["A"][1]);
      } else {
        resolve(blackJackGame.cardValue["A"][0]);
      }
    } else {
      let myModal = new AwesomeModal(".awesomeModal");
      myModal.open();

      document.querySelector(".awesomeModal").removeAttribute("hidden");

      let firstButton = document.querySelectorAll(".awesomeModal button")[0];
      firstButton.addEventListener("click", () => {
        myModal.close();
        //resolve(firstButton.value);
        resolve(blackJackGame.cardValue["A"][0]);
      });
      let secondButton = document.querySelectorAll(".awesomeModal button")[1];
      secondButton.addEventListener("click", () => {
        myModal.close();
        //resolve(secondButton.value);
        resolve(blackJackGame.cardValue["A"][1]);
      });
    }
  });
}

function decideBJWinner() {
  var isYouWinner = null;
  if (
    (you.score <= 21 && you.score > dealer.score) ||
    (you.score <= 21 && dealer.score > 21)
  ) {
    isYouWinner = true;
  } else if (
    (you.score < dealer.score && dealer.score <= 21) ||
    (you.score > 21 && dealer.score <= 21)
  ) {
    isYouWinner = false;
  } else {
  }

  return isYouWinner;
}

function updateBJTable() {
  let didYouWin = decideBJWinner();

  if (didYouWin === true) {
    let winsCell = document.querySelector("#wins");
    let wins = parseInt(winsCell.textContent);
    wins += 1;

    winsCell.innerText = wins;
  } else if (didYouWin === false) {
    let lossesCell = document.querySelector("#losses");
    let losses = parseInt(lossesCell.textContent);
    losses += 1;

    lossesCell.innerText = losses;
  } else {
    let drawsCell = document.querySelector("#draws");
    let draws = parseInt(drawsCell.textContent);
    draws += 1;

    drawsCell.innerText = draws;
  }
}

// // document.addEventListener("DOMContentLoaded", () => {
// //     let myModal = new AwesomeModal('.awesomeModal');
// //     myModal.open();
// // });

//=================================Blackjack Ends======================================//
