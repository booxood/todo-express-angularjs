'use strict'

var request = require('supertest');
var should = require('should');
var app = require('../../app');

describe('route.todo', function(){
    it('should return json, post /todoApi/add', function(done){
        var postData = {
            text: 'test'
        };

        request(app)
        .post('/todoApi/add')
        .send(postData)
        .expect(200)
        .end(function(err, res){
            should.not.exist(err);
            // res.text.should.be.instanceof(Array).and.have.lengthOf(4);
            res.should.be.json;
            // console.log(res.text);
            var arr = eval(res.text);
            arr.pop().should.have.property('text', 'test');
            done();
        });
    });
    it('should return \'true\', put /todoApi/update/text/:id', function(done){
        var postData = {
            text: 'update'
        };
        request(app)
        .put('/todoApi/update/text/1')
        .send(postData)
        .expect(200)
        .end(function(err, res){
            should.not.exist(err);
            // res.text.should.be.instanceof(Array).and.have.lengthOf(4);
            res.should.be.json;
            // console.log(res.text);
            res.text.should.equal('true');
            eval(res.text).should.equal(true);
            done();
        });
    });});
