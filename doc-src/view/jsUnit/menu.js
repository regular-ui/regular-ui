var Component = RGUI.Component;
var Menu = RGUI.Menu;
var index = 0;

// 基本形式
(function(index) {
    var source = [
        {id: 1, name: '选项1', children: [
            {id: 11, name: '选项1.1'},
            {id: 12, name: '选项1.2', children: [
                {id: 121, name: '选项1.2.1'},
                {id: 122, name: '选项1.2.2'}
            ]},
            {id: 13, name: '选项1.3'},
            {id: 14, name: '选项1.4'},
        ]},
        {id: 2, name: '选项2'},
        {id: 3, name: '选项3', children: [
            {id: 15, name: '选项3.1'},
            {id: 16, name: '选项3.2'}
        ]}
    ];

    var menu = new Menu({
        data: {
            source: source
        }
    }).$inject($$('.m-example')[index]);
})(index++);

// 修改标题
(function(index) {
    var source = [
        {id: 1, name: '选项1', children: [
            {id: 11, name: '选项1.1'},
            {id: 12, name: '选项1.2', children: [
                {id: 121, name: '选项1.2.1'},
                {id: 122, name: '选项1.2.2'}
            ]},
            {id: 13, name: '选项1.3'},
            {id: 14, name: '选项1.4'},
        ]},
        {id: 2, name: '选项2'},
        {id: 3, name: '选项3', children: [
            {id: 15, name: '选项3.1'},
            {id: 16, name: '选项3.2'}
        ]}
    ];

    var menu = new Menu({
        data: {
            source: source,
            title: '修改标题'
        }
    }).$inject($$('.m-example')[index]);
})(index++);

// 禁用某一项，禁用组件
(function(index) {
    var source = [
        {id: 1, name: '选项1', children: [
            {id: 11, name: '选项1.1'},
            {id: 12, name: '选项1.2', children: [
                {id: 121, name: '选项1.2.1'},
                {id: 122, name: '选项1.2.2'}
            ]},
            {id: 13, name: '选项1.3'},
            {id: 14, name: '选项1.4'},
        ]},
        {id: 2, name: '选项2'},
        {id: 3, name: '选项3（禁用）', disabled: true, children: [
            {id: 15, name: '选项3.1'},
            {id: 16, name: '选项3.2'}
        ]}
    ];

    var menu = new Menu({
        data: {
            source: source
        }
    }).$inject($$('.m-example')[index]);

    var menu = new Menu({
        data: {
            source: source,
            disabled: true
        }
    }).$inject($$('.m-example')[index]);
})(index++);

// 分隔线
(function(index) {
    var source = [
        {id: 1, name: '选项1', children: [
            {id: 11, name: '选项1.1'},
            {divider: true},
            {id: 12, name: '选项1.2', children: [
                {id: 121, name: '选项1.2.1'},
                {id: 122, name: '选项1.2.2'}
            ]},
            {id: 13, name: '选项1.3'},
            {id: 14, name: '选项1.4'},
        ]},
        {id: 2, name: '选项2'},
        {divider: true},
        {id: 3, name: '选项3（禁用）', disabled: true, children: [
            {id: 15, name: '选项3.1'},
            {id: 16, name: '选项3.2'}
        ]}
    ];

    var menu = new Menu({
        data: {
            source: source
        }
    }).$inject($$('.m-example')[index]);
})(index++);

// 按钮自定义
(function(index) {
    var source = [
        {id: 1, name: '选项1', children: [
            {id: 11, name: '选项1.1'},
            {id: 12, name: '选项1.2', children: [
                {id: 121, name: '选项1.2.1'},
                {id: 122, name: '选项1.2.2'}
            ]},
            {id: 13, name: '选项1.3'},
            {id: 14, name: '选项1.4'},
        ]},
        {id: 2, name: '选项2'},
        {id: 3, name: '选项3', children: [
            {id: 15, name: '选项3.1'},
            {id: 16, name: '选项3.2'}
        ]}
    ];

    var component = new Component({
        data: {
            source: source
        },
        template: _.multiline(function(){/*
<menu source={source}>
    <a class="u-btn u-btn-primary">Primary</a>
</menu>
<menu source={source}>
    <a class="u-btn u-btn-success">Success</a>
</menu>
<menu source={source}>
    <a class="u-btn u-btn-warning">Warning</a>
</menu>
<menu source={source}>
    <a class="u-btn u-btn-error">Error</a>
</menu>
<menu source={source}>
    <a>Link</a>
</menu>
        */})
    }).$inject($$('.m-example')[index]);
})(index++);

// 单项模板自定义
(function(index) {
    var source = [
        {id: 1, name: '首页', url: '../index.html'},
        {id: 2, name: 'CSS元件', url: '../cssunit/index.html', children: [
            {id: 21, name: '基础', url: '../cssunit/base.html'},
            {id: 22, name: '按钮', url: '../cssunit/button.html'},
            {id: 22, name: '图标', url: '../cssunit/icon.html'}
        ]},
        {id: 3, name: 'JS元件', url: 'index.html', children: [
            {id: 31, name: 'Dropdown', url: 'dropdown.html'},
            {id: 32, name: 'Menu', url: 'menu.html'},
            {id: 33, name: 'Input2', url: 'input2.html'}
        ]}
    ];

    var itemTemplate = _.multiline(function(){/*    
<a href={item.url}>{item.name}</a>
    */});

    var menu = new Menu({
        data: {
            source: source,
            itemTemplate: itemTemplate
        }
    }).$inject($$('.m-example')[index]);
})(index++);