/**
 * ------------------------------------------------------------
 * TextArea2   输入扩展
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

var Input2 = require('./input2.js');
var template = require('./textarea2.html');
var _ = require('regular-ui-base/src/_');

/**
 * @class TextArea2
 * @extend Input2
 * @param {object}                  options.data                     =  绑定属性
 * @param {string=''}               options.data.value              <=> 文本框的值
 * @param {string=''}               options.data.placeholder         => 占位符
 * @param {string=''}               options.data.state              <=> 文本框的状态
 * @param {number}                  options.data.maxlength           => 文本框的最大长度
 * @param {object[]=[]}             options.data.rules               => 验证规则
 * @param {boolean=false}           options.data.autofocus           => 是否自动获得焦点
 * @param {boolean=false}           options.data.readonly            => 是否只读
 * @param {boolean=false}           options.data.disabled            => 是否禁用
 * @param {boolean=true}            options.data.visible             => 是否显示
 * @param {string=''}               options.data.class               => 补充class
 */
var TextArea2 = Input2.extend({
    name: 'textarea2',
    template: template,
    /**
     * @protected
     */
    // config: function() {}
});

module.exports = TextArea2;