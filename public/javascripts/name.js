var joinRoom, displayName;

//https://www.twiddla.com/mfwe4m
function __(id)
{
  return document.getElementById(id);
}


if(getCookie("displayName") != "" && getCookie("joinRoom") != "")
{
  __("sNam")
  refer2();
}

if(getCookie("displayName") != "")
{
  __("sName").value =getCookie("displayName");
}

__("subName").addEventListener("click", function(){
  displayName = __("sName").value;
  if(displayName)
  {
    createCookie("displayName",displayName, 1);
    joinRoom = __("tSession").value;
    createCookie("joinRoom",joinRoom, 1);

    refer2();
  }
  else {
    __("sNam").className="form-group has-error";
  }
});





function refer2()
{
  var whereto = document.getElementById('connectTo').value;
  if(whereto == "student")
  {
    if(joinRoom)
    {
      window.location.href = '/sview';
    }
    else {
      __("tSess").className="form-group has-error";
    }

  }
  else if(whereto == "teacher")
  {
    window.location.href = '/students';
  }
  else
  {
    window.location.href = document.referrer;
  }

  console.log(document.referrer);
}


function refer()
{
  if(document.referrer == "http://127.0.0.1:8081/")
  {
    //console.log(document.referrer);
    window.location.href = '/students';
  }
  else if (document.referrer == "http://127.0.0.1:8081/students" || document.referrer == "http://127.0.0.1:8081/sview") {

    window.location.href = document.referrer;
  }
  else {
    window.location.href = '/sview';
  }
  console.log(document.referrer);
}



function createCookie(name, data, exp)
{
  var d = new Date();
  d.setTime(d.getTime() + (exp*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = name + "=" + data + ";" + expires + ";path=/";
}



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
