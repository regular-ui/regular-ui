var SelectEx = RGUI.SelectEx;

var source = [
    {id: 1, name: '选项1'},
    {id: 2, name: '选项2'},
    {id: 3, name: '选项3'}
];

// 基本形式
(function() {
    var selectEx = new SelectEx({
        data: {
            source: source
        }
    }).$inject('#j-example1');
})();

// 禁用
(function() {
    var selectEx = new SelectEx({
        data: {
            source: source,
            disabled: true
        }
    }).$inject('#j-example2');
})();

// 设置或取消默认项
(function() {
    var selectEx1 = new SelectEx({
        data: {
            source: source,
            placeholder: '全部'
        }
    }).$inject('#j-example3');

    var selectEx2 = new SelectEx({
        data: {
            source: source,
            placeholder: null
        }
    }).$inject('#j-example3');
})();