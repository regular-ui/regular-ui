module.exports = {
    themes: [
        'simple',
        'default',
        'flat',
        'bootstrap'
    ],
    components: {
        /**
         * CSS Unit
         */
        'Button': {type: 'css', category: 'unit', lowerName: 'button'},
        'ButtonGroup': {type: 'css', category: 'unit', lowerName: 'buttonGroup', requires: ['Button']},
        'Icon': {type: 'css', category: 'unit', lowerName: 'icon'},
        'Color': {type: 'css', category: 'unit', lowerName: 'color'},
        'Text': {type: 'css', category: 'unit', lowerName: 'text'},
        'Badge': {type: 'css', category: 'unit', lowerName: 'badge'},
        'Tip': {type: 'css', category: 'unit', lowerName: 'tip'},
        'Message': {type: 'css', category: 'unit', lowerName: 'message'},
        'Image': {type: 'css', category: 'unit', lowerName: 'image'},
        'FormControl': {type: 'css', category: 'unit', lowerName: 'formCtrl'},
        'FormItem': {type: 'css', category: 'unit', lowerName: 'formItem'},
        'FormGroup': {type: 'css', category: 'unit', lowerName: 'formGroup', requires: ['FormItem']},

        /**
         * CSS Module
         */
        /* 导航类 */
        'Navbar': {type: 'css', category: 'module', lowerName: 'navbar'},
        'Sidebar': {type: 'css', category: 'module', lowerName: 'sidebar'},
        'Toolbar': {type: 'css', category: 'module', lowerName: 'toolbar'},
        'Crumb': {type: 'css', category: 'module', lowerName: 'crumb'},
        /* 文章类 */
        'Article': {type: 'css', category: 'module', lowerName: 'article'},
        'Comment': {type: 'css', category: 'module', lowerName: 'comment'},
        /* 布局类 */
        'List': {type: 'css', category: 'module', lowerName: 'list'},
        'Table': {type: 'css', category: 'module', lowerName: 'table'},
        'Panel': {type: 'css', category: 'module', lowerName: 'panel'},
        'Form': {type: 'css', category: 'module', lowerName: 'form'},

        /**
         * JS Base
         */
        'ajax': {type: 'js', category: 'base', lowerName: 'ajax', path: 'regular-ui-base/src/ajax'},
        /**
         * JS Unit
         */
        /* 导航类 */
        'Dropdown': {type: 'css+js', category: 'unit', lowerName: 'dropdown', requires: ['ListView']},
        'Menu': {type: 'css+js', category: 'unit', lowerName: 'menu', requires: ['Dropdown']},
        /* 表单类 */
        'Input2': {type: 'css+js', category: 'unit', lowerName: 'input2', requires: ['FormControl', 'Tip']},
        'TextArea2': {type: 'css+js', category: 'unit', lowerName: 'textarea2', requires: ['FormControl', 'Tip']},
        'NumberInput': {type: 'css+js', category: 'unit', lowerName: 'numberInput', requires: ['Input2']},
        'Check2': {type: 'css+js', category: 'unit', lowerName: 'check2'},
        'Radio2': {type: 'css', category: 'unit', lowerName: 'radio2'},
        'UnitGroup': {type: 'css', category: 'unit', lowerName: 'unitGroup'},
        'CheckGroup': {type: 'js', category: 'unit', lowerName: 'checkGroup', requires: ['FormControl', 'UnitGroup', 'Check2']},
        'Check2Group': {type: 'js', category: 'unit', lowerName: 'check2Group', requires: ['CheckGroup']},
        'RadioGroup': {type: 'js', category: 'unit', lowerName: 'radioGroup', requires: ['FormControl', 'UnitGroup', 'Radio2']},
        'Radio2Group': {type: 'js', category: 'unit', lowerName: 'radio2Group', requires: ['RadioGroup']},
        'Select1': {type: 'js', category: 'unit', lowerName: 'select1'},
        'Select2': {type: 'css+js', category: 'unit', lowerName: 'select2', requires: ['Dropdown']},
        'SelectGroup': {type: 'js', category: 'unit', lowerName: 'selectGroup', requires: ['Select1']},
        'Select2Group': {type: 'js', category: 'unit', lowerName: 'select2Group', requires: ['Select2']},
        'TreeSelect': {type: 'js', category: 'unit', lowerName: 'treeSelect', requires: ['Select2', 'TreeView']},
        'Suggest': {type: 'css+js', category: 'unit', lowerName: 'suggest', requires: ['Dropdown']},
        'Uploader': {type: 'css+js', category: 'unit', lowerName: 'uploader'},
        /* 日期类 */
        'DatePicker': {type: 'js', category: 'unit', lowerName: 'datePicker', requires: ['Dropdown', 'Calendar']},
        'TimePicker': {type: 'css+js', category: 'unit', lowerName: 'timePicker', requires: ['NumberInput']},
        'DateTimePicker': {type: 'css+js', category: 'unit', lowerName: 'dateTimePicker', requires: ['Dropdown', 'Calendar', 'TimePicker']},
        /* 其他 */
        'Progress': {type: 'css+js', category: 'unit', lowerName: 'progress'},
        'Loading': {type: 'css+js', category: 'unit', lowerName: 'loading'},
        'Gotop': {type: 'css+js', category: 'unit', lowerName: 'gotop'},

        /**
         * JS Module
         */
        /* 导航类 */
        'Tabs': {type: 'css+js', category: 'module', lowerName: 'tabs'},
        'Collapse': {type: 'css+js', category: 'module', lowerName: 'collapse', requires: ['Panel']},
        'Pager': {type: 'css+js', category: 'module', lowerName: 'pager'},
        // @undone 'Menubar': {type: 'js', category: 'module', lowerName: 'menubar'},
        /* 窗口类 */
        'Notify': {type: 'css+js', category: 'module', lowerName: 'notify', requires: ['Message']},
        'Modal': {type: 'css+js', category: 'module', lowerName: 'modal'},
        /* 数据类 */
        'ListView': {type: 'css+js', category: 'module', lowerName: 'listView'},
        'UltiListView': {type: 'css+js', category: 'module', lowerName: 'ultiListView', requires: ['ListView', 'Draggable', 'Droppable']},
        // @undone 'GridView': {type: 'css+js', category: 'module', lowerName: 'gridView'},
        'TreeView': {type: 'css+js', category: 'module', lowerName: 'treeView'},
        'MultiTreeView': {type: 'css+js', category: 'module', lowerName: 'multiTreeView', requires: ['TreeView', 'Check2']},
        // @undone 'TableView': {type: 'css+js', category: 'module', lowerName: 'tableView'},
        /* 日期类 */
        'Calendar': {type: 'css+js', category: 'module', lowerName: 'calendar'},
        /* 编辑器类 */
        'Editor': {type: 'css', category: 'module', lowerName: 'editor'},
        'HTMLEditor': {type: 'js', category: 'module', lowerName: 'htmlEditor'},
        'MarkEditor': {type: 'js', category: 'module', lowerName: 'markEditor'},
        /* 其他 */
        'Validation': {type: 'js', category: 'util', lowerName: 'validation'},
        'Draggable': {type: 'js', category: 'util', lowerName: 'draggable', path: 'regular-ui-dragdrop/src/draggable'},
        'Droppable': {type: 'js', category: 'util', lowerName: 'droppable', path: 'regular-ui-dragdrop/src/droppable'}
    }
}
