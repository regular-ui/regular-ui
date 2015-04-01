## 模态对话框 <small>Modal</small>

含有遮罩层的对话框，用于模拟浏览器的`alert`、`confirm`和`prompt`。

模态对话框通过遮罩层来阻止用户的其他行为。

### 示例
#### 基本形式

<div id="j-example1"><button class="u-btn u-btn-primary">Modal</button></div>

```javascript
var modal = new Modal({
    data: {
        title: 'Modal标题',
        content: 'Modal内容'
    }
});
```

#### Alert

<div id="j-example2"><button class="u-btn u-btn-danger">Alert</button></div>

```javascript
Modal.alert('Alert内容');
```

#### Confirm

<div id="j-example3"><button class="u-btn u-btn-success">Confirm</button></div>

```javascript
Modal.confirm('Confirm内容');
```

### 参考
#### Options

| 参数                | 类型                     | 默认值                       | 描述                         |
| ------------------- | ------------------------ | ---------------------------- | ---------------------------- |
| `data`              | object                   |                              | 绑定数据                     |
| `data.title`        | string                   | `'提示'`                     | 对话框标题                   |
| `data.content`      | string                   |                              | 对话框内容                   |
| `data.okButton`     | string &#124; boolean    | `true`                       | 确定按钮的文字，如果为false则不显示确定按钮 |
| `data.cancelButton` | string &#124; boolean    | `false`                      | 取消按钮的文字，如果为false则不显示取消按钮 |
| `data.width`        | number                   | `null`                       | 对话框宽度，默认为320px      |
| `ok`                | function                 |                              | 当点击确定的时候执行         |
| `cancel`            | function                 |                              | 当点击取消的时候执行         |

#### Methods

##### close

关闭对话框。

| 参数                | 类型                     | 默认值                       | 描述                         |
| ------------------- | ------------------------ | ---------------------------- | ---------------------------- |
| `result`            | boolean                  | `false`                      | 关闭的结果是确定还是取消   　　|

#### Events

##### on-close

当对话框关闭时触发。

| 参数                | 类型                     | 默认值                       | 描述                         |
| ------------------- | ------------------------ | ---------------------------- | ---------------------------- |
| `result`            | boolean                  | `false`                      | 关闭的结果是确定还是取消   　　|

##### on-ok

当对话框结果是确定时触发。

##### on-cancel

当对话框结果是取消时触发。