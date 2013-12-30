/**
 * Controller for home route
 */


exports.render = function(req, res){
  res.render('index', { title: 'Express' });
};
