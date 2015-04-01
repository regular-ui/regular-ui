var Modal = RU.Modal;

var button1 = document.getElementById('j-example1').children[0];
RU._.addEvent(button1, 'click', function() {
    var modal = new Modal({
        data: {
            title: 'Modal标题',
            content: 'Modal内容'
        }
    });
});

var button2 = document.getElementById('j-example2').children[0];
RU._.addEvent(button2, 'click', function() {
    Modal.alert('Alert内容');
});

var button3 = document.getElementById('j-example3').children[0];
RU._.addEvent(button3, 'click', function() {
    Modal.confirm('Confirm内容');
});