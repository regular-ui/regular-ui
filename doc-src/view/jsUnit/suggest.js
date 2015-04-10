var Suggest = RGUI.Suggest;

var source = [
    {id: 0, name: '选项1'},
    {id: 1, name: '选项2'},
    {id: 2, name: '选项3'}
];

var selectEx = new Suggest({
    data: {
        source: source
    }
}).$inject('#j-example1');

var selectEx = new Suggest({
    data: {
        source: source,
        disabled: true
    }
}).$inject('#j-example2');