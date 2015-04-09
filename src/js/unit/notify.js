/**
 * ------------------------------------------------------------
 * Notify    通知
 * @version  0.0.1
 * @author   sensen(hzzhaoyusen@corp.netease.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../base/component.js');
var template = require('./notify.html');
var _ = require('../base/util.js');

/**
 * @class Notify
 * @extend Component
 * @param {object}                  options.data                    绑定属性 | Binding Properties
 * @param {string='提示'}           options.data.title              对话框标题 | Title of Dialog
 * @param {string=''}               options.data.content            对话框内容
 * @param {string|boolean=true}     options.data.okButton           确定按钮的文字。值为字符串时显示文字为该字符串，值为`true`时显示文字为“确定”，值为否定时不显示确定按钮。
 * @param {string|boolean=false}    options.data.cancelButton       取消按钮的文字。值为字符串时显示文字为该字符串，值为`true`时显示文字为“取消”，值为否定时不显示确定按钮。
 * @param {number=null}             options.data.width              对话框宽度。值为否定时宽度为CSS设置的宽度。
 * @param {function}                options.ok                      当点击确定的时候执行
 * @param {function}                options.cancel                  当点击取消的时候执行
 */
var Notify = Component.extend({
    name: 'notify',
    template: template,
    duration: 3000,
    // icon对应
    // iconMap: {
    //     "error": "remove-circle",
    //     "success": "ok-sign",
    //     "warning": "warning-sign",
    //     "info": "info-sign",
    //     "loading": "info-sign"
    // },
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            messages: [],
            position: 'middle'
        });
        this.supr();
    },
    /**
     * @protected
     */
    init: function() {
        this.supr();
        // 证明不是内嵌组件
        if(this.$root == this)
            this.$inject(document.body);
    },
    show: function(text, type, duration) {
        var message = {
            text: text,
            type: type || 'info',
            duration: duration || this.duration
        };
        this.data.messages.unshift(message);
        this.$update();
    },
    close: function(message) {
        var index = this.data.messages.indexOf(message);
        this.data.messages.splice(index, 1);
        this.$update();
    },
    closeAll: function() {
        this.$update('messages', []);
    }
}).use('$timeout');


// 单例, 直接初始化
var notify = new Notify({});


module.exports = Notify;