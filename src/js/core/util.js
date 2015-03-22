var _ = {
    extend: function(o1, o2, override) {
        for(var i in o2)
            if(override || o1[i] === undefined)
                o1[i] = o2[i]
        return o1;
    },
    addEvent: function(element, event, callback) {
        element.addEventListener(event, callback);
    }
}

module.exports = _;