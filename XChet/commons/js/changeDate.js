export default {
	//首页时间转化 (oldData为对方发送消息的时间，nowDate为当前系统时间)
	changeDate(oleDate) {
		let old = new Date(oleDate);
		let now = new Date()

		//获取oldDate的具体时间
		let hour = old.getHours()
		let minute = old.getMinutes()
		let year = old.getFullYear()
		let month = old.getMonth() + 1 //获取的比实际要小，所以要加一
		let day = old.getDate()

		//获取nowDate的具体时间
		let nowhour = now.getHours()
		let nowminute = now.getMinutes()
		let nowyear = now.getFullYear()
		let nowmonth = now.getMonth() + 1
		let nowday = now.getDate()

		//当天的消息
		if (day === nowday && month === nowmonth && year === nowyear) {
			if (hour < 10) {
				hour = '0' + hour
			}
			if (minute < 10) {
				minute = '0' + minute
			}
			return hour + ':' + minute
		}

		//昨天的消息
		if (day + 1 === nowday && month === nowmonth && year === nowyear) {
			if (hour < 10) {
				hour = '0' + hour
			}
			if (minute < 10) {
				minute = '0' + minute
			}
			return '昨天' + hour + ':' + minute
		} else {
			if (hour < 10) {
				hour = '0' + hour
			}
			if (minute < 10) {
				minute = '0' + minute
			}
			return year + '/' + month + '/' + day
		}
	},

	//
	changeTime(oleDate) {
		let old = new Date(oleDate);

		//获取oldDate的具体时间
		let hour = old.getHours()
		let minute = old.getMinutes()
		let year = old.getFullYear()
		let month = old.getMonth() + 1 //获取的比实际要小，所以要加一
		let day = old.getDate()

		if (month < 10) {
			month = '0' + month
		}
		if (day < 10) {
			day = '0' + day
		}
		return year + '-' + month + '-' + day
	},
   
	//聊天页面时间转换
	chatDate(oleDate) {
		let old = new Date(oleDate);
		let now = new Date()

		//获取oldDate的具体时间
		let hour = old.getHours()
		let minute = old.getMinutes()
		let year = old.getFullYear()
		let month = old.getMonth() + 1 //获取的比实际要小，所以要加一
		let day = old.getDate()

		//获取nowDate的具体时间
		let nowhour = now.getHours()
		let nowminute = now.getMinutes()
		let nowyear = now.getFullYear()
		let nowmonth = now.getMonth() + 1
		let nowday = now.getDate()

		//当天的消息
		if (day === nowday && month === nowmonth && year === nowyear) {
			if (hour < 10) {
				hour = '0' + hour
			}
			if (minute < 10) {
				minute = '0' + minute
			}
			return hour + ':' + minute
		}

		//昨天的消息
		if (day + 1 === nowday && month === nowmonth && year === nowyear) {
			if (hour < 10) {
				hour = '0' + hour
			}
			if (minute < 10) {
				minute = '0' + minute
			}
			return '昨天' + hour + ':' + minute
		} else if (year === nowyear) {
			// 大于两天的时间
			if (hour < 10) {
				hour = '0' + hour
			}
			if (minute < 10) {
				minute = '0' + minute
			}
			return  month + '月' + day + '日 ' + hour + ':' + minute
		} else {
			// 大于一年的时间
			if (hour < 10) {
				hour = '0' + hour
			}
			if (minute < 10) {
				minute = '0' + minute
			}
			return year + '年' + month + '月' + day + '日 ' + hour + ':' + minute
		}
	},
	
	//间隔时间
	spaceTime(n,o){
		if(n>(o+1000*60*5)){
			return o
		} else {
			return ''
		}
	}
}
