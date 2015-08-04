/**
 * ------------------------------------------------------------
 * Dropdown  下拉菜单
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

var SourceComponent = require('../base/sourceComponent.js');
var template = require('./dropdown.html');
var _ = require('../base/util.js');

/**
 * @class Dropdown
 * @extend SourceComponent
 * @param {object}                  options.data                    绑定属性
 * @param {object[]=[]}             options.data.source             数据源
 * @param {number}                  options.data.source[].id        每项的id
 * @param {string}                  options.data.source[].name      每项的内容
 * @param {string=null}             options.data.itemTemplate       单项模板
 * @param {boolean=false}           options.data.open               当前为展开/收起状态
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 * @param {object}                  options.service                 数据服务
 */
var Dropdown = SourceComponent.extend({
    name: 'dropdown',
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
    },
    /**
     * @method select(item) 选择某一项
     * @public
     * @param  {object} item 选择项
     * @return {void}
     */
    select: function(item) {
        if(this.data.readonly || this.data.disabled || item.disabled || item.divider)
            return;

        //this.data.selected = item;
        /**
         * @event select 选择某一项时触发
         * @property {object} selected 当前选择项
         */
        this.$emit('select', {
            selected: item
        });
        this.toggle(false);
    },
    /**
     * @method toggle(open) 在展开/收起状态之间切换
     * @public
     * @param  {boolean} open 展开/收起
     * @return {void}
     */
    toggle: function(open) {
        if(this.data.readonly || this.data.disabled)
            return;
        
        this.data.open = open;

        // 根据状态在Dropdown.opens列表中添加/删除管理项
        var index = Dropdown.opens.indexOf(this);
        if(open && index < 0)
            Dropdown.opens.push(this);
        else if(!open && index >= 0)
            Dropdown.opens.splice(index, 1);
    }
});

// 处理点击dropdown之外的地方后的收起事件。
Dropdown.opens = [];

_.dom.on(document.body, 'click', function(e) {
    Dropdown.opens.forEach(function(dropdown) {
        // 这个地方不能用stopPropagation来处理，因为展开一个dropdown的同时要收起其他dropdown
        var element = dropdown.$refs.element;
        var element2 = e.target;
        while(element2) {
            if(element == element2)
                return;
            element2 = element2.parentElement;
        }
        dropdown.toggle(false);
        dropdown.$update();
    });
});

module.exports = Dropdown;