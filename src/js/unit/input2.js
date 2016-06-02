/**
 * ------------------------------------------------------------
 * Input2   输入扩展
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

var Component = require('regular-ui-base/src/component');
var template = require('./input2.html');
var _ = require('regular-ui-base/src/_');
var Validation = require('../util/validation.js');

var bowser = require('bowser');

/**
 * @class Input2
 * @extend Component
 * @param {object}                  options.data                     =  绑定属性
 * @param {string=''}               options.data.value              <=> 文本框的值
 * @param {string=''}               options.data.type                => 文本框的类型
 * @param {string=''}               options.data.placeholder         => 占位符
 * @param {string=''}               options.data.state              <=> 文本框的状态
 * @param {number}                  options.data.maxlength           => 文本框的最大长度
 * @param {string=''}               options.data.unit                => 单位
 * @param {object[]=[]}             options.data.rules               => 验证规则
 * @param {boolean=false}           options.data.autofocus           => 是否自动获得焦点
 * @param {boolean=false}           options.data.readonly            => 是否只读
 * @param {boolean=false}           options.data.disabled            => 是否禁用
 * @param {boolean=true}            options.data.visible             => 是否显示
 * @param {string=''}               options.data.class               => 补充class
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
            state: '',
            maxlength: undefined,
            unit: '',
            rules: [],
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
    validate: function(on) {
        var value = this.data.value;
        var rules = this.data.rules;

        var PRIORITY = {
            'keyup': 2,
            'blur': 1,
            'submit': 0,
            '': 0
        }

        on = on || '';
        rules = rules.filter(function(rule) {
            return (rule.on || '').indexOf(on) >= 0;
        });

        var result = Validation.validate(value, rules);
        if(result.firstRule
            && !(result.firstRule.silentOn === true || (typeof result.firstRule.silentOn === 'string' && result.firstRule.silentOn.indexOf(on) >= 0)))
                this.data.tip = result.firstRule.message;
        else
            this.data.tip = '';

        // @TODO
        if(!result.success)
            this.data.state = 'error';
        // else if(PRIORITY[on] <= PRIORITY['blur'])
        //     this.data.state = 'success';
        else
            this.data.state = '';

        this.$emit('validate', {
            sender: this,
            on: on,
            result: result
        });

        return result;
    },
    _onKeyUp: function($event) {
        this.validate('keyup');
        this.$emit('keyup', $event);
    },
    _onBlur: function($event) {
        this.validate('blur');
        this.$emit('blur', $event);
    }
});

module.exports = Input2;
