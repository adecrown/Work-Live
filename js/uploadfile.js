//upload files
//

__("uploadCanvas").addEventListener("change", function(e){
  openFile(e);
  //console.log(e.target.value);
});

function openFile(event) {
  var input = event.target;

  var reader = new FileReader();
  reader.onload = function(){
    var data = reader.result;
    getFileJData(data,event.target.value);
    //var node = document.getElementById('output');
    //node.innerText = text;
    //console.log(reader.result.substring(0, 200));
  };
  reader.readAsText(input.files[0]);
};

function getFileJData(data,name)
{
  console.log(name);
  var string = name,
  substring = ".svg";
  var val = string.indexOf(substring) > -1;
  console.log(val);
  if(val)
  {
    fabric.loadSVGFromString(data, function(objects, options) {
      var obj = fabric.util.groupSVGElements(objects, options);
      canvas.add(obj).renderAll();
    });
  }
  else
  {
    substring = ".json";
    val = string.indexOf(substring) > -1;
    if(val);
    {
      //console.log(data);
      canvas.loadFromJSON(data);
      canvas.renderAll();
    }

  }
redirect("");
}
