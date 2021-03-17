(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/chatRoom/chatRoom"],{

/***/ 81:
/*!****************************************************************************************!*\
  !*** C:/Users/86184/Desktop/毕业设计/Xchat/main.js?{"page":"pages%2FchatRoom%2FchatRoom"} ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _chatRoom = _interopRequireDefault(__webpack_require__(/*! ./pages/chatRoom/chatRoom.vue */ 82));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_chatRoom.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 82:
/*!*********************************************************************!*\
  !*** C:/Users/86184/Desktop/毕业设计/Xchat/pages/chatRoom/chatRoom.vue ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _chatRoom_vue_vue_type_template_id_35e753e6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chatRoom.vue?vue&type=template&id=35e753e6& */ 83);
/* harmony import */ var _chatRoom_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chatRoom.vue?vue&type=script&lang=js& */ 85);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _chatRoom_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _chatRoom_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _chatRoom_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chatRoom.vue?vue&type=style&index=0&lang=scss& */ 87);
/* harmony import */ var _D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 10);

var renderjs





/* normalize component */

var component = Object(_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _chatRoom_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _chatRoom_vue_vue_type_template_id_35e753e6___WEBPACK_IMPORTED_MODULE_0__["render"],
  _chatRoom_vue_vue_type_template_id_35e753e6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _chatRoom_vue_vue_type_template_id_35e753e6___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/chatRoom/chatRoom.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 83:
/*!****************************************************************************************************!*\
  !*** C:/Users/86184/Desktop/毕业设计/Xchat/pages/chatRoom/chatRoom.vue?vue&type=template&id=35e753e6& ***!
  \****************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chatRoom_vue_vue_type_template_id_35e753e6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./chatRoom.vue?vue&type=template&id=35e753e6& */ 84);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chatRoom_vue_vue_type_template_id_35e753e6___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chatRoom_vue_vue_type_template_id_35e753e6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chatRoom_vue_vue_type_template_id_35e753e6___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chatRoom_vue_vue_type_template_id_35e753e6___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 84:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/86184/Desktop/毕业设计/Xchat/pages/chatRoom/chatRoom.vue?vue&type=template&id=35e753e6& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
try {
  components = {
    chatRoom: function() {
      return __webpack_require__.e(/*! import() | components/chat-room/chat-room */ "components/chat-room/chat-room").then(__webpack_require__.bind(null, /*! @/components/chat-room/chat-room.vue */ 165))
    }
  }
} catch (e) {
  if (
    e.message.indexOf("Cannot find module") !== -1 &&
    e.message.indexOf(".vue") !== -1
  ) {
    console.error(e.message)
    console.error("1. 排查组件名称拼写是否正确")
    console.error(
      "2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"
    )
    console.error(
      "3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件"
    )
  } else {
    throw e
  }
}
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 85:
/*!**********************************************************************************************!*\
  !*** C:/Users/86184/Desktop/毕业设计/Xchat/pages/chatRoom/chatRoom.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_App_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chatRoom_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./chatRoom.vue?vue&type=script&lang=js& */ 86);
/* harmony import */ var _D_App_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chatRoom_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_App_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chatRoom_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_App_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chatRoom_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_App_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chatRoom_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_App_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chatRoom_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 86:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/86184/Desktop/毕业设计/Xchat/pages/chatRoom/chatRoom.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _createForOfIteratorHelper(o, allowArrayLike) {var it;if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = o[Symbol.iterator]();}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}var send = function send() {Promise.all(/*! require.ensure | components/chatSend/chet-send */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/chatSend/chet-send")]).then((function () {return resolve(__webpack_require__(/*! ../../components/chatSend/chet-send.vue */ 172));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var chatRoom = function chatRoom() {__webpack_require__.e(/*! require.ensure | components/chat-room/chat-room */ "components/chat-room/chat-room").then((function () {return resolve(__webpack_require__(/*! ../../components/chat-room/chat-room.vue */ 165));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var _default =























{
  components: {
    send: send,
    chatRoom: chatRoom },

  onLoad: function onLoad(e) {
    this.fid = e.id;
    this.fname = e.name;
    this.type = e.type;
    this.fimgurl = e.imgurl;
    this.getStorages();
    this.getMsg();
    this.scoketMsg();
    this.scoketGroupMsg();
  },
  onPullDownRefresh: function onPullDownRefresh() {
    setTimeout(function () {
      uni.stopPullDownRefresh();
    }, 300);
  },
  mounted: function mounted() {var _this = this;
    var view = uni.
    createSelectorQuery().
    in(this).
    select('.send');
    view.
    fields(
    {
      size: true },

    function (data) {
      console.log(data.height);
      _this.sendHeight = data.height - 129;
    }).

    exec();













  },
  onBackPress: function onBackPress() {
    this.$refs.chatRoom.palyStop(); //暂停语音播放
    uni.$emit('refresh', { msg: '页面更新' });
    //把后端的消息表状态改为已读
    var pages = getCurrentPages();
    var url = '';
    if (this.type == 0) {
      url = '/index/updatemsg';
    } else {
      url = '/index/updategroupmsg';
    }
    var data = {
      uid: this.uid,
      fid: this.fid,
      token: this.token };

    this.request(url, data);
    // }
  },
  data: function data() {
    return {
      uid: '',
      imgurl: '',
      token: '',
      myname: '',
      fid: '',
      fname: '', //好友的名字
      fimgurl: '', //好友头像地址
      type: '', //0是私聊，1是群聊
      msgs: [], //聊天信息数组
      imgs: [], //图片数组
      scrollToView: '', //某子元素id（id不能以数字开头）。设置哪个方向可滚动，则在哪个方向滚动到该元素
      sendHeight: 0, //输入栏的高度，聊天页面距离底部的距离
      nowPage: 0,
      pageSize: 13,
      isLoading: false };

  },
  methods: {
    //获取缓存数据
    getStorages: function getStorages() {
      try {
        var value = uni.getStorageSync('user');
        if (value) {
          this.uid = value.id;
          this.imgurl = this.serverUrl + value.imgurl;
          this.token = value.token;
          this.myname = value.name;
        } else {
          //如果没有用户缓存，跳转到登录页面
          uni.redirectTo({
            url: '../login/login' });

        }
      } catch (e) {
        // error
      }
    },

    back: function back() {
      var routes = getCurrentPages();
      routes.length == 1 ?
      uni.navigateTo({
        url: '../index/index' }) :

      uni.navigateBack();
    },

    //获取聊天数据
    getMsg: function getMsg() {var _this2 = this;
      var url = '';
      var data = {};
      if (this.type == 0) {
        //是私聊
        url = '/chat/msg';
        data = {
          uid: this.uid,
          fid: this.fid,
          nowPage: this.nowPage,
          pageSize: this.pageSize,
          token: this.token };

      } else if (this.type == 1) {
        // 是群聊
        url = '/chat/groupMsg';
        data = {
          gid: this.fid,
          nowPage: this.nowPage,
          pageSize: this.pageSize,
          token: this.token };

      }
      console.log(url);
      this.request(url, data).then(function (res) {
        if (res.length > 0) {
          for (var i in res) {
            res[i].imgurl = _this2.serverUrl + res[i].imgurl;
            //图片处理
            if (res[i].type == 1) {
              res[i].message = _this2.serverUrl + res[i].message;
              _this2.imgs.unshift(res[i].message);
            }
            //定位，语音处理
            if (res[i].type == 2 || res[i].type == 3) {
              res[i].message = JSON.parse(res[i].message);
            }
            _this2.msgs.unshift(res[i]);
          }
          //时间间隔处理,超过五分钟显示时间
          var time = 0;var _iterator = _createForOfIteratorHelper(
          _this2.msgs),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var item = _step.value;
              if (new Date(item.time).getTime() > time + 1000 * 60 * 5) {
                time = new Date(item.time).getTime();
              } else {
                item.time = '';
              }
            }} catch (err) {_iterator.e(err);} finally {_iterator.f();}
          if (_this2.nowPage == 0) {
            _this2.$nextTick(function () {
              setTimeout(function () {
                _this2.scrollToView = 'msg' + _this2.msgs[i].id;
              }, 300);
            });
          } else {
            _this2.$nextTick(function () {
              _this2.scrollToView = 'msg' + res[0].id;
            });
          }
        }
        //判断nowPage
        if (res.length == _this2.pageSize) {
          _this2.nowPage++;
        } else {
          _this2.nowPage = -1;
        }
        if (_this2.isLoading) {
          uni.stopPullDownRefresh();
        }
      });
    },

    // 滑动到顶部时
    scrolltoupper: function scrolltoupper() {var _this3 = this;
      if (this.nowPage != -1) {
        uni.startPullDownRefresh({
          success: function success() {
            _this3.isLoading = true;
            _this3.getMsg();
          } });

      }
    },

    //获取子组件输入框传来的值,发送给后端并插入数组中
    sendMsg: function sendMsg(e) {
      console.log(e.message.length);
      this.sendBack(e);
      this.receiveMsg(e, this.uid, this.imgurl, 0);
    },

    //输入框的东西发送给后端
    sendBack: function sendBack(e) {var _this4 = this;
      //文字,定位发送给后端
      if (e.type == 0 || e.type == 3) {
        this.sendSocket(e);
      }
      // 图片发送给后端
      if (e.type == 1) {
        //图片存进显示的数组
        this.imgs.push(e.message);
        // 后端存储文件夹名称为年月日
        var url = this.fileName(new Date());
        uni.uploadFile({
          url: this.serverUrl + '/files/upload',
          filePath: e.message,
          name: 'file',
          formData: {
            url: url,
            name: new Date().getTime() + this.uid + Math.floor(Math.random() * 10 + 1) },

          success: function success(uploadFileRes) {
            var data = {
              message: uploadFileRes.data,
              type: 1 };

            _this4.sendSocket(data);
          },
          fail: function fail(Error) {
            console.log(Error);
          } });

      }

      //语音发给后端
      if (e.type == 2) {
        console.log(e);
        // url是存储文件夹名称为年月日
        var _url = this.fileName(new Date());
        uni.uploadFile({
          url: this.serverUrl + '/files/upload',
          filePath: e.message.record,
          name: 'file',
          formData: {
            url: _url,
            name: new Date().getTime() + this.uid },

          success: function success(uploadFileRes) {
            var recordMsg = {
              record: uploadFileRes.data,
              time: e.message.time };

            recordMsg = JSON.stringify(recordMsg);
            var data = {
              message: recordMsg,
              type: e.type };

            _this4.sendSocket(data);
          } });

      }
    },

    //语音文件夹上传时间
    fileName: function fileName(e) {
      var old = new Date(e);

      //获取oldDate的具体时间
      var hour = old.getHours();
      var minute = old.getMinutes();
      var year = old.getFullYear();
      var month = (old.getMonth() + 1).toString().padStart(2, 0); //获取的比实际要小，所以要加一
      var day = old.
      getDate().
      toString().
      padStart(2, 0);
      return year + month + day;
    },

    //接收输入框的信息显示
    receiveMsg: function receiveMsg(e, id, imgurl, tip) {
      //tip=0表示自己发的，tip=1表示收到的
      //显示到主页面
      if (e.type == 3) {
        e.message = JSON.parse(e.message);
      }
      var leng = this.msgs.length;
      var data = {
        fromID: id,
        imgurl: imgurl,
        message: e.message,
        type: e.type,
        time: new Date(),
        id: leng };

      //时间间隔显示处理
      if (this.msgs.length > 0) {
        for (var i = 1; i < leng; i++) {
          if (this.msgs[leng - i].time) {
            break;
          }
        }
        var time = this.msgs[leng - i].time;
        if (data.time > time + 1000 * 60 * 5) {
          time = data.time;
        } else {
          data.time = '';
        }
      }
      this.msgs.push(data);
    },

    //接收私聊socket发来的数据
    scoketMsg: function scoketMsg() {var _this5 = this;
      this.socket.on('msg', function (msg, uid, tip) {
        if (uid == _this5.fid && tip == 0) {
          var leng = _this5.msgs.length;
          if (msg.type == 1) {
            msg.message = _this5.serverUrl + msg.message;
          } else if (msg.type == 2) {
            msg.message = JSON.parse(msg.message);
            console.log(msg.message);
            msg.message.record = _this5.serverUrl + msg.message.record;
          } else if (msg.type == 3) {
            msg.message = JSON.parse(msg.message);
          }

          var data = {
            fromID: uid,
            imgurl: _this5.fimgurl,
            message: msg.message,
            type: msg.type,
            time: new Date(),
            id: leng };

          //时间间隔显示处理
          for (var i = 1; i < leng; i++) {
            if (_this5.msgs[leng - i].time) {
              break;
            }
          }
          var time = _this5.msgs[leng - i].time;
          if (data.time > time + 1000 * 60 * 5) {
            time = data.time;
          } else {
            data.time = '';
          }
          //图片存进显示的数组
          if (msg.type == 1) {
            _this5.imgs.push(msg.message);
            console.log(_this5.imgs);
          }
          _this5.msgs.push(data);
          _this5.$nextTick(function () {
            this.scrollToView = 'msg' + this.msgs[leng].id;
          });
        }
      });
    },

    //接受群的socket信息
    scoketGroupMsg: function scoketGroupMsg() {var _this6 = this;
      this.socket.on('groupMsg', function (msg, fromid, gid, fromName, fromImg) {
        var leng = _this6.msgs.length;
        if (msg.type == 1) {
          msg.message = _this6.serverUrl + msg.message;
        } else if (msg.type == 2) {
          msg.message = JSON.parse(msg.message);
          msg.message.record = _this6.serverUrl + msg.message.record;
        } else if (msg.type == 3) {



        }

        var data = {
          fromID: fromid,
          imgurl: fromImg,
          message: msg.message,
          type: msg.type,
          time: new Date(),
          id: leng };

        //时间间隔显示处理
        for (var i = 1; i < leng; i++) {
          if (_this6.msgs[leng - i].time) {
            break;
          }
        }
        var time = _this6.msgs[leng - i].time;
        if (data.time > time + 1000 * 60 * 5) {
          time = data.time;
        } else {
          data.time = '';
        }
        //图片存进显示的数组
        if (msg.type == 1) {
          _this6.imgs.push(msg.message);
          console.log(_this6.imgs);
        }
        _this6.msgs.push(data);
        _this6.$nextTick(function () {
          this.scrollToView = 'msg' + this.msgs[leng].id;
        });
      });
    },

    //聊天数据发送到后端
    sendSocket: function sendSocket(e) {
      if (this.type == 0) {
        //私聊
        this.socket.emit('msg', e, this.uid, this.fid);
      } else {
        //群聊
        this.socket.emit('groupMsg', e, this.uid, this.fid, this.myname, this.imgurl);
      }
    },

    //输入框弹起的高度,传过来的是弹出的高度值
    heights: function heights(e) {
      //如果消息数组大于10才更新高度
      if (this.msgs.length > 6) {
        this.sendHeight = e;
      }
      this.scrollToView = '';
      this.$nextTick(function () {
        var leng = this.msgs.length - 1;
        this.scrollToView = 'msg' + this.msgs[leng].id;
      });
    },

    //获取设备的高度
    getElementStyle: function getElementStyle() {var _this7 = this;
      var query = uni.createSelectorQuery().in(this);
      query.
      select('.send').
      boundingClientRect(function (data) {
        console.log(data);
        _this7.sendHeight = data.height;
      }).
      exec();
    },

    //跳转到群聊管理页面
    goGroupHome: function goGroupHome() {
      this.$refs.send.cancel();
      // setTimeout(() => {
      // 	this.getElementStyle()
      // },300)
      uni.navigateTo({
        url: '../groupHome/groupHome?gid=' + this.fid });

    },

    goUserHome: function goUserHome(fid) {var _this8 = this;
      this.$refs.send.cancel();
      setTimeout(function () {
        _this8.getElementStyle();
      }, 300);
      uni.navigateTo({
        url: '../userHome/userHome?id=' + fid });

    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 87:
/*!*******************************************************************************************************!*\
  !*** C:/Users/86184/Desktop/毕业设计/Xchat/pages/chatRoom/chatRoom.vue?vue&type=style&index=0&lang=scss& ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_App_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_App_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_App_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_App_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chatRoom_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./chatRoom.vue?vue&type=style&index=0&lang=scss& */ 88);
/* harmony import */ var _D_App_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_App_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_App_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_App_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chatRoom_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_App_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_App_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_App_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_App_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chatRoom_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_App_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_App_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_App_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_App_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chatRoom_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_App_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_App_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_App_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_App_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chatRoom_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_App_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_App_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_App_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_App_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_App_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chatRoom_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 88:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/86184/Desktop/毕业设计/Xchat/pages/chatRoom/chatRoom.vue?vue&type=style&index=0&lang=scss& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[81,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/chatRoom/chatRoom.js.map