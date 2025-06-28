const cloudHelper = require('../../../../../helper/cloud_helper.js');
const pageHelper = require('../../../../../helper/page_helper.js');
const PassportBiz = require('../../../../../comm/biz/passport_biz.js'); 
const ProjectBiz = require('../../../biz/project_biz.js');

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: false,

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		ProjectBiz.initPage(this);

		if (!PassportBiz.loginMustBackWin(this)) return;

		this._loadDetail();
	},


	_loadDetail: async function (e) {
		let time = await ProjectBiz.getSetup('time');
		if (!time) {
			this.setData({ isLoad: true });
			return;
		};

		let startTime = time.split('^')[0];
		let endTime = time.split('^')[1];

		this.setData({
			isLoad: true,
			startTime,
			endTime,
		})
	},


	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () { },

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
	onPullDownRefresh: async function () {
		wx.stopPullDownRefresh();
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},


	bindPayTap: async function (e) {

		let cb = async() => {
			try {
				let opts = {
					title: '提交中'
				}
				let params = {
				}
				await cloudHelper.callCloudSumbit('vip/pay', params, opts).then(res => {


					const payment = res.data.payRet.payment;
					wx.requestPayment({
						...payment,
						success(result) {
							wx.showModal({
								title: '温馨提示',
								showCancel: false,
								content: '缴费成功',
								success(res) {
									wx.navigateBack();
								}
							});

						},
						fail(err) {
							pageHelper.showModal('提交失败， 请重新提交~');
							console.error('pay fail', err);
						},
						async complete() {

						}
					})


				})
			} catch (err) {
				console.log(err);
			};
		}


		wx.requestSubscribeMessage({
			tmplIds: ['UO2AgqtyTo9jUrwRVH9X6-LPkMU1Bb7aZgrEIaMtGmM-1111'],
			async complete() {
				await cb();
			}
		});
	}


})