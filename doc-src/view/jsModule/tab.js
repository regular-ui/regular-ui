var Component = RGUI.Component;
var _ = RGUI._;

var example1 = new Component({
    template: _.multiline(function(){/*
<tab>
    <tabPane title="test1">
        test1
    </tabPane>
    <tabPane title="test2">
        test2
    </tabPane>
    <tabPane title="test3">
        test3
    </tabPane>
</tab>
    */})
}).$inject('#j-example1');