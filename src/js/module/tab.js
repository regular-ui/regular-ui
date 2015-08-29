/**
 * ------------------------------------------------------------
 * Tab       选项卡
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../base/component.js');
var template = require('text!./tab.html');
var _ = require('../base/util.js');

/**
 * @class Tab
 * @extend Component
 * @param {object}                  options.data                    绑定属性
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 */
var Tab = Component.extend({
    name: 'tab',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            source: [],
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
        if(item.disabled || this.data.readonly || this.data.disabled)
            return;

        this.data.selected = item;
        /**
         * @event select 选择某一项时触发
         * @property {object} selected 当前选择项
         */
        this.$emit('select', {
            selected: item
        });
    }
});

var TabPane = Component.extend({
    name: 'tabPane',
    template: '<div r-hide={this.$outer.data.selected.tab != this}>{#include this.$body}</div>',
    /**
     * @protected
     */
    config: function() { 
        if(this.$outer) {
            var source = this.$outer.data.source;
            var item = {
                title: this.data.title,
                disabled: this.data.disabled,
                tab: this
            };
            source.push(item);

            if(!this.$outer.data.selected)
                this.$outer.data.selected = item;
        }
    }
});

module.exports = Tab;