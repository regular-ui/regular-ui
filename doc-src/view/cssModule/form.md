### 示例
#### 基本形式

<div class="m-example"></div>

```html
<form class="m-form">
    <div class="u-formitem">
        <label class="formitem_tt">用户名<span class="formitem_rqr">*</span>：</label>
        <span class="formitem_ct">
            <input class="u-input">
            <span class="formitem_tip">4~12个字符，包括字母、数字、下划线</span>
        </span>
    </div>
    <div class="u-formitem">
        <label class="formitem_tt">设置密码<span class="formitem_rqr">*</span>：</label>
        <span class="formitem_ct"><input class="u-input" type="password"></span>
    </div>
    <div class="u-formitem">
        <label class="formitem_tt">确认密码<span class="formitem_rqr">*</span>：</label>
        <span class="formitem_ct"><input class="u-input" type="password"></span>
    </div>
    <div class="u-formitem">
        <label class="formitem_tt">验证码<span class="formitem_rqr">*</span>：</label>
        <span class="formitem_ct">
            <input class="u-input">
            <img src="../img/verifyCode.jpg">
            <a>换一张</a>
        </span>
    </div>
    <div class="u-formitem">
        <label class="formitem_ct"><input type="checkbox"> 同意“服务条款”和“隐私权保护和个人信息利用政策”</label>
    </div>
    <div class="u-formitem">
        <span class="formitem_ct"><button class="u-btn u-btn-primary">立即注册</button></span>
    </div>
</form>
```


#### 分组

<div class="m-example"></div>

```html
<form class="m-form">
    <fieldset>
        <legend>基本信息</legend>
        <div class="u-formitem">
            <label class="formitem_tt">姓名<span class="formitem_rqr">*</span>：</label>
            <span class="formitem_ct"><input class="u-input"></span>
        </div>
        <div class="u-formitem">
            <label class="formitem_tt">性别<span class="formitem_rqr">*</span>：</label>
            <span class="formitem_ct">
                <span class="u-unitgroup">
                    <label><input type="radio" name="gender"> 男</label>
                    <label><input type="radio" name="gender"> 女</label>
                </span>
            </span>
        </div>
        <div class="u-formitem">
            <label class="formitem_tt">出生日期：</label>
            <span class="formitem_ct"><input class="u-input"></span>
        </div>
        <div class="u-formitem">
            <label class="formitem_tt">身份证号码<span class="formitem_rqr">*</span>：</label>
            <span class="formitem_ct"><input class="u-input"></span>
        </div>
    </fieldset>
    <fieldset>
        <legend>联系方式</legend>
        <div class="u-formitem">
            <label class="formitem_tt">手机号码<span class="formitem_rqr">*</span>：</label>
            <span class="formitem_ct"><input class="u-input"></span>
        </div>
        <div class="u-formitem">
            <label class="formitem_tt">易信：</label>
            <span class="formitem_ct"><input class="u-input"></span>
        </div>
        <div class="u-formitem">
            <label class="formitem_tt">常用邮箱：</label>
            <span class="formitem_ct"><input class="u-input"></span>
        </div>
    </fieldset>
    <fieldset>
        <legend>教育背景</legend>
        <div class="u-formitem">
            <label class="formitem_tt">最高学历<span class="formitem_rqr">*</span>：</label>
            <span class="formitem_ct">
                <select class="u-select">
                    <option>请选择</option>
                    <option>博士</option>
                    <option>硕士</option>
                    <option>本科</option>
                    <option>大专</option>
                </select>
            </span>
        </div>
        <div class="u-formitem">
            <label class="formitem_tt">毕业院校<span class="formitem_rqr">*</span>：</label>
            <span class="formitem_ct"><input class="u-input"></span>
        </div>
        <div class="u-formitem">
            <label class="formitem_tt">专业<span class="formitem_rqr">*</span>：</label>
            <span class="formitem_ct"><input class="u-input"></span>
        </div>
    </fieldset>
</form>
```
