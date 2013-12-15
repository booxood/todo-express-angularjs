'use strict'

var request = require('supertest');
var should = require('should');
var app = require('../../app');
var Todo = require('../../models/todo');


describe('route.todo', function(){

    beforeEach(function(done){
        Todo.removeAll(function(err, result){
            should.not.exist(err);
            (new Todo(1, 'test')).save(function(err, result){
                should.not.exist(err);
                result.should.be.an.instanceof(Todo);
                done();
            });
        });
    });

    it('should return todo list, get /todo/list', function(done){
        request(app)
        .get('/todoApi/list')
        .expect(200)
        .end(function(err, res){
            should.not.exist(err);
            // var arr = eval(res.text);
            var arr = res.body;
            arr.should.be.an.instanceof(Array).and.have.lengthOf(1);
            done();
        });
    });

    it('should return todo object, get /todo/get/:id', function(done){
        request(app)
        .get('/todoApi/get/1')
        .expect(200)
        .end(function(err, res){
            should.not.exist(err);
            var todo = res.body;
            todo.should.be.an.instanceof(Object).have.properties('id', 'text', 'status');
            done();
        });
    });

    it('should return json, post /todoApi', function(done){
        var postData = {
            text: 'add test'
        };

        request(app)
        .post('/todoApi')
        .send(postData)
        .expect(200)
        .end(function(err, res){
            should.not.exist(err);
            // res.text.should.be.instanceof(Array).and.have.lengthOf(4);
            res.should.be.json;
            // console.log(res.text);
            var arr = eval(res.text);
            arr.should.be.an.instanceof(Array);
            arr.pop().should.have.property('text', 'add test');
            done();
        });
    });

    it('should return \'true\', put /todoApi/text/:id', function(done){
        var postData = {
            text: 'update'
        };
        request(app)
        .put('/todoApi/text/1')
        .send(postData)
        .expect(200)
        .end(function(err, res){
            should.not.exist(err);
            res.should.be.json;

            res.text.should.equal('true');
            eval(res.text).should.equal(true);
            res.body.should.equal(true);

            Todo.get(1, function(err, result){
                should.not.exist(err);
                result.should.be.an.instanceof(Todo).have.property('text', 'update');
                done();
            });
        });
    });

    it('should return \'true\',put /todoApi/status/:id', function(done){
        request(app)
        .put('/todoApi/status/1')
        .expect(200)
        .end(function(err, res){
            should.not.exist(err);
            res.body.should.equal(true);

            Todo.get(1, function(err, result){
                should.not.exist(err);
                result.should.be.an.instanceof(Todo).have.property('status', 'done');
                done();
            });
        });
    });

    it('should return \'true\',delete /todoApi/:id', function(done){
        request(app)
        .del('/todoApi/1')
        .expect(200)
        .end(function(err, res){
            should.not.exist(err);
            res.body.should.equal(true);

            Todo.list(function(err, result){
                should.not.exist(err);
                result.should.be.an.instanceof(Array).have.lengthOf(0);
                done();
            });
        });
    });
});
