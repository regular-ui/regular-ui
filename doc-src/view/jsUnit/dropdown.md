### 示例
#### 基本形式

<div class="m-example"></div>

```xml
<dropdown source={source} />
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'}
        ]
    }
});
```

#### 修改标题

<div class="m-example"></div>

```xml
<dropdown source={source} title="修改标题" />
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'}
        ]
    }
});
```

#### 禁用某一项，禁用组件

<div class="m-example"></div>

```xml
<dropdown source={source} />
<dropdown source={source} disabled={true} />
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3（禁用）', disabled: true}
        ]
    }
});
```

#### 分隔线

<div class="m-example"></div>

```xml
<dropdown source={source} />
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {divider: true},
            {name: '选项3（禁用）', disabled: true}
        ]
    }
});
```

#### 按钮自定义

<div class="m-example"></div>

```xml
<dropdown source={source}>
    <a class="u-btn u-btn-primary">Primary</a>
</dropdown>
<dropdown source={source}>
    <a class="u-btn u-btn-success">Success</a>
</dropdown>
<dropdown source={source}>
    <a class="u-btn u-btn-warning">Warning</a>
</dropdown>
<dropdown source={source}>
    <a class="u-btn u-btn-error">Error</a>
</dropdown>
<dropdown source={source}>
    <a>Link</a>
</dropdown>
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'}
        ]
    }
});
```

#### 单项模板自定义

<div class="m-example"></div>

```xml
<dropdown source={source} itemTemplate={@(this.itemTemplate)} />
```

```javascript
var component = new RGUI.Component({
    template: template,
    itemTemplate: RGUI._.multiline(function(){/*
<a href={item.url}>{item.name}</a>
    */}),
    data: {
        source: [
            {name: 'Dropdown', url: 'dropdown.html'},
            {name: 'Menu', url: 'menu.html'},
            {name: 'Input2', url: 'input2.html'}
        ]
    }
});
```

#### 数据绑定

<div class="m-example"></div>

```xml
<dropdown source={source} open={open} /> 当前切换的状态：{open}
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'}
        ]
    }
});
```

#### 事件

请打开浏览器的控制台查看结果。

<div class="m-example"></div>

```xml
<dropdown source={source}
    on-toggle={console.log('on-toggle:', '$event.open:', $event.open)}
    on-select={console.log('on-select:', '$event.selected:', $event.selected)} />
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'}
        ]
    }
});
```
