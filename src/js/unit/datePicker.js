/*
 * --------------------------------------------
 * 下拉列表UI
 * @version  1.0
 * @author   zhaoyusen(hzzhaoyusen@corp.netease.com)
 * --------------------------------------------
 * @class Suggest
 * @extend Component
 * @param {Object} options
 *     options.value             
 *              
 */

var Suggest = require('./suggest.js');
var template = require('./datePicker.html');
var _ = require('../base/util.js');
var filter = require('../base/filter.js');
var Calendar = require('./calendar.js');

var DatePicker = Suggest.extend({
    name: 'datepicker',
    template: template,
    config: function() {
        _.extend(this.data, {
            // @override source: [],
            // @override selected: null,
            // @override placeholder: '请选择',
            // @override open: false,
            // @override disabled: false,
            // @override multiple: false
        });
        this.supr();
    },
    select: function(item) {
        this.$update('selected', item);
        this.data.value = filter.format(item, 'yyyy-MM-dd');
        //this.data.selected = item;
        /**
         * @event select 选择某一项时触发
         * @property {object} selected 当前选择项
         */
        this.$emit('select', {
            selected: item
        });
        this.toggle(false);
    },
    toggle: function(open, _isInput) {
        if(this.data.disabled)
            return;

        this.data.open = open;


        var index = Suggest.opens.indexOf(this);
        if(open && index < 0)
            Suggest.opens.push(this);
        else if(!open && index >= 0) {
            Suggest.opens.splice(index, 1);

            if(!_isInput && this.data.strict)
               this.data.value = this.data.selected ? filter.format(this.date.selected, 'yyyy-MM-dd') : '';
        }
    }
});

module.exports = DatePicker;