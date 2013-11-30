var db = require('./db');
var todosDB = db.collection('todos');

// todosDB.insert([{id: 1,text: 'text'},{id: 1,text: 'aaaa'}], function(err, docs){
//     console.log('insert:');
//     console.dir(docs);
// });

// todosDB.update({id: 1}, {$set: {text: 'update'}}, function(err){
//     console.log('update:');
//     // console.dir(docs);
// });

// todosDB.find({id: 1}).toArray(function(err, docs){
//     console.log('find toArray:');
//     console.dir(docs);
// });

// todosDB.findOne({id: 1}, function(err, doc){
//     console.log('findOne:');
//     console.dir(doc);
// });

// todosDB.remove({id: 1}, function(err){
//     console.log('remove:');
//     // console.dir(docs);
// });


var Todo = function(id ,text, status){
    this.id = id;
    this.text = text;
    this.status = status || 'doing';
};

module.exports = Todo;

Todo.prototype.save = function(callback){
    var todo = {
        id: this.id,
        text: this.text,
        status: this.status
    };

    todosDB.insert(todo, function(err, docs){
        callback(err, new Todo(docs[0].id, docs[0].text, docs[0].status));
    });
};

Todo.prototype.finish = function(callback){
    this.status = this.status === 'doing' ? 'done' : 'doing';
    todosDB.update({id: this.id}, {$set: {status: this.status}}, callback);
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

        if(result){
            var todo = new Todo(result.id, result.text, result.status);
            return callback(null, todo);
        }else{
            return callback(err, result);
        }

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

