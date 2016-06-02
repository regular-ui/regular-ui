var expect = require('expect.js');
var DateTimePicker = require('../../../src/js/unit/dateTimePicker.js');
var Calendar = require('../../../src/js/module/calendar.js');

describe('DateTimePicker', function() {
    var MS_OF_DAY = 24*3600*1000;

    var now = new Date;
    var today_2 = new Date(+new Date + 2*MS_OF_DAY);
    var today_7 = new Date(+new Date + 7*MS_OF_DAY);

    describe('initialized without params', function() {
        var dateTimePicker = new DateTimePicker();

        it('should not have a value.', function() {
            expect(dateTimePicker.data.date).to.be(null);
        });

        describe('#_onInput($event)', function() {
            it('should change `date` property and sync it to Calendar and TimePicker component if a valid date inputed.', function() {
                var $event = {target: {value: '2012-12-21 14:45'} }
                dateTimePicker._onInput($event);
                dateTimePicker.$update();

                expect(dateTimePicker.data.date - new Date('2012-12-21 14:45')).to.be(0);
                expect(+dateTimePicker.data._date - new Date('2012-12-21 14:45')).to.be(0);
                expect(dateTimePicker.data._time).to.be('14:45');
            });

            it('should change `date` property to `null` and should not sync it to Calendar and TimePicker components if an empty-string inputed.', function() {
                var old_date = dateTimePicker.data._date;
                var old_time = dateTimePicker.data._time;

                var $event = {target: {value: ''} }
                dateTimePicker._onInput($event);
                dateTimePicker.$update();

                expect(dateTimePicker.data.date).to.be(null);
                expect(dateTimePicker.data._date).to.be(old_date);
                expect(dateTimePicker.data._time).to.be(old_time);
            });

            it('should neither change `date` property nor sync it to Calendar and TimePicker component if an invalid date inputed.', function() {
                var oldDate = dateTimePicker.data.date;
                var old_date = dateTimePicker.data._date;
                var old_time = dateTimePicker.data._time;

                var $event = {target: {value: 'test'} }
                dateTimePicker._onInput($event);
                dateTimePicker.$update();

                expect(dateTimePicker.data.date).to.be(oldDate);
                expect(dateTimePicker.data._date).to.be(old_date);
                expect(dateTimePicker.data._time).to.be(old_time);
            });
        });
    });

    describe('initialized with string-type `date`', function() {
        var dateTimePicker = new DateTimePicker({
            data: {
                date: '2012-12-21 14:45'
            }
        });

        it('should convert `date` property from string-type to Date-type.', function() {
            expect(dateTimePicker.data.date).to.be.a(Date);
            expect(dateTimePicker.data.date - new Date('2012-12-21 14:45')).to.be(0);
        });

        it('should sync `date` property to Calendar and TimePicker components.', function() {
            expect(dateTimePicker.data._date.toDateString()).to.be(dateTimePicker.data.date.toDateString());
            expect(dateTimePicker.data._time).to.be(dateTimePicker.data.date.toTimeString().slice(0, 5));
        });
    });

    describe('initialized with Date-type `date`', function() {
        var dateTimePicker = new DateTimePicker({
            data: {
                date: today_2
            }
        });

        it('should sync `date` property to Calendar and TimePicker components.', function() {
            expect(dateTimePicker.data._date.toDateString()).to.be(dateTimePicker.data.date.toDateString());
            expect(dateTimePicker.data._time).to.be(dateTimePicker.data.date.toTimeString().slice(0, 5));
        });


        it('should check if out of the range after set a new `minDate` value.', function() {
            dateTimePicker.data.minDate = today_7;
            dateTimePicker.$update();

            expect(dateTimePicker.data.date - today_7).to.be(0);
        });
    });

    describe('initialized with invalid `date`', function() {
        it('should throw a TypeError.', function() {
            try {
                var dateTimePicker = new DateTimePicker({
                    data: {
                        date: 'test'
                    }
                });
            } catch (e) {
                expect(e).to.be.a(TypeError);
            }
        });
    });

    describe('initialized with Date-type `minDate` and `maxDate`', function() {
        var dateTimePicker = new DateTimePicker({
            data: {
                minDate: today_2,
                maxDate: today_7
            }
        });

        it('should check if out of the range after set a new `date` value.', function() {
            dateTimePicker.data.date = new Date(+new Date + 16*MS_OF_DAY);
            dateTimePicker.$update();

            expect(dateTimePicker.data.date - today_7).to.be(0);
        });

        describe('#isOutOfRange(date)', function() {
            it('should return true if out of range.', function() {
                expect(dateTimePicker.isOutOfRange(now)).to.be.ok();
            });

            it('should return false if in the range.', function() {
                expect(dateTimePicker.isOutOfRange(new Date(+new Date + 3*MS_OF_DAY))).not.to.be.ok();
            });
        });
    });

    describe('initialized with string-type `minDate` and `maxDate`', function() {
        var dateTimePicker = new DateTimePicker({
            data: {
                minDate: '2008-08-08 12:00',
                maxDate: '2008-08-12 14:45'
            }
        });

        it('should convert `minDate` and `maxDate` property from string-type to Date-type.', function() {
            expect(dateTimePicker.data.minDate).to.be.a(Date);
            expect(dateTimePicker.data.maxDate).to.be.a(Date);
        });
    });

    describe('initialized with wrong range where `minDate` > `maxDate`', function() {
        it('should throw a DateRangeError.', function() {
            try {
                var dateTimePicker = new DateTimePicker({
                    data: {
                        minDate: today_7,
                        maxDate: today_2
                    }
                });
            } catch(e) {
                expect(e).to.be.a(Calendar.DateRangeError);
            }
        });
    });

    describe('initialized with invalid `minDate` or invalid `maxDate`', function() {
        it('should throw a TypeError.', function() {
            try {
                var dateTimePicker = new DateTimePicker({
                    data: {
                        minDate: 'test'
                    }
                });
            } catch (e) {
                expect(e).to.be.a(TypeError);
            }

            try {
                var dateTimePicker = new DateTimePicker({
                    data: {
                        maxDate: 'test'
                    }
                });
            } catch (e) {
                expect(e).to.be.a(TypeError);
            }
        });
    });
});
