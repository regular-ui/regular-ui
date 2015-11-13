/**
 * ------------------------------------------------------------
 * TimePicker 时间选择
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

var Component = require('../base/component.js');
var template = require('text!./timePicker.html');
var _ = require('../base/_.js');
var NumberInput = require('./numberInput.js');

/**
 * @class TimePicker
 * @extend Component
 * @param {object}                  options.data                     =  绑定属性
 * @param {string='00:00'}          options.data.time               <=> 当前的时间值
 * @param {string='00:00'}          options.data.minTime             => 最小时间
 * @param {string='23:59'}          options.data.maxTime             => 最大时间
 * @param {boolean=false}           options.data.autofocus           => 是否自动获得焦点
 * @param {boolean=false}           options.data.readonly            => 是否只读
 * @param {boolean=false}           options.data.disabled            => 是否禁用
 * @param {boolean=true}            options.data.visible             => 是否显示
 * @param {string=''}               options.data.class               => 补充class
 */
var TimePicker = Component.extend({
    name: 'timePicker',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            time: '00:00',
            hour: 0,
            minute: 0,
            minTime: '00:00',
            maxTime: '23:59',
            autofocus: false
        });
        this.supr();

        this.$watch('time', function(newValue, oldValue) {
            if(!newValue)
                throw new TimePicker.TimeFormatException(newValue);

            // 如果超出时间范围，则设置为范围边界的时间
            var isOutOfRange = this.isOutOfRange(newValue);
            if(isOutOfRange)
                return this.data.time = isOutOfRange;

            time = newValue.split(':');
            this.data.hour = +time[0];
            this.data.minute = +time[1];

            /**
             * @event change 时间改变时触发
             * @property {object} time 改变后的时间
             */
            this.$emit('change', {
                time: newValue
            });
        });

        this.$watch(['hour', 'minute'], function(hour, minute) {
            hour += '';
            minute += '';
            this.data.time = (hour.length > 1 ? hour : '0' + hour) + ':' + (minute.length > 1 ? minute : '0' + minute);
        });

        this.$watch(['minTime', 'maxTime'], function(minTime, maxTime) {
            if(!minTime)
                throw new TimePicker.TimeFormatException(minTime);
            if(!maxTime)
                throw new TimePicker.TimeFormatException(maxTime);

            if(minTime > maxTime)
                    throw new TimePicker.TimeRangeException(minTime, maxTime);
            
            // 如果超出时间范围，则设置为范围边界的时间
            var isOutOfRange = this.isOutOfRange(this.data.time);
            if(isOutOfRange)
                this.data.time = isOutOfRange;
        });
    },
    /**
     * @method isOutOfRange(time) 是否超出规定的时间范围
     * @public
     * @param {Time} time 待测的时间
     * @return {boolean|Time} time 如果没有超出时间范围，则返回false；如果超出时间范围，则返回范围边界的时间
     */
    isOutOfRange: function(time) {
        var minTime = this.data.minTime;
        var maxTime = this.data.maxTime;

        // minTime && time < minTime && minTime，先判断是否为空，再判断是否超出范围，如果超出则返回范围边界的时间
        return (minTime && time < minTime && minTime) || (maxTime && time > maxTime && maxTime);
    }
});

TimePicker.TimeFormatException = function(time) {
    this.message = 'Wrong Time Format: ' + time + '!';
}

TimePicker.TimeFormatException.prototype.toString = function() {
    return this.message;
}

TimePicker.TimeRangeException = function(minTime, maxTime) {
    this.type = 'TimeRangeException';
    this.message = 'Wrong Time Range where `minTime` is ' + minTime + ' and `maxTime` is ' + maxTime + '!';
}

TimePicker.TimeRangeException.prototype.toString = function() {
    return this.message;
}

module.exports = TimePicker;