
// Global Variables
// import {
//   CLUE_HOLD_TIME, 
//   CLUE_PAUSE_TIME, 
//   NEXT_CLUE_WAIT_TIME, 
//   PATTERN, 
//   JASMINE_FLOWER, 
//   JASMINE_FLOWER_CONT
// } from "constants.mjs";

//const parse = require('constants');
// import {Context} from "context.mjs";

const CLUE_HOLD_TIME = 500; //how long to hold each clue's light/sound
const CLUE_PAUSE_TIME = 200; //how long to pause in between clues
const NEXT_CLUE_WAIT_TIME = 1000; //how long to wait before starting playback of the clue sequence

const PATTERN = [3, 3, 5, 6, 8, 8, 6, 5, 5, 6, 5,5, 5, 5, 3, 5, 6, 6, 5, 3, 2, 3, 5, 3, 2, 1, 1, 2, 1];

var randome_pattern;

const COLORS = {
  brown: "#481e1c",
  beige: "#F3EBE0",
  yellow: "#EAD3A7",
  green: "#AFBC8F"
}

var progress = 0;
var gamePlaying = false;

// Sound
var tonePlaying = false;
var volume = 0.5;

// Game Play
var guessCounter = 0;
var speed = 1;
var strikeCount = 0;
var timeInterval;

function startGame() {
  buttonSetUp(PATTERN);
  // initialize game variables
  progress = 0;
  gamePlaying = true; //function initializeGame()
  strikeCount = 0;
  speed = 1;

  // swap the Start and Stop buttons
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");

  // display the current speed:
  document.getElementById("speedDisplay").classList.remove("hidden");
  
  // reset timer
  document.getElementById("countDown").innerHTML = `${0}:${0}`;

  // clues
  playClueSequence();
}

function stopGame() {
  gamePlaying = false;

  // swap the Start and Stop buttons
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
  
  // reset countdown
  resetTime();
}

/***************************Clue to Button Functions****************************/
//helper functions to change button visuals
//.lit is when button is not clicked but light up
function lightButton(btn) {
  document.getElementById("button" + btn).classList.add("lit");
}

function clearButton(btn) {
  document.getElementById("button" + btn).classList.remove("lit");
}

function playSingleClue(btn) {
  if (gamePlaying) {
    lightButton(btn);
    playTone(btn, CLUE_HOLD_TIME / speed);
    setTimeout(clearButton, CLUE_HOLD_TIME / speed, btn);
  }
}

function playClueSequence() {
  console.log("play sequence with progress: " + progress);
  console.log("play sequence with speed: " + speed);
  guessCounter = 0; // guessCounter needs to be initialized every time clue plays
  context.resume();
  let delay = NEXT_CLUE_WAIT_TIME / speed; //set delay to initial wait time
  for (let i = 0; i <= progress; i++) {
    // for each clue that is revealed so far
    console.log("play single clue: " + PATTERN[i] + " in " + delay + "ms");
    setTimeout(playSingleClue, delay, PATTERN[i]); // set a timeout to play that clue
    delay += CLUE_HOLD_TIME / speed;
    delay += CLUE_PAUSE_TIME / speed;
  }
  
  let time = {
    milisecond: 5000
  }
  
  timeInterval = setInterval(function() {tickingClock(time)}, 100);
  
}


function buttonSetUp(song) {
  for (var i = 1; i < 8; ++i) {
    document.getElementById("button" + i).classList.add("hidden");
  }
  let uniqueButtons = [...new Set(song)]; // works
  uniqueButtons.sort();
  
  for(var item = 0; item < uniqueButtons.length; ++item){
    console.log(uniqueButtons[item]);
    document.getElementById("button" + uniqueButtons[item]).classList.remove("hidden");
    if(item%2 == 0){
      document.getElementById("button" + uniqueButtons[item]).style.background = "url('https://cdn.glitch.global/e8c92ccb-e3a1-45c5-a4c2-48e4d7eae45b/green-jasmine?v=1650665969414')";
    }else{
      document.getElementById("button" + uniqueButtons[item]).style.background = "url('https://cdn.glitch.global/e8c92ccb-e3a1-45c5-a4c2-48e4d7eae45b/orig-jasmine.png?v=1650670560449')";
    }
  }
  
  // uniqueButtons.forEach(item => document.getElementById("button" + item).classList.remove("hidden"));
}

/***************************Speed Functions****************************/
// isSpeedingUp: boolean variable that holds if speed is becoming faster or slower
function speedChange(isSpeedingUp) {
  if (isSpeedingUp) {
    speed += 0.1;
  } else {
    speed -= 0.1;
  }
}

/***************************User Interaction Functions****************************/
function loseGame() {
  resetTime();
  stopGame();
  alert("Game Over. You lost.");
}

function winGame() {
  stopGame();
  alert("Game Over. You won!!");
}

function guess(btn) {
  console.log("user guessed: " + btn);
  
  //stop count down timer
  clearInterval(timeInterval);
  
  if (!gamePlaying) {
    // alert("Press Start button to start game!");
    return;
  }
  // Is guess correct?
  else if (btn == PATTERN[guessCounter]) {
    // Is turn over?
    if (guessCounter == progress) {
      // Is this the last turn?
      if (progress == PATTERN.length - 1) {
        winGame();
      } else {
        speedChange(true); //speed up
        progress++; // increment progress
        playClueSequence(); // play next clue sequence
      }
    } else {
      guessCounter++; // increment guessCounter
    }
  } else {
    // Guess is incorrect --> increment strikeCount
    incorrectGuess();
  }
}


function incorrectGuess(){
  beep();
  if (strikeCount < 2) {
    strikeCount++;
    alert(`Guessed wrong! Try again. Strike: ${strikeCount}`);
    playClueSequence();
  } else {
    loseGame();
  }
}

/***************************Ticking Clock Functions****************************/
function tickingClock(time){
  if(time.milisecond <= 0){
    resetTime();
    incorrectGuess();
  }
  
  var second = parseInt(time.milisecond / 1000);
  let milisec = time.milisecond % 1000;
  document.getElementById("countDown").innerHTML = `${second}:${milisec}`;
  time.milisecond = time.milisecond - 100;
}

function resetTime(){
  document.getElementById("countDown").innerHTML = `${0}:${0}`;
  clearInterval(timeInterval);
}


/***************************Sound Synthesis Functions****************************/
// Determines pitch
const freqMap = {
  1: 261.6,
  2: 293.7,
  3: 329.6,
  4: 349.2,
  5: 392.1,
  6: 440.0,
  7: 493.9,
  8: 523.3,
};

// Page Initialization
// Init Sound Synthesizer
var AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var o = context.createOscillator();
var g = context.createGain();
g.connect(context.destination);
g.gain.setValueAtTime(0, context.currentTime);
o.connect(g);
o.start(0);

function playTone(btn, len) {
  o.frequency.value = freqMap[btn];
  g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
  context.resume();
  tonePlaying = true;
  setTimeout(function () {
    stopTone();
  }, len);
}

function startTone(btn) {
  if (!tonePlaying) {
    context.resume();
    o.frequency.value = freqMap[btn];
    g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
    context.resume();
    tonePlaying = true;
  }
}

function stopTone() {
  g.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
  tonePlaying = false;
}


function beep() {
  var snd = new Audio(
    "data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU="
  );
  snd.play();
}

/***************************Test Create Button Functions****************************/
function createGameArenaBtn(btnName){
  let btn = document.createElement("button");
  btn.name = btnName;
  document.gameButtonArea.appendChild(btn);
}