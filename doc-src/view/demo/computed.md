#### 单向计算属性

<div class="m-example"></div>

```xml
<form class="m-form">
    <div class="u-formitem">
        <label class="formitem_tt">苹果：</label>
        <span class="formitem_ct">
            <numberInput value={prices[0]} min=0 /> 元
        </span>
    </div>
    <div class="u-formitem">
        <label class="formitem_tt">香蕉：</label>
        <span class="formitem_ct">
            <numberInput value={prices[1]} min=0 /> 元
        </span>
    </div>
    <div class="u-formitem">
        <label class="formitem_tt">桔子：</label>
        <span class="formitem_ct">
            <numberInput value={prices[2]} min=0 /> 元
        </span>
    </div>
    <div class="u-formitem">
        <label class="formitem_tt">合计：</label>
        <span class="formitem_ct formitem_text">
            {allPrice}元
        </span>
    </div>
</form>
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        prices: [0, 0, 0]
    },
    computed: {
        allPrice: function() {
            var sum = 0;
            this.data.prices.forEach(function(price) {
                sum += price;
            });
            return sum;
        }
    }
});
```

#### 双向计算属性

<div class="m-example"></div>

```xml
<table class="m-table">
    <thead>
        <tr>
            <th width="12px"><input type="checkbox" r-model={allChecked} /></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
            <th>操作</th>
        </tr>
    </thead>
    <tbody>
        {#list list as item}
        <tr>
            <td><input type="checkbox" r-model={item.checked} /></td>
            <td>{item.title}</td>
            <td>{item.singer}</td>
            <td>{item.album}</td>
            <td>{item.duration}</td>
            <td></td>
            <td><a>下载</a></td>
        </tr>
        {/list}
    </tbody>
</table>
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        list: [
            {title: '晴天', singer: '周杰伦', album: ''},
            {title: 'bbb'},
            {title: 'ccc'},
            {title: 'ddd'},
            {title: 'eee'}
        ]
    },
    computed: {
        allChecked: {
            get: function() {
                return this.data.list.every(function(item) {
                    return item.checked;
                });
            },
            set: function(value) {
                this.data.list.forEach(function(item) {
                    item.checked = value;
                });
            }
        }
    }
});
```