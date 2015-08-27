### 示例
#### 基本形式

<div class="m-example"></div>

```xml
<tableView source={source} fields={@(fields)} itemTemplate={@(itemTemplate)} />
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        source: [
        {id: 3, name: '精通Javascript开发', org: '前端Funs', hits: 42371},
        {id: 2, name: 'Android深入浅出', org: 'Android学院', hits: 30645},
        {id: 1, name: 'cocos2dx游戏开发教程', org: '鱼C课程', hits: 25112},
        {id: 4, name: 'MySQL数据库', org: 'LAMP兄弟连', hits: 18089},
        {id: 5, name: 'Arduino初级教程', org: '硬件社', hits: 16361}
    ];

    this.data.fields = [
        {key: 'name', name: '课程'},
        {key: 'org', name: '机构'},
        {key: 'hits', name: '点击率'}
    ];

    this.data.itemTemplate = _.multiline(function(){/*
<div class="u-courceitem">
    <div><img src="{item.img}" alt="{item.name}" title="{item.name}"></div>
    <div><a href="#">{item.name}</a></div>
    <div>
        <span class="org">{item.org}</span>
        <span class="hits f-fr"><i class="u-icon u-icon-user"></i> {item.hits}</span>
    </div>
</div>
    */})
    }
});
```

#### 远程数据

同[ListBox](listbox.html)。

#### 排序

只要给可排序的字段添加`sortable: true`即可。

如果有`service`属性，会向服务器发送请求并带上排序相关的参数，进行后端排序；如果没有`service`属性，则在本地对`source`进行排序。

<div class="m-example"></div>

```xml
<tableView source={source} fields={@(fields)} itemTemplate={@(itemTemplate)} />
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        source: [
        {id: 3, name: '精通Javascript开发', org: '前端Funs', hits: 42371},
        {id: 2, name: 'Android深入浅出', org: 'Android学院', hits: 30645},
        {id: 1, name: 'cocos2dx游戏开发教程', org: '鱼C课程', hits: 25112},
        {id: 4, name: 'MySQL数据库', org: 'LAMP兄弟连', hits: 18089},
        {id: 5, name: 'Arduino初级教程', org: '硬件社', hits: 16361}
    ];

    this.data.fields = [
        {key: 'name', name: '课程'},
        {key: 'org', name: '机构'},
        {key: 'hits', name: '点击率'}
    ];

    this.data.itemTemplate = _.multiline(function(){/*
<div class="u-courceitem">
    <div><img src="{item.img}" alt="{item.name}" title="{item.name}"></div>
    <div><a href="#">{item.name}</a></div>
    <div>
        <span class="org">{item.org}</span>
        <span class="hits f-fr"><i class="u-icon u-icon-user"></i> {item.hits}</span>
    </div>
</div>
    */})
    }
});
```
