var except = require('expect.js');
var DatePicker = require('../../../src/js/unit/datePicker.js');

describe('DatePicker', function() {
    document.body.innerHTML = '';

    describe('initialized without params', function() {
        var datePicker = new DatePicker().$inject(document.body);

        it('should not have value.', function() {
            expect(datePicker.data.date).to.be(null);
        });
    });
});