//for easier log while coding
const log = console.log;

//HashMap with <Move : beats>
const values = new Map();
values.set("rock", "scissors");
values.set("paper", "rock");
values.set("scissors", "paper");

let clicked = false;
let hover = 0;
let countdownTimer = 0;
const rotateVal = 0.7;
const whiteColor = "rgb(242, 239, 239)"; 
const backColor = "#123456";
const playerUIScore = document.querySelector("#player-score");
const computerUIScore = document.querySelector("#computer-score");
const playerImage = document.querySelector("#player-image");
const computerImage = document.querySelector("#computer-image");
const timerText = document.querySelector("#timer");

const buttons = document.querySelectorAll("button");
for(let button of buttons){
    button.addEventListener("click", () => {
        let move = button.value;
        countdown(move);
    });

    button.addEventListener("mouseenter", () => hoverButton(button));
    button.addEventListener("mouseleave", () => stopHoverButton(button));
    button.addEventListener("mousedown", () => buttonDown(button));
    button.addEventListener("mouseup", () => hoverButton(button));
}
const second = 1000;
let humanScore = 0;
let computerScore = 0;
let rounds = 5;
const countdownTime = second * 3;

function playGame(){
    for(let i = 0; i < rounds; i++){
        log("Round: " + (i + 1));
        playRound(input);
    }
    logResult();
}

function countdown(move){
    updateImage(move, "player");
    clicked = true;
    setTimeout(() => playRound(move), countdownTime);
    let val = countdownTime / second;
    timerText.textContent = val;
    countdownTimer = setInterval(updateCountdownText, second);
}

async function playRound(input){
    let player = input;
    let computer = getComputerChoice();
    updateImage(computer);
    if(player === computer){
        log("draw");
    }
    else if(values.get(player) === computer){
        log("You Win :) " + player + " beats " + computer);
        updatePlayerScore();
    } 
    else{
        log("You Lose :( " + computer + " beats " + player);
        updateComputerScore();
    }
}

function getComputerChoice(){
    let val = Math.floor((Math.random() * 3));
    switch (val){
        case(0):
            return "rock";
        case(1):
            return "paper";
        case(2): 
            return "scissors";
    }
}

function logResult(){
    humanScore > computerScore ? log("You Won " + humanScore + " : " + computerScore) : 
    humanScore < computerScore ? log("You Lost " + humanScore + " : " + computerScore) : 
    log("Draw " + humanScore + " : " + computerScore);
}

function updatePlayerScore(){
    humanScore++;
    playerUIScore.textContent = humanScore;
}

function updateComputerScore(){
    computerScore++;
    computerUIScore.textContent = computerScore;
}

function hoverButton(button){
    hoverButtonTick(button, rotateVal);
    button.style.backgroundColor = backColor;
    button.style.color = whiteColor;
    button.style.border = `2px solid ${whiteColor}`;
    let move = button.value;
    updateImage(move,"player", "20%");
}

async function hoverButtonTick(button, val){
    if(val > 0){
        console.log("greater");
        val = val * -1;
        button.style.transform = `scale(1.1) rotate(${val}deg)`;
    }
    else{
        console.log("less");
        val = val * -1;
        button.style.transform = `scale(1.1) rotate(${val}deg)`;
    }
    hover = setTimeout(() => {hoverButtonTick(button, val)}, 170);
}

function stopHoverButton(button){
    button.style.transform = "scale(1.0)";
    button.style.backgroundColor = whiteColor;
    button.style.color = backColor;
    button.style.border = "none";
    clearTimeout(hover);
    resetImage("player");
}

function buttonDown(button){
    button.style.transform = "scale(1.0)";
    clearTimeout(hover);
    button.style.backgroundColor = "rgb(118, 175, 11)";
}

function updateImage(move, target = "", opacity = "100%"){
    if(target === "player"){
        if(clicked === true) return;
        target = playerImage;
    }
    else{
        target = computerImage;
        console.log("computa");
    }
    target.src = `${move}.png`;
    target.style.opacity = opacity;
}

function resetImage(target){
    if(clicked === true) return;
    if(target === "player"){
        target = playerImage;
        target.style.opacity = "0%";
    }
    else{
        target = computerImage;
        target.style.opacity = "50%";
        target.src = "question-mark.png";
    }
}

async function updateCountdownText(){
    let val = Number.parseInt(timerText.textContent);
    val -= 1;
    if(val === 0){
        timerText.textContent = "VS";
        resetTimer();
        return;
    }
    timerText.textContent = val;
}

function resetTimer(){
    clearInterval(countdownTimer);
}




// Plan:
// Interface: Console
// Input: rock, paper, scissors
// need random number from computer
// compare player vs computer 
// output: win / lose

// startGame calls playGame 5 times
// IF playerTracker > ComputerTracker
//     print You win
// ELSE
//     you lose
// CONDITION END

// playGame
//     Get player input
//     Get Computer input
//     Get winner
//     increment tracker of winner