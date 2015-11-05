### 示例
#### 基本形式

<div class="m-example"></div>

```xml
<button class="u-btn u-btn-primary" on-click={this.load()}>Loading</button>
```

```javascript
var component = new RGUI.Component({
    template: template,
    load: function() {
        RGUI.Loading.show();
        setTimeout(function() {
            RGUI.Loading.hide();
        }, 2000);
    }
});
```

#### 嵌入文档流

<div class="m-example"></div>

```xml
<button class="u-btn u-btn-success" on-click={this.load()}>
    Loading <loading ref="loading" static />
</button>
```

```javascript
var component = new RGUI.Component({
    template: template,
    load: function() {
        this.$refs.loading.show();
        setTimeout(function() {
            this.$refs.loading.hide();
        }.bind(this), 3000);
    }
});
```

#### 自定义

<div class="m-example"></div>

```xml
<button class="u-btn u-btn-error" on-click={this.load()}>Loading</button>
<loading ref="loading" static>
    <img src="../img/loading.gif">
</loading>
```

```javascript
var component = new RGUI.Component({
    template: template,
    load: function() {
        this.$refs.loading.show();
        setTimeout(function() {
            this.$refs.loading.hide();
        }.bind(this), 6000);
    }
});
```
