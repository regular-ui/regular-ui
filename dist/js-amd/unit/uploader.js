define(function (require, exports, module) {/**
 * ------------------------------------------------------------
 * Uploader  上传
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../base/component.js');
var template = require('text!./uploader.html');
var _ = require('../base/util.js');

/**
 * @class Uploader
 * @extend Component
 * @param {object}                  options.data                    绑定属性
 * @param {string=''}               options.data.title              按钮文字
 * @param {string=''}               options.data.url                上传路径
 * @param {string='json'}           options.data.dataType           数据类型
 * @param {object}                  options.data.data               附加数据
 * @param {string|string[]=''}      options.data.extensions         可上传的扩展名，如果为空，则表示可上传任何文件类型
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
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
            extensions: null,
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
        if(!this.data.disabled)
            this.$refs.file.click();
    },
    /**
     * @method submit() 提交表单
     * @private
     * @return {void}
     */
    submit: function() {
        if(this.data.extensions) {
            var fileName = this.$refs.file.value;
            var ext = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length).toLowerCase();

            var extensions = this.data.extensions;
            if(typeof extensions === 'string')
                extensions = extensions.split(',');
            
            if(extensions.indexOf(ext) === -1)
                return this.$emit('error', this.extensionError());
        }

        this.$emit('sending', this.data.data);

        this.$refs.form.submit();
    },
    cbUpload: function() {
        var iframe = this.$refs.iframe;

        var xml = {};
        try {
            if(iframe.contentWindow) {
                xml.responseText = iframe.contentWindow.document.body ? iframe.contentWindow.document.body.innerHTML : null;
                xml.responseXML = iframe.contentWindow.document.XMLDocument ? iframe.contentWindow.document.XMLDocument : iframe.contentWindow.document;
            } else if(iframe.contentDocument) {
                xml.responseText = iframe.contentDocument.document.body?iframe.contentDocument.document.body.innerHTML : null;
                xml.responseXML = iframe.contentDocument.document.XMLDocument?iframe.contentDocument.document.XMLDocument : iframe.contentDocument.document;
            }
        } catch(e) {
            console.log(e);
        }

        if(!xml.responseText)
            return;

        function uploadHttpData(r, type) {
            var data = (type == 'xml' || !type) ? r.responseXML : r.responseText;
            // If the type is 'script', eval it in global context
            if (type === 'json') {
                try {
                    data = JSON.parse(data);
                } catch (e) {
                    var text = /<pre.*?>(.*?)<\/pre>/.exec(data);
                    text = text ? text[1] : data;
                    data = JSON.parse(text);
                }
            }
            return data;
        }

        this.$emit('success', uploadHttpData(xml, this.data.dataType));
        this.$emit('complete', xml);

        this.$refs.file.value = '';
    },
    extensionError:　function() {
        return '只能上传' + this.data.extensions.join(', ')　+ '类型的文件！';
    },
});

module.exports = Uploader;
});
