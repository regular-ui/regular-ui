/**
 * ------------------------------------------------------------
 * Droppable  放置
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../base/component.js');
var template = require('text!./droppable.html');
var _ = require('../base/util.js');

/**
 * @class Droppable
 * @extend Component
 * @param {object}                  options.data                     =  绑定属性
 * @param {boolean=false}           options.data.disabled            => 是否禁用
 */
var Droppable = Component.extend({
    name: 'droppable',
    template: template,
    /**
     * @protected
     */
    // config: function() {
    //     _.extend(this.data, {
    //         dragging: false,
    //         proxy: 'clone',
    //         revert: true
    //     });
    //     this.supr();
    // }
});

module.exports = Droppable;