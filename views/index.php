<!doctype html>
<html>
<head>
  <title>df</title>
  <link rel="stylesheet" href="../public/stylesheets/style.css">
  <script src="http://104.199.78.66:8081/socket.io/socket.io.js"></script>

</head>
<body style="padding:0">
  <section>

    <div>
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
  <script src="../js/student.js"></script>
  <script src="../public/javascripts/socket.js"></script>
  <script src="../public/javascripts/paper.js"></script>
</body>
</html>
