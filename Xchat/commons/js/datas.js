export default {
	friends: function() {
		let friendList = [{
				id: 1,
				image: '../../static/images/img/one.png',
				tip: 555,
				name: 'GEKYUME',
				time: new Date(),
				email: '934229118@qq.com',
				message: '我是XXX'
			},
			{
				id: 2,
				image: '../../static/images/img/mine.png',
				tip: 23,
				name: '薯条',
				time: new Date(),
				email: '934229118@qq.com',
				message: '我是XXX我是XXX我是XXX我是XXX我是XXX我是XXX'
			},
			{
				id: 3,
				image: '../../static/images/img/daijiayue.png',
				tip: 9,
				name: '麦乐鸡',
				time: new Date(),
				email: '934229118@qq.com',
				message: '日前召开的中央经济工作会议提出，要巩固拓展脱贫攻坚成果，坚决防止发生规模性返贫现象。要做好同乡村振兴的有效衔接，帮扶政策保持总体稳定，分类调整优化，留足政策过渡期。'
			},
			{
				id: 4,
				image: '../../static/images/img/shizi.png',
				tip: 0,
				name: '狮子',
				time: new Date(),
				email: '934229118@qq.com',
				message: '今年以来，在会议、国内考察等重要活动中，习近平总书记谈及乡村振兴，都会反复强调“有效衔接”这四个X'
			},
			{
				id: 5,
				image: '../../static/images/img/pig.png',
				tip: 1,
				name: '猪',
				time: new Date(),
				email: '934229118@qq.com',
				message: '我是XXX'
			},
			{
				id: 6,
				image: '../../static/images/img/two.png',
				tip: 2,
				name: 'fiveaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
				time: new Date(),
				email: '934229118@qq.com',
				message: '我是XXX'
			},
			{
				id: 7,
				image: '../../static/images/img/three.png',
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
	},
	//聊天
	message(){
		let msgs = [
			{
				id:'a',
				imgurl:'three.png',
				message:'需注意在webview渲染的页面中，区域滚动的性能不及页面滚动。',
				types:0,
				time:new Date()-1000*60*30,
				tip:0
			},
			{
				id:'a',
				imgurl:'three.png',
				message:'test.png',
				types:1,
				time:new Date()-1000*60*24,
				tip:1
			},
			{
				id:'b',
				imgurl:'two.png',
				message:'可滚动视图区域。用于区域滚动',
				types:0,
				time:new Date()-1000*60*12,
				tip:2
			},
			{
				id:'b',
				imgurl:'two.png',
				message:'在设置滚动条位置时使用动画过渡',
				types:0,
				time:new Date()-1000*60*11,
				tip:3
			},
			{
				id:'a',
				imgurl:'three.png',
				message:'值应为某子元素id（id不能以数字开头）。设置哪个方向可滚动，则在哪个方向滚动到该元素',
				types:0,
				time:new Date()-1000*60*10,
				tip:4
			},
			{
				id:'b',
				imgurl:'two.png',
				message:'pig.png',
				types:1,
				time:new Date()-1000*60*4,
				tip:5
			},
			{
				id:'b',
				imgurl:'two.png',
				message:'设置自定义下拉刷新默认样式，支持设置 black,white,none,none 表示不使用默认样式',
				types:0,
				time:new Date()-1000*60*3,
				tip:6
			},
			{
				id:'b',
				imgurl:'two.png',
				message:'one.png',
				types:1,
				time:new Date()-1000*60*2,
				tip:7
			},
			{
				id:'a',
				imgurl:'three.png',
				message:'mine.png',
				types:1,
				time:new Date()-1000*60,
				tip:8
			},
			{
				id:'a',
				imgurl:'three.png',
				message:{
					record:'../../static/mp3.mp3',
					time:60
				},
				types:2,
				time:new Date()-1000*30,
				tip:9
			},
			{
				id:'b',
				imgurl:'two.png',
				message:{
					record:'../../static/mp3.mp3',
					time:10
				},
				types:2,
				time:new Date(),
				tip:10
			},
			{
				id:'b',
				imgurl:'two.png',
				message:{
					name:'翔顺花园三区(东门)',
					address:'东堤南路',
					latitude:22.678714,
					longitude:112.232027
				},
				types:3,
				time:new Date(),
				tip:11
			},
			{
				id:'a',
				imgurl:'three.png',
				message:{
					name:'翔顺花园三区(东门)翔顺花园三区(东门)翔顺花园三区(东门)',
					address:'东堤南路东堤南路东堤南路东堤南路东堤南路',
					latitude:22.678714,
					longitude:112.232027
				},
				types:3,
				time:new Date(),
				tip:12
			},
		]
		return msgs
	}
}
