### 示例
#### 基本形式

<div id="j-example1"></div>

```xml
<calendar />
```

或

```javascript
var calendar = new Calendar().$inject('#j-example1');
```

#### 禁用

<div id="j-example2"></div>

```xml
<calendar disabled={true} />
```

或

```javascript
var calendar = new Calendar({
    data: {
        disabled: true
    }
}).$inject('#j-example2');
```
