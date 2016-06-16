## 示例
### 基本形式

<div class="m-example"></div>

```xml
<suggest source={source} />
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        source: [
            {name: 'abandon'},
            {name: 'about'},
            {name: 'absent'},
            {name: 'bread'},
            {name: 'break'},
            {name: 'brief'},
            {name: 'calendar'},
            {name: 'cancel'},
            {name: 'column'}
        ]
    }
});
```

### 禁用某一项，禁用组件

<div class="m-example"></div>

```xml
<suggest source={source} />
<suggest source={source} disabled />
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        source: [
            {name: 'abandon'},
            {name: 'about'},
            {name: 'absent（禁用）', disabled: true},
            {name: 'bread'},
            {name: 'break（禁用）', disabled: true},
            {name: 'brief'},
            {name: 'calendar'},
            {name: 'cancel（禁用）', disabled: true},
            {name: 'column'}
        ]
    }
});
```

### Placeholder

<div class="m-example"></div>

```xml
<suggest source={source} placeholder="输入时会自动提示" />
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        source: [
            {name: 'abandon'},
            {name: 'about'},
            {name: 'absent'},
            {name: 'bread'},
            {name: 'break'},
            {name: 'brief'},
            {name: 'calendar'},
            {name: 'cancel'},
            {name: 'column'}
        ]
    }
});
```

### 开始提示长度

当输入长度>=`startLength`属性后开始提示。

<div class="m-example"></div>

```xml
<suggest source={source} placeholder="输入2个字符后开始提示" startLength="2" />
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        source: [
            {name: 'abandon'},
            {name: 'about'},
            {name: 'absent'},
            {name: 'bread'},
            {name: 'break'},
            {name: 'brief'},
            {name: 'calendar'},
            {name: 'cancel'},
            {name: 'column'}
        ]
    }
});
```

### 匹配方式

<div class="m-example"></div>

```xml
<suggest source={source} placeholder="匹配全局" matchType="all" />
<suggest source={source} placeholder="只匹配开头" matchType="start" />
<suggest source={source} placeholder="只匹配结尾" matchType="end" />
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        source: [
            {name: 'abandon'},
            {name: 'about'},
            {name: 'absent'},
            {name: 'bread'},
            {name: 'break'},
            {name: 'brief'},
            {name: 'calendar'},
            {name: 'cancel'},
            {name: 'column'}
        ]
    }
});
```

### 严格模式

当为严格模式时，`value`属性必须在source中选择，否则为空。

<div class="m-example"></div>

```xml
<p><suggest source={source} placeholder="非严格模式" value={value1} /> {value1}</p>
<p><suggest source={source} placeholder="严格模式" strict value={value2} /> {value2}</p>
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        source: [
            {name: 'abandon'},
            {name: 'about'},
            {name: 'absent'},
            {name: 'bread'},
            {name: 'break'},
            {name: 'brief'},
            {name: 'calendar'},
            {name: 'cancel'},
            {name: 'column'}
        ]
    }
});
```

### 远程数据

支持远程过滤。

<div class="m-example"></div>

```xml
<suggest service={@(this.service)} />
```

```javascript
var component = new RGUI.Component({
    template: template,
    service: {
        getList: function(params, success) {
            RGUI.ajax.request({
                url: '../data/suggest.json',
                method: 'get',
                type: 'json',
                data: params,
                success: success
            });
        }
    }
});
```

<!-- #### Test

<!- div class="m-example"></div>

```! xml
<suggest source={source} />
```

```! javascript
var component = new RGUI.Component({
    template: template,
    data: {
        source: [
            {name: 'abandon'},
            {name: 'about'},
            {name: 'absent'},
            {name: 'bread'},
            {name: 'break'},
            {name: 'brief'},
            {name: 'calendar'},
            {name: 'cancel'},
            {name: 'column'},
            {name: 'abandon'},
            {name: 'about'},
            {name: 'absent'},
            {name: 'bread'},
            {name: 'break'},
            {name: 'brief'},
            {name: 'calendar'},
            {name: 'cancel'},
            {name: 'column'}
        ]
    }
});
``` -->
