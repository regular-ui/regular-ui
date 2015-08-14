/**
 * ------------------------------------------------------------
 * NumberInput 输入扩展
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

var Input2 = require('./input2.js');
var template = require('./numberInput.html');
var _ = require('../base/util.js');

/**
 * @class NumberInput
 * @extend Input2
 * @param {object}                  options.data                    绑定属性
 * @param {string=''}               options.data.value              输入框的值
 * @param {string=''}               options.data.type               输入框的类型
 * @param {string=''}               options.data.placeholder        占位符
 * @param {number=null}             options.data.min                最小值
 * @param {number=null}             options.data.max                最大值
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
            min: null,
            max: null
        });
        this.supr();

        this.$watch('value', function(newValue, oldValue) {
            if(this.data.max !== null && this.data.value > this.data.max)
                this.data.value = this.data.max;
            if(this.data.min !== null && this.data.value < this.data.min)
                this.data.value = this.data.min;
        });
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