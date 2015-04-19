### 示例
#### 基本形式

<div id="j-example1"></div>

```xml
<radioGroup source={source} />
```

或

```javascript
var source = [
    {id: 0, name: '选项1'},
    {id: 1, name: '选项2'},
    {id: 2, name: '选项3'},
    {id: 3, name: '选项4'},
    {id: 4, name: '选项5'},
    {id: 5, name: '选项6'}
];

var radioGroup = new RadioGroup({
    data: {
        source: source
    }
}).$inject('#j-example1');
```

#### 禁用

<div id="j-example2"></div>

```xml
<radioGroup source={source} disabled={true} />
```

或

```javascript
var source = [
    {id: 0, name: '选项1'},
    {id: 1, name: '选项2'},
    {id: 2, name: '选项3'},
    {id: 3, name: '选项4'},
    {id: 4, name: '选项5'},
    {id: 5, name: '选项6'}
];

var radioGroup = new RadioGroup({
    data: {
        source: source,
        disabled: true
    }
}).$inject('#j-example2');
```

#### 远程数据

同[ListBox](listbox.html)。

#### 多行

<div id="j-example3"></div>

```xml
<radioGroup source={source} block={true} />
```

或

```javascript
var source = [
    {id: 0, name: '选项1'},
    {id: 1, name: '选项2'},
    {id: 2, name: '选项3'},
    {id: 3, name: '选项4'},
    {id: 4, name: '选项5'},
    {id: 5, name: '选项6'}
];

var radioGroup = new RadioGroup({
    data: {
        source: source,
        block: true
    }
}).$inject('#j-example3');
```

#### 使用RadioEx

<div id="j-example4"></div>

```xml
<radioExGroup source={source} />
```

或

```javascript
var source = [
    {id: 0, name: '选项1'},
    {id: 1, name: '选项2'},
    {id: 2, name: '选项3'},
    {id: 3, name: '选项4'},
    {id: 4, name: '选项5'},
    {id: 5, name: '选项6'}
];

var radioExGroup = new RadioExGroup({
    data: {
        source: source
    }
}).$inject('#j-example4');
```
