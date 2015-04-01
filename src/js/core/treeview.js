/*
 * --------------------------------------------
 * 下拉列表UI
 * @version  1.0
 * @author   zhaoyusen(hzzhaoyusen@corp.netease.com)
 * --------------------------------------------
 * @class List
 * @extend Component
 * @param {Object} options
 *     options.value             
 *              
 */

var Component = require('./component.js');
var template = require('./treeview.html');
var recursiveTempate = require('./treeviewlist.html');
var _ = require('./util.js');

var Treeview = Component.extend({
    name: 'treeview',
    template: template,
    config: function() {
        _.extend(this.data, {
            source: [],
            selected: null,
            disabled: false,
            multiple: false
        });
        this.supr();

        this.treeroot = this;
    },
    select: function(item) {
        this.data.selected = item;
        this.$emit('select', {
            selected: item
        });
    }
});

var Treeviewlist = Component.extend({
    name: 'treeviewlist',
    template: recursiveTempate,
    config: function() {
        _.extend(this.data, {
            itemTemplate: null,
            // @override source: [],
            visible: false
        });
        this.supr();
        this.treeroot = this.$parent.treeroot;
    },
    select: function(item) {
        this.treeroot.select(item);
    },
    toggle: function(item) {
        item.open = !item.open;
    }
})

module.exports = Treeview;