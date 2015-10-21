### 示例

#### 基本形式

<div class="m-example"></div>

```xml
<select2 source={['简单选项1', '简单选项2', '简单选项3']} />
<select2 source={source} />
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

#### `selected`, `value`和`key`

`selected`表示当前选择项，`value`表示当前选择值。`key`表示数据项的键，默认为`'id'`。

它们三者的关系如下：`selected[key] == value`。其中，`selected`和`value`是联动的，当一项变化时会同时改变另一项。

<div class="m-example"></div>

```xml
<select2 source={source} selected={selected} />
<select2 source={source} value=2 />
<select2 source={source} key="name" value="选项3" />
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        source: [
            {id: 1, name: '选项1'},
            {id: 2, name: '选项2'},
            {id: 3, name: '选项3'}
        ]
    },
    config: function() {
        this.data.selected = this.data.source[0];
    }
});
```

#### 禁用某一项，禁用组件

<div class="m-example"></div>

```xml
<select2 source={source} />
<select2 source={source} disabled={true} />
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

#### 设置或取消默认项

如果`placeholder`为空，刚开始将会自动选中第一项。

<div class="m-example"></div>

```xml
<select2 source={source} placeholder="全部" />
<select2 source={source} placeholder="" />
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

#### 远程数据

<div class="m-example"></div>

```xml
<select2 service={@(this.service)} value="2" />
```

```javascript
var component = new RGUI.Component({
    template: template,
    service: {
        getList: function(params, success) {
            RGUI.ajax.request({
                url: '../data/list.json',
                method: 'get',
                type: 'json',
                data: params,
                success: success
            });
        }
    }
});
```

#### 数据绑定

<div class="m-example"></div>

```xml
<select2 source={source} selected={selected} value={value} /> 当前选择项：{selected ? selected.name : 'null'}，当前选择值：{value || 'null'}
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        source: [
            {id: 1, name: '选项1'},
            {id: 2, name: '选项2'},
            {id: 3, name: '选项3'}
        ]
    }
});
```

#### 事件

请打开浏览器的控制台查看结果。

<div class="m-example"></div>

```xml
<select2 source={source}
    on-toggle={console.log('on-toggle:', '$event.open:', $event.open)}
    on-select={console.log('on-select:', '$event.selected:', $event.selected)}
    on-change={console.log('on-change:', '$event:', $event)} />
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


<!-- #### Test

<!- div class="m-example"></div>

```! xml
<select2 source={['很长很高很长很高很长很高的选择项', '很长很高很长很高很长很高的选择项', '很长很高很长很高很长很高的选择项', '很长很高很长很高很长很高的选择项', '很长很高很长很高很长很高的选择项', '很长很高很长很高很长很高的选择项', '很长很高很长很高很长很高的选择项', '很长很高很长很高很长很高的选择项', '很长很高很长很高很长很高的选择项', '很长很高很长很高很长很高的选择项', '很长很高很长很高很长很高的选择项', '很长很高很长很高很长很高的选择项']} />
``` -->