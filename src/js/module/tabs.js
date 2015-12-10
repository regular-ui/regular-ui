/**
 * ------------------------------------------------------------
 * Tabs       选项卡
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('regular-ui-base/src/component');
var template = require('text!./tabs.html');
var _ = require('regular-ui-base/src/_');

/**
 * @class Tabs
 * @extend Component
 * @param {object}                  options.data                     =  绑定属性
 * @param {boolean=false}           options.data.readonly            => 是否只读
 * @param {boolean=false}           options.data.disabled            => 是否禁用
 * @param {boolean=true}            options.data.visible             => 是否显示
 * @param {string=''}               options.data.class               => 补充class
 */
var Tabs = Component.extend({
    name: 'tabs',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            tabs: [],
            selected: null
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
        if(this.data.readonly || this.data.disabled || item.data.disabled)
            return;

        this.data.selected = item;
        /**
         * @event select 选择某一项时触发
         * @property {object} source 事件发起对象
         * @property {object} selected 当前选择项
         */
        this.$emit('select', {
            source: this,
            selected: item
        });
    }
});

var Tab = Component.extend({
    name: 'tab',
    template: '<div r-hide={this.$outer.data.selected !== this}>{#inc this.$body}</div>',
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            title: ''
        });
        this.supr();

        if(this.$outer)
            this.$outer.data.tabs.push(this);

        if(!this.$outer.data.selected)
            this.$outer.data.selected = this;
    }
});

module.exports = Tabs;