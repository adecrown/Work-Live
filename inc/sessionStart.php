
<?php
include_once 'config.php';


$hun = "";

function sec_session_start() {
  $session_name = 'sec_session_id';
  //$secure = SECURE;
  // This stops JavaScript being able to access the session id.
  $httponly = true;
  // Forces sessions to only use cookies.
  if (ini_set('session.use_only_cookies', 1) === FALSE) {
    echo "Something went wrong";
    exit();
  }
  // Gets current cookies params.
  $cookieParams = session_get_cookie_params();
  //print_r ($cookieParams);
  session_set_cookie_params(7200,"/");
  /*

   session_set_cookie_params($cookieParams["lifetime"],
   $cookieParams["path"],
    $cookieParams["domain"],
    SECURE,
   $httponly);
   */
  // Sets the session name to the one set above.
  session_name($session_name);
  session_start();
  session_regenerate_id(true);

}

function login($username, $password, $conn) {

  $sql = 'SELECT userID, username, password FROM users WHERE username =:user AND password =:pass';
  $sqlArray = array(':user' => $username, ':pass' => $password);

  $stmt = $conn->prepare($sql);
  $stmt->execute($sqlArray);

  $result = $stmt->fetch();
  if($result > 0)
  {
    $user_browser = $_SERVER['HTTP_USER_AGENT'];
    $user_id = $result['userID'];
    $_SESSION['user_id'] = $user_id;
    $_SESSION['username'] = ucfirst($username);

    //  $_SESSION['userID'] = userID;
    $_SESSION['login_string'] = $password;
    // Login successful.
    return true;
  }
  else {
    return false;
  }



}



function login_check() {
  // Checks if user is logged in
  if (isset($_SESSION['user_id'],$_SESSION['username'],$_SESSION['login_string']))
  {
    return true;
  }
  else
  {
    return false;
  }
}


?>
