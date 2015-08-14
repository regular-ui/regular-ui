/**
 * ------------------------------------------------------------
 * Input2   输入扩展
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

var Component = require('../base/component.js');
var template = require('./input2.html');
var _ = require('../base/util.js');
var validator = require('../base/validator.js');

/**
 * @class Input2
 * @extend Component
 * @param {object}                  options.data                    绑定属性
 * @param {string=''}               options.data.value              输入框的值
 * @param {string=''}               options.data.type               输入框的类型
 * @param {string=''}               options.data.placeholder        占位符
 * @param {object[]=[]}             options.data.rules              验证规则
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
            type: '',
            placeholder: '',
            rules: []
        });
        this.supr();
    },
    validate: function(value, rules) {
        var result = validator.validate(value, rules);
        
        this.data.type = result.success ? 'success' : 'error';
        this.data.tip = result.message;
    }
});

module.exports = Input2;