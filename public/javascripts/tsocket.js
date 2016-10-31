// Connect to the nodeJs Server
io = io.connect('http://'+window.location.hostname+':8081/');
//io = io.connect(window.location.hostname);
// (1): Send a ping event with
// some data to the server
console.log( "socket: browser says ping (1)" )
io.emit('ping', { some: 'data' } );

io.on('connect', function(){
		// call the server-side function 'adduser' and send one parameter (value of prompt)
		io.emit('adduser', prompt("What's your name?"),prompt("What's your id?"));

	});

// (4): When the browser recieves a pong event
// console log a message and the events data
io.on('pong', function (data) {
	console.log( 'socket: server said pong (4)', data );
});


io.on('updatechat', function (username, data) {
console.log(username, data);
		//$('#conversation').append('<b>'+username + ':</b> ' + data + '<br>');
	});
