### 示例
#### 基本形式

<div id="j-example1"></div>

```xml
<checkGroup source={source} />
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

var checkGroup = new CheckGroup({
    data: {
        source: source
    }
}).$inject('#j-example1');
```

#### 禁用

<div id="j-example2"></div>

```xml
<checkGroup source={source} disabled={true} />
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

var checkGroup = new CheckGroup({
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
<checkGroup source={source} block={true} />
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

var checkGroup = new CheckGroup({
    data: {
        source: source,
        block: true
    }
}).$inject('#j-example3');
```

#### 使用CheckEx

<div id="j-example4"></div>

```xml
<checkExGroup source={source} />
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

var checkExGroup = new CheckExGroup({
    data: {
        source: source
    }
}).$inject('#j-example4');
```

#### 全选

<div id="j-example5"><label><input type="checkbox" class="u-check"> 全选</label></div>

```javascript
var source = [
    {id: 0, name: '选项1'},
    {id: 1, name: '选项2'},
    {id: 2, name: '选项3'},
    {id: 3, name: '选项4'},
    {id: 4, name: '选项5'},
    {id: 5, name: '选项6'}
];

var checkGroup = new CheckGroup({
    data: {
        source: source
    }
}).$inject('#j-example5');

checkGroup.checkAll(true);
```
