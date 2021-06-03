<template>
  <a-layout id="main-layout" class="layout">
    <a-layout-header>
      <div class="logo" />
      <a-menu
        theme="dark"
        mode="horizontal"
        :default-selected-keys="current"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="/" v-if="user_info.role == 'user'">
          <router-link to="/">自选股</router-link>
        </a-menu-item>
        <a-menu-item key="/stocklist" v-if="user_info.role == 'user'">
          <router-link to="/stocklist">股票列表</router-link>
        </a-menu-item>
        <a-menu-item key="/orderlist" v-if="user_info.role == 'user'">
          <router-link to="/orderlist">委托列表</router-link>
        </a-menu-item>
        <a-menu-item key="/accountlist" v-if="user_info.role == 'admin'">
          <router-link to="/accountlist">信息管理</router-link>
        </a-menu-item>
        <a-menu-item key="/riskmanage" v-if="user_info.role == 'admin'">
          <router-link to="/riskmanage">风控管理</router-link>
        </a-menu-item>
        <a-sub-menu v-if="showLR" title="个人中心">
          <a-menu-item>
            <router-link to="/login">登录</router-link>
          </a-menu-item>
          <a-menu-item>
            <router-link to="/register">注册</router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu v-if="!showLR" :title="'您好: ' + user_info.nickname">
          <a-menu-item>
            <router-link to="/profile">个人信息</router-link>
          </a-menu-item>
          <a-menu-item>
            <a @click="logout">登出</a>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 30px 50px 0px">
      <div :style="{ background: '#fff', padding: '24px', minHeight: '640px' }">
        <router-view :user_info="user_info" />
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      <Footer />
    </a-layout-footer>
  </a-layout>
</template>

<script>
import Footer from "@/components/Footer.vue";

export default {
  data() {
    return {
      current: [],
      user_info: {},
      showLR: true,
    };
  },
  components: {
    Footer,
  },
  beforeUpdate() {
    // 加载菜单
    this.current[0] = this.$route.path;
  },
  updated() {},
  mounted() {
    this.loadUserInfo();
  },
  watch: {},
  methods: {
    loadUserInfo() {
      if (!localStorage.token) {
        return;
      }
      this.$user_info.user_info().then((res) => {
        // 请求后端数据
        if (res.code == 200) {
          this.$message.success("用户信息获取成功");
          this.user_info = res.data;
          this.showLR = false;
          if (this.user_info.role == "admin") {
            this.$router.push({
              path: "/accountlist",
            });
          } else {
            this.$router.push({
              path: "/",
            });
          }
          console.log(this.user_info);
        } else {
          this.$message.error("用户信息获取失败:" + res.msg);
          localStorage.removeItem("token");
          this.$router.push({
            path: `/login`,
          });
        }
      });
    },
    logout() {
      this.$user_info.logout().then((res) => {
        if (res.code == 200) {
          localStorage.clear();
          location.reload();
        } else {
          this.$message.error("登出失败！！");
        }
      });
    },
  },
};
</script>

<style>
#main-layout .logo {
  width: 120px;
  height: 31px;
  background: rgba(163, 25, 25, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}
</style>
