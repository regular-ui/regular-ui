### 1. 下载

下载Regular UI有以下几种方式：

#### 直接在GitHub上下载最新发布

<a class="u-btn" target="_blank" href="https://github.com/regular-ui/regular-ui/releases/latest">下载Regular UI 0.1</a>

#### 使用Bower下载

```shell
bower install regular-ui
```

#### 使用NPM下载

```shell
npm install regular-ui
```

### 2. 引入

创建一个HTML页面，并添加以下代码：

```html
<head>
<link rel="stylesheet" href="**/regular-ui/css/regular-ui.default.min.css">
</head>
<body>
<script src="**/regular-ui/vendor/regular.min.js"></script>
<script src="**/regular-ui/js/regular-ui.min.js"></script>
</body>
```

<div class="u-message u-message-info">
    <i class="message_icon u-icon u-icon-info-circle"></i> 提示：使用Regular UI要先引入RegularJS。
</div>

### 3. 使用

如何在页面中使用Regular UI组件？

下面以在页面中添加日历组件（RGUI.Calendar）为例：

#### 使用Regular模板创建组件

在HTML页面中添加如下代码：

```html
<head>
<link rel="stylesheet" href="regular-ui/css/regular-ui.default.min.css">
</head>
<body>
<div id="app"></div>
<script src="regular-ui/vendor/regular.min.js"></script>
<script src="regular-ui/js/regular-ui.min.js"></script>
<script id="template" type="text/regular">
    <calendar />
</script>
<script>
    new RGUI.Component({
        template: '#template'
    }).$inject('#app');
</script>
</body>
```

<div class="u-message u-message-info">
    <i class="message_icon u-icon u-icon-info-circle"></i> 后面文档中具体的示例都会以这种添加组件的方式展现。
</div>

[Demo &gt;&gt;](../demo/global/index.html)

#### 使用JS创建组件

在HTML页面中添加如下代码：

```html
<head>
<link rel="stylesheet" href="regular-ui/css/regular-ui.default.min.css">
</head>
<body>
<div id="app"></div>
<script src="regular-ui/vendor/regular.min.js"></script>
<script src="regular-ui/js/regular-ui.min.js"></script>
<script>
    new RGUI.Calendar().$inject('#app');
</script>
</body>
```

[Demo &gt;&gt;](../demo/global/index2.html)

> RegularJS的详细使用请参考[RegularJS指南](http://regularjs.github.io)。



[latest]: https://github.com/regular-ui/regular-ui-bower/releases/latest
