### 示例
#### 基本形式

<div id="j-example1"></div>

```xml
<progress percent="36" />
```

或

```javascript
var progress = new Progress({
    data: {
        percent: 36
    }
}).$inject('#j-example1');
```

#### 颜色扩展

<div id="j-example2"></div>

```xml
<progress percent="25" type="success" />
<progress percent="50" type="warning" />
<progress percent="75" type="error" />
```

或

```javascript
var progress = new Progress({
    data: {
        percent: 25,
        type: 'success'
    }
}).$inject('#j-example2');
var progress = new Progress({
    data: {
        percent: 50,
        type: 'warning'
    }
}).$inject('#j-example2');
var progress = new Progress({
    data: {
        percent: 75,
        type: 'error'
    }
}).$inject('#j-example2');
```

#### 尺寸扩展

<div id="j-example3"></div>

```xml
<progress percent="25" size="xs" />
<progress percent="50" size="sm" />
<progress percent="75" />
```

或

```javascript
var progress = new Progress({
    data: {
        percent: 25,
        text: false,
        size: 'xs'
    }
}).$inject('#j-example3');
var progress = new Progress({
    data: {
        percent: 50,
        text: false,
        size: 'sm'
    }
}).$inject('#j-example3');
var progress = new Progress({
    data: {
        percent: 75,
        text: false,
        size: null
    }
}).$inject('#j-example3');
```

#### 条纹

<div id="j-example4"></div>

```xml
<progress percent="36" striped={true} />
```

或

```javascript
var progress = new Progress({
    data: {
        percent: 36,
        striped: true
    }
}).$inject('#j-example4');
```

#### 条纹动画

<div id="j-example5"></div>

```xml
<progress percent="72" type="error" striped={true} active={true} />
```

或

```javascript
var progress = new Progress({
    data: {
        percent: 72,
        type: 'error',
        striped: true,
        active: true
    }
}).$inject('#j-example5');
```