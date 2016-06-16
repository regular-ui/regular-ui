Regular UI在[Normalize.css](http://necolas.github.com/normalize.css)的基础上优化了一些HTML元素的默认样式。

## 示例
### 标题

`<h1> - <h6>`标签保持了粗体，设置了边距。可以用`<small>`标签来添加小标题。

<div class="m-example"></div>

```html
<h1>H1 标题1 <small>小标题1</small></h1>
<h2>H2 标题2 <small>小标题2</small></h2>
<h3>H3 标题3 <small>小标题3</small></h3>
<h4>H4 标题4 <small>小标题4</small></h4>
<h5>H5 标题5 <small>小标题5</small></h5>
<h6>H6 标题6 <small>小标题6</small></h6>
```

### 段落

<div class="m-example"></div>

```html
<p>夏日，静好。如水的日子散发着淡淡的清欢，花香鸟鸣的清晨，喜欢依着一杯茶的馨香，倚在窗前，看天上白云轻轻飘过，任光阴静静在指尖流淌，让一颗被尘世烟火渲染的心渐渐沉静下来，默念一份心灵的温婉，拥有一段清寂的时光。</p>
<p>一直认为最好的心境，不是避开车水马龙，而是在心中修篱种菊。尘世的纷纷扰扰，总是会让人倦了累了，找一个清闲的午后，关上心灵窗子，隔绝人世的喧嚣，一杯茶，一本书，便是一段静谧的光阴。茶，可以品尝人生的百味；书，可以找回心灵的皈依。轻拥一米阳光入怀，和着书香，任流淌的心事，在季节中浅漾，生命就在这悠然的时光中婉约成一朵花。</p>
```

### 水平线

<div class="m-example"></div>

```html
<hr>
```

### 链接

设置`<a>`标签的默认颜色、hover效果和鼠标指针，使用`<a>`标签在有无`href`情况下的效果一致。

<div class="m-example"></div>

```html
<a>Link</a>
<a href="#">Link#</a>
```

### 特殊文本

<div class="m-example"></div>

```html
<p><em>强调文本</em>使用`<em>`标签</p>
<p><strong>加粗文本</strong>使用`<strong>`标签</p>
<p><ins>插入文本</ins>使用`<ins>`标签</p>
<p><del>删除文本</del>使用`<del>`标签</p>
<p><mark>标记文本</mark>使用`<mark>`标签</p>
<p><small>缩小文本</small>使用`<small>`标签</p>
<p><code>代码片段</code>使用`<code>`标签，如<code>var i</code></p>
<p><kbd>快捷键</kbd>使用`<kbd>`标签，如<kbd>ctrl</kbd>+<kbd>c</kbd></p>
<p><abbr>标题缩写</abbr>使用`<abbr>`标签，如<abbr title="Abbreviation">abbr</abbr></p>
<p><sup>上</sup><sub>下</sub>标使用`<sup>`和`<sub>`标签，如<code>a<sub>2</sub> + x<sup>2</sup></code></p>
<p><q>引用片段</q>使用`<q>`标签，<q>`<q>`标签中还可以再使用<q>`<q>`标签</q></q></p>
<p><dfn>定义术语</dfn>使用`<dfn>`标签</p>
```

### 引用

<div class="m-example"></div>

```html
<blockquote>
    <p>我不知道世上的人对我怎样评价。我却这样认为：我好像是在海滨上玩耍的孩子，时而拾到几块莹洁的石子，时而拾到几片美丽的贝壳并为之欢欣。那浩瀚的真理的海洋仍展现在面前。</p>
    <footer>牛顿</footer>
</blockquote>
```

### 代码块

<div class="m-example"></div>

```html
<pre>
factorial = (num) -&gt;
    if not /^\d+$/.test(num)
        throw 'Error: Not an integer!'

    _factorial = (num) -&gt;
        return (if num &lt;= 1 then 1 else num * _factorial(num - 1))

    return _factorial(num)
</pre>
```

<!-- <samp> -->

### 列表

<div class="m-example"></div>

```html
<ul>
    <li>选项1</li>
    <li>选项2
        <ul>
            <li>选项1</li>
            <li>选项2</li>
            <li>选项3</li>
        </ul>
    </li>
    <li>选项3</li>
</ul>
<ol>
    <li>选项1</li>
    <li>选项2
        <ol>
            <li>选项1</li>
            <li>选项2</li>
            <li>选项3</li>
        </ol>
    </li>
    <li>选项3</li>
</ol>
```

### 描述列表

<div class="m-example"></div>

```html
<dl>
    <dt>Web前端</dt>
    <dd>通常是指网站的前台部分，包括网站的表现层和结构层。因此前端技术一般分为前端设计和前端开发，前端设计一般可以理解为网站的视觉设计，前端开发则是网站的前台代码实现，包括基本的HTML、CSS和JavaScript。</dd>
    <dt>CSS</dt>
    <dd>级联样式表，是一种用来表现HTML或XML等文件样式的计算机语言。目前最新版本为CSS3，是能够真正做到网页表现与内容分离的一种样式设计语言。</dd>
    <dt>JavaScript</dt>
    <dd>一种直译式脚本语言，是一种动态类型、弱类型、基于原型的语言，内置支持类型，广泛用于客户端的脚本语言，最早是在HTML网页上使用，用来给HTML网页增加动态功能。</dd>
</dl>
```

### 地址

<div class="m-example"></div>

```html
<address>
    <strong>地址：</strong>浙江省杭州市滨江区网商路599号网易大厦<br>
    <strong>邮编：</strong>310052<br>
    <strong>电话：</strong>0571-12345678
</address>
```

### 图片

响应式图片，*待完成……*
