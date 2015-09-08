/**
 * ------------------------------------------------------------
 * NumberInput 输入扩展
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

var Input2 = require('./input2.js');
var template = require('text!./numberInput.html');
var _ = require('../base/util.js');

/**
 * @class NumberInput
 * @extend Input2
 * @param {object}                  options.data                    绑定属性
 * @param {string=0}                options.data.value              输入框的值
 * @param {string=''}               options.data.type               输入框的类型
 * @param {number=undefined}        options.data.min                最小值
 * @param {number=undefined}        options.data.max                最大值
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 */
var NumberInput = Input2.extend({
    name: 'numberInput',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            value: 0,
            // @inherited type: '',
            // @inherited placeholder: '',
            min: undefined,
            max: undefined
        });
        this.supr();

        this.$watch('value', function(newValue, oldValue) {
            // 字符类型自动转为数字类型
            if(typeof newValue === 'string')
                return this.data.value = +newValue;

            // 如果超出数值范围，则设置为范围边界的数值
            var isOutOfRange = this.isOutOfRange(newValue);
            if(isOutOfRange)
                return this.data.value = isOutOfRange;

            /**
             * @event change 数值改变时触发
             * @property {number} value 改变后的数值
             */
            this.$emit('change', {
                value: newValue
            });
        });

        this.$watch(['min', 'max'], function(min, max) {
            if(!isNaN(min) && !isNaN(max) && min - max > 0)
                throw new NumberInput.NumberRangeException(min, max);

            // 如果超出数值范围，则设置为范围边界的数值
            var isOutOfRange = this.isOutOfRange(this.data.value);
            if(isOutOfRange)
                return this.data.value = isOutOfRange;
        });
    },
    /**
     * @method add(value) 调整数值
     * @public
     * @param  {number=0} value 加/减的值
     * @return {void}
     */
    add: function(value) {
        if(this.data.readonly || this.data.disabled || !value)
            return;

        this.data.value += value;
    },
    /**
     * @method isOutOfRange(value) 是否超出规定的数值范围
     * @public
     * @param {number} value 待测的值
     * @return {boolean|number} 如果没有超出数值范围，则返回false；如果超出数值范围，则返回范围边界的数值
     */
    isOutOfRange: function(value) {
        var min = this.data.min;
        var max = this.data.max;

        // min && value < min && min，先判断是否为空，再判断是否超出数值范围，如果超出则返回范围边界的数值
        return (!isNaN(min) && value < min && min) || (!isNaN(max) && value > max && max);
    }
}).filter({
    number: {
        get: function(value) {
            value = '' + (value || 0);
            if(this.data.format)
                return this.data.format.replace(new RegExp('\\d{0,' + value.length + '}$'), value);
            return value;
        },
        set: function(value) {
            // return (value.replace(/[^0-9\-\.]/g, ''));
            return +value;
            // return +(value.replace(/[^\d\.\-]/g, '')) || 0;
        }
    }
});

NumberInput.NumberRangeException = function(min, max) {
    this.type = 'NumberRangeException';
    this.message = 'Wrong number range where `min` is ' + min + ' and `max` is ' + max + '.';
}

NumberInput.NumberRangeException.prototype.toString = function() {
    return this.message;
}

module.exports = NumberInput;