import Vue from 'vue';
import router from './router'
import App from './App'
// api接口
import { stock_api, user_info, risk_stock, order_api } from './utils/api.js'
// ant-design-vue组件
import 'ant-design-vue/dist/antd.css';
import Button from 'ant-design-vue/lib/button';
import Layout from 'ant-design-vue/lib/layout';
import Breadcrumb from 'ant-design-vue/lib/breadcrumb';
import BreadcrumbItem from 'ant-design-vue/lib/breadcrumb/BreadcrumbItem';
import Menu from 'ant-design-vue/lib/menu';
import Space from 'ant-design-vue/lib/space';
import List from 'ant-design-vue/lib/list';
import Icon from 'ant-design-vue/lib/icon';
import Table from 'ant-design-vue/lib/table';
import Tag from 'ant-design-vue/lib/tag';
import Input from 'ant-design-vue/lib/input';
import Pagination from 'ant-design-vue/lib/pagination';
import Descriptions from 'ant-design-vue/lib/descriptions';
import PageHeader from 'ant-design-vue/lib/page-header';
import Form from 'ant-design-vue/lib/form';
import Checkbox from 'ant-design-vue/lib/checkbox';
import Select from 'ant-design-vue/lib/select';
import Tooltip from 'ant-design-vue/lib/tooltip';
import Message from 'ant-design-vue/lib/message';
import Modal from 'ant-design-vue/lib/modal';
import Drawer from 'ant-design-vue/lib/drawer';
import Statistic from 'ant-design-vue/lib/statistic';
import Row from 'ant-design-vue/lib/row';
import Col from 'ant-design-vue/lib/col';
import FormModel from 'ant-design-vue/lib/form-model';
import Tabs from 'ant-design-vue/lib/tabs';
import Card from 'ant-design-vue/lib/card';
import DatePicker from 'ant-design-vue/lib/date-picker';
import AutoComplete from 'ant-design-vue/lib/auto-complete';
import InputNumber from 'ant-design-vue/lib/input-number';
import Popover from 'ant-design-vue/lib/popover';


import echarts from "echarts";


// 组件注册
Vue.component(Button.name, Button);
Vue.component(Layout.name, Layout);
Vue.component(Layout.Header.name, Layout.Header);
Vue.component(Layout.Content.name, Layout.Content);
Vue.component(Layout.Footer.name, Layout.Footer);
Vue.component(Layout.Sider.name, Layout.Sider);
Vue.component(Breadcrumb.name, Breadcrumb);
Vue.component(BreadcrumbItem.name, BreadcrumbItem);
Vue.component(Menu.name, Menu);
Vue.component(Menu.Item.name, Menu.Item);
Vue.component(Menu.SubMenu.name, Menu.SubMenu);
Vue.component(Menu.Divider.name, Menu.Divider);
Vue.component(Menu.ItemGroup.name, Menu.ItemGroup);
Vue.component(Space.name, Space);
Vue.component(List.name, List);
Vue.component(List.Item.name, List.Item);
Vue.component(List.Item.Meta.name, List.Item.Meta);
Vue.component(Icon.name, Icon);
Vue.component(Table.name, Table);
Vue.component(Table.Column.name, Table.Column);
Vue.component(Table.ColumnGroup.name, Table.ColumnGroup);
Vue.component(Tag.name, Tag);
Vue.component(Tag.CheckableTag.name, Tag.CheckableTag);
Vue.component(Input.name, Input);
Vue.component(Input.Group.name, Input.Group);
Vue.component(Input.Search.name, Input.Search);
Vue.component(Input.TextArea.name, Input.TextArea);
Vue.component(Input.Password.name, Input.Password);
Vue.component(Pagination.name, Pagination);
Vue.component(Descriptions.name, Descriptions);
Vue.component(Descriptions.Item.name, Descriptions.Item);
Vue.component(PageHeader.name, PageHeader);
Vue.component(Form.name, Form);
Vue.component(Form.Item.name, Form.Item);
Vue.component(Checkbox.name, Checkbox);
Vue.component(Select.name, Select);
Vue.component(Select.Option.name, Select.Option);
Vue.component(Select.OptGroup.name, Select.OptGroup);
Vue.component(Tooltip.name, Tooltip);
Vue.component(Drawer.name, Drawer);
Vue.component(Statistic.name, Statistic);
Vue.component(Statistic.Countdown.name, Statistic.Countdown);
Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.component(FormModel.name, FormModel);
Vue.component(FormModel.Item.name, FormModel.Item);
Vue.component(Tabs.name, Tabs);
Vue.component(Tabs.TabPane.name, Tabs.TabPane);
Vue.component(Tabs.TabContent.name, Tabs.TabContent);
Vue.component(Card.name, Card);
Vue.component(DatePicker.name, DatePicker);
Vue.component(DatePicker.RangePicker.name, DatePicker.RangePicker);
Vue.component(DatePicker.MonthPicker.name, DatePicker.MonthPicker);
Vue.component(DatePicker.WeekPicker.name, DatePicker.WeekPicker);
Vue.component(AutoComplete.name, AutoComplete);
Vue.component(AutoComplete.Option.name, AutoComplete.Option);
Vue.component(AutoComplete.OptGroup.name, AutoComplete.OptGroup);
Vue.component(InputNumber.name, InputNumber);
Vue.component(Popover.name, Popover);

Vue.use(Modal);


Vue.prototype.$message = Message;
Vue.prototype.$confirm = Modal.confirm;

//定义全局变量
Vue.prototype.$stock_api = stock_api;
Vue.prototype.$user_info = user_info;
Vue.prototype.$risk_stock = risk_stock;
Vue.prototype.$order_api = order_api;
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');