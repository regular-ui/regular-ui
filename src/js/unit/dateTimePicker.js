/**
 * ------------------------------------------------------------
 * DateTimePicker 日期选择
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

var Dropdown = require('./dropdown.js');
var DatePicker = require('./datePicker.js');
var template = require('text!./dateTimePicker.html');
var _ = require('../base/util.js');

var filter = require('../base/filter.js');
var Calendar = require('../module/calendar.js');
var TimePicker = require('./timePicker.js');

/**
 * @class DateTimePicker
 * @extend Dropdown
 * @param {object}                  options.data                    绑定属性
 * @param {object=null}             options.data.date               当前选择的日期时间
 * @param {string='请输入'}         options.data.placeholder        文本框的占位文字
 * @param {Date|string=null}        options.data.minDate            最小日期时间，如果为空则不限制
 * @param {Date|string=null}        options.data.maxDate            最大日期时间，如果为空则不限制
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 */
var DateTimePicker = Dropdown.extend({
    name: 'dateTimePicker',
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
            _date: undefined,
            _time: undefined
        });
        this.supr();

        this.$watch('date', function(newValue, oldValue) {
            // 字符类型自动转为日期类型
            if(typeof newValue === 'string')
                return this.data.date = new Date(newValue);

            // 如果newValue为非法日期，则置为空 
            if(newValue == 'Invalid Date')
                return this.data.date = null;

            // 如果不为空并且超出日期范围，则设置为范围边界的日期
            if(newValue) {
                var isOutOfRange = this.isOutOfRange(newValue);
                if(isOutOfRange)
                    return this.data.date = isOutOfRange;
            }

            if(newValue && newValue - oldValue !== 0) {
                this.data.date.setSeconds(0);
                this.data.date.setMilliseconds(0);
                this.data._date = new Date(newValue);
                this.data._time = filter.format(newValue, 'HH:mm');
            }

            /**
             * @event change 日期时间改变时触发
             * @property {object} date 改变后的日期时间
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
        });

        this.$watch('maxDate', function(newValue, oldValue) {
            if(!newValue)
                return;

            if(typeof newValue === 'string')
                return this.data.maxDate = new Date(newValue);

            if(newValue == 'Invalid Date')
                return this.data.maxDate = null;
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
     * @method _update(date, time) 日期或时间改变后更新日期时间
     * @private
     * @return {void}
     */
    _update: function(date, time) {
        if(!time)
            return this.data._time = '00:00';

        date = new Date(date);
        time = time.split(':');
        date.setHours(time[0]);
        date.setMinutes(time[1]);
        this.data.date = date;


    },
    /**
     * @method select()
     * @public
     * @ignore
     */
    select: function() {
        /**
         * @event select
         * @public
         * @ignore
         */
    },
    /**
     * @method _input($event) 输入日期
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
            $event.target.value = filter.format(this.data.date, 'yyyy-MM-dd HH:mm');
    },
    /**
     * @method isOutOfRange(date) 是否超出规定的日期时间范围
     * @public
     * @param {Date} date 待测的日期时间
     * @return {boolean|Date} 如果没有超出日期时间范围，则返回false；如果超出日期时间范围，则返回范围边界的日期时间
     */
    isOutOfRange: function(date) {
        var minDate = this.data.minDate;
        var maxDate = this.data.maxDate;

        // minDate && date < minDate && minDate，先判断是否为空，再判断是否超出范围，如果超出则返回范围边界的日期时间。
        return (minDate && date < minDate && minDate) || (maxDate && date > maxDate && maxDate);
    }
});

module.exports = DateTimePicker;