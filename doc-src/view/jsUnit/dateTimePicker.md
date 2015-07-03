### 示例
#### 基本形式

<div id="j-example1"></div>

```xml
<dateTimePicker />
```

或

```javascript
var dateTimePicker = new DateTimePicker().$inject('#j-example1');
```

#### 禁用

<div id="j-example2"></div>

```xml
<dateTimePicker disabled={true} />
```

或

```javascript
var dateTimePicker = new DateTimePicker({
    data: {
        disabled: true
    }
}).$inject('#j-example2');
```
