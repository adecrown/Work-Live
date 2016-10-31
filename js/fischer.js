window.onload = function() {
  redirect("missionCode");
};




var userChoiceChange = document.getElementById('userChoice');
function getUserChoice()
{
  var opt = userChoiceChange.options[userChoiceChange.selectedIndex];
  return opt.value;
}

function multipleSingle()
{
  var usersChoice = getUserChoice();
  if(usersChoice == "single")
  {
    // disable comments and node
    //var element = document.getElementsByClassName("chat-box")[0];
    //element.style.display = 'none';
  }
  else if (usersChoice == "group")
  {
    // enable comments and node
    redirect("missionCode");
  }
  else {
    // redisplay the options.
  }
  console.log(usersChoice);
}
userChoiceChange.addEventListener('change', multipleSingle, false);
