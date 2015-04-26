/**
 * ------------------------------------------------------------
 * SelectEx  选择扩展
 * @version  0.0.1
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var DropDown = require('./dropDown.js');
var template = require('./selectEx.html');
var _ = require('../base/util.js');

/**
 * @class SelectEx
 * @extend DropDown
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
var SelectEx = DropDown.extend({
    name: 'selectEx',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            selected: null,
            placeholder: '请选择',
            // @inherited disabled: false,
            // @inherited open: false
        });
        this.supr();
    },
    /**
     * @method select(item) 选择某一项
     * @public
     * @param  {object} item 选择项
     * @return {void}
     */
    select: function(item) {
        this.$update('selected', item);
        //this.data.selected = item;
        /**
         * @event select 选择某一项时触发
         * @property {object} selected 当前选择项
         */
        this.$emit('select', {
            selected: item
        });
        this.toggle(false);
    },
});

module.exports = SelectEx;