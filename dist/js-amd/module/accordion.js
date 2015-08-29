define(function (require, exports, module) {/**
 * ------------------------------------------------------------
 * Accordion       选项卡
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../base/component.js');
var template = require('text!./accordion.html');
var itemTemplate = require('text!./accordionPane.html');
var _ = require('../base/util.js');

/**
 * @class Accordion
 * @extend Component
 * @param {object}                  options.data                    绑定属性
 * @param {boolean=true}            options.data.collapse           是否只能同时展开一个
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 */
var Accordion = Component.extend({
    name: 'accordion',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            panes: [],
            collapse: true
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

var AccordionPane = Component.extend({
    name: 'accordionPane',
    template: itemTemplate,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            title: '',
            open: false,
            disabled: false
        });
        this.supr();

        if(this.$outer)
            this.$outer.data.panes.push(this);
    },
    toggle: function(open) {
        if(open && this.$outer.data.collapse) {
            this.$outer.data.panes.forEach(function(pane) {
                pane.data.open = false;
            });
        }

        this.data.open = open;
    }
});

module.exports = Accordion;
});
