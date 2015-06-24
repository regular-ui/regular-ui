/**
 * ------------------------------------------------------------
 * Modal     模态对话框
 * @author   sensen(rainforest92@126.com)
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
 * @param {string|boolean=true}     options.data.okButton           是否显示确定按钮。值为`string`时显示该段文字。
 * @param {string|boolean=false}    options.data.cancelButton       是否显示取消按钮。值为`string`时显示该段文字。
 * @param {number=null}             options.data.width              对话框宽度。值为否定时宽度为CSS设置的宽度。
 * @param {string=''}               options.data.class              补充class
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
        if(this.$root === this)
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

        this.destroy();
    },
    /**
     * @override
     */
    cancel: function() {
        /**
         * @event cancel 取消对话框时触发
         */
        this.$emit('cancel');

        this.destroy();
    },
    keyup: function($event) {
        if($event.which == 13)
            this.ok();
    }
});

/**
 * @method alert(content[,title]) 弹出一个alert对话框。关闭时始终触发确定事件。
 * @static
 * @public
 * @param  {string=''} content 对话框内容
 * @param  {string='提示'} title 对话框标题
 * @return {void}
 */
Modal.alert = function(content, title, okButton) {
    var modal = new Modal({
        data: {
            content: content,
            title: title,
            okButton: okButton
        }
    });
    return modal;
}

/**
 * @method confirm(content[,title]) 弹出一个confirm对话框
 * @static
 * @public
 * @param  {string=''} content 对话框内容
 * @param  {string='提示'} title 对话框标题
 * @return {void}
 */
Modal.confirm = function(content, title, okButton, cancelButton) {
    var modal = new Modal({
        data: {
            content: content,
            title: title,
            okButton: okButton,
            cancelButton: cancelButton || true
        }
    });
    return modal;
}

module.exports = Modal;
