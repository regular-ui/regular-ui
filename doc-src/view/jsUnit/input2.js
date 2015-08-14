var Input2 = RGUI.Input2;
var index = 0;

// 基本形式
(function(index) {
    var rules = [
        {type: 'isRequired', message: '请输入字符！'},
        {type: 'isLength', min: 5, max: 8, message: '请输入5-8个字符！'}
    ]

    var input2 = new Input2({
        data: {
            rules: rules
        }
    }).$inject($$('.m-example')[index]);
})(index++);