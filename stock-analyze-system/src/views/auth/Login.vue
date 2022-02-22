<template>
  <div>
    <a-form
      id="components-form-normal-login"
      :form="form"
      class="login-form"
      @submit="handleSubmit"
    >
      <a-form-item>
        <a-input
          v-decorator="[
            'phone',
            {
              rules: [{ required: true, message: '请输入您的手机号!' }],
            },
          ]"
          placeholder="手机号账号"
        >
          <a-icon
            slot="prefix"
            type="user"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'password',
            {
              rules: [{ required: true, message: '请输入您的密码！' }],
            },
          ]"
          type="password"
          placeholder="密码"
        >
          <a-icon
            slot="prefix"
            type="lock"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-checkbox
          v-decorator="[
            'remember',
            {
              valuePropName: 'checked',
              initialValue: false,
            },
          ]"
        >
          记住我
        </a-checkbox>
        <a class="login-form-forgot" href=""> 忘记密码 </a>
        Or
        <a @click="to_register"> 注册 </a>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          size="large"
          html-type="submit"
          class="login-form-button"
          :loading="loading"
        >
          登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loading: false
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  methods: {
    handleSubmit(e) {
      this.loading = true
      // 提交数据
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          let data = {
            phone: values["phone"],
            password: values["password"],
          }
          this.$user_api.login(data).then((res) => {
            // 请求后端数据
            if (res.code == 200) {
              localStorage.token = res.data.token
              this.$message.success('登录成功！')
              // 刷新页面
              this.$router.go(0)
              // this.$router.push({
              // path: "/",
            // });
            } else {
              this.$message.error(res.msg)
            }
            this.loading = false
          }).catch(() => {
            this.$message.error('连接到服务器失败')
            this.loading = false
          })
        } else {
          this.loading = false
        }
      });
    },
    to_register() {
      // 页面跳转
      this.$router.push({
        path: `/register`,
      });
    },
  },
};
</script>

<style scoped>
#components-form-normal-login {
  min-width: 450px;
  width: 600px;
  margin: 8rem auto;
}

#components-form-normal-login .login-form-forgot {
  float: right;
}

#components-form-normal-login .login-form-button {
  width: 100%;
}
</style>
