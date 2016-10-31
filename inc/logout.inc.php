<?php
include_once 'sessionStart.php';
sec_session_start();

// delete all session values
$_SESSION = array();

// get session parameters
$params = session_get_cookie_params();


setcookie(session_name(),
        '', time() - 42000,
        $params["path"],
        $params["domain"],
        $params["secure"],
        $params["httponly"]);

// Destroy session
session_destroy();
header('Location: ../index.php');
