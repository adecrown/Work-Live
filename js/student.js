var full_url = document.URL; // Get current url
var url_array = full_url.split('=') // Split the string into an array with # as separator
var last_segment = url_array[url_array.length-1];  // Get the last part of the array (-1)
console.log(last_segment);
var myId = Math.floor((Math.random() * 200) + 100);
var sessionId;
var sessionName;

/*document.getElementById('joinSession').onclick = function()
{
sessionId = document.getElementById('sessionID').value;
sessionName = document.getElementById('sessionName').value;
var myId = Math.floor((Math.random() * 200) + 100);
wsConnect(myId,sessionId,myId,sessionName);
redirect("missionJoin");
};*/



function makeid()
{
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for( var i=0; i < 5; i++ )
  text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
//var myId = Math.floor((Math.random() * 200) + 100);
var myId = makeid();
console.log(myId);


document.getElementById("sOline").onclick = function()
{

  div = document.createElement("div");
  div.id ="alertb"
  div.className= "alert info";
  div.innerHTML = '<span class="closebtn">&times;</span>'+'<strong>Info!</strong> You can always view your drawing here: 127.0.0.1:8081/live?id='+myId;
  document.body.appendChild(div);
  closeAb();
  //alert("You can always view your drawing here: 127.0.0.1:8081/viewpoint?id="+myId);
}

document.getElementById("sVt").onclick = function()
{
div = document.createElement("div");
div.id ="alertc"
div.className= "alert info";
div.innerHTML = '<span class="closebtn">&times;</span>'+'<strong>Info!</strong> Your friends can join you on this seesion through this link: 127.0.0.1:8081/sview?id='+myId;
document.body.appendChild(div);
closeAb();
  //alert("Your friends can join you on this seesion through this link: 127.0.0.1:8081/sview?id="+myId);
}

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
}




/*var joiningSession = prompt("Session Id?");
console.log(joiningSession);
var teacherFindID = joiningSession;
*/
var joiningSession =last_segment;
console.log(joiningSession);
/*
var myTeacherId = last_segment;
var myId = Math.floor((Math.random() * 200) + 100);
console.log(myId);
wsConnect(myId,myTeacherId,myId,"hummm");
*/
