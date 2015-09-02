# Regular UI

Regular UI is a set of front-end components built with [RegularJS][RegularJS].

To get started, check out http://regular-ui.github.io!

[![NPM Version][npm-badge]][npm]
[![Bower Version][bower-badge]][bower]

[![Dependency Status][deps-badge]][deps]
[![devDependency Status][dev-deps-badge]][dev-deps]
[![peerDependency Status][peer-deps-badge]][peer-deps]

## Quick Start

Following options to get Regular UI:

- Download the [latest release][latest]
- Install with [bower][bower]: `bower install regular-ui`
- Install with [npm][npm]: `npm install regular-ui`

You can find the compiled Regular UI distribution in [Bower Repo][repo-bower].

## Docs

All documentations are generated in the directory of `./doc` by Gulp. You can read them on [GitHub Page][documentation] conveniently or download them to local.

## Browser Support

![Chrome](https://raw.github.com/alrra/browser-logos/master/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/firefox/firefox_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/internet-explorer/internet-explorer_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/opera/opera_48x48.png)
--- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | untested | untested | untested |

## Develop

First of all, clone the code.

```shell
git clone git@github.com:regular-ui/regular-ui.git
```

Install project dependencies.

```shell
cd regular-ui
npm install
```

If you don't have used Gulp before, you need to install the gulp package as a global install.

```shell
npm install gulp -g
```

Now, you can start to develop.

Run `gulp` to watch and compile source files for developing anytime they are modified.

Run `gulp dist` to compile a distribution to `./dist` directory.

Run `gulp bower` to compile a distribution to `./dist` directory and sync to [Bower Repo][repo-bower].

Run `gulp doc` to rebuild docs without watching.

Run `gulp page` to rebuild docs and sync to [GitHub Page Repo][repo-page].

## Structure

I'm lazy to translate...

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

## Referenced Websites

- [NEC](http://nec.netease.com)
- [NEJ](http://nej.netease.com)
- [Bootstrap](http://v3.bootcss.com)
- [React-Bootstrap](http://react-bootstrap.github.io/components.html)
- [Amaze UI](http://amazeui.org)
- [UIkit](http://www.getuikit.net)
- [Semantic UI](http://semantic-ui.com)
- [Angular UI](https://angular-ui.github.io)
- [Kendo UI](http://demos.telerik.com/kendo-ui)
- [ExtJS](http://docs.sencha.com/extjs/4.0.7)
- [Android Developers](http://developer.android.com/index.html)
- [C# WPF](http://www.wpf-tutorial.com)

## Versioning

Regular UI is maintained by using the [Semantic Versioning Specification (SemVer)][SemVer].

## Contributing

See the [contributing guidelines][contributing] for details.

## Copyright and License

Code released under the MIT license. 

------

[npm]: https://www.npmjs.com/package/regular-ui
[npm-badge]: https://badge.fury.io/js/regular-ui.svg

[bower]: http://bower.io
[bower-badge]: https://badge.fury.io/bo/regular-ui.svg

[deps-badge]: https://david-dm.org/regular-ui/regular-ui.svg
[deps]: https://david-dm.org/regular-ui/regular-ui

[dev-deps-badge]: https://david-dm.org/regular-ui/regular-ui/dev-status.svg
[dev-deps]: https://david-dm.org/regular-ui/regular-ui#info=devDependencies

[peer-deps-badge]: https://david-dm.org/regular-ui/regular-ui/peer-status.svg
[peer-deps]: https://david-dm.org/regular-ui/regular-ui#info=peerDependencies

[repo-main]: https://github.com/regular-ui/regular-ui
[repo-bower]: https://github.com/regular-ui/regular-ui-bower
[repo-page]: https://github.com/regular-ui/regular-ui.github.io

[latest]: https://github.com/regular-ui/regular-ui-bower/releases/latest
[documentation]: http://regular-ui.github.io
[contributing]: https://github.com/regular-ui/regular-ui/blob/master/CONTRIBUTING.md

[RegularJS]: https://github.com/regularjs/regular
[SemVer]: http://semver.org
