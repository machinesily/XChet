export default {
	friends: function() {
		let friendList = [{
				id: 1,
				image: '../../static/img/test.png',
				tip: 555,
				name: 'GEKYUME',
				time: new Date(),
				email: '934229118@qq.com',
				message: '我是XXX'
			},
			{
				id: 2,
				image: '../../static/img/mine.png',
				tip: 23,
				name: '薯条',
				time: new Date(),
				email: '934229118@qq.com',
				message: '我是XXX我是XXX我是XXX我是XXX我是XXX我是XXX'
			},
			{
				id: 3,
				image: '../../static/img/daijiayue.png',
				tip: 9,
				name: '麦乐鸡',
				time: new Date(),
				email: '934229118@qq.com',
				message: '日前召开的中央经济工作会议提出，要巩固拓展脱贫攻坚成果，坚决防止发生规模性返贫现象。要做好同乡村振兴的有效衔接，帮扶政策保持总体稳定，分类调整优化，留足政策过渡期。'
			},
			{
				id: 4,
				image: '../../static/img/shizi.png',
				tip: 0,
				name: '狮子',
				time: new Date(),
				email: '934229118@qq.com',
				message: '今年以来，在会议、国内考察等重要活动中，习近平总书记谈及乡村振兴，都会反复强调“有效衔接”这四个X'
			},
			{
				id: 5,
				image: '../../static/img/pig.png',
				tip: 1,
				name: '猪',
				time: new Date(),
				email: '934229118@qq.com',
				message: '我是XXX'
			},
			{
				id: 6,
				image: '../../static/img/test.png',
				tip: 2,
				name: 'fiveaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
				time: new Date(),
				email: '934229118@qq.com',
				message: '我是XXX'
			},
			{
				id: 7,
				image: '../../static/img/test.png',
				tip: 2,
				name: 'six',
				time: new Date(),
				email: '934229118@qq.com',
				message: '我是XXX'
			},
		]
		return friendList
	},
	//好友关系
	isFriend: () => {
		let isfriend = [{
				userid: 1, //自己ID
				friend: 1 //好友ID
			},
			{
				userid: 1, //自己ID
				friend: 5 //好友ID
			},
			{
				userid: 1, //自己ID
				friend: 3 //好友ID
			},
			{
				userid: 1, //自己ID
				friend: 4 //好友ID
			},
		]
		return isfriend
	}
}
