/*
 * --------------------------------------------
 * 下拉列表UI
 * @version  1.0
 * @author   zhaoyusen(hzzhaoyusen@corp.netease.com)
 * --------------------------------------------
 * @class List
 * @extend BaseComponent
 * @param {Object} options
 *     options.value             
 *              
 */

var Listbox = require('./listbox.js');
var template = require('./listview.html');
var _ = require('./util.js');

var Listview = Listbox.extend({
    name: 'listview',
    template: template,
    config: function() {
        _.extend(this.data, {
            itemTemplate: null //'{item.id}'
            // @override source: [],
            // @override selected: null,
            // @override disabled: false,
            // @override multiple: false
        });
        this.supr();
    },
    select: function(item) {
        this.data.selected = item;
        
    }
});

module.exports = Listview;