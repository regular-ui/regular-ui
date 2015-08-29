/**
 * ------------------------------------------------------------
 * Check2   多选按钮
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../base/component.js');
var template = require('text!./check2.html');
var _ = require('../base/util.js');

/**
 * @class Check2
 * @extend Component
 * @param {object}                  options.data                    绑定属性
 * @param {string=''}               options.data.name               多选按钮的文字
 * @param {object=null}             options.data.checked            多选按钮的选择状态
 * @param {boolean=false}           options.data.block              是否以block方式显示
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 */
var Check2 = Component.extend({
    name: 'check2',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            name: '',
            checked: false,
            block: false
        });
        this.supr();
    },
    /**
     * @method check(checked) 改变选中状态
     * @public
     * @param  {boolean} checked 选中状态
     * @return {void}
     */
    check: function(checked) {
        if(this.data.readonly || this.data.disabled)
            return;

        this.data.checked = checked;
        /**
         * @event check 改变选中状态时触发
         * @property {boolean} checked 选中状态
         */
        this.$emit('check', {
            checked: checked
        });
    }
});

module.exports = Check2;