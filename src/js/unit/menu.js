/**
 * ------------------------------------------------------------
 * Menu      多级菜单
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

var Dropdown = require('./dropdown.js');
var SourceComponent = require('../base/sourceComponent.js');
var template = require('./menu.html');
var hierarchicalTemplate = require('./menuList.html');
var _ = require('../base/util.js');

/**
 * @class  Menu
 * @extend Dropdown
 * @param {object}                  options.data                    绑定属性
 * @param {object[]=[]}             options.data.source             数据源
 * @param {number}                  options.data.source[].id        每项的id
 * @param {string}                  options.data.source[].name      每项的内容
 * @param {boolean=false}           options.data.open               当前为展开/收起状态
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 * @param {object}                  options.service                 数据服务
 */
var Menu = Dropdown.extend({
    name: 'menu',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            open: false
        });
        this.supr();

        this.$ancestor = this;
    }
});

var MenuList = SourceComponent.extend({
    name: 'menuList',
    template: hierarchicalTemplate,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            itemTemplate: null,
            // visible: false
        });
        this.supr();

        this.$ancestor = this.$parent.$ancestor;
        this.service = this.$ancestor.service;
        this.data.itemTemplate = this.$ancestor.data.itemTemplate;
    },
    /**
     * @method select(item) 选择某一项
     * @private
     * @param  {object} item 选择项
     * @return {void}
     */
    select: function(item) {
        if(this.$ancestor.data.disabled)
            return;

        this.$ancestor.select(item);
    },
    /**
     * @method toggle(item) 展开或收起某一项
     * @private
     * @param  {object} item 展开收起项
     * @return {void}
     */
    toggle: function(item) {
        if(this.$ancestor.data.disabled)
            return;

        item.open = !item.open;

        /**
         * @event toggle 展开或收起某一项时触发
         * @property {object} item 展开收起项
         * @property {boolean} open 展开还是收起
         */
        this.$ancestor.$emit('toggle', {
            item: item,
            open: item.open
        });
    }
})

module.exports = Menu;