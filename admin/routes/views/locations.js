var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'locations';

	// Load the galleries by sortOrder
	view.query('locations', keystone.list('Locations').model.find().sort('sortOrder'));

	// Render the view
	view.render('locations');

};
