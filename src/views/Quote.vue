<template>
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      :title="code"
      @back="() => $router.go(-1)"
    />
    <div>
        <div class="chart">
            <div id="myChart" style="width: 300px; height: 300px">123</div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Quote",
  data() {
    return {
      code: this.$route.params.code,
      day_data: {}, // 股票实时交易数据
      trace_data: {}, // 五档口数据
      daytimedeal: {}, // 当天分时数据
      realtimedeal: [], // 当天分时实时数据
    };
  },
  mounted() {
    this.getInitData(this.code);
    this.drawChart();
  },
  methods: {
    getInitData(code) {
      // 初始化数据
      this.$stock_api.get_stock_day(code).then((res) => {
        console.log(res);
        this.day_data = res.data;
      });
      this.$stock_api.get_stock_trace(code).then((res) => {
        console.log(res);
        this.trace_data = res.data;
      });
      this.$stock_api.get_stock_daytimedeal(code).then((res) => {
        console.log(res);
        this.daytimedeal = res.data;
      });
      this.$stock_api.get_stock_realtimedeal(code, 5).then((res) => {
        console.log(res);
        this.realtimedeal = res.data;
      });
    },
    drawChart() {
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "ECharts 入门示例",
        },
        tooltip: {},
        legend: {
          data: ["销量"],
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      };
      myChart.setOption(option);
    },
  },
};
</script>