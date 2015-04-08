var Notify = RGUI.Notify;

var button = document.getElementById('j-example1').children[0];
var notify = new Notify().$inject('#j-example1', 'top');
RGUI._.addEvent(button, 'click', function() {
    notify.show('This is a message.');
});