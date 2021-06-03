<template>
  <div>
    <!-- 标题 -->
    <div style="font-size: 2rem; font-weight: 700; margin-bottom: 1rem">
      股市列表
    </div>
    
    <!-- 表格 -->
    <a-table
      :columns="columns"
      :data-source="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
      bordered
    >
      <!-- 跳转行情详情页面 -->
      <template slot="code" slot-scope="text">
        <a @click="to_quote(text)">{{ text }}</a>
      </template>
      <!-- 公司详情页面 -->
      <template slot="stockname" slot-scope="text, row">
        <a @click="to_detail(row.code)">{{ text }}</a>
      </template>
    </a-table>
  </div>
</template>

<script>
const columns = [
  {
    title: "代码",
    dataIndex: "code",
    // sorter: true,
    width: "8%",
    scopedSlots: { customRender: "code" },
  },
  {
    title: "股票名称",
    dataIndex: "stockname",
    width: "20%",
    scopedSlots: { customRender: "stockname" },
  },
  {
    title: "市场",
    dataIndex: "market",
    width: "20%",
  },
  {
    title: "行情中心",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" },
  },
];

export default {
  name: "StockList",
  data() {
    return {
      data: [],
      pagination: {
        pageSize: 15,
        current: 1,
      },
      loading: false,
      columns: columns,
    };
  },
  mounted() {
    this.getData(this.pagination.pageSize, this.pagination.current);
  },
  methods: {
    handleTableChange(pagination) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.getData(pagination.pageSize, pagination.current);
    },
    getData(pagelimit, pageno) {
      this.loading = true;
      this.$stock_api.stock_companies(pagelimit, pageno).then((res) => {
        this.loading = false;
        this.data = res.data.companies;
        // 分页处理
        const pagination = { ...this.pagination };
        pagination.total = res.data.sum;
        this.pagination = pagination;
      });
    },
    to_quote(code) {
      // 跳转路由
      this.$router.push({
        path: `/quote/${code}`,
      });
      // console.log(code);
    },
    to_detail(code) {
      // 跳转路由
      this.$router.push({
        path: `/detail/${code}`,
      });
      // console.log(code);
    },
  },
};
</script>