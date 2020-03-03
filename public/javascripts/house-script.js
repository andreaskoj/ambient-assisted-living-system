
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
const personProcess = new Worker('javascripts/person.js');

const windowsDoorProcess = new Worker('javascripts/windows.js');


//setInterval(function(){ windowsProcess.postMessage('Hello World');}, 2000);

//var smokeSensorProcess = new Worker('javascripts/windows.js');

//var faceRecognitionProcess = new Worker('javascripts/windows.js');

//var uploadingPhotosProcess = new Worker('sjavascripts/windows.js');

//var exectueCompositLogicProcess = new Worker('javascripts/windows.js');

//var securityProcess = new Worker('javascripts/windows.js');

// testing function to trigger events
//setInterval(function(){  $("#window-btn").click(); }, 2000);


// run when DOM loaded
$(document).ready(function () {

    displayProcesessStatus();

    $("#win1-btn").click(function() {
        windowsDoorProcess.postMessage("window1");
    });


    $("#win2-btn").click(function() {
        windowsDoorProcess.postMessage("window2");
    });

    $("#doo1-btn").click(function() {
        windowsDoorProcess.postMessage("door1");;
    });    
});


// for future refactoring, redundant code
function displayProcesessStatus() {

    let ref1 = $("#windoo-status");
    let ref2 =  $("#pers-status");

    statusUpdate1 = (ref) => (personProcess != null) ? ref.text("UP") : ref.text("DOWN"); 
    statusUpdate2 = (ref) => (windowsDoorProcess != null) ? ref.text("UP") : ref.text("DOWN"); 
    

    statusUpdate1(ref1);
    statusUpdate2(ref2);

}
function handleMessageFromWorker(msg) {


    console.log('incoming message from worker, msg:', msg.data);
    if(msg.data.subject == 'window1')
        $("#win1-status").text(msg.data.value);
    else if (msg.data.subject == 'window2')
        $("#win2-status").text(msg.data.value);
    else if (msg.data.subject == 'door1')
        $("#doo1-status").text(msg.data.value);
}

windowsDoorProcess.addEventListener('message', handleMessageFromWorker);

personProcess.onmessage = function(e) {
    let data = e.data;

    if(data.subject == 'steps')
        $("#steps-number").text(data.value);
    
    else if(data.subject == 'heart')
        $("#heart-number").text(data.value);

    else if(data.subject == 'glucose')
        $("#glucose-number").text(data.value);
  }