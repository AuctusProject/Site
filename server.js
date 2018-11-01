var express = require('express');
var app = express();
var http = require('http').Server(app);

app.use(express.static(__dirname));

app.all('/*', function(req, res) {
    res.sendFile('index.html', { root: __dirname});
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});