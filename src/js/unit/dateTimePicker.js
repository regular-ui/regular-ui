var DatePicker = require('./datePicker.js');
var template = require('./dateTimePicker.html');
var _ = require('../base/util.js');

var filter = require('../base/filter.js');

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
            // @inherited selected: null,
            // @inherited value: '',
            // @inherited placeholder: '请输入',
            // @inherited minLength: 0,
            // @inherited delay: 300,
            matchType: 'start',
            // @inherited strict: false,
            readonly: true,
            // @inherited disabled: false,
            selectedTime: source[0]
        });
        this.supr();
    },
    change: function(item) {
        var time = this.data.selectedTime;
        time = time.name.split(':');

        item.setHours(time[0]);
        item.setMinutes(time[1]);

        this.data.selected = item;
        this.data.value = filter.format(item, 'yyyy-MM-dd HH:mm');
    },
    select: function(item) {
        /**
         * @event select 选择某一项时触发
         * @property {object} selected 当前选择项
         */
        this.$emit('select', {
            selected: item
        });
        this.toggle(false);
    },
    selectTime: function(time) {
        var item = this.data.selected || new Date();
        // this.data.selectedTime = time;
        time = time.name.split(':');

        item.setHours(time[0]);
        item.setMinutes(time[1]);

        this.data.value = filter.format(item, 'yyyy-MM-dd HH:mm');
    }
});

module.exports = DateTimePicker;