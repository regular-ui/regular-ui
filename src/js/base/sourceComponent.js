var Component = require('./component.js');

var SourceComponent = Component.extend({
    service: null,
    $updateSource: function() {
        this.service.getList({}, function(data) {
            if(!data.success)
                return alert(data.message);

            this.$update('source', data.result);
        }.bind(this));
        return this;
    }
});

module.exports = SourceComponent;