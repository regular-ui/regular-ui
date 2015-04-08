/**
 * ------------------------------------------------------------
 * Listbox   列表框
 * @version  0.0.1
 * @author   sensen(hzzhaoyusen@corp.netease.com)
 * ------------------------------------------------------------
 */

var ListBox = require('./listBox.js');
var template = require('./listView.html');
var _ = require('../base/util.js');

/**
 * @example
 * var modal = new Modal();
 * @class Modal
 * @extend Component
 * @param {object=}                      options.data 可选参数
 *        {string='提示'}                options.data.title 对话框标题
 *        {string=}                      options.data.content 对话框内容
 *        {string|boolean=true}          options.data.okButton 确定按钮的文字，如果为false则不显示确定按钮
 *        {string|boolean=false}         options.data.cancelButton 取消按钮的文字，如果为false则不显示取消按钮
 *        {number=320}                   options.data.width 对话框宽度
 *        {function=}                    options.ok 当点击确定的时候执行
 *        {function=}                    options.cancel 当点击取消的时候执行
 * @Event close 当value改变时发生 {result} 确定result为true，取消result为false
 */
var ListView = ListBox.extend({
    name: 'listView',
    template: template,
    config: function() {
        _.extend(this.data, {
            itemTemplate: null //'{item.id}'
            // @override source: [],
            // @override selected: null,
            // @override disabled: false,
            // @override multiple: false
        });
        this.supr();
    },
    select: function(item) {
        this.data.selected = item;
        
    }
});

module.exports = ListView;