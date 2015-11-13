/**
 * ------------------------------------------------------------
 * Collapse       选项卡
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../base/component.js');
var template = require('text!./collapse.html');
var itemTemplate = require('text!./panel.html');
var _ = require('../base/_.js');

/**
 * @class Collapse
 * @extend Component
 * @param {object}                  options.data                     =  绑定属性
 * @param {boolean=false}           options.data.accordion           => 是否每次只展开一个
 * @param {boolean=false}           options.data.readonly            => 是否只读
 * @param {boolean=false}           options.data.disabled            => 是否禁用
 * @param {boolean=true}            options.data.visible             => 是否显示
 * @param {string=''}               options.data.class               => 补充class
 */
var Collapse = Component.extend({
    name: 'collapse',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            panels: [],
            accordion: false
        });
        this.supr();
    }
    /**
     * @method toggle(item) 展开或收起某一项
     * @private
     * @param  {object} item 展开收起项
     * @return {void}
     */
});

var Panel = Component.extend({
    name: 'panel',
    template: itemTemplate,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            title: '',
            open: false
        });
        this.supr();

        if(this.$outer)
            this.$outer.data.panels.push(this);
    },
    toggle: function(open) {
        if(open && this.$outer.data.accordion) {
            this.$outer.data.panels.forEach(function(pane) {
                pane.data.open = false;
            });
        }

        this.data.open = open;
    }
});

module.exports = Collapse;