/**
 * ------------------------------------------------------------
 * Calendar  日历
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('regular-ui-base/src/component');
var template = require('./calendar.html');
var _ = require('regular-ui-base/src/_');

var bowser = require('bowser');
var polyfill = require('regular-ui-base/src/polyfill');
var MS_OF_DAY = 24*3600*1000;

/**
 * @class Calendar
 * @extend Component
 * @param {object}                  options.data                     =  绑定属性
 * @param {Date|string=TODAY}       options.data.date               <=> 当前选择的日期
 * @param {Date|string=null}        options.data.minDate             => 最小日期，如果为空则不限制
 * @param {Date|string=null}        options.data.maxDate             => 最大日期，如果为空则不限制
 * @param {boolean=false}           options.data.readonly            => 是否只读
 * @param {boolean=false}           options.data.disabled            => 是否禁用
 * @param {boolean=true}            options.data.visible             => 是否显示
 * @param {string=''}               options.data.class               => 补充class
 */
var Calendar = Component.extend({
    name: 'calendar',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            date: null,
            minDate: null,
            maxDate: null,
            _days: []
        });
        this.supr();

        this.$watch('date', function(newValue, oldValue) {
            // 字符类型自动转为日期类型
            if(typeof newValue === 'string') {
                if(bowser.msie && bowser.version <= 8)
                    return this.data.date = polyfill.StringDate(newValue);
                return this.data.date = new Date(newValue);
            }

            // 如果newValue为空， 则自动转到今天
            if(!newValue)
                return this.data.date = new Date((new Date/MS_OF_DAY>>0)*MS_OF_DAY);

            if(newValue == 'Invalid Date')
                throw new TypeError('Invalid Date');

            // 如果超出日期范围，则设置为范围边界的日期
            var isOutOfRange = this.isOutOfRange(newValue);
            if(isOutOfRange) {
                this.data.date = isOutOfRange;

                // 防止第二次刷新同月
                this._update();
                return;
            }

            if(!oldValue || !oldValue.getFullYear)
                this._update();
            else if(newValue.getFullYear() !== oldValue.getFullYear() || newValue.getMonth() !== oldValue.getMonth())
                this._update();

            /**
             * @event change 日期改变时触发
             * @property {object} sender 事件发送对象
             * @property {object} date 改变后的日期
             */
            this.$emit('change', {
                sender: this,
                date: newValue
            });
        });

        this.$watch('minDate', function(newValue, oldValue) {
            if(!newValue)
                return;

            if(typeof newValue === 'string') {
                if(bowser.msie && bowser.version <= 8)
                    return this.data.date = polyfill.StringDate(newValue);
                return this.data.minDate = new Date(newValue);
            }

            if(newValue == 'Invalid Date')
                throw new TypeError('Invalid Date');
        });

        this.$watch('maxDate', function(newValue, oldValue) {
            if(!newValue)
                return;

            if(typeof newValue === 'string') {
                if(bowser.msie && bowser.version <= 8)
                    return this.data.date = polyfill.StringDate(newValue);
                return this.data.maxDate = new Date(newValue);
            }

            if(newValue == 'Invalid Date')
                throw new TypeError('Invalid Date');
        });

        this.$watch(['minDate', 'maxDate'], function(minDate, maxDate) {
            if(!(minDate && minDate instanceof Date || maxDate && maxDate instanceof Date))
                return;

            if(minDate && maxDate)
                if(minDate/MS_OF_DAY>>0 > maxDate/MS_OF_DAY>>0)
                    throw new Calendar.DateRangeError(minDate, maxDate);
            
            // 如果超出日期范围，则设置为范围边界的日期
            var isOutOfRange = this.isOutOfRange(this.data.date);
            if(isOutOfRange)
                this.data.date = isOutOfRange;
        });
    },
    /**
     * @method _update() 日期改变后更新日历
     * @private
     * @return {void}
     */
    _update: function() {
        this.data._days = [];
        
        var date = this.data.date;
        var month = date.getMonth();
        var mfirst = new Date(date); mfirst.setDate(1);
        var mfirstTime = +mfirst;
        var nfirst = new Date(mfirst); nfirst.setMonth(month + 1); nfirst.setDate(1);
        var nfirstTime = +nfirst;
        var lastTime = nfirstTime + ((7 - nfirst.getDay())%7 - 1)*MS_OF_DAY;
        var num = - mfirst.getDay();
        var tmpTime, tmp;
        do {
            tmpTime = mfirstTime + (num++)*MS_OF_DAY;
            tmp = new Date(tmpTime);
            this.data._days.push(tmp);
        } while(tmpTime < lastTime);
    },
    /**
     * @method addYear(year) 调整年份
     * @public
     * @param  {number=0} year 加/减的年份
     * @return {Date} date 计算后的日期
     */
    addYear: function(year) {
        if(this.data.readonly || this.data.disabled || !year)
            return;

        if(isNaN(year))
            throw new TypeError(year + ' is not a number!');

        var date = new Date(this.data.date);
        var oldMonth = date.getMonth();
        date.setFullYear(date.getFullYear() + year);
        if(date.getMonth() != oldMonth)
            date.setDate(0);
        
        return this.data.date = date;
    },
    /**
     * @method addMonth(month) 调整月份
     * @public
     * @param  {number=0} month 加/减的月份
     * @return {Date} date 计算后的日期
     */
    addMonth: function(month) {
        if(this.data.readonly || this.data.disabled || !month)
            return;

        if(isNaN(month))
            throw new TypeError(month + ' is not a number!');

        var date = new Date(this.data.date);
        var correctMonth = date.getMonth() + month;
        date.setMonth(correctMonth);
        // 如果跳月，则置为上一个月
        if((date.getMonth() - correctMonth)%12)
            date.setDate(0);
        
        return this.data.date = date;
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

        this.data.date = new Date(date);

        /**
         * @event select 选择某一个日期时触发
         * @property {object} sender 事件发送对象
         * @property {object} date 当前选择的日期
         */
        this.$emit('select', {
            sender: this,
            date: date
        });
    },
    /**
     * @method goToday() 回到今天
     * @public
     * @return {void}
     */
    goToday: function() {
        if(this.data.readonly || this.data.disabled)
            return;

        this.data.date = new Date((new Date/MS_OF_DAY>>0)*MS_OF_DAY);
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

        // minDate && date < minDate && minDate，先判断是否为空，再判断是否超出范围，如果超出则返回范围边界的日期
        return (minDate && date < minDate && minDate) || (maxDate && date > maxDate && maxDate);
    }
});

var DateRangeError = function(minDate, maxDate) {
    this.name = 'DateRangeError';
    this.message = 'Wrong Date Range where `minDate` is ' + minDate + ' and `maxDate` is ' + maxDate + '!';
}
DateRangeError.prototype = Object.create(RangeError.prototype);
Calendar.DateRangeError = DateRangeError.prototype.constructor = DateRangeError;

module.exports = Calendar;