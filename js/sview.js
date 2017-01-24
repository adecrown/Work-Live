var full_url = document.URL; // Get current url
var url_array = full_url.split('=') // Split the string into an array with # as separator
var last_segment = url_array[url_array.length-1];  // Get the last part of the array (-1)
console.log(last_segment);



var myId = Math.floor((Math.random() * 200) + 100);
var tsessionId = last_segment;
var checkOn;
var tName;
if(document.getElementById('md').value =="")
{
  checkOn = myId;
  tName = prompt("What's your name?");

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

document.getElementById("sOline").onclick = function()
{
  alert("You always view you drawing here: 127.0.0.1:8081/viewpoint?id="+last_segment);
}

document.getElementById("sVt").onclick = function()
{
  alert("Your friends can join you on this seesion through this link: 127.0.0.1:8081/sview?id="+last_segment);
}

/*
var myTeacherId = last_segment;
var myId = Math.floor((Math.random() * 200) + 100);
console.log(myId);
wsConnect(myId,myTeacherId,myId,"hummm");
*/
