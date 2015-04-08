### 示例
#### 基本形式

<div id="j-example1"></div>

```xml
<listBox source={source} />
```

```javascript
var source = [
    {id: 0, name: '第一项'},
    {id: 1, name: '第二项'},
    {id: 2, name: '第三项'}
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
var source = [
    {id: 0, name: '第一项'},
    {id: 1, name: '第二项'},
    {id: 2, name: '第三项'}
];

var listBox = new ListBox({
    data: {
        source: source,
        disabled: true
    }
}).$inject('#j-example1');
```