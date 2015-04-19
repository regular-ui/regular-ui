var CheckGroup = RGUI.CheckGroup;
var CheckExGroup = RGUI.CheckExGroup;

var source = [
    {id: 0, name: '选项1'},
    {id: 1, name: '选项2'},
    {id: 2, name: '选项3'},
    {id: 3, name: '选项4'},
    {id: 4, name: '选项5'},
    {id: 5, name: '选项6'}
];

// 基本形式
(function() {
    var checkGroup = new CheckGroup({
        data: {
            source: source
        }
    }).$inject('#j-example1');
})();

// 禁用
(function() {
    var checkGroup = new CheckGroup({
        data: {
            source: source,
            disabled: true
        }
    }).$inject('#j-example2');
})();

// 多行
(function() {
    var checkGroup = new CheckGroup({
        data: {
            source: source,
            block: true
        }
    }).$inject('#j-example3');
})();

// 使用CheckEx
(function() {
    var checkExGroup = new CheckExGroup({
        data: {
            source: source
        }
    }).$inject('#j-example4');
})();

// 全选
(function() {
    var check = document.getElementById('j-example5').children[0].children[0];
    var checkGroup = new CheckGroup({
        data: {
            source: source
        }
    }).$inject('#j-example5');

    RGUI._.dom.on(check, 'change', function() {
        checkGroup.checkAll(check.checked);
    });
})();