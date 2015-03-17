var BaseComponent = require('./baseComponent.js');
var template = require('./app.html');

var App = BaseComponent.extend({
	name: 'app',
	template: template,
	config: function() {

	}
});

var app = new App().$inject('#app');