/**
 * Notes: 用户管理
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2025-01-22  07:48:00 
 */

const BaseProjectAdminService = require('./base_project_admin_service.js');
const setupUtil = require('../../../../framework/utils/setup/setup_util.js');
const util = require('../../../../framework/utils/util.js');
const UserModel = require('../../model/user_model.js');
const UserLogModel = require('../../model/user_log_model.js');
const VipService = require('../vip_service.js');

class AdminVipService extends BaseProjectAdminService {

	// 设置会员期
	async setTime(key, val, type = '') {
		this.AppError('[会员]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	// 清除所有用户缴费状态
	async clearFee() {
		this.AppError('[会员]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/** 取消会员支付 */
	async cancelUserLog(userId, userLogId) {
		this.AppError('[会员]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	// 更新用户缴费状态
	async updatePayStatus(type, userId) {
		this.AppError('[会员]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}

	/** 取得用户支付分页列表 */
	async getUserLogList({
		search, // 搜索条件
		sortType, // 搜索菜单
		sortVal, // 搜索菜单
		orderBy, // 排序
		whereEx, //附加查询条件 
		page,
		size,
		oldTotal = 0
	}) {


		orderBy = orderBy || {
			USER_LOG_ADD_TIME: 'desc'
		};
		let fields = 'USER_LOG_PAY_FEE,USER_LOG_CANCEL_TIME,USER_LOG_USER_ID,USER_LOG_ADD_TIME,USER_LOG_STATUS,USER_LOG_PAY_STATUS,USER_LOG_FEE,USER_LOG_DESC,user.USER_NAME,user.USER_MOBILE';


		let where = {};
		where.and = {
			USER_LOG_PAY_STATUS: ['<>', 0],
			_pid: this.getProjectId() //复杂的查询在此处标注PID
		};

		if (util.isDefined(search) && search) {
			where.or = [{
				'user.USER_NAME': ['like', search]
			},
			{
				'user.USER_MOBILE': ['like', search]
			},

			];

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

		let joinParams = {
			from: UserModel.CL,
			localField: 'USER_LOG_USER_ID',
			foreignField: 'USER_MINI_OPENID',
			as: 'user',
		};

		let result = await UserLogModel.getListJoin(joinParams, where, fields, orderBy, page, size, true, oldTotal, false);


		// 为导出增加一个参数condition
		result.condition = encodeURIComponent(JSON.stringify(where));

		return result;
	}

}

module.exports = AdminVipService;