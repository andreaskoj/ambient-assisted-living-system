
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

const securityProcess = new Worker('javascripts/security.js');

//setInterval(function(){ windowsProcess.postMessage('Hello World');}, 2000);

//var facialProcess = new Worker('javascripts/windows.js');

//var logicProcess = new Worker('javascripts/windows.js');

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
        
                
        if(name.length != 0){
            console.log("sss");
            uploadingPhotosProcess.postMessage(name);
        }

        // clean input
        $("#input-photo").val('');
    }); 

    $("#sec-btn").click(function() {
        let log = $("#log").val();
        let pas = $("#pas").val();

        let arr = [log,pas];
        securityProcess.postMessage(arr);

        // clean theinput
        $("#log").val('');
        $("#pas").val('');
    });   


});


// for future refactoring, redundant code
function displayProcesessStatus() {

    let ref1 = $("#windoo-status");
    let ref2 =  $("#pers-status");
    let ref3 =  $("#smoke-status");
    let ref4 =  $("#uploading-status");
    let ref5 =  $("#auth-status");
    let ref6 =  $("#facial-status");
    let ref7 =  $("#logic-status");
 
    statusUpdate1 = (ref) => (typeof personProcess !== 'undefined') ? ref.text("UP") : ref.text("DOWN"); 
    statusUpdate2 = (ref) => (windowsDoorProcess != null) ? ref.text("UP") : ref.text("DOWN"); 
    statusUpdate3 = (ref) => (smokeSensorProcess != null) ? ref.text("UP") : ref.text("DOWN"); 
    statusUpdate4 = (ref) => (uploadingPhotosProcess != null) ? ref.text("UP") : ref.text("DOWN"); 
    statusUpdate5 = (ref) => (securityProcess != null) ? ref.text("UP") : ref.text("DOWN"); 
    statusUpdate6 = (ref) => (typeof facialProcess !== 'undefined') ? ref.text("UP") : ref.text("DOWN"); 
    statusUpdate7 = (ref) => (typeof logicProcess !== 'undefined') ? ref.text("UP") : ref.text("DOWN"); 
    
    statusUpdate1(ref1);
    statusUpdate2(ref2);
    statusUpdate3(ref3);
    statusUpdate4(ref4);
    statusUpdate5(ref5);
    statusUpdate6(ref6);
    statusUpdate7(ref7);

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
    }  

    securityProcess.onmessage = function(e) {
        let data = e.data;
        $("#result-value").text(data);
    }  
