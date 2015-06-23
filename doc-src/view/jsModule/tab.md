### 示例
#### 基本形式

<div id="j-example1"></div>

```javascript
var example1 = new Component({
    template: _.multiline(function(){/*
<tab>
    <tabPane name="tab1">content1</tabPane>
    <tabPane name="tab2">content2</tabPane>
    <tabPane name="tab3" disabled={true}>content3</tabPane>
    <tabPane name="tab4">content4</tabPane>
</tab>
    */})
}).$inject('#j-example1');
```

### 居中

<div id="j-example2"></div>

```javascript
var example2 = new Component({
    template: _.multiline(function(){/*
<tab class="m-tab-center">
    <tabPane name="tab1">content1</tabPane>
    <tabPane name="tab2">content2</tabPane>
    <tabPane name="tab3" disabled={true}>content3</tabPane>
    <tabPane name="tab4">content4</tabPane>
</tab>
    */})
}).$inject('#j-example2');
```

### 垂直居左

<div id="j-example3"></div>

```javascript
var example3 = new Component({
    template: _.multiline(function(){/*
<tab class="m-tab-left">
    <tabPane name="tab1">content1</tabPane>
    <tabPane name="tab2">content2</tabPane>
    <tabPane name="tab3" disabled={true}>content3</tabPane>
    <tabPane name="tab4">content4</tabPane>
</tab>
    */})
}).$inject('#j-example3');
```

### 垂直居右

<div id="j-example4"></div>

```javascript
var example3 = new Component({
    template: _.multiline(function(){/*
<tab class="m-tab-right">
    <tabPane name="tab1">content1</tabPane>
    <tabPane name="tab2">content2</tabPane>
    <tabPane name="tab3" disabled={true}>content3</tabPane>
    <tabPane name="tab4">content4</tabPane>
</tab>
    */})
}).$inject('#j-example4');
```