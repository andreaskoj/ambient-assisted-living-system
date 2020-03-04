// CODE FOR WINDOW / DOOR PROCESS

importScripts('/socket.io/socket.io.js');
importScripts('lib.js');

const clientType = "house";
const socket = io();

let steps = {subject:"steps", value: 0};
let heart = {subject:"heart", value: 0};
let glucose = {subject:"glucose", value: 0};

// interval for steps
setInterval(function(){
      steps.value += getRndInteger(0, 150);
      publish(clientType, steps);
      postMessage(steps); 

    }, getRndInteger(3000,10000));

// interval for heart rate
setInterval(function(){
      heart.value = getRndInteger(60, 100);
      publish(clientType, heart);
      postMessage(heart); 

    }, getRndInteger(5000,10000));

// interval for glucose
setInterval(function(){
    glucose.value = getRndInteger(70, 140);
    publish(clientType, heart);
    postMessage(glucose); 

    }, getRndInteger(4000,10000));
