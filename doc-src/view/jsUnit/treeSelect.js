var TreeSelect = RGUI.TreeSelect;

// 基本形式
(function() {
    var source = [
        {id: 1, name: '节点1', children: [
            {id: 11, name: '节点1.1'},
            {id: 12, name: '节点1.2', children: [
                {id: 101, name: '节点1.2.1'},
                {id: 102, name: '节点1.2.2'}
            ]},
            {id: 13, name: '节点1.3'},
            {id: 14, name: '节点1.4'},
        ]},
        {id: 2, name: '节点2'},
        {id: 3, name: '节点3', children: [
            {id: 15, name: '节点3.1'},
            {id: 16, name: '节点3.2'}
        ]}
    ];

    var treeSelect = new TreeSelect({
        data: {
            source: source
        }
    }).$inject('#j-example1');
})();

// 禁用组件
(function() {
    var source = [
        {id: 1, name: '节点1', children: [
            {id: 11, name: '节点1.1'},
            {id: 12, name: '节点1.2', children: [
                {id: 101, name: '节点1.2.1'},
                {id: 102, name: '节点1.2.2'}
            ]},
            {id: 13, name: '节点1.3'},
            {id: 14, name: '节点1.4'},
        ]},
        {id: 2, name: '节点2'},
        {id: 3, name: '节点3', children: [
            {id: 15, name: '节点3.1'},
            {id: 16, name: '节点3.2'}
        ]}
    ];
    
    var treeSelect = new TreeSelect({
        data: {
            source: source,
            disabled: true
        }
    }).$inject('#j-example2');
})();