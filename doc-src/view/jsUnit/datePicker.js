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