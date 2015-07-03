var Pager = RGUI.Pager;

// 基本形式
(function() {
    var pager = new Pager({
        data: {
            current: 6
        }
    }).$inject('#j-example1');
})();

// 基本形式
(function() {
    var pager = new Pager({
        data: {
            side: 1
        }
    }).$inject('#j-example2');
})();

// 基本形式
(function() {
    var pager = new Pager({
        data: {
            side: 3,
            middle: 3,
            total: 11
        }
    }).$inject('#j-example3');
})();