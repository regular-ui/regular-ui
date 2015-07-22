### 示例
#### 基本形式

<div id="j-example1"></div>

```xml
<menu source={source} />
```

```javascript
...
    this.data.source = [
        {id: 1, name: '选项1', children: [
            {id: 11, name: '选项1.1'},
            {id: 12, name: '选项1.2', children: [
                {id: 101, name: '选项1.2.1'},
                {id: 102, name: '选项1.2.2'}
            ]},
            {id: 13, name: '选项1.3'},
            {id: 14, name: '选项1.4'},
        ]},
        {id: 2, name: '选项2'},
        {id: 3, name: '选项3', children: [
            {id: 15, name: '选项3.1'},
            {id: 16, name: '选项3.2'}
        ]}
    ];
...
```
