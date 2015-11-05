### JS模块一览

<div class="m-example m-example-hidden"></div>

```xml
<p>
<tabs>
    <tab title="tab1">content1</tab>
    <tab title="tab2">content2</tab>
    <tab title="tab3" disabled>content3</tab>
    <tab title="tab4">content4</tab>
</tabs>
</p>
<p>
<pager current="6" total="11" position="left" />
</p>
<p>
<button class="u-btn u-btn-info" on-click={this.showMessage('info')}>Info</button>
<button class="u-btn u-btn-success" on-click={this.showMessage('success')}>Success</button>
<button class="u-btn u-btn-warning" on-click={this.showMessage('warning')}>Warning</button>
<button class="u-btn u-btn-error" on-click={this.showMessage('error')}>Error</button>
<button class="u-btn u-btn-primary" on-click={this.showModal()}>Modal</button>
<button class="u-btn u-btn-error" on-click={this.showAlert()}>Alert</button>
<button class="u-btn u-btn-success" on-click={this.showConfirm()}>Confirm</button>
</p>
<p>
<treeView source={treeSource} />
</p>
<p>
<calendar />
</p>
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'}
        ],
        treeSource: [
            {name: '节点1', children: [
                {name: '节点1.1'},
                {name: '节点1.2', children: [
                    {name: '节点1.2.1'},
                    {name: '节点1.2.2'}
                ]},
                {name: '节点1.3'},
                {name: '节点1.4'},
            ]},
            {name: '节点2'},
            {name: '节点3', children: [
                {name: '节点3.1'},
                {name: '节点3.2'}
            ]}
        ],
    },
    showMessage: function(type) {
        RGUI.Notify.show(type + ' message.', type);
    },
    showModal: function() {
        var modal = new RGUI.Modal({
            data: {
                title: 'Modal标题',
                content: 'Modal内容'
            }
        });
    },
    showAlert: function() {
        RGUI.Modal.alert('Alert内容');
    },
    showConfirm: function() {
        RGUI.Modal.confirm('Confirm内容');
    }
});
```
