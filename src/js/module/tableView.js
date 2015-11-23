/**
 * ------------------------------------------------------------
 * TableView 表格视图
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var SourceComponent = require('regular-ui-base/src/sourceComponent');
var template = require('text!./tableView.html');
var _ = require('regular-ui-base/src/_');

/**
 * @class TableView
 * @extend SourceComponent
 * @param {object}                  options.data                     =  绑定属性
 * @param {object[]=[]}             options.data.source             <=> 数据源
 * @param {string}                  options.data.source[].name       => 每项的内容
 * @param {object[]=[]}             options.data.field               => 字段集
 * @param {string}                  options.data.field[].key         => 每个字段的key
 * @param {string}                  options.data.field[].name        => 每个字段在表头显示的文字，如果没有则显示key
 * @param {boolean=false}           options.data.striped             => 是否显示条纹
 * @param {boolean=false}           options.data.hover               => 是否每行在hover时显示样式
 * @param {boolean=true}            options.data.visible             => 是否显示
 * @param {string=''}               options.data.class               => 补充class
 * @param {object}                  options.service                 @=> 数据服务
 */
var TableView = SourceComponent.extend({
    name: 'tableView',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            fields: [],
            striped: false,
            hover: false,
            // TODO: 暂不考虑多字段排序
            order: {
                by: null,
                desc: false
            }
        });
        this.supr();
    },
    /**
     * @method sort(field) 按照某个字段排序
     * @public
     * @param  {object} field 排序字段
     * @return {void}
     */
    sort: function(field) {
        if(!field.sortable)
            return;

        var order = this.data.order;

        if(order.by === field.key)
            order.desc = !order.desc;
        else {
            order.by = field.key;
            order.desc = false;
        }

        if(this.service)
            this.$updateSource();
        else {
            this.data.source.sort(function(a, b) {
                if(order.desc)
                    return a[order.by] < b[order.by];
                else
                    return a[order.by] > b[order.by];
            });
        }
        /**
         * @event sort 按照某个字段排序时触发
         * @property {object} field 排序字段
         */
        this.$emit('sort', {
            field: field
        });
    }
});

module.exports = TableView;