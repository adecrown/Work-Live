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
  tName = "TEACHER191";
}

console.log(checkOn+" teacher id");


/*
var myTeacherId = last_segment;
var myId = Math.floor((Math.random() * 200) + 100);
console.log(myId);
wsConnect(myId,myTeacherId,myId,"hummm");
*/
