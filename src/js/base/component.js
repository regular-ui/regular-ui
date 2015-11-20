/**
 * ------------------------------------------------------------
 * Component 组件基类
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Regular = require('regularjs');
var compatibility = require('./compatibility.js');
var _ = require('./_.js');
var filter = require('./filter.js');
var directive = require('./directive.js');

/**
 * @class Component
 * @extend Regular
 * @param {boolean=false}           options.data.readonly            => 是否只读
 * @param {boolean=false}           options.data.disabled            => 是否禁用
 * @param {boolean=true}            options.data.visible             => 是否显示
 * @param {string=''}               options.data.class               => 补充class
 */
var Component = Regular.extend({
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            readonly: false,
            disabled: false,
            visible: true,
            'class': '',
            console: console
        });
        this.supr();
    },
    /**
     * @protected
     */
    reset: function() {
        this.data = {};
        this.config();
    }
})
.filter(filter)
.directive(directive);

module.exports = Component;