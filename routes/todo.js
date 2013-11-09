
/*
 * GET users listing.
 */

var items = [{id:1,status:'done',text:'111'},
            {id:2,status:'doing',text:'2222'},
            {id:3,status:'doing',text:'333333'}];
var index = 3;

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
    if(!req.params.id){
        return res.json(false);
    }
    Todo.get(req.params.id, function(err, result){
        if(err){
            return res.json(false);
        }
        return res.json(result);
    });
};

exports.add = function(req, res){
    if(!req.params.text){
        return res.json(false);
    }

    var todo = new Todo(req.body.text);
    todo.save(function(err, result){
        if(err){
            return res.json(false);
        }
        Todo.list(function(err, result){
            return res.json(result);
        });
    });
};

exports.update = function(req, res){
    if(!req.params.id || !req.body.text){
        return res.json(false);
    }

    Todo.update(req.params.id, {text:req.body.text}, function(err, result){
        if(err){
            return res.json(false);
        }
        return res.json(true);
    });
};

exports.finish = function(req, res){
    if(!req.params.id){
        return res.json(false);
    };

    Todo.get(req.params.id, function(err, result){
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

    Todo.remove(req.params.id, function(err, result){
        if(err){
            return res.json(false);
        }
        return res.json(true);
    });
};
