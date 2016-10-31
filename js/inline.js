//window.location.hostname

//document.getElementsByTagName('head')
/*
script = document.createElement('script');
script.src='http://'+window.location.hostname+':8081/socket.io/socket.io.js';
<script src="http://104.155.117.17:8081/socket.io/socket.io.js"></script>

//<script src="http://104.199.33.162:8081/socket.io/socket.io.js"></script>

document.getElementsByTagName('head')[0].appendChild(script);
*/


appendHtml = function(element, html) {
    var div = document.createElement('div');
    div.innerHTML = html;
    while (div.children.length > 0) {
        element.appendChild(div.children[0]);
    }
}

appendHtml(document.head, '<script src="http://'+window.location.hostname+':8081/socket.io/socket.io.js"></script>');
