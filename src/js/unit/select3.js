/**
 * ------------------------------------------------------------
 * Select3   选择扩展
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('regular-ui-base/src/component');
var template = require('./select3.html');
var _ = require('regular-ui-base/src/_');

/**
 * @class Select3
 * @extend Component
 * @param {object}                  options.data                     =  绑定属性
 * @param {variable}                options.data.value              <=> 当前选择值
 * @param {boolean=false}           options.data.open               <=> 当前为展开/收起状态
 * @param {boolean=false}           options.data.readonly            => 是否只读
 * @param {boolean=false}           options.data.disabled            => 是否禁用
 * @param {boolean=true}            options.data.visible             => 是否显示
 * @param {string=''}               options.data.class               => 补充class
 */
var Select3 = Component.extend({
    name: 'select3',
    template: template,
    /**
     * @protected
     */
    config: function() {
        this.list = [];
        this.selected = undefined;
        _.extend(this.data, {
            value: undefined,
            placeholder: '请选择',
            open: undefined
        });
        this.supr();
    },
    init: function() {
        // 将item的操作权移交给listView2
        var listView2 = this.$refs.listView2;
        this.list.forEach(function(item) {
            item.$context = listView2;
            return item;
        });
        listView2.list = this.list;
        listView2.selected = this.selected || this.list[0];
        this.list = [];
        this.selected = undefined;
        this.supr();
    },
    /**
     * @private
     */
    _onSelect: function($event) {
        /**
         * @event select 选择某一项时触发
         * @property {object} sender 事件发送对象
         * @property {Item} selected 当前选择项
         */
        this.$emit('select', {
            sender: this,
            selected: $event.selected
        });

        this.$refs.toggle.toggle(false);
    }
});

module.exports = Select3;
