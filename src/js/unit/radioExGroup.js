/**
 * ------------------------------------------------------------
 * RadioExGroup 输入扩展
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
 * @param {object}                  options.data                    绑定属性
 * @param {object[]=[]}             options.data.source             数据源
 * @param {number}                  options.data.source[].id        每项的id
 * @param {string}                  options.data.source[].name      每项的内容
 * @param {object=null}             options.data.seleced            当前选择项
 * @param {boolean=false}           options.data.block              多行显示
 * @param {boolean=false}           options.data.disabled           是否禁用该组件
 * @param {string=''}               options.data.class              补充class
 */
var RadioExGroup = RadioGroup.extend({
    name: 'radioExGroup',
    template: template
});

module.exports = RadioExGroup;