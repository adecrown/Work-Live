<?php
//include_once '../inc/checklogin.php';
include_once '../inc/db_connect.php';
include_once '../inc/sessionStart.php';

sec_session_start();
?>

<!doctype html>
<html>
<head>
  <title>ds</title>
  <link rel="stylesheet" href="../public/stylesheets/style.css">
  <script src="http://104.199.59.63:8081/socket.io/socket.io.js"></script>

</head>
<body style="padding:0">

  <section>

    <div>
      <button id="md" value="<?php echo $_SESSION['user_id'] ; ?>"></button>
      <button id="dCircle" class="dropbtn">Circle</button>

      <div class="dropdown">
        <button class="dropbtn">Lines</button>
        <div class="dropdown-content">
          <a id="dLine">Single Line</a>
          <a  id="dMulti">Multi Line</a>
          <a href="#">Link 3</a>
        </div>
      </div>

      <button id="dText" class="dropbtn">Text</button>


      <input type="color" value="#005E7A" id="drawing-color" class="cot-btn">

      <div class="dropdown">
        <button class="dropbtn">Brushes</button>
        <div class="dropdown-content">
          <a href="#">Link 3</a>
        </div>
      </div>
    </div>

    <canvas id="draw"  keepalive="true" resize="true"></canvas>
    <script>
    canvas="draw";
    </script>
  </section>


  <script src="../public/javascripts/draw.js" canvas="draw" type="text/paperscript"></script>
  <script src="../js/sview.js"></script>
  <script src="../public/javascripts/socket.js"></script>
  <script src="../public/javascripts/paper.js"></script>
</body>
</html>
