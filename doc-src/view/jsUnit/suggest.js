var Suggest = RGUI.Suggest;

// 基本形式
(function() {
    var source = [
        {id: 1, name: 'abandon'},
        {id: 2, name: 'about'},
        {id: 3, name: 'absent'},
        {id: 4, name: 'bread'},
        {id: 5, name: 'break'},
        {id: 6, name: 'brief'},
        {id: 7, name: 'calendar'},
        {id: 8, name: 'cancel'},
        {id: 9, name: 'column'}
    ];

    var suggest = new Suggest({
        data: {
            source: source
        }
    }).$inject('#j-example1');
})();

// 禁用组件
(function() {
    var source = [
        {id: 1, name: 'abandon'},
        {id: 2, name: 'about'},
        {id: 3, name: 'absent'},
        {id: 4, name: 'bread'},
        {id: 5, name: 'break'},
        {id: 6, name: 'brief'},
        {id: 7, name: 'calendar'},
        {id: 8, name: 'cancel'},
        {id: 9, name: 'column'}
    ];

    var suggest = new Suggest({
        data: {
            source: source,
            disabled: true
        }
    }).$inject('#j-example2');
})();

// Placeholder
(function() {
    var source = [
        {id: 1, name: 'abandon'},
        {id: 2, name: 'about'},
        {id: 3, name: 'absent'},
        {id: 4, name: 'bread'},
        {id: 5, name: 'break'},
        {id: 6, name: 'brief'},
        {id: 7, name: 'calendar'},
        {id: 8, name: 'cancel'},
        {id: 9, name: 'column'}
    ];

    var suggest = new Suggest({
        data: {
            source: source,
            placeholder: '输入时会自动提示'
        }
    }).$inject('#j-example3');
})();

// 最小提示长度
(function() {
    var source = [
        {id: 1, name: 'abandon'},
        {id: 2, name: 'about'},
        {id: 3, name: 'absent'},
        {id: 4, name: 'bread'},
        {id: 5, name: 'break'},
        {id: 6, name: 'brief'},
        {id: 7, name: 'calendar'},
        {id: 8, name: 'cancel'},
        {id: 9, name: 'column'}
    ];

    var suggest = new Suggest({
        data: {
            source: source,
            placeholder: '输入2个字符后开始提示',
            minLength: 2
        }
    }).$inject('#j-example4');
})();

// 匹配方式
(function() {
    var source = [
        {id: 1, name: 'abandon'},
        {id: 2, name: 'about'},
        {id: 3, name: 'absent'},
        {id: 4, name: 'bread'},
        {id: 5, name: 'break'},
        {id: 6, name: 'brief'},
        {id: 7, name: 'calendar'},
        {id: 8, name: 'cancel'},
        {id: 9, name: 'column'}
    ];

    var suggest = new Suggest({
        data: {
            source: source,
            placeholder: '匹配全局',
            matchType: 'all'
        }
    }).$inject('#j-example5');

    var suggest = new Suggest({
        data: {
            source: source,
            placeholder: '只匹配开头',
            matchType: 'start'
        }
    }).$inject('#j-example5');

    var suggest = new Suggest({
        data: {
            source: source,
            placeholder: '只匹配结尾',
            matchType: 'end'
        }
    }).$inject('#j-example5');
})();

// 严格模式
(function() {
    var source = [
        {id: 1, name: 'abandon'},
        {id: 2, name: 'about'},
        {id: 3, name: 'absent'},
        {id: 4, name: 'bread'},
        {id: 5, name: 'break'},
        {id: 6, name: 'brief'},
        {id: 7, name: 'calendar'},
        {id: 8, name: 'cancel'},
        {id: 9, name: 'column'}
    ];
    
    var suggest = new Suggest({
        data: {
            source: source,
            strict: true
        }
    }).$inject('#j-example6');
})();