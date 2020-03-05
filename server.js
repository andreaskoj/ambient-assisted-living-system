var express  = require('express');
var app = express();
const path = require('path');
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const router = express.Router();

//serving static files
app.use(express.static(__dirname + "/public/"), function(req,res,next){	
    next();
})

//routers
app.get('/house',function(req,res) {
    res.sendFile(path.join(__dirname+'/public/house.html'));
  });

app.get('/dashboard',function(req,res) {
    res.sendFile(path.join(__dirname+'/public/dashboard.html'));
});  

app.get('/log',function(req,res) {
    res.sendFile(path.join(__dirname+'/public/log.html'));
});

io.on('connection', function(socket){

  // messages from house
  socket.on('house', function(msg){
    console.log('Message from house: ' + msg.subject + ' ' + msg.value);

    //emitting to log
    io.emit('log', msg);
  });

  socket.on('dashboard', function(msg){
    console.log('Message from dashboard: ' + msg.subject + ' ' + msg.value);

    io.emit('dashboard', msg);
    io.emit('log', msg);
  });

  socket.on('validation-channel', function(msg){
    console.log('Message from validation-channel: ' + msg.subject + ' ' + msg.value);

    io.emit('validation-channel', msg);
    io.emit('log', msg);
  });
 
});

// server init 
http.listen(port = process.env.PORT || 3000, function(){
  var host = http.address().address
  var port = http.address().port
  console.log(`Listening on ${port}`);
});

