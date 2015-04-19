/**
 * ------------------------------------------------------------
 * TreeSelect 树型选择
 * @version  0.0.1
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var SelectEx = require('./selectEx.js');
var template = require('./treeSelect.html');
var _ = require('../base/util.js');
var Treeview = require('./treeView.js');

/**
 * @class TreeSelect
 * @extend SelectEx
 */
var TreeSelect = SelectEx.extend({
    name: 'treeSelect',
    template: template,
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            // @inherited selected: null,
            // @inherited placeholder: '请选择',
            // @inherited open: false,
            // @inherited disabled: false,
            // @inherited multiple: false
        });
        this.supr();
    }
});

module.exports = TreeSelect;