/**
 * ------------------------------------------------------------
 * Component 组件基类
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Regular = require('regularjs');
var _ = require('./util.js');
var filter = require('./filter.js');

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
.directive({
    'r-show': function(elem, value) {
        this.$watch(value, function(newValue, oldValue) {
            if(!newValue == !oldValue)
                return;

            elem.style.display = newValue ? 'block' : '';
        });
    },
    'r-autofocus': function(elem, value) {
        setTimeout(function() {
            elem.focus();
        }, 0);
    }
});

if (!Array.prototype.find) {
    Array.prototype.find = function(predicate) {
        if (this === null)
            throw new TypeError('Array.prototype.find called on null or undefined');

        if (typeof predicate !== 'function')
            throw new TypeError('predicate must be a function');

        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list))
                return value;
        }
        
        return undefined;
    };
}

module.exports = Component;