/**
 * ------------------------------------------------------------
 * Droppable  放置
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../base/component.js');
var template = require('text!./droppable.html');
var _ = require('../base/util.js');

var dragDrop = require('./dragDrop.js');

/**
 * @class Droppable
 * @extend Component
 * @param {object}                  options.data                     =  绑定属性
 * @param {object}                  options.data.effect              => 效果
 * @param {boolean=false}           options.data.disabled            => 是否禁用
 */
var Droppable = Component.extend({
    name: 'droppable',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            effect: undefined
        });
        this.supr();
    },
    _onDragEnter: function($event) {
        var e = $event.event;

        if(this.data.effect)
            e.dataTransfer.dropEffect = this.data.effect;
        
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

        // emit事件
        var eventData = _.extend(_.extend({
            data: dragDrop.data
        }, $event), e);
        this.$emit('drop', eventData);
    }
});

module.exports = Droppable;