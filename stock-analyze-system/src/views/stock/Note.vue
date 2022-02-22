<template>
  <div>
    <a-statistic title="今日提醒" :value="note_data['t']" />
    <a-tabs default-active-key="note" @change="callback">
      <!-- 今日提醒 -->
      
      <a-tab-pane key="note" tab="停牌">
        <a-list 
            item-layout="horizontal" 
            :data-source="note_data['tp']"
            :loading="loading"
        >
            <a-list-item slot="renderItem" slot-scope="item">
                {{ item }}
            </a-list-item>
        </a-list>
      </a-tab-pane>

      <!-- 深交易所公告 -->
      <a-tab-pane key="sz" tab="深交易所公告">
        <a-list 
            item-layout="horizontal" 
            :data-source="note_data['szgg']"
            :loading="loading"
        >
            <a-list-item slot="renderItem" slot-scope="item">
                {{ item }}
            </a-list-item>
        </a-list>
      </a-tab-pane>

      <!-- 上交易所公告 -->
      <a-tab-pane key="sh" tab="上交易所公告">
        <a-list 
            item-layout="horizontal" 
            :data-source="note_data['shgg']"
            :loading="loading"
        >
            <a-list-item slot="renderItem" slot-scope="item">
                {{ item }}
            </a-list-item>
        </a-list>
      </a-tab-pane>
      
      <!-- 周涨跌排行榜 -->
      <a-tab-pane key="week" tab="周涨跌排行榜">
        <a-table
          :columns="columns"
          :data-source="week_data"
          :loading="loading"
        >

          <!-- 公司详情页面 -->
          <template slot="dm" slot-scope="text, row">
            <a @click="navQuote(row.dm.slice(2))">{{ text.slice(2) }}</a>
          </template>
          <template slot="mc" slot-scope="text, row">
            <a @click="navDetail(row.dm)">{{ text }}</a>
          </template>
          <template slot="zdf" slot-scope="text">
            <span v-if="text > 0" style="color: red; font-size: 16px">{{ text }}</span>
            <span v-else style="color: green; font-size: 16px">{{ text }}</span>
          </template>
        </a-table>
      </a-tab-pane>


      <!-- 月涨跌排行榜 -->
      <a-tab-pane key="month" tab="月涨跌排行榜">
        <a-table
          :columns="columns"
          :data-source="month_data"
          :loading="loading"
        >
          <!-- 公司详情页面 -->
          <template slot="dm" slot-scope="text, row">
            <a @click="navQuote(row.dm.slice(2))">{{ text.slice(2) }}</a>
          </template>
          <template slot="mc" slot-scope="text, row">
            <a @click="navDetail(row.dm)">{{ text }}</a>
          </template>
          <template slot="zdf" slot-scope="text">
            <span v-if="text > 0" style="color: red; font-size: 16px">{{ text }}</span>
            <span v-else style="color: green; font-size: 16px">{{ text }}</span>
          </template>
        </a-table>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>

const columns = [
  {
    title: "股票代码",
    dataIndex: "dm",
    key: 'dm',
    width: "10%",
    scopedSlots: { customRender: "dm" },
  },
  {
    title: "股票名称",
    dataIndex: "mc",
    key: 'mc',
    width: "10%", 
    scopedSlots: { customRender: "mc" },
  },
  {
    title: "周涨幅（%）",
    dataIndex: "zdf",
    key: 'zdf',
    width: "10%", 
    scopedSlots: { customRender: "zdf" },
  },
  {
    title: "周成交量（股）",
    dataIndex: "v",
    key: 'v',
    width: "10%", 
  },
  {
    title: "周成交额（元）",
    dataIndex: "amount",
    key: 'amount',
    width: "15%", 
  },
  {
    title: "周最高价（元）",
    dataIndex: "hp",
    key: 'hp',
    width: "15%", 

  },
  {
    title: "周最低价（元）",
    dataIndex: "lp",
    key: 'lp',
    width: "15%", 
  },

];

export default {
  name: "Note",
  data() {
    return {
      loading: false,
      note_data: {
          t: null,
          tp: [],
          szgg: [],
          shgg: [],
          gpgk: [],
          
      },
      week_data: [],
      month_data: [],
      columns: columns
    };
  },
  mounted() {
      this.getNoteData()
  },
  methods: {
    callback(key) {
      if (key == 'week') {
          this.getWeekData()
      } 
      if (key == 'month') {
          this.getMonthData()
      }
    },

    // ================
    // 今日提醒数据获取
    // ================
    getNoteData() {
        this.loading = true
        this.$stock_api.get_stock_note().then((res) => {
            console.log(res)
            if (res.code == 200) {
                this.note_data.t = res.data['t']
                if (res.data['tp'] != null) {
                  this.note_data.tp = res.data['tp']
                }
                if (res.data['szgg'] != null) {
                  this.note_data.szgg = res.data['szgg'].slice(0, 10)
                }
                if (res.data['shgg'] != null) {
                  this.note_data.shgg = res.data['shgg'].slice(0, 10)
                }
                if (res.data['gpgk'] != null) {
                  this.note_data.gpgk = res.data['gpgk']
                }          
            } else {
                this.$message.error('请求过于频繁,请2秒后刷新页面,重新进行请求!');
            }
            this.loading = false
        })
    },

    // ================
    // 周涨跌数据获取
    // ================
    getWeekData() {
        this.loading = true
        this.$stock_api.get_stock_week_updown().then((res) => {
            console.log(res)
            if (res.code == 200) {
                this.week_data = res.data.slice(0, 10)
            } else {
                this.$message.error('请求过于频繁,请2秒后刷新页面,重新进行请求!');
            }
            this.loading = false
        }) 
    },

    // ================
    // 月涨跌数据获取
    // ================
    getMonthData() {
        this.loading = true
        this.$stock_api.get_stock_month_updown().then((res) => {
            console.log(res)
            if (res.code == 200) {
                this.month_data = res.data.slice(0, 10)
            } else {
                this.$message.error('请求过于频繁,请2秒后刷新页面,重新进行请求!');
            }
            this.loading = false
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