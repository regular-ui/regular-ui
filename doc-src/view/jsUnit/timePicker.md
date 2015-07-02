### 示例
#### 基本形式

<div id="j-example1"></div>

```javascript
<timePicker />
```

或

```javascript
var timePicker = new TimePicker().$inject('#j-example1');
```

#### 禁用

<div id="j-example2"></div>

```javascript
<timePicker disabled={true} />
```

或

```javascript
var timePicker = new TimePicker({
    data: {
        disabled: true
    }
}).$inject('#j-example2');
```
