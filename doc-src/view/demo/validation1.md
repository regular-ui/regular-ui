### 示例
#### 基本形式

<div class="m-example"></div>

```xml
<form class="m-form">
<validation ref="validation">
    <div class="u-formitem">
        <label class="formitem_tt">用户名<span class="formitem_rqr">*</span>：</label>
        <span class="formitem_ct">
            <input2 rules={nameRules} maxlength=12 tip="4~12个字符，包括字母、数字、下划线" />
        </span>
    </div>
    <div class="u-formitem">
        <label class="formitem_tt">设置密码<span class="formitem_rqr">*</span>：</label>
        <span class="formitem_ct">
            <input2 type="password" rules={passwordRules} value={password} maxlength=18 tip="6~18个字符，包括字母、数字、下划线" />
        </span>
    </div>
    <div class="u-formitem">
        <label class="formitem_tt">确认密码<span class="formitem_rqr">*</span>：</label>
        <span class="formitem_ct"><input2 type="password" rules={confirmRules} maxlength=18 /></span>
    </div>
    <div class="u-formitem">
        <label class="formitem_tt">验证码<span class="formitem_rqr">*</span>：</label>
        <span class="formitem_ct">
            <input2 rules={vcodeRules} maxlength=5 />
            <img src="../img/verifyCode.jpg">
            <a>换一张</a>
        </span>
    </div>
    <div class="u-formitem">
        <label class="formitem_ct"><input type="checkbox" /> 同意“服务条款”和“隐私权保护和个人信息利用政策”</label>
    </div>
    <div class="u-formitem">
        <span class="formitem_ct"><a class="u-btn u-btn-primary" on-click={this.submit()}>立即注册</a></span>
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
        passwordRules: [
            {type: 'isFilled', message: '请设置密码！'},
            {type: 'isLength', min: 6, max: 18, message: '请输入6~18个字符！'}
        ],
        confirmRules: [
            {type: 'isFilled', message: '请确认密码！'},
            {message: '两次密码不一致！', method: function(value) {
                return value === component.data.password;
            }}
        ],
        vcodeRules: [
            {type: 'isFilled', message: '请输入图片中的验证码！'},
            {message: '验证码不正确！', method: function(value) {
                return value.toLowerCase() === 'rnnag';
            }}
        ]
    },
    submit: function() {
        var conclusion = this.$refs.validation.validate();
        if(!conclusion.success)
            return;
    }
});
```