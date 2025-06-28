
const pageHelper = require('../../../../../helper/page_helper.js');
const UserBiz = require('../../../biz/user_biz.js');
const projectSetting = require('../../../public/project_setting.js');
const ProjectBiz = require('../../../biz/project_biz.js');

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		projectSetting,
		allTag: projectSetting.USER_TAG,

		showModal: false,
		showBox: 'other',

		birthMin: 0,
		birthMax: 100,

		city: [],
		trade: [],

		cate: [],
		line: [],
		tag: [],
		_params: {}
	},

	/**
		 * 生命周期函数--监听页面加载
		 */
	onLoad: async function (options) {
		ProjectBiz.initPage(this);
		

		this._getSearchMenu();

		let _params = {
			query: {
				city: [],
				trade: [],

				cate: [],
				line: [],
				tag: [],

				birthmin: this.data.birthMin,
				birthmax: this.data.birthMax,
			}
		}
		this.setData({ _params });

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () { },



	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: async function () {

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

	url: async function (e) {
		pageHelper.url(e, this);
	},

	bindCommListCmpt: function (e) {
		pageHelper.commListListener(this, e);
	},

	bindCityTap: function (e) {
		let t = pageHelper.dataset(e, 'city');
		let city = this.data.city;

		this.toggleElementInArray(city, t);

		this.setData({ city });
	},

	bindLineTap: function (e) {
		let t = pageHelper.dataset(e, 'line');
		let line = this.data.line;

		this.toggleElementInArray(line, t);

		this.setData({ line });
	},

	bindCateTap: function (e) {
		let t = pageHelper.dataset(e, 'cate');
		let cate = this.data.cate;

		this.toggleElementInArray(cate, t);

		this.setData({ cate });
	},


	bindTagTap: function (e) {
		let t = pageHelper.dataset(e, 'tag');
		let tag = this.data.tag;

		this.toggleElementInArray(tag, t);

		this.setData({ tag });
	},

	bindTradeTap: function (e) {
		let t = pageHelper.dataset(e, 'trade');
		let trade = this.data.trade;

		this.toggleElementInArray(trade, t);

		this.setData({ trade });
	},

	bindResetTap: function (e) {
		this.setData({
			tag: [],
			line: [],
			cate: [],

			//search: '',

			birthMin: 18,
			birthMax: 100,
		});

		let _params = {
			query: {
				trade: this.data.trade,
				city: this.data.city,

				tag: this.data.tag,
				line: this.data.line,
				cate: this.data.cate,

				birthmin: this.data.birthMin,
				birthmax: this.data.birthMax,
			}
		}

		this.setData({ showModal: false, _params }, () => {
			this.selectComponent("#list").reload();
		});
	},


	toggleElementInArray: function (array, element) {
		const index = array.indexOf(element); // 查找元素在数组中的索引

		if (index !== -1) {
			// 如果元素存在，删除它
			array.splice(index, 1);
		} else {
			// 如果元素不存在，添加它
			array.push(element);
		}
	},

	onSliderMinChange(e) {
		const { value } = e.detail;
		let birthMin = value; 
		this.setData({
			birthMin
		});
	},

	onSliderMaxChange(e) {
		const { value } = e.detail;
		let birthMax = value; 
		this.setData({
			birthMax
		});
	},

	bindHideModalTap: function (e) {
		this.setData({ showModal: false });
	},

	bindOpenModalTap: function (e) {
		let showBox = pageHelper.dataset(e, 'box');
		this.setData({ showModal: true, showBox });
	},


	bindResetModalTap: function (e) {
		let showBox = this.data.showBox;
		if (showBox == 'other') {
			this.setData({
				tag: [],
				line: [],
				cate: [],
				birthMin: 18,
				birthMax: 100,
			});
		}
		else if (showBox == 'city') {
			this.setData({
				city: [],
			});
		}
		else if (showBox == 'trade') {
			this.setData({
				trade: [],
			});
		}

	},

	bindQueryModalTap: function (e) {

		let _params = {
			query: {
				trade: this.data.trade,
				city: this.data.city,


				tag: this.data.tag,
				line: this.data.line,
				cate: this.data.cate,

				birthmin: this.data.birthMin,
				birthmax: this.data.birthMax,
			}
		}
		this.setData({ showModal: false, _params }, () => {
			this.selectComponent("#list").reload();
		});
	},

	_getSearchMenu: function () {
		this.setData({
			sortItems: [],
			sortMenus: [],
		})

	},



	onShareAppMessage: function () {

	},




})