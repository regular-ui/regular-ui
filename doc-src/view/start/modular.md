### CommonJS

#### 1. 安装

Regular UI中使用npm+[webpack][WebPack]打包JS文件。

首先确保安装了WebPack CLI：

```shell
npm install -g webpack
```

然后在项目中安装Regular UI：

```shell
npm install regular-ui
```

#### 2. 引入

##### 一次性引入所有组件

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

##### 单独引入某个组件

在`index.js`文件中添加：

```javascript
var Calendar = require('regular-ui/src/calendar');
new Calendar().$inject('#app');
```

<div class="u-message u-message-warning">
    <i class="message_icon u-icon u-icon-warning-circle"></i> 注意：单独引入组件，在WebPack打包时需要`text-loader`插件来引入模板：
    先安装插件`npm install text-loader`，再在`webpack.config.js`中添加
    ```
    module: {
        loaders: [
            {test: /\.html$/, loader: 'text-loader'}
        ]
    }
    ```
</div>

然后打包：

```shell
webpack index.js bundle.js
```

[Demo &gt;&gt;](../demo/common-multi/index.html)

### AMD

#### 1. 安装

使用[RequireJS][RequireJS]加载Regular UI。

首先在HTML的`<head>`中添加：

```html
<script data-main="index.js" src="require.min.js"></script>
```

使用Bower下载Regular UI：

```shell
bower install regular-ui
```

#### 2. 引入

在`index.js`文件中添加：

```javascript
requirejs.config({
    baseUrl: 'bower_components/regular-ui',
    paths: {
        Regular: 'vendor/regular.min'
    }
});

require(['js/regular-ui.min'], function(RGUI) {
    new RGUI.Calendar().$inject('#app');
});
```

[Demo &gt;&gt;](../demo/amd/index.html)

<div class="u-message u-message-info">
    <i class="message_icon u-icon u-icon-info-circle"></i> 提示：使用Regular UI要先引入Regular。
</div>

### 自定义打包组件

#### 1. 安装

首先确保安装了gulp：

```shell
npm install -g gulp
```

然后在项目中安装Regular UI以及依赖包：

```shell
npm install regular-ui
cd node_modules/regular-ui
npm install
```

#### 2. 配置

Regular UI目录下的`structure.js`是全部组件的配置。

将`structure.js`复制为`structure.customized.js`：

```shell
cp structure.js structure.customized.js
```

然后打开后注释或者删除掉不需要的组件，如下：

```javascript
    'Select2': {type: 'css+js', category: 'unit', lowerName: 'select2', requires: ['Dropdown']},
    'Select2Group': {type: 'js', category: 'unit', lowerName: 'select2Group', requires: ['Select2']},
    // 'TreeSelect': {type: 'js', category: 'unit', lowerName: 'treeSelect', requires: ['Select2', 'TreeView']},
    'Suggest': {type: 'css+js', category: 'unit', lowerName: 'suggest', requires: ['Dropdown']},
    // 'Uploader': {type: 'css+js', category: 'unit', lowerName: 'uploader'},
```

#### 3. 打包

运行gulp命令：

```shell
gulp customize
```

最后在`./dist`目录中将会生成以下文件供使用：

- `css/regular-ui.theme.customized.css`
- `css/regular-ui.theme.customized.min.css`
- `js/regular-ui.customized.js`
- `js/regular-ui.customized.min.js`

<div class="u-message u-message-info">
    <i class="message_icon u-icon u-icon-info-circle"></i> TODO：后续会提供Web自定义打包服务。
</div>



[WebPack]: http://webpack.github.io
[RequireJS]: http://requirejs.org