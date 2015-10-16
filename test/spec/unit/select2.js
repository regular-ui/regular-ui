var expect = require('expect.js');
var Select2 = require('../../../src/js/unit/select2.js');

describe('Select2', function() {
    describe('initialized', function() {
        var source = [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'}
        ];

        var select2 = new Select2({
            data: {
                source: source
            }
        });

        it('should select `undefined`.', function() {
            expect(select2.data.selected).to.be(undefined);
        });

        // describe('#select(item)', function() {
        //     it('should change `selected`.', function() {
        //         var item = source[0];
        //         select2.select(item);
        //         expect(select2.data.selected).to.be(item);
        //         select2.select(null);
        //         expect(select2.data.selected).to.be(null);
        //     });

        //     it('should emit select event.', function() {
        //         var item = source[1];
        //         select2.$on('select', function($event) {
        //             expect($event.selected).to.be(item);
        //         });
        //         select2.select(item);
        //     });

        //     it('should toggle close.', function() {
        //         select2.toggle(true);
        //         select2.select(source[1]);
        //         select2.$update();

        //         expect(select2.data.open).to.be(false);
        //     });
        // });
    });

    // describe('initialized with disabled item', function() {
    //     var source = [
    //         {name: '选项1'},
    //         {name: '选项2', disabled: true},
    //         {name: '选项3'}
    //     ];

    //     var select2 = new Select2({
    //         data: {
    //             source: source
    //         }
    //     });

    //     describe('#select(item)', function() {
    //         it('should not react.', function() {
    //             var oldSelected = select2.data.selected;
    //             var item = source[1];
    //             select2.select(item);
    //             select2.$update();

    //             expect(select2.data.selected).to.be(oldSelected);
    //         });
    //     });
    // });

    // describe('initialized with `selected`', function() {
    //     var source = [
    //         {name: '选项1'},
    //         {name: '选项2'},
    //         {name: '选项3'}
    //     ];

    //     var select2 = new Select2({
    //         data: {
    //             selected: source[1],
    //             source: source
    //         }
    //     });

    //     it('should select `undefined` when `source` changed and `selected` not in new `source`.', function() {
    //         select2.data.source = [];
    //         select2.$update();

    //         expect(select2.data.selected).to.be(undefined);
    //     });
    // });

    // describe('initialized with `source` and `value`', function() {
    //     var source = [
    //         {id: 1, name: '选项1'},
    //         {id: 2, name: '选项2'},
    //         {id: 3, name: '选项3'}
    //     ];

    //     var select2 = new Select2({
    //         data: {
    //             source: source,
    //             value: 2
    //         }
    //     });

    //     it('should keep `value` and select correct item.', function() {
    //         expect(select2.data.value).to.be(2);
    //         expect(select2.data.selected).to.be(source[1]);
    //     });

    //     it('should change `value` when select item.', function() {
    //         select2.select(source[2]);
    //         select2.$update();

    //         expect(select2.data.value).to.be(3);
    //     });

    //     it('should select correct item when `source` changed.', function() {
    //         var newSource = [
    //             {id: 1, name: '新选项1'},
    //             {id: 2, name: '新选项2'},
    //             {id: 3, name: '新选项3'}
    //         ];
    //         select2.data.source = newSource;
    //         select2.$update();

    //         expect(select2.data.value).to.be(3);
    //         expect(select2.data.selected).to.be(newSource[2]);
    //     });
    // });

    // describe('initialized with `value`', function() {
    //     var source = [
    //         {id: 1, name: '选项1'},
    //         {id: 2, name: '选项2'},
    //         {id: 3, name: '选项3'}
    //     ];

    //     var select2 = new Select2({
    //         data: {
    //             value: 2
    //         }
    //     });

    //     it('should keep `value` and `selected` be `undefined`.', function() {
    //         expect(select2.data.value).to.be(2);
    //         expect(select2.data.selected).to.be(undefined);
    //     });

    //     it('should select correct item by `value` when `source` changed.', function() {
    //         var newSource = [
    //             {id: 1, name: '新选项1'},
    //             {id: 2, name: '新选项2'},
    //             {id: 3, name: '新选项3'}
    //         ];
    //         select2.data.source = newSource;
    //         select2.$update();

    //         expect(select2.data.value).to.be(2);
    //         expect(select2.data.selected).to.be(newSource[1]);
    //     });
    // });

    // describe('initialized with `source` and empty `placeholder`', function() {
    //     var source = [
    //         {id: 1, name: '选项1'},
    //         {id: 2, name: '选项2'},
    //         {id: 3, name: '选项3'}
    //     ];

    //     var select2 = new Select2({
    //         data: {
    //             placeholder: '',
    //             source: source
    //         }
    //     });

    //     it('should select the first item.', function() {
    //         expect(select2.data.selected).to.be(source[0]);
    //     });
    // });

    // describe('initialized with `value` and empty `placeholder`', function() {
    //     var source = [
    //         {id: 1, name: '选项1'},
    //         {id: 2, name: '选项2'},
    //         {id: 3, name: '选项3'}
    //     ];

    //     var select2 = new Select2({
    //         data: {
    //             placeholder: '',
    //             value: 2
    //         }
    //     });

    //     it('should keep `value` and `selected` be `undefined`.', function() {
    //         expect(select2.data.value).to.be(2);
    //         expect(select2.data.selected).to.be(undefined);
    //     });

    //     it('should select correct item by `value` when `source` changed.', function() {
    //         var newSource = [
    //             {id: 1, name: '新选项1'},
    //             {id: 2, name: '新选项2'},
    //             {id: 3, name: '新选项3'}
    //         ];
    //         select2.data.source = newSource;
    //         select2.$update();

    //         expect(select2.data.value).to.be(2);
    //         expect(select2.data.selected).to.be(newSource[1]);
    //     });
    // });

    // describe('initialized with string-array `source` and `value`', function() {
    //     var source = ['选项0', '选项1', '选项2'];

    //     var select2 = new Select2({
    //         data: {
    //             source: source,
    //             value: 2
    //         }
    //     });

    //     it('should select correct item.', function() {
    //         expect(select2.data.value).to.be(2);
    //         expect(select2.data.selected.name).to.be(source[2]);
    //     });
    // });
});