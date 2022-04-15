<template>
    <div>
        <!-- header -->
        <a-row>
            <a-col :span='4'>
                <a-statistic v-if="zf300 < 0" title="本周沪深300涨幅" :value="zf300" :value-style="{ color: '#3f8600' }" suffix="%" >
                    <template #prefix>
                    <a-icon type="arrow-down" />
                    </template>
                </a-statistic>
                <a-statistic v-else title="本周沪深300涨幅" :value="zf300" :value-style="{ color: '#cf1322' }" suffix="%" >
                    <template #prefix>
                    <a-icon type="arrow-up" />
                    </template>
                </a-statistic>
            </a-col>
            <a-col :span='20'>
                <a-alert
                    message="此列表展示推荐购买的10股沪深A股本周涨跌幅大于沪深300指数的股票，注意：仅为建议！"
                    type="warning"
                    closable
                />
            </a-col>
        </a-row>

        <!-- content -->
        <a-table
        :columns="columns"
        :data-source="dataSource"
        :loading="loading"
        style="margin-top:2rem;"
        >
            <!-- 公司详情页面 -->
            <template slot="dm" slot-scope="text">
                {{ text }}
            </template>
            <template slot="mc" slot-scope="text, row">
                <a @click="navDetail(row.dm)">{{ text }}</a>
            </template>
            <template slot="h" slot-scope="text">
                <a-icon type="arrow-up" style="color: red" />{{ text }}
            </template>
            <template slot="l" slot-scope="text">
                <a-icon type="arrow-down" style="color: green" />{{ text }}
            </template>
            <template slot="zdf" slot-scope="text">
                <span v-if="text > 0" style="color: red; font-size: 16px">{{ text }}</span>
                <span v-else s  tyle="color: green; font-size: 16px">{{ text }}</span>
            </template>
            <!-- 删除 -->
            <template slot="operation" slot-scope="text, row">
                <a-button
                    type="info"
                    @click="navQuote(row.dm)"
                    style="margin-right: 2rem"
                >行情</a-button>
                <a-button
                    type="primary"
                    @click="showDrawer(row.dm, row.mc)"
                    style="margin-right: 2rem"
                >实时数据</a-button>
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

const columns = [
  {
    title: "代码",
    dataIndex: "dm",
    key: 'dm',
    width: "10%",
  },
  {
    title: "股票名称",
    dataIndex: "mc",
    key: 'mc',
    width: "10%",
    scopedSlots: { customRender: "mc" },
  },
  {
    title: "开盘价",
    dataIndex: "o",
    key: 'o',
    width: "10%",
    scopedSlots: { customRender: "o" },
  },
  {
    title: "收盘价",
    dataIndex: "c",
    key: 'c',
    width: "10%",
    scopedSlots: { customRender: "c" },
  },
  {
    title: "最高价",
    dataIndex: "h",
    key: 'h',
    width: "10%",
    scopedSlots: { customRender: "h" },
  },
  {
    title: "最低价",
    dataIndex: "l",
    key: 'l',
    width: "10%",
    scopedSlots: { customRender: "l" },
  },
  {
    title: "涨跌幅(%)",
    dataIndex: "zdf",
    key: 'zdf',
    width: "10%",
    scopedSlots: { customRender: "zdf" },
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: 'operation',
    scopedSlots: { customRender: "operation" },
  },
];

export default {
    name: 'Advice',
    data() {
        return {
            loading: true,
            dataSource: [],
            columns: columns,
            pagination: {
                pageSize: 5,
                current: 1,
            },
            visible: false, // 抽屉可见
            code: null, // 传给抽屉的股票code参数
            stockname: null, // 抽屉界面的股票名称
            reFresh: true, // 刷新抽屉组件,
            zf300: 0 // 本周沪深300涨幅
        }
    },
    components: {
        RealBlcok
    },
    mounted() {
        this.getBzqsgStock()
    },
    methods: {
        /**
         * 本周强势股票
         */
        getBzqsgStock() {
            this.loading = true;
            this.$stock_api.get_stock_bzqsg().then((res) => {
                if (res.code == 200) {
                    for (let i = 0; i < res['data'].length; i++) {
                        res['data'][i]['dm'] = res['data'][i]['dm'].slice(2) 
                    }
                    console.log(res['data'])
                    this.dataSource = res['data']
                    this.zf300 = res['data'][0]['zf300']
                } else {
                    this.$message.error('请求过于频繁,请2秒后刷新页面,重新进行请求!');
                }
                this.loading = false
            })
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
}
</script>