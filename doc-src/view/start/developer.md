### node+gulp工作流

首先：

```shell
npm install regular-ui
```

#### 一次性引入所有组件

```javascript
var RGUI = require('regular-ui');
```

#### 单独引入某个组件

```javascript
var Calendar = require('regular-ui/src/calendar');
```

<div class="u-message u-message-warning">
    <i class="message_icon u-icon u-icon-warning-circle"></i> 注意：单独引入组件，在打包时需要<code>require</code>有<code>text!</code>插件来引入模板。<br>
    <ul>
        <li>使用webpack打包，安装<code>text-loader</code>即可。</li>
    </ul>
</div>

### AMD规范

首先使用Bower下载：

```shell
bower install regular-ui
```

#### 一次性引入所有组件

在HTML中添加：

```html
<head>
<link rel="stylesheet" href="bower_components/regular-ui/css/regular-ui.default.css">
<script src="require.min.js"></script>
</head>
<body>
<script>
requirejs.config({
    baseUrl: 'bower_components/regular-ui',
    paths: {
        Regular: 'vendor/regular.min',
        marked: 'vendor/marked.min'
    }
});

require(['js/regular-ui'], function(RGUI) {
    ...
});
</script>
</body>
```

#### 单独引入某个组件

```html
<head>
<link rel="stylesheet" href="bower_components/regular-ui/css/regular-ui.default.css">
<script src="require.min.js"></script>
</head>
<body>
<script>
requirejs.config({
    baseUrl: 'bower_components/regular-ui/js-amd',
    nodeIdCompat: true,
    paths: {
        regularjs: 'vendor/regular.min',
        text: '../../../text'
    }
});

require(['module/calendar'], function(Calendar) {
    ...
});
</script>
```

<div class="u-message u-message-warning">
    <i class="message_icon u-icon u-icon-warning-circle"></i> 注意：使用Require.js单独引入组件时，
    <ul>
        <li>需要开启<code>nodeIdCompat</code>。</li>
        <li>需要<code>text!</code>插件来引入模板。</li>
    </ul>
</div>