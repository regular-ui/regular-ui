/**
 * ------------------------------------------------------------
 * Radio2Group 输入扩展
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var RadioGroup = require('./radioGroup.js');
var template = require('text!./radio2Group.html');
var _ = require('../base/_.js');

/**
 * @class Radio2Group
 * @extend RadioGroup
 * @param {object}                  options.data                     =  绑定属性
 * @param {object[]=[]}             options.data.source             <=> 数据源
 * @param {string}                  options.data.source[].name       => 每项的内容
 * @param {object=null}             options.data.seleced            <=> 当前选择项
 * @param {boolean=false}           options.data.block               => 多行显示
 * @param {boolean=false}           options.data.readonly            => 是否只读
 * @param {boolean=false}           options.data.disabled            => 是否禁用
 * @param {boolean=true}            options.data.visible             => 是否显示
 * @param {string=''}               options.data.class               => 补充class
 * @param {object}                  options.service                 @=> 数据服务
 */
var Radio2Group = RadioGroup.extend({
    name: 'radio2Group',
    template: template
});

module.exports = Radio2Group;