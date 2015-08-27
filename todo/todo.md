### JS

[v] Notify和Message的关系
[ ] Notify和Message，Accordion和Panel
[ ] 合并Radio和Check的样式
[v] 合并菜单，都继承自Dropdown
[v] Dropdown是否应该有菜单项？itemTemplate。目前contentTemplate在$body中实现。
[v] TableView的冗余，SourceComponent的冗余，DropDown有菜单项冗余。这些可以忽略。
[v] Regular中怎么实现接口，使用implement，目前还没有地方用到。
[v] 继承类的文档，只确定参数，方法和事件自动生成。
[v] 参数的顺序不按继承性排列，按照重要性排列，参数必须在config中声明，除了`class`, `readonly`, `disabled`, `visible`, `class`, `service`不用重复写。
[ ] 继承类样式的关系
[ ] ul和li的格式，current方式和select方式。数据类的用select，导航类的用current
[v] li class="z-crt"应该放在里面还是外面。放在外面，需要快速定位当前位置
[v] li>a, li>span的区别
[ ] modal是否要用show
[ ] on-select和on-change事件
[ ] selected和current，show、hide和open、close的区别
[v] uploader
[v] editor
[ ] dragdrop
[ ] treeView的优化
[ ] 多重suggest
[ ] js中要不要实现补充class的内容，暂定全部实现。
[ ] 快捷键
[v] 数据类的title提示
[ ] html.z-modal
[v] selected在日期类组件中分化为date属性
[v] selected在Pager组件中分化为current属性
[ ] name和title的问题。数据类的用name，导航类的用title
[v] rgl和js代码显示，为了防止读者搞不清楚，只使用rgl式的写法，不直接用data注入
[v] 自动生成js代码
[v] 文字是否要在模板中实现
[v] readonly, disabled, visible
[v] readOnly bug
[v] unit和module区分。正常情况下，通过直接观察，组件内部元素个数小于3的属于unit，其它属于module。例：所有下拉类均属于unit。
[ ] 内嵌模板 itemTemplate
[ ] service文档
[v] 结尾为bar, top, down的不用驼峰
[ ] checkbox, checkButton, toggle
[v] 第一版中先不引入`<modal.body>`、`<menuItem>`等新特性
[ ] MVVM的例子
[ ] 事件的例子
[ ] unitGroup, select2, treeSelect, suggest模板自定义
[ ] updateAuto
[ ] toggle(item, open) ?
[ ] Accordion的动画
[ ] Gotop和Notify的自定义模板

模板是可变的，导致样式继承不清晰

样式 *->* 模板 *->1 js

### CSS

[v] 减少f-系列在模板中的使用
[v] 修复f-系列在模板中的使用
[v] NEC规范：内部类名，使用下划线
[ ] NEC规范：允许在内部扩展插件
[ ] btngroup默认inline-block, vertical; unitgroup和formgroup默认block, block
[ ] btngroup, unitgroup的默认margin
[v] inline-block的空格处理，目前使用letter-spacing
[ ] core中允许含有常量和$brand-primary
[v] focus: outline, 提取出来，reset
[ ] a, h1, h2... 不用单独的类; button.u-btn, input.u-input, select.u-select, textarea.u-textarea?
[ ] H1, H2, H3, H4, H5, H6在文章中的展示
[v] u-btn不要u-btn-default
[ ] full和block的区别，目前都用block
[ ] 关于一些缩写是否要流行化
[ ] btngroup尺寸扩展
[ ] 目前只有hx和p标签设置margin
[ ] CSS文档中的代码块需不需要用tab
[v] 目前颜色缺少success, secondary等等，先不考虑
[ ] 图片示例
[ ] u-icon和u-badge的大小扩展
[ ] .u-badge..u-badge-number优先级问题，目前先遇到问题再调整
[v] 圆角为主题的固有属性，不单独作为一个类。
[ ] 控件宽度需不需要保留
[ ] 尽量使用`>`
[ ] 表头细节
[ ] 关于formitem的控制，formitem + formitem的问题
[ ] @extend和margin


#### 扩展属性

##### Dimension

- width, height, min-width, min-height, max-width, max-height, $size
- margin, padding
- top, bottom, left, right
- line-height, $line-height
- font-size

##### Color
- background, color, border, $border

##### Content
- #content

#### 非扩展属性

- text-align

- float, position