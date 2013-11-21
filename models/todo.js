var db = require('./db');
var todosDB = db.collection('todos');

var Todo = function(text){
    this.text = text;
    this.status = 'doing';
};

module.exports = Todo;

Todo.prototype.save = function(callback){
    var that = this;
    Todo.getMaxId(function(err, id){
        if(err){
            return callback(err, null);
        }
        // console.log('save id: ' + id);
        var todo = {
            id: id + 1,
            text: that.text,
            status: that.status
        };
        todosDB.insert(todo, callback);
    })
};

Todo.prototype.finish = function(callback){
    this.status = this.status === 'doing' ? 'done' : 'doing';
    this.save(this, function(err, result){
        if(err){
            return callback(err, result);
        }
        return callback(null, result);
    });
};

Todo.getMaxId = function(callback){

    todosDB.find({}).toArray(function(err, todos){
        if(err){
            return callback(err, null);
        }
        // console.dir(todos);

        if(todos.length > 0){
            todosDB.find({}).sort({'id': -1}).toArray(function(err, result){
                if(err){
                    return callback(err, null);
                }
                return callback(null, result[0].id);
            });         
        }else{
            return callback(null, 0);
        }
    });
};

Todo.list = function(callback){
    todosDB.find().toArray(callback);
};

Todo.get = function(id, callback){
    todosDB.findOne({id: id}, function(err, result){
        if(err){
            return callback(err, result);
        }
        var todo = new Todo(result.text);
        todo.id = result.id;
        todo.status = result.status;
        return callback(null, todo);
    });
};

Todo.update = function(id, newObj, callback){
    todosDB.update({id: id}, {$set: newObj}, callback);
};

Todo.remove  = function(id, callback){
    todosDB.remove({id: id}, callback);
};

Todo.removeAll  = function(callback){
    todosDB.remove({}, callback);
};

var t = new Todo('add test');
t.save(function(err, result){
    console.log(err + ' : save : ' +  result.id);
});
