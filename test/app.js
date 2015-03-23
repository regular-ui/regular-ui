var BaseComponent = require('../src/js/core/base.js');
var template = require('./app.html');
var Selectex = require('../src/js/core/selectex.js');
var Suggest = require('../src/js/core/suggest.js');
var Modal = require('../src/js/core/modal.js');

var App = BaseComponent.extend({
    name: 'app',
    template: template,
    data: {
        selectexOptions: [
            {id: 1, name: '111'},
            {id: 2, name: '222'},
            {id: 3, name: '333'}
        ],
        selectexValue: 2
    },
    config: function() {

    },
    init: function() {
        //Modal.confirm('模拟一个Alert');
    },
    test: function() {
        Modal.alert('test');
    }
});

var app = new App().$inject('#app');