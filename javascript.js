const log = console.log;
const values = ["rock", "paper", "scissors"];


function getComputerChoice(){
    let val = Math.floor((Math.random() * 3));
    return values[val];
}


function getHumanChoice(){
    return prompt("What ya got? (rock) (paper) (sicssors)").toLowerCase();
}
