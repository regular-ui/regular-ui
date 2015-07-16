var Dropdown = RGUI.Dropdown;

// 基本形式
(function() {
    var source = [
        {id: 1, name: '选项1'},
        {id: 2, name: '选项2'},
        {id: 3, name: '选项3'}
    ];

    var dropdown = new Dropdown({
        data: {
            source: source
        }
    }).$inject('#j-example1');
})();