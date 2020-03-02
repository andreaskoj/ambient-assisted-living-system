// CODE FOR WINDOW / DOOR PROCESS

// connectiong to the server
importScripts('/socket.io/socket.io.js');

// const
const clientType = "house";

// defining data structures
const Gateway = {
    CLOSED: 'closed',
    OPENED: 'open'
}

// to make enums work
Object.freeze(Gateway);

// defining house objects
let window1 = {subject:"window1", value: Gateway.CLOSED};
let window2 = {subject:"window2", value: Gateway.CLOSED};
let door1 = {subject:"door1", value: Gateway.CLOSED};

var socket = io();

// defining helpers functions 
let toggleGatewayStatus = (status) => {
    if(status==Gateway.CLOSED){
        return Gateway.OPENED
    }
    else {
        return Gateway.CLOSED
    }
}

function publish(subject, message) {
    
    socket.emit (subject, message);

    console.log('Sent! Subject: ' + subject + '     | Message: ' + message );
}

onmessage = function(e) {
    console.log('Message received from main script');
    var workerResult = 'Result: ' + (e.data);
    console.log(workerResult);
    console.log('Posting message back to main script');
    postMessage(workerResult);
  }


setInterval(function(){ console.log("abc")}, 2000);

