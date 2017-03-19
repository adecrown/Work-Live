if(getCookie("displayName") == "")
{
  window.location.href = '/set';
}

var full_url = document.URL; // Get current url
var url_array = full_url.split('=') // Split the string into an array with # as separator
var last_segment = url_array[url_array.length-1];  // Get the last part of the array (-1)
console.log(last_segment);
//var myId = Math.floor((Math.random() * 200) + 100);
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
div.innerHTML = '<span class="closebtn">&times;</span>'+'<strong>Info!</strong> Your friends can join you on this seesion through this link: 127.0.0.1:8081/set and the id is '+myId;
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
//var joiningSession = prompt("Session id");
var joiningSession = getCookie("joinRoom");
function loadJSON()
{
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function()
  {
    if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200)
    {

      console.log(xhr.responseText);
      paper.project.importJSON(xhr.responseText);

    }
  }


  xhr.open("GET", "/studg?id="+joiningSession, false);
  xhr.send();
};

//var joiningSession =last_segment;
console.log(joiningSession);


function getCookie(cname)
{
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length,c.length);
    }
  }
  return "";
}


div = document.createElement("div");
div.className= "chngName";
div.innerHTML = '<p id="chngName">Change name: '+getCookie("displayName")+' or Sessoin: '+getCookie("joinRoom")+'</p>';
document.body.appendChild(div);

document.getElementById('chngName').onclick = function()
{
  createCookie("displayName","", 1);
  createCookie("joinRoom","", 1);
  window.location.href = '/set';
}

function createCookie(name, data, exp)
{
  var d = new Date();
  d.setTime(d.getTime() + (exp*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = name + "=" + data + ";" + expires + ";path=/";
}
/*
var myTeacherId = last_segment;
var myId = Math.floor((Math.random() * 200) + 100);
console.log(myId);
wsConnect(myId,myTeacherId,myId,"hummm");
*/


/*
function solution(N) {
    // write your code in JavaScript (Node.js 6.4.0)
    var count = 0;
    for (i = 0; i < N; i++) {
    var num = i+1;
    var digits = num.toString().split('');
    //console.log(digits)
    for (b = 0; b < digits.length; b++) {
      //console.log(digits[b]);
    if(digits[b] == "1")
    {
   count = count + 1;
 }
  }
}
console.log(count);
}


function solution(S) {
    // write your code in JavaScript (Node.js 6.4.0)]
    var pass = S.split('');
    var word ="";
    for (b = 0; b < pass.length; b++) {
      var num = isNaN(pass[b]);
      if (num)
      {

        for (c = b+2; c < pass.length; c++) {
          //  console.log(b);
          console.log(pass[c]);
          word = word.concat(pass[c]);
      }
      break;
    }

}
var val =umpper(word);
if (val != "")
{
  return word;
}
else {
  return -1
}

}


function umpper(text)
{
  var positions = [];
for(var i=0; i<text.length; i++){
    if(text[i].match(/[A-Z]/) != null){
        positions.push(i);
    }
}
return positions ;
}
*/
