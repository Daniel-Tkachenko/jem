const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * Gallery Model
 * =============
 */

const Locations = new keystone.List('Locations', {
	autokey: { from: 'name', path: 'key', unique: true },
});

Locations.add({
	name: { type: String, required: true },
	publishedDate: { type: Date, default: Date.now },
	heroImage: { type: Types.CloudinaryImage },
	images: { type: Types.CloudinaryImages },
	video:  { type: String, default: 'no video' },
  content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	contentRu: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	url: { type: String, required: true, unique: true, default: 'no-url' }
});

Locations.register();
