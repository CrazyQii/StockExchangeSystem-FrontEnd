<template>
  <div>
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="交易中">
        <a-table
          :columns="columns0"
          :data-source="data"
          :pagination="pagination"
          :loading="loading"
          @change="handleTableChange"
          bordered
        >
          <template slot="operation" slot-scope="text, row">
            <a-button type="danger" @click="showDeleteConfirm(row.id)"
              >撤单</a-button
            >
          </template>
        </a-table>
      </a-tab-pane>
      <a-tab-pane key="2" tab="已成交" force-render>
        <a-table
          :columns="columns1"
          :data-source="data"
          :pagination="pagination"
          :loading="loading"
          @change="handleTableChange"
          bordered
        >
        </a-table>
      </a-tab-pane>
      <a-tab-pane key="3" tab="已撤单"> 
        <a-table
          :columns="columns1"
          :data-source="data"
          :pagination="pagination"
          :loading="loading"
          @change="handleTableChange"
          bordered
        >
        </a-table>
           </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { formatDate } from "../utils/common";

const columns0 = [
  {
    title: "股票代码",
    dataIndex: "stock_code",
    width: "10%",
  },
  {
    title: "股票名称",
    dataIndex: "stock_name",
    width: "10%",
  },
  {
    title: "交易方向",
    dataIndex: "direction",
    width: "10%",
  },
  {
    title: "创建时间",
    dataIndex: "create_time",
    width: "20%",
  },
  {
    title: "交易量",
    dataIndex: "volume",
    width: "10%",
  },
  {
    title: "成交金额",
    dataIndex: "order_price",
    width: "10%",
  },
  {
    title: "操作",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" },
  },
];

const columns1 = [
  {
    title: "股票代码",
    dataIndex: "stock_code",
    width: "10%",
  },
  {
    title: "股票名称",
    dataIndex: "stock_name",
    width: "10%",
  },
  {
    title: "交易方向",
    dataIndex: "direction",
    width: "10%",
  },
  {
    title: "创建时间",
    dataIndex: "create_time",
    width: "20%",
  },
  {
    title: "交易量",
    dataIndex: "volume",
    width: "10%",
  },
  {
    title: "预计成交金额",
    dataIndex: "order_price",
    width: "10%",
  },
];

export default {
  name: "OrderList",
  props: {
    user_info: {
      type: Object,
    },
  },
  data() {
    return {
      data: [],
      pagination: {
        pageSize: 10,
        current: 1,
      },
      loading: false,
      columns0: columns0,
      columns1: columns1,
      key: "1",
    };
  },
  mounted() {
    this.getOrderData(this.pagination.pageSize, this.pagination.current);
  },
  methods: {
    //=============
    // 第一层页面
    // ============
    getOrderData(pagelimit, pagenum) {
      let data = {
        account_id: this.user_info.id,
        status: Number(this.key),
        pagelimit: pagelimit,
        pagenum: pagenum,
      };
      this.$order_api.order_list(data).then((res) => {
        this.loading = false;
        if (res.code == 200) {
            console.log(res.data)
          this.data = res.data.order_list;
          for (let i = 0; i < this.data.length; i++) {
            this.data[i]["create_time"] = formatDate(
              this.data[i]["create_time"]
            );
          }
          // 分页处理
          const pagination = { ...this.pagination };
          pagination.total = res.data.sum;
          this.pagination = pagination;
        } else {
          console.log(res);
          this.$message.error("查询失败！" + res.msg);
        }
      });
      console.log(data);
    },
    // 切换tab
    callback(value) {
      this.key = value;
      this.getOrderData(this.pagination.pageSize, this.pagination.current);
    },
    // 表格分页
    handleTableChange(pagination) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.getOrderData(pagination.pageSize, pagination.current);
    },
    // ===========
    // 第二层页面
    // ===========
    showDeleteConfirm(id) {
      let that = this;
      that.$confirm({
        title: "确认撤销该订单？",
        okText: "确认",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          that.deleteOrder(id);
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    },
    deleteOrder(id) {
      // 删除数据
      let data = { 
        id: id,
        account_id: this.user_info.id
      };
      this.$order_api.delete_order(data).then((res) => {
        if (res.code == 200) {
          this.$message.success("删除成功！");
          this.getOrderData(this.pagination.pageSize, this.pagination.current);
        } else {
          this.$message.error("删除失败！" + res.msg);
        }
      });
    },
  },
};
</script>