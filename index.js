var express  = require('express');
var app = express();
const path = require('path');
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const router = express.Router();

// serving static files
app.use(express.static('public'), function(req,res,next){	
    next();
})

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/public/index.html'));
 });

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
  console.log('a user connected');
});

// server init 
http.listen(port = process.env.PORT || 80, function(){
  var host = http.address().address
  var port = http.address().port
  console.log("Example app listening at http://%s:%s", host, port)
});