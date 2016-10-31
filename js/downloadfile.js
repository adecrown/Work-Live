///write saveImage
function svgJsonWrite(text)
{
  var textFile = null;

  var data = new Blob([text], {type: 'text/plain'});

  // If we are replacing a previously generated file we need to
  // manually revoke the object URL to avoid memory leaks.
  if (textFile !== null) {
    window.URL.revokeObjectURL(textFile);
  }
  textFile = window.URL.createObjectURL(data);

  return textFile;

}


function svgDownload()
{
  var saveAs = prompt("Save As", "mySvg");
  document.getElementById('svgBlob').download = saveAs+".svg";
  var link = document.getElementById('svgBlob');
  var svgData = canvas.toSVG();
  link.href = svgJsonWrite(svgData);
}
__("svgBlob").addEventListener("click", svgDownload);


function jsonDownloadJ()
{
  var saveAs = prompt("Save As", "myJson");
  document.getElementById('jsonBlob').download = saveAs+".json";
  var link = document.getElementById('jsonBlob');
  var jsonData = JSON.stringify(canvas);
  //console.log(jsonData);
 link.href = svgJsonWrite(jsonData);
}
__("jsonBlob").addEventListener("click", jsonDownloadJ);
