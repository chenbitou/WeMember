const pageHelper = require('../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../helper/cloud_helper.js');
const timeHelper = require('../../../../../helper/time_helper.js');
const ProjectBiz = require('../../../biz/project_biz.js'); 
const PassportBiz = require('../../../../../comm/biz/passport_biz.js');

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		isLogin: true
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		if (!PassportBiz.loginMustBackWin(this)) return;

		this._getSearchMenu();
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	},

	url: async function (e) {
		pageHelper.url(e, this);
	},

	bindCommListCmpt: function (e) {
		pageHelper.commListListener(this, e);
	},

	/** 搜索菜单设置 */
	_getSearchMenu: function () {
		let sortItem1 = [ ];

		let sortItems = [];
		let sortMenus = [
		 
		]

		this.setData({ 
			isLoad: true
		});

	},

	bindCancelTap: async function (e) {
        if (!await PassportBiz.loginMustCancelWin(this)) return;

		let callback = async () => {
			let idx = pageHelper.dataset(e, 'idx');
			let dataList = this.data.dataList;
			let id = dataList.list[idx]._id;

			let params = {
				id,
			}
			let opts = {
				title: '取消中'
			}
			try {
				await cloudHelper.callCloudSumbit('vip/my_user_log_cancel', params, opts).then(res => {


					let cb = () => {
						// 更新列表页面数据
						this.setData({
							['dataList.list[' + idx + '].USER_LOG_STATUS']: 98,
							['dataList.list[' + idx + '].USER_LOG_PAY_STATUS']: 8,
							['dataList.list[' + idx + '].USER_LOG_CANCEL_TIME']: timeHelper.time('Y-M-D h:m:s'),

							curIdx: -1,
							cancelModalShow: false
						});
					}

					pageHelper.showModal('取消成功 (若有在线缴费，所缴纳费用将在1-5分钟内原路退还)', '温馨提示', cb);
				});
			} catch (err) {
				console.error(err);
			}
		}

		pageHelper.showConfirm('确认取消？ 取消后不可恢复', callback);
    }
	 
})