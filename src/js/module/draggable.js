/**
 * ------------------------------------------------------------
 * Draggable  拖拽
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../base/component.js');
var _ = require('../base/util.js');
var dragDrop = require('./dragDrop.js');

/**
 * @class Draggable
 * @extend Component
 * @param {object}                  options.data                     =  绑定属性
 * @param {string|HTMLElement|function='auto'}  options.data.image  @=> 拖拽时的图像
 * @param {string}                  options.data.effect              => 效果
 * @param {object}                  options.data.data                => 拖拽时需要传递的数据
 * @param {boolean=false}           options.data.disabled            => 是否禁用
 */
var Draggable = Component.extend({
    name: 'draggable',
    template: '{#inc this.$body}',
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            image: 'auto',
            effect: undefined,
            data: null
        });
        this.supr();
    },
    init: function() {
        // 修改内部DOM元素
        var inner = _.dom.element(this);
        _.dom.on(inner, 'dragstart', this._onDragStart.bind(this));
        _.dom.on(inner, 'drag', this._onDrag.bind(this));
        _.dom.on(inner, 'dragend', this._onDragEnd.bind(this));

        this.$watch('disabled', function(newValue) {
            inner.draggable = !newValue;
        });
        this.supr();
    },
    _getImage: function() {
        if(typeof this.data.image === 'function')
            return this.data.image();
        else if(this.data.image instanceof HTMLElement)
            return this.data.image;
        else if(this.data.image instanceof Draggable.Image) {
            var image = _.dom.on(this.data.image);
            image.style.position = 'fixed';
            image.style.left = '-5000px;'
            document.body.appendChild(image);
        } else if(this.data.image === 'empty') {
            var empty = document.createElement('span');
            empty.innerHTML = '&nbsp;';
            empty.style.position = 'fixed';
            empty.style.left = '-5000px;'
            document.body.appendChild(empty);
            return empty;
        } else if(this.data.image === 'auto')
            return null;
    },
    _onDragStart: function($event) {
        var e = $event.event;

        // 处理DataTransfer
        var image = this._getImage();
        if(image)
            e.dataTransfer.setDragImage(image, 0, 0);    // @TODO x, y
        if(this.data.effect)
            e.dataTransfer.effectAllowed = this.data.effect;

        dragDrop.data = this.data.data;
        dragDrop.screenX = e.clientX;
        dragDrop.screenY = e.clientY;

        // emit事件
        var eventData = _.extend(_.extend({
            data: dragDrop.data
        }, $event), e);
        this.$emit('dragstart', eventData);
    },
    _onDrag: function($event) {
        var e = $event.event;

        // 拖拽结束时会监听到一个都为0的事件
        if(e.clientX === 0 && e.clientY === 0 && e.screenX === 0 && e.screenY === 0)
            return;

        dragDrop.movementX = e.clientX - dragDrop.screenX;
        dragDrop.movementY = e.clientY - dragDrop.screenY;
        dragDrop.screenX = e.clientX;
        dragDrop.screenY = e.clientY;

        // emit事件
        var eventData = _.extend(_.extend({
            data: dragDrop.data,
            movementX: dragDrop.movementX,
            movementY: dragDrop.movementY
        }, $event), e);
        this.$emit('drag', eventData);
    },
    _onDragEnd: function($event) {
        var e = $event.event;

        dragDrop.data = null;

        var eventData = _.extend(_.extend({}, $event), e);
        this.$emit('dragend', eventData);
    }
});

Draggable.Image = Component.extend({
    name: 'draggable.image',
    template: '<div ref="self">{#inc this.$body}</div>',
    node: _.noop,
    config: function() {
        _.extend(this.data, {
            x: 0,
            y: 0
        });
        this.supr();
    },
    init: function() {
        if(this.$outer instanceof Draggable)
            this.$outer.data.image = this.$refs.self;
    }
})

module.exports = Draggable;