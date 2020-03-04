// CODE FOR WINDOW / DOOR PROCESS

importScripts('/socket.io/socket.io.js');
importScripts('lib.js');

let photos = ["mountain","lake","family"];
let countPhotos = photos.length;

postMessage(countPhotos);

onmessage = function(e) {
    let photoName = e.data;
    photos.push(photoName);
    countPhotos ++;
    postMessage(countPhotos);
  }