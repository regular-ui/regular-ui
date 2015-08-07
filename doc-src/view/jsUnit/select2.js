var Select2 = RGUI.Select2;

// 基本形式
(function() {
    var source = [
        {id: 1, name: '选项1'},
        {id: 2, name: '选项2'},
        {id: 3, name: '选项3'}
    ];

    var select2 = new Select2({
        data: {
            source: source
        }
    }).$inject('#j-example1');
})();

// 禁用组件
(function() {
    var source = [
        {id: 1, name: '选项1'},
        {id: 2, name: '选项2'},
        {id: 3, name: '选项3'}
    ];

    var select2 = new Select2({
        data: {
            source: source,
            disabled: true
        }
    }).$inject('#j-example2');
})();

// 设置或取消默认项
(function() {
    var source = [
        {id: 1, name: '选项1'},
        {id: 2, name: '选项2'},
        {id: 3, name: '选项3'}
    ];

    var select2_1 = new Select2({
        data: {
            source: source,
            placeholder: '全部'
        }
    }).$inject('#j-example3');

    var select2_2 = new Select2({
        data: {
            source: source,
            placeholder: null
        }
    }).$inject('#j-example3');
})();