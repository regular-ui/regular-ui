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

        describe('#select(item)', function() {
            it('should change `selected`.', function() {
                var item = source[0];
                select2.select(item);
                expect(select2.data.selected).to.be(item);
                select2.select(null);
                expect(select2.data.selected).to.be(null);
            });

            it('should emit select event.', function() {
                var item = source[1];
                select2.$on('select', function($event) {
                    expect($event.selected).to.be(item);
                });
                select2.select(item);
            });

            it('should toggle close.', function() {
                select2.toggle(true);
                select2.select(source[1]);
                select2.$update();

                expect(select2.data.open).to.be(false);
            });
        });
    });

    describe('initialized with disabled item', function() {
        var source = [
            {name: '选项1'},
            {name: '选项2', disabled: true},
            {name: '选项3'}
        ];

        var select2 = new Select2({
            data: {
                source: source
            }
        });

        describe('#select(item)', function() {
            it('should not react.', function() {
                var oldSelected = select2.data.selected;
                var item = source[1];
                select2.select(item);
                select2.$update();

                expect(select2.data.selected).to.be(oldSelected);
            });
        });
    });

    describe('initialized', function() {
        var source = [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'}
        ];

        var select2 = new Select2({
            data: {
                selected: source[1],
                source: source
            }
        });

        it('should select `null` when `source` changed and `selected` not in new `source`.', function() {
            select2.data.source = [];
            select2.$update();

            expect(select2.data.selected).to.be(null);
        });
    });
});