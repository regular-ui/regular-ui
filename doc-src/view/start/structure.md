## bower包目录结构

### regular-ui-bower根目录

```
regular-ui-bower
|— css                    # css文件
|— fonts                  # 字体，Regular UI使用FontAwesome
|— js                     # js文件，整合的单入口文件
|— mcss                   # mcss文件
|— scss                   # scss文件
|— vendor                 # 第三方库
|-- bower.json             # bower配置文件
|-- README.md              # 说明文件
```

## npm包目录结构

### regular-ui根目录

```
regular-ui
|— dist                   # 部署目录，与regular-ui-bower一致
|— doc                    # 文档目录，与regular-ui.github.io一致
|— doc-src                # 文档构建目录，文档目录的内容是由此编译生成的
|— gulp                   # gulp任务目录，将`gulpfile.js`拆成多个文件，方便维护
|— src                    # 组件的开发源代码
|— test                   # 测试用例目录
|-- CHANGELOG.md           # 修改日志
|-- CONTRIBUTING.md        # 贡献代码规范事项
|-- gulpfile.js            # gulp任务文件
|-- LICENSE                # Regular UI遵循MIT协议
|-- package.json           # npm配置文件
|-- README.md              # 说明文件
|-- structure.js           # 组件库结构，用于打包配置
|-- webpack.config.js      # WebPack打包配置文件
```

### regular-ui/src目录

```
regular-ui
|— src                    # 组件的开发源代码
    |— js                 # 组件的js源代码
        |— base           # 基础组件和辅助类库
        |— module         # js模块类
        |— unit           # js元件类
        |— util           # js辅助类
        |-- index.js       # js引导文件
    |— mcss               # 组件的mcss源代码
        |— bootstrap      # Bootstrap主题
        |— core           # 主题内核
        |— default        # Default主题
        |— flat           # Flat主题
        |— simple         # Simple主题
        |-- bootstrap.mcss # Bootstrap主题引导文件
        |-- default.mcss   # Default主题引导文件
        |-- flat.mcss      # Flat主题引导文件
        |-- simple.mcss    # Simple主题引导文件
```
