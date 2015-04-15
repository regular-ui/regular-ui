/*
 * --------------------------------------------
 * 下拉列表UI
 * @version  1.0
 * @author   zhaoyusen(rainforest92@126.com)
 * --------------------------------------------
 * @class SelectEx
 * @extend Component
 * @param {Object} options
 *     options.value             
 *              
 */

var SelectEx = require('./selectEx.js');
var template = require('./treeSelect.html');
var Treeview = require('./treeView.js');
var _ = require('../base/util.js');

var TreeSelect = SelectEx.extend({
    name: 'selectree',
    template: template,
    config: function() {
        _.extend(this.data, {
            // @override source: [],
            // @override selected: null,
            // @override placeholder: '请选择',
            // @override open: false,
            // @override disabled: false,
            // @override multiple: false
        });
        this.supr();
    }
    // select: function(item) {
    //     this.data.selected = item;
    //     this.toggle(false);
    // }
});

module.exports = TreeSelect;