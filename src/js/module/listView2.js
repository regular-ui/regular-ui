/**
 * ------------------------------------------------------------
 * ListView2 列表视图2
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('regular-ui-base/src/component');
var template = require('./listView2.html');
var _ = require('regular-ui-base/src/_');
var Item = require('./item.js');

/**
 * @class ListView2
 * @extend Component
 * @param {object}                  options.data                     =  绑定属性
 * @param {variable}                options.data.value              <=> 当前选择的值
 * @param {boolean=false}           options.data.multiple            => 是否可以多选
 * @param {boolean=false}           options.data.readonly            => 是否只读
 * @param {boolean=false}           options.data.disabled            => 是否禁用
 * @param {boolean=true}            options.data.visible             => 是否显示
 * @param {string=''}               options.data.class               => 补充class
 */
var ListView2 = Component.extend({
    name: 'listView2',
    template: template,
    /**
     * @protected
     */
    config: function() {
        this.list = [];
        this.selected = undefined;
        _.extend(this.data, {
            value: undefined,
            multiple: false
        });
        this.supr();

        this.$watch('value', function(newValue, oldValue) {
            if(!this.selected || this.selected.data.value !== newValue) {
                this.selected = this.list.find(function(item) {
                    return item.data.value === newValue;
                });
            }

            /**
             * @event change 选择值改变时触发
             * @property {object} sender 事件发送对象
             * @property {Item} selected 改变后的选择项
             * @property {variable} value 改变后的选择值
             */
            this.$emit('change', {
                sender: this,
                selected: this.selected,
                value: newValue
            });
        });

        this.$watch('this.selected', function(newValue, oldValue) {
            // 改变item的选择状态
            oldValue && (oldValue.data.selected = false);
            newValue && (newValue.data.selected = true);
            // 设置value
            this.data.value = newValue ? newValue.data.value : newValue;
        });
    },
    /**
     * @method select(item) 选择某一项
     * @public
     * @param  {Item} item 选择项
     * @return {void}
     */
    select: function(item) {
        if(this.data.readonly || this.data.disabled)
            return;

        if(this.data.multiple)
            item.data.selected = !item.data.selected;
        else
            this.selected = item;

        /**
         * @event select 选择某一项时触发
         * @property {object} sender 事件发送对象
         * @property {Item} selected 当前选择项
         */
        this.$emit('select', {
            sender: this,
            selected: item
        });
    }
});

module.exports = ListView2;
