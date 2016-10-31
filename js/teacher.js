/*var full_url = document.URL; // Get current url
var url_array = full_url.split('#') // Split the string into an array with # as separator
var last_segment = url_array[url_array.length-1];  // Get the last part of the array (-1)
console.log(last_segment);

var myTeacherId = last_segment;
var myId = Math.floor((Math.random() * 10) + 1);
wsConnect(myId);
*/

console.log(tId);
var tId = document.getElementById('sendIt').value;
var tId2 = document.getElementById('mDrawSession').value;



// creates a new element
function htmlAppend(id,element,result)
{
  var docName = document.getElementById(id);
  var newElements = document.createElement(element);
  newElements.innerHTML = result;

  for(var i = 0;i < newElements.innerHTML.length;i++)
  {
    docName.appendChild(newElements);
  }
}

//wsConnect(tId);
