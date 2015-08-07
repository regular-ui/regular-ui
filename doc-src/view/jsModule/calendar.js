var Calendar = RGUI.Calendar;

// 基本形式
(function() {
    var calendar = new Calendar().$inject('#j-example1');
})();

// 禁用组件
(function() {
    var calendar = new Calendar({
        data: {
            disabled: true
        }
    }).$inject('#j-example2');
})();


// 禁用组件
(function() {
    var calendar = new Calendar({
        data: {
            minDate: new Date(),
            maxDate: new Date(new Date().getTime() + 24*3600*1000*5)
        }
    }).$inject('#j-example3');
})();