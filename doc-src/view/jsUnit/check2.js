var Check2 = RGUI.Check2;

// 基本形式
(function() {
    var check2 = new Check2({
        data: {
            name: '多选按钮'
        }
    }).$inject('#j-example1');
})();

// 禁用组件
(function() {
    var check2 = new Check2({
        data: {
            name: '多选按钮',
            disabled: true
        }
    }).$inject('#j-example2');
})();