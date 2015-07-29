创建显示消息的通知，并且能自动淡出。类似Android中的Toast。

### 示例
#### 基本形式

<div class="m-example" id="j-example1"><button class="u-btn u-btn-primary">Notify</button></div>

```javascript
Notify.show('This is a message.');
```

#### 状态扩展

<div class="m-example" id="j-example2">
<button class="u-btn u-btn-info">Info</button>
<button class="u-btn u-btn-success">Success</button>
<button class="u-btn u-btn-warning">Warning</button>
<button class="u-btn u-btn-error">Error</button>
</div>

```javascript
Notify.show('Info message.', 'info');
Notify.show('Success message.', 'success');
Notify.show('Warning message.', 'warning');
Notify.show('Error message.', 'error');
```

#### 位置扩展

<div class="m-example" id="j-example3">
<button class="u-btn">Top Center</button>
<button class="u-btn">Top Left</button>
<button class="u-btn">Top Right</button>
<button class="u-btn">Bottom Center</button>
<button class="u-btn">Bottom Left</button>
<button class="u-btn">Bottom Right</button>
</div>

```javascript
var notify0 = new Notify({data: {position: 'topcenter'} });
var notify1 = new Notify({data: {position: 'topleft'} });
var notify2 = new Notify({data: {position: 'topright'} });
var notify3 = new Notify({data: {position: 'bottomcenter'} });
var notify4 = new Notify({data: {position: 'bottomleft'} });
var notify5 = new Notify({data: {position: 'bottomright'} });

notify0.show('Top Center notify.');
notify1.show('Top Left notify.');
notify2.show('Top Right notify.');
notify3.show('Bottom Center notify.');
notify4.show('Bottom Left notify.');
notify5.show('Bottom Right notify.');
```

#### 嵌入文档流

上面的模式通知都是以`fixed`的形式固定在浏览器中，如果要将通知嵌入到文档流，先将`notify`注入到需要的位置，同时设置`notify`的`position="static"`。

<div class="m-example" id="j-example4"><button class="u-btn u-btn-primary">Static</button></div>

```xml
<notify ref="notify" position="static" duration="0" />
```

```javascript
...
    this.$refs.notify.show('Static notify.');
...
```

#### 消息停留时间

可以通过设置`notify`的`duration`参数设置所有消息的停留时间，也可以在`show`的时候单独设置该条消息的停留时间，单位为毫秒。

<div class="m-example" id="j-example5">
<button class="u-btn">0.5s</button>
<button class="u-btn">1s</button>
<button class="u-btn">2s</button>
<button class="u-btn">常驻</button>
</div>

```javascript
Notify.show('0.5 seconds.', null, 500);
Notify.show('1 second.', null, 1000);
Notify.show('2 seconds.', null, 2000);
Notify.show('Stick here.', null, 0);
```
