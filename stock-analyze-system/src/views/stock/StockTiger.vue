<template>
  <div>
    <a-tabs default-active-key="dpl7" @change="callback">
      <!-- 跌幅偏离值达7%的证券 -->
      <a-tab-pane key="dpl7_data" tab="跌幅偏离值达7%的证券">
        <a-table
          :columns="columns"
          :data-source="dpl7_data"
          :loading="loading"
        >
          <!-- 公司详情页面 -->
          <template slot="dm" slot-scope="text, row">
            <a @click="navQuote(row.dm)">{{ text }}</a>
          </template>
          <template slot="mc" slot-scope="text, row">
            <a @click="navDetail(row.dm)">{{ text }}</a>
          </template>
          <template slot="val" slot-scope="text">
            <span style="color: green; font-size: 16px">{{ text }}</span>
          </template>
        </a-table>
      </a-tab-pane>

      <!-- 涨幅偏离值达7%的证券 -->
      <a-tab-pane key="zpl7" tab="涨幅偏离值达7%的证券">
        <a-table
          :columns="columns"
          :data-source="zpl7_data"
          :loading="loading"
        >
          <!-- 公司详情页面 -->
          <template slot="dm" slot-scope="text, row">
            <a @click="navQuote(row.dm)">{{ text }}</a>
          </template>
          <template slot="mc" slot-scope="text, row">
            <a @click="navDetail(row.dm)">{{ text }}</a>
          </template>
          <template slot="val" slot-scope="text">
            <span style="color: red; font-size: 16px">{{ text }}</span>
          </template>
        </a-table>
      </a-tab-pane>

      <!-- 连续三个交易日内，涨幅偏离值累计达20%的证券 -->
      <a-tab-pane key="z20" tab="连续三个交易日内，涨幅偏离值累计达20%的证券">
        <a-table
          :columns="columns"
          :data-source="z20_data"
          :loading="loading"
        >
          <!-- 公司详情页面 -->
          <template slot="dm" slot-scope="text, row">
            <a @click="navQuote(row.dm)">{{ text }}</a>
          </template>
          <template slot="mc" slot-scope="text, row">
            <a @click="navDetail(row.dm)">{{ text }}</a>
          </template>
        </a-table>
      </a-tab-pane>

      <!-- 换手率达20%的证券 -->
      <a-tab-pane key="h20" tab="换手率达20%的证券">
        <a-table
          :columns="columns"
          :data-source="h20_data"
          :loading="loading"
        >
          <!-- 公司详情页面 -->
          <template slot="dm" slot-scope="text, row">
            <a @click="navQuote(row.dm)">{{ text }}</a>
          </template>
          <template slot="mc" slot-scope="text, row">
            <a @click="navDetail(row.dm)">{{ text }}</a>
          </template>
        </a-table>
      </a-tab-pane>

      <!-- 出现异常波动停牌的股票 -->
      <a-tab-pane key="wxztp" tab="出现异常波动停牌的股票">
        <a-table
          :columns="columns"
          :data-source="wxztp_data"
          :loading="loading"
        >
          <!-- 公司详情页面 -->
          <template slot="dm" slot-scope="text, row">
            <a @click="navQuote(row.dm)">{{ text }}</a>
          </template>
          <template slot="mc" slot-scope="text, row">
            <a @click="navDetail(row.dm)">{{ text }}</a>
          </template>
        </a-table>
      </a-tab-pane>
      
    </a-tabs>
  </div>
</template>

<script>

const columns = [
  {
    title: "代码",
    dataIndex: "dm",
    key: 'dm',
    width: "15%",
    scopedSlots: { customRender: "dm" },
  },
  {
    title: "股票名称",
    dataIndex: "mc",
    key: 'mc',
    width: "15%", 
    scopedSlots: { customRender: "mc" },
  },
  {
    title: "收盘价(元)",
    dataIndex: "c",
    key: 'c',
    width: "15%", 
  },
  {
    title: "成交量(万股)",
    dataIndex: "v",
    key: 'v',
    width: "15%", 
  },
  {
    title: "成交额(万元)",
    dataIndex: "e",
    key: 'e',
    width: "15%", 
  },
  {
    title: "对应值(%)",
    dataIndex: "val",
    key: 'val' ,
    scopedSlots: { customRender: "val" },
  }
];


export default {
  name: "TigerStock",
  data() {
    return {
      loading: false,
      dpl7_data: [],
      zpl7_data: [],
      z20_data: [],
      h20_data: [],
      wxztp_data: [],
      columns: columns   
    };
  },
  mounted() {
      this.getTigerData()
  },
  methods: {
    callback() {
      // if (key == 'dpl7_data') {
      //     this.data = this.dpl7_data
      // }
    },

    // ================
    // 龙虎榜数据获取
    // ================
    getTigerData() {
        this.loading = true
        this.$stock_api.get_stock_tiger().then((res) => {
            if (res.code == 200) {
              console.log(res)
              this.dpl7_data = res['data']['dpl7']
              this.zpl7_data = res['data']['zpl7']
              this.z20_data = res['data']['z20']
              this.h20_data = res['data']['h20']
              this.wxztp_data = res['data']['wxztp']
              this.loading = false
            } else {
              this.$message.error('请求过于频繁,请2秒后刷新页面,重新进行请求!');
            }
        })
    },

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
  }
};
</script>