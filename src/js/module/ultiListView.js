/**
 * ------------------------------------------------------------
 * UltiListView  终极列表视图
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var ListView = require('./listView.js');
var template = require('text!./ultiListView.html');
var _ = require('regular-ui-base/src/_');

var Draggable = require('regular-ui-dragdrop/src/draggable');
var Droppable = require('regular-ui-dragdrop/src/droppable');

/**
 * @class UltiListView
 * @extend ListView
 * @param {object}                  options.data                     =  绑定属性
 * @param {object[]=[]}             options.data.source             <=> 数据源
 * @param {string}                  options.data.source[].name       => 每项的内容
 * @param {boolean=false}           options.data.source[].disabled   => 禁用此项
 * @param {boolean=false}           options.data.source[].divider    => 设置此项为分隔线
 * @param {boolean=false}           options.data.source[].selected   => 多选时此项是否选中
 * @param {object=null}             options.data.selected           <=> 当前选择项。多选时无效。
 * @param {boolean=false}           options.data.multiple            => 是否可以多选
 * @param {string=null}             options.data.itemTemplate       @=> 单项模板
 * @param {boolean=false}           options.data.dragdrop            => 是否开启拖放功能
 * @param {boolean=false}           options.data.readonly            => 是否只读
 * @param {boolean=false}           options.data.disabled            => 是否禁用
 * @param {boolean=true}            options.data.visible             => 是否显示
 * @param {string=''}               options.data.class               => 补充class
 * @param {object}                  options.service                 @=> 数据服务
 */
var UltiListView = ListView.extend({
    name: 'ultiListView',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            // @inherited selected: null,
            // @inherited itemTemplate: null,
            dragdrop: false
        });
        this.supr();
    },
    _onItemDragOver: function($event) {
        var target = $event.target;
        _.dom.delClass(target, 'z-dragover-before');
        _.dom.delClass(target, 'z-dragover-after');

        if($event.ratioY < 0.5)
            _.dom.addClass(target, 'z-dragover-before');
        else
            _.dom.addClass(target, 'z-dragover-after');
    },
    _onItemDrop: function($event, item) {
        var target = $event.target;
        _.dom.delClass(target, 'z-dragover-before');
        _.dom.delClass(target, 'z-dragover-after');

        if(item === $event.data.item)
            return;

        var oldItem = $event.data.item;
        var oldIndex = this.data.source.indexOf(oldItem);
        this.data.source.splice(oldIndex, 1);

        var index = this.data.source.indexOf(item);
        if($event.ratioY >= 0.5)
            index++;
        this.data.source.splice(index, 0, oldItem);
    },
    _onDragOver: function($event) {
        var target = $event.target;
        _.dom.delClass(target, 'z-dragover-before');
        _.dom.delClass(target, 'z-dragover-after');

        if($event.ratioY < 0.5)
            _.dom.addClass(target, 'z-dragover-before');
        else
            _.dom.addClass(target, 'z-dragover-after');
    },
    _onDragLeave: function($event) {
        var target = $event.target;
        _.dom.delClass(target, 'z-dragover-before');
        _.dom.delClass(target, 'z-dragover-after');
    },
    _onDrop: function($event) {
        var target = $event.target;
        _.dom.delClass(target, 'z-dragover-before');
        _.dom.delClass(target, 'z-dragover-after');

        var oldItem = $event.data.item;
        var oldIndex = this.data.source.indexOf(oldItem);
        this.data.source.splice(oldIndex, 1);
        if($event.ratioY < 0.5)
            this.data.source.unshift(oldItem);
        else
            this.data.source.push(oldItem);
    }
});

module.exports = UltiListView;