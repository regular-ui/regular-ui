### 示例
#### 基本形式

<div class="m-example"></div>

```xml
<check2 name="多选按钮" />
```

#### 半选状态

<div class="m-example"></div>

```xml
<check2 name="半选状态" checked={test} />
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        test: null
    }
});
```

#### 禁用组件

<div class="m-example"></div>

```xml
<check2 name="多选按钮" disabled />
```
