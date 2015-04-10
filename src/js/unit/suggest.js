var Component = require('../base/component.js');
var template = require('./suggest.html');
var _ = require('../base/util.js');
var ListBox = require('./listBox.js');

/**
 * @class Suggest
 * @extend Component
 * @param {Object}
 *     options.data 可选参数
 *         .selected 当前选中对象
 *         .value 当前选中对象的id，默认项的id为-1
 *         .defaultOption 默认项，如果为null则没有默认项
 *         .options 下拉列表中的选项
 *         .disabled 是否禁用
 *         .open 下拉列表展开
 *         .suggest 是否自动提示
 *         .minLength 当输入长度>=此值时提示
 *         .matchType 匹配方式，'all'表示全局匹配，'start'表示开头匹配，'end'表示结尾匹配
 * @Event on-change 当value改变时发生 {selected}
 */
var Suggest = Component.extend({
    name: 'suggest',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            source: [],
            selected: null,
            placeholder: '请输入',
            open: false,
            disabled: false,
            minLength: 0,
            delay: 300,
            matchType: 'all',
            value: '',
            strict: false
        });
        this.supr();
    },
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
    toggle: function(open, _isInput) {
        if(this.data.disabled)
            return;

        this.data.open = open;


        var index = Suggest.opens.indexOf(this);
        if(open && index < 0)
            Suggest.opens.push(this);
        else if(!open && index >= 0) {
            Suggest.opens.splice(index, 1);

            if(!_isInput && this.data.strict)
               this.data.value = this.data.selected ? this.data.selected.name : '';
        }
    },
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

// 处理点击suggest之外的地方后的收起事件。
Suggest.opens = [];

_.addEvent(window.document, 'click', function(e) {
    Suggest.opens.forEach(function(suggest) {
        var element = suggest.$refs.element;
        var element2 = e.target;
        while(element2 != document.body) {
            if(element == element2)
                return;
            element2 = element2.parentElement;
        }
        suggest.toggle(false);
        suggest.$update();
    });
});

module.exports = Suggest;