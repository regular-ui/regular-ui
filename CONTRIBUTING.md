# Contributing

We welcome community support with both pull requests and reporting bugs. Please don't hesitate to jump in.

## Developer Tools

All Components are developed by using `rgui-tools`. Check out the [Developer Tools](https://github.com/regular-ui/rgui-tools) for more detail.

## Branching Model

Regular UI follows the [GitFlow branching model](http://nvie.com/posts/a-successful-git-branching-model). The `master` branch always reflects a production-ready state. The next version is taking place in the `next` branch. The `develop` branch is not needed any more.

If you want to fix a bug, create a new `bugfix` branch based on the `master`: `git checkout -b bugfix/BUG_NAME`. And if you want to add a feature, create a new `feature` branch based on the `master`: `git checkout -b feature/FEATURE_NAME`.

## Commit Subjects

If your patch **changes the API or fixes a bug** please use one of the following prefixes in your commit subject:

- `[fixed] ...`
- `[changed] ...`
- `[added] ...`
- `[removed] ...`
- `[updated] ...`

Use `[updated]` if dependency or dev-dependency has impact on the resulting code or API.

If one commit contains multiple features, please use `; ` to delimit. For example:

```
[changed] r-class={z-sel...} => z-sel={...}; [changed] directive type check; [added] Pager
```

## Tests

All commits that fix bugs or add features need a test.

make sure `rgui-tools test` passed when you want your branch to be merged.

## Code Style

We use [ESLint](http://eslint.org) for all JavaScript Linting. There should be no linting errors and no unreasonable warnings by using `rgui-tools lint`. You can use `rgui-tools lint --fix` to fix some style errors or warnings quickly.

## Docs

Please update the docs with any API changes, the code and docs should always be in sync.

Component API documentation is generated automatically from the Regular UI components and their leading comments. Please make sure to provide comments for any params, methods or events you add or change in a Component.

## Breaking changes

Breaking changes should be accompanied with deprecations of removed functionality. The deprecated APIs themselves should not be removed until the Minor
release after that.