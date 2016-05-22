/**
 * ------------------------------------------------------------
 * Item      列表项
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('regular-ui-base/src/component');
var template = require('./item.html');
var _ = require('regular-ui-base/src/_');

/**
 * @class Item
 * @extend Component
 * @param {object}                  options.data                     =  绑定属性
 * @param {boolean=false}           options.data.selected           <=> 此项是否被选中
 * @param {boolean=false}           options.data.divider             => 设置此项为分隔线
 * @param {string}                  options.data.title               => 此项的工具提示
 * @param {boolean=false}           options.data.disabled            => 禁用此项
 * @param {boolean=true}            options.data.visible             => 是否显示
 * @param {string=''}               options.data.class               => 补充class
 */
var Item = Component.extend({
    name: 'item',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            selected: false,
            disabled: false,
            divider: false,
            title: undefined
        });
        this.supr();

        this.$context = this.$outer;

        // 没有$outer就直接报错吧
        this.$context.list.push(this);
        // 选择第一个selected为true的item
        if(!this.$context.selected && this.data.selected)
            this.$context.selected = this;
    },
    /**
     * @protected
     */
    destroy: function() {
        if(this.$context.selected === this)
            this.$context.selected = undefined;
        // 从$outer组件的列表中删除自己
        var index = this.$context.list.indexOf(this);
        if(index >= 0)
            this.$context.list.splice(index, 1);
        this.supr();
    },
    select: function() {
        if(this.data.disabled || this.data.divider)
            return;

        this.$context.select(this);
    }
});

module.exports = Item;
