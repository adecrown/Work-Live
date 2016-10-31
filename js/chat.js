
// creates a new element
function htmlAppend(element,result)
{
  var docName = document.getElementById('chatMessage');
  var newElements = document.createElement(element);
  newElements.innerHTML = result;

  for(var i = 0;i < newElements.innerHTML.length;i++)
  {
    docName.appendChild(newElements);
  }
}


//display message to all user.
function sendMessage(sender)
{
  var message = document.getElementById('chatText').value;
  var fix;
  if(sender=="others")
  {
    fix = '<p class="byothers">'+message+'</p>'
  }
  else
  {
    fix = '<p class="byme">'+message+'</p>'
  }
  htmlAppend("div",fix);
}
// calls the sendMessage function
var messageSend = document.getElementById('sendIt');
messageSend.addEventListener('click', sendMessage, false);
