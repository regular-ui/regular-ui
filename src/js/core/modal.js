/**
 * ------------------------------------------------------------
 * Modal     模态对话框
 * @version  0.0.1
 * @author   sensen(hzzhaoyusen@corp.netease.com)
 * ------------------------------------------------------------
 */

var Component = require('./component.js');
var template = require('./modal.html');
var _ = require('./util.js');

/**
 * @example
 * var modal = new Modal();
 * @class Modal
 * @extend Component
 * @param {object}                      options.data 绑定数据
 * @param {string='提示'}               options.data.title 对话框标题
 * @param {string}                      options.data.content 对话框内容
 * @param {string|boolean=true}         options.data.okButton 确定按钮的文字，如果为false则不显示确定按钮
 * @param {string|boolean=false}        options.data.cancelButton 取消按钮的文字，如果为false则不显示取消按钮
 * @param {number}                      options.data.width 对话框宽度，默认为320px。
 * @param {function}                    options.ok 当点击确定的时候执行
 * @param {function}                    options.cancel 当点击取消的时候执行
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
        if(this.$root == this)
            this.$inject(document.body);
    },
    /**
     * @example
     * modal.close(true);
     * @method close 关闭模态对话框
     * @public
     * @param  {boolean} result 点击了确定还是取消
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
        this.$emit('ok');
    },
    /**
     * @override
     */
    cancel: function() {
        this.$emit('cancel');
    }
});

/**
 * 弹出一个alert对话框
 * @param  {string} content 对话框内容
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
 * 弹出一个confirm对话框
 * @param  {string} content 对话框内容
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
