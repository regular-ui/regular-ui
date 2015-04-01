/**
 * ------------------------------------------------------------
 * Listbox   列表框
 * @version  0.0.1
 * @author   sensen(hzzhaoyusen@corp.netease.com)
 * ------------------------------------------------------------
 */

var Component = require('./component.js');
var template = require('./listbox.html');
var _ = require('./util.js');

/**
 * @example
 * var listbox = new Listbox().inject('#container');
 * @example
 * <listbox source={dataSource} />
 * @class Listbox
 * @extend Component
 * @param {object}                      options.data 可选参数
 *        {object[]=[]}                 options.data.source 数据源
 *        {number}                      options.data.source[].id 每项的id
 *        {string}                      options.data.source[].name 每项的内容
 *        {object=null}                 options.data.selected 选择项
 *        {boolean=false}               options.data.disabled 是否禁用该组件
 */
var Listbox = Component.extend({
    name: 'listbox',
    template: template,
    config: function() {
        _.extend(this.data, {
            source: [],
            selected: null,
            disabled: false,
            multiple: false
        });
        this.supr();
    },
    select: function(item) {
        this.data.selected = item;
        /**
         * @event close 选择某一项时触发
         * @property {object} selected 选择项
         */
        this.$emit('select', {
            selected: item
        });
    }
});

module.exports = Listbox;