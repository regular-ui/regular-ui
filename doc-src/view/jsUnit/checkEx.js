var CheckEx = RGUI.CheckEx;

// 基本形式
(function() {
    var checkEx = new CheckEx({
        data: {
            name: '多选按钮'
        }
    }).$inject('#j-example1');
})();

// 禁用
(function() {
    var checkEx = new CheckEx({
        data: {
            name: '多选按钮',
            disabled: true
        }
    }).$inject('#j-example2');
})();