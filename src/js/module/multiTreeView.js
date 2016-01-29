/**
 * ------------------------------------------------------------
 * MultiTreeView  多选树型视图
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var TreeView = require('./treeView.js');
var template = require('./multiTreeView.html');
var _ = require('regular-ui-base/src/_');

var MultiTreeViewList = require('./multiTreeViewList.js');

/**
 * @class MultiTreeView
 * @extend TreeView
 * @param {object}                  options.data                     =  绑定属性
 * @param {object[]=[]}             options.data.source             <=> 数据源
 * @param {string}                  options.data.source[].name       => 每项的内容
 * @param {boolean=false}           options.data.source[].open       => 此项为展开/收起状态
 * @param {boolean=false}           options.data.source[].checked    => 选中此项
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
var MultiTreeView = TreeView.extend({
    name: 'multiTreeView',
    template: template
});