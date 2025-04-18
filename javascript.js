//for easier log while coding
const log = console.log;
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
//HashMap with <Move : beats>
const values = new Map();
values.set("rock", "scissors");
values.set("paper", "rock");
values.set("scissors", "paper");

const playerUIScore = document.querySelector("#player-score");
const computerUIScore = document.querySelector("#computer-score");
const playerImage = document.querySelector("#player-image");
const computerImage = document.querySelector("#computer-image");
const timerText = document.querySelector("#timer");
const playerVisual = document.querySelector("#playervisual");
const computerVisual = document.querySelector("#computervisual");
const wrapper = document.querySelector(".wrapper");
const roundUI = document.querySelector("#round");
const playerRound = document.querySelector("#player-round");
const computerRound = document.querySelector("#computer-round");
const buttons = document.querySelectorAll("button");

const damageColor = "rgba(202, 122, 122, 0.65)";
const healthColor = "rgb(0, 209, 0)";
const whiteColor = "rgb(242, 239, 239)"; 
const disabledColor = "rgba(154, 152, 152, 0.75)";
const backgroundColor = "#123456";

const second = 1000;
const countdownTime = second * 3;
const rotateVal = 0.7;
let maxHealth = 50;
let damageAmount = 10;
let clicked = false;
let hover = 0;
let countdownTimer = 0;
let playerHealth = maxHealth;
let computerHealth = maxHealth;
let playerScore = 0;
let computerScore = 0;
let round = 1;
let idlePlayer;
let idleComputer;

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

function beginPlay(){
    playerUIScore.textContent = playerHealth;
    computerUIScore.textContent = computerHealth;
    startIdleImage(playerImage);
    startIdleImage(computerImage);
}

beginPlay();

//GAME LOOP
//-----------------------------------
function countdown(move){
    updateImage(move, "player");
    clicked = true;
    disableButtons();
    stopidleImagePlayer();
    setTimeout(() => playRound(move), countdownTime);
    let val = countdownTime / second;
    timerText.textContent = val;
    countdownTimer = setInterval(updateCountdownText, second);
}

async function playRound(input){
    let player = input;
    let computer = getComputerChoice();

    stopIdleImageComputer();
    updateImage(computer);

    if(player === computer){
        log("draw");
        await drawAnimation();
    }
    else if(values.get(player) === computer){
        log("You Win :) " + player + " beats " + computer);
        await winAnimation(player);
    } 
    else{
        log("You Lose :( " + computer + " beats " + player);
        await loseAnimation(computer);
    }

    if(playerHealth === 0){
        computerScore++;
        computerRound.textContent = computerScore;
        roundAnimation(computerRound);
        await delay(1000);
        resetGame();
    }
    else if(computerHealth === 0){
        playerScore++;
        playerRound.textContent = playerScore;
        roundAnimation(playerRound);
        await delay(1000);
        resetGame();
    }
    else{
        round++;
        roundUI.textContent = round;
    }

    resetRound();
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

async function resetRound(){
    await delay(500);
    clicked = false;
    resetScale();
    await delay(300);
    setTransitionAll();
    startIdleImage(playerImage);
    startIdleImage(computerImage);
    await delay(500);
    resetImage();
    resetImage("player");
    enableButtons();
}

function resetGame(){
    playerHealth = maxHealth;
    computerHealth = maxHealth;
    playerUIScore.textContent = maxHealth;
    computerUIScore.textContent = maxHealth;
    round = 1;
    roundUI.textContent = round;
}

//DAMAGE FUNCTIONS
//-----------------------------------
async function damage(move, target = "computer"){
    let healthTarget;
    if(target === "player"){
        target = playerVisual;
        healthTarget = playerUIScore;
    }
    else{
        target = computerVisual;
        healthTarget = computerUIScore;
    }
    switch(move){
        case "rock":
            await rockDamage(target, healthTarget);
            break;
        case "paper":
            await paperDamage(target, healthTarget);
            break;
        case "scissors":
            await scissorDamage(target, healthTarget);
            break;
    }
}

async function rockDamage(target, healthTarget) {
    target.style.backgroundColor = damageColor;
    wrapper.style.transform = "scale(1.05) rotate(5deg)";
    await delay(70);
    wrapper.style.transform = "scale(1.05) rotate(-5deg)";
    await delay(70);
    damageHealth(target, damageAmount);
    wrapper.style.transform = "scale(1.00) rotate(0deg)";
    target.style.backgroundColor = backgroundColor;
    await delay(200);
}

async function paperDamage(target, healthTarget) {
    let slaps = 2;
    for(let i = 0; i < slaps; i++){
    target.style.backgroundColor = damageColor;
    damageHealth(target, damageAmount / slaps);
    await delay(50);
    target.style.backgroundColor = backgroundColor;
    await delay(250);
    }
}

async function scissorDamage(target, healthTarget) {
    let cuts = 4;
    for(let i = 0; i < cuts; i++){
    target.style.backgroundColor = damageColor;
    await delay(50);
    damageHealth(target, damageAmount / cuts);
    target.style.backgroundColor = backgroundColor;
    await delay(40);
    }
}

async function damageHealth(target, amount){
    let health;
    if(target === playerVisual){
        target = playerUIScore;
        playerHealth -= amount;
        console.log(playerHealth)
        playerUIScore.textContent = playerHealth;
    }
    else{
        target = computerUIScore;
        computerHealth -= amount;
        console.log(computerHealth)
        computerUIScore.textContent = computerHealth;
    }
    for(let i = 0; i < 2; i++){
        target.style.transform = "scale(0.95)";
        target.style.color = damageColor;
        await delay(90);
        target.style.transform = "scale(1.0)";
        target.style.color = healthColor;
        await delay(90);
    }
}

//BUTTON FUNCTIONS
//-----------------------------------
function hoverButton(button){
    hoverButtonTick(button, rotateVal);
    button.style.backgroundColor = backgroundColor;
    button.style.color = whiteColor;
    button.style.border = `2px solid ${whiteColor}`;
    let move = button.value;
    updateImage(move,"player", "20%");
}

async function hoverButtonTick(button, val){
    if(clicked){
        stopHoverButton(button);
        return;
    }
    if(val > 0){
        val = val * -1;
        button.style.transform = `scale(1.1) rotate(${val}deg)`;
    }
    else{
        val = val * -1;
        button.style.transform = `scale(1.1) rotate(${val}deg)`;
    }
    hover = setTimeout(() => {hoverButtonTick(button, val)}, 170);
}

function stopHoverButton(button){
    button.style.transform = "scale(1.0)";
    button.style.backgroundColor = whiteColor;
    button.style.color = backgroundColor;
    button.style.border = "none";
    clearTimeout(hover);
    resetImage("player");
}

function buttonDown(button){
    button.style.transform = "scale(1.0)";
    clearTimeout(hover);
    button.style.backgroundColor = healthColor;
}

function enableButtons(){
    for(let button of buttons){
        button.disabled = false;
        button.style.pointerEvents = "auto";
        button.style.backgroundColor = whiteColor;
    }
}

function disableButtons(){
    for(let button of buttons){
        button.style.pointerEvents = "none";
        button.disabled = true;
        button.style.backgroundColor = disabledColor;
    }
}

//TIMER FUNCTIONS 
//-----------------------------------
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

//IMAGE AND TEXT ANIMATIONS
//-----------------------------------
async function winAnimation(move){
    await delay(700);
    playerImage.style.transform = "scale(1.2)";
    await delay(500);
    await damage(move);
}

async function loseAnimation(move){
    await delay(700);
    computerImage.style.transform = "scale(1.2)";
    await delay(500);
    await damage(move, "player");
}

async function drawAnimation(){
    await delay(700);
    playerImage.style.transform = "scale(1.1)";
    computerImage.style.transform = "scale(1.1)";
    await delay(500);
}

async function roundAnimation(target){
    target.style.transform = "scale(1.1)";
    target.style.color = "green";
    await delay(200);
    target.style.transform = "scale(1.0)";
    target.style.color = whiteColor;
}

//IMAGE FUNCTIONS
//-----------------------------------
function resetScale(){
    playerImage.style.transform = "scale(1.0)";
    computerImage.style.transform = "scale(1.0)";
}

function setTransitionAll(){
    playerImage.style.transition = "transform 1s ease-in-out";
    computerImage.style.transition = "transform 1s ease-in-out";
}

function startIdleImage(target){
    if(target === playerImage){
        idlePlayer = setInterval(() => idleImage(target), 1000);
    }
    else{
        idleComputer = setInterval(() => idleImage(target), 1000);
    }
}

async function idleImage(target){
    target.style.transform = "scale(0.95)";
    await delay(500);
    target.style.transform = "scale(1)";
}

function updateImage(move, target = "", opacity = "100%"){
    if(target === "player"){
        if(clicked === true) return;
        target = playerImage;
    }
    else{
        target = computerImage;
    }
    target.src = `${move}.png`;
    target.style.opacity = opacity;
}

function resetImage(target = "computer"){
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

function stopidleImagePlayer(){
    clearInterval(idlePlayer);
    playerImage.style.transition = "transform 0.2s";
    playerImage.style.transform = "scale(1.0)";
}

function stopIdleImageComputer(){
    clearInterval(idleComputer);
    computerImage.style.transition = "transform 0.2s";
    computerImage.style.transform = "scale(1.0)";
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