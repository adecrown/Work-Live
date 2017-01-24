paper.install(window);
if(typeof joiningSession !== 'undefined')
{
  saveCode();
}

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
  /*
  var canvas = document.getElementById("draw");
  var ctx = canvas.getContext("2d");
  var data = ctx.getImageData(0, 0, canvas.width, canvas.height);

  console.log(data);
  console.log(JSON.stringify(data))*/
  //  exportJSON();
  //  console.log(paper.Project.toString());
  //console.log(draw.activeLayer.exportJSON());
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
  else if(wTool == "lin")
  {

    var step = event.delta / 2;
    step.angle += 90;
    //var top = event.middlePoint + step;
    //var bottom = event.middlePoint - step;
    console.log(event);
    drawBrush2(event.middlePoint,step);
    //emitBrush(event,2)
  }

  emitName(event.point.x,event.point.y)
  // showName(event.point.x,event.point.y)
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
  else if(wTool == "lin")
  {
    var x = event.point.x;
    var y = event.point.y;
    drawBrush(x,y);
    emitBrush(event,x,y,1)
  }

}



function onMouseUp(event) {
  if(wTool == "lin")
  {
    var x = event.point.x;
    var y = event.point.y;
    drawBrush3(x,y);
    emitBrush(event,x,y,3)
  }
  saveCode();
  emitRemovewName();
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
  circle.fillColor = new Color( color.red, color.green, color.blue, color.alpha );

  console.log(project.exportJSON())
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






function showName(x,y,name)
{

  div = document.createElement("div");
  div.style.position = "absolute";
  //  div.style.left = "0px";
  //div.style.top = "0px";
  div.style.left = x + 'px'
  div.style.top  = y + 'px'
  div.style.width = "auto";
  div.style.height = "auto";
  div.style.background = "yellow";
  div.style.color = "blue";
  div.id= name;
  div.innerHTML = name;

  var myDiv = document.getElementById(name);
  if (myDiv === null) {
    document.body.appendChild(div);
  }
  else {
    //console.log("xxxxxxxx")

    document.getElementById(name).style.left = x + 'px';
    document.getElementById(name).style.top  = (y+40) + 'px';
  }

  /*
  div.id=getCookie("usName");
  div.innerHTML = getCookie("usName");

  var myDiv = document.getElementById(getCookie("usName"));
  if (myDiv === null) {
    document.body.appendChild(div);
  }
  else {
    //console.log("xxxxxxxx")

    document.getElementById(getCookie("usName")).style.left = x + 'px';
    document.getElementById(getCookie("usName")).style.top  = (y+50) + 'px';
  }
   */
}




function emitName(x,y) {

  // An object to describe the circle's draw data
  var data;
  data = {
    x:x,
    y:y
  };

  //console.log(data);
  emitPatterns('showName',data);
}


io.on( 'showName', function( data,username) {

  console.log( 'showName event recieved:', data );

 console.log(username);
  // Draw the line using the data sent
  // from another user
  showName(data.x,data.y,username);



})


function emitRemovewName()
{
  var data;
  emitPatterns('removeName',data);
}


io.on( 'removeName', function( data ,username) {

  console.log( 'showName event recieved:', data );

  console.log(username);
  // Draw the line using the data sent
  // from another user
  //showName(data.x,data.y,username);
  var elm = document.getElementById( username);
  elm.parentNode.removeChild( elm );
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




///////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
///////////////////                             /////////////////////
//////////////////   DRAW BRUSH SECTION          ////////////////////
/////////////////                               ///////////////////
//////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

function drawBrush(x,y)
{
  tool.minDistance = 10;
  tool.maxDistance = 45;
  path = new Path();
  path.fillColor = {
    hue: Math.random() * 360,
    saturation: 1,
    brightness: 1
  };

  path.add(x,y);
}

function drawBrush2(point,step)
{
  console.log(point);

  console.log(step);
  var top = point+ step;
  var bottom = point - step;



  path.add(top);
  path.insert(0, bottom);
  path.smooth();
}


function drawBrush3(x,y)
{
  path.add(x,y);
  path.closed = true;
  path.smooth();
}



function emitBrush(event,x,y,which) {

  // An object to describe the circle's draw data
  var data;
  data = {
    w:which,
    xs:x,
    ys:y
    //f:event
  };

  //console.log(data);
  emitPatterns('drawBrush',data);
}


io.on( 'drawBrush', function( data ) {

  console.log( 'drawBrush event recieved:', data );

  // Draw the line using the data sent
  // from another user

  if(data.w == 1)
  {
    drawBrush(data.xs,data.ys);
  }
  else if(data.w == 2)
  {
    drawBrush2(event);
  }
  else {
    drawBrush3(data.xs,data.ys);
  }

})



///////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
///////////////////                             /////////////////////
//////////////////   change background          ////////////////////
/////////////////                               ///////////////////
//////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
var drawingColorBackEl = document.getElementById('drawing-background-color')
function changeBg(value)
{
  var canvasLayer = document.getElementById("draw");
  canvasLayer.style.background = value;
}

function emitchangeBg(value) {

  // An object to describe the circle's draw data
  var data;
  data = {
    val:value
  };

  //console.log(data);
  emitPatterns('changeBg',data);
}

io.on( 'changeBg', function( data ) {

  console.log( 'changeBg event recieved:', data );
  changeBg(data.val);
})

drawingColorBackEl.onchange = function(){
  changeBg(drawingColorBackEl.value);
  emitchangeBg(drawingColorBackEl.value);
}





function createCookie(name, data, exp)
{
  var d = new Date();
  d.setTime(d.getTime() + (exp*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = name + "=" + data + ";" + expires + ";path=/";
}

function getCookie(cname)
{
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length,c.length);
    }
  }
  return "";
}

function checkCookie(data)
{
  var jsond=getCookie(data);
  if (jsond!="")
  {
    return true;
  }
  else
  {
    return false;
  }
}


function saveCode()
{
  //console.log(paper.project.exportJSON());

  createCookie("checking","cheking", 1);
  localStorage.setItem("pdata", paper.project.exportJSON());


  if(typeof tsessionId !== 'undefined')
  {
    saveJson("student",tsessionId,paper.project.exportJSON());
  }
  else {
    if(typeof myId !== 'undefined')
    {
      saveJson("student",myId,paper.project.exportJSON());
    }
    else {

      saveJson("teacher",getTUsername,paper.project.exportJSON());
    }
  }


}

function uploadCode()
{
  if(typeof tsessionId !== 'undefined')
  {
    paper.project.importJSON(getTest);
    console.log("json collected from database");
  }

  else if (typeof getjsonC !== 'undefined') {
    //  console.log(getjsonC);
    paper.project.importJSON(getjsonC);
    console.log("json collected from database");
  }

  else if (typeof myTeachersLastD !== 'undefined') { // dasj.ejs
    if(checkCookie("checking"))
    {
      loadFromCookie();
    }
  }

}
uploadCode();



function loadFromCookie()
{
  var answer = confirm("Would you like to load your previous drawing?")
  if (answer)
  {
    var jsdata = localStorage.getItem("pdata");
    paper.project.importJSON(jsdata);
    console.log("json collected from cookie");
  }
}




function saveJson(who,myIds,jsond)
{

  var http = new XMLHttpRequest();
  var url;
  var params;
  if(who == "student")
  {
    url = "/students";
    params = "idss="+myIds+"&jsondata="+jsond;
  }
  else {
    url = "/dash";
    params = "username="+myIds+"&jsondata="+jsond;
  }

  console.log(params);
  http.open("POST", url, true);

  //Send the proper header information along with the request
  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  http.onreadystatechange = function() {//Call a function when the state changes.
    if(http.readyState == 4 && http.status == 200) {

      //alert(http.responseText);
    }
  }
  http.send(params);
}




function emitPatterns(name,data) {

  // Each Socket.IO connection has a unique session id
  var sessionId = io.socket.sessionid;


  // send a 'drawCircle' event with data and sessionId to the server
  io.emit( name, data, sessionId )

  // Lets have a look at the data we're sending
  console.log( data )

}
