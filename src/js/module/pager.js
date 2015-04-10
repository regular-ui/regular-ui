var Component = require("../base/component.js");
var template = require("./pager.html");

var Pager = Component.extend({
    name: "pager",
    template: template,
    // is called before compile. 一般用来处理数据
    config: function(data){
        var count =  5;
        var show = data.show = Math.floor( count/2 );
        data.current = parseInt(data.current || 1);
        data.total = parseInt(data.total || 1);

        this.$watch(['current', 'total'], function( current, total ){
            data.begin = current - show;
            data.end = current + show;
            if(data.begin < 2) data.begin = 2;
            if(data.end > data.total-1) data.end = data.total-1;
            if(current-data.begin <= 1) data.end = data.end + show + data.begin- current;
            if(data.end - current <= 1) data.begin = data.begin-show-current+ data.end;
        });
    },
    nav: function(page){
        var data = this.data;
        if(page < 1) return;
        if(page > data.total) return;
        if(page === data.current) return;
        data.current = page;
        this.$emit('nav', page);
        // preventDefault
        return false;
    }
});
module.exports = Pager;