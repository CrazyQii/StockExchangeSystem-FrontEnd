import { get } from './https.js'

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




