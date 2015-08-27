/**
 * ------------------------------------------------------------
 * Calendar  日历
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../base/component.js');
var template = require('./calendar.html');
var _ = require('../base/util.js');

var MS_OF_DAY = 24*3600*1000;

/**
 * @class Calendar
 * @extend Component
 * @param {object}                  options.data                    绑定属性
 * @param {Date=null}               options.data.date               当前选择的日期
 * @param {Date=null}               options.data.minDate            最小日期，如果为空则不限制
 * @param {Date=null}               options.data.maxDate            最大日期，如果为空则不限制
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
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
            if(newValue && oldValue && newValue.getFullYear() === oldValue.getFullYear() && newValue.getMonth() === oldValue.getMonth())
                return;

            // if(newValue && this.isOutOfRange(newValue))
            //     this.data.date = this.data.minDate || this.data.maxDate;
            
            this.update();
        });

        if(!this.data.date)
            this.goToday();
    },
    /**
     * @method update() 日期改变后更新日历
     * @private
     * @return {void}
     */
    update: function() {
        this.data._days = [];
        
        var date = this.data.date;
        var month = date.getMonth();
        var mfirst = new Date(date); mfirst.setDate(1);
        var mfirstTime = mfirst.getTime();
        var nfirst = new Date(mfirst); nfirst.setMonth(month + 1); nfirst.setDate(1);
        var nfirstTime = nfirst.getTime();
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
     * @return {void}
     */
    addYear: function(year) {
        if(this.data.readonly || this.data.disabled || !year)
            return;

        var date = new Date(this.data.date);
        date.setFullYear(date.getFullYear() + year);
        this.data.date = date;
    },
    /**
     * @method addMonth(month) 调整月份
     * @public
     * @param  {number=0} month 加/减的月份
     * @return {void}
     */
    addMonth: function(month) {
        if(this.data.readonly || this.data.disabled || !month)
            return;

        var date = new Date(this.data.date);
        date.setMonth(date.getMonth() + month);
        this.data.date = date;
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
         * @property {object} date 当前选择的日期
         */
        this.$emit('select', {
            date: date
        });
    },
    /**
     * @method goToday() 回到今天
     * @public
     * @return {void}
     */
    goToday: function() {
        this.data.date = new Date((new Date().getTime()/MS_OF_DAY>>0)*MS_OF_DAY);
    },
    /**
     * @method isOutOfRange 是否超出日期范围
     * @param {Date} day 某一天
     * @return {void}
     */
    isOutOfRange: function(day) {
        var minDate = this.data.minDate ? new Date((this.data.minDate.getTime()/MS_OF_DAY>>0)*MS_OF_DAY) : null;
        var maxDate = this.data.maxDate ? new Date((this.data.maxDate.getTime()/MS_OF_DAY>>0)*MS_OF_DAY) : null;

        return (minDate && day < minDate) || (maxDate && day > maxDate);
    }
});

module.exports = Calendar;