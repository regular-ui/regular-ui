/**
 * ------------------------------------------------------------
 * TreeSelect 树型选择
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
 * @param {object}                  options.data                    绑定属性
 * @param {object[]=[]}             options.data.source             数据源
 * @param {number}                  options.data.source[].id        每项的id
 * @param {string}                  options.data.source[].name      每项的内容
 * @param {object=null}             options.data.selected           当前选择项
 * @param {string='请选择'}         options.data.placeholder        默认项的文字
 * @param {boolean=false}           options.data.disabled           是否禁用该组件
 * @param {string=''}               options.data.class              补充class
 * @param {object}                  options.service                 数据服务
 */
var TreeSelect = SelectEx.extend({
    name: 'treeSelect',
    template: template,
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            // @inherited open: false,
            // @inherited selected: null,
            // @inherited placeholder: '请选择',
            // @inherited disabled: false,
        });
        this.supr();
    }
});

module.exports = TreeSelect;