/**
 * ------------------------------------------------------------
 * CheckExGroup 输入扩展
 * @version  0.0.1
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var CheckGroup = require('./checkGroup.js');
var template = require('./checkExGroup.html');
var _ = require('../base/util.js');
var CheckEx = require('./checkEx.js');

/**
 * @class CheckExGroup
 * @extend CheckGroup
 */
var CheckExGroup = CheckGroup.extend({
    name: 'checkExGroup',
    template: template
});

module.exports = CheckExGroup;