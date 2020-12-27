var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Gallery Model
 * =============
 */

var Seo = new keystone.List('Seo', {
	autokey: { from: 'name', path: 'key', unique: true },
});

Seo.add({
	title: { type: String, required: true, default: 'No title' },
	description: {type: String, required: true, default: 'No description' },
	url: { type: String, required: true, default: 'No url' },
	pageType: { type: String, required: true, default: 'No pageType' },
	keywords: { type: String, required: true, default: 'No keywords' },
});

Seo.register();
