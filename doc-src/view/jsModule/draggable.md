## 示例
### 基本形式

<div class="m-example"></div>

```xml
<draggable><div class="u-color u-color-primary">拖我</div></draggable>
```

### 移动自身

<div class="m-example"></div>

```xml
<draggable proxy="self"><div class="u-color u-color-primary">自由</div></draggable>
<draggable proxy="self" direction="horizontal"><div class="u-color u-color-info">水平</div></draggable>
<draggable proxy="self" direction="vertical"><div class="u-color u-color-success">垂直</div></draggable>
```

### 修改代理

<div class="m-example"></div>

```xml
<draggable>
    <div class="u-color u-color-primary">拖我</div>
    <draggable.proxy>
        <div class="u-color u-color-warning">拖我</div>
    </draggable.proxy>
</draggable>
```
