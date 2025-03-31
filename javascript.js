const log = console.log;
const values = ["rock", "paper", "scissors"];
let humanScore = 0;
let computerScore = 0;

function getComputerChoice(){
    let val = Math.floor((Math.random() * 3));
    return values[val];
}

function getHumanChoice(){
    return prompt("What ya got? (rock) (paper) (sicssors)").toLowerCase();
}