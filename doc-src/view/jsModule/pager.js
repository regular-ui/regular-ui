var Pager = RGUI.Pager;

// 基本形式
(function() {
    var pager = new Pager({
        data: {
            current: 6,
            total: 11
        }
    }).$inject('#j-example1');
})();

// 位置
(function() {
    var pager = new Pager({
        data: {
            current: 6,
            total: 11,
            position: 'center'
        }
    }).$inject('#j-example2');

    var pager = new Pager({
        data: {
            current: 6,
            total: 11,
            position: 'left'
        }
    }).$inject('#j-example2');

    var pager = new Pager({
        data: {
            current: 6,
            total: 11,
            position: 'right'
        }
    }).$inject('#j-example2');
})();

// 显示数目
(function() {
    var pager = new Pager({
        data: {
            current: 6,
            total: 11,
            middle: 3,
            side: 1
        }
    }).$inject('#j-example3');
})();