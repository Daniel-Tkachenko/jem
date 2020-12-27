var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Post.add({
	title: { type: String, required: true },
	url: { type: String, required: true, default: 'new-post' },
	titleRu: { type: String },
	// state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	// author: { type: Types.Relationship, ref: 'User', index: true },
	// publishedDate: { type: Types.Date, utc: true, index: true, dependsOn: { state: 'published' } },
	image: { type: Types.CloudinaryImage, required: true, default: 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwis9Oe2qYLjAhWJwcQBHT1aAPMQjRx6BAgBEAU&url=http%3A%2F%2Fdenrakaev.com%2Finterery%2Fapartamenty-graphite-penthouse.html%2Fattachment%2Fno-image&psig=AOvVaw0A0PkZS23vx1RaKK0c_9tf&ust=1561472749558804' },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150, required: true, default: 'no brief' },
		extended: { type: Types.Html, wysiwyg: true, height: 400, required: true, default: 'no content' },
	},
	contentRu: {
		brief: { type: Types.Html, wysiwyg: true, height: 150, default: 'no briefRu' },
		extended: { type: Types.Html, wysiwyg: true, height: 400, default: 'no briefRu' },
	},
	// categories: { type: Types.Relationship, ref: 'PostCategory', many: true },
});

// Post.schema.virtual('content.full').get(function () {
// 	return this.content.extended || this.content.brief;
// });

// Post.defaultColumns = 'title';
Post.register();
