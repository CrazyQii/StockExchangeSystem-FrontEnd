import { get, post } from './https.js'

// 股票接口
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
     * 查询指数、行业、概念
     * @returns 
     */
    get_base(paramObj) {
        return get('/stock/base', paramObj)
    },

    /**
     * 根据指数、行业、概念找相关股票
     * @param {*} paramObj 
     * @returns 
     */
    get_base_stock(paramObj) {
        return get('/stock/base/stock', paramObj)
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
    get_stocks(paramObj) {
        return get('/stock/stocks', paramObj)
    },

    /** 
     * 龙虎榜数据接口
     * 名称：stock_company
     * 参数：paramObj/null
     * 方式：get
     */
     get_stock_tiger() {
        return get('/stock/dt')
    },

    /** 
     * 今日提示数据接口
     * 名称：stock_company
     * 参数：paramObj/null
     * 方式：get
     */
     get_stock_note() {
        return get('/stock/note')
    },

    /** 
     * 周涨跌数据接口
     * 名称：stock_company
     * 参数：paramObj/null
     * 方式：get
     */
     get_stock_week_updown() {
        return get('/stock/week/updown')
    },

    /** 
     * 月涨跌数据接口
     * 名称：stock_company
     * 参数：paramObj/null
     * 方式：get
     */
     get_stock_month_updown() {
        return get('/stock/month/updown')
    },

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

// 用户接口
export const user_api = {
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
     *
     * 获取用户信息
     * 名称 user_info
     * 参数：paramObj/null
     * 方式：fetch/post/patch/put
     *
     * @returns 
     */
    user_info() {
        return get('/auth/user')
    },
    /** 
     * 注册
     * 名称 register
     * 参数：paramObj/null
     * 方式：fetch/post/patch/put
     */
    register(paramObj) {
        return post('/auth/sign-in', paramObj)
    },
    /** 
     * 登出
     * 名称 logout
     * 参数：paramObj/null
     * 方式：fetch/post/patch/put
     */
    logout() {
        return get('/auth/logout')
    }
}








