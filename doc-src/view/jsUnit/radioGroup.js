var RadioGroup = RGUI.RadioGroup;
var RadioExGroup = RGUI.RadioExGroup;

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
    var radioGroup = new RadioGroup({
        data: {
            source: source
        }
    }).$inject('#j-example1');
})();

// 禁用
(function() {
    var radioGroup = new RadioGroup({
        data: {
            source: source,
            disabled: true
        }
    }).$inject('#j-example2');
})();

// 多行
(function() {
    var radioGroup = new RadioGroup({
        data: {
            source: source,
            block: true
        }
    }).$inject('#j-example3');
})();

// 使用RadioEx
(function() {
    var radioExGroup = new RadioExGroup({
        data: {
            source: source
        }
    }).$inject('#j-example4');
})();