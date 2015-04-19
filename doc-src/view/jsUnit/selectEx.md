### 示例
#### 基本形式

<div id="j-example1"></div>

```xml
<selectEx source={source} />
```

或

```javascript
var source = [
    {id: 1, name: '选项1'},
    {id: 2, name: '选项2'},
    {id: 3, name: '选项3'}
];

var selectEx = new SelectEx({
    data: {
        source: source
    }
}).$inject('#j-example1');
```

#### 禁用

<div id="j-example2"></div>

```xml
<selectEx source={source} disabled={true} />
```

或

```javascript
var source = [
    {id: 1, name: '选项1'},
    {id: 2, name: '选项2'},
    {id: 3, name: '选项3'}
];

var selectEx = new SelectEx({
    data: {
        source: source,
        disabled: true
    }
}).$inject('#j-example2');
```

#### 远程数据

同[ListBox](listbox.html)。

#### 设置或取消默认项

<div id="j-example3"></div>

```xml
<selectEx source={source} placeholder="全部" />
<selectEx source={source} placeholder="" />
```

或

```javascript
var source = [
    {id: 1, name: '选项1'},
    {id: 2, name: '选项2'},
    {id: 3, name: '选项3'}
];

var selectEx1 = new SelectEx({
    data: {
        source: source,
        placeholder: '全部'
    }
}).$inject('#j-example3');

var selectEx2 = new SelectEx({
    data: {
        source: source,
        placeholder: null
    }
}).$inject('#j-example3');
```