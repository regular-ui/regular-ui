/**
 * ------------------------------------------------------------
 * Collapse  折叠面板
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('regular-ui-base/src/component');
var template = require('text!./collapse.html');
var _ = require('regular-ui-base/src/_');

var Panel = require('./panel.js');

/**
 * @class Collapse
 * @extend Component
 * @param {object}                  options.data                     =  绑定属性
 * @param {boolean=false}           options.data.accordion           => 是否每次只展开一个
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
});

module.exports = Collapse;