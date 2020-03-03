// CODE FOR WINDOW / DOOR PROCESS

importScripts('/socket.io/socket.io.js');

// var
const clientType = "house";
const socket = io();

let steps = {subject:"steps", value: 0};
let heart = {subject:"heart", value: 0};
let glucose = {subject:"glucose", value: 0};

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

// interval for steps
setInterval(function(){
      steps.value += getRndInteger(0, 150);
      
      postMessage(steps); 

    }, getRndInteger(0,10000));

// interval for heart rate
setInterval(function(){
      heart.value = getRndInteger(60, 100);
      
      postMessage(heart); 

    }, getRndInteger(0,10000));

// interval for glucose
setInterval(function(){
    glucose.value = getRndInteger(70, 140);
    
    postMessage(glucose); 

    }, getRndInteger(0,10000));


onmessage = function(e) {
    //let objectTag = e.data;
    
  }
