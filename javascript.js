const log = console.log;
const values = new Map();

values.set("rock", "scissors");
values.set("paper", "rock");
values.set("scissors", "paper");

let humanScore = 0;
let computerScore = 0;

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
    return prompt("What ya got? (rock) (paper) (scissors)");
}

playRound(getHumanChoice(), getComputerChoice());

function playRound(player, computer){
    if(player === computer){
        log("draw");
    }
    else if(values.get(player) === computer){
        log("You Win :) " + player + " beats " + computer);
    } 
    else{
        log("You Lose :( " + computer + " beats " + player);
    }
}
