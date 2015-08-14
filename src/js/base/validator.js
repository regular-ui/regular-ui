/**
 * ------------------------------------------------------------
 * Validator 表单验证
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var vali = require('validator');
var validator = {}

/**
 * 235235
rules = [
    {type: 'isRequired', min: 2, max: 5
]
*/

validator.validate = function(value, rules) {
    var result = {
        success: true,
        message: ''
    }

    rules.forEach(function(rule) {
        rule.success = true;

        if(rule.type === 'is') {
            rule.success = rule.reg.test(value);
        } else if(rule.type === 'isRequired') {
            rule.success = !!value;
        } else if(rule.type === 'isFilled') {
            rule.success = !!value && value.trim();
        } else if(rule.type === 'isEmail') {
            rule.success = vali.isEmail(value);
        } else if(rule.type === 'isURL') {
            rule.success = vali.isURL(value);
        } else if(rule.type === 'isNumber') {
            rule.success = vali.isInt(value);
        } else if(rule.type === 'isInt') {
            rule.success = vali.isInt(value);
        } else if(rule.type === 'isFloat') {
            rule.success = vali.isFloat(value);
        } else if(rule.type === 'isLength') {
            rule.success = vali.isLength(value, rule.min, rule.max);
        } else {
            rule.success = rule.method(value);
        }

        if(!rule.success && result.success) {
            result.success = false;
            result.message = rule.message;
        }
    });

    return result;
}

validator.validateForm = function(data, fields) {
    var conclusion = {
        results: {},
        success: true,
        message: ''
    }
    
    for(var key in fields) {
        var rules = fields[key];
        if(!rules)
            continue;
        var value = data[key];

        conclusion.results[key] = validator.validate(value, rules);
    }

    return conclusion;
}

module.exports = validator;