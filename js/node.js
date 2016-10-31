



// node sender
canvas._onMouseMove = function(e) {
  if(canvas._isCurrentlyDrawing == true)
  {
    //console.log("ok");
    //getMouseCoords(e);
    //  console.log(canvas.freeDrawingBrush);
    //jsonDownloadJ();
  }
};


function getMouseCoords(event)
{
  var pointer = canvas.getPointer(event.e);
  var posX = pointer.x;
  var posY = pointer.y;
  console.log(posX+", "+posY);    // Log to console
}
