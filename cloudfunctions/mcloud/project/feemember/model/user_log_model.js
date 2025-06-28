/**
 * Notes: 约战报名实体
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY www.code942.com
 * Date: 2025-09-26 19:20:00 
 */


const BaseProjectModel = require('./base_project_model.js');

class UserLogModel extends BaseProjectModel { }

// 集合名
UserLogModel.CL = BaseProjectModel.C('user_log');

UserLogModel.DB_STRUCTURE = {
	_pid: 'string|true',
	USER_LOG_ID: 'string|true',

	USER_LOG_USER_ID: 'string|true|comment=用户ID', 

	USER_LOG_DESC: 'string|false|comment=描述', 

	USER_LOG_CANCEL_TIME: 'int|true|default=0|comment=取消时间', 
	 
	USER_LOG_FEE: 'int|true|default=0|comment=需支付费用 分',
	USER_LOG_STATUS: 'int|true|default=1|comment=状态  0=待购买 1=购买成功, 98=自己取消,99=系统取消',

	USER_LOG_PAY_TRADE_NO: 'string|false|comment=商家订单号 32位',
	USER_LOG_PAY_STATUS: 'int|true|default=0|comment=支付状态 0=未支付 1=已支付 8=已退款 99=无需支付',
	USER_LOG_PAY_FEE: 'int|true|default=0|comment=已支付费用 分',
	USER_LOG_PAY_TIME: 'int|true|default=0|comment=支付时间',

	USER_LOG_ADD_TIME: 'int|true',
	USER_LOG_EDIT_TIME: 'int|true',
	USER_LOG_ADD_IP: 'string|false',
	USER_LOG_EDIT_IP: 'string|false',
};

// 字段前缀
UserLogModel.FIELD_PREFIX = "USER_LOG_";

UserLogModel.TYPE = {
	PAY: 0,
	SHARE: 1,
	SYS: 9,
};

UserLogModel.STATUS = {
	WAIT: 0,
	SUCC: 1,
	CANCEL: 98,
	ADMIN_CANCEL: 99
};

UserLogModel.STATUS_DESC = {
	WAIT: '待审核',
	SUCC: '成功',
	CANCEL: '取消',
	ADMIN_CANCEL: '审核未过'
};


module.exports = UserLogModel;