/**
 * ------------------------------------------------------------
 * SelectEx  选择扩展
 * @version  0.0.1
 * @author   sensen(hzzhaoyusen@corp.netease.com)
 * ------------------------------------------------------------
 */

var Component = require('../base/component.js');
var template = require('./selectEx.html');
var _ = require('../base/util.js');

/**
 * @class SelectEx
 * @extend Component
 * @param {object}                      options.data 绑定属性
 * @param {object[]=[]}                 options.data.source 数据源
 * @param {number}                      options.data.source[].id 每项的id
 * @param {string}                      options.data.source[].name 每项的内容
 * @param {object=null}                 options.data.selected 当前选择项
 * @param {string='请选择'}             options.data.placeholder 默认项
 * @param {boolean=false}               options.data.open 当前为展开状态还是收起状态
 * @param {boolean=false}               options.data.disabled 是否禁用该组件
 */
var SelectEx = Component.extend({
    name: 'selectEx',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            source: [],
            selected: null,
            placeholder: '请选择',
            open: false,
            disabled: false,
            multiple: false
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
        this.$update('selected', item);
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
     * @method toggle(open)  在展开状态和收起状态之间切换
     * @public
     * @param  {[type]} open 展开还是收起
     * @return {void}
     */
    toggle: function(open) {
        if(this.data.disabled)
            return;
        
        this.data.open = open;

        var index = SelectEx.opens.indexOf(this);
        if(open && index < 0)
            SelectEx.opens.push(this);
        else if(!open && index >= 0)
            SelectEx.opens.splice(index, 1);
    }
});

// 处理点击selectEx之外的地方后的收起事件。
SelectEx.opens = [];

_.addEvent(window.document, 'click', function(e) {
    SelectEx.opens.forEach(function(selectEx) {
        var element = selectEx.$refs.element;
        var element2 = e.target;
        while(element2) {
            if(element == element2)
                return;
            element2 = element2.parentElement;
        }
        selectEx.toggle(false);
        selectEx.$update();
    });
});

module.exports = SelectEx;