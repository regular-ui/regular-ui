### 示例
#### 基本形式

<div class="m-example"></div>

```xml
<draggable effect="all" data="1"><span>test</span></draggable>
<p></p>
<draggable effect="move" data="2"><span>test</span></draggable>
<p></p>
<draggable effect="link" data="3"><span>test</span></draggable>
<p></p>
<droppable effect="move" data={dropData}><div>{dropData || 'null'}</div></droppable>
```

```javascript
var component = new RGUI.Component({
    template: template
});
```

#### 基本形式

<div class="m-example"></div>

```xml
<draggable effect="copy" on-dragstart={console.log($event)} on-dragend={console.log($event)}><span>test</span>
</draggable>
<droppable on-dragover={console.log($event)} on-drop={text = 'drop'}><span>{text || 'null'}</span></droppable>
```

```javascript
var component = new RGUI.Component({
    template: template
});
```
