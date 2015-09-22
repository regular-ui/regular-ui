/**
 * ------------------------------------------------------------
 * Check2Group 输入扩展
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var CheckGroup = require('./checkGroup.js');
var template = require('text!./check2Group.html');
var _ = require('../base/util.js');
var Check2 = require('./check2.js');

/**
 * @class Check2Group
 * @extend CheckGroup
 * @param {object}                  options.data                    绑定属性
 * @param {object[]=[]}             options.data.source             数据源
 * @param {string}                  options.data.source[].name      每项的内容
 * @param {boolean=false}           options.data.block              多行显示
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 * @param {object}                  options.service                 数据服务
 */
var Check2Group = CheckGroup.extend({
    name: 'check2Group',
    template: template
});

module.exports = Check2Group;