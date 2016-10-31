<?php
include_once 'db_connect.php';
include_once 'config.php';

$error_msg = "";

if (isset($_POST['username'],$_POST['useremail'], $_POST['password'], $_POST['school'],$_POST['usercourse'])) {
    // Sanitize and validate the data passed in
    $username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_STRING);
    $school = filter_input(INPUT_POST, 'school', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'useremail', FILTER_SANITIZE_EMAIL);
    $email = filter_var($email, FILTER_VALIDATE_EMAIL);
    $course = filter_input(INPUT_POST, 'usercourse', FILTER_SANITIZE_STRING);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Not a valid email
        $error_msg .= '<p class="error">The email address you entered is not valid</p>';
    }

    $password = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_STRING);

try{
    // check if the user has already registered
    $prep_stmt = "SELECT userID FROM users WHERE email = '$email'";
    $stmt = $conn->prepare($prep_stmt);
    $stmt->execute();
    $result = $stmt->fetchAll();

    if(count($result) > 0)
    {
      $error_msg .= '<p class="error">The email address you entered is taken</p>';
    }
    else
    {
      // check if the username is taken
      $prep_stmt = "SELECT userID FROM users WHERE username = '$username'";
      $stmt = $conn->prepare($prep_stmt);
      $stmt->execute();
      $result = $stmt->fetchAll();
      if(count($result) > 0)
      {
        $error_msg .= '<p class="error">This username is taken</p>';
        //echo $error_msg ;
      }
      else {
        // register the user
        $insert_stmt = "INSERT INTO users (username, email, password,school,course) VALUES ('$username', '$email', '$password', '$school', '$course')";
        if($conn->query($insert_stmt))
        {
          header('Location: ../login.php');
        }
        else {
          echo "something went wrong";
        }
      }
    }
}
catch(PDOException $e)
{
  echo "Connection failed: " . $e->getMessage();
  echo "    Code". $e->getCode();
}
}
?>
