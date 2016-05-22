### 示例
#### 基本形式

<div class="m-example"></div>

```xml
<listView2>
    <item>选项1</item>
    <item>选项2</item>
    <item>选项3</item>
</listView2>
```

#### value和selected

<div class="m-example"></div>

```xml
<div class="g-row">
    <div class="g-col g-col-6">
        <listView2 value=2>
            <item value=1>选项1</item>
            <item value=2>选项2</item>
            <item value=3>选项3</item>
        </listView2>
    </div>
    <div class="g-col g-col-6">
        <listView2>
            <item value=1>选项1</item>
            <item value=2>选项2</item>
            <item value=3 selected>选项3</item>
        </listView2>
    </div>
</div>
```

#### 禁用某一项，禁用组件

<div class="m-example"></div>

```xml
<div class="g-row">
    <div class="g-col g-col-6">
        <listView2>
            <item>选项1</item>
            <item>选项2</item>
            <item disabled>选项3（禁用）</item>
        </listView2>
    </div>
    <div class="g-col g-col-6">
        <listView2 disabled>
            <item>选项1</item>
            <item>选项2</item>
            <item>选项3</item>
        </listView2>
    </div>
</div>
```

#### 分隔线

<div class="m-example"></div>

```xml
<listView2>
    <item>选项1</item>
    <item>选项2</item>
    <item divider />
    <item disabled>选项3（禁用）</item>
</listView2>
```

#### 多选

<div class="m-example"></div>

```xml
<listView2 multiple>
    <item>选项1</item>
    <item selected>选项2</item>
    <item>选项3</item>
    <item disabled>选项4（禁用）</item>
    <item selected>选项5</item>
</listView2>
```

#### 自定义

<div class="m-example"></div>

```xml
<listView2>
    {#list list as item}
    <item>
        <span class="number">{item_index + 1}.</span>
        <span class="title">{item.name}</span>
        <span class="hits f-fr">{item.hits}</span>
    </item>
    {/list}
</listView2>
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        list: [
            {course: '精通Javascript开发', org: '前端Funs', hits: 42371},
            {course: 'Android深入浅出', org: 'Android学院', hits: 30645},
            {course: 'cocos2dx游戏开发教程', org: '鱼C课程', hits: 25112},
            {course: 'MySQL数据库', org: 'LAMP兄弟连', hits: 18089},
            {course: 'Arduino初级教程', org: '硬件社', hits: 16361}
        ]
    }
});
```

#### 数据绑定

<div class="m-example"></div>

```xml
<listView2 value={value}>
    <item value=1>选项1</item>
    <item value=2>选项2</item>
    <item value=3 selected>选项3</item>
</listView2>
当前选择值：{value + ''}
```

#### 事件

请打开浏览器的控制台查看结果。

<div class="m-example"></div>

```xml
<listView2 value={value}
    on-select={console.log('on-select:', '$event:', $event)}
    on-change={console.log('on-change:', '$event.value:', $event.value)}>
    <item value=1>选项1</item>
    <item value=2>选项2</item>
    <item value=3 selected>选项3</item>
</listView2>
```
