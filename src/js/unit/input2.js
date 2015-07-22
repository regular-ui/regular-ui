/**
 * ------------------------------------------------------------
 * Input2   输入扩展
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

var Component = require('../base/component.js');
var template = require('./input2.html');
var _ = require('../base/util.js');

/**
 * @class Input2
 * @extend Component
 * @param {object}                  options.data                    绑定属性
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 */
var Input2 = Component.extend({
    name: 'input2',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            value: '',
            unit: '%',
            type: null
        });
        this.supr();
    },
    validate: function(value) {
        console.log(value);
        var reg = /^\d+$/;
        if(!reg.test(value)) {
            this.data.tip = '请输入数字！';
            this.data.type = 'error';
        } else {
            this.data.tip = '';
            this.data.type = 'success';
        }
    }
});

module.exports = Input2;