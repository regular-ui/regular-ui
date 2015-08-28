/**
 * ------------------------------------------------------------
 * TimePicker 日期选择
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

var Component = require('../base/component.js');
var template = require('./timePicker.html');
var _ = require('../base/util.js');
var NumberInput = require('./numberInput.js');

/**
 * @class TimePicker
 * @extend Component
 * @param {object}                  options.data                    绑定属性
 * @param {string='00:00'}          options.data.time               当前的时间值
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
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
            minute: 0
        });
        this.supr();

        this.$watch('time', function(newValue, oldValue) {
            if(newValue && newValue != oldValue) {
                time = newValue.split(':');
                this.data.hour = +time[0];
                this.data.minute = +time[1];

                this.$emit('change', {
                    time: newValue
                })
            }
        });

        this.$watch(['hour', 'minute'], function(hour, minute) {
            hour = '' + hour;
            minute = '' + minute;
            this.data.time = (hour.length > 1 ? hour : '0' + hour) + ':' + (minute.length > 1 ? minute : '0' + minute);
        });
    }
});

module.exports = TimePicker;