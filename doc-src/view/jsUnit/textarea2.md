### 示例

#### 基本形式

大部分属性的用法与`<textarea>`一致。

<div class="m-example"></div>

```xml
<label>备注：<textarea2 placeholder="请输入备注" /></label>
```

#### 验证

<div class="m-example"></div>

```xml
<label>邮箱：<textarea2 rules={rules} maxlength=20 validating /></label>
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        rules: [
            {type: 'isFilled', message: '请输入邮箱！'},
            {type: 'isEmail', message: '请输入正确的邮箱！'}
        ]
    }
});
```
