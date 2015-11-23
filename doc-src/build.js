#!/usr/bin/env node

var fs = require('fs');
var pathlib = require('path');
var ejs = require('ejs');
var markextend = require('markextend');
var codemirror = require('codemirror-highlight');

markextend.setOptions({
    // 代码高亮
    highlight: function(code, lang) {
        if(lang && !codemirror.modes[lang]) {
            if(lang === 'coffee') lang = 'coffeescript';
            if(lang === 'json') lang = 'javascript';
            if(lang === 'html') lang = 'xml';
            if(lang === 'rgl') lang = 'xml';
            if(lang === 'console') return code;

            try {
                codemirror.loadMode(lang);
            } catch(e) {
                console.error(e);
            }
        }

        if(codemirror.modes[lang])
            return codemirror.highlight(code, {mode: lang});
        else
            return code;
    }
});

// var sitemap = require('./sitemap.json');
var premark = require('./premark.js');
var jsdoc = require('./jsdoc.js');
var cssdoc = require('./cssdoc.js');

/**
 * @function build 通过`path`生成单个文档
 * @param {string} path 路径，如`unit/button`、`component/modal`
 * @return {void}
 */
function build(path, sitemap, template) {
    var level = path.split('/');
    if(path === 'index')
        level = ['start', 'index'];

    // 组织模板数据
    var data = {
        sitemap: sitemap,
        mainnavs: [],
        sidenavs: [],
        relativePath: '../',
        mainnav: level[0],
        sidenav: level[1],
        article: '',
        script: '',
        api: '',
        current: null
    }

    if(path === 'index') {
        data.relativePath = '';
        data.mainnav = null;
        data.sidenav = null;
    }

    // 组织主导航数据
    sitemap.children.forEach(function(level1) {
        level1.path = (level1.lowerName + '/index.html').toLowerCase();
        data.mainnavs.push(level1);
    });

    // 组织侧边栏数据
    for(var i = 0; i < sitemap.children.length; i++)
        if(sitemap.children[i].lowerName === level[0]) {
            data.sidenavs = sitemap.children[i].children;
            data.sidenavs.forEach(function(item) {
                if(item.lowerName === level[1])
                    data.current = item;
                item.path = (level[0] + '/' + item.lowerName + '.html').toLowerCase();
            });
            break;
        }

    // 如果是JS组件，使用jsdoc解析../src目录下的js代码生成API
    if(level[0].slice(0, 2) === 'js') {
        var jsFile = __dirname + '/../src/js/' + level[0].slice(2, 20).toLowerCase() + '/' + level[1] + '.js';

        // @TODO
        if(level[1] === 'validation')
            jsFile = __dirname + '/../src/js/util/validation.js';
        else if(level[1] === 'draggable' || level[1] === 'droppable')
            jsFile = __dirname + '/../node_modules/regular-ui-dragdrop/src/' + level[1] + '.js';

        if(fs.existsSync(jsFile))
            data.api = jsdoc.render(jsFile, template.jsApi);
    }

    var tpl = template.head + '<div class="g-bd"><div class="g-bdc">' + template.sidebar + template.main + '</div></div>' + template.foot;

    var htmlPath = __dirname + '/view/' + path + '.html';
    var ejsPath = __dirname + '/view/' + path + '.ejs';
    var mdPath = __dirname + '/view/' + path + '.md';
    
    if(fs.existsSync(htmlPath))
        tpl = template.head + fs.readFileSync(htmlPath) + template.foot;
    else if(fs.existsSync(ejsPath))
        tpl = template.head + fs.readFileSync(ejsPath) + template.foot;
    else if(fs.existsSync(mdPath)) {
        // 根据./view目录下的markdown文件生成文档
        var markdown = fs.readFileSync(mdPath) + '';

        if(level[0].slice(0, 2) === 'js') {
            // 根据markdown文件中的示例代码直接生成js脚本
            data.script = premark.buildScript(markdown);
        } else {
            // 根据markdown文件中的示例代码直接生成html
            markdown = premark.placeHTML(markdown);
        }

        data.article = markextend(markdown);
    }

    // 渲染HTML文件
    var html = ejs.render(tpl, data);

    var filepath = __dirname + '/../doc/' + path.toLowerCase() + '.html';
    var filedir = pathlib.dirname(filepath);
    if(!fs.existsSync(filedir))
        fs.mkdirSync(filedir);
    fs.writeFileSync(filepath, html, {encoding: 'utf8', mode: 0644});
    // console.log('[SUCCESS] build: ' + path);
}

module.exports = build;