<?php
include_once 'db_connect.php';
include_once 'sessionStart.php';

sec_session_start();

$out = "";
if (isset($_GET['username'], $_GET['password'])) {
    $username = $_GET['username'];
    $password = $_GET['password'];

    //$res = login($username, $password, $conn);
global $conn;

    if (login($username, $password, $conn) == true )
    {
        // Login success
        header('Location: ../index.html');

    }
    else if ($hun === "yes")
    {
        header('Location: ../login.php?error2');
    }
    else
     {
        // Login failed
        if($warnLocked != "")
        {

        }

        header('Location: ../login.php?error1');
    }
}
else
 {
    // The correct POST variables were not sent to this page.
    echo 'Invalid Request';
}
