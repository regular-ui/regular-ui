'use strict';

var Regular = require("regularjs");
var filter = require("./filter.js");

var dom = Regular.dom; 

var Component = Regular.extend({
	// request
	$request: function(){}
})
.filter(filter)
.directive({
	// if expression evaluated to true then addClass z-crt.
	// otherwise, remove it
	// <li z-crt={this.$state.current.name==='app.test.exam.choice'}>
	"z-crt": function(elem, value){
	this.$watch(value, function(val){
		dom[val? 'addClass': 'delClass'](elem, 'z-crt');
	})
	},
	"q-render": function(elem, value){
	this.$watch(value, function(val){
		if(val) elem.innerHTML = qs.render(val)
	})
	}
})

module.exports = Component;