<template>
  <div>
    <a-form
      id="components-form-normal-register"
      :form="form"
      @submit="handleSubmit"
    >
      <a-form-item v-bind="formItemLayout" label="手机号">
        <a-input
          v-decorator="[
            'phone',
            {
              rules: [{ required: true, message: '请输入您的手机号!' }],
            },
          ]"
          style="width: 100%"
        >
          <a-select
            slot="addonBefore"
            v-decorator="['prefix', { initialValue: '86' }]"
            style="width: 70px"
          >
            <a-select-option value="86"> +86 </a-select-option>
            <a-select-option value="87"> +87 </a-select-option>
          </a-select>
        </a-input>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="新密码" has-feedback>
        <a-input
          v-decorator="[
            'password',
            {
              rules: [
                {
                  required: true,
                  message: '请输入您的新密码!',
                },
                {
                  validator: validateToNextPassword,
                },
              ],
            },
          ]"
          type="password"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="确认新密码" has-feedback>
        <a-input
          v-decorator="[
            'confirm',
            {
              rules: [
                {
                  required: true,
                  message: '请再次输入新密码!',
                },
                {
                  validator: compareToFirstPassword,
                },
              ],
            },
          ]"
          type="password"
          @blur="handleConfirmBlur"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout">
        <span slot="label">
          昵称&nbsp;
          <a-tooltip title="What do you want others to call you?">
            <a-icon type="question-circle-o" />
          </a-tooltip>
        </span>
        <a-input
          v-decorator="[
            'nickname',
            {
              rules: [
                {
                  required: true,
                  message: '请输入您的昵称!',
                  whitespace: true,
                },
              ],
            },
          ]"
        />
      </a-form-item>
      <a-form-item>
        <div style="float: right">
          已有账号？<a @click="to_login"> 登录 </a>
        </div>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          size="large"
          class="register-form-button"
        >
          注册
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      confirmDirty: false,
      formItemLayout: {
        labelCol: {
          xs: { span: 16 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
      },
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "register" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          let data = {
            phone: values['phone'],
            password: values['password'],
            nickname: values['nickname']
          }
          console.log("Received values of form: ", data);
          this.$user_info.register(data).then((res) => {
            // 请求后端数据
            if (res.code == 200) {
              this.$message.success('注册成功！')
            } else {
              this.$message.error(res.msg)
            }
          });
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        callback("两次密码输入不一致!");
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    },
    to_login() {
      this.$router.push({
        path: `/login`,
      });
    },
  },
};
</script>

<style scoped>
#components-form-normal-register {
  min-width: 450px;
  width: 600px;
  margin: 5rem auto;
}

#components-form-normal-register .register-form-button {
  width: 100%;
}
</style>