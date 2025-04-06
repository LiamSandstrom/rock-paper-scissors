//for easier log while coding
const log = console.log;

//HashMap with <Move : beats>
const values = new Map();
values.set("rock", "scissors");
values.set("paper", "rock");
values.set("scissors", "paper");

const playerUIScore = document.querySelector("#player-score");
const computerUIScore = document.querySelector("#computer-score");
const buttons = document.querySelectorAll("button");
for(let button of buttons){
    button.addEventListener("click", () => {
        let move = button.value;
        playRound(move);
    });

    button.addEventListener("mouseenter", () => hoverButton(button));
    button.addEventListener("mouseleave", stopHoverButton);
}

let humanScore = 0;
let computerScore = 0;
let rounds = 5;

function playGame(){
    for(let i = 0; i < rounds; i++){
        log("Round: " + (i + 1));
        playRound();
    }
    logResult();
}

function playRound(input){
    let player = input;
    let computer = getComputerChoice();

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
}

function stopHoverButton(){
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