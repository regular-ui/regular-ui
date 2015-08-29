### 示例
#### 基本形式

<div class="m-example"></div>

```xml
<tab>
    <tabPane title="tab1">content1</tabPane>
    <tabPane title="tab2">content2</tabPane>
    <tabPane title="tab3">content3</tabPane>
    <tabPane title="tab4">content4</tabPane>
</tab>
```

### 禁用某一项，禁用组件

<div class="m-example"></div>

```xml
<tab>
    <tabPane title="tab1">content1</tabPane>
    <tabPane title="tab2">content2</tabPane>
    <tabPane title="tab3" disabled={true}>content3</tabPane>
    <tabPane title="tab4">content4</tabPane>
</tab>

<tab disabled={true}>
    <tabPane title="tab1">content1</tabPane>
    <tabPane title="tab2">content2</tabPane>
    <tabPane title="tab3">content3</tabPane>
    <tabPane title="tab4">content4</tabPane>
</tab>
```

### 居中

<div class="m-example"></div>

```xml
<tab class="m-tab-center">
    <tabPane title="tab1">content1</tabPane>
    <tabPane title="tab2">content2</tabPane>
    <tabPane title="tab3">content3</tabPane>
    <tabPane title="tab4">content4</tabPane>
</tab>
```

### 垂直居左

<div class="m-example"></div>

```xml
<tab class="m-tab-left">
    <tabPane title="tab1">content1</tabPane>
    <tabPane title="tab2">content2</tabPane>
    <tabPane title="tab3">content3</tabPane>
    <tabPane title="tab4">content4</tabPane>
</tab>
```

### 垂直居右

<div class="m-example"></div>

```xml
<tab class="m-tab-right">
    <tabPane title="tab1">content1</tabPane>
    <tabPane title="tab2">content2</tabPane>
    <tabPane title="tab3">content3</tabPane>
    <tabPane title="tab4">content4</tabPane>
</tab>
```
