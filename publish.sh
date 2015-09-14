#!/usr/bin/env bash

gulp bower
gulp page
# git commit -am 
npm version $1 #/git commit -m '0.1.0'
npm publish
git push origin v$1
git checkout master
git merge develop
git push --all
cd ../regular-ui-bower
git commit -am $1
git push
cd ../regular-ui.github.io
git commit -am $1
git push
cd ../regular-ui
git checkout develop