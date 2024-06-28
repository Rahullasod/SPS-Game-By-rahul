// rules code and buttons

function rshow() {
  document.getElementById("rulesshow").style.display = "block";
}

function rhide() {
  document.getElementById("rulesshow").style.display = "none";
}
function congshow() {
  document.getElementById("congratssection").style.display = "flex";
  document.getElementById("resultidbox").style.display = "none";
  document.getElementById("choiceContainer").style.display = "none";
  document.getElementById("scorecont").style.display = "none";
}
function newgame() {
  document.getElementById("congratssection").style.display = "none";
  document.getElementById("nextbtn").style.display = "none";
  document.getElementById("choiceContainer").style.display = "flex";
  document.getElementById("scorecont").style.display = "flex";
}

// this is the main code
let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#wintxt");
const choiceContainer = document.querySelector("#choiceContainer");
const resultBox = document.querySelector("#resultidbox");
const playAgainButton = document.querySelector("#playagainbtn");
const nextButton = document.querySelector("#nextbtn");

const userScorePara = document.querySelector("#yourscorebox");
const compScorePara = document.querySelector("#compscorebox");
const userResult = document.querySelector("#userresult");
const compResult = document.querySelector("#compresult");
const tieHideElements = document.querySelectorAll(".tiehide");

const genCompChoice = () => {
  const options = [".stonebox", ".paperbox", ".scissorbox"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const drawGame = () => {
  msg.innerText = "TIE UP";
  choiceContainer.style.display = "none";
  resultBox.style.display = "flex";
  tieHideElements.forEach(element => element.style.display = "none");
  userResult.style.backgroundImage = "url('./Images/winner background.png')";
  userResult.style.backgroundPosition = "center";
  userResult.style.backgroundSize = "cover";
  compResult.style.backgroundImage = "url('./Images/winner background.png')";
  compResult.style.backgroundPosition = "center";
  compResult.style.backgroundSize = "cover";
  nextButton.style.display = "none"; 
};

const showWinner = (userWin, userChoice, compChoice) => {
  tieHideElements.forEach(element => element.style.display = "block");

  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `YOU WIN`;
    userResult.style.backgroundImage = "url('./Images/winner background.png')";
    userResult.style.backgroundPosition = "center";
    userResult.style.backgroundSize = "cover";
    nextButton.style.display = "block"; 
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `YOU LOST`;
    compResult.style.backgroundImage = "url('./Images/winner background.png')";
    compResult.style.backgroundPosition = "center";
    compResult.style.backgroundSize = "cover";
    nextButton.style.display = "none"; 
  }
  
  choiceContainer.style.display = "none";
  resultBox.style.display = "flex";
};

const updateResults = (userChoice, compChoice) => {
  userResult.innerHTML = '';
  compResult.innerHTML = '';
  
  const userChoiceElement = document.querySelector(userChoice).cloneNode(true);
  const compChoiceElement = document.querySelector(compChoice).cloneNode(true);
  
  userResult.appendChild(userChoiceElement);
  compResult.appendChild(compChoiceElement);
};

const playGame = (userChoice) => {
  
  const compChoice = genCompChoice();

  updateResults(userChoice, compChoice);

  if (userChoice === compChoice) {
   
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === ".stonebox") {
      
      userWin = compChoice === ".paperbox" ? false : true;
    } else if (userChoice === ".paperbox") {
      
      userWin = compChoice === ".scissorbox" ? false : true;
    } else {
      
      userWin = compChoice === ".stonebox" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = "." + choice.classList[1];
    playGame(userChoice);
  });
});

playAgainButton.addEventListener("click", () => {
  
  choiceContainer.style.display = "flex";
  resultBox.style.display = "none";
  msg.innerText = "";
  userResult.innerHTML = '';
  compResult.innerHTML = '';
  tieHideElements.forEach(element => element.style.display = "block");

  
  userResult.style.backgroundImage = "";
  compResult.style.backgroundImage = "";
  nextButton.style.display = "none"; 
});

