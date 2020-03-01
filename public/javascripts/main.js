// connectiong to the server
var socket = io();


function publish(subject, message) {
    
    socket.emit (subject, message);

    console.log('Sent! Subject: ' + subject + '  | Message: ' + message );
}