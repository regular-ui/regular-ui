var DropDown = RGUI.DropDown;

var source = [
    {id: 1, name: '选项1'},
    {id: 2, name: '选项2'},
    {id: 3, name: '选项3'}
];

// 基本形式
(function() {
    var dropDown = new DropDown({
        data: {
            source: source
        }
    }).$inject('#j-example1');
})();