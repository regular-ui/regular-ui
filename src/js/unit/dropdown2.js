/**
 * ------------------------------------------------------------
 * Dropdown2 下拉菜单2
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('regular-ui-base/src/component');
var template = require('./dropdown2.html');
var _ = require('regular-ui-base/src/_');

/**
 * @class Dropdown2
 * @extend Component
 * @param {object}                  options.data                     =  绑定属性
 * @param {boolean=false}           options.data.open               <=> 当前为展开/收起状态
 * @param {boolean=false}           options.data.disabled            => 是否禁用
 * @param {boolean=true}            options.data.visible             => 是否显示
 * @param {string=''}               options.data.class               => 补充class
 */
var Dropdown2 = Component.extend({
    name: 'dropdown2',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            open: false
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
        if(this.data.disabled || item.disabled || item.divider)
            return;

        /**
         * @event select 选择某一项时触发
         * @property {object} sender 事件发送对象
         * @property {object} selected 当前选择项
         */
        this.$emit('select', {
            sender: this,
            selected: item
        });

        this.toggle(false);
    }
});

Dropdown2.Head = Component.extend({
    name: 'dropdown2.head',
    template: '<toggle.head>{#inc this.$body}</toggle.head>'
});

Dropdown2.Body = Component.extend({
    name: 'dropdown2.body',
    template: '<toggle.body>{#inc this.$body}</toggle.body>'
});

module.exports = Dropdown2;
