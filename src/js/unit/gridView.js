/**
 * ------------------------------------------------------------
 * GridView  网格视图
 * @version  0.0.1
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var SourceComponent = require('../base/sourceComponent.js');
var template = require('./gridView.html');
var _ = require('../base/util.js');

/**
 * @class GridView
 * @extend SourceComponent
 * @param {object}                      options.data 绑定属性
 * @param {object[]=[]}                 options.data.source 数据源
 * @param {number}                      options.data.source[].id 每项的id
 * @param {string}                      options.data.source[].name 每项的内容
 * @param {boolean=false}               options.data.disabled 是否禁用该组件
 */
var GridView = SourceComponent.extend({
    name: 'gridView',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            source: [],
            selected: null,
            disabled: false,
            multiple: false
        });
        this.supr();
    }
});

module.exports = GridView;