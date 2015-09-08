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
var MS_OF_DAY = 24*3600*1000;

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

        this.$watch('date', function(newValue, oldValue) {
            // 字符类型自动转为日期类型
            if(typeof newValue === 'string')
                return this.data.date = new Date(newValue);

            // 如果newValue为非法日期，则置为空 
            if(newValue == 'Invalid Date')
                return this.data.date = oldValue;

            // 如果不为空并且超出日期范围，则设置为范围边界的日期
            if(newValue) {
                var isOutOfRange = this.isOutOfRange(newValue);
                if(isOutOfRange)
                    return this.data.date = isOutOfRange;
            }

            if(newValue && (!this.data._date || this.data._date.toDateString() !== newValue.toDateString()))
                this.data._date = new Date(newValue);

            /**
             * @event change 日期改变时触发
             * @property {object} date 改变后的日期
             */
            this.$emit('change', {
                date: newValue
            });
        });

        this.$watch('minDate', function(newValue, oldValue) {
            if(!newValue)
                return;

            if(typeof newValue === 'string')
                return this.data.minDate = new Date(newValue);

            if(newValue == 'Invalid Date')
                return this.data.minDate = null;

            var minDate = new Date((newValue/MS_OF_DAY>>0)*MS_OF_DAY);
            if(newValue - minDate !== 0)
                return this.data.minDate = minDate;
        });

        this.$watch('maxDate', function(newValue, oldValue) {
            if(!newValue)
                return;

            if(typeof newValue === 'string')
                return this.data.maxDate = new Date(newValue);

            if(newValue == 'Invalid Date')
                return this.data.maxDate = null;

            var maxDate = new Date((newValue/MS_OF_DAY>>0)*MS_OF_DAY);
            if(newValue - maxDate !== 0)
                return this.data.maxDate = maxDate;
        });

        this.$watch(['minDate', 'maxDate'], function(minDate, maxDate) {
            if(!(minDate && minDate instanceof Date || maxDate && maxDate instanceof Date))
                return;

            if(minDate && maxDate && minDate - maxDate > 0)
                    throw new Calendar.DateRangeException(minDate, maxDate);

            // 如果不为空并且超出日期范围，则设置为范围边界的日期
            if(this.data.date) {
                var isOutOfRange = this.isOutOfRange(this.data.date);
                if(isOutOfRange)
                    return this.data.date = isOutOfRange;
            }
        });
    },
    /**
     * @method select(date) 选择一个日期
     * @public
     * @param  {Date=null} date 选择的日期
     * @return {void}
     */
    select: function(date) {
        if(this.data.readonly || this.data.disabled || this.isOutOfRange(date))
            return;

        this.data.date = date;

        /**
         * @event select 选择某一项时触发
         * @property {object} date 当前选择项
         */
        this.$emit('select', {
            date: date
        });

        this.toggle(false);
    },
    /**
     * @method input($event) 输入日期
     * @private
     * @param  {object} $event
     * @return {void}
     */
    _input: function($event) {
        var value = $event.target.value;
        var date = value ? new Date(value) : null;

        if(date != 'Invalid Date')
            this.data.date = date;
        else
            $event.target.value = filter.format(this.data.date, 'yyyy-MM-dd');
    },
    /**
     * @method isOutOfRange(date) 是否超出规定的日期范围
     * @public
     * @param {Date} date 待测的日期
     * @return {boolean|Date} 如果没有超出日期范围，则返回false；如果超出日期范围，则返回范围边界的日期
     */
    isOutOfRange: function(day) {
        var minDate = this.data.minDate;
        var maxDate = this.data.maxDate;

        // minDate && day < minDate && minDate，先判断是否为空，再判断是否超出范围，如果超出则返回范围边界的日期。
        return (minDate && day < minDate && minDate) || (maxDate && day > maxDate && maxDate);
    }
});

module.exports = DatePicker;