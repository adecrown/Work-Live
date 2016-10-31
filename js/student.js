var full_url = document.URL; // Get current url
var url_array = full_url.split('#') // Split the string into an array with # as separator
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


var myId = Math.floor((Math.random() * 200) + 100);
console.log(myId);





/*
var myTeacherId = last_segment;
var myId = Math.floor((Math.random() * 200) + 100);
console.log(myId);
wsConnect(myId,myTeacherId,myId,"hummm");
*/
