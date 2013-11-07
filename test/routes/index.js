'use strict';

var request = require('supertest');
var should = require('should');
var app = require('../../app.js');

describe('routes.index', function(){
    it('should return status_code 200 get the url /', function(done){
        request(app)
        .get('/')
        .expect(200)
        .end(function(err, res){
            should.not.exist(err);
            // console.log(res.text);
            res.should.be.html;
            done();
        });
    });
});

describe('routes.partials', function(){
    it('should return status_code 200 get the url /partials/item', function(done){
        request(app)
        .get('/partials/item')
        .expect(200)
        .end(function(err, res){
            should.not.exist(err);
            done();
        });
    });
    it('should return status_code 200 get the url /partials/modify', function(done){
        request(app)
        .get('/partials/modify')
        .expect(200)
        .end(function(err, res){
            should.not.exist(err);
            done();
        });
    });
    it('should return status_code 200 get the url /partials/delete', function(done){
        request(app)
        .get('/partials/delete')
        .expect(200)
        .end(function(err, res){
            should.not.exist(err);
            done();
        });
    });
});
