/**
 * ------------------------------------------------------------
 * Modal     模态对话框 | Modal Dialog
 * @version  0.0.1
 * @author   sensen(hzzhaoyusen@corp.netease.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../base/component.js');
var template = require('./modal.html');
var _ = require('../base/util.js');

/**
 * @class Modal
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
var Modal = Component.extend({
    name: 'modal',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            title: '提示',
            content: '',
            okButton: true,
            cancelButton: false,
            width: null
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
    /**
     * @method close(result) 关闭模态对话框
     * @public
     * @param  {boolean} result 点击确定还是取消
     * @return {void}
     */
    close: function(result) {
        /**
         * @event close 关闭对话框时触发
         * @property {boolean} result 点击了确定还是取消
         */
        this.$emit('close', {
            result: result
        });
        result ? this.ok() : this.cancel();
        this.destroy();
    },
    /**
     * @override
     */
    ok: function() {
        /**
         * @event ok 确定对话框时触发
         */
        this.$emit('ok');
    },
    /**
     * @override
     */
    cancel: function() {
        /**
         * @event close 取消对话框时触发
         */
        this.$emit('cancel');
    }
});

/**
 * @method alert([content][,title]) 弹出一个alert对话框。关闭时始终触发确定事件。
 * @static
 * @param  {string=''} content 对话框内容
 * @param  {string='提示'} title 对话框标题
 * @return {void}
 */
Modal.alert = function(content, title) {
    var modal = new Modal({
        data: {
            content: content,
            title: title
        }
    });
    return modal;
}

/**
 * @method confirm([content][,title]) 弹出一个confirm对话框
 * @static
 * @param  {string=''} content 对话框内容
 * @param  {string='提示'} title 对话框标题
 * @return {void}
 */
Modal.confirm = function(content, title) {
    var modal = new Modal({
        data: {
            content: content,
            title: title,
            cancelButton: true
        }
    });
    return modal;
}

module.exports = Modal;
