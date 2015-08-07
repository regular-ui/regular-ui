### 示例
#### 基本形式

<div class="m-example" id="j-example1"></div>

```xml
<suggest source={source} />
```

```javascript
...
    this.data.source = [
        {id: 1, name: 'abandon'},
        {id: 2, name: 'about'},
        {id: 3, name: 'absent'},
        {id: 4, name: 'bread'},
        {id: 5, name: 'break'},
        {id: 6, name: 'brief'},
        {id: 7, name: 'calendar'},
        {id: 8, name: 'cancel'},
        {id: 9, name: 'column'}
    ];
...
```

#### 禁用组件

<div class="m-example" id="j-example2"></div>

```xml
<suggest source={source} disabled={true} />
```

```javascript
...
    this.data.source = [
        {id: 1, name: 'abandon'},
        {id: 2, name: 'about'},
        {id: 3, name: 'absent'},
        {id: 4, name: 'bread'},
        {id: 5, name: 'break'},
        {id: 6, name: 'brief'},
        {id: 7, name: 'calendar'},
        {id: 8, name: 'cancel'},
        {id: 9, name: 'column'}
    ];
...
```

#### Placeholder

<div class="m-example" id="j-example3"></div>

```xml
<suggest source={source} placeholder="输入时会自动提示" />
```

```javascript
...
    this.data.source = [
        {id: 1, name: 'abandon'},
        {id: 2, name: 'about'},
        {id: 3, name: 'absent'},
        {id: 4, name: 'bread'},
        {id: 5, name: 'break'},
        {id: 6, name: 'brief'},
        {id: 7, name: 'calendar'},
        {id: 8, name: 'cancel'},
        {id: 9, name: 'column'}
    ];
...
```

#### 最小提示长度

当输入长度>=`minLength`属性后开始提示。

<div class="m-example" id="j-example4"></div>

```xml
<suggest source={source} placeholder="输入2个字符后开始提示" minLength="2" />
```

```javascript
...
    this.data.source = [
        {id: 1, name: 'abandon'},
        {id: 2, name: 'about'},
        {id: 3, name: 'absent'},
        {id: 4, name: 'bread'},
        {id: 5, name: 'break'},
        {id: 6, name: 'brief'},
        {id: 7, name: 'calendar'},
        {id: 8, name: 'cancel'},
        {id: 9, name: 'column'}
    ];
...
```

#### 匹配方式

<div class="m-example" id="j-example5"></div>

```xml
<suggest source={source} placeholder="匹配全局" matchType="all" />
<suggest source={source} placeholder="只匹配开头" matchType="start" />
<suggest source={source} placeholder="只匹配结尾" matchType="end" />
```

```javascript
...
    this.data.source = [
        {id: 1, name: 'abandon'},
        {id: 2, name: 'about'},
        {id: 3, name: 'absent'},
        {id: 4, name: 'bread'},
        {id: 5, name: 'break'},
        {id: 6, name: 'brief'},
        {id: 7, name: 'calendar'},
        {id: 8, name: 'cancel'},
        {id: 9, name: 'column'}
    ];
...
```

#### 严格模式

<div class="m-example" id="j-example6"></div>

```xml
<suggest source={source} strict={true} />
```

```javascript
...
    this.data.source = [
        {id: 1, name: 'abandon'},
        {id: 2, name: 'about'},
        {id: 3, name: 'absent'},
        {id: 4, name: 'bread'},
        {id: 5, name: 'break'},
        {id: 6, name: 'brief'},
        {id: 7, name: 'calendar'},
        {id: 8, name: 'cancel'},
        {id: 9, name: 'column'}
    ];
...
```
