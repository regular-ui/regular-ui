var fs = require('fs');
var through2 = require('through2');

module.exports = function customize(structure, type, theme) {
    return through2.obj(function(file, enc, cb) {
        var components = structure.components;
        var appends = [];

        if(type === 'css') {
            appends.push('@import "' + theme + '/base/var.mcss";');
            appends.push('@import "' + theme + '/base/base.mcss";');
            appends.push('@import "' + theme + '/base/effect.mcss";');
        }

        for(var key in components) {
            var component = components[key];

            // Check Requires
            if(component.requires && !component.requires.every(function(req) {
                return components[req];
            }))
                throw 'Error: Cannot find ' + component.requires + ' in `structure.js`! ' + key + ' requires ' + component.requires + '!';

            if(component.type.indexOf(type) < 0)
                continue;

            // Check file exists.
            var filepath, fullpath, corepath, fullCorepath;
            if(type === 'js') {
                filepath = component.category + '/' + component.lowerName +'.js';
                fullpath = './src/js/' + filepath;
                
                if(!fs.existsSync(fullpath))
                    throw 'Error: Cannot find ' + fullpath + '.';

                filepath = './' + filepath;
            } else {
                filepath = theme + '/' + component.category + '/' + component.lowerName +'.mcss';
                fullpath = './src/mcss/' + filepath;
                corepath = 'core/' + component.category + '/' + component.lowerName +'.mcss';
                fullCorepath = './src/mcss/' + corepath;

                if(!fs.existsSync(fullpath)) {
                    if(!fs.existsSync(fullCorepath))
                        throw 'Error: Cannot find files:\n    ' + fullpath + '\n    ' + fullCorepath;
                    else
                        filepath = corepath;
                }

            }

            if(type === 'js')
                appends.push('exports.' + key + ' =  require("' + filepath + '");');
            else
                appends.push('@import "' + filepath + '";');
        }

        file.contents = Buffer.concat([file.contents, new Buffer(appends.join('\n'))]);
        this.push(file);
        cb();
    });
}