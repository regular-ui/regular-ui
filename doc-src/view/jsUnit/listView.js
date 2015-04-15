var ListView = RGUI.ListView;
var _ = RGUI._;
var ajax = RGUI.request;

var source = [
    {id: 3, name: '精通Javascript开发', org: '前端funs', hits: 42371},
    {id: 2, name: 'Android深入浅出', org: 'Android学院', hits: 30645},
    {id: 1, name: 'cocos2dx游戏开发教程', org: '鱼C课程', hits: 25112},
    {id: 4, name: 'MySQL数据库', org: 'LAMP兄弟连', hits: 18089},
    {id: 5, name: 'Arduino初级教程', org: '硬件社', hits: 16361}
];

var itemTemplate = _.multiline(function(){/*
<div>
    <span class="number">{item_index + 1}</span>
    <span class="title">{item.name}</span>
    <span class="hits f-fr">{item.hits}</span>
</div>
*/});

// 基本形式
(function() {
    var listView = new ListView({
        data: {
            itemTemplate: itemTemplate,
            source: source
        }
    }).$inject('#j-example1');
})();