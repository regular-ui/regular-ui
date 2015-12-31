# Contributing

We welcome community support with both pull requests and reporting bugs. Please don't hesitate to jump in.

## Branching Model

Regular UI follows the [GitFlow branching model](http://nvie.com/posts/a-successful-git-branching-model). The `master` branch always reflects a production-ready state while the latest development is taking place in the `develop` branch.

If you want to fix a bug, create a new `bugfix` branch based on the `develop`: `git checkout -b bugfix/BUG_NAME`. If you want to add a feature, create a new  `feature` branch based on the `develop`: `git checkout -b feature/FEATURE_NAME`. Only pull requests to the `develop` branch will be merged.

## Tests

All commits that fix bugs or add features need a test.

## Commit Subjects for Public API Changes

If your patch **changes the API or fixes a bug** please use one of the following prefixes in your commit subject:

- `[fixed] ...`
- `[changed] ...`
- `[added] ...`
- `[removed] ...`
- `[updated] ...`

Use `[updated]` if dependency or dev-dependency has impact on the resulting code or API.

If one commit contains multiple features, please use `; ` to delimit. For example:

```
[changed] r-class={z-sel...} => z-sel={...}; [changed] directive type check; [added] TextArea2
```

## Docs

Please update the docs with any API changes, the code and docs should always be in sync.

Component API documentation is generated automatically from the Regular UI components and their leading comments. Please make sure to provide comments for any params, methods or events you add or change in a Component.

## Breaking changes

Breaking changes should be accompanied with deprecations of removed functionality. The deprecated APIs themselves should not be removed until the Minor
release after that.