'use strict';

var Regular = require('regularjs');

var _ = {
    extend: Regular.util.extend,
    dom: Regular.dom,
    multiline: function(func) {
        var reg = /^function\s*\(\)\s*\{\s*\/\*+\s*([\s\S]*)\s*\*+\/\s*\}$/;
        return reg.exec(func)[1];
    }
}

_.dom.getPosition = function(elem) {
    var doc = elem && elem.ownerDocument,
        docElem = doc.documentElement,
        body = doc.body, 

        box = elem.getBoundingClientRect ? elem.getBoundingClientRect() : { top: 0, left: 0 },

        clientTop = docElem.clientTop || body.clientTop || 0,
        clientLeft = docElem.clientLeft || body.clientLeft || 0,
        scrollTop = window.pageYOffset || docElem.scrollTop,
        scrollLeft = window.pageXOffset || docElem.scrollLeft;

    return {
        top: box.top + scrollTop - clientTop,
        left: box.left + scrollLeft - clientLeft
    }
}

_.dom.getOffset = function(elem) {
    var width = elem.offsetWidth;
    var height = elem.offsetHeight;

    return {width: width, height: height}
}

_.dom.getDimension = function(elem) {
    return _.extend(_.dom.getOffset(elem), _.dom.getPosition(elem));
}

_.dom.isInRect = function(position, dimension) {
    if(!position || !dimension) return false;

    return position.left > dimension.left
        && (position.left < dimension.left + dimension.width)
        && position.top > dimension.top
        && (position.top < dimension.top + dimension.height);
}

module.exports = _;