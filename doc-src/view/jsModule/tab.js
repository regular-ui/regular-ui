var Component = RGUI.Component;
var _ = RGUI._;

// 基本形式
(function() {
    var example1 = new Component({
        template: _.multiline(function(){/*
<tab>
    <tabPane name="tab1">content1</tabPane>
    <tabPane name="tab2">content2</tabPane>
    <tabPane name="tab3" disabled={true}>content3</tabPane>
    <tabPane name="tab4">content4</tabPane>
</tab>
        */})
    }).$inject('#j-example1');
})();

// 居中
(function() {
    var example2 = new Component({
        template: _.multiline(function(){/*
<tab class="m-tab-center">
    <tabPane name="tab1">content1</tabPane>
    <tabPane name="tab2">content2</tabPane>
    <tabPane name="tab3" disabled={true}>content3</tabPane>
    <tabPane name="tab4">content4</tabPane>
</tab>
        */})
    }).$inject('#j-example2');
})();

// 垂直居左
(function() {
    var example3 = new Component({
        template: _.multiline(function(){/*
<tab class="m-tab-left">
    <tabPane name="tab1">content1</tabPane>
    <tabPane name="tab2">content2</tabPane>
    <tabPane name="tab3" disabled={true}>content3</tabPane>
    <tabPane name="tab4">content4</tabPane>
</tab>
        */})
    }).$inject('#j-example3');
})();

// 垂直居右
(function() {
    var example4 = new Component({
        template: _.multiline(function(){/*
<tab class="m-tab-right">
    <tabPane name="tab1">content1</tabPane>
    <tabPane name="tab2">content2</tabPane>
    <tabPane name="tab3" disabled={true}>content3</tabPane>
    <tabPane name="tab4">content4</tabPane>
</tab>
        */})
    }).$inject('#j-example4');
})();

// 禁用组件
(function() {
    var example5 = new Component({
        template: _.multiline(function(){/*
<tab disabled={true}>
    <tabPane name="tab1">content1</tabPane>
    <tabPane name="tab2">content2</tabPane>
    <tabPane name="tab3">content3</tabPane>
    <tabPane name="tab4">content4</tabPane>
</tab>
        */})
    }).$inject('#j-example5');
})();