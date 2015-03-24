var BaseComponent = require('../src/js/core/base.js');
var template = require('./app-button.html');
var _ = require('../src/js/core/util.js');
//var Selectex = require('../src/js/core/selectex.js');
var Selectex2 = require('../src/js/core/selectex.js');
var Suggest = require('../src/js/core/suggest.js');
var Modal = require('../src/js/core/modal.js');
var Listbox = require('../src/js/core/listbox.js');
var Listview = require('../src/js/core/listview.js');
var Treeview = require('../src/js/core/treeview.js');
var Selectree = require('../src/js/core/selectree.js');

var App = BaseComponent.extend({
    name: 'app',
    template: template,
    config: function() {
        _.extend(this.data, {
            source: [
                {id: 1, name: '111'},
                {id: 2, name: '222'},
                {id: 3, name: '333'}
            ],
            treeSource: [
                {id: 1, name: '1', children: [{id: 11, name: '1--1'}, {id: 12, name: '1--2'}]},
                {id: 2, name: '2'}
            ]
        });
        this.supr();
    },
    init: function() {
        //Modal.confirm('模拟一个Alert');
    },
    test: function() {
        Modal.alert('test');
    }
});

var app = new App().$inject('#app');