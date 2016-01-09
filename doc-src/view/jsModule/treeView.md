### 示例
#### 基本形式

<div class="m-example"></div>

```xml
<treeView source={source} />
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        source: [
            {name: '节点1', children: [
                {name: '节点1.1'},
                {name: '节点1.2', children: [
                    {name: '节点1.2.1'},
                    {name: '节点1.2.2'}
                ]},
                {name: '节点1.3'},
                {name: '节点1.4'},
            ]},
            {name: '节点2'},
            {name: '节点3', children: [
                {name: '节点3.1'},
                {name: '节点3.2'}
            ]}
        ]
    }
});
```

#### 禁用某一项，禁用组件

<div class="m-example"></div>

```xml
<div class="g-row">
    <div class="g-col g-col-6">
        <treeView source={source} />
    </div>
    <div class="g-col g-col-6">
        <treeView source={source} disabled />
    </div>
</div>
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        source: [
            {name: '节点1', children: [
                {name: '节点1.1'},
                {name: '节点1.2', disabled: true, children: [
                    {name: '节点1.2.1'},
                    {name: '节点1.2.2'}
                ]},
                {name: '节点1.3', disabled: true},
                {name: '节点1.4'},
            ]},
            {name: '节点2', disabled: true},
            {name: '节点3', children: [
                {name: '节点3.1'},
                {name: '节点3.2'}
            ]}
        ]
    }
});
```

#### 分隔线

<div class="m-example"></div>

```xml
<treeView source={source} />
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        source: [
            {name: '节点1', children: [
                {name: '节点1.1'},
                {name: '节点1.2', disabled: true, children: [
                    {name: '节点1.2.1'},
                    {name: '节点1.2.2'}
                ]},
                {divider: true},
                {name: '节点1.3', disabled: true},
                {name: '节点1.4'},
            ]},
            {name: '节点2', disabled: true},
            {divider: true},
            {name: '节点3', children: [
                {name: '节点3.1'},
                {name: '节点3.2'}
            ]}
        ]
    }
});
```

#### 远程数据

<div class="m-example"></div>

```xml
<treeView service={@(this.service)} />
```

```javascript
var component = new RGUI.Component({
    template: template,
    service: {
        getList: function(params, success) {
            RGUI.ajax.request({
                url: '../data/tree.json',
                method: 'get',
                type: 'json',
                data: params,
                success: success
            });
        }
    }
});
```

#### 分级加载

*待完成……*

<div class="m-example"></div>

```xml
<treeView service={@(this.service)} hierarchical />
```

```javascript
var component = new RGUI.Component({
    template: template,
    service: {
        getList: function(params, success) {
            RGUI.ajax.request({
                url: '../data/tree2.json',
                method: 'get',
                type: 'json',
                success: success
            });
        }
    }
});
```

#### 单项模板自定义

<div class="m-example"></div>

```xml
<treeView service={@(this.service)} hierarchical itemTemplate={@(this.itemTemplate)} />
```

```javascript
var component = new RGUI.Component({
    template: template,
    itemTemplate: RGUI._.multiline(function(){/*
<i class="u-icon {item.type === 'directory' ? (item.open ? 'u-icon-folder-open' : 'u-icon-folder') : 'u-icon-file-text'}"></i> {item.name}
    */}),
    service: {
        getList: function(params, success) {
            RGUI.ajax.request({
                url: '../data/tree2.json',
                method: 'get',
                type: 'json',
                success: success
            });
        }
    }
});
```
