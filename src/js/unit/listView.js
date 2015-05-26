/**
 * ------------------------------------------------------------
 * ListView  列表视图
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var ListBox = require('./listBox.js');
var template = require('./listView.html');
var _ = require('../base/util.js');

/**
 * @class ListView
 * @extend ListBox
 * @param {object}                  options.data                    绑定属性
 * @param {object[]=[]}             options.data.source             数据源
 * @param {number}                  options.data.source[].id        每项的id
 * @param {string}                  options.data.source[].name      每项的内容
 * @param {object=null}             options.data.selected           当前选择项
 * @param {string=null}             options.data.itemTemplate       每一项的模板
 * @param {boolean=false}           options.data.disabled           是否禁用该组件
 * @param {string=''}               options.data.class              补充class
 * @param {object}                  options.service                 数据服务
 */
var ListView = ListBox.extend({
    name: 'listView',
    template: template,
    config: function() {
        _.extend(this.data, {
            itemTemplate: null
            // @inherited source: [],
            // @inherited selected: null,
            // @inherited disabled: false
        });
        this.supr();
    }
});

module.exports = ListView;