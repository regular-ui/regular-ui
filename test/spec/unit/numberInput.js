var except = require('expect.js');
var NumberInput = require('../../../src/js/unit/numberInput.js');

describe('NumberInput', function() {
    describe('initialized without params', function() {
        var numberInput = new NumberInput();

        it('should set `value` to be 0.', function() {
            except(numberInput.data.value).to.be(0);
        });

        describe('#add(value)', function() {
            it('should add value.', function() {
                numberInput.add(5);
                numberInput.$update();

                except(numberInput.data.value).to.be(5);
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
            except(numberInput.data.value).to.be(6);
        });
    });

    describe('initialized to be disabled', function() {
        var numberInput = new NumberInput({
            data: {
                disabled: true
            }
        });
        
        it('should set `value` to be 0.', function() {
            except(numberInput.data.value).to.be(0);
        });

        describe('#add(value)', function() {
            it('should not react.', function() {
                var oldValue = numberInput.data.value;
                numberInput.add();
                numberInput.$update();

                except(numberInput.data.value).to.be(oldValue);
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
            except(numberInput.data.value).to.be(2);
        });

        it('should check if out of the range after set a new `value`.', function() {
            numberInput.data.value = 18;
            numberInput.$update();

            except(numberInput.data.value).to.be(7);
        });

        it('should check if out of the range after set a new `minValue` or `maxValue`.', function() {
            numberInput.data.max = 5;
            numberInput.$update();

            except(numberInput.data.value).to.be(5);
        });
    });

    describe('initialized with wrong range where `min` > `max`', function() {
        it('should throw a NumberRangeException.', function() {
            try {
                var numberInput = new NumberInput({
                    data: {
                        min: 12,
                        max: 7
                    }
                });
            } catch (e) {
                except(e).to.be.a(NumberInput.NumberRangeException);
            }
        });
    });
});