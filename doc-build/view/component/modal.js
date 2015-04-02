var Modal = RU.Modal;

var button = document.getElementById('j-example1').children[0];
RU._.addEvent(button, 'click', function() {
    var modal = new Modal({
        data: {
            title: 'Modal标题',
            content: 'Modal内容'
        }
    });
});

var button = document.getElementById('j-example2').children[0];
RU._.addEvent(button, 'click', function() {
    Modal.alert('Alert内容');
});

var button = document.getElementById('j-example3').children[0];
RU._.addEvent(button, 'click', function() {
    Modal.confirm('Confirm内容');
});