
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

function publish(subject, message) {
    socket.emit (subject, message);
}  