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
 * @param {object}                  options.data                    绑定属性
 * @param {object[]=[]}             options.data.source             数据源
 * @param {string}                  options.data.source[].name      每项的内容
 * @param {object=null}             options.data.selected           当前选择项
 * @param {string='请选择'}         options.data.placeholder        默认项的文字
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 * @param {object}                  options.service                 数据服务
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
            selected: null,
            placeholder: '请选择'
        });
        this.supr();

        this.$watch('selected', function(newValue, oldValue) {
            /**
             * @event change 选择项改变时触发
             * @property {object} selected 改变后的选择项
             */
            this.$emit('change', {
                selected: newValue
            });
        });

        this.$watch('source', function(newValue, oldValue) {
            if(!newValue || newValue.indexOf(this.data.selected) < 0)
                this.data.selected = null;
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