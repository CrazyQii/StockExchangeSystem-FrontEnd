<template>
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="风控管理"
      @back="() => $router.go(-1)"
    />
    <!-- 抽屉按钮 -->
    <div style="margin-top: 1rem; margin-bottom: 1rem; position: relative">
      <a-button type="primary" style="left: 90%" @click="showDrawer">
        添加风险股票
      </a-button>
    </div>
    <!-- 抽屉 -->
    <a-drawer
      title="股票搜索"
      placement="top"
      height="520"
      :closable="false"
      :visible="visible"
      @close="onCloseDrawer"
    >
      <!-- 搜索框 -->
      <div style="margin-top: 1rem; margin-bottom: 1rem">
        <span style="margin-right: 1rem">股票代码：</span>
        <a-auto-complete
          :data-source="dataSource"
          v-model="value"
          style="width: 200px; height: "
          placeholder="股票代码搜索"
          @select="onSelect"
          @search="onSearchCode"
        />
        <span style="margin: 0 1rem">股票名称：</span>
        <a-auto-complete
          :data-source="dataSource"
          v-model="value"
          style="width: 200px; height: "
          placeholder="股票名称搜索"
          @select="onSelect"
          @search="onSearchName"
        />
      </div>
      <!-- 搜索结果表格 -->
      <a-table
        :columns="columns0"
        :data-source="data0"
        :loading="loading0"
        bordered
      >
        <template slot="operation" slot-scope="text, row">
          <a-button type="primary" @click="setInfo(row.stockcode)"
            >设置风险报警</a-button
          >
        </template>
      </a-table>
      <a-modal
        title="设置风险预警"
        :visible="visibleModel"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
      >
        <a-form layout="horizontal">
          <a-form-item label="风险描述">
            <a-textarea
              placeholder="请输入限制要求！"
              :rows="4"
              v-model="textareaValue"
            />
          </a-form-item>
          <a-form-item label="风险等级">
            <a-select
              default-value="1"
              style="width: 120px"
              @change="handleSelectChange"
            >
              <a-select-option value="1"> Info </a-select-option>
              <a-select-option value="2"> Warning </a-select-option>
              <a-select-option value="3"> Danger </a-select-option>
              <a-select-option value="4"> Error </a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
      </a-modal>
    </a-drawer>
    <!-- 股票列表 -->
    <a-table
      :columns="columns"
      :data-source="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
      bordered
    >
      <span slot="status" slot-scope="text">
        <a-tag
          :key="text"
          :color="
            text === 'Info' ? 'blue' : text === 'Warning' ? 'orange': text === 'Danger' ? 'purple': text === 'Error' ? 'red': '#87d068'
          "
        >
          {{ text }}
        </a-tag>
      </span>
      <template slot="operation" slot-scope="text, row">
        <a-button type="danger" @click="showDeleteConfirm(row.stock_code)"
          >取消警告</a-button
        >
      </template>
    </a-table>
  </div>
</template>

<script>
import { formatDate } from "../utils/common.js";

const columns0 = [
  {
    title: "代码",
    dataIndex: "stockcode",
    width: "20%",
  },
  {
    title: "股票名称",
    dataIndex: "stockname",
    width: "20%",
  },
  {
    title: "操作",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" },
  },
];
const columns = [
  {
    title: "代码",
    dataIndex: "stock_code",
    width: "8%",
  },
  {
    title: "股票名称",
    dataIndex: "stock_name",
    width: "15%",
  },
  {
    title: "状态",
    dataIndex: "status",
    width: "10%",
    scopedSlots: { customRender: "status" },
  },
  {
    title: "状态描述",
    dataIndex: "status_desc",
    width: "25%",
  },
  {
    title: "添加时间",
    dataIndex: "create_time",
    width: "20%",
  },
  {
    title: "操作",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" },
  },
];

function tag(index) {
  let res = {
    1: "Info",
    2: "Warning",
    3: "Danger",
    4: "Error",
  };
  return res[String(index)];
}

export default {
  name: "RiskManage",
  data() {
    return {
      dataSource: [],
      value: "", // 输入框数据源
      visible: false, // 抽屉
      visibleModel: false, // 对话框
      confirmLoading: false,
      // 搜索股票表格数据
      data0: [],
      loading0: false,
      columns0: columns0,
      // 风险股票
      data: [],
      pagination: {
        pageSize: 15,
        current: 1,
      },
      loading: false,
      columns: columns,
      // 风险内容
      textareaValue: "",
      selectValue: 1,
    };
  },
  mounted() {
    this.getRiskStockData(this.pagination.pageSize, this.pagination.current);
  },
  methods: {
    // ===============
    // 第一层页面
    // ===============
    // 风险股票数据获取
    getRiskStockData(pagelimit, pageno) {
      let data = {
        pagelimit: pagelimit,
        pagenum: pageno,
      };
      this.$risk_stock.risk_stock(data).then((res) => {
        this.loading = false;
        if (res.code == 200) {
          this.data = res.data.stock_list;
          for (let i = 0; i < this.data.length; i++) {
            this.data[i]["create_time"] = formatDate(
              this.data[i]["create_time"]
            );
            this.data[i]["status"] = tag(this.data[i]["status"]);
          }
          console.log(res);
          // 分页处理
          const pagination = { ...this.pagination };
          pagination.total = res.data.sum;
          this.pagination = pagination;
        } else {
          console.log(res);
        }
      });
    },
    deleteRiskStock(id) {
      let data = { stock_code: id };
      this.$risk_stock.delete_risk_stock(data).then((res) => {
        if (res.code == 200) {
          this.getRiskStockData(
            this.pagination.pageSize,
            this.pagination.current
          );
          this.$message.success("删除信息成功！");
        } else {
          console.log(res);
          this.$message.error("删除信息失败！");
        }
      });
    },
    handleTableChange(pagination) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.getRiskStockData(pagination.pageSize, pagination.current);
    },
    // 删除风险股票弹窗
    showDeleteConfirm(id) {
      let that = this;
      that.$confirm({
        title: "确认取消风险提醒？",
        okText: "确认",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          that.deleteRiskStock(id);
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    },
    // 显示抽屉
    showDrawer() {
      this.visible = true;
    },
    onCloseDrawer() {
      this.visible = false;
      this.dataSource = [];
      this.value = "";
    },
    // ================
    // 第二层页面
    // ================
    // 股票名称搜索框
    onSearchName(searchText) {
      this.getStockData(null, searchText);
    },
    // 股票代码搜索框
    onSearchCode(searchText) {
      this.getStockData(searchText, null);
    },
    onSelect(value) {
      this.data0 = [
        {
          stockcode: value.split("-")[1],
          stockname: value.split("-")[0],
        },
      ];
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
    // =====================
    // 第三层页面
    // =====================
    // 点击风险报警按钮
    setInfo(value) {
      this.stockcode = value;
      this.visibleModel = true;
    },
    // 选择框数据改变
    handleSelectChange(value) {
      this.selectValue = value;
    },
    // 问答框确认
    handleOk() {
      this.confirmLoading = true;
      if (this.textareaValue.length == 0) {
        // 判断输入框是否为空
        this.$message.error("描述信息不能为空！");
        this.confirmLoading = false;
        return;
      }
      let data = {
        stock_code: this.data0[0]["stockcode"],
        stock_name: this.data0[0]["stockname"],
        status: this.selectValue,
        status_desc: this.textareaValue,
      };
      this.$risk_stock.add_risk_stock(data).then((res) => {
        if (res.code == 200) {
          this.$message.success("风险信息发布成功!");
          // 关闭状态框
          this.visibleModel = false;
          this.confirmLoading = false;
          this.visible = false;
          this.textareaValue = "";
          this.selectValue = 1;
          this.getRiskStockData(
            this.pagination.pageSize,
            this.pagination.current
          );
        } else {
          console.log(res);
          this.$message.error("风险信息发布失败!");
        }
      });
    },
    handleCancel() {
      console.log("用户取消设置警示！");
      this.visibleModel = false;
    },
  },
};
</script>

<style scoped>
</style>