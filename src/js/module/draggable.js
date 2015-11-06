/**
 * ------------------------------------------------------------
 * Draggable  拖拽
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../base/component.js');
var template = require('text!./draggable.html');
var _ = require('../base/util.js');

/**
 * @class Draggable
 * @extend Component
 * @param {object}                  options.data                     =  绑定属性
 * @param {boolean=false}           options.data.disabled            => 是否禁用
 */
var Draggable = Component.extend({
    name: 'draggable',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            dragging: false,
            proxy: 'clone',
            revert: true
        });
        this.supr();
    },
    _getProxy: function() {
        if(typeof this.data.proxy === 'function')
            return this.data.proxy();
        else if(this.data.proxy instanceof HTMLElement)
            return this.data.proxy;
        else if(this.data.proxy === 'clone')
            return this.$refs.self.cloneNode(true);
        else if(this.data.proxy === 'self')
            return this.$refs.self;
    },
    _onDragStart: function($event) {
        var dimension = _.dom.getDimension(this.$refs.self, 'fixed');
        var proxy = this._proxy = this._getProxy();
        proxy.style.left = dimension.left + 'px';
        proxy.style.top = dimension.top + 'px';
        proxy.style.zIndex = '2000';
        proxy.style.position = 'fixed';

        document.body.appendChild(proxy);
        this.data.dragging = true;
    },
    _onDrag: function($event) {
        var detail = $event.event.detail;

        var proxy = this._proxy;
        proxy.style.left = proxy.offsetLeft + detail.deltaX + 'px';
        proxy.style.top = proxy.offsetTop + detail.deltaY + 'px';
    },
    _onDragEnd: function($event) {
        var proxy = this._proxy;
        document.body.removeChild(proxy);
        this.data.dragging = false;
    }
});

Draggable.Proxy = Component.extend({
    name: 'draggable.proxy',
    template: '<div ref="proxy">{#inc this.$body}</div>',
    init: function() {
        if(this.$outer instanceof Draggable) {
            this.$outer.data.proxy = this.$refs.proxy;
        }
    },
    node: function(){}
})

module.exports = Draggable;