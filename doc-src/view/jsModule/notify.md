创建显示消息的通知，并且能自动淡出。类似Android中的Toast。

### 示例
#### 基本形式

<div class="m-example"></div>

```xml
<button class="u-btn u-btn-primary" on-click={this.showMessage()}>Notify</button>
```

```javascript
var component = new RGUI.Component({
    template: template,
    showMessage: function() {
        RGUI.Notify.show('This is a message.');
    }
});
```

#### 状态扩展

<div class="m-example"></div>

```xml
<button class="u-btn u-btn-info" on-click={this.showMessage('info')}>Info</button>
<button class="u-btn u-btn-success" on-click={this.showMessage('success')}>Success</button>
<button class="u-btn u-btn-warning" on-click={this.showMessage('warning')}>Warning</button>
<button class="u-btn u-btn-error" on-click={this.showMessage('error')}>Error</button>
```

```javascript
var component = new RGUI.Component({
    template: template,
    showMessage: function(type) {
        RGUI.Notify.show(type + ' message.', type);
    }
});
```

#### 位置扩展

<div class="m-example"></div>

```xml
<button class="u-btn" on-click={this.showMessage(0)}>Top Center</button>
<button class="u-btn" on-click={this.showMessage(1)}>Top Left</button>
<button class="u-btn" on-click={this.showMessage(2)}>Top Right</button>
<button class="u-btn" on-click={this.showMessage(3)}>Bottom Center</button>
<button class="u-btn" on-click={this.showMessage(4)}>Bottom Left</button>
<button class="u-btn" on-click={this.showMessage(5)}>Bottom Right</button>
```

```javascript
var component = new RGUI.Component({
    template: template,
    config: function() {
        this.notifies = [
            new RGUI.Notify({data: {position: 'topcenter'} }),
            new RGUI.Notify({data: {position: 'topleft'} }),
            new RGUI.Notify({data: {position: 'topright'} }),
            new RGUI.Notify({data: {position: 'bottomcenter'} }),
            new RGUI.Notify({data: {position: 'bottomleft'} }),
            new RGUI.Notify({data: {position: 'bottomright'} })
        ];
    },
    showMessage: function(index) {
        var notify = this.notifies[index];
        notify.show('Position: ' + notify.data.position + '.');
    }
});
```

#### 嵌入文档流

上面的模式通知都是以`fixed`的形式固定在浏览器中，如果要将通知嵌入到文档流，先将`notify`注入到需要的位置，同时设置`notify`的`position="static"`。

<div class="m-example"></div>

```xml
<button class="u-btn u-btn-primary" on-click={this.showMessage()}>Static</button>
<notify ref="notify" position="static" duration="0" />
```

```javascript
var component = new RGUI.Component({
    template: template,
    showMessage: function() {
        this.$refs.notify.show('Static notify.');
    }
});
```

#### 消息停留时间

可以通过设置`notify`的`duration`参数设置所有消息的停留时间，也可以在`show`的时候单独设置该条消息的停留时间，单位为毫秒。

<div class="m-example"></div>

```xml
<button class="u-btn" on-click={this.showMessage(500)}>0.5s</button>
<button class="u-btn" on-click={this.showMessage(1000)}>1s</button>
<button class="u-btn" on-click={this.showMessage(2000)}>2s</button>
<button class="u-btn" on-click={this.showMessage(0)}>常驻</button>
```

```javascript
var component = new RGUI.Component({
    template: template,
    showMessage: function(duration) {
        RGUI.Notify.show('Duration: ' + duration + ' ms.', null, duration);
    }
});
```
