importScripts('/socket.io/socket.io.js');
importScripts('lib.js');

const clientType = "house";
const socket = io();

// data from db
let u1 = {login:"Bubbles", password: "x"};
let u2 = {login:"Elfo", password: "x"};
let u3 = {login:"Bean", password: "x"};
let u4 = {login:"Ricky", password: "x"};

let users = [];
users.push(u1);
users.push(u2);
users.push(u3);
users.push(u4);

socket.on('validation-channel', function(msg){
    if(msg.subject == "validate-login") {
        console.log("validate login");

        let userFlag = false;
        users.forEach(element => {
            if(element.login == msg.value) {
                console.log(element);
                userFlag = true;
            }
        });

        if (userFlag == true) {
            publish("validation-channel", {subject:"validate-login-result", value: "yes"})
        }

        else{
            publish("validation-channel", {subject:"validate-login-result", value: "no"})
        } 

    }

    else if (msg.subject == "validate-password"){
        
        let userFlag = false;
        users.forEach(element => {
            if(element.password == msg.value) {
                userFlag = true;
            }
        });

        if (userFlag == true) {
            publish("validation-channel", {subject:"validate-password-result", value: "yes"})
        }

        else{
            publish("validation-channel", {subject:"validate-password-result", value: "no"})
        } 
    }

});

onmessage = function(e) {
    let login = e.data[0];
    let password = e.data[1];

    let authFlag = false;

    users.forEach(function (item, index) {
        console.log(item.login +" + "+ item.password)

        if(item.login == login && item.password == password) {
            authFlag = true;
        }
    });

    if(authFlag == true){
        postMessage(login + " autheticated");
        publish(clientType, {subject: "authetication", value: login})
    }
    else postMessage("wrong credentials");
    
    
  }
