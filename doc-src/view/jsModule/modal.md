含有遮罩层的对话框，用于模拟浏览器的`alert`、`confirm`和`prompt`。

模态对话框通过遮罩层来阻止用户的其他行为。

### 示例
#### 基本形式

<div class="m-example"></div>

```xml
<button class="u-btn u-btn-primary" on-click={this.showModal()}>Modal</button>
```

```javascript
var component = new RGUI.Component({
    template: template,
    showModal: function() {
        var modal = new RGUI.Modal({
            data: {
                title: 'Modal标题',
                content: 'Modal内容'
            }
        });
    }
});
```

#### Alert

<div class="m-example"></div>

```xml
<button class="u-btn u-btn-error" on-click={this.showModal()}>Alert</button>
```

```javascript
var component = new RGUI.Component({
    template: template,
    showModal: function() {
        RGUI.Modal.alert('Alert内容');
    }
});
```

#### Confirm

<div class="m-example"></div>

```xml
<button class="u-btn u-btn-success" on-click={this.showModal()}>Confirm</button>
```

```javascript
var component = new RGUI.Component({
    template: template,
    showModal: function() {
        RGUI.Modal.confirm('Confirm内容');
    }
});
```

#### 拖拽

<div class="m-example"></div>

```xml
<button class="u-btn u-btn-primary" on-click={this.showModal()}>Draggable</button>
```

```javascript
var component = new RGUI.Component({
    template: template,
    showModal: function() {
        var modal = new RGUI.Modal({
            data: {
                title: 'Modal标题',
                content: 'Modal内容',
                draggable: true
            }
        });
    }
});
```
