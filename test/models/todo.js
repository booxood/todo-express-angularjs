'use strict'

var should = require('should');
var Todo = require('../../models/todo');

var todoCase = ['test1', 'test2', 'test3'];

describe('models.Todo', function(){

    before(function(done){
        Todo.removeAll(function(err, result){
            should.not.exist(err);
            done();
        });
    });

    beforeEach(function(done){
        todoCase.forEach(function(v, k){
            var todo = new Todo({text: v});
            todo.save(function(err, result){
                should.not.exist(err);
            });
        });
        done();
    });

    afterEach(function(done){
        Todo.removeAll(function(err, result){
            should.not.exist(err);
            done();
        });
    });

    it('should return list , Todo.list ', function(done){
        Todo.list(function(err, result){
            should.not.exist(err);
            result.length.should.equal(todoCase.length);
            done();
        });
    });

    it('should get one by id, Todo.get', function(done){
        Todo.get(1, function(err, result){
            should.not.exist(err);
            result.should.have.property('id', 1);
            done();
        });
    });

    it('should text=modify by id=1, Todo.update', function(done){
        Todo.update(1, {text: 'modify'}, function(err){
            should.not.exist(err);
        });
        Todo.get(1, function(err, result){
            should.not.exist(err);
            result.should.have.property('text', 'modify');
            done();
        });
    });

    it('should change status doing or done, Todo.prototype.finish', function(done){
        Todo.get(1, function(err, todo){
            should.not.exist(err);
            todo.should.have.property('status');
            var status = todo.status === 'doing' ? 'done' : 'doing';
            todo.finish(function(err, result){
                should.not.exist(err);
                Todo.get(1, function(err, result){
                    should.not.exist(err);
                    result.should.have.property('status', status);
                    done();
                });
            });
        });
    });
});
