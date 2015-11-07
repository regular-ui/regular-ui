/**
 * ------------------------------------------------------------
 * ListView  列表视图
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var SourceComponent = require('../base/sourceComponent.js');
var template = require('text!./listView.html');
var _ = require('../base/util.js');

/**
 * @class ListView
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
            itemTemplate: null
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
         * @property {object} selected 当前选择项
         */
        this.$emit('select', {
            selected: item
        });
    },
    _onDragStart: function($event) {},
    _onDragEnter: function($event) {
        var target = $event.target;
        _.dom.addClass(target, 'z-dragover');
    },
    _onDragOver: function($event) {},
    _onDragLeave: function($event) {
        var target = $event.target;
        _.dom.delClass(target, 'z-dragover');
    },
    _onDrop: function($event, item, position) {
        var target = $event.target;
        _.dom.delClass(target, 'z-dragover');

        var oldItem = $event.data;
        var oldIndex = this.data.source.indexOf(oldItem);
        var index = this.data.source.indexOf(item);

        if(position === 'bottom')
            index++;

        this.data.source.splice(oldIndex, 1);
        this.data.source.splice(index, 0, oldItem);
    }
});

module.exports = ListView;