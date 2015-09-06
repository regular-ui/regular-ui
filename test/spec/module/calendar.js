var except = require('expect.js');
var Calendar = require('../../../src/js/module/calendar.js');

describe('Calendar', function() {
    document.body.innerHTML = '';

    var MS_OF_DAY = 24*3600*1000;

    var today = new Date((new Date/MS_OF_DAY>>0)*MS_OF_DAY);
    var today_2 = new Date(+new Date + 2*MS_OF_DAY);
    var today_7 = new Date(+new Date + 7*MS_OF_DAY);

    var isInCurrentMonth = function(calendar, date) {
        return calendar.data._days.some(function(day) {
            return day.toDateString() === date.toDateString();
        });
    }

    describe('initialized without params', function() {
        var calendar = new Calendar().$inject(document.body);
        
        it('should select today by default.', function() {
            except(calendar.data.date - today).to.be(0);
        });

        it('should output `_days` of this month.', function() {
            except(calendar.data._days.length >= 28).to.be.ok();
        });

        describe('#select(date)', function() {
            it('should select correct date.', function() {
                var date = new Date(+new Date + 4*MS_OF_DAY);
                calendar.select(date);
                calendar.$update();

                except(calendar.data.date - date).to.be(0);
            });

            it('should update `_days` after select next month.', function() {
                var date = new Date(+new Date + 30*MS_OF_DAY);
                calendar.select(date);
                calendar.$update();

                except(calendar.data.date - date).to.be(0);
                except(isInCurrentMonth(calendar, date)).to.be.ok();
            });
        });

        describe('#addMonth(month)', function() {
            it('should be "2015-09-30" instead of "2015-10-01" after "2015-08-31" added 1 month.', function() {
                var date = new Date('2015-08-31');
                calendar.data.date = date;
                calendar.$update();

                calendar.addMonth(1);
                calendar.$update();

                except(calendar.data.date - new Date('2015-09-30')).to.be(0);
            });

            it('should be "2015-08-31" instead of "2015-07-01" after "2015-08-31" added -2 monthes.', function() {
                var date = new Date('2015-08-31');
                calendar.data.date = date;
                calendar.$update();

                calendar.addMonth(-2);
                calendar.$update();

                except(calendar.data.date - new Date('2015-06-30')).to.be(0);
            });

            it('should be "2016-02-29" instead of "2016-03-01" after "2015-12-31" added 2 monthes.', function() {
                var date = new Date('2015-12-31');
                calendar.data.date = date;
                calendar.$update();

                calendar.addMonth(2);
                calendar.$update();

                except(calendar.data.date - new Date('2016-02-29')).to.be(0);
            });
        });

        describe('#addYear(year)', function() {
            it('should be "2017-02-28" instead of "2017-03-01" after "2016-02-29" added 1 year.', function() {
                var date = new Date('2016-02-29');
                calendar.data.date = date;
                calendar.$update();

                calendar.addYear(1);
                calendar.$update();

                except(calendar.data.date - new Date('2017-02-28')).to.be(0);
            });

            it('should be "2013-02-28" instead of "2013-03-01" after "2016-02-29" added -3 years.', function() {
                var date = new Date('2016-02-29');
                calendar.data.date = date;
                calendar.$update();

                calendar.addYear(-3);
                calendar.$update();

                except(calendar.data.date - new Date('2013-02-28')).to.be(0);
            });
        });
    });

    describe('initialized with string-type `date`', function() {
        var calendar = new Calendar({
            data: {
                date: '2008-08-08'
            }
        }).$inject(document.body);
        
        it('should change `date` property from string-type to Date-type.', function() {
            except(calendar.data.date).to.be.a(Date);
            except(calendar.data.date - new Date('2008-08-08')).to.be(0);
        });

        it('should output `_days` of this month.', function() {
            except(calendar.data._days.length >= 28).to.be.ok();
        });
    });

    describe('initialized with Date-type `date`', function() {
        var calendar = new Calendar({
            data: {
                date: today_2
            }
        }).$inject(document.body);
        
        it('should select this day.', function() {
            except(calendar.data.date - today_2).to.be(0);
        });

        it('should output `_days` of this month.', function() {
            except(calendar.data._days.length >= 28).to.be.ok();
        });
    });

    describe('initialized with Date-type `minDate` and `maxDate`', function() {
        var calendar = new Calendar({
            data: {
                minDate: today_2,
                maxDate: today_7
            }
        }).$inject(document.body);
        
        it('should select range date.', function() {
            except(calendar.data.date.toDateString()).to.be(today_2.toDateString());
        });

        it('should output `_days` of this month.', function() {
            except(calendar.data._days.length >= 28).to.be.ok();
        });

        it('should check if out of the range after set a new `date` value.', function() {
            calendar.data.date = new Date(+new Date + 16*MS_OF_DAY);
            calendar.$update();

            except(calendar.data.date.toDateString()).to.be(today_7.toDateString());
        });
    });

    describe('initialized with string-type `minDate` and `maxDate`', function() {
        var calendar = new Calendar({
            data: {
                minDate: '2008-08-08',
                maxDate: '2008-08-16'
            }
        }).$inject(document.body);
        
        it('should select range date.', function() {
            except(calendar.data.date - new Date('2008-08-16')).to.be(0);
        });
    });

    describe('initialized with wrong range where `minDate` > `maxDate`', function() {
        it('should throw a DateRangeError.', function() {
            try {
                var calendar = new Calendar({
                    data: {
                        minDate: today_7,
                        maxDate: today_2
                    }
                }).$inject(document.body);
            } catch (e) {
                except(e.type).to.be('DateRangeException');
            }
        });
    });
});