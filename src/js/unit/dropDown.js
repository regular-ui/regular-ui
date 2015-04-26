/**
 * ------------------------------------------------------------
 * DropDown  下拉菜单
 * @version  0.0.1
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

var SourceComponent = require('../base/sourceComponent.js');
var template = require('./dropDown.html');
var _ = require('../base/util.js');

/**
 * @class DropDown
 * @extend SourceComponent
 * @param {object}                  options.data                    绑定属性
 * @param {object[]=[]}             options.data.source             数据源
 * @param {number}                  options.data.source[].id        每项的id
 * @param {string}                  options.data.source[].name      每项的内容
 * @param {boolean=false}           options.data.open               当前为展开/收起状态
 * @param {boolean=false}           options.data.disabled           是否禁用该组件
 * @param {string=''}               options.data.class              补充class
 */
var DropDown = SourceComponent.extend({
    name: 'dropDown',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            open: false,
            disabled: false
        });
        this.supr();
    },
    /**
     * @method toggle(open) 在展开/收起状态之间切换
     * @public
     * @param  {boolean} open 展开/收起
     * @return {void}
     */
    toggle: function(open) {
        if(this.data.disabled)
            return;
        
        this.data.open = open;

        // 根据状态在DropDown.opens列表中添加/删除管理项
        var index = DropDown.opens.indexOf(this);
        if(open && index < 0)
            DropDown.opens.push(this);
        else if(!open && index >= 0)
            DropDown.opens.splice(index, 1);
    }
});

// 处理点击dropDown之外的地方后的收起事件。
DropDown.opens = [];

_.dom.on(document.body, 'click', function(e) {
    DropDown.opens.forEach(function(dropDown) {
        // 这个地方不能用stopPropagation来处理，因为展开一个dropDown的同时要收起其他dropDown
        var element = dropDown.$refs.element;
        var element2 = e.target;
        while(element2) {
            if(element == element2)
                return;
            element2 = element2.parentElement;
        }
        dropDown.toggle(false);
        dropDown.$update();
    });
});

module.exports = DropDown;