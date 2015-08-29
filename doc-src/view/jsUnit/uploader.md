### 示例
#### 基本形式

<div class="m-example"></div>

```xml
<uploader url="/api/upload" />
```

#### 修改标题

<div class="m-example"></div>

```xml
<uploader title="上传文件" url="/api/upload" />
```

#### 按钮自定义

<div class="m-example"></div>

```xml
<uploader url="/api/upload">
    <a class="u-btn u-btn-primary">上传 <i class="u-icon u-icon-upload"></i></a>
</uploader>
```

#### 禁用组件

<div class="m-example"></div>

```xml
<uploader url="/api/upload" disabled={true} />
```

#### 文件类型限制

<div class="m-example"></div>

```xml
<uploader url="/api/upload" extensions="jpg,gif,png" />
```
