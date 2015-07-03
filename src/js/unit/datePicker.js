/**
 * ------------------------------------------------------------
 * DatePicker 日期选择
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

var DropDown = require('./dropDown.js');
var template = require('./datePicker.html');
var _ = require('../base/util.js');

var filter = require('../base/filter.js');
var Calendar = require('./calendar.js');

/**
 * @class DatePicker
 * @extend DropDown
 * @param {object}                  options.data                    绑定属性
 * @param {object=null}             options.data.date               当前选择的日期
 * @param {string='请输入'}         options.data.placeholder        文本框默认文字
 * @param {boolean=false}           options.data.readonly           文本框是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用该组件
 * @param {string=''}               options.data.class              补充class
 */
var DatePicker = DropDown.extend({
    name: 'datePicker',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            // @inherited open: false,
            placeholder: '请输入',
            readonly: false,
            // @inherited disabled: false,
        });
        this.supr();
    },
    /**
     * @method select(date) 选择一个日期
     * @public
     * @param  {Date=null} date 选择的日期
     * @return {void}
     */
    select: function(date) {
        /**
         * @event select 选择某一项时触发
         * @property {object} date 当前选择项
         */
        this.$emit('select', {
            date: date
        });
        this.toggle(false);
    },
    change: function($event) {
        var date = new Date($event.target.value);
        if(date != 'Invalid Date')
            this.data.date = date;
    }
});

module.exports = DatePicker;