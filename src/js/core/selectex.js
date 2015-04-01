/*
 * --------------------------------------------
 * 下拉列表UI
 * @version  1.0
 * @author   zhaoyusen(hzzhaoyusen@corp.netease.com)
 * --------------------------------------------
 * @class Selectex
 * @extend Component
 * @param {Object} options
 *     options.value             
 *              
 */

var Component = require('./component.js');
var template = require('./selectex.html');
var _ = require('./util.js');

var Selectex = Component.extend({
    name: 'selectex',
    template: template,
    config: function() {
        _.extend(this.data, {
            source: [],
            selected: null,
            placeholder: '请选择',
            open: false,
            disabled: false,
            multiple: false
        });
        this.supr();
    },
    select: function(item) {
        this.data.selected = item;
        this.toggle(false);
        this.$emit('select', {
            selected: item
        })
    },
    toggle: function(open) {
        if(this.data.disabled)
            return;
        
        this.data.open = open;

        var index = Selectex.opens.indexOf(this);
        if(open && index < 0)
            Selectex.opens.push(this);
        else if(!open && index >= 0)
            Selectex.opens.splice(index, 1);
    }
});

Selectex.opens = [];

_.addEvent(window.document, 'click', function(e) {
    Selectex.opens.forEach(function(selectex) {
        var element = selectex.$refs.element;
        var element2 = e.target;
        while(element2) {
            if(element == element2)
                return;
            element2 = element2.parentElement;
        }
        selectex.toggle(false);
        selectex.$update();
    });
});

module.exports = Selectex;