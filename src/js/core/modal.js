/**
 * ------------------------------------------------------------
 * 弹窗组件
 * @version  1.0
 * @author   zhaoyusen(hzzhaoyusen@corp.netease.com)
 * ------------------------------------------------------------
 */

var BaseComponent = require('./base.js');
var template = require('./modal.html');
var _ = require('./util.js');

/**
 * @class Modal
 * @extend BaseComponent
 * @param {Object}
 *     options.data 可选参数
 *         .title 弹窗标题
 *         .content 弹窗内容
 *         .okButton 确定按钮的文字，如果为空则不显示确定按钮
 *         .cancelButton 取消按钮的文字，如果为空则不显示取消按钮
 *         .width 弹窗宽度，默认为320px
 * @Event close 当value改变时发生 {result} 确定result为true，取消result为false
 */
var Modal = BaseComponent.extend({
    name: 'modal',
    template: template,
    config: function() {
        _.extend(this.data, {
            title: '提示',
            content: '',
            okButton: true,
            cancelButton: false,
            width: null
        });
    },
    init: function() {
        if(this.$root == this)
            this.$inject(document.body);
    },
    close: function(result) {
        var $event = {
            data: {
                result: result
            }
        }
        this.$emit('close', $event);
        this.destroy();
    }
});

Modal.show = function(content, title) {
    var modal = new Modal({
        data: {
            content: content,
            title: title
        }
    });
}

Modal.alert = function(content, callback) {
    var modal = new Modal({
        data: {
            content: content
        }
    });
    callback && modal.$on('close', callback);
}

Modal.confirm = function(content, callback) {
    var modal = new Modal({
        data: {
            content: content,
            cancelButton: true
        }
    });
    callback && modal.$on('close', callback);
}

module.exports = Modal;
