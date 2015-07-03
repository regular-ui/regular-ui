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

/**
 * @class Calendar
 * @extend Component
 * @param {object}                  options.data                    绑定属性
 * @param {Date=null}               options.data.date               当前选择的日期
 * @param {boolean=false}           options.data.disabled           是否禁用该组件
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
            disabled: false,
            _days: []
        });
        this.supr();

        this.$watch('date', function(newValue, oldValue) {
            if(newValue && oldValue && newValue.getFullYear() === oldValue.getFullYear() && newValue.getMonth() === oldValue.getMonth())
                return;

            this.update();
        });

        if(!this.data.date)
            this.goToday();
    },
    update: function() {
<<<<<<< HEAD
        var selected = this.data.selected;
        
        this.data._days = [];
        var month = selected.getMonth();
        var mfirst = new Date(selected); mfirst.setDate(1);
=======
        this.data._days = [];
        
        var date = this.data.date;
        var month = date.getMonth();
        var mfirst = new Date(date); mfirst.setDate(1);
>>>>>>> feature/dateTimeComponent_yusen_2015-06-24
        var mfirstTime = mfirst.getTime();
        var nfirst = new Date(mfirst); nfirst.setMonth(month + 1); nfirst.setDate(1);
        var nfirstTime = nfirst.getTime();
        var lastTime = nfirstTime + ((7 - nfirst.getDay())%7 - 1)*24*3600*1000;
        var num = - mfirst.getDay();
        var tmpTime, tmp;
        do {
            tmpTime = mfirstTime + (num++)*24*3600*1000;
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
        if(this.data.disabled || !year)
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
        if(this.data.disabled || !month)
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
        if(this.data.disabled)
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
        this.data.date = new Date((new Date().getTime()/(24*3600*1000)>>0)*(24*3600*1000));
    }
});

module.exports = Calendar;