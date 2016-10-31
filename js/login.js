

document.getElementById("submit").addEventListener("click", login);

function login()
{
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
//  console.log(username);

  var encodedParam ='/inc/login.inc.php?username='+username+'&password='+password;
  followRelation(encodedParam);
}


function followRelation(url) {
  var xhr, success, failure,obj;
  xhr = new XMLHttpRequest();


  xhr.open("POST",url,true);

  xhr.onload = function(e)
  {

  };
  xhr.send();
};
