(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-firendRequest-firendRequest"],{"0b24":function(t,e,n){"use strict";n("a434"),n("d3b7"),n("25f0"),n("4d90"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={onLoad:function(){this.getStorages(),this.friendRequest()},filters:{timeChange:function(t){var e=new Date(t),n=e.getFullYear().toString().padStart(2,0),i=(e.getMonth()+1).toString().padStart(2,0),a=e.getDate().toString().padStart(2,0);return n+"-"+i+"-"+a}},data:function(){return{uid:"",token:"",myname:"",friends:[]}},methods:{back:function(){uni.navigateBack({})},changeDate:function(t){function e(e){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}((function(t){return changeDate.changeDate(t)})),getStorages:function(){try{var t=uni.getStorageSync("user");t?(this.uid=t.id,this.token=t.token,this.myname=t.name):uni.redirectTo({url:"../login/login"})}catch(e){}},friendRequest:function(){var t=this,e="/index/getmsg",n={uid:this.uid,token:this.token,state:1};this.request(e,n).then((function(e){for(var n in e)e[n].imgurl=t.serverUrl+e[n].imgurl;t.friends=e}))},reject:function(t){var e=this,n="/friend/delete",i={uid:this.uid,fid:t,token:this.token};this.request(n,i).then((function(n){for(var i in e.friends)e.friends[i].id==t&&e.friends.splice(i,1);uni.showToast({title:"删除好友成功",icon:"none",duration:2e3})}))},aggree:function(t){var e=this,n="/friend/update",i={uid:this.uid,fid:t,token:this.token};this.request(n,i).then((function(n){for(var i in e.friends)e.friends[i].id==t&&e.friends.splice(i,1);uni.redirectTo({url:"../index/index"}),uni.showToast({title:"添加好友成功",icon:"none",duration:2e3})}))}}};e.default=i},"0ccb":function(t,e,n){var i=n("50c4"),a=n("1148"),r=n("1d80"),o=Math.ceil,s=function(t){return function(e,n,s){var c,u,d=String(r(e)),l=d.length,f=void 0===s?" ":String(s),b=i(n);return b<=l||""==f?d:(c=b-l,u=a.call(f,o(c/f.length)),u.length>c&&(u=u.slice(0,c)),t?d+u:u+d)}};t.exports={start:s(!1),end:s(!0)}},"225e":function(t,e,n){"use strict";n.r(e);var i=n("0b24"),a=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=a.a},"2e98":function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return i}));var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("v-uni-view",{staticClass:"status_bar"}),i("top-bar",{staticClass:"top-bar"},[i("v-uni-image",{staticClass:"back",attrs:{slot:"left",src:n("6179")},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.back.apply(void 0,arguments)}},slot:"left"}),i("v-uni-view",{staticClass:"title",attrs:{slot:"center"},slot:"center"},[t._v("好友请求")]),i("v-uni-view",{staticClass:"confirm",attrs:{slot:"right"},slot:"right"})],1),i("v-uni-view",{staticClass:"main"},t._l(t.friends,(function(e,n){return i("v-uni-view",{key:n,staticClass:"request"},[i("v-uni-view",{staticClass:"request-top"},[i("v-uni-view",{staticClass:"reject btn",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.reject(e.id)}}},[t._v("拒绝")]),i("v-uni-view",{staticClass:"head-img"},[i("v-uni-image",{attrs:{src:e.imgurl}})],1),i("v-uni-view",{staticClass:"aggree btn",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.aggree(e.id)}}},[t._v("同意")])],1),i("v-uni-view",{staticClass:"request-name"},[i("v-uni-view",{staticClass:"title"},[t._v(t._s(e.name))]),i("v-uni-view",{staticClass:"time"},[t._v(t._s(t._f("timeChange")(e.lastTime)))])],1),i("v-uni-view",{staticClass:"notic"},[t._v(t._s(e.message))])],1)})),1)],1)},r=[]},"4d90":function(t,e,n){"use strict";var i=n("23e7"),a=n("0ccb").start,r=n("9a0c");i({target:"String",proto:!0,forced:r},{padStart:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}})},6179:function(t,e,n){t.exports=n.p+"static/img/back.faeeaca1.png"},"6d78":function(t,e,n){var i=n("c540");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("f9f0b0d0",i,!0,{sourceMap:!1,shadowMode:!1})},"7e7b":function(t,e,n){"use strict";var i=n("6d78"),a=n.n(i);a.a},"82d9":function(t,e,n){"use strict";n.r(e);var i=n("2e98"),a=n("225e");for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);n("7e7b");var o,s=n("f0c5"),c=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,"15b03608",null,!1,i["a"],o);e["default"]=c.exports},"9a0c":function(t,e,n){var i=n("342f");t.exports=/Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(i)},c540:function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.status_bar[data-v-15b03608]{height:0;width:100%;background-color:hsla(0,0%,95.7%,.96)}.top-bar[data-v-15b03608]{background-color:hsla(0,0%,95.7%,.96);border-bottom:1px solid rgba(39,40,50,.1)}.top-bar .back[data-v-15b03608]{float:left;padding:%?20?% 0;width:%?48?%;height:%?48?%}.top-bar .title[data-v-15b03608]{color:#272832;font-size:%?40?%;padding:%?16?% 0}.top-bar .cancel[data-v-15b03608],\r\n.top-bar .confirm[data-v-15b03608]{font-size:%?32?%}.top-bar .confirm[data-v-15b03608]{width:%?64?%}.main[data-v-15b03608]{padding:%?88?% %?32?% 0}.main .request[data-v-15b03608]{margin:%?132?% 0 %?20?%;padding:0 %?32?% %?20?%;background-color:#fff;box-shadow:0 %?24?% %?64?% %?-8?% rgba(0,0,0,.1);border-radius:%?20?%}.main .request-top[data-v-15b03608]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.main .request-top .btn[data-v-15b03608]{-webkit-box-flex:0;-webkit-flex:none;flex:none;width:%?160?%;height:%?64?%;background-color:rgba(255,93,91,.1);border-radius:%?40?%;text-align:center;font-size:%?32?%;line-height:%?64?%}.main .request-top .btn[data-v-15b03608]:active{background-color:rgba(39,40,50,.2)}.main .request-top .reject[data-v-15b03608]{color:#ff5d5b}.main .request-top .aggree[data-v-15b03608]{background-color:#ffe431}.main .request-top .head-img[data-v-15b03608]{margin-top:%?-104?%;-webkit-box-flex:1;-webkit-flex:auto;flex:auto;text-align:center}.main .request-top .head-img uni-image[data-v-15b03608]{width:%?144?%;height:%?144?%;border-radius:50%}.main .request-name[data-v-15b03608]{text-align:center;padding:%?20?% 0 %?40?%}.main .request-name .title[data-v-15b03608]{font-size:%?36?%;font-weight:600;color:#272832;line-height:%?50?%}.main .request-name .time[data-v-15b03608]{font-size:%?24?%;color:rgba(39,40,50,.6);line-height:%?34?%}.main .notic[data-v-15b03608]{font-size:%?28?%;color:#272832;line-height:%?40?%;padding:%?20?% %?32?%;border-radius:%?20?%;background-color:#f3f4f6}',""]),t.exports=e}}]);