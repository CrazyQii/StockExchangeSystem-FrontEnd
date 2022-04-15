<template>
  <a-layout id="main-layout" class="layout">
    <a-layout-header>
      <div class="logo">股票分析系统</div>
      <a-menu
        theme="dark"
        mode="horizontal"
        :default-selected-keys="current"
        :style="{ lineHeight: '64px' }"
      >
        <!-- 普通用户路由 -->
        <a-menu-item key="/" v-if="user_info.role == 'user'">
          <router-link to="/">首页</router-link>
        </a-menu-item>
        <a-menu-item key="/stock-list" v-if="user_info.role == 'user'">
          <router-link to="/stock-list">股票列表</router-link>
        </a-menu-item>
        <a-menu-item key="/stock-rank" v-if="user_info.role == 'user'">
          <router-link to="/stock-rank">涨跌榜</router-link>
        </a-menu-item>
        <a-menu-item key="/stock-tiger" v-if="user_info.role == 'user'">
          <router-link to="/stock-tiger">龙虎榜</router-link>
        </a-menu-item>
        <a-menu-item key="/stock-note" v-if="user_info.role == 'user'">
          <router-link to="/stock-note">股市风向标</router-link>
        </a-menu-item>
        <!-- 公共信息 -->
        <a-sub-menu v-if="showLR" title="个人中心">
          <a-menu-item>
            <router-link to="/login">登录</router-link>
          </a-menu-item>
          <a-menu-item>
            <router-link to="/register">注册</router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu v-if="!showLR" :title="'用户: ' + user_info.nickname">
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

        <!-- 页面缓存，进入这个页面不再刷新 -->
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" :user_info="user_info"></router-view>
        </keep-alive>
        <router-view  v-if="!$route.meta.keepAlive" :user_info="user_info" />
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
    /**
     * 加载用户信息，校验用户是否登录超时
     */
    loadUserInfo() {
      if (!localStorage.token) {
        return;
      }
      this.$user_api.user_info().then((res) => {
        // 请求后端数据
        if (res.code == 200) {
          this.$message.success("用户信息获取成功");
          this.user_info = res.data;
          this.showLR = false;
          if (this.user_info.role == "admin") {
            // 根据用户身份跳转不同的页面
            this.$router.push({
              path: "/accountlist",
            });
          } else {
            this.$router.push({
              path: "/",
            });
            // this.$router.go(0)
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
    // 登出操作
    logout() {
      this.$user_api.logout().then((res) => {
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
  width: 10rem;
  height: 31px;
  color: whitesmoke;
  font-weight: 700;
  font-size: 1rem;
  text-align: center;
  /* margin: 16px 24px 16px 0; */
  float: left;
}
</style>
