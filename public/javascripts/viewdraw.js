paper.install(window);
if(typeof joiningSession !== 'undefined')
{
  saveCode();
}


function uploadCode()
{
  if(typeof tsessionId !== 'undefined')
  {
    paper.project.importJSON(getTest);
    console.log("json collected from database");
  }

  else if (typeof getjsonC !== 'undefined') {
    //  console.log(getjsonC);
    paper.project.importJSON(getjsonC);
    console.log("json collected from database");
  }

  else if (typeof myTeachersLastD !== 'undefined') { // dasj.ejs
    if(checkCookie("checking"))
    {
      loadFromCookie();
    }
  }

}
uploadCode();



function loadFromCookie()
{
  var answer = confirm("Would you like to load your previous drawing?")
  if (answer)
  {
    var jsdata = localStorage.getItem("pdata");
    paper.project.importJSON(jsdata);
    console.log("json collected from cookie");
  }
}
