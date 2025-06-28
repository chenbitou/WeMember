/**
 * Notes: passport模块控制器
 * Date: 2025-03-15 19:20:00 
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 */

const BaseProjectController = require('./base_project_controller.js');
const VipService = require('../service/vip_service.js');
const AdminVipService = require('../service/admin/admin_vip_service.js');
const timeUtil = require('../../../framework/utils/time_util.js');

class VipController extends BaseProjectController {

	async cancelMyUserLog() {

		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminVipService();
		return await service.cancelUserLog(this._userId, input.id);

	}

	/** 我的用户支付列表 */
	async getMyUserLogList() {

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

		let service = new VipService();
		let result = await service.getMyUserLogList(this._userId, input);

		// 数据格式化
		let list = result.list;
		for (let k = 0; k < list.length; k++) {
			list[k].USER_LOG_ADD_TIME = timeUtil.timestamp2Time(list[k].USER_LOG_ADD_TIME);
			list[k].USER_LOG_CANCEL_TIME = timeUtil.timestamp2Time(list[k].USER_LOG_CANCEL_TIME);

		}
		result.list = list;
		return result;
	}

	async prepay() {

		// 数据校验
		let rules = {  
		};

		// 取得数据
		let input = this.validateData(rules);


		let service = new VipService();
		return await service.prepay(this._userId, input.index, input.img, input.code);
	}

 

}

module.exports = VipController;