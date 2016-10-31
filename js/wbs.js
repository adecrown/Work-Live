function wsConnect(id,toId,fromWho,name)
{
  var connection = new WebSocket("ws://"+window.location.hostname+":8081/"+id);

  connection.onerror = function (error) {
    console.log("SOMETHING WENT WORNG");
    console.log(error);
  };


  connection.onmessage = function (message)
  {
    var obj = JSON.parse(message.data)
    console.log(obj);

  /*  var whoIsTalking = document.getElementById('hash').value;
    var whoSentMessage = obj.messageInbox[0].hash;

    /*
    if who am talking to is the one that sent a message, then show me the message and also store it to the database. If not, only store the message to the database.

    if(whoIsTalking == whoSentMessage)
    {
      getMessage(obj,"rmessage","messagesDetails");
    }*/
  }

  document.getElementById('sendIt').onclick = function()
    {
      var ourMessage = {"messageInbox":[{"id":toId,"from":fromWho,"name":name}]}
      var makeString = JSON.stringify(ourMessage);
      connection.send(makeString);
      redirect("#");
    };
}
