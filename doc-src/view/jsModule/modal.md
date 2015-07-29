含有遮罩层的对话框，用于模拟浏览器的`alert`、`confirm`和`prompt`。

模态对话框通过遮罩层来阻止用户的其他行为。

### 示例
#### 基本形式

<div class="m-example" id="j-example1"><button class="u-btn u-btn-primary">Modal</button></div>

```javascript
var modal = new Modal({
    data: {
        title: 'Modal标题',
        content: 'Modal内容'
    }
});
```

#### Alert

<div class="m-example" id="j-example2"><button class="u-btn u-btn-error">Alert</button></div>

```javascript
Modal.alert('Alert内容');
```

#### Confirm

<div class="m-example" id="j-example3"><button class="u-btn u-btn-success">Confirm</button></div>

```javascript
Modal.confirm('Confirm内容');
```
