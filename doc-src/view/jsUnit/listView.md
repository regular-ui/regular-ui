`ListView`与`ListBox`不同的是：`ListView`可以单独配置每一项的模板。另外有些功能正在开发中...

如果感觉`ListView`功能不强大，可以以`ListView`为参考，从`ListBox`继承并且自定义，进行功能上的扩充。

### 示例
#### 基本形式

<div id="j-example1"></div>

```javascript
var source = [
    {id: 3, name: '精通Javascript开发', org: '前端funs', hits: 42371},
    {id: 2, name: 'Android深入浅出', org: 'Android学院', hits: 30645},
    {id: 1, name: 'cocos2dx游戏开发教程', org: '鱼C课程', hits: 25112},
    {id: 4, name: 'MySQL数据库', org: 'LAMP兄弟连', hits: 18089},
    {id: 5, name: 'Arduino初级教程', org: '硬件社', hits: 16361}
];

var itemTemplate = _.multiline(function(){/*
<div>
    <span class="number">{item_index + 1}</span>
    <span class="title">{item.name}</span>
    <span class="hits f-fr">{item.hits}</span>
</div>
*/});

var listView = new ListView({
    data: {
        itemTemplate: itemTemplate,
        source: source
    }
}).$inject('#j-example1');
```

#### 禁用

同[ListBox](listbox.html)。

#### 远程数据

同[ListBox](listbox.html)。