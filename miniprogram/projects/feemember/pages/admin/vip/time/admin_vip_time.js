const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const helper = require('../../../../../../helper/helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
const ProjectBiz = require('../../../../biz/project_biz.js');

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: false,
		startTime: '',
		endTime: '',
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		if (!AdminBiz.isAdmin(this)) return;

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
	onReady() {

	},

	bindDayChange: function (e) {
		let type = pageHelper.dataset(e, 'type');
		this.setData({
			[type]: e.detail.value
		})
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

		if (!this.data.startTime) return pageHelper.showModal('请填写开始日期！');
		if (!this.data.endTime) return pageHelper.showModal('请填写结束日期！');
		if (this.data.startTime >= this.data.endTime) return pageHelper.showModal('开始日期不能大于等于结束日期');


		let callback = async () => {
			try {
				let params = {
					key: 'time',
					content: this.data.startTime + '^' + this.data.endTime
				}

				await cloudHelper.callCloudSumbit('admin/vip_set_time', params).then(res => {
					let cb = () => {
						wx.navigateBack();
					}
					pageHelper.showModal('设置成功', '温馨提示', cb);
				});


			} catch (err) {
				console.log(err);
			}
		}
		pageHelper.showConfirm('确认操作？', callback);

	},



})