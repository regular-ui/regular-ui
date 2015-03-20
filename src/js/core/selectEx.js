/*
 * --------------------------------------------
 * 下拉列表UI
 * @version  1.0
 * @author   zhaoyusen(hzzhaoyusen@corp.netease.com)
 * --------------------------------------------
 * @class SelectEx
 * @extend BaseComponent
 * @param {Object} options
 *     options.value             
 *              
 */

var BaseComponent = require('./base.js');
var template = require('./selectEx.html');
var _ = require('./util.js');

var SelectEx = BaseComponent.extend({
	name: 'selectEx',
	template: template,
	data: {
		selected: null,
		value: -1,
		defaultOption: '请选择',
		options: [],
		disabled: false,
		show: false,
		input: false,
		multiple: false
	},
	config: function() {
		this.$watch(['value'], function(value) {
			if(value < 0)
				this.data.selected = {id: -1, name: this.data.defaultOption}
			else {
				for(var i = 0; i < this.data.options.length; i++)
					if(this.data.options[i].id == value) {
						this.data.selected = this.data.options[i];
						break;
					}
			}
			this.$emit('onChange', this.data.selected);
		});
	},
	select: function(id) {
		//this.data.selected = option;
		this.data.value = id;
		this.toggle(false);
	},
	toggle: function(show) {
		if(this.data.disabled)
			return;

		this.data.show = show;

		var index = SelectEx.selectExsShown.indexOf(this);
		if(show && index < 0)
			SelectEx.selectExsShown.push(this);
		else if(!show && index >= 0)
			SelectEx.selectExsShown.splice(index, 1);
	}
});

SelectEx.selectExsShown = [];

_.addEvent(window.document, 'click', function(e) {
	SelectEx.selectExsShown.forEach(function(selectEx) {
		var element = selectEx.$refs.element;
		var element2 = e.target;
		while(element2) {
			if(element == element2)
				return;
			element2 = element2.parentElement;
		}
		selectEx.toggle(false);
		selectEx.$update();
	});
});

module.exports = SelectEx;