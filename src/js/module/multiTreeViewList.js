/**
 * ------------------------------------------------------------
 * MultiTreeViewList  树型视图列表
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var TreeViewList = require('./treeViewList.js');
var template = require('./multiTreeViewList.html');
var _ = require('regular-ui-base/src/_');

/**
 * @class MultiTreeView
 * @extend SourceComponent
 * @private
 */
var MultiTreeViewList = TreeViewList.extend({
    name: 'multiTreeViewList',
    template: template,
    /**
     * @private
     */
    _onItemCheckedChange: function($event, item) {
        item.checked = $event.checked;

        if($event.checked !== null && item.children) {
            item.children.forEach(function(child) {
                child.checked = $event.checked;
            });
        }

        var parent = this.data.parent;
        if(parent && parent.checked !== item.checked) {    // 剪枝
            var checkedCount = 0;
            parent.children.forEach(function(child) {
                if(child.checked)
                    checkedCount++;
                else if(child.checked === null)
                    checkedCount += 0.5;
            });

            if(checkedCount === 0)
                parent.checked = false;
            else if(checkedCount === parent.children.length)
                parent.checked = true;
            else
                parent.checked = null;
        }

        /**
         * @event check 改变选中状态时触发
         * @property {object} sender 事件发送对象
         * @property {object} item 处理项
         * @property {boolean} checked 选中状态
         */
        this.$ancestor.$emit('check', {
            sender: this,
            item: item,
            checked: item.checked
        });
    }
});

module.exports = TreeViewList;