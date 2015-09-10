var except = require('expect.js');
var Calendar = require('../../../src/js/module/calendar.js');

describe('Calendar', function() {
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
        var calendar = new Calendar();
        
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

        describe('#goToday()', function() {
            it('should go back today.', function() {
                calendar.select(today_7);
                calendar.$update();

                calendar.goToday();
                calendar.$update();

                except(calendar.data.date - today).to.be(0);
            });
        });

        describe('#isOutOfRange(date)', function() {
            it('should return false with any date.', function() {
                except(calendar.isOutOfRange(today_7)).not.to.be.ok();
            });
        });

        describe('#on-change', function() {
            // 暂时没有好方法
            xit('should not emit if date is not changed.', function() {
                calendar.$on('change', function() {
                    except().fail();
                });
                calendar.data.date = new Date();
                calendar.$update();
            });
        });
    });

    describe('initialized with string-type `date`', function() {
        var calendar = new Calendar({
            data: {
                date: '2008-08-08'
            }
        });
        
        it('should convert `date` property from string-type to Date-type.', function() {
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
        });
        
        it('should select this day.', function() {
            except(calendar.data.date - today_2).to.be(0);
        });

        it('should output `_days` of this month.', function() {
            except(calendar.data._days.length >= 28).to.be.ok();
        });


        it('should check if out of the range after set a new `minDate` or `maxDate` value.', function() {
            calendar.data.minDate = today_7;
            calendar.$update();

            except(calendar.data.date.toDateString()).to.be(today_7.toDateString());
        });
    });

    describe('initialized to be disabled', function() {
        var calendar = new Calendar({
            data: {
                disabled: true
            }
        });
        
        it('should select today by default.', function() {
            except(calendar.data.date - today).to.be(0);
        });

        it('should output `_days` of this month.', function() {
            except(calendar.data._days.length >= 28).to.be.ok();
        });

        describe('#select(date)', function() {
            it('should not react.', function() {
                var oldDate = calendar.data.date;

                var date = new Date(+new Date + 4*MS_OF_DAY);
                calendar.select(date);
                calendar.$update();

                except(calendar.data.date).to.be(oldDate);
            });
        });

        describe('#addMonth(month)', function() {
            it('should not react.', function() {
                var oldDate = calendar.data.date;

                calendar.addMonth(1);
                calendar.$update();

                except(calendar.data.date).to.be(oldDate);
            });
        });

        describe('#addYear(month)', function() {
            it('should not react.', function() {
                var oldDate = calendar.data.date;

                calendar.addYear(3);
                calendar.$update();

                except(calendar.data.date).to.be(oldDate);
            });
        });

        describe('#goToday()', function() {
            it('should not react.', function() {
                var oldDate = calendar.data.date;

                calendar.select(today_7);
                calendar.$update();

                calendar.goToday();
                calendar.$update();

                except(calendar.data.date).to.be(oldDate);
            });
        });
    });

    describe('initialized with Date-type `minDate` and `maxDate`', function() {
        var calendar = new Calendar({
            data: {
                minDate: today_2,
                maxDate: today_7
            }
        });
        
        it('should select the boundary date if out of range.', function() {
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

        describe('#isOutOfRange(date)', function() {
            it('should return true if out of range.', function() {
                except(calendar.isOutOfRange(today)).to.be.ok();
                except(calendar.isOutOfRange(today).toDateString()).to.be(today_2.toDateString());
            });

            it('should return false if in the range.', function() {
                except(calendar.isOutOfRange(new Date(+new Date + 3*MS_OF_DAY))).not.to.be.ok();
            });
        });
    });

    describe('initialized with string-type `minDate` and `maxDate`', function() {
        var calendar = new Calendar({
            data: {
                minDate: '2008-08-08',
                maxDate: '2008-08-16'
            }
        });
        
        it('should select the boundary date if out of range.', function() {
            except(calendar.data.date - new Date('2008-08-16')).to.be(0);
        });
    });

    describe('initialized with wrong range where `minDate` > `maxDate`', function() {
        it('should throw a DateRangeException.', function() {
            try {
                var calendar = new Calendar({
                    data: {
                        minDate: today_7,
                        maxDate: today_2
                    }
                });
            } catch (e) {
                except(e).to.be.a(Calendar.DateRangeException);
            }
        });
    });
});