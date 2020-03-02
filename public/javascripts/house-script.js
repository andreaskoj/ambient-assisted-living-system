
// const
const clientType = "house";

// defining data structures
const Gateway = {
    CLOSED: 'closed',
    OPENED: 'open'
}

// to make enums work
Object.freeze(Gateway);


// init workers
//var personProcess = new Worker('javascripts/windows.js');
//let windowsProcess = new Worker('javascripts/windows.js');


//setInterval(function(){ windowsProcess.postMessage('Hello World');}, 2000);

//var smokeSensorProcess = new Worker('javascripts/windows.js');

//var faceRecognitionProcess = new Worker('javascripts/windows.js');

//var uploadingPhotosProcess = new Worker('sjavascripts/windows.js');

//var exectueCompositLogicProcess = new Worker('javascripts/windows.js');

//var securityProcess = new Worker('javascripts/windows.js');

/* document.getElementById("win1-btn").addEventListener("click", test); 

function test() {
    console.log("xx");
    console.log(windowsProcess);
    windowsProcess.postMessage('Hello World');
}; */

const windowsProcess = new Worker("javascripts/windows.js")

const x = document.getElementById("win1-btn");
x.onclick = inputchange;

function inputchange(e) {
    windowsProcess.postMessage("x");
  }





// testing function to trigger events
//setInterval(function(){  $("#window-btn").click(); }, 2000);


// run when DOM loaded
$(document).ready(function () {

    //displayProcesessStatus();

    $("#win1-btn").click(function() {

        windowsProcess.postMessage("x");
          
/* 
        window1.value = toggleGatewayStatus(window1.value);
        $("#win1-status").text(window1.value);
        publish(clientType, window1); */

    });

    $("#win2-btn").click(function() {

        window2.value = toggleGatewayStatus(window2.value);
        $("#win2-status").text(window2.value);
        publish(clientType, window2);
    
        });

    $("#doo1-btn").click(function() {

        door1.value = toggleGatewayStatus(door1.value);
        $("#doo1-status").text(door1.value);
        publish(clientType, door1);
    
        });    
});
/* 
function displayProcesessStatus() {
    if(windowsProcess =! null) {
        $("#windoo-status").text("UP");
    } 
    else
        $("#windoo-status").text("DOWN") 
}
 */

