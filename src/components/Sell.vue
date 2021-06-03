<template>
  <div>
    <a-row :gutter="16">
      <a-col :span="12">
        <a-statistic title="委差（股）" :value="order_vc" />
      </a-col>
      <a-col>
        <a-statistic title="委比" :value="order_vb" suffix="%" />
      </a-col>
    </a-row>

    <div style="height: 10rem; width: 100%">
      <div class="buy-list">
        <ul style="float: left; color: red">
          <li>买价</li>
          <li>1. {{ order_data.pb1 }}</li>
          <li>2. {{ order_data.pb2 }}</li>
          <li>3. {{ order_data.pb3 }}</li>
          <li>4. {{ order_data.pb4 }}</li>
          <li>5. {{ order_data.pb5 }}</li>
        </ul>
        <ul style="float: left; margin-left: 2rem; color: blue">
          <li>买量</li>
          <li>{{ order_data.vb1 }}</li>
          <li>{{ order_data.vb2 }}</li>
          <li>{{ order_data.vb3 }}</li>
          <li>{{ order_data.vb4 }}</li>
          <li>{{ order_data.vb5 }}</li>
        </ul>
      </div>
      <div class="sell-list">
        <ul style="float: left; color: green">
          <li>卖价</li>
          <li>1. {{ order_data.ps1 }}</li>
          <li>2. {{ order_data.ps2 }}</li>
          <li>3. {{ order_data.ps3 }}</li>
          <li>4. {{ order_data.ps4 }}</li>
          <li>5. {{ order_data.ps5 }}</li>
        </ul>
        <ul style="float: left; margin-left: 2rem; color: blue">
          <li>卖量</li>
          <li>{{ order_data.vs1 }}</li>
          <li>{{ order_data.vs2 }}</li>
          <li>{{ order_data.vs3 }}</li>
          <li>{{ order_data.vs4 }}</li>
          <li>{{ order_data.vs5 }}</li>
        </ul>
      </div>
    </div>

    <span>最新价：{{ trade_data.p }}</span>
    <span>跌停：{{ trade_data.yc * 0.9 }}</span>
    <span>涨停：{{ trade_data.yc * 1.1 }}</span>
    <!-- 买卖操作 -->
    <a-form-model :layout="form.layout" :model="form">
      <a-form-model-item label="限价">
        <a-input v-model="form.fieldA" placeholder="输入价格" />
      </a-form-model-item>
      <a-form-model-item label="数量">
        <a-input v-model="form.fieldA" placeholder="输入数量" />
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
export default {
  name: "Sell",
  props: ["code"],
  mounted() {
    this.getOrderBook(this.code);
    this.getTrade(this.code);
  },
  data() {
    return {
      form: {
        layout: "horizontal",
        fieldA: "",
        fieldB: "",
      },
      trade_data: {},
      order_data: {},
      order_vc: 0,
      order_vb: 0,
    };
  },
  methods: {
    getOrderBook(code) {
      // 盘口深度获取
      this.$stock_api.get_stock_trace(code).then((res) => {
        if (res.code == 200) {
          this.order_data = res.data;
          this.order_vb = res.data.vb;
          this.order_vc = res.data.vc;
          console.log(res.data);
        } else {
          console.log(res);
        }
      });
    },
    getTrade(code) {
      this.$stock_api.get_stock_day(code).then((res) => {
        if (res.code == 200) {
          this.trade_data = res.data;
          console.log(res);
        } else {
          console.log(res);
        }
      });
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.buy-list {
  float: left;
  margin-left: 4rem;
  font-weight: 500;
}

.sell-list {
  float: right;
  margin-right: 4rem;
  font-weight: 500;
}
</style>