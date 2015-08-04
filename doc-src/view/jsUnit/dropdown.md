### 示例
#### 基本形式

<div class="m-example" id="j-example1"></div>

```xml
<dropdown source={source} />
```

```javascript
...
    this.data.source = [
        {id: 1, name: '选项1'},
        {id: 2, name: '选项2'},
        {id: 4, name: '选项3'}
    ];
...
```

#### 禁用某一项，禁用组件

<div class="m-example" id="j-example2"></div>

```xml
<dropdown source={source} />
<dropdown source={source} />
```

```javascript
...
    this.data.source = [
        {id: 1, name: '选项1'},
        {id: 2, name: '选项2'},
        {id: 4, name: '选项3'}
    ];
...
```

#### 分隔符

<div class="m-example" id="j-example3"></div>

```xml
<dropdown source={source} itemTemplate={@(itemTemplate)} />
```

```javascript
...
    this.data.source = [
        {id: 1, name: '选项1'},
        {id: 2, name: '选项2'},
        {id: 3, name: '选项3'}
    ];
    
    this.data.itemTemplate = _.multiline(function(){/*
<a href={item.url}>{item.name}</a>
    */});
...
```

#### 单项模板自定义

<div class="m-example" id="j-example4"></div>

```xml
<dropdown source={source} itemTemplate={@(itemTemplate)} />
```

```javascript
...
    this.data.source = [
        {id: 1, name: '选项1'},
        {id: 2, name: '选项2'},
        {id: 3, name: '选项3'}
    ];
    
    this.data.itemTemplate = _.multiline(function(){/*
<a href={item.url}>{item.name}</a>
    */});
...
```
