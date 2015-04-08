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

var Component = require('../base/component.js');
var template = require('./treeView.html');
var recursiveTempate = require('./treeViewList.html');
var _ = require('../base/util.js');

var TreeView = Component.extend({
    name: 'treeView',
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

var TreeViewList = Component.extend({
    name: 'treeViewList',
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

module.exports = TreeView;