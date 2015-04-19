### 示例
#### 基本形式

<div id="j-example1"></div>

```xml
<checkEx name="多选按钮" />
```

或

```javascript
var checkEx = new CheckEx({
    data: {
        name: '多选按钮'
    }
}).$inject('#j-example1');
```

#### 禁用

<div id="j-example2"></div>

```xml
<checkEx name="多选按钮" disabled={true} />
```

或

```javascript
var checkEx = new CheckEx({
    data: {
        name: '多选按钮',
        disabled: true
    }
}).$inject('#j-example2');
```