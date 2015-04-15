/**
 * ------------------------------------------------------------
 * Tab  选择扩展
 * @version  0.0.1
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

var Component = require('../base/component.js');
var template = require('./tab.html');
var _ = require('../base/util.js');
var TabHead = require('./tabHead.js');

/**
 * @class Tab
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
var Tab = Component.extend({
    name: 'tab',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            tabs: [],
            selected: null
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
    }
});

var TabPane = Component.extend({
    name: 'tabPane',
    data: { selected: false },
    template: '<div r-hide={this.$outer.data.selected != this}><r-content></div>',
    config: function() { 

        if(this.$outer) {
            var tabs = this.$outer.data.tabs;
            tabs.push(this);
        }
    }
});

module.exports = Tab;