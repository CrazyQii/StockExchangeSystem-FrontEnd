import Vue from 'vue';
import router from './router'
import App from './App'
// api接口
import { stock_api } from './utils/api.js'  
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

//定义全局变量
Vue.prototype.$stock_api=stock_api;
Vue.prototype.$echarts=echarts;

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');