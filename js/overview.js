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
