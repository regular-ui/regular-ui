var NumberInput = RGUI.NumberInput;
var index = 0;

// 基本形式
(function(index) {
    var numberInput = new NumberInput({
        data: {
            //source: source
        }
    }).$inject($$('.m-example')[index]);
})(index++);

// 最大值和最小值
(function(index) {
    var numberInput = new NumberInput({
        data: {
            min: 5,
            max: 8
        }
    }).$inject($$('.m-example')[index]);
})(index++);