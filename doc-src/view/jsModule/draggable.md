### 示例
#### 基本形式

<div class="m-example"></div>

```xml
<draggable><div class="u-color u-color-primary">拖我</div></draggable>
```

#### 修改图像

<div class="m-example"></div>

```xml
<draggable>
    <div class="u-color u-color-primary">拖我</div>
    <draggable.image x="50" y="50">
        <div class="u-color u-color-success">拖我</div>
    </draggable.image>
</draggable>
```

#### 自定义

<div class="m-example"></div>

```xml
<draggable image="empty" effect="none" on-dragstart={this._onDragStart($event)} on-drag={this._onDrag($event)}>
    <div class="u-color u-color-primary" ref="block">拖我</div>
</draggable>
```

```javascript
var component = new RGUI.Component({
    template: template,
    _onDragStart: function($event) {
        var block = this.$refs.block;
        var position = RGUI._.dom.getPosition(block);
        block.style.left = position.left + 'px';
        block.style.top = position.top + 'px';
        block.style.zIndex = '1000';
        block.style.position = 'fixed';
    },
    _onDrag: function($event) {
        var block = this.$refs.block;
        block.style.left = block.offsetLeft + $event.movementX + 'px';
        block.style.top = block.offsetTop + $event.movementY + 'px';
    }
});
```
