/**
 * ------------------------------------------------------------
 * DateTimePicker 日期选择
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

var DatePicker = require('./datePicker.js');
var template = require('text!./dateTimePicker.html');
var _ = require('../base/util.js');
var TimePicker = require('./timePicker.js');

var filter = require('../base/filter.js');

/**
 * @class DateTimePicker
 * @extend DatePicker
 * @param {object}                  options.data                    绑定属性
 * @param {object=null}             options.data.date               当前选择的日期
 * @param {string='请输入'}         options.data.placeholder        文本框的占位文字
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 */
var DateTimePicker = DatePicker.extend({
    name: 'dateTimePicker',
    template: template,
    config: function() {   
        _.extend(this.data, {
            // @inherited source: [],
            // @inherited open: false,
            // @inherited placeholder: '请输入',
            date: null,
            _date: undefined,
            _time: '00:00'
        });
        this.supr();

        this.$watch('date', function(newValue, oldValue) {
            if(newValue && newValue != 'Invalid Date' && newValue - oldValue !== 0) {
                this.data._date = new Date(newValue);
                this.data._time = filter.format(newValue, 'HH:mm');
            }
        });

        this.$watch(['_date', '_time'], function(_date, _time) {
            if(_date && _time) {
                var date = new Date(this.data._date);
                var time = this.data._time.split(':');
                date.setHours(time[0]);
                date.setMinutes(time[1]);
                date.setSeconds(0);
                date.setMilliseconds(0);
                this.data.date = date;
            }
        });
    },
    input: function($event) {
        var date = new Date($event.target.value);
        if(date != 'Invalid Date') {
            date.setSeconds(0);
            date.setMilliseconds(0);
            this.data.date = date;
        } else
            $event.target.value = filter.format(this.data.date, 'yyyy-MM-dd HH:mm');
    }
});

module.exports = DateTimePicker;