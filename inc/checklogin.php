<?php
include_once 'db_connect.php';
include_once 'sessionStart.php';

sec_session_start();

if (login_check() == false) {
    $logged = 'out';
    header("Location: ../login.html");
    exit();
}
?>
