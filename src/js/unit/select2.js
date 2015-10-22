/**
 * ------------------------------------------------------------
 * Select2  选择扩展
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Dropdown = require('./dropdown.js');
var template = require('text!./select2.html');
var _ = require('../base/util.js');

/**
 * @class Select2
 * @extend Dropdown
 * @param {object}                  options.data                     =  绑定属性
 * @param {object[]=[]}             options.data.source             <=> 数据源
 * @param {string}                  options.data.source[].name       => 每项的内容
 * @param {object=undefined}        options.data.selected           <=> 当前选择项
 * @param {object=undefined}        options.data.value              <=> 当前选择值
 * @param {object='id'}             options.data.key                 => 数据项的键
 * @param {string='请选择'}         options.data.placeholder         => 默认项的文字，如果`placeholder`为空并且没有选择项时，将会自动选中第一项。
 * @param {boolean=false}           options.data.readonly            => 是否只读
 * @param {boolean=false}           options.data.disabled            => 是否禁用
 * @param {boolean=true}            options.data.visible             => 是否显示
 * @param {string=''}               options.data.class               => 补充class
 * @param {object}                  options.service                 @=> 数据服务
 */
var Select2 = Dropdown.extend({
    name: 'select2',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            // @inherited open: false
            selected: undefined,
            key: 'id',
            value: undefined,
            placeholder: '请选择'
        });
        this.supr();

        this.$watch('selected', function(newValue, oldValue) {
            // console.log('selected', newValue);
            this.data.value = newValue ? newValue[this.data.key] : newValue;

            /**
             * @event change 选择项改变时触发
             * @property {object} selected 改变后的选择项
             */
            this.$emit('change', {
                selected: newValue,
                key: this.data.key,
                value: this.data.value
            });
        });

        this.$watch('value', function(newValue, oldValue) {
            // console.log('value', newValue);
            if(newValue === undefined || newValue === null)
                return this.data.selected = newValue;
            else if(this.data.source) {
                if(!this.data.selected || this.data.selected[this.data.key] !== newValue)
                    this.data.selected = this.data.source.find(function(item) {
                        return item[this.data.key] == newValue;
                    }, this);
            }
        });

        this.$watch('source', function(newValue, oldValue) {
            // console.log('source', newValue);
            if(!newValue)
                return this.data.selected = newValue;

            if(newValue.length && (typeof newValue[0] === 'string' || typeof newValue[0] === 'number'))
                return this.data.source = newValue.map(function(name, index) {
                    return {id: index, name: name};
                });


            if(this.data.value !== undefined && this.data.value !== null) {
                this.data.selected = newValue.find(function(item) {
                    return item[this.data.key] == this.data.value;
                }, this);
            } else if(this.data.selected && newValue.indexOf(this.data.selected) < 0)
                this.data.selected = undefined;

            // 当placeholder为空时，自动选择第一项
            if(!this.data.placeholder && !this.data.selected) {
                this.data.selected = newValue[0];
            }
        });
    },
    /**
     * @method select(item) 选择某一项
     * @public
     * @param  {object} item 选择项
     * @return {void}
     */
    select: function(item) {
        if(this.data.readonly || this.data.disabled || (item && (item.disabled || item.divider)))
            return;

        this.data.selected = item;
        
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

module.exports = Select2;