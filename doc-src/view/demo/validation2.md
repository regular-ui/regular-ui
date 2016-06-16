### 异步测试

<div class="m-example"></div>

```xml
<form class="m-form">
<validation ref="validation">
    <div class="u-formitem">
        <label class="formitem_tt">用户名<span class="formitem_rqr">*</span>：</label>
        <span class="formitem_ct">
            <input2 rules={rules} maxlength=12 placeholder="4~12个字符" />
        </span>
    </div>
    <div class="u-formitem">
        <span class="formitem_ct"><a class="u-btn u-btn-primary" z-dis={!canSubmit} on-click={this.submit()}>提交</a></span>
    </div>
</validation>
</form>
```

```javascript
var component = new RGUI.Component({
    template: template,
    config: function() {
        RGUI._.extend(this.data, {
            rules: [
                {type: 'isFilled', on: 'keyup+blur', silentOn: 'keyup+blur', message: '请输入用户名！'},
                {type: 'isLength', options: {min: 4, max: 12}, on: 'keyup+blur', silentOn: 'keyup', message: '请输入4~12个字符！'},
                {type: 'method', on: 'keyup+blur', message: '用户名重复！', options: function(value) {
                    return value !== this.data.oldName;
                }.bind(this)}
            ],
            oldName: 'a454sd8we'
        });
    },
    computed: {
        canSubmit: function() {
            return this.data.rules.every(function(rule) {
                return rule.success;
            });
        }
    },
    submit: function() {
        if(!this.$get('canSubmit'))
            return;

            RGUI.Notify.success('提交成功！');
    }
});
```
