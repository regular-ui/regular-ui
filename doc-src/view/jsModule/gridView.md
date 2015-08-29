### 示例
#### 基本形式

<div class="m-example"></div>

```xml
<gridView source={source} itemTemplate={@(itemTemplate)} />
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        source: [
        {id: 3, name: '精通Javascript开发', img: '../img/courceitem-javascript.jpg', org: '前端Funs', hits: 42371},
        {id: 2, name: 'Android深入浅出', img: '../img/courceitem-android.jpg', org: 'Android学院', hits: 30645},
        {id: 1, name: 'cocos2dx游戏开发教程', img: '../img/courceitem-cocos2dx.jpg', org: '鱼C课程', hits: 25112},
        {id: 4, name: 'MySQL数据库', img: '../img/courceitem-mysql.jpg', org: 'LAMP兄弟连', hits: 18089},
        {id: 5, name: 'Arduino初级教程', img: '../img/courceitem-arduino.jpg', org: '硬件社', hits: 16361}
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