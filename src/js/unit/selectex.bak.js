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

var Component = require('../base/component.js');
var template = require('./selectex.html');
var _ = require('../base/util.js');

var Selectex = Component.extend({
    name: 'selectex',
    template: template,
    config: function() {
        _.extend(this.data, {
            selected: null,
            value: -1,
            placeholder: '请选择',
            options: [],
            disabled: false,
            show: false,
            input: false,
            multiple: false
        });
        this.supr();

        this.$watch('value', function(value) {
            if(value < 0)
                this.data.selected = {id: -1, name: this.data.placeholder}
            else {
                for(var i = 0; i < this.data.options.length; i++)
                    if(this.data.options[i].id == value) {
                        this.data.selected = this.data.options[i];
                        break;
                    }
            }
            setTimeout(function() {
                this.$emit('change');
            }.bind(this), 0);
        });
    },
    select: function(id) {
        //this.data.selected = option;
        this.data.value = id;
        this.toggle(false);
    },
    toggle: function(show) {
        if(this.data.disabled)
            return;

        this.data.show = show;

        var index = Selectex.selectexsShown.indexOf(this);
        if(show && index < 0)
            Selectex.selectexsShown.push(this);
        else if(!show && index >= 0)
            Selectex.selectexsShown.splice(index, 1);
    },
    dbl: function($event) {
        $event.preventDefault(); console.log('test')
    }
});

Selectex.selectexsShown = [];

_.addEvent(window.document, 'click', function(e) {
    Selectex.selectexsShown.forEach(function(selectex) {
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