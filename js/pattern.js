var drawingModeEl = document.getElementById('drawing-mode'),
drawingOptionsEl = document.getElementById('drawing-mode-options'),
drawingColorEl = document.getElementById('drawing-color'),
drawingColorBackEl = document.getElementById('drawing-background-color'),
drawingLineWidthEl = document.getElementById('drawing-line-width'),
drawingShadowWidth = document.getElementById('drawing-shadow-width');

/*  drawingModeEl.onclick = function() {
canvas.isDrawingMode = !canvas.isDrawingMode;
if (canvas.isDrawingMode) {
drawingModeEl.innerHTML = 'Cancel drawing mode';
drawingOptionsEl.style.display = '';
}
else {
drawingModeEl.innerHTML = 'Enter drawing mode';
drawingOptionsEl.style.display = 'none';
}
};

canvas.on('path:created', function() {
updateComplexity();
});*/

if (fabric.PatternBrush) {

  var eraser = new fabric.PatternBrush(canvas);
  eraser.getPatternSrc = function() {

    var patternCanvas = fabric.document.createElement('canvas');
    patternCanvas.width = patternCanvas.height = 1;
    var ctx = patternCanvas.getContext('2d');

    ctx.strokeStyle = canvas.backgroundColor;
    ctx.lineWidth = 5;
    //ctx.beginPath();
    ctx.moveTo(0, 5);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.stroke();

    return patternCanvas;
  };


  var vLinePatternBrush = new fabric.PatternBrush(canvas);
  vLinePatternBrush.getPatternSrc = function() {

    var patternCanvas = fabric.document.createElement('canvas');
    patternCanvas.width = patternCanvas.height = 10;
    var ctx = patternCanvas.getContext('2d');

    ctx.strokeStyle = this.color;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(0, 5);
    ctx.lineTo(10, 5);
    ctx.closePath();
    ctx.stroke();

    return patternCanvas;
  };

  var hLinePatternBrush = new fabric.PatternBrush(canvas);
  hLinePatternBrush.getPatternSrc = function() {

    var patternCanvas = fabric.document.createElement('canvas');
    patternCanvas.width = patternCanvas.height = 10;
    var ctx = patternCanvas.getContext('2d');

    ctx.strokeStyle = this.color;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(5, 0);
    ctx.lineTo(5, 10);
    ctx.closePath();
    ctx.stroke();

    return patternCanvas;
  };

  var squarePatternBrush = new fabric.PatternBrush(canvas);
  squarePatternBrush.getPatternSrc = function() {

    var squareWidth = 10, squareDistance = 2;

    var patternCanvas = fabric.document.createElement('canvas');
    patternCanvas.width = patternCanvas.height = squareWidth + squareDistance;
    var ctx = patternCanvas.getContext('2d');

    ctx.fillStyle = this.color;
    ctx.fillRect(0, 0, squareWidth, squareWidth);

    return patternCanvas;
  };

  var diamondPatternBrush = new fabric.PatternBrush(canvas);
  diamondPatternBrush.getPatternSrc = function() {

    var squareWidth = 10, squareDistance = 5;
    var patternCanvas = fabric.document.createElement('canvas');
    var rect = new fabric.Rect({
      width: squareWidth,
      height: squareWidth,
      angle: 45,
      fill: this.color
    });

    var canvasWidth = rect.getBoundingRectWidth();

    patternCanvas.width = patternCanvas.height = canvasWidth + squareDistance;
    rect.set({ left: canvasWidth / 2, top: canvasWidth / 2 });

    var ctx = patternCanvas.getContext('2d');
    rect.render(ctx);

    return patternCanvas;
  };

  var img = new Image();
  img.src = '../assets/honey_im_subtle.png';

  var texturePatternBrush = new fabric.PatternBrush(canvas);
  texturePatternBrush.source = img;
}

//Mode options buttons
document.getElementById('editPencil').addEventListener('click', function() {
  canvas.freeDrawingBrush = new fabric['PencilBrush'](canvas);
  retainColour();
});

document.getElementById('editcircle').addEventListener('click', function() {
  canvas.freeDrawingBrush = new fabric['CircleBrush'](canvas);
  retainColour();
});

document.getElementById('editSpray').addEventListener('click', function() {
  canvas.freeDrawingBrush = new fabric['SprayBrush'](canvas);
  retainColour();
});

document.getElementById('editPattern').addEventListener('click', function() {
  canvas.freeDrawingBrush = new fabric['PatternBrush'](canvas);
  retainColour();
});

document.getElementById('editHline').addEventListener('click', function() {
  canvas.freeDrawingBrush = hLinePatternBrush;
  retainColour();
});
document.getElementById('editVline').addEventListener('click', function() {
  canvas.freeDrawingBrush = vLinePatternBrush;
  retainColour();
});
document.getElementById('editSquare').addEventListener('click', function() {
  canvas.freeDrawingBrush = squarePatternBrush;
  retainColour();
});

document.getElementById('editDiamond').addEventListener('click', function() {
  canvas.freeDrawingBrush = diamondPatternBrush;
  retainColour();
});

document.getElementById('eraseBtn').addEventListener('click', function() {
  var sty = document.getElementById('eraseBtn').style.backgroundColor;
  canvas.freeDrawingBrush = eraser;
  if(sty == "")
  {
    document.getElementById('eraseBtn').style.backgroundColor = '#cd6a51';
  }
  else {
    document.getElementById('eraseBtn').style.backgroundColor = '';
  }
  retainColour();
});

function retainColour()
{
  if (canvas.freeDrawingBrush) {
    canvas.freeDrawingBrush.color = drawingColorEl.value;
    canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
    canvas.freeDrawingBrush.shadowBlur = parseInt(drawingShadowWidth.value, 10) || 0;
  }
}

drawingColorEl.onchange = function() {
  canvas.freeDrawingBrush.color = drawingColorEl.value;
};
drawingColorBackEl.onchange = function(){

  canvas.backgroundColor = drawingColorBackEl.value;
  canvas.renderAll();
}

drawingLineWidthEl.onchange = function() {
  canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
};
drawingShadowWidth.onchange = function() {
  canvas.freeDrawingBrush.shadowBlur = parseInt(drawingShadowWidth.value, 10) || 0;
};

if (canvas.freeDrawingBrush) {
  canvas.freeDrawingBrush.color = drawingColorEl.value;
  canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
  canvas.freeDrawingBrush.shadowBlur = 0;
}

/*
document.getElementById('canvas-background-picker').addEventListener('change', function() {
canvas.backgroundColor = this.value;
canvas.renderAll();
});
*/

function callText()
{
  canvas.add(new fabric.IText('Tap and Type', {
    fontFamily: 'arial black',
    left: 100,
    top: 100 ,
  }));
  canvas.isDrawingMode =false;
}
