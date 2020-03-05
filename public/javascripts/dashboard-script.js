
// const
const clientType = "dashboard";

let photos = [];
let currentPhoto = 0;
let dialogID = 0;
let dialogID2 = 0;

let login = "";
let password = "";


// run when DOM loaded
$(document).ready(function () {

    socket.on('dashboard', function(msg){

      if(msg.subject == "photo"){
        photos.push(msg.value);
        console.log("Added photo: " + msg.value);
      }
      });
    
    socket.on('validation-channel', function(msg){

      if(msg.subject == "validate-login-result"){
        
        if( msg.value == "yes") {
          console.log("Login validated");
          publish("validation-channel", {subject: "validate-password", value: password});
        }
        else {
          $("#response").text("Wrong login");
        }
        
      }
      else if(msg.subject == "validate-password-result"){
        if( msg.value == "yes") {
          console.log("Password validated");
          $("#user-greeting").text("Hello " + login + "!");
        }
        else {
          $("#response").text("Wrong password");
        }

      }
      });
    
      setInterval(function(){
        console.log(currentPhoto);
        console.log(currentPhoto % photos.length);
        $('#displayID').text(photos[currentPhoto % photos.length]);

          currentPhoto ++;
        
      }, 3000);

    $("#dark-mode").click(function() {
      $("#dashboard-container").removeClass('dd').addClass('dl');
    }); 

    $("#light-mode").click(function() {
      $("#dashboard-container").removeClass('dl').addClass('dd');
    });    

    $("#cli-confirm").click(function() {
      let cmd = $("#cli").val();

      // clean theinput
      commandParser(cmd);
      $("#cli").val('');
  });   
});

function commandParser(cmd){
  
  console.log("Current dialog ID = " + dialogID);

  resp = (cmd) => ($("#response").text(cmd));
  
  if (cmd == "login") {
    resp("Enter your login");
    dialogID = 1;
  }
  else if (dialogID == 1) {
    login = $("#cli").val();
    resp("Enter your password")
    dialogID = 2;
  }
  else if(dialogID == 2){
    password = $("#cli").val();
    console.log(login + "  " + password);
    dialogID = 0;

      validation(login, password);
  }

  else if (cmd == "add rule"){
    resp("Rule added to the system")
  }

  else {
    resp("This command doesn't exist")
  }
  
}

function validation(login, password) {

  publish("validation-channel", {subject: "validate-login", value: login})

}