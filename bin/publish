#!/usr/bin/env bash

if [ ! $1 ];then
    echo "Please input a version!"
    exit 1
elif [ ${1:0:1} != "v" ];then
    version="v$1"
else
    version="$1"
fi

echo ""
echo "The new version is \"$version\"."
echo "--------------------------------"
echo "Are you sure to continue? (y/n)"
read char
if [ $char != "y" ];then
    exit 0
fi

echo ""
echo "Starting to pack and deploy..."
echo ""

gulp bower
gulp page

echo ""
echo "Now please check distribution and pages."
echo "--------------------------------"
echo "Are you sure to continue? (y/n)"
read char
if [ $char != "y" ];then
    exit 0
fi

echo ""
echo "Starting to deploy and publish..."
echo ""

./bin/version $version
git add -A .
git commit -m $version
git checkout master
git merge develop
git push --all
git tag $version
git push origin $version
npm publish
cd ../regular-ui-bower
git add -A .
git commit -m $version
git push
git tag $version
git push origin $version
cd ../regular-ui.github.io
git add -A .
git commit -m $version
git push
git tag $version
git push origin $version
cd ../regular-ui
git checkout develop