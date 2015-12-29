/**
 * ------------------------------------------------------------
 * Uploader  上传
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('regular-ui-base/src/component');
var template = require('text!./uploader.html');
var _ = require('regular-ui-base/src/_');

var compatibility = require('regular-ui-base/src/compatibility');

var SIZE_UNITS = {
    'kB': 1000,
    'MB': 1000*1000,
    'GB': 1000*1000*1000
}

/**
 * @class Uploader
 * @extend Component
 * @param {object}                  options.data                     =  绑定属性
 * @param {string=''}               options.data.title               => 按钮文字
 * @param {string=''}               options.data.url                 => 上传路径
 * @param {string='json'}           options.data.dataType            => 数据类型
 * @param {object}                  options.data.data                => 附加数据
 * @param {string='file'}           options.data.name                => 上传文件的name
 * @param {string|string[]=''}      options.data.extensions          => 可上传的扩展名。默认为空，表示可上传任意文件类型的文件；可以为字符串，多个扩展名用`,`隔开，如：'png,jpg,gif'；也可以为数组，如：['png', 'jpg', 'gif']。
 * @param {string|number=''}        options.data.maxSize             => 可上传的最大文件大小。默认为空，表示可上传任意大小的文件；如果为数字，则表示单位为字节；如果为字符串，可以添加以下单位：`kB`、`MB`、`GB`。
 * @param {boolean=false}           options.data.disabled            => 是否禁用
 * @param {boolean=true}            options.data.visible             => 是否显示
 * @param {string=''}               options.data.class               => 补充class
 */
var Uploader = Component.extend({
    name: 'uploader',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            title: '',
            url: '',
            contentType: 'multipart/form-data',
            dataType: 'json',
            data: {},
            name: 'file',
            extensions: null,
            maxSize: '',
            _sending: false,
            _id: new Date().getTime()
        });
        this.supr();
    },
    /**
     * @method upload() 弹出文件对话框并且上传文件
     * @public
     * @return {void}
     */
    upload: function() {
        if(this.data.disabled || this.data._sending)
            return;

        this.$refs.file.click();
    },
    _checkExtensions: function(file) {
        if(!this.data.extensions)
            return true;

        var fileName = file.name;
        var ext = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length).toLowerCase();

        var extensions = this.data.extensions;
        if(typeof extensions === 'string')
            extensions = extensions.split(',');
        
        if(extensions.indexOf(ext) >= 0)
            return true;

        /**
         * @event error 上传错误时触发
         * @property {object} source 事件发起对象
         * @property {object} name ExtensionError
         * @property {object} message 错误信息
         * @property {object} extensions 可上传的扩展名
         */
        this.$emit('error', {
            source: this,
            name: 'ExtensionError',
            message: '只能上传' + extensions.join(', ')　+ '类型的文件！',
            extensions: extensions
        });

        return false;
    },
    _checkSize: function(file) {
        if(!this.data.maxSize && this.data.maxSize !== 0)
            return true;

        var maxSize;
        if(!isNaN(this.data.maxSize))
            maxSize = +this.data.maxSize;
        else {
            var unit = this.data.maxSize.slice(-2);
            if(!SIZE_UNITS[unit])
                throw new Error('Unknown unit!');

            maxSize = this.data.maxSize.slice(0, -2)*SIZE_UNITS[unit];
        }

        if(file.size <= maxSize)
            return true;

        /**
         * @event error 上传错误时触发
         * @property {object} source 事件发起对象
         * @property {object} name SizeError
         * @property {object} message 错误信息
         * @property {object} maxSize 可上传的最大文件大小
         * @property {object} size 当前文件大小
         */
        this.$emit('error', {
            source: this,
            name: 'SizeError',
            message: '文件大小超出！',
            maxSize: this.data.maxSize,
            size: file.size
        });

        return false;
    },
    /**
     * @method _submit() 提交表单
     * @private
     * @return {void}
     */
    _submit: function() {
        var file = this.$refs.file.files ? this.$refs.file.files[0] : {
            name: this.$refs.file.value,
            size: 0
        };

        if(!file || !file.name || !this._checkExtensions(file) || !this._checkSize(file))
            return;

        this.data._sending = true;
        /**
         * @event sending 发送前触发
         * @property {object} source 事件发起对象
         * @property {object} data 待发送的数据
         */
        this.$emit('sending', {
            source: this,
            data: this.data.data
        });

        this.$refs.form.submit();
    },
    _onLoad: function() {
        var $iframe = this.$refs.iframe;
        var $file = this.$refs.file;

        if(!this.data._sending)
            return;
        this.data._sending = false;

        var xml = {};
        if($iframe.contentWindow) {
            xml.responseText = $iframe.contentWindow.document.body ? $iframe.contentWindow.document.body.innerHTML : null;
            xml.responseXML = $iframe.contentWindow.document.XMLDocument ? $iframe.contentWindow.document.XMLDocument : $iframe.contentWindow.document;
        } else if($iframe.contentDocument) {
            xml.responseText = $iframe.contentDocument.document.body ? $iframe.contentDocument.document.body.innerHTML : null;
            xml.responseXML = $iframe.contentDocument.document.XMLDocument ? $iframe.contentDocument.document.XMLDocument : $iframe.contentDocument.document;
        }

        if(!xml.responseText) {
            /**
             * @event error 上传错误时触发
             * @property {object} source 事件发起对象
             * @property {object} name ResponseError
             * @property {object} message 错误信息
             */
            return this.$emit('error', {
                source: this,
                name: 'ResponseError',
                message: 'No responseText!'
            });
        }

        /**
         * @event complete 上传完成时触发
         * @property {object} source 事件发起对象
         * @property {object} xml 返回的xml
         */
        this.$emit('complete', {
            source: this,
            xml: xml
        });

        /**
         * @event success 上传成功时触发
         * @property {object} source 事件发起对象
         * @property {object} data 返回的数据
         */
        this.$emit('success', {
            source: this,
            data: this._parseData(xml, this.data.dataType)
        });
    },
    /**
     * @method _parseData(xml, type) 解析接收的数据
     * @private
     * @param  {object} xml 接收的xml
     * @param  {object} type 数据类型
     * @return {object|string} 解析后的数据
     */
    _parseData: function(xml, type) {
        if(!type || type === 'xml')
            return xml.responseXML;
        else if (type === 'json') {
            var data = xml.responseText;

            try {
                data = JSON.parse(data);
            } catch (e) {
                var text = /<pre.*?>(.*?)<\/pre>/.exec(data);
                text = text ? text[1] : data;
                data = JSON.parse(text);
            }

            return data;
        } else
            return xml.responseText;
    }
});

module.exports = Uploader;