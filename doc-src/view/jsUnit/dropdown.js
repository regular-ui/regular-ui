var Component = RGUI.Component;
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

// 修改标题
(function(index) {
    var source = [
        {id: 1, name: '选项1'},
        {id: 2, name: '选项2'},
        {id: 3, name: '选项3'}
    ];

    var dropdown = new Dropdown({
        data: {
            source: source,
            title: '修改标题'
        }
    }).$inject($$('.m-example')[index]);
})(index++);

// 禁用某一项，禁用组件
(function(index) {
    var source = [
        {id: 1, name: '选项1'},
        {id: 2, name: '选项2'},
        {id: 3, name: '选项3（禁用）', disabled: true}
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
        {divider: true},
        {id: 3, name: '选项3（禁用）', disabled: true}
    ];

    var dropdown = new Dropdown({
        data: {
            source: source
        }
    }).$inject($$('.m-example')[index]);
})(index++);

// 按钮自定义
(function(index) {
    var source = [
        {id: 1, name: '选项1'},
        {id: 2, name: '选项2'},
        {id: 3, name: '选项3'}
    ];

    var component = new Component({
        data: {
            source: source
        },
        template: _.multiline(function(){/*
<dropdown source={source}>
    <a class="u-btn u-btn-primary">Primary</a>
</dropdown>
<dropdown source={source}>
    <a class="u-btn u-btn-success">Success</a>
</dropdown>
<dropdown source={source}>
    <a class="u-btn u-btn-warning">Warning</a>
</dropdown>
<dropdown source={source}>
    <a class="u-btn u-btn-error">Error</a>
</dropdown>
<dropdown source={source}>
    <a>Link</a>
</dropdown>
        */})
    }).$inject($$('.m-example')[index]);
})(index++);

// 单项模板自定义
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