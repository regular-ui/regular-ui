### 示例
#### 基本形式

<div class="m-example"></div>

```xml
<timePicker />
<timePicker time="15:45" />
```

#### 禁用组件

<div class="m-example"></div>

```xml
<timePicker disabled />
```

#### 日期范围

<div class="m-example"></div>

```xml
<timePicker minTime="12:00" maxTime="14:45" />
```

#### 数据绑定

<div class="m-example"></div>

```xml
<timePicker time={time} />
<timePicker time={time} minTime="18:00" maxTime="19:30" />
<p>当前选择的时间为：{time}</p>
```

#### 事件

请打开浏览器的控制台查看结果。

<div class="m-example"></div>

```xml
<timePicker on-change={console.log('on-change:', '$event.time:', $event.time)} />
```
