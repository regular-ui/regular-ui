/**
 * ------------------------------------------------------------
 * Suggest   自动提示
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var DropDown = require('./dropDown.js');
var template = require('./suggest.html');
var _ = require('../base/util.js');
var ListBox = require('./listBox.js');

/**
 * @class Suggest
 * @extend DropDown
 * @param {object}                  options.data                    绑定属性
 * @param {object[]=[]}             options.data.source             数据源
 * @param {number}                  options.data.source[].id        每项的id
 * @param {string}                  options.data.source[].name      每项的内容
 * @param {object=null}             options.data.selected           当前选择项
 * @param {string=''}               options.data.value              文本框中的值
 * @param {string='请输入'}         options.data.placeholder        文本框默认文字
 * @param {number=0}                options.data.minLength          最小提示长度。当输入长度>=该值后开始提示
 * @param {string='all'}            options.data.matchType          匹配方式，`all`表示匹配全局，`start`表示只匹配开头，`end`表示只匹配结尾
 * @param {boolean=false}           options.data.strict             是否为严格模式。当为严格模式时，`value`属性必须在source中选择，否则为空。
 * @param {boolean=false}           options.data.readonly           文本框是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用该组件
 * @param {string=''}               options.data.class              补充class
 * @param {object}                  options.service                 数据服务
 */
var Suggest = DropDown.extend({
    name: 'suggest',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            // @inherited open: false,
            selected: null,
            value: '',
            placeholder: '请输入',
            minLength: 0,
            delay: 300,
            matchType: 'all',
            strict: false,
            readonly: false,
            // @inherited disabled: false,
        });
        this.supr();
    },
    /**
     * @method select(item) 选择某一项
     * @public
     * @param  {object} item 选择项
     * @return {void}
     */
    select: function(item) {
        this.$update('selected', item);
        this.data.value = item.name;
        //this.data.selected = item;
        /**
         * @event select 选择某一项时触发
         * @property {object} selected 当前选择项
         */
        this.$emit('select', {
            selected: item
        });
        this.toggle(false);
    },
    /**
     * @method toggle(open)  在展开状态和收起状态之间切换
     * @public
     * @param  {boolean} open 展开还是收起
     * @return {void}
     */
    toggle: function(open, _isInput) {
        if(this.data.disabled)
            return;

        this.data.open = open;

        /**
         * @event toggle 展开或收起状态改变时触发
         * @property {boolean} open 展开还是收起
         */
        this.$emit('toggle', {
            open: open
        });

        var index = DropDown.opens.indexOf(this);
        if(open && index < 0)
            DropDown.opens.push(this);
        else if(!open && index >= 0) {
            DropDown.opens.splice(index, 1);

            if(!_isInput && this.data.strict)
               this.data.value = this.data.selected ? this.data.selected.name : '';
        }
    },
    // 输入时
    input: function($event) {
        var value = this.data.value;

        if(value.length >= this.data.minLength)
            this.toggle(true);
        else
            this.toggle(false, true);
    },
    uninput: function($event) {

    },
    filter: function(item) {
        var value = this.data.value;

        if(!value && this.data.minLength)
            return false;

        if(this.data.matchType == 'all')
            return item.name.indexOf(value) >= 0;
        else if(this.data.matchType == 'start')
            return item.name.slice(0, value.length) == value;
        else if(this.data.matchType == 'end')
            return item.name.slice(-value.length) == value;
    }
});

module.exports = Suggest;