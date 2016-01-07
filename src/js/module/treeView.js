/**
 * ------------------------------------------------------------
 * TreeView  树型视图
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var SourceComponent = require('regular-ui-base/src/sourceComponent');
var template = require('text!./treeView.html');
var _ = require('regular-ui-base/src/_');

var TreeViewList = require('./treeViewList.js');

/**
 * @class TreeView
 * @extend SourceComponent
 * @param {object}                  options.data                     =  绑定属性
 * @param {object[]=[]}             options.data.source             <=> 数据源
 * @param {string}                  options.data.source[].name       => 每项的内容
 * @param {boolean=false}           options.data.source[].open       => 此项为展开/收起状态
 * @param {boolean=false}           options.data.source[].disabled   => 禁用此项
 * @param {boolean=false}           options.data.source[].divider    => 设置此项为分隔线
 * @param {object=null}             options.data.selected           <=> 当前选择项。多选时无效。
 * @param {string=null}             options.data.itemTemplate       @=> 单项模板
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
        if(this.data.readonly || this.data.disabled || item.disabled || item.divider)
            return;

        if(this.data.multiple)
            return item.selected = !item.selected;

        this.data.selected = item;
        /**
         * @event select 选择某一项时触发
         * @property {object} source 事件发起对象
         * @property {object} selected 当前选择项
         */
        this.$emit('select', {
            source: this,
            selected: item
        });
    },
    /**
     * @method toggle(item,open) 展开/收起某一项
     * @public
     * @param  {object} item 处理项
     * @param  {object} open 展开/收起状态。如果无此参数，则在两种状态之间切换。
     * @return {void}
     */
    toggle: function(item, open) {
        if(this.data.readonly || this.data.disabled || item.disabled || item.divider)
            return;

        if(open === undefined)
            open = !item.open;
        item.open = open;

        /**
         * @event toggle 展开或收起某一项时触发
         * @property {object} source 事件发起对象
         * @property {object} item 处理项
         * @property {boolean} open 展开/收起状态
         */
        this.$emit('toggle', {
            source: this,
            item: item,
            open: open
        });
    }
});

module.exports = TreeView;