#!/usr/bin/env bash

gulp bower
gulp page
# don't use npm version $1
modify package.json
git add -A .
git commit -m $1
git checkout master
git merge develop
git push --all
git tag $1
git push origin $1
npm publish
cd ../regular-ui-bower
git add -A .
git commit -m $1
git push
git tag $1
git push origin $1
cd ../regular-ui.github.io
git add -A .
git commit -m $1
git push
git tag $1
git push origin $1
cd ../regular-ui
git checkout develop