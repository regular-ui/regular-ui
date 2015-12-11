/**
 * ------------------------------------------------------------
 * HTMLEditor 编辑器
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('regular-ui-base/src/component');
var template = require('text!./htmlEditor.html');
var _ = require('regular-ui-base/src/_');
var Notify = require('./notify.js');

/**
 * @class HTMLEditor
 * @extend Component
 * @param {object}                  options.data                     =  绑定属性 | Binding Properties
 * @param {string=''}               options.data.content            <=> 编辑器内容
 * @param {number}                  options.data.maxlength           => 文本框的最大长度
 * @param {boolean=false}           options.data.autofocus           => 是否自动获得焦点
 * @param {boolean=false}           options.data.readonly            => 是否只读
 * @param {boolean=false}           options.data.disabled            => 是否禁用
 * @param {boolean=true}            options.data.visible             => 是否显示
 * @param {string=''}               options.data.class               => 补充class
 */
var HTMLEditor = Component.extend({
    name: 'htmlEditor',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            content: '',
            maxlength: undefined,
            autofocus: false
        });
        this.supr();
    },
    computed: {
        html: function() {
            return this.data.content;
        }
    },
    /**
     * @public
     */
    bold: function() {
        if(this.data.readonly || this.data.disabled)
            return;

        var rangeData = this.getCursorPosition();
        rangeData.text = '<strong>' + rangeData.text + '</strong>';
        this.setCursorPosition(rangeData);
        this.data.content = this.$refs.textarea.value;
        this.$update();
    },
    /**
     * @public
     */
    italic: function() {
        if(this.data.readonly || this.data.disabled)
            return;

        var rangeData = this.getCursorPosition();
        rangeData.text = '<em>' + rangeData.text + '</em>';
        this.setCursorPosition(rangeData);
        this.data.content = this.$refs.textarea.value;
        this.$update();
    },
    /**
     * @public
     */
    quote: function() {
        if(this.data.readonly || this.data.disabled)
            return;

        var rangeData = this.getCursorPosition();
        // var value = this.$refs.textarea.value;
        // for(var i = rangeData.start - 1; i > 0; i--)
        //     if(value[i] == '\n') {
        //         i++;
        //         break;
        //     }
        // rangeData.start = i;
        // for(var i = rangeData.end; i < value.length; i++)
        //     if(value[i] == '\n') {
        //         i--;
        //         break;
        //     }
        // rangeData.end = i;
        rangeData.text = '<blockquote>' + rangeData.text + '</blockquote>';
        this.setCursorPosition(rangeData);
        this.data.content = this.$refs.textarea.value;
        this.$update();
    },
    /**
     * @public
     */
    ul: function() {
        if(this.data.readonly || this.data.disabled)
            return;

        var rangeData = this.getCursorPosition();
        rangeData.text = '<li>' + rangeData.text + '</li>';
        this.setCursorPosition(rangeData);
        this.data.content = this.$refs.textarea.value;
        this.$update();
    },
    /**
     * @public
     */
    ol: function() {
        if(this.data.readonly || this.data.disabled)
            return;

        var rangeData = this.getCursorPosition();
        rangeData.text = '<li>' + rangeData.text + '</li>';
        this.setCursorPosition(rangeData);
        this.data.content = this.$refs.textarea.value;
        this.$update();
    },
    /**
     * @public
     */
    link: function() {
        if(this.data.readonly || this.data.disabled)
            return;

        var rangeData = this.getCursorPosition();
        rangeData.text = '<a href="#">' + rangeData.text + '</a>';
        this.setCursorPosition(rangeData);
        this.data.content = this.$refs.textarea.value;
        this.$update();
    },
    /**
     * @public
     */
    image: function() {
        if(this.data.readonly || this.data.disabled)
            return;

        this.$refs.uploader.upload();
    },
    /**
     * @public
     */
    latex: function() {
        if(this.data.readonly || this.data.disabled)
            return;
        
        var rangeData = this.getCursorPosition();
        rangeData.text = '$$a^2 + b^2 = c^2$$';
        this.setCursorPosition(rangeData);
        this.data.content = this.$refs.textarea.value;
        this.$update();
    },
    /**
     * @private
     */
    _onUploaderSuccess: function(data) {
        var rangeData = this.getCursorPosition();
        rangeData.text = '<img src="' + data.result + '">';
        this.setCursorPosition(rangeData);
        this.data.content = this.$refs.textarea.value;
        this.$update();
    },
    /**
     * @private
     */
    _onUploaderError: function(e) {
        Notify.error(e);
    },
    /**
     * @public
     */
    getCursorPosition: function() {
        var textarea = this.$refs.textarea;

        var rangeData = {text: '', start: 0, end: 0};
        textarea.focus();

        if (textarea.setSelectionRange) { // W3C
            rangeData.start = textarea.selectionStart;
            rangeData.end = textarea.selectionEnd;
            rangeData.text = (rangeData.start != rangeData.end) ? textarea.value.substring(rangeData.start, rangeData.end): '';
        } else if (document.selection) { // IE
            var i,
                oS = document.selection.createRange(),
                // Don't: oR = textarea.createTextRange()
                oR = document.body.createTextRange();
            oR.moveToElementText(textarea);

            rangeData.text = oS.text;
            rangeData.bookmark = oS.getBookmark();

            // object.moveStart(sUnit [, iCount])
            // Return Value: Integer that returns the number of units moved.
            for (i = 0; oR.compareEndPoints('StartToStart', oS) < 0 && oS.moveStart('character', -1) !== 0; i++) {
                // Why? You can alert(textarea.value.length)
                if (textarea.value.charAt(i) == '\n') {
                    i++;
                }
            }
            rangeData.start = i;
            rangeData.end = rangeData.text.length + rangeData.start;
        }

        return rangeData;
    },
    /**
     * @public
     */
    setCursorPosition: function(rangeData) {
        if(!rangeData)
            throw new Error('You must get cursor position first!');

        var textarea = this.$refs.textarea;

        var oldValue = textarea.value;
        textarea.value = oldValue.substring(0, rangeData.start) + rangeData.text + oldValue.substring(rangeData.end, oldValue.length);
        rangeData.end = rangeData.start + rangeData.text.length;
        if (textarea.setSelectionRange) { // W3C
            textarea.focus();
            textarea.setSelectionRange(rangeData.start, rangeData.end);
        } else if (textarea.createTextRange) { // IE
            var oR = textarea.createTextRange();
            // Fixbug :
            // In IE, if cursor position at the end of textarea, the setCursorPosition function don't work
            if(textarea.value.length === rangeData.start) {
                oR.collapse(false)
                oR.select();
            } else {
                oR.moveToBookmark(rangeData.bookmark);
                oR.select();
            }
        }
    }
});

module.exports = HTMLEditor;
