var expect = require('expect.js');
var DatePicker = require('../../../src/js/unit/datePicker.js');
var Calendar = require('../../../src/js/module/calendar.js');

describe('DatePicker', function() {
    var MS_OF_DAY = 24*3600*1000;

    var today = new Date((new Date/MS_OF_DAY>>0)*MS_OF_DAY);
    var today_2 = new Date(+new Date + 2*MS_OF_DAY);
    var today_7 = new Date(+new Date + 7*MS_OF_DAY);

    describe('initialized without params', function() {
        var datePicker = new DatePicker();

        it('should not have a value.', function() {
            expect(datePicker.data.date).to.be(null);
        });

        describe('#select(date)', function() {
            it('should select correct date.', function() {
                var date = new Date(+new Date + 4*MS_OF_DAY);
                datePicker.select(date);
                datePicker.$update();

                expect(datePicker.data.date - date).to.be(0);
            });
        });

        describe('#_input($event)', function() {
            it('should change `date` property and sync it to Calendar component if a valid date inputed.', function() {
                var $event = {target: {value: '2012-12-21'} }
                datePicker._input($event);
                datePicker.$update();

                expect(datePicker.data.date - new Date('2012-12-21')).to.be(0);
                expect(datePicker.data._date - new Date('2012-12-21')).to.be(0);
            });

            it('should change `date` property to `null` and should not sync it to Calendar component if an empty-string inputed.', function() {
                var old_date = datePicker.data._date;

                var $event = {target: {value: ''} }
                datePicker._input($event);
                datePicker.$update();

                expect(datePicker.data.date).to.be(null);
                expect(datePicker.data._date).to.be(old_date);
            });

            it('should neither change `date` property nor sync it to Calendar component if an invalid date inputed.', function() {
                var oldDate = datePicker.data.date;
                var old_date = datePicker.data._date;

                var $event = {target: {value: 'abc'} }
                datePicker._input($event);
                datePicker.$update();

                expect(datePicker.data.date).to.be(oldDate);
                expect(datePicker.data._date).to.be(old_date);
            });
        });

        describe('#isOutOfRange(date)', function() {
            it('should return false with any date.', function() {
                expect(datePicker.isOutOfRange(today_7)).not.to.be.ok();
            });
        });
    });

    describe('initialized with string-type `date`', function() {
        var datePicker = new DatePicker({
            data: {
                date: '2008-08-08'
            }
        });
        
        it('should convert `date` property from string-type to Date-type.', function() {
            expect(datePicker.data.date).to.be.a(Date);
            expect(datePicker.data.date - new Date('2008-08-08')).to.be(0);
        });

        it('should sync `date` property to Calendar component.', function() {
            expect(datePicker.data._date.toDateString()).to.be(datePicker.data.date.toDateString());
        });
    });

    describe('initialized with Date-type `date`', function() {
        var datePicker = new DatePicker({
            data: {
                date: today_2
            }
        });
        
        it('should sync `date` property to Calendar component.', function() {
            expect(datePicker.data._date.toDateString()).to.be(datePicker.data.date.toDateString());
        });


        it('should check if out of the range after set a new `minDate` value.', function() {
            datePicker.data.minDate = today_7;
            datePicker.$update();

            expect(datePicker.data.date.toDateString()).to.be(today_7.toDateString());
        });
    });

    describe('initialized to be disabled', function() {
        var datePicker = new DatePicker({
            data: {
                disabled: true
            }
        });

        it('should not have a value.', function() {
            expect(datePicker.data.date).to.be(null);
        });

        describe('#select(date)', function() {
            it('should not react.', function() {
                var oldDate = datePicker.data.date;

                var date = new Date(+new Date + 4*MS_OF_DAY);
                datePicker.select(date);
                datePicker.$update();

                expect(datePicker.data.date).to.be(oldDate);
            });
        });
    });

    describe('initialized with Date-type `minDate` and `maxDate`', function() {
        var datePicker = new DatePicker({
            data: {
                minDate: today_2,
                maxDate: today_7
            }
        });

        it('should check if out of the range after set a new `date` value.', function() {
            datePicker.data.date = new Date(+new Date + 16*MS_OF_DAY);
            datePicker.$update();

            expect(datePicker.data.date.toDateString()).to.be(today_7.toDateString());
        });

        describe('#isOutOfRange(date)', function() {
            it('should return true if out of range.', function() {
                expect(datePicker.isOutOfRange(today)).to.be.ok();
            });

            it('should return false if in the range.', function() {
                expect(datePicker.isOutOfRange(new Date(+new Date + 3*MS_OF_DAY))).not.to.be.ok();
            });
        });
    });

    describe('initialized with string-type `minDate` and `maxDate`', function() {
        var datePicker = new DatePicker({
            data: {
                minDate: '2008-08-08',
                maxDate: '2008-08-16'
            }
        });
        
        it('should convert `minDate` and `maxDate` property from string-type to Date-type.', function() {
            expect(datePicker.data.minDate).to.be.a(Date);
            expect(datePicker.data.maxDate).to.be.a(Date);
        });
    });

    describe('initialized with wrong range where `minDate` > `maxDate`', function() {
        it('should throw a DateRangeException.', function() {
            try {
                var datePicker = new DatePicker({
                    data: {
                        minDate: today_7,
                        maxDate: today_2
                    }
                });
            } catch(e) {
                expect(e).to.be.a(Calendar.DateRangeException);
            }
        });
    });
});