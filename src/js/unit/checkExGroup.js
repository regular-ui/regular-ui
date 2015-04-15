/**
 * ------------------------------------------------------------
 * CheckExGroup 输入扩展
 * @version  0.0.1
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

var Component = require('../base/component.js');
var template = require('./checkGroup.html');
var _ = require('../base/util.js');
var CheckEx = require('./checkEx.js');

/**
 * @class CheckExGroup
 * @extend Component
 * @param {object}                      options.data 绑定属性
 * @param {string=''}                   options.data.name 当前选择项
 * @param {object=null}                 options.data.checked 当前选择项
 * @param {boolean=false}               options.data.disabled 是否禁用该组件
 * @example
 *     var listbox = new CheckExGroup().inject('#container');
 * @example
 *     <listbox source={dataSource} />
 */
var CheckExGroup = Component.extend({
    name: 'checkExGroup',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            source: []
        });
        this.supr();
    },
    /**
     * @method select(item) 选择某一项
     * @public
     * @param  {object} item 选择项
     * @return {void}
     */
    checkAll: function(checked) {
        this.data.checked = checked;
        /**
         * @event select 选择某一项时触发
         * @property {object} selected 当前选择项
         */
        this.$emit('check', {
            checked: checked
        });
    }
});

module.exports = CheckExGroup;