### 示例
#### 基本形式

<div class="m-example"></div>

```xml
<label>邮箱：<input2 rules={rules} validating={true} /></label>
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
