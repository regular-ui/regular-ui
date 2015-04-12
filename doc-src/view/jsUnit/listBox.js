var ListBox = RGUI.ListBox;
var ajax = RGUI.request;

var source = [
    {id: 1, name: '选项1'},
    {id: 2, name: '选项2'},
    {id: 3, name: '选项3'}
];

// 基本形式
(function() {
    var listBox = new ListBox({
        data: {
            source: source
        }
    }).$inject('#j-example1');
})();

// 禁用
(function() {
    var listBox = new ListBox({
        data: {
            source: source,
            disabled: true
        }
    }).$inject('#j-example2');
})();

// 远程数据
(function() {
    var service = {
        getList: function(options, callback) {
            ajax.request({
                url: 'listbox.json',
                method: 'get',
                type: 'json',
                success: function(data) {
                    callback && callback(data);
                }
            });
        }
    };

    var listBox = new ListBox({
        service: service
    }).$updateSource().$inject('#j-example3');
})();