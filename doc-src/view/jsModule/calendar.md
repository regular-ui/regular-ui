### 示例
#### 基本形式

<div class="m-example"></div>

```xml
<calendar />
```

#### 禁用组件

<div class="m-example"></div>

```xml
<calendar disabled={true} />
```

#### 日期范围

<div class="m-example"></div>

```xml
<calendar minDate={minDate} maxDate={maxDate} />
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        minDate: new Date(new Date().getTime() + 2*24*3600*1000),
        maxDate: new Date(new Date().getTime() + 7*24*3600*1000)
    }
});
```
