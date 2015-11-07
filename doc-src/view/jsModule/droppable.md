### 示例
#### 基本形式

<div class="m-example"></div>

```xml
<draggable effect="all" data="1">test</draggable>
<draggable effect="move" data="2">test</draggable>
<draggable effect="move" data="3">test</draggable>
<droppable on-drop={text = $event.data}>{text || 'null'}</droppable>
```

```javascript
var component = new RGUI.Component({
    template: template
});
```

#### 基本形式

<div class="m-example"></div>

```xml
<draggable effect="copy" on-dragstart={console.log($event)} on-dragend={console.log($event)}>test
</draggable>
<droppable on-dragover={console.log($event)} on-drop={text = 'drop'}>{text || 'null'}</droppable>
```

```javascript
var component = new RGUI.Component({
    template: template
});
```
