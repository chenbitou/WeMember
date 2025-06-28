const USER_TAG = ["阅读", "运动", "音乐", "旅行", "摄影", "绘画", "烹饪", "看电影", "玩游戏", "健身", "跳舞", "写作", "瑜伽", "钓鱼", "徒步", "园艺", "宠物", "足球", "篮球", "乒乓球", "羽毛球", "跑步"];
const USER_EDU = ["小学", "初中", "高中", "中专", "大专", "本科", "硕士", "博士"];
const USER_TRADE = ["互联网", "金融", "教育", "医疗", "制造业", "服务业", "房地产", "零售", "农业", "交通运输", "能源", "通信", "建筑", "媒体", "娱乐", "法律", "咨询", "广告", "旅游", "物流", "其他"];
const USER_CITY = ["上海", "北京", "广州", "深圳", "重庆", "成都", "天津", "杭州", "武汉", "西安", "苏州", "南京", "长沙", "东莞", "郑州", "青岛", "沈阳", "宁波", "佛山", "合肥", "大连", "福州", "济南", "昆明", "厦门", "哈尔滨", "石家庄", "无锡", "长春", "常州", "南昌", "太原", "南宁", "贵阳", "泉州", "金华", "徐州", "兰州", "海口", "呼和浩特", "银川", "温州", "珠海", "赣州", "香港", "澳门"];

module.exports = { //feemember
	PROJECT_COLOR: '#222222',
	NAV_COLOR: '#ffffff',
	NAV_BG: '#222222',

	USER_TAG,
	USER_EDU,
	USER_TRADE,
	USER_CITY,

	// setup
	SETUP_CONTENT_ITEMS: [
		{ title: '关于我们', key: 'SETUP_CONTENT_ABOUT' },
		{ title: '用户使用协议', key: 'SETUP_YS' },
		{ title: '入会须知', key: 'SETUP_NOTICE' },
	],

	// 用户
	USER_REG_CHECK: false,
	USER_FIELDS: [
		{ mark: 'birth', title: '出生年月', type: 'date', must: true, edit: true },
		{ mark: 'sex', title: '性别', type: 'select', selectOptions: ['男', '女'], must: true },
		{ mark: 'avatar', title: '1寸证件照', type: 'image', must: true, len: 1 },
		{ mark: 'xueli', title: '学历', type: 'radio', selectOptions: USER_EDU, must: true, ext: { show: 'row' } },
		{ mark: 'college', title: '毕业学校', type: 'text', must: true },
		{ mark: 'city', title: '所在城市', type: 'area', ext: { city: true }, must: true },
		{ mark: 'trade', title: '行业领域', type: 'checkbox', selectOptions: USER_TRADE, checkBoxLimit: 1, must: true, ext: { show: 'row' } },
		{ mark: 'gzdw', title: '工作单位', type: 'text', must: true },
		{ mark: 'duty', title: '岗位', type: 'text', must: true },
		{ mark: 'phone', title: '联系电话', type: 'text', must: true },
		{ mark: 'wx', title: '微信号', type: 'text', must: true },
		{ mark: 'xingqu', title: '兴趣爱好', type: 'checkbox', selectOptions: USER_TAG, must: true, ext: { show: 'row' } },
		{ mark: 'intro', title: '自我介绍', type: 'content', must: true }

	],
	USER_CHECK_FORM: {
		name: 'formName|must|string|min:1|max:30|name=姓名',
		mobile: 'formMobile|must|mobile|name=手机',
		forms: 'formForms|array'
	},

	USER_CHECK_FORM1: {
		name: 'formName|must|string|min:1|max:30|name=姓名',
		mobile: 'formMobile|must|mobile|name=手机',
	},


	NEWS_NAME: '公告通知',
	NEWS_CATE: [
		{ id: 1, title: '公告通知' },

	],
	NEWS_FIELDS: [
	],


}