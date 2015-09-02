### bower包目录结构

#### `regular-ui-bower`根目录

```
regular-ui-bower
|— css                    # css文件
|— font                   # 字体，Regular UI使用FontAwesome
|— js                     # js文件，整合的单入口文件
|— js-amd                 # amd规范的多入口文件
|— js-common              # commonJS规范的多入口文件
|— mcss                   # mcss文件
|— vendor                 # 第三方库
|-- bower.json             # bower配置文件
|-- README.md              # 说明文件
```



### npm包目录结构

#### `regular-ui`根目录

```
regular-ui
|— dist                   # 部署目录，与regular-ui-bower一致
|— doc                    # 文档目录，与regular-ui.github.io一致
|— doc-src                # 文档构建目录，文档目录的内容是由此编译生成的
|— gulp                   # gulp任务目录，将`gulpfile.js`拆成多个文件，方便维护
|— lib                    # 辅助脚本库
|— src                    # 组件的开发源代码
|— test                   # 测试目录
|-- CHANGELOG.md           # 修改日志
|-- CONTRIBUTING.md        # 贡献代码规范事项
|-- LICENSE                # Regular UI遵循MIT协议
|-- package.json           # npm配置文件
|-- README.md              # 说明文件
|-- webpack.config.js      # WebPack打包配置文件
```

#### `regular-ui/src`目录

```
regular-ui
|— src                    # 组件的开发源代码
    |— font               # 字体，Regular UI使用FontAwesome
    |— js                 # 组件的js源代码
        |— base           # 基础组件和辅助类库
        |— module         # js模块类
        |— unit           # js元件类
        |-- index.js       # js引导文件
    |— mcss               # 组件的mcss源代码
        |— bootstrap      # Bootstrap主题
        |— core           # 主题内核
        |— default        # Default主题
        |— flat           # Flat主题
        |-- bootstrap.mcss # Bootstrap主题引导文件
        |-- default.mcss   # Default主题引导文件
        |-- flat.mcss      # Flat主题引导文件
```

#### `regular-ui/doc-src`目录

```
regular-ui
|— doc-src                # 文档构建目录
    |— assets             # 静态资源，里面的内容会直接复制到doc目录下
    |— mcss               # doc的mcss源代码
    |— view               # 文档页面的模板和内容
        |— common         # 文档页面的头部、侧边栏、API等公共部分模板，ejs文件
        |— cssModule      # css模块的内容，markdown文件
        |— cssUnit        # css元件的内容，markdown文件
        |— jsModule       # js元件的内容，markdown文件
        |— jsUnit         # js元件的内容，markdown文件
        |— start          # 开始使用的内容，markdown文件
        |-- index.md       # 首页内容
    |— build.js           # 根据路径构建单个文档
    |— buildAll.js        # 构建全部文档
    |— cssdoc.js          # 暂无
    |— jsdoc.js           # 由组件js源代码的注释块生成文档API
    |— premark.js         # 将markdown中的代码段自动添加到页面中创建出活生生的例子
    |— sitemap.json       # 网站地图
```
