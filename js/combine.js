/*
function getUr(which,slash,position)
{
  var full_url = which; // Get current url
  var url_array = full_url.split(slash) // Split the string into an array with # as separator
  var last_segment = url_array[url_array.length-position];  // Get the last part of the array (-1)
  return last_segment;
}
var getpage1 = getUr(document.URL,"/",1);
var pageName1 = getUr(getpage1,"?",2);
var tsessionId;

if(getpage1 == "sview")
{
  tsessionId = prompt("Session id");
}
else {
  tsessionId = getUr(document.URL,"=",1);
}


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



if(pageName1 != "live")
{
  var theId;
  if(getpage1 == "sview")
  {

    theId = tsessionId;
  }
  else {
    theId = myId;
  }
  console.log(theId);
  document.getElementById("sOline").onclick = function()
  {
    div = document.createElement("div");
    div.id ="alertc"
    div.className= "alert info";
    div.innerHTML = '<span class="closebtn">&times;</span>'+'<strong>Info!</strong> Share this link: 127.0.0.1:8081/live?id='+theId;
    document.body.appendChild(div);
    closeAb();

    //alert("You always view you drawing here: 127.0.0.1:8081/live?id="+theId);
  }


  document.getElementById("sVt").onclick = function()
  {
    div = document.createElement("div");
    div.id ="alertc"
    div.className= "alert info";
    div.innerHTML = '<span class="closebtn">&times;</span>'+'<strong>Info!</strong> Your friends can join you on this seesion through this link: 127.0.0.1:8081/sview and the id is '+theId;
    document.body.appendChild(div);
    closeAb();
    //alert("Your friends can join you on this seesion through this link: 127.0.0.1:8081/sview?id="+myId);
  }

}
*/

console.log("DFVFVf");
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function()
{
  if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200)
  {

    console.log(xhr.responseText);
    paper.project.importJSON(xhr.responseText);
  }
}


xhr.open("GET", "/sviewStudent?id=9U4nw", false);
xhr.send();
