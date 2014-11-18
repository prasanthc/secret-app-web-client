var express = require('express')

var app = express()

app.set('port', 8080)

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {})


var server = app.listen(app.get('port'), function() {
    var host = server.address().address
    var port = server.address().port
    console.log('Listening at http://%s:%s', host, port);
})
