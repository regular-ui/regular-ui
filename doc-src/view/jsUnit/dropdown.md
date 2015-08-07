### 示例
#### 基本形式

<div class="m-example"></div>

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

#### 标题

<div class="m-example"></div>

```xml
<dropdown source={source} title="Title" />
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

<div class="m-example"></div>

```xml
<dropdown source={source} />
<dropdown source={source} disabled={true} />
```

```javascript
...
    this.data.source = [
        {id: 1, name: '选项1'},
        {id: 2, name: '选项2'},
        {divider: true},
        {id: 3, name: '选项3', disabled: true}
    ];
...
```

#### 分隔线

<div class="m-example"></div>

```xml
<dropdown source={source} />
```

```javascript
...
    this.data.source = [
        {id: 1, name: '选项1'},
        {id: 2, name: '选项2'},
        {id: 3, name: '选项3（禁用）', disabled: true},
        {divider: true},
        {id: 4, name: '选项4'}
    ];
...
```

#### 单项模板定制

<div class="m-example"></div>

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
