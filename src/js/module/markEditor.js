/**
 * ------------------------------------------------------------
 * MarkEditor 编辑器
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../base/component.js');
var template = require('./markEditor.html');
var _ = require('../base/util.js');

var marked = require('marked');

/**
 * @class MarkEditor
 * @extend Component
 * @param {object}                  options.data                    绑定属性 | Binding Properties
 * @param {string='提示'}           options.data.title              对话框标题 | Title of Dialog
 * @param {string=''}               options.data.content            编辑器内容
 * @param {string|boolean=true}     options.data.okButton           是否显示确定按钮。值为`string`时显示该段文字。
 * @param {string|boolean=false}    options.data.cancelButton       是否显示取消按钮。值为`string`时显示该段文字。
 * @param {number=null}             options.data.width              对话框宽度。值为否定时宽度为CSS设置的宽度。
 * @param {function}                options.ok                      当点击确定的时候执行
 * @param {function}                options.cancel                  当点击取消的时候执行
 */
var MarkEditor = Component.extend({
    name: 'markEditor',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            content: ''
        });
        this.supr();
    },
    getHTML: function() {
        return marked(this.data.content);
    }
    /**
     * @protected
     */
    // init: function() {
    //     this.supr();
    // }
});

module.exports = MarkEditor;
