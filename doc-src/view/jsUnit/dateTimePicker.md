### 示例
#### 基本形式

<div class="m-example"></div>

```xml
<dateTimePicker />
<dateTimePicker date="2012-12-21 12:21" />
```

#### 禁用组件

<div class="m-example"></div>

```xml
<dateTimePicker disabled={true} />
```

#### 日期范围

<div class="m-example"></div>

```xml
<dateTimePicker minDate={minDate} maxDate={maxDate} />
<dateTimePicker minDate="2008-08-08 12:00" maxDate="2008-08-12 14:45" />
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        minDate: new Date(+new Date + 2*24*3600*1000),
        maxDate: new Date(+new Date + 7*24*3600*1000)
    }
});
```

#### 数据绑定

<div class="m-example"></div>

```xml
<dateTimePicker date={date} />
<dateTimePicker date={date} />
<p>当前选择的日期为：{date | format: 'yyyy-MM-dd HH:mm'}</p>
```

#### 事件

请打开浏览器的控制台查看结果。

<div class="m-example"></div>

```xml
<dateTimePicker
    on-toggle={console.log('on-toggle:', '$event.open:', $event.open)}
    on-change={console.log('on-change:', '$event.date:', $event.date)} />
```
