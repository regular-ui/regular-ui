### 示例
#### 基本形式

<div id="j-example1"></div>

```xml
<checkGroup source={source} />
```

```javascript
...
    this.data.source = [
        {id: 0, name: '选项1'},
        {id: 1, name: '选项2'},
        {id: 2, name: '选项3'},
        {id: 3, name: '选项4'},
        {id: 4, name: '选项5'},
        {id: 5, name: '选项6'}
    ];
...
```

#### 禁用

<div id="j-example2"></div>

```xml
<checkGroup source={source} disabled={true} />
```

```javascript
...
    this.data.source = [
        {id: 0, name: '选项1'},
        {id: 1, name: '选项2'},
        {id: 2, name: '选项3'},
        {id: 3, name: '选项4'},
        {id: 4, name: '选项5'},
        {id: 5, name: '选项6'}
    ];
...
```

#### 远程数据

同[ListBox](listbox.html)。

#### 多行

<div id="j-example3"></div>

```xml
<checkGroup source={source} block={true} />
```

```javascript
...
    this.data.source = [
        {id: 0, name: '选项1'},
        {id: 1, name: '选项2'},
        {id: 2, name: '选项3'},
        {id: 3, name: '选项4'},
        {id: 4, name: '选项5'},
        {id: 5, name: '选项6'}
    ];
...
```

#### 使用Check2

<div id="j-example4"></div>

```xml
<check2Group source={source} />
```

```javascript
...
    this.data.source = [
        {id: 0, name: '选项1'},
        {id: 1, name: '选项2'},
        {id: 2, name: '选项3'},
        {id: 3, name: '选项4'},
        {id: 4, name: '选项5'},
        {id: 5, name: '选项6'}
    ];
...
```

#### 全选

<div id="j-example5"><label><input type="checkbox" class="u-check"> 全选</label></div>

```xml
<label><input type="checkbox" class="u-check"> 全选</label>
<checkGroup ref="checkGroup" source={source} />
```

```javascript
...
    this.data.source = [
        {id: 0, name: '选项1'},
        {id: 1, name: '选项2'},
        {id: 2, name: '选项3'},
        {id: 3, name: '选项4'},
        {id: 4, name: '选项5'},
        {id: 5, name: '选项6'}
    ];
...

...
    this.$refs.checkGroup.checkAll(true);
...
```
