var Dropdown = RGUI.Dropdown;
var _ = RGUI._;

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

// 单项模板自定义
(function() {
    var source = [
        {id: 1, name: 'Dropdown', url: 'dropdown.html'},
        {id: 2, name: 'Menu', url: 'menu.html'},
        {id: 3, name: 'Input2', url: 'input2.html'}
    ];

    var itemTemplate = _.multiline(function(){/*    
<a href={item.url}>{item.name}</a>
    */});

    var dropdown = new Dropdown({
        data: {
            source: source,
            itemTemplate: itemTemplate
        }
    }).$inject('#j-example2');
})();