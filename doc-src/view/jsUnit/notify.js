var Notify = RGUI.Notify;

// 基本形式
(function() {
    var button = document.getElementById('j-example1').children[0];

    RGUI._.dom.on(button, 'click', function() {
        Notify.show('This is a message.');
    });
})();

// 状态扩展
(function() {
    var button0 = document.getElementById('j-example2').children[0];
    var button1 = document.getElementById('j-example2').children[1];
    var button2 = document.getElementById('j-example2').children[2];
    var button3 = document.getElementById('j-example2').children[3];

    RGUI._.dom.on(button0, 'click', function() {
        Notify.show('Info message.', 'info');
    });
    RGUI._.dom.on(button1, 'click', function() {
        Notify.show('Success message.', 'success');
    });
    RGUI._.dom.on(button2, 'click', function() {
        Notify.show('Warning message.', 'warning');
    });
    RGUI._.dom.on(button3, 'click', function() {
        Notify.show('Error message.', 'error');
    });
})();

// 位置扩展
(function() {
    var button0 = document.getElementById('j-example3').children[0];
    var button1 = document.getElementById('j-example3').children[1];
    var button2 = document.getElementById('j-example3').children[2];
    var button3 = document.getElementById('j-example3').children[3];
    var button4 = document.getElementById('j-example3').children[4];
    var button5 = document.getElementById('j-example3').children[5];

    var notify0 = new Notify({data: {position: 'topcenter'} });
    var notify1 = new Notify({data: {position: 'topleft'} });
    var notify2 = new Notify({data: {position: 'topright'} });
    var notify3 = new Notify({data: {position: 'bottomcenter'} });
    var notify4 = new Notify({data: {position: 'bottomleft'} });
    var notify5 = new Notify({data: {position: 'bottomright'} });

    RGUI._.dom.on(button0, 'click', function() {
        notify0.show('Top Center notify.');
    });
    RGUI._.dom.on(button1, 'click', function() {
        notify1.show('Top Left notify.');
    });
    RGUI._.dom.on(button2, 'click', function() {
        notify2.show('Top Right notify.');
    });
    RGUI._.dom.on(button3, 'click', function() {
        notify3.show('Bottom Center notify.');
    });
    RGUI._.dom.on(button4, 'click', function() {
        notify4.show('Bottom Left notify.');
    });
    RGUI._.dom.on(button5, 'click', function() {
        notify5.show('Bottom Right notify.');
    });
})();

// 嵌入文档流
(function() {
    var button = document.getElementById('j-example4').children[0];

    var notify = new Notify({
        data: {
            position: 'static'
        }
    }).$inject('#j-example4', 'top');

    RGUI._.dom.on(button, 'click', function() {
        notify.show('Static notify.');
    });
})();

// 消息停留时间
(function() {
    var button0 = document.getElementById('j-example5').children[0];
    var button1 = document.getElementById('j-example5').children[1];
    var button2 = document.getElementById('j-example5').children[2];
    var button3 = document.getElementById('j-example5').children[3];

    RGUI._.dom.on(button0, 'click', function() {
        Notify.show('0.5 seconds.', null, 500);
    });
    RGUI._.dom.on(button1, 'click', function() {
        Notify.show('1 second.', null, 1000);
    });
    RGUI._.dom.on(button2, 'click', function() {
        Notify.show('2 seconds.', null, 2000);
    });
    RGUI._.dom.on(button3, 'click', function() {
        Notify.show('Stick here.', null, 0);
    });
})();