<template>
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      :title="detail.stockname + '(' + detail.code + ')'"
      @back="() => $router.go(-1)"
    />
    <a-descriptions bordered layout="vertical">
      <a-descriptions-item label="公司名称 (英文名称)">
        {{ detail.name }}( {{ detail.ename }} )
      </a-descriptions-item>
      <a-descriptions-item label="交易所">
        {{ detail.market }}
      </a-descriptions-item>
      <a-descriptions-item label="注册资本">
        {{ detail.rprice }}
      </a-descriptions-item>
      <a-descriptions-item label="成立日期">
        {{ detail.rdate }}
      </a-descriptions-item>
      <a-descriptions-item label="公司地址" :span="2">
        {{ detail.addr }}
      </a-descriptions-item>
      <a-descriptions-item label="概念及板块" :span="3">
        {{ detail.idea }}
      </a-descriptions-item>
      <a-descriptions-item label="组织形式">
        {{ detail.organ }}
      </a-descriptions-item>
      <a-descriptions-item label="官网地址">
        <a :href="detail.site" target="_blank">{{ detail.site }}</a>
      </a-descriptions-item>
      <a-descriptions-item label="电话">
        {{ detail.phone }}
      </a-descriptions-item>
      <a-descriptions-item label="公司介绍">
        {{ detail.desc }}
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<script>
export default {
  name: "Detail",
  data() {
    return {
      code: this.$route.params.code,
      detail: {},
    };
  },
  mounted() {
    this.getInitData(this.code);
  },
  methods: {
    getInitData(code) {
      this.$stock_api.stock_company(code).then((res) => {
        this.detail = res.data;
        if (this.detail == null) {
          this.$message.error('此股票为新股票，暂未保存到数据库，请更新数据库!');
        }
        console.log(this.detail);
      });
    },
  },
};
</script>