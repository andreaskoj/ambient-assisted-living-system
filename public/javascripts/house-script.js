
// const
const clientType = "house";

// defining data structures
const Gateway = {
    CLOSED: 'closed',
    OPENED: 'open'
}

// to make enums work
Object.freeze(Gateway);


// init workers (processes)
const personProcess = new Worker('javascripts/person.js');

const windowsDoorProcess = new Worker('javascripts/windows.js');

const smokeSensorProcess = new Worker('javascripts/smoke.js');

const uploadingPhotosProcess = new Worker('javascripts/upload.js');

//setInterval(function(){ windowsProcess.postMessage('Hello World');}, 2000);

//var faceRecognitionProcess = new Worker('javascripts/windows.js');


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

    $("#pho-btn").click(function() {
        let name = $("#input-photo").val();
        uploadingPhotosProcess.postMessage(name);
        // clean input
        $("#input-photo").val('');
    });   


});


// for future refactoring, redundant code
function displayProcesessStatus() {

    let ref1 = $("#windoo-status");
    let ref2 =  $("#pers-status");
    let ref3 =  $("#smoke-status");
    let ref4 =  $("#uploading-status");

    statusUpdate1 = (ref) => (personProcess != null) ? ref.text("UP") : ref.text("DOWN"); 
    statusUpdate2 = (ref) => (windowsDoorProcess != null) ? ref.text("UP") : ref.text("DOWN"); 
    statusUpdate2 = (ref) => (smokeSensorProcess != null) ? ref.text("UP") : ref.text("DOWN"); 
    statusUpdate2 = (ref) => (uploadingPhotosProcess != null) ? ref.text("UP") : ref.text("DOWN"); 
    

    statusUpdate1(ref1);
    statusUpdate2(ref2);
    statusUpdate2(ref3);
    statusUpdate2(ref4);

}

// message handler for windows / door process
windowsDoorProcess.onmessage = function(e) {
    let data = e.data;

    if(data.subject == 'window1')
        $("#win1-status").text(data.value);
    else if (data.subject == 'window2')
        $("#win2-status").text(data.value);
    else if (data.subject == 'door1')
        $("#doo1-status").text(data.value);
        
    }

// message handler for person process
personProcess.onmessage = function(e) {
    let data = e.data;

    if(data.subject == 'steps')
        $("#steps-number").text(data.value);
    
    else if(data.subject == 'heart')
        $("#heart-number").text(data.value);

    else if(data.subject == 'glucose')
        $("#glucose-number").text(data.value);
        
    }
// message handler for smoke process          
    smokeSensorProcess.onmessage = function(e) {
        let data = e.data;
    
        if(data.subject == 'smoke'){
            if(data.value == true) {
                $("#smoke-value").text("YES").removeClass("green").addClass("red");
            }
            else {
                $("#smoke-value").text("NO").removeClass("red").addClass("green");
            }
        }
    }  

    uploadingPhotosProcess.onmessage = function(e) {
        let data = e.data;
        
        $("#photo-value").text(data);
        console.log(data);           
    }  
