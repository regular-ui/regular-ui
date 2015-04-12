var Progress = RGUI.Progress;

// 基本形式
(function() {
    var progress = new Progress({
        data: {
            percent: 36
        }
    }).$inject('#j-example1');
})();

// 颜色扩展
(function() {
    var progress = new Progress({
        data: {
            percent: 25,
            type: 'success'
        }
    }).$inject('#j-example2');
    var progress = new Progress({
        data: {
            percent: 50,
            type: 'warning'
        }
    }).$inject('#j-example2');
    var progress = new Progress({
        data: {
            percent: 75,
            type: 'error'
        }
    }).$inject('#j-example2');
})();

// 尺寸扩展
(function() {
    var progress = new Progress({
        data: {
            percent: 25,
            text: false,
            size: 'xs'
        }
    }).$inject('#j-example3');
    var progress = new Progress({
        data: {
            percent: 50,
            text: false,
            size: 'sm'
        }
    }).$inject('#j-example3');
    var progress = new Progress({
        data: {
            percent: 75,
            text: false,
            size: null
        }
    }).$inject('#j-example3');
})();

// 条纹
(function() {
    var progress = new Progress({
        data: {
            percent: 36,
            striped: true
        }
    }).$inject('#j-example4');
})();

// 条纹动画
(function() {
    var progress = new Progress({
        data: {
            percent: 72,
            type: 'error',
            striped: true,
            active: true
        }
    }).$inject('#j-example5');
})();