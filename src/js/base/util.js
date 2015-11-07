'use strict';

var Regular = require('regularjs');

var _ = {
    noop: Regular.util.noop,
    dom: Regular.dom,
    multiline: function(func) {
        var reg = /^function\s*\(\)\s*\{\s*\/\*+\s*([\s\S]*)\s*\*+\/\s*\}$/;
        return reg.exec(func)[1];
    },
}

_.extend = function(o1, o2, override, hasOwnProperty) {
    for(var i in o2)
        if((!hasOwnProperty || o2.hasOwnProperty(i)) && (override || o1[i] === undefined))
            o1[i] = o2[i]
    return o1;
}


_.dom.emit = function(elem, eventName, data) {
    if(elem.dispatchEvent) {
        var event = new CustomEvent(eventName, {detail: data});
        elem.dispatchEvent(event);
    } else {
        var event = document.createEventObject();
        event.detail = data;
        elem.fireEvent('on' + eventName, event);
    }
}

_.dom.getPosition = function(elem, fixed) {
    var doc = elem && elem.ownerDocument,
        docElem = doc.documentElement,
        body = doc.body;

    var box = elem.getBoundingClientRect ? elem.getBoundingClientRect() : { top: 0, left: 0 };

    var clientTop = docElem.clientTop || body.clientTop || 0,
        clientLeft = docElem.clientLeft || body.clientLeft || 0;

    if(fixed)
        return {top: box.top - clientTop, left: box.left - clientLeft};

    var scrollTop = window.pageYOffset || docElem.scrollTop,
        scrollLeft = window.pageXOffset || docElem.scrollLeft;

    return {top: box.top + scrollTop - clientTop, left: box.left + scrollLeft - clientLeft}
}

_.dom.getOffset = function(elem) {
    var width = elem.offsetWidth;
    var height = elem.offsetHeight;

    return {width: width, height: height}
}

_.dom.getDimension = function(elem, fixed) {
    return _.extend(_.dom.getOffset(elem), _.dom.getPosition(elem, fixed));
}

_.dom.isInRect = function(position, dimension) {
    if(!position || !dimension) return false;

    return position.left > dimension.left
        && (position.left < dimension.left + dimension.width)
        && position.top > dimension.top
        && (position.top < dimension.top + dimension.height);
}

_.dom.once = function(elem, ev, handle) {
    function real() {
        handle.apply(this, arguments);
        _.dom.off(elem, ev, real);
    }
    _.dom.on(elem, ev, real);
}

module.exports = _;