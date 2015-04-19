var TableView = RGUI.TableView;
var _ = RGUI._;
var ajax = RGUI.request;

var source = [
    {id: 3, name: '精通Javascript开发', org: '前端Funs', hits: 42371},
    {id: 2, name: 'Android深入浅出', org: 'Android学院', hits: 30645},
    {id: 1, name: 'cocos2dx游戏开发教程', org: '鱼C课程', hits: 25112},
    {id: 4, name: 'MySQL数据库', org: 'LAMP兄弟连', hits: 18089},
    {id: 5, name: 'Arduino初级教程', org: '硬件社', hits: 16361}
];

var itemTemplate = _.multiline(function(){/*
<div class="u-courceitem">
    <div><img src="{item.img}" alt="{item.name}" title="{item.name}"></div>
    <div><a href="#">{item.name}</a></div>
    <div>
        <span class="org">{item.org}</span>
        <span class="hits f-fr"><i class="f-icon f-icon-user"></i> {item.hits}</span>
    </div>
</div>
*/});

// 基本形式
(function() {
    var tableView = new TableView({
        data: {
            source: source,
            fields: [
                {key: 'name', name: '课程'},
                {key: 'org', name: '机构'},
                {key: 'hits', name: '点击率'}
            ]
        }
    }).$inject('#j-example1');
})();

// 排序
(function() {
    var tableView = new TableView({
        data: {
            source: source,
            fields: [
                {key: 'name', name: '课程', sortable: true},
                {key: 'org', name: '机构'},
                {key: 'hits', name: '点击率', sortable: true}
            ]
        }
    }).$inject('#j-example2');
})();