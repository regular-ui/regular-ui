### 示例
#### 基本形式

<div class="m-example"></div>

```xml
<select3>
    <item>选项1</item>
    <item>选项2</item>
    <item>选项3</item>
</select3>
```


#### value和selected

<div class="m-example"></div>

```xml
<select3 value=2>
    <item>请选择</item>
    <item value=1>选项1</item>
    <item value=2>选项2</item>
    <item value=3>选项3</item>
</select3>
<select3>
    <item>请选择</item>
    <item value=1>选项1</item>
    <item value=2>选项2</item>
    <item value=3 selected>选项3</item>
</select3>
```

#### 禁用某一项，禁用组件

<div class="m-example"></div>

```xml
<select3>
    <item>选项1</item>
    <item>选项2</item>
    <item disabled>选项3（禁用）</item>
</select3>
<select3 disabled>
    <item>选项1</item>
    <item>选项2</item>
    <item disabled>选项3（禁用）</item>
</select3>
```

#### 分隔线

<div class="m-example"></div>

```xml
<select3>
    <item>选项1</item>
    <item>选项2</item>
    <item divider />
    <item disabled>选项3（禁用）</item>
</select3>
```

#### 自定义

<div class="m-example"></div>

```xml
<select3>
    {#list list as item}
    <item value={item}>
        <span class="title">{item.language}</span>
        <span class="hits f-fr">{item.ratings}%</span>
    </item>
    {/list}
</select3>
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        list: [
            {language: 'Java', ratings: 20.9},
            {language: 'C', ratings: 13.2},
            {language: 'C++', ratings: 6.7},
            {language: 'Python', ratings: 3.8},
            {language: 'JavaScript', ratings: 2.3}
        ]
    }
});
```

#### 数据绑定

<div class="m-example"></div>

```xml
<select3 value={value}>
    <item value=1>选项1</item>
    <item value=2>选项2</item>
    <item value=3 selected>选项3</item>
</select3>
<div>当前选择值：{value + ''}</div>
```

#### 事件

请打开浏览器的控制台查看结果。

<div class="m-example"></div>

```xml
<select3 value={value}
    on-toggle={console.log('on-toggle:', '$event.open:', $event.open)}
    on-select={console.log('on-select:', '$event:', $event)}
    on-change={console.log('on-change:', '$event.value:', $event.value)}>
    <item value=1>选项1</item>
    <item value=2>选项2</item>
    <item value=3 selected>选项3</item>
</select3>
```
