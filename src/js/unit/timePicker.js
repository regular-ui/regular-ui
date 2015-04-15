/*
 * --------------------------------------------
 * 下拉列表UI
 * @version  1.0
 * @author   zhaoyusen(rainforest92@126.com)
 * --------------------------------------------
 * @class Suggest
 * @extend Component
 * @param {Object} options
 *     options.value             
 *              
 */

var Suggest = require('./suggest.js');
var _ = require('../base/util.js');

var TimePicker = Suggest.extend({
    name: 'timepicker',
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
            minLength: 2,
            matchType: 'start'
            // @override selected: null,
            // @override placeholder: '请选择',
            // @override open: false,
            // @override disabled: false,
            // @override multiple: false
        });
        this.supr();
    }
});

module.exports = TimePicker;