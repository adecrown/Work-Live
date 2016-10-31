
// Express requires these dependencies
var express = require('express')
, routes = require('./routes')
, user = require('./routes/user')
, http = require('http')
, path = require('path');

var app = express();

// Configure our application
app.configure(function(){
  app.set('port', process.env.PORT || 8081);
  app.set('views', __dirname + '/views');
  //  app.set('view engine', 'jade');
  //app.engine('html', require('ejs').renderFile);
  app.engine('.php', require('ejs').renderFile);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.static(path.join(__dirname, 'js')));
  app.use(express.static(path.join(__dirname, 'css')));
});

// Configure error handling
app.configure('development', function(){
  app.use(express.errorHandler());
});

// Setup Routes
//app.get('/', routes.index);
//app.get('/users', user.list);

app.get('/', function(req, res){
  res.render("index.php");
});

app.get('/dash', function(req, res){
  res.render("dash.php");
});

app.get('/sview', function(req, res){
  res.render("sview.php");
});

// Enable Socket.io
var server = http.createServer(app).listen( app.get('port') );
var io = require('socket.io').listen( server );

var usernames = {};

// rooms which are currently available in chat
var rooms = ['room1','room2','room3'];


// A user connects to the server (opens a socket)
io.sockets.on('connection', function (socket) {


  socket.on('adduser', function(username,room,sId){
    // store the username in the socket session for this client
    socket.username = username;
    // store the room name in the socket session for this client
    socket.room = room;
    // add the client's username to the global list
    usernames[username] = username;
    rooms[room] = room;
    // send client to room 1
    socket.join(room);
    // echo to client they've connected
    socket.emit('updatechat', 'SERVER', 'you have connected to room1');

    if(sId != "")
    {
      socket.broadcast.to(sId).emit('updatechat', 'SERVER', username + room + ' has connected to this room');
      var text =  {
        "name": "" + username + "",
        "room": "" + room + ""
      };

      socket.broadcast.to(sId).emit('notifyTeacher', 'SERVER', text);
    }
    // echo to room 1 that a person has connected to their room
    socket.broadcast.to(room).emit('updatechat', 'SERVER', username + ' has connected to this room');
    socket.emit('updaterooms', rooms, room);
  });




  // (2): The server recieves a ping event
  // from the browser on this socket
  socket.on('ping', function ( data ) {

    console.log('socket: server recieves ping (2)');

    // (3): Emit a pong event all listening browsers
    // with the data from the ping event
    io.sockets.emit( 'pong', data );

    console.log('socket: server sends pong to all (3)');

  });

  socket.on( 'drawCircle', function( data, session ) {

    console.log( "session " + session + " drew:");
    console.log( data );

    //socket.in.emit( 'drawCircle', data );
    io.sockets.in(socket.room).emit( 'drawCircle', data );
    //socket.broadcast.emit( 'drawCircle', data );

  });




  socket.on( 'drawMultiLine', function( data, session ) {

    console.log( "session " + session + " drew:");
    console.log( data );

    //socket.in.emit( 'drawCircle', data );
    io.sockets.in(socket.room).emit( 'drawMultiLine', data );
    //socket.broadcast.emit( 'drawCircle', data );

  });


  socket.on( 'drawLine', function( data, session ) {

    console.log( "session " + session + " drew:");
    console.log( data );

    //socket.in.emit( 'drawCircle', data );
    io.sockets.in(socket.room).emit( 'drawLine', data );
    //socket.broadcast.emit( 'drawCircle', data );

  });

  socket.on( 'drawText', function( data, session ) {

    console.log( "session " + session + " drew:");
    console.log( data );

    io.sockets.in(socket.room).emit( 'drawText', data );


  });

  /* socket.on('sendchat', function (data) {
  // we tell the client to execute 'updatechat' with 2 parameters
  io.sockets.in(socket.room).emit('updatechat', socket.username, data);
});*/

});