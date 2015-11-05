### 示例
#### 基本形式

<div class="m-example"></div>

```xml
<numberInput />
<numberInput value=6 />
```

#### 禁用组件

<div class="m-example"></div>

```xml
<numberInput disabled />
```

#### 最大值和最小值

<div class="m-example"></div>

```xml
<numberInput min=5 max=8 />
```

#### 数据绑定

<div class="m-example"></div>

```xml
<numberInput value={number} />
<numberInput value={number} min=5 max=12 />
```

#### 事件

请打开浏览器的控制台查看结果。

<div class="m-example"></div>

```xml
<numberInput on-change={console.log('on-change:', '$event.value:', $event.value)} />
```
