### JS

[ ] 通知和Message的关系
[ ] 合并Radio和Check的样式
[v] 合并菜单
[ ] DropDown是否应该有菜单项？itemTemplate, contentTemplate
[ ] TableView的冗余，SourceComponent的冗余，DropDown有菜单项冗余
[ ] Regular中怎么实现接口
[v] 继承类的文档，只确定参数，方法和事件自动生成
[v] 参数的顺序不按继承性排列，按照重要性排列，参数必须在config中声明，除了`class`这个东东。
[ ] 继承类样式的关系
[v] 减少f-系列在模板中的使用
[ ] 修复f-系列在模板中的使用
[v] ul和li的格式，两种current方式和select方式
[v] li class="z-crt"应该放在里面还是外面。放在外面，需要快速定位当前位置
[v] li>a, li>span的区别
[ ] modal是否要用show
[ ] on-select和on-change事件
[ ] selected和current，show、hide和open、close的区别
[ ] uploader
[ ] dragdrop
[ ] treeView的优化
[ ] 多重suggest
[ ] js中要不要实现补充class的内容

模板是可变的，导致样式继承不清晰

样式 *->* 模板 *->1 js


《NEC规范：内部类名》
《NEC规范：在内部扩展插件》u-dropdown-selectex
u-dropdown-nav
    u-listbox-nav {
        box...
    }
function，哪些可以用哪些可以不用

### CSS

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