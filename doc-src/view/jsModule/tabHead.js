var TabHead = RGUI.TabHead;

var source = [
    {id: 0, name: '选项1'},
    {id: 1, name: '选项2'},
    {id: 2, name: '选项3'}
];

var tabHead = new TabHead({
    data: {
        source: source
    }
}).$inject('#j-example1');