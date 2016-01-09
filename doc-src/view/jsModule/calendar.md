### 示例
#### 基本形式

<div class="m-example"></div>

```xml
<div class="g-row">
    <div class="g-col"><calendar /></div>
    <div class="g-col"><calendar date="2008-08-08" /></div>
</div>
```

#### 禁用组件

<div class="m-example"></div>

```xml
<calendar disabled />
```

#### 日期范围

<div class="m-example"></div>

```xml
<div class="g-row">
    <div class="g-col"><calendar minDate={minDate} maxDate={maxDate} /></div>
    <div class="g-col"><calendar minDate="2008-08-08" maxDate="2008-08-16" /></div>
</div>
<div class="g-row">
    <div class="g-col"><calendar ref="customCalendar" /></div>
</div>
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        minDate: new Date(+new Date + 2*24*3600*1000),
        maxDate: new Date(+new Date + 7*24*3600*1000)
    },
    init: function() {
        // 只能选择星期一、三、五
        this.$refs.customCalendar.isOutOfRange = function(date) {
            return !(date.getDay()%2);
        }
        this.$refs.customCalendar.$update();
    }
});
```

#### 数据绑定

<div class="m-example"></div>

```xml
<div class="g-row">
    <div class="g-col"><calendar date={date} /></div>
    <div class="g-col"><calendar date={date} /></div>
</div>
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
<calendar
    on-select={console.log('on-select:', '$event.date:', $event.date)}
    on-change={console.log('on-change:', '$event.date:', $event.date)} />
```
