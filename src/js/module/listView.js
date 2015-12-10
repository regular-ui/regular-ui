/**
 * ------------------------------------------------------------
 * ListView  列表视图
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var SourceComponent = require('regular-ui-base/src/sourceComponent');
var template = require('text!./listView.html');
var _ = require('regular-ui-base/src/_');

var Draggable = require('regular-ui-dragdrop/src/draggable');
var Droppable = require('regular-ui-dragdrop/src/droppable');

/**
 * @class ListView
 * @extend SourceComponent
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
var ListView = SourceComponent.extend({
    name: 'listView',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            selected: null,
            itemTemplate: null,
            dragdrop: false
        });
        this.supr();
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
         * @property {object} source 事件发起对象
         * @property {object} selected 当前选择项
         */
        this.$emit('select', {
            source: this,
            selected: item
        });
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

module.exports = ListView;