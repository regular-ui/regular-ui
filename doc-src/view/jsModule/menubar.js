var Menubar = RGUI.Menubar;
var _ = RGUI._;

// 基本形式
(function() {
    var source = [
        {id: 1, name: '菜单1', children: [
            {id: 11, name: '选项1.1'},
            {id: 12, name: '选项1.2', children: [
                {id: 101, name: '选项1.2.1'},
                {id: 102, name: '选项1.2.2'}
            ]},
            {id: 13, name: '选项1.3'},
            {id: 14, name: '选项1.4'},
        ]},
        {id: 2, name: '菜单2', children: [
            {id: 13, name: '选项1.3'},
            {id: 14, name: '选项1.4'}
        ]},
        {id: 3, name: '菜单3', children: [
            {id: 15, name: '选项3.1'},
            {id: 16, name: '选项3.2'}
        ]}
    ];

    var menubar = new Menubar({
        data: {
            source: source
        }
    }).$inject('#j-example1');
})();