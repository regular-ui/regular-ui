/**
 * ------------------------------------------------------------
 * TreeView  树型视图
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var SourceComponent = require('../base/sourceComponent.js');
var template = require('text!./treeView.html');
var hierarchicalTemplate = require('text!./treeViewList.html');
var _ = require('../base/util.js');

/**
 * @class TreeView
 * @extend SourceComponent
 * @param {object}                  options.data                     =  绑定属性
 * @param {object[]=[]}             options.data.source             <=> 数据源
 * @param {string}                  options.data.source[].name       => 每项的内容
 * @param {object=null}             options.data.selected           <=> 当前选择项
 * @param {boolean=false}           options.data.hierarchical       @=> 是否分级动态加载，需要service
 * @param {boolean=false}           options.data.readonly            => 是否只读
 * @param {boolean=false}           options.data.disabled            => 是否禁用
 * @param {boolean=true}            options.data.visible             => 是否显示
 * @param {string=''}               options.data.class               => 补充class
 * @param {object}                  options.service                 @=> 数据服务
 */
var TreeView = SourceComponent.extend({
    name: 'treeView',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            selected: null,
            multiple: false,
            hierarchical: false
        });
        this.supr();

        this.$ancestor = this;
    },
    /**
     * @method select(item) 选择某一项
     * @public
     * @param  {object} item 选择项
     * @return {void}
     */
    select: function(item) {
        if(this.data.readonly || this.data.disabled || item.disabled)
            return;

        this.data.selected = item;
        /**
         * @event select 选择某一项时触发
         * @property {object} selected 当前选择项
         */
        this.$emit('select', {
            selected: item
        });
    },
    /**
     * @method toggle(item) 展开或收起某一项
     * @private
     * @param  {object} item 展开收起项
     * @return {void}
     */
    toggle: function(item) {
        if(this.data.readonly || this.data.disabled || item.disabled)
            return;

        item.open = !item.open;

        /**
         * @event toggle 展开或收起某一项时触发
         * @property {object} item 展开收起项
         * @property {boolean} open 展开还是收起
         */
        this.$emit('toggle', {
            item: item,
            open: item.open
        });
    }
});

var TreeViewList = SourceComponent.extend({
    name: 'treeViewList',
    template: hierarchicalTemplate,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            itemTemplate: null,
            visible: false
        });
        this.supr();

        this.$ancestor = this.$parent.$ancestor;
        this.service = this.$ancestor.service;
        this.data.itemTemplate = this.$ancestor.data.itemTemplate;
        this.data.hierarchical = this.$ancestor.data.hierarchical;

        this.$watch('visible', function(newValue) {
            if(!this.data.hierarchical)
                return;

            if(!newValue || this.$parent.name !== 'treeViewList')
                return;

            this.$updateSource(function() {
                this.data.hierarchical = false;
            });
        });
    },
    /**
     * @override
     */
    getParams: function() {
        if(this.data.parent)
            return _.extend({parentId: this.data.parent.id}, this.$ancestor.getParams());
    },
    /**
     * @method $updateSource() 从service中更新数据源
     * @public
     * @deprecated
     * @return {SourceComponent} this
     */
    $updateSource: function() {
        this.service.getList(this.getParams(), function(result) {
            // 给每个节点item添加parent
            result.forEach(function(item) {
                item.parent = this.data.parent;
            }.bind(this));

            this.$update('source', result);

            this.$emit('updateSource', {
                result: result
            });
        }.bind(this));
        return this;
    },
    /**
     * @method select(item) 选择某一项
     * @private
     * @param  {object} item 选择项
     * @return {void}
     */
    select: function(item) {
        this.$ancestor.select(item);
    },
    /**
     * @method toggle(item) 展开或收起某一项
     * @private
     * @param  {object} item 展开收起项
     * @return {void}
     */
    toggle: function(item) {
        this.$ancestor.toggle(item);
    }
});

module.exports = TreeView;