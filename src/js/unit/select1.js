/**
 * ------------------------------------------------------------
 * Select1  选择扩展1
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var SourceComponent = require('regular-ui-base/src/sourceComponent');
var template = require('./select1.html');
var _ = require('regular-ui-base/src/_');

/**
 * @class Select1
 * @extend SourceComponent
 * @param {object}                  options.data                     =  绑定属性
 * @param {object[]=[]}             options.data.source             <=> 数据源
 * @param {string}                  options.data.source[].name       => 每项的内容
 * @param {boolean=false}           options.data.source[].disabled   => 禁用此项
 * @param {string|number}           options.data.value              <=> 当前选择值
 * @param {string='请选择'}         options.data.placeholder         => 默认项的文字，如果`placeholder`为空并且没有选择项时，将会自动选中第一项。
 * @param {boolean=false}           options.data.readonly            => 是否只读
 * @param {boolean=false}           options.data.disabled            => 是否禁用
 * @param {boolean=true}            options.data.visible             => 是否显示
 * @param {string=''}               options.data.class               => 补充class
 * @param {object}                  options.service                 @=> 数据服务
 */
var Select1 = SourceComponent.extend({
    name: 'select1',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            selected: undefined,
            value: '',
            placeholder: '请选择'
        });
        this.supr();

        this.$watch('selected', function(newValue, oldValue) {
            // this.data.value = newValue ? newValue[this.data.key] : newValue;

            /**
             * @event change 选择项改变时触发
             * @property {object} sender 事件发送对象
             * @property {object} selected 改变后的选择项
             * @property {string|number} value 改变后的选择值
             */
            this.$emit('change', {
                sender: this,
                selected: newValue,
                value: this.data.value
            });
        });

        this.$watch('value', function(newValue, oldValue) {
            if(newValue === '' || newValue === undefined)
                return this.data.selected = undefined;

            if(this.data.source)
                this.data.selected = this.data.source[newValue];
        });

        this.$watch('source', function(newValue, oldValue) {
            if(newValue === undefined)
                return this.data.value = '';

            if(!(newValue instanceof Array))
                throw new TypeError('`source` is not an Array!');

            if(newValue.length && (typeof newValue[0] === 'string' || typeof newValue[0] === 'number'))
                return this.data.source = newValue.map(function(name, index) {
                    return {id: index, name: name};
                });

            // 当placeholder为空时，自动选择第一项
            if(!this.data.placeholder) {
                this.data.value = 0;
                this.data.selected = this.data.source[0];    // 手动更新
            } else
                this.data.value = '';
        });
    }
});

module.exports = Select1;