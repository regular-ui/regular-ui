/**
 * ------------------------------------------------------------
 * SelectGroup 多级选择
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('regular-ui-base/src/component');
var template = require('./selectGroup.html');
var _ = require('regular-ui-base/src/_');

/**
 * @class SelectGroup
 * @extend Component
 * @param {object}                  options.data                     =  绑定属性
 * @param {object[]=[]}             options.data.source             <=> 数据源
 * @param {string}                  options.data.source[].name       => 每项的内容
 * @param {boolean=false}           options.data.source[].disabled   => 禁用此项
 * @param {number=1}                options.data.depth               => 层级数
 * @param {object}                  options.data.selected           <=  最后的选择项
 * @param {object[]=[]}             options.data.values    <=> 所有的选择项
 * @param {string[]=[]}             options.data.placeholders        => 默认项的文字
 * @param {boolean=false}           options.data.readonly            => 是否只读
 * @param {boolean=false}           options.data.disabled            => 是否禁用
 * @param {boolean=true}            options.data.visible             => 是否显示
 * @param {string=''}               options.data.class               => 补充class
 * @param {object}                  options.service                 @=> 数据服务
 */
var SelectGroup = Component.extend({
    name: 'selectGroup',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            depth: 1,
            sources: [],
            selected: undefined,
            values: [],
            placeholders: []
        });
        this.supr();

        this.$watch('selected', function(newValue, oldValue) {
            /**
             * @event change 最后的选择项改变时触发
             * @property {object} sender 事件发送对象
             * @property {object} selected 最后的选择项
             * @property {object} values 所有的选择项
             */
            this.$emit('change', {
                sender: this,
                selected: newValue,
                values: this.data.values
            });
        });

        this.data.sources[0] = this.data.source;
    },
    /**
     * @private
     */
    _onChange: function($event, level) {
        var sources = this.data.sources;
        var item = sources[level] && sources[level][$event.value];

        // 由内部<select>控制
        // if(this.data.readonly || this.data.disabled || (item && (item.disabled || item.divider)))
        //     return;

        sources[level + 1] = item ? item.children : undefined;
        for(var i = level + 2; i < this.data.depth; i++)
            sources[i] = undefined;

        if(level === this.data.depth - 1)
            this.data.selected = item;

        /**
         * @event select 选择某一项时触发
         * @property {object} sender 事件发送对象
         * @property {object} selected 当前选择项
         * @property {object} level 当前选择的层级
         */
        this.$emit('select', {
            sender: this,
            selected: item,
            values: this.data.values,
            level: level
        });
    }
});

module.exports = SelectGroup;