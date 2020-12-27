var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Gallery Model
 * =============
 */

var Portfolio = new keystone.List('Portfolio', {
	autokey: { from: 'name', path: 'key', unique: true },
});

Portfolio.add({
	name: { type: String, required: true },
	video: {type: String, required: true, default: 'No video' },
	customer: { type: String, required: false, default: '' },
	description: { type: Types.Html, wysiwyg: true, height: 400, required: true, default: 'Нет описания' },
	descriptionEn: { type: Types.Html, wysiwyg: true, height: 400, required: true, default: 'No description' },
	heroImage: { type: Types.CloudinaryImage },
	url: { type: String, required: true, unique: true, default: 'no-url' }
});

Portfolio.register();
