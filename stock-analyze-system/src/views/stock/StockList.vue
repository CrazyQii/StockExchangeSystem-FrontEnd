<template>
  <div>
    <!-- header -->
    <a-row type="flex">
      <a-col flex="40%">
        <!-- 树状选择条 -->
        <a-tree-select
          v-model="value"
          show-search
          style="width: 100%"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          placeholder="请选择模块"
          allow-clear
          @select="onSelect"
        >
          <a-tree-select-node title="概念板块" value="概念板块" :selectable="false" >
            <a-tree-select-node v-for="item in options" :key="item.id" :title="item.name" :value="item.name" />
          </a-tree-select-node>
        </a-tree-select>
      </a-col>
      <a-col flex="25%" style="margin-left:5rem;">
        <!-- 搜索自选股对话框 -->
        <div>
          <span>股票代码：</span>
          <a-auto-complete
            v-model="stockValue"
            style="width: 70%"
            placeholder="股票代码"
            @search="onSearchStock"
          /><a-spin :spinning="searchLoading"/>
          </div>
      </a-col>
      <a-col flex="10%">
        <a-button type="primary" @click="btnSearchStock">
          搜索
        </a-button>
      </a-col>
      <a-col flex="auto">
        <a-button type="danger" @click="navAdvice">
          股票推荐
        </a-button>
      </a-col>
    </a-row>

    <!-- content -->
    <!-- 查询表格数据展示 -->
    <a-table
      :columns="columns"
      :data-source="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
      style="margin-top:2rem;"
    >
      <!-- 公司详情页面 -->
      <template slot="dm" slot-scope="text">
        {{ text }}
      </template>
      <template slot="mc" slot-scope="text, row">
        <a @click="navDetail(row.dm)">{{ text }}</a>
      </template>
      <template slot="jys" slot-scope="text">
        <div v-if="text == 'sh'">上证</div>
        <div v-if="text == 'sz'">深证</div>
      </template>
      <!-- 删除 -->
      <template slot="operation" slot-scope="text, row">
        <a-button
          type="info"
          @click="navQuote(row.dm)"
          style="margin-right: 2rem"
          >行情</a-button
        >
        <a-button
          type="primary"
          @click="showDrawer(row.dm, row.mc)"
          style="margin-right: 2rem"
          >实时数据</a-button
        >
      </template>
    </a-table>

    <!-- 抽屉，用于展示股票的实时数据 -->
    <a-drawer
      :title="stockname + ' 实时交易数据'"
      placement="right"
      :closable="false"
      :visible="visible"
      @close="onCloseDrawer"
      width="40rem"
    >
      <RealBlcok :code="code" v-if="reFresh"></RealBlcok>
    </a-drawer>
  </div>
</template>

<script>

import RealBlcok from "@/components/RealBlock.vue";

// 表格表头
const columns = [
  {
    title: "代码",
    dataIndex: "dm",
    key: 'dm',
    width: "20%",
  },
  {
    title: "股票名称",
    dataIndex: "mc",
    key: 'mc',
    width: "30%",
    scopedSlots: { customRender: "mc" },
  },
  {
    title: "交易所",
    dataIndex: "jys",
    key: 'jys',
    width: "20%",
    scopedSlots: { customRender: "jys" },
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: 'operation',
    scopedSlots: { customRender: "operation" },
  },
];

export default {
  name: "StockList",
  props: {
    user_info: {
      type: Object,
    },
  },
  components: {
    RealBlcok
  },
  data() {
    return {
      loading: false,
      searchLoading: false,
      data: [],
      columns,
      pagination: {
        pageSize: 5,
        current: 1,
      },
      value: '',
      value_code: 'hs_a',  // 板块code， 默认沪深A股
      options: [
        {
          code: null,
          name: null,
          id: null
        }
      ],
      dataSource: [], // 搜索框数据源
      stockValue: "",
      visible: false, // 抽屉可见
      code: null, // 传给抽屉的股票code参数
      stockname: null, // 抽屉界面的股票名称
      reFresh: true // 刷新抽屉组件
    };
  },
  mounted() {
    this.onLoadBaseData()
    let param = { 'tree_code': this.value_code, 'pagenum': this.pagination.current, 'pagelimit': this.pagination.pageSize }
    this.loadStockData(param)
  },
  methods: {

    // ======================
    // 请求后端股票数据接口
    // ======================
    loadStockData(param) {
      param = { 
        tree_code: param['tree_code'], 
        pagenum: param['pagenum'], 
        pagelimit: param['pagelimit'] 
      }
      this.loading = true
      this.$stock_api.get_base_stock(param).then((res) => {
        console.log(res)
        this.data = res['data']['stocks']
        // 分页处理
        const pagination = { ...this.pagination };
        pagination.total = res.data.sum;
        this.pagination = pagination;
        this.loading = false
      })
    },

    /**
     * 点击树状选择中的某一个值，获取该股票数据
     */
    onSelect(e) {
      this.stockValue = ''
      this.pagination.current = 1
      for (let i = 0; i < this.options.length; i++) {
        if (e == this.options[i]['name']) {
          this.value_code = this.options[i]['code']
          let param = { tree_code: this.options[i]['code'], 'pagenum': 1, 'pagelimit': 10}
            this.loadStockData(param)
          return 
        }
      }

    },

    /**
     * 处理表格分页
     */
    handleTableChange(pagination) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      if (this.value_code != null) {
        let param = { 'tree_code': this.value_code, 'pagenum': this.pagination.current, 'pagelimit': this.pagination.pageSize }
        this.loadStockData(param)
      } else {
        this.getStockData({pagenum: this.pagination.current, pagelimit: this.pagination.pageSize});
      }
      
    },

    /**
     * 加载指数、行业、概念树形选择器
     */
    onLoadBaseData() {
      let param = { 'level': '2' }
      this.$stock_api.get_base(param).then((res) => {
        console.log(res)
        this.options = res['data']
      })
    },

    // ==================
    // 股票名称搜索框
    // ==================
    onSearchStock(searchText) {
      this.stockValue = searchText;
    },
    /**
     * 点击搜索按钮
     */
    btnSearchStock() {
      this.value = '股票概念板块'
      this.value_code = null
      this.getStockData({pagenum: 1, pagelimit: this.pagination.pageSize});
    },
    
    /**
     * 搜索框数据源获取
     */
    getStockData(param) {
      param = {
        pagelimit: param['pagelimit'],
        pagenum: param['pagenum'],
        stockname: this.stockValue,
        stockcode: this.stockValue
      }
      this.$stock_api.get_stocks(param).then((res) => {
        this.loading = true
        let dataSource = [];
        if (res.code == 200) {
          console.log(res);
          for (let i = 0; i < res.data.companies.length; i++) {
            dataSource.push(
              {
                'mc': res.data.companies[i]["stockname"],
                'dm': res.data.companies[i]['code'],
                'jys': res.data.companies[i]['jys']
              }
            );
          }
          this.data = dataSource
          // 分页处理
          const pagination = { ...this.pagination };
          pagination.total = res.data.sum;
          this.pagination = pagination;
          this.loading = false
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

    navAdvice() {
      // 跳转建议页面
      this.$router.push({
        path: `/stock-advice`,
      });
    },

    /**
     * 抽屉展示弹窗，并传递参数给抽屉组件
     */
    showDrawer(code, stockname) {
      this.visible = true
      this.code = code
      this.stockname = stockname
      this.reFresh = false
      this.$nextTick(() => {
        this.reFresh = true
      })
    },
    onCloseDrawer() {
      this.visible = false
    }
  }
};
</script>