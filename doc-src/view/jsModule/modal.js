var Modal = RGUI.Modal;

// 基本形式
(function() {
    var button = document.getElementById('j-example1').children[0];
    RGUI._.dom.on(button, 'click', function() {
        var modal = new Modal({
            data: {
                title: 'Modal标题',
                content: 'Modal内容'
            }
        });
    });
})();

// Alert
(function() {
    var button = document.getElementById('j-example2').children[0];
    RGUI._.dom.on(button, 'click', function() {
        Modal.alert('Alert内容');
    });
})();

// Confirm
(function() {
    var button = document.getElementById('j-example3').children[0];
    RGUI._.dom.on(button, 'click', function() {
        Modal.confirm('Confirm内容');
    });
})();