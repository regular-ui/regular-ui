### 示例
#### 基本形式

<div class="m-example"></div>

```xml
<calendar />
<calendar date="2008-08-08" />
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
<calendar minDate="2008-08-08" maxDate="2008-08-16" />
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

#### 数据绑定

<div class="m-example"></div>

```xml
<calendar date={date} />
<p>当前选择的日期为：{date | format: 'yyyy-MM-dd'}</p>
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        date: '2008-08-08'
    }
});
```

#### 事件

请打开浏览器的控制台查看结果。

<div class="m-example"></div>

```xml
<calendar on-select={this.log('select:', $event.date)} on-change={this.log('change:', $event.date)} />
```

```javascript
var component = new RGUI.Component({
    template: template,
    log: function() {
        console.log.apply(console, arguments);
    }
});
```