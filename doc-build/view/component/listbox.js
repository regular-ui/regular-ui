var Listbox = RU.Listbox;

var source = [
    {id: 0, name: '第一项'},
    {id: 1, name: '第二项'},
    {id: 2, name: '第三项'}
];

var listbox = new Listbox({
    data: {
        source: source
    }
}).$inject('#j-example1');

var listbox = new Listbox({
    data: {
        source: source,
        disabled: true
    }
}).$inject('#j-example2');