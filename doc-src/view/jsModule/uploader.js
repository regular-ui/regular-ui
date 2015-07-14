var Uploader = RGUI.Uploader;

// 基本形式
(function() {
    var uploader = new Uploader({
        data: {
            url: 'http://127.0.0.1:8000'
        }
    }).$inject('#j-example1');
})();
