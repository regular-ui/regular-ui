(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("regularjs"), require("marked"));
	else if(typeof define === 'function' && define.amd)
		define(["Regular", "marked"], factory);
	else if(typeof exports === 'object')
		exports["RGUI"] = factory(require("regularjs"), require("marked"));
	else
		root["RGUI"] = factory(root["Regular"], root["marked"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_69__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * ------------------------------------------------------------
	 * RGUI      Regular UI库
	 * @author   sensen(rainforest92@126.com)
	 * ------------------------------------------------------------
	 */

	'use strict';

	exports.Regular = __webpack_require__(1);
	exports.Component = __webpack_require__(2);
	exports.SourceComponent = __webpack_require__(5);
	exports._ = __webpack_require__(3);
	exports.Dropdown =  __webpack_require__(6);
	exports.Menu =  __webpack_require__(8);
	exports.Input2 =  __webpack_require__(11);
	exports.NumberInput =  __webpack_require__(15);
	exports.Check2 =  __webpack_require__(17);
	exports.CheckGroup =  __webpack_require__(19);
	exports.Check2Group =  __webpack_require__(21);
	exports.RadioGroup =  __webpack_require__(23);
	exports.Radio2Group =  __webpack_require__(25);
	exports.Select2 =  __webpack_require__(27);
	exports.TreeSelect =  __webpack_require__(29);
	exports.Suggest =  __webpack_require__(34);
	exports.Uploader =  __webpack_require__(36);
	exports.DatePicker =  __webpack_require__(38);
	exports.TimePicker =  __webpack_require__(42);
	exports.DateTimePicker =  __webpack_require__(44);
	exports.Progress =  __webpack_require__(46);
	exports.Gotop =  __webpack_require__(48);
	exports.Tabs =  __webpack_require__(50);
	exports.Collapse =  __webpack_require__(52);
	exports.Pager =  __webpack_require__(55);
	exports.Notify =  __webpack_require__(57);
	exports.Modal =  __webpack_require__(59);
	exports.ListView =  __webpack_require__(61);
	exports.TreeView =  __webpack_require__(31);
	exports.Calendar =  __webpack_require__(40);
	exports.Editor =  __webpack_require__(63);
	exports.HTMLEditor =  __webpack_require__(65);
	exports.MarkEditor =  __webpack_require__(67);

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * ------------------------------------------------------------
	 * Component 组件基类
	 * @author   sensen(rainforest92@126.com)
	 * ------------------------------------------------------------
	 */

	'use strict';

	var Regular = __webpack_require__(1);
	var _ = __webpack_require__(3);
	var filter = __webpack_require__(4);

	/**
	 * @class Component
	 * @extend Regular
	 * @param {boolean=false}           options.data.readonly           是否只读
	 * @param {boolean=false}           options.data.disabled           是否禁用
	 * @param {boolean=true}            options.data.visible            是否显示
	 * @param {string=''}               options.data.class              补充class
	 */
	var Component = Regular.extend({
	    /**
	     * @protected
	     */
	    config: function() {
	        _.extend(this.data, {
	            readonly: false,
	            disabled: false,
	            visible: true,
	            'class': '',
	            console: console
	        });
	        this.supr();
	    }
	})
	.filter(filter)
	.directive({

	})

	module.exports = Component;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Regular = __webpack_require__(1);

	var _ = {
	    extend: function(o1, o2, override) {
	        for(var i in o2)
	            if(override || o1[i] === undefined)
	                o1[i] = o2[i]
	        return o1;
	    },
	    dom: Regular.dom,
	    multiline: function(func) {
	        var reg = /^function\s*\(\)\s*\{\s*\/\*+\s*([\s\S]*)\s*\*+\/\s*\}$/;
	        return reg.exec(func)[1];
	    }
	}

	module.exports = _;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	var filter = {};

	filter.format = (function() {
	    function fix(str) {
	        str = '' + (String(str) || '');
	        return str.length <= 1? '0' + str : str;
	    }
	    var maps = {
	        'yyyy': function(date){return date.getFullYear()},
	        'MM': function(date){return fix(date.getMonth() + 1); },
	        'dd': function(date){ return fix(date.getDate()) },
	        'HH': function(date){return fix(date.getHours()) },
	        'mm': function(date){ return fix(date.getMinutes())},
	        'ss': function(date){ return fix(date.getSeconds())}
	    }

	    var trunk = new RegExp(Object.keys(maps).join('|'),'g');
	    return function(value, format){
	        if(!value){return '';}
	        format = format || 'yyyy-MM-dd HH:mm';
	        value = new Date(value);

	        return format.replace(trunk, function(capture){
	            return maps[capture]? maps[capture](value): '';
	        });
	    }
	}());

	filter.average = function(array, key) {
	    array = array || [];
	    return array.length? filter.total(array, key) / array.length : 0;
	}
	filter.total = function(array, key) {
	    var total = 0;
	    if(!array) return;
	    array.forEach(function( item ){
	        total += key? item[key] : item;
	    })
	    return total;
	}

	filter.filter = function(array, filterFn) {
	    if(!array || !array.length) return;
	    return array.filter(function(item, index){
	        return filterFn(item, index);
	    })
	}

	module.exports = filter;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * ------------------------------------------------------------
	 * SourceComponent 数据组件基类
	 * @author   sensen(rainforest92@126.com)
	 * ------------------------------------------------------------
	 */

	'use strict';

	var Component = __webpack_require__(2);
	var _ = __webpack_require__(3);

	/**
	 * @class SourceComponent
	 * @extend Component
	 * @param {object[]=[]}             options.data.source             数据源
	 * @param {boolean=true}            options.data.updateAuto         当有service时，是否自动加载
	 * @param {boolean=false}           options.data.readonly           是否只读
	 * @param {boolean=false}           options.data.disabled           是否禁用
	 * @param {boolean=true}            options.data.visible            是否显示
	 * @param {string=''}               options.data.class              补充class
	 * @param {object}                  options.service                 数据服务
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
	     * @return {object}
	     */
	    getParams: function() {
	        return {};
	    },
	    /**
	     * @method $updateSource() 从service中更新数据源
	     * @public
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

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * ------------------------------------------------------------
	 * Dropdown  下拉菜单
	 * @author   sensen(rainforest92@126.com)
	 * ------------------------------------------------------------
	 */

	var SourceComponent = __webpack_require__(5);
	var template = __webpack_require__(7);
	var _ = __webpack_require__(3);

	/**
	 * @class Dropdown
	 * @extend SourceComponent
	 * @param {object}                  options.data                    绑定属性
	 * @param {string=''}               options.data.title              按钮文字
	 * @param {object[]=[]}             options.data.source             数据源
	 * @param {number}                  options.data.source[].id        每项的id
	 * @param {string}                  options.data.source[].name      每项的内容
	 * @param {boolean=false}           options.data.source[].disabled  禁用此项
	 * @param {boolean=false}           options.data.source[].divider   设置此项分隔线
	 * @param {string=null}             options.data.itemTemplate       单项模板
	 * @param {boolean=false}           options.data.open               当前为展开/收起状态
	 * @param {boolean=false}           options.data.disabled           是否禁用
	 * @param {boolean=true}            options.data.visible            是否显示
	 * @param {string=''}               options.data.class              补充class
	 * @param {object}                  options.service                 数据服务
	 */
	var Dropdown = SourceComponent.extend({
	    name: 'dropdown',
	    template: template,
	    /**
	     * @protected
	     */
	    config: function() {
	        _.extend(this.data, {
	            // @inherited source: [],
	            itemTemplate: null,
	            open: false
	        });
	        this.supr();
	    },
	    /**
	     * @method select(item) 选择某一项
	     * @public
	     * @param  {object} item 选择项
	     * @return {void}
	     */
	    select: function(item) {
	        if(this.data.disabled || item.disabled || item.divider)
	            return;

	        //this.data.selected = item;
	        /**
	         * @event select 选择某一项时触发
	         * @property {object} selected 当前选择项
	         */
	        this.$emit('select', {
	            selected: item
	        });
	        this.toggle(false);
	    },
	    /**
	     * @method toggle(open) 在展开/收起状态之间切换
	     * @public
	     * @param  {boolean} open 展开/收起
	     * @return {void}
	     */
	    toggle: function(open) {
	        if(this.data.disabled)
	            return;
	        
	        this.data.open = open;

	        // 根据状态在Dropdown.opens列表中添加/删除管理项
	        var index = Dropdown.opens.indexOf(this);
	        if(open && index < 0)
	            Dropdown.opens.push(this);
	        else if(!open && index >= 0)
	            Dropdown.opens.splice(index, 1);

	        /**
	         * @event toggle  展开/收起时触发
	         * @property {object} open 展开/收起状态
	         */
	        this.$emit('toggle', {
	            open: open
	        });
	    }
	});

	// 处理点击dropdown之外的地方后的收起事件。
	Dropdown.opens = [];

	_.dom.on(document.body, 'click', function(e) {
	    Dropdown.opens.forEach(function(dropdown) {
	        // 这个地方不能用stopPropagation来处理，因为展开一个dropdown的同时要收起其他dropdown
	        var element = dropdown.$refs.element;
	        var element2 = e.target;
	        while(element2) {
	            if(element == element2)
	                return;
	            element2 = element2.parentElement;
	        }
	        dropdown.toggle(false);
	        dropdown.$update();
	    });
	});

	module.exports = Dropdown;

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "<div class=\"u-dropdown {@(class)}\" r-class={ {'z-dis': disabled} } r-hide={!visible} ref=\"element\">\n    <div class=\"dropdown_hd\" on-click={this.toggle(!open)}>\n        {#if this.$body}\n            {#inc this.$body}\n        {#else}\n            <a class=\"u-btn\">{title || '下拉菜单'} <i class=\"u-icon u-icon-caret-down\"></i></a>\n        {/if}\n    </div>\n    <div class=\"dropdown_bd\" r-hide={!open} r-animation=\"on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;\">\n        <ul class=\"m-listview\">\n            {#list source as item}\n            <li r-class={ {'z-dis': item.disabled, 'dropdown_divider': item.divider} } on-click={this.select(item)}>{#if @(itemTemplate)}{#include @(itemTemplate)}{#else}{item.name}{/if}</li>\n            {/list}\n        </ul>\n    </div>\n</div>"

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * ------------------------------------------------------------
	 * Menu      多级菜单
	 * @author   sensen(rainforest92@126.com)
	 * ------------------------------------------------------------
	 */

	var Dropdown = __webpack_require__(6);
	var SourceComponent = __webpack_require__(5);
	var template = __webpack_require__(9);
	var hierarchicalTemplate = __webpack_require__(10);
	var _ = __webpack_require__(3);

	/**
	 * @class  Menu
	 * @extend Dropdown
	 * @param {object}                  options.data                    绑定属性
	 * @param {string=''}               options.data.title              按钮文字
	 * @param {object[]=[]}             options.data.source             数据源
	 * @param {number}                  options.data.source[].id        每项的id
	 * @param {string}                  options.data.source[].name      每项的内容
	 * @param {boolean=false}           options.data.source[].disabled  禁用此项
	 * @param {boolean=false}           options.data.source[].divider   设置此项分隔线
	 * @param {string=null}             options.data.itemTemplate       单项模板
	 * @param {boolean=false}           options.data.open               当前为展开/收起状态
	 * @param {boolean=false}           options.data.disabled           是否禁用
	 * @param {boolean=true}            options.data.visible            是否显示
	 * @param {string=''}               options.data.class              补充class
	 * @param {object}                  options.service                 数据服务
	 */
	var Menu = Dropdown.extend({
	    name: 'menu',
	    template: template,
	    /**
	     * @protected
	     */
	    config: function() {
	        _.extend(this.data, {
	            // @inherited source: [],
	            open: false
	        });
	        this.supr();

	        this.$ancestor = this;
	    }
	});

	var MenuList = SourceComponent.extend({
	    name: 'menuList',
	    template: hierarchicalTemplate,
	    /**
	     * @protected
	     */
	    config: function() {
	        _.extend(this.data, {
	            // @inherited source: [],
	            itemTemplate: null,
	            // visible: false
	        });
	        this.supr();

	        this.$ancestor = this.$parent.$ancestor;
	        this.service = this.$ancestor.service;
	        this.data.itemTemplate = this.$ancestor.data.itemTemplate;
	    },
	    /**
	     * @method select(item) 选择某一项
	     * @private
	     * @param  {object} item 选择项
	     * @return {void}
	     */
	    select: function(item) {
	        if(this.$ancestor.data.disabled || item.disabled || item.divider)
	            return;

	        this.$ancestor.select(item);
	    },
	    /**
	     * @method toggle(item) 展开或收起某一项
	     * @private
	     * @param  {object} item 展开收起项
	     * @return {void}
	     */
	    toggle: function(item) {
	        if(this.$ancestor.data.disabled)
	            return;

	        item.open = !item.open;

	        /**
	         * @event toggle 展开或收起某一项时触发
	         * @private
	         * @property {object} item 展开收起项
	         * @property {boolean} open 展开还是收起
	         */
	        this.$ancestor.$emit('toggle', {
	            item: item,
	            open: item.open
	        });
	    }
	})

	module.exports = Menu;

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = "<div class=\"u-dropdown u-menu {@(class)}\" r-class={ {'z-dis': disabled} } r-hide={!visible} ref=\"element\">\n    <div class=\"dropdown_hd\" on-click={this.toggle(!open)}>\n        {#if this.$body}\n            {#inc this.$body}\n        {#else}\n            <a class=\"u-btn\">{title || '多级菜单'} <i class=\"u-icon u-icon-caret-down\"></i></a>\n        {/if}\n    </div>\n    <div class=\"dropdown_bd\" r-hide={!open} r-animation=\"on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;\">\n        <menuList source={source} visible={true} />\n    </div>\n</div>"

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = "<ul class=\"m-listview menu_list\" r-hide={!visible}>\n    {#list source as item}\n    <li r-class={ {'z-dis': item.disabled, 'dropdown_divider': item.divider} }>\n        <div class=\"menu_item\">\n            {#if item.childrenCount || (item.children && item.children.length)}\n            <i class=\"u-icon u-icon-caret-right\"></i>\n            {/if}\n            <div class=\"menu_itemname\" title={item.name} on-click={this.select(item)}>{#if @(itemTemplate)}{#include @(itemTemplate)}{#else}{item.name}{/if}</div>\n        </div>\n        {#if item.childrenCount || (item.children && item.children.length)}<menuList source={item.children} visible={item.open} parent={item} />{/if}\n    </li>\n    {/list}\n</ul>"

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * ------------------------------------------------------------
	 * Input2   输入扩展
	 * @author   sensen(rainforest92@126.com)
	 * ------------------------------------------------------------
	 */

	var Component = __webpack_require__(2);
	var template = __webpack_require__(12);
	var _ = __webpack_require__(3);
	var validator = __webpack_require__(13);

	/**
	 * @class Input2
	 * @extend Component
	 * @param {object}                  options.data                    绑定属性
	 * @param {string=''}               options.data.value              输入框的值
	 * @param {string=''}               options.data.type               输入框的类型
	 * @param {string=''}               options.data.placeholder        占位符
	 * @param {object[]=[]}             options.data.rules              验证规则
	 * @param {boolean=false}           options.data.readonly           是否只读
	 * @param {boolean=false}           options.data.disabled           是否禁用
	 * @param {boolean=true}            options.data.visible            是否显示
	 * @param {string=''}               options.data.class              补充class
	 */
	var Input2 = Component.extend({
	    name: 'input2',
	    template: template,
	    /**
	     * @protected
	     */
	    config: function() {
	        _.extend(this.data, {
	            value: '',
	            type: '',
	            placeholder: '',
	            rules: []
	        });
	        this.supr();
	    },
	    validate: function(value, rules) {
	        var result = validator.validate(value, rules);
	        
	        this.data.type = result.success ? 'success' : 'error';
	        this.data.tip = result.message;
	    }
	});

	module.exports = Input2;

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = "<label class=\"u-input2 {@(class)}\" r-hide={!visible}>\n    <input class=\"u-input u-input-{type}\" r-model={value} placeholder={placeholder} disabled={disabled} readonly={readonly} on-keyup={this.validate(value, rules)}>\n</label>\n{#if tip}<span class=\"u-tip u-tip-{type}\">{tip}</span>{/if}"

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * ------------------------------------------------------------
	 * Validator 表单验证
	 * @author   sensen(rainforest92@126.com)
	 * ------------------------------------------------------------
	 */

	'use strict';

	var vali = __webpack_require__(14);
	var validator = {}

	/**
	 * 235235
	rules = [
	    {type: 'isRequired', min: 2, max: 5
	]
	*/

	validator.validate = function(value, rules) {
	    var result = {
	        success: true,
	        message: ''
	    }

	    rules.forEach(function(rule) {
	        rule.success = true;

	        if(rule.type === 'is') {
	            rule.success = rule.reg.test(value);
	        } else if(rule.type === 'isRequired') {
	            rule.success = !!value;
	        } else if(rule.type === 'isFilled') {
	            rule.success = !!value && value.trim();
	        } else if(rule.type === 'isEmail') {
	            rule.success = vali.isEmail(value);
	        } else if(rule.type === 'isURL') {
	            rule.success = vali.isURL(value);
	        } else if(rule.type === 'isNumber') {
	            rule.success = vali.isInt(value);
	        } else if(rule.type === 'isInt') {
	            rule.success = vali.isInt(value);
	        } else if(rule.type === 'isFloat') {
	            rule.success = vali.isFloat(value);
	        } else if(rule.type === 'isLength') {
	            rule.success = vali.isLength(value, rule.min, rule.max);
	        } else {
	            rule.success = rule.method(value);
	        }

	        if(!rule.success && result.success) {
	            result.success = false;
	            result.message = rule.message;
	        }
	    });

	    return result;
	}

	validator.validateForm = function(data, fields) {
	    var conclusion = {
	        results: {},
	        success: true,
	        message: ''
	    }
	    
	    for(var key in fields) {
	        var rules = fields[key];
	        if(!rules)
	            continue;
	        var value = data[key];

	        conclusion.results[key] = validator.validate(value, rules);
	    }

	    return conclusion;
	}

	module.exports = validator;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Copyright (c) 2015 Chris O'Hara <cohara87@gmail.com>
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining
	 * a copy of this software and associated documentation files (the
	 * "Software"), to deal in the Software without restriction, including
	 * without limitation the rights to use, copy, modify, merge, publish,
	 * distribute, sublicense, and/or sell copies of the Software, and to
	 * permit persons to whom the Software is furnished to do so, subject to
	 * the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be
	 * included in all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
	 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
	 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	 */

	(function (name, definition) {
	    if (true) {
	        module.exports = definition();
	    } else if (typeof define === 'function' && typeof define.amd === 'object') {
	        define(definition);
	    } else {
	        this[name] = definition();
	    }
	})('validator', function (validator) {

	    'use strict';

	    validator = { version: '4.0.5' };

	    var emailUserPart = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i;
	    var quotedEmailUser = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i;

	    var emailUserUtf8Part = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;
	    var quotedEmailUserUtf8 = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;

	    var displayName = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\s]*<(.+)>$/i;

	    var creditCard = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;

	    var isin = /^[A-Z]{2}[0-9A-Z]{9}[0-9]$/;

	    var isbn10Maybe = /^(?:[0-9]{9}X|[0-9]{10})$/
	      , isbn13Maybe = /^(?:[0-9]{13})$/;

	    var ipv4Maybe = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/
	      , ipv6Block = /^[0-9A-F]{1,4}$/i;

	    var uuid = {
	        '3': /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i
	      , '4': /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
	      , '5': /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
	      , all: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i
	    };

	    var alpha = /^[A-Z]+$/i
	      , alphanumeric = /^[0-9A-Z]+$/i
	      , numeric = /^[-+]?[0-9]+$/
	      , int = /^(?:[-+]?(?:0|[1-9][0-9]*))$/
	      , float = /^(?:[-+]?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/
	      , hexadecimal = /^[0-9A-F]+$/i
	      , decimal = /^[-+]?([0-9]+|\.[0-9]+|[0-9]+\.[0-9]+)$/
	      , hexcolor = /^#?([0-9A-F]{3}|[0-9A-F]{6})$/i;

	    var ascii = /^[\x00-\x7F]+$/
	      , multibyte = /[^\x00-\x7F]/
	      , fullWidth = /[^\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/
	      , halfWidth = /[\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;

	    var surrogatePair = /[\uD800-\uDBFF][\uDC00-\uDFFF]/;

	    var base64 = /^(?:[A-Z0-9+\/]{4})*(?:[A-Z0-9+\/]{2}==|[A-Z0-9+\/]{3}=|[A-Z0-9+\/]{4})$/i;

	    var phones = {
	      'zh-CN': /^(\+?0?86\-?)?1[345789]\d{9}$/,
	      'en-ZA': /^(\+?27|0)\d{9}$/,
	      'en-AU': /^(\+?61|0)4\d{8}$/,
	      'en-HK': /^(\+?852\-?)?[569]\d{3}\-?\d{4}$/,
	      'fr-FR': /^(\+?33|0)[67]\d{8}$/,
	      'pt-PT': /^(\+351)?9[1236]\d{7}$/,
	      'el-GR': /^(\+30)?((2\d{9})|(69\d{8}))$/,
	      'en-GB': /^(\+?44|0)7\d{9}$/,
	      'en-US': /^(\+?1)?[2-9]\d{2}[2-9](?!11)\d{6}$/,
	      'en-ZM': /^(\+26)?09[567]\d{7}$/,
	      'ru-RU': /^(\+?7|8)?9\d{9}$/
	    };

	    // from http://goo.gl/0ejHHW
	    var iso8601 = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;

	    validator.extend = function (name, fn) {
	        validator[name] = function () {
	            var args = Array.prototype.slice.call(arguments);
	            args[0] = validator.toString(args[0]);
	            return fn.apply(validator, args);
	        };
	    };

	    //Right before exporting the validator object, pass each of the builtins
	    //through extend() so that their first argument is coerced to a string
	    validator.init = function () {
	        for (var name in validator) {
	            if (typeof validator[name] !== 'function' || name === 'toString' ||
	                    name === 'toDate' || name === 'extend' || name === 'init') {
	                continue;
	            }
	            validator.extend(name, validator[name]);
	        }
	    };

	    validator.toString = function (input) {
	        if (typeof input === 'object' && input !== null && input.toString) {
	            input = input.toString();
	        } else if (input === null || typeof input === 'undefined' || (isNaN(input) && !input.length)) {
	            input = '';
	        } else if (typeof input !== 'string') {
	            input += '';
	        }
	        return input;
	    };

	    validator.toDate = function (date) {
	        if (Object.prototype.toString.call(date) === '[object Date]') {
	            return date;
	        }
	        date = Date.parse(date);
	        return !isNaN(date) ? new Date(date) : null;
	    };

	    validator.toFloat = function (str) {
	        return parseFloat(str);
	    };

	    validator.toInt = function (str, radix) {
	        return parseInt(str, radix || 10);
	    };

	    validator.toBoolean = function (str, strict) {
	        if (strict) {
	            return str === '1' || str === 'true';
	        }
	        return str !== '0' && str !== 'false' && str !== '';
	    };

	    validator.equals = function (str, comparison) {
	        return str === validator.toString(comparison);
	    };

	    validator.contains = function (str, elem) {
	        return str.indexOf(validator.toString(elem)) >= 0;
	    };

	    validator.matches = function (str, pattern, modifiers) {
	        if (Object.prototype.toString.call(pattern) !== '[object RegExp]') {
	            pattern = new RegExp(pattern, modifiers);
	        }
	        return pattern.test(str);
	    };

	    var default_email_options = {
	        allow_display_name: false,
	        allow_utf8_local_part: true,
	        require_tld: true
	    };

	    validator.isEmail = function (str, options) {
	        options = merge(options, default_email_options);

	        if (options.allow_display_name) {
	            var display_email = str.match(displayName);
	            if (display_email) {
	                str = display_email[1];
	            }
	        }

	        var parts = str.split('@')
	          , domain = parts.pop()
	          , user = parts.join('@');

	        var lower_domain = domain.toLowerCase();
	        if (lower_domain === 'gmail.com' || lower_domain === 'googlemail.com') {
	            user = user.replace(/\./g, '').toLowerCase();
	        }

	        if (!validator.isByteLength(user, 0, 64) ||
	                !validator.isByteLength(domain, 0, 256)) {
	            return false;
	        }

	        if (!validator.isFQDN(domain, {require_tld: options.require_tld})) {
	            return false;
	        }

	        if (user[0] === '"') {
	            user = user.slice(1, user.length - 1);
	            return options.allow_utf8_local_part ?
	                quotedEmailUserUtf8.test(user) :
	                quotedEmailUser.test(user);
	        }

	        var pattern = options.allow_utf8_local_part ?
	            emailUserUtf8Part : emailUserPart;

	        var user_parts = user.split('.');
	        for (var i = 0; i < user_parts.length; i++) {
	            if (!pattern.test(user_parts[i])) {
	                return false;
	            }
	        }

	        return true;
	    };

	    var default_url_options = {
	        protocols: [ 'http', 'https', 'ftp' ]
	      , require_tld: true
	      , require_protocol: false
	      , require_valid_protocol: true
	      , allow_underscores: false
	      , allow_trailing_dot: false
	      , allow_protocol_relative_urls: false
	    };

	    validator.isURL = function (url, options) {
	        if (!url || url.length >= 2083 || /\s/.test(url)) {
	            return false;
	        }
	        if (url.indexOf('mailto:') === 0) {
	            return false;
	        }
	        options = merge(options, default_url_options);
	        var protocol, auth, host, hostname, port,
	            port_str, split;
	        split = url.split('://');
	        if (split.length > 1) {
	            protocol = split.shift();
	            if (options.require_valid_protocol && options.protocols.indexOf(protocol) === -1) {
	                return false;
	            }
	        } else if (options.require_protocol) {
	            return false;
	        }  else if (options.allow_protocol_relative_urls && url.substr(0, 2) === '//') {
	            split[0] = url.substr(2);
	        }
	        url = split.join('://');
	        split = url.split('#');
	        url = split.shift();

	        split = url.split('?');
	        url = split.shift();

	        split = url.split('/');
	        url = split.shift();
	        split = url.split('@');
	        if (split.length > 1) {
	            auth = split.shift();
	            if (auth.indexOf(':') >= 0 && auth.split(':').length > 2) {
	                return false;
	            }
	        }
	        hostname = split.join('@');
	        split = hostname.split(':');
	        host = split.shift();
	        if (split.length) {
	            port_str = split.join(':');
	            port = parseInt(port_str, 10);
	            if (!/^[0-9]+$/.test(port_str) || port <= 0 || port > 65535) {
	                return false;
	            }
	        }
	        if (!validator.isIP(host) && !validator.isFQDN(host, options) &&
	                host !== 'localhost') {
	            return false;
	        }
	        if (options.host_whitelist &&
	                options.host_whitelist.indexOf(host) === -1) {
	            return false;
	        }
	        if (options.host_blacklist &&
	                options.host_blacklist.indexOf(host) !== -1) {
	            return false;
	        }
	        return true;
	    };

	    validator.isIP = function (str, version) {
	        version = validator.toString(version);
	        if (!version) {
	            return validator.isIP(str, 4) || validator.isIP(str, 6);
	        } else if (version === '4') {
	            if (!ipv4Maybe.test(str)) {
	                return false;
	            }
	            var parts = str.split('.').sort(function (a, b) {
	                return a - b;
	            });
	            return parts[3] <= 255;
	        } else if (version === '6') {
	            var blocks = str.split(':');
	            var foundOmissionBlock = false; // marker to indicate ::

	            // At least some OS accept the last 32 bits of an IPv6 address
	            // (i.e. 2 of the blocks) in IPv4 notation, and RFC 3493 says
	            // that '::ffff:a.b.c.d' is valid for IPv4-mapped IPv6 addresses,
	            // and '::a.b.c.d' is deprecated, but also valid.
	            var foundIPv4TransitionBlock = validator.isIP(blocks[blocks.length - 1], 4);
	            var expectedNumberOfBlocks = foundIPv4TransitionBlock ? 7 : 8;

	            if (blocks.length > expectedNumberOfBlocks)
	                return false;

	            // initial or final ::
	            if (str === '::') {
	                return true;
	            } else if (str.substr(0, 2) === '::') {
	                blocks.shift();
	                blocks.shift();
	                foundOmissionBlock = true;
	            } else if (str.substr(str.length - 2) === '::') {
	                blocks.pop();
	                blocks.pop();
	                foundOmissionBlock = true;
	            }

	            for (var i = 0; i < blocks.length; ++i) {
	                // test for a :: which can not be at the string start/end
	                // since those cases have been handled above
	                if (blocks[i] === '' && i > 0 && i < blocks.length -1) {
	                    if (foundOmissionBlock)
	                        return false; // multiple :: in address
	                    foundOmissionBlock = true;
	                } else if (foundIPv4TransitionBlock && i == blocks.length - 1) {
	                    // it has been checked before that the last
	                    // block is a valid IPv4 address
	                } else if (!ipv6Block.test(blocks[i])) {
	                    return false;
	                }
	            }

	            if (foundOmissionBlock) {
	                return blocks.length >= 1;
	            } else {
	                return blocks.length === expectedNumberOfBlocks;
	            }
	        }
	        return false;
	    };

	    var default_fqdn_options = {
	        require_tld: true
	      , allow_underscores: false
	      , allow_trailing_dot: false
	    };

	    validator.isFQDN = function (str, options) {
	        options = merge(options, default_fqdn_options);

	        /* Remove the optional trailing dot before checking validity */
	        if (options.allow_trailing_dot && str[str.length - 1] === '.') {
	            str = str.substring(0, str.length - 1);
	        }
	        var parts = str.split('.');
	        if (options.require_tld) {
	            var tld = parts.pop();
	            if (!parts.length || !/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
	                return false;
	            }
	        }
	        for (var part, i = 0; i < parts.length; i++) {
	            part = parts[i];
	            if (options.allow_underscores) {
	                if (part.indexOf('__') >= 0) {
	                    return false;
	                }
	                part = part.replace(/_/g, '');
	            }
	            if (!/^[a-z\u00a1-\uffff0-9-]+$/i.test(part)) {
	                return false;
	            }
	            if (/[\uff01-\uff5e]/.test(part)) {
	                // disallow full-width chars
	                return false;
	            }
	            if (part[0] === '-' || part[part.length - 1] === '-' ||
	                    part.indexOf('---') >= 0) {
	                return false;
	            }
	        }
	        return true;
	    };

	    validator.isBoolean = function(str) {
	        return (['true', 'false', '1', '0'].indexOf(str) >= 0);
	    };

	    validator.isAlpha = function (str) {
	        return alpha.test(str);
	    };

	    validator.isAlphanumeric = function (str) {
	        return alphanumeric.test(str);
	    };

	    validator.isNumeric = function (str) {
	        return numeric.test(str);
	    };

	    validator.isDecimal = function (str) {
	        return str !== '' && decimal.test(str);
	    };

	    validator.isHexadecimal = function (str) {
	        return hexadecimal.test(str);
	    };

	    validator.isHexColor = function (str) {
	        return hexcolor.test(str);
	    };

	    validator.isLowercase = function (str) {
	        return str === str.toLowerCase();
	    };

	    validator.isUppercase = function (str) {
	        return str === str.toUpperCase();
	    };

	    validator.isInt = function (str, options) {
	        options = options || {};
	        return int.test(str) && (!options.hasOwnProperty('min') || str >= options.min) && (!options.hasOwnProperty('max') || str <= options.max);
	    };

	    validator.isFloat = function (str, options) {
	        options = options || {};
	        return str !== '' && float.test(str) && (!options.hasOwnProperty('min') || str >= options.min) && (!options.hasOwnProperty('max') || str <= options.max);
	    };

	    validator.isDivisibleBy = function (str, num) {
	        return validator.toFloat(str) % validator.toInt(num) === 0;
	    };

	    validator.isNull = function (str) {
	        return str.length === 0;
	    };

	    validator.isLength = function (str, min, max) {
	        var surrogatePairs = str.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g) || [];
	        var len = str.length - surrogatePairs.length;
	        return len >= min && (typeof max === 'undefined' || len <= max);
	    };

	    validator.isByteLength = function (str, min, max) {
	        var len = encodeURI(str).split(/%..|./).length - 1;
	        return len >= min && (typeof max === 'undefined' || len <= max);
	    };

	    validator.isUUID = function (str, version) {
	        var pattern = uuid[version ? version : 'all'];
	        return pattern && pattern.test(str);
	    };

	    validator.isDate = function (str) {
	        return !isNaN(Date.parse(str));
	    };

	    validator.isAfter = function (str, date) {
	        var comparison = validator.toDate(date || new Date())
	          , original = validator.toDate(str);
	        return !!(original && comparison && original > comparison);
	    };

	    validator.isBefore = function (str, date) {
	        var comparison = validator.toDate(date || new Date())
	          , original = validator.toDate(str);
	        return original && comparison && original < comparison;
	    };

	    validator.isIn = function (str, options) {
	        var i;
	        if (Object.prototype.toString.call(options) === '[object Array]') {
	            var array = [];
	            for (i in options) {
	                array[i] = validator.toString(options[i]);
	            }
	            return array.indexOf(str) >= 0;
	        } else if (typeof options === 'object') {
	            return options.hasOwnProperty(str);
	        } else if (options && typeof options.indexOf === 'function') {
	            return options.indexOf(str) >= 0;
	        }
	        return false;
	    };

	    validator.isCreditCard = function (str) {
	        var sanitized = str.replace(/[^0-9]+/g, '');
	        if (!creditCard.test(sanitized)) {
	            return false;
	        }
	        var sum = 0, digit, tmpNum, shouldDouble;
	        for (var i = sanitized.length - 1; i >= 0; i--) {
	            digit = sanitized.substring(i, (i + 1));
	            tmpNum = parseInt(digit, 10);
	            if (shouldDouble) {
	                tmpNum *= 2;
	                if (tmpNum >= 10) {
	                    sum += ((tmpNum % 10) + 1);
	                } else {
	                    sum += tmpNum;
	                }
	            } else {
	                sum += tmpNum;
	            }
	            shouldDouble = !shouldDouble;
	        }
	        return !!((sum % 10) === 0 ? sanitized : false);
	    };

	    validator.isISIN = function (str) {
	        if (!isin.test(str)) {
	            return false;
	        }

	        var checksumStr = str.replace(/[A-Z]/g, function(character) {
	            return parseInt(character, 36);
	        });

	        var sum = 0, digit, tmpNum, shouldDouble = true;
	        for (var i = checksumStr.length - 2; i >= 0; i--) {
	            digit = checksumStr.substring(i, (i + 1));
	            tmpNum = parseInt(digit, 10);
	            if (shouldDouble) {
	                tmpNum *= 2;
	                if (tmpNum >= 10) {
	                    sum += tmpNum + 1;
	                } else {
	                    sum += tmpNum;
	                }
	            } else {
	                sum += tmpNum;
	            }
	            shouldDouble = !shouldDouble;
	        }

	        return parseInt(str.substr(str.length - 1), 10) === (10000 - sum) % 10;
	    };

	    validator.isISBN = function (str, version) {
	        version = validator.toString(version);
	        if (!version) {
	            return validator.isISBN(str, 10) || validator.isISBN(str, 13);
	        }
	        var sanitized = str.replace(/[\s-]+/g, '')
	          , checksum = 0, i;
	        if (version === '10') {
	            if (!isbn10Maybe.test(sanitized)) {
	                return false;
	            }
	            for (i = 0; i < 9; i++) {
	                checksum += (i + 1) * sanitized.charAt(i);
	            }
	            if (sanitized.charAt(9) === 'X') {
	                checksum += 10 * 10;
	            } else {
	                checksum += 10 * sanitized.charAt(9);
	            }
	            if ((checksum % 11) === 0) {
	                return !!sanitized;
	            }
	        } else  if (version === '13') {
	            if (!isbn13Maybe.test(sanitized)) {
	                return false;
	            }
	            var factor = [ 1, 3 ];
	            for (i = 0; i < 12; i++) {
	                checksum += factor[i % 2] * sanitized.charAt(i);
	            }
	            if (sanitized.charAt(12) - ((10 - (checksum % 10)) % 10) === 0) {
	                return !!sanitized;
	            }
	        }
	        return false;
	    };

	    validator.isMobilePhone = function(str, locale) {
	        if (locale in phones) {
	            return phones[locale].test(str);
	        }
	        return false;
	    };

	    var default_currency_options = {
	        symbol: '$'
	      , require_symbol: false
	      , allow_space_after_symbol: false
	      , symbol_after_digits: false
	      , allow_negatives: true
	      , parens_for_negatives: false
	      , negative_sign_before_digits: false
	      , negative_sign_after_digits: false
	      , allow_negative_sign_placeholder: false
	      , thousands_separator: ','
	      , decimal_separator: '.'
	      , allow_space_after_digits: false
	    };

	    validator.isCurrency = function (str, options) {
	        options = merge(options, default_currency_options);

	        return currencyRegex(options).test(str);
	    };

	    validator.isJSON = function (str) {
	        try {
	            var obj = JSON.parse(str);
	            return !!obj && typeof obj === 'object';
	        } catch (e) {}
	        return false;
	    };

	    validator.isMultibyte = function (str) {
	        return multibyte.test(str);
	    };

	    validator.isAscii = function (str) {
	        return ascii.test(str);
	    };

	    validator.isFullWidth = function (str) {
	        return fullWidth.test(str);
	    };

	    validator.isHalfWidth = function (str) {
	        return halfWidth.test(str);
	    };

	    validator.isVariableWidth = function (str) {
	        return fullWidth.test(str) && halfWidth.test(str);
	    };

	    validator.isSurrogatePair = function (str) {
	        return surrogatePair.test(str);
	    };

	    validator.isBase64 = function (str) {
	        return base64.test(str);
	    };

	    validator.isMongoId = function (str) {
	        return validator.isHexadecimal(str) && str.length === 24;
	    };

	    validator.isISO8601 = function (str) {
	        return iso8601.test(str);
	    };

	    validator.ltrim = function (str, chars) {
	        var pattern = chars ? new RegExp('^[' + chars + ']+', 'g') : /^\s+/g;
	        return str.replace(pattern, '');
	    };

	    validator.rtrim = function (str, chars) {
	        var pattern = chars ? new RegExp('[' + chars + ']+$', 'g') : /\s+$/g;
	        return str.replace(pattern, '');
	    };

	    validator.trim = function (str, chars) {
	        var pattern = chars ? new RegExp('^[' + chars + ']+|[' + chars + ']+$', 'g') : /^\s+|\s+$/g;
	        return str.replace(pattern, '');
	    };

	    validator.escape = function (str) {
	        return (str.replace(/&/g, '&amp;')
	            .replace(/"/g, '&quot;')
	            .replace(/'/g, '&#x27;')
	            .replace(/</g, '&lt;')
	            .replace(/>/g, '&gt;')
	            .replace(/\//g, '&#x2F;')
	            .replace(/\`/g, '&#96;'));
	    };

	    validator.stripLow = function (str, keep_new_lines) {
	        var chars = keep_new_lines ? '\\x00-\\x09\\x0B\\x0C\\x0E-\\x1F\\x7F' : '\\x00-\\x1F\\x7F';
	        return validator.blacklist(str, chars);
	    };

	    validator.whitelist = function (str, chars) {
	        return str.replace(new RegExp('[^' + chars + ']+', 'g'), '');
	    };

	    validator.blacklist = function (str, chars) {
	        return str.replace(new RegExp('[' + chars + ']+', 'g'), '');
	    };

	    var default_normalize_email_options = {
	        lowercase: true
	    };

	    validator.normalizeEmail = function (email, options) {
	        options = merge(options, default_normalize_email_options);
	        if (!validator.isEmail(email)) {
	            return false;
	        }
	        var parts = email.split('@', 2);
	        parts[1] = parts[1].toLowerCase();
	        if (parts[1] === 'gmail.com' || parts[1] === 'googlemail.com') {
	            parts[0] = parts[0].toLowerCase().replace(/\./g, '');
	            if (parts[0][0] === '+') {
	                return false;
	            }
	            parts[0] = parts[0].split('+')[0];
	            parts[1] = 'gmail.com';
	        } else if (options.lowercase) {
	            parts[0] = parts[0].toLowerCase();
	        }
	        return parts.join('@');
	    };

	    function merge(obj, defaults) {
	        obj = obj || {};
	        for (var key in defaults) {
	            if (typeof obj[key] === 'undefined') {
	                obj[key] = defaults[key];
	            }
	        }
	        return obj;
	    }

	    function currencyRegex(options) {
	        var symbol = '(\\' + options.symbol.replace(/\./g, '\\.') + ')' + (options.require_symbol ? '' : '?')
	            , negative = '-?'
	            , whole_dollar_amount_without_sep = '[1-9]\\d*'
	            , whole_dollar_amount_with_sep = '[1-9]\\d{0,2}(\\' + options.thousands_separator + '\\d{3})*'
	            , valid_whole_dollar_amounts = ['0', whole_dollar_amount_without_sep, whole_dollar_amount_with_sep]
	            , whole_dollar_amount = '(' + valid_whole_dollar_amounts.join('|') + ')?'
	            , decimal_amount = '(\\' + options.decimal_separator + '\\d{2})?';
	        var pattern = whole_dollar_amount + decimal_amount;
	        // default is negative sign before symbol, but there are two other options (besides parens)
	        if (options.allow_negatives && !options.parens_for_negatives) {
	            if (options.negative_sign_after_digits) {
	                pattern += negative;
	            }
	            else if (options.negative_sign_before_digits) {
	                pattern = negative + pattern;
	            }
	        }
	        // South African Rand, for example, uses R 123 (space) and R-123 (no space)
	        if (options.allow_negative_sign_placeholder) {
	            pattern = '( (?!\\-))?' + pattern;
	        }
	        else if (options.allow_space_after_symbol) {
	            pattern = ' ?' + pattern;
	        }
	        else if (options.allow_space_after_digits) {
	            pattern += '( (?!$))?';
	        }
	        if (options.symbol_after_digits) {
	            pattern += symbol;
	        } else {
	            pattern = symbol + pattern;
	        }
	        if (options.allow_negatives) {
	            if (options.parens_for_negatives) {
	                pattern = '(\\(' + pattern + '\\)|' + pattern + ')';
	            }
	            else if (!(options.negative_sign_before_digits || options.negative_sign_after_digits)) {
	                pattern = negative + pattern;
	            }
	        }
	        return new RegExp(
	            '^' +
	            // ensure there's a dollar and/or decimal amount, and that it doesn't start with a space or a negative sign followed by a space
	            '(?!-? )(?=.*\\d)' +
	            pattern +
	            '$'
	        );
	    }

	    validator.init();

	    return validator;

	});


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * ------------------------------------------------------------
	 * NumberInput 输入扩展
	 * @author   sensen(rainforest92@126.com)
	 * ------------------------------------------------------------
	 */

	var Input2 = __webpack_require__(11);
	var template = __webpack_require__(16);
	var _ = __webpack_require__(3);

	/**
	 * @class NumberInput
	 * @extend Input2
	 * @param {object}                  options.data                    绑定属性
	 * @param {string=0}                options.data.value              输入框的值
	 * @param {string=''}               options.data.type               输入框的类型
	 * @param {number=undefined}        options.data.min                最小值
	 * @param {number=undefined}        options.data.max                最大值
	 * @param {boolean=false}           options.data.readonly           是否只读
	 * @param {boolean=false}           options.data.disabled           是否禁用
	 * @param {boolean=true}            options.data.visible            是否显示
	 * @param {string=''}               options.data.class              补充class
	 */
	var NumberInput = Input2.extend({
	    name: 'numberInput',
	    template: template,
	    /**
	     * @protected
	     */
	    config: function() {
	        _.extend(this.data, {
	            value: 0,
	            // @inherited type: '',
	            // @inherited placeholder: '',
	            min: undefined,
	            max: undefined
	        });
	        this.supr();

	        this.$watch('value', function(newValue, oldValue) {
	            // 字符类型自动转为数字类型
	            if(typeof newValue === 'string')
	                return this.data.value = +newValue;

	            // 如果超出数值范围，则设置为范围边界的数值
	            var isOutOfRange = this.isOutOfRange(newValue);
	            if(isOutOfRange !== false)
	                return this.data.value = isOutOfRange;

	            /**
	             * @event change 数值改变时触发
	             * @property {number} value 改变后的数值
	             */
	            this.$emit('change', {
	                value: newValue
	            });
	        });

	        this.$watch(['min', 'max'], function(min, max) {
	            if(!isNaN(min) && !isNaN(max) && min - max > 0)
	                throw new NumberInput.NumberRangeException(min, max);

	            // 如果超出数值范围，则设置为范围边界的数值
	            var isOutOfRange = this.isOutOfRange(this.data.value);
	            if(isOutOfRange !== false)
	                return this.data.value = isOutOfRange;
	        });
	    },
	    /**
	     * @method add(value) 调整数值
	     * @public
	     * @param  {number=0} value 加/减的值
	     * @return {void}
	     */
	    add: function(value) {
	        if(this.data.readonly || this.data.disabled || !value)
	            return;

	        this.data.value += value;
	    },
	    /**
	     * @method isOutOfRange(value) 是否超出规定的数值范围
	     * @public
	     * @param {number} value 待测的值
	     * @return {boolean|number} 如果没有超出数值范围，则返回false；如果超出数值范围，则返回范围边界的数值
	     */
	    isOutOfRange: function(value) {
	        var min = +this.data.min;
	        var max = +this.data.max;

	        // min && value < min && min，先判断是否为空，再判断是否超出数值范围，如果超出则返回范围边界的数值
	        if(!isNaN(min) && value < min)
	            return min;
	        else if(!isNaN(max) && value > max)
	            return max;
	        else
	            return false;
	    }
	}).filter({
	    number: {
	        get: function(value) {
	            value = '' + (value || 0);
	            if(this.data.format)
	                return this.data.format.replace(new RegExp('\\d{0,' + value.length + '}$'), value);
	            return value;
	        },
	        set: function(value) {
	            // return (value.replace(/[^0-9\-\.]/g, ''));
	            return +value;
	            // return +(value.replace(/[^\d\.\-]/g, '')) || 0;
	        }
	    }
	});

	NumberInput.NumberRangeException = function(min, max) {
	    this.type = 'NumberRangeException';
	    this.message = 'Wrong Number Range where `min` is ' + min + ' and `max` is ' + max + '!';
	}

	NumberInput.NumberRangeException.prototype.toString = function() {
	    return this.message;
	}

	module.exports = NumberInput;

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = "<label class=\"u-input2 u-numberinput {@(class)}\" r-hide={!visible}>\n    <input class=\"u-input u-input-{type}\" r-model={value | number} placeholder={placeholder} disabled={disabled} readonly={readonly}>\n    <a class=\"u-btn\" r-class={ {'z-dis': disabled} } on-click={this.add(1)}><i class=\"u-icon u-icon-caret-up\"></i></a>\n    <a class=\"u-btn\" r-class={ {'z-dis': disabled} } on-click={this.add(-1)}><i class=\"u-icon u-icon-caret-down\"></i></a>\n</label>\n{#if tip}<span class=\"u-tip u-tip-{type}\">{tip}</span>{/if}"

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * ------------------------------------------------------------
	 * Check2   多选按钮
	 * @author   sensen(rainforest92@126.com)
	 * ------------------------------------------------------------
	 */

	'use strict';

	var Component = __webpack_require__(2);
	var template = __webpack_require__(18);
	var _ = __webpack_require__(3);

	/**
	 * @class Check2
	 * @extend Component
	 * @param {object}                  options.data                    绑定属性
	 * @param {string=''}               options.data.name               多选按钮的文字
	 * @param {object=null}             options.data.checked            多选按钮的选择状态
	 * @param {boolean=false}           options.data.block              是否以block方式显示
	 * @param {boolean=false}           options.data.readonly           是否只读
	 * @param {boolean=false}           options.data.disabled           是否禁用
	 * @param {boolean=true}            options.data.visible            是否显示
	 * @param {string=''}               options.data.class              补充class
	 */
	var Check2 = Component.extend({
	    name: 'check2',
	    template: template,
	    /**
	     * @protected
	     */
	    config: function() {
	        _.extend(this.data, {
	            name: '',
	            checked: false,
	            block: false
	        });
	        this.supr();
	    },
	    /**
	     * @method check(checked) 改变选中状态
	     * @public
	     * @param  {boolean} checked 选中状态
	     * @return {void}
	     */
	    check: function(checked) {
	        if(this.data.readonly || this.data.disabled)
	            return;

	        this.data.checked = checked;
	        /**
	         * @event check 改变选中状态时触发
	         * @property {boolean} checked 选中状态
	         */
	        this.$emit('check', {
	            checked: checked
	        });
	    }
	});

	module.exports = Check2;

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = "<label class=\"u-check2 {@(class)}\" r-class={ {'z-dis': disabled, 'z-chk': checked, 'z-part': checked === null, 'u-check2-block': block} } r-hide={!visible} title={name} on-click={this.check(!checked)}><div class=\"check2_box\"><i class=\"u-icon u-icon-check\"></i></div> {name}</label>"

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * ------------------------------------------------------------
	 * CheckGroup 多选组
	 * @author   sensen(rainforest92@126.com)
	 * ------------------------------------------------------------
	 */

	'use strict';

	var SourceComponent = __webpack_require__(5);
	var template = __webpack_require__(20);
	var _ = __webpack_require__(3);

	/**
	 * @class CheckGroup
	 * @extend SourceComponent
	 * @param {object}                  options.data                    绑定属性
	 * @param {object[]=[]}             options.data.source             数据源
	 * @param {number}                  options.data.source[].id        每项的id
	 * @param {string}                  options.data.source[].name      每项的内容
	 * @param {boolean=false}           options.data.block              多行显示
	 * @param {boolean=false}           options.data.readonly           是否只读
	 * @param {boolean=false}           options.data.disabled           是否禁用
	 * @param {boolean=true}            options.data.visible            是否显示
	 * @param {string=''}               options.data.class              补充class
	 * @param {object}                  options.service                 数据服务
	 */
	var CheckGroup = SourceComponent.extend({
	    name: 'checkGroup',
	    template: template,
	    /**
	     * @protected
	     */
	    config: function() {
	        _.extend(this.data, {
	            // @inherited source: [],
	            block: false
	        });
	        this.supr();
	    }
	});

	module.exports = CheckGroup;

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = "<div class=\"u-unitgroup {@(class)}\" r-hide={!visible}>\n    {#list source as item}\n    <label class=\"u-check2\" r-class={ {'z-dis': disabled, 'u-check2-block': block} } title={item.name}><input type=\"checkbox\" class=\"u-check\" r-model={item.checked} disabled={disabled}> {item.name}</label>\n    {/list}\n</div>"

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * ------------------------------------------------------------
	 * Check2Group 输入扩展
	 * @author   sensen(rainforest92@126.com)
	 * ------------------------------------------------------------
	 */

	'use strict';

	var CheckGroup = __webpack_require__(19);
	var template = __webpack_require__(22);
	var _ = __webpack_require__(3);
	var Check2 = __webpack_require__(17);

	/**
	 * @class Check2Group
	 * @extend CheckGroup
	 * @param {object}                  options.data                    绑定属性
	 * @param {object[]=[]}             options.data.source             数据源
	 * @param {number}                  options.data.source[].id        每项的id
	 * @param {string}                  options.data.source[].name      每项的内容
	 * @param {boolean=false}           options.data.block              多行显示
	 * @param {boolean=false}           options.data.readonly           是否只读
	 * @param {boolean=false}           options.data.disabled           是否禁用
	 * @param {boolean=true}            options.data.visible            是否显示
	 * @param {string=''}               options.data.class              补充class
	 * @param {object}                  options.service                 数据服务
	 */
	var Check2Group = CheckGroup.extend({
	    name: 'check2Group',
	    template: template
	});

	module.exports = Check2Group;

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = "<div class=\"u-unitgroup {@(class)}\" r-hide={!visible}>\n    {#list source as item}\n    <check2 name={item.name} checked={item.checked} disabled={disabled} block={block} />\n    {/list}\n</div>"

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * ------------------------------------------------------------
	 * RadioGroup 单选组
	 * @author   sensen(rainforest92@126.com)
	 * ------------------------------------------------------------
	 */

	'use strict';

	var SourceComponent = __webpack_require__(5);
	var template = __webpack_require__(24);
	var _ = __webpack_require__(3);

	/**
	 * @class RadioGroup
	 * @extend SourceComponent
	 * @param {object}                  options.data                    绑定属性
	 * @param {object[]=[]}             options.data.source             数据源
	 * @param {number}                  options.data.source[].id        每项的id
	 * @param {string}                  options.data.source[].name      每项的内容
	 * @param {object=null}             options.data.seleced            当前选择项
	 * @param {boolean=false}           options.data.block              多行显示
	 * @param {boolean=false}           options.data.readonly           是否只读
	 * @param {boolean=false}           options.data.disabled           是否禁用
	 * @param {boolean=true}            options.data.visible            是否显示
	 * @param {string=''}               options.data.class              补充class
	 * @param {object}                  options.service                 数据服务
	 */
	var RadioGroup = SourceComponent.extend({
	    name: 'radioGroup',
	    template: template,
	    /**
	     * @protected
	     */
	    config: function() {
	        _.extend(this.data, {
	            // @inherited source: [],
	            selected: null,
	            _radioGroupId: new Date()
	        });
	        this.supr();
	    },
	    /**
	     * @method select(item) 选择某一项
	     * @public
	     * @param  {object} item 选择项
	     * @return {void}
	     */
	    select: function(item) {
	        if(this.data.readonly || this.data.disabled)
	            return;

	        this.data.selected = item;
	        /**
	         * @event select 选择某一项时触发
	         * @property {object} selected 当前选择项
	         */
	        this.$emit('select', {
	            selected: item
	        });
	    }
	});

	module.exports = RadioGroup;

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = "<div class=\"u-unitgroup {@(class)}\" r-hide={!visible}>\n    {#list source as item}\n    <label class=\"u-radio2\" r-class={ {'z-dis': disabled, 'u-radio2-block': block} } title={item.name} on-click={this.select(item)}><input type=\"radio\" class=\"u-radio\" name={_radioGroupId} disabled={disabled}> {item.name}</label>\n    {/list}\n</div>"

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * ------------------------------------------------------------
	 * Radio2Group 输入扩展
	 * @author   sensen(rainforest92@126.com)
	 * ------------------------------------------------------------
	 */

	'use strict';

	var RadioGroup = __webpack_require__(23);
	var template = __webpack_require__(26);
	var _ = __webpack_require__(3);

	/**
	 * @class Radio2Group
	 * @extend RadioGroup
	 * @param {object}                  options.data                    绑定属性
	 * @param {object[]=[]}             options.data.source             数据源
	 * @param {number}                  options.data.source[].id        每项的id
	 * @param {string}                  options.data.source[].name      每项的内容
	 * @param {object=null}             options.data.seleced            当前选择项
	 * @param {boolean=false}           options.data.block              多行显示
	 * @param {boolean=false}           options.data.readonly           是否只读
	 * @param {boolean=false}           options.data.disabled           是否禁用
	 * @param {boolean=true}            options.data.visible            是否显示
	 * @param {string=''}               options.data.class              补充class
	 * @param {object}                  options.service                 数据服务
	 */
	var Radio2Group = RadioGroup.extend({
	    name: 'radio2Group',
	    template: template
	});

	module.exports = Radio2Group;

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = "<div class=\"u-unitgroup {@(class)}\" r-hide={!visible}>\n    {#list source as item}\n    <label class=\"u-radio2\" r-class={ {'z-dis': disabled, 'z-sel': item === selected, 'u-radio2-block': block} } title={item.name} on-click={this.select(item)}><div class=\"radio2_box\"><i class=\"u-icon u-icon-radio\"></i></div> {item.name}</label>\n    {/list}\n</div>"

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * ------------------------------------------------------------
	 * Select2  选择扩展
	 * @author   sensen(rainforest92@126.com)
	 * ------------------------------------------------------------
	 */

	'use strict';

	var Dropdown = __webpack_require__(6);
	var template = __webpack_require__(28);
	var _ = __webpack_require__(3);

	/**
	 * @class Select2
	 * @extend Dropdown
	 * @param {object}                  options.data                    绑定属性
	 * @param {object[]=[]}             options.data.source             数据源
	 * @param {number}                  options.data.source[].id        每项的id
	 * @param {string}                  options.data.source[].name      每项的内容
	 * @param {object=null}             options.data.selected           当前选择项
	 * @param {string='请选择'}         options.data.placeholder        默认项的文字
	 * @param {boolean=false}           options.data.readonly           是否只读
	 * @param {boolean=false}           options.data.disabled           是否禁用
	 * @param {boolean=true}            options.data.visible            是否显示
	 * @param {string=''}               options.data.class              补充class
	 * @param {object}                  options.service                 数据服务
	 */
	var Select2 = Dropdown.extend({
	    name: 'select2',
	    template: template,
	    /**
	     * @protected
	     */
	    config: function() {
	        _.extend(this.data, {
	            // @inherited source: [],
	            // @inherited open: false
	            selected: null,
	            placeholder: '请选择'
	        });
	        this.supr();
	    },
	    /**
	     * @method select(item) 选择某一项
	     * @public
	     * @param  {object} item 选择项
	     * @return {void}
	     */
	    select: function(item) {
	        this.$update('selected', item);
	        //this.data.selected = item;
	        /**
	         * @event select 选择某一项时触发
	         * @property {object} selected 当前选择项
	         */
	        this.$emit('select', {
	            selected: item
	        });
	        this.toggle(false);
	    },
	});

	module.exports = Select2;

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = "<div class=\"u-dropdown u-select2 {@(class)}\" r-class={ {'z-dis': disabled} } r-hide={!visible} ref=\"element\">\n    <div class=\"dropdown_hd\" on-click={this.toggle(!open)}>\n        <span>{selected ? selected.name : placeholder}</span>\n        <i class=\"u-icon u-icon-caret-down\"></i>\n    </div>\n    <div class=\"dropdown_bd\" r-hide={!open} r-animation=\"on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;\">\n        <ul class=\"m-listview\">\n            {#if placeholder}<li r-class={ {'z-sel': selected === null} } on-click={this.select(null)}>{placeholder}</li>{/if}\n            {#list source as item}\n            <li r-class={ {'z-sel': selected === item} } on-click={this.select(item)}>{item.name}</li>\n            {/list}\n        </ul>\n    </div>\n</div>"

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * ------------------------------------------------------------
	 * TreeSelect 树型选择
	 * @author   sensen(rainforest92@126.com)
	 * ------------------------------------------------------------
	 */

	'use strict';

	var Select2 = __webpack_require__(27);
	var template = __webpack_require__(30);
	var _ = __webpack_require__(3);
	var Treeview = __webpack_require__(31);

	/**
	 * @class TreeSelect
	 * @extend Select2
	 * @param {object}                  options.data                    绑定属性
	 * @param {object[]=[]}             options.data.source             数据源
	 * @param {number}                  options.data.source[].id        每项的id
	 * @param {string}                  options.data.source[].name      每项的内容
	 * @param {object=null}             options.data.selected           当前选择项
	 * @param {string='请选择'}         options.data.placeholder        默认项的文字
	 * @param {boolean=false}           options.data.hierarchical       是否分级动态加载，需要service
	 * @param {boolean=false}           options.data.readonly           是否只读
	 * @param {boolean=false}           options.data.disabled           是否禁用
	 * @param {boolean=true}            options.data.visible            是否显示
	 * @param {string=''}               options.data.class              补充class
	 * @param {object}                  options.service                 数据服务
	 */
	var TreeSelect = Select2.extend({
	    name: 'treeSelect',
	    template: template,
	    config: function() {
	        _.extend(this.data, {
	            // @inherited source: [],
	            // @inherited open: false,
	            // @inherited selected: null,
	            // @inherited placeholder: '请选择'
	            hierarchical: false,
	            updateAuto: false
	        });
	        this.supr();
	    }
	});

	module.exports = TreeSelect;

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = "<div class=\"u-dropdown u-select2 {@(class)}\" r-class={ {'z-dis': disabled} } r-hide={!visible} ref=\"element\">\n    <div class=\"dropdown_hd\" on-click={this.toggle(!open)}>\n        <i class=\"u-icon u-icon-caret-down\"></i>\n        <span>{selected ? selected.name : placeholder}</span>\n    </div>\n    <div class=\"dropdown_bd\" r-hide={!open} r-animation=\"on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;\">\n        <treeView source={source} hierarchical={hierarchical} service={service} on-select={this.select($event.selected)} />\n    </div>\n</div>"

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * ------------------------------------------------------------
	 * TreeView  树型视图
	 * @author   sensen(rainforest92@126.com)
	 * ------------------------------------------------------------
	 */

	'use strict';

	var SourceComponent = __webpack_require__(5);
	var template = __webpack_require__(32);
	var hierarchicalTemplate = __webpack_require__(33);
	var _ = __webpack_require__(3);

	/**
	 * @class TreeView
	 * @extend SourceComponent
	 * @param {object}                  options.data                    绑定属性
	 * @param {object[]=[]}             options.data.source             数据源
	 * @param {number}                  options.data.source[].id        每项的id
	 * @param {string}                  options.data.source[].name      每项的内容
	 * @param {object=null}             options.data.selected           当前选择项
	 * @param {boolean=false}           options.data.hierarchical       是否分级动态加载，需要service
	 * @param {boolean=false}           options.data.readonly           是否只读
	 * @param {boolean=false}           options.data.disabled           是否禁用
	 * @param {boolean=true}            options.data.visible            是否显示
	 * @param {string=''}               options.data.class              补充class
	 * @param {object}                  options.service                 数据服务
	 */
	var TreeView = SourceComponent.extend({
	    name: 'treeView',
	    template: template,
	    /**
	     * @protected
	     */
	    config: function() {
	        _.extend(this.data, {
	            // @inherited source: [],
	            selected: null,
	            multiple: false,
	            hierarchical: false
	        });
	        this.supr();

	        this.$ancestor = this;
	    },
	    /**
	     * @method select(item) 选择某一项
	     * @public
	     * @param  {object} item 选择项
	     * @return {void}
	     */
	    select: function(item) {
	        if(this.data.readonly || this.data.disabled || item.disabled)
	            return;

	        this.data.selected = item;
	        /**
	         * @event select 选择某一项时触发
	         * @property {object} selected 当前选择项
	         */
	        this.$emit('select', {
	            selected: item
	        });
	    },
	    /**
	     * @method toggle(item) 展开或收起某一项
	     * @private
	     * @param  {object} item 展开收起项
	     * @return {void}
	     */
	    toggle: function(item) {
	        if(this.data.readonly || this.data.disabled || item.disabled)
	            return;

	        item.open = !item.open;

	        /**
	         * @event toggle 展开或收起某一项时触发
	         * @property {object} item 展开收起项
	         * @property {boolean} open 展开还是收起
	         */
	        this.$emit('toggle', {
	            item: item,
	            open: item.open
	        });
	    }
	});

	var TreeViewList = SourceComponent.extend({
	    name: 'treeViewList',
	    template: hierarchicalTemplate,
	    /**
	     * @protected
	     */
	    config: function() {
	        _.extend(this.data, {
	            // @inherited source: [],
	            itemTemplate: null,
	            visible: false
	        });
	        this.supr();

	        this.$ancestor = this.$parent.$ancestor;
	        this.service = this.$ancestor.service;
	        this.data.itemTemplate = this.$ancestor.data.itemTemplate;
	        this.data.hierarchical = this.$ancestor.data.hierarchical;

	        this.$watch('visible', function(newValue) {
	            if(!this.data.hierarchical)
	                return;

	            if(!newValue || this.$parent.name !== 'treeViewList')
	                return;

	            this.$updateSource(function() {
	                this.data.hierarchical = false;
	            });
	        });
	    },
	    /**
	     * @override
	     */
	    getParams: function() {
	        if(this.data.parent)
	            return _.extend({parentId: this.data.parent.id}, this.$ancestor.getParams());
	    },
	    $updateSource: function() {
	        this.service.getList(this.getParams(), function(result) {
	            // 给每个节点item添加parent
	            result.forEach(function(item) {
	                item.parent = this.data.parent;
	            }.bind(this));

	            this.$update('source', result);

	            this.$emit('updateSource', {
	                result: result
	            });
	        }.bind(this));
	        return this;
	    },
	    /**
	     * @method select(item) 选择某一项
	     * @private
	     * @param  {object} item 选择项
	     * @return {void}
	     */
	    select: function(item) {
	        this.$ancestor.select(item);
	    },
	    /**
	     * @method toggle(item) 展开或收起某一项
	     * @private
	     * @param  {object} item 展开收起项
	     * @return {void}
	     */
	    toggle: function(item) {
	        this.$ancestor.toggle(item);
	    }
	});

	module.exports = TreeView;

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = "<div class=\"m-treeview {@(class)}\" r-class={ {'z-dis': disabled} } r-hide={!visible}>\n    <treeViewList source={source} visible={true} />\n</div>"

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = "<ul class=\"treeview_list\" r-hide={!visible}>\n    {#list source as item}\n    <li>\n        <div class=\"treeview_item\">\n            {#if item.childrenCount || (item.children && item.children.length)}\n            <i class=\"u-icon\" r-class={ {'u-icon-caret-right': !item.open, 'u-icon-caret-down': item.open}} on-click={this.toggle(item)}></i>\n            {/if}\n            <div class=\"treeview_itemname\" r-class={ {'z-sel': this.$ancestor.data.selected === item, 'z-dis': item.disabled} } title={item.name} on-click={this.select(item)}>{#if @(itemTemplate)}{#include @(itemTemplate)}{#else}{item.name}{/if}</div>\n        </div>\n        {#if item.childrenCount || (item.children && item.children.length)}<treeViewList source={item.children} visible={item.open} parent={item} />{/if}\n    </li>\n    {/list}\n</ul>"

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * ------------------------------------------------------------
	 * Suggest   自动提示
	 * @author   sensen(rainforest92@126.com)
	 * ------------------------------------------------------------
	 */

	'use strict';

	var Dropdown = __webpack_require__(6);
	var template = __webpack_require__(35);
	var _ = __webpack_require__(3);

	/**
	 * @class Suggest
	 * @extend Dropdown
	 * @param {object}                  options.data                    绑定属性
	 * @param {object[]=[]}             options.data.source             数据源
	 * @param {number}                  options.data.source[].id        每项的id
	 * @param {string}                  options.data.source[].name      每项的内容
	 * @param {object=null}             options.data.selected           当前选择项
	 * @param {string=''}               options.data.value              文本框中的值
	 * @param {string='请输入'}         options.data.placeholder        文本框的占位文字
	 * @param {number=0}                options.data.minLength          最小提示长度。当输入长度>=该值后开始提示
	 * @param {string='all'}            options.data.matchType          匹配方式，`all`表示匹配全局，`start`表示只匹配开头，`end`表示只匹配结尾
	 * @param {boolean=false}           options.data.strict             是否为严格模式。当为严格模式时，`value`属性必须在source中选择，否则为空。
	 * @param {boolean=false}           options.data.readonly           是否只读
	 * @param {boolean=false}           options.data.disabled           是否禁用
	 * @param {boolean=true}            options.data.visible            是否显示
	 * @param {string=''}               options.data.class              补充class
	 * @param {object}                  options.service                 数据服务
	 */
	var Suggest = Dropdown.extend({
	    name: 'suggest',
	    template: template,
	    /**
	     * @protected
	     */
	    config: function() {
	        _.extend(this.data, {
	            // @inherited source: [],
	            // @inherited open: false,
	            selected: null,
	            value: '',
	            placeholder: '请输入',
	            minLength: 0,
	            delay: 300,
	            matchType: 'all',
	            strict: false
	        });
	        this.supr();
	    },
	    /**
	     * @method select(item) 选择某一项
	     * @public
	     * @param  {object} item 选择项
	     * @return {void}
	     */
	    select: function(item) {
	        this.$update('selected', item);
	        this.data.value = item.name;
	        //this.data.selected = item;
	        /**
	         * @event select 选择某一项时触发
	         * @property {object} selected 当前选择项
	         */
	        this.$emit('select', {
	            selected: item
	        });
	        this.toggle(false);
	    },
	    /**
	     * @method toggle(open)  在展开状态和收起状态之间切换
	     * @public
	     * @param  {boolean} open 展开还是收起
	     * @return {void}
	     */
	    toggle: function(open, _isInput) {
	        if(this.data.readonly || this.data.disabled)
	            return;

	        this.data.open = open;

	        /**
	         * @event toggle 展开或收起状态改变时触发
	         * @property {boolean} open 展开还是收起
	         */
	        this.$emit('toggle', {
	            open: open
	        });

	        var index = Dropdown.opens.indexOf(this);
	        if(open && index < 0)
	            Dropdown.opens.push(this);
	        else if(!open && index >= 0) {
	            Dropdown.opens.splice(index, 1);

	            if(!_isInput && this.data.strict)
	               this.data.value = this.data.selected ? this.data.selected.name : '';
	        }
	    },
	    // 输入时
	    input: function($event) {
	        var value = this.data.value;

	        if(value.length >= this.data.minLength) {
	            this.toggle(true);
	            if(this.service)
	                this.$updateSource();
	        } else
	            this.toggle(false, true);
	    },
	    uninput: function($event) {

	    },
	    getParams: function() {
	        return {value: this.data.value};
	    },
	    filter: function(item) {
	        var value = this.data.value;

	        if(!value && this.data.minLength)
	            return false;

	        if(this.data.matchType === 'all')
	            return item.name.indexOf(value) >= 0;
	        else if(this.data.matchType === 'start')
	            return item.name.slice(0, value.length) === value;
	        else if(this.data.matchType === 'end')
	            return item.name.slice(-value.length) === value;
	    }
	});

	module.exports = Suggest;

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = "<div class=\"u-dropdown u-suggest {@(class)}\" r-class={ {'z-dis': disabled} } r-hide={!visible} ref=\"element\">\n    <div class=\"dropdown_hd\">\n        <input class=\"u-input u-input-full\" placeholder={placeholder} r-model={value} on-focus={this.input($event)} on-keyup={this.input($event)} on-blur={this.uninput($event)} ref=\"input\" disabled={disabled} readonly={readonly}>\n    </div>\n    <div class=\"dropdown_bd\" r-hide={!open} r-animation=\"on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;\">\n        <ul class=\"m-listview\">\n            {#list source as item}\n            {#if this.filter(item)}\n                <li on-click={this.select(item)}>{item.name}</li>\n            {/if}\n            {/list}\n        </ul>\n    </div>\n</div>"

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * ------------------------------------------------------------
	 * Uploader  上传
	 * @author   sensen(rainforest92@126.com)
	 * ------------------------------------------------------------
	 */

	'use strict';

	var Component = __webpack_require__(2);
	var template = __webpack_require__(37);
	var _ = __webpack_require__(3);

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

/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = "<div class=\"u-uploader {@(class)}\" r-hide={!visible}>\n\t<div on-click={this.upload()}>\n\t\t{#if this.$body}\n\t\t\t{#inc this.$body}\n    \t{#else}\n    \t\t<a class=\"u-btn\">{title || '上传'}</a>\n\t\t{/if}\n    </div>\n    <form method=\"POST\" action={url} target=\"iframe{_id}\" enctype={contentType} ref=\"form\">\n        <input type=\"file\" name=\"file\" ref=\"file\" on-change={this.submit()}>\n        {#list Object.keys(data) as key}\n        <input type=\"hidden\" name={key} value={data[key]}>\n        {/list}\n    </form>\n    <iframe name=\"iframe{_id}\" on-load={this.cbUpload()} ref=\"iframe\">\n    </iframe>\n</div>"

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * ------------------------------------------------------------
	 * DatePicker 日期选择
	 * @author   sensen(rainforest92@126.com)
	 * ------------------------------------------------------------
	 */

	var Dropdown = __webpack_require__(6);
	var template = __webpack_require__(39);
	var _ = __webpack_require__(3);

	var filter = __webpack_require__(4);
	var Calendar = __webpack_require__(40);
	var MS_OF_DAY = 24*3600*1000;

	/**
	 * @class DatePicker
	 * @extend Dropdown
	 * @param {object}                  options.data                    绑定属性
	 * @param {object=null}             options.data.date               当前选择的日期
	 * @param {string='请输入'}         options.data.placeholder        文本框的占位文字
	 * @param {Date|string=null}        options.data.minDate            最小日期，如果为空则不限制
	 * @param {Date|string=null}        options.data.maxDate            最大日期，如果为空则不限制
	 * @param {boolean=false}           options.data.readonly           是否只读
	 * @param {boolean=false}           options.data.disabled           是否禁用
	 * @param {boolean=true}            options.data.visible            是否显示
	 * @param {string=''}               options.data.class              补充class
	 */
	var DatePicker = Dropdown.extend({
	    name: 'datePicker',
	    template: template,
	    /**
	     * @protected
	     */
	    config: function() {
	        _.extend(this.data, {
	            // @inherited source: [],
	            // @inherited open: false,
	            minDate: null,
	            maxDate: null,
	            placeholder: '请输入',
	            date: null,
	            _date: undefined
	        });
	        this.supr();

	        this.$watch('date', function(newValue, oldValue) {
	            // 字符类型自动转为日期类型
	            if(typeof newValue === 'string')
	                return this.data.date = new Date(newValue);

	            // 如果newValue为非法日期，则置为空 
	            if(newValue == 'Invalid Date')
	                return this.data.date = null;

	            // 如果不为空并且超出日期范围，则设置为范围边界的日期
	            if(newValue) {
	                var isOutOfRange = this.isOutOfRange(newValue);
	                if(isOutOfRange)
	                    return this.data.date = isOutOfRange;
	            }

	            if(newValue && (!this.data._date || this.data._date.toDateString() !== newValue.toDateString()))
	                this.data._date = new Date(newValue);

	            /**
	             * @event change 日期改变时触发
	             * @property {object} date 改变后的日期
	             */
	            this.$emit('change', {
	                date: newValue
	            });
	        });

	        this.$watch('minDate', function(newValue, oldValue) {
	            if(!newValue)
	                return;

	            if(typeof newValue === 'string')
	                return this.data.minDate = new Date(newValue);

	            if(newValue == 'Invalid Date')
	                return this.data.minDate = null;
	        });

	        this.$watch('maxDate', function(newValue, oldValue) {
	            if(!newValue)
	                return;

	            if(typeof newValue === 'string')
	                return this.data.maxDate = new Date(newValue);

	            if(newValue == 'Invalid Date')
	                return this.data.maxDate = null;
	        });

	        this.$watch(['minDate', 'maxDate'], function(minDate, maxDate) {
	            if(!(minDate && minDate instanceof Date || maxDate && maxDate instanceof Date))
	                return;

	            if(minDate && maxDate)
	                if(minDate/MS_OF_DAY>>0 > maxDate/MS_OF_DAY>>0)
	                    throw new Calendar.DateRangeException(minDate, maxDate);

	            // 如果不为空并且超出日期范围，则设置为范围边界的日期
	            if(this.data.date) {
	                var isOutOfRange = this.isOutOfRange(this.data.date);
	                if(isOutOfRange)
	                    return this.data.date = isOutOfRange;
	            }
	        });
	    },
	    /**
	     * @method select(date) 选择一个日期
	     * @public
	     * @param  {Date=null} date 选择的日期
	     * @return {void}
	     */
	    select: function(date) {
	        if(this.data.readonly || this.data.disabled || this.isOutOfRange(date))
	            return;

	        this.data.date = date;

	        /**
	         * @event select 选择某一项时触发
	         * @property {object} date 当前选择项
	         */
	        this.$emit('select', {
	            date: date
	        });

	        this.toggle(false);
	    },
	    /**
	     * @method _input($event) 输入日期
	     * @private
	     * @param  {object} $event
	     * @return {void}
	     */
	    _input: function($event) {
	        var value = $event.target.value;
	        var date = value ? new Date(value) : null;

	        if(date != 'Invalid Date')
	            this.data.date = date;
	        else
	            $event.target.value = filter.format(this.data.date, 'yyyy-MM-dd');
	    },
	    /**
	     * @method isOutOfRange(date) 是否超出规定的日期范围
	     * @public
	     * @param {Date} date 待测的日期
	     * @return {boolean|Date} 如果没有超出日期范围，则返回false；如果超出日期范围，则返回范围边界的日期
	     */
	    isOutOfRange: function(date) {
	        var minDate = this.data.minDate;
	        var maxDate = this.data.maxDate;

	        // 不要直接在$watch中改变`minDate`和`maxDate`的值，因为有时向外绑定时可能不希望改变它们。
	        var minDate = minDate && new Date((minDate/MS_OF_DAY>>0)*MS_OF_DAY);
	        var maxDate = maxDate && new Date((maxDate/MS_OF_DAY>>0)*MS_OF_DAY);

	        // minDate && date < minDate && minDate，先判断是否为空，再判断是否超出范围，如果超出则返回范围边界的日期。
	        return (minDate && date < minDate && minDate) || (maxDate && date > maxDate && maxDate);
	    }
	});

	module.exports = DatePicker;

/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = "<div class=\"u-dropdown u-datepicker {@(class)}\" r-class={ {'z-dis': disabled} } r-hide={!visible} ref=\"element\" on-blur={this.toggle(false)}>\n    <div class=\"dropdown_hd\">\n        <input class=\"u-input u-input-full\" placeholder={placeholder} value={date | format: 'yyyy-MM-dd'} on-focus={this.toggle(true)} on-change={this._input($event)} ref=\"input\" disabled={disabled} readonly={readonly}>\n    </div>\n    <div class=\"dropdown_bd\" r-hide={!open} r-animation=\"on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;\">\n        <calendar date={_date} minDate={minDate} maxDate={maxDate} on-select={this.select($event.date)} />\n    </div>\n</div>"

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * ------------------------------------------------------------
	 * Calendar  日历
	 * @author   sensen(rainforest92@126.com)
	 * ------------------------------------------------------------
	 */

	'use strict';

	var Component = __webpack_require__(2);
	var template = __webpack_require__(41);
	var _ = __webpack_require__(3);

	var MS_OF_DAY = 24*3600*1000;

	/**
	 * @class Calendar
	 * @extend Component
	 * @param {object}                  options.data                    绑定属性
	 * @param {Date|string=TODAY}       options.data.date               当前选择的日期
	 * @param {Date|string=null}        options.data.minDate            最小日期，如果为空则不限制
	 * @param {Date|string=null}        options.data.maxDate            最大日期，如果为空则不限制
	 * @param {boolean=false}           options.data.readonly           是否只读
	 * @param {boolean=false}           options.data.disabled           是否禁用
	 * @param {boolean=true}            options.data.visible            是否显示
	 * @param {string=''}               options.data.class              补充class
	 */
	var Calendar = Component.extend({
	    name: 'calendar',
	    template: template,
	    /**
	     * @protected
	     */
	    config: function() {
	        _.extend(this.data, {
	            date: null,
	            minDate: null,
	            maxDate: null,
	            _days: []
	        });
	        this.supr();

	        this.$watch('date', function(newValue, oldValue) {
	            // 字符类型自动转为日期类型
	            if(typeof newValue === 'string')
	                return this.data.date = new Date(newValue);

	            // 如果newValue为空或非法日期， 则自动转到今天
	            if(!newValue || newValue == 'Invalid Date')
	                return this.data.date = new Date((new Date/MS_OF_DAY>>0)*MS_OF_DAY);

	            // 如果超出日期范围，则设置为范围边界的日期
	            var isOutOfRange = this.isOutOfRange(newValue);
	            if(isOutOfRange) {
	                this.data.date = isOutOfRange;

	                // 防止第二次刷新同月
	                this._update();
	                return;
	            }

	            if(!oldValue || !oldValue.getFullYear)
	                this._update();
	            else if(newValue.getFullYear() !== oldValue.getFullYear() || newValue.getMonth() !== oldValue.getMonth())
	                this._update();

	            /**
	             * @event change 日期改变时触发
	             * @property {object} date 改变后的日期
	             */
	            this.$emit('change', {
	                date: newValue
	            });
	        });

	        this.$watch('minDate', function(newValue, oldValue) {
	            if(!newValue)
	                return;

	            if(typeof newValue === 'string')
	                return this.data.minDate = new Date(newValue);

	            if(newValue == 'Invalid Date')
	                return this.data.minDate = null;
	        });

	        this.$watch('maxDate', function(newValue, oldValue) {
	            if(!newValue)
	                return;

	            if(typeof newValue === 'string')
	                return this.data.maxDate = new Date(newValue);

	            if(newValue == 'Invalid Date')
	                return this.data.maxDate = null;
	        });

	        this.$watch(['minDate', 'maxDate'], function(minDate, maxDate) {
	            if(!(minDate && minDate instanceof Date || maxDate && maxDate instanceof Date))
	                return;

	            if(minDate && maxDate)
	                if(minDate/MS_OF_DAY>>0 > maxDate/MS_OF_DAY>>0)
	                    throw new Calendar.DateRangeException(minDate, maxDate);
	            
	            // 如果超出日期范围，则设置为范围边界的日期
	            var isOutOfRange = this.isOutOfRange(this.data.date);
	            if(isOutOfRange)
	                this.data.date = isOutOfRange;
	        });
	    },
	    /**
	     * @method _update() 日期改变后更新日历
	     * @private
	     * @return {void}
	     */
	    _update: function() {
	        this.data._days = [];
	        
	        var date = this.data.date;
	        var month = date.getMonth();
	        var mfirst = new Date(date); mfirst.setDate(1);
	        var mfirstTime = +mfirst;
	        var nfirst = new Date(mfirst); nfirst.setMonth(month + 1); nfirst.setDate(1);
	        var nfirstTime = +nfirst;
	        var lastTime = nfirstTime + ((7 - nfirst.getDay())%7 - 1)*MS_OF_DAY;
	        var num = - mfirst.getDay();
	        var tmpTime, tmp;
	        do {
	            tmpTime = mfirstTime + (num++)*MS_OF_DAY;
	            tmp = new Date(tmpTime);
	            this.data._days.push(tmp);
	        } while(tmpTime < lastTime);
	    },
	    /**
	     * @method addYear(year) 调整年份
	     * @public
	     * @param  {number=0} year 加/减的年份
	     * @return {void}
	     */
	    addYear: function(year) {
	        if(this.data.readonly || this.data.disabled || !year)
	            return;

	        var date = new Date(this.data.date);
	        var oldMonth = date.getMonth();
	        date.setFullYear(date.getFullYear() + year);
	        if(date.getMonth() != oldMonth)
	            date.setDate(0);
	        this.data.date = date;
	    },
	    /**
	     * @method addMonth(month) 调整月份
	     * @public
	     * @param  {number=0} month 加/减的月份
	     * @return {void}
	     */
	    addMonth: function(month) {
	        if(this.data.readonly || this.data.disabled || !month)
	            return;

	        var date = new Date(this.data.date);
	        var correctMonth = date.getMonth() + month;
	        date.setMonth(correctMonth);
	        // 如果跳月，则置为上一个月
	        if((date.getMonth() - correctMonth)%12)
	            date.setDate(0);
	        this.data.date = date;
	    },
	    /**
	     * @method select(date) 选择一个日期
	     * @public
	     * @param  {Date=null} date 选择的日期
	     * @return {void}
	     */
	    select: function(date) {
	        if(this.data.readonly || this.data.disabled || this.isOutOfRange(date))
	            return;

	        this.data.date = new Date(date);

	        /**
	         * @event select 选择某一个日期时触发
	         * @property {object} date 当前选择的日期
	         */
	        this.$emit('select', {
	            date: date
	        });
	    },
	    /**
	     * @method goToday() 回到今天
	     * @public
	     * @return {void}
	     */
	    goToday: function() {
	        if(this.data.readonly || this.data.disabled)
	            return;

	        this.data.date = new Date((new Date/MS_OF_DAY>>0)*MS_OF_DAY);
	    },
	    /**
	     * @method isOutOfRange(date) 是否超出规定的日期范围
	     * @public
	     * @param {Date} date 待测的日期
	     * @return {boolean|Date} 如果没有超出日期范围，则返回false；如果超出日期范围，则返回范围边界的日期
	     */
	    isOutOfRange: function(date) {
	        var minDate = this.data.minDate;
	        var maxDate = this.data.maxDate;

	        // 不要直接在$watch中改变`minDate`和`maxDate`的值，因为有时向外绑定时可能不希望改变它们。
	        var minDate = minDate && new Date((minDate/MS_OF_DAY>>0)*MS_OF_DAY);
	        var maxDate = maxDate && new Date((maxDate/MS_OF_DAY>>0)*MS_OF_DAY);

	        // minDate && date < minDate && minDate，先判断是否为空，再判断是否超出范围，如果超出则返回范围边界的日期
	        return (minDate && date < minDate && minDate) || (maxDate && date > maxDate && maxDate);
	    }
	});

	Calendar.DateRangeException = function(minDate, maxDate) {
	    this.type = 'DateRangeException';
	    this.message = 'Wrong Date Range where `minDate` is ' + minDate + ' and `maxDate` is ' + maxDate + '!';
	}

	Calendar.DateRangeException.prototype.toString = function() {
	    return this.message;
	}

	module.exports = Calendar;

/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = "<div class=\"u-calendar {@(class)}\" r-class={ {'z-dis': disabled} } r-hide={!visible}>\n    <div class=\"calendar_hd\">\n        <span class=\"calendar_prev\">\n            <span class=\"calendar_item\" on-click={this.addYear(-1)}><i class=\"u-icon u-icon-angle-double-left\"></i></span>\n            <span class=\"calendar_item\" on-click={this.addMonth(-1)}><i class=\"u-icon u-icon-angle-left\"></i></span>\n        </span>\n        <span>{date | format: 'yyyy-MM'}</span>\n        <span class=\"calendar_next\">\n            <span class=\"calendar_item\" on-click={this.addMonth(1)}><i class=\"u-icon u-icon-angle-right\"></i></span>\n            <span class=\"calendar_item\" on-click={this.addYear(1)}><i class=\"u-icon u-icon-angle-double-right\"></i></span>\n        </span>\n    </div>\n    <div class=\"calendar_bd\">\n        <div class=\"calendar_week\"><span class=\"calendar_item\">日</span><span class=\"calendar_item\">一</span><span class=\"calendar_item\">二</span><span class=\"calendar_item\">三</span><span class=\"calendar_item\">四</span><span class=\"calendar_item\">五</span><span class=\"calendar_item\">六</span></div>\n        <div class=\"calendar_day\">{#list _days as day}<span class=\"calendar_item\" r-class={ {'z-sel': date.toDateString() === day.toDateString(), 'z-muted': date.getMonth() !== day.getMonth(), 'z-dis': !!this.isOutOfRange(day)} } on-click={this.select(day)}>{day | format: 'dd'}</span>{/list}</div>\n        {#inc this.$body}\n    </div>\n</div>"

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * ------------------------------------------------------------
	 * TimePicker 时间选择
	 * @author   sensen(rainforest92@126.com)
	 * ------------------------------------------------------------
	 */

	var Component = __webpack_require__(2);
	var template = __webpack_require__(43);
	var _ = __webpack_require__(3);
	var NumberInput = __webpack_require__(15);

	/**
	 * @class TimePicker
	 * @extend Component
	 * @param {object}                  options.data                    绑定属性
	 * @param {string='00:00'}          options.data.time               当前的时间值
	 * @param {string='00:00'}          options.data.minTime            最小时间
	 * @param {string='23:59'}          options.data.maxTime            最大时间
	 * @param {boolean=false}           options.data.readonly           是否只读
	 * @param {boolean=false}           options.data.disabled           是否禁用
	 * @param {boolean=true}            options.data.visible            是否显示
	 * @param {string=''}               options.data.class              补充class
	 */
	var TimePicker = Component.extend({
	    name: 'timePicker',
	    template: template,
	    /**
	     * @protected
	     */
	    config: function() {
	        _.extend(this.data, {
	            time: '00:00',
	            hour: 0,
	            minute: 0,
	            minTime: '00:00',
	            maxTime: '23:59'
	        });
	        this.supr();

	        this.$watch('time', function(newValue, oldValue) {
	            if(!newValue)
	                throw new TimePicker.TimeFormatException(newValue);

	            // 如果超出时间范围，则设置为范围边界的时间
	            var isOutOfRange = this.isOutOfRange(newValue);
	            if(isOutOfRange)
	                return this.data.time = isOutOfRange;

	            time = newValue.split(':');
	            this.data.hour = +time[0];
	            this.data.minute = +time[1];

	            /**
	             * @event change 时间改变时触发
	             * @property {object} time 改变后的时间
	             */
	            this.$emit('change', {
	                time: newValue
	            });
	        });

	        this.$watch(['hour', 'minute'], function(hour, minute) {
	            hour += '';
	            minute += '';
	            this.data.time = (hour.length > 1 ? hour : '0' + hour) + ':' + (minute.length > 1 ? minute : '0' + minute);
	        });

	        this.$watch(['minTime', 'maxTime'], function(minTime, maxTime) {
	            if(!minTime)
	                throw new TimePicker.TimeFormatException(minTime);
	            if(!maxTime)
	                throw new TimePicker.TimeFormatException(maxTime);

	            if(minTime > maxTime)
	                    throw new TimePicker.TimeRangeException(minTime, maxTime);
	            
	            // 如果超出时间范围，则设置为范围边界的时间
	            var isOutOfRange = this.isOutOfRange(this.data.time);
	            if(isOutOfRange)
	                this.data.time = isOutOfRange;
	        });
	    },
	    /**
	     * @method isOutOfRange(time) 是否超出规定的时间范围
	     * @public
	     * @param {Time} time 待测的时间
	     * @return {boolean|Time} 如果没有超出时间范围，则返回false；如果超出时间范围，则返回范围边界的时间
	     */
	    isOutOfRange: function(time) {
	        var minTime = this.data.minTime;
	        var maxTime = this.data.maxTime;

	        // minTime && time < minTime && minTime，先判断是否为空，再判断是否超出范围，如果超出则返回范围边界的时间
	        return (minTime && time < minTime && minTime) || (maxTime && time > maxTime && maxTime);
	    }
	});

	TimePicker.TimeFormatException = function(time) {
	    this.message = 'Wrong Time Format: ' + time + '!';
	}

	TimePicker.TimeFormatException.prototype.toString = function() {
	    return this.message;
	}

	TimePicker.TimeRangeException = function(minTime, maxTime) {
	    this.type = 'TimeRangeException';
	    this.message = 'Wrong Time Range where `minTime` is ' + minTime + ' and `maxTime` is ' + maxTime + '!';
	}

	TimePicker.TimeRangeException.prototype.toString = function() {
	    return this.message;
	}

	module.exports = TimePicker;

/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = "<span class=\"u-timepicker {@(class)}\" r-hide={!visible}>\n\t<numberInput min=\"0\" max=\"23\" format=\"00\" value={hour} disabled={disabled} readonly={readonly} />\n\t<span>:</span>\n\t<numberInput min=\"0\" max=\"59\" format=\"00\" value={minute} disabled={disabled} readonly={readonly} />\n</span>"

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * ------------------------------------------------------------
	 * DateTimePicker 日期选择
	 * @author   sensen(rainforest92@126.com)
	 * ------------------------------------------------------------
	 */

	var Dropdown = __webpack_require__(6);
	var DatePicker = __webpack_require__(38);
	var template = __webpack_require__(45);
	var _ = __webpack_require__(3);

	var filter = __webpack_require__(4);
	var Calendar = __webpack_require__(40);
	var TimePicker = __webpack_require__(42);

	/**
	 * @class DateTimePicker
	 * @extend Dropdown
	 * @param {object}                  options.data                    绑定属性
	 * @param {object=null}             options.data.date               当前选择的日期时间
	 * @param {string='请输入'}         options.data.placeholder        文本框的占位文字
	 * @param {Date|string=null}        options.data.minDate            最小日期时间，如果为空则不限制
	 * @param {Date|string=null}        options.data.maxDate            最大日期时间，如果为空则不限制
	 * @param {boolean=false}           options.data.readonly           是否只读
	 * @param {boolean=false}           options.data.disabled           是否禁用
	 * @param {boolean=true}            options.data.visible            是否显示
	 * @param {string=''}               options.data.class              补充class
	 */
	var DateTimePicker = Dropdown.extend({
	    name: 'dateTimePicker',
	    template: template,
	    /**
	     * @protected
	     */
	    config: function() {   
	        _.extend(this.data, {
	            // @inherited source: [],
	            // @inherited open: false,
	            minDate: null,
	            maxDate: null,
	            placeholder: '请输入',
	            date: null,
	            _date: undefined,
	            _time: undefined
	        });
	        this.supr();

	        this.$watch('date', function(newValue, oldValue) {
	            // 字符类型自动转为日期类型
	            if(typeof newValue === 'string')
	                return this.data.date = new Date(newValue);

	            // 如果newValue为非法日期，则置为空 
	            if(newValue == 'Invalid Date')
	                return this.data.date = null;

	            // 如果不为空并且超出日期范围，则设置为范围边界的日期
	            if(newValue) {
	                var isOutOfRange = this.isOutOfRange(newValue);
	                if(isOutOfRange)
	                    return this.data.date = isOutOfRange;
	            }

	            if(newValue && newValue - oldValue !== 0) {
	                this.data.date.setSeconds(0);
	                this.data.date.setMilliseconds(0);
	                this.data._date = new Date(newValue);
	                this.data._time = filter.format(newValue, 'HH:mm');
	            }

	            /**
	             * @event change 日期时间改变时触发
	             * @property {object} date 改变后的日期时间
	             */
	            this.$emit('change', {
	                date: newValue
	            });
	        });

	        this.$watch('minDate', function(newValue, oldValue) {
	            if(!newValue)
	                return;

	            if(typeof newValue === 'string')
	                return this.data.minDate = new Date(newValue);

	            if(newValue == 'Invalid Date')
	                return this.data.minDate = null;
	        });

	        this.$watch('maxDate', function(newValue, oldValue) {
	            if(!newValue)
	                return;

	            if(typeof newValue === 'string')
	                return this.data.maxDate = new Date(newValue);

	            if(newValue == 'Invalid Date')
	                return this.data.maxDate = null;
	        });

	        this.$watch(['minDate', 'maxDate'], function(minDate, maxDate) {
	            if(!(minDate && minDate instanceof Date || maxDate && maxDate instanceof Date))
	                return;

	            if(minDate && maxDate && minDate - maxDate > 0)
	                    throw new Calendar.DateRangeException(minDate, maxDate);

	            // 如果不为空并且超出日期范围，则设置为范围边界的日期
	            if(this.data.date) {
	                var isOutOfRange = this.isOutOfRange(this.data.date);
	                if(isOutOfRange)
	                    return this.data.date = isOutOfRange;
	            }
	        });
	    },
	    /**
	     * @method _update(date, time) 日期或时间改变后更新日期时间
	     * @private
	     * @return {void}
	     */
	    _update: function(date, time) {
	        if(!time)
	            return this.data._time = '00:00';

	        date = new Date(date);
	        time = time.split(':');
	        date.setHours(time[0]);
	        date.setMinutes(time[1]);
	        this.data.date = date;


	    },
	    /**
	     * @method select()
	     * @public
	     * @ignore
	     */
	    select: function() {
	        /**
	         * @event select
	         * @public
	         * @ignore
	         */
	    },
	    /**
	     * @method _input($event) 输入日期
	     * @private
	     * @param  {object} $event
	     * @return {void}
	     */
	    _input: function($event) {
	        var value = $event.target.value;
	        var date = value ? new Date(value) : null;

	        if(date != 'Invalid Date')
	            this.data.date = date;
	        else
	            $event.target.value = filter.format(this.data.date, 'yyyy-MM-dd HH:mm');
	    },
	    /**
	     * @method isOutOfRange(date) 是否超出规定的日期时间范围
	     * @public
	     * @param {Date} date 待测的日期时间
	     * @return {boolean|Date} 如果没有超出日期时间范围，则返回false；如果超出日期时间范围，则返回范围边界的日期时间
	     */
	    isOutOfRange: function(date) {
	        var minDate = this.data.minDate;
	        var maxDate = this.data.maxDate;

	        // minDate && date < minDate && minDate，先判断是否为空，再判断是否超出范围，如果超出则返回范围边界的日期时间。
	        return (minDate && date < minDate && minDate) || (maxDate && date > maxDate && maxDate);
	    }
	});

	module.exports = DateTimePicker;

/***/ },
/* 45 */
/***/ function(module, exports) {

	module.exports = "<div class=\"u-dropdown u-datetimepicker {@(class)}\" r-class={ {'z-dis': disabled} } r-hide={!visible} ref=\"element\">\n    <div class=\"dropdown_hd\">\n        <input class=\"u-input u-input-full\" placeholder={placeholder} value={date | format: 'yyyy-MM-dd HH:mm'} on-focus={this.toggle(true)} on-change={this._input($event)} ref=\"input\" disabled={disabled} readonly={readonly}>\n    </div>\n    <div class=\"dropdown_bd\" r-hide={!open} r-animation=\"on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;\">\n        <calendar minDate={minDate} maxDate={maxDate} date={_date} on-select={this._update($event.date, _time)}>\n            <timePicker time={_time} on-change={this._update(_date, _time)} />\n        </calendar>\n    </div>\n</div>"

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * ------------------------------------------------------------
	 * Progress  进度条
	 * @author   sensen(rainforest92@126.com)
	 * ------------------------------------------------------------
	 */

	'use strict';

	var Component = __webpack_require__(2);
	var template = __webpack_require__(47);
	var _ = __webpack_require__(3);

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

/***/ },
/* 47 */
/***/ function(module, exports) {

	module.exports = "<div class=\"u-progress u-progress-{@(size)} u-progress-{@(type)} {@(class)}\" r-class={ {'u-progress-striped': striped, 'z-act': active} } r-hide={!visible}>\n    <div class=\"progress_bar\" style=\"width: {percent}%;\">{text ? (text === true ? percent + '%' : text) : ''}</div>\n</div>"

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * ------------------------------------------------------------
	 * Gotop  回到顶部
	 * @author   sensen(rainforest92@126.com)
	 * ------------------------------------------------------------
	 */

	'use strict';

	var Component = __webpack_require__(2);
	var template = __webpack_require__(49);
	var _ = __webpack_require__(3);

	/**
	 * @class Gotop
	 * @param {object}                  options.data                    绑定属性
	 * @param {string='bottomright'}    options.data.position           组件的位置，可选参数：`topcenter`、`topleft`、`topright`、`bottomcenter`、`bottomleft`、`bottomright`、`static`
	 * @param {boolean=true}            options.data.visible            是否显示
	 * @param {string=''}               options.data.class              补充class
	 */
	var Gotop = Component.extend({
	    name: 'gotop',
	    template: template,
	    /**
	     * @protected
	     */
	    config: function() {
	        _.extend(this.data, {
	            position: 'bottomright'
	        });
	        this.supr();
	    },
	    /**
	     * @method gotop() 回到顶部
	     * @public
	     * @return {void}
	     */
	    gotop: function() {
	        if(this.data.readonly || this.data.disabled)
	            return;

	        document.body.scrollTop = 0;
	    }
	});

	module.exports = Gotop;

/***/ },
/* 49 */
/***/ function(module, exports) {

	module.exports = "<a class=\"u-gotop u-gotop-{position} {@(class)}\" on-click={this.gotop()}><i class=\"u-icon u-icon-arrow-up\"></i></a>"

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * ------------------------------------------------------------
	 * Tabs       选项卡
	 * @author   sensen(rainforest92@126.com)
	 * ------------------------------------------------------------
	 */

	'use strict';

	var Component = __webpack_require__(2);
	var template = __webpack_require__(51);
	var _ = __webpack_require__(3);

	/**
	 * @class Tabs
	 * @extend Component
	 * @param {object}                  options.data                    绑定属性
	 * @param {boolean=false}           options.data.readonly           是否只读
	 * @param {boolean=false}           options.data.disabled           是否禁用
	 * @param {boolean=true}            options.data.visible            是否显示
	 * @param {string=''}               options.data.class              补充class
	 */
	var Tabs = Component.extend({
	    name: 'tabs',
	    template: template,
	    /**
	     * @protected
	     */
	    config: function() {
	        _.extend(this.data, {
	            tabs: [],
	            selected: null
	        });
	        this.supr();
	    },
	    /**
	     * @method select(item) 选择某一项
	     * @public
	     * @param  {object} item 选择项
	     * @return {void}
	     */
	    select: function(item) {
	        if(this.data.readonly || this.data.disabled || item.data.disabled)
	            return;

	        this.data.selected = item;
	        /**
	         * @event select 选择某一项时触发
	         * @property {object} selected 当前选择项
	         */
	        this.$emit('select', {
	            selected: item
	        });
	    }
	});

	var Tab = Component.extend({
	    name: 'tab',
	    template: '<div r-hide={this.$outer.data.selected != this}>{#include this.$body}</div>',
	    /**
	     * @protected
	     */
	    config: function() {
	        _.extend(this.data, {
	            title: ''
	        });
	        this.supr();

	        if(this.$outer)
	            this.$outer.data.tabs.push(this);

	        if(!this.$outer.data.selected)
	            this.$outer.data.selected = this;
	    }
	});

	module.exports = Tabs;

/***/ },
/* 51 */
/***/ function(module, exports) {

	module.exports = "<div class=\"m-tabs {@(class)}\" r-class={ {'z-dis': disabled} } r-hide={!visible}>\n    <ul class=\"tabs_hd\">\n        {#list tabs as item}\n        <li r-class={ {'z-crt': item == selected, 'z-dis': item.data.disabled} } on-click={this.select(item)}>{item.data.title}</li>\n        {/list}\n    </ul>\n    <div class=\"tabs_bd\">\n        {#inc this.$body}\n    </div>\n</div>"

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * ------------------------------------------------------------
	 * Collapse       选项卡
	 * @author   sensen(rainforest92@126.com)
	 * ------------------------------------------------------------
	 */

	'use strict';

	var Component = __webpack_require__(2);
	var template = __webpack_require__(53);
	var itemTemplate = __webpack_require__(54);
	var _ = __webpack_require__(3);

	/**
	 * @class Collapse
	 * @extend Component
	 * @param {object}                  options.data                    绑定属性
	 * @param {boolean=false}           options.data.accordion          是否每次只展开一个
	 * @param {boolean=false}           options.data.readonly           是否只读
	 * @param {boolean=false}           options.data.disabled           是否禁用
	 * @param {boolean=true}            options.data.visible            是否显示
	 * @param {string=''}               options.data.class              补充class
	 */
	var Collapse = Component.extend({
	    name: 'collapse',
	    template: template,
	    /**
	     * @protected
	     */
	    config: function() {
	        _.extend(this.data, {
	            panels: [],
	            accordion: false
	        });
	        this.supr();
	    }
	    /**
	     * @method toggle(item) 展开或收起某一项
	     * @private
	     * @param  {object} item 展开收起项
	     * @return {void}
	     */
	});

	var Panel = Component.extend({
	    name: 'panel',
	    template: itemTemplate,
	    /**
	     * @protected
	     */
	    config: function() {
	        _.extend(this.data, {
	            title: '',
	            open: false
	        });
	        this.supr();

	        if(this.$outer)
	            this.$outer.data.panels.push(this);
	    },
	    toggle: function(open) {
	        if(open && this.$outer.data.accordion) {
	            this.$outer.data.panels.forEach(function(pane) {
	                pane.data.open = false;
	            });
	        }

	        this.data.open = open;
	    }
	});

	module.exports = Collapse;

/***/ },
/* 53 */
/***/ function(module, exports) {

	module.exports = "<div class=\"m-collapse {@(class)}\" r-class={ {'z-dis': disabled} } r-hide={!visible}>\n    {#inc this.$body}\n</div>"

/***/ },
/* 54 */
/***/ function(module, exports) {

	module.exports = "<div class=\"m-panel\">\n    <div class=\"panel_hd\" on-click={this.toggle(!open)}>{title}</div>\n    <div r-hide={!open} style=\"overflow: hidden\" r-animation=\"on: enter; class: animated slideInY; on: leave; class: animated slideOutY;\">\n        <div class=\"panel_bd\">\n            {#include this.$body}\n        </div>\n    </div>\n</div>"

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * ------------------------------------------------------------
	 * Pager     分页
	 * @author   sensen(rainforest92@126.com)
	 * ------------------------------------------------------------
	 */

	var Component = __webpack_require__(2);
	var template = __webpack_require__(56);
	var _ = __webpack_require__(3);

	/**
	 * @class Pager
	 * @extend Component
	 * @param {object}                  options.data                    监听数据
	 * @param {number=1}                options.data.current            当前页
	 * @param {total=11}                options.data.total              总页数
	 * @param {string='center'}         options.data.position           分页的位置，可选参数：`center`、`left`、`right`
	 * @param {middle=5}                options.data.middle             当页数较多时，中间显示的页数
	 * @param {side=2}                  options.data.side               当页数较多时，两端显示的页数
	 * @param {boolean=false}           options.data.readonly           是否只读
	 * @param {boolean=false}           options.data.disabled           是否禁用
	 * @param {boolean=true}            options.data.visible            是否显示
	 * @param {string=''}               options.data.class              补充class
	 */
	var Pager = Component.extend({
	    name: 'pager',
	    template: template,
	    config: function() {
	        _.extend(this.data, {
	            current: 1,
	            total: 11,
	            position: 'center',
	            middle: 5,
	            side: 2,
	            _start: 1,
	            _end: 5
	        });
	        this.supr();

	        this.$watch(['current', 'total'], function(current, total) {
	            this.data.current = current = +current;
	            this.data.total = total = +total;
	            var show = this.data.middle>>1;
	            var side = this.data.side;

	            this.data._start = current - show;
	            this.data._end = current + show;
	            if(this.data._start < side + 1)
	                this.data._start = side + 1;
	            if(this.data._end > total - side)
	                this.data._end = total - side;
	            if(current - this.data._start < show)
	                this.data._end += this.data._start - current + show;
	            if(this.data._end - current < show)
	                this.data._start += this.data._end - current - show;
	        });

	        this.$watch(['middle', 'side'], function(middle, side) {
	            this.data.middle = +middle;
	            this.data.side = +side;
	        });
	    },
	    /**
	     * @method select(page) 选择某一页
	     * @public
	     * @param  {object} page 选择页
	     * @return {void}
	     */
	    select: function(page) {
	        if(this.data.readonly || this.data.disabled)
	            return;

	        if(page < 1) return;
	        if(page > this.data.total) return;
	        if(page == this.data.current) return;

	        this.data.current = page;
	        /**
	         * @event select 选择某一页时触发
	         * @property {object} current 当前选择页
	         */
	        this.$emit('select', {
	            current: this.data.current
	        });
	    }
	});

	module.exports = Pager;

/***/ },
/* 56 */
/***/ function(module, exports) {

	module.exports = "<ul class=\"m-pager m-pager-{@(position)} {@(class)}\" r-class={ {'z-dis': disabled} } r-hide={!visible}>\n    <li class=\"pager_prev\" r-class={ {'z-dis' : current <= 1} } on-click={this.select(current - 1)}><a>上一页</a></li>\n    {#if total - middle > side * 2 + 1}\n        {#list 1..side as i}\n        <li r-class={ {'z-crt': current == i} } on-click={this.select(i)}><a>{i}</a></li>\n        {/list}\n        {#if _start > side + 1}<li><span>...</span></li>{/if}\n        {#list _start.._end as i}\n        <li r-class={ {'z-crt': current == i} } on-click={this.select(i)}><a>{i}</a></li>\n        {/list}\n        {#if _end < total - side}<li><span>...</span></li>{/if}\n        {#list (total - side + 1)..total as i}\n        <li r-class={ {'z-crt': current == i} } on-click={this.select(i)}><a>{i}</a></li>\n        {/list}\n    {#else}\n        {#list 1..total as i}\n        <li r-class={ {'z-crt': current == i} } on-click={this.select(i)}><a>{i}</a></li>\n        {/list}\n    {/if}\n    <li class=\"pager_next\" r-class={ {'z-dis' : current >= total} } on-click={this.select(current + 1)}><a>下一页</a></li>\n</ul>"

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * ------------------------------------------------------------
	 * Notify    通知
	 * @author   sensen(rainforest92@126.com)
	 * ------------------------------------------------------------
	 */

	'use strict';

	var Component = __webpack_require__(2);
	var template = __webpack_require__(58);
	var _ = __webpack_require__(3);

	/**
	 * @class Notify
	 * @extend Component
	 * @param {object}                  options.data                    监听数据
	 * @param {string='topcenter'}      options.data.position           通知的位置，可选参数：`topcenter`、`topleft`、`topright`、`bottomcenter`、`bottomleft`、`bottomright`、`static`
	 * @param {number=2000}             options.data.duration           每条消息的停留毫秒数，如果为0，则表示消息常驻不消失。
	 * @param {boolean=true}            options.data.visible            是否显示
	 * @param {string=''}               options.data.class              补充class
	 */
	var Notify = Component.extend({
	    name: 'notify',
	    template: template,
	    /**
	     * @protected
	     */
	    config: function() {
	        _.extend(this.data, {
	            messages: [],
	            position: 'topcenter',
	            duration: 2000
	        });
	        this.supr();
	    },
	    /**
	     * @protected
	     */
	    init: function() {
	        this.supr();
	        // 证明不是内嵌组件
	        if(this.$root === this)
	            this.$inject(document.body);
	    },
	    /**
	     * @method show(text[,type][,duration]) 弹出一个消息
	     * @public
	     * @param  {string=''} text 消息内容
	     * @param  {string=null} type 消息类型，可选参数：`info`、`success`、`warning`、`error`
	     * @param  {number=notify.duration} duration 该条消息的停留毫秒数，如果为0，则表示消息常驻不消失。
	     * @return {void}
	     */
	    show: function(text, type, duration) {
	        var message = {
	            text: text,
	            type: type,
	            duration: duration >= 0 ? duration : this.data.duration
	        };
	        this.data.messages.unshift(message);
	        this.$update();

	        if(+message.duration)
	            this.$timeout(this.close.bind(this, message), +message.duration);

	        /**
	         * @event show 弹出一个消息时触发
	         * @property {object} message 弹出的消息对象
	         */
	        this.$emit('show', {
	            message: message
	        });
	    },
	    /**
	     * @method close(message) 关闭某条消息
	     * @public
	     * @param  {object} message 需要关闭的消息对象
	     * @return {void}
	     */
	    close: function(message) {
	        var index = this.data.messages.indexOf(message);
	        this.data.messages.splice(index, 1);
	        this.$update();
	        /**
	         * @event close 关闭某条消息时触发
	         * @property {object} message 关闭了的消息对象
	         */
	        this.$emit('close', {
	            message: message
	        });
	    },
	    /**
	     * @method closeAll() 关闭所有消息
	     * @public
	     * @return {void}
	     */
	    closeAll: function() {
	        this.$update('messages', []);
	    }
	}).use('$timeout');


	/**
	 * 直接初始化一个实例
	 * @type {Notify}
	 */
	var notify = new Notify();
	Notify.notify = notify;

	/**
	 * @method show(text[,type][,duration]) 弹出一个消息
	 * @static
	 * @public
	 * @param  {string=''} text 消息内容
	 * @param  {string=null} type 消息类型，可选参数：`info`、`success`、`warning`、`error`
	 * @param  {number=notify.duration} duration 该条消息的停留毫秒数，如果为0，则表示消息常驻不消失。
	 * @return {void}
	 */
	Notify.show = function() {
	    notify.show.apply(notify, arguments);
	}
	/**
	 * @method [info|success|warning|error](text) 弹出特殊类型的消息
	 * @static
	 * @public
	 * @param  {string=''} text 消息内容
	 * @return {void}
	 */
	var types = ['success', 'warning', 'info', 'error'];
	types.forEach(function(type) {
	    Notify[type] = function(text) {
	        Notify.show(text, type);
	    }
	});
	/**
	 * @method close(message) 关闭某条消息
	 * @static
	 * @public
	 * @param  {object} message 需要关闭的消息对象
	 * @return {void}
	 */
	Notify.close = function() {
	    notify.close.apply(notify, arguments);
	}
	/**
	 * @method closeAll() 关闭所有消息
	 * @static
	 * @public
	 * @return {void}
	 */
	Notify.closeAll = function() {
	    notify.closeAll.apply(notify, arguments);
	}

	module.exports = Notify;

/***/ },
/* 58 */
/***/ function(module, exports) {

	module.exports = "<div class=\"m-notify m-notify-{@(position)} {@(class)}\" r-hide={!visible}>\n    {#list messages as message}\n    <div class=\"u-message u-message-{@(message.type)}\" r-animation=\"on: enter; class: animated fadeIn fast; on: leave; class: animated fadeOut fast;\">\n        <a class=\"message_close\" on-click={this.close(message)}><i class=\"u-icon u-icon-close\"></i></a>\n        <i class=\"message_icon u-icon u-icon-{@(message.type)}-circle\" r-hide={@(!message.type)}></i>\n        {@(message.text)}\n    </div>\n    {/list}\n</div>"

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * ------------------------------------------------------------
	 * Modal     模态对话框
	 * @author   sensen(rainforest92@126.com)
	 * ------------------------------------------------------------
	 */

	'use strict';

	var Component = __webpack_require__(2);
	var template = __webpack_require__(60);
	var _ = __webpack_require__(3);

	/**
	 * @class Modal
	 * @extend Component
	 * @param {object}                  options.data                    绑定属性 | Binding Properties
	 * @param {string='提示'}           options.data.title              对话框标题 | Title of Dialog
	 * @param {string=''}               options.data.content            对话框内容
	 * @param {string|boolean=true}     options.data.okButton           是否显示确定按钮。值为`string`时显示该段文字。
	 * @param {string|boolean=false}    options.data.cancelButton       是否显示取消按钮。值为`string`时显示该段文字。
	 * @param {number=null}             options.data.width              对话框宽度。值为否定时宽度为CSS设置的宽度。
	 * @param {string=''}               options.data.class              补充class
	 */
	var Modal = Component.extend({
	    name: 'modal',
	    template: template,
	    /**
	     * @protected
	     */
	    config: function() {
	        _.extend(this.data, {
	            title: '提示',
	            content: '',
	            okButton: true,
	            cancelButton: false,
	            width: null
	        });
	        this.supr();
	    },
	    /**
	     * @protected
	     */
	    init: function() {
	        this.supr();
	        // 证明不是内嵌组件
	        if(this.$root === this)
	            this.$inject(document.body);
	    },
	    /**
	     * @method close(result) 关闭模态对话框
	     * @public
	     * @param  {boolean} result 点击确定还是取消
	     * @return {void}
	     */
	    close: function(result) {
	        /**
	         * @event close 关闭对话框时触发
	         * @property {boolean} result 点击了确定还是取消
	         */
	        this.$emit('close', {
	            result: result
	        });
	        result ? this.ok() : this.cancel();
	        this.destroy();
	    },
	    /**
	     * @override
	     */
	    ok: function() {
	        /**
	         * @event ok 确定对话框时触发
	         */
	        this.$emit('ok');

	        this.destroy();
	    },
	    /**
	     * @override
	     */
	    cancel: function() {
	        /**
	         * @event cancel 取消对话框时触发
	         */
	        this.$emit('cancel');

	        this.destroy();
	    },
	    keyup: function($event) {
	        if($event.which == 13)
	            this.ok();
	    }
	});

	/**
	 * @method alert(content[,title]) 弹出一个alert对话框。关闭时始终触发确定事件。
	 * @static
	 * @public
	 * @param  {string=''} content 对话框内容
	 * @param  {string='提示'} title 对话框标题
	 * @return {void}
	 */
	Modal.alert = function(content, title, okButton) {
	    var modal = new Modal({
	        data: {
	            content: content,
	            title: title,
	            okButton: okButton
	        }
	    });
	    return modal;
	}

	/**
	 * @method confirm(content[,title]) 弹出一个confirm对话框
	 * @static
	 * @public
	 * @param  {string=''} content 对话框内容
	 * @param  {string='提示'} title 对话框标题
	 * @return {void}
	 */
	Modal.confirm = function(content, title, okButton, cancelButton) {
	    var modal = new Modal({
	        data: {
	            content: content,
	            title: title,
	            okButton: okButton,
	            cancelButton: cancelButton || true
	        }
	    });
	    return modal;
	}

	module.exports = Modal;


/***/ },
/* 60 */
/***/ function(module, exports) {

	module.exports = "<div class=\"m-modal {@(class)}\" on-keyup={this.keyup($event)} r-hide={!visible}>\n    <div class=\"modal_dialog\" {#if width}style=\"width: {width}px\"{/if}>\n        <div class=\"modal_hd\">\n            <a class=\"modal_close\" on-click={this.close(!cancelButton)}><i class=\"u-icon u-icon-close\"></i></a>\n            <h3 class=\"modal_title\">{title}</h3>\n        </div>\n        <div class=\"modal_bd\">\n            {#if contentTemplate}{#include @(contentTemplate)}{#else}{content}{/if}\n        </div>\n        <div class=\"modal_ft\">\n            {#if okButton}\n            <button class=\"u-btn u-btn-primary\" on-click={this.close(true)}>{okButton === true ? '确定' : okButton}</button>\n            {/if}\n            {#if cancelButton}\n            <button class=\"u-btn\" on-click={this.close(false)}>{cancelButton === true ? '取消' : cancelButton}</button>\n            {/if}\n        </div>\n    </div>\n</div>"

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * ------------------------------------------------------------
	 * ListView  列表视图
	 * @author   sensen(rainforest92@126.com)
	 * ------------------------------------------------------------
	 */

	'use strict';

	var SourceComponent = __webpack_require__(5);
	var template = __webpack_require__(62);
	var _ = __webpack_require__(3);

	/**
	 * @class ListView
	 * @param {object}                  options.data                    绑定属性
	 * @param {object[]=[]}             options.data.source             数据源
	 * @param {number}                  options.data.source[].id        每项的id
	 * @param {string}                  options.data.source[].name      每项的内容
	 * @param {object=null}             options.data.selected           当前选择项
	 * @param {string=null}             options.data.itemTemplate       单项模板
	 * @param {boolean=false}           options.data.readonly           是否只读
	 * @param {boolean=false}           options.data.disabled           是否禁用
	 * @param {boolean=true}            options.data.visible            是否显示
	 * @param {string=''}               options.data.class              补充class
	 * @param {object}                  options.service                 数据服务
	 */
	var ListView = SourceComponent.extend({
	    name: 'listView',
	    template: template,
	    /**
	     * @protected
	     */
	    config: function() {
	        _.extend(this.data, {
	            // @inherited source: [],
	            selected: null,
	            itemTemplate: null
	        });
	        this.supr();
	    },
	    /**
	     * @method select(item) 选择某一项
	     * @public
	     * @param  {object} item 选择项
	     * @return {void}
	     */
	    select: function(item) {
	        if(this.data.readonly || this.data.disabled || item.disabled)
	            return;

	        this.data.selected = item;
	        /**
	         * @event select 选择某一项时触发
	         * @property {object} selected 当前选择项
	         */
	        this.$emit('select', {
	            selected: item
	        });
	    }
	});

	module.exports = ListView;

/***/ },
/* 62 */
/***/ function(module, exports) {

	module.exports = "<ul class=\"m-listview {@(class)}\" r-class={ {'z-dis': disabled} } r-hide={!visible}>\n    {#list source as item}\n    <li r-class={ {'z-sel': selected === item, 'z-dis': item.disabled} } title={item.name} on-click={this.select(item)}>{#if @(itemTemplate)}{#include @(itemTemplate)}{#else}{item.name}{/if}</li>\n    {/list}\n</ul>"

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * ------------------------------------------------------------
	 * Editor    编辑器
	 * @author   sensen(rainforest92@126.com)
	 * ------------------------------------------------------------
	 */

	'use strict';

	var Component = __webpack_require__(2);
	var template = __webpack_require__(64);
	var _ = __webpack_require__(3);

	/**
	 * @class Editor
	 * @extend Component
	 * @param {object}                  options.data                    绑定属性 | Binding Properties
	 * @param {string='提示'}           options.data.title              对话框标题 | Title of Dialog
	 * @param {string=''}               options.data.content            对话框内容
	 * @param {string|boolean=true}     options.data.okButton           是否显示确定按钮。值为`string`时显示该段文字。
	 * @param {string|boolean=false}    options.data.cancelButton       是否显示取消按钮。值为`string`时显示该段文字。
	 * @param {number=null}             options.data.width              对话框宽度。值为否定时宽度为CSS设置的宽度。
	 * @param {function}                options.ok                      当点击确定的时候执行
	 * @param {function}                options.cancel                  当点击取消的时候执行
	 */
	var Editor = Component.extend({
	    name: 'modal',
	    template: template,
	    /**
	     * @protected
	     */
	    config: function() {
	        _.extend(this.data, {
	            title: '提示',
	            content: '',
	            okButton: true,
	            cancelButton: false,
	            width: null
	        });
	        this.supr();
	    },
	    /**
	     * @protected
	     */
	    init: function() {
	        this.supr();
	        // 证明不是内嵌组件
	        if(this.$root === this)
	            this.$inject(document.body);
	    },
	    /**
	     * @method close(result) 关闭模态对话框
	     * @public
	     * @param  {boolean} result 点击确定还是取消
	     * @return {void}
	     */
	    close: function(result) {
	        /**
	         * @event close 关闭对话框时触发
	         * @property {boolean} result 点击了确定还是取消
	         */
	        this.$emit('close', {
	            result: result
	        });
	        result ? this.ok() : this.cancel();
	        this.destroy();
	    },
	    /**
	     * @override
	     */
	    ok: function() {
	        /**
	         * @event ok 确定对话框时触发
	         */
	        this.$emit('ok');
	    },
	    /**
	     * @override
	     */
	    cancel: function() {
	        /**
	         * @event close 取消对话框时触发
	         */
	        this.$emit('cancel');
	    }
	});

	module.exports = Editor;


/***/ },
/* 64 */
/***/ function(module, exports) {

	module.exports = ""

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * ------------------------------------------------------------
	 * HTMLEditor 编辑器
	 * @author   sensen(rainforest92@126.com)
	 * ------------------------------------------------------------
	 */

	'use strict';

	var Component = __webpack_require__(2);
	var template = __webpack_require__(66);
	var _ = __webpack_require__(3);

	/**
	 * @class HTMLEditor
	 * @extend Component
	 * @param {object}                  options.data                    绑定属性 | Binding Properties
	 * @param {string=''}               options.data.content            编辑器内容
	 * @param {boolean=false}           options.data.readonly           是否只读
	 * @param {boolean=false}           options.data.disabled           是否禁用
	 * @param {boolean=true}            options.data.visible            是否显示
	 * @param {string=''}               options.data.class              补充class
	 */
	var HTMLEditor = Component.extend({
	    name: 'htmlEditor',
	    template: template,
	    /**
	     * @protected
	     */
	    config: function() {
	        _.extend(this.data, {
	            content: ''
	        });
	        this.supr();
	    },
	    computed: {
	        html: function() {
	            return this.data.content;
	        }
	    },
	    bold: function() {
	        if(this.data.readonly || this.data.disabled)
	            return;

	        var rangeData = this.getCursorPosition();
	        rangeData.text = '<strong>' + rangeData.text + '</strong>';
	        this.setCursorPosition(rangeData);
	        this.data.content = this.$refs.textarea.value;
	        this.$update();
	    },
	    italic: function() {
	        if(this.data.readonly || this.data.disabled)
	            return;

	        var rangeData = this.getCursorPosition();
	        rangeData.text = '<em>' + rangeData.text + '</em>';
	        this.setCursorPosition(rangeData);
	        this.data.content = this.$refs.textarea.value;
	        this.$update();
	    },
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
	    ul: function() {
	        if(this.data.readonly || this.data.disabled)
	            return;

	        var rangeData = this.getCursorPosition();
	        rangeData.text = '<li>' + rangeData.text + '</li>';
	        this.setCursorPosition(rangeData);
	        this.data.content = this.$refs.textarea.value;
	        this.$update();
	    },
	    ol: function() {
	        if(this.data.readonly || this.data.disabled)
	            return;

	        var rangeData = this.getCursorPosition();
	        rangeData.text = '<li>' + rangeData.text + '</li>';
	        this.setCursorPosition(rangeData);
	        this.data.content = this.$refs.textarea.value;
	        this.$update();
	    },
	    link: function() {
	        if(this.data.readonly || this.data.disabled)
	            return;

	        var rangeData = this.getCursorPosition();
	        rangeData.text = '<a href="#">' + rangeData.text + '</a>';
	        this.setCursorPosition(rangeData);
	        this.data.content = this.$refs.textarea.value;
	        this.$update();
	    },
	    image: function() {
	        if(this.data.readonly || this.data.disabled)
	            return;

	        this.$refs.uploader.upload();
	    },
	    latex: function() {
	        if(this.data.readonly || this.data.disabled)
	            return;
	        
	        var rangeData = this.getCursorPosition();
	        rangeData.text = '$$a^2 + b^2 = c^2$$';
	        this.setCursorPosition(rangeData);
	        this.data.content = this.$refs.textarea.value;
	        this.$update();
	    },
	    uploaderSuccess: function(data) {
	        var rangeData = this.getCursorPosition();
	        rangeData.text = '<img src="' + data.result + '">';
	        this.setCursorPosition(rangeData);
	        this.data.content = this.$refs.textarea.value;
	        this.$update();
	    },
	    uploaderError: function(e) {
	        Notify.error(e);
	    },
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


/***/ },
/* 66 */
/***/ function(module, exports) {

	module.exports = "<div class=\"m-editor {@(class)}\" r-class={ {'z-dis': disabled} } r-hide={!visible}>\n    <div class=\"editor_preview\" r-html={html}></div>\n    <ul class=\"m-toolbar editor_toolbar\" r-class={ {'z-dis': disabled} }>\n        <li><a title=\"加粗\" on-click={this.bold()}><i class=\"u-icon u-icon-bold\"></i></a></li>\n        <li><a title=\"斜体\" on-click={this.italic()}><i class=\"u-icon u-icon-italic\"></i></a></li>\n        <li class=\"toolbar_divider\">|</li>\n        <li><a title=\"引用\" on-click={this.quote()}><i class=\"u-icon u-icon-quote\"></i></a></li>\n        <li><a title=\"无序列表\" on-click={this.ul()}><i class=\"u-icon u-icon-list-ul\"></i></a></li>\n        <li><a title=\"有序列表\" on-click={this.ol()}><i class=\"u-icon u-icon-list-ol\"></i></a></li>\n        <li class=\"toolbar_divider\">|</li>\n        <li><a title=\"链接\" on-click={this.link()}><i class=\"u-icon u-icon-link\"></i></a></li>\n        <li><a title=\"图片\" on-click={this.image()}><i class=\"u-icon u-icon-image\"></i></a></li>\n    </ul>\n    <textarea class=\"editor_textarea\" r-model={content} ref=\"textarea\" readonly={readonly} disabled={disabled}></textarea>\n</div>\n<uploader visible={false} url={imageUrl} extensions={extensions} ref=\"uploader\" on-success={this.uploaderSuccess($event)} on-error={this.uploaderError($event)} />"

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * ------------------------------------------------------------
	 * MarkEditor 编辑器
	 * @author   sensen(rainforest92@126.com)
	 * ------------------------------------------------------------
	 */

	'use strict';

	var Component = __webpack_require__(2);
	var template = __webpack_require__(68);
	var _ = __webpack_require__(3);

	var marked = __webpack_require__(69);

	/**
	 * @class MarkEditor
	 * @extend Component
	 * @param {object}                  options.data                    绑定属性 | Binding Properties
	 * @param {string=''}               options.data.content            编辑器内容
	 * @param {boolean=false}           options.data.readonly           是否只读
	 * @param {boolean=false}           options.data.disabled           是否禁用
	 * @param {boolean=true}            options.data.visible            是否显示
	 * @param {string=''}               options.data.class              补充class
	 */
	var MarkEditor = Component.extend({
	    name: 'markEditor',
	    template: template,
	    /**
	     * @protected
	     */
	    config: function() {
	        _.extend(this.data, {
	            content: ''
	        });
	        this.supr();
	    },
	    computed: {
	        html: function() {
	            return marked(this.data.content);
	        }
	    },
	    bold: function() {
	        if(this.data.readonly || this.data.disabled)
	            return;

	        var rangeData = this.getCursorPosition();
	        rangeData.text = '**' + rangeData.text + '**';
	        this.setCursorPosition(rangeData);
	        this.data.content = this.$refs.textarea.value;
	        this.$update();
	    },
	    italic: function() {
	        if(this.data.readonly || this.data.disabled)
	            return;

	        var rangeData = this.getCursorPosition();
	        rangeData.text = '*' + rangeData.text + '*';
	        this.setCursorPosition(rangeData);
	        this.data.content = this.$refs.textarea.value;
	        this.$update();
	    },
	    quote: function() {
	        if(this.data.readonly || this.data.disabled)
	            return;

	        var rangeData = this.getCursorPosition();
	        var value = this.$refs.textarea.value;
	        for(var i = rangeData.start - 1; i > 0; i--)
	            if(value[i] == '\n') {
	                i++;
	                break;
	            }
	        rangeData.start = i;
	        rangeData.text = '> ';
	        rangeData.end = rangeData.start;
	        this.setCursorPosition(rangeData);
	        this.data.content = this.$refs.textarea.value;
	        this.$update();
	    },
	    ul: function() {
	        if(this.data.readonly || this.data.disabled)
	            return;

	        var rangeData = this.getCursorPosition();
	        var value = this.$refs.textarea.value;
	        for(var i = rangeData.start - 1; i > 0; i--)
	            if(value[i] == '\n') {
	                i++;
	                break;
	            }
	        rangeData.start = i;
	        rangeData.text = '- ';
	        rangeData.end = rangeData.start;
	        this.setCursorPosition(rangeData);
	        this.data.content = this.$refs.textarea.value;
	        this.$update();
	    },
	    ol: function() {
	        if(this.data.readonly || this.data.disabled)
	            return;

	        var rangeData = this.getCursorPosition();
	        var value = this.$refs.textarea.value;
	        for(var i = rangeData.start - 1; i > 0; i--)
	            if(value[i] == '\n') {
	                i++;
	                break;
	            }
	        rangeData.start = i;
	        rangeData.text = '1. ';
	        rangeData.end = rangeData.start;
	        this.setCursorPosition(rangeData);
	        this.data.content = this.$refs.textarea.value;
	        this.$update();
	    },
	    link: function() {
	        if(this.data.readonly || this.data.disabled)
	            return;

	        var rangeData = this.getCursorPosition();
	        rangeData.text = '[' + rangeData.text + '](http://)';
	        this.setCursorPosition(rangeData);
	        this.data.content = this.$refs.textarea.value;
	        this.$update();
	    },
	    image: function() {
	        if(this.data.readonly || this.data.disabled)
	            return;

	        this.$refs.uploader.upload();
	    },
	    latex: function() {
	        if(this.data.readonly || this.data.disabled)
	            return;
	        
	        var rangeData = this.getCursorPosition();
	        rangeData.text = '$$a^2 + b^2 = c^2$$';
	        this.setCursorPosition(rangeData);
	        this.data.content = this.$refs.textarea.value;
	        this.$update();
	    },
	    uploaderSuccess: function(data) {
	        var rangeData = this.getCursorPosition();
	        rangeData.text = '\n![](' + data.result + ')';
	        this.setCursorPosition(rangeData);
	        this.data.content = this.$refs.textarea.value;
	        this.$update();
	    },
	    uploaderError: function(e) {
	        Notify.error(e);
	    },
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

	module.exports = MarkEditor;


/***/ },
/* 68 */
/***/ function(module, exports) {

	module.exports = "<div class=\"m-editor {@(class)}\" r-class={ {'z-dis': disabled} } r-hide={!visible}>\n    <div class=\"editor_preview\" r-html={html}></div>\n    <ul class=\"m-toolbar editor_toolbar\" r-class={ {'z-dis': disabled} }>\n        <li><a title=\"加粗\" on-click={this.bold()}><i class=\"u-icon u-icon-bold\"></i></a></li>\n        <li><a title=\"斜体\" on-click={this.italic()}><i class=\"u-icon u-icon-italic\"></i></a></li>\n        <li class=\"toolbar_divider\">|</li>\n        <li><a title=\"引用\" on-click={this.quote()}><i class=\"u-icon u-icon-quote\"></i></a></li>\n        <li><a title=\"无序列表\" on-click={this.ul()}><i class=\"u-icon u-icon-list-ul\"></i></a></li>\n        <li><a title=\"有序列表\" on-click={this.ol()}><i class=\"u-icon u-icon-list-ol\"></i></a></li>\n        <li class=\"toolbar_divider\">|</li>\n        <li><a title=\"链接\" on-click={this.link()}><i class=\"u-icon u-icon-link\"></i></a></li>\n        <li><a title=\"图片\" on-click={this.image()}><i class=\"u-icon u-icon-image\"></i></a></li>\n        <li class=\"f-fr\"><a title=\"帮助\" href=\"http://www.jianshu.com/p/7bd23251da0a\" target=\"_blank\"><i class=\"u-icon u-icon-info\"></i></a></li>\n    </ul>\n    <textarea class=\"editor_textarea\" r-model={content} ref=\"textarea\" readonly={readonly} disabled={disabled}></textarea>\n</div>\n<uploader visible={false} url={imageUrl} extensions={extensions} ref=\"uploader\" on-success={this.uploaderSuccess($event)} on-error={this.uploaderError($event)} />"

/***/ },
/* 69 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_69__;

/***/ }
/******/ ])
});
;