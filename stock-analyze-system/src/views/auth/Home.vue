<template>
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="欢迎来到股票分析系统"
    />

  <a-tree :tree-data="treeData" show-icon default-expand-all :default-selected-keys="['0-0-0']">
    <a-icon slot="switcherIcon" type="down" />
    <a-icon slot="smile" type="smile-o" />
    <a-icon slot="meh" type="smile-o" />
    <template slot="custom" slot-scope="{ selected }">
      <a-icon :type="selected ? 'frown' : 'frown-o'" />
    </template>
  </a-tree>

  </div>
</template>

<script>
const treeData = [
  {
    title: '系统机构框架展示',
    key: '0-0',
    slots: {
      icon: 'smile',
    }
  },
  {
    title: '股票列表',
    key: '0-1',
    children: [
      { title: '股票模块(概念模块)搜索', key: '0-1-0' },
      { title: '股票模糊查询', key: '0-1-1' },
      { title: '股票实时交易数据', key: '0-1-2' },
      { title: '股票公司信息查询', key: '0-1-3' },
    ],
  },
  {
    title: '涨跌排行榜',
    key: '0-2',
    children: [
      { title: '周涨跌排行榜', key: '0-2-0' },
      { title: '月涨跌排行榜', key: '0-2-1' },
    ]
  },
  {
    title: '龙虎榜',
    key: '0-3',
    children: [
      { title: '跌幅偏离值达7%的证券', key: '0-3-0' },
      { title: '涨幅偏离值达7%的证券', key: '0-3-1' },
      { title: '振幅值达15%的证券', key: '0-3-2' },
      { title: '连续三个交易日内，跌幅偏离值累计达20%的证券', key: '0-3-3' },
      { title: '出现异常波动停牌的股票', key: '0-3-4' },
    ],
  },
  {
    title: '股市风向标',
    key: '0-4',
    children: [
      { title: '停牌', key: '0-4-0' },
      { title: '深交易所公告', key: '0-4-1' },
      { title: '上交易所公告', key: '0-4-2' }
    ],
  },
  {
    title: '用户信息',
    key: '0-5',
    children: [
      { title: '个人信息查看', key: '0-5-0' },
      { title: '登出', key: '0-5-1' },
    ],
  },
];

export default {
  data() {
    return {
      treeData,
    };
  },
  methods: {
    onSelect(selectedKeys, info) {
      console.log('selected', selectedKeys, info);
    },
    onCheck(checkedKeys, info) {
      console.log('onCheck', checkedKeys, info);
    },
  },
};
</script>