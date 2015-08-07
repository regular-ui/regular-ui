var Dropdown = RGUI.Dropdown;
var index = 0;

// 基本形式
(function(index) {
    var source = [
        {id: 1, name: '选项1'},
        {id: 2, name: '选项2'},
        {id: 3, name: '选项3'}
    ];

    var dropdown = new Dropdown({
        data: {
            source: source
        }
    }).$inject($$('.m-example')[index]);
})(index++);

// 标题
(function(index) {
    var source = [
        {id: 1, name: '选项1'},
        {id: 2, name: '选项2'},
        {id: 3, name: '选项3'}
    ];

    var dropdown = new Dropdown({
        data: {
            source: source,
            title: 'Title'
        }
    }).$inject($$('.m-example')[index]);
})(index++);

// 禁用某一项，禁用组件
(function(index) {
    var source = [
        {id: 1, name: '选项1'},
        {id: 2, name: '选项2'},
        {id: 3, name: '选项3（禁用）', disabled: true},
        {id: 4, name: '选项4'}
    ];

    var dropdown = new Dropdown({
        data: {
            source: source
        }
    }).$inject($$('.m-example')[index]);

    var dropdown = new Dropdown({
        data: {
            source: source,
            disabled: true
        }
    }).$inject($$('.m-example')[index]);
})(index++);

// 分隔符
(function(index) {
    var source = [
        {id: 1, name: '选项1'},
        {id: 2, name: '选项2'},
        {id: 3, name: '选项3（禁用）', disabled: true},
        {divider: true},
        {id: 4, name: '选项4'}
    ];

    var dropdown = new Dropdown({
        data: {
            source: source
        }
    }).$inject($$('.m-example')[index]);
})(index++);

// 单项模板定制
(function(index) {
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
    }).$inject($$('.m-example')[index]);
})(index++);