
/*
 * GET users listing.
 */

var Todo = require('../models/todo.js');

exports.list = function(req, res){
    Todo.list(function(err, result){
        if(err){
            return res.json(false);
        }
        return res.json(result);
    });
};

exports.get = function(req, res){
    if(!req.param('id')){
        return res.json(false);
    }
    Todo.get(parseInt(req.param('id')), function(err, result){
        if(err){
            return res.json(false);
        }
        return res.json(result);
    });
};

exports.add = function(req, res){
    if(!req.body.text){
        return res.json(false);
    }


    Todo.getMaxId(function(err, id){
        if(err){
            return res.json(err);
        }

        var todo = new Todo(id + 1, req.body.text);
        todo.save(function(err, result){
            if(err){
                return res.json(false);
            }
            Todo.list(function(err, todos){
                return res.json(todos);
            });
        }); 

    });
};

exports.update = function(req, res){

    if(!req.param('id') || !req.body.text){
        return res.json(false);
    }

    Todo.update(parseInt(req.param('id')), {text:req.body.text}, function(err, result){
        if(err){
            return res.json(false);
        }
        return res.json(true);
    });
};

exports.finish = function(req, res){
    if(!req.param('id')){
        return res.json(false);
    };

    Todo.get(parseInt(req.param('id')), function(err, result){
        if(err){
            return res.json(false);
        }
        result.finish(function(err){
            if(err){
                return res.json(false);
            }
            return res.json(true);
        });
    });
};

exports.del = function(req, res){
    if(!req.params.id){
        return res.json(false);
    };

    Todo.remove(parseInt(req.param('id')), function(err, result){
        if(err){
            return res.json(false);
        }
        return res.json(true);
    });
};
