/**
 * ------------------------------------------------------------
 * NumberInput 输入扩展
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

var Component = require('../base/component.js');
var template = require('./numberInput.html');
var _ = require('../base/util.js');

/**
 * @class NumberInput
 * @extend Component
 * @param {object}                  options.data                    绑定属性
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 */
var NumberInput = Component.extend({
    name: 'numberInput',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            value: 0,
            unit: '%',
            type: null
        });
        this.supr();
    },
    validate: function(value) {
    },
    increase: function() {
        this.data.value++;
    },
    decrease: function() {
        this.data.value--;
    }
}).filter({
    number: {
        get: function(value) {
            return '' + (value || 0);
        },
        set: function(value) {
            return +value || 0;
            // return +(value.replace(/[^\d\.\-]/g, '')) || 0;
        }
    }
});

module.exports = NumberInput;