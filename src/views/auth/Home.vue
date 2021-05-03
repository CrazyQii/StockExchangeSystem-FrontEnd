<template>
  <div>
    <div style="font-size: 2rem; font-weight: 700; margin-bottom: 1rem;">自选股</div>
    <a-list
      :loading="loading"
      item-layout="horizontal"
      :data-source="data"
    >
      <div
        v-if="showLoadingMore"
        slot="loadMore"
        :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
      >
        <a-spin v-if="loadingMore" />
        <a-button v-else @click="onLoadMore">
          loading more
        </a-button>
      </div>
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a slot="actions">股票行情</a>
        <a slot="actions">公司详情</a>
        <a-list-item-meta>
          <a slot="title" href="https://www.antdv.com/">{{ item.code }} {{ item.stockname }}</a>
        </a-list-item-meta>
        <div>
          {{ item.name }}({{ item.ename }})
          {{ item.market }}
        </div>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      loading: true,
      loadingMore: false,
      showLoadingMore: true,
      data: [],
      pagelimit: 10,
      pageno: 1

    }
  },
  mounted() {
  },
  methods: {
    onLoadMore() {
      // 加载更多
      // this.pageno = this.pageno + 1
      // this.loadingMore = true
      // this.$api.stock_company(this.pagelimit, this.pageno).then(res => {
      //   if (res.data.length < this.pagelimit) { // 判断是否最后一页
      //     this.showLoadingMore = false
      //     return
      //   }
      //   this.loadingMore = false
      //   this.data = this.data.concat(res.data)
      //   this.$nextTick(() => {
      //     window.dispatchEvent(new Event('resize'));
      //   })
      // })
    }
  }
}

</script>

<style scoped>
#components-layout .logo {
  width: 120px;
  height: 31px;
  background: rgba(163, 25, 25, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}
</style>
