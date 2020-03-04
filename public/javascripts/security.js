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
    }
    else postMessage("wrong credentials");
    
    
  }
