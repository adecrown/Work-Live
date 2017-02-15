/*var full_url = document.URL; // Get current url
var url_array = full_url.split('=') // Split the string into an array with # as separator
var last_segment = url_array[url_array.length-1];  // Get the last part of the array (-1)
console.log(last_segment);
*/



function getUr(which,slash,position)
{
  var full_url = which; // Get current url
  var url_array = full_url.split(slash) // Split the string into an array with # as separator
  var last_segment = url_array[url_array.length-position];  // Get the last part of the array (-1)
  return last_segment;
}
var getpage1 = getUr(document.URL,"/",1);
var pageName1 = getUr(getpage1,"?",2);

if(pageName1 != "live")
{
  if(getCookie("displayName") == "" && getCookie("joinRoom") == "")
  {
    window.location.href = '/set';
  }
}

var tsessionId;
var myId = Math.floor((Math.random() * 200) + 100);
var switchSessionID = getUr(document.URL,"/",1);
console.log(switchSessionID);
if(switchSessionID == "sview")
{
  //tsessionId = prompt("Session id");
  tsessionId = getCookie("joinRoom");
}
else {
  tsessionId = getUr(document.URL,"=",1);
}
var checkOn;
var tName;

if(document.getElementById('md').value =="")
{
  checkOn = myId;
  if(pageName1 != "live")
  {
    //tName = prompt("What's your name?");
    tName=getCookie("displayName");
  }
}
else
{
  checkOn=document.getElementById('md').value;
  tName = "Teacher";
}

createCookie("usName",tName, 1);
/////////////////////////////////////////////
////////////////////////////////////////////
//create cookie
/*var d = new Date();
d.setTime(d.getTime() + (1*24*60*60*1000));
var expires = "expires="+ d.toUTCString();
document.cookie = "usName" + "=" + tName + ";" + expires + ";path=/";
*/
///////////////////////////////////////////////
//////////////////////////////////////////////

function createCookie(name, data, exp)
{
  var d = new Date();
  d.setTime(d.getTime() + (exp*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = name + "=" + data + ";" + expires + ";path=/";
}


console.log(checkOn+" teacher id");
if(pageName1 != "live")
{
  document.getElementById("sOline").onclick = function()
  {
    div = document.createElement("div");
    div.id ="alertc"
    div.className= "alert info";
    div.innerHTML = '<span class="closebtn">&times;</span>'+'<strong>Info!</strong> Share this link: 127.0.0.1:8081/live?id='+tsessionId;
    document.body.appendChild(div);
    closeAb();
    //alert("You always view you drawing here: 127.0.0.1:8081/live?id="+tsessionId);
  }


  document.getElementById("sVt").onclick = function()
  {
    div = document.createElement("div");
    div.id ="alertc"
    div.className= "alert info";
    div.innerHTML = '<span class="closebtn">&times;</span>'+'<strong>Info!</strong> Your friends can join you on this seesion through this link: 127.0.0.1:8081/set and the id is '+tsessionId;
    document.body.appendChild(div);
    closeAb();
    //alert("Your friends can join you on this seesion through this link: 127.0.0.1:8081/sview?id="+myId);
  }
}

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

  //var cv = prompt("id");
  xhr.open("GET", "/sviewStudent?id="+tsessionId, false);
  xhr.send();
};

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

if(pageName1 != "live")
{
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
}
/*
var myTeacherId = last_segment;
var myId = Math.floor((Math.random() * 200) + 100);
console.log(myId);
wsConnect(myId,myTeacherId,myId,"hummm");
*/
