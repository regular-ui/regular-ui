/**
 * ------------------------------------------------------------
 * DatePicker 日期选择
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

var Suggest = require('./suggest.js');
var template = require('./datePicker.html');
var _ = require('../base/util.js');

var filter = require('../base/filter.js');
var Calendar = require('./calendar.js');

/**
 * @class Suggest
 * @extend DropDown
 * @param {object}                  options.data                    绑定属性
 * @param {object=null}             options.data.selected           当前选择的日期
 * @param {string=''}               options.data.value              文本框中的值
 * @param {string='请输入'}         options.data.placeholder        文本框默认文字
 * @param {boolean=false}           options.data.disabled           是否禁用该组件
 * @param {string=''}               options.data.class              补充class
 */
var DatePicker = Suggest.extend({
    name: 'datePicker',
    template: template,
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            // @inherited open: false,
            // @inherited selected: null,
            // @inherited value: '',
            // @inherited placeholder: '请输入',
            // @inherited minLength: 0,
            // @inherited delay: 300,
            // @inherited matchType: 'all',
            // @inherited strict: false,
            readonly: true,
            // @inherited disabled: false,
        });
        this.supr();
    },
    change: function(item) {
        this.data.value = filter.format(item, 'yyyy-MM-dd');
        this.data.selected = item;
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