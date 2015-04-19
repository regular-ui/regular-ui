### 示例
#### 基本形式

<div id="j-example1"></div>

```xml
<treeView source={source} />
```

或

```javascript
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
```

#### 禁用

<div id="j-example2"></div>

```xml
<treeView source={source} disabled={true} />
```

或

```javascript
var treeView = new TreeView({
    data: {
        source: source,
        disabled: true
    }
}).$inject('#j-example2');
```

#### 远程数据

<div id="j-example3"></div>

```xml
<treeView service={@(service)} />
```

或

```javascript
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
```

#### 分级加载

<div id="j-example4"></div>

```xml
<treeView service={@(service)} hierarchical={true} />
```

或

```javascript
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
```

#### 自定义选择项

<div id="j-example5"></div>

```xml
<treeView service={@(service)} hierarchical={true} itemTemplate={@(itemTemplate)} />
```

或

```javascript
var itemTemplate = _.multiline(function(){/*    
<i class="f-icon {item.type === 'directory' ? (item.open ? 'f-icon-folder-open' : 'f-icon-folder') : 'f-icon-file-text'}"></i> {item.name}
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
```
