define(function (require, exports, module) {/**
 * ------------------------------------------------------------
 * TreeSelect 树型选择
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Select2 = require('./select2.js');
var template = require('text!./treeSelect.html');
var _ = require('../base/util.js');
var Treeview = require('../module/treeView.js');

/**
 * @class TreeSelect
 * @extend Select2
 * @param {object}                  options.data                    绑定属性
 * @param {object[]=[]}             options.data.source             数据源
 * @param {number}                  options.data.source[].id        每项的id
 * @param {string}                  options.data.source[].name      每项的内容
 * @param {object=null}             options.data.selected           当前选择项
 * @param {string='请选择'}         options.data.placeholder        默认项的文字
 * @param {boolean=false}           options.data.hierarchical       是否分级动态加载，需要service
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 * @param {object}                  options.service                 数据服务
 */
var TreeSelect = Select2.extend({
    name: 'treeSelect',
    template: template,
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            // @inherited open: false,
            // @inherited selected: null,
            // @inherited placeholder: '请选择'
            hierarchical: false,
            updateAuto: false
        });
        this.supr();
    }
});

module.exports = TreeSelect;
});
