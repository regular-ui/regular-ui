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
        _.dom.on(inner, 'dragenter', this._onDragEnter.bind(this));
        _.dom.on(inner, 'dragover', this._onDragOver.bind(this));
        _.dom.on(inner, 'dragleave', this._onDragLeave.bind(this));
        _.dom.on(inner, 'drop', this._onDrop.bind(this));

        this.supr();
    },
    _onDragEnter: function($event) {
        var e = $event.event;

        if(this.data.effect)
            e.dataTransfer.dropEffect = this.data.effect;
        if(this.data.disabled)
            return e.dataTransfer.dropEffect = 'none';

        // emit事件
        var eventData = _.extend(_.extend({
            data: dragDrop.data
        }, $event), e);
        this.$emit('dragenter', eventData);
    },
    _onDragOver: function($event) {
        $event.preventDefault();
        var e = $event.event;

        if(this.data.effect)
            e.dataTransfer.dropEffect = this.data.effect;

        // emit事件
        var eventData = _.extend(_.extend({
            data: dragDrop.data
        }, $event), e);
        this.$emit('dragover', eventData);
    },
    _onDragLeave: function($event) {
        var e = $event.event;

        // emit事件
        var eventData = _.extend(_.extend({
            data: dragDrop.data
        }, $event), e);
        this.$emit('dragleave', eventData);
    },
    _onDrop: function($event) {
        var e = $event.event;

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