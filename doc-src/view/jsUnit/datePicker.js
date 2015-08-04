var DatePicker = RGUI.DatePicker;

// 基本形式
(function() {
    var datePicker = new DatePicker().$inject('#j-example1');
})();

// 禁用
(function() {
    var datePicker = new DatePicker({
        data: {
            disabled: true
        }
    }).$inject('#j-example2');
})();


var Component = RGUI.Component;
var _ = RGUI._;

// Test
(function() {
    var example1 = new Component({
        template: _.multiline(function(){/*
<datePicker minDate={minDate} maxDate={maxDate} />
        */}),
        data: {
            minDate: new Date(),
            maxDate: new Date(new Date().getTime() + 24*3600*1000*5)
        }
    }).$inject('#j-example3');
})();