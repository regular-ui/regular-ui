### 名词解释

- 继承自Regular的所有的类都叫 **组件（Component）** 。

- Regular UI中的组件分为两类，**元件（Unit）** 和 **模块（Module）**。

### CSS规范

Regular UI中所有组件的CSS样式都遵循[NEC规范](http://nec.netease.com/standard/css-sort.html)。

##### 强调

- HTML模板只用于表现组件的结构，因此不在模板标签中使用`f-`功能等样式，而用`@extend`方式在CSS中继承。

  如用：`<div class="m-pager">` + `.m-pager {@extend .f-wsn}`，而不用：`<div class="m-pager f-wsn">`

##### 补充

- 为了防止组件内部类名的污染，并且为了好识别，使用`_`来做连字符。

  后代选择器的类名定义为组件名+`_`+后代选择器的含义。

  如用：`.m-tab .tab_hd`、`.m-calendar .calendar_hd`，而不用：`.m-tab .hd`、`.m-calendar .hd`

- 为了防止组件内部语义化标签的污染，使用`>`来进行限制选择

  如用：`.m-list>li`，而不用：`.m-list li`

### JS规范

Regular UI中所有组件的JS代码都遵循Google的JavaScript规范。

代码的注释遵循jsDoc的规范。

### 命名规范

| 组件名和类名       | 对象名             | 标签名               | CSS类名               |　JS文件名             |  CSS文件名              |
| ------------------ | ------------------ | -------------------- | --------------------- | --------------------- | ----------------------- |
| 大驼峰             | 小驼峰             | 小驼峰               | 全小写                | 与标签名一致          | 与标签名一致            |
| -                  | -                  | `<button>`            | `u-btn`                | -                     | `btn.mcss`               |
| `Modal`             | `modal`             | `<modal>`             | `m-modal`              | `modal.js`             | `modal.mcss`             |
| `DetailModal`       | `detailModal`       | `<detailModal>`       | `m-modal-detail`       | `detailModal.js`       | `detailModal.mcss`       |
| `ListView`          | `listView`          | `<listView>`          | `m-listview`           | `listView.js`          | `listView.mcss`          |
| `MusicListView`     | `musicListView`     | `<musicListView>`     | `m-listview-music`     | `musicListView.js`     | `musicListView.mcss`     |
| `TreeView`          | `treeView`          | `<treeView>`          | `m-treeview`           | `treeView.js`          | `treeView.mcss`          |
| `KnowledgeTreeView` | `knowledgeTreeView` | `<knowledgeTreeView>` | `m-treeview-knowledge` | `knowledgeTreeView.js` | `knowledgeTreeView.mcss` |
| `TreeViewList`      | `treeViewList`      | `<treeViewList>`      | `treeview_list`        | -                     | -                       |
| `Calendar`          | `calendar`          | `<calendar>`          | `m-calendar`           | `calendar.js`          | `calendar.mcss`          |
| `DatePicker`        | `datePicker`        | `<datePicker>`        | `u-datepicker`         | `datePicker.js`        | `datePicker.mcss`        |
| `DateTimePicker`    | `dateTimePicker`    | `<dateTimePicker>`    | `u-datetimepicker`     | `dateTimePicker.js`    | `dateTimePicker.mcss`    |

### 已使用的缩写

##### 组件名

- button: btn
- image: img
- formControl: formCtrl
- breadCrumb: crumb
- markdownEditor: markEditor

##### 类名

- head: hd
- body: bd
- foot: ft

##### 状态名

- active: act
- disabled: dis
- current: crt
- selected: sel

##### 扩展样式名

- extra small: xs
- small: sm
- medium: md
- large: lg
- extra large: xl