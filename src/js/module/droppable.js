/**
 * ------------------------------------------------------------
 * Droppable  放置
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../base/component.js');
var _ = require('../base/util.js');
var dragDrop = require('./dragDrop.js');

/**
 * @class Droppable
 * @extend Component
 * @param {object}                  options.data                     =  绑定属性
 * @param {object}                  options.data.effect              => 效果
 * @param {object}                  options.data.data               <=  拖放后传递过来的数据
 * @param {boolean=false}           options.data.disabled            => 是否禁用
 */
var Droppable = Component.extend({
    name: 'droppable',
    template: '{#inc this.$body}',
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            effect: undefined,
            data: null
        });
        this.supr();
    },
    init: function() {
        // 修改内部DOM元素
        var inner = _.dom.element(this);
        _.dom.addClass(inner, 'z-droppable');
        _.dom.on(inner, 'dragenter', this._onDragEnter.bind(this));
        _.dom.on(inner, 'dragover', this._onDragOver.bind(this));
        _.dom.on(inner, 'dragleave', this._onDragLeave.bind(this));
        _.dom.on(inner, 'drop', this._onDrop.bind(this));

        this.supr();
    },
    _onDragEnter: function($event) {
        if(dragDrop.cancel)
            return;

        var e = $event.event;

        if(this.data.effect)
            e.dataTransfer.dropEffect = this.data.effect;
        if(this.data.disabled)
            return dragDrop.cancel = true;

        // emit事件
        var eventData = _.extend(_.extend({
            data: dragDrop.data,
            cancel: dragDrop.cancel
        }, $event), e);
        this.$emit('dragenter', eventData);

        if(eventData.cancel)
            return dragDrop.cancel = eventData.cancel;

        _.dom.addClass(e.target, 'z-dragover');
    },
    _onDragOver: function($event) {
        if(dragDrop.cancel)
            return;

        $event.preventDefault();
        var e = $event.event;

        if(this.data.effect)
            e.dataTransfer.dropEffect = this.data.effect;

        // emit事件
        var eventData = _.extend(_.extend({
            data: dragDrop.data,
            cancel: dragDrop.cancel
        }, $event), e);
        this.$emit('dragover', eventData);

        if(eventData.cancel)
            return dragDrop.cancel = eventData.cancel;
    },
    _onDragLeave: function($event) {
        var e = $event.event;
        _.dom.delClass(e.target, 'z-dragover');

        if(dragDrop.cancel)
            return dragDrop.cancel = false;

        // emit事件
        var eventData = _.extend(_.extend({
            data: dragDrop.data
        }, $event), e);
        this.$emit('dragleave', eventData);
    },
    _onDrop: function($event) {
        var e = $event.event;
        _.dom.delClass(e.target, 'z-dragover');

        if(dragDrop.cancel)
            return dragDrop.cancel = false;

        $event.preventDefault();

        this.data.data = dragDrop.data;
        this.$update();

        // emit事件
        var eventData = _.extend(_.extend({
            data: dragDrop.data
        }, $event), e);
        this.$emit('drop', eventData);
    }
});

module.exports = Droppable;