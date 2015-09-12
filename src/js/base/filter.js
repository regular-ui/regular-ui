'use strict';

var filter = {};

filter.format = (function() {
    function fix(str) {
        str = '' + (String(str) || '');
        return str.length <= 1? '0' + str : str;
    }
    var maps = {
        'yyyy': function(date){return date.getFullYear()},
        'MM': function(date){return fix(date.getMonth() + 1); },
        'dd': function(date){ return fix(date.getDate()) },
        'HH': function(date){return fix(date.getHours()) },
        'mm': function(date){ return fix(date.getMinutes())},
        'ss': function(date){ return fix(date.getSeconds())}
    }

    var trunk = new RegExp(Object.keys(maps).join('|'),'g');
    return function(value, format){
        if(!value){return '';}
        format = format || 'yyyy-MM-dd HH:mm';
        value = new Date(value);

        return format.replace(trunk, function(capture){
            return maps[capture]? maps[capture](value): '';
        });
    }
}());

filter.average = function(array, key) {
    array = array || [];
    return array.length? filter.total(array, key) / array.length : 0;
}
filter.total = function(array, key) {
    var total = 0;
    if(!array) return;
    array.forEach(function( item ){
        total += key? item[key] : item;
    })
    return total;
}

filter.filter = function(array, filterFn) {
    if(!array || !array.length) return;
    return array.filter(function(item, index){
        return filterFn(item, index);
    })
}

module.exports = filter;