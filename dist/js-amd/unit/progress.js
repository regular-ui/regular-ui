define(function (require, exports, module) {/**
 * ------------------------------------------------------------
 * Progress  进度条
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../base/component.js');
var template = require('text!./progress.html');
var _ = require('../base/util.js');

/**
 * @class Progress
 * @extend Component
 * @param {object}                  options.data                    绑定属性
 * @param {number=36}               options.data.percent            百分比
 * @param {string|boolean=true}     options.data.text               在进度条中是否显示百分比。值为`string`时显示该段文字。
 * @param {string=null}             options.data.size               进度条的尺寸
 * @param {string=null}             options.data.type               进度条的类型，改变显示颜色
 * @param {boolean=false}           options.data.striped            是否显示条纹
 * @param {boolean=false}           options.data.active             进度条是否为激活状态，当`striped`为`true`时，进度条显示动画
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
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
            text: true,
            size: null,
            type: null,
            striped: false,
            active: false
        });
        this.supr();
    }
});

module.exports = Progress;
});
