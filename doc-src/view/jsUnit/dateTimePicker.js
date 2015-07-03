var DateTimePicker = RGUI.DateTimePicker;

// 基本形式
(function() {
    var dateTimePicker = new DateTimePicker().$inject('#j-example1');
})();

// 禁用
(function() {
    var dateTimePicker = new DateTimePicker({
        data: {
            disabled: true
        }
    }).$inject('#j-example2');
})();