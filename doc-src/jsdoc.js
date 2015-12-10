#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var ejs = require('ejs');

function parse(filepath) {
    var rule = {
        block: /\/\*\*\s+([\s\S]*?)\s+\*\//g,
        infoline: /^-+$/,
        type: /^@(class|method|event)\s+(.+?)(?:\s+(.+?))?$/,
        method: /^(.+?)\((.*)\)$/,
        map: /^@(extend|version)\s+(.+?)$/,
        flag: /^@(public|private|static|override|ignore|deprecated)$/,
        param: /^@param\s+\{(.+?)(?:=(.*?))?\}\s+(.+?)(?:\s+(.=.))?(?:\s+(.+?))?$/,
        return_: /^@return\s+\{(.+?)\}\s+(.+?)(?:\s+(.+?))?$/,
        property: /^@property\s+\{(.+?)\}\s+(.+?)(?:\s+(.+?))?$/,
        author: /^@author\s+(.+?)$/,
    }

    var content = fs.readFileSync(filepath, {encoding: 'utf8'});

    var tokens = [];
    var baseClass = null;
    var cap;
    while(cap = rule.block.exec(content)) {
        var token = {
            type: null,
            params: [],
            return_: null,
            properties: []
        };
        var lines = cap[1].split('\n');
        lines.forEach(function(line) {
            line = line.replace(/^\s*\*\s*/, '').replace(/\s*$/, '');

            var cap2;

            // Type
            if(rule.infoline.exec(line)) {
                token.type = 'info';
            }

            if(cap2 = rule.type.exec(line)) {
                token.type = cap2[1];
                token.name = cap2[2];
                token.lowerName = token.name[0].toLowerCase() + token.name.slice(1);
                token.description = cap2[3];

                if(token.type === 'method') {
                    var match = token.name.match(rule.method);

                    if(match) {
                        token.name = match[1];
                        token.body = match[2].replace(/,/g, ', ');
                    }
                }
            }

            if(cap2 = rule.map.exec(line)) {
                token[cap2[1]] = cap2[2];

                if(cap2[1] === 'extend')
                    baseClass = cap2[2];
            }

            if(cap2 = rule.flag.exec(line)) {
                token[cap2[1]] = true;
            }

            if(cap2 = rule.param.exec(line)) {
                token.params.push({
                    name: cap2[3].replace(/^options\./, ''),
                    type: cap2[1].replace(/\|/g, '<br>'),
                    default_: cap2[2],
                    bindWay: cap2[4],
                    description: cap2[5]
                });
            }

            if(cap2 = rule.return_.exec(line)) {
                token.return_ = {
                    name: cap2[2],
                    type: cap2[1].replace(/\|/g, '<br>'),
                    description: cap2[3]
                };
            }

            if(cap2 = rule.property.exec(line)) {
                token.properties.push({
                    name: cap2[2],
                    type: cap2[1].replace(/\|/g, '<br>'),
                    description: cap2[3]
                });
            }
        });

        if(token.type)
            tokens.push(token);
    }

    if(baseClass && baseClass !== 'Regular') {
        var basePath = content.match(new RegExp('var ' + baseClass + ' = require\\(\'(.+?)\'\\)'));
        if(basePath) {
            basePath = basePath[1];

            if(basePath.indexOf('regular-ui') >= 0)
                basePath = path.join(__dirname, '../node_modules', basePath + '.js');
            else
                basePath = path.join(filepath, '..', basePath);

            var baseTokens = parse(basePath);
            baseTokens.forEach(function(token) {
                if(token.type === 'method' || token.type === 'event') {
                    token.inherited = true;
                    tokens.push(token);
                }
            });
        }        
    }

    return tokens;
}

function render(filepath, tpl) {
    var tokens = parse(filepath);
    var data = {
        class_: null,
        methods: [],
        staticMethods: [],
        inheritedMethods: [],
        events: [],
        inheritedEvents: []
    };

    tokens.forEach(function(token) {
        if(token.type === 'class' && !data.class_)
            data.class_ = token;
        else if(token.type === 'method' && token['public'] && !token['static'] && !token['inherited'])
            data.methods.push(token);
        else if(token.type === 'method' && token['public'] && token['static'] && !token['inherited'])
            data.staticMethods.push(token);
        else if(token.type === 'method' && token['public'] && token['inherited']) {
            data.inheritedMethods.push(token);

            if(data.methods.some(function(method) { return method.name === token.name; }))
                token.overridden = true;
        } else if(token.type === 'event' && !token['inherited'])
            data.events.push(token);
        else if(token.type === 'event' && token['inherited']) {
            data.inheritedEvents.push(token);

            if(data.events.some(function(event) { return event.name === token.name; }))
                token.overridden = true;
        }
    });

    return data.class_ ? ejs.render(tpl, data) : '';
}

exports.render = render;