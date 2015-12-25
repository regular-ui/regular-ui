var expect = require('expect.js');
var NumberInput = require('../../../src/js/unit/numberInput.js');

describe('NumberInput', function() {
    describe('initialized without params', function() {
        var numberInput = new NumberInput();

        it('should set `value` to be 0.', function() {
            expect(numberInput.data.value).to.be(0);
        });

        describe('#add(value)', function() {
            it('should add value.', function() {
                numberInput.add(5);
                numberInput.$update();

                expect(numberInput.data.value).to.be(5);
            });

            it('should throw a TypeError with an invalid number.', function() {
                try {
                    numberInput.add('test');
                } catch(e) {
                    expect(e).to.be.a(TypeError);
                }
            });
        });

        describe('#isOutOfRange(date)', function() {
            it('should return false with any value.', function() {
                expect(numberInput.isOutOfRange(5)).not.to.be.ok();
            });
        });
    });

    describe('initialized with string-type `value`', function() {
        var numberInput = new NumberInput({
            data: {
                value: '6'
            }
        });
        
        it('should convert `date` property from string-type to Number-type.', function() {
            expect(numberInput.data.value).to.be(6);
        });
    });

    describe('initialized to be disabled', function() {
        var numberInput = new NumberInput({
            data: {
                disabled: true
            }
        });
        
        it('should set `value` to be 0.', function() {
            expect(numberInput.data.value).to.be(0);
        });

        describe('#add(value)', function() {
            it('should not react.', function() {
                var oldValue = numberInput.data.value;
                numberInput.add();
                numberInput.$update();

                expect(numberInput.data.value).to.be(oldValue);
            });
        });
    });

    describe('initialized with `min` and `max`', function() {
        var numberInput = new NumberInput({
            data: {
                min: 2,
                max: 7
            }
        });

        it('should select the boundary value if out of range.', function() {
            expect(numberInput.data.value).to.be(2);
        });

        it('should check if out of the range after set a new `value`.', function() {
            numberInput.data.value = 18;
            numberInput.$update();

            expect(numberInput.data.value).to.be(7);
        });

        it('should check if out of the range after set a new `minValue` or `maxValue`.', function() {
            numberInput.data.max = 5;
            numberInput.$update();

            expect(numberInput.data.value).to.be(5);
        });

        describe('#isOutOfRange(date)', function() {
            it('should return true if out of range.', function() {
                expect(numberInput.isOutOfRange(0)).to.be.ok();
                expect(numberInput.isOutOfRange(0)).to.be(2);
            });

            it('should return false if in the range.', function() {
                expect(numberInput.isOutOfRange(4)).not.to.be.ok();
            });
        });
    });

    // For Zero-is-Falsy situation.
    describe('initialized where `min` is 0 and `max` is 5', function() {
        var numberInput = new NumberInput({
            data: {
                min: 0,
                max: 5
            }
        });

        describe('#isOutOfRange(date)', function() {
            it('should return true if out of range.', function() {
                expect(numberInput.isOutOfRange(-2)).to.be(0);
            });

            it('should return false if in the range.', function() {
                expect(numberInput.isOutOfRange(4)).not.to.be.ok();
            });
        });
    });

    describe('initialized with wrong range where `min` > `max`', function() {
        it('should throw a NumberRangeError.', function() {
            try {
                var numberInput = new NumberInput({
                    data: {
                        min: 12,
                        max: 7
                    }
                });
            } catch(e) {
                expect(e).to.be.a(NumberInput.NumberRangeError);
            }
        });
    });
});