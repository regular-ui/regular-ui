表单验证在网页中是一种很常见却不简单的交互过程。随着前端的发展，这种过程变得越来越复杂多样，传统的表单处理逻辑已经无法很好的满足交互需求。在这里对Regular UI处理各种表单验证进行一下简要疏理。尚不完善，待后续补充。

## 表单验证行为的有序性

许多经典的框架或类库会把某个表单控件的验证行为抽象成类似这样的结构：

```javascript
{required:  ..., type:  ..., min:  ..., max: ..., pattern: ..., extend: ...}
```

这使得表单验证时按照固定的字段和顺序来处理，并且同一条规则不能重复使用，大大降低了验证逻辑的灵活性。

Regular UI认为，每个表单控件有若干有序的表单验证行为，每条验证行为使用一条验证规则`rule`来处理，结构类似：

```javascript
[{type: 'isRequired', ...}, {type: 'is', ...}, {type: 'isNot', ...}, ...]
```

下面提供一个例子，包含以下规则：

1. 以字母开头，实时验证
2. 字母、数字或中划线组成，实时验证
3. 以字母或数字结尾，实时验证
4. 必须输入用户名，失焦验证
5. 4~12个字符，失焦验证

<div class="m-example"></div>

```xml
<form class="m-form">
    <div class="u-formitem">
        <label class="formitem_tt">用户名<span class="formitem_rqr">*</span>：</label>
        <span class="formitem_ct">
            <input2 rules={rules} maxlength=12 placeholder="4~12个字符" />
        </span>
    </div>
</form>
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        rules: [
            {type: 'isNot', reg: /^[^a-zA-Z]/, on: 'keyup+blur', message: '以字母开头'},
            {type: 'isNot', reg: /[^a-zA-Z0-9-]/, on: 'keyup+blur', message: '字母、数字或中划线组成'},
            {type: 'isNot', reg: /[^a-zA-Z0-9]$/, on: 'blur', message: '以字母或数字结尾'},
            {type: 'isRequired', on: 'blur', message: '请输入用户名'},
            {type: 'isLength', min: 4, on: 'blur', message: '不得少于4个字符'}
        ]
    }
});
```

## 表单验证行为的实时性

表单验证行为按照实时性通常可以分为三种：提交验证、失焦验证、实时验证。另外还有一种行为叫表单限制，不属于表单验证，但通常与之配合使用。

### 提交验证

点击表单提交按钮时才对表单中所有控件进行验证，通常对应submit按钮的`click`事件。在Regular UI的验证规则中，此种验证默认激活且一直激活，即无需设置`on`字段。下面的例子中，所有表单验证行为均为提交验证：

<div class="m-example"></div>

```xml
<form class="m-form">
<validation ref="validation">
    <div class="u-formitem">
        <label class="formitem_tt">用户名<span class="formitem_rqr">*</span>：</label>
        <span class="formitem_ct">
            <input2 rules={nameRules} maxlength=12 placeholder="4~12个字符" />
        </span>
    </div>
    <div class="u-formitem">
        <label class="formitem_tt">邮箱<span class="formitem_rqr">*</span>：</label>
        <span class="formitem_ct">
            <input2 rules={emailRules} maxlength=20 placeholder="请输入邮箱" />
        </span>
    </div>
    <div class="u-formitem">
        <span class="formitem_ct"><a class="u-btn u-btn-primary" on-click={this.submit()}>提交</a></span>
    </div>
</validation>
</form>
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        nameRules: [
            {type: 'isFilled', message: '请输入用户名！'},
            {type: 'isLength', min: 4, max: 12, message: '请输入4~12个字符！'}
        ],
        emailRules: [
            {type: 'isFilled', message: '请输入邮箱！'},
            {type: 'isEmail', message: '邮箱格式不正确！'}
        ]
    },
    submit: function() {
        var conclusion = this.$refs.validation.validate();
        if(!conclusion.success)
            return;
        else
            RGUI.Notify.success('提交成功！');
    }
});
```

### 失焦验证

在表单控件失去焦点时对该控件进行验证，通常对应表单控件的`blur`事件。在Regular UI的验证规则中，`on`字段中包含`blur`可以激活此种验证。下面的例子中，所有表单验证行为均为失焦验证：

<div class="m-example"></div>

```xml
<form class="m-form">
    <div class="u-formitem">
        <label class="formitem_tt">用户名<span class="formitem_rqr">*</span>：</label>
        <span class="formitem_ct">
            <input2 rules={nameRules} maxlength=12 placeholder="4~12个字符" />
        </span>
    </div>
    <div class="u-formitem">
        <label class="formitem_tt">邮箱<span class="formitem_rqr">*</span>：</label>
        <span class="formitem_ct">
            <input2 rules={emailRules} maxlength=20 placeholder="请输入邮箱" />
        </span>
    </div>
</form>
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        nameRules: [
            {type: 'isFilled', on: 'blur', message: '请输入用户名！'},
            {type: 'isLength', min: 4, max: 12, on: 'blur', message: '请输入4~12个字符！'}
        ],
        emailRules: [
            {type: 'isFilled', on: 'blur', message: '请输入邮箱！'},
            {type: 'isEmail', on: 'blur', message: '邮箱格式不正确！'}
        ]
    }
});
```

### 实时验证

在表单控件的值实时改变时，对该控件进行验证，通常对应`<input>`控件的`keyup`或`input`事件，其他表单控件视情况而定。在Regular UI的验证规则中，`on`字段中包含`keyup`可以激活此种验证。当只激活实时验证时，失焦验证会跳过此规则并且覆盖原来的结果，因此我们通常采用实时与失焦叠加的方式`keyup+blur`。

下面的例子中，对用户名长度和邮箱格式的判断为实时验证。其中邮箱验证没有采用实时与失焦叠加的方式，可以发现这种规则不合理。

<div class="m-example"></div>

```xml
<form class="m-form">
    <div class="u-formitem">
        <label class="formitem_tt">用户名<span class="formitem_rqr">*</span>：</label>
        <span class="formitem_ct">
            <input2 rules={nameRules} maxlength=12 placeholder="4~12个字符" />
        </span>
    </div>
    <div class="u-formitem">
        <label class="formitem_tt">邮箱<span class="formitem_rqr">*</span>：</label>
        <span class="formitem_ct">
            <input2 rules={emailRules} maxlength=20 placeholder="请输入邮箱" />
        </span>
    </div>
</form>
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        nameRules: [
            {type: 'isFilled', on: 'blur', message: '请输入用户名！'},
            {type: 'isLength', min: 4, max: 12, on: 'keyup+blur', message: '请输入4~12个字符！'}
        ],
        emailRules: [
            {type: 'isFilled', on: 'blur', message: '请输入邮箱！'},
            {type: 'isEmail', on: 'keyup', message: '邮箱格式不正确！'}
        ]
    }
});
```

### 表单限制

在表单控件的值改变时，对该值限制在规定的长度或范围内，如`<input>`控件的部分`type`和`maxlength`的限制行为等：

<div class="m-example"></div>

```xml
<form class="m-form">
    <div class="u-formitem">
        <label class="formitem_tt">姓名<span class="formitem_rqr">*</span>：</label>
        <span class="formitem_ct">
            <input2 maxlength=4 placeholder="不超过4个字符" />
        </span>
    </div>
    <div class="u-formitem">
        <label class="formitem_tt">年龄<span class="formitem_rqr">*</span>：</label>
        <span class="formitem_ct">
            <numberInput min=8 max=99 value=24 />
        </span>
    </div>
    <div class="u-formitem">
        <label class="formitem_tt">生日：</label>
        <span class="formitem_ct">
            <datePicker />
        </span>
    </div>
</form>
```

## 表单提交按钮的可点性

表单提交按钮按照可点性来分，常见的且比较合理的有以下几种情况：始终可点、必填项有内容可点、必填项内容正确可点。

### 始终可点

表单提交按钮始终可点。表现为表单中所有控件的所有行为必须进行提交验证，可以适当采用失焦和实时验证加以辅助。

<div class="m-example"></div>

```xml
<form class="m-form">
<validation ref="validation">
    <div class="u-formitem">
        <label class="formitem_tt">用户名<span class="formitem_rqr">*</span>：</label>
        <span class="formitem_ct">
            <input2 rules={nameRules} maxlength=12 placeholder="4~12个字符" />
        </span>
    </div>
    <div class="u-formitem">
        <label class="formitem_tt">邮箱<span class="formitem_rqr">*</span>：</label>
        <span class="formitem_ct">
            <input2 rules={emailRules} maxlength=20 placeholder="请输入邮箱" />
        </span>
    </div>
    <div class="u-formitem">
        <label class="formitem_tt">手机号码：</label>
        <span class="formitem_ct">
            <input2 rules={phoneRules} maxlength=11 placeholder="请输入手机号码" />
        </span>
    </div>
    <div class="u-formitem">
        <span class="formitem_ct"><a class="u-btn u-btn-primary" on-click={this.submit()}>提交</a></span>
    </div>
</validation>
</form>
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        nameRules: [
            {type: 'isFilled', on: 'blur', message: '请输入用户名！'},
            {type: 'isLength', min: 4, max: 12, on: 'blur', message: '请输入4~12个字符！'}
        ],
        emailRules: [
            {type: 'isFilled', on: 'blur', message: '请输入邮箱！'},
            {type: 'isEmail', on: 'blur', message: '邮箱格式不正确！'}
        ],
        phoneRules: [
            {type: 'is', reg: /^$|^\d{11}$/, on: 'blur', message: '手机号码格式不正确！'}
        ]
    },
    submit: function() {
        var conclusion = this.$refs.validation.validate();
        if(!conclusion.success)
            return;
        else
            RGUI.Notify.success('提交成功！');
    }
});
```

### 必填项有内容可点

当表单中所有必填项有内容时，表单提交按钮才可点。表现为实时根据表单中必填项是否为空来判断提交按钮是否可点。这种情况下，通常采用三种验证相结合。

<div class="m-example"></div>

```xml
<form class="m-form">
<validation ref="validation">
    <div class="u-formitem">
        <label class="formitem_tt">用户名<span class="formitem_rqr">*</span>：</label>
        <span class="formitem_ct">
            <input2 value={user.name} rules={rules.name} maxlength=12 placeholder="4~12个字符" />
        </span>
    </div>
    <div class="u-formitem">
        <label class="formitem_tt">邮箱<span class="formitem_rqr">*</span>：</label>
        <span class="formitem_ct">
            <input2 value={user.email} rules={rules.email} maxlength=20 placeholder="请输入邮箱" />
        </span>
    </div>
    <div class="u-formitem">
        <label class="formitem_tt">手机号码：</label>
        <span class="formitem_ct">
            <input2 rules={rules.phone} maxlength=11 placeholder="请输入手机号码" />
        </span>
    </div>
    <div class="u-formitem">
        <span class="formitem_ct"><a class="u-btn u-btn-primary" z-dis={!this.canSubmit()} on-click={this.submit()}>提交</a></span>
    </div>
</validation>
</form>
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        user: {},
        rules: {
            name: [
                {type: 'isFilled', on: 'blur', silentOn: 'blur', message: '请输入用户名！'},
                {type: 'isLength', min: 4, max: 12, on: 'blur', message: '请输入4~12个字符！'}
            ],
            email: [
                {type: 'isFilled', on: 'blur', silentOn: 'blur', message: '请输入邮箱！'},
                {type: 'isEmail', on: 'blur', message: '邮箱格式不正确！'}
            ],
            phone: [
                {type: 'is', reg: /^$|^\d{11}$/, on: 'blur', message: '手机号码格式不正确！'}
            ]
        }
    },
    canSubmit: function() {
        return this.data.user.name && this.data.user.email;
    },
    submit: function() {
        if(!this.canSubmit())
            return;

        var conclusion = this.$refs.validation.validate();
        if(!conclusion.success)
            return;
        else
            RGUI.Notify.success('提交成功！');
    }
});
```

### 所有项内容正确可点

当表单中所有项内容均符合要求时，表单提交按钮才可点。表现为实时根据表单中控件的值来判断提交按钮是否可点。这种情况下，通常就不需要进行提交验证了。

<div class="m-example"></div>

```xml
<form class="m-form">
<validation ref="validation">
    <div class="u-formitem">
        <label class="formitem_tt">用户名<span class="formitem_rqr">*</span>：</label>
        <span class="formitem_ct">
            <input2 value={user.name} rules={rules.name} maxlength=12 placeholder="4~12个字符" />
        </span>
    </div>
    <div class="u-formitem">
        <label class="formitem_tt">邮箱<span class="formitem_rqr">*</span>：</label>
        <span class="formitem_ct">
            <input2 value={user.email} rules={rules.email} maxlength=20 placeholder="请输入邮箱" />
        </span>
    </div>
    <div class="u-formitem">
        <label class="formitem_tt">手机号码：</label>
        <span class="formitem_ct">
            <input2 rules={rules.phone} maxlength=11 placeholder="请输入手机号码" />
        </span>
    </div>
    <div class="u-formitem">
        <span class="formitem_ct"><a class="u-btn u-btn-primary" z-dis={!this.canSubmit()} on-click={this.submit()}>提交</a></span>
    </div>
</validation>
</form>
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        user: {},
        rules: {
            name: [
                {type: 'isFilled', on: 'keyup+blur', silentOn: 'keyup+blur', message: '请输入用户名！'},
                {type: 'isLength', min: 4, max: 12, on: 'keyup+blur', silentOn: 'keyup', message: '请输入4~12个字符！'}
            ],
            email: [
                {type: 'isFilled', on: 'keyup+blur', silentOn: 'keyup+blur', message: '请输入邮箱！'},
                {type: 'isEmail', on: 'keyup+blur', silentOn: 'keyup', message: '邮箱格式不正确！'}
            ],
            phone: [
                {type: 'is', reg: /^$|^\d{11}$/, on: 'keyup+blur', message: '手机号码格式不正确！'}
            ]
        }
    },
    canSubmit: function() {
        return ['name', 'email', 'phone'].every(function(key) {
            return this.data.rules[key].every(function(rule) {
                return rule.success;
            });
        }, this);
    },
    submit: function() {
        if(!this.canSubmit())
            return;

        RGUI.Notify.success('提交成功！');
    }
});
```
