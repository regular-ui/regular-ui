/**
 * ------------------------------------------------------------
 * TreeView  树型视图
 * @version  0.0.1
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var SourceComponent = require('../base/sourceComponent.js');
var template = require('./treeView.html');
var recursiveTempate = require('./treeViewList.html');
var _ = require('../base/util.js');

/**
 * @class TreeView
 * @extend SourceComponent
 * @param {object}                      options.data 绑定属性
 * @param {object[]=[]}                 options.data.source 数据源
 * @param {number}                      options.data.source[].id 每项的id
 * @param {string}                      options.data.source[].name 每项的内容
 * @param {object=null}                 options.data.selected 当前选择项
 * @param {boolean=false}               options.data.disabled 是否禁用该组件
 */
var TreeView = SourceComponent.extend({
    name: 'treeView',
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

        this.treeroot = this;
    },
    /**
     * @method select(item) 选择某一项
     * @public
     * @param  {object} item 选择项
     * @return {void}
     */
    select: function(item) {
        if(this.data.disabled)
            return;

        this.data.selected = item;
        /**
         * @event select 选择某一项时触发
         * @property {object} selected 当前选择项
         */
        this.$emit('select', {
            selected: item
        });
    }
});

var TreeViewList = SourceComponent.extend({
    name: 'treeViewList',
    template: recursiveTempate,
    config: function() {
        _.extend(this.data, {
            itemTemplate: null,
            visible: false
        });
        this.supr();
        this.treeroot = this.$parent.treeroot;
    },
    /**
     * @method select(item) 选择某一项
     * @private
     * @param  {object} item 选择项
     * @return {void}
     */
    select: function(item) {
        if(this.$parent.data.disabled)
            return;

        this.treeroot.select(item);
    },
    /**
     * @method toggle(item) 展开或收起某一项
     * @private
     * @param  {object} item 展开收起项
     * @return {void}
     */
    toggle: function(item) {
        if(this.$parent.data.disabled)
            return;
        
        item.open = !item.open;
    }
})

module.exports = TreeView;