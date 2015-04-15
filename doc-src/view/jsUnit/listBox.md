`ListBox`以最简单的形式将列表样式、数据、选中功能和禁用功能封装成组件。

另外，`ListBox`是`ListView`的基类，并且在`SelectEx`等组件中作为实例使用。

Regular UI的哲学讲究灵活。如果在列表不使用选中和禁用等功能，不建议使用该组件，请直接使用Regular模板中的`{#list}`输出即可；如果需要自定义样式，可以直接重写CSS并覆盖模板；如果需要扩展功能可以直接继承该类，进行功能上的扩充。

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