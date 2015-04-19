/**
 * ------------------------------------------------------------
 * ListView  列表视图
 * @version  0.0.1
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
 * @param {string=null}             options.data.itemTemplate       每一项的模板
 */
var ListView = ListBox.extend({
    name: 'listView',
    template: template,
    config: function() {
        _.extend(this.data, {
            itemTemplate: null
            // @inherited source: [],
            // @inherited selected: null,
            // @inherited disabled: false,
            // @inherited multiple: false
        });
        this.supr();
    }
});

module.exports = ListView;