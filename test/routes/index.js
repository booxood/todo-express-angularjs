var request = require('supertest');
var express = require('express');

var app = express();

app.get('/user', function(req, res){
  res.send(200, { name: 'tobi' });
});

request(app)
	.get('/')
	.expect(404)
	.end(function(err, res){
		if(err) throw err;
		return res;
	});