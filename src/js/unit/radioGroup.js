/**
 * ------------------------------------------------------------
 * RadioGroup 输入扩展
 * @version  0.0.1
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

var Component = require('../base/component.js');
var template = require('./radioGroup.html');
var _ = require('../base/util.js');

/**
 * @class RadioGroup
 * @extend Component
 * @param {object}                      options.data 绑定属性
 * @param {string=''}                   options.data.name 当前选择项
 * @param {object=null}                 options.data.checked 当前选择项
 * @param {boolean=false}               options.data.disabled 是否禁用该组件
 * @example
 *     var listbox = new RadioGroup().inject('#container');
 * @example
 *     <listbox source={dataSource} />
 */
var RadioGroup = Component.extend({
    name: 'radiogroup',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            source: [],
            selected: null,
            _radioGroupId: new Date()
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
        this.data.selected = item;
    }
});

module.exports = RadioGroup;