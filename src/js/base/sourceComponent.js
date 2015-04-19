'use strict';

var Component = require('./component.js');
var _ = require('./util.js');

/**
 * @class SourceComponent
 * @extend Component
 * @param {object}                      options.service 数据服务
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
    getParams: function() {
        return {};
    },
    $updateSource: function(callback) {
        this.service.getList(this.getParams(), function(data) {
            if(data.code != 200 && !data.success)
                return alert(data.result);

            this.$update('source', data.result);
            callback && callback.call(this);
        }.bind(this));
        return this;
    }
});

module.exports = SourceComponent;