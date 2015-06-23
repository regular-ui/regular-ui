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
 * @param {Date=null}               options.data.selected           当前选择的日期
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
            selected: null,
            disabled: false,
            _days: []
        });
        this.supr();

        this.back();
        //this.update();
    },
    update: function() {
        this.data._days = [];
        
        var selected = this.data.selected;
        var month = selected.getMonth();
        var mfirst = new Date(selected); mfirst.setDate(1);
        var mfirstTime = mfirst.getTime();
        var nfirst = new Date(selected); nfirst.setMonth(month + 1); nfirst.setDate(1);
        var nfirstTime = nfirst.getTime();
        var lastTime = nfirstTime + ((7 - nfirst.getDay())%7 - 1)*24*3600*1000;
        var num = - mfirst.getDay();
        var dateTime, date;
        do {
            dateTime = mfirstTime + (num++)*24*3600*1000;
            date = new Date(dateTime);
            this.data._days.push(date);
        } while(dateTime < lastTime);
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

        this.data.selected.setFullYear(this.data.selected.getFullYear() + year);
        this.update();

        /**
         * @event change 改变日期时触发
         * @property {object} selected 当前选择的日期
         */
        this.$emit('change', {
            selected: this.data.selected
        });
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

        this.data.selected.setMonth(this.data.selected.getMonth() + month);
        this.update();

        /**
         * @event change 改变日期时触发
         * @property {object} selected 当前选择的日期
         */
        this.$emit('change', {
            selected: this.data.selected
        });
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

        var month = this.data.selected.getMonth();
        if(date.getMonth() != month)
            return;

        this.data.selected = date;

        /**
         * @event select 选择某一个日期时触发
         * @property {object} selected 当前选择的日期
         */
        this.$emit('select', {
            selected: date
        });

        /**
         * @event change 改变日期时触发
         * @property {object} selected 当前选择的日期
         */
        this.$emit('change', {
            selected: date
        });
    },
    back: function() {
        var date = new Date((new Date().getTime()/(24*3600*1000)>>0)*(24*3600*1000));
        this.data.selected = date;

        /**
         * @event change 改变日期时触发
         * @property {object} selected 当前选择的日期
         */
        // this.$emit('change', {
        //     selected: date
        // });
        this.update();
    }
});

module.exports = Calendar;