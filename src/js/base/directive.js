'use strict';

var _ = require('./util.js');

exports['z-crt'] = function(elem, value) {
    // if(typeof value === 'object')
    //     this.$watch(value, function(newValue, oldValue) {
    //         dom[]
    //     });
    // // else if()
}

exports['r-show'] = function(elem, value) {
    this.$watch(value, function(newValue, oldValue) {
        if(!newValue == !oldValue)
            return;

        elem.style.display = newValue ? 'block' : '';
    });
}

exports['r-autofocus'] = function(elem, value) {
    setTimeout(function() {
        elem.focus();
    }, 0);
}

exports['r-scroll'] = function(elem, value) {
    this.$watch(value, function(newValue) {
        if(newValue && elem) {
            var grid_db = elem.parentElement.parentElement.parentElement;
            grid_db.scrollTop = elem.offsetTop;
        }
    });
}

exports['r-draggable'] = function(elem, value) {
    var dragging = null;
    
    function onMouseDown($event) {
        $event.preventDefault();

        _.dom.on(document.body, 'mousemove', onMouseMove);
        _.dom.on(document.body, 'mouseup', onMouseUp);

        dragging = _.dom.getDimension(elem);
        dragging.pageX = $event.pageX;
        dragging.pageY = $event.pageY;
        dragging.origin = elem;
        
        var elem2 = elem.cloneNode(true);

        elem2.style.left = dragging.left + 'px';
        elem2.style.top = dragging.top + 'px';
        elem2.style.position = 'fixed';
        elem2.style.zIndex = '2000';

        dragging.cloned = elem2;

        document.body.appendChild(elem2);
        document.body.style.cursor = 'move';
    }

    function onMouseMove($event) {
        if(dragging && $event.which == 1) {
            $event.preventDefault();

            dragging.left += $event.pageX - dragging.pageX;
            dragging.top += $event.pageY - dragging.pageY;
            dragging.pageX = $event.pageX;
            dragging.pageY = $event.pageY;

            dragging.cloned.style.left = dragging.left + 'px';
            dragging.cloned.style.top = dragging.top + 'px';
        }
    }

    function onMouseUp($event) {
        if(dragging) {
            $event.preventDefault();

            _.dom.off(document.body, 'mousemove', onMouseMove);
            _.dom.off(document.body, 'mouseup', onMouseUp);

            document.body.removeChild(dragging.cloned);
            document.body.style.cursor = 'default';
            dragging = null;
        }
    }

    if(typeof value === 'object')
        this.$watch(value, function(newValue, oldValue) {
            if(newValue)
                _.dom.on(elem, 'mousedown', onMouseDown);
            else
                _.dom.off(elem, 'mousedown', onMouseDown);
        });
    else if(!!value)
        _.dom.on(elem, 'mousedown', onMouseDown);
}