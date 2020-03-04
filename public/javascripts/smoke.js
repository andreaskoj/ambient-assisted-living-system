importScripts('/socket.io/socket.io.js');
importScripts('lib.js');

const clientType = "house";
const socket = io();

let smoke = {subject:"smoke", value: false};


// interval for smoke detector
setInterval(function(){
    
    smoke.value == true ? smoke.value = false : smoke.value = true;
    publish(clientType, smoke);
    postMessage(smoke); 
  }, getRndInteger(15000,30000));