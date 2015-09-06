/**
 * ------------------------------------------------------------
 * DatePicker 日期选择
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

var Dropdown = require('./dropdown.js');
var template = require('text!./datePicker.html');
var _ = require('../base/util.js');

var filter = require('../base/filter.js');
var Calendar = require('../module/calendar.js');

/**
 * @class DatePicker
 * @extend Dropdown
 * @param {object}                  options.data                    绑定属性
 * @param {object=null}             options.data.date               当前选择的日期
 * @param {string='请输入'}         options.data.placeholder        文本框的占位文字
 * @param {Date|string=null}        options.data.minDate            最小日期，如果为空则不限制
 * @param {Date|string=null}        options.data.maxDate            最大日期，如果为空则不限制
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 */
var DatePicker = Dropdown.extend({
    name: 'datePicker',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            // @inherited open: false,
            minDate: null,
            maxDate: null,
            placeholder: '请输入',
            date: null,
            _date: null
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

        this.data.date = date;

        this.toggle(false);
    },
    input: function($event) {
        var date = new Date($event.target.value);
        if(date != 'Invalid Date')
            this.data.date = date;
        else
            $event.target.value = filter.format(this.data.date, 'yyyy-MM-dd');
    }
});

module.exports = DatePicker;