(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-userHome-userHome"],{"0072":function(t,i,a){"use strict";a.r(i);var e=a("c021"),n=a("941e");for(var s in n)"default"!==s&&function(t){a.d(i,t,(function(){return n[t]}))}(s);a("b2a2");var o,r=a("f0c5"),d=Object(r["a"])(n["default"],e["b"],e["c"],!1,null,"7557171e",null,!1,e["a"],o);i["default"]=d.exports},"13a1":function(t,i){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAMCAYAAAAtUZ4rAAAA10lEQVRIS92WMQrCQBBF/5igNnoB+7iQQkmj3sEb2FvpabSy9wbeQW1CLBbW9F5AG5XEkYDpNG4RGNhtFpbPY/7MMLOEzwnDsJnnrfkLmBEQFs8M6Aaw9bzHRmv9LLU2txSPiuCCYNAj8ncgHn4NlilhzqZperrYmJHkUZHJLGsff5opHTAlvn8f/auUNI+UihYMrGwyT8DSmHhdpZXmUaCiPQFjG0MMHFITT6q00jzqq+gKoGNjCMDtbOJulVaa554h6Rapu4XdGwrSY7buNeDeYnXt6/MGRAwaes51hd8AAAAASUVORK5CYII="},1952:function(t,i,a){"use strict";a("99af"),a("ac1f"),Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var e={data:function(){return{fid:"",uid:"",token:"",user:{},alias:"",myname:"",sexBG:"",seximg:"",relation:"",addHeight:"10000",animationData:{},animationData1:{},animationData2:{},message:"",isAdd:!1,change:!1}},onReady:function(){this.getElementStyle()},onLoad:function(t){this.fid=t.id,this.getStorages(),this.getUser(),this.judgeFriend()},onBackPress:function(){uni.$emit("refresh",{msg:"页面更新"})},methods:{back:function(){uni.navigateBack()},userDetial:function(){uni.navigateTo({url:"../userDetails/userDetails?id="+this.fid})},toChatRoom:function(){uni.navigateTo({url:"../chatRoom/chatRoom?id=".concat(this.fid,"&name=").concat(this.user.name,"&type=0&imgurl=").concat(this.user.imgurl)})},getStorages:function(){try{var t=uni.getStorageSync("user");t?(this.uid=t.id,this.imgurl=this.serverUrl+t.imgurl,this.token=t.token,this.myname=t.name):uni.redirectTo({url:"../login/login"})}catch(i){}},getUser:function(){var t=this,i="/user/detail",a={id:this.fid,token:this.token};this.request(i,a).then((function(i){i.imgurl=t.serverUrl+i.imgurl,i.explain||(i.explain="这个人很懒，什么都没有留下~~"),t.alias&&(t.alias=i.name),t.sexJudge(i.sex),t.user=i}))},sexJudge:function(t){"asexual"==t?(this.seximg="../../static/images/userhome/asexual.png",this.sexBG="rgba(39,40,50,1)"):"female"==t?(this.seximg="../../static/images/userhome/female.png",this.sexBG="rgba(255,93,91,1)"):(this.seximg="../../static/images/userhome/male.png",this.sexBG="rgba(87,153,255,1)")},judgeFriend:function(){var t=this;if(this.fid==this.uid)this.relation=0;else{var i="/search/isfriend",a={uid:this.uid,fid:this.fid,token:this.token};this.request(i,a).then((function(i){t.relation=1,i.alias,t.alias=i.alias}))}},addFriendBtn:function(){this.message="你好，我是"+this.myname+"，请求添加好友~~",this.addAnimation()},addFriend:function(){var t=this,i="/friend/apply",a={uid:this.uid,fid:this.fid,msg:this.message,token:this.token};this.request(i,a).then((function(i){t.addAnimation(),uni.showToast({title:"好友请求发送成功",icon:"none",duration:2e3})}))},getElementStyle:function(){var t=this,i=uni.createSelectorQuery().in(this);i.select(".bg").boundingClientRect((function(i){t.addHeight=i.height-186})).exec()},addAnimation:function(){this.isAdd=!this.isAdd;var t=uni.createAnimation({duration:500,timingFunction:"ease"}),i=uni.createAnimation({duration:500,timingFunction:"ease"}),a=uni.createAnimation({duration:500,timingFunction:"ease-in"});this.isAdd?(t.bottom(0).step(),i.width(120).height(120).top(20).step(),a.opacity(0).step()):(t.bottom(-this.addHeight).step(),i.width().height().top(0).step(),a.opacity(1).step()),this.animationData=t.export(),this.animationData1=i.export(),this.animationData2=a.export()}}};i.default=e},"4c40":function(t,i,a){var e=a("e1c9");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var n=a("4f06").default;n("759aee22",e,!0,{sourceMap:!1,shadowMode:!1})},6179:function(t,i,a){t.exports=a.p+"static/img/back.faeeaca1.png"},"941e":function(t,i,a){"use strict";a.r(i);var e=a("1952"),n=a.n(e);for(var s in e)"default"!==s&&function(t){a.d(i,t,(function(){return e[t]}))}(s);i["default"]=n.a},b2a2:function(t,i,a){"use strict";var e=a("4c40"),n=a.n(e);n.a},c021:function(t,i,a){"use strict";var e;a.d(i,"b",(function(){return n})),a.d(i,"c",(function(){return s})),a.d(i,"a",(function(){return e}));var n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",[e("v-uni-view",{staticClass:"status_bar"}),e("top-bar",[e("v-uni-image",{staticClass:"back",attrs:{slot:"left",src:a("6179"),mode:""},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.back.apply(void 0,arguments)}},slot:"left"}),0==t.relation||1==t.relation?e("v-uni-image",{staticClass:"more",attrs:{slot:"right",src:a("13a1"),mode:""},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.userDetial.apply(void 0,arguments)}},slot:"right"}):t._e()],1),e("v-uni-view",{staticClass:"bg"},[e("v-uni-image",{attrs:{src:t.user.imgurl,mode:"aspectFill"}})],1),e("v-uni-view",{staticClass:"main"},[e("v-uni-view",{staticClass:"user-header"},[e("v-uni-view",{staticClass:"sex",style:{background:t.sexBG},attrs:{animation:t.animationData2}},[e("v-uni-image",{attrs:{src:t.seximg}})],1),e("v-uni-image",{staticClass:"user-img",attrs:{src:t.user.imgurl,mode:"aspectFill",animation:t.animationData1}})],1),e("v-uni-view",{staticClass:"user-message"},[e("v-uni-view",{staticClass:"name"},[t._v(t._s(t.user.name))]),e("v-uni-view",{staticClass:"nick"},[t._v("备注："+t._s(t.alias))]),e("v-uni-view",{staticClass:"intr"},[t._v(t._s(t.user.explain))])],1)],1),e("v-uni-view",{staticClass:"foot"},[2==t.relation?e("v-uni-view",{staticClass:"button",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.addFriendBtn()}}},[t._v("加为好友")]):t._e(),1==t.relation?e("v-uni-view",{staticClass:"button",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.toChatRoom.apply(void 0,arguments)}}},[t._v("发送消息")]):t._e()],1),e("v-uni-view",{staticClass:"add",style:{height:t.addHeight+"px",bottom:-t.addHeight+"px"},attrs:{animation:t.animationData}},[e("v-uni-view",{staticClass:"name"},[t._v(t._s(t.user.name))]),e("v-uni-textarea",{staticClass:"add-message",attrs:{maxlength:"120"},model:{value:t.message,callback:function(i){t.message=i},expression:"message"}})],1),e("v-uni-view",{staticClass:"add-bt",attrs:{animation:t.animationData}},[e("v-uni-view",{staticClass:"cancel",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.addAnimation()}}},[t._v("取消")]),e("v-uni-view",{staticClass:"send",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.addFriend.apply(void 0,arguments)}}},[t._v("发送")])],1)],1)},s=[]},e1c9:function(t,i,a){var e=a("24fb");i=e(!1),i.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.status_bar[data-v-7557171e]{height:0;width:100%}.back[data-v-7557171e]{padding:%?20?% 0;width:%?48?%;height:%?48?%}.more[data-v-7557171e]{padding:%?38?% 0;width:%?52?%;height:%?12?%}.bg[data-v-7557171e]{position:fixed;top:0;left:0;width:100%;height:100%}.bg uni-image[data-v-7557171e]{opacity:.4;position:absolute;left:%?-10?%;top:%?-10?%;width:110%;height:110%;-webkit-filter:blur(10px);filter:blur(10px)}.main[data-v-7557171e]{padding-top:%?148?%;text-align:center}.main .user-header[data-v-7557171e]{width:%?406?%;height:%?406?%;margin:0 auto;position:relative}.main .user-header .user-img[data-v-7557171e]{z-index:10;width:%?400?%;height:%?400?%;border:%?6?% solid #fff;border-radius:%?48?%;box-shadow:%?0?% %?36?% %?40?% 0 rgba(39,40,50,.1)}.main .user-header .sex[data-v-7557171e]{z-index:11;position:absolute;bottom:%?12?%;right:%?12?%;width:%?64?%;height:%?64?%;border-radius:50%}.main .user-header .sex uni-image[data-v-7557171e]{padding:%?16?%;width:%?32?%;height:%?32?%}.main .user-message[data-v-7557171e]{padding-top:%?42?%;color:#272832}.main .user-message .name[data-v-7557171e]{font-family:PingFangSC-Regular;font-size:%?52?%}.main .user-message .nick[data-v-7557171e]{ont-family:PingFangSC-Regular;font-size:%?28?%}.main .user-message .intr[data-v-7557171e]{margin:0 auto;padding-top:%?20?%;width:%?552?%;height:%?170?%;font-size:%?28?%;font-weight:300;line-height:%?48?%}.foot[data-v-7557171e]{position:fixed;bottom:0;left:0;right:0;width:100%;height:%?104?%;padding:0 %?32?% %?20?%;text-align:center}.foot .button[data-v-7557171e]{width:%?684?%;height:%?80?%;line-height:%?80?%;font-size:%?32?%;color:#272832;background-color:#ffe431;border-radius:%?10?%}.foot .button[data-v-7557171e]:active{background-color:rgba(39,40,50,.2)}.add[data-v-7557171e]{position:fixed;width:100%;box-sizing:border-box;padding:0 %?56?%;background-color:#fff;border-radius:%?40?% %?40?% 0 0;color:#272832}.add .name[data-v-7557171e]{padding:%?168?% 0 %?40?%;line-height:%?74?%;font-size:%?52?%}.add .add-message[data-v-7557171e]{width:100%;box-sizing:border-box;height:%?420?%;border-radius:%?20?%;background-color:#f3f4f6;font-size:%?32?%;padding:%?18?% %?22?%;line-height:%?44?%}.add-bt[data-v-7557171e]{position:fixed;bottom:%?-124?%;width:100%;height:%?104?%;padding:0 %?32?% %?20?%;text-align:center;display:-webkit-box;display:-webkit-flex;display:flex;color:#272832}.add-bt .cancel[data-v-7557171e],\r\n.add-bt .send[data-v-7557171e]{height:%?80?%;line-height:%?80?%;font-size:%?32?%;border-radius:%?10?%}.add-bt .cancel[data-v-7557171e]:active,\r\n.add-bt .send[data-v-7557171e]:active{background-color:rgba(39,40,50,.2)}.add-bt .cancel[data-v-7557171e]{width:%?170?%;background:rgba(39,40,50,.1);margin-right:%?32?%}.add-bt .send[data-v-7557171e]{width:%?480?%;background-color:#ffe431}',""]),t.exports=i}}]);