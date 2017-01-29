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

var myId = Math.floor((Math.random() * 200) + 100);
var tsessionId = getUr(document.URL,"=",1);
var checkOn;
var tName;
var getpage1 = getUr(document.URL,"/",1);
var pageName1 = getUr(getpage1,"?",2);

if(document.getElementById('md').value =="")
{
  checkOn = myId;
  if(pageName1 != "live")
  {
    tName = prompt("What's your name?");
  }
}
else
{
  checkOn=document.getElementById('md').value;
  tName = "Teacher";
}


/////////////////////////////////////////////
////////////////////////////////////////////
//create cookie
var d = new Date();
d.setTime(d.getTime() + (1*24*60*60*1000));
var expires = "expires="+ d.toUTCString();
document.cookie = "usName" + "=" + tName + ";" + expires + ";path=/";

///////////////////////////////////////////////
//////////////////////////////////////////////

console.log(checkOn+" teacher id");
if(pageName1 != "live")
{
  document.getElementById("sOline").onclick = function()
  {
    alert("You always view you drawing here: 127.0.0.1:8081/live?id="+tsessionId);
  }


  document.getElementById("sVt").onclick = function()
  {
  div = document.createElement("div");
  div.id ="alertc"
  div.className= "alert info";
  div.innerHTML = '<span class="closebtn">&times;</span>'+'<strong>Info!</strong> Your friends can join you on this seesion through this link: 127.0.0.1:8081/sview?id='+tsessionId;
  document.body.appendChild(div);
  closeAb();
    //alert("Your friends can join you on this seesion through this link: 127.0.0.1:8081/sview?id="+myId);
  }
}


/*
var myTeacherId = last_segment;
var myId = Math.floor((Math.random() * 200) + 100);
console.log(myId);
wsConnect(myId,myTeacherId,myId,"hummm");
*/
