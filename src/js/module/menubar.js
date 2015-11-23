/**
 * ------------------------------------------------------------
 * Menubar  列表视图
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var SourceComponent = require('regular-ui-base/src/sourceComponent');
var template = require('text!./menubar.html');
var _ = require('regular-ui-base/src/_');
var Menu = require('../unit/menu.js');

/**
 * @class Menubar
 * @param {object}                  options.data                     =  绑定属性
 * @param {object[]=[]}             options.data.source             <=> 数据源
 * @param {string}                  options.data.source[].name       => 每项的内容
 * @param {object=null}             options.data.selected           <=> 当前选择项
 * @param {string=null}             options.data.itemTemplate       @=> 单项模板
 * @param {boolean=false}           options.data.readonly            => 是否只读
 * @param {boolean=false}           options.data.disabled            => 是否禁用
 * @param {boolean=true}            options.data.visible             => 是否显示
 * @param {string=''}               options.data.class               => 补充class
 * @param {object}                  options.service                 @=> 数据服务
 */
var Menubar = SourceComponent.extend({
    name: 'menubar',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            itemTemplate: null
        });
        this.supr();
    }
});

module.exports = Menubar;