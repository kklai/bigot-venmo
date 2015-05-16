var express = require('express');
var app = express();
var request = require('request')

var access_token = "58498321c4e1ae1c26a477463ac45d3efdf5c1c47a699360b90120a12ad827a2"


app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.get('/me', function(rq, response){
	request({
		url: "https://sandbox-api.venmo.com/v1/me?access_token=" + access_token,
		method: "GET",

	}, function(error, res, body){
		response.json(body)
	})
})

app.get('/friends', function(rq, response){
	var id = rq.query.id
	request({
		url: "https://sandbox-api.venmo.com/v1/users/" + id + "/friends?access_token=" + access_token,
		method: "GET",

	}, function(error, res, body){
		response.json(body)
	})
})