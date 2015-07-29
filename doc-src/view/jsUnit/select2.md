### 示例
#### 基本形式

<div class="m-example" id="j-example1"></div>

```xml
<select2 source={source} />
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

#### 禁用

<div class="m-example" id="j-example2"></div>

```xml
<select2 source={source} disabled={true} />
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

#### 远程数据

同[ListBox](listbox.html)。

#### 设置或取消默认项

<div class="m-example" id="j-example3"></div>

```xml
<select2 source={source} placeholder="全部" />
<select2 source={source} placeholder="" />
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
