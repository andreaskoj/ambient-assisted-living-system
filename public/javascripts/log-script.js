function logFortmatter(message) {
    let subject = message.subject;
    let msg = message.value;

    let newDate = new Date();
    dateString = newDate.toLocaleString();

    console.log(subject);
    console.log(msg);
    return ('<div><span>' + dateString + '</span> | <span>SUBJECT: ' + subject + '</span>  | <span>MESSAGE: ' + msg + '</span></div>')
}

$(document).ready(function () {

    socket.on('log', function(msg){
        let formattedLog = logFortmatter(msg)
        $('#log-div').prepend(formattedLog);
      });

});

