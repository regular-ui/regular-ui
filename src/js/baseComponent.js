var Regular = require("regularjs");
// var filter = require("../help/filter.js");

var dom = Regular.dom; 

var BaseComponent = Regular.extend({
	// request
	$request: function(){},

	// 考试相关， 懒得再弄个类了
	$authority: function(authority){
	var test = this.$state.test;
	return test && ( (test.authority||0) & authority)
	},
	$canSubmit: function(){
	var test = this.$state.test;
	return test && test.remainTime !== 0 && this.$authority(2);
	}
})
//.filter(filter)
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

module.exports = BaseComponent;