/**
 * ------------------------------------------------------------
 * Pager     分页
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

var Component = require('regular-ui-base/src/component');
var template = require('text!./pager.html');
var _ = require('regular-ui-base/src/_');

/**
 * @class Pager
 * @extend Component
 * @param {object}                  options.data                     =  绑定属性
 * @param {number=1}                options.data.current            <=> 当前页
 * @param {total=11}                options.data.total               => 总页数
 * @param {string='center'}         options.data.position            => 分页的位置，可选参数：`center`、`left`、`right`
 * @param {middle=5}                options.data.middle              => 当页数较多时，中间显示的页数
 * @param {side=2}                  options.data.side                => 当页数较多时，两端显示的页数
 * @param {boolean=false}           options.data.readonly            => 是否只读
 * @param {boolean=false}           options.data.disabled            => 是否禁用
 * @param {boolean=true}            options.data.visible             => 是否显示
 * @param {string=''}               options.data.class               => 补充class
 */
var Pager = Component.extend({
    name: 'pager',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            current: 1,
            total: 11,
            position: 'center',
            middle: 5,
            side: 2,
            _start: 1,
            _end: 5
        });
        this.supr();

        this.$watch(['current', 'total'], function(current, total) {
            this.data.current = current = +current;
            this.data.total = total = +total;
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

        this.$watch(['middle', 'side'], function(middle, side) {
            this.data.middle = +middle;
            this.data.side = +side;
        });
    },
    /**
     * @method select(page) 选择某一页
     * @public
     * @param  {object} page 选择页
     * @return {void}
     */
    select: function(page) {
        if(this.data.readonly || this.data.disabled)
            return;

        if(page < 1) return;
        if(page > this.data.total) return;
        if(page == this.data.current) return;

        this.data.current = page;
        /**
         * @event select 选择某一页时触发
         * @property {object} source 事件发起对象
         * @property {object} current 当前选择页
         */
        this.$emit('select', {
            source: this,
            current: this.data.current
        });
    }
});

module.exports = Pager;