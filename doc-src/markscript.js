function parse(content) {
    var rule = {
        example: /<div class="m-example"><\/div>([\s\S]+?)(?:####|$)/g,
        pre: /```(.+?)\n([\s\S]+?)\n```/g
    }

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

function render(content) {
    var strings = [
'var index = 0;'
    ];

    var examples = parse(content);

    examples.forEach(function(example) {
        strings.push('(function(index) {');
        strings.push('    var template = RGUI._.multiline(function(){/*');
        strings.push(         example.xml);
        strings.push('    */})');
        strings.push(     example.javascript);
        strings.push('    component.$inject($$(".m-example")[index]);');
        strings.push('})(index++);');
    });

    return strings.join('\n');
}

exports.render = render;