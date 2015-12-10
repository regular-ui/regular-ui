/**
 * ------------------------------------------------------------
 * DatePicker 日期选择
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

var Dropdown = require('./dropdown.js');
var template = require('text!./datePicker.html');
var _ = require('regular-ui-base/src/_');

var filter = require('regular-ui-base').filter;
var Calendar = require('../module/calendar.js');
var compatibility = require('regular-ui-base/src/compatibility');
var MS_OF_DAY = 24*3600*1000;

/**
 * @class DatePicker
 * @extend Dropdown
 * @param {object}                  options.data                     =  绑定属性
 * @param {object=null}             options.data.date               <=> 当前选择的日期
 * @param {string='请输入'}         options.data.placeholder         => 文本框的占位文字
 * @param {Date|string=null}        options.data.minDate             => 最小日期，如果为空则不限制
 * @param {Date|string=null}        options.data.maxDate             => 最大日期，如果为空则不限制
 * @param {boolean=false}           options.data.autofocus           => 是否自动获得焦点
 * @param {boolean=false}           options.data.readonly            => 是否只读
 * @param {boolean=false}           options.data.disabled            => 是否禁用
 * @param {boolean=true}            options.data.visible             => 是否显示
 * @param {string=''}               options.data.class               => 补充class
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
            _date: undefined,
            autofocus: false
        });
        this.supr();

        this.$watch('date', function(newValue, oldValue) {
            // 字符类型自动转为日期类型
            if(typeof newValue === 'string') {
                if(compatibility.isIE8)
                    return this.data.date = compatibility.StringDate(newValue);
                return this.data.date = new Date(newValue);
            }

            // 如果newValue为非法日期，则置为空 
            if(newValue == 'Invalid Date' || newValue == 'NaN')
                return this.data.date = null;

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
             * @property {object} source 事件发起对象
             * @property {object} date 改变后的日期
             */
            this.$emit('change', {
                source: this,
                date: newValue
            });
        });

        this.$watch('minDate', function(newValue, oldValue) {
            if(!newValue)
                return;

            if(typeof newValue === 'string') {
                if(compatibility.isIE8)
                    return this.data.date = compatibility.StringDate(newValue);
                return this.data.minDate = new Date(newValue);
            }

            if(newValue == 'Invalid Date' || newValue == 'NaN')
                return this.data.minDate = null;
        });

        this.$watch('maxDate', function(newValue, oldValue) {
            if(!newValue)
                return;

            if(typeof newValue === 'string') {
                if(compatibility.isIE8)
                    return this.data.date = compatibility.StringDate(newValue);
                return this.data.maxDate = new Date(newValue);
            }

            if(newValue == 'Invalid Date' || newValue == 'NaN')
                return this.data.maxDate = null;
        });

        this.$watch(['minDate', 'maxDate'], function(minDate, maxDate) {
            if(!(minDate && minDate instanceof Date || maxDate && maxDate instanceof Date))
                return;

            if(minDate && maxDate)
                if(minDate/MS_OF_DAY>>0 > maxDate/MS_OF_DAY>>0)
                    throw new Calendar.DateRangeError(minDate, maxDate);

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
         * @property {object} source 事件发起对象
         * @property {object} date 当前选择项
         */
        this.$emit('select', {
            source: this,
            date: date
        });

        this.toggle(false);
    },
    /**
     * @method _onInput($event) 输入日期
     * @private
     * @param  {object} $event
     * @return {void}
     */
    _onInput: function($event) {
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
     * @return {boolean|Date} date 如果没有超出日期范围，则返回false；如果超出日期范围，则返回范围边界的日期
     */
    isOutOfRange: function(date) {
        var minDate = this.data.minDate;
        var maxDate = this.data.maxDate;

        // 不要直接在$watch中改变`minDate`和`maxDate`的值，因为有时向外绑定时可能不希望改变它们。
        var minDate = minDate && new Date((minDate/MS_OF_DAY>>0)*MS_OF_DAY);
        var maxDate = maxDate && new Date((maxDate/MS_OF_DAY>>0)*MS_OF_DAY);

        // minDate && date < minDate && minDate，先判断是否为空，再判断是否超出范围，如果超出则返回范围边界的日期。
        return (minDate && date < minDate && minDate) || (maxDate && date > maxDate && maxDate);
    }
});

module.exports = DatePicker;