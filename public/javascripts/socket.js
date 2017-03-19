
// Connect to the nodeJs Server
io = io.connect('/');
//io = io.connect(window.location.hostname);
// (1): Send a ping event with
// some data to the server
console.log( "socket: browser says ping (1)" )
io.emit('ping', { some: 'data' } );

var getpage = getUr(document.URL,"/",1);
var pageName = getUr(getpage,"?",2);

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
			var wName;
			if(pageName != "live")
			{
				//	wName = prompt("What's your name?");
				wName=getCookie("displayName");


				if(typeof joiningSession != 'undefined')
				{

					io.emit('adduser', wName,myId,joiningSession);// students (student.ejs)
				}
			}
			//create cookie
			var d = new Date();
			d.setTime(d.getTime() + (1*24*60*60*1000));
			var expires = "expires="+ d.toUTCString();
			document.cookie = "usName" + "=" + wName + ";" + expires + ";path=/";

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
		var words = data.split(' ');
		if(pageName != "live" && words[0] != "null")
		{
			div = document.createElement("div");
			div.className= "rm alert info";
			div.innerHTML = '<span class="closebtn">&times;</span>'+'<strong>Info! </strong>'+data;
			document.body.appendChild(div);
			closeAb();
		}
		//	alert(data);
	}

	//$('#conversation').append('<b>'+username + ':</b> ' + data + '<br>');
});

io.on('notifyTeacher', function (username, data) {
	console.log(username, data);
	var student = data;

	var result = "<a target='_blank' id="+student.room+" href='http://"+window.location.hostname+":8081/sviewt?room="+student.room+"'> <button type='button' class='namebox btn btn-success'>"+student.name+"</button> </a>";
	htmlAppend("board","div",result);

});

io.on('removenotifyTeacher', function (username, data) {
	console.log(username, data);
	var student = data;
	console.log(student.room);
	var elem = document.getElementById(student.room);
	elem.parentNode.removeChild(elem);
});

function closeAb()
{
	var close = document.getElementsByClassName("closebtn");
	var i;
	for (i = 0; i < close.length; i++) {
		/*setTimeout(function () {
		document.getElementById('foo').style.display='none';
	}, 10000);
	return false;*/
	close[i].onmousemove = function(){
		var div = this.parentElement;
		div.style.opacity = "0";
		setTimeout(function(){ div.style.display = "none"; }, 800);
	}
}
}

/*
function closeAb()
{
var close = document.getElementsByClassName("closebtn");
var i;
for (i = 0; i < close.length; i++) {
close[i].onclick = function(){
var div = this.parentElement;
div.style.opacity = "0";
setTimeout(function(){ div.style.display = "none"; }, 600);
}
}
}*/
function getUr(which,slash,position)
{
	var full_url = which; // Get current url
	var url_array = full_url.split(slash) // Split the string into an array with # as separator
	var last_segment = url_array[url_array.length-position];  // Get the last part of the array (-1)
	return last_segment;
}
