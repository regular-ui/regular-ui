/**
 * ------------------------------------------------------------
 * Toggle    切换器
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('regular-ui-base/src/component');
var template = require('./toggle.html');
var _ = require('regular-ui-base/src/_');

/**
 * @class Toggle
 * @extend Component
 * @param {object}                  options.data                     =  绑定属性
 * @param {boolean=false}           options.data.open               <=> 当前为展开/收起状态
 * @param {boolean=false}           options.data.disabled            => 是否禁用
 * @param {boolean=true}            options.data.visible             => 是否显示
 * @param {string=''}               options.data.class               => 补充class
 */
var Toggle = Component.extend({
    name: 'toggle',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            open: false,
            animation: 'on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;'
        });
        this.supr();
    },
    /**
     * @method toggle(open) 展开/收起
     * @public
     * @param  {boolean} open 展开/收起状态。如果无此参数，则在两种状态之间切换。
     * @return {void}
     */
    toggle: function(open) {
        if(this.data.disabled)
            return;

        if(open === undefined)
            open = !this.data.open;
        this.data.open = open;

        // 根据状态在Toggle.opens列表中添加/删除管理项
        var index = Toggle.opens.indexOf(this);
        if(open && index < 0)
            Toggle.opens.push(this);
        else if(!open && index >= 0)
            Toggle.opens.splice(index, 1);

        /**
         * @event toggle  展开/收起时触发
         * @property {object} sender 事件发送对象
         * @property {object} open 展开/收起状态
         */
        this.$emit('toggle', {
            sender: this,
            open: open
        });
    },
    destroy: function() {
        var index = Toggle.opens.indexOf(this);
        index >= 0 && Toggle.opens.splice(index, 1);
        this.supr();
    }
});

// 处理点击toggle之外的地方后的收起事件。
Toggle.opens = [];
_.dom.on(document, 'click', function(e) {
    Toggle.opens.forEach(function(toggle, index) {
        // 这个地方不能用stopPropagation来处理，因为展开一个toggle的同时要收起其他toggle
        var element = toggle.$refs.element;
        var element2 = e.target;
        while(element2) {
            if(element === element2)
                return;
            element2 = element2.parentElement;
        }
        toggle.toggle(false);
        toggle.$update();
    });
});

Toggle.Head = Component.extend({
    name: 'toggle.head',
    template: '<div class="dropdown_hd" on-click={this.$outer.toggle()}>{#inc this.$body}</div>'
});

Toggle.Body = Component.extend({ //  r-animation={@(this.$outer.data.animation)}
    name: 'toggle.body',
    template: '<div class="dropdown_bd" r-show={this.$outer.data.open}>{#inc this.$body}</div>'
});

module.exports = Toggle;
