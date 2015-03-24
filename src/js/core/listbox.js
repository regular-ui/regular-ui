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

var BaseComponent = require('./base.js');
var template = require('./listbox.html');
var _ = require('./util.js');

var Listbox = BaseComponent.extend({
    name: 'listbox',
    template: template,
    config: function() {
        _.extend(this.data, {
            source: [],
            selected: null,
            disabled: false,
            multiple: false
        });
        this.supr();
    },
    select: function(item) {
        this.data.selected = item;
        
    }
});

module.exports = Listbox;