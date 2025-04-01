//for easier log while coding
const log = console.log;

//HashMap with <Move : beats>
const values = new Map();
values.set("rock", "scissors");
values.set("paper", "rock");
values.set("scissors", "paper");

let humanScore = 0;
let computerScore = 0;
let rounds = 5;

playGame();

function playGame(){
    for(let i = 0; i < rounds; i++){
        playRound();
    }
    logResult();
}

function playRound(){
    let player = getHumanChoice();
    let computer = getComputerChoice();

    if(player === computer){
        log("draw");
    }
    else if(values.get(player) === computer){
        log("You Win :) " + player + " beats " + computer);
        humanScore++;
    } 
    else{
        log("You Lose :( " + computer + " beats " + player);
        computerScore++;
    }
}

function getComputerChoice(){
    let val = Math.floor((Math.random() * 3));
    if(val === 0){
        return "rock";
    }
    else if(val === 1){
        return "paper";
    }
    else{
        return "scissors";
    }
}

function getHumanChoice(){
    //input validation 
    while(true){
        let input = prompt("What ya got? (rock) (paper) (scissors)").toLowerCase();
        if(values.has(input)){
            return input;
        }
        log("Valid input plz");
    }
}

function logResult(){
    humanScore > computerScore ? log("You Won " + humanScore + " : " + computerScore) : 
    humanScore < computerScore ? log("You Lost " + humanScore + " : " + computerScore) : 
    log("Draw " + humanScore + " : " + computerScore);
}
