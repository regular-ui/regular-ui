# Regular UI

Regular UI is a set of front-end components built with [RegularJS][RegularJS] and [MCSS][MCSS].

[![NPM Version][npm-badge]][npm]
[![Bower Version][bower-badge]][bower]

[![Dependency Status][deps-badge]][deps]
[![devDependency Status][dev-deps-badge]][dev-deps]

## Quick Start

Following options to get Regular UI:

- Download the [latest release][latest]
- Install with [bower][bower]: `bower install regular-ui`
- Install with [npm][npm]: `npm install regular-ui`

You can find the compiled Regular UI distribution in [Bower Repo][repo-bower].

## Docs

All documentations are saved in the directory of `./doc`. You can download the package to view. We will build a website soon for the convenience.

## Browser Support

![Chrome](https://raw.github.com/alrra/browser-logos/master/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/firefox/firefox_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/internet-explorer/internet-explorer_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/opera/opera_48x48.png)
--- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | untested | untested | untested |

## Develop

First of all, clone the code.

```shell
git clone git@github.com:rainfore/regular-ui.git
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

Run `gulp dist` to compile a distribution to `./dist` directory and [Bower Repo][repo-bower].

Run `gulp doc` to rebuild docs without watching.

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

[deps-badge]: https://david-dm.org/rainfore/regular-ui.svg
[deps]: https://david-dm.org/rainfore/regular-ui

[dev-deps-badge]: https://david-dm.org/rainfore/regular-ui/dev-status.svg
[dev-deps]: https://david-dm.org/rainfore/regular-ui#info=devDependencies

[repo-bower]: https://github.com/rainfore/regular-ui-bower
[latest]: https://github.com/rainfore/regular-ui-bower/releases/latest
[documentation]: https://github.com/rainfore/regular-ui/blob/master/doc
[contributing]: https://github.com/rainfore/regular-ui/blob/master/README.md

[RegularJS]: https://github.com/regularjs/regular
[MCSS]: https://github.com/leeluolee/mcss
[SemVer]: http://semver.org
