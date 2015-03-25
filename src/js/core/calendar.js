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
var template = require('./calendar.html');
var _ = require('./util.js');

var Calendar = BaseComponent.extend({
    name: 'calendar',
    template: template,
    config: function() {
        _.extend(this.data, {
            selected: null,
            disabled: false,
            days: []
        });
        this.supr();

        this.back();
        //this.update();
    },
    addYear: function(year) {
        this.data.selected.setFullYear(this.data.selected.getFullYear() + year);
        this.update();
    },
    addMonth: function(month) {
        this.data.selected.setMonth(this.data.selected.getMonth() + month);
        this.update();
    },
    update: function() {
        this.data.days = [];
        
        var selected = this.data.selected;
        var month = selected.getMonth();
        var mfirst = new Date(selected); mfirst.setDate(1);
        var mfirstTime = mfirst.getTime();
        var nfirst = new Date(selected); nfirst.setMonth(month + 1); nfirst.setDate(1);
        var nfirstTime = nfirst.getTime();
        var lastTime = nfirstTime + (6 - nfirst.getDay())*24*3600*1000;
        var num = - mfirst.getDay();
        var dateTime, date;
        do {
            dateTime = mfirstTime + (num++)*24*3600*1000;
            date = new Date(dateTime);
            this.data.days.push(date);
        } while(dateTime < lastTime);
    },
    select: function(item) {
        var month = this.data.selected.getMonth();
        if(item.getMonth() != month)
            return;

        this.data.selected = item;
        this.$emit('select', {
            selected: item
        })
    },
    back: function() {
        this.data.selected = new Date(new Date().toLocaleDateString());
        this.update();
    }
});

module.exports = Calendar;