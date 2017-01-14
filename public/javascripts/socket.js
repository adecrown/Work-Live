// Connect to the nodeJs Server
io = io.connect('/');
//io = io.connect(window.location.hostname);
// (1): Send a ping event with
// some data to the server
console.log( "socket: browser says ping (1)" )
io.emit('ping', { some: 'data' } );


io.on('connect', function(){
	// call the server-side function 'adduser' and send one parameter (value of prompt)
	//io.emit('adduser', prompt("What's your name?"),prompt("What's your id?"));

	//if(tId === undefined)
	if (typeof tId != 'undefined')
	{
	//	io.emit('adduser',tId2,tId,""); //teachers (dash.ejs) user id as the session id
		io.emit('adduser',tId,tId2,""); //teachers (dash.ejs) username as the session id
	}
	else {
		if (typeof checkOn != 'undefined')
		{
			io.emit('adduser',tName,tsessionId,checkOn);
		}
		else
		{

			io.emit('adduser', prompt("What's your name?"),myId,joiningSession);// students (student.ejs)
		}
	}
});

// (4): When the browser recieves a pong event
// console log a message and the events data
io.on('pong', function (data) {
	console.log( 'socket: server said pong (4)', data );
});


io.on('updatechat', function (username, data) {
	//console.log("gunt");
	console.log(username,data);
	if (typeof checkOn != 'undefined' || typeof joiningSession != 'undefined' )
	{
		alert(data);
	}

	//$('#conversation').append('<b>'+username + ':</b> ' + data + '<br>');
});

io.on('notifyTeacher', function (username, data) {
	console.log(username, data);
	var student = data;
	//document.getElementById('board').innerHTML = "<a href='http://"+window.location.hostname+"/views/sview.php?room="+student.room+"'> "+student.name+" </a>";
	var result = "<a href='http://"+window.location.hostname+":8081/sviewt?room="+student.room+"'> "+student.name+" </a>";
	htmlAppend("board","div",result);

});
