#!/usr/bin/env node

var fs = require('fs');
var build = require('./build.js');
var sitemap = require('./sitemap.json');

/**
 * @function buildAll 生成全部文档
 * @return {void}
 */
function buildAll(callback) {
    // 动态加载，require有缓存
    // var sitemap = fs.readFileSync(__dirname + '/sitemap.json', {encoding: 'utf8'});
    // sitemap = JSON.parse(sitemap);
    // 加载common中的模板
    var template = {
        head: fs.readFileSync(__dirname + '/view/common/head.ejs', {encoding: 'utf8'}),
        sidebar: fs.readFileSync(__dirname + '/view/common/sidebar.ejs', {encoding: 'utf8'}),
        main: fs.readFileSync(__dirname + '/view/common/main.ejs', {encoding: 'utf8'}),
        foot: fs.readFileSync(__dirname + '/view/common/foot.ejs', {encoding: 'utf8'}),
        jsApi: fs.readFileSync(__dirname + '/view/common/js-api.ejs', {encoding: 'utf8'}),
    }

    // 遍历sitemap生成所有文档
    var level0 = sitemap;
    build('index', sitemap, template);
    level0.children.forEach(function(level1) {
        build(level1.lowerName + '/index', sitemap, template);
        level1.children.forEach(function(level2) {
            build(level1.lowerName + '/' + level2.lowerName, sitemap, template);
        });        
    });

    callback && callback();
}

if(!module.parent)
    buildAll();

module.exports = buildAll;
