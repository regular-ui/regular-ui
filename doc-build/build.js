#!/usr/bin/env node

var fs = require('fs');
var ejs = require('ejs');
var markextend = require('markextend');
var codemirror = require('codemirror-highlight');

markextend.setOptions({
    highlight: function(code, lang) {
        if(lang && !codemirror.modes[lang]) {
            if(lang === 'coffee') lang = 'coffeescript';
            if(lang === 'json') lang = 'javascript';
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
})

function build(path) {
    var sitemap = require('./sitemap.json');

    var mainnavs = [];
    for(var i = 0; i < sitemap.children.length; i++) {
        sitemap.children[i].path = sitemap.children[i].name + '/index.html';
        mainnavs.push(sitemap.children[i]);
    }

    var $head = fs.readFileSync(__dirname + '/view/common/head.ejs', {encoding: 'utf8'});
    var $sidebar = fs.readFileSync(__dirname + '/view/common/sidebar.ejs', {encoding: 'utf8'});
    var $main = fs.readFileSync(__dirname + '/view/common/main.ejs', {encoding: 'utf8'});
    var $foot = fs.readFileSync(__dirname + '/view/common/foot.ejs', {encoding: 'utf8'});

    var level = path.split('/');
    if(path === 'index')
        level = ['start', 'index'];

    var sidenavs;
    for(var i = 0; i < sitemap.children.length; i++)
        if(sitemap.children[i].name === level[0]) {
            sidenavs = sitemap.children[i].children;
            for(var j = 0; j < sidenavs.length; j++) {
                var item = sidenavs[j];
                item.upperName = item.name[0].toUpperCase() + item.name.slice(1);
                item.path = level[0] + '/' + item.name + '.html';
            }
            break;
        }

    var data = {
        sitemap: sitemap,
        mainnavs: mainnavs,
        sidenavs: sidenavs,
        relativePath: '../',
        mainnav: level[0],
        sidenav: level[1]
    }

    if(path === 'index') {
        data.relativePath = '';
        data.mainnav = null;
        data.sidenav = null;
    }


    var md = __dirname + '/view/' + path + '.md';
    data.article = fs.existsSync(md) ? markextend(fs.readFileSync(md) + '') : '';

    var script = __dirname + '/view/' + path + '.js';
    data.script = fs.existsSync(script) ? fs.readFileSync(script) : '';

    var tpl = $head + $sidebar + $main + $foot;
    var html = ejs.render(tpl, data);

    fs.writeFileSync(__dirname + '/../doc/' + path + '.html', html, {encoding: 'utf8', mode: 0644});
    // console.log('[SUCCESS] build: ' + path);
}

module.exports = build;