#!/usr/bin/env node

var fs = require('fs');
var ejs = require('ejs');

function parse(path) {
    var rule = {
        block: /\/\*\*\s+([\s\S]*?)\s+\*\//g,
        infoline: /^-+$/,
        type: /^@(class|method|event)\s+(.+?)(?:\s+(.+?))?$/,
        map: /^@(extend|version)\s+(.+?)$/,
        flag: /^@(public|private|static|override)$/,
        param: /^@param\s+\{(.+?)(?:=(.*?))?\}\s+(.+?)(?:\s+(.+?))?$/,
        property: /^@property\s+\{(.+?)\}\s+(.+?)(?:\s+(.+?))?$/,
        author: /^@author\s+(.+?)$/,
    }

    var content = fs.readFileSync(path, {encoding: 'utf8'});

    var tokens = [];
    var cap;
    while(cap = rule.block.exec(content)) {
        var token = {
            type: null,
            params: [],
            properties: []
        };
        var lines = cap[1].split('\n');
        for(var i = 0; i < lines.length; i++) {
            var line = lines[i].replace(/^\s*\*\s*/, '').replace(/\s*$/, '');

            var cap2;

            // Type
            if(rule.infoline.exec(line)) {
                token.type = 'info';
            }

            if(cap2 = rule.type.exec(line)) {
                token.type = cap2[1];
                token.name = cap2[2].replace(/,/g, ', ');
                token.lowerName = token.name[0].toLowerCase() + token.name.slice(1);
                token.description = cap2[3];
            }

            if(cap2 = rule.map.exec(line)) {
                token[cap2[1]] = cap2[2];
            }

            if(cap2 = rule.flag.exec(line)) {
                token[cap2[1]] = true;
            }

            if(cap2 = rule.param.exec(line)) {
                token.params.push({
                    name: cap2[3].replace(/^options\./, ''),
                    type: cap2[1].replace(/\|/g, ' | '),
                    default_: cap2[2],
                    description: cap2[4]
                });
            }

            if(cap2 = rule.property.exec(line)) {
                token.properties.push({
                    name: cap2[2].replace(/^options\./, ''),
                    type: cap2[1].replace(/\|/g, ' | '),
                    description: cap2[3]
                });
            }
        }

        if(token.type)
            tokens.push(token);
    }

    return tokens;
}

function render(path, tpl) {
    var tokens = parse(path);
    var data = {
        class_: null,
        methods: [],
        staticMethods: [],
        events: []
    };

    for(var i = 0; i < tokens.length; i++) {
        var token = tokens[i];
        if(token.type === 'class' && !data.class_)
            data.class_ = token;
        else if(token.type === 'method' && !token['static'])
            data.methods.push(token);
        else if(token.type === 'method' && token['static'])
            data.staticMethods.push(token);
        else if(token.type === 'event')
            data.events.push(token);
    }

    return data.class_ ? ejs.render(tpl, data) : '';
}

exports.render = render;