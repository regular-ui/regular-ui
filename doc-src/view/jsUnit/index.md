### JS元件

<div class="m-example m-example-hidden"></div>

```xml
<p>
<dropdown source={source} />
<menu source={source} />
<select2 source={source} />
<numberInput />
</p>
<p>
<suggest placeholder="Suggest" source={suggestSource} />
<datePicker placeholder="DatePicker" />
<dateTimePicker placeholder="DateTimePicker" />
</p>
<p>
<check2Group source={source} />
<radio2Group source={source} />
</p>
<p>
<progress percent="36" />
<progress percent="25" state="success" />
<progress percent="50" state="warning" />
<progress percent="75" state="error" />
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
            {name: '选项1', children: [
                {name: '选项1.1'},
                {name: '选项1.2', children: [
                    {name: '选项1.2.1'},
                    {name: '选项1.2.2'}
                ]},
                {name: '选项1.3'},
                {name: '选项1.4'},
            ]},
            {name: '选项2'},
            {name: '选项3', children: [
                {name: '选项3.1'},
                {name: '选项3.2'}
            ]}
        ],
        suggestSource: [
            {name: 'abandon'},
            {name: 'about'},
            {name: 'absent'},
            {name: 'bread'},
            {name: 'break'},
            {name: 'brief'},
            {name: 'calendar'},
            {name: 'cancel'},
            {name: 'column'}
        ]
    }
});
```
