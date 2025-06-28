/**
 * Notes: 资讯模块业务逻辑
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2025-10-29 07:48:00 
 */

const BaseProjectService = require('./base_project_service.js');
const util = require('../../../framework/utils/util.js');
const timeUtil = require('../../../framework/utils/time_util.js');
const UserModel = require('../model/user_model.js');

class UserService extends BaseProjectService {

	/** 浏览资讯信息 */
	async viewUser(id) {

		let fields = '*';

		let where = {
			_id: id,
			USER_STATUS: 1
		}
		let user = await UserModel.getOne(where, fields);
		if (!user) return null;



		return user;
	}


	/** 取得分页列表 */
	async getUserList({
		cateId,
		query,
		search, // 搜索条件
		sortType, // 搜索菜单
		sortVal, // 搜索菜单
		orderBy, // 排序 
		page,
		size,
		isTotal = true,
		oldTotal
	}) {


		orderBy = orderBy || {
			'USER_ORDER': 'asc',
			'USER_ADD_TIME': 'desc'
		};
		let fields = '*';

		let where = {};
		where.and = {
			_pid: this.getProjectId() //复杂的查询在此处标注PID
		};
		where.and.USER_STATUS = 1; // 状态 

		if (query && query.city && query.city.length > 0) {
			where.and['USER_OBJ.city'] = ['in', query.city];
		}

		if (query && query.trade && query.trade.length > 0) {
			where.and['USER_OBJ.trade'] = ['in', query.trade];
		}

		if (query && query.xingqu && query.xingqu.length > 0) {
			where.and['USER_OBJ.xingqu'] = ['in', query.xingqu];
		}

		let birthMin = timeUtil.timestamp2Time(timeUtil.time() - Number(query.birthmin) * 86400 * 365 * 1000, 'Y-M-D');
		let birthMax = timeUtil.timestamp2Time(timeUtil.time() - Number(query.birthmax) * 86400 * 365 * 1000, 'Y-M-D');
 
		if (birthMin && birthMax)
			where.and['USER_OBJ.birth'] = ['between', birthMax, birthMin];

		if (cateId && cateId !== '0') where.and.USER_CATE_ID = cateId;

		if (util.isDefined(search) && search) {
			where.or = [
				{ USER_NAME: ['like', search] },
				{ 'USER_OBJ.college': ['like', search] }, 
				{ 'USER_OBJ.city': ['like', search] }, 
				{ 'USER_OBJ.trade': ['like', search] }, 
				{ 'USER_OBJ.gzdw': ['like', search] }, 
				{ 'USER_OBJ.duty': ['like', search] }, 
				{ 'USER_OBJ.phone': ['like', search] }, 
				{ 'USER_OBJ.wx': ['like', search] }, 
			];
		} else if (sortType && util.isDefined(sortVal)) {
			// 搜索菜单
			switch (sortType) {
				case 'sort': {
					orderBy = this.fmtOrderBySort(sortVal, 'USER_ADD_TIME');
					break;
				}
				case 'cateId': {
					if (sortVal) where.and.USER_CATE_ID = String(sortVal);
					break;
				}
			}
		}

		return await UserModel.getList(where, fields, orderBy, page, size, isTotal, oldTotal);
	}

}

module.exports = UserService;