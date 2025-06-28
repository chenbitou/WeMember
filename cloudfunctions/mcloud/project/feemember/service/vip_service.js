/**
 * Notes: passport模块业务逻辑 
 * Date: 2025-10-14 07:48:00 
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 */

const BaseProjectService = require('./base_project_service.js');
const UserModel = require('../model/user_model.js');
const PayModel = require('../model/pay_model.js');
const UserLogModel = require('../model/user_log_model.js');
const util = require('../../../framework/utils/util.js');
const timeUtil = require('../../../framework/utils/time_util.js');
const projectConfig = require('../public/project_config.js'); 
const MsgService = require('./msg_service.js');

class VipSerivce extends BaseProjectService {

	async minuteJob() {
		console.log('### minuteJob >>>>>');
 
	}


	// 修正某用户所有未支付的成功订单状态，无须支付的不用处理
	async fixUserUserLogPayAll(userId) {
	 
	}

	// 修正某订单状态 （仅需支付订单）
	async fixUserLogPayOne(tradeNo) {
 
	}

	async prepay(userId) {

		 
	}


	/** 取得我的支付分页列表 */
	async getMyUserLogList(userId, {
		search, // 搜索条件
		sortType, // 搜索菜单
		sortVal, // 搜索菜单
		orderBy, // 排序
		whereEx, //附加查询条件 
		page,
		size,
		oldTotal = 0
	}) {

		await this.fixUserUserLogPayAll(userId);

		orderBy = orderBy || {
			USER_LOG_ADD_TIME: 'desc'
		};
		let fields = '*';


		let where = {};
		where.and = {
			USER_LOG_USER_ID: userId,
			_pid: this.getProjectId() //复杂的查询在此处标注PID
		};

		if (util.isDefined(search) && search) {


		} else if (sortType && util.isDefined(sortVal)) {
			// 搜索菜单
			switch (sortType) {
				case 'status':
					where.and.USER_LOG_STATUS = Number(sortVal);
					break;
				case 'sort': {
					orderBy = this.fmtOrderBySort(sortVal, 'USER_LOG_ADD_TIME');
					break;
				}
			}
		}

		return await UserLogModel.getList(where, fields, orderBy, page, size, true, oldTotal, false);

	}

}

module.exports = VipSerivce;