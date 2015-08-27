/**
 * ------------------------------------------------------------
 * Gotop  回到顶部
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../base/component.js');
var template = require('./gotop.html');
var _ = require('../base/util.js');

/**
 * @class Gotop
 * @param {object}                  options.data                    绑定属性
 * @param {string='bottomright'}    options.data.position           组件的位置，可选参数：`topcenter`、`topleft`、`topright`、`bottomcenter`、`bottomleft`、`bottomright`、`static`
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 */
var Gotop = Component.extend({
    name: 'gotop',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            position: 'bottomright'
        });
        this.supr();
    },
    /**
     * @method gotop() 回到顶部
     * @public
     * @return {void}
     */
    gotop: function() {
        if(this.data.readonly || this.data.disabled)
            return;

        document.body.scrollTop = 0;
    }
});

module.exports = Gotop;