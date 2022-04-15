<template>
    <div>
        <a-tabs default-active-key="up_week" @change="callback">
        
        <!-- 周涨跌排行榜 -->
        <a-tab-pane key="up_week" tab="周涨排行榜">
            <a-table
            :columns="columns"
            :data-source="week_up_data"
            :loading="loading"
            >

            <!-- 公司详情页面 -->
            <template slot="dm" slot-scope="text, row">
                <a @click="navQuote(row.dm.slice(2))">{{ text.slice(2) }}</a>
            </template>
            <template slot="mc" slot-scope="text, row">
                <a @click="navDetail(row.dm.slice(2))">{{ text }}</a>
            </template>
            <template slot="zdf" slot-scope="text">
                <span v-if="text > 0" style="color: red; font-size: 16px">{{ text }}</span>
                <span v-else style="color: green; font-size: 16px">{{ text }}</span>
            </template>
            </a-table>
        </a-tab-pane>

        <a-tab-pane key="down_week" tab="周跌排行榜">
            <a-table
            :columns="columns"
            :data-source="week_down_data"
            :loading="loading"
            >

            <!-- 公司详情页面 -->
            <template slot="dm" slot-scope="text, row">
                <a @click="navQuote(row.dm.slice(2))">{{ text.slice(2) }}</a>
            </template>
            <template slot="mc" slot-scope="text, row">
                <a @click="navDetail(row.dm.slice(2))">{{ text }}</a>
            </template>
            <template slot="zdf" slot-scope="text">
                <span v-if="text > 0" style="color: red; font-size: 16px">{{ text }}</span>
                <span v-else style="color: green; font-size: 16px">{{ text }}</span>
            </template>
            </a-table>
        </a-tab-pane>


        <!-- 月涨跌排行榜 -->
        <a-tab-pane key="up_month" tab="月涨排行榜">
            <a-table
            :columns="columns"
            :data-source="month_up_data"
            :loading="loading"
            >
            <!-- 公司详情页面 -->
            <template slot="dm" slot-scope="text, row">
                <a @click="navQuote(row.dm.slice(2))">{{ text.slice(2) }}</a>
            </template>
            <template slot="mc" slot-scope="text, row">
                <a @click="navDetail(row.dm.slice(2))">{{ text }}</a>
            </template>
            <template slot="zdf" slot-scope="text">
                <span v-if="text > 0" style="color: red; font-size: 16px">{{ text }}</span>
                <span v-else style="color: green; font-size: 16px">{{ text }}</span>
            </template>
            </a-table>
        </a-tab-pane>

        <a-tab-pane key="down_month" tab="月跌排行榜">
            <a-table
            :columns="columns"
            :data-source="month_down_data"
            :loading="loading"
            >
            <!-- 公司详情页面 -->
            <template slot="dm" slot-scope="text, row">
                <a @click="navQuote(row.dm.slice(2))">{{ text.slice(2) }}</a>
            </template>
            <template slot="mc" slot-scope="text, row">
                <a @click="navDetail(row.dm.slice(2))">{{ text }}</a>
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
    title: "周涨跌幅（%）",
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
    name: "Ranks",
    data() {
        return {
        loading: false,
        week_up_data: [],
        week_down_data: [],
        month_up_data: [],
        month_down_data: [],
        columns: columns
        };
    },
    mounted() {
      this.getWeekData()
    },
    methods: {
        callback(key) {
        if (key == 'up_week' || key == 'down_week') {
            if (this.week_up_data.length == 0) {
                this.getWeekData()
            }
        } 
        if (key == 'up_month' || key == 'down_week') {
            if (this.month_up_data.length == 0) {
                this.getMonthData()
                }
            }
        },
        // ================
        // 周涨跌数据获取
        // ================
        getWeekData() {
            this.loading = true
            this.$stock_api.get_stock_week_updown().then((res) => {
                console.log(res)
                if (res.code == 200) {
                    this.week_up_data = res.data['up_stock']
                    this.week_down_data = res.data['down_stock']
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
                this.month_up_data = res.data['up_stock']
                this.month_down_data = res.data['down_stock']
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
}
</script>