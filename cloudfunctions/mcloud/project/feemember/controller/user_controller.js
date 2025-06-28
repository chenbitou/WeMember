/**
 * Notes: 用户模块控制器
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2025-09-29 04:00:00 
 */

const BaseProjectController = require('./base_project_controller.js');
const UserService = require('../service/user_service.js');
const timeUtil = require('../../../framework/utils/time_util.js');

class UserController extends BaseProjectController { 

	/** 用户列表 */
	async getUserList() {

		// 数据校验
		let rules = {
			cateId: 'string',
			query: 'object',
			search: 'string|min:1|max:30|name=搜索条件',
			sortType: 'string|name=搜索类型',
			sortVal: 'name=搜索类型值',
			orderBy: 'object|name=排序',
			page: 'must|int|default=1',
			size: 'int',
			isTotal: 'bool',
			oldTotal: 'int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new UserService();
		let result = await service.getUserList(input);
		if (!result) return;

		// 数据格式化
		let list = result.list;

		for (let k = 0; k < list.length; k++) {
			list[k].USER_ADD_TIME = timeUtil.timestamp2Time(list[k].USER_ADD_TIME, 'Y-M-D');

			if (list[k].USER_OBJ && list[k].USER_OBJ.intro)
				delete list[k].USER_OBJ.intro;
		} 

		return result;

	}


	/** 浏览用户信息 */
	async viewUser() {
		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new UserService();
		let user = await service.viewUser(input.id);

		if (user) {
			// 显示转换 
			user.USER_ADD_TIME = timeUtil.timestamp2Time(user.USER_ADD_TIME, 'Y-M-D');
		}

		return user;
	} 

}

module.exports = UserController;