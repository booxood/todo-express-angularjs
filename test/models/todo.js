'use strict'

var should = require('should');
var Todo = require('../../models/todo');

describe('models.Todo', function(){

    // before
    // beforeEach
    // afterEach
    // after

    beforeEach(function(done){
        Todo.removeAll(function(err, result){
            should.not.exist(err);
            done();
        });
    });

    it('should insert a Todo, Todo.save ', function(done){
        var todo = new Todo(1, 'test', 'doing');
        todo.save(function(err, result){
            should.not.exist(err);
            result.should.be.an.instanceOf(Todo).and.have.properties('id', 'text', 'status');        
            done();
        });
    });

    it('should return list , Todo.list ', function(done){
        (new Todo(1, 'test 1 ', 'doing')).save(function(err, result){
            should.not.exist(err);
            Todo.list(function(err, result){
                should.not.exist(err);
                result.should.be.an.instanceof(Array).and.have.lengthOf(1);
                result.length.should.equal(1);
                done();
            });
        });

    });

    it('should get one by id, Todo.get', function(done){
        (new Todo(1, 'test 1 ', 'doing')).save(function(err, result){
            should.not.exist(err);
            Todo.get(1, function(err, result){
                should.not.exist(err);
                result.should.be.an.instanceOf(Todo).have.property('status', 'doing');
                done();
            });
        });
    });

    it('should text=update by id=1, Todo.update', function(done){
        (new Todo(1, 'test', 'doing')).save(function(err, doc){
            should.not.exist(err);
            Todo.update(1, {text: 'update'}, function(err){
                should.not.exist(err);
                Todo.get(1, function(err, result){
                    should.not.exist(err);
                    result.should.be.an.instanceof(Todo).have.property('text', 'update');
                    done();
                });
            });
        });
    });

    it('should change status doing or done, Todo.prototype.finish', function(done){
        (new Todo(1, 'test', 'doing')).save(function(err, result){
            should.not.exist(err);
            result.should.be.an.instanceof(Todo);
            result.finish(function(err){
                should.not.exist(err);
                Todo.get(1, function(err, result){
                    should.not.exist(err);
                    result.should.be.an.instanceof(Todo).have.property('status', 'done');
                    done();
                });
            });
        });
    });

    it('should return max ID, Todo.getMaxId', function(done){
        (new Todo(10, 'test')).save(function(err, result){
            should.not.exist(err);
            result.should.be.an.instanceof(Todo);
            Todo.getMaxId(function(err, id){
                should.not.exist(err);
                id.should.equal(10);
                done();
            });
        });
    });
    
    it('should no return, Todo.remove', function(done){
        (new Todo(1, 'test')).save(function(err, result){
            should.not.exist(err);
            result.should.be.an.instanceof(Todo);
            Todo.remove(1, function(err){
                should.not.exist(err);
                Todo.list(function(err, result){
                    should.not.exist(err);
                    result.should.be.an.instanceof(Array).have.lengthOf(0);
                    done();
                })
            });
        });
    });
    
});
