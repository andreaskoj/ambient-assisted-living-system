// const
const clientType = "dashboard";


// run when DOM loaded
$(document).ready(function () {

    socket.on('house', function(msg){
        $('#window-status').text(msg.value);
      });
    

});