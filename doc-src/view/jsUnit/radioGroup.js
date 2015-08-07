var RadioGroup = RGUI.RadioGroup;
var Radio2Group = RGUI.Radio2Group;

// 基本形式
(function() {
    var source = [
        {id: 0, name: '选项1'},
        {id: 1, name: '选项2'},
        {id: 2, name: '选项3'},
        {id: 3, name: '选项4'},
        {id: 4, name: '选项5'},
        {id: 5, name: '选项6'}
    ];

    var radioGroup = new RadioGroup({
        data: {
            source: source
        }
    }).$inject('#j-example1');
})();

// 禁用组件
(function() {
    var source = [
        {id: 0, name: '选项1'},
        {id: 1, name: '选项2'},
        {id: 2, name: '选项3'},
        {id: 3, name: '选项4'},
        {id: 4, name: '选项5'},
        {id: 5, name: '选项6'}
    ];

    var radioGroup = new RadioGroup({
        data: {
            source: source,
            disabled: true
        }
    }).$inject('#j-example2');
})();

// 多行
(function() {
    var source = [
        {id: 0, name: '选项1'},
        {id: 1, name: '选项2'},
        {id: 2, name: '选项3'},
        {id: 3, name: '选项4'},
        {id: 4, name: '选项5'},
        {id: 5, name: '选项6'}
    ];

    var radioGroup = new RadioGroup({
        data: {
            source: source,
            block: true
        }
    }).$inject('#j-example3');
})();

// 使用Radio2
(function() {
    var radio2Group = new Radio2Group({
        data: {
            source: source
        }
    }).$inject('#j-example4');
})();