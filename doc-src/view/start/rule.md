### 名词解释

- 继承自Regular的所有的类都叫 **组件（Component）** 。

- Regular UI中的组件分为两类，**元件（Unit）** 和 **模块（Module）**。

### CSS规范

Regular UI中所有组件的CSS样式都遵循[NEC规范](http://nec.netease.com/standard/css-sort.html)。

##### 补充

- 为了防止组件内部类名的污染，并且为了好识别，使用`_`来做连字符。

  后代选择器的类名定义为组件名+`_`+后代选择器的含义。

  如用：`.m-tab .tab_hd`、`.u-calendar .calendar_hd`，而不用：`.m-tab .hd`、`.u-calendar .hd`

- 为了防止组件内部语义化标签的污染，使用`>`来进行限制选择

  如用：`.m-list>li`，而不用：`.m-list li`

### JS规范

Regular UI中所有组件的JS代码都遵循。。。呃，在网易WIKI里面。。。

代码的注释遵循jsDoc的规范。

### 命名规范

| 组件名和类名      | 对象名         | 标签名       | CSS类名        |　JS文件名  |  CSS文件名  |
| ------------------  | ------------------ | ------------------ | ---------------- | ------- | ------- |
| 大驼峰              | 小驼峰             | 小驼峰           | 全小写           | 与标签名一致 | 与CSS类名一致 |
| -             | -           | `<button>`            | `u-btn`  | - | `btn.mcss` |
| `Modal`             | `modal`            | `<modal>`            | `m-modal`  | `modal.js` | `modal.mcss` |
| `DetailModal`       | `detailModal`      | `<detailModal>`      | - | `detailModal.js` | - |
| `ListBox`           | `listBox`          | `<listBox>`          | `u-listbox` | `listBox.js` | `listbox.mcss` |
| `ListView`          | `listView`         | `<listView>`         | `u-listview` | `listView.js` | `listview.mcss` |
| `MusicListView`     | `musicListView`    | `<musicListView>`    | - | `musicListView.js` | - |
| `TreeView`          | `treeView`         | `<treeView>`         | `u-treeview` | `treeView.js` | `treeview.mcss` |
| `KnowledgeTreeView` | `knowledgeTreeView`| `<knowledgeTreeView>`| -         | `knowledgeTreeView.js` | - |
| `TreeViewList`      | `treeViewList`     | `<treeViewList>`     | -     | - | - |
| `Calendar`          | `calendar`         | `<calendar>`         | `u-calendar`         | `calendar.js` | `calendar.mcss` |
| `DatePicker`        | `datePicker`       | `<datePicker>`       | `u-datepicker`       | `datePicker.js` | `datepicker.mcss` |
| `DateTimePicker`    | `dateTimePicker`   | `<dateTimePicker>`   | `u-datetimepicker`   | `dateTimePicker.js` | `datetimepicker.mcss` |

### 缩写

button => btn

thumbnail => thumb

active => act

disabled => dis

head => hd

body => bd

foot => ft


extra small => xs

small => sm

medium => md

large => lg

extra large => xl
