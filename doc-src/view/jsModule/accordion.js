var Component = RGUI.Component;
var _ = RGUI._;

// 基本形式
(function() {
    var example1 = new Component({
        template: _.multiline(function(){/*
<accordion>
    <accordionPane name="accordion1">content1</accordionPane>
    <accordionPane name="accordion2">content2</accordionPane>
    <accordionPane name="accordion3" disabled={true}>content3</accordionPane>
    <accordionPane name="accordion4">content4</accordionPane>
</accordion>
        */})
    }).$inject('#j-example1');
})();
