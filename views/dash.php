<?php
include_once '../inc/checklogin.php';
?>

<!doctype html>
<html>

<head>
  <meta charset="UTF-8">

  <title>Work Live</title>
  <!--<script src="../js/inline.js"></script>-->
  <link rel="stylesheet" href="../css/dash.css">
  <script src="http://104.199.78.66:8081/socket.io/socket.io.js"></script>

</head>

<body>
  <section class="outer_body">
    <section class="inner_body">
      <div class="dashboard" id="dashboard">
        <div id="board">
        </div>
      </div>
      <div class="jumbotron">
      </div>
      <div class="controls">
        <div class="vb">
          <button name="mDraw" id="sendIt" class="round red" value="<?php echo $_SESSION['user_id'] ; ?>">Draw
            <span class="round"></span>
          </button>
        </div>
        <div class="vb">
          <button name="mDrawSession" id="mDrawSession" class="round green" value="<?php echo $_SESSION['username'] ; ?>">Begin
            <span class="round"></span>
          </button>
        </div>


      </div>
      <div class="drawtm">
        f
        <?php echo $_SESSION['user_id'] ; ?>
        <?php echo $_SESSION['username'] ; ?>

      </div>


    </section>
  </section>
  <!-- <script src="wbs.js"></script>
  <script src="teacher.js"></script>-->
  <script src="../js/teacher.js"></script>
  <script src="../public/javascripts/socket.js"></script>
</body>

</html>
