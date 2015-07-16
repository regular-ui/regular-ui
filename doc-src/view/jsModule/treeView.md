### 示例
#### 基本形式

<div id="j-example1"></div>

```xml
<treeView source={source} />
```

```javascript
...
    this.data.source = [
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
...
```

#### 禁用

<div id="j-example2"></div>

```xml
<treeView source={source} disabled={true} />
```

```javascript
...
    this.data.source = [
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
...
```

#### 远程数据

<div id="j-example3"></div>

```xml
<treeView service={@(service)} />
```

```javascript
...
    this.data.service = {
        getList: function(params, success) {
            ajax.request({
                url: 'treeview.json',
                method: 'get',
                type: 'json',
                success: success
            });
        }
    };
...
```

#### 分级加载

<div id="j-example4"></div>

```xml
<treeView service={@(service)} hierarchical={true} />
```

```javascript
...
    this.data.service = {
        getList: function(params, success) {
            ajax.request({
                url: 'treeview2.json',
                method: 'get',
                type: 'json',
                success: success
            });
        }
    };
...
```

#### 单项模板自定义

<div id="j-example5"></div>

```xml
<treeView service={@(service)} hierarchical={true} itemTemplate={@(itemTemplate)} />
```

```javascript
...
    this.data.itemTemplate = _.multiline(function(){/*    
    <i class="u-icon {item.type === 'directory' ? (item.open ? 'u-icon-folder-open' : 'u-icon-folder') : 'u-icon-file-text'}"></i> {item.name}
    */});
   
    this.data.service = {
        getList: function(params, success) {
            ajax.request({
                url: 'treeview2.json',
                method: 'get',
                type: 'json',
                success: success
            });
        }
    };
...
```
