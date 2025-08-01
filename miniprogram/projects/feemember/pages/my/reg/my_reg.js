const pageHelper = require('../../../../../helper/page_helper.js');
const cacheHelper = require('../../../../../helper/cache_helper.js');
const timeHelper = require('../../../../../helper/time_helper.js');
const fileHelper = require('../../../../../helper/file_helper.js');
const dataHelper = require('../../../../../helper/data_helper.js');
const helper = require('../../../../../helper/helper.js');
const cloudHelper = require('../../../../../helper/cloud_helper.js');
const validate = require('../../../../../helper/validate.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const projectSetting = require('../../../public/project_setting.js');
const setting = require('../../../../../setting/setting.js');
const PassportBiz = require('../../../../../comm/biz/passport_biz.js');

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: false,
		isEdit: false,

		agree: false,


		mobileCheck: setting.MOBILE_CHECK
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		ProjectBiz.initPage(this); 

		if (options && options.retUrl)
			this.data.retUrl = decodeURIComponent(options.retUrl); 

		await this._loadDetail();
	},

	_loadDetail: async function (e) {
		let opts = {
			title: 'bar'
		}
		let user = await cloudHelper.callCloudData('passport/my_detail', {}, opts);
		if (user) {
			return wx.reLaunch({ url: '../index/my_index' });
		}

		let fields = dataHelper.deepClone(projectSetting.USER_FIELDS); 
	 

		this.setData({
			isLoad: true,

			fields, 

			formName: '',
			formMobile: '',
			formForms: []
		});
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
	onPullDownRefresh: async function () {
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	bindGetPhoneNumber: async function (e) {
		PassportBiz.getPhone(e, this);
	},

	bindPicTap: function (e) {
		this.setData({
			formPic: e.detail.avatarUrl
		})
	},

	bindAgreeTap: function (e) {
		this.setData({ agree: !this.data.agree });
	},

	url: function (e) {
		pageHelper.url(e, this);
	},

	bindSubmitTap: async function (e) {
		if (!this.data.agree) {
			pageHelper.showModal('请先阅读并同意 《用户使用协议》', '温馨提示');
			return;
		}
		try {
			let data = this.data;

			// 数据校验 
			data = validate.check(data, projectSetting.USER_CHECK_FORM, this);
			if (!data) return;

			let forms = this.selectComponent("#cmpt-form").getForms(true);
			if (!forms) return;
			data.forms = forms;

			data.status = projectSetting.USER_REG_CHECK ? 0 : 1;

			let opts = {
				title: '提交中'
			}

			await cloudHelper.transFormsTempPics(forms, 'user/', '');

			await cloudHelper.callCloudSumbit('passport/register', data, opts).then(result => {
				if (result && helper.isDefined(result.data.token) && result.data.token) {

					// 用户需要审核，不能登录
					if (!projectSetting.USER_REG_CHECK) PassportBiz.setToken(result.data.token);

					let callback = () => {
						if (this.data.retUrl == 'back')
							wx.navigateBack();
						else if (this.data.retUrl)
							wx.redirectTo({
								url: this.data.retUrl,
							})
						else
							wx.reLaunch({ url: '../index/my_index' });
					}

					if (this.data.cnt == 1) {
						pageHelper.showSuccToast('提交成功', 1500, callback);
					}
					else {
						if (projectSetting.USER_REG_CHECK)
							pageHelper.showModal('注册完成，等待系统审核', '温馨提示', callback);
						else
							pageHelper.showSuccToast('注册成功', 1500, callback);
					}

				}
			});
		} catch (err) {
			console.error(err);
		}
	}
})