var Suggest = require('./suggest.js');
var _ = require('../base/util.js');

var TimePicker = Suggest.extend({
    name: 'timePicker',
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