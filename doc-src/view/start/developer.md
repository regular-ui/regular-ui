### CommonJS

本例中使用node+[webpack][WebPack]打包JS文件。

首先安装WebPack CLI：

```shell
npm install webpack -g
```

然后在项目中安装Regular UI：

```shell
npm install regular-ui
```

#### 如果要一次性引入所有组件

在`index.js`文件中添加：

```javascript
var RGUI = require('regular-ui');

new RGUI.Calendar().$inject('#app');
```

然后打包：

```shell
webpack index.js bundle.js
```

[Demo &gt;&gt;](../demo/common/index.html)

#### 如果要单独引入某个组件

在`index.js`文件中添加：

```javascript
var Calendar = require('regular-ui/src/calendar');

new Calendar().$inject('#app');
```

<div class="u-message u-message-warning">
    <i class="message_icon u-icon u-icon-warning-circle"></i> 注意：单独引入组件，在打包时需要<code>require</code>有<code>text!</code>插件来引入模板。<br>
    <ul>
        <li>使用webpack打包时，先安装<code>npm install text-loader</code>。</li>
    </ul>
</div>

然后打包：

```shell
webpack index.js bundle.js
```

[Demo &gt;&gt;](../demo/common-multi/index.html)

### AMD

本例中使用[RequireJS][RequireJS]加载Regular UI。

首先在HTML的`<head>`中添加：

```html
<script data-main="index.js" src="require.min.js"></script>
```

使用Bower下载Regular UI：

```shell
bower install regular-ui
```

#### 如果要一次性引入所有组件

<div class="u-message u-message-info">
    <i class="message_icon u-icon u-icon-info-circle"></i> 提示：使用Regular UI要先引入Regular。
</div>

在`index.js`文件中添加：

```javascript
requirejs.config({
    baseUrl: 'bower_components/regular-ui',
    paths: {
        Regular: 'vendor/regular.min',
        marked: 'vendor/marked.min'
    }
});

require(['js/regular-ui.min'], function(RGUI) {
    new RGUI.Calendar().$inject('#app');
});
```

[Demo &gt;&gt;](../demo/amd/index.html)

#### 如果要单独引入某个组件

```javascript
requirejs.config({
    baseUrl: 'bower_components/regular-ui/js-amd',
    nodeIdCompat: true,
    paths: {
        Regular: 'vendor/regular.min',
        text: '../../../text'
    }
});

require(['module/calendar'], function(Calendar) {
    new Calendar().$inject('#app');
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



[WebPack]: http://webpack.github.io
[RequireJS]: http://requirejs.org