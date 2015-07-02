### 示例
#### 基本形式

<div id="j-example1"></div>

```javascript
<datePicker />
```

或

```javascript
var datePicker = new DatePicker().$inject('#j-example1');
```

#### 禁用

<div id="j-example2"></div>

```javascript
<datePicker disabled={true} />
```

或

```javascript
var datePicker = new DatePicker({
    data: {
        disabled: true
    }
}).$inject('#j-example2');
```
