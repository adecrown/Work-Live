
// The faster the user moves their mouse
// the larger the circle will be
// We dont want it to be larger than this
tool.maxDistance = 50;


// Returns an object specifying a semi-random color
// The color will always have a red value of 0
// and will be semi-transparent (the alpha value)
function randomColor() {

  return {
    red: 0,
    green: Math.random(),
    blue: Math.random(),
    alpha: ( Math.random() * 0.25 ) + 0.05
  };

}

var wTool = "line";

function __(id)
{
  var doc  = document.getElementById(id);
  return doc;
}



__("dLine").onclick = function()
{

  wTool = "line";
}

__("dCircle").onclick = function()
{
  wTool = "circle";
}
__("dText").onclick = function()
{
  wTool = "text";
}
__("dMulti").onclick = function()
{
  wTool = "multiLine";
}





var pathio;

// every time the user drags their mouse
// this function will be executed
function onMouseDrag(event) {
  var maincolor = __("drawing-color").value;
  // Take the click/touch position as the centre of our circle
  var x = event.middlePoint.x;
  var y = event.middlePoint.y;

  if (wTool == "multiLine")
  {
    var dx = event.downPoint.x;
    var dy = event.downPoint.y;
    var lx = event.lastPoint.x;
    var ly = event.lastPoint.y;
    drawMultiLine(lx,ly,dx,dy,maincolor);
    emitMultiLine(lx,ly,dx,dy,maincolor);
  }
  else if (wTool == "circle")
  {


    // The faster the movement, the bigger the circle
    var radius = event.delta.length / 2;

    // Generate our random color
    var color = randomColor();

    // Draw the circle
    drawCircle( x, y, radius, color );

    // Pass the data for this circle
    // to a special function for later
    emitCircle( x, y, radius, color );
  }
  else if(wTool == "line")
  {
    drawLine2(event.point.x,event.point.y);
    emitLine(event.point.x,event.point.y,"",2)
  }


};


function onMouseDown(event) {
  var maincolor = __("drawing-color").value;
  if(wTool == "text")
  {
    console.log(event);
    var x = event.downPoint.x;
    var y = event.downPoint.y;

    var text = prompt("Your text");

    drawText(x,y,text,maincolor);
    emitText(x,y,text,maincolor);
  }
  else if(wTool == "line")
  {
    drawLine(event.point.x,event.point.y,maincolor);
    emitLine(event.point.x,event.point.y,maincolor,1)
  }
}








///////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
///////////////////                             /////////////////////
//////////////////   DRAW CIRCLE SECTION        ////////////////////
/////////////////                               ///////////////////
//////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

function drawCircle( x, y, radius, color ) {

  // Render the circle with Paper.js
  var circle = new Path.Circle( new Point( x, y ), radius );
  circle.fillColor = new RgbColor( color.red, color.green, color.blue, color.alpha );

  // Refresh the view, so we always get an update, even if the tab is not in focus
  view.draw();
}


// This function sends the data for a circle to the server
// so that the server can broadcast it to every other user
function emitCircle( x, y, radius, color ) {

  // An object to describe the circle's draw data
  var data = {
    x: x,
    y: y,
    radius: radius,
    color: color
  };
  emitPatterns('drawCircle',data);

}


// Listen for 'drawCircle' events
// created by other users
io.on( 'drawCircle', function( data ) {

  console.log( 'drawCircle event recieved:', data );

  // Draw the circle using the data sent
  // from another user
  drawCircle( data.x, data.y, data.radius, data.color );

})












///////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
///////////////////                             /////////////////////
//////////////////   DRAW LINE SECTION          ////////////////////
/////////////////                               ///////////////////
//////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

function drawLine(x,y,color)
{

  tool.minDistance = 10;
  pathio = new Path();
  pathio.strokeColor = color;

  // Add a segment to the path where
  // you clicked:

  pathio.add(x,y);
  console.log(event);

}



function drawLine2(x,y)
{
  // Every drag event, add a segment
  // to the path at the position of the mouse:
  pathio.add(x,y);
  view.draw();
}


function emitLine(x,y,color,which) {

  // An object to describe the circle's draw data
  var data;
  data = {
    x:x,
    y:y,
    c:color,
    w:which
  };

  //console.log(data);
  emitPatterns('drawLine',data);
}


io.on( 'drawLine', function( data ) {

  console.log( 'drawLine event recieved:', data );

  // Draw the line using the data sent
  // from another user

  if(data.w == 1)
  {
    drawLine(data.x,data.y,data.c);
  }
  else
  {
    drawLine2(data.x,data.y);
  }

})






///////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
///////////////////                             /////////////////////
//////////////////   DRAW MULTI LINE SECTION    ////////////////////
/////////////////                               ///////////////////
//////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


function drawMultiLine(x,y,lx,ly,color)
{
  //var from = new Point(x, ly);
  //var to = new Point(lx, y);
  var from = new Point(lx, ly);
  var to = new Point(x, y);
  var path = new Path.Line(from,to);
  path.strokeColor = color;
  view.draw();
}

function emitMultiLine(x,y,lx,ly,color) {

  // An object to describe the circle's draw data
  var data = {
    x: x,
    y: y,
    lx: lx,
    ly: ly,
    color: color
  };

  emitPatterns('drawMultiLine',data);
}

io.on( 'drawMultiLine', function( data ) {

  console.log( 'drawMultiLine event recieved:', data );

  // Draw the circle using the data sent
  // from another user
  drawMultiLine( data.x, data.y, data.lx, data.ly, data.color );

})












///////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
///////////////////                             /////////////////////
//////////////////   DRAW TEXT SECTION          ////////////////////
/////////////////                               ///////////////////
//////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


function drawText(x,y,word,color)
{
  var text = new PointText(new Point(x, y));
  text.justification = 'center';
  text.fillColor = color;
  text.content = word;
  view.draw();
}

function emitText(x,y,word,color) {

  // Each Socket.IO connection has a unique session id
  var sessionId = io.socket.sessionid;

  // An object to describe the circle's draw data
  var data = {
    x: x,
    y: y,
    word: word,
    color: color
  };

  // send a 'drawCircle' event with data and sessionId to the server
  io.emit( 'drawText', data, sessionId )

  // Lets have a look at the data we're sending
  console.log( data )

}

io.on( 'drawText', function( data ) {

  console.log( 'drawText event recieved:', data );

  // Draw the circle using the data sent
  // from another user
  drawText( data.x, data.y, data.word, data.color );

})









function emitPatterns(name,data) {

  // Each Socket.IO connection has a unique session id
  var sessionId = io.socket.sessionid;


  // send a 'drawCircle' event with data and sessionId to the server
  io.emit( name, data, sessionId )

  // Lets have a look at the data we're sending
  console.log( data )

}
