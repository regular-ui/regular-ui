/*
 * --------------------------------------------
 * 下拉列表UI
 * @version  1.0
 * @author   zhaoyusen(hzzhaoyusen@corp.netease.com)
 * --------------------------------------------
 * @class Selectex
 * @extend BaseComponent
 * @param {Object} options
 *     options.value             
 *              
 */

var BaseComponent = require('./base.js');
var template = require('./selectex.html');
var _ = require('./util.js');

var Selectex = BaseComponent.extend({
    name: 'selectex',
    template: template,
    data: {
        selected: null,
        value: -1,
        placeholder: '请选择',
        options: [],
        disabled: false,
        show: false,
        input: false,
        multiple: false
    },
    config: function() {
        this.$watch(['value'], function(value) {
            if(value < 0)
                this.data.selected = {id: -1, name: this.data.placeholder}
            else {
                for(var i = 0; i < this.data.options.length; i++)
                    if(this.data.options[i].id == value) {
                        this.data.selected = this.data.options[i];
                        break;
                    }
            }
            this.$emit('onChange', this.data.selected);
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