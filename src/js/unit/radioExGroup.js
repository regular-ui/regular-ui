/**
 * ------------------------------------------------------------
 * RadioExGroup 输入扩展
 * @version  0.0.1
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var RadioGroup = require('./radioGroup.js');
var template = require('./radioExGroup.html');
var _ = require('../base/util.js');

/**
 * @class RadioExGroup
 * @extend RadioGroup
 */
var RadioExGroup = RadioGroup.extend({
    name: 'radioExGroup',
    template: template
});

module.exports = RadioExGroup;