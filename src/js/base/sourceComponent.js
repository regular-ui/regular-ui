/**
 * ------------------------------------------------------------
 * SourceComponent 数据组件基类
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('./component.js');
var _ = require('./_.js');

/**
 * @class SourceComponent
 * @extend Component
 * @param {object[]=[]}             options.data.source              =  数据源
 * @param {boolean=true}            options.data.updateAuto          => 当有service时，是否自动加载
 * @param {boolean=false}           options.data.readonly            => 是否只读
 * @param {boolean=false}           options.data.disabled            => 是否禁用
 * @param {boolean=true}            options.data.visible             => 是否显示
 * @param {string=''}               options.data.class               => 补充class
 * @param {object}                  options.service                 @=> 数据服务
 */
var SourceComponent = Component.extend({
    service: null,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            source: [],
            updateAuto: true
        });

        if(this.data.service)
            this.service = this.data.service;

        if(this.service && this.data.updateAuto)
            this.$updateSource();

        this.supr();
    },
    /**
     * @method getParams 返回请求时需要的参数
     * @protected
     * @deprecated
     * @return {object} object
     */
    getParams: function() {
        return {};
    },
    /**
     * @method $updateSource() 从service中更新数据源
     * @public
     * @deprecated
     * @return {SourceComponent} this
     */
    $updateSource: function() {
        this.service.getList(this.getParams(), function(result) {
            this.$update('source', result);
        }.bind(this));
        return this;
    }
});

module.exports = SourceComponent;