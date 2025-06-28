/**
 * Notes: 用户控制模块
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2025-01-22 10:20:00 
 */

const BaseProjectAdminController = require('./base_project_admin_controller.js');
const AdminVipService = require('../../service/admin/admin_vip_service.js');
const timeUtil = require('../../../../framework/utils/time_util.js');

class AdminVipController extends BaseProjectAdminController {

	async clearFee() {
		await this.isAdmin();

		// 数据校验
		let rules = { 
		};

		// 取得数据
		let input = this.validateData(rules); 

		let service = new AdminVipService();
		await service.clearFee();
	}

	async setTime() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			key: 'must|string|name=KEY',
			content: 'name=内容',
		};

		// 取得数据
		let input = this.validateData(rules);  

		let service = new AdminVipService();
		await service.setTime(input.key, input.content);
	}


	async cancelUserLog() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminVipService();
		return await service.cancelUserLog('', input.id);

	}

	/** 用户支付列表 */
	async getUserLogList() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			search: 'string|min:1|max:30|name=搜索条件',
			sortType: 'string|name=搜索类型',
			sortVal: 'name=搜索类型值',
			orderBy: 'object|name=排序',
			whereEx: 'object|name=附加查询条件',
			page: 'must|int|default=1',
			size: 'int',
			isTotal: 'bool',
			oldTotal: 'int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminVipService();
		let result = await service.getUserLogList(input);

		// 数据格式化
		let list = result.list;
		for (let k = 0; k < list.length; k++) {
			list[k].USER_LOG_ADD_TIME = timeUtil.timestamp2Time(list[k].USER_LOG_ADD_TIME);
			list[k].USER_LOG_CANCEL_TIME = timeUtil.timestamp2Time(list[k].USER_LOG_CANCEL_TIME);

		}
		result.list = list;
		return result;
	}


	async updatePayStatus() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
			type: 'int|must',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminVipService();
		return await service.updatePayStatus(input.type, input.id);


	}

}

module.exports = AdminVipController;