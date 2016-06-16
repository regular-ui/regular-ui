## 示例

### 基本形式

大部分属性的用法与`<input>`一致。

<div class="m-example"></div>

```xml
<label>密码：<input2 type="password" maxlength=6 placeholder="请输入密码" autofocus /></label>
```

### 单位

<div class="m-example"></div>

```xml
<label>速度：<input2 width="smw" value="340" unit="m/s" /></label>
```

### 验证

<div class="m-example"></div>

```xml
<label>邮箱：<input2 rules={rules} maxlength=20 /></label>
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        rules: [
            {type: 'isFilled', on: 'blur', message: '请输入邮箱！'},
            {type: 'isEmail', on: 'keyup+blur', message: '请输入正确的邮箱！'}
        ]
    }
});
```
