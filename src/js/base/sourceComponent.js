'use strict';

var Component = require('./component.js');
var _ = require('./util.js');

/**
 * @class SourceComponent
 * @extend Component
 * @param {object}                  options.service                 数据服务
 */
var SourceComponent = Component.extend({
    service: null,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            source: []
        });

        if(this.data.service)
            this.service = this.data.service;

        if(this.service)
            this.$updateSource();

        this.supr();
    },
    /**
     * @method getParams 返回请求时需要的参数
     * @protected
     * @return {object}
     */
    getParams: function() {
        return {};
    },
    /**
     * @method $updateSource 从service中更新数据源
     * @public
     * @return {SourceComponent} this
     */
    $updateSource: function() {
        this.service.getList(this.getParams(), function(data) {
            if(data.code != 200 && !data.success)
                return alert(data.result);

            this.$update('source', data.result);
        }.bind(this));
        return this;
    }
});

module.exports = SourceComponent;