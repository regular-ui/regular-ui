### 示例
#### 基本形式

<div class="m-example"></div>

```xml
<listView source={source} />
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'}
        ]
    }
});
```

#### 禁用某一项，禁用组件

<div class="m-example"></div>

```xml
<div class="g-row">
    <div class="g-col g-col-6">
        <listView source={source} />
    </div>
    <div class="g-col g-col-6">
        <listView source={source} disabled />
    </div>
</div>
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3（禁用）', disabled: true}
        ]
    }
});
```

#### 分隔线

<div class="m-example"></div>

```xml
<listView source={source} />
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {divider: true},
            {name: '选项3（禁用）', disabled: true}
        ]
    }
});
```

#### 多选

<div class="m-example"></div>

```xml
<listView source={source} multiple />
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {divider: true},
            {name: '选项3（禁用）', disabled: true},
            {name: '选项4'},
            {name: '选项5'}
        ]
    }
});
```

#### 远程数据

<div class="m-example"></div>

```xml
<listView service={@(this.service)} />
```

```javascript
var component = new RGUI.Component({
    template: template,
    service: {
        getList: function(params, success) {
            RGUI.ajax.request({
                url: '../data/list.json',
                method: 'get',
                type: 'json',
                data: params,
                success: success
            });
        }
    }
});
```

#### 单项模板自定义

<div class="m-example"></div>

```xml
<listView source={source} itemTemplate={@(this.itemTemplate)} />
```

```javascript
var component = new RGUI.Component({
    template: template,
    itemTemplate: RGUI._.multiline(function(){/*
<div>
    <span class="number">{item_index + 1}.</span>
    <span class="title">{item.name}</span>
    <span class="hits f-fr">{item.hits}</span>
</div>
    */}),
    data: {
        source: [
            {name: '精通Javascript开发', org: '前端Funs', hits: 42371},
            {name: 'Android深入浅出', org: 'Android学院', hits: 30645},
            {name: 'cocos2dx游戏开发教程', org: '鱼C课程', hits: 25112},
            {name: 'MySQL数据库', org: 'LAMP兄弟连', hits: 18089},
            {name: 'Arduino初级教程', org: '硬件社', hits: 16361}
        ]
    }
});
```
