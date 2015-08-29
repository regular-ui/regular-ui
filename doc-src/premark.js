var rule = {
    example: /<div class="m-example"><\/div>([\s\S]+?)(?:##|$)/g,
    pre: /```(.+?)\n([\s\S]+?)\n```/g
}

function parse(content) {
    var examples = [];
    var cap, cap2;
    while(cap = rule.example.exec(content)) {
        var example = {};
        var part = cap[1];
        while(cap2 = rule.pre.exec(part))
            if(cap2[1])
                example[cap2[1]] = cap2[2];
        examples.push(example);
    }

    return examples;
}

function buildScript(content) {
    var examples = parse(content);

    var strings = [
'var index = 0;'
    ];
    examples.forEach(function(example) {
        if(!example.xml)
            return;

        strings.push('(function(index) {');
        strings.push('    var template = RGUI._.multiline(function(){/*');
        strings.push(         example.xml);
        strings.push('    */})');
        if(example.javascript)
            strings.push(example.javascript);
        else {
            strings.push('var component = new RGUI.Component({');
            strings.push('    template: template,');
            strings.push('});');
        }
        strings.push('    component.$inject($$(".m-example")[index]);');
        strings.push('})(index++);');
    });

    return strings.join('\n');
}

function placeHTML(content) {
    var examples = parse(content);
    var i = 0;

    return content.replace(/<div class="m-example"><\/div>/g, function() {
        return '<div class="m-example">' + examples[i++].html + '</div>';
    });
}

exports.buildScript = buildScript;
exports.placeHTML = placeHTML;