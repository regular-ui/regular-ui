/**
 * ------------------------------------------------------------
 * CheckExGroup 输入扩展
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
 * @param {object}                  options.data                    绑定属性
 * @param {object[]=[]}             options.data.source             数据源
 * @param {number}                  options.data.source[].id        每项的id
 * @param {string}                  options.data.source[].name      每项的内容
 * @param {boolean=false}           options.data.block              多行显示
 * @param {boolean=false}           options.data.disabled           是否禁用该组件
 * @param {string=''}               options.data.class              补充class
 * @param {object}                  options.service                 数据服务
 */
var CheckExGroup = CheckGroup.extend({
    name: 'checkExGroup',
    template: template
});

module.exports = CheckExGroup;