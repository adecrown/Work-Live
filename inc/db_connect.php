<?php
include_once 'config.php';
try {
    $conn = new PDO("mysql:host=".HOST.";dbname=".DATABASE, USER, PASSWORD);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected successfully";
    }
catch(PDOException $e)
    {
    echo "Connection failed: " . $e->getMessage();
    echo "    Code". $e->getCode();
    }
?>
