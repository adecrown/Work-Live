
// Express requires these dependencies
var express = require('express')
, http = require('http')
, path = require('path')
, flash    = require('connect-flash')
, mongoose = require('mongoose')
, morgan       = require('morgan')
, cookieParser = require('cookie-parser')
, bodyParser   = require('body-parser')
, session      = require('express-session')
, passport = require('passport');



var app = express();



var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration


// Configure our application
app.configure(function(){
  app.set('port', process.env.PORT || 8081);
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  //app.use(app.router);
  app.use(express.cookieParser());
  //  app.use(express.session({secret: '1234567890QWERTY'}));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.static(path.join(__dirname, 'js')));
  app.use(express.static(path.join(__dirname, 'css')));
  // required for passport
  // ilovescotchscotchyscotchscotch
  app.use(session({ secret: 'worklive' })); // session secret
  app.use(passport.initialize());
  app.use(passport.session()); // persistent login sessions
  app.use(flash()); // use connect-flash for flash messages stored in session

  // set up our express application
  app.use(morgan('dev')); // log every request to the console
});

// Configure error handling
app.configure('development', function(){
  app.use(express.errorHandler());
});




//require('./routes/index.js')(routes, passport); // load our routes and pass in our app and fully configured passport

require('./routes/routes.js')(app,passport);


// Enable Socket.io
var server = http.createServer(app).listen( app.get('port') );
var io = require('socket.io').listen( server );

var usernames = {};

// rooms which are currently available in chat
var rooms = ['room1','room2'];
var sendUser;

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
    sendUser = username;
    // send client to the room
    socket.join(room);
    // echo to client they've connected
    socket.emit('updatechat', 'SERVER', 'you have connected to your room number for this session. Room '+room);

    if(sId != "")
    {
      socket.sid = sId;
      socket.broadcast.to(sId).emit('updatechat', 'SERVER', username + room + ' has connected to this room');
      var text =  {
        "name": "" + username + "",
        "room": "" + room + ""
      };

      socket.broadcast.to(sId).emit('notifyTeacher', 'SERVER', text);
    }

    // echo to the given room that a person has connected to their room
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

  socket.on( 'draweraser', function( data, session ) {

    console.log( "session " + session + " erase:");
    console.log( data );

    //socket.in.emit( 'drawCircle', data );
    io.sockets.in(socket.room).emit( 'draweraser', data );
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
   //io.sockets.in(socket.room).emit( 'drawLine', data );
   socket.broadcast.to(socket.room).emit( 'drawLine', data );

  });


  socket.on( 'imageHold', function( data, session ) {

    console.log( "session " + session + " uploaded:");
    console.log( data );

    io.sockets.in(socket.room).emit( 'imageHold', data );

  });



  socket.on( 'clearCan', function( data, session ) {

    console.log( "session " + session + " cleared");
    console.log( data );

    io.sockets.in(socket.room).emit( 'clearCan', data );

  });

  socket.on( 'drawBrush', function( data, session ) {

    console.log( "session " + session + " drew:");
    console.log( data );

    //socket.in.emit( 'drawCircle', data );
    io.sockets.in(socket.room).emit( 'drawBrush', data );
    //socket.broadcast.emit( 'drawCircle', data );

  });

  socket.on( 'drawText', function( data, session ) {

    console.log( "session " + session + " drew:");
    console.log( data );

    //io.sockets.in(socket.room).emit( 'drawText', data );
    socket.broadcast.to(socket.room).emit( 'drawText', data );


  });

  /*
  socket.on( 'showName', function( data, session ) {

  console.log( "session " + session + " name:");
  console.log( data );

  io.sockets.in(socket.room).emit( 'showName', data ,sendUser);


});
*/
socket.on( 'removeName', function( data, session ) {

  console.log( "session " + session + " name:");
  console.log( data );

  io.sockets.in(socket.room).emit( 'removeName', data ,sendUser);


});

socket.on( 'drawLock', function( data, session ) {

  console.log( "session " + session + " name:");
  console.log( data );
socket.broadcast.to(socket.room).emit( 'drawLock', data ,sendUser);
  //io.sockets.in(socket.room).emit( 'drawLock', data ,sendUser);


});


socket.on( 'changeBg', function( data, session ) {

  console.log( "session " + session + " colour:");
  console.log( data );

  io.sockets.in(socket.room).emit( 'changeBg', data );


});


socket.on('disconnect', function () {
  console.log(socket.room);
  console.log(socket.username);
  console.log(socket.sid);

  if (socket.sid !="") {
    var text =  {
      "room": "" + socket.room + ""
    };
    socket.broadcast.to(socket.sid).emit('removenotifyTeacher', 'SERVER', text);
  }

  socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username + ' has left room');
  socket.emit('updaterooms', rooms, socket.room);
});

});
