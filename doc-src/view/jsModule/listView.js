var ListView = RGUI.ListView;
var _ = RGUI._;
var ajax = RGUI.request;


// 基本形式
(function() {
    var source = [
        {id: 1, name: '选项1'},
        {id: 2, name: '选项2'},
        {id: 3, name: '选项3'}
    ];

    var listView = new ListView({
        data: {
            source: source
        }
    }).$inject('#j-example1');
})();

// 禁用
(function() {
    var source = [
        {id: 1, name: '选项1'},
        {id: 2, name: '选项2'},
        {id: 3, name: '选项3'}
    ];

    var listView = new ListView({
        data: {
            source: source,
            disabled: true
        }
    }).$inject('#j-example2');
})();

// 远程数据
(function() {
    var service = {
        getList: function(params, success) {
            ajax.request({
                url: 'listbox.json',
                method: 'get',
                type: 'json',
                success: success
            });
        }
    };

    var listView = new ListView({
        service: service
    }).$inject('#j-example3');
})();

// 单项模板自定义
(function() {
    var source = [
        {id: 3, name: '精通Javascript开发', org: '前端Funs', hits: 42371},
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
   
    var listView = new ListView({
        data: {
            itemTemplate: itemTemplate,
            source: source
        }
    }).$inject('#j-example4');
})();