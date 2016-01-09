(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var RGUI = require('regular-ui');

new RGUI.Calendar().$inject('#app');
},{"regular-ui":2}],2:[function(require,module,exports){
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("regularjs"),require("marked")):"function"==typeof define&&define.amd?define(["Regular","marked"],e):"object"==typeof exports?exports.RGUI=e(require("regularjs"),require("marked")):t.RGUI=e(t.Regular,t.marked)}(this,function(__WEBPACK_EXTERNAL_MODULE_1__,__WEBPACK_EXTERNAL_MODULE_78__){return function(t){function e(s){if(i[s])return i[s].exports;var n=i[s]={exports:{},id:s,loaded:!1};return t[s].call(n.exports,n,n.exports,e),n.loaded=!0,n.exports}var i={};return e.m=t,e.c=i,e.p="",e(0)}([function(t,e,i){"use strict";var s={};s.Regular=i(1),s.Component=i(2),s.SourceComponent=i(5),s._=i(3),s.ajax=i(6),s.Dropdown=i(11),s.Menu=i(13),s.Input2=i(16),s.NumberInput=i(20),s.Check2=i(22),s.CheckGroup=i(24),s.Check2Group=i(26),s.RadioGroup=i(28),s.Radio2Group=i(30),s.Select2=i(32),s.TreeSelect=i(34),s.Suggest=i(39),s.Uploader=i(43),s.DatePicker=i(45),s.TimePicker=i(49),s.DateTimePicker=i(51),s.Progress=i(53),s.Gotop=i(55),s.Tab=i(57),s.Accordion=i(59),s.Pager=i(62),s.Menubar=i(64),s.Notify=i(9),s.Modal=i(66),s.ListView=i(41),s.GridView=i(68),s.TreeView=i(36),s.TableView=i(70),s.Calendar=i(47),s.Editor=i(72),s.HTMLEditor=i(74),s.MarkEditor=i(76),t.exports=s},function(t,e){t.exports=__WEBPACK_EXTERNAL_MODULE_1__},function(t,e,i){"use strict";var s=i(1),n=i(3),a=i(4),r=s.extend({config:function(){n.extend(this.data,{readonly:!1,disabled:!1,visible:!0,"class":""}),this.supr()}}).filter(a).directive({});t.exports=r},function(t,e,i){"use strict";var s=i(1),n={extend:function(t,e,i){for(var s in e)(i||void 0===t[s])&&(t[s]=e[s]);return t},dom:s.dom,multiline:function(t){var e=/^function\s*\(\)\s*\{\s*\/\*+\s*([\s\S]*)\s*\*+\/\s*\}$/;return e.exec(t)[1]}};t.exports=n},function(t,e){"use strict";var i={};i.format=function(){function t(t){return t=""+(String(t)||""),t.length<=1?"0"+t:t}var e={yyyy:function(t){return t.getFullYear()},MM:function(e){return t(e.getMonth()+1)},dd:function(e){return t(e.getDate())},HH:function(e){return t(e.getHours())},mm:function(e){return t(e.getMinutes())},ss:function(e){return t(e.getSeconds())}},i=new RegExp(Object.keys(e).join("|"),"g");return function(t,s){return t?(s=s||"yyyy-MM-dd HH:mm",t=new Date(t),s.replace(i,function(i){return e[i]?e[i](t):""})):""}}(),i.average=function(t,e){return t=t||[],t.length?i.total(t,e)/t.length:0},i.total=function(t,e){var i=0;if(t)return t.forEach(function(t){i+=e?t[e]:t}),i},i.filter=function(t,e){return t&&t.length?t.filter(function(t,i){return e(t,i)}):void 0},t.exports=i},function(t,e,i){"use strict";var s=i(2),n=i(3),a=s.extend({service:null,config:function(){n.extend(this.data,{source:[],updateAuto:!0}),this.data.service&&(this.service=this.data.service),this.service&&this.data.updateAuto&&this.$updateSource(),this.supr()},getParams:function(){return{}},$updateSource:function(){return this.service.getList(this.getParams(),function(t){this.$update("source",t)}.bind(this)),this}});t.exports=a},function(t,e,i){"use strict";var s=i(7),n={},a=i(9);n.request=function(t){var e=function(){},i=t.error||e,n=t.success||e,r=t.complete||e;t.data=t.data||{},!t.contentType&&t.method&&"get"!==t.method.toLowerCase()?t.contentType="application/json":t.data.timestamp=+new Date,"application/json"===t.contentType&&(t.data=JSON.stringify(t.data)),t.success=function(t){return t.success?void n(t.result,t):(a.error(t.message),void i(t.result,t))},t.error=function(t){i(t.result,t)},t.complete=function(t){r(t.result,t)},s(t)},n.get=function(t,e){n.request({url:t,method:"get",success:e})},n.post=function(t,e,i){n.request({url:t,method:"post",type:"json",success:i})},t.exports=n},function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__;!function(t,e,i){"undefined"!=typeof module&&module.exports?module.exports=i():(__WEBPACK_AMD_DEFINE_FACTORY__=i,__WEBPACK_AMD_DEFINE_RESULT__="function"==typeof __WEBPACK_AMD_DEFINE_FACTORY__?__WEBPACK_AMD_DEFINE_FACTORY__.call(exports,__webpack_require__,exports,module):__WEBPACK_AMD_DEFINE_FACTORY__,!(void 0!==__WEBPACK_AMD_DEFINE_RESULT__&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)))}("reqwest",this,function(){function succeed(t){var e=protocolRe.exec(t.url);return e=e&&e[1]||context.location.protocol,httpsRe.test(e)?twoHundo.test(t.request.status):!!t.request.response}function handleReadyState(t,e,i){return function(){return t._aborted?i(t.request):t._timedOut?i(t.request,"Request is aborted: timeout"):void(t.request&&4==t.request[readyState]&&(t.request.onreadystatechange=noop,succeed(t)?e(t.request):i(t.request)))}}function setHeaders(t,e){var i,s=e.headers||{};s.Accept=s.Accept||defaultHeaders.accept[e.type]||defaultHeaders.accept["*"];var n="function"==typeof FormData&&e.data instanceof FormData;e.crossOrigin||s[requestedWith]||(s[requestedWith]=defaultHeaders.requestedWith),s[contentType]||n||(s[contentType]=e.contentType||defaultHeaders.contentType);for(i in s)s.hasOwnProperty(i)&&"setRequestHeader"in t&&t.setRequestHeader(i,s[i])}function setCredentials(t,e){"undefined"!=typeof e.withCredentials&&"undefined"!=typeof t.withCredentials&&(t.withCredentials=!!e.withCredentials)}function generalCallback(t){lastValue=t}function urlappend(t,e){return t+(/\?/.test(t)?"&":"?")+e}function handleJsonp(t,e,i,s){var n=uniqid++,a=t.jsonpCallback||"callback",r=t.jsonpCallbackName||reqwest.getcallbackPrefix(n),o=new RegExp("((^|\\?|&)"+a+")=([^&]+)"),l=s.match(o),c=doc.createElement("script"),d=0,u=-1!==navigator.userAgent.indexOf("MSIE 10.0");return l?"?"===l[3]?s=s.replace(o,"$1="+r):r=l[3]:s=urlappend(s,a+"="+r),context[r]=generalCallback,c.type="text/javascript",c.src=s,c.async=!0,"undefined"==typeof c.onreadystatechange||u||(c.htmlFor=c.id="_reqwest_"+n),c.onload=c.onreadystatechange=function(){return c[readyState]&&"complete"!==c[readyState]&&"loaded"!==c[readyState]||d?!1:(c.onload=c.onreadystatechange=null,c.onclick&&c.onclick(),e(lastValue),lastValue=void 0,head.removeChild(c),void(d=1))},head.appendChild(c),{abort:function(){c.onload=c.onreadystatechange=null,i({},"Request is aborted: timeout",{}),lastValue=void 0,head.removeChild(c),d=1}}}function getRequest(t,e){var i,s=this.o,n=(s.method||"GET").toUpperCase(),a="string"==typeof s?s:s.url,r=s.processData!==!1&&s.data&&"string"!=typeof s.data?reqwest.toQueryString(s.data):s.data||null,o=!1;return"jsonp"!=s.type&&"GET"!=n||!r||(a=urlappend(a,r),r=null),"jsonp"==s.type?handleJsonp(s,t,e,a):(i=s.xhr&&s.xhr(s)||xhr(s),i.open(n,a,s.async===!1?!1:!0),setHeaders(i,s),setCredentials(i,s),context[xDomainRequest]&&i instanceof context[xDomainRequest]?(i.onload=t,i.onerror=e,i.onprogress=function(){},o=!0):i.onreadystatechange=handleReadyState(this,t,e),s.before&&s.before(i),o?setTimeout(function(){i.send(r)},200):i.send(r),i)}function Reqwest(t,e){this.o=t,this.fn=e,init.apply(this,arguments)}function setType(t){return null===t?void 0:t.match("json")?"json":t.match("javascript")?"js":t.match("text")?"html":t.match("xml")?"xml":void 0}function init(o,fn){function complete(t){for(o.timeout&&clearTimeout(self.timeout),self.timeout=null;self._completeHandlers.length>0;)self._completeHandlers.shift()(t)}function success(resp){var type=o.type||resp&&setType(resp.getResponseHeader("Content-Type"));resp="jsonp"!==type?self.request:resp;var filteredResponse=globalSetupOptions.dataFilter(resp.responseText,type),r=filteredResponse;try{resp.responseText=r}catch(e){}if(r)switch(type){case"json":try{resp=context.JSON?context.JSON.parse(r):eval("("+r+")")}catch(err){return error(resp,"Could not parse JSON in response",err)}break;case"js":resp=eval(r);break;case"html":resp=r;break;case"xml":resp=resp.responseXML&&resp.responseXML.parseError&&resp.responseXML.parseError.errorCode&&resp.responseXML.parseError.reason?null:resp.responseXML}for(self._responseArgs.resp=resp,self._fulfilled=!0,fn(resp),self._successHandler(resp);self._fulfillmentHandlers.length>0;)resp=self._fulfillmentHandlers.shift()(resp);complete(resp)}function timedOut(){self._timedOut=!0,self.request.abort()}function error(t,e,i){for(t=self.request,self._responseArgs.resp=t,self._responseArgs.msg=e,self._responseArgs.t=i,self._erred=!0;self._errorHandlers.length>0;)self._errorHandlers.shift()(t,e,i);complete(t)}this.url="string"==typeof o?o:o.url,this.timeout=null,this._fulfilled=!1,this._successHandler=function(){},this._fulfillmentHandlers=[],this._errorHandlers=[],this._completeHandlers=[],this._erred=!1,this._responseArgs={};var self=this;fn=fn||function(){},o.timeout&&(this.timeout=setTimeout(function(){timedOut()},o.timeout)),o.success&&(this._successHandler=function(){o.success.apply(o,arguments)}),o.error&&this._errorHandlers.push(function(){o.error.apply(o,arguments)}),o.complete&&this._completeHandlers.push(function(){o.complete.apply(o,arguments)}),this.request=getRequest.call(this,success,error)}function reqwest(t,e){return new Reqwest(t,e)}function normalize(t){return t?t.replace(/\r?\n/g,"\r\n"):""}function serial(t,e){var i,s,n,a,r=t.name,o=t.tagName.toLowerCase(),l=function(t){t&&!t.disabled&&e(r,normalize(t.attributes.value&&t.attributes.value.specified?t.value:t.text))};if(!t.disabled&&r)switch(o){case"input":/reset|button|image|file/i.test(t.type)||(i=/checkbox/i.test(t.type),s=/radio/i.test(t.type),n=t.value,(!(i||s)||t.checked)&&e(r,normalize(i&&""===n?"on":n)));break;case"textarea":e(r,normalize(t.value));break;case"select":if("select-one"===t.type.toLowerCase())l(t.selectedIndex>=0?t.options[t.selectedIndex]:null);else for(a=0;t.length&&a<t.length;a++)t.options[a].selected&&l(t.options[a])}}function eachFormElement(){var t,e,i=this,s=function(t,e){var s,n,a;for(s=0;s<e.length;s++)for(a=t[byTag](e[s]),n=0;n<a.length;n++)serial(a[n],i)};for(e=0;e<arguments.length;e++)t=arguments[e],/input|select|textarea/i.test(t.tagName)&&serial(t,i),s(t,["input","select","textarea"])}function serializeQueryString(){return reqwest.toQueryString(reqwest.serializeArray.apply(null,arguments))}function serializeHash(){var t={};return eachFormElement.apply(function(e,i){e in t?(t[e]&&!isArray(t[e])&&(t[e]=[t[e]]),t[e].push(i)):t[e]=i},arguments),t}function buildParams(t,e,i,s){var n,a,r,o=/\[\]$/;if(isArray(e))for(a=0;e&&a<e.length;a++)r=e[a],i||o.test(t)?s(t,r):buildParams(t+"["+("object"==typeof r?a:"")+"]",r,i,s);else if(e&&"[object Object]"===e.toString())for(n in e)buildParams(t+"["+n+"]",e[n],i,s);else s(t,e)}var context=this;if("window"in context)var doc=document,byTag="getElementsByTagName",head=doc[byTag]("head")[0];else{var XHR2;try{XHR2=__webpack_require__(8)}catch(ex){throw new Error("Peer dependency `xhr2` required! Please npm install xhr2")}}var httpsRe=/^http/,protocolRe=/(^\w+):\/\//,twoHundo=/^(20\d|1223)$/,readyState="readyState",contentType="Content-Type",requestedWith="X-Requested-With",uniqid=0,callbackPrefix="reqwest_"+ +new Date,lastValue,xmlHttpRequest="XMLHttpRequest",xDomainRequest="XDomainRequest",noop=function(){},isArray="function"==typeof Array.isArray?Array.isArray:function(t){return t instanceof Array},defaultHeaders={contentType:"application/x-www-form-urlencoded",requestedWith:xmlHttpRequest,accept:{"*":"text/javascript, text/html, application/xml, text/xml, */*",xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript",js:"application/javascript, text/javascript"}},xhr=function(t){if(t.crossOrigin===!0){var e=context[xmlHttpRequest]?new XMLHttpRequest:null;if(e&&"withCredentials"in e)return e;if(context[xDomainRequest])return new XDomainRequest;throw new Error("Browser does not support cross-origin requests")}return context[xmlHttpRequest]?new XMLHttpRequest:XHR2?new XHR2:new ActiveXObject("Microsoft.XMLHTTP")},globalSetupOptions={dataFilter:function(t){return t}};return Reqwest.prototype={abort:function(){this._aborted=!0,this.request.abort()},retry:function(){init.call(this,this.o,this.fn)},then:function(t,e){return t=t||function(){},e=e||function(){},this._fulfilled?this._responseArgs.resp=t(this._responseArgs.resp):this._erred?e(this._responseArgs.resp,this._responseArgs.msg,this._responseArgs.t):(this._fulfillmentHandlers.push(t),this._errorHandlers.push(e)),this},always:function(t){return this._fulfilled||this._erred?t(this._responseArgs.resp):this._completeHandlers.push(t),this},fail:function(t){return this._erred?t(this._responseArgs.resp,this._responseArgs.msg,this._responseArgs.t):this._errorHandlers.push(t),this},"catch":function(t){return this.fail(t)}},reqwest.serializeArray=function(){var t=[];return eachFormElement.apply(function(e,i){t.push({name:e,value:i})},arguments),t},reqwest.serialize=function(){if(0===arguments.length)return"";var t,e,i=Array.prototype.slice.call(arguments,0);return t=i.pop(),t&&t.nodeType&&i.push(t)&&(t=null),t&&(t=t.type),e="map"==t?serializeHash:"array"==t?reqwest.serializeArray:serializeQueryString,e.apply(null,i)},reqwest.toQueryString=function(t,e){var i,s,n=e||!1,a=[],r=encodeURIComponent,o=function(t,e){e="function"==typeof e?e():null==e?"":e,a[a.length]=r(t)+"="+r(e)};if(isArray(t))for(s=0;t&&s<t.length;s++)o(t[s].name,t[s].value);else for(i in t)t.hasOwnProperty(i)&&buildParams(i,t[i],n,o);return a.join("&").replace(/%20/g,"+")},reqwest.getcallbackPrefix=function(){return callbackPrefix},reqwest.compat=function(t,e){return t&&(t.type&&(t.method=t.type)&&delete t.type,t.dataType&&(t.type=t.dataType),t.jsonpCallback&&(t.jsonpCallbackName=t.jsonpCallback)&&delete t.jsonpCallback,t.jsonp&&(t.jsonpCallback=t.jsonp)),new Reqwest(t,e)},reqwest.ajaxSetup=function(t){t=t||{};for(var e in t)globalSetupOptions[e]=t[e]},reqwest})},function(t,e){t.exports=XMLHttpRequest},function(t,e,i){"use strict";var s=i(2),n=i(10),a=i(3),r=s.extend({name:"notify",template:n,config:function(){a.extend(this.data,{messages:[],position:"topcenter",duration:2e3}),this.supr()},init:function(){this.supr(),this.$root===this&&this.$inject(document.body)},show:function(t,e,i){var s={text:t,type:e,duration:i>=0?i:this.data.duration};this.data.messages.unshift(s),this.$update(),+s.duration&&this.$timeout(this.close.bind(this,s),+s.duration),this.$emit("show",{message:s})},close:function(t){var e=this.data.messages.indexOf(t);this.data.messages.splice(e,1),this.$update(),this.$emit("close",{message:t})},closeAll:function(){this.$update("messages",[])}}).use("$timeout"),o=new r;r.notify=o,r.show=function(){o.show.apply(o,arguments)};var l=["success","warning","info","error"];l.forEach(function(t){r[t]=function(e){r.show(e,t)}}),r.close=function(){o.close.apply(o,arguments)},r.closeAll=function(){o.closeAll.apply(o,arguments)},t.exports=r},function(t,e){t.exports='<div class="m-notify m-notify-{@(position)} {@(class)}" r-hide={!visible}>\n    {#list messages as message}\n    <div class="u-message u-message-{@(message.type)}" r-animation="on: enter; class: animated fadeIn fast; on: leave; class: animated fadeOut fast;">\n        <a class="message_close" on-click={this.close(message)}><i class="u-icon u-icon-close"></i></a>\n        <i class="message_icon u-icon u-icon-{@(message.type)}-circle" r-hide={@(!message.type)}></i>\n        {@(message.text)}\n    </div>\n    {/list}\n</div>'},function(t,e,i){var s=i(5),n=i(12),a=i(3),r=s.extend({name:"dropdown",template:n,config:function(){a.extend(this.data,{itemTemplate:null,open:!1}),this.supr()},select:function(t){this.data.disabled||t.disabled||t.divider||(this.$emit("select",{selected:t}),this.toggle(!1))},toggle:function(t){if(!this.data.disabled){this.data.open=t;var e=r.opens.indexOf(this);t&&0>e?r.opens.push(this):!t&&e>=0&&r.opens.splice(e,1)}}});r.opens=[],a.dom.on(document.body,"click",function(t){r.opens.forEach(function(e){for(var i=e.$refs.element,s=t.target;s;){if(i==s)return;s=s.parentElement}e.toggle(!1),e.$update()})}),t.exports=r},function(t,e){t.exports='<div class="u-dropdown {@(class)}" r-class={ {\'z-dis\': disabled} } r-hide={!visible} ref="element">\n    <div class="dropdown_hd" on-click={this.toggle(!open)}>\n        {#if this.$body}\n            {#inc this.$body}\n        {#else}\n            <a class="u-btn">{title || \'下拉菜单\'} <i class="u-icon u-icon-caret-down"></i></a>\n        {/if}\n    </div>\n    <div class="dropdown_bd" r-hide={!open} r-animation="on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;">\n        <ul class="m-listview">\n            {#list source as item}\n            <li r-class={ {\'z-dis\': item.disabled, \'dropdown_divider\': item.divider} } on-click={this.select(item)}>{#if @(itemTemplate)}{#include @(itemTemplate)}{#else}{item.name}{/if}</li>\n            {/list}\n        </ul>\n    </div>\n</div>'},function(t,e,i){var s=i(11),n=i(5),a=i(14),r=i(15),o=i(3),l=s.extend({name:"menu",template:a,config:function(){o.extend(this.data,{open:!1}),this.supr(),this.$ancestor=this}});n.extend({name:"menuList",template:r,config:function(){o.extend(this.data,{itemTemplate:null}),this.supr(),this.$ancestor=this.$parent.$ancestor,this.service=this.$ancestor.service,this.data.itemTemplate=this.$ancestor.data.itemTemplate},select:function(t){this.$ancestor.data.disabled||t.disabled||t.divider||this.$ancestor.select(t)},toggle:function(t){this.$ancestor.data.disabled||(t.open=!t.open,this.$ancestor.$emit("toggle",{item:t,open:t.open}))}});t.exports=l},function(t,e){t.exports='<div class="u-dropdown u-dropdown-menu {@(class)}" r-class={ {\'z-dis\': disabled} } r-hide={!visible} ref="element">\n    <div class="dropdown_hd" on-click={this.toggle(!open)}>\n        {#if this.$body}\n            {#inc this.$body}\n        {#else}\n            <a class="u-btn">{title || \'多级菜单\'} <i class="u-icon u-icon-caret-down"></i></a>\n        {/if}\n    </div>\n    <div class="dropdown_bd" r-hide={!open} r-animation="on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;">\n        <menuList source={source} visible={true} />\n    </div>\n</div>'},function(t,e){t.exports='<ul class="m-listview menu_list" r-hide={!visible}>\n    {#list source as item}\n    <li r-class={ {\'z-dis\': item.disabled, \'dropdown_divider\': item.divider} }>\n        <div class="menu_item">\n            {#if item.childrenCount || (item.children && item.children.length)}\n            <i class="u-icon u-icon-caret-right"></i>\n            {/if}\n            <div class="menu_itemname" title={item.name} on-click={this.select(item)}>{#if @(itemTemplate)}{#include @(itemTemplate)}{#else}{item.name}{/if}</div>\n        </div>\n        {#if item.childrenCount || (item.children && item.children.length)}<menuList source={item.children} visible={item.open} parent={item} />{/if}\n    </li>\n    {/list}\n</ul>'},function(t,e,i){var s=i(2),n=i(17),a=i(3),r=i(18),o=s.extend({name:"input2",template:n,config:function(){a.extend(this.data,{value:"",type:"",placeholder:"",rules:[]}),this.supr()},validate:function(t,e){var i=r.validate(t,e);this.data.type=i.success?"success":"error",this.data.tip=i.message}});t.exports=o},function(t,e){t.exports='<label class="u-input2 {@(class)}" r-hide={!visible}>\n    <input class="u-input u-input-{type}" r-model={value} placeholder={placeholder} disabled={disabled} readonly={readonly} on-keyup={this.validate(value, rules)}>\n</label>\n{#if tip}<span class="u-tip u-tip-{type}">{tip}</span>{/if}'},function(t,e,i){"use strict";var s=i(19),n={};n.validate=function(t,e){var i={success:!0,message:""};return e.forEach(function(e){e.success=!0,"is"===e.type?e.success=e.reg.test(t):"isRequired"===e.type?e.success=!!t:"isFilled"===e.type?e.success=!!t&&t.trim():"isEmail"===e.type?e.success=s.isEmail(t):"isURL"===e.type?e.success=s.isURL(t):"isNumber"===e.type?e.success=s.isInt(t):"isInt"===e.type?e.success=s.isInt(t):"isFloat"===e.type?e.success=s.isFloat(t):"isLength"===e.type?e.success=s.isLength(t,e.min,e.max):e.success=e.method(t),!e.success&&i.success&&(i.success=!1,i.message=e.message)}),i},n.validateForm=function(t,e){var i={results:{},success:!0,message:""};for(var s in e){var a=e[s];if(a){var r=t[s];i.results[s]=n.validate(r,a)}}return i},t.exports=n},function(t,e,i){!function(e,i){t.exports=i()}("validator",function(t){"use strict";function e(t,e){t=t||{};for(var i in e)"undefined"==typeof t[i]&&(t[i]=e[i]);return t}function i(t){var e="(\\"+t.symbol.replace(/\./g,"\\.")+")"+(t.require_symbol?"":"?"),i="-?",s="[1-9]\\d*",n="[1-9]\\d{0,2}(\\"+t.thousands_separator+"\\d{3})*",a=["0",s,n],r="("+a.join("|")+")?",o="(\\"+t.decimal_separator+"\\d{2})?",l=r+o;return t.allow_negatives&&!t.parens_for_negatives&&(t.negative_sign_after_digits?l+=i:t.negative_sign_before_digits&&(l=i+l)),t.allow_negative_sign_placeholder?l="( (?!\\-))?"+l:t.allow_space_after_symbol?l=" ?"+l:t.allow_space_after_digits&&(l+="( (?!$))?"),t.symbol_after_digits?l+=e:l=e+l,t.allow_negatives&&(t.parens_for_negatives?l="(\\("+l+"\\)|"+l+")":t.negative_sign_before_digits||t.negative_sign_after_digits||(l=i+l)),new RegExp("^(?!-? )(?=.*\\d)"+l+"$")}t={version:"4.0.5"};var s=/^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i,n=/^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i,a=/^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i,r=/^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i,o=/^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\s]*<(.+)>$/i,l=/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,c=/^[A-Z]{2}[0-9A-Z]{9}[0-9]$/,d=/^(?:[0-9]{9}X|[0-9]{10})$/,u=/^(?:[0-9]{13})$/,h=/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/,p=/^[0-9A-F]{1,4}$/i,f={3:/^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,4:/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,5:/^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,all:/^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i},m=/^[A-Z]+$/i,v=/^[0-9A-Z]+$/i,g=/^[-+]?[0-9]+$/,x=/^(?:[-+]?(?:0|[1-9][0-9]*))$/,b=/^(?:[-+]?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/,_=/^[0-9A-F]+$/i,y=/^[-+]?([0-9]+|\.[0-9]+|[0-9]+\.[0-9]+)$/,w=/^#?([0-9A-F]{3}|[0-9A-F]{6})$/i,$=/^[\x00-\x7F]+$/,k=/[^\x00-\x7F]/,F=/[^\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/,D=/[\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/,A=/[\uD800-\uDBFF][\uDC00-\uDFFF]/,E=/^(?:[A-Z0-9+\/]{4})*(?:[A-Z0-9+\/]{2}==|[A-Z0-9+\/]{3}=|[A-Z0-9+\/]{4})$/i,C={"zh-CN":/^(\+?0?86\-?)?1[345789]\d{9}$/,"en-ZA":/^(\+?27|0)\d{9}$/,"en-AU":/^(\+?61|0)4\d{8}$/,"en-HK":/^(\+?852\-?)?[569]\d{3}\-?\d{4}$/,"fr-FR":/^(\+?33|0)[67]\d{8}$/,"pt-PT":/^(\+351)?9[1236]\d{7}$/,"el-GR":/^(\+30)?((2\d{9})|(69\d{8}))$/,"en-GB":/^(\+?44|0)7\d{9}$/,"en-US":/^(\+?1)?[2-9]\d{2}[2-9](?!11)\d{6}$/,"en-ZM":/^(\+26)?09[567]\d{7}$/,"ru-RU":/^(\+?7|8)?9\d{9}$/},T=/^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;t.extend=function(e,i){t[e]=function(){var e=Array.prototype.slice.call(arguments);return e[0]=t.toString(e[0]),i.apply(t,e)}},t.init=function(){for(var e in t)"function"==typeof t[e]&&"toString"!==e&&"toDate"!==e&&"extend"!==e&&"init"!==e&&t.extend(e,t[e])},t.toString=function(t){return"object"==typeof t&&null!==t&&t.toString?t=t.toString():null===t||"undefined"==typeof t||isNaN(t)&&!t.length?t="":"string"!=typeof t&&(t+=""),t},t.toDate=function(t){return"[object Date]"===Object.prototype.toString.call(t)?t:(t=Date.parse(t),isNaN(t)?null:new Date(t))},t.toFloat=function(t){return parseFloat(t)},t.toInt=function(t,e){return parseInt(t,e||10)},t.toBoolean=function(t,e){return e?"1"===t||"true"===t:"0"!==t&&"false"!==t&&""!==t},t.equals=function(e,i){return e===t.toString(i)},t.contains=function(e,i){return e.indexOf(t.toString(i))>=0},t.matches=function(t,e,i){return"[object RegExp]"!==Object.prototype.toString.call(e)&&(e=new RegExp(e,i)),e.test(t)};var q={allow_display_name:!1,allow_utf8_local_part:!0,require_tld:!0};t.isEmail=function(i,l){if(l=e(l,q),l.allow_display_name){var c=i.match(o);c&&(i=c[1])}var d=i.split("@"),u=d.pop(),h=d.join("@"),p=u.toLowerCase();if(("gmail.com"===p||"googlemail.com"===p)&&(h=h.replace(/\./g,"").toLowerCase()),!t.isByteLength(h,0,64)||!t.isByteLength(u,0,256))return!1;if(!t.isFQDN(u,{require_tld:l.require_tld}))return!1;if('"'===h[0])return h=h.slice(1,h.length-1),l.allow_utf8_local_part?r.test(h):n.test(h);for(var f=l.allow_utf8_local_part?a:s,m=h.split("."),v=0;v<m.length;v++)if(!f.test(m[v]))return!1;return!0};var P={protocols:["http","https","ftp"],require_tld:!0,require_protocol:!1,require_valid_protocol:!0,allow_underscores:!1,allow_trailing_dot:!1,allow_protocol_relative_urls:!1};t.isURL=function(i,s){if(!i||i.length>=2083||/\s/.test(i))return!1;if(0===i.indexOf("mailto:"))return!1;s=e(s,P);var n,a,r,o,l,c,d;if(d=i.split("://"),d.length>1){if(n=d.shift(),s.require_valid_protocol&&-1===s.protocols.indexOf(n))return!1}else{if(s.require_protocol)return!1;s.allow_protocol_relative_urls&&"//"===i.substr(0,2)&&(d[0]=i.substr(2))}return i=d.join("://"),d=i.split("#"),i=d.shift(),d=i.split("?"),i=d.shift(),d=i.split("/"),i=d.shift(),d=i.split("@"),d.length>1&&(a=d.shift(),a.indexOf(":")>=0&&a.split(":").length>2)?!1:(o=d.join("@"),d=o.split(":"),r=d.shift(),d.length&&(c=d.join(":"),l=parseInt(c,10),!/^[0-9]+$/.test(c)||0>=l||l>65535)?!1:t.isIP(r)||t.isFQDN(r,s)||"localhost"===r?s.host_whitelist&&-1===s.host_whitelist.indexOf(r)?!1:s.host_blacklist&&-1!==s.host_blacklist.indexOf(r)?!1:!0:!1)},t.isIP=function(e,i){if(i=t.toString(i),!i)return t.isIP(e,4)||t.isIP(e,6);if("4"===i){if(!h.test(e))return!1;var s=e.split(".").sort(function(t,e){return t-e});return s[3]<=255}if("6"===i){var n=e.split(":"),a=!1,r=t.isIP(n[n.length-1],4),o=r?7:8;if(n.length>o)return!1;if("::"===e)return!0;"::"===e.substr(0,2)?(n.shift(),n.shift(),a=!0):"::"===e.substr(e.length-2)&&(n.pop(),n.pop(),a=!0);for(var l=0;l<n.length;++l)if(""===n[l]&&l>0&&l<n.length-1){if(a)return!1;a=!0}else if(r&&l==n.length-1);else if(!p.test(n[l]))return!1;return a?n.length>=1:n.length===o}return!1};var R={require_tld:!0,allow_underscores:!1,allow_trailing_dot:!1};t.isFQDN=function(t,i){i=e(i,R),i.allow_trailing_dot&&"."===t[t.length-1]&&(t=t.substring(0,t.length-1));var s=t.split(".");if(i.require_tld){var n=s.pop();if(!s.length||!/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(n))return!1}for(var a,r=0;r<s.length;r++){if(a=s[r],i.allow_underscores){if(a.indexOf("__")>=0)return!1;a=a.replace(/_/g,"")}if(!/^[a-z\u00a1-\uffff0-9-]+$/i.test(a))return!1;if(/[\uff01-\uff5e]/.test(a))return!1;if("-"===a[0]||"-"===a[a.length-1]||a.indexOf("---")>=0)return!1}return!0},t.isBoolean=function(t){return["true","false","1","0"].indexOf(t)>=0},t.isAlpha=function(t){return m.test(t)},t.isAlphanumeric=function(t){return v.test(t)},t.isNumeric=function(t){return g.test(t)},t.isDecimal=function(t){return""!==t&&y.test(t)},t.isHexadecimal=function(t){return _.test(t)},t.isHexColor=function(t){return w.test(t)},t.isLowercase=function(t){return t===t.toLowerCase()},t.isUppercase=function(t){return t===t.toUpperCase()},t.isInt=function(t,e){return e=e||{},x.test(t)&&(!e.hasOwnProperty("min")||t>=e.min)&&(!e.hasOwnProperty("max")||t<=e.max)},t.isFloat=function(t,e){return e=e||{},""!==t&&b.test(t)&&(!e.hasOwnProperty("min")||t>=e.min)&&(!e.hasOwnProperty("max")||t<=e.max)},t.isDivisibleBy=function(e,i){return t.toFloat(e)%t.toInt(i)===0},t.isNull=function(t){return 0===t.length},t.isLength=function(t,e,i){var s=t.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g)||[],n=t.length-s.length;return n>=e&&("undefined"==typeof i||i>=n)},t.isByteLength=function(t,e,i){var s=encodeURI(t).split(/%..|./).length-1;return s>=e&&("undefined"==typeof i||i>=s)},t.isUUID=function(t,e){var i=f[e?e:"all"];return i&&i.test(t)},t.isDate=function(t){return!isNaN(Date.parse(t))},t.isAfter=function(e,i){var s=t.toDate(i||new Date),n=t.toDate(e);return!!(n&&s&&n>s)},t.isBefore=function(e,i){var s=t.toDate(i||new Date),n=t.toDate(e);return n&&s&&s>n},t.isIn=function(e,i){var s;if("[object Array]"===Object.prototype.toString.call(i)){var n=[];for(s in i)n[s]=t.toString(i[s]);return n.indexOf(e)>=0}return"object"==typeof i?i.hasOwnProperty(e):i&&"function"==typeof i.indexOf?i.indexOf(e)>=0:!1},t.isCreditCard=function(t){var e=t.replace(/[^0-9]+/g,"");if(!l.test(e))return!1;for(var i,s,n,a=0,r=e.length-1;r>=0;r--)i=e.substring(r,r+1),s=parseInt(i,10),n?(s*=2,a+=s>=10?s%10+1:s):a+=s,n=!n;return!!(a%10===0?e:!1)},t.isISIN=function(t){if(!c.test(t))return!1;for(var e,i,s=t.replace(/[A-Z]/g,function(t){return parseInt(t,36)}),n=0,a=!0,r=s.length-2;r>=0;r--)e=s.substring(r,r+1),i=parseInt(e,10),a?(i*=2,n+=i>=10?i+1:i):n+=i,a=!a;return parseInt(t.substr(t.length-1),10)===(1e4-n)%10},t.isISBN=function(e,i){if(i=t.toString(i),!i)return t.isISBN(e,10)||t.isISBN(e,13);var s,n=e.replace(/[\s-]+/g,""),a=0;if("10"===i){if(!d.test(n))return!1;for(s=0;9>s;s++)a+=(s+1)*n.charAt(s);if(a+="X"===n.charAt(9)?100:10*n.charAt(9),a%11===0)return!!n}else if("13"===i){if(!u.test(n))return!1;var r=[1,3];for(s=0;12>s;s++)a+=r[s%2]*n.charAt(s);if(n.charAt(12)-(10-a%10)%10===0)return!!n}return!1},t.isMobilePhone=function(t,e){return e in C?C[e].test(t):!1};var S={symbol:"$",require_symbol:!1,allow_space_after_symbol:!1,symbol_after_digits:!1,allow_negatives:!0,parens_for_negatives:!1,negative_sign_before_digits:!1,negative_sign_after_digits:!1,allow_negative_sign_placeholder:!1,thousands_separator:",",decimal_separator:".",allow_space_after_digits:!1};t.isCurrency=function(t,s){return s=e(s,S),i(s).test(t)},t.isJSON=function(t){try{var e=JSON.parse(t);return!!e&&"object"==typeof e}catch(i){}return!1},t.isMultibyte=function(t){return k.test(t)},t.isAscii=function(t){return $.test(t)},t.isFullWidth=function(t){return F.test(t)},t.isHalfWidth=function(t){return D.test(t)},t.isVariableWidth=function(t){return F.test(t)&&D.test(t)},t.isSurrogatePair=function(t){return A.test(t)},t.isBase64=function(t){return E.test(t)},t.isMongoId=function(e){return t.isHexadecimal(e)&&24===e.length},t.isISO8601=function(t){return T.test(t)},t.ltrim=function(t,e){var i=e?new RegExp("^["+e+"]+","g"):/^\s+/g;return t.replace(i,"")},t.rtrim=function(t,e){var i=e?new RegExp("["+e+"]+$","g"):/\s+$/g;return t.replace(i,"")},t.trim=function(t,e){var i=e?new RegExp("^["+e+"]+|["+e+"]+$","g"):/^\s+|\s+$/g;return t.replace(i,"")},t.escape=function(t){return t.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\//g,"&#x2F;").replace(/\`/g,"&#96;")},t.stripLow=function(e,i){var s=i?"\\x00-\\x09\\x0B\\x0C\\x0E-\\x1F\\x7F":"\\x00-\\x1F\\x7F";return t.blacklist(e,s)},t.whitelist=function(t,e){return t.replace(new RegExp("[^"+e+"]+","g"),"")},t.blacklist=function(t,e){return t.replace(new RegExp("["+e+"]+","g"),"")};var O={lowercase:!0};return t.normalizeEmail=function(i,s){if(s=e(s,O),!t.isEmail(i))return!1;var n=i.split("@",2);if(n[1]=n[1].toLowerCase(),"gmail.com"===n[1]||"googlemail.com"===n[1]){if(n[0]=n[0].toLowerCase().replace(/\./g,""),"+"===n[0][0])return!1;n[0]=n[0].split("+")[0],n[1]="gmail.com"}else s.lowercase&&(n[0]=n[0].toLowerCase());return n.join("@")},t.init(),t})},function(t,e,i){var s=i(16),n=i(21),a=i(3),r=s.extend({name:"numberInput",template:n,config:function(){a.extend(this.data,{value:0,min:null,max:null}),this.supr(),this.$watch("value",function(t,e){null!==this.data.max&&this.data.value>this.data.max&&(this.data.value=this.data.max),null!==this.data.min&&this.data.value<this.data.min&&(this.data.value=this.data.min),t!=e&&this.$emit("change",{value:t})})},increase:function(){this.data.readonly||this.data.disabled||this.data.value++;
},decrease:function(){this.data.readonly||this.data.disabled||this.data.value--}}).filter({number:{get:function(t){return t=""+(t||0),this.data.format?this.data.format.replace(new RegExp("\\d{0,"+t.length+"}$"),t):t},set:function(t){return+t||0}}});t.exports=r},function(t,e){t.exports='<label class="u-input2 u-input2-numberinput {@(class)}" r-hide={!visible}>\n    <input class="u-input u-input-{type}" r-model={value | number} placeholder={placeholder} disabled={disabled} readonly={readonly}>\n    <a class="u-btn" r-class={ {\'z-dis\': disabled} } on-click={this.increase()}><i class="u-icon u-icon-caret-up"></i></a>\n    <a class="u-btn" r-class={ {\'z-dis\': disabled} } on-click={this.decrease()}><i class="u-icon u-icon-caret-down"></i></a>\n</label>\n{#if tip}<span class="u-tip u-tip-{type}">{tip}</span>{/if}'},function(t,e,i){"use strict";var s=i(2),n=i(23),a=i(3),r=s.extend({name:"check2",template:n,config:function(){a.extend(this.data,{name:"",checked:!1,block:!1}),this.supr()},check:function(t){this.data.readonly||this.data.disabled||(this.data.checked=t,this.$emit("check",{checked:t}))}});t.exports=r},function(t,e){t.exports="<label class=\"u-check2 {@(class)}\" r-class={ {'z-dis': disabled, 'z-chk': checked, 'z-part': checked === null, 'u-check2-block': block} } r-hide={!visible} title={name} on-click={this.check(!checked)}><div class=\"check2_box\"><i class=\"u-icon u-icon-check\"></i></div> {name}</label>"},function(t,e,i){"use strict";var s=i(5),n=i(25),a=i(3),r=s.extend({name:"checkGroup",template:n,config:function(){a.extend(this.data,{block:!1}),this.supr()}});t.exports=r},function(t,e){t.exports='<div class="u-unitgroup {@(class)}" r-hide={!visible}>\n    {#list source as item}\n    <label class="u-check2" r-class={ {\'z-dis\': disabled, \'u-check2-block\': block} } title={item.name}><input type="checkbox" class="u-check" r-model={item.checked} disabled={disabled}> {item.name}</label>\n    {/list}\n</div>'},function(t,e,i){"use strict";var s=i(24),n=i(27),a=(i(3),i(22),s.extend({name:"check2Group",template:n}));t.exports=a},function(t,e){t.exports='<div class="u-unitgroup {@(class)}" r-hide={!visible}>\n    {#list source as item}\n    <check2 name={item.name} checked={item.checked} disabled={disabled} block={block} />\n    {/list}\n</div>'},function(t,e,i){"use strict";var s=i(5),n=i(29),a=i(3),r=s.extend({name:"radioGroup",template:n,config:function(){a.extend(this.data,{selected:null,_radioGroupId:new Date}),this.supr()},select:function(t){this.data.readonly||this.data.disabled||(this.data.selected=t,this.$emit("select",{selected:t}))}});t.exports=r},function(t,e){t.exports='<div class="u-unitgroup {@(class)}" r-hide={!visible}>\n    {#list source as item}\n    <label class="u-radio2" r-class={ {\'z-dis\': disabled, \'u-radio2-block\': block} } title={item.name} on-click={this.select(item)}><input type="radio" class="u-radio" name={_radioGroupId} disabled={disabled}> {item.name}</label>\n    {/list}\n</div>'},function(t,e,i){"use strict";var s=i(28),n=i(31),a=(i(3),s.extend({name:"radio2Group",template:n}));t.exports=a},function(t,e){t.exports='<div class="u-unitgroup {@(class)}" r-hide={!visible}>\n    {#list source as item}\n    <label class="u-radio2" r-class={ {\'z-dis\': disabled, \'z-sel\': item === selected, \'u-radio2-block\': block} } title={item.name} on-click={this.select(item)}><div class="radio2_box"><i class="u-icon u-icon-radio"></i></div> {item.name}</label>\n    {/list}\n</div>'},function(t,e,i){"use strict";var s=i(11),n=i(33),a=i(3),r=s.extend({name:"select2",template:n,config:function(){a.extend(this.data,{selected:null,placeholder:"请选择"}),this.supr()},select:function(t){this.$update("selected",t),this.$emit("select",{selected:t}),this.toggle(!1)}});t.exports=r},function(t,e){t.exports='<div class="u-dropdown u-dropdown-select2 {@(class)}" r-class={ {\'z-dis\': disabled} } r-hide={!visible} ref="element">\n    <div class="dropdown_hd" on-click={this.toggle(!open)}>\n        <span>{selected ? selected.name : placeholder}</span>\n        <i class="u-icon u-icon-caret-down"></i>\n    </div>\n    <div class="dropdown_bd" r-hide={!open} r-animation="on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;">\n        <ul class="m-listview">\n            {#if placeholder}<li r-class={ {\'z-sel\': selected === null} } on-click={this.select(null)}>{placeholder}</li>{/if}\n            {#list source as item}\n            <li r-class={ {\'z-sel\': selected === item} } on-click={this.select(item)}>{item.name}</li>\n            {/list}\n        </ul>\n    </div>\n</div>'},function(t,e,i){"use strict";var s=i(32),n=i(35),a=i(3),r=(i(36),s.extend({name:"treeSelect",template:n,config:function(){a.extend(this.data,{hierarchical:!1,updateAuto:!1}),this.supr()}}));t.exports=r},function(t,e){t.exports='<div class="u-dropdown u-dropdown-select2 {@(class)}" r-class={ {\'z-dis\': disabled} } r-hide={!visible} ref="element">\n    <div class="dropdown_hd" on-click={this.toggle(!open)}>\n        <i class="u-icon u-icon-caret-down"></i>\n        <span>{selected ? selected.name : placeholder}</span>\n    </div>\n    <div class="dropdown_bd" r-hide={!open} r-animation="on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;">\n        <treeView source={source} hierarchical={hierarchical} service={service} on-select={this.select($event.selected)} />\n    </div>\n</div>'},function(t,e,i){"use strict";var s=i(5),n=i(37),a=i(38),r=i(3),o=s.extend({name:"treeView",template:n,config:function(){r.extend(this.data,{selected:null,multiple:!1,hierarchical:!1}),this.supr(),this.$ancestor=this},select:function(t){this.data.readonly||this.data.disabled||t.disabled||(this.data.selected=t,this.$emit("select",{selected:t}))},toggle:function(t){this.data.readonly||this.data.disabled||t.disabled||(t.open=!t.open,this.$emit("toggle",{item:t,open:t.open}))}});s.extend({name:"treeViewList",template:a,config:function(){r.extend(this.data,{itemTemplate:null,visible:!1}),this.supr(),this.$ancestor=this.$parent.$ancestor,this.service=this.$ancestor.service,this.data.itemTemplate=this.$ancestor.data.itemTemplate,this.data.hierarchical=this.$ancestor.data.hierarchical,this.$watch("visible",function(t){this.data.hierarchical&&t&&"treeViewList"===this.$parent.name&&this.$updateSource(function(){this.data.hierarchical=!1})})},getParams:function(){return this.data.parent?r.extend({parentId:this.data.parent.id},this.$ancestor.getParams()):void 0},$updateSource:function(){return this.service.getList(this.getParams(),function(t){t.forEach(function(t){t.parent=this.data.parent}.bind(this)),this.$update("source",t),this.$emit("updateSource",{result:t})}.bind(this)),this},select:function(t){this.$ancestor.select(t)},toggle:function(t){this.$ancestor.toggle(t)}});t.exports=o},function(t,e){t.exports="<div class=\"m-treeview {@(class)}\" r-class={ {'z-dis': disabled} } r-hide={!visible}>\n    <treeViewList source={source} visible={true} />\n</div>"},function(t,e){t.exports="<ul class=\"treeview_list\" r-hide={!visible}>\n    {#list source as item}\n    <li>\n        <div class=\"treeview_item\">\n            {#if item.childrenCount || (item.children && item.children.length)}\n            <i class=\"u-icon\" r-class={ {'u-icon-caret-right': !item.open, 'u-icon-caret-down': item.open}} on-click={this.toggle(item)}></i>\n            {/if}\n            <div class=\"treeview_itemname\" r-class={ {'z-sel': this.$ancestor.data.selected === item, 'z-dis': item.disabled} } title={item.name} on-click={this.select(item)}>{#if @(itemTemplate)}{#include @(itemTemplate)}{#else}{item.name}{/if}</div>\n        </div>\n        {#if item.childrenCount || (item.children && item.children.length)}<treeViewList source={item.children} visible={item.open} parent={item} />{/if}\n    </li>\n    {/list}\n</ul>"},function(t,e,i){"use strict";var s=i(11),n=i(40),a=i(3),r=(i(41),s.extend({name:"suggest",template:n,config:function(){a.extend(this.data,{selected:null,value:"",placeholder:"请输入",minLength:0,delay:300,matchType:"all",strict:!1}),this.supr()},select:function(t){this.$update("selected",t),this.data.value=t.name,this.$emit("select",{selected:t}),this.toggle(!1)},toggle:function(t,e){if(!this.data.readonly&&!this.data.disabled){this.data.open=t,this.$emit("toggle",{open:t});var i=s.opens.indexOf(this);t&&0>i?s.opens.push(this):!t&&i>=0&&(s.opens.splice(i,1),!e&&this.data.strict&&(this.data.value=this.data.selected?this.data.selected.name:""))}},input:function(t){var e=this.data.value;e.length>=this.data.minLength?(this.toggle(!0),this.service&&this.$updateSource()):this.toggle(!1,!0)},uninput:function(t){},getParams:function(){return{value:this.data.value}},filter:function(t){var e=this.data.value;return!e&&this.data.minLength?!1:"all"==this.data.matchType?t.name.indexOf(e)>=0:"start"==this.data.matchType?t.name.slice(0,e.length)==e:"end"==this.data.matchType?t.name.slice(-e.length)==e:void 0}}));t.exports=r},function(t,e){t.exports='<div class="u-dropdown u-dropdown-suggest {@(class)}" r-class={ {\'z-dis\': disabled} } r-hide={!visible} ref="element">\n    <div class="dropdown_hd">\n        <input class="u-input u-input-full" placeholder={placeholder} r-model={value} on-focus={this.input($event)} on-keyup={this.input($event)} on-blur={this.uninput($event)} ref="input" disabled={disabled} {#if readonly}readonly="readonly"{/if}>\n    </div>\n    <div class="dropdown_bd" r-hide={!open} r-animation="on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;">\n        <ul class="m-listview">\n            {#list source as item}\n            {#if this.filter(item)}\n                <li on-click={this.select(item)}>{item.name}</li>\n            {/if}\n            {/list}\n        </ul>\n    </div>\n</div>'},function(t,e,i){"use strict";var s=i(5),n=i(42),a=i(3),r=s.extend({name:"listView",template:n,config:function(){a.extend(this.data,{selected:null,itemTemplate:null}),this.supr()},select:function(t){this.data.readonly||this.data.disabled||t.disabled||(this.data.selected=t,this.$emit("select",{selected:t}))}});t.exports=r},function(t,e){t.exports="<ul class=\"m-listview {@(class)}\" r-class={ {'z-dis': disabled} } r-hide={!visible}>\n    {#list source as item}\n    <li r-class={ {'z-sel': selected === item, 'z-dis': item.disabled} } title={item.name} on-click={this.select(item)}>{#if @(itemTemplate)}{#include @(itemTemplate)}{#else}{item.name}{/if}</li>\n    {/list}\n</ul>"},function(t,e,i){"use strict";var s=i(2),n=i(44),a=i(3),r=s.extend({name:"uploader",template:n,config:function(){a.extend(this.data,{title:"",url:"",contentType:"multipart/form-data",dataType:"json",data:{},extensions:null,_id:(new Date).getTime()}),this.supr()},upload:function(){this.data.disabled||this.$refs.file.click()},submit:function(){if(this.data.extensions){var t=this.$refs.file.value,e=t.substring(t.lastIndexOf(".")+1,t.length).toLowerCase(),i=this.data.extensions;if("string"==typeof i&&(i=i.split(",")),-1===i.indexOf(e))return this.$emit("error",this.extensionError())}this.$emit("sending",this.data.data),this.$refs.form.submit()},cbUpload:function(){function t(t,e){var i="xml"!=e&&e?t.responseText:t.responseXML;if("json"===e)try{i=JSON.parse(i)}catch(s){var n=/<pre.*?>(.*?)<\/pre>/.exec(i);n=n?n[1]:i,i=JSON.parse(n)}return i}var e=this.$refs.iframe,i={};try{e.contentWindow?(i.responseText=e.contentWindow.document.body?e.contentWindow.document.body.innerHTML:null,i.responseXML=e.contentWindow.document.XMLDocument?e.contentWindow.document.XMLDocument:e.contentWindow.document):e.contentDocument&&(i.responseText=e.contentDocument.document.body?e.contentDocument.document.body.innerHTML:null,i.responseXML=e.contentDocument.document.XMLDocument?e.contentDocument.document.XMLDocument:e.contentDocument.document)}catch(s){console.log(s)}i.responseText&&(this.$emit("success",t(i,this.data.dataType)),this.$emit("complete",i),this.$refs.file.value="")},extensionError:function(){return"只能上传"+this.data.extensions.join(", ")+"类型的文件！"}});t.exports=r},function(t,e){t.exports='<div class="u-uploader {@(class)}" r-hide={!visible}>\n <div on-click={this.upload()}>\n        {#if this.$body}\n          {#inc this.$body}\n     {#else}\n           <a class="u-btn">{title || \'上传\'}</a>\n        {/if}\n    </div>\n    <form method="POST" action={url} target="iframe{_id}" enctype={contentType} ref="form">\n        <input type="file" name="file" ref="file" on-change={this.submit()}>\n        {#list Object.keys(data) as key}\n        <input type="hidden" name={key} value={data[key]}>\n        {/list}\n    </form>\n    <iframe name="iframe{_id}" on-load={this.cbUpload()} ref="iframe">\n    </iframe>\n</div>'},function(t,e,i){var s=i(11),n=i(46),a=i(3),r=i(4),o=(i(47),s.extend({name:"datePicker",template:n,config:function(){a.extend(this.data,{minDate:null,maxDate:null,placeholder:"请输入"}),this.supr()},select:function(t){this.$emit("select",{date:t}),this.toggle(!1)},input:function(t){var e=new Date(t.target.value);"Invalid Date"!=e?this.data.date=e:t.target.value=r.format(this.data.date,"yyyy-MM-dd")}}));t.exports=o},function(t,e){t.exports='<div class="u-dropdown u-dropdown-datepicker {@(class)}" r-class={ {\'z-dis\': disabled} } r-hide={!visible} ref="element">\n    <div class="dropdown_hd">\n        <input class="u-input u-input-full" placeholder={placeholder} value={date | format: \'yyyy-MM-dd\'} on-focus={this.toggle(true)} on-change={this.input($event)} ref="input" disabled={disabled} {#if readonly}readonly="readonly"{/if}>\n    </div>\n    <div class="dropdown_bd" r-hide={!open} r-animation="on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;">\n        <calendar date={date} minDate={minDate} maxDate={maxDate} on-select={this.select($event.date)} />\n    </div>\n</div>'},function(t,e,i){"use strict";var s=i(2),n=i(48),a=i(3),r=864e5,o=s.extend({name:"calendar",template:n,config:function(){a.extend(this.data,{date:null,minDate:null,maxDate:null,_days:[]}),this.supr(),this.$watch("date",function(t,e){t&&e&&t.getFullYear()===e.getFullYear()&&t.getMonth()===e.getMonth()||this.update()}),this.data.date||this.goToday()},update:function(){this.data._days=[];var t=this.data.date,e=t.getMonth(),i=new Date(t);i.setDate(1);var s=i.getTime(),n=new Date(i);n.setMonth(e+1),n.setDate(1);var a,o,l=n.getTime(),c=l+((7-n.getDay())%7-1)*r,d=-i.getDay();do a=s+d++*r,o=new Date(a),this.data._days.push(o);while(c>a)},addYear:function(t){if(!this.data.readonly&&!this.data.disabled&&t){var e=new Date(this.data.date);e.setFullYear(e.getFullYear()+t),this.data.date=e}},addMonth:function(t){if(!this.data.readonly&&!this.data.disabled&&t){var e=new Date(this.data.date);e.setMonth(e.getMonth()+t),this.data.date=e}},select:function(t){this.data.readonly||this.data.disabled||this.isOutOfRange(t)||(this.data.date=new Date(t),this.$emit("select",{date:t}))},goToday:function(){this.data.date=new Date(((new Date).getTime()/r>>0)*r)},isOutOfRange:function(t){var e=this.data.minDate?new Date((this.data.minDate.getTime()/r>>0)*r):null,i=this.data.maxDate?new Date((this.data.maxDate.getTime()/r>>0)*r):null;return e&&e>t||i&&t>i}});t.exports=o},function(t,e){t.exports='<div class="u-calendar {@(class)}" r-class={ {\'z-dis\': disabled} } r-hide={!visible}>\n    <div class="calendar_hd">\n        <span class="calendar_prev">\n            <span class="calendar_item" on-click={this.addYear(-1)}><i class="u-icon u-icon-angle-double-left"></i></span>\n            <span class="calendar_item" on-click={this.addMonth(-1)}><i class="u-icon u-icon-angle-left"></i></span>\n        </span>\n        <span>{date | format: \'yyyy-MM\'}</span>\n        <span class="calendar_next">\n            <span class="calendar_item" on-click={this.addMonth(1)}><i class="u-icon u-icon-angle-right"></i></span>\n            <span class="calendar_item" on-click={this.addYear(1)}><i class="u-icon u-icon-angle-double-right"></i></span>\n        </span>\n    </div>\n    <div class="calendar_bd">\n        <div class="calendar_week"><span class="calendar_item">日</span><span class="calendar_item">一</span><span class="calendar_item">二</span><span class="calendar_item">三</span><span class="calendar_item">四</span><span class="calendar_item">五</span><span class="calendar_item">六</span></div>\n        <div class="calendar_day">{#list _days as day}<span class="calendar_item" r-class={ {\'z-sel\': date.toDateString() === day.toDateString(), \'z-muted\': date.getMonth() !== day.getMonth(), \'z-dis\': this.isOutOfRange(day)} } on-click={this.select(day)}>{day | format: \'dd\'}</span>{/list}</div>\n        {#inc this.$body}\n    </div>\n</div>'},function(t,e,i){var s=i(2),n=i(50),a=i(3),r=(i(20),s.extend({name:"timePicker",template:n,config:function(){a.extend(this.data,{time:"00:00",hour:0,minute:0}),this.supr(),this.$watch("time",function(t,e){t&&t!=e&&(time=t.split(":"),this.data.hour=+time[0],this.data.minute=+time[1],this.$emit("change",{time:t}))}),this.$watch(["hour","minute"],function(t,e){t=""+t,e=""+e,this.data.time=(t.length>1?t:"0"+t)+":"+(e.length>1?e:"0"+e)})}}));t.exports=r},function(t,e){t.exports='<span class="u-timepicker {@(class)}" r-hide={!visible}>\n   <numberInput min="0" max="23" format="00" value={hour} disabled={disabled} readonly={readonly} />\n <span>:</span>\n    <numberInput min="0" max="59" format="00" value={minute} disabled={disabled} readonly={readonly} />\n</span>'},function(t,e,i){var s=i(45),n=i(52),a=i(3),r=(i(49),i(4)),o=s.extend({name:"dateTimePicker",template:n,config:function(){a.extend(this.data,{date:null,_date:void 0,_time:"00:00"}),this.supr(),this.$watch("date",function(t,e){t&&"Invalid Date"!=t&&t-e!==0&&(this.data._date=new Date(t),this.data._time=r.format(t,"HH:mm"))}),this.$watch(["_date","_time"],function(t,e){if(t&&e){var i=new Date(this.data._date),s=this.data._time.split(":");i.setHours(s[0]),i.setMinutes(s[1]),i.setSeconds(0),i.setMilliseconds(0),this.data.date=i}})},input:function(t){var e=new Date(t.target.value);"Invalid Date"!=e?(e.setSeconds(0),e.setMilliseconds(0),this.data.date=e):t.target.value=r.format(this.data.date,"yyyy-MM-dd HH:mm")}});t.exports=o},function(t,e){t.exports='<div class="u-dropdown u-dropdown-datepicker u-dropdown-datetimepicker {@(class)}" r-class={ {\'z-dis\': disabled} } r-hide={!visible} ref="element">\n    <div class="dropdown_hd">\n        <input class="u-input u-input-full" placeholder={placeholder} value={date | format: \'yyyy-MM-dd HH:mm\'} on-focus={this.toggle(true)} on-change={this.input($event)} ref="input" disabled={disabled} {#if readonly}readonly="readonly"{/if}>\n    </div>\n    <div class="dropdown_bd" r-hide={!open} r-animation="on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;">\n        <calendar date={_date}>\n            <timePicker time={_time} />\n        </calendar>\n    </div>\n</div>'},function(t,e,i){"use strict";var s=i(2),n=i(54),a=i(3),r=s.extend({name:"progress",template:n,config:function(){a.extend(this.data,{percent:36,text:!0,size:null,type:null,striped:!1,active:!1}),this.supr()}});t.exports=r},function(t,e){t.exports="<div class=\"u-progress u-progress-{@(size)} u-progress-{@(type)} {@(class)}\" r-class={ {'u-progress-striped': striped, 'z-act': active} } r-hide={!visible}>\n    <div class=\"progress_bar\" style=\"width: {percent}%;\">{text ? (text === true ? percent + '%' : text) : ''}</div>\n</div>"},function(t,e,i){"use strict";var s=i(2),n=i(56),a=i(3),r=s.extend({name:"gotop",template:n,config:function(){a.extend(this.data,{position:"bottomright"}),this.supr()},gotop:function(){this.data.readonly||this.data.disabled||(document.body.scrollTop=0)}});t.exports=r},function(t,e){t.exports='<a class="u-gotop u-gotop-{position} {@(class)}" on-click={this.gotop()}><i class="u-icon u-icon-arrow-up"></i></a>'},function(t,e,i){"use strict";var s=i(2),n=i(58),a=i(3),r=s.extend({name:"tab",template:n,config:function(){a.extend(this.data,{source:[],selected:null}),this.supr()},select:function(t){t.disabled||this.data.readonly||this.data.disabled||(this.data.selected=t,this.$emit("select",{selected:t}))}});s.extend({name:"tabPane",template:"<div r-hide={this.$outer.data.selected.tab != this}>{#include this.$body}</div>",config:function(){if(this.$outer){var t=this.$outer.data.source,e={title:this.data.title,disabled:this.data.disabled,tab:this};t.push(e),this.$outer.data.selected||(this.$outer.data.selected=e)}}});t.exports=r},function(t,e){t.exports="<div class=\"m-tab {@(class)}\" r-class={ {'z-dis': disabled} } r-hide={!visible}>\n    <ul class=\"tab_hd\">\n        {#list source as item}\n        <li r-class={ {'z-crt': item == selected, 'z-dis': item.disabled} } on-click={this.select(item)}>{item.title}</li>\n        {/list}\n    </ul>\n    <div class=\"tab_bd\">\n        {#inc this.$body}\n    </div>\n</div>"},function(t,e,i){"use strict";var s=i(2),n=i(60),a=i(61),r=i(3),o=s.extend({name:"accordion",template:n,config:function(){r.extend(this.data,{panes:[],collapse:!0}),this.supr()}});s.extend({name:"accordionPane",template:a,config:function(){r.extend(this.data,{title:"",open:!1,disabled:!1}),this.supr(),this.$outer&&this.$outer.data.panes.push(this)},toggle:function(t){t&&this.$outer.data.collapse&&this.$outer.data.panes.forEach(function(t){t.data.open=!1}),this.data.open=t}});t.exports=o},function(t,e){t.exports="<div class=\"m-accordion {@(class)}\" r-class={ {'z-dis': disabled} } r-hide={!visible}>\n    {#inc this.$body}\n</div>"},function(t,e){t.exports='<div class="m-panel">\n    <div class="panel_hd" on-click={this.toggle(!open)}>{title}</div>\n    <div class="panel_bd" r-hide={!open}>\n        {#include this.$body}\n    </div>\n</div>'},function(t,e,i){var s=i(2),n=i(63),a=i(3),r=s.extend({name:"pager",template:n,config:function(){a.extend(this.data,{current:1,total:11,position:"center",middle:5,side:2,_start:1,_end:5}),this.supr(),this.$watch(["current","total"],function(t,e){this.data.current=t=+t,this.data.total=e=+e;var i=this.data.middle>>1,s=this.data.side;this.data._start=t-i,this.data._end=t+i,this.data._start<s+1&&(this.data._start=s+1),this.data._end>e-s&&(this.data._end=e-s),t-this.data._start<i&&(this.data._end+=this.data._start-t+i),this.data._end-t<i&&(this.data._start+=this.data._end-t-i)}),this.$watch(["middle","side"],function(t,e){this.data.middle=+t,this.data.side=+e})},select:function(t){this.data.readonly||this.data.disabled||1>t||t>this.data.total||t!=this.data.current&&(this.data.current=t,this.$emit("select",{current:this.data.current}))}});t.exports=r},function(t,e){t.exports="<ul class=\"m-pager m-pager-{@(position)} {@(class)}\" r-class={ {'z-dis': disabled} } r-hide={!visible}>\n    <li class=\"pager_prev\" r-class={ {'z-dis' : current <= 1} } on-click={this.select(current - 1)}><a>上一页</a></li>\n    {#if total - middle > side * 2 + 1}\n        {#list 1..side as i}\n        <li r-class={ {'z-crt': current == i} } on-click={this.select(i)}><a>{i}</a></li>\n        {/list}\n        {#if _start > side + 1}<li><span>...</span></li>{/if}\n        {#list _start.._end as i}\n        <li r-class={ {'z-crt': current == i} } on-click={this.select(i)}><a>{i}</a></li>\n        {/list}\n        {#if _end < total - side}<li><span>...</span></li>{/if}\n        {#list (total - side + 1)..total as i}\n        <li r-class={ {'z-crt': current == i} } on-click={this.select(i)}><a>{i}</a></li>\n        {/list}\n    {#else}\n        {#list 1..total as i}\n        <li r-class={ {'z-crt': current == i} } on-click={this.select(i)}><a>{i}</a></li>\n        {/list}\n    {/if}\n    <li class=\"pager_next\" r-class={ {'z-dis' : current >= total} } on-click={this.select(current + 1)}><a>下一页</a></li>\n</ul>"},function(t,e,i){"use strict";var s=i(5),n=i(65),a=i(3),r=(i(13),s.extend({name:"menubar",template:n,config:function(){a.extend(this.data,{itemTemplate:null}),this.supr()}}));t.exports=r},function(t,e){t.exports="<div>\n    {#list source as item}\n    <menu name={item.name} source={item.children} />\n    {/list}\n</div>\n"},function(t,e,i){"use strict";var s=i(2),n=i(67),a=i(3),r=s.extend({name:"modal",template:n,config:function(){a.extend(this.data,{title:"提示",content:"",okButton:!0,cancelButton:!1,width:null}),this.supr()},init:function(){this.supr(),this.$root===this&&this.$inject(document.body)},close:function(t){this.$emit("close",{result:t}),t?this.ok():this.cancel(),this.destroy()},ok:function(){this.$emit("ok"),this.destroy()},cancel:function(){this.$emit("cancel"),this.destroy()},keyup:function(t){13==t.which&&this.ok()}});r.alert=function(t,e,i){var s=new r({data:{content:t,title:e,okButton:i}});return s},r.confirm=function(t,e,i,s){var n=new r({data:{content:t,title:e,okButton:i,cancelButton:s||!0}});return n},t.exports=r},function(t,e){t.exports='<div class="m-modal {@(class)}" on-keyup={this.keyup($event)} r-hide={!visible}>\n    <div class="modal_dialog" {#if width}style="width: {width}px"{/if}>\n        <div class="modal_hd">\n            <a class="modal_close" on-click={this.close(!cancelButton)}><i class="u-icon u-icon-close"></i></a>\n            <h3 class="modal_title">{title}</h3>\n        </div>\n        <div class="modal_bd">\n            {#if contentTemplate}{#include @(contentTemplate)}{#else}{content}{/if}\n        </div>\n        <div class="modal_ft">\n            {#if okButton}\n            <button class="u-btn u-btn-primary" on-click={this.close(true)}>{okButton === true ? \'确定\' : okButton}</button>\n            {/if}\n            {#if cancelButton}\n            <button class="u-btn" on-click={this.close(false)}>{cancelButton === true ? \'取消\' : cancelButton}</button>\n            {/if}\n        </div>\n    </div>\n</div>'},function(t,e,i){"use strict";var s=i(5),n=i(69),a=i(3),r=s.extend({name:"gridView",template:n,config:function(){a.extend(this.data,{}),this.supr()}});t.exports=r},function(t,e){t.exports="<div class=\"m-gridview {@(class)}\" r-class={ {'z-dis': disabled} } r-hide={!visible}>\n    {#list source as item}\n    <div class=\"gridview_item\" r-class={ {'z-sel': selected === item} }>{#if @(itemTemplate)}{#include @(itemTemplate)}{#else}{item.name}{/if}</div>\n    {/list}\n</div>"},function(t,e,i){"use strict";var s=i(5),n=i(71),a=i(3),r=s.extend({name:"tableView",template:n,config:function(){a.extend(this.data,{fields:[],striped:!1,hover:!1,order:{by:null,desc:!1}}),this.supr()},sort:function(t){if(t.sortable){var e=this.data.order;e.by===t.key?e.desc=!e.desc:(e.by=t.key,e.desc=!1),this.service?this.$updateSource():this.data.source.sort(function(t,i){return e.desc?t[e.by]<i[e.by]:t[e.by]>i[e.by]}),this.$emit("sort",{field:t})}}});t.exports=r},function(t,e){t.exports="<table class=\"m-table m-tableview {@(class)}\" r-class={ {'m-table-striped': striped, 'm-table-hover': hover} } r-hide={!visible}>\n    <thead>\n        <tr>\n            {#list fields as field}\n            <th r-class={ {'tableview_sortable': field.sortable} } on-click={this.sort(field)}>\n                {field.name || field.key}\n                {#if field.sortable}\n                    <i class=\"u-icon {order.by === field.key ? (order.desc ? 'u-icon-sort-desc' : 'u-icon-sort-asc') : 'u-icon-sort'}\"></i>\n                {/if}\n            </th>\n            {/list}\n        </tr>\n    </thead>\n    <tbody>\n        {#list source as item}\n        <tr>\n            {#list fields as field}\n            <td>{item[field.key]}</td>\n            {/list}\n        </tr>\n        {/list}\n    </tbody>\n</table>"},function(t,e,i){"use strict";var s=i(2),n=i(73),a=i(3),r=s.extend({name:"modal",template:n,config:function(){a.extend(this.data,{title:"提示",content:"",okButton:!0,cancelButton:!1,width:null}),this.supr()},init:function(){this.supr(),this.$root===this&&this.$inject(document.body)},close:function(t){this.$emit("close",{result:t}),t?this.ok():this.cancel(),this.destroy()},ok:function(){this.$emit("ok")},cancel:function(){this.$emit("cancel")}});t.exports=r},function(t,e){t.exports=""},function(t,e,i){"use strict";var s=i(2),n=i(75),a=i(3),r=s.extend({name:"htmlEditor",template:n,config:function(){a.extend(this.data,{content:""}),this.supr()},computed:{html:function(){return this.data.content}},bold:function(){if(!this.data.readonly&&!this.data.disabled){var t=this.getCursorPosition();t.text="<strong>"+t.text+"</strong>",this.setCursorPosition(t),this.data.content=this.$refs.textarea.value,this.$update()}},italic:function(){if(!this.data.readonly&&!this.data.disabled){var t=this.getCursorPosition();t.text="<em>"+t.text+"</em>",this.setCursorPosition(t),this.data.content=this.$refs.textarea.value,this.$update()}},quote:function(){if(!this.data.readonly&&!this.data.disabled){var t=this.getCursorPosition();t.text="<blockquote>"+t.text+"</blockquote>",this.setCursorPosition(t),this.data.content=this.$refs.textarea.value,this.$update()}},ul:function(){if(!this.data.readonly&&!this.data.disabled){var t=this.getCursorPosition();t.text="<li>"+t.text+"</li>",this.setCursorPosition(t),this.data.content=this.$refs.textarea.value,this.$update()}},ol:function(){if(!this.data.readonly&&!this.data.disabled){var t=this.getCursorPosition();t.text="<li>"+t.text+"</li>",this.setCursorPosition(t),this.data.content=this.$refs.textarea.value,this.$update()}},link:function(){if(!this.data.readonly&&!this.data.disabled){var t=this.getCursorPosition();t.text='<a href="#">'+t.text+"</a>",this.setCursorPosition(t),this.data.content=this.$refs.textarea.value,this.$update()}},image:function(){this.data.readonly||this.data.disabled||this.$refs.uploader.upload()},latex:function(){if(!this.data.readonly&&!this.data.disabled){var t=this.getCursorPosition();t.text="$$a^2 + b^2 = c^2$$",this.setCursorPosition(t),this.data.content=this.$refs.textarea.value,this.$update()}},uploaderSuccess:function(t){var e=this.getCursorPosition();e.text='<img src="'+t.result+'">',this.setCursorPosition(e),this.data.content=this.$refs.textarea.value,this.$update()},uploaderError:function(t){Notify.error(t)},getCursorPosition:function(){var t=this.$refs.textarea,e={text:"",start:0,end:0};if(t.focus(),t.setSelectionRange)e.start=t.selectionStart,e.end=t.selectionEnd,e.text=e.start!=e.end?t.value.substring(e.start,e.end):"";else if(document.selection){var i,s=document.selection.createRange(),n=document.body.createTextRange();for(n.moveToElementText(t),e.text=s.text,e.bookmark=s.getBookmark(),i=0;n.compareEndPoints("StartToStart",s)<0&&0!==s.moveStart("character",-1);i++)"\n"==t.value.charAt(i)&&i++;e.start=i,e.end=e.text.length+e.start}return e},setCursorPosition:function(t){if(!t)throw new Error("You must get cursor position first!");var e=this.$refs.textarea,i=e.value;if(e.value=i.substring(0,t.start)+t.text+i.substring(t.end,i.length),t.end=t.start+t.text.length,e.setSelectionRange)e.focus(),e.setSelectionRange(t.start,t.end);else if(e.createTextRange){var s=e.createTextRange();e.value.length===t.start?(s.collapse(!1),s.select()):(s.moveToBookmark(t.bookmark),s.select())}}});t.exports=r},function(t,e){t.exports='<div class="m-editor {@(class)}" r-class={ {\'z-dis\': disabled} } r-hide={!visible}>\n    <div class="editor_preview" r-html={html}></div>\n    <ul class="m-toolbar editor_toolbar" r-class={ {\'z-dis\': disabled} }>\n        <li><a title="加粗" on-click={this.bold()}><i class="u-icon u-icon-bold"></i></a></li>\n        <li><a title="斜体" on-click={this.italic()}><i class="u-icon u-icon-italic"></i></a></li>\n        <li class="toolbar_divider">|</li>\n        <li><a title="引用" on-click={this.quote()}><i class="u-icon u-icon-quote"></i></a></li>\n        <li><a title="无序列表" on-click={this.ul()}><i class="u-icon u-icon-list-ul"></i></a></li>\n        <li><a title="有序列表" on-click={this.ol()}><i class="u-icon u-icon-list-ol"></i></a></li>\n        <li class="toolbar_divider">|</li>\n        <li><a title="链接" on-click={this.link()}><i class="u-icon u-icon-link"></i></a></li>\n        <li><a title="图片" on-click={this.image()}><i class="u-icon u-icon-image"></i></a></li>\n    </ul>\n    <textarea class="editor_textarea" r-model={content} ref="textarea" readonly={readonly} disabled={disabled}></textarea>\n</div>\n<uploader visible={false} url={imageUrl} extensions={extensions} ref="uploader" on-success={this.uploaderSuccess($event)} on-error={this.uploaderError($event)} />';
},function(t,e,i){"use strict";var s=i(2),n=i(77),a=i(3),r=i(78),o=s.extend({name:"markEditor",template:n,config:function(){a.extend(this.data,{content:""}),this.supr()},computed:{html:function(){return r(this.data.content)}},bold:function(){if(!this.data.readonly&&!this.data.disabled){var t=this.getCursorPosition();t.text="**"+t.text+"**",this.setCursorPosition(t),this.data.content=this.$refs.textarea.value,this.$update()}},italic:function(){if(!this.data.readonly&&!this.data.disabled){var t=this.getCursorPosition();t.text="*"+t.text+"*",this.setCursorPosition(t),this.data.content=this.$refs.textarea.value,this.$update()}},quote:function(){if(!this.data.readonly&&!this.data.disabled){for(var t=this.getCursorPosition(),e=this.$refs.textarea.value,i=t.start-1;i>0;i--)if("\n"==e[i]){i++;break}t.start=i,t.text="> ",t.end=t.start,this.setCursorPosition(t),this.data.content=this.$refs.textarea.value,this.$update()}},ul:function(){if(!this.data.readonly&&!this.data.disabled){for(var t=this.getCursorPosition(),e=this.$refs.textarea.value,i=t.start-1;i>0;i--)if("\n"==e[i]){i++;break}t.start=i,t.text="- ",t.end=t.start,this.setCursorPosition(t),this.data.content=this.$refs.textarea.value,this.$update()}},ol:function(){if(!this.data.readonly&&!this.data.disabled){for(var t=this.getCursorPosition(),e=this.$refs.textarea.value,i=t.start-1;i>0;i--)if("\n"==e[i]){i++;break}t.start=i,t.text="1. ",t.end=t.start,this.setCursorPosition(t),this.data.content=this.$refs.textarea.value,this.$update()}},link:function(){if(!this.data.readonly&&!this.data.disabled){var t=this.getCursorPosition();t.text="["+t.text+"](http://)",this.setCursorPosition(t),this.data.content=this.$refs.textarea.value,this.$update()}},image:function(){this.data.readonly||this.data.disabled||this.$refs.uploader.upload()},latex:function(){if(!this.data.readonly&&!this.data.disabled){var t=this.getCursorPosition();t.text="$$a^2 + b^2 = c^2$$",this.setCursorPosition(t),this.data.content=this.$refs.textarea.value,this.$update()}},uploaderSuccess:function(t){var e=this.getCursorPosition();e.text="\n![]("+t.result+")",this.setCursorPosition(e),this.data.content=this.$refs.textarea.value,this.$update()},uploaderError:function(t){Notify.error(t)},getCursorPosition:function(){var t=this.$refs.textarea,e={text:"",start:0,end:0};if(t.focus(),t.setSelectionRange)e.start=t.selectionStart,e.end=t.selectionEnd,e.text=e.start!=e.end?t.value.substring(e.start,e.end):"";else if(document.selection){var i,s=document.selection.createRange(),n=document.body.createTextRange();for(n.moveToElementText(t),e.text=s.text,e.bookmark=s.getBookmark(),i=0;n.compareEndPoints("StartToStart",s)<0&&0!==s.moveStart("character",-1);i++)"\n"==t.value.charAt(i)&&i++;e.start=i,e.end=e.text.length+e.start}return e},setCursorPosition:function(t){if(!t)throw new Error("You must get cursor position first!");var e=this.$refs.textarea,i=e.value;if(e.value=i.substring(0,t.start)+t.text+i.substring(t.end,i.length),t.end=t.start+t.text.length,e.setSelectionRange)e.focus(),e.setSelectionRange(t.start,t.end);else if(e.createTextRange){var s=e.createTextRange();e.value.length===t.start?(s.collapse(!1),s.select()):(s.moveToBookmark(t.bookmark),s.select())}}});t.exports=o},function(t,e){t.exports='<div class="m-editor {@(class)}" r-class={ {\'z-dis\': disabled} } r-hide={!visible}>\n    <div class="editor_preview" r-html={html}></div>\n    <ul class="m-toolbar editor_toolbar" r-class={ {\'z-dis\': disabled} }>\n        <li><a title="加粗" on-click={this.bold()}><i class="u-icon u-icon-bold"></i></a></li>\n        <li><a title="斜体" on-click={this.italic()}><i class="u-icon u-icon-italic"></i></a></li>\n        <li class="toolbar_divider">|</li>\n        <li><a title="引用" on-click={this.quote()}><i class="u-icon u-icon-quote"></i></a></li>\n        <li><a title="无序列表" on-click={this.ul()}><i class="u-icon u-icon-list-ul"></i></a></li>\n        <li><a title="有序列表" on-click={this.ol()}><i class="u-icon u-icon-list-ol"></i></a></li>\n        <li class="toolbar_divider">|</li>\n        <li><a title="链接" on-click={this.link()}><i class="u-icon u-icon-link"></i></a></li>\n        <li><a title="图片" on-click={this.image()}><i class="u-icon u-icon-image"></i></a></li>\n        <li class="f-fr"><a title="帮助" href="http://www.jianshu.com/p/7bd23251da0a" target="_blank"><i class="u-icon u-icon-info"></i></a></li>\n    </ul>\n    <textarea class="editor_textarea" r-model={content} ref="textarea" readonly={readonly} disabled={disabled}></textarea>\n</div>\n<uploader visible={false} url={imageUrl} extensions={extensions} ref="uploader" on-success={this.uploaderSuccess($event)} on-error={this.uploaderError($event)} />'},function(t,e){t.exports=__WEBPACK_EXTERNAL_MODULE_78__}])});
},{"marked":3,"regularjs":24}],3:[function(require,module,exports){
(function (global){
/**
 * marked - a markdown parser
 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/chjj/marked
 */

;(function() {

/**
 * Block-Level Grammar
 */

var block = {
  newline: /^\n+/,
  code: /^( {4}[^\n]+\n*)+/,
  fences: noop,
  hr: /^( *[-*_]){3,} *(?:\n+|$)/,
  heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
  nptable: noop,
  lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
  blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
  list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
  html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
  table: noop,
  paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
  text: /^[^\n]+/
};

block.bullet = /(?:[*+-]|\d+\.)/;
block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
block.item = replace(block.item, 'gm')
  (/bull/g, block.bullet)
  ();

block.list = replace(block.list)
  (/bull/g, block.bullet)
  ('hr', '\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))')
  ('def', '\\n+(?=' + block.def.source + ')')
  ();

block.blockquote = replace(block.blockquote)
  ('def', block.def)
  ();

block._tag = '(?!(?:'
  + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code'
  + '|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo'
  + '|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b';

block.html = replace(block.html)
  ('comment', /<!--[\s\S]*?-->/)
  ('closed', /<(tag)[\s\S]+?<\/\1>/)
  ('closing', /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)
  (/tag/g, block._tag)
  ();

block.paragraph = replace(block.paragraph)
  ('hr', block.hr)
  ('heading', block.heading)
  ('lheading', block.lheading)
  ('blockquote', block.blockquote)
  ('tag', '<' + block._tag)
  ('def', block.def)
  ();

/**
 * Normal Block Grammar
 */

block.normal = merge({}, block);

/**
 * GFM Block Grammar
 */

block.gfm = merge({}, block.normal, {
  fences: /^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,
  paragraph: /^/,
  heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/
});

block.gfm.paragraph = replace(block.paragraph)
  ('(?!', '(?!'
    + block.gfm.fences.source.replace('\\1', '\\2') + '|'
    + block.list.source.replace('\\1', '\\3') + '|')
  ();

/**
 * GFM + Tables Block Grammar
 */

block.tables = merge({}, block.gfm, {
  nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
  table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
});

/**
 * Block Lexer
 */

function Lexer(options) {
  this.tokens = [];
  this.tokens.links = {};
  this.options = options || marked.defaults;
  this.rules = block.normal;

  if (this.options.gfm) {
    if (this.options.tables) {
      this.rules = block.tables;
    } else {
      this.rules = block.gfm;
    }
  }
}

/**
 * Expose Block Rules
 */

Lexer.rules = block;

/**
 * Static Lex Method
 */

Lexer.lex = function(src, options) {
  var lexer = new Lexer(options);
  return lexer.lex(src);
};

/**
 * Preprocessing
 */

Lexer.prototype.lex = function(src) {
  src = src
    .replace(/\r\n|\r/g, '\n')
    .replace(/\t/g, '    ')
    .replace(/\u00a0/g, ' ')
    .replace(/\u2424/g, '\n');

  return this.token(src, true);
};

/**
 * Lexing
 */

Lexer.prototype.token = function(src, top, bq) {
  var src = src.replace(/^ +$/gm, '')
    , next
    , loose
    , cap
    , bull
    , b
    , item
    , space
    , i
    , l;

  while (src) {
    // newline
    if (cap = this.rules.newline.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[0].length > 1) {
        this.tokens.push({
          type: 'space'
        });
      }
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      cap = cap[0].replace(/^ {4}/gm, '');
      this.tokens.push({
        type: 'code',
        text: !this.options.pedantic
          ? cap.replace(/\n+$/, '')
          : cap
      });
      continue;
    }

    // fences (gfm)
    if (cap = this.rules.fences.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'code',
        lang: cap[2],
        text: cap[3] || ''
      });
      continue;
    }

    // heading
    if (cap = this.rules.heading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[1].length,
        text: cap[2]
      });
      continue;
    }

    // table no leading pipe (gfm)
    if (top && (cap = this.rules.nptable.exec(src))) {
      src = src.substring(cap[0].length);

      item = {
        type: 'table',
        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3].replace(/\n$/, '').split('\n')
      };

      for (i = 0; i < item.align.length; i++) {
        if (/^ *-+: *$/.test(item.align[i])) {
          item.align[i] = 'right';
        } else if (/^ *:-+: *$/.test(item.align[i])) {
          item.align[i] = 'center';
        } else if (/^ *:-+ *$/.test(item.align[i])) {
          item.align[i] = 'left';
        } else {
          item.align[i] = null;
        }
      }

      for (i = 0; i < item.cells.length; i++) {
        item.cells[i] = item.cells[i].split(/ *\| */);
      }

      this.tokens.push(item);

      continue;
    }

    // lheading
    if (cap = this.rules.lheading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[2] === '=' ? 1 : 2,
        text: cap[1]
      });
      continue;
    }

    // hr
    if (cap = this.rules.hr.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'hr'
      });
      continue;
    }

    // blockquote
    if (cap = this.rules.blockquote.exec(src)) {
      src = src.substring(cap[0].length);

      this.tokens.push({
        type: 'blockquote_start'
      });

      cap = cap[0].replace(/^ *> ?/gm, '');

      // Pass `top` to keep the current
      // "toplevel" state. This is exactly
      // how markdown.pl works.
      this.token(cap, top, true);

      this.tokens.push({
        type: 'blockquote_end'
      });

      continue;
    }

    // list
    if (cap = this.rules.list.exec(src)) {
      src = src.substring(cap[0].length);
      bull = cap[2];

      this.tokens.push({
        type: 'list_start',
        ordered: bull.length > 1
      });

      // Get each top-level item.
      cap = cap[0].match(this.rules.item);

      next = false;
      l = cap.length;
      i = 0;

      for (; i < l; i++) {
        item = cap[i];

        // Remove the list item's bullet
        // so it is seen as the next token.
        space = item.length;
        item = item.replace(/^ *([*+-]|\d+\.) +/, '');

        // Outdent whatever the
        // list item contains. Hacky.
        if (~item.indexOf('\n ')) {
          space -= item.length;
          item = !this.options.pedantic
            ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
            : item.replace(/^ {1,4}/gm, '');
        }

        // Determine whether the next list item belongs here.
        // Backpedal if it does not belong in this list.
        if (this.options.smartLists && i !== l - 1) {
          b = block.bullet.exec(cap[i + 1])[0];
          if (bull !== b && !(bull.length > 1 && b.length > 1)) {
            src = cap.slice(i + 1).join('\n') + src;
            i = l - 1;
          }
        }

        // Determine whether item is loose or not.
        // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
        // for discount behavior.
        loose = next || /\n\n(?!\s*$)/.test(item);
        if (i !== l - 1) {
          next = item.charAt(item.length - 1) === '\n';
          if (!loose) loose = next;
        }

        this.tokens.push({
          type: loose
            ? 'loose_item_start'
            : 'list_item_start'
        });

        // Recurse.
        this.token(item, false, bq);

        this.tokens.push({
          type: 'list_item_end'
        });
      }

      this.tokens.push({
        type: 'list_end'
      });

      continue;
    }

    // html
    if (cap = this.rules.html.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: this.options.sanitize
          ? 'paragraph'
          : 'html',
        pre: !this.options.sanitizer
          && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
        text: cap[0]
      });
      continue;
    }

    // def
    if ((!bq && top) && (cap = this.rules.def.exec(src))) {
      src = src.substring(cap[0].length);
      this.tokens.links[cap[1].toLowerCase()] = {
        href: cap[2],
        title: cap[3]
      };
      continue;
    }

    // table (gfm)
    if (top && (cap = this.rules.table.exec(src))) {
      src = src.substring(cap[0].length);

      item = {
        type: 'table',
        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3].replace(/(?: *\| *)?\n$/, '').split('\n')
      };

      for (i = 0; i < item.align.length; i++) {
        if (/^ *-+: *$/.test(item.align[i])) {
          item.align[i] = 'right';
        } else if (/^ *:-+: *$/.test(item.align[i])) {
          item.align[i] = 'center';
        } else if (/^ *:-+ *$/.test(item.align[i])) {
          item.align[i] = 'left';
        } else {
          item.align[i] = null;
        }
      }

      for (i = 0; i < item.cells.length; i++) {
        item.cells[i] = item.cells[i]
          .replace(/^ *\| *| *\| *$/g, '')
          .split(/ *\| */);
      }

      this.tokens.push(item);

      continue;
    }

    // top-level paragraph
    if (top && (cap = this.rules.paragraph.exec(src))) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'paragraph',
        text: cap[1].charAt(cap[1].length - 1) === '\n'
          ? cap[1].slice(0, -1)
          : cap[1]
      });
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      // Top-level should never reach here.
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'text',
        text: cap[0]
      });
      continue;
    }

    if (src) {
      throw new
        Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return this.tokens;
};

/**
 * Inline-Level Grammar
 */

var inline = {
  escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
  autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
  url: noop,
  tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
  link: /^!?\[(inside)\]\(href\)/,
  reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
  nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
  strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
  em: /^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
  code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
  br: /^ {2,}\n(?!\s*$)/,
  del: noop,
  text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
};

inline._inside = /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;
inline._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;

inline.link = replace(inline.link)
  ('inside', inline._inside)
  ('href', inline._href)
  ();

inline.reflink = replace(inline.reflink)
  ('inside', inline._inside)
  ();

/**
 * Normal Inline Grammar
 */

inline.normal = merge({}, inline);

/**
 * Pedantic Inline Grammar
 */

inline.pedantic = merge({}, inline.normal, {
  strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
  em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
});

/**
 * GFM Inline Grammar
 */

inline.gfm = merge({}, inline.normal, {
  escape: replace(inline.escape)('])', '~|])')(),
  url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
  del: /^~~(?=\S)([\s\S]*?\S)~~/,
  text: replace(inline.text)
    (']|', '~]|')
    ('|', '|https?://|')
    ()
});

/**
 * GFM + Line Breaks Inline Grammar
 */

inline.breaks = merge({}, inline.gfm, {
  br: replace(inline.br)('{2,}', '*')(),
  text: replace(inline.gfm.text)('{2,}', '*')()
});

/**
 * Inline Lexer & Compiler
 */

function InlineLexer(links, options) {
  this.options = options || marked.defaults;
  this.links = links;
  this.rules = inline.normal;
  this.renderer = this.options.renderer || new Renderer;
  this.renderer.options = this.options;

  if (!this.links) {
    throw new
      Error('Tokens array requires a `links` property.');
  }

  if (this.options.gfm) {
    if (this.options.breaks) {
      this.rules = inline.breaks;
    } else {
      this.rules = inline.gfm;
    }
  } else if (this.options.pedantic) {
    this.rules = inline.pedantic;
  }
}

/**
 * Expose Inline Rules
 */

InlineLexer.rules = inline;

/**
 * Static Lexing/Compiling Method
 */

InlineLexer.output = function(src, links, options) {
  var inline = new InlineLexer(links, options);
  return inline.output(src);
};

/**
 * Lexing/Compiling
 */

InlineLexer.prototype.output = function(src) {
  var out = ''
    , link
    , text
    , href
    , cap;

  while (src) {
    // escape
    if (cap = this.rules.escape.exec(src)) {
      src = src.substring(cap[0].length);
      out += cap[1];
      continue;
    }

    // autolink
    if (cap = this.rules.autolink.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[2] === '@') {
        text = cap[1].charAt(6) === ':'
          ? this.mangle(cap[1].substring(7))
          : this.mangle(cap[1]);
        href = this.mangle('mailto:') + text;
      } else {
        text = escape(cap[1]);
        href = text;
      }
      out += this.renderer.link(href, null, text);
      continue;
    }

    // url (gfm)
    if (!this.inLink && (cap = this.rules.url.exec(src))) {
      src = src.substring(cap[0].length);
      text = escape(cap[1]);
      href = text;
      out += this.renderer.link(href, null, text);
      continue;
    }

    // tag
    if (cap = this.rules.tag.exec(src)) {
      if (!this.inLink && /^<a /i.test(cap[0])) {
        this.inLink = true;
      } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
        this.inLink = false;
      }
      src = src.substring(cap[0].length);
      out += this.options.sanitize
        ? this.options.sanitizer
          ? this.options.sanitizer(cap[0])
          : escape(cap[0])
        : cap[0]
      continue;
    }

    // link
    if (cap = this.rules.link.exec(src)) {
      src = src.substring(cap[0].length);
      this.inLink = true;
      out += this.outputLink(cap, {
        href: cap[2],
        title: cap[3]
      });
      this.inLink = false;
      continue;
    }

    // reflink, nolink
    if ((cap = this.rules.reflink.exec(src))
        || (cap = this.rules.nolink.exec(src))) {
      src = src.substring(cap[0].length);
      link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
      link = this.links[link.toLowerCase()];
      if (!link || !link.href) {
        out += cap[0].charAt(0);
        src = cap[0].substring(1) + src;
        continue;
      }
      this.inLink = true;
      out += this.outputLink(cap, link);
      this.inLink = false;
      continue;
    }

    // strong
    if (cap = this.rules.strong.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.strong(this.output(cap[2] || cap[1]));
      continue;
    }

    // em
    if (cap = this.rules.em.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.em(this.output(cap[2] || cap[1]));
      continue;
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.codespan(escape(cap[2], true));
      continue;
    }

    // br
    if (cap = this.rules.br.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.br();
      continue;
    }

    // del (gfm)
    if (cap = this.rules.del.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.del(this.output(cap[1]));
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.text(escape(this.smartypants(cap[0])));
      continue;
    }

    if (src) {
      throw new
        Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return out;
};

/**
 * Compile Link
 */

InlineLexer.prototype.outputLink = function(cap, link) {
  var href = escape(link.href)
    , title = link.title ? escape(link.title) : null;

  return cap[0].charAt(0) !== '!'
    ? this.renderer.link(href, title, this.output(cap[1]))
    : this.renderer.image(href, title, escape(cap[1]));
};

/**
 * Smartypants Transformations
 */

InlineLexer.prototype.smartypants = function(text) {
  if (!this.options.smartypants) return text;
  return text
    // em-dashes
    .replace(/---/g, '\u2014')
    // en-dashes
    .replace(/--/g, '\u2013')
    // opening singles
    .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
    // closing singles & apostrophes
    .replace(/'/g, '\u2019')
    // opening doubles
    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
    // closing doubles
    .replace(/"/g, '\u201d')
    // ellipses
    .replace(/\.{3}/g, '\u2026');
};

/**
 * Mangle Links
 */

InlineLexer.prototype.mangle = function(text) {
  if (!this.options.mangle) return text;
  var out = ''
    , l = text.length
    , i = 0
    , ch;

  for (; i < l; i++) {
    ch = text.charCodeAt(i);
    if (Math.random() > 0.5) {
      ch = 'x' + ch.toString(16);
    }
    out += '&#' + ch + ';';
  }

  return out;
};

/**
 * Renderer
 */

function Renderer(options) {
  this.options = options || {};
}

Renderer.prototype.code = function(code, lang, escaped) {
  if (this.options.highlight) {
    var out = this.options.highlight(code, lang);
    if (out != null && out !== code) {
      escaped = true;
      code = out;
    }
  }

  if (!lang) {
    return '<pre><code>'
      + (escaped ? code : escape(code, true))
      + '\n</code></pre>';
  }

  return '<pre><code class="'
    + this.options.langPrefix
    + escape(lang, true)
    + '">'
    + (escaped ? code : escape(code, true))
    + '\n</code></pre>\n';
};

Renderer.prototype.blockquote = function(quote) {
  return '<blockquote>\n' + quote + '</blockquote>\n';
};

Renderer.prototype.html = function(html) {
  return html;
};

Renderer.prototype.heading = function(text, level, raw) {
  return '<h'
    + level
    + ' id="'
    + this.options.headerPrefix
    + raw.toLowerCase().replace(/[^\w]+/g, '-')
    + '">'
    + text
    + '</h'
    + level
    + '>\n';
};

Renderer.prototype.hr = function() {
  return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
};

Renderer.prototype.list = function(body, ordered) {
  var type = ordered ? 'ol' : 'ul';
  return '<' + type + '>\n' + body + '</' + type + '>\n';
};

Renderer.prototype.listitem = function(text) {
  return '<li>' + text + '</li>\n';
};

Renderer.prototype.paragraph = function(text) {
  return '<p>' + text + '</p>\n';
};

Renderer.prototype.table = function(header, body) {
  return '<table>\n'
    + '<thead>\n'
    + header
    + '</thead>\n'
    + '<tbody>\n'
    + body
    + '</tbody>\n'
    + '</table>\n';
};

Renderer.prototype.tablerow = function(content) {
  return '<tr>\n' + content + '</tr>\n';
};

Renderer.prototype.tablecell = function(content, flags) {
  var type = flags.header ? 'th' : 'td';
  var tag = flags.align
    ? '<' + type + ' style="text-align:' + flags.align + '">'
    : '<' + type + '>';
  return tag + content + '</' + type + '>\n';
};

// span level renderer
Renderer.prototype.strong = function(text) {
  return '<strong>' + text + '</strong>';
};

Renderer.prototype.em = function(text) {
  return '<em>' + text + '</em>';
};

Renderer.prototype.codespan = function(text) {
  return '<code>' + text + '</code>';
};

Renderer.prototype.br = function() {
  return this.options.xhtml ? '<br/>' : '<br>';
};

Renderer.prototype.del = function(text) {
  return '<del>' + text + '</del>';
};

Renderer.prototype.link = function(href, title, text) {
  if (this.options.sanitize) {
    try {
      var prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, '')
        .toLowerCase();
    } catch (e) {
      return '';
    }
    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
      return '';
    }
  }
  var out = '<a href="' + href + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += '>' + text + '</a>';
  return out;
};

Renderer.prototype.image = function(href, title, text) {
  var out = '<img src="' + href + '" alt="' + text + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += this.options.xhtml ? '/>' : '>';
  return out;
};

Renderer.prototype.text = function(text) {
  return text;
};

/**
 * Parsing & Compiling
 */

function Parser(options) {
  this.tokens = [];
  this.token = null;
  this.options = options || marked.defaults;
  this.options.renderer = this.options.renderer || new Renderer;
  this.renderer = this.options.renderer;
  this.renderer.options = this.options;
}

/**
 * Static Parse Method
 */

Parser.parse = function(src, options, renderer) {
  var parser = new Parser(options, renderer);
  return parser.parse(src);
};

/**
 * Parse Loop
 */

Parser.prototype.parse = function(src) {
  this.inline = new InlineLexer(src.links, this.options, this.renderer);
  this.tokens = src.reverse();

  var out = '';
  while (this.next()) {
    out += this.tok();
  }

  return out;
};

/**
 * Next Token
 */

Parser.prototype.next = function() {
  return this.token = this.tokens.pop();
};

/**
 * Preview Next Token
 */

Parser.prototype.peek = function() {
  return this.tokens[this.tokens.length - 1] || 0;
};

/**
 * Parse Text Tokens
 */

Parser.prototype.parseText = function() {
  var body = this.token.text;

  while (this.peek().type === 'text') {
    body += '\n' + this.next().text;
  }

  return this.inline.output(body);
};

/**
 * Parse Current Token
 */

Parser.prototype.tok = function() {
  switch (this.token.type) {
    case 'space': {
      return '';
    }
    case 'hr': {
      return this.renderer.hr();
    }
    case 'heading': {
      return this.renderer.heading(
        this.inline.output(this.token.text),
        this.token.depth,
        this.token.text);
    }
    case 'code': {
      return this.renderer.code(this.token.text,
        this.token.lang,
        this.token.escaped);
    }
    case 'table': {
      var header = ''
        , body = ''
        , i
        , row
        , cell
        , flags
        , j;

      // header
      cell = '';
      for (i = 0; i < this.token.header.length; i++) {
        flags = { header: true, align: this.token.align[i] };
        cell += this.renderer.tablecell(
          this.inline.output(this.token.header[i]),
          { header: true, align: this.token.align[i] }
        );
      }
      header += this.renderer.tablerow(cell);

      for (i = 0; i < this.token.cells.length; i++) {
        row = this.token.cells[i];

        cell = '';
        for (j = 0; j < row.length; j++) {
          cell += this.renderer.tablecell(
            this.inline.output(row[j]),
            { header: false, align: this.token.align[j] }
          );
        }

        body += this.renderer.tablerow(cell);
      }
      return this.renderer.table(header, body);
    }
    case 'blockquote_start': {
      var body = '';

      while (this.next().type !== 'blockquote_end') {
        body += this.tok();
      }

      return this.renderer.blockquote(body);
    }
    case 'list_start': {
      var body = ''
        , ordered = this.token.ordered;

      while (this.next().type !== 'list_end') {
        body += this.tok();
      }

      return this.renderer.list(body, ordered);
    }
    case 'list_item_start': {
      var body = '';

      while (this.next().type !== 'list_item_end') {
        body += this.token.type === 'text'
          ? this.parseText()
          : this.tok();
      }

      return this.renderer.listitem(body);
    }
    case 'loose_item_start': {
      var body = '';

      while (this.next().type !== 'list_item_end') {
        body += this.tok();
      }

      return this.renderer.listitem(body);
    }
    case 'html': {
      var html = !this.token.pre && !this.options.pedantic
        ? this.inline.output(this.token.text)
        : this.token.text;
      return this.renderer.html(html);
    }
    case 'paragraph': {
      return this.renderer.paragraph(this.inline.output(this.token.text));
    }
    case 'text': {
      return this.renderer.paragraph(this.parseText());
    }
  }
};

/**
 * Helpers
 */

function escape(html, encode) {
  return html
    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function unescape(html) {
  return html.replace(/&([#\w]+);/g, function(_, n) {
    n = n.toLowerCase();
    if (n === 'colon') return ':';
    if (n.charAt(0) === '#') {
      return n.charAt(1) === 'x'
        ? String.fromCharCode(parseInt(n.substring(2), 16))
        : String.fromCharCode(+n.substring(1));
    }
    return '';
  });
}

function replace(regex, opt) {
  regex = regex.source;
  opt = opt || '';
  return function self(name, val) {
    if (!name) return new RegExp(regex, opt);
    val = val.source || val;
    val = val.replace(/(^|[^\[])\^/g, '$1');
    regex = regex.replace(name, val);
    return self;
  };
}

function noop() {}
noop.exec = noop;

function merge(obj) {
  var i = 1
    , target
    , key;

  for (; i < arguments.length; i++) {
    target = arguments[i];
    for (key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        obj[key] = target[key];
      }
    }
  }

  return obj;
}


/**
 * Marked
 */

function marked(src, opt, callback) {
  if (callback || typeof opt === 'function') {
    if (!callback) {
      callback = opt;
      opt = null;
    }

    opt = merge({}, marked.defaults, opt || {});

    var highlight = opt.highlight
      , tokens
      , pending
      , i = 0;

    try {
      tokens = Lexer.lex(src, opt)
    } catch (e) {
      return callback(e);
    }

    pending = tokens.length;

    var done = function(err) {
      if (err) {
        opt.highlight = highlight;
        return callback(err);
      }

      var out;

      try {
        out = Parser.parse(tokens, opt);
      } catch (e) {
        err = e;
      }

      opt.highlight = highlight;

      return err
        ? callback(err)
        : callback(null, out);
    };

    if (!highlight || highlight.length < 3) {
      return done();
    }

    delete opt.highlight;

    if (!pending) return done();

    for (; i < tokens.length; i++) {
      (function(token) {
        if (token.type !== 'code') {
          return --pending || done();
        }
        return highlight(token.text, token.lang, function(err, code) {
          if (err) return done(err);
          if (code == null || code === token.text) {
            return --pending || done();
          }
          token.text = code;
          token.escaped = true;
          --pending || done();
        });
      })(tokens[i]);
    }

    return;
  }
  try {
    if (opt) opt = merge({}, marked.defaults, opt);
    return Parser.parse(Lexer.lex(src, opt), opt);
  } catch (e) {
    e.message += '\nPlease report this to https://github.com/chjj/marked.';
    if ((opt || marked.defaults).silent) {
      return '<p>An error occured:</p><pre>'
        + escape(e.message + '', true)
        + '</pre>';
    }
    throw e;
  }
}

/**
 * Options
 */

marked.options =
marked.setOptions = function(opt) {
  merge(marked.defaults, opt);
  return marked;
};

marked.defaults = {
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  sanitizer: null,
  mangle: true,
  smartLists: false,
  silent: false,
  highlight: null,
  langPrefix: 'lang-',
  smartypants: false,
  headerPrefix: '',
  renderer: new Renderer,
  xhtml: false
};

/**
 * Expose
 */

marked.Parser = Parser;
marked.parser = Parser.parse;

marked.Renderer = Renderer;

marked.Lexer = Lexer;
marked.lexer = Lexer.lex;

marked.InlineLexer = InlineLexer;
marked.inlineLexer = InlineLexer.output;

marked.parse = marked;

if (typeof module !== 'undefined' && typeof exports === 'object') {
  module.exports = marked;
} else if (typeof define === 'function' && define.amd) {
  define(function() { return marked; });
} else {
  this.marked = marked;
}

}).call(function() {
  return this || (typeof window !== 'undefined' ? window : global);
}());

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){

var env = require('./env.js');
var Lexer = require("./parser/Lexer.js");
var Parser = require("./parser/Parser.js");
var config = require("./config.js");
var _ = require('./util');
var extend = require('./helper/extend.js');
if(env.browser){
  var combine = require('./helper/combine.js');
  var dom = require("./dom.js");
  var walkers = require('./walkers.js');
  var Group = require('./group.js');
}
var events = require('./helper/event.js');
var Watcher = require('./helper/watcher.js');
var parse = require('./helper/parse.js');
var filter = require('./helper/filter.js');
var doc = dom.doc;


/**
* `Regular` is regularjs's NameSpace and BaseClass. Every Component is inherited from it
* 
* @class Regular
* @module Regular
* @constructor
* @param {Object} options specification of the component
*/
var Regular = function(definition, options){
  var prevRunning = env.isRunning;
  env.isRunning = true;
  var node, template;

  definition = definition || {};
  options = options || {};

  definition.data = definition.data || {};
  definition.computed = definition.computed || {};
  definition.events = definition.events || {};
  if(this.data) _.extend(definition.data, this.data);
  if(this.computed) _.extend(definition.computed, this.computed);
  if(this.events) _.extend(definition.events, this.events);

  _.extend(this, definition, true);
  if(this.$parent){
     this.$parent._append(this);
  }
  this._children = [];
  this.$refs = {};

  template = this.template;

  // template is a string (len < 16). we will find it container first
  if((typeof template === 'string' && template.length < 16) && (node = dom.find(template))) {
    template = node.innerHTML;
  }
  // if template is a xml
  if(template && template.nodeType) template = template.innerHTML;
  if(typeof template === 'string') this.template = new Parser(template).parse();

  this.computed = handleComputed(this.computed);
  this.$root = this.$root || this;
  // if have events
  if(this.events){
    this.$on(this.events);
  }
  this.$emit("$config");
  this.config && this.config(this.data);
  if(this._body && this._body.length){
    this.$body = _.getCompileFn(this._body, this.$parent, {
      outer: this,
      namespace: options.namespace,
      extra: options.extra,
      record: true
    })
    this._body = null;
  }
  // handle computed
  if(template){
    this.group = this.$compile(this.template, {namespace: options.namespace});
    combine.node(this);
  }


  if(!this.$parent) this.$update();
  this.$ready = true;
  this.$emit("$init");
  if( this.init ) this.init(this.data);

  // @TODO: remove, maybe , there is no need to update after init; 
  // if(this.$root === this) this.$update();
  env.isRunning = prevRunning;

  // children is not required;
}


walkers && (walkers.Regular = Regular);


// description
// -------------------------
// 1. Regular and derived Class use same filter
_.extend(Regular, {
  // private data stuff
  _directives: { __regexp__:[] },
  _plugins: {},
  _protoInheritCache: [ 'directive', 'use'] ,
  __after__: function(supr, o) {

    var template;
    this.__after__ = supr.__after__;

    // use name make the component global.
    if(o.name) Regular.component(o.name, this);
    // this.prototype.template = dom.initTemplate(o)
    if(template = o.template){
      var node, name;
      if( typeof template === 'string' && template.length < 16 && ( node = dom.find( template )) ){
        template = node.innerHTML;
        if(name = dom.attr(node, 'name')) Regular.component(name, this);
      }

      if(template.nodeType) template = template.innerHTML;

      if(typeof template === 'string'){
        this.prototype.template = new Parser(template).parse();
      }
    }

    if(o.computed) this.prototype.computed = handleComputed(o.computed);
    // inherit directive and other config from supr
    Regular._inheritConfig(this, supr);

  },
  /**
   * Define a directive
   *
   * @method directive
   * @return {Object} Copy of ...
   */  
  directive: function(name, cfg){

    if(_.typeOf(name) === "object"){
      for(var k in name){
        if(name.hasOwnProperty(k)) this.directive(k, name[k]);
      }
      return this;
    }
    var type = _.typeOf(name);
    var directives = this._directives, directive;
    if(cfg == null){
      if( type === "string" && (directive = directives[name]) ) return directive;
      else{
        var regexp = directives.__regexp__;
        for(var i = 0, len = regexp.length; i < len ; i++){
          directive = regexp[i];
          var test = directive.regexp.test(name);
          if(test) return directive;
        }
      }
      return undefined;
    }
    if(typeof cfg === 'function') cfg = { link: cfg } 
    if(type === 'string') directives[name] = cfg;
    else if(type === 'regexp'){
      cfg.regexp = name;
      directives.__regexp__.push(cfg)
    }
    return this
  },
  plugin: function(name, fn){
    var plugins = this._plugins;
    if(fn == null) return plugins[name];
    plugins[name] = fn;
    return this;
  },
  use: function(fn){
    if(typeof fn === "string") fn = Regular.plugin(fn);
    if(typeof fn !== "function") return this;
    fn(this, Regular);
    return this;
  },
  // config the Regularjs's global
  config: function(name, value){
    var needGenLexer = false;
    if(typeof name === "object"){
      for(var i in name){
        // if you config
        if( i ==="END" || i==='BEGIN' )  needGenLexer = true;
        config[i] = name[i];
      }
    }
    if(needGenLexer) Lexer.setup();
  },
  expression: parse.expression,
  Parser: Parser,
  Lexer: Lexer,
  _addProtoInheritCache: function(name, transform){
    if( Array.isArray( name ) ){
      return name.forEach(Regular._addProtoInheritCache);
    }
    var cacheKey = "_" + name + "s"
    Regular._protoInheritCache.push(name)
    Regular[cacheKey] = {};
    if(Regular[name]) return;
    Regular[name] = function(key, cfg){
      var cache = this[cacheKey];

      if(typeof key === "object"){
        for(var i in key){
          if(key.hasOwnProperty(i)) this[name](i, key[i]);
        }
        return this;
      }
      if(cfg == null) return cache[key];
      cache[key] = transform? transform(cfg) : cfg;
      return this;
    }
  },
  _inheritConfig: function(self, supr){

    // prototype inherit some Regular property
    // so every Component will have own container to serve directive, filter etc..
    var defs = Regular._protoInheritCache;
    var keys = _.slice(defs);
    keys.forEach(function(key){
      self[key] = supr[key];
      var cacheKey = '_' + key + 's';
      if(supr[cacheKey]) self[cacheKey] = _.createObject(supr[cacheKey]);
    })
    return self;
  }

});

extend(Regular);

Regular._addProtoInheritCache("component")

Regular._addProtoInheritCache("filter", function(cfg){
  return typeof cfg === "function"? {get: cfg}: cfg;
})


events.mixTo(Regular);
Watcher.mixTo(Regular);

Regular.implement({
  init: function(){},
  config: function(){},
  destroy: function(){
    // destroy event wont propgation;
    this.$emit("$destroy");
    this.group && this.group.destroy(true);
    this.group = null;
    this.parentNode = null;
    this._watchers = null;
    this._children = [];
    var parent = this.$parent;
    if(parent){
      var index = parent._children.indexOf(this);
      parent._children.splice(index,1);
    }
    this.$parent = null;
    this.$root = null;
    this._handles = null;
    this.$refs = null;
  },

  /**
   * compile a block ast ; return a group;
   * @param  {Array} parsed ast
   * @param  {[type]} record
   * @return {[type]}
   */
  $compile: function(ast, options){
    options = options || {};
    if(typeof ast === 'string'){
      ast = new Parser(ast).parse()
    }
    var preExt = this.__ext__,
      record = options.record, 
      records;

    if(options.extra) this.__ext__ = options.extra;

    if(record) this._record();
    var group = this._walk(ast, options);
    if(record){
      records = this._release();
      var self = this;
      if(records.length){
        // auto destroy all wather;
        group.ondestroy = function(){ self.$unwatch(records); }
      }
    }
    if(options.extra) this.__ext__ = preExt;
    return group;
  },


  /**
   * create two-way binding with another component;
   * *warn*: 
   *   expr1 and expr2 must can operate set&get, for example: the 'a.b' or 'a[b + 1]' is set-able, but 'a.b + 1' is not, 
   *   beacuse Regular dont know how to inverse set through the expression;
   *   
   *   if before $bind, two component's state is not sync, the component(passed param) will sync with the called component;
   *
   * *example: *
   *
   * ```javascript
   * // in this example, we need to link two pager component
   * var pager = new Pager({}) // pager compoennt
   * var pager2 = new Pager({}) // another pager component
   * pager.$bind(pager2, 'current'); // two way bind throw two component
   * pager.$bind(pager2, 'total');   // 
   * // or just
   * pager.$bind(pager2, {"current": "current", "total": "total"}) 
   * ```
   * 
   * @param  {Regular} component the
   * @param  {String|Expression} expr1     required, self expr1 to operate binding
   * @param  {String|Expression} expr2     optional, other component's expr to bind with, if not passed, the expr2 will use the expr1;
   * @return          this;
   */
  $bind: function(component, expr1, expr2){
    var type = _.typeOf(expr1);
    if( expr1.type === 'expression' || type === 'string' ){
      this._bind(component, expr1, expr2)
    }else if( type === "array" ){ // multiply same path binding through array
      for(var i = 0, len = expr1.length; i < len; i++){
        this._bind(component, expr1[i]);
      }
    }else if(type === "object"){
      for(var i in expr1) if(expr1.hasOwnProperty(i)){
        this._bind(component, i, expr1[i]);
      }
    }
    // digest
    component.$update();
    return this;
  },
  /**
   * unbind one component( see $bind also)
   *
   * unbind will unbind all relation between two component
   * 
   * @param  {Regular} component [descriptionegular
   * @return {This}    this
   */
  $unbind: function(){
    // todo
  },
  $inject: combine.inject,
  $mute: function(isMute){

    isMute = !!isMute;

    var needupdate = isMute === false && this._mute;

    this._mute = !!isMute;

    if(needupdate) this.$update();
    return this;
  },
  // private bind logic
  _bind: function(component, expr1, expr2){

    var self = this;
    // basic binding

    if(!component || !(component instanceof Regular)) throw "$bind() should pass Regular component as first argument";
    if(!expr1) throw "$bind() should  pass as least one expression to bind";

    if(!expr2) expr2 = expr1;

    expr1 = parse.expression( expr1 );
    expr2 = parse.expression( expr2 );

    // set is need to operate setting ;
    if(expr2.set){
      var wid1 = this.$watch( expr1, function(value){
        component.$update(expr2, value)
      });
      component.$on('$destroy', function(){
        self.$unwatch(wid1)
      })
    }
    if(expr1.set){
      var wid2 = component.$watch(expr2, function(value){
        self.$update(expr1, value)
      });
      // when brother destroy, we unlink this watcher
      this.$on('$destroy', component.$unwatch.bind(component,wid2))
    }
    // sync the component's state to called's state
    expr2.set(component, expr1.get(this));
  },
  _walk: function(ast, arg1){
    if( _.typeOf(ast) === 'array' ){
      var res = [];

      for(var i = 0, len = ast.length; i < len; i++){
        res.push( this._walk(ast[i], arg1) );
      }

      return new Group(res);
    }
    if(typeof ast === 'string') return doc.createTextNode(ast)
    return walkers[ast.type || "default"].call(this, ast, arg1);
  },
  _append: function(component){
    this._children.push(component);
    component.$parent = this;
  },
  _handleEvent: function(elem, type, value, attrs){
    var Component = this.constructor,
      fire = typeof value !== "function"? _.handleEvent.call( this, value, type ) : value,
      handler = Component.event(type), destroy;

    if ( handler ) {
      destroy = handler.call(this, elem, fire, attrs);
    } else {
      dom.on(elem, type, fire);
    }
    return handler ? destroy : function() {
      dom.off(elem, type, fire);
    }
  },
  // 1. 用来处理exprBody -> Function
  // 2. list里的循环
  _touchExpr: function(expr){
    var  rawget, ext = this.__ext__, touched = {};
    if(expr.type !== 'expression' || expr.touched) return expr;
    rawget = expr.get || (expr.get = new Function(_.ctxName, _.extName , _.prefix+ "return (" + expr.body + ")"));
    touched.get = !ext? rawget: function(context){
      return rawget(context, ext)
    }

    if(expr.setbody && !expr.set){
      var setbody = expr.setbody;
      expr.set = function(ctx, value, ext){
        expr.set = new Function(_.ctxName, _.setName , _.extName, _.prefix + setbody);          
        return expr.set(ctx, value, ext);
      }
      expr.setbody = null;
    }
    if(expr.set){
      touched.set = !ext? expr.set : function(ctx, value){
        return expr.set(ctx, value, ext);
      }
    }
    _.extend(touched, {
      type: 'expression',
      touched: true,
      once: expr.once || expr.constant
    })
    return touched
  },
  // find filter
  _f_: function(name){
    var Component = this.constructor;
    var filter = Component.filter(name);
    if(!filter) throw Error('filter ' + name + ' is undefined');
    return filter;
  },
  // simple accessor get
  _sg_:function(path, defaults, ext){
    if(typeof ext !== 'undefined'){
      // if(path === "demos")  debugger
      var computed = this.computed,
        computedProperty = computed[path];
      if(computedProperty){
        if(computedProperty.type==='expression' && !computedProperty.get) this._touchExpr(computedProperty);
        if(computedProperty.get)  return computedProperty.get(this);
        else _.log("the computed '" + path + "' don't define the get function,  get data."+path + " altnately", "error")
      }
  }
    if(typeof defaults === "undefined" || typeof path == "undefined" ){
      return undefined;
    }
    return (ext && typeof ext[path] !== 'undefined')? ext[path]: defaults[path];

  },
  // simple accessor set
  _ss_:function(path, value, data , op, computed){
    var computed = this.computed,
      op = op || "=", prev, 
      computedProperty = computed? computed[path]:null;

    if(op !== '='){
      prev = computedProperty? computedProperty.get(this): data[path];
      switch(op){
        case "+=":
          value = prev + value;
          break;
        case "-=":
          value = prev - value;
          break;
        case "*=":
          value = prev * value;
          break;
        case "/=":
          value = prev / value;
          break;
        case "%=":
          value = prev % value;
          break;
      }
    }
    if(computedProperty) {
      if(computedProperty.set) return computedProperty.set(this, value);
      else _.log("the computed '" + path + "' don't define the set function,  assign data."+path + " altnately", "error" )
    }
    data[path] = value;
    return value;
  }
});

Regular.prototype.inject = function(){
  _.log("use $inject instead of inject", "error");
  return this.$inject.apply(this, arguments);
}


// only one builtin filter

Regular.filter(filter);

module.exports = Regular;



var handleComputed = (function(){
  // wrap the computed getter;
  function wrapGet(get){
    return function(context){
      return get.call(context, context.data );
    }
  }
  // wrap the computed setter;
  function wrapSet(set){
    return function(context, value){
      set.call( context, value, context.data );
      return value;
    }
  }

  return function(computed){
    if(!computed) return;
    var parsedComputed = {}, handle, pair, type;
    for(var i in computed){
      handle = computed[i]
      type = typeof handle;

      if(handle.type === 'expression'){
        parsedComputed[i] = handle;
        continue;
      }
      if( type === "string" ){
        parsedComputed[i] = parse.expression(handle)
      }else{
        pair = parsedComputed[i] = {type: 'expression'};
        if(type === "function" ){
          pair.get = wrapGet(handle);
        }else{
          if(handle.get) pair.get = wrapGet(handle.get);
          if(handle.set) pair.set = wrapSet(handle.set);
        }
      } 
    }
    return parsedComputed;
  }
})();

},{"./config.js":5,"./dom.js":11,"./env.js":12,"./group.js":13,"./helper/combine.js":16,"./helper/event.js":18,"./helper/extend.js":19,"./helper/filter.js":20,"./helper/parse.js":21,"./helper/watcher.js":23,"./parser/Lexer.js":26,"./parser/Parser.js":27,"./util":29,"./walkers.js":30}],5:[function(require,module,exports){

module.exports = {
  'BEGIN': '{',
  'END': '}'
}
},{}],6:[function(require,module,exports){
module.exports = {
  'COMPONENT_TYPE': 1,
  'ELEMENT_TYPE': 2
}
},{}],7:[function(require,module,exports){
var // packages
  _ = require("../util.js"),
 animate = require("../helper/animate.js"),
 dom = require("../dom.js"),
 Regular = require("../Regular.js");


var // variables
  rClassName = /^[-\w]+(\s[-\w]+)*$/,
  rCommaSep = /[\r\n\f ]*,[\r\n\f ]*(?=\w+\:)/, //  dont split comma in  Expression
  rStyles = /^\{.*\}$/, //  for Simpilfy
  rSpace = /\s+/, //  for Simpilfy
  WHEN_COMMAND = "when",
  EVENT_COMMAND = "on",
  THEN_COMMAND = "then";

/**
 * Animation Plugin
 * @param {Component} Component 
 */


function createSeed(type){

  var steps = [], current = 0, callback = _.noop;
  var key;

  var out = {
    type: type,
    start: function(cb){
      key = _.uid();
      if(typeof cb === "function") callback = cb;
      if(current> 0 ){
        current = 0 ;
      }else{
        out.step();
      }
      return out.compelete;
    },
    compelete: function(){
      key = null;
      callback && callback();
      callback = _.noop;
      current = 0;
    },
    step: function(){
      if(steps[current]) steps[current ]( out.done.bind(out, key) );
    },
    done: function(pkey){
      if(pkey !== key) return; // means the loop is down
      if( current < steps.length - 1 ) {
        current++;
        out.step();
      }else{
        out.compelete();
      }
    },
    push: function(step){
      steps.push(step)
    }
  }

  return out;
}

Regular._addProtoInheritCache("animation")


// builtin animation
Regular.animation({
  "wait": function( step ){
    var timeout = parseInt( step.param ) || 0
    return function(done){
      // _.log("delay " + timeout)
      setTimeout( done, timeout );
    }
  },
  "class": function(step){
    var tmp = step.param.split(","),
      className = tmp[0] || "",
      mode = parseInt(tmp[1]) || 1;

    return function(done){
      // _.log(className)
      animate.startClassAnimate( step.element, className , done, mode );
    }
  },
  "call": function(step){
    var fn = this.$expression(step.param).get, self = this;
    return function(done){
      // _.log(step.param, 'call')
      fn(self);
      self.$update();
      done()
    }
  },
  "emit": function(step){
    var param = step.param;
    var tmp = param.split(","),
      evt = tmp[0] || "",
      args = tmp[1]? this.$expression(tmp[1]).get: null;

    if(!evt) throw Error("you shoud specified a eventname in emit command");

    var self = this;
    return function(done){
      self.$emit(evt, args? args(self) : undefined);
      done();
    }
  },
  // style: left {10}px,
  style: function(step){
    var styles = {}, 
      param = step.param,
      pairs = param.split(","), valid;
    pairs.forEach(function(pair){
      pair = pair.trim();
      if(pair){
        var tmp = pair.split( rSpace ),
          name = tmp.shift(),
          value = tmp.join(" ");

        if( !name || !value ) throw Error("invalid style in command: style");
        styles[name] = value;
        valid = true;
      }
    })

    return function(done){
      if(valid){
        animate.startStyleAnimate(step.element, styles, done);
      }else{
        done();
      }
    }
  }
})



// hancdle the r-animation directive
// el : the element to process
// value: the directive value
function processAnimate( element, value ){
  var Component = this.constructor;
  value = value.trim();

  var composites = value.split(";"), 
    composite, context = this, seeds = [], seed, destroies = [], destroy,
    command, param , current = 0, tmp, animator, self = this;

  function reset( type ){
    seed && seeds.push( seed )
    seed = createSeed( type );
  }

  function whenCallback(start, value){
    if( !!value ) start()
  }

  function animationDestroy(element){
    return function(){
      delete element.onenter;
      delete element.onleave;
    } 
  }

  for( var i = 0, len = composites.length; i < len; i++ ){

    composite = composites[i];
    tmp = composite.split(":");
    command = tmp[0] && tmp[0].trim();
    param = tmp[1] && tmp[1].trim();

    if( !command ) continue;

    if( command === WHEN_COMMAND ){
      reset("when");
      this.$watch(param, whenCallback.bind( this, seed.start ) );
      continue;
    }

    if( command === EVENT_COMMAND){
      reset(param);
      if( param === "leave" ){
        element.onleave = seed.start;
        destroies.push( animationDestroy(element) );
      }else if( param === "enter" ){
        element.onenter = seed.start;
        destroies.push( animationDestroy(element) );
      }else{
        if( ("on" + param) in element){ // if dom have the event , we use dom event
          destroies.push(this._handleEvent( element, param, seed.start ));
        }else{ // otherwise, we use component event
          this.$on(param, seed.start);
          destroies.push(this.$off.bind(this, param, seed.start));
        }
      }
      continue
    }

    var animator =  Component.animation(command) 
    if( animator && seed ){
      seed.push(
        animator.call(this,{
          element: element,
          done: seed.done,
          param: param 
        })
      )
    }else{
      throw Error( animator? "you should start with `on` or `event` in animation" : ("undefined animator 【" + command +"】" ));
    }
  }

  if(destroies.length){
    return function(){
      destroies.forEach(function(destroy){
        destroy();
      })
    }
  }
}


Regular.directive( "r-animation", processAnimate)
Regular.directive( "r-anim", processAnimate)


},{"../Regular.js":4,"../dom.js":11,"../helper/animate.js":14,"../util.js":29}],8:[function(require,module,exports){
// Regular
var _ = require("../util.js");
var dom = require("../dom.js");
var animate = require("../helper/animate.js");
var Regular = require("../Regular.js");
var consts = require("../const");



require("./event.js");
require("./form.js");


module.exports = {
// **warn**: class inteplation will override this directive 
  'r-class': function(elem, value){
    if(typeof value=== 'string'){
      value = _.fixObjStr(value)
    }
    this.$watch(value, function(nvalue){
      var className = ' '+ elem.className.replace(/\s+/g, ' ') +' ';
      for(var i in nvalue) if(nvalue.hasOwnProperty(i)){
        className = className.replace(' ' + i + ' ',' ');
        if(nvalue[i] === true){
          className += i+' ';
        }
      }
      elem.className = className.trim();
    },true);
  },
  // **warn**: style inteplation will override this directive 
  'r-style': function(elem, value){
    if(typeof value=== 'string'){
      value = _.fixObjStr(value)
    }
    this.$watch(value, function(nvalue){
      for(var i in nvalue) if(nvalue.hasOwnProperty(i)){
        dom.css(elem, i, nvalue[i]);
      }
    },true);
  },
  // when expression is evaluate to true, the elem will add display:none
  // Example: <div r-hide={{items.length > 0}}></div>
  'r-hide': function(elem, value){
    var preBool = null, compelete;
    this.$watch(value, function(nvalue){
      var bool = !!nvalue;
      if(bool === preBool) return; 
      preBool = bool;
      if(bool){
        if(elem.onleave){
          compelete = elem.onleave(function(){
            elem.style.display = "none"
            compelete = null;
          })
        }else{
          elem.style.display = "none"
        }
        
      }else{
        if(compelete) compelete();
        elem.style.display = "";
        if(elem.onenter){
          elem.onenter();
        }
      }
    });
  },
  'r-html': function(elem, value){
    this.$watch(value, function(nvalue){
      nvalue = nvalue || "";
      dom.html(elem, nvalue)
    }, {force: true});
  },
  'ref': {
    accept: consts.COMPONENT_TYPE + consts.ELEMENT_TYPE,
    link: function( elem, value ){
      var refs = this.$refs || (this.$refs = {});
      var cval;
      if(_.isExpr(value)){
        this.$watch(value, function(nval, oval){
          cval = nval;
          if(refs[oval] === elem) refs[oval] = null;
          if(cval) refs[cval] = elem;
        })
      }else{
        refs[cval = value] = elem;
      }
      return function(){
        refs[cval] = null;
      }
    }
  }
}

Regular.directive(module.exports);











},{"../Regular.js":4,"../const":6,"../dom.js":11,"../helper/animate.js":14,"../util.js":29,"./event.js":9,"./form.js":10}],9:[function(require,module,exports){
/**
 * event directive  bundle
 *
 */
var _ = require("../util.js");
var dom = require("../dom.js");
var Regular = require("../Regular.js");

Regular._addProtoInheritCache("event");

Regular.directive( /^on-\w+$/, function( elem, value, name , attrs) {
  if ( !name || !value ) return;
  var type = name.split("-")[1];
  return this._handleEvent( elem, type, value, attrs );
});
// TODO.
/**
- $('dx').delegate()
*/
Regular.directive( /^(delegate|de)-\w+$/, function( elem, value, name ) {
  var root = this.$root;
  var _delegates = root._delegates || ( root._delegates = {} );
  if ( !name || !value ) return;
  var type = name.split("-")[1];
  var fire = _.handleEvent.call(this, value, type);

  function delegateEvent(ev){
    matchParent(ev, _delegates[type], root.parentNode);
  }

  if( !_delegates[type] ){
    _delegates[type] = [];

    if(root.parentNode){
      dom.on(root.parentNode, type, delegateEvent);
    }else{
      root.$on( "$inject", function( newParent ){
        var preParent = this.parentNode;
        if( preParent ){
          dom.off(preParent, type, delegateEvent);
        }
        dom.on(newParent, type, delegateEvent);
      })
    }
    root.$on("$destroy", function(){
      if(root.parentNode) dom.off(root.parentNode, type, delegateEvent)
      _delegates[type] = null;
    })
  }
  var delegate = {
    element: elem,
    fire: fire
  }
  _delegates[type].push( delegate );

  return function(){
    var delegates = _delegates[type];
    if(!delegates || !delegates.length) return;
    for( var i = 0, len = delegates.length; i < len; i++ ){
      if( delegates[i] === delegate ) delegates.splice(i, 1);
    }
  }

});


function matchParent(ev , delegates, stop){
  if(!stop) return;
  var target = ev.target, pair;
  while(target && target !== stop){
    for( var i = 0, len = delegates.length; i < len; i++ ){
      pair = delegates[i];
      if(pair && pair.element === target){
        pair.fire(ev)
      }
    }
    target = target.parentNode;
  }
}
},{"../Regular.js":4,"../dom.js":11,"../util.js":29}],10:[function(require,module,exports){
// Regular
var _ = require("../util.js");
var dom = require("../dom.js");
var Regular = require("../Regular.js");

var modelHandlers = {
  "text": initText,
  "select": initSelect,
  "checkbox": initCheckBox,
  "radio": initRadio
}


// @TODO


// two-way binding with r-model
// works on input, textarea, checkbox, radio, select

Regular.directive("r-model", function(elem, value){
  var tag = elem.tagName.toLowerCase();
  var sign = tag;
  if(sign === "input") sign = elem.type || "text";
  else if(sign === "textarea") sign = "text";
  if(typeof value === "string") value = this.$expression(value);

  if( modelHandlers[sign] ) return modelHandlers[sign].call(this, elem, value);
  else if(tag === "input"){
    return modelHandlers.text.call(this, elem, value);
  }
});



// binding <select>

function initSelect( elem, parsed){
  var self = this;
  var wc =this.$watch(parsed, function(newValue){
    var children = _.slice(elem.getElementsByTagName('option'))
    children.forEach(function(node, index){
      if(node.value == newValue){
        elem.selectedIndex = index;
      }
    })
  });

  function handler(){
    parsed.set(self, this.value);
    wc.last = this.value;
    self.$update();
  }

  dom.on(elem, "change", handler);
  
  if(parsed.get(self) === undefined && elem.value){
     parsed.set(self, elem.value);
  }
  return function destroy(){
    dom.off(elem, "change", handler);
  }
}

// input,textarea binding

function initText(elem, parsed){
  var self = this;
  var wc = this.$watch(parsed, function(newValue){
    if(elem.value !== newValue) elem.value = newValue == null? "": "" + newValue;
  });

  // @TODO to fixed event
  var handler = function (ev){
    var that = this;
    if(ev.type==='cut' || ev.type==='paste'){
      _.nextTick(function(){
        var value = that.value
        parsed.set(self, value);
        wc.last = value;
        self.$update();
      })
    }else{
        var value = that.value
        parsed.set(self, value);
        wc.last = value;
        self.$update();
    }
  };

  if(dom.msie !== 9 && "oninput" in dom.tNode ){
    elem.addEventListener("input", handler );
  }else{
    dom.on(elem, "paste", handler)
    dom.on(elem, "keyup", handler)
    dom.on(elem, "cut", handler)
    dom.on(elem, "change", handler)
  }
  if(parsed.get(self) === undefined && elem.value){
     parsed.set(self, elem.value);
  }
  return function (){
    if(dom.msie !== 9 && "oninput" in dom.tNode ){
      elem.removeEventListener("input", handler );
    }else{
      dom.off(elem, "paste", handler)
      dom.off(elem, "keyup", handler)
      dom.off(elem, "cut", handler)
      dom.off(elem, "change", handler)
    }
  }
}


// input:checkbox  binding

function initCheckBox(elem, parsed){
  var self = this;
  var watcher = this.$watch(parsed, function(newValue){
    dom.attr(elem, 'checked', !!newValue);
  });

  var handler = function handler(){
    var value = this.checked;
    parsed.set(self, value);
    watcher.last = value;
    self.$update();
  }
  if(parsed.set) dom.on(elem, "change", handler)

  if(parsed.get(self) === undefined){
    parsed.set(self, !!elem.checked);
  }

  return function destroy(){
    if(parsed.set) dom.off(elem, "change", handler)
  }
}


// input:radio binding

function initRadio(elem, parsed){
  var self = this;
  var wc = this.$watch(parsed, function( newValue ){
    if(newValue == elem.value) elem.checked = true;
    else elem.checked = false;
  });


  var handler = function handler(){
    var value = this.value;
    parsed.set(self, value);
    self.$update();
  }
  if(parsed.set) dom.on(elem, "change", handler)
  // beacuse only after compile(init), the dom structrue is exsit. 
  if(parsed.get(self) === undefined){
    if(elem.checked) {
      parsed.set(self, elem.value);
    }
  }

  return function destroy(){
    if(parsed.set) dom.off(elem, "change", handler)
  }
}

},{"../Regular.js":4,"../dom.js":11,"../util.js":29}],11:[function(require,module,exports){

// thanks for angular && mootools for some concise&cross-platform  implemention
// =====================================

// The MIT License
// Copyright (c) 2010-2014 Google, Inc. http://angularjs.org

// ---
// license: MIT-style license. http://mootools.net


var dom = module.exports;
var env = require("./env.js");
var _ = require("./util");
var tNode = document.createElement('div')
var addEvent, removeEvent;
var noop = function(){}

var namespaces = {
  html: "http://www.w3.org/1999/xhtml",
  svg: "http://www.w3.org/2000/svg"
}

dom.body = document.body;

dom.doc = document;

// camelCase
function camelCase(str){
  return ("" + str).replace(/-\D/g, function(match){
    return match.charAt(1).toUpperCase();
  });
}


dom.tNode = tNode;

if(tNode.addEventListener){
  addEvent = function(node, type, fn) {
    node.addEventListener(type, fn, false);
  }
  removeEvent = function(node, type, fn) {
    node.removeEventListener(type, fn, false) 
  }
}else{
  addEvent = function(node, type, fn) {
    node.attachEvent('on' + type, fn);
  }
  removeEvent = function(node, type, fn) {
    node.detachEvent('on' + type, fn); 
  }
}


dom.msie = parseInt((/msie (\d+)/.exec(navigator.userAgent.toLowerCase()) || [])[1]);
if (isNaN(dom.msie)) {
  dom.msie = parseInt((/trident\/.*; rv:(\d+)/.exec(navigator.userAgent.toLowerCase()) || [])[1]);
}

dom.find = function(sl){
  if(document.querySelector) {
    try{
      return document.querySelector(sl);
    }catch(e){

    }
  }
  if(sl.indexOf('#')!==-1) return document.getElementById( sl.slice(1) );
}

dom.inject = function(node, refer, position){

  position = position || 'bottom';
  if(!node) return ;
  if(Array.isArray(node)){
    var tmp = node;
    node = dom.fragment();
    for(var i = 0,len = tmp.length; i < len ;i++){
      node.appendChild(tmp[i])
    }
  }

  var firstChild, next;
  switch(position){
    case 'bottom':
      refer.appendChild( node );
      break;
    case 'top':
      if( firstChild = refer.firstChild ){
        refer.insertBefore( node, refer.firstChild );
      }else{
        refer.appendChild( node );
      }
      break;
    case 'after':
      if( next = refer.nextSibling ){
        next.parentNode.insertBefore( node, next );
      }else{
        refer.parentNode.appendChild( node );
      }
      break;
    case 'before':
      refer.parentNode.insertBefore( node, refer );
  }
}


dom.id = function(id){
  return document.getElementById(id);
}

// createElement 
dom.create = function(type, ns, attrs){
  if(ns === 'svg'){
    if(!env.svg) throw Error('the env need svg support')
    ns = namespaces.svg;
  }
  return !ns? document.createElement(type): document.createElementNS(ns, type);
}

// documentFragment
dom.fragment = function(){
  return document.createDocumentFragment();
}



var specialAttr = {
  'class': function(node, value){
    ('className' in node && (node.namespaceURI === namespaces.html || !node.namespaceURI)) ?
      node.className = (value || '') : node.setAttribute('class', value);
  },
  'for': function(node, value){
    ('htmlFor' in node) ? node.htmlFor = value : node.setAttribute('for', value);
  },
  'style': function(node, value){
    (node.style) ? node.style.cssText = value : node.setAttribute('style', value);
  },
  'value': function(node, value){
    node.value = (value != null) ? value : '';
  }
}


// attribute Setter & Getter
dom.attr = function(node, name, value){
  if (_.isBooleanAttr(name)) {
    if (typeof value !== 'undefined') {
      if (!!value) {
        node[name] = true;
        node.setAttribute(name, name);
        // lt ie7 . the javascript checked setting is in valid
        //http://bytes.com/topic/javascript/insights/799167-browser-quirk-dynamically-appended-checked-checkbox-does-not-appear-checked-ie
        if(dom.msie && dom.msie <=7 ) node.defaultChecked = true
      } else {
        node[name] = false;
        node.removeAttribute(name);
      }
    } else {
      return (node[name] ||
               (node.attributes.getNamedItem(name)|| noop).specified) ? name : undefined;
    }
  } else if (typeof (value) !== 'undefined') {
    // if in specialAttr;
    if(specialAttr[name]) specialAttr[name](node, value);
    else if(value === null) node.removeAttribute(name)
    else node.setAttribute(name, value);
  } else if (node.getAttribute) {
    // the extra argument "2" is to get the right thing for a.href in IE, see jQuery code
    // some elements (e.g. Document) don't have get attribute, so return undefined
    var ret = node.getAttribute(name, 2);
    // normalize non-existing attributes to undefined (as jQuery)
    return ret === null ? undefined : ret;
  }
}


dom.on = function(node, type, handler){
  var types = type.split(' ');
  handler.real = function(ev){
    var $event = new Event(ev);
    $event.origin = node;
    handler.call(node, $event);
  }
  types.forEach(function(type){
    type = fixEventName(node, type);
    addEvent(node, type, handler.real);
  });
}
dom.off = function(node, type, handler){
  var types = type.split(' ');
  handler = handler.real || handler;
  types.forEach(function(type){
    type = fixEventName(node, type);
    removeEvent(node, type, handler);
  })
}


dom.text = (function (){
  var map = {};
  if (dom.msie && dom.msie < 9) {
    map[1] = 'innerText';    
    map[3] = 'nodeValue';    
  } else {
    map[1] = map[3] = 'textContent';
  }
  
  return function (node, value) {
    var textProp = map[node.nodeType];
    if (value == null) {
      return textProp ? node[textProp] : '';
    }
    node[textProp] = value;
  }
})();


dom.html = function( node, html ){
  if(typeof html === "undefined"){
    return node.innerHTML;
  }else{
    node.innerHTML = html;
  }
}

dom.replace = function(node, replaced){
  if(replaced.parentNode) replaced.parentNode.replaceChild(node, replaced);
}

dom.remove = function(node){
  if(node.parentNode) node.parentNode.removeChild(node);
}

// css Settle & Getter from angular
// =================================
// it isnt computed style 
dom.css = function(node, name, value){
  if( _.typeOf(name) === "object" ){
    for(var i in name){
      if( name.hasOwnProperty(i) ){
        dom.css( node, i, name[i] );
      }
    }
    return;
  }
  if ( typeof value !== "undefined" ) {

    name = camelCase(name);
    if(name) node.style[name] = value;

  } else {

    var val;
    if (dom.msie <= 8) {
      // this is some IE specific weirdness that jQuery 1.6.4 does not sure why
      val = node.currentStyle && node.currentStyle[name];
      if (val === '') val = 'auto';
    }
    val = val || node.style[name];
    if (dom.msie <= 8) {
      val = val === '' ? undefined : val;
    }
    return  val;
  }
}

dom.addClass = function(node, className){
  var current = node.className || "";
  if ((" " + current + " ").indexOf(" " + className + " ") === -1) {
    node.className = current? ( current + " " + className ) : className;
  }
}

dom.delClass = function(node, className){
  var current = node.className || "";
  node.className = (" " + current + " ").replace(" " + className + " ", " ").trim();
}

dom.hasClass = function(node, className){
  var current = node.className || "";
  return (" " + current + " ").indexOf(" " + className + " ") !== -1;
}



// simple Event wrap

//http://stackoverflow.com/questions/11068196/ie8-ie7-onchange-event-is-emited-only-after-repeated-selection
function fixEventName(elem, name){
  return (name === 'change'  &&  dom.msie < 9 && 
      (elem && elem.tagName && elem.tagName.toLowerCase()==='input' && 
        (elem.type === 'checkbox' || elem.type === 'radio')
      )
    )? 'click': name;
}

var rMouseEvent = /^(?:click|dblclick|contextmenu|DOMMouseScroll|mouse(?:\w+))$/
var doc = document;
doc = (!doc.compatMode || doc.compatMode === 'CSS1Compat') ? doc.documentElement : doc.body;
function Event(ev){
  ev = ev || window.event;
  if(ev._fixed) return ev;
  this.event = ev;
  this.target = ev.target || ev.srcElement;

  var type = this.type = ev.type;
  var button = this.button = ev.button;

  // if is mouse event patch pageX
  if(rMouseEvent.test(type)){ //fix pageX
    this.pageX = (ev.pageX != null) ? ev.pageX : ev.clientX + doc.scrollLeft;
    this.pageY = (ev.pageX != null) ? ev.pageY : ev.clientY + doc.scrollTop;
    if (type === 'mouseover' || type === 'mouseout'){// fix relatedTarget
      var related = ev.relatedTarget || ev[(type === 'mouseover' ? 'from' : 'to') + 'Element'];
      while (related && related.nodeType === 3) related = related.parentNode;
      this.relatedTarget = related;
    }
  }
  // if is mousescroll
  if (type === 'DOMMouseScroll' || type === 'mousewheel'){
    // ff ev.detail: 3    other ev.wheelDelta: -120
    this.wheelDelta = (ev.wheelDelta) ? ev.wheelDelta / 120 : -(ev.detail || 0) / 3;
  }
  
  // fix which
  this.which = ev.which || ev.keyCode;
  if( !this.which && button !== undefined){
    // http://api.jquery.com/event.which/ use which
    this.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
  }
  this._fixed = true;
}

_.extend(Event.prototype, {
  immediateStop: _.isFalse,
  stop: function(){
    this.preventDefault().stopPropagation();
  },
  preventDefault: function(){
    if (this.event.preventDefault) this.event.preventDefault();
    else this.event.returnValue = false;
    return this;
  },
  stopPropagation: function(){
    if (this.event.stopPropagation) this.event.stopPropagation();
    else this.event.cancelBubble = true;
    return this;
  },
  stopImmediatePropagation: function(){
    if(this.event.stopImmediatePropagation) this.event.stopImmediatePropagation();
  }
})


dom.nextFrame = (function(){
    var request = window.requestAnimationFrame ||
                  window.webkitRequestAnimationFrame ||
                  window.mozRequestAnimationFrame|| 
                  function(callback){
                    setTimeout(callback, 16)
                  }

    var cancel = window.cancelAnimationFrame ||
                 window.webkitCancelAnimationFrame ||
                 window.mozCancelAnimationFrame ||
                 window.webkitCancelRequestAnimationFrame ||
                 function(tid){
                    clearTimeout(tid)
                 }
  
  return function(callback){
    var id = request(callback);
    return function(){ cancel(id); }
  }
})();

// 3ks for angular's raf  service
var k;
dom.nextReflow = dom.msie? function(callback){
  return dom.nextFrame(function(){
    k = document.body.offsetWidth;
    callback();
  })
}: dom.nextFrame;




},{"./env.js":12,"./util":29}],12:[function(require,module,exports){
// some fixture test;
// ---------------
var _ = require('./util');
exports.svg = (function(){
  return typeof document !== "undefined" && document.implementation.hasFeature( "http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1" );
})();


exports.browser = typeof document !== "undefined" && document.nodeType;
// whether have component in initializing
exports.exprCache = _.cache(1000);
exports.isRunning = false;

},{"./util":29}],13:[function(require,module,exports){
var _ = require('./util');
var combine = require('./helper/combine')

function Group(list){
  this.children = list || [];
}


var o = _.extend(Group.prototype, {
  destroy: function(first){
    combine.destroy(this.children, first);
    if(this.ondestroy) this.ondestroy();
    this.children = null;
  },
  get: function(i){
    return this.children[i]
  },
  push: function(item){
    this.children.push( item );
  }
})
o.inject = o.$inject = combine.inject



module.exports = Group;



},{"./helper/combine":16,"./util":29}],14:[function(require,module,exports){
var _ = require("../util");
var dom  = require("../dom.js");
var animate = {};
var env = require("../env.js");


var 
  transitionEnd = 'transitionend', 
  animationEnd = 'animationend', 
  transitionProperty = 'transition', 
  animationProperty = 'animation';

if(!('ontransitionend' in window)){
  if('onwebkittransitionend' in window) {
    
    // Chrome/Saf (+ Mobile Saf)/Android
    transitionEnd += ' webkitTransitionEnd';
    transitionProperty = 'webkitTransition'
  } else if('onotransitionend' in dom.tNode || navigator.appName === 'Opera') {

    // Opera
    transitionEnd += ' oTransitionEnd';
    transitionProperty = 'oTransition';
  }
}
if(!('onanimationend' in window)){
  if ('onwebkitanimationend' in window){
    // Chrome/Saf (+ Mobile Saf)/Android
    animationEnd += ' webkitAnimationEnd';
    animationProperty = 'webkitAnimation';

  }else if ('onoanimationend' in dom.tNode){
    // Opera
    animationEnd += ' oAnimationEnd';
    animationProperty = 'oAnimation';
  }
}

/**
 * inject node with animation
 * @param  {[type]} node      [description]
 * @param  {[type]} refer     [description]
 * @param  {[type]} direction [description]
 * @return {[type]}           [description]
 */
animate.inject = function( node, refer ,direction, callback ){
  callback = callback || _.noop;
  if( Array.isArray(node) ){
    var fragment = dom.fragment();
    var count=0;

    for(var i = 0,len = node.length;i < len; i++ ){
      fragment.appendChild(node[i]); 
    }
    dom.inject(fragment, refer, direction);

    // if all nodes is done, we call the callback
    var enterCallback = function (){
      count++;
      if( count === len ) callback();
    }
    if(len === count) callback();
    for( i = 0; i < len; i++ ){
      if(node[i].onenter){
        node[i].onenter(enterCallback);
      }else{
        enterCallback();
      }
    }
  }else{
    dom.inject( node, refer, direction );
    if(node.onenter){
      node.onenter(callback)
    }else{
      callback();
    }
  }
}

/**
 * remove node with animation
 * @param  {[type]}   node     [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
animate.remove = function(node, callback){
  if(!node) throw new Error('node to be removed is undefined')
  var count = 0;
  function loop(){
    count++;
    if(count === len) callback && callback()
  }
  if(Array.isArray(node)){
    for(var i = 0, len = node.length; i < len ; i++){
      animate.remove(node[i], loop)
    }
    return node;
  }
  if(node.onleave){
    node.onleave(function(){
      removeDone(node, callback)
    })
  }else{
    removeDone(node, callback)
  }
}

var removeDone = function (node, callback){
    dom.remove(node);
    callback && callback();
}



animate.startClassAnimate = function ( node, className,  callback, mode ){
  var activeClassName, timeout, tid, onceAnim;
  if( (!animationEnd && !transitionEnd) || env.isRunning ){
    return callback();
  }

  if(mode !== 4){
    onceAnim = _.once(function onAnimateEnd(){
      if(tid) clearTimeout(tid);

      if(mode === 2) {
        dom.delClass(node, activeClassName);
      }
      if(mode !== 3){ // mode hold the class
        dom.delClass(node, className);
      }
      dom.off(node, animationEnd, onceAnim)
      dom.off(node, transitionEnd, onceAnim)

      callback();

    });
  }else{
    onceAnim = _.once(function onAnimateEnd(){
      if(tid) clearTimeout(tid);
      callback();
    });
  }
  if(mode === 2){ // auto removed
    dom.addClass( node, className );

    activeClassName = className.split(/\s+/).map(function(name){
       return name + '-active';
    }).join(" ");

    dom.nextReflow(function(){
      dom.addClass( node, activeClassName );
      timeout = getMaxTimeout( node );
      tid = setTimeout( onceAnim, timeout );
    });

  }else if(mode===4){
    dom.nextReflow(function(){
      dom.delClass( node, className );
      timeout = getMaxTimeout( node );
      tid = setTimeout( onceAnim, timeout );
    });

  }else{
    dom.nextReflow(function(){
      dom.addClass( node, className );
      timeout = getMaxTimeout( node );
      tid = setTimeout( onceAnim, timeout );
    });
  }



  dom.on( node, animationEnd, onceAnim )
  dom.on( node, transitionEnd, onceAnim )
  return onceAnim;
}


animate.startStyleAnimate = function(node, styles, callback){
  var timeout, onceAnim, tid;

  dom.nextReflow(function(){
    dom.css( node, styles );
    timeout = getMaxTimeout( node );
    tid = setTimeout( onceAnim, timeout );
  });


  onceAnim = _.once(function onAnimateEnd(){
    if(tid) clearTimeout(tid);

    dom.off(node, animationEnd, onceAnim)
    dom.off(node, transitionEnd, onceAnim)

    callback();

  });

  dom.on( node, animationEnd, onceAnim )
  dom.on( node, transitionEnd, onceAnim )

  return onceAnim;
}


/**
 * get maxtimeout
 * @param  {Node} node 
 * @return {[type]}   [description]
 */
function getMaxTimeout(node){
  var timeout = 0,
    tDuration = 0,
    tDelay = 0,
    aDuration = 0,
    aDelay = 0,
    ratio = 5 / 3,
    styles ;

  if(window.getComputedStyle){

    styles = window.getComputedStyle(node),
    tDuration = getMaxTime( styles[transitionProperty + 'Duration']) || tDuration;
    tDelay = getMaxTime( styles[transitionProperty + 'Delay']) || tDelay;
    aDuration = getMaxTime( styles[animationProperty + 'Duration']) || aDuration;
    aDelay = getMaxTime( styles[animationProperty + 'Delay']) || aDelay;
    timeout = Math.max( tDuration+tDelay, aDuration + aDelay );

  }
  return timeout * 1000 * ratio;
}

function getMaxTime(str){

  var maxTimeout = 0, time;

  if(!str) return 0;

  str.split(",").forEach(function(str){

    time = parseFloat(str);
    if( time > maxTimeout ) maxTimeout = time;

  });

  return maxTimeout;
}

module.exports = animate;
},{"../dom.js":11,"../env.js":12,"../util":29}],15:[function(require,module,exports){

function simpleDiff(now, old){
  var nlen = now.length;
  var olen = old.length;
  if(nlen !== olen){
    return true;
  }
  for(var i = 0; i < nlen ; i++){
    if(now[i] !== old[i]) return  true;
  }
  return false

}

function equals(a,b){
  return a === b;
}
function ld(array1, array2){
  var n = array1.length;
  var m = array2.length;
  var matrix = [];
  for(var i = 0; i <= n; i++){
    matrix.push([i]);
  }
  for(var j=1;j<=m;j++){
    matrix[0][j]=j;
  }
  for(var i = 1; i <= n; i++){
    for(var j = 1; j <= m; j++){
      if(equals(array1[i-1], array2[j-1])){
        matrix[i][j] = matrix[i-1][j-1];
      }else{
        matrix[i][j] = Math.min(
          matrix[i-1][j]+1, //delete
          matrix[i][j-1]+1//add
          )
      }
    }
  }
  return matrix;
}
function whole(arr2, arr1, indexTrack) {
  if(indexTrack) return simpleDiff(arr2, arr1);
  var matrix = ld(arr1, arr2)
  var n = arr1.length;
  var i = n;
  var m = arr2.length;
  var j = m;
  var edits = [];
  var current = matrix[i][j];
  while(i>0 || j>0){
  // the last line
    if (i === 0) {
      edits.unshift(3);
      j--;
      continue;
    }
    // the last col
    if (j === 0) {
      edits.unshift(2);
      i--;
      continue;
    }
    var northWest = matrix[i - 1][j - 1];
    var west = matrix[i - 1][j];
    var north = matrix[i][j - 1];

    var min = Math.min(north, west, northWest);

    if (min === west) {
      edits.unshift(2); //delete
      i--;
      current = west;
    } else if (min === northWest ) {
      if (northWest === current) {
        edits.unshift(0); //no change
      } else {
        edits.unshift(1); //update
        current = northWest;
      }
      i--;
      j--;
    } else {
      edits.unshift(3); //add
      j--;
      current = north;
    }
  }
  var LEAVE = 0;
  var ADD = 3;
  var DELELE = 2;
  var UPDATE = 1;
  var n = 0;m=0;
  var steps = [];
  var step = {index: null, add:0, removed:[]};

  for(var i=0;i<edits.length;i++){
    if(edits[i] > 0 ){ // NOT LEAVE
      if(step.index === null){
        step.index = m;
      }
    } else { //LEAVE
      if(step.index != null){
        steps.push(step)
        step = {index: null, add:0, removed:[]};
      }
    }
    switch(edits[i]){
      case LEAVE:
        n++;
        m++;
        break;
      case ADD:
        step.add++;
        m++;
        break;
      case DELELE:
        step.removed.push(arr1[n])
        n++;
        break;
      case UPDATE:
        step.add++;
        step.removed.push(arr1[n])
        n++;
        m++;
        break;
    }
  }
  if(step.index != null){
    steps.push(step)
  }
  return steps
}
module.exports = whole;
},{}],16:[function(require,module,exports){
// some nested  operation in ast 
// --------------------------------

var dom = require("../dom.js");
var animate = require("./animate.js");

var combine = module.exports = {

  // get the initial dom in object
  node: function(item){
    var children,node, nodes;
    if(!item) return;
    if(item.element) return item.element;
    if(typeof item.node === "function") return item.node();
    if(typeof item.nodeType === "number") return item;
    if(item.group) return combine.node(item.group)
    if(children = item.children){
      if(children.length === 1){
        return combine.node(children[0]);
      }
      nodes = [];
      for(var i = 0, len = children.length; i < len; i++ ){
        node = combine.node(children[i]);
        if(Array.isArray(node)){
          nodes.push.apply(nodes, node)
        }else if(node) {
          nodes.push(node)
        }
      }
      return nodes;
    }
  },
  // @TODO remove _gragContainer
  inject: function(node, pos ){
    var group = this;
    var fragment = combine.node(group.group || group);
    if(node === false) {
      animate.remove(fragment)
      return group;
    }else{
      if(!fragment) return group;
      if(typeof node === 'string') node = dom.find(node);
      if(!node) throw Error('injected node is not found');
      // use animate to animate firstchildren
      animate.inject(fragment, node, pos);
    }
    // if it is a component
    if(group.$emit) {
      group.$emit("$inject", node, pos);
      group.parentNode = (pos ==='after' || pos === 'before')? node.parentNode : node;
    }
    return group;
  },

  // get the last dom in object(for insertion operation)
  last: function(item){
    var children = item.children;

    if(typeof item.last === "function") return item.last();
    if(typeof item.nodeType === "number") return item;

    if(children && children.length) return combine.last(children[children.length - 1]);
    if(item.group) return combine.last(item.group);

  },

  destroy: function(item, first){
    if(!item) return;
    if(Array.isArray(item)){
      for(var i = 0, len = item.length; i < len; i++ ){
        combine.destroy(item[i], first);
      }
    }
    var children = item.children;
    if(typeof item.destroy === "function") return item.destroy(first);
    if(typeof item.nodeType === "number" && first)  dom.remove(item);
    if(children && children.length){
      combine.destroy(children, true);
      item.children = null;
    }
  }

}
},{"../dom.js":11,"./animate.js":14}],17:[function(require,module,exports){
// http://stackoverflow.com/questions/1354064/how-to-convert-characters-to-html-entities-using-plain-javascript
var entities = {
  'quot':34, 
  'amp':38, 
  'apos':39, 
  'lt':60, 
  'gt':62, 
  'nbsp':160, 
  'iexcl':161, 
  'cent':162, 
  'pound':163, 
  'curren':164, 
  'yen':165, 
  'brvbar':166, 
  'sect':167, 
  'uml':168, 
  'copy':169, 
  'ordf':170, 
  'laquo':171, 
  'not':172, 
  'shy':173, 
  'reg':174, 
  'macr':175, 
  'deg':176, 
  'plusmn':177, 
  'sup2':178, 
  'sup3':179, 
  'acute':180, 
  'micro':181, 
  'para':182, 
  'middot':183, 
  'cedil':184, 
  'sup1':185, 
  'ordm':186, 
  'raquo':187, 
  'frac14':188, 
  'frac12':189, 
  'frac34':190, 
  'iquest':191, 
  'Agrave':192, 
  'Aacute':193, 
  'Acirc':194, 
  'Atilde':195, 
  'Auml':196, 
  'Aring':197, 
  'AElig':198, 
  'Ccedil':199, 
  'Egrave':200, 
  'Eacute':201, 
  'Ecirc':202, 
  'Euml':203, 
  'Igrave':204, 
  'Iacute':205, 
  'Icirc':206, 
  'Iuml':207, 
  'ETH':208, 
  'Ntilde':209, 
  'Ograve':210, 
  'Oacute':211, 
  'Ocirc':212, 
  'Otilde':213, 
  'Ouml':214, 
  'times':215, 
  'Oslash':216, 
  'Ugrave':217, 
  'Uacute':218, 
  'Ucirc':219, 
  'Uuml':220, 
  'Yacute':221, 
  'THORN':222, 
  'szlig':223, 
  'agrave':224, 
  'aacute':225, 
  'acirc':226, 
  'atilde':227, 
  'auml':228, 
  'aring':229, 
  'aelig':230, 
  'ccedil':231, 
  'egrave':232, 
  'eacute':233, 
  'ecirc':234, 
  'euml':235, 
  'igrave':236, 
  'iacute':237, 
  'icirc':238, 
  'iuml':239, 
  'eth':240, 
  'ntilde':241, 
  'ograve':242, 
  'oacute':243, 
  'ocirc':244, 
  'otilde':245, 
  'ouml':246, 
  'divide':247, 
  'oslash':248, 
  'ugrave':249, 
  'uacute':250, 
  'ucirc':251, 
  'uuml':252, 
  'yacute':253, 
  'thorn':254, 
  'yuml':255, 
  'fnof':402, 
  'Alpha':913, 
  'Beta':914, 
  'Gamma':915, 
  'Delta':916, 
  'Epsilon':917, 
  'Zeta':918, 
  'Eta':919, 
  'Theta':920, 
  'Iota':921, 
  'Kappa':922, 
  'Lambda':923, 
  'Mu':924, 
  'Nu':925, 
  'Xi':926, 
  'Omicron':927, 
  'Pi':928, 
  'Rho':929, 
  'Sigma':931, 
  'Tau':932, 
  'Upsilon':933, 
  'Phi':934, 
  'Chi':935, 
  'Psi':936, 
  'Omega':937, 
  'alpha':945, 
  'beta':946, 
  'gamma':947, 
  'delta':948, 
  'epsilon':949, 
  'zeta':950, 
  'eta':951, 
  'theta':952, 
  'iota':953, 
  'kappa':954, 
  'lambda':955, 
  'mu':956, 
  'nu':957, 
  'xi':958, 
  'omicron':959, 
  'pi':960, 
  'rho':961, 
  'sigmaf':962, 
  'sigma':963, 
  'tau':964, 
  'upsilon':965, 
  'phi':966, 
  'chi':967, 
  'psi':968, 
  'omega':969, 
  'thetasym':977, 
  'upsih':978, 
  'piv':982, 
  'bull':8226, 
  'hellip':8230, 
  'prime':8242, 
  'Prime':8243, 
  'oline':8254, 
  'frasl':8260, 
  'weierp':8472, 
  'image':8465, 
  'real':8476, 
  'trade':8482, 
  'alefsym':8501, 
  'larr':8592, 
  'uarr':8593, 
  'rarr':8594, 
  'darr':8595, 
  'harr':8596, 
  'crarr':8629, 
  'lArr':8656, 
  'uArr':8657, 
  'rArr':8658, 
  'dArr':8659, 
  'hArr':8660, 
  'forall':8704, 
  'part':8706, 
  'exist':8707, 
  'empty':8709, 
  'nabla':8711, 
  'isin':8712, 
  'notin':8713, 
  'ni':8715, 
  'prod':8719, 
  'sum':8721, 
  'minus':8722, 
  'lowast':8727, 
  'radic':8730, 
  'prop':8733, 
  'infin':8734, 
  'ang':8736, 
  'and':8743, 
  'or':8744, 
  'cap':8745, 
  'cup':8746, 
  'int':8747, 
  'there4':8756, 
  'sim':8764, 
  'cong':8773, 
  'asymp':8776, 
  'ne':8800, 
  'equiv':8801, 
  'le':8804, 
  'ge':8805, 
  'sub':8834, 
  'sup':8835, 
  'nsub':8836, 
  'sube':8838, 
  'supe':8839, 
  'oplus':8853, 
  'otimes':8855, 
  'perp':8869, 
  'sdot':8901, 
  'lceil':8968, 
  'rceil':8969, 
  'lfloor':8970, 
  'rfloor':8971, 
  'lang':9001, 
  'rang':9002, 
  'loz':9674, 
  'spades':9824, 
  'clubs':9827, 
  'hearts':9829, 
  'diams':9830, 
  'OElig':338, 
  'oelig':339, 
  'Scaron':352, 
  'scaron':353, 
  'Yuml':376, 
  'circ':710, 
  'tilde':732, 
  'ensp':8194, 
  'emsp':8195, 
  'thinsp':8201, 
  'zwnj':8204, 
  'zwj':8205, 
  'lrm':8206, 
  'rlm':8207, 
  'ndash':8211, 
  'mdash':8212, 
  'lsquo':8216, 
  'rsquo':8217, 
  'sbquo':8218, 
  'ldquo':8220, 
  'rdquo':8221, 
  'bdquo':8222, 
  'dagger':8224, 
  'Dagger':8225, 
  'permil':8240, 
  'lsaquo':8249, 
  'rsaquo':8250, 
  'euro':8364
}



module.exports  = entities;
},{}],18:[function(require,module,exports){
// simplest event emitter 60 lines
// ===============================
var slice = [].slice, _ = require("../util.js");
var API = {
  $on: function(event, fn) {
    if(typeof event === "object"){
      for (var i in event) {
        this.$on(i, event[i]);
      }
    }else{
      // @patch: for list
      var context = this;
      var handles = context._handles || (context._handles = {}),
        calls = handles[event] || (handles[event] = []);
      calls.push(fn);
    }
    return this;
  },
  $off: function(event, fn) {
    var context = this;
    if(!context._handles) return;
    if(!event) this._handles = {};
    var handles = context._handles,
      calls;

    if (calls = handles[event]) {
      if (!fn) {
        handles[event] = [];
        return context;
      }
      for (var i = 0, len = calls.length; i < len; i++) {
        if (fn === calls[i]) {
          calls.splice(i, 1);
          return context;
        }
      }
    }
    return context;
  },
  // bubble event
  $emit: function(event){
    // @patch: for list
    var context = this;
    var handles = context._handles, calls, args, type;
    if(!event) return;
    var args = slice.call(arguments, 1);
    var type = event;

    if(!handles) return context;
    if(calls = handles[type.slice(1)]){
      for (var j = 0, len = calls.length; j < len; j++) {
        calls[j].apply(context, args)
      }
    }
    if (!(calls = handles[type])) return context;
    for (var i = 0, len = calls.length; i < len; i++) {
      calls[i].apply(context, args)
    }
    // if(calls.length) context.$update();
    return context;
  },
  // capture  event
  $one: function(){
    
}
}
// container class
function Event() {}
_.extend(Event.prototype, API)

Event.mixTo = function(obj){
  obj = typeof obj === "function" ? obj.prototype : obj;
  _.extend(obj, API)
}
module.exports = Event;
},{"../util.js":29}],19:[function(require,module,exports){
// (c) 2010-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
// Backbone may be freely distributed under the MIT license.
// For all details and documentation:
// http://backbonejs.org

// klass: a classical JS OOP façade
// https://github.com/ded/klass
// License MIT (c) Dustin Diaz 2014
  
// inspired by backbone's extend and klass
var _ = require("../util.js"),
  fnTest = /xy/.test(function(){"xy";}) ? /\bsupr\b/:/.*/,
  isFn = function(o){return typeof o === "function"};


function wrap(k, fn, supro) {
  return function () {
    var tmp = this.supr;
    this.supr = supro[k];
    var ret = fn.apply(this, arguments);
    this.supr = tmp;
    return ret;
  }
}

function process( what, o, supro ) {
  for ( var k in o ) {
    if (o.hasOwnProperty(k)) {

      what[k] = isFn( o[k] ) && isFn( supro[k] ) && 
        fnTest.test( o[k] ) ? wrap(k, o[k], supro) : o[k];
    }
  }
}

// if the property is ["events", "data", "computed"] , we should merge them
var merged = ["events", "data", "computed"], mlen = merged.length;
module.exports = function extend(o){
  o = o || {};
  var supr = this, proto,
    supro = supr && supr.prototype || {};

  if(typeof o === 'function'){
    proto = o.prototype;
    o.implement = implement;
    o.extend = extend;
    return o;
  } 
  
  function fn() {
    supr.apply(this, arguments);
  }

  proto = _.createProto(fn, supro);

  function implement(o){
    // we need merge the merged property
    var len = mlen;
    for(;len--;){
      var prop = merged[len];
      if(o.hasOwnProperty(prop) && proto.hasOwnProperty(prop)){
        _.extend(proto[prop], o[prop], true) 
        delete o[prop];
      }
    }


    process(proto, o, supro); 
    return this;
  }



  fn.implement = implement
  fn.implement(o)
  if(supr.__after__) supr.__after__.call(fn, supr, o);
  fn.extend = extend;
  return fn;
}


},{"../util.js":29}],20:[function(require,module,exports){

var f = module.exports = {};

// json:  two way 
//  - get: JSON.stringify
//  - set: JSON.parse
//  - example: `{ title|json }`
f.json = {
  get: function( value ){
    return typeof JSON !== 'undefined'? JSON.stringify(value): value;
  },
  set: function( value ){
    return typeof JSON !== 'undefined'? JSON.parse(value) : value;
  }
}

// last: one-way
//  - get: return the last item in list
//  - example: `{ list|last }`
f.last = function(arr){
  return arr && arr[arr.length - 1];
}

// average: one-way
//  - get: copute the average of the list
//  - example: `{ list| average: "score" }`
f.average = function(array, key){
  array = array || [];
  return array.length? f.total(array, key)/ array.length : 0;
}


// total: one-way
//  - get: copute the total of the list
//  - example: `{ list| average: "score" }`
f.total = function(array, key){
  var total = 0;
  if(!array) return;
  array.forEach(function( item ){
    total += key? item[key] : item;
  })
  return total;
}

// var basicSortFn = function(a, b){return b - a}

// f.sort = function(array, key, reverse){
//   var type = typeof key, sortFn; 
//   switch(type){
//     case 'function': sortFn = key; break;
//     case 'string': sortFn = function(a, b){};break;
//     default:
//       sortFn = basicSortFn;
//   }
//   // need other refernce.
//   return array.slice().sort(function(a,b){
//     return reverse? -sortFn(a, b): sortFn(a, b);
//   })
//   return array
// }



},{}],21:[function(require,module,exports){
var exprCache = require('../env').exprCache;
var _ = require("../util");
var Parser = require("../parser/Parser.js");
module.exports = {
  expression: function(expr, simple){
    // @TODO cache
    if( typeof expr === 'string' && ( expr = expr.trim() ) ){
      expr = exprCache.get( expr ) || exprCache.set( expr, new Parser( expr, { mode: 2, expression: true } ).expression() )
    }
    if(expr) return expr;
  },
  parse: function(template){
    return new Parser(template).parse();
  }
}


},{"../env":12,"../parser/Parser.js":27,"../util":29}],22:[function(require,module,exports){
// shim for es5
var slice = [].slice;
var tstr = ({}).toString;

function extend(o1, o2 ){
  for(var i in o2) if( o1[i] === undefined){
    o1[i] = o2[i]
  }
  return o2;
}

module.exports = function(){
  // String proto ;
  extend(String.prototype, {
    trim: function(){
      return this.replace(/^\s+|\s+$/g, '');
    }
  });


  // Array proto;
  extend(Array.prototype, {
    indexOf: function(obj, from){
      from = from || 0;
      for (var i = from, len = this.length; i < len; i++) {
        if (this[i] === obj) return i;
      }
      return -1;
    },
    forEach: function(callback, context){
      for (var i = 0, len = this.length; i < len; i++) {
        callback.call(context, this[i], i, this);
      }
    },
    filter: function(callback, context){
      var res = [];
      for (var i = 0, length = this.length; i < length; i++) {
        var pass = callback.call(context, this[i], i, this);
        if(pass) res.push(this[i]);
      }
      return res;
    },
    map: function(callback, context){
      var res = [];
      for (var i = 0, length = this.length; i < length; i++) {
        res.push(callback.call(context, this[i], i, this));
      }
      return res;
    }
  });

  // Function proto;
  extend(Function.prototype, {
    bind: function(context){
      var fn = this;
      var preArgs = slice.call(arguments, 1);
      return function(){
        var args = preArgs.concat(slice.call(arguments));
        return fn.apply(context, args);
      }
    }
  })
  
  // Array
  extend(Array, {
    isArray: function(arr){
      return tstr.call(arr) === "[object Array]";
    }
  })
}


},{}],23:[function(require,module,exports){
var _ = require('../util.js');
var parseExpression = require('./parse.js').expression;
var diffArray = require('./arrayDiff.js');

function Watcher(){}

var methods = {
  $watch: function(expr, fn, options){
    var get, once, test, rlen, extra = this.__ext__; //records length
    if(!this._watchers) this._watchers = [];

    options = options || {};
    if(options === true){
       options = { deep: true }
    }
    var uid = _.uid('w_');
    if(Array.isArray(expr)){
      var tests = [];
      for(var i = 0,len = expr.length; i < len; i++){
          tests.push(this.$expression(expr[i]).get)
      }
      var prev = [];
      test = function(context){
        var equal = true;
        for(var i =0, len = tests.length; i < len; i++){
          var splice = tests[i](context, extra);
          if(!_.equals(splice, prev[i])){
             equal = false;
             prev[i] = _.clone(splice);
          }
        }
        return equal? false: prev;
      }
    }else{
      if(typeof expr === 'function'){
        get = expr.bind(this);      
      }else{
        expr = this._touchExpr( parseExpression(expr) );
        get = expr.get;
        once = expr.once;
      }
    }

    var watcher = {
      id: uid, 
      get: get, 
      fn: fn, 
      once: once, 
      force: options.force,
      // don't use ld to resolve array diff
      notld: options.indexTrack,
      test: test,
      deep: options.deep,
      last: options.sync? get(this): options.last
    }
    
    this._watchers.push( watcher );

    rlen = this._records && this._records.length;
    if(rlen) this._records[rlen-1].push(uid)
    // init state.
    if(options.init === true){
      var prephase = this.$phase;
      this.$phase = 'digest';
      this._checkSingleWatch( watcher, this._watchers.length-1 );
      this.$phase = prephase;
    }
    return watcher;
  },
  $unwatch: function(uid){
    uid = uid.uid || uid;
    if(!this._watchers) this._watchers = [];
    if(Array.isArray(uid)){
      for(var i =0, len = uid.length; i < len; i++){
        this.$unwatch(uid[i]);
      }
    }else{
      var watchers = this._watchers, watcher, wlen;
      if(!uid || !watchers || !(wlen = watchers.length)) return;
      for(;wlen--;){
        watcher = watchers[wlen];
        if(watcher && watcher.id === uid ){
          watchers.splice(wlen, 1);
        }
      }
    }
  },
  $expression: function(value){
    return this._touchExpr(parseExpression(value))
  },
  /**
   * the whole digest loop ,just like angular, it just a dirty-check loop;
   * @param  {String} path  now regular process a pure dirty-check loop, but in parse phase, 
   *                  Regular's parser extract the dependencies, in future maybe it will change to dirty-check combine with path-aware update;
   * @return {Void}   
   */

  $digest: function(){
    if(this.$phase === 'digest' || this._mute) return;
    this.$phase = 'digest';
    var dirty = false, n =0;
    while(dirty = this._digest()){

      if((++n) > 20){ // max loop
        throw Error('there may a circular dependencies reaches')
      }
    }
    if( n > 0 && this.$emit) this.$emit("$update");
    this.$phase = null;
  },
  // private digest logic
  _digest: function(){
    // if(this.context) return this.context.$digest();
    // if(this.$emit) this.$emit('digest');
    var watchers = this._watchers;
    var dirty = false, children, watcher, watcherDirty;
    if(watchers && watchers.length){
      for(var i = 0, len = watchers.length;i < len; i++){
        watcher = watchers[i];
        watcherDirty = this._checkSingleWatch(watcher, i);
        if(watcherDirty) dirty = true;
      }
    }
    // check children's dirty.
    children = this._children;
    if(children && children.length){
      for(var m = 0, mlen = children.length; m < mlen; m++){
        if(children[m] && children[m]._digest()) dirty = true;
      }
    }
    return dirty;
  },
  // check a single one watcher 
  _checkSingleWatch: function(watcher, i){
    var dirty = false;
    if(!watcher) return;

    var now, last, tlast, tnow,  eq, diff;

    if(!watcher.test){

      now = watcher.get(this);
      last = watcher.last;
      tlast = _.typeOf(last);
      tnow = _.typeOf(now);
      eq = true, diff;

      // !Object
      if( !(tnow === 'object' && tlast==='object' && watcher.deep) ){
        // Array
        if( tnow === 'array' && ( tlast=='undefined' || tlast === 'array') ){
          diff = diffArray(now, watcher.last || [], watcher.notld)
          if( tlast !== 'array' || diff === true || diff.length ) dirty = true;
        }else{
          eq = _.equals( now, last );
          if( !eq || watcher.force ){
            watcher.force = null;
            dirty = true; 
          }
        }
      }else{
        for(var j in now){
          if(last[j] !== now[j]){
            dirty = true;
            break;
          }
        }
        if(dirty !== true){
          for(var n in last){
            if(last[n] !== now[n]){
              dirty = true;
              break;
            }
          }
        }
      }
    } else{
      // @TODO 是否把多重改掉
      var result = watcher.test(this);
      if(result){
        dirty = true;
        watcher.fn.apply(this, result)
      }
    }
    if(dirty && !watcher.test){
      if(tnow === 'object' && watcher.deep || tnow === 'array'){
        watcher.last = _.clone(now);
      }else{
        watcher.last = now;
      }
      watcher.fn.call(this, now, last, diff)
      if(watcher.once) this._watchers.splice(i, 1);
    }

    return dirty;
  },

  /**
   * **tips**: whatever param you passed in $update, after the function called, dirty-check(digest) phase will enter;
   * 
   * @param  {Function|String|Expression} path  
   * @param  {Whatever} value optional, when path is Function, the value is ignored
   * @return {this}     this 
   */
  $set: function(path, value){
    if(path != null){
      var type = _.typeOf(path);
      if( type === 'string' || path.type === 'expression' ){
        path = this.$expression(path);
        path.set(this, value);
      }else if(type === 'function'){
        path.call(this, this.data);
      }else{
        for(var i in path) {
          this.$set(i, path[i])
        }
      }
    }
  },
  // 1. expr canbe string or a Expression
  // 2. detect: if true, if expr is a string will directly return;
  $get: function(expr, detect)  {
    if(detect && typeof expr === 'string') return expr;
    return this.$expression(expr).get(this);
  },
  $update: function(){
    this.$set.apply(this, arguments);
    var rootParent = this;

    do{
      if(rootParent.data.isolate || !rootParent.$parent) break;
      rootParent = rootParent.$parent;
    } while(rootParent)

    rootParent.$digest();
  },
  // auto collect watchers for logic-control.
  _record: function(){
    if(!this._records) this._records = [];
    this._records.push([]);
  },
  _release: function(){
    return this._records.pop();
  }
}


_.extend(Watcher.prototype, methods)


Watcher.mixTo = function(obj){
  obj = typeof obj === "function" ? obj.prototype : obj;
  return _.extend(obj, methods)
}

module.exports = Watcher;
},{"../util.js":29,"./arrayDiff.js":15,"./parse.js":21}],24:[function(require,module,exports){
var env =  require("./env.js");
var config = require("./config"); 
var Regular = module.exports = require("./Regular.js");
var Parser = Regular.Parser;
var Lexer = Regular.Lexer;

if(env.browser){
    require("./directive/base.js");
    require("./directive/animation.js");
    require("./module/timeout.js");
    Regular.dom = require("./dom.js");
}
Regular.env = env;
Regular.util = require("./util.js");
Regular.parse = function(str, options){
  options = options || {};

  if(options.BEGIN || options.END){
    if(options.BEGIN) config.BEGIN = options.BEGIN;
    if(options.END) config.END = options.END;
    Lexer.setup();
  }
  var ast = new Parser(str).parse();
  return !options.stringify? ast : JSON.stringify(ast);
}


},{"./Regular.js":4,"./config":5,"./directive/animation.js":7,"./directive/base.js":8,"./dom.js":11,"./env.js":12,"./module/timeout.js":25,"./util.js":29}],25:[function(require,module,exports){
var Regular = require("../Regular.js");

/**
 * Timeout Module
 * @param {Component} Component 
 */
function TimeoutModule(Component){

  Component.implement({
    /**
     * just like setTimeout, but will enter digest automately
     * @param  {Function} fn    
     * @param  {Number}   delay 
     * @return {Number}   timeoutid
     */
    $timeout: function(fn, delay){
      delay = delay || 0;
      return setTimeout(function(){
        fn.call(this);
        this.$update(); //enter digest
      }.bind(this), delay);
    },
    /**
     * just like setInterval, but will enter digest automately
     * @param  {Function} fn    
     * @param  {Number}   interval 
     * @return {Number}   intervalid
     */
    $interval: function(fn, interval){
      interval = interval || 1000/60;
      return setInterval(function(){
        fn.call(this);
        this.$update(); //enter digest
      }.bind(this), interval);
    }
  });
}


Regular.plugin('timeout', TimeoutModule);
Regular.plugin('$timeout', TimeoutModule);
},{"../Regular.js":4}],26:[function(require,module,exports){
var _ = require("../util.js");
var config = require("../config.js");

// some custom tag  will conflict with the Lexer progress
var conflictTag = {"}": "{", "]": "["}, map1, map2;
// some macro for lexer
var macro = {
  'NAME': /(?:[:_A-Za-z][-\.:_0-9A-Za-z]*)/,
  'IDENT': /[\$_A-Za-z][_0-9A-Za-z\$]*/,
  'SPACE': /[\r\n\f ]/
}


var test = /a|(b)/.exec("a");
var testSubCapure = test && test[1] === undefined? 
  function(str){ return str !== undefined }
  :function(str){return !!str};

function wrapHander(handler){
  return function(all){
    return {type: handler, value: all }
  }
}

function Lexer(input, opts){
  if(conflictTag[config.END]){
    this.markStart = conflictTag[config.END];
    this.markEnd = config.END;
  }

  this.input = (input||"").trim();
  this.opts = opts || {};
  this.map = this.opts.mode !== 2?  map1: map2;
  this.states = ["INIT"];
  if(opts && opts.expression){
     this.states.push("JST");
     this.expression = true;
  }
}

var lo = Lexer.prototype


lo.lex = function(str){
  str = (str || this.input).trim();
  var tokens = [], split, test,mlen, token, state;
  this.input = str, 
  this.marks = 0;
  // init the pos index
  this.index=0;
  var i = 0;
  while(str){
    i++
    state = this.state();
    split = this.map[state] 
    test = split.TRUNK.exec(str);
    if(!test){
      this.error('Unrecoginized Token');
    }
    mlen = test[0].length;
    str = str.slice(mlen)
    token = this._process.call(this, test, split, str)
    if(token) tokens.push(token)
    this.index += mlen;
    // if(state == 'TAG' || state == 'JST') str = this.skipspace(str);
  }

  tokens.push({type: 'EOF'});

  return tokens;
}

lo.error = function(msg){
  throw  Error("Parse Error: " + msg +  ':\n' + _.trackErrorPos(this.input, this.index));
}

lo._process = function(args, split,str){
  // console.log(args.join(","), this.state())
  var links = split.links, marched = false, token;

  for(var len = links.length, i=0;i<len ;i++){
    var link = links[i],
      handler = link[2],
      index = link[0];
    // if(args[6] === '>' && index === 6) console.log('haha')
    if(testSubCapure(args[index])) {
      marched = true;
      if(handler){
        token = handler.apply(this, args.slice(index, index + link[1]))
        if(token)  token.pos = this.index;
      }
      break;
    }
  }
  if(!marched){ // in ie lt8 . sub capture is "" but ont 
    switch(str.charAt(0)){
      case "<":
        this.enter("TAG");
        break;
      default:
        this.enter("JST");
        break;
    }
  }
  return token;
}
lo.enter = function(state){
  this.states.push(state)
  return this;
}

lo.state = function(){
  var states = this.states;
  return states[states.length-1];
}

lo.leave = function(state){
  var states = this.states;
  if(!state || states[states.length-1] === state) states.pop()
}


Lexer.setup = function(){
  macro.END = config.END;
  macro.BEGIN = config.BEGIN;
  //
  map1 = genMap([
    // INIT
    rules.ENTER_JST,
    rules.ENTER_TAG,
    rules.TEXT,

    //TAG
    rules.TAG_NAME,
    rules.TAG_OPEN,
    rules.TAG_CLOSE,
    rules.TAG_PUNCHOR,
    rules.TAG_ENTER_JST,
    rules.TAG_UNQ_VALUE,
    rules.TAG_STRING,
    rules.TAG_SPACE,
    rules.TAG_COMMENT,

    // JST
    rules.JST_OPEN,
    rules.JST_CLOSE,
    rules.JST_COMMENT,
    rules.JST_EXPR_OPEN,
    rules.JST_IDENT,
    rules.JST_SPACE,
    rules.JST_LEAVE,
    rules.JST_NUMBER,
    rules.JST_PUNCHOR,
    rules.JST_STRING,
    rules.JST_COMMENT
    ])

  // ignored the tag-relative token
  map2 = genMap([
    // INIT no < restrict
    rules.ENTER_JST2,
    rules.TEXT,
    // JST
    rules.JST_COMMENT,
    rules.JST_OPEN,
    rules.JST_CLOSE,
    rules.JST_EXPR_OPEN,
    rules.JST_IDENT,
    rules.JST_SPACE,
    rules.JST_LEAVE,
    rules.JST_NUMBER,
    rules.JST_PUNCHOR,
    rules.JST_STRING,
    rules.JST_COMMENT
    ])
}


function genMap(rules){
  var rule, map = {}, sign;
  for(var i = 0, len = rules.length; i < len ; i++){
    rule = rules[i];
    sign = rule[2] || 'INIT';
    ( map[sign] || (map[sign] = {rules:[], links:[]}) ).rules.push(rule);
  }
  return setup(map);
}

function setup(map){
  var split, rules, trunks, handler, reg, retain, rule;
  function replaceFn(all, one){
    return typeof macro[one] === 'string'? 
      _.escapeRegExp(macro[one]) 
      : String(macro[one]).slice(1,-1);
  }

  for(var i in map){

    split = map[i];
    split.curIndex = 1;
    rules = split.rules;
    trunks = [];

    for(var j = 0,len = rules.length; j<len; j++){
      rule = rules[j]; 
      reg = rule[0];
      handler = rule[1];

      if(typeof handler === 'string'){
        handler = wrapHander(handler);
      }
      if(_.typeOf(reg) === 'regexp') reg = reg.toString().slice(1, -1);

      reg = reg.replace(/\{(\w+)\}/g, replaceFn)
      retain = _.findSubCapture(reg) + 1; 
      split.links.push([split.curIndex, retain, handler]); 
      split.curIndex += retain;
      trunks.push(reg);
    }
    split.TRUNK = new RegExp("^(?:(" + trunks.join(")|(") + "))")
  }
  return map;
}

var rules = {

  // 1. INIT
  // ---------------

  // mode1's JST ENTER RULE
  ENTER_JST: [/[^\x00<]*?(?={BEGIN})/, function(all){
    this.enter('JST');
    if(all) return {type: 'TEXT', value: all}
  }],

  // mode2's JST ENTER RULE
  ENTER_JST2: [/[^\x00]*?(?={BEGIN})/, function(all){
    this.enter('JST');
    if(all) return {type: 'TEXT', value: all}
  }],

  ENTER_TAG: [/[^\x00<>]*?(?=<)/, function(all){ 
    this.enter('TAG');
    if(all) return {type: 'TEXT', value: all}
  }],

  TEXT: [/[^\x00]+/, 'TEXT'],

  // 2. TAG
  // --------------------
  TAG_NAME: [/{NAME}/, 'NAME', 'TAG'],
  TAG_UNQ_VALUE: [/[^\{}&"'=><`\r\n\f ]+/, 'UNQ', 'TAG'],

  TAG_OPEN: [/<({NAME})\s*/, function(all, one){ //"
    return {type: 'TAG_OPEN', value: one}
  }, 'TAG'],
  TAG_CLOSE: [/<\/({NAME})[\r\n\f ]*>/, function(all, one){
    this.leave();
    return {type: 'TAG_CLOSE', value: one }
  }, 'TAG'],

    // mode2's JST ENTER RULE
  TAG_ENTER_JST: [/(?={BEGIN})/, function(){
    this.enter('JST');
  }, 'TAG'],


  TAG_PUNCHOR: [/[\>\/=&]/, function(all){
    if(all === '>') this.leave();
    return {type: all, value: all }
  }, 'TAG'],
  TAG_STRING:  [ /'([^']*)'|"([^"]*)\"/, /*'*/  function(all, one, two){ 
    var value = one || two || "";

    return {type: 'STRING', value: value}
  }, 'TAG'],

  TAG_SPACE: [/{SPACE}+/, null, 'TAG'],
  TAG_COMMENT: [/<\!--([^\x00]*?)--\>/, function(all){
    this.leave()
    // this.leave('TAG')
  } ,'TAG'],

  // 3. JST
  // -------------------

  JST_OPEN: ['{BEGIN}#{SPACE}*({IDENT})', function(all, name){
    return {
      type: 'OPEN',
      value: name
    }
  }, 'JST'],
  JST_LEAVE: [/{END}/, function(all){
    if(this.markEnd === all && this.expression) return {type: this.markEnd, value: this.markEnd};
    if(!this.markEnd || !this.marks ){
      this.firstEnterStart = false;
      this.leave('JST');
      return {type: 'END'}
    }else{
      this.marks--;
      return {type: this.markEnd, value: this.markEnd}
    }
  }, 'JST'],
  JST_CLOSE: [/{BEGIN}\s*\/({IDENT})\s*{END}/, function(all, one){
    this.leave('JST');
    return {
      type: 'CLOSE',
      value: one
    }
  }, 'JST'],
  JST_COMMENT: [/{BEGIN}\!([^\x00]*?)\!{END}/, function(){
    this.leave();
  }, 'JST'],
  JST_EXPR_OPEN: ['{BEGIN}',function(all, one){
    if(all === this.markStart){
      if(this.expression) return { type: this.markStart, value: this.markStart };
      if(this.firstEnterStart || this.marks){
        this.marks++
        this.firstEnterStart = false;
        return { type: this.markStart, value: this.markStart };
      }else{
        this.firstEnterStart = true;
      }
    }
    return {
      type: 'EXPR_OPEN',
      escape: false
    }

  }, 'JST'],
  JST_IDENT: ['{IDENT}', 'IDENT', 'JST'],
  JST_SPACE: [/[ \r\n\f]+/, null, 'JST'],
  JST_PUNCHOR: [/[=!]?==|[-=><+*\/%\!]?\=|\|\||&&|\@\(|\.\.|[<\>\[\]\(\)\-\|\{}\+\*\/%?:\.!,]/, function(all){
    return { type: all, value: all }
  },'JST'],

  JST_STRING:  [ /'([^']*)'|"([^"]*)"/, function(all, one, two){ //"'
    return {type: 'STRING', value: one || two || ""}
  }, 'JST'],
  JST_NUMBER: [/(?:[0-9]*\.[0-9]+|[0-9]+)(e\d+)?/, function(all){
    return {type: 'NUMBER', value: parseFloat(all, 10)};
  }, 'JST']
}


// setup when first config
Lexer.setup();



module.exports = Lexer;

},{"../config.js":5,"../util.js":29}],27:[function(require,module,exports){
var _ = require("../util.js");

var config = require("../config.js");
var node = require("./node.js");
var Lexer = require("./Lexer.js");
var varName = _.varName;
var ctxName = _.ctxName;
var extName = _.extName;
var isPath = _.makePredicate("STRING IDENT NUMBER");
var isKeyWord = _.makePredicate("true false undefined null this Array Date JSON Math NaN RegExp decodeURI decodeURIComponent encodeURI encodeURIComponent parseFloat parseInt Object");




function Parser(input, opts){
  opts = opts || {};

  this.input = input;
  this.tokens = new Lexer(input, opts).lex();
  this.pos = 0;
  this.length = this.tokens.length;
}


var op = Parser.prototype;


op.parse = function(){
  this.pos = 0;
  var res= this.program();
  if(this.ll().type === 'TAG_CLOSE'){
    this.error("You may got a unclosed Tag")
  }
  return res;
}

op.ll =  function(k){
  k = k || 1;
  if(k < 0) k = k + 1;
  var pos = this.pos + k - 1;
  if(pos > this.length - 1){
      return this.tokens[this.length-1];
  }
  return this.tokens[pos];
}
  // lookahead
op.la = function(k){
  return (this.ll(k) || '').type;
}

op.match = function(type, value){
  var ll;
  if(!(ll = this.eat(type, value))){
    ll  = this.ll();
    this.error('expect [' + type + (value == null? '':':'+ value) + ']" -> got "[' + ll.type + (value==null? '':':'+ll.value) + ']', ll.pos)
  }else{
    return ll;
  }
}

op.error = function(msg, pos){
  msg =  "\n【 parse failed 】 " + msg +  ':\n\n' + _.trackErrorPos(this.input, typeof pos === 'number'? pos: this.ll().pos||0);
  throw new Error(msg);
}

op.next = function(k){
  k = k || 1;
  this.pos += k;
}
op.eat = function(type, value){
  var ll = this.ll();
  if(typeof type !== 'string'){
    for(var len = type.length ; len--;){
      if(ll.type === type[len]) {
        this.next();
        return ll;
      }
    }
  }else{
    if( ll.type === type && (typeof value === 'undefined' || ll.value === value) ){
       this.next();
       return ll;
    }
  }
  return false;
}

// program
//  :EOF
//  | (statement)* EOF
op.program = function(){
  var statements = [],  ll = this.ll();
  while(ll.type !== 'EOF' && ll.type !=='TAG_CLOSE'){

    statements.push(this.statement());
    ll = this.ll();
  }
  // if(ll.type === 'TAG_CLOSE') this.error("You may have unmatched Tag")
  return statements;
}

// statement
//  : xml
//  | jst
//  | text
op.statement = function(){
  var ll = this.ll();
  switch(ll.type){
    case 'NAME':
    case 'TEXT':
      var text = ll.value;
      this.next();
      while(ll = this.eat(['NAME', 'TEXT'])){
        text += ll.value;
      }
      return node.text(text);
    case 'TAG_OPEN':
      return this.xml();
    case 'OPEN': 
      return this.directive();
    case 'EXPR_OPEN':
      return this.interplation();
    default:
      this.error('Unexpected token: '+ this.la())
  }
}

// xml 
// stag statement* TAG_CLOSE?(if self-closed tag)
op.xml = function(){
  var name, attrs, children, selfClosed;
  name = this.match('TAG_OPEN').value;
  attrs = this.attrs();
  selfClosed = this.eat('/')
  this.match('>');
  if( !selfClosed && !_.isVoidTag(name) ){
    children = this.program();
    if(!this.eat('TAG_CLOSE', name)) this.error('expect </'+name+'> got'+ 'no matched closeTag')
  }
  return node.element(name, attrs, children);
}

// xentity
//  -rule(wrap attribute)
//  -attribute
//
// __example__
//  name = 1 |  
//  ng-hide |
//  on-click={{}} | 
//  {{#if name}}on-click={{xx}}{{#else}}on-tap={{}}{{/if}}

op.xentity = function(ll){
  var name = ll.value, value, modifier;
  if(ll.type === 'NAME'){
    //@ only for test
    if(~name.indexOf('.')){
      var tmp = name.split('.');
      name = tmp[0];
      modifier = tmp[1]

    }
    if( this.eat("=") ) value = this.attvalue(modifier);
    return node.attribute( name, value, modifier );
  }else{
    if( name !== 'if') this.error("current version. ONLY RULE #if #else #elseif is valid in tag, the rule #" + name + ' is invalid');
    return this['if'](true);
  }

}

// stag     ::=    '<' Name (S attr)* S? '>'  
// attr    ::=     Name Eq attvalue
op.attrs = function(isAttribute){
  var eat
  if(!isAttribute){
    eat = ["NAME", "OPEN"]
  }else{
    eat = ["NAME"]
  }

  var attrs = [], ll;
  while (ll = this.eat(eat)){
    attrs.push(this.xentity( ll ))
  }
  return attrs;
}

// attvalue
//  : STRING  
//  | NAME
op.attvalue = function(mdf){
  var ll = this.ll();
  switch(ll.type){
    case "NAME":
    case "UNQ":
    case "STRING":
      this.next();
      var value = ll.value;
      if(~value.indexOf(config.BEGIN) && ~value.indexOf(config.END) && mdf!=='cmpl'){
        var constant = true;
        var parsed = new Parser(value, { mode: 2 }).parse();
        if(parsed.length === 1 && parsed[0].type === 'expression') return parsed[0];
        var body = [];
        parsed.forEach(function(item){
          if(!item.constant) constant=false;
          // silent the mutiple inteplation
            body.push(item.body || "'" + item.text.replace(/'/g, "\\'") + "'");        
        });
        body = "[" + body.join(",") + "].join('')";
        value = node.expression(body, null, constant);
      }
      return value;
    case "EXPR_OPEN":
      return this.interplation();
    // case "OPEN":
    //   if(ll.value === 'inc' || ll.value === 'include'){
    //     this.next();
    //     return this.inc();
    //   }else{
    //     this.error('attribute value only support inteplation and {#inc} statement')
    //   }
    //   break;
    default:
      this.error('Unexpected token: '+ this.la())
  }
}


// {{#}}
op.directive = function(){
  var name = this.ll().value;
  this.next();
  if(typeof this[name] === 'function'){
    return this[name]()
  }else{
    this.error('Undefined directive['+ name +']');
  }
}


// {{}}
op.interplation = function(){
  this.match('EXPR_OPEN');
  var res = this.expression(true);
  this.match('END');
  return res;
}

// {{~}}
op.inc = op.include = function(){
  var content = this.expression();
  this.match('END');
  return node.template(content);
}

// {{#if}}
op["if"] = function(tag){
  var test = this.expression();
  var consequent = [], alternate=[];

  var container = consequent;
  var statement = !tag? "statement" : "attrs";

  this.match('END');

  var ll, close;
  while( ! (close = this.eat('CLOSE')) ){
    ll = this.ll();
    if( ll.type === 'OPEN' ){
      switch( ll.value ){
        case 'else':
          container = alternate;
          this.next();
          this.match( 'END' );
          break;
        case 'elseif':
          this.next();
          alternate.push( this["if"](tag) );
          return node['if']( test, consequent, alternate );
        default:
          container.push( this[statement](true) );
      }
    }else{
      container.push(this[statement](true));
    }
  }
  // if statement not matched
  if(close.value !== "if") this.error('Unmatched if directive')
  return node["if"](test, consequent, alternate);
}


// @mark   mustache syntax have natrure dis, canot with expression
// {{#list}}
op.list = function(){
  // sequence can be a list or hash
  var sequence = this.expression(), variable, ll, track;
  var consequent = [], alternate=[];
  var container = consequent;

  this.match('IDENT', 'as');

  variable = this.match('IDENT').value;

  if(this.eat('IDENT', 'by')){
    if(this.eat('IDENT',variable + '_index')){
      track = true;
    }else{
      track = this.expression();
      if(track.constant){
        // true is means constant, we handle it just like xxx_index.
        track = true;
      }
    }
  }

  this.match('END');

  while( !(ll = this.eat('CLOSE')) ){
    if(this.eat('OPEN', 'else')){
      container =  alternate;
      this.match('END');
    }else{
      container.push(this.statement());
    }
  }
  
  if(ll.value !== 'list') this.error('expect ' + 'list got ' + '/' + ll.value + ' ', ll.pos );
  return node.list(sequence, variable, consequent, alternate, track);
}


op.expression = function(){
  var expression;
  if(this.eat('@(')){ //once bind
    expression = this.expr();
    expression.once = true;
    this.match(')')
  }else{
    expression = this.expr();
  }
  return expression;
}

op.expr = function(){
  this.depend = [];

  var buffer = this.filter()

  var body = buffer.get || buffer;
  var setbody = buffer.set;
  return node.expression(body, setbody, !this.depend.length);
}


// filter
// assign ('|' filtername[':' args]) * 
op.filter = function(){
  var left = this.assign();
  var ll = this.eat('|');
  var buffer = [], setBuffer, prefix,
    attr = "t", 
    set = left.set, get, 
    tmp = "";

  if(ll){
    if(set) setBuffer = [];

    prefix = "(function(" + attr + "){";

    do{
      tmp = attr + " = " + ctxName + "._f_('" + this.match('IDENT').value+ "' ).get.call( "+_.ctxName +"," + attr ;
      if(this.eat(':')){
        tmp +=", "+ this.arguments("|").join(",") + ");"
      }else{
        tmp += ');'
      }
      buffer.push(tmp);
      setBuffer && setBuffer.unshift( tmp.replace(" ).get.call", " ).set.call") );

    }while(ll = this.eat('|'));
    buffer.push("return " + attr );
    setBuffer && setBuffer.push("return " + attr);

    get =  prefix + buffer.join("") + "})("+left.get+")";
    // we call back to value.
    if(setBuffer){
      // change _ss__(name, _p_) to _s__(name, filterFn(_p_));
      set = set.replace(_.setName, 
        prefix + setBuffer.join("") + "})("+　_.setName　+")" );

    }
    // the set function is depend on the filter definition. if it have set method, the set will work
    return this.getset(get, set);
  }
  return left;
}

// assign
// left-hand-expr = condition
op.assign = function(){
  var left = this.condition(), ll;
  if(ll = this.eat(['=', '+=', '-=', '*=', '/=', '%='])){
    if(!left.set) this.error('invalid lefthand expression in assignment expression');
    return this.getset( left.set.replace( "," + _.setName, "," + this.condition().get ).replace("'='", "'"+ll.type+"'"), left.set);
    // return this.getset('(' + left.get + ll.type  + this.condition().get + ')', left.set);
  }
  return left;
}

// or
// or ? assign : assign
op.condition = function(){

  var test = this.or();
  if(this.eat('?')){
    return this.getset([test.get + "?", 
      this.assign().get, 
      this.match(":").type, 
      this.assign().get].join(""));
  }

  return test;
}

// and
// and && or
op.or = function(){

  var left = this.and();

  if(this.eat('||')){
    return this.getset(left.get + '||' + this.or().get);
  }

  return left;
}
// equal
// equal && and
op.and = function(){

  var left = this.equal();

  if(this.eat('&&')){
    return this.getset(left.get + '&&' + this.and().get);
  }
  return left;
}
// relation
// 
// equal == relation
// equal != relation
// equal === relation
// equal !== relation
op.equal = function(){
  var left = this.relation(), ll;
  // @perf;
  if( ll = this.eat(['==','!=', '===', '!=='])){
    return this.getset(left.get + ll.type + this.equal().get);
  }
  return left
}
// relation < additive
// relation > additive
// relation <= additive
// relation >= additive
// relation in additive
op.relation = function(){
  var left = this.additive(), ll;
  // @perf
  if(ll = (this.eat(['<', '>', '>=', '<=']) || this.eat('IDENT', 'in') )){
    return this.getset(left.get + ll.value + this.relation().get);
  }
  return left
}
// additive :
// multive
// additive + multive
// additive - multive
op.additive = function(){
  var left = this.multive() ,ll;
  if(ll= this.eat(['+','-']) ){
    return this.getset(left.get + ll.value + this.additive().get);
  }
  return left
}
// multive :
// unary
// multive * unary
// multive / unary
// multive % unary
op.multive = function(){
  var left = this.range() ,ll;
  if( ll = this.eat(['*', '/' ,'%']) ){
    return this.getset(left.get + ll.type + this.multive().get);
  }
  return left;
}

op.range = function(){
  var left = this.unary(), ll, right;

  if(ll = this.eat('..')){
    right = this.unary();
    var body = 
      "(function(start,end){var res = [],step=end>start?1:-1; for(var i = start; end>start?i <= end: i>=end; i=i+step){res.push(i); } return res })("+left.get+","+right.get+")"
    return this.getset(body);
  }

  return left;
}



// lefthand
// + unary
// - unary
// ~ unary
// ! unary
op.unary = function(){
  var ll;
  if(ll = this.eat(['+','-','~', '!'])){
    return this.getset('(' + ll.type + this.unary().get + ')') ;
  }else{
    return this.member()
  }
}

// call[lefthand] :
// member args
// member [ expression ]
// member . ident  

op.member = function(base, last, pathes, prevBase){
  var ll, path, extValue;


  var onlySimpleAccessor = false;
  if(!base){ //first
    path = this.primary();
    var type = typeof path;
    if(type === 'string'){ 
      pathes = [];
      pathes.push( path );
      last = path;
      extValue = extName + "." + path
      base = ctxName + "._sg_('" + path + "', " + varName + ", " + extName + ")";
      onlySimpleAccessor = true;
    }else{ //Primative Type
      if(path.get === 'this'){
        base = ctxName;
        pathes = ['this'];
      }else{
        pathes = null;
        base = path.get;
      }
    }
  }else{ // not first enter
    if(typeof last === 'string' && isPath( last) ){ // is valid path
      pathes.push(last);
    }else{
      if(pathes && pathes.length) this.depend.push(pathes);
      pathes = null;
    }
  }
  if(ll = this.eat(['[', '.', '('])){
    switch(ll.type){
      case '.':
          // member(object, property, computed)
        var tmpName = this.match('IDENT').value;
        prevBase = base;
        if( this.la() !== "(" ){ 
          base = ctxName + "._sg_('" + tmpName + "', " + base + ")";
        }else{
          base += "['" + tmpName + "']";
        }
        return this.member( base, tmpName, pathes,  prevBase);
      case '[':
          // member(object, property, computed)
        path = this.assign();
        prevBase = base;
        if( this.la() !== "(" ){ 
        // means function call, we need throw undefined error when call function
        // and confirm that the function call wont lose its context
          base = ctxName + "._sg_(" + path.get + ", " + base + ")";
        }else{
          base += "[" + path.get + "]";
        }
        this.match(']')
        return this.member(base, path, pathes, prevBase);
      case '(':
        // call(callee, args)
        var args = this.arguments().join(',');
        base =  base+"(" + args +")";
        this.match(')')
        return this.member(base, null, pathes);
    }
  }
  if( pathes && pathes.length ) this.depend.push( pathes );
  var res =  {get: base};
  if(last){
    res.set = ctxName + "._ss_(" + 
        (last.get? last.get : "'"+ last + "'") + 
        ","+ _.setName + ","+ 
        (prevBase?prevBase:_.varName) + 
        ", '=', "+ ( onlySimpleAccessor? 1 : 0 ) + ")";
  
  }
  return res;
}

/**
 * 
 */
op.arguments = function(end){
  end = end || ')'
  var args = [];
  do{
    if(this.la() !== end){
      args.push(this.assign().get)
    }
  }while( this.eat(','));
  return args
}


// primary :
// this 
// ident
// literal
// array
// object
// ( expression )

op.primary = function(){
  var ll = this.ll();
  switch(ll.type){
    case "{":
      return this.object();
    case "[":
      return this.array();
    case "(":
      return this.paren();
    // literal or ident
    case 'STRING':
      this.next();
      return this.getset("'" + ll.value + "'")
    case 'NUMBER':
      this.next();
      return this.getset(""+ll.value);
    case "IDENT":
      this.next();
      if(isKeyWord(ll.value)){
        return this.getset( ll.value );
      }
      return ll.value;
    default: 
      this.error('Unexpected Token: ' + ll.type);
  }
}

// object
//  {propAssign [, propAssign] * [,]}

// propAssign
//  prop : assign

// prop
//  STRING
//  IDENT
//  NUMBER

op.object = function(){
  var code = [this.match('{').type];

  var ll = this.eat( ['STRING', 'IDENT', 'NUMBER'] );
  while(ll){
    code.push("'" + ll.value + "'" + this.match(':').type);
    var get = this.assign().get;
    code.push(get);
    ll = null;
    if(this.eat(",") && (ll = this.eat(['STRING', 'IDENT', 'NUMBER'])) ) code.push(",");
  }
  code.push(this.match('}').type);
  return {get: code.join("")}
}

// array
// [ assign[,assign]*]
op.array = function(){
  var code = [this.match('[').type], item;
  if( this.eat("]") ){

     code.push("]");
  } else {
    while(item = this.assign()){
      code.push(item.get);
      if(this.eat(',')) code.push(",");
      else break;
    }
    code.push(this.match(']').type);
  }
  return {get: code.join("")};
}

// '(' expression ')'
op.paren = function(){
  this.match('(');
  var res = this.filter()
  res.get = '(' + res.get + ')';
  this.match(')');
  return res;
}

op.getset = function(get, set){
  return {
    get: get,
    set: set
  }
}



module.exports = Parser;

},{"../config.js":5,"../util.js":29,"./Lexer.js":26,"./node.js":28}],28:[function(require,module,exports){
module.exports = {
  element: function(name, attrs, children){
    return {
      type: 'element',
      tag: name,
      attrs: attrs,
      children: children
    }
  },
  attribute: function(name, value, mdf){
    return {
      type: 'attribute',
      name: name,
      value: value,
      mdf: mdf
    }
  },
  "if": function(test, consequent, alternate){
    return {
      type: 'if',
      test: test,
      consequent: consequent,
      alternate: alternate
    }
  },
  list: function(sequence, variable, body, alternate, track){
    return {
      type: 'list',
      sequence: sequence,
      alternate: alternate,
      variable: variable,
      body: body,
      track: track
    }
  },
  expression: function( body, setbody, constant ){
    return {
      type: "expression",
      body: body,
      constant: constant || false,
      setbody: setbody || false
    }
  },
  text: function(text){
    return {
      type: "text",
      text: text
    }
  },
  template: function(template){
    return {
      type: 'template',
      content: template
    }
  }
}

},{}],29:[function(require,module,exports){
(function (global){
require('./helper/shim.js')();
var _  = module.exports;
var entities = require('./helper/entities.js');
var slice = [].slice;
var o2str = ({}).toString;
var win = typeof window !=='undefined'? window: global;


_.noop = function(){};
_.uid = (function(){
  var _uid=0;
  return function(){
    return _uid++;
  }
})();

_.extend = function( o1, o2, override ){
  // if(_.typeOf(override) === 'array'){
  //  for(var i = 0, len = override.length; i < len; i++ ){
  //   var key = override[i];
  //   o1[key] = o2[key];
  //  } 
  // }else{
  for(var i in o2){
    if( typeof o1[i] === "undefined" || override === true ){
      o1[i] = o2[i]
    }
  }
  // }
  return o1;
}

_.keys = function(obj){
  if(Object.keys) return Object.keys(obj);
  var res = [];
  for(var i in obj) if(obj.hasOwnProperty(i)){
    res.push(i);
  }
  return res;
}

_.varName = 'd';
_.setName = 'p_';
_.ctxName = 'c';
_.extName = 'e';

_.rWord = /^[\$\w]+$/;
_.rSimpleAccessor = /^[\$\w]+(\.[\$\w]+)*$/;

_.nextTick = typeof setImmediate === 'function'? 
  setImmediate.bind(win) : 
  function(callback) {
    setTimeout(callback, 0) 
  }



_.prefix = "var " + _.varName + "=" + _.ctxName + ".data;" +  _.extName  + "=" + _.extName + "||'';";


_.slice = function(obj, start, end){
  var res = [];
  for(var i = start || 0, len = end || obj.length; i < len; i++){
    var item = obj[i];
    res.push(item)
  }
  return res;
}

_.typeOf = function (o) {
  return o == null ? String(o) :o2str.call(o).slice(8, -1).toLowerCase();
}


_.makePredicate = function makePredicate(words, prefix) {
    if (typeof words === "string") {
        words = words.split(" ");
    }
    var f = "",
    cats = [];
    out: for (var i = 0; i < words.length; ++i) {
        for (var j = 0; j < cats.length; ++j){
          if (cats[j][0].length === words[i].length) {
              cats[j].push(words[i]);
              continue out;
          }
        }
        cats.push([words[i]]);
    }
    function compareTo(arr) {
        if (arr.length === 1) return f += "return str === '" + arr[0] + "';";
        f += "switch(str){";
        for (var i = 0; i < arr.length; ++i){
           f += "case '" + arr[i] + "':";
        }
        f += "return true}return false;";
    }

    // When there are more than three length categories, an outer
    // switch first dispatches on the lengths, to save on comparisons.
    if (cats.length > 3) {
        cats.sort(function(a, b) {
            return b.length - a.length;
        });
        f += "switch(str.length){";
        for (var i = 0; i < cats.length; ++i) {
            var cat = cats[i];
            f += "case " + cat[0].length + ":";
            compareTo(cat);
        }
        f += "}";

        // Otherwise, simply generate a flat `switch` statement.
    } else {
        compareTo(words);
    }
    return new Function("str", f);
}


_.trackErrorPos = (function (){
  // linebreak
  var lb = /\r\n|[\n\r\u2028\u2029]/g;
  var minRange = 20, maxRange = 20;
  function findLine(lines, pos){
    var tmpLen = 0;
    for(var i = 0,len = lines.length; i < len; i++){
      var lineLen = (lines[i] || "").length;

      if(tmpLen + lineLen > pos) {
        return {num: i, line: lines[i], start: pos - i - tmpLen , prev:lines[i-1], next: lines[i+1] };
      }
      // 1 is for the linebreak
      tmpLen = tmpLen + lineLen ;
    }
  }
  function formatLine(str,  start, num, target){
    var len = str.length;
    var min = start - minRange;
    if(min < 0) min = 0;
    var max = start + maxRange;
    if(max > len) max = len;

    var remain = str.slice(min, max);
    var prefix = "[" +(num+1) + "] " + (min > 0? ".." : "")
    var postfix = max < len ? "..": "";
    var res = prefix + remain + postfix;
    if(target) res += "\n" + new Array(start-min + prefix.length + 1).join(" ") + "^^^";
    return res;
  }
  return function(input, pos){
    if(pos > input.length-1) pos = input.length-1;
    lb.lastIndex = 0;
    var lines = input.split(lb);
    var line = findLine(lines,pos);
    var start = line.start, num = line.num;

    return (line.prev? formatLine(line.prev, start, num-1 ) + '\n': '' ) + 
      formatLine(line.line, start, num, true) + '\n' + 
      (line.next? formatLine(line.next, start, num+1 ) + '\n': '' );

  }
})();


var ignoredRef = /\((\?\!|\?\:|\?\=)/g;
_.findSubCapture = function (regStr) {
  var left = 0,
    right = 0,
    len = regStr.length,
    ignored = regStr.match(ignoredRef); // ignored uncapture
  if(ignored) ignored = ignored.length
  else ignored = 0;
  for (; len--;) {
    var letter = regStr.charAt(len);
    if (len === 0 || regStr.charAt(len - 1) !== "\\" ) { 
      if (letter === "(") left++;
      if (letter === ")") right++;
    }
  }
  if (left !== right) throw "RegExp: "+ regStr + "'s bracket is not marched";
  else return left - ignored;
};


_.escapeRegExp = function( str){// Credit: XRegExp 0.6.1 (c) 2007-2008 Steven Levithan <http://stevenlevithan.com/regex/xregexp/> MIT License
  return str.replace(/[-[\]{}()*+?.\\^$|,#\s]/g, function(match){
    return '\\' + match;
  });
};


var rEntity = new RegExp("&(" + _.keys(entities).join('|') + ');', 'gi');

_.convertEntity = function(chr){

  return ("" + chr).replace(rEntity, function(all, capture){
    return String.fromCharCode(entities[capture])
  });

}


// simple get accessor

_.createObject = function(o, props){
    function Foo() {}
    Foo.prototype = o;
    var res = new Foo;
    if(props) _.extend(res, props);
    return res;
}

_.createProto = function(fn, o){
    function Foo() { this.constructor = fn;}
    Foo.prototype = o;
    return (fn.prototype = new Foo());
}



/**
clone
*/
_.clone = function clone(obj){
    var type = _.typeOf(obj);
    if(type === 'array'){
      var cloned = [];
      for(var i=0,len = obj.length; i< len;i++){
        cloned[i] = obj[i]
      }
      return cloned;
    }
    if(type === 'object'){
      var cloned = {};
      for(var i in obj) if(obj.hasOwnProperty(i)){
        cloned[i] = obj[i];
      }
      return cloned;
    }
    return obj;
  }

_.equals = function(now, old){
  var type = typeof now;
  if(type === 'number' && typeof old === 'number'&& isNaN(now) && isNaN(old)) return true
  return now === old;
}

var dash = /-([a-z])/g;
_.camelCase = function(str){
  return str.replace(dash, function(all, capture){
    return capture.toUpperCase();
  })
}



_.throttle = function throttle(func, wait){
  var wait = wait || 100;
  var context, args, result;
  var timeout = null;
  var previous = 0;
  var later = function() {
    previous = +new Date;
    timeout = null;
    result = func.apply(context, args);
    context = args = null;
  };
  return function() {
    var now = + new Date;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      result = func.apply(context, args);
      context = args = null;
    } else if (!timeout) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};

// hogan escape
// ==============
_.escape = (function(){
  var rAmp = /&/g,
      rLt = /</g,
      rGt = />/g,
      rApos = /\'/g,
      rQuot = /\"/g,
      hChars = /[&<>\"\']/;

  return function(str) {
    return hChars.test(str) ?
      str
        .replace(rAmp, '&amp;')
        .replace(rLt, '&lt;')
        .replace(rGt, '&gt;')
        .replace(rApos, '&#39;')
        .replace(rQuot, '&quot;') :
      str;
  }
})();

_.cache = function(max){
  max = max || 1000;
  var keys = [],
      cache = {};
  return {
    set: function(key, value) {
      if (keys.length > this.max) {
        cache[keys.shift()] = undefined;
      }
      // 
      if(cache[key] === undefined){
        keys.push(key);
      }
      cache[key] = value;
      return value;
    },
    get: function(key) {
      if (key === undefined) return cache;
      return cache[key];
    },
    max: max,
    len:function(){
      return keys.length;
    }
  };
}

// // setup the raw Expression
// _.touchExpression = function(expr){
//   if(expr.type === 'expression'){
//   }
//   return expr;
// }


// handle the same logic on component's `on-*` and element's `on-*`
// return the fire object
_.handleEvent = function(value, type ){
  var self = this, evaluate;
  if(value.type === 'expression'){ // if is expression, go evaluated way
    evaluate = value.get;
  }
  if(evaluate){
    return function fire(obj){
      self.data.$event = obj;
      var res = evaluate(self);
      if(res === false && obj && obj.preventDefault) obj.preventDefault();
      self.data.$event = undefined;
      self.$update();
    }
  }else{
    return function fire(){
      var args = slice.call(arguments)      
      args.unshift(value);
      self.$emit.apply(self, args);
      self.$update();
    }
  }
}

// only call once
_.once = function(fn){
  var time = 0;
  return function(){
    if( time++ === 0) fn.apply(this, arguments);
  }
}

_.fixObjStr = function(str){
  if(str.trim().indexOf('{') !== 0){
    return '{' + str + '}';
  }
  return str;
}



_.log = function(msg, type){
  if(typeof console !== "undefined")  console[type || "log"](msg);
}




//http://www.w3.org/html/wg/drafts/html/master/single-page.html#void-elements
_.isVoidTag = _.makePredicate("area base br col embed hr img input keygen link menuitem meta param source track wbr r-content");
_.isBooleanAttr = _.makePredicate('selected checked disabled readonly required open autofocus controls autoplay compact loop defer multiple');

_.isFalse - function(){return false}
_.isTrue - function(){return true}

_.isExpr = function(expr){
  return expr && expr.type === 'expression';
}
// @TODO: make it more strict
_.isGroup = function(group){
  return group.inject || group.$inject;
}

_.getCompileFn = function(source, ctx, options){
  return ctx.$compile.bind(ctx,source, options)
}



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./helper/entities.js":17,"./helper/shim.js":22}],30:[function(require,module,exports){
var diffArray = require('./helper/arrayDiff.js');
var combine = require('./helper/combine.js');
var animate = require("./helper/animate.js");
var node = require("./parser/node.js");
var Group = require('./group.js');
var dom = require("./dom.js");
var _ = require('./util');


var walkers = module.exports = {};

walkers.list = function(ast, options){

  var Regular = walkers.Regular;  
  var placeholder = document.createComment("Regular list"),
    namespace = options.namespace,
    extra = options.extra;
  var self = this;
  var group = new Group([placeholder]);
  var indexName = ast.variable + '_index';
  var variable = ast.variable;
  var alternate = ast.alternate;
  var track = ast.track, keyOf, extraObj;
  if( track && track !== true ){
    track = this._touchExpr(track);
    extraObj = _.createObject(extra);
    keyOf = function( item, index ){
      extraObj[ variable ] = item;
      extraObj[ indexName ] = index;
      return track.get( self, extraObj );
    }
  }
  function removeRange(index, rlen){
    for(var j = 0; j< rlen; j++){ //removed
      var removed = group.children.splice( index + 1, 1)[0];
      removed.destroy(true);
    }
  }
  function addRange(index, end, newValue){
    for(var o = index; o < end; o++){ //add
      // prototype inherit
      var item = newValue[o];
      var data = {};
      data[indexName] = o;
      data[variable] = item;

      data = _.createObject(extra, data);
      var section = self.$compile(ast.body, {
        extra: data,
        namespace:namespace,
        record: true,
        outer: options.outer
      })
      section.data = data;
      // autolink
      var insert =  combine.last(group.get(o));
      if(insert.parentNode){
        animate.inject(combine.node(section),insert, 'after');
      }
      // insert.parentNode.insertBefore(combine.node(section), insert.nextSibling);
      group.children.splice( o + 1 , 0, section);
    }
  }

  function updateRange(start, end, newValue){
    for(var k = start; k < end; k++){ // no change
      var sect = group.get( k + 1 );
      sect.data[ indexName ] = k;
      sect.data[ variable ] = newValue[k];
    }
  }

  function updateLD(newValue, oldValue, splices){
    if(!oldValue) oldValue = [];
    if(!newValue) newValue = [];


    var cur = placeholder;
    var m = 0, len = newValue.length;

    if(!splices && (len !==0 || oldValue.length !==0)  ){
      splices = diffArray(newValue, oldValue);
    }

    if(!splices || !splices.length) return;
      
    for(var i = 0; i < splices.length; i++){ //init
      var splice = splices[i];
      var index = splice.index; // beacuse we use a comment for placeholder
      var removed = splice.removed;
      var add = splice.add;
      var rlen = removed.length;
      // for track
      if( track && rlen && add ){
        var minar = Math.min(rlen, add);
        var tIndex = 0;
        while(tIndex < minar){
          if( keyOf(newValue[index], index) !== keyOf( removed[0], index ) ){
            removeRange(index, 1)
            addRange(index, index+1, newValue)
          }
          removed.shift();
          add--;
          index++;
          tIndex++;
        }
        rlen = removed.length;
      }
      // update
      updateRange(m, index, newValue);
      removeRange( index ,rlen)

      addRange(index, index+add, newValue)

      m = index + add - rlen;
      m  = m < 0? 0 : m;

    }
    if(m < len){
      for(var i = m; i < len; i++){
        var pair = group.get(i + 1);
        pair.data[indexName] = i;
      }
    }
  }

  // if the track is constant test.
  function updateSimple(newValue, oldValue){
    newValue = newValue || [];
    oldValue  = oldValue || [];

    var nlen = newValue.length || 0;
    var olen = oldValue.length || 0;
    var mlen = Math.min(nlen, olen);


    updateRange(0, mlen, newValue)
    if(nlen < olen){ //need add
      removeRange(nlen, olen-nlen);
    }else if(nlen > olen){
      addRange(olen, nlen, newValue);
    }
  }

  function update(newValue, oldValue, splices){
    var nlen = newValue && newValue.length;
    var olen = oldValue && oldValue.length;
    if( !olen && nlen && group.get(1)){
      var altGroup = group.children.pop();
      if(altGroup.destroy)  altGroup.destroy(true);
    }

    if(track === true){
      updateSimple(newValue, oldValue, splices)
    }else{
      updateLD(newValue, oldValue, splices)
    }

    // @ {#list} {#else}
    if( !nlen && alternate && alternate.length){
      var section = self.$compile(alternate, {
        extra: extra,
        record: true,
        outer: options.outer,
        namespace: namespace
      })
      group.children.push(section);
      if(placeholder.parentNode){
        animate.inject(combine.node(section), placeholder, 'after');
      }
    }
  }
  this.$watch(ast.sequence, update, { init: true, indexTrack: track === true });
  return group;
}
// {#include } or {#inc template}
walkers.template = function(ast, options){
  var content = ast.content, compiled;
  var placeholder = document.createComment('inlcude');
  var compiled, namespace = options.namespace, extra = options.extra;
  var group = new Group([placeholder]);
  if(content){
    var self = this;
    this.$watch(content, function(value){
      var removed = group.get(1), type= typeof value;
      if( removed){
        removed.destroy(true); 
        group.children.pop();
      }
      if(!value) return;
      group.push( compiled = (typeof value === 'function') ? value(): self.$compile(value, {record: true, outer: options.outer,namespace: namespace, extra: extra}) ); 
      if(placeholder.parentNode) {
        compiled.$inject(placeholder, 'before')
      }
    }, {
      init: true
    });
  }
  return group;
};


// how to resolve this problem
var ii = 0;
walkers['if'] = function(ast, options){
  var self = this, consequent, alternate, extra = options.extra;
  if(options && options.element){ // attribute inteplation
    var update = function(nvalue){
      if(!!nvalue){
        if(alternate) combine.destroy(alternate)
        if(ast.consequent) consequent = self.$compile(ast.consequent, {record: true, element: options.element , extra:extra});
      }else{
        if(consequent) combine.destroy(consequent)
        if(ast.alternate) alternate = self.$compile(ast.alternate, {record: true, element: options.element, extra: extra});
      }
    }
    this.$watch(ast.test, update, { force: true });
    return {
      destroy: function(){
        if(consequent) combine.destroy(consequent);
        else if(alternate) combine.destroy(alternate);
      }
    }
  }

  var test, consequent, alternate, node;
  var placeholder = document.createComment("Regular if" + ii++);
  var group = new Group();
  group.push(placeholder);
  var preValue = null, namespace= options.namespace;


  var update = function (nvalue, old){
    var value = !!nvalue;
    if(value === preValue) return;
    preValue = value;
    if(group.children[1]){
      group.children[1].destroy(true);
      group.children.pop();
    }
    if(value){ //true
      if(ast.consequent && ast.consequent.length){
        consequent = self.$compile( ast.consequent , {record:true, outer: options.outer,namespace: namespace, extra:extra })
        // placeholder.parentNode && placeholder.parentNode.insertBefore( node, placeholder );
        group.push(consequent);
        if(placeholder.parentNode){
          animate.inject(combine.node(consequent), placeholder, 'before');
        }
      }
    }else{ //false
      if(ast.alternate && ast.alternate.length){
        alternate = self.$compile(ast.alternate, {record:true, outer: options.outer,namespace: namespace, extra:extra});
        group.push(alternate);
        if(placeholder.parentNode){
          animate.inject(combine.node(alternate), placeholder, 'before');
        }
      }
    }
  }
  this.$watch(ast.test, update, {force: true, init: true});

  return group;
}


walkers.expression = function(ast, options){
  var node = document.createTextNode("");
  this.$watch(ast, function(newval){
    dom.text(node, "" + (newval == null? "": "" + newval) );
  })
  return node;
}
walkers.text = function(ast, options){
  var node = document.createTextNode(_.convertEntity(ast.text));
  return node;
}



var eventReg = /^on-(.+)$/

/**
 * walkers element (contains component)
 */
walkers.element = function(ast, options){
  var attrs = ast.attrs, self = this,
    Constructor = this.constructor,
    children = ast.children,
    namespace = options.namespace, 
    extra = options.extra,
    tag = ast.tag,
    Component = Constructor.component(tag),
    ref, group, element;

  if( tag === 'r-content' ){
    _.log('r-content is deprecated, use {#inc this.$body} instead (`{#include}` as same)', 'warn');
    return this.$body && this.$body();
  } 

  if(Component || tag === 'r-component'){
    options.Component = Component;
    return walkers.component.call(this, ast, options)
  }

  if(tag === 'svg') namespace = "svg";
  // @Deprecated: may be removed in next version, use {#inc } instead
  
  if( children && children.length ){
    group = this.$compile(children, {outer: options.outer,namespace: namespace, extra: extra });
  }

  element = dom.create(tag, namespace, attrs);

  if(group && !_.isVoidTag(tag)){
    dom.inject( combine.node(group) , element)
  }

  // sort before
  if(!ast.touched){
    attrs.sort(function(a1, a2){
      var d1 = Constructor.directive(a1.name),
        d2 = Constructor.directive(a2.name);
      if( d1 && d2 ) return (d2.priority || 1) - (d1.priority || 1);
      if(d1) return 1;
      if(d2) return -1;
      if(a2.name === "type") return 1;
      return -1;
    })
    ast.touched = true;
  }
  // may distinct with if else
  var destroies = walkAttributes.call(this, attrs, element, extra);

  return {
    type: "element",
    group: group,
    node: function(){
      return element;
    },
    last: function(){
      return element;
    },
    destroy: function(first){
      if( first ){
        animate.remove( element, group? group.destroy.bind( group ): _.noop );
      }else if(group) {
        group.destroy();
      }
      // destroy ref
      if( destroies.length ) {
        destroies.forEach(function( destroy ){
          if( destroy ){
            if( typeof destroy.destroy === 'function' ){
              destroy.destroy()
            }else{
              destroy();
            }
          }
        })
      }
    }
  }
}

walkers.component = function(ast, options){
  var attrs = ast.attrs, 
    Component = options.Component,
    Constructor = this.constructor,
    isolate, 
    extra = options.extra,
    namespace = options.namespace,
    ref, self = this, is;

  var data = {}, events;

  for(var i = 0, len = attrs.length; i < len; i++){
    var attr = attrs[i];
    // consider disabled   equlasto  disabled={true}
    var value = this._touchExpr(attr.value === undefined? true: attr.value);
    if(value.constant) value = attr.value = value.get(this);
    if(attr.value && attr.value.constant === true){
      value = value.get(this);
    }
    var name = attr.name;
    if(!attr.event){
      var etest = name.match(eventReg);
      // event: 'nav'
      if(etest) attr.event = etest[1];
    }

    // @compile modifier
    if(attr.mdf === 'cmpl'){
      value = _.getCompileFn(value, this, {
        record: true, 
        namespace:namespace, 
        extra: extra, 
        outer: options.outer
      })
    }
    
    // @if is r-component . we need to find the target Component
    if(name === 'is' && !Component){
      is = value;
      var componentName = this.$get(value, true);
      Component = Constructor.component(componentName)
      if(typeof Component !== 'function') throw new Error("component " + componentName + " has not registed!");
    }
    // bind event proxy
    var eventName;
    if(eventName = attr.event){
      events = events || {};
      events[eventName] = _.handleEvent.call(this, value, eventName);
      continue;
    }else {
      name = attr.name = _.camelCase(name);
    }

    if(value.type !== 'expression'){
      data[name] = value;
    }else{
      data[name] = value.get(self); 
    }
    if( name === 'ref'  && value != null){
      ref = value
    }
    if( name === 'isolate'){
      // 1: stop: composite -> parent
      // 2. stop: composite <- parent
      // 3. stop 1 and 2: composite <-> parent
      // 0. stop nothing (defualt)
      isolate = value.type === 'expression'? value.get(self): parseInt(value === true? 3: value, 10);
      data.isolate = isolate;
    }
  }

  var definition = { 
    data: data, 
    events: events, 
    $parent: this,
    $root: this.$root,
    $outer: options.outer,
    _body: ast.children
  }
  var options = {
    namespace: namespace, 
    extra: options.extra
  }


  var component = new Component(definition, options), reflink;


  if(ref && this.$refs){
    reflink = Component.directive('ref').link
    this.$on('$destroy', reflink.call(this, component, ref) )
  }
  if(ref &&  self.$refs) self.$refs[ref] = component;
  for(var i = 0, len = attrs.length; i < len; i++){
    var attr = attrs[i];
    var value = attr.value||true;
    var name = attr.name;
    // need compiled
    if(value.type === 'expression' && !attr.event){
      value = self._touchExpr(value);
      // use bit operate to control scope
      if( !(isolate & 2) ) 
        this.$watch(value, component.$update.bind(component, name))
      if( value.set && !(isolate & 1 ) ) 
        // sync the data. it force the component don't trigger attr.name's first dirty echeck
        component.$watch(name, self.$update.bind(self, value), {sync: true});
    }
  }
  if(is && is.type === 'expression'  ){
    var group = new Group();
    group.push(component);
    this.$watch(is, function(value){
      // found the new component
      var Component = Constructor.component(value);
      if(!Component) throw new Error("component " + value + " has not registed!");
      var ncomponent = new Component(definition);
      var component = group.children.pop();
      group.push(ncomponent);
      ncomponent.$inject(combine.last(component), 'after')
      component.destroy();
      // @TODO  if component changed , we need update ref
      if(ref){
        self.$refs[ref] = ncomponent;
      }
    }, {sync: true})
    return group;
  }
  return component;
}

function walkAttributes(attrs, element, extra){
  var bindings = []
  for(var i = 0, len = attrs.length; i < len; i++){
    var binding = this._walk(attrs[i], {element: element, fromElement: true, attrs: attrs, extra: extra})
    if(binding) bindings.push(binding);
  }
  return bindings;
}

walkers.attribute = function(ast ,options){

  var attr = ast;
  var name = attr.name;
  var value = attr.value || "";
  var constant = value.constant;
  var Component = this.constructor;
  var directive = Component.directive(name);
  var element = options.element;
  var self = this;


  value = this._touchExpr(value);

  if(constant) value = value.get(this);

  if(directive && directive.link){
    var binding = directive.link.call(self, element, value, name, options.attrs);
    if(typeof binding === 'function') binding = {destroy: binding}; 
    return binding;
  } else{
    if(value.type === 'expression' ){
      this.$watch(value, function(nvalue, old){
        dom.attr(element, name, nvalue);
      }, {init: true});
    }else{
      if(_.isBooleanAttr(name)){
        dom.attr(element, name, true);
      }else{
        dom.attr(element, name, value);
      }
    }
    if(!options.fromElement){
      return {
        destroy: function(){
          dom.attr(element, name, null);
        }
      }
    }
  }

}


},{"./dom.js":11,"./group.js":13,"./helper/animate.js":14,"./helper/arrayDiff.js":15,"./helper/combine.js":16,"./parser/node.js":28,"./util":29}]},{},[1]);
