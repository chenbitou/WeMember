const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: true,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		if (!AdminBiz.isAdmin(this)) return;
	},



	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady() {

	},


	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage() {

	},

	model: function (e) {
		pageHelper.model(this, e);
	},


	url: function (e) {
		pageHelper.url(e, this);
	},

	bindFormSubmit: async function () {
		if (!AdminBiz.isAdmin(this, true)) return;

		let callback = async () => {
			try {
				let params = {
				}

				await cloudHelper.callCloudSumbit('admin/vip_clear_fee', params).then(res => {
					let cb = () => {
						wx.navigateBack();
					}
					pageHelper.showModal('清除成功', '温馨提示', cb);
				});


			} catch (err) {
				console.log(err);
			}
		}
		pageHelper.showConfirm('确认操作？所有的会员缴费状态都将被清除', callback);

	},



})