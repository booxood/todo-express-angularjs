
/*
 * GET users listing.
 */

var items = [{id:1,status:'done',text:'111'}, 
            {id:2,status:'doing',text:'2222'}, 
            {id:3,status:'doing',text:'333333'}];
var index = 3;

exports.list = function(req, res){
    return res.json(items);    
};

exports.get = function(req, res){
    if(!req.params.id){
        return res.json(false);
    }
    items.forEach(function(item, i){
        if(req.params.id == item.id){
            return res.json(item);
        }
    });
};

exports.add = function(req, res){
    console.log('===='+req.body.text);
    
    if(req.body.text){
        index += 1;
        var item = {
            id: index,
            status: 'doing',
            text: req.body.text
        };
        items.push(item);
    }

    res.json(items);
};

exports.update = function(req, res){
    if(!req.params.id || !req.body.text){
        return res.json(false);
    }
    items.forEach(function(item, i){
        if(req.params.id == item.id){
            item.text = req.body.text;
        };
    });

    res.json(true);
};

exports.finish = function(req, res){
    if(!req.params.id){
        return res.json(false);
    };
    items.forEach(function(item, i){
        if(req.params.id == item.id){
            item.status = item.status == 'done' ? 'doing' : 'done';
        };
    });

    res.json(true);    
};

exports.del = function(req, res){
    if(!req.params.id){
        return res.json(false);
    };
    items.forEach(function(item, i){
        if(req.params.id == item.id){
            Array.prototype.splice.apply(items, [i,1]);
        };
    });
    res.json(true);
};
