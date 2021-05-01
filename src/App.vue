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
        <a-menu-item key="/">
          <router-link to="/">自选股</router-link>
        </a-menu-item>
        <a-menu-item key="/about">
          <router-link to="/about">About</router-link>
        </a-menu-item>
        <a-menu-item key="/stocklist">
          <router-link to="/stocklist">股票列表</router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 30px 50px 0px">
      <div :style="{ background: '#fff', padding: '24px', minHeight: '640px' }">
        <router-view/>
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      <Footer/>
    </a-layout-footer>
  </a-layout>
    
</template>

<script>
import Footer from '@/components/Footer.vue'

export default {
  data() {
    return {
      current: []
    }
  },
  components: {
    Footer
  },
  beforeUpdate() {  // 加载菜单
    this.current[0] = this.$route.path
  },
  methods: {

  }
}

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
