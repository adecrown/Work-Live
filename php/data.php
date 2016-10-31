<?php

if(isset($_GET['functionName']))
{
  $myID = $_GET['myid'];
  $folID = $_GET['otherid'];
  $pd = $_GET['pd'];
  $val = $_GET['val'];
  $filename = $_GET['name'];
  $filelink = $_GET['link'];
  $groupid = $_GET['gid'];
  $quesID= $_GET['questionid'];

  $myUsername = $_GET['username'];
  $myPassword = $_GET['password'];

  switch($_GET['functionName'])
  {
    case 'followCallm': userfollowCall($myID,$folID,$pd); break;
    case 'followCallsub': subjectfollowCall($myID,$folID,$pd); break;
    case 'files': fileProtectCall($myID,$val); break;
    case 'questionclose': closequestion($quesID); break;
    case 'store': addfilefromOthers($filename,$filelink,$myID); break;
    case 'togroup': addfiletogroup($filename,$filelink,$myID,$groupid); break;
    default: break;
  }
}

?>
