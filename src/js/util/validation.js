
/**
 * ------------------------------------------------------------
 * Validation  表单验证
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('regular-ui-base/src/component');
var _ = require('regular-ui-base/src/_');
var validator = require('validator');

/**
 * @class Validation
 * @extend Component
 * @param {object}                  options.data                     =  绑定属性
 * @param {boolean=false}           options.data.disabled            => 是否禁用。当禁用时验证始终通过。
 */
var Validation = Component.extend({
    name: 'validation',
    template: '{#inc this.$body}',
    /**
     * @protected
     */
    config: function() {
        this.controls = [];

        _.extend(this.data, {});
        this.supr();
    },
    /**
     * @method validate() 验证所有表单组件
     * @public
     * @return {object} conclusion 结论
     */
    validate: function() {
        if(this.data.disabled)
            return {
                success: true,
                message: 'Validation is disabled.'
            }

        var conclusion = {
            results: [],
            success: true,
            message: ''
        };

        this.controls.forEach(function(control) {
            var result = control.validate();
            conclusion.results.push(result);
            if(!result.success) {
                conclusion.success = false;
                conclusion.message = conclusion.message || result.message;
            }
        });

        return conclusion;
    }
});

Validation.validate = function(value, rules) {
    var result = {
        success: true,
        message: ''
    }

    rules.forEach(function(rule) {
        rule.success = true;

        // if(rule.type === 'is')
        //     rule.success = rule.options.test(value);
        // else if(rule.type === 'isNot')
        //     rule.success = !rule.options.test(value);
        // else if(rule.type === 'isRequired')
        //     rule.success = !!validator.toString(value);
        // else if(rule.type === 'isFilled')
        //     rule.success = !!validator.toString(value).trim();
        // else if(rule.type === 'method')
        //     rule.success = rule.method(value, rule);
        // else
        //     rule.success = validator[rule.type](value, rule.options);

        // 为了兼容
        if(rule.type === 'is')
            rule.success = (rule.options || rule.reg).test(value);
        else if(rule.type === 'isNot')
            rule.success = !(rule.options || rule.reg).test(value);
        else if(rule.type === 'isRequired')
            rule.success = !!validator.toString(value);
        else if(rule.type === 'isFilled')
            rule.success = !!validator.toString(value).trim();
        else if(rule.type === 'isNumber')
            rule.success = validator.isInt(value + '', rule.options);
        else if(rule.type === 'isLength')
            rule.success = validator.isLength(value + '', rule.options || {min: rule.min, max: rule.max});
        else if(rule.type === 'method' || rule.method)
            rule.success = (rule.options || rule.method)(value, rule);
        else
            rule.success = validator[rule.type](value + '', rule.options);

        rule.callback && rule.callback(value, rule);

        if(!rule.success && result.success) {
            result.success = false;
            result.firstRule = rule;
            // @deprecated
            result.message = rule.message;
        }
    });

    return result;
}

module.exports = Validation;
