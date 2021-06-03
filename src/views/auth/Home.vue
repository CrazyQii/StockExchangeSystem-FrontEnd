<template>
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="自选股"
    />

    <div style="margin-top: 1rem; margin-bottom: 1rem; position: relative">
      <a-button type="primary" style="left: 90%" @click="showStockDrawer">
        添加自选股票
      </a-button>
    </div>

    <!-- 搜索自选股对话框 -->
    <a-modal
      title="添加自选股"
      :visible="visibleModel"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <div>
        <span>股票代码搜索：</span>
        <a-auto-complete
          :data-source="dataSource"
          v-model="stockValueCode"
          style="width: 200px"
          placeholder="股票代码搜索"
          @select="onSelect"
          @search="onSearchCode"
        />
      </div>
      <div style="margin: 1rem 0rem">
        <span>股票名称搜索：</span>
        <a-auto-complete
          :data-source="dataSource"
          v-model="stockValueName"
          style="width: 200px"
          placeholder="股票名称搜索"
          @select="onSelect"
          @search="onSearchName"
        />
      </div>
      <div>
        <span>搜索结果： {{ stockValue }}</span>
      </div>
    </a-modal>

    <a-table
      :columns="columns"
      :data-source="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <!-- 公司详情页面 -->
      <template slot="stock_name" slot-scope="text, row">
        <a @click="navDetail(row.stock_code)">{{ text }}</a>
      </template>
      <template slot="create_time" slot-scope="text">
        {{ text }}
      </template>
      <!-- 删除 -->
      <template slot="operation" slot-scope="text, row">
        <a-button
          type="info"
          @click="navQuote(row.stock_code)"
          style="margin-right: 2rem"
          >行情</a-button
        >
        <a-button
          type="primary"
          @click="navBuy(row.stock_code)"
          style="margin-right: 2rem"
          >买入</a-button
        >
        <a-button
          type="primary"
          @click="navSell(row.stock_code)"
          style="margin-right: 2rem"
          >卖出</a-button
        >
        <a-button type="danger" @click="showDeleteConfirm(row.id)"
          >取消订阅</a-button
        >
      </template>
    </a-table>
    <!-- 买入股票抽屉 -->
    <div v-if="buyVisible">
      <a-drawer
        title="买入股票"
        placement="right"
        width="670"
        :closable="false"
        :visible="buyVisible"
        @close="onCloseBuyDrawer"
      >
        <Buy :code="code" :user_info="user_info"></Buy>
      </a-drawer>
    </div>
    <!-- 卖出股票抽屉 -->
    <div v-if="sellVisible">
      <a-drawer
        title="卖出股票"
        placement="right"
        width="670"
        :closable="false"
        :visible="sellVisible"
        @close="onCloseSellDrawer"
      >
        <Sell :code="code"></Sell>
      </a-drawer>
    </div>
  </div>
</template>

<script>
import { formatDate } from "../../utils/common.js";
import Buy from "@/components/Buy.vue";
import Sell from "@/components/Sell.vue";

const columns = [
  {
    title: "代码",
    dataIndex: "stock_code",
    width: "10%",
  },
  {
    title: "股票名称",
    dataIndex: "stock_name",
    width: "20%",
    scopedSlots: { customRender: "stock_name" },
  },
  {
    title: "添加时间",
    dataIndex: "create_time",
    width: "20%",
    scopedSlots: { customRender: "create_time" },
  },
  {
    title: "操作",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" },
  },
];

export default {
  name: "Home",
  props: {
    user_info: {
      type: Object,
    },
  },
  components: {
    Buy,
    Sell,
  },
  data() {
    return {
      // 第一层页面
      code: "",
      data: [], // 自选股数据源
      columns,
      loading: false,
      pagination: {
        pageSize: 10,
        current: 1,
      },
      // 买卖页面抽屉
      buyVisible: false,
      sellVisible: false,
      // 第二层页面
      visibleModel: false, // 搜索框
      confirmLoading: false,
      dataSource: [], // 搜索框数据源
      stockValueName: "",
      stockValueCode: "",
      stockValue: "",
    };
  },
  mounted() {
    this.getUserStockData(
      this.user_info.id,
      this.pagination.pageSize,
      this.pagination.current
    );
  },
  methods: {
    // ==============
    // 第一层页面
    // ==============
    // 表格分页
    handleTableChange(pagination) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.getUserStockData(
        this.user_info.id,
        pagination.pageSize,
        pagination.current
      );
    },
    getUserStockData(account_id, pageSize, current) {
      this.loading = true;
      let data = {
        account_id: account_id,
        pagelimit: pageSize,
        pagenum: current,
      };
      this.$user_info.stock_list(data).then((res) => {
        this.loading = false;
        this.data = res.data.stock_list;
        for (let i = 0; i < this.data.length; i++) {
          this.data[i]["create_time"] = formatDate(this.data[i]["create_time"]);
        }
        // 分页处理
        const pagination = { ...this.pagination };
        pagination.total = res.data.sum;
        this.pagination = pagination;
      });
    },
    // 取消自选股票对话框
    showDeleteConfirm(id) {
      let that = this;
      that.$confirm({
        title: "确认取消订阅该股票？",
        okText: "确认",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          that.deleteStock(id);
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    },
    deleteStock(id) {
      // 删除数据
      let data = { id: id };
      this.$user_info.delete_stock(data).then((res) => {
        if (res.code == 200) {
          this.$message.success("删除成功！");
          this.getUserStockData(
            this.user_info.id,
            this.pagination.pageSize,
            this.pagination.current
          );
        } else {
          this.$message.error("删除失败！" + res);
        }
      });
    },
    // ================
    // 页面跳转
    // ================
    navQuote(code) {
      // 跳转路由
      this.$router.push({
        path: `/quote/${code}`,
      });
    },
    navDetail(code) {
      // 跳转路由
      this.$router.push({
        path: `/detail/${code}`,
      });
    },
    navBuy(id) {
      this.buyVisible = true;
      this.code = id;
    },
    navSell(id) {
      this.sellVisible = true;
      this.code = id;
    },
    onCloseSellDrawer() {
      this.sellVisible = false;
    },
    onCloseBuyDrawer() {
      this.buyVisible = false;
    },
    // =============
    // 第二层页面
    // =============
    // 显示查询股票抽屉
    showStockDrawer() {
      this.getStockData();
      this.visibleModel = true;
    },
    // 股票名称搜索框
    onSearchName(searchText) {
      this.getStockData(null, searchText);
    },
    // 股票代码搜索框
    onSearchCode(searchText) {
      this.getStockData(searchText, null);
    },
    onSelect(value) {
      this.stockValueName = this.stockValueCode = this.stockValue = value;
    },
    // 下拉框数据源获取
    getStockData(code = null, stockname = null) {
      this.loading0 = true;
      if (stockname == null && code != null) {
        let data = {
          stockcode: code,
          pagelimit: 10,
          pagenum: 1,
        };
        this.$stock_api.get_stockcode(data).then((res) => {
          this.loading0 = false;
          this.dataSource = [];
          if (res.code == 200) {
            console.log(res);
            for (let i = 0; i < res.data.companies.length; i++) {
              this.dataSource.push(
                res.data.companies[i]["stockname"] +
                  "-" +
                  res.data.companies[i]["code"]
              );
            }
          }
        });
      } else {
        let data = {
          stockname: stockname,
          pagelimit: 10,
          pagenum: 1,
        };
        this.$stock_api.get_stockname(data).then((res) => {
          this.loading0 = false;
          this.dataSource = [];
          if (res.code == 200) {
            console.log(res);
            for (let i = 0; i < res.data.companies.length; i++) {
              this.dataSource.push(
                res.data.companies[i]["stockname"] +
                  "-" +
                  res.data.companies[i]["code"]
              );
            }
          }
        });
      }
    },
    // 问答框确认
    handleOk() {
      this.add_stock();
      this.confirmLoading = false;
      this.visibleModel = false;
      this.stockValueName = this.stockValueCode = this.stockValue = "";
    },
    handleCancel() {
      console.log("用户取消设置警示！");
      this.visibleModel = false;
      this.stockValueName = this.stockValueCode = this.stockValue = "";
    },
    // 向后端添加数据
    add_stock() {
      let data = {
        account_id: this.user_info.id,
        stock_code: this.stockValue.split("-")[1],
        stock_name: this.stockValue.split("-")[0],
      };
      this.$user_info.add_stock(data).then((res) => {
        if (res.code == 200) {
          this.$message.success("添加成功！");
          this.getUserStockData(
            this.user_info.id,
            this.pagination.pageSize,
            this.pagination.current
          );
        } else {
          console.log(res);
          this.$message.error("添加失败！" + res.msg);
        }
      });
    },
  },
};
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
