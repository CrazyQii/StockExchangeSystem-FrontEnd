<template>
  <div>
    <a-statistic title="今日提醒" :value="note_data['t']" />
    <a-tabs default-active-key="note">
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

    </a-tabs>
  </div>
</template>

<script>

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
    };
  },
  mounted() {
      this.getNoteData()
  },
  methods: {
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
  }
};
</script>