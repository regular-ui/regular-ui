#!/usr/bin/env node

var build = require('./build.js');
var sitemap = require('./sitemap.json');
// var jsdoc = require('../node_modules/jsdoc/jsdoc.js');
// console.log(jsdoc);
// process.exit(0);

function buildAll() {
    var level0 = sitemap;
    build('index');
    for(var i = 0; i < level0.children.length; i++) {
        var level1 = level0.children[i];
        build(level1.name + '/index');
        for(var j = 0; j < level1.children.length; j++) {
            var level2 = level1.children[j];
            build(level1.name + '/' + level2.name);
        }
    }
}

if(!module.parent)
    buildAll();

module.exports = buildAll;
