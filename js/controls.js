
function __(id)
{
  return document.getElementById(id);
}


var canvas = new fabric.Canvas('c', {
  isDrawingMode: true,
  //backgroundColor: 'white',
  //  selectionColor: 'blue',
  //  selectionLineWidth: 5
});
canvas;

/// ////////////////////////////////////////////////////
///
///                     CONTROLS                 ////
///
/// ///////////////////////////////////////////////////
/// ////////////////////////////////////////////////////


var board_color = document.getElementById('white-box');

function randomColour()
{
  var latters = 'ABCDEF1234567890'.split("");
  var colour = '#';
  for (var i=0; i < 6; i++)
  {
    colour+=latters[Math.floor(Math.random() * 16)];

  }

  canvas.backgroundColor = colour;
  canvas.renderAll();
  document.getElementById("drawing-background-color").value = colour ;
  //  document.getElementById("white_board_c").style.background = color ;
}

document.getElementById("randColour").addEventListener("click", randomColour);



// clear the canvas
function clearCanvas()
{
  canvas.clear();
}
__("resetBtnB").addEventListener("click", clearCanvas);



document.getElementById("white_board_c").onclick = function fun() {
  var gh = canvas._isCurrentlyDrawing;
  if(gh == true)
  {
    console.log("moving");
  }
}


// show all drawing-options
var show  = true;
function showMode()
{
  if(show == true)
  {
    document.getElementById('drawing-options').style.display = '';
    document.getElementById('editColour').style.backgroundColor = '#cd6a51';
    document.getElementById('eraseBtn').style.backgroundColor = '';
    show  = false;
  }
  else {
    document.getElementById('drawing-options').style.display = 'none';
    document.getElementById('editColour').style.backgroundColor = '';
    show  = true;
  }
}
__("editColour").addEventListener("click", showMode);


var showEdit  = true;
function showModeWidth()
{
  if(showEdit == true)
  {
    document.getElementById('drawing-width').style.display = '';
    showEdit  = false;
  }
  else {
    document.getElementById('drawing-width').style.display = 'none';
    showEdit  = true;
  }
}
__("editWidth").addEventListener("click", showModeWidth);


var showEditShadow  = true;
function showModeShadow()
{
  if(showEditShadow == true)
  {
    document.getElementById('drawing-shadow').style.display = '';
    showEditShadow  = false;
  }
  else {
    document.getElementById('drawing-shadow').style.display = 'none';
    showEditShadow  = true;
  }
}
__("editShadow").addEventListener("click", showModeShadow);



var savingOp = true;
document.getElementById('saveImageBtnB2').addEventListener('click', function() {
  if(savingOp == true)
  {
    document.getElementById('saving-options').style.display = '';
    savingOp = false;
  }
  else {
    document.getElementById('saving-options').style.display = 'none';
    savingOp = true;
  }
});


var imageSaver = document.getElementById('saveImageBtnB');
imageSaver.addEventListener('click', saveImage, false);
function saveImage(e) {
  this.href = canvas.toDataURL({
    format: 'png',
    quality: 0.8
  });
  this.download = 'canvas.png'
}

document.getElementById('plusCursor').addEventListener('click', function() {
  canvas.isDrawingMode =true;
});
document.getElementById('dragCursor').addEventListener('click', function() {
  canvas.isDrawingMode =false;
});

document.getElementById('textBtn').addEventListener('click', function() {
  callText();
});

function callText()
{
  canvas.add(new fabric.IText('Tap and Type', {
    fontFamily: 'arial black',
    left: 100,
    top: 100 ,
  }));
  canvas.moveTo(0, 5);
  canvas.isDrawingMode =false;
}

function redirect(id)
{
  window.location = "#"+id;
}
