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
 * @param {side=2}                  options.data.side               当页数较多时，两端显示的页数
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
            _start: 1,
            _end: 5,
            disabled: false
        });
        this.supr();

        this.$watch(['current', 'total'], function(current, total) {
            var show = this.data.middle>>1;
            var side = this.data.side;

            this.data._start = current - show;
            this.data._end = current + show;
            if(this.data._start < side + 1)
                this.data._start = side + 1;
            if(this.data._end > total - side)
                this.data._end = total - side;
            if(current - this.data._start < show)
                this.data._end += this.data._start - current + show;
            if(this.data._end - current < show)
                this.data._start += this.data._end - current - show;
        });
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