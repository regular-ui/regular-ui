### 示例
#### 基本形式

<div id="j-example1"></div>

```xml
<listBox source={source} />
```

```javascript
...
    this.data.source = [
        {id: 1, name: '选项1'},
        {id: 2, name: '选项2'},
        {id: 3, name: '选项3'}
    ];
...
```

或

```javascript
var source = [
    {id: 1, name: '选项1'},
    {id: 2, name: '选项2'},
    {id: 3, name: '选项3'}
];

var listBox = new ListBox({
    data: {
        source: source
    }
}).$inject('#j-example1');
```

#### 禁用

<div id="j-example2"></div>

```xml
<listBox source={source} disabled={true} />
```

```javascript
...
    this.data.source = [
        {id: 1, name: '选项1'},
        {id: 2, name: '选项2'},
        {id: 3, name: '选项3'}
    ];
...
```

或

```javascript
var source = [
    {id: 1, name: '选项1'},
    {id: 2, name: '选项2'},
    {id: 3, name: '选项3'}
];

var listBox = new ListBox({
    data: {
        source: source,
        disabled: true
    }
}).$inject('#j-example1');
```

#### 远程数据

<div id="j-example3"></div>

```javascript
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
```