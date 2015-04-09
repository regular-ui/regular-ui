var CheckGroup = RGUI.CheckGroup;

var source = [
    {id: 0, name: '选项1'},
    {id: 1, name: '选项2'},
    {id: 2, name: '选项3'},
    {id: 3, name: '选项4'},
    {id: 4, name: '选项5'},
    {id: 5, name: '选项6'}
];

(function() {
    var checkEx = new CheckGroup({
        data: {
            source: source,
            block: true
        }
    }).$inject('#j-example1');

})();