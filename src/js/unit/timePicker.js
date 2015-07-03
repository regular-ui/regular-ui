/**
 * ------------------------------------------------------------
 * TimePicker 日期选择
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

var Suggest = require('./suggest.js');
var _ = require('../base/util.js');

/**
 * @class TimePicker
 * @extend Suggest
 * @param {object}                  options.data                    绑定属性
 * @param {string=''}               options.data.value              文本框中的值
 * @param {string='请输入'}         options.data.placeholder        文本框默认文字
 * @param {boolean=false}           options.data.readonly           文本框是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用该组件
 * @param {string=''}               options.data.class              补充class
 */
var TimePicker = Suggest.extend({
    name: 'timePicker',
    /**
     * @protected
     */
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
            // @inherited open: false,
            // @inherited selected: null,
            // @inherited value: '',
            // @inherited placeholder: '请输入',
            // @inherited minLength: 0,
            // @inherited delay: 300,
            matchType: 'start'
            // @inherited strict: false,
            // @inherited readonly: false,
            // @inherited disabled: false,
        });
        this.supr();
    },
    filter: function(item) {
        return true;
    }
});

module.exports = TimePicker;