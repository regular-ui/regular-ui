var Calendar = RGUI.Calendar;

// 基本形式
(function() {
    var calendar = new Calendar().$inject('#j-example1');
})();

// 禁用
(function() {
    var calendar = new Calendar({
        data: {
            disabled: true
        }
    }).$inject('#j-example2');
})();