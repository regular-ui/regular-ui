/**
 * ------------------------------------------------------------
 * Accordion       选项卡
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../base/component.js');
var template = require('./accordion.html');
var itemTemplate = require('./accordionPane.html');
var _ = require('../base/util.js');

/**
 * @class Accordion
 * @extend Component
 * @param {object}                  options.data                    绑定属性
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
            source: []
        });
        this.supr();
    }
});

var AccordionPane = Component.extend({
    name: 'accordionPane',
    template: itemTemplate,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            name: '',
            open: false
        });
        this.supr();

        if(this.$outer) {
            var source = this.$outer.data.source;
            var item = {
                name: this.data.name,
                open: open,
                disabled: this.data.disabled,
                accordion: this
            };
            source.push(item);
        }
    },
    toggle: function(open) {
        this.data.open = open;
    }
});

module.exports = Accordion;