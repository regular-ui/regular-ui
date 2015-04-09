/**
 * ------------------------------------------------------------
 * Progress  进度条
 * @version  0.0.1
 * @author   sensen(hzzhaoyusen@corp.netease.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../base/component.js');
var template = require('./progress.html');
var _ = require('../base/util.js');

/**
 * @class Progress
 * @extend Component
 * @param {object}                  options.data                    绑定属性 | Binding Properties
 * @param {number=36}               options.data.percent            百分比 | Percentage of Progress Bar
 * @param {string|boolean=true}     options.data.text               在进度条中是否显示百分比。值为`string`时显示该段文字。
 */
var Progress = Component.extend({
    name: 'progress',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            percent: 36,
            text: true
        });
        this.supr();
    }
});

module.exports = Progress;