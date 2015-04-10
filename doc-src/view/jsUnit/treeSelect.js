var TreeSelect = RGUI.TreeSelect;

var source = [
    {id: 0, name: '1', children: [
        {id: 3, name: '1.1'},
        {id: 4, name: '1.2', children: [
            {id: 9, name: '1.2.1'},
            {id: 10, name: '1.2.2'}
        ]},
        {id: 5, name: '1.3'},
        {id: 6, name: '1.4'},
    ]},
    {id: 1, name: '2'},
    {id: 2, name: '3', children: [
        {id: 7, name: '3.1'},
        {id: 8, name: '3.2'}
    ]}
];

var treeSelect = new TreeSelect({
    data: {
        source: source
    }
}).$inject('#j-example1');

var treeSelect = new TreeSelect({
    data: {
        source: source,
        disabled: true
    }
}).$inject('#j-example2');