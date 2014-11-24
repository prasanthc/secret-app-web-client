var express = require('express')

var app = express()

app.set('port', 8080)

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {})

//some changes to test
var server = app.listen(port, ipaddress, function() {
    // var host = server.address().address
    // var port = server.address().port
    // console.log('Listening at http://%s:%s', host, port);
    console.log('Server is listening at http://%s:%s', ipaddress, port);
})
