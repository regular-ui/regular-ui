var expect = require('expect.js');
var Dropdown = require('../../../src/js/unit/dropdown.js');

describe('Dropdown', function() {
    describe('initialized', function() {
        var source = [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'}
        ];

        var dropdown = new Dropdown({
            data: {
                source: source
            }
        });

        describe('#select(item)', function() {
            it('should emit select event.', function() {
                var item = source[1];
                dropdown.$on('select', function($event) {
                    expect($event.selected).to.be(item);
                });
                dropdown.select(item);
            });

            it('should toggle close.', function() {
                dropdown.toggle(true);
                dropdown.select(source[1]);
                dropdown.$update();

                expect(dropdown.data.open).to.be(false);
            });
        });

        describe('#toggle(open)', function() {
            it('should emit toggle event', function() {
                dropdown.$on('toggle', function($event) {
                    expect($event.open).to.be(true);
                });
                dropdown.toggle(true);
            });
        });
    });

    describe('initialized to be disabled', function() {
        var source = [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'}
        ];

        var dropdown = new Dropdown({
            data: {
                source: source,
                disabled: true
            }
        });

        describe('#toggle(open)', function() {
            it('should not react.', function() {
                var oldOpen = dropdown.data.open;

                dropdown.toggle(true);
                dropdown.$update();

                expect(dropdown.data.open).to.be(oldOpen);
            });
        });
    });

    describe('initialized with disabled item', function() {
        var source = [
            {name: '选项1'},
            {name: '选项2', disabled: true},
            {name: '选项3'}
        ];

        var dropdown = new Dropdown({
            data: {
                source: source
            }
        });

        describe('#select(item)', function() {
            it('should not react.', function() {
                dropdown.toggle(true);
                var oldOpen = dropdown.data.open;
                dropdown.select(source[1]);
                dropdown.$update();

                expect(dropdown.data.open).to.be(oldOpen);
            });
        });
    });
});