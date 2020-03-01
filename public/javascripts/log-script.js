function logFortmatter(message) {
    let subject = message.subject;
    let msg = message.value;

    let newDate = new Date();
    dateString = newDate.toLocaleString();

    console.log(subject);
    console.log(msg);
    return (dateString + ' | SUBJECT: ' + subject + '  | MESSAGE: ' + msg + '<br>')
}

$(document).ready(function () {

    socket.on('log', function(msg){
        let formattedLog = logFortmatter(msg)
        $('#log-div').prepend(formattedLog);
      });

});

