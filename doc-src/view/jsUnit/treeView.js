var TreeView = RGUI.TreeView;
var Regular = RGUI.Regular;
var ajax = RGUI.request;
var _ = RGUI._;

var source = [
    {id: 1, name: '节点1', children: [
        {id: 11, name: '节点1.1'},
        {id: 12, name: '节点1.2', children: [
            {id: 101, name: '节点1.2.1'},
            {id: 102, name: '节点1.2.2'}
        ]},
        {id: 13, name: '节点1.3'},
        {id: 14, name: '节点1.4'},
    ]},
    {id: 2, name: '节点2'},
    {id: 3, name: '节点3', children: [
        {id: 15, name: '节点3.1'},
        {id: 16, name: '节点3.2'}
    ]}
];

// 基本形式
(function() {
    var treeView = new TreeView({
        data: {
            source: source
        }
    }).$inject('#j-example1');
})();

// 禁用
(function() {
    var treeView = new TreeView({
        data: {
            source: source,
            disabled: true
        }
    }).$inject('#j-example2');
})();

// 远程数据
(function() {
    var service = {
        getList: function(params, callback) {
            ajax.request({
                url: 'treeview.json',
                method: 'get',
                type: 'json',
                success: function(data) {
                    callback && callback(data);
                }
            });
        }
    };

    var treeView = new TreeView({
        service: service
    }).$inject('#j-example3');
})();

// 分级加载
(function() {
    var service = {
        getList: function(params, callback) {
            ajax.request({
                url: 'treeview2.json',
                method: 'get',
                type: 'json',
                success: function(data) {
                    callback && callback(data);
                }
            });
        }
    };

    var treeView = new TreeView({
        service: service,
        data: {
            hierarchical: true
        }
    }).$inject('#j-example4');
})();

// 自定义选择项
(function() {
    var itemTemplate = _.multiline(function(){/*    
    <i class="u-icon {item.type === 'directory' ? (item.open ? 'u-icon-folder-open' : 'u-icon-folder') : 'u-icon-file-text'}"></i> {item.name}
    */});

    var service = {
        getList: function(params, callback) {
            ajax.request({
                url: 'treeview2.json',
                method: 'get',
                type: 'json',
                success: function(data) {
                    callback && callback(data);
                }
            });
        }
    };
    var treeView = new TreeView({
        service: service,
        data: {
            hierarchical: true,
            itemTemplate: itemTemplate
        }
    }).$inject('#j-example5');
})();


// 拖拽
(function() {
    var win = window;
    // 获得盒子的的boundingRect
   function getRect(elem) {
       var docElem, body, win, clientTop, clientLeft, scrollTop, scrollLeft,
           box = {
               top: 0,
               left: 0
           },
           doc = elem && elem.ownerDocument,
           win = window,
           body = doc.body;

       if (!doc) return;
       docElem = doc.documentElement;

       if (typeof elem.getBoundingClientRect !== "undefined") {
           box = elem.getBoundingClientRect();
       }

       clientTop = docElem.clientTop || body.clientTop || 0;
       clientLeft = docElem.clientLeft || body.clientLeft || 0;
       scrollTop = win.pageYOffset || docElem.scrollTop;
       scrollLeft = win.pageXOffset || docElem.scrollLeft;

       return {
           top: box.top + scrollTop - clientTop,
           left: box.left + scrollLeft - clientLeft
       };
   }

    var dom = Regular.dom;

    function start(ev) {
        // delay
        if(ev.which === 3) return;
        tid = setTimeout(function function_name(argument) {
            dom.on(document, 'mousemove', move);
            dom.on(document, 'mouseup', end);
            fire({
                type: 'dragstart',
                target: elem,
                pageX: ev.pageX,
                pageY: ev.pageY
            });
        }, 200)
        dom.on(document, 'mousemove', stopDocument)
    }
    function DragModule(Component){
        Component.implement({
        })

        Component.directive({
            'dragarea': function(elem, value){
                var dragItems = this._dragItems;

                function dragMove(ev){
                    if(!this.dragInfo) return;
                    var dragInfo = this.dragInfo;
                    if (win.getSelection) {
                       win.getSelection().removeAllRanges();
                    } else if (win.document.selection) {
                       win.document.selection.empty();
                    }
                    var targetX = ev.pageX - document.body.scrollLeft;
                    var targetY = ev.pageY - (win.pageYOffset || document.documentElement.scrollTop);

                    dragInfo.container.style.left = ev.pageX - dragInfo.start.pageX + dragInfo.start.left + 'px';
                    dragInfo.container.style.top = ev.pageY - dragInfo.start.pageY + dragInfo.start.top + 'px';

                    var target = document.elementFromPoint(targetX, targetY);
                    if(target.className.indexOf('treeview_itemname') === -1 ) return;


                    var targetOffset = getRect(target);
                    var breakPoint = target.offsetHeight/3;
                    if(ev.pageY - targetOffset.top < breakPoint){ // 上
                        var swap = target.parentNode.parentNode;
                        dom.inject(dragInfo.placeholder, swap, 'before')
                        dragInfo.swap = {
                            key: swap.key,
                            'position': 'before'
                        }
                    }else if(targetOffset.top + target.offsetHeight - ev.pageY < breakPoint){
                        var swap = target.parentNode.parentNode;
                        dom.inject(dragInfo.placeholder, swap, 'after')
                        dragInfo.swap = {
                            key: swap.key,
                            'position': 'after'
                        }
                    }else{ // 在中间位置
                        var swap = target.parentNode.parentNode;
                        // @TODO: 当在节点上时 ， 我们怎么做？
                        dragInfo.swap = {
                            key: swap.key,
                            'position': 'bottom'
                        }
                    }
                }

                function dragEnd(){
                    if(this.dragInfo){
                        var dragInfo = this.dragInfo;
                        var container = dragInfo.container;
                        dom.delClass( container, 'z-drag');
                        dom.remove(dragInfo.placeholder);
                        dom.inject(container, dragInfo.elem);

                        dragInfo.elem.style.display=''
                        dragInfo.container.style.cssText=''
                        this.$emit('dragend', {
                            key: dragInfo.elem.key,
                            swap: dragInfo.swap
                        });
                    }
                    this.dragInfo = null;
                }

                dom.on(document.body, 'mousemove', dragMove.bind(this))
                dom.on(document.body, 'mouseup', dragEnd.bind(this))
            },
            'dragitem': function(elem, value){
                elem.key = this.$get(value);// 获得传入的标示符
                var tagName = elem.tagName.toLowerCase();
                var tid, self = this;

                var dragInfo = {
                    elem: elem,
                    start: {},
                    container: elem.getElementsByTagName('div')[0],
                    placeholder: null
                }
                // 当真的触发时
                function realStart(ev){
                    if(ev.which === 3) return;
                   var container = dragInfo.container
                   var width = elem.offsetWidth;
                   var height = elem.offsetHeight; 
                   dragInfo.start.pageX = ev.pageX;
                   dragInfo.start.pageY = ev.pageY;

                   self.dragInfo = dragInfo

                   var rect = getRect(elem);

                   dragInfo.start.left = rect.left;
                   dragInfo.start.top = rect.top;

                   dom.inject(container, document.body);
                   elem.style.display = 'none';

                   this.treeroot.dragInfo = dragInfo;
                   // this.$emit('dragitem', dragInfo);

                   dom.addClass(container, 'z-drag')
                   container.style.position = 'absolute';
                   container.style.top = rect.top +'px';
                   container.style.left = rect.left +'px';
                   container.style.opacity = '0.8';
                   container.style.width = width + 'px';
                   var placeholder = /*dragInfo.placeholder ||*/ ( dragInfo.placeholder = document.createElement(tagName) );
                   placeholder.className = 'u-tplaceholder';
                   placeholder.style.width = width + 'px';
                   placeholder.style.height = height + 'px';
                   dom.inject(placeholder, elem, 'after' );
                }
                function start(ev){
                    tid = setTimeout(function(){
                       realStart.call(self, ev)    
                    } ,200) 
                    ev.stopPropagation();
                }
                function cancel(ev){

                    clearTimeout(tid);
                }

                dom.on( elem, 'mousedown', start )
                dom.on( elem, 'mouseup', cancel )
            }
        })
    }

    var source = [
        {id: 1, name: '节点1', children: [
            {id: 11, name: '节点1.1'},
            {id: 12, name: '节点1.2', children: [
                {id: 101, name: '节点1.2.1'},
                {id: 101, name: '节点1.2.1'},
                {id: 101, name: '节点1.2.1'},
                {id: 102, name: '节点1.2.2'}
            ]},
            {id: 13, name: '节点1.3'},
            {id: 14, name: '节点1.4'},
        ]},
        {id: 2, name: '节点2'},
        {id: 3, name: '节点3', children: [
            {id: 15, name: '节点3.1'},
            {id: 16, name: '节点3.2'}
        ]},
        {id: 4, name: '节点4'},
        {id: 5, name: '节点5'},
        {id: 6, name: '节点6'}
    ];


    var template = _.multiline(function(){/*
<ul class="treeview_list" r-class={ {'z-dis': disabled} } r-hide={!visible}>
    {#list source as item}
    <li>
        <div class="treeview_item">
            {#if item.childrenCount || (item.children && item.children.length)}
            <i class="u-icon" r-class={ {'u-icon-caret-right': !item.open, 'u-icon-caret-down': item.open}} on-click={this.toggle(item)}></i>
            {/if}
            <div class="treeview_itemname" r-class={ {'z-sel': this.treeroot.data.selected === item} } on-click={this.select(item)}>{#if @(itemTemplate)}{#include @(itemTemplate)}{#else}{item.name}{/if}</div>
        </div>
        {#if item.childrenCount || (item.children && item.children.length)}<treeViewList source={item.children} visible={item.open} parent={item} />{/if}
    </li>
    {/list}
</ul>
    */})


    Regular.use(DragModule);

    var drag = new TreeView({
        data: {
            source: source
        },
        events: {
            dragend: function(info){
                this.insert(info.key, info.swap.key, info.swap.position)
                this.$update();

            }
        },
        insert: function(item1, item2, position){

            if(item1 === item2) return;
            var old = this.findListAndPosition(this.data.source, item1);
            // 我们先将index 排除
            old.list.splice(old.index,1)
            var point = this.findListAndPosition(this.data.source,item2)
            if(!point) return;
            if(position === 'before'){
                point.list.splice(point.index, 0, item1)
            }else if(position === 'after'){
                point.list.splice(point.index+1, 0, item1)
                // console.log(JSON.stringify(point.list))
            }else{ // 说明是bottom
                if(item2.children){
                    item2.children.push(item1);
                }
            }
        },
        findListAndPosition: function(list, item){
            if(!list || !list.length) return ;
            var len = list.length, result;
            for(;len--;){
                var test = list[len];
                if(item == test) return {list: list, index: len}
                else if(test.children && test.children.length){
                    result = this.findListAndPosition(test.children, item);
                    if(result) return result;
                }
            }
        }
    }).$inject("#j-example6")

})();


