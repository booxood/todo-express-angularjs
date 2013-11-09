var db = require('./db');
var todosDB = db.collection('todos');

var index = 1;

var Todo = function(text){
	this.id = 0;
	this.text = text;
	this.status = 'doing';
};

module.exports = Todo;

Todo.prototype.save = function(callback){
    var todo = {
        id: index,
        text: this.text,
        status: this.status
    };
    todosDB.insert(todo, function(err, result){
        if(err){
            return callback(err, result);
        }
        index += 1;
        return callback(null, result);
    });
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

Todo.list = function(callback){
	todosDB.find().toArray(function(err, result){
		if(err){
			return callback(err, result);
		}
		return callback(null, result);
	});
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
    todosDB.update({id: id}, {$set: newObj},function(err, result){
        if(err){
            return callback(err, result);
        }
        return callback(null, result);
    });
};

Todo.remove  = function(id, callback){
    todosDB.remove({id: id}, function(err, result){
        if(err){
            return callback(err, result);
        }
        return callback(null, result);
    });
};

Todo.removeAll  = function(callback){
    todosDB.remove({}, function(err, result){
        if(err){
            return callback(err, result);
        }
        return callback(null, result);
    });
};
