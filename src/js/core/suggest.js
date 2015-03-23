var BaseComponent = require('./base.js');
var template = require('./suggest.html');
var _ = require('./util.js');

/**
 * @class Suggest
 * @extend BaseComponent
 * @param {Object}
 *     options.data 可选参数
 *         .selected 当前选中对象
 *         .value 当前选中对象的id，默认项的id为-1
 *         .defaultOption 默认项，如果为null则没有默认项
 *         .options 下拉列表中的选项
 *         .disabled 是否禁用
 *         .show 下拉列表展开
 *         .suggest 是否自动提示
 *         .suggestStart 当输入长度>=此值时提示
 *         .matchType 匹配方式，'all'表示全局匹配，'start'表示开头匹配，'end'表示结尾匹配
 * @Event on-change 当value改变时发生 {selected}
 */
var Suggest = BaseComponent.extend({
    name: 'suggest',
    template: template,
    config: function() {
        _.extend(this.data, {
            selected: {},
            value: -1,
            options: [],
            defaultOption: '请选择',
            disabled: false,
            show: false,
            suggestStart: 0,
            matchType: 'all',
            _hasId: false,
            _inputValue: ''
        });
        this.supr();

        this.$watch('options', function(value) {
            this.data._hasId = (value && value[0].id !== undefined);
        });

        this.$watch('value', function(newValue, oldValue) {
            if(this.data._hasId) {
            if(!this.data.defaultOption && this.data.value == -1)
                newValue = this.data.value = this.data.options[0].id;

                if(newValue < 0) {
                    this.data.selected = {id: -1, name: this.data.defaultOption};
                    this.data._inputValue = '';
                } else {
                    for(var i = 0; i < this.data.options.length; i++)
                        if(this.data.options[i].id == newValue) {
                            this.data.selected = this.data.options[i];
                            break;
                        }
                    this.data._inputValue = this.data.selected.name;
                }
            } else {
                if(newValue < 0)
                    this.data.selected = this.data.defaultOption;
                else
                    this.data.selected = this.data.options[newValue];
            }
            var $event = {
                data: {
                    newValue: newValue,
                    oldValue: oldValue,
                    selected: this.data.selected
                }
            }
            this.$emit('change', this.data.selected);
            this.$emit('change2', $event);
        });
    },
    select: function(id) {
        var $event = {
            cancelChange: false,
            data: {
                newValue: id,
                oldValue: this.data.value,
            }
        }
        this.$emit('select', $event);
        
        this.toggle(false);
        if($event.cancelChange)
            return;

        this.data.value = id;
    },
    toggle: function(show, _isInput) {
        if(this.data.disabled)
            return;

        if(this.data.show == show)
            return;


        var index = Suggest.suggestsShow.indexOf(this);
        if(show && index < 0)
            Suggest.suggestsShow.push(this);
        else if(!show && index >= 0) {
            Suggest.suggestsShow.splice(index, 1);

            if(!_isInput) {
                if(this.data.value == -1)
                    this.data._inputValue = '';
                else
                    this.data._inputValue = this.data.selected.name;
            }
        }
        this.data.show = show;
    },
    input: function($event) {
        var inputValue = this.data._inputValue;

        if(inputValue.length >= this.data.suggestStart)
            this.toggle(true);
        else
            this.toggle(false, true);
    },
    uninput: function() {

    },
    filter: function(option) {
        var inputValue = this.data._inputValue;

        if(!inputValue && this.data.suggestStart)
            return false;

        if(this.data.matchType == 'all')
            return option.name.indexOf(inputValue) >= 0;
        else if(this.data.matchType == 'start')
            return option.name.slice(0, inputValue.length) == inputValue;
        else if(this.data.matchType == 'end')
            return option.name.slice(-inputValue.length) == inputValue;
    }
});

Suggest.suggestsShow = [];

_.addEvent(window.document, 'click', function(e) {
    Suggest.suggestsShow.forEach(function(suggest) {
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