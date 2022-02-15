import { get, post, remove } from './https.js'

export const stock_api = {

    /** 
     * 测试接口
     * 名称：exam
     * 参数：paramObj/null
     * 方式：fetch/post/patch/put
     */
    exam(paramObj) {
        return get('/stock/15', paramObj)
    },

    /** 
     * 批量股票（公司）接口
     * 名称：stock_companies
     * 参数：paramObj/null
     * 方式：get
     */
    stock_companies(pagelimit, pagenum) {
        return get('/stock/' + pagelimit + '/' + pagenum)
    },

    /** 
     * 指定股票（公司）接口
     * 名称：stock_company
     * 参数：paramObj/null
     * 方式：get
     */
    stock_company(code) {
        return get('/stock/' + code)
    },

    /** 
     * 模糊查询股票（公司）接口
     * 参数：paramObj/null
     * 方式：get
     */
    get_stockcode(paramObj) {
        return get('/stock/stockcode', paramObj)
    },

    get_stockname(paramObj) {
        return get('/stock/stockname', paramObj)
    },
    /** 
     * 周涨跌数据接口
     * 名称：stock_company
     * 参数：paramObj/null
     * 方式：get
     */
    //  get_stock_week_updown() {
    //     return get('/stock/week/updown')
    // },

    /** 
     * 月涨跌数据接口
     * 名称：stock_company
     * 参数：paramObj/null
     * 方式：get
     */
    //  get_stock_month_updown() {
    //     return get('/stock/month/updown')
    // },

    /** 
     * 股票实时数据接口
     * 名称：get_stock_day
     * 参数：paramObj/null
     * 方式：get
     */
    get_stock_day(code) {
        return get('/stock/real/' + code)
    },
    /** 
     * 买卖五档口数据接口
     * 名称：get_stock_trace
     * 参数：paramObj/null
     * 方式：get
     */
    get_stock_trace(code) {
        return get('/stock/trace/' + code)
    },


    /** 
     * 当天分时数据接口
     * 名称：get_stock_daytimedeal
     * 参数：paramObj/null
     * 方式：get
     */
    get_stock_daytimedeal(code) {
        return get('/stock/timedeal/' + code)
    },

    /** 
     * 当天分时实时数据接口
     * 名称：get_stock_realtimedeal
     * 参数：paramObj/null
     * 方式：get
     */
    get_stock_realtimedeal(code, level) {
        return get('/stock/timedeal/' + code + '/' + level)
    },

    /** 
     * 历史分时数据接口
     * 名称：get_stock_hist_realtimedeal
     * 参数：paramObj/null
     * 方式：get
     */
    get_stock_hist_realtimedeal(code, level) {
        return get('/stock/hist/timedeal/' + code + '/' + level)
    }
}

export const user_info = {
    /** 
     * 登录
     * 名称 login
     * 参数：paramObj/null
     * 方式：fetch/post/patch/put
     */
    login(paramObj) {
        return post('/auth/login', paramObj)
    },
    /** 
     * 获取用户信息
     * 名称 user_info
     * 参数：paramObj/null
     * 方式：fetch/post/patch/put
     */
    user_info() {
        return get('/auth/userInfo')
    },
    /** 
     * 注册
     * 名称 register
     * 参数：paramObj/null
     * 方式：fetch/post/patch/put
     */
    register(paramObj) {
        return post('/auth/register', paramObj)
    },
    /** 
     * 登出
     * 名称 logout
     * 参数：paramObj/null
     * 方式：fetch/post/patch/put
     */
    logout() {
        return get('/auth/logout')
    },
    /** 
     * 用户列表
     * 名称 stock_list
     * 参数：paramObj/null
     * 方式：fetch/post/patch/put
     */
    user_list(paramObj) {
        return get('/auth/userlist', paramObj)
    },
    /** 
     * 删除用户
     * 名称 delete_stock
     * 参数：paramObj/null
     * 方式：fetch/post/patch/put
     */
    delete_user(paramObj) {
        return remove('/auth/user', paramObj)
    },
    /** 
     * 自选股
     * 名称 stock_list
     * 参数：paramObj/null
     * 方式：fetch/post/patch/put
     */
    stock_list(paramObj) {
        return get('/quote/', paramObj)
    },
    /** 
     * 删除自选股
     * 名称 delete_stock
     * 参数：paramObj/null
     * 方式：fetch/post/patch/put
     */
    delete_stock(paramObj) {
        return remove('/quote/', paramObj)
    },

    /** 
     * 添加自选股
     * 名称 add_stock
     * 参数：paramObj/null
     * 方式：fetch/post/patch/put
     */
    add_stock(paramObj) {
        return post('/quote/', paramObj)
    },

}

export const risk_stock = {
    /** 
     * 风险股票列表
     * 名称 risk_stock
     * 参数：paramObj/null
     * 方式：fetch/post/patch/put
     */
    risk_stock(paramObj) {
        return get('/risk/stocklist', paramObj)
    },

    risk_stock_one(paramObj) {
        return get('/risk/stock', paramObj)
    },

    add_risk_stock(paramObj) {
        return post('/risk/stocklist', paramObj)
    },

    delete_risk_stock(paramObj) {
        return remove('/risk/stocklist', paramObj)
    },
}

export const order_api = {
    /** 
     * 委托订单列表
     * 名称 risk_stock
     * 参数：paramObj/null
     * 方式：fetch/post/patch/put
     */
    order_list(paramObj) {
        return get('/order/', paramObj)
    },
    delete_order(paramObj) {
        return remove('/order/', paramObj)
    },
    add_order(paramObj) {
        return post('/order/', paramObj)
    },
    account_order(paramObj) {
        return get('/order/account/orderlist', paramObj)
    },
    account_order_one(paramObj) {
        return get('/order/account/detail', paramObj)
    },
}




