<template>
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      :title="stock_data.stockname"
      @back="() => $router.go(-1)"
    />
    <a-alert :message="isRiskDesc" banner type="warning" v-if="isRisk" style="margin: 0.5rem auto" />
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="分时图">
        <div class="chart">
          <div id="DayChart"></div>
        </div>
      </a-tab-pane>
      <a-tab-pane key="Day" tab="日K线图">
        <a-spin :spinning="spinning" tip="加载中...">
          <div class="chart">
            <div id="KlineDayChart"></div>
          </div>
        </a-spin>
      </a-tab-pane>
      <a-tab-pane key="Week" tab="周K线图">
        <a-spin :spinning="spinning" tip="加载中...">
          <div class="chart">
            <div id="KlineWeekChart"></div>
          </div>
        </a-spin>
      </a-tab-pane>
      <a-tab-pane key="Month" tab="月K线图">
        <a-spin :spinning="spinning" tip="加载中...">
          <div class="chart">
            <div id="KlineMonthChart"></div>
          </div>
        </a-spin>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
// K线图
var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

export default {
  name: "Quote",
  data() {
    return {
      spinning: false,
      code: this.$route.params.code,
      stock_data: {}, // 股票数据
      kline_data: {
        day: [], // 日k线数据
        week: [], // 周k线数据
        month: [], // 月k线数据
      },
      day_data: {
        // 当天分时数据
        time: [],
        price: [],
      },
      isRisk: false,  // 是否为风险股票
      isRiskDesc: ''
    };
  },
  mounted() {
    this.getStock(this.code);
    this.getDayData(this.code);
  },
  methods: {
    // tab切换
    callback(key) {
      if (key === "1") {
        this.getDayData(this.code);
      } else {
        this.getHistKlineData(key, this.code);
      }
    },
    getStock(code) {
      // 股票信息数据
      this.$stock_api.stock_company(code).then((res) => {
        if (res.code == 200) {
          this.stock_data = res.data;
        } else {
          console.log(res);
          this.$message.error('此股票为新股票，暂未保存到数据库，请更新数据库!');
        }
      });
    },
    // ==============
    // k线历史数据图形建模
    // ==============
    getHistKlineData(level, code) {
      this.spinning = true;
      this.$stock_api.get_stock_hist_realtimedeal(code, level).then((res) => {
        if (res.code == 200) {
          if (level == "Day") {
            this.kline_data.day = this.splitKlineData(res.data);
          } else if (level == "Week") {
            this.kline_data.week = this.splitKlineData(res.data);
          } else if (level == "Month") {
            this.kline_data.month = this.splitKlineData(res.data);
          } else {
            console.log(this.res);
          }
          console.log(this.kline_data);
        } else {
          console.log(res);
          this.$message.error("数据获取失败!" + res.msg);
        }
        this.drawKlineChart(level);
        this.spinning = false;
      });
    },
    splitKlineData(rawData) {
      // 格式化数据
      var categoryData = [];
      var values = [];
      for (let i = rawData.length - 60; i < rawData.length; i++) {
        categoryData.push(rawData[i]["d"].replace(/-/g, "/"));
        values.push([
          rawData[i]["o"],
          rawData[i]["c"],
          rawData[i]["l"],
          rawData[i]["h"],
        ]);
      }
      return {
        categoryData: categoryData,
        values: values,
      };
    },
    calculateMA(dayCount, level) {
      // MA线计算
      let data = [];
      if (level === "Day") {
        data = this.kline_data.day;
      } else if (level === "Week") {
        data = this.kline_data.week;
      } else if (level === "Month") {
        data = this.kline_data.month;
      }
      var result = [];
      for (var i = 0, len = data.values.length; i < len; i++) {
        if (i < dayCount) {
          result.push("-");
          continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
          sum += data.values[i - j][1];
        }
        result.push(sum / dayCount);
      }
      return result;
    },
    drawKlineChart(level) {
      let KlineChart = null;
      // 指定图表的配置项和数据
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        grid: {
          left: "10%",
          right: "10%",
          bottom: "15%",
        },

        xAxis: {
          type: "category",
          scale: true,
          boundaryGap: false,
          axisLine: { onZero: false },
          splitLine: { show: false },
          splitNumber: 20,
          min: "dataMin",
          max: "dataMax",
        },
        yAxis: {
          scale: true,
          splitArea: {
            show: true,
          },
        },
        dataZoom: [
          {
            type: "inside",
            start: 50,
            end: 100,
          },
          {
            show: true,
            type: "slider",
            top: "90%",
            start: 50,
            end: 100,
          },
        ],
        series: [
          {
            type: "candlestick",
            itemStyle: {
              color: upColor,
              color0: downColor,
              borderColor: upBorderColor,
              borderColor0: downBorderColor,
            },
            markPoint: {
              label: {
                normal: {
                  formatter: function (param) {
                    return param != null ? Math.round(param.value) : "";
                  },
                },
              },
              data: [
                {
                  name: "XX标点",
                  coord: ["2013/5/31", 2300],
                  value: 2300,
                  itemStyle: {
                    color: "rgb(41,60,85)",
                  },
                },
                {
                  name: "highest value",
                  type: "max",
                  valueDim: "highest",
                },
                {
                  name: "lowest value",
                  type: "min",
                  valueDim: "lowest",
                },
                {
                  name: "average value on close",
                  type: "average",
                  valueDim: "close",
                },
              ],
              tooltip: {
                formatter: function (param) {
                  return param.name + "<br>" + (param.data.coord || "");
                },
              },
            },
            markLine: {
              symbol: ["none", "none"],
              data: [
                [
                  {
                    name: "from lowest to highest",
                    type: "min",
                    valueDim: "lowest",
                    symbol: "circle",
                    symbolSize: 10,
                    label: {
                      show: false,
                    },
                    emphasis: {
                      label: {
                        show: false,
                      },
                    },
                  },
                  {
                    type: "max",
                    valueDim: "highest",
                    symbol: "circle",
                    symbolSize: 10,
                    label: {
                      show: false,
                    },
                    emphasis: {
                      label: {
                        show: false,
                      },
                    },
                  },
                ],
                {
                  name: "min line on close",
                  type: "min",
                  valueDim: "close",
                },
                {
                  name: "max line on close",
                  type: "max",
                  valueDim: "close",
                },
              ],
            },
          },
          {
            name: "MA5",
            type: "line",
            smooth: true,
            lineStyle: {
              opacity: 0.5,
            },
          },
          {
            name: "MA10",
            type: "line",
            smooth: true,
            lineStyle: {
              opacity: 0.5,
            },
          },
          {
            name: "MA20",
            type: "line",
            smooth: true,
            lineStyle: {
              opacity: 0.5,
            },
          },
          {
            name: "MA30",
            type: "line",
            smooth: true,
            lineStyle: {
              opacity: 0.5,
            },
          },
        ],
      };

      if (level === "Day") {
        // K线图表绘制
        KlineChart = this.$echarts.init(
          document.getElementById("KlineDayChart")
        );
        option.legend = {
          data: ["日K", "MA5", "MA10", "MA20", "MA30"],
        };
        option.xAxis.data = this.kline_data.day.categoryData;
        option.series[0].name = "日K";
        option.series[0].data = this.kline_data.day.values;
      } else if (level === "Month") {
        KlineChart = this.$echarts.init(
          document.getElementById("KlineMonthChart")
        );
        option.legend = {
          data: ["月K", "MA5", "MA10", "MA20", "MA30"],
        };
        option.xAxis.data = this.kline_data.month.categoryData;
        option.series[0].name = "月K";
        option.series[0].data = this.kline_data.month.values;
      } else if (level === "Week") {
        KlineChart = this.$echarts.init(
          document.getElementById("KlineWeekChart")
        );
        option.legend = {
          data: ["周K", "MA5", "MA10", "MA20", "MA30"],
        };
        option.xAxis.data = this.kline_data.week.categoryData;
        option.series[0].name = "周K";
        option.series[0].data = this.kline_data.week.values;
      } else {
        console.log("绘图失败！");
      }
      option.series[1].data = this.calculateMA(5, level);
      option.series[2].data = this.calculateMA(10, level);
      option.series[3].data = this.calculateMA(20, level);
      option.series[3].data = this.calculateMA(30, level);
      KlineChart.setOption(option);
    },
    // ==============
    // 分时数据图形建模
    // ==============
    getDayData(code) {
      this.spinning = true;
      this.$stock_api.get_stock_daytimedeal(code).then((res) => {
        if (res.code == 200) {
          for (let i = 0; i < res.data.length; i++) {
            this.day_data.time.push(res.data[i]["t"]);
            this.day_data.price.push(res.data[i]["p"]);
          }
          this.day_data.time.reverse();
          this.day_data.price.reverse();
          console.log(this.day_data);
        } else {
          console.log(res);
        }
        this.drawDayChart();
        this.spinning = false;
      });
    },
    drawDayChart() {
      let DayChart = this.$echarts.init(document.getElementById("DayChart"));
      let option = {
        tooltip: {
          trigger: "axis",
          formatter: function (params) {
            params = params[0];
            return "价格: " + params.value + " / 时间: " + params.axisValue;
          },
          axisPointer: {
            animation: false,
          },
        },
        xAxis: {
          type: "category",
          splitLine: {
            show: true,
          },
          data: this.day_data.time,
        },
        yAxis: {
          type: "value",
          axisPointer: {
            snap: true,
          },
        },
        series: [
          {
            name: "分时数据",
            type: "line",
            showSymbol: true,
            hoverAnimation: true,
            data: this.day_data.price,
          },
        ],
      };
      // setInterval(function () {
      //   DayChart.setOption({
      //     series: [
      //       {
      //         data: this.day_data,
      //       },
      //     ],
      //   });
      // }, 1000);

      DayChart.setOption(option);
    },
  },
};
</script>

<style scoped>
.chart {
  position: relative;
  top: 2rem;
  left: 2rem;
}

#KlineDayChart,
#KlineMonthChart,
#KlineWeekChart,
#DayChart {
  min-width: 800px;
  width: 1200px;
  height: 550px;
}
</style>