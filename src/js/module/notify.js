/**
 * ------------------------------------------------------------
 * Notify    通知
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('regular-ui-base/src/component');
var template = require('text!./notify.html');
var _ = require('regular-ui-base/src/_');

/**
 * @class Notify
 * @extend Component
 * @param {object}                  options.data                     =  绑定属性
 * @param {string='topcenter'}      options.data.position            => 通知的位置，可选参数：`topcenter`、`topleft`、`topright`、`bottomcenter`、`bottomleft`、`bottomright`、`static`
 * @param {number=2000}             options.data.duration            => 每条消息默认的停留毫秒数，如果为0，则表示消息常驻不消失。
 * @param {boolean=false}           options.data.single              => 是否始终显示一条
 * @param {boolean=true}            options.data.visible             => 是否显示
 * @param {string=''}               options.data.class               => 补充class
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
            duration: 2000,
            single: false
        });
        this.supr();
    },
    /**
     * @protected
     */
    init: function() {
        this.supr();

        // 如果不是内嵌组件，则嵌入到document.body中
        if(this.$root === this)
            this.$inject(document.body);
    },
    /**
     * @method show(text[,state][,duration]) 弹出一个消息
     * @public
     * @param  {string=''} text 消息内容
     * @param  {string=null} state 消息状态，可选参数：`info`、`success`、`warning`、`error`
     * @param  {number=notify.duration} duration 该条消息的停留毫秒数。如果为0，则表示消息常驻不消失。如果不填，则使用notify默认的duration。
     * @return {void}
     */
    show: function(text, state, duration) {
        var message = {
            text: text,
            state: state,
            duration: duration >= 0 ? +duration : +this.data.duration
        };
        var messages = this.data.messages;

        if(this.data.single && messages[0]) {
            message = _.extend(messages[0], message, true);
            message.counter++;
        } else {
            messages.unshift(message);
            message.counter = 0;
        }

        this.$update();

        if(message.duration) {
            setTimeout(function() {
                if(!message.counter)
                    this.close(message);
                else
                    message.counter--;
            }.bind(this), message.duration);
        }

        /**
         * @event show 弹出一个消息时触发
         * @property {object} source 事件发起对象
         * @property {object} message 弹出的消息对象
         */
        this.$emit('show', {
            source: this,
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
        if(index < 0)
            return;
        this.data.messages.splice(index, 1);
        this.$update();

        /**
         * @event close 关闭某条消息时触发
         * @property {object} source 事件发起对象
         * @property {object} message 关闭了的消息对象
         */
        this.$emit('close', {
            source: this,
            message: message
        });
    },
    /**
     * @method closeAll() 关闭所有消息
     * @public
     * @return {void}
     */
    closeAll: function() {
        this.data.messages = [];
        this.$update();
    }
});

var STATES = ['success', 'warning', 'info', 'error'];
/**
 * @method [info|success|warning|error](text[,duration]) 弹出特殊类型的消息。为show方法的简写方式。
 * @public
 * @param  {string=''} text 消息内容
 * @param  {number=notify.duration} duration 该条消息的停留毫秒数。如果为0，则表示消息常驻不消失。如果不填，则使用notify默认的duration。
 * @return {void}
 */
STATES.forEach(function(state) {
    Notify.prototype[state] = function(text, duration) {
        this.show(text, state, duration);
    }
});

/**
 * 直接初始化一个实例
 * @state {Notify}
 */
var notify = new Notify();
Notify.notify = notify;

var METHODS = ['show', 'close', 'closeAll', 'success', 'warning', 'info', 'error'];
Notify.METHODS = METHODS;
/**
 * @method show(text[,state][,duration]) 弹出一个消息
 * @static
 * @public
 * @param  {string=''} text 消息内容
 * @param  {string=null} state 消息状态，可选参数：`info`、`success`、`warning`、`error`
 * @param  {number=notify.duration} duration 该条消息的停留毫秒数。如果为0，则表示消息常驻不消失。如果不填，则使用notify默认的duration。
 * @return {void}
 */
/**
 * @method [info|success|warning|error](text[,duration]) 弹出特殊类型的消息。为show方法的简写方式。
 * @static
 * @public
 * @param  {string=''} text 消息内容
 * @param  {number=notify.duration} duration 该条消息的停留毫秒数。如果为0，则表示消息常驻不消失。如果不填，则使用notify默认的duration。
 * @return {void}
 */
/**
 * @method close(message) 关闭某条消息
 * @static
 * @public
 * @param  {object} message 需要关闭的消息对象
 * @return {void}
 */
/**
 * @method closeAll() 关闭所有消息
 * @static
 * @public
 * @return {void}
 */
METHODS.forEach(function(method) {
    Notify[method] = notify[method].bind(notify);
});

module.exports = Notify;