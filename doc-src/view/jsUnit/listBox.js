var ListBox = RGUI.ListBox;

var source = [
    {id: 0, name: '第一项'},
    {id: 1, name: '第二项'},
    {id: 2, name: '第三项'}
];

var listBox = new ListBox({
    data: {
        source: source
    }
}).$inject('#j-example1');

var listBox = new ListBox({
    data: {
        source: source,
        disabled: true
    }
}).$inject('#j-example2');