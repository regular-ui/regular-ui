/**
 * ------------------------------------------------------------
 * DateTimePicker 日期选择
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

var DatePicker = require('./datePicker.js');
var template = require('./dateTimePicker.html');
var _ = require('../base/util.js');

var filter = require('../base/filter.js');

/**
 * @class DateTimePicker
 * @extend DatePicker
 * @param {object}                  options.data                    绑定属性
 * @param {object=null}             options.data.date               当前选择的日期
 * @param {string='请输入'}         options.data.placeholder        文本框默认文字
 * @param {boolean=false}           options.data.readonly           文本框是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用该组件
 * @param {string=''}               options.data.class              补充class
 */
var DateTimePicker = DatePicker.extend({
    name: 'dateTimePicker',
    template: template,
    config: function() {
        var source = [];
        for(var i = 0; i < 10; i++) {
            source.push({name: '0' + i + ':00'});
            source.push({name: '0' + i + ':30'});
        }
        for(var i = 10; i < 24; i++) {
            source.push({name: i + ':00'});
            source.push({name: i + ':30'});
        }
        
        _.extend(this.data, {
            source: source,
            // @inherited source: [],
            // @inherited open: false,
            // @inherited placeholder: '请输入',
            // @inherited readonly: false,
            // @inherited disabled: false,
            selectedDate: new Date(),
            selectedTime: ''
        });
        this.supr();

        // this.$watch('selected', function(newValue, oldValue) {
        //     newValue = newValue || new Date();
        //     this.$refs.calendar.data.selected = newValue;

        //     var time =  filter.format(newValue, newValue.getMinutes()%30 === 0 ? 'HH:mm' : 'HH:00');
        //     for(var i = 0; i < this.data.source.length; i++) {
        //         var item = this.data.source[i];   
        //         if(time === item.name) {
        //             this.data.selectedTime = item;
        //             break;
        //         }
        //     }
        // });

        this.$watch(['selectedDate', 'selectedTime'], function(selectedDate, selectedTime) {
            if(selectedDate && selectedTime) {
                var date = new Date(this.data.selectedDate);
                var time = this.data.selectedTime.split(':');

                date.setHours(time[0]);
                date.setMinutes(time[1]);
                date.setSeconds(0);
                date.setMilliseconds(0);
                
                this.data.date = date;
            } else
                this.data.date = null;
        });
    },
    select: function(item) {
        /**
         * @event select 选择某一项时触发
         * @property {object} date 当前选择项
         */
        // this.$emit('select', {
        //     date: item
        // });

        if(!(item instanceof Date))
            this.data.selectedTime = item.name;

        if(!(item instanceof Date) || this.data.selectedTime)
            this.toggle(false);
    },
    change: function($event) {
        var value = $event.target.value;
        var date = new Date(value);
        if(date != 'Invalid Date') {
            // this.data.date = date;
            this.data.selectedDate = date;
            this.data.selectedTime = value.split(' ')[1];
        }
    }
});

module.exports = DateTimePicker;