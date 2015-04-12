/**
 * ------------------------------------------------------------
 * RGUI      Regular UI库
 * @version  0.0.1
 * @author   sensen(hzzhaoyusen@corp.netease.com)
 * ------------------------------------------------------------
 */

'use strict';

var RGUI = {}

/**
 * base
 */
RGUI.Regular = require('regularjs');
RGUI.Component = require('./base/component.js');
RGUI._ = require('./base/util.js');
RGUI.request = require('./base/request.js');

/**
 * jsUnit
 */
// 消息类
RGUI.Notify = require('./unit/notify.js');
RGUI.Progress = require('./unit/progress.js');

// 表单类
RGUI.InputEx = require('./unit/inputEx.js');
RGUI.CheckEx = require('./unit/checkEx.js');
RGUI.CheckGroup = require('./unit/checkGroup.js');
RGUI.RadioGroup = require('./unit/radioGroup.js');
RGUI.SelectEx = require('./unit/selectEx.js');
RGUI.Suggest = require('./unit/suggest.js');

// 数据类
RGUI.ListBox = require('./unit/listBox.js');
RGUI.ListView = require('./unit/listView.js');
RGUI.TreeView = require('./unit/treeView.js');
RGUI.TreeSelect = require('./unit/treeSelect.js');

// 日期类
RGUI.Calendar = require('./unit/calendar.js');
RGUI.DatePicker = require('./unit/datePicker.js');
RGUI.TimePicker = require('./unit/timePicker.js');

/**
 * jsModule
 */
// 导航类
RGUI.TabHead = require('./module/tabHead.js');
RGUI.Tab = require('./module/tab.js');
RGUI.Pager = require('./module/pager.js');

// 窗口类
RGUI.Modal = require('./module/modal.js');

module.exports = window.RGUI = RGUI;