<template>
    <div>   
        <a-card>
          <a-row>
              <a-button type="info" @click="refresh" style="margin-right: 2rem">刷新</a-button> <a-spin :spinning="loading" />
          </a-row>
          <a-row style="margin-top:3rem;">
              <a-col :span="15">
                  <a-statistic title="更新时间" :value="real_data.t" :value-style="{ fontSize:'16px' }" />
              </a-col>
              <a-col :span="9">
                  <a-statistic title="5分钟涨幅" :value="real_data.fm" suffix="%" />
              </a-col>
          </a-row>
          <a-row style="margin-top:3rem;">
              <a-col :span="6">
                  <a-statistic
                    title="当前价格"
                    :value="real_data.p"
                    suffix="元"
                    style="margin-right: 50px"
                    >
                  </a-statistic>
              </a-col>
              <a-col :span="9">
                  <a-statistic
                    title="成交额"
                    :value="real_data.cje"
                    suffix="元"
                    style="margin-right: 50px"
                    >
                  </a-statistic>
              </a-col>
              <a-col :span="9">
                  <a-statistic
                    title="成交量"
                    :value="real_data.volume"
                    suffix="手"
                    >
                  </a-statistic>
              </a-col>
          </a-row>
          <a-row style="margin-top:3rem;">
              <a-col :span="6">
                  <a-statistic
                    title="最高价"
                    :value="real_data.high"
                    suffix="元"
                    :value-style="{ color: '#cf1322' }"
                    style="margin-right: 10px"
                >
                <template #prefix>
                    <a-icon type="arrow-up" />
                </template>
                </a-statistic>
              </a-col>
              <a-col :span="9" >
                  <a-statistic
                    title="最低价"
                    :value="real_data.low"
                    suffix="元"
                    :value-style="{ color: '#3f8600'}"
                >
                    <template #prefix>
                        <a-icon type="arrow-down" />
                    </template>
                </a-statistic>
              </a-col>
              <a-col :span="9" >
                  <a-statistic
                    title="换手率"
                    :value="real_data.hs"
                    suffix="%"
                >
                </a-statistic>
              </a-col>
          </a-row>
          <a-row style="margin-top: 3rem;">
              <a-statistic title="总市值(元)" :value="real_data.sz"/>
          </a-row>
        </a-card>
    </div>
</template>

<script>
export default {
    name: "RealBlock",
    props: ["code"],
    data() {
        return {
            real_data: {}, // 实时数据
            loading: false
        }
    },
    mounted() {
        this.loadRealData(this.code)
    },
    methods: {
        // 加载实时数据
        loadRealData(code) {
            this.loading = true
            this.$stock_api.get_stock_day(code).then((res) => {
                console.log(res)
                if (res.code == 200) {
                    this.real_data = res.data
                    this.$message.success('获取数据成功！');
                } else {
                    this.$message.error('请求过于频繁,请2秒后刷新页面,重新进行请求!');
                }
                this.loading = false
            })
        },
        // 刷新股票实时数据
        refresh() {
            this.loadRealData(this.code)
        }
    }
    
}
</script>