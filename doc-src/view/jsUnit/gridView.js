var GridView = RGUI.GridView;
var _ = RGUI._;
var ajax = RGUI.request;

var source = [
    {id: 3, name: '精通Javascript开发', img: '../dataimg/courceitem-javascript.jpg', org: '前端Funs', hits: 42371},
    {id: 2, name: 'Android深入浅出', img: '../dataimg/courceitem-android.jpg', org: 'Android学院', hits: 30645},
    {id: 1, name: 'cocos2dx游戏开发教程', img: '../dataimg/courceitem-cocos2dx.jpg', org: '鱼C课程', hits: 25112},
    {id: 4, name: 'MySQL数据库', img: '../dataimg/courceitem-mysql.jpg', org: 'LAMP兄弟连', hits: 18089},
    {id: 5, name: 'Arduino初级教程', img: '../dataimg/courceitem-arduino.jpg', org: '硬件社', hits: 16361}
];

var itemTemplate = _.multiline(function(){/*
<div class="u-courceitem">
    <div><img src="{item.img}" alt="{item.name}" title="{item.name}"></div>
    <div><a href="#">{item.name}</a></div>
    <div>
        <span class="org">{item.org}</span>
        <span class="hits f-fr"><i class="u-icon u-icon-user"></i> {item.hits}</span>
    </div>
</div>
*/});

// 基本形式
(function() {
    var gridView = new GridView({
        data: {
            itemTemplate: itemTemplate,
            source: source
        }
    }).$inject('#j-example1');
})();