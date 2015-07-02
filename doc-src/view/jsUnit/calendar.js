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

// Test
// (function() {
//     var yesterday = new Date(new Date().getTime() - 24*60*60*1000)
//     var calendar = new Calendar({
//         data: {
//             selected: yesterday
//         }
//     }).$inject('#j-example3');
//     calendar.data.selected = new Date(new Date().getTime() - 24*60*60*1000*30);
//     calendar.$update();
// })();