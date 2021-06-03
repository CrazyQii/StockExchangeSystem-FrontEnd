<template>
  <div>
    <!-- 标题 -->
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="我的持仓"
    />
    <a-list :loading="loading" item-layout="horizontal" :data-source="data">
      <div
        v-if="showLoadingMore"
        slot="loadMore"
        :style="{
          textAlign: 'center',
          marginTop: '12px',
          height: '32px',
          lineHeight: '32px',
        }"
      >
        <div v-if="!loadingMore">
          <a-spin v-if="loadingMore" />
          <a-button v-else @click="onLoadMore"> loading more </a-button>
        </div>
      </div>
      <a-list-item slot="renderItem" slot-scope="item">
        <span style="margin-right: 0.5rem; font-size: 18px;">股票代码: {{ item.stock_code }}</span>  
        <span style="margin-right: 0.5rem; font-size: 18px;">股票名称: {{ item.stock_name }}</span> 
        <span style="margin-right: 0.5rem; font-size: 18px;">持有量: {{ item.volume }}</span> 
        <span style="margin-right: 0.5rem; font-size: 18px;">成本: {{ item.cost }}</span>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
export default {
  name: "StockList",
  props: {
    user_info: {
      type: Object,
    },
  },
  data() {
    return {
      loading: true,
      loadingMore: false,
      showLoadingMore: true,
      data: [],
      pagelimit: 10,
      pageno: 1,
    };
  },
  mounted() {
    this.getData(this.pagelimit, this.pageno);
  },
  methods: {
    getData(pagelimit, pageno) {
      this.loading = true;
      let data = {
        account_id: this.user_info.id,
        pagelimit: pagelimit,
        pagenum: pageno,
      };
      this.$order_api.account_order(data).then((res) => {
        if (res.code == 200) {
          if (res.data.order_list.length == 0) {
            this.loadingMore = true;
          } else {
            this.data =  this.data.concat(res.data.order_list);
            this.loadingMore = false;
          }
        } else {
          console.log(res);
        }
        this.loading = false;
      });
    },
    onLoadMore() {
      this.loadingMore = true;
      this.pageno += 1;
      this.getData(this.pagelimit, this.pageno);
    },
  },
};
</script>