'use strict';

var _ = require('./_.js');

exports['z-crt'] = function(elem, value) {
    if(typeof value === 'object' && value.type == 'expression')
        this.$watch(value, function(newValue, oldValue) {
            _.dom[newValue ? 'addClass' : 'delClass'](elem, 'z-crt');
        });
    else if(!!value || value === '')
        _.dom.addClass(elem, 'z-crt');
}

exports['z-sel'] = function(elem, value) {
    if(typeof value === 'object' && value.type == 'expression')
        this.$watch(value, function(newValue, oldValue) {
            _.dom[newValue ? 'addClass' : 'delClass'](elem, 'z-sel');
        });
    else if(!!value || value === '')
        _.dom.addClass(elem, 'z-sel');
}

exports['z-dis'] = function(elem, value) {
    if(typeof value === 'object' && value.type == 'expression')
        this.$watch(value, function(newValue, oldValue) {
            _.dom[newValue ? 'addClass' : 'delClass'](elem, 'z-dis');
        });
    else if(!!value || value === '')
        _.dom.addClass(elem, 'z-dis');
}

exports['r-show'] = function(elem, value) {
    if(typeof value === 'object' && value.type == 'expression')
        this.$watch(value, function(newValue, oldValue) {
            if(!newValue == !oldValue)
                return;

            if(typeof newValue === 'string')
                elem.style.display = newValue;
            else
                elem.style.display = newValue ? 'block' : '';
        });
    else if(!!value || value === '') {
        if(typeof value === 'string' && value !== '')
            elem.style.display = value;
        else
            elem.style.display = value ? 'block' : '';
    }
}

exports['r-autofocus'] = function(elem, value) {
    setTimeout(function() {
        elem.focus();
    }, 0);
}

exports['r-attr'] = function(elem, value) {
    var attrs = {
        'INPUT': ['autocomplete', 'autofocus', 'checked', 'disabled', 'max', 'maxlength', 'min', 'multiple', 'name', 'pattern', 'placeholder', 'readonly', 'required', 'step', 'type'],
        'TEXTAREA': ['autofocus', 'disabled', 'maxlength', 'name', 'placeholder', 'readonly', 'required', 'wrap'],
        'SELECT': ['autofocus', 'disabled', 'multiple', 'name', 'required']
    }

    this.$watch(value, function(newValue, oldValue) {
        attrs[elem.tagName].forEach(function(attr) {
            if(newValue[attr])
                _.dom.attr(elem, attr, newValue[attr]);
        });
    }, true);
}

// var dragDropMgr = {
//     dragData: null,
//     isDragging: function() {return !!this.dragData}
// }

// exports['r-draggable'] = function(elem, value) {
//     var onMouseDown = function($event) {
//         $event.preventDefault();

//         _.dom.on(document.body, 'mousemove', onMouseMove);
//         _.dom.on(document.body, 'mouseup', onMouseUp);

//         dragDropMgr.dragData = {
//             dragging: false,
//             pageX: $event.pageX,
//             pageY: $event.pageY,
//             source: elem,
//             data: typeof value === 'object' ? this.$get(value) : value,
//             cancel: cancel
//         }
//     }.bind(this);

//     var onMouseMove = function($event) {
//         if(!dragDropMgr.dragData)
//             return;

//         $event.preventDefault();
//         if(dragDropMgr.dragData.dragging === false) {
//             dragDropMgr.dragData.dragging = true;

//             _.dom.emit(elem, 'dragstart', dragDropMgr.dragData);
//         } else {
//             dragDropMgr.dragData.deltaX = $event.pageX - dragDropMgr.dragData.pageX;
//             dragDropMgr.dragData.deltaY = $event.pageY - dragDropMgr.dragData.pageY;
//             dragDropMgr.dragData.pageX = $event.pageX;
//             dragDropMgr.dragData.pageY = $event.pageY;

//             _.dom.emit(elem, 'drag', dragDropMgr.dragData);
//         }
//     }.bind(this);

//     var onMouseUp = function($event) {
//         if(!dragDropMgr.dragData)
//             return;

//         $event.preventDefault();
//         _.dom.emit(elem, 'dragend', dragDropMgr.dragData);
//         cancel();
//     }.bind(this);

//     var cancel = function() {
//         _.dom.on(document.body, 'mousemove', onMouseMove);
//         _.dom.on(document.body, 'mouseup', onMouseUp);
//         dragDropMgr.dragData = null;
//     }

//     _.dom.on(elem, 'mousedown', onMouseDown);
// }

// exports['r-droppable'] = function(elem, value) {
//     var onMouseEnter = function($event) {
//         if(!dragDropMgr.dragData || !dragDropMgr.dragData.dragging)
//             return;

//         $event.preventDefault();

//         console.log($event.target);
//         _.dom.emit(elem, 'dragenter', {
//             pageX: $event.pageX,
//             pageY: $event.pageY,
//             source: elem
//         });
//     }.bind(this);

//     var onMouseOver = function($event) {
//         if(!dragDropMgr.dragData || !dragDropMgr.dragData.dragging)
//             return;

//         $event.preventDefault();
//         _.dom.emit(elem, 'dragover', {
//             pageX: $event.pageX,
//             pageY: $event.pageY,
//             source: elem
//         });
//     }.bind(this);

//     var onMouseLeave = function($event) {
//         if(!dragDropMgr.dragData || !dragDropMgr.dragData.dragging)
//             return;

//         $event.preventDefault();
//         _.dom.emit(elem, 'dragleave', {
//             pageX: $event.pageX,
//             pageY: $event.pageY,
//             source: elem
//         });
//     }.bind(this);

//     var onMouseUp = function($event) {
//         if(!dragDropMgr.dragData || !dragDropMgr.dragData.dragging)
//             return;

//         $event.preventDefault();
//         _.dom.emit(elem, 'drop', dragDropMgr.dragData);
//     }.bind(this);

//     _.dom.on(elem, 'mouseenter', onMouseEnter);
//     _.dom.on(elem, 'mouseover', onMouseOver);
//     _.dom.on(elem, 'mouseleave', onMouseLeave);
//     _.dom.on(elem, 'mouseup', onMouseUp);
// }