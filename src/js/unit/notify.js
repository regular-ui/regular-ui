/**
 * ------------------------------------------------------------
 * Notify    通知
 * @version  0.0.1
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../base/component.js');
var template = require('./notify.html');
var _ = require('../base/util.js');

/**
 * @class Notify
 * @extend Component
 * @param {object}                  options.data                    监听数据
 * @param {string='topcenter'}      options.data.position           通知的位置，可选参数：`topcenter`、`topleft`、`topright`、`bottomcenter`、`bottomleft`、`bottomright`、`static`
 * @param {number=2000}             options.data.duration           每条消息的停留毫秒数，如果为0，则表示消息常驻不消失。
 * @param {string=''}               options.data.class              补充class
 * @param {string=''}               options.data.class              补充class
 */
var Notify = Component.extend({
    name: 'notify',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            messages: [],
            position: 'topcenter',
            duration: 2000
        });
        this.supr();
    },
    /**
     * @protected
     */
    init: function() {
        this.supr();
        // 证明不是内嵌组件
        if(this.$root === this)
            this.$inject(document.body);
    },
    /**
     * @method show(text[,type][,duration]) 弹出一个消息
     * @public
     * @param  {string=''} text 消息内容
     * @param  {string=null} type 消息类型，可选参数：`info`、`success`、`warning`、`error`
     * @param  {number=notify.duration} duration 该条消息的停留毫秒数，如果为0，则表示消息常驻不消失。
     * @return {void}
     */
    show: function(text, type, duration) {
        var message = {
            text: text,
            type: type,
            duration: duration >= 0 ? duration : this.data.duration
        };
        this.data.messages.unshift(message);
        this.$update();

        if(message.duration)
            this.$timeout(this.close.bind(this, message), message.duration);

        /**
         * @event show 弹出一个消息时触发
         * @property {object} message 弹出的消息对象
         */
        this.$emit('show', {
            message: message
        });
    },
    /**
     * @method close(message) 关闭某条消息
     * @public
     * @param  {object} message 需要关闭的消息对象
     * @return {void}
     */
    close: function(message) {
        var index = this.data.messages.indexOf(message);
        this.data.messages.splice(index, 1);
        this.$update();
        /**
         * @event close 关闭某条消息时触发
         * @property {object} message 关闭了的消息对象
         */
        this.$emit('close', {
            message: message
        });
    },
    /**
     * @method closeAll() 关闭所有消息
     * @public
     * @return {void}
     */
    closeAll: function() {
        this.$update('messages', []);
    }
}).use('$timeout');


/**
 * 直接初始化一个实例
 * @type {Notify}
 */
var notify = new Notify();
Notify.notify = notify;

/**
 * @method show(text[,type][,duration]) 弹出一个消息
 * @static
 * @param  {string=''} text 消息内容
 * @param  {string=null} type 消息类型，可选参数：`info`、`success`、`warning`、`error`
 * @param  {number=notify.duration} duration 该条消息的停留毫秒数，如果为0，则表示消息常驻不消失。
 * @return {void}
 */
Notify.show = function() {
    notify.show.apply(notify, arguments);
}
/**
 * @method close(message) 关闭某条消息
 * @static
 * @param  {object} message 需要关闭的消息对象
 * @return {void}
 */
Notify.close = function() {
    notify.close.apply(notify, arguments);
}
/**
 * @method closeAll() 关闭所有消息
 * @static
 * @return {void}
 */
Notify.closeAll = function() {
    notify.closeAll.apply(notify, arguments);
}

module.exports = Notify;