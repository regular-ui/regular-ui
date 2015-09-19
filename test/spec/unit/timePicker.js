var expect = require('expect.js');
var TimePicker = require('../../../src/js/unit/timePicker.js');

describe('TimePicker', function() {
    describe('initialized without params', function() {
        var timePicker = new TimePicker();

        it('should set `time` to be "00:00".', function() {
            expect(timePicker.data.time).to.be('00:00');
            expect(timePicker.data.hour).to.be(0);
            expect(timePicker.data.minute).to.be(0);
        });

        describe('#isOutOfRange(time)', function() {
            it('should return false with any time.', function() {
                expect(timePicker.isOutOfRange('12:45')).not.to.be.ok();
            });
        });
    });

    describe('initialized with `time` param', function() {
        var timePicker = new TimePicker({
            data: {
                time: '18:45'
            }
        });

        it('should show correct time.', function() {
            expect(timePicker.data.time).to.be('18:45');
        });
    });

    describe('initialized with `minTime` and `maxTime` params', function() {
        var timePicker = new TimePicker({
            data: {
                minTime: '12:00',
                maxTime: '14:45'
            }
        });

        it('should select the boundary time if out of range.', function() {
            expect(timePicker.data.time).to.be('12:00');
        });

        it('should check if out of the range after set a new `time` value.', function() {
            timePicker.data.time = '18:00'
            timePicker.$update();

            expect(timePicker.data.time).to.be('14:45');
        });

        it('should check if out of the range after set a new `minTime` or `maxTime` value.', function() {
            timePicker.data.maxTime = '14:00'
            timePicker.$update();

            expect(timePicker.data.time).to.be('14:00');
        });

        describe('#isOutOfRange(time)', function() {
            it('should return true if out of range.', function() {
                expect(timePicker.isOutOfRange('18:00')).to.be.ok();
            });

            it('should return false if in the range.', function() {
                expect(timePicker.isOutOfRange('13:00')).not.to.be.ok();
            });
        });
    });

    describe('initialized with wrong range where `minTime` > `maxTime`', function() {
        it('should throw a TimeRangeException.', function() {
            try {
                var timePicker = new TimePicker({
                    data: {
                        minTime: '12:00',
                        maxTime: '10:00'
                    }
                });
            } catch(e) {
                expect(e).to.be.a(TimePicker.TimeRangeException);
            }
        });
    });
});