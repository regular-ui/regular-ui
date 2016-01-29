/**
 * ------------------------------------------------------------
 * TextArea2   输入扩展
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

var Component = require('regular-ui-base/src/component');
var template = require('./textarea2.html');
var _ = require('regular-ui-base/src/_');
var Validation = require('../util/validation.js');

var bowser = require('bowser');

/**
 * @class TextArea2
 * @extend Component
 * @param {object}                  options.data                     =  绑定属性
 * @param {string=''}               options.data.value              <=> 文本框的值
 * @param {string=''}               options.data.placeholder         => 占位符
 * @param {string=''}               options.data.state              <=> 文本框的状态
 * @param {number}                  options.data.maxlength           => 文本框的最大长度
 * @param {object[]=[]}             options.data.rules               => 验证规则
 * @param {boolean=false}           options.data.validating          => 是否实时验证
 * @param {boolean=false}           options.data.autofocus           => 是否自动获得焦点
 * @param {boolean=false}           options.data.readonly            => 是否只读
 * @param {boolean=false}           options.data.disabled            => 是否禁用
 * @param {boolean=true}            options.data.visible             => 是否显示
 * @param {string=''}               options.data.class               => 补充class
 */
var TextArea2 = Component.extend({
    name: 'textarea2',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            value: '',
            placeholder: '',
            state: '',
            maxlength: undefined,
            rules: [],
            validating: false,
            autofocus: false,
            _eltIE9: bowser.msie && bowser.version <= 9
        });
        this.supr();

        var $outer = this.$outer;
        if($outer && $outer instanceof Validation) {
            $outer.controls.push(this);

            this.$on('destroy', function() {
                var index = $outer.controls.indexOf(this);
                $outer.controls.splice(index, 1);
            });
        }
    },
    /**
     * @method validate() 根据`rules`验证组件的值是否正确
     * @public
     * @return {object} result 结果
     */
    validate: function() {
        var value = this.data.value;
        var rules = this.data.rules;
        var result = Validation.validate(value, rules);
        
        this.data.state = result.success ? 'success' : 'error';
        this.data.tip = result.message;

        return result;
    }
});

module.exports = TextArea2;