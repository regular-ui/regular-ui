#### 分类

- 按照是否包含JS代码，Regular UI中的组件分为**CSS组件**和**JS组件**。
- 按照[NEC规范][NEC]，Regular UI中的组件分为**布局（Grid）** 、**元件（Unit）**和 **模块（Module）**。

#### 命名规范

| 组件名和类名       | 对象名             | 标签名               | CSS class             |　JS文件名             |  CSS文件名              |
| ------------------ | ------------------ | -------------------- | --------------------- | --------------------- | ----------------------- |
| 大驼峰             | 小驼峰             | 小驼峰               | 全小写                | 与标签名一致          | 与标签名一致            |
| -                  | -                  | `<button>`            | `u-btn`                | -                     | `btn.mcss`               |
| `Modal`             | `modal`             | `<modal>`             | `m-modal`              | `modal.js`             | `modal.mcss`             |
| `DetailModal`       | `detailModal`       | `<detailModal>`       | `m-detailmodal`        | `detailModal.js`       | `detailModal.mcss`       |
| `ListView`          | `listView`          | `<listView>`          | `m-listview`           | `listView.js`          | `listView.mcss`          |
| `MusicListView`     | `musicListView`     | `<musicListView>`     | `m-musiclistview`      | `musicListView.js`     | `musicListView.mcss`     |
| `TreeView`          | `treeView`          | `<treeView>`          | `m-treeview`           | `treeView.js`          | `treeView.mcss`          |
| `KnowledgeTreeView` | `knowledgeTreeView` | `<knowledgeTreeView>` | `m-knowledgetreeview`  | `knowledgeTreeView.js` | `knowledgeTreeView.mcss` |
| `TreeViewList`      | `treeViewList`      | `<treeViewList>`      | `treeview_list`        | -                     | -                       |
| `Calendar`          | `calendar`          | `<calendar>`          | `m-calendar`           | `calendar.js`          | `calendar.mcss`          |
| `DatePicker`        | `datePicker`        | `<datePicker>`        | `u-datepicker`         | `datePicker.js`        | `datePicker.mcss`        |
| `DateTimePicker`    | `dateTimePicker`    | `<dateTimePicker>`    | `u-datetimepicker`     | `dateTimePicker.js`    | `dateTimePicker.mcss`    |

#### CSS规范

Regular UI中所有组件的CSS样式都遵循[NEC规范][NEC]。

##### 补充

- 为了防止组件内部class选择器的污染，并且为了好识别，使用`_`来做连字符。  
  后代选择器的class定义为组件名+`_`+后代选择器的含义。  
  如用：`.m-tabs .tabs_hd`, `.m-calendar .calendar_hd`，而不用：`.m-tabs .hd`, `.m-calendar .hd`
- 为了防止组件内部语义化标签选择器的污染，使用`>`来进行限制选择。  
  如用：`.m-list>li`，而不用：`.m-list li`
- 对于简单的HTML结构尽量使用标签选择器而不使用class选择器。  
  如用：`.m-list>li`, `.m-crumb>li>a`，而不用：`.m-list .list_item`, `.m-crumb .crumb_a`

#### MCSS/SCSS规范

##### 变量命名

- 变量的命名必须有意义，能够使人直接读懂变量的含义，如`$brand-primary`, `$font-size-base`, `$u-radio_size`等。
- 主题的主要色系以`$brand-`开头，并在`var.mcss`文件中声明，如`$brand-primary`, `$brand-info`等
- 组件的公有变量以**CSS属性名**+**特性**，并在`var.mcss`文件中声明，如`$font-size-base`, `$height-sm`, `$background-darker`, ...
- 组件的私有变量以**class**+'_'+**属性名**，仅在组件mcss文件中声明，如`$u-radio_size`, `$m-tabs_hd_li_margin`, ...
- 常见状态：`default`, `primary`, `info`, `success`, `warning`, `error`, `disabled`, `muted`, ...
- 大小分级：`xxs`, `xs`, `sm`, `base`, `lg`, `xl`, `xxl`, ...
- 颜色分级：`darkest`, `darker`, `dark`, `base`, `light`, `lighter`, `lightest`, ...

##### 强调

- 尽量使用MASS库中的函数简化代码，如各种CSS3的前缀, `$size`, `$line-height`等。
- HTML模板只用于表现组件的结构，因此不在模板标签中使用`f-`功能等样式，而用`@extend`方式在CSS中继承。  
  如用：`<div class="m-pager">` + `.m-pager {@extend .f-wsn}`，而不用：`<div class="m-pager f-wsn">`
- `@extend`方式只能继承自简单选择器。
- 在可以用`@extend`的地方不使用mixin方式。

#### JS规范

Regular UI中所有组件的JS代码都遵循Google的JavaScript规范。

代码的注释遵循jsDoc的规范。

##### 补充

- 组件中的私有方法开头加`_`，如：`_onItemChange($event)`、`_isCompleted()`。

#### Regular规范

##### 组件声明

- 每个组件必须在`config`中声明默认数据。
- 使用`this.data`，放弃使用Regular中`config`或`init`中传入的`data`参数。
- 数据操作放在`config`中处理，DOM操作放在`init`中处理，并且尽量不进行DOM操作。

最佳实践：

```javascript
var Modal = Component.extend({
    name: 'modal',
    template: template,
    /* @protected */
    config: function() {
        _.extend(this.data, {
            title: '提示',
            content: '',
            okButton: true,
            cancelButton: false,
            draggable: false
        });
        this.supr();
    },
    ...
    /* @public */
    ok: function() {...},
    /* @private */
    _onDragStart: function() {...},
    ...
});
```

##### 强调

- `$update`仅在以下两种情况中使用：
    - 组件内部异步回调函数中使用
    - 外部修改组件数据时使用
- 在满足功能的前提下，尽量不使用`$watch`。
- 在不增加代码复杂度的前提下，尽量使用`filter`和`computed`。
- `directive`仅用于简单的DOM操作，如：`r-autofocus`, `r-scroll`等，稍复杂的功能都使用组件来实现。

##### 事件

- 事件命名使用全部小写，并且不加`on`，如：`change`, `dragend`, `itemselect`, `itemmouseup`, ...
- 与组件整体相关的事件，以**动作或状态**的形式命名，如`change`, `dragend`, ...
- 与组件局部相关的事件，以**对象**+**动作或状态**的形式命名，如：`itemselect`, `itemmouseup`, ...
- 与事件对应的处理方法采用小驼峰，并且加`_on`，如：`_onDragEnd`, `_onItemSelect`, `_onItemMouseUp`, ...
- 如果使用事件参数，事件参数必须为一个object对象，并且遵循以下形式：

```javascript
{
    sender: this,    // 触发事件的发送对象，通常为this
    target: target,    // 事件处理的目标元素
    origin: ...,    // 触发事件的起始源，可选，如与drop事件相关的draggable
    ...    // 其他相关参数
}
```

##### 模板

- 模板尽量采用HTML5风格，除了`< />`
    - 字符串加双引号
    - bool属性不加`{true}`或`{false}`
    - 数字属性不加双引号
    - 表达式用`{}`且不加双引号
- 每个组件都实现`class`扩展

最佳实践：

```xml
<progress percent=72 state="error" striped active />
<pager class="m-pager-custom" current=6 total=11 on-nav={this._onNav($event)} />
```

<!-- 不把所有的组件都封装成Regular组件 -->

#### 已使用的缩写

##### 组件名

- `button` => `btn`
- `image` => `img`
- `formControl` => `formCtrl`
- `breadCrumb` => `crumb`
- `markdownEditor` => `markEditor`

##### class

- `head` => `hd`
- `body` => `bd`
- `foot` => `ft`

##### 状态名

- `active` => `act`
- `disabled` => `dis`
- `current` => `crt`
- `selected` => `sel`

##### 扩展样式名

- `extra small` => `xs`
- `small` => `sm`
- `medium` => `md`
- `large` => `lg`
- `extra large` => `xl`



[NEC]: http://nec.netease.com/standard/css-sort.html