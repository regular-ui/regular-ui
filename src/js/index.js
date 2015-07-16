/**
 * ------------------------------------------------------------
 * RGUI      Regular UI库
 * @author   sensen(rainforest92@126.com)
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
// 导航类
RGUI.Dropdown = require('./unit/dropdown.js');

// 表单类
RGUI.Input2 = require('./unit/input2.js');
RGUI.Check2 = require('./unit/check2.js');
RGUI.CheckGroup = require('./unit/checkGroup.js');
RGUI.Check2Group = require('./unit/check2Group.js');
RGUI.RadioGroup = require('./unit/radioGroup.js');
RGUI.Radio2Group = require('./unit/radio2Group.js');
RGUI.Select2 = require('./unit/select2.js');
RGUI.TreeSelect = require('./unit/treeSelect.js');
RGUI.Suggest = require('./unit/suggest.js');

// 日期类
RGUI.DatePicker = require('./unit/datePicker.js');
RGUI.TimePicker = require('./unit/timePicker.js');
RGUI.DateTimePicker = require('./unit/dateTimePicker.js');

RGUI.Progress = require('./unit/progress.js');

/**
 * jsModule
 */
// 导航类
RGUI.Tab = require('./module/tab.js');
RGUI.Pager = require('./module/pager.js');

// 窗口类
RGUI.Notify = require('./module/notify.js');
RGUI.Modal = require('./module/modal.js');

// 数据类
RGUI.ListView = require('./module/listView.js');
RGUI.GridView = require('./module/gridView.js');
RGUI.TreeView = require('./module/treeView.js');
RGUI.TableView = require('./module/tableView.js');

// 日期类
RGUI.Calendar = require('./module/calendar.js');

// 上传类
RGUI.Uploader = require('./module/uploader.js');

// 编辑器类
RGUI.Editor = require('./module/editor.js');
RGUI.MarkEditor = require('./module/markEditor.js');

module.exports = window.RGUI = RGUI;