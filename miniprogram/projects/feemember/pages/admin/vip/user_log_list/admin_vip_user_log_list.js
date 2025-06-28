const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
const timeHelper = require('../../../../../../helper/time_helper.js');

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
		if (!AdminBiz.isAdmin(this)) return;


		//设置搜索菜单
		this._getSearchMenu();

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () { },

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: async function () { },

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () { },

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () { },

	url: async function (e) {
		pageHelper.url(e, this);
	},

	bindCommListCmpt: function (e) {
		pageHelper.commListListener(this, e);
	},

	bindCancelTap: function (e) {
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
				await cloudHelper.callCloudSumbit('admin/user_log_cancel', params, opts).then(res => {


					let cb = () => {
						// 更新列表页面数据
						this.setData({
							['dataList.list[' + idx + '].USER_LOG_STATUS']: 99,
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

		pageHelper.showConfirm('确认取消该会员？ 取消后不可恢复', callback);
	},

	_getSearchMenu: function () {

		let sortMenus = [
			{ label: '全部', type: '', value: '' }, 
			{ label: '已支付', type: 'status', value: 1 },
			{ label: '用户取消', type: 'status', value: 98 }, 
			{ label: '系统取消', type: 'status', value: 99 }, 
		]
		this.setData({
			search: '',
			sortItems: [],
			sortMenus: sortMenus,
			isLoad: true
		})
	}

})