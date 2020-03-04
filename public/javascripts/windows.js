// CODE FOR WINDOW / DOOR PROCESS

importScripts('/socket.io/socket.io.js');
importScripts('lib.js');

// const
const clientType = "house";
const socket = io();

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

// defining helpers functions 
let toggleGatewayStatus = (status) => {
    if(status==Gateway.CLOSED){
        return Gateway.OPENED
    }
    else {
        return Gateway.CLOSED
    }
}


// message event handler
onmessage = function(e) {
    let objectTag = e.data;

    if(objectTag == "window1") {
        window1.value = toggleGatewayStatus(window1.value)
        publish(clientType, window1);
        postMessage(window1);
    }
    else if(objectTag == "window2") {
        window2.value = toggleGatewayStatus(window2.value)
        publish(clientType, window2);
        postMessage(window2);
    }
    else if(objectTag== "door1") {
        door1.value = toggleGatewayStatus(door1.value)
        publish(clientType, door1);
        postMessage(door1);
    }
    
  }

//setInterval(function(){ console.log("abc")}, 2000);

