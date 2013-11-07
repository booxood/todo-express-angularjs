
/*
 * GET home page.
 */

exports.index = function(req, res){
    return res.render('index', { title: 'Todo' });
};

exports.partials = function(req, res){
    return res.render('partials/' + req.params.name);
};
