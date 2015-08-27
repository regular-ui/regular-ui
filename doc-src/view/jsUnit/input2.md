### 示例
#### 基本形式

<div class="m-example"></div>

```xml
<input2 rules={rules} />
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        rules: [
            {type: 'isRequired', message: '请输入字符！'},
            {type: 'isLength', min: 5, max: 8, message: '请输入5-8个字符！'}
        ]
    }
});
```
