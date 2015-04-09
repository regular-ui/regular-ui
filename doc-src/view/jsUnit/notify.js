var Notify = RGUI.Notify;

(function() {
    var button = document.getElementById('j-example1').children[0];
    var notify = new Notify().$inject('#j-example1', 'top');
    RGUI._.addEvent(button, 'click', function() {
        notify.show('This is a message.');
    });
})();

(function() {
    var button0 = document.getElementById('j-example2').children[0];
    var button1 = document.getElementById('j-example2').children[1];
    var button2 = document.getElementById('j-example2').children[2];
    var button3 = document.getElementById('j-example2').children[3];
    var notify = new Notify().$inject('#j-example2', 'top');

    RGUI._.addEvent(button0, 'click', function() {
        notify.show('Info message.', 'info');
    });
    RGUI._.addEvent(button1, 'click', function() {
        notify.show('Success message.', 'success');
    });
    RGUI._.addEvent(button2, 'click', function() {
        notify.show('Warning message.', 'warning');
    });
    RGUI._.addEvent(button3, 'click', function() {
        notify.show('Danger message.', 'error');
    });
})();