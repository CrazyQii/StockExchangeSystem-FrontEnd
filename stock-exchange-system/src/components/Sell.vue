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

    <div style="margin-bottom: 2rem">
      <span
        >最新价：<span style="font-weight: 700">{{
          trade_data.price
        }}</span></span
      >
      <span style="margin-left: 1rem"
        >跌停：<span style="font-weight: 700">{{ form.lprice }}</span></span
      >
      <span style="margin-left: 1rem"
        >涨停：<span style="font-weight: 700">{{ form.hprice }}</span></span
      >
    </div>

    <!-- 买卖操作 -->
    <a-form-model :layout="form.layout" :model="form">
      <a-form-model-item label="限价">
        <a-input-number
          :value="form.price"
          placeholder="输入价格"
          :min="form.lprice"
          :max="form.hprice"
          :step="0.01"
          @change="onChangePrice"
          :disabled="is_null"
        />
      </a-form-model-item>
      <a-popover title="提示" trigger="hover" placement="bottom">
        <template slot="content">
          <p>该股票持有量 {{form.max_volume}}</p>
          <p>必须是100的整数倍</p>
        </template>
        <a-form-model-item label="数量">
          <a-input-number
            :value="form.volume"
            placeholder="输入数量(100股)"
            :min="form.min_volume"
            :max="form.max_volume"
            :step="100"
            @change="onChangeVolume"
            style="width: 200px"
            :disabled="is_null"
          />
        </a-form-model-item>
      </a-popover>
      <a-form-item>
        <a-button type="primary" @click="onSubmit" :disabled="is_null">
          卖出
        </a-button>
      </a-form-item>
    </a-form-model>
  </div>
</template>

<script>
export default {
  name: "Sell",
  props: ["code", "user_info"],
  mounted() {
    this.getStock(this.code);
    this.getOrderBook(this.code);
    this.getTrade(this.code);
    this.getOrder(this.code)
  },
  data() {
    return {
      stock_data: {},
      form: {
        layout: "inline",
        price: "",
        max_price: 0,
        min_price: 0,
        volume: "",
        max_volume: 1000,
        min_volume: 100,
      },
      // 实时数据
      is_null: false,
      trade_data: {
        price: 0,
      },
      order_data: {},
      order_vc: 0, // 委差
      order_vb: 0, // 委比
    };
  },
  methods: {
    getStock(code) {
      // 股票信息数据
      this.$stock_api.stock_company(code).then((res) => {
        if (res.code == 200) {
          this.stock_data = res.data;
        } else {
          console.log(res);
        }
      });
    },
    // =============
    // 数据获取
    // =============
    getOrder(code) {
      let data = {
        account_id: this.user_info.id,
        stock_code: code
      }
      this.$order_api.account_order_one(data).then((res) => {
        if (res.code == 200) {
          if (res.data == null) {
            this.$message.warning("未持有该股票！");
            this.is_null = true;
            return;
          }
          this.form.max_volume = Number(res.data.volume)
        } else {
          console.log(res)
        }
      })
    },
    getOrderBook(code) {
      // 盘口深度获取
      this.$stock_api.get_stock_trace(code).then((res) => {
        if (res.code == 200) {
          this.order_data = res.data;
          this.order_vb = res.data.vb;
          this.order_vc = res.data.vc;
        } else {
          console.log(res);
          this.$message.error("数据获取失败！" + res.msg);
        }
      });
    },
    getTrade(code) {
      // 交易数据
      this.$stock_api.get_stock_day(code).then((res) => {
        if (res.code == 200) {
          console.log(res);
          if (res.data["p"] == undefined) {
            this.$message.warning("该股票暂无最新交易数据!");
            this.is_null = true;
            return;
          }
          this.trade_data["price"] = res.data["p"];
          this.form["lprice"] =
            Math.floor(Number(res.data["yc"] * 0.9) * 100) / 100;
          this.form["hprice"] =
            Math.floor(Number(res.data["yc"] * 1.1) * 100) / 100;
          console.log(this.trade_data);
        } else {
          console.log(res);
          this.$message.error("数据获取失败！" + res.msg);
        }
      });
    },
    // 价格数量输入框
    onChangePrice(value) {
      this.form.price = value;
    },
    onChangeVolume(value) {
      if (value < 100) {
        return;
      }
      this.form.volume = value;
    },
    onSubmit() {
      let data = {
        account_id: this.user_info.id,
        stock_code: this.code,
        stock_name: this.stock_data.stockname,
        direction: "sell",
        status: 1,
        volume: this.form.volume,
        order_price: this.form.price,
        price: this.form.price,
      };
      this.$order_api.add_order(data).then((res) => {
        if (res.code == 200) {
          this.$message.success("已挂单成功！");
          this.$router.push({
            path: `/orderlist`,
          });
        } else {
          console.log(res);
          this.$message.error("交易失败" + res.msg);
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