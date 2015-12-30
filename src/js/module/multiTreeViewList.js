/**
 * ------------------------------------------------------------
 * MultiTreeViewList  树型视图列表
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var TreeViewList = require('./treeViewList.js');
var template = require('text!./multiTreeViewList.html');
var _ = require('regular-ui-base/src/_');

var MultiTreeViewList = TreeViewList.extend({
    name: 'multiTreeViewList',
    template: template,
    _onItemCheckedChange: function($event, item) {
        item.checked = $event.checked;
        
        if($event.checked !== null && item.children) {
            item.children.forEach(function(child) {
                child.checked = $event.checked;
            });
        }

        var parent = this.data.parent;
        if(parent) {
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
    }
});

module.exports = TreeViewList;