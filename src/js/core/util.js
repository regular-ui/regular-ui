var _ = {
	extend: function(obj) {
		for (var i = 1; i < arguments.length; i++) {
			var target = arguments[i];
			for (var key in target) {
				if (Object.prototype.hasOwnProperty.call(target, key)) {
					obj[key] = target[key];
				}
			}
		}
		return obj;
	},
	addEvent: function(element, event, callback) {
		element.addEventListener(event, callback);
	}
}

module.exports = _;