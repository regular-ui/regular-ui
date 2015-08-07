var TimePicker = RGUI.TimePicker;

// 基本形式
(function() {
    var timePicker = new TimePicker().$inject('#j-example1');
})();

// 禁用组件
(function() {
    var timePicker = new TimePicker({
        data: {
            disabled: true
        }
    }).$inject('#j-example2');
})();