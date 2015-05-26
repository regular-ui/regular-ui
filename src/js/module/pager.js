/**
 * ------------------------------------------------------------
 * Pager     分页
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

var Component = require('../base/component.js');
var template = require('./pager.html');
var _ = require('../base/util.js');

/**
 * @class Pager
 * @extend Component
 * @param {object}                  options.data                    监听数据
 * @param {number=1}                options.data.current            当前页
 * @param {total=11}                options.data.total              总页数
 * @param {middle=5}                options.data.middle             当页数较多时，中间显示的页数
 * @param {side=2}                  options.data.side               当页数较多时，两端各显示的页数
 * @param {boolean=false}           options.data.disabled           是否禁用该组件
 * @param {string=''}               options.data.class              补充class
 */
var Pager = Component.extend({
    name: 'pager',
    template: template,
    config: function() {
        _.extend(this.data, {
            current: 1,
            total: 11,
            middle: 5,
            side: 2,
            disabled: false
        });
    },
    getMiddle: function() {
        var start = ((this.data.total - this.data.middle)>>1) + 1;
        var list = [];
        for(var i = 0; i < this.data.middle; i++)
            list.push(start + i);
        return list;
    },
    select: function(page) {
        if(this.data.disabled)
            return;

        if(page < 1) return;
        if(page > this.data.total) return;
        if(page == this.data.current) return;

        this.data.current = page;

        this.$emit('select', {
            current: this.data.current
        });
    }
});

module.exports = Pager;