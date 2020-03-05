// const
const clientType = "dashboard";

let photos = ["mountain","lake","family"];
let currentPhoto = 0;

// run when DOM loaded
$(document).ready(function () {

    socket.on('house', function(msg){
        $('#window-status').text(msg.value);
      });
    

      setInterval(function(){
        $('#displayID').text(photos[currentPhoto]);
        if (photos.length == currentPhoto + 1){
          currentPhoto = 0;
        }
        else {
          currentPhoto ++;
        }
      }, 3000);

    $("#dark-mode").click(function() {
      $("#dashboard-container").removeClass('dd').addClass('dl');
    }); 

    $("#light-mode").click(function() {
      $("#dashboard-container").removeClass('dl').addClass('dd');
    });    


});
