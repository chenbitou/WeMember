/**
 * Notes: 用户实体
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2025-10-14 19:20:00 
 */


const BaseProjectModel = require('./base_project_model.js');
class UserModel extends BaseProjectModel { }

// 集合名
UserModel.CL = BaseProjectModel.C('user');

UserModel.DB_STRUCTURE = {
	_pid: 'string|true',
	USER_ID: 'string|true',

	USER_MINI_OPENID: 'string|false|comment=小程序openid',
	USER_STATUS: 'int|true|default=1|comment=状态 0=待审核,1=正常,  8=审核未过,9=禁用',
	USER_CHECK_REASON: 'string|false|comment=审核未过的理由',

	USER_NAME: 'string|false|comment=姓名',
	USER_MOBILE: 'string|false|comment=联系电话',

	USER_FORMS: 'array|true|default=[]',
	USER_OBJ: 'object|true|default={}',
 

	USER_LOGIN_CNT: 'int|true|default=0|comment=登陆次数',
	USER_LOGIN_TIME: 'int|false|comment=最近登录时间',

	USER_PAY_TYPE: 'int|true|default=0|comment=0,在线缴费 1,后台设置',
	USER_PAY_STATUS: 'int|true|default=0|comment=用户是否支付',
	USER_PAY_TIME: 'int|true|default=0|comment=用户支付时间',

	USER_VIP_START_DAY: 'string|false|comment=用户VIP开始时间',
	USER_VIP_DAY: 'string|false|comment=用户VIP到期时间',  

	USER_ADD_TIME: 'int|true',
	USER_ADD_IP: 'string|false',

	USER_EDIT_TIME: 'int|true',
	USER_EDIT_IP: 'string|false',
}

// 字段前缀
UserModel.FIELD_PREFIX = "USER_";

/**
 * 状态 0=待审核,1=正常,2=审核未过,9=禁用
 */
UserModel.STATUS = {
	UNUSE: 0,
	COMM: 1,
	WAIT: 7,
	UNCHECK: 8,
	FORBID: 9
};

UserModel.STATUS_DESC = {
	UNUSE: '待审核',
	COMM: '正常',
	WAIT: '待注册',
	UNCHECK: '未通过审核',
	FORBID: '禁用'
};

UserModel.VIP_TYPE = {
	NO: 0,
	STUDENT: 1,
	COMM: 2
};


module.exports = UserModel;