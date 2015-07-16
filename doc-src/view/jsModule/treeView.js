var TreeView = RGUI.TreeView;
var ajax = RGUI.request;
var _ = RGUI._;

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

    var treeView = new TreeView({
        data: {
            source: source
        }
    }).$inject('#j-example1');
})();

// 禁用
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
    
    var treeView = new TreeView({
        data: {
            source: source,
            disabled: true
        }
    }).$inject('#j-example2');
})();

// 远程数据
(function() {
    var service = {
        getList: function(params, callback) {
            ajax.request({
                url: 'treeview.json',
                method: 'get',
                type: 'json',
                success: function(data) {
                    callback && callback(data);
                }
            });
        }
    };

    var treeView = new TreeView({
        service: service
    }).$inject('#j-example3');
})();

// 分级加载
(function() {
    var service = {
        getList: function(params, callback) {
            ajax.request({
                url: 'treeview2.json',
                method: 'get',
                type: 'json',
                success: function(data) {
                    callback && callback(data);
                }
            });
        }
    };

    var treeView = new TreeView({
        service: service,
        data: {
            hierarchical: true
        }
    }).$inject('#j-example4');
})();

// 单项模板自定义
(function() {
    var itemTemplate = _.multiline(function(){/*    
    <i class="u-icon {item.type === 'directory' ? (item.open ? 'u-icon-folder-open' : 'u-icon-folder') : 'u-icon-file-text'}"></i> {item.name}
    */});

    var service = {
        getList: function(params, callback) {
            ajax.request({
                url: 'treeview2.json',
                method: 'get',
                type: 'json',
                success: function(data) {
                    callback && callback(data);
                }
            });
        }
    };
    var treeView = new TreeView({
        service: service,
        data: {
            hierarchical: true,
            itemTemplate: itemTemplate
        }
    }).$inject('#j-example5');
})();