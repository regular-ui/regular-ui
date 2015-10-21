/**
 * ------------------------------------------------------------
 * Validation  表单验证
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../base/component.js');
var _ = require('../base/util.js');
var validator = require('validator');

/**
 * @class Validation
 * @extend Component
 * @param {object}                  options.data                    绑定属性
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

        if(rule.type === 'is')
            rule.success = rule.reg.test(value);
        else if(rule.type === 'isRequired')
            rule.success = !!value;
        else if(rule.type === 'isFilled')
            rule.success = !!value && (value + '').trim();
        else if(rule.type === 'isEmail')
            rule.success = validator.isEmail(value);
        else if(rule.type === 'isMobilePhone')
            rule.success = validator.isMobilePhone(value, 'zh-CN');
        else if(rule.type === 'isURL')
            rule.success = validator.isURL(value);
        else if(rule.type === 'isNumber')
            rule.success = validator.isInt(value);
        else if(rule.type === 'isInt')
            rule.success = validator.isInt(value);
        else if(rule.type === 'isFloat')
            rule.success = validator.isFloat(value);
        else if(rule.type === 'isLength')
            rule.success = validator.isLength(value, rule.min, rule.max);
        else
            rule.success = rule.method(value);

        if(!rule.success && result.success) {
            result.success = false;
            result.message = rule.message;
        }
    });

    return result;
}

module.exports = Validation;