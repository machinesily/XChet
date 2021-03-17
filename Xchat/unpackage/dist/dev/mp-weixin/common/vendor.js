(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"Xchat","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      appOptions.onShow.apply(app, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      appOptions.onHide.apply(app, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(app, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 11:
/*!******************************************************************************!*\
  !*** C:/Users/86184/Desktop/毕业设计/Xchat/components/socket/weapp.socket.io.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _createSuper(Derived) {var hasNativeReflectConstruct = _isNativeReflectConstruct();return function _createSuperInternal() {var Super = _getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}!function (t, e) {
  if (true) module.exports = e();else
  { var n, r; }
}(window, function () {
  return function (t) {
    var e = {};

    function r(n) {
      if (e[n]) return e[n].exports;
      var o = e[n] = {
        i: n,
        l: !1,
        exports: {} };

      return t[n].call(o.exports, o, o.exports, r), o.l = !0, o.exports;
    }
    return r.m = t, r.c = e, r.d = function (t, e, n) {
      r.o(t, e) || Object.defineProperty(t, e, {
        enumerable: !0,
        get: n });

    }, r.r = function (t) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
        value: "Module" }),
      Object.defineProperty(t, "__esModule", {
        value: !0 });

    }, r.t = function (t, e) {
      if (1 & e && (t = r(t)), 8 & e) return t;
      if (4 & e && "object" == typeof t && t && t.__esModule) return t;
      var n = Object.create(null);
      if (r.r(n), Object.defineProperty(n, "default", {
        enumerable: !0,
        value: t }),
      2 & e && "string" != typeof t)
      for (var o in t) {r.d(n, o, function (e) {
          return t[e];
        }.bind(null, o));}
      return n;
    }, r.n = function (t) {
      var e = t && t.__esModule ? function () {
        return t.default;
      } : function () {
        return t;
      };
      return r.d(e, "a", e), e;
    }, r.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }, r.p = "", r(r.s = 18);
  }([function (t, e) {
    t.exports = function () {
      return function () {};
    };
  }, function (t, e, r) {
    function n(t) {
      if (t) return function (t) {
        for (var e in n.prototype) {t[e] = n.prototype[e];}
        return t;
      }(t);
    }
    t.exports = n, n.prototype.on = n.prototype.addEventListener = function (t, e) {
      return this._callbacks = this._callbacks || {}, (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(
      e), this;
    }, n.prototype.once = function (t, e) {
      function r() {
        this.off(t, r), e.apply(this, arguments);
      }
      return r.fn = e, this.on(t, r), this;
    }, n.prototype.off = n.prototype.removeListener = n.prototype.removeAllListeners = n.prototype.removeEventListener =
    function (t, e) {
      if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
      var r,n = this._callbacks["$" + t];
      if (!n) return this;
      if (1 == arguments.length) return delete this._callbacks["$" + t], this;
      for (var o = 0; o < n.length; o++) {
        if ((r = n[o]) === e || r.fn === e) {
          n.splice(o, 1);
          break;
        }}return this;
    }, n.prototype.emit = function (t) {
      this._callbacks = this._callbacks || {};
      var e = [].slice.call(arguments, 1),
      r = this._callbacks["$" + t];
      if (r)
      for (var n = 0, o = (r = r.slice(0)).length; n < o; ++n) {r[n].apply(this, e);}
      return this;
    }, n.prototype.listeners = function (t) {
      return this._callbacks = this._callbacks || {}, this._callbacks["$" + t] || [];
    }, n.prototype.hasListeners = function (t) {
      return !!this.listeners(t).length;
    };
  }, function (t, e, r) {
    var n,o = r(28),
    i = r(13),
    s = r(30),
    a = r(31),
    c = r(32);
    "undefined" != typeof ArrayBuffer && (n = r(33));
    var h = "undefined" != typeof navigator && /Android/i.test(navigator.userAgent),
    u = "undefined" != typeof navigator && /PhantomJS/i.test(navigator.userAgent),
    f = h || u;
    e.protocol = 3;
    var p = e.packets = {
      open: 0,
      close: 1,
      ping: 2,
      pong: 3,
      message: 4,
      upgrade: 5,
      noop: 6 },

    l = o(p),
    d = {
      type: "error",
      data: "parser error" },

    y = r(34);

    function g(t, e, r) {
      for (var n = new Array(t.length), o = a(t.length, r), i = function i(t, r, o) {
        e(r, function (e, r) {
          n[t] = r, o(e, n);
        });
      }, s = 0; s < t.length; s++) {i(s, t[s], o);}
    }
    e.encodePacket = function (t, r, n, o) {
      "function" == typeof r && (o = r, r = !1), "function" == typeof n && (o = n, n = null);
      var i = void 0 === t.data ? void 0 : t.data.buffer || t.data;
      if ("undefined" != typeof ArrayBuffer && i instanceof ArrayBuffer) return function (t, r, n) {
        if (!r) return e.encodeBase64Packet(t, n);
        var o = t.data,
        i = new Uint8Array(o),
        s = new Uint8Array(1 + o.byteLength);
        s[0] = p[t.type];
        for (var a = 0; a < i.length; a++) {s[a + 1] = i[a];}
        return n(s.buffer);
      }(t, r, o);
      if (void 0 !== y && i instanceof y) return function (t, r, n) {
        if (!r) return e.encodeBase64Packet(t, n);
        if (f) return function (t, r, n) {
          if (!r) return e.encodeBase64Packet(t, n);
          var o = new FileReader();
          return o.onload = function () {
            e.encodePacket({
              type: t.type,
              data: o.result },
            r, !0, n);
          }, o.readAsArrayBuffer(t.data);
        }(t, r, n);
        var o = new Uint8Array(1);
        o[0] = p[t.type];
        var i = new y([o.buffer, t.data]);
        return n(i);
      }(t, r, o);
      if (i && i.base64) return function (t, r) {
        var n = "b" + e.packets[t.type] + t.data.data;
        return r(n);
      }(t, o);
      var s = p[t.type];
      return void 0 !== t.data && (s += n ? c.encode(String(t.data), {
        strict: !1 }) :
      String(t.data)), o("" + s);
    }, e.encodeBase64Packet = function (t, r) {
      var n,o = "b" + e.packets[t.type];
      if (void 0 !== y && t.data instanceof y) {
        var i = new FileReader();
        return i.onload = function () {
          var t = i.result.split(",")[1];
          r(o + t);
        }, i.readAsDataURL(t.data);
      }
      try {
        n = String.fromCharCode.apply(null, new Uint8Array(t.data));
      } catch (e) {
        for (var s = new Uint8Array(t.data), a = new Array(s.length), c = 0; c < s.length; c++) {a[c] = s[c];}
        n = String.fromCharCode.apply(null, a);
      }
      return o += btoa(n), r(o);
    }, e.decodePacket = function (t, r, n) {
      if (void 0 === t) return d;
      if ("string" == typeof t) {
        if ("b" === t.charAt(0)) return e.decodeBase64Packet(t.substr(1), r);
        if (n && !1 === (t = function (t) {
          try {
            t = c.decode(t, {
              strict: !1 });

          } catch (t) {
            return !1;
          }
          return t;
        }(t))) return d;
        var o = t.charAt(0);
        return Number(o) == o && l[o] ? t.length > 1 ? {
          type: l[o],
          data: t.substring(1) } :
        {
          type: l[o] } :
        d;
      }
      o = new Uint8Array(t)[0];
      var i = s(t, 1);
      return y && "blob" === r && (i = new y([i])), {
        type: l[o],
        data: i };

    }, e.decodeBase64Packet = function (t, e) {
      var r = l[t.charAt(0)];
      if (!n) return {
        type: r,
        data: {
          base64: !0,
          data: t.substr(1) } };


      var o = n.decode(t.substr(1));
      return "blob" === e && y && (o = new y([o])), {
        type: r,
        data: o };

    }, e.encodePayload = function (t, r, n) {
      "function" == typeof r && (n = r, r = null);
      var o = i(t);
      if (r && o) return y && !f ? e.encodePayloadAsBlob(t, n) : e.encodePayloadAsArrayBuffer(t, n);
      if (!t.length) return n("0:");
      g(t, function (t, n) {
        e.encodePacket(t, !!o && r, !1, function (t) {
          n(null, function (t) {
            return t.length + ":" + t;
          }(t));
        });
      }, function (t, e) {
        return n(e.join(""));
      });
    }, e.decodePayload = function (t, r, n) {
      if ("string" != typeof t) return e.decodePayloadAsBinary(t, r, n);
      var o;
      if ("function" == typeof r && (n = r, r = null), "" === t) return n(d, 0, 1);
      for (var i, s, a = "", c = 0, h = t.length; c < h; c++) {
        var u = t.charAt(c);
        if (":" === u) {
          if ("" === a || a != (i = Number(a))) return n(d, 0, 1);
          if (a != (s = t.substr(c + 1, i)).length) return n(d, 0, 1);
          if (s.length) {
            if (o = e.decodePacket(s, r, !1), d.type === o.type && d.data === o.data) return n(d, 0, 1);
            if (!1 === n(o, c + i, h)) return;
          }
          c += i, a = "";
        } else a += u;
      }
      return "" !== a ? n(d, 0, 1) : void 0;
    }, e.encodePayloadAsArrayBuffer = function (t, r) {
      if (!t.length) return r(new ArrayBuffer(0));
      g(t, function (t, r) {
        e.encodePacket(t, !0, !0, function (t) {
          return r(null, t);
        });
      }, function (t, e) {
        var n = e.reduce(function (t, e) {
          var r;
          return t + (r = "string" == typeof e ? e.length : e.byteLength).toString().length + r + 2;
        }, 0),
        o = new Uint8Array(n),
        i = 0;
        return e.forEach(function (t) {
          var e = "string" == typeof t,
          r = t;
          if (e) {
            for (var n = new Uint8Array(t.length), s = 0; s < t.length; s++) {n[s] = t.charCodeAt(s);}
            r = n.buffer;
          }
          o[i++] = e ? 0 : 1;
          var a = r.byteLength.toString();
          for (s = 0; s < a.length; s++) {o[i++] = parseInt(a[s]);}
          o[i++] = 255;
          for (n = new Uint8Array(r), s = 0; s < n.length; s++) {o[i++] = n[s];}
        }), r(o.buffer);
      });
    }, e.encodePayloadAsBlob = function (t, r) {
      g(t, function (t, r) {
        e.encodePacket(t, !0, !0, function (t) {
          var e = new Uint8Array(1);
          if (e[0] = 1, "string" == typeof t) {
            for (var n = new Uint8Array(t.length), o = 0; o < t.length; o++) {n[o] = t.charCodeAt(o);}
            t = n.buffer, e[0] = 0;
          }
          var i = (t instanceof ArrayBuffer ? t.byteLength : t.size).toString(),
          s = new Uint8Array(i.length + 1);
          for (o = 0; o < i.length; o++) {s[o] = parseInt(i[o]);}
          if (s[i.length] = 255, y) {
            var a = new y([e.buffer, s.buffer, t]);
            r(null, a);
          }
        });
      }, function (t, e) {
        return r(new y(e));
      });
    }, e.decodePayloadAsBinary = function (t, r, n) {
      "function" == typeof r && (n = r, r = null);
      for (var o = t, i = []; o.byteLength > 0;) {
        for (var a = new Uint8Array(o), c = 0 === a[0], h = "", u = 1; 255 !== a[u]; u++) {
          if (h.length > 310) return n(d, 0, 1);
          h += a[u];
        }
        o = s(o, 2 + h.length), h = parseInt(h);
        var f = s(o, 0, h);
        if (c) try {
          f = String.fromCharCode.apply(null, new Uint8Array(f));
        } catch (t) {
          var p = new Uint8Array(f);
          f = "";
          for (u = 0; u < p.length; u++) {f += String.fromCharCode(p[u]);}
        }
        i.push(f), o = s(o, h);
      }
      var l = i.length;
      i.forEach(function (t, o) {
        n(e.decodePacket(t, r, !0), o, l);
      });
    };
  }, function (t, e, r) {
    var n = r(0)("socket.io-parser"),
    o = r(1),
    i = r(21),
    s = r(7),
    a = r(8);

    function c() {}
    e.protocol = 4, e.types = ["CONNECT", "DISCONNECT", "EVENT", "ACK", "ERROR", "BINARY_EVENT", "BINARY_ACK"], e.CONNECT =
    0, e.DISCONNECT = 1, e.EVENT = 2, e.ACK = 3, e.ERROR = 4, e.BINARY_EVENT = 5, e.BINARY_ACK = 6, e.Encoder = c,
    e.Decoder = f;
    var h = e.ERROR + '"encode error"';

    function u(t) {
      var r = "" + t.type;
      if (e.BINARY_EVENT !== t.type && e.BINARY_ACK !== t.type || (r += t.attachments + "-"), t.nsp && "/" !== t.nsp && (
      r += t.nsp + ","), null != t.id && (r += t.id), null != t.data) {
        var o = function (t) {
          try {
            return JSON.stringify(t);
          } catch (t) {
            return !1;
          }
        }(t.data);
        if (!1 === o) return h;
        r += o;
      }
      return n("encoded %j as %s", t, r), r;
    }

    function f() {
      this.reconstructor = null;
    }

    function p(t) {
      this.reconPack = t, this.buffers = [];
    }

    function l(t) {
      return {
        type: e.ERROR,
        data: "parser error: " + t };

    }
    c.prototype.encode = function (t, r) {
      (n("encoding packet %j", t), e.BINARY_EVENT === t.type || e.BINARY_ACK === t.type) ? function (t, e) {
        i.removeBlobs(t, function (t) {
          var r = i.deconstructPacket(t),
          n = u(r.packet),
          o = r.buffers;
          o.unshift(n), e(o);
        });
      }(t, r) : r([u(t)]);
    }, o(f.prototype), f.prototype.add = function (t) {
      var r;
      if ("string" == typeof t) r = function (t) {
        var r = 0,
        o = {
          type: Number(t.charAt(0)) };

        if (null == e.types[o.type]) return l("unknown packet type " + o.type);
        if (e.BINARY_EVENT === o.type || e.BINARY_ACK === o.type) {
          for (var i = "";
          "-" !== t.charAt(++r) && (i += t.charAt(r), r != t.length);) {;}
          if (i != Number(i) || "-" !== t.charAt(r)) throw new Error("Illegal attachments");
          o.attachments = Number(i);
        }
        if ("/" === t.charAt(r + 1))
        for (o.nsp = ""; ++r;) {
          if ("," === (c = t.charAt(r))) break;
          if (o.nsp += c, r === t.length) break;
        } else o.nsp = "/";
        var a = t.charAt(r + 1);
        if ("" !== a && Number(a) == a) {
          for (o.id = ""; ++r;) {
            var c;
            if (null == (c = t.charAt(r)) || Number(c) != c) {
              --r;
              break;
            }
            if (o.id += t.charAt(r), r === t.length) break;
          }
          o.id = Number(o.id);
        }
        if (t.charAt(++r)) {
          var h = function (t) {
            try {
              return JSON.parse(t);
            } catch (t) {
              return !1;
            }
          }(t.substr(r));
          if (!(!1 !== h && (o.type === e.ERROR || s(h)))) return l("invalid payload");
          o.data = h;
        }
        return n("decoded %s as %j", t, o), o;
      }(t), e.BINARY_EVENT === r.type || e.BINARY_ACK === r.type ? (this.reconstructor = new p(r), 0 === this.reconstructor.
      reconPack.attachments && this.emit("decoded", r)) : this.emit("decoded", r);else
      {
        if (!a(t) && !t.base64) throw new Error("Unknown type: " + t);
        if (!this.reconstructor) throw new Error("got binary data when not reconstructing a packet");
        (r = this.reconstructor.takeBinaryData(t)) && (this.reconstructor = null, this.emit("decoded", r));
      }
    }, f.prototype.destroy = function () {
      this.reconstructor && this.reconstructor.finishedReconstruction();
    }, p.prototype.takeBinaryData = function (t) {
      if (this.buffers.push(t), this.buffers.length === this.reconPack.attachments) {
        var e = i.reconstructPacket(this.reconPack, this.buffers);
        return this.finishedReconstruction(), e;
      }
      return null;
    }, p.prototype.finishedReconstruction = function () {
      this.reconPack = null, this.buffers = [];
    };
  }, function (t, e, r) {
    "use strict";
    (function (t) {
      /*!
                    * The buffer module from node.js, for the browser.
                    *
                    * @author   Feross Aboukhadijeh <http://feross.org>
                    * @license  MIT
                    */
      var n = r(22),
      o = r(23),
      i = r(24);

      function s() {
        return c.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
      }

      function a(t, e) {
        if (s() < e) throw new RangeError("Invalid typed array length");
        return c.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(e)).__proto__ = c.prototype : (null === t && (t = new c(e)),
        t.length = e), t;
      }

      function c(t, e, r) {
        if (!(c.TYPED_ARRAY_SUPPORT || this instanceof c)) return new c(t, e, r);
        if ("number" == typeof t) {
          if ("string" == typeof e) throw new Error(
          "If encoding is specified then the first argument must be a string");
          return f(this, t);
        }
        return h(this, t, e, r);
      }

      function h(t, e, r, n) {
        if ("number" == typeof e) throw new TypeError('"value" argument must not be a number');
        return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer ? function (t, e, r, n) {
          if (e.byteLength, r < 0 || e.byteLength < r) throw new RangeError("'offset' is out of bounds");
          if (e.byteLength < r + (n || 0)) throw new RangeError("'length' is out of bounds");
          e = void 0 === r && void 0 === n ? new Uint8Array(e) : void 0 === n ? new Uint8Array(e, r) : new Uint8Array(
          e, r, n);
          c.TYPED_ARRAY_SUPPORT ? (t = e).__proto__ = c.prototype : t = p(t, e);
          return t;
        }(t, e, r, n) : "string" == typeof e ? function (t, e, r) {
          "string" == typeof r && "" !== r || (r = "utf8");
          if (!c.isEncoding(r)) throw new TypeError('"encoding" must be a valid string encoding');
          var n = 0 | d(e, r),
          o = (t = a(t, n)).write(e, r);
          o !== n && (t = t.slice(0, o));
          return t;
        }(t, e, r) : function (t, e) {
          if (c.isBuffer(e)) {
            var r = 0 | l(e.length);
            return 0 === (t = a(t, r)).length || e.copy(t, 0, 0, r), t;
          }
          if (e) {
            if ("undefined" != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer || "length" in e) return "number" !=
            typeof e.length || (n = e.length) != n ? a(t, 0) : p(t, e);
            if ("Buffer" === e.type && i(e.data)) return p(t, e.data);
          }
          var n;
          throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
        }(t, e);
      }

      function u(t) {
        if ("number" != typeof t) throw new TypeError('"size" argument must be a number');
        if (t < 0) throw new RangeError('"size" argument must not be negative');
      }

      function f(t, e) {
        if (u(e), t = a(t, e < 0 ? 0 : 0 | l(e)), !c.TYPED_ARRAY_SUPPORT)
        for (var r = 0; r < e; ++r) {t[r] = 0;}
        return t;
      }

      function p(t, e) {
        var r = e.length < 0 ? 0 : 0 | l(e.length);
        t = a(t, r);
        for (var n = 0; n < r; n += 1) {t[n] = 255 & e[n];}
        return t;
      }

      function l(t) {
        if (t >= s()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + s().toString(
        16) + " bytes");
        return 0 | t;
      }

      function d(t, e) {
        if (c.isBuffer(t)) return t.length;
        if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) ||
        t instanceof ArrayBuffer)) return t.byteLength;
        "string" != typeof t && (t = "" + t);
        var r = t.length;
        if (0 === r) return 0;
        for (var n = !1;;) {switch (e) {
            case "ascii":
            case "latin1":
            case "binary":
              return r;
            case "utf8":
            case "utf-8":
            case void 0:
              return q(t).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return 2 * r;
            case "hex":
              return r >>> 1;
            case "base64":
              return Y(t).length;
            default:
              if (n) return q(t).length;
              e = ("" + e).toLowerCase(), n = !0;}}

      }

      function y(t, e, r) {
        var n = !1;
        if ((void 0 === e || e < 0) && (e = 0), e > this.length) return "";
        if ((void 0 === r || r > this.length) && (r = this.length), r <= 0) return "";
        if ((r >>>= 0) <= (e >>>= 0)) return "";
        for (t || (t = "utf8");;) {switch (t) {
            case "hex":
              return O(this, e, r);
            case "utf8":
            case "utf-8":
              return S(this, e, r);
            case "ascii":
              return C(this, e, r);
            case "latin1":
            case "binary":
              return R(this, e, r);
            case "base64":
              return B(this, e, r);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return x(this, e, r);
            default:
              if (n) throw new TypeError("Unknown encoding: " + t);
              t = (t + "").toLowerCase(), n = !0;}}

      }

      function g(t, e, r) {
        var n = t[e];
        t[e] = t[r], t[r] = n;
      }

      function v(t, e, r, n, o) {
        if (0 === t.length) return -1;
        if ("string" == typeof r ? (n = r, r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -
        2147483648), r = +r, isNaN(r) && (r = o ? 0 : t.length - 1), r < 0 && (r = t.length + r), r >= t.length) {
          if (o) return -1;
          r = t.length - 1;
        } else if (r < 0) {
          if (!o) return -1;
          r = 0;
        }
        if ("string" == typeof e && (e = c.from(e, n)), c.isBuffer(e)) return 0 === e.length ? -1 : m(t, e, r, n, o);
        if ("number" == typeof e) return e &= 255, c.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.
        indexOf ? o ? Uint8Array.prototype.indexOf.call(t, e, r) : Uint8Array.prototype.lastIndexOf.call(t, e, r) :
        m(t, [e], r, n, o);
        throw new TypeError("val must be string, number or Buffer");
      }

      function m(t, e, r, n, o) {
        var i,s = 1,
        a = t.length,
        c = e.length;
        if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n ||
        "utf-16le" === n)) {
          if (t.length < 2 || e.length < 2) return -1;
          s = 2, a /= 2, c /= 2, r /= 2;
        }

        function h(t, e) {
          return 1 === s ? t[e] : t.readUInt16BE(e * s);
        }
        if (o) {
          var u = -1;
          for (i = r; i < a; i++) {
            if (h(t, i) === h(e, -1 === u ? 0 : i - u)) {
              if (-1 === u && (u = i), i - u + 1 === c) return u * s;
            } else -1 !== u && (i -= i - u), u = -1;}
        } else
        for (r + c > a && (r = a - c), i = r; i >= 0; i--) {
          for (var f = !0, p = 0; p < c; p++) {
            if (h(t, i + p) !== h(e, p)) {
              f = !1;
              break;
            }}if (f) return i;
        }
        return -1;
      }

      function b(t, e, r, n) {
        r = Number(r) || 0;
        var o = t.length - r;
        n ? (n = Number(n)) > o && (n = o) : n = o;
        var i = e.length;
        if (i % 2 != 0) throw new TypeError("Invalid hex string");
        n > i / 2 && (n = i / 2);
        for (var s = 0; s < n; ++s) {
          var a = parseInt(e.substr(2 * s, 2), 16);
          if (isNaN(a)) return s;
          t[r + s] = a;
        }
        return s;
      }

      function w(t, e, r, n) {
        return F(q(e, t.length - r), t, r, n);
      }

      function A(t, e, r, n) {
        return F(function (t) {
          for (var e = [], r = 0; r < t.length; ++r) {e.push(255 & t.charCodeAt(r));}
          return e;
        }(e), t, r, n);
      }

      function k(t, e, r, n) {
        return A(t, e, r, n);
      }

      function _(t, e, r, n) {
        return F(Y(e), t, r, n);
      }

      function E(t, e, r, n) {
        return F(function (t, e) {
          for (var r, n, o, i = [], s = 0; s < t.length && !((e -= 2) < 0); ++s) {r = t.charCodeAt(s), n = r >> 8, o =
            r % 256, i.push(o), i.push(n);}
          return i;
        }(e, t.length - r), t, r, n);
      }

      function B(t, e, r) {
        return 0 === e && r === t.length ? n.fromByteArray(t) : n.fromByteArray(t.slice(e, r));
      }

      function S(t, e, r) {
        r = Math.min(t.length, r);
        for (var n = [], o = e; o < r;) {
          var i,s,a,c,h = t[o],
          u = null,
          f = h > 239 ? 4 : h > 223 ? 3 : h > 191 ? 2 : 1;
          if (o + f <= r) switch (f) {
            case 1:
              h < 128 && (u = h);
              break;
            case 2:
              128 == (192 & (i = t[o + 1])) && (c = (31 & h) << 6 | 63 & i) > 127 && (u = c);
              break;
            case 3:
              i = t[o + 1], s = t[o + 2], 128 == (192 & i) && 128 == (192 & s) && (c = (15 & h) << 12 | (63 & i) << 6 |
              63 & s) > 2047 && (c < 55296 || c > 57343) && (u = c);
              break;
            case 4:
              i = t[o + 1], s = t[o + 2], a = t[o + 3], 128 == (192 & i) && 128 == (192 & s) && 128 == (192 & a) && (c =
              (15 & h) << 18 | (63 & i) << 12 | (63 & s) << 6 | 63 & a) > 65535 && c < 1114112 && (u = c);}

          null === u ? (u = 65533, f = 1) : u > 65535 && (u -= 65536, n.push(u >>> 10 & 1023 | 55296), u = 56320 |
          1023 & u), n.push(u), o += f;
        }
        return function (t) {
          var e = t.length;
          if (e <= 4096) return String.fromCharCode.apply(String, t);
          var r = "",
          n = 0;
          for (; n < e;) {r += String.fromCharCode.apply(String, t.slice(n, n += 4096));}
          return r;
        }(n);
      }
      e.Buffer = c, e.SlowBuffer = function (t) {
        +t != t && (t = 0);
        return c.alloc(+t);
      }, e.INSPECT_MAX_BYTES = 50, c.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT :
      function () {
        try {
          var t = new Uint8Array(1);
          return t.__proto__ = {
            __proto__: Uint8Array.prototype,
            foo: function foo() {
              return 42;
            } },
          42 === t.foo() && "function" == typeof t.subarray && 0 === t.subarray(1, 1).byteLength;
        } catch (t) {
          return !1;
        }
      }(), e.kMaxLength = s(), c.poolSize = 8192, c._augment = function (t) {
        return t.__proto__ = c.prototype, t;
      }, c.from = function (t, e, r) {
        return h(null, t, e, r);
      }, c.TYPED_ARRAY_SUPPORT && (c.prototype.__proto__ = Uint8Array.prototype, c.__proto__ = Uint8Array,
      "undefined" != typeof Symbol && Symbol.species && c[Symbol.species] === c && Object.defineProperty(c, Symbol.
      species, {
        value: null,
        configurable: !0 })),
      c.alloc = function (t, e, r) {
        return function (t, e, r, n) {
          return u(e), e <= 0 ? a(t, e) : void 0 !== r ? "string" == typeof n ? a(t, e).fill(r, n) : a(t, e).fill(r) :
          a(t, e);
        }(null, t, e, r);
      }, c.allocUnsafe = function (t) {
        return f(null, t);
      }, c.allocUnsafeSlow = function (t) {
        return f(null, t);
      }, c.isBuffer = function (t) {
        return !(null == t || !t._isBuffer);
      }, c.compare = function (t, e) {
        if (!c.isBuffer(t) || !c.isBuffer(e)) throw new TypeError("Arguments must be Buffers");
        if (t === e) return 0;
        for (var r = t.length, n = e.length, o = 0, i = Math.min(r, n); o < i; ++o) {
          if (t[o] !== e[o]) {
            r = t[o], n = e[o];
            break;
          }}return r < n ? -1 : n < r ? 1 : 0;
      }, c.isEncoding = function (t) {
        switch (String(t).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return !0;
          default:
            return !1;}

      }, c.concat = function (t, e) {
        if (!i(t)) throw new TypeError('"list" argument must be an Array of Buffers');
        if (0 === t.length) return c.alloc(0);
        var r;
        if (void 0 === e)
        for (e = 0, r = 0; r < t.length; ++r) {e += t[r].length;}
        var n = c.allocUnsafe(e),
        o = 0;
        for (r = 0; r < t.length; ++r) {
          var s = t[r];
          if (!c.isBuffer(s)) throw new TypeError('"list" argument must be an Array of Buffers');
          s.copy(n, o), o += s.length;
        }
        return n;
      }, c.byteLength = d, c.prototype._isBuffer = !0, c.prototype.swap16 = function () {
        var t = this.length;
        if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
        for (var e = 0; e < t; e += 2) {g(this, e, e + 1);}
        return this;
      }, c.prototype.swap32 = function () {
        var t = this.length;
        if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
        for (var e = 0; e < t; e += 4) {g(this, e, e + 3), g(this, e + 1, e + 2);}
        return this;
      }, c.prototype.swap64 = function () {
        var t = this.length;
        if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
        for (var e = 0; e < t; e += 8) {g(this, e, e + 7), g(this, e + 1, e + 6), g(this, e + 2, e + 5), g(this, e +
          3, e + 4);}
        return this;
      }, c.prototype.toString = function () {
        var t = 0 | this.length;
        return 0 === t ? "" : 0 === arguments.length ? S(this, 0, t) : y.apply(this, arguments);
      }, c.prototype.equals = function (t) {
        if (!c.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
        return this === t || 0 === c.compare(this, t);
      }, c.prototype.inspect = function () {
        var t = "",
        r = e.INSPECT_MAX_BYTES;
        return this.length > 0 && (t = this.toString("hex", 0, r).match(/.{2}/g).join(" "), this.length > r && (t +=
        " ... ")), "<Buffer " + t + ">";
      }, c.prototype.compare = function (t, e, r, n, o) {
        if (!c.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
        if (void 0 === e && (e = 0), void 0 === r && (r = t ? t.length : 0), void 0 === n && (n = 0), void 0 === o && (
        o = this.length), e < 0 || r > t.length || n < 0 || o > this.length) throw new RangeError(
        "out of range index");
        if (n >= o && e >= r) return 0;
        if (n >= o) return -1;
        if (e >= r) return 1;
        if (this === t) return 0;
        for (var i = (o >>>= 0) - (n >>>= 0), s = (r >>>= 0) - (e >>>= 0), a = Math.min(i, s), h = this.slice(n, o),
        u = t.slice(e, r), f = 0; f < a; ++f) {
          if (h[f] !== u[f]) {
            i = h[f], s = u[f];
            break;
          }}return i < s ? -1 : s < i ? 1 : 0;
      }, c.prototype.includes = function (t, e, r) {
        return -1 !== this.indexOf(t, e, r);
      }, c.prototype.indexOf = function (t, e, r) {
        return v(this, t, e, r, !0);
      }, c.prototype.lastIndexOf = function (t, e, r) {
        return v(this, t, e, r, !1);
      }, c.prototype.write = function (t, e, r, n) {
        if (void 0 === e) n = "utf8", r = this.length, e = 0;else
        if (void 0 === r && "string" == typeof e) n = e, r = this.length, e = 0;else
        {
          if (!isFinite(e)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
          e |= 0, isFinite(r) ? (r |= 0, void 0 === n && (n = "utf8")) : (n = r, r = void 0);
        }
        var o = this.length - e;
        if ((void 0 === r || r > o) && (r = o), t.length > 0 && (r < 0 || e < 0) || e > this.length) throw new RangeError(
        "Attempt to write outside buffer bounds");
        n || (n = "utf8");
        for (var i = !1;;) {switch (n) {
            case "hex":
              return b(this, t, e, r);
            case "utf8":
            case "utf-8":
              return w(this, t, e, r);
            case "ascii":
              return A(this, t, e, r);
            case "latin1":
            case "binary":
              return k(this, t, e, r);
            case "base64":
              return _(this, t, e, r);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return E(this, t, e, r);
            default:
              if (i) throw new TypeError("Unknown encoding: " + n);
              n = ("" + n).toLowerCase(), i = !0;}}

      }, c.prototype.toJSON = function () {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0) };

      };

      function C(t, e, r) {
        var n = "";
        r = Math.min(t.length, r);
        for (var o = e; o < r; ++o) {n += String.fromCharCode(127 & t[o]);}
        return n;
      }

      function R(t, e, r) {
        var n = "";
        r = Math.min(t.length, r);
        for (var o = e; o < r; ++o) {n += String.fromCharCode(t[o]);}
        return n;
      }

      function O(t, e, r) {
        var n = t.length;
        (!e || e < 0) && (e = 0), (!r || r < 0 || r > n) && (r = n);
        for (var o = "", i = e; i < r; ++i) {o += D(t[i]);}
        return o;
      }

      function x(t, e, r) {
        for (var n = t.slice(e, r), o = "", i = 0; i < n.length; i += 2) {o += String.fromCharCode(n[i] + 256 * n[i +
          1]);}
        return o;
      }

      function P(t, e, r) {
        if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
        if (t + e > r) throw new RangeError("Trying to access beyond buffer length");
      }

      function T(t, e, r, n, o, i) {
        if (!c.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (e > o || e < i) throw new RangeError('"value" argument is out of bounds');
        if (r + n > t.length) throw new RangeError("Index out of range");
      }

      function N(t, e, r, n) {
        e < 0 && (e = 65535 + e + 1);
        for (var o = 0, i = Math.min(t.length - r, 2); o < i; ++o) {t[r + o] = (e & 255 << 8 * (n ? o : 1 - o)) >>> 8 * (
          n ? o : 1 - o);}
      }

      function L(t, e, r, n) {
        e < 0 && (e = 4294967295 + e + 1);
        for (var o = 0, i = Math.min(t.length - r, 4); o < i; ++o) {t[r + o] = e >>> 8 * (n ? o : 3 - o) & 255;}
      }

      function j(t, e, r, n, o, i) {
        if (r + n > t.length) throw new RangeError("Index out of range");
        if (r < 0) throw new RangeError("Index out of range");
      }

      function I(t, e, r, n, i) {
        return i || j(t, 0, r, 4), o.write(t, e, r, n, 23, 4), r + 4;
      }

      function U(t, e, r, n, i) {
        return i || j(t, 0, r, 8), o.write(t, e, r, n, 52, 8), r + 8;
      }
      c.prototype.slice = function (t, e) {
        var r,n = this.length;
        if ((t = ~~t) < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n), (e = void 0 === e ? n : ~~e) < 0 ? (e += n) <
        0 && (e = 0) : e > n && (e = n), e < t && (e = t), c.TYPED_ARRAY_SUPPORT) (r = this.subarray(t, e)).__proto__ =
        c.prototype;else
        {
          var o = e - t;
          r = new c(o, void 0);
          for (var i = 0; i < o; ++i) {r[i] = this[i + t];}
        }
        return r;
      }, c.prototype.readUIntLE = function (t, e, r) {
        t |= 0, e |= 0, r || P(t, e, this.length);
        for (var n = this[t], o = 1, i = 0; ++i < e && (o *= 256);) {n += this[t + i] * o;}
        return n;
      }, c.prototype.readUIntBE = function (t, e, r) {
        t |= 0, e |= 0, r || P(t, e, this.length);
        for (var n = this[t + --e], o = 1; e > 0 && (o *= 256);) {n += this[t + --e] * o;}
        return n;
      }, c.prototype.readUInt8 = function (t, e) {
        return e || P(t, 1, this.length), this[t];
      }, c.prototype.readUInt16LE = function (t, e) {
        return e || P(t, 2, this.length), this[t] | this[t + 1] << 8;
      }, c.prototype.readUInt16BE = function (t, e) {
        return e || P(t, 2, this.length), this[t] << 8 | this[t + 1];
      }, c.prototype.readUInt32LE = function (t, e) {
        return e || P(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3];
      }, c.prototype.readUInt32BE = function (t, e) {
        return e || P(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]);
      }, c.prototype.readIntLE = function (t, e, r) {
        t |= 0, e |= 0, r || P(t, e, this.length);
        for (var n = this[t], o = 1, i = 0; ++i < e && (o *= 256);) {n += this[t + i] * o;}
        return n >= (o *= 128) && (n -= Math.pow(2, 8 * e)), n;
      }, c.prototype.readIntBE = function (t, e, r) {
        t |= 0, e |= 0, r || P(t, e, this.length);
        for (var n = e, o = 1, i = this[t + --n]; n > 0 && (o *= 256);) {i += this[t + --n] * o;}
        return i >= (o *= 128) && (i -= Math.pow(2, 8 * e)), i;
      }, c.prototype.readInt8 = function (t, e) {
        return e || P(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t];
      }, c.prototype.readInt16LE = function (t, e) {
        e || P(t, 2, this.length);
        var r = this[t] | this[t + 1] << 8;
        return 32768 & r ? 4294901760 | r : r;
      }, c.prototype.readInt16BE = function (t, e) {
        e || P(t, 2, this.length);
        var r = this[t + 1] | this[t] << 8;
        return 32768 & r ? 4294901760 | r : r;
      }, c.prototype.readInt32LE = function (t, e) {
        return e || P(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24;
      }, c.prototype.readInt32BE = function (t, e) {
        return e || P(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3];
      }, c.prototype.readFloatLE = function (t, e) {
        return e || P(t, 4, this.length), o.read(this, t, !0, 23, 4);
      }, c.prototype.readFloatBE = function (t, e) {
        return e || P(t, 4, this.length), o.read(this, t, !1, 23, 4);
      }, c.prototype.readDoubleLE = function (t, e) {
        return e || P(t, 8, this.length), o.read(this, t, !0, 52, 8);
      }, c.prototype.readDoubleBE = function (t, e) {
        return e || P(t, 8, this.length), o.read(this, t, !1, 52, 8);
      }, c.prototype.writeUIntLE = function (t, e, r, n) {
        (t = +t, e |= 0, r |= 0, n) || T(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
        var o = 1,
        i = 0;
        for (this[e] = 255 & t; ++i < r && (o *= 256);) {this[e + i] = t / o & 255;}
        return e + r;
      }, c.prototype.writeUIntBE = function (t, e, r, n) {
        (t = +t, e |= 0, r |= 0, n) || T(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
        var o = r - 1,
        i = 1;
        for (this[e + o] = 255 & t; --o >= 0 && (i *= 256);) {this[e + o] = t / i & 255;}
        return e + r;
      }, c.prototype.writeUInt8 = function (t, e, r) {
        return t = +t, e |= 0, r || T(this, t, e, 1, 255, 0), c.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), this[e] =
        255 & t, e + 1;
      }, c.prototype.writeUInt16LE = function (t, e, r) {
        return t = +t, e |= 0, r || T(this, t, e, 2, 65535, 0), c.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e +
        1] = t >>> 8) : N(this, t, e, !0), e + 2;
      }, c.prototype.writeUInt16BE = function (t, e, r) {
        return t = +t, e |= 0, r || T(this, t, e, 2, 65535, 0), c.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e +
        1] = 255 & t) : N(this, t, e, !1), e + 2;
      }, c.prototype.writeUInt32LE = function (t, e, r) {
        return t = +t, e |= 0, r || T(this, t, e, 4, 4294967295, 0), c.TYPED_ARRAY_SUPPORT ? (this[e + 3] = t >>> 24,
        this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = 255 & t) : L(this, t, e, !0), e + 4;
      }, c.prototype.writeUInt32BE = function (t, e, r) {
        return t = +t, e |= 0, r || T(this, t, e, 4, 4294967295, 0), c.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24,
        this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : L(this, t, e, !1), e + 4;
      }, c.prototype.writeIntLE = function (t, e, r, n) {
        if (t = +t, e |= 0, !n) {
          var o = Math.pow(2, 8 * r - 1);
          T(this, t, e, r, o - 1, -o);
        }
        var i = 0,
        s = 1,
        a = 0;
        for (this[e] = 255 & t; ++i < r && (s *= 256);) {t < 0 && 0 === a && 0 !== this[e + i - 1] && (a = 1), this[e +
          i] = (t / s >> 0) - a & 255;}
        return e + r;
      }, c.prototype.writeIntBE = function (t, e, r, n) {
        if (t = +t, e |= 0, !n) {
          var o = Math.pow(2, 8 * r - 1);
          T(this, t, e, r, o - 1, -o);
        }
        var i = r - 1,
        s = 1,
        a = 0;
        for (this[e + i] = 255 & t; --i >= 0 && (s *= 256);) {t < 0 && 0 === a && 0 !== this[e + i + 1] && (a = 1),
          this[e + i] = (t / s >> 0) - a & 255;}
        return e + r;
      }, c.prototype.writeInt8 = function (t, e, r) {
        return t = +t, e |= 0, r || T(this, t, e, 1, 127, -128), c.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), t < 0 && (
        t = 255 + t + 1), this[e] = 255 & t, e + 1;
      }, c.prototype.writeInt16LE = function (t, e, r) {
        return t = +t, e |= 0, r || T(this, t, e, 2, 32767, -32768), c.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t,
        this[e + 1] = t >>> 8) : N(this, t, e, !0), e + 2;
      }, c.prototype.writeInt16BE = function (t, e, r) {
        return t = +t, e |= 0, r || T(this, t, e, 2, 32767, -32768), c.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8,
        this[e + 1] = 255 & t) : N(this, t, e, !1), e + 2;
      }, c.prototype.writeInt32LE = function (t, e, r) {
        return t = +t, e |= 0, r || T(this, t, e, 4, 2147483647, -2147483648), c.TYPED_ARRAY_SUPPORT ? (this[e] =
        255 & t, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24) : L(this, t, e, !0), e + 4;
      }, c.prototype.writeInt32BE = function (t, e, r) {
        return t = +t, e |= 0, r || T(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), c.TYPED_ARRAY_SUPPORT ? (
        this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : L(this, t, e,
        !1), e + 4;
      }, c.prototype.writeFloatLE = function (t, e, r) {
        return I(this, t, e, !0, r);
      }, c.prototype.writeFloatBE = function (t, e, r) {
        return I(this, t, e, !1, r);
      }, c.prototype.writeDoubleLE = function (t, e, r) {
        return U(this, t, e, !0, r);
      }, c.prototype.writeDoubleBE = function (t, e, r) {
        return U(this, t, e, !1, r);
      }, c.prototype.copy = function (t, e, r, n) {
        if (r || (r = 0), n || 0 === n || (n = this.length), e >= t.length && (e = t.length), e || (e = 0), n > 0 &&
        n < r && (n = r), n === r) return 0;
        if (0 === t.length || 0 === this.length) return 0;
        if (e < 0) throw new RangeError("targetStart out of bounds");
        if (r < 0 || r >= this.length) throw new RangeError("sourceStart out of bounds");
        if (n < 0) throw new RangeError("sourceEnd out of bounds");
        n > this.length && (n = this.length), t.length - e < n - r && (n = t.length - e + r);
        var o,i = n - r;
        if (this === t && r < e && e < n)
        for (o = i - 1; o >= 0; --o) {t[o + e] = this[o + r];} else
        if (i < 1e3 || !c.TYPED_ARRAY_SUPPORT)
        for (o = 0; o < i; ++o) {t[o + e] = this[o + r];} else
        Uint8Array.prototype.set.call(t, this.subarray(r, r + i), e);
        return i;
      }, c.prototype.fill = function (t, e, r, n) {
        if ("string" == typeof t) {
          if ("string" == typeof e ? (n = e, e = 0, r = this.length) : "string" == typeof r && (n = r, r = this.length),
          1 === t.length) {
            var o = t.charCodeAt(0);
            o < 256 && (t = o);
          }
          if (void 0 !== n && "string" != typeof n) throw new TypeError("encoding must be a string");
          if ("string" == typeof n && !c.isEncoding(n)) throw new TypeError("Unknown encoding: " + n);
        } else "number" == typeof t && (t &= 255);
        if (e < 0 || this.length < e || this.length < r) throw new RangeError("Out of range index");
        if (r <= e) return this;
        var i;
        if (e >>>= 0, r = void 0 === r ? this.length : r >>> 0, t || (t = 0), "number" == typeof t)
        for (i = e; i < r; ++i) {this[i] = t;} else
        {
          var s = c.isBuffer(t) ? t : q(new c(t, n).toString()),
          a = s.length;
          for (i = 0; i < r - e; ++i) {this[i + e] = s[i % a];}
        }
        return this;
      };
      var M = /[^+\/0-9A-Za-z-_]/g;

      function D(t) {
        return t < 16 ? "0" + t.toString(16) : t.toString(16);
      }

      function q(t, e) {
        var r;
        e = e || 1 / 0;
        for (var n = t.length, o = null, i = [], s = 0; s < n; ++s) {
          if ((r = t.charCodeAt(s)) > 55295 && r < 57344) {
            if (!o) {
              if (r > 56319) {
                (e -= 3) > -1 && i.push(239, 191, 189);
                continue;
              }
              if (s + 1 === n) {
                (e -= 3) > -1 && i.push(239, 191, 189);
                continue;
              }
              o = r;
              continue;
            }
            if (r < 56320) {
              (e -= 3) > -1 && i.push(239, 191, 189), o = r;
              continue;
            }
            r = 65536 + (o - 55296 << 10 | r - 56320);
          } else o && (e -= 3) > -1 && i.push(239, 191, 189);
          if (o = null, r < 128) {
            if ((e -= 1) < 0) break;
            i.push(r);
          } else if (r < 2048) {
            if ((e -= 2) < 0) break;
            i.push(r >> 6 | 192, 63 & r | 128);
          } else if (r < 65536) {
            if ((e -= 3) < 0) break;
            i.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128);
          } else {
            if (!(r < 1114112)) throw new Error("Invalid code point");
            if ((e -= 4) < 0) break;
            i.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128);
          }
        }
        return i;
      }

      function Y(t) {
        return n.toByteArray(function (t) {
          if ((t = function (t) {
            return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
          }(t).replace(M, "")).length < 2) return "";
          for (; t.length % 4 != 0;) {t += "=";}
          return t;
        }(t));
      }

      function F(t, e, r, n) {
        for (var o = 0; o < n && !(o + r >= e.length || o >= t.length); ++o) {e[o + r] = t[o];}
        return o;
      }
    }).call(this, r(9));
  }, function (t, e) {
    e.encode = function (t) {
      var e = "";
      for (var r in t) {t.hasOwnProperty(r) && (e.length && (e += "&"), e += encodeURIComponent(r) + "=" +
        encodeURIComponent(t[r]));}
      return e;
    }, e.decode = function (t) {
      for (var e = {}, r = t.split("&"), n = 0, o = r.length; n < o; n++) {
        var i = r[n].split("=");
        e[decodeURIComponent(i[0])] = decodeURIComponent(i[1]);
      }
      return e;
    };
  }, function (t, e) {
    var r =
    /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
    n = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path",
    "directory", "file", "query", "anchor"];

    t.exports = function (t) {
      var e = t,
      o = t.indexOf("["),
      i = t.indexOf("]");-1 != o && -1 != i && (t = t.substring(0, o) + t.substring(o, i).replace(/:/g, ";") + t.substring(
      i, t.length));
      for (var s = r.exec(t || ""), a = {}, c = 14; c--;) {a[n[c]] = s[c] || "";}
      return -1 != o && -1 != i && (a.source = e, a.host = a.host.substring(1, a.host.length - 1).replace(/;/g, ":"),
      a.authority = a.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), a.ipv6uri = !0), a;
    };
  }, function (t, e) {
    var r = {}.toString;
    t.exports = Array.isArray || function (t) {
      return "[object Array]" == r.call(t);
    };
  }, function (t, e, r) {
    (function (e) {
      t.exports = function (t) {
        return r && e.isBuffer(t) || n && (t instanceof ArrayBuffer || function (t) {
          return "function" == typeof ArrayBuffer.isView ? ArrayBuffer.isView(t) : t.buffer instanceof ArrayBuffer;
        }(t));
      };
      var r = "function" == typeof e && "function" == typeof e.isBuffer,
      n = "function" == typeof ArrayBuffer;
    }).call(this, r(4).Buffer);
  }, function (t, e) {
    var r;
    r = function () {
      return this;
    }();
    try {
      r = r || new Function("return this")();
    } catch (t) {
      "object" == typeof window && (r = window);
    }
    t.exports = r;
  }, function (t, e, r) {
    var n = r(25),
    o = r(15),
    i = r(1),
    s = r(3),
    a = r(16),
    c = r(17),
    h = r(0)("socket.io-client:manager"),
    u = r(14),
    f = r(49),
    p = Object.prototype.hasOwnProperty;

    function l(t, e) {
      if (!(this instanceof l)) return new l(t, e);
      t && "object" == typeof t && (e = t, t = void 0), (e = e || {}).path = e.path || "/socket.io", this.nsps = {},
      this.subs = [], this.opts = e, this.reconnection(!1 !== e.reconnection), this.reconnectionAttempts(e.reconnectionAttempts ||
      1 / 0), this.reconnectionDelay(e.reconnectionDelay || 1e3), this.reconnectionDelayMax(e.reconnectionDelayMax ||
      5e3), this.randomizationFactor(e.randomizationFactor || .5), this.backoff = new f({
        min: this.reconnectionDelay(),
        max: this.reconnectionDelayMax(),
        jitter: this.randomizationFactor() }),
      this.timeout(null == e.timeout ? 2e4 : e.timeout), this.readyState = "closed", this.uri = t, this.connecting = [],
      this.lastPing = null, this.encoding = !1, this.packetBuffer = [];
      var r = e.parser || s;
      this.encoder = new r.Encoder(), this.decoder = new r.Decoder(), this.autoConnect = !1 !== e.autoConnect, this.autoConnect &&
      this.open();
    }
    t.exports = l, l.prototype.emitAll = function () {
      for (var t in this.emit.apply(this, arguments), this.nsps) {p.call(this.nsps, t) && this.nsps[t].emit.apply(
        this.nsps[t], arguments);}
    }, l.prototype.updateSocketIds = function () {
      for (var t in this.nsps) {p.call(this.nsps, t) && (this.nsps[t].id = this.generateId(t));}
    }, l.prototype.generateId = function (t) {
      return ("/" === t ? "" : t + "#") + this.engine.id;
    }, i(l.prototype), l.prototype.reconnection = function (t) {
      return arguments.length ? (this._reconnection = !!t, this) : this._reconnection;
    }, l.prototype.reconnectionAttempts = function (t) {
      return arguments.length ? (this._reconnectionAttempts = t, this) : this._reconnectionAttempts;
    }, l.prototype.reconnectionDelay = function (t) {
      return arguments.length ? (this._reconnectionDelay = t, this.backoff && this.backoff.setMin(t), this) : this._reconnectionDelay;
    }, l.prototype.randomizationFactor = function (t) {
      return arguments.length ? (this._randomizationFactor = t, this.backoff && this.backoff.setJitter(t), this) :
      this._randomizationFactor;
    }, l.prototype.reconnectionDelayMax = function (t) {
      return arguments.length ? (this._reconnectionDelayMax = t, this.backoff && this.backoff.setMax(t), this) :
      this._reconnectionDelayMax;
    }, l.prototype.timeout = function (t) {
      return arguments.length ? (this._timeout = t, this) : this._timeout;
    }, l.prototype.maybeReconnectOnOpen = function () {
      !this.reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect();
    }, l.prototype.open = l.prototype.connect = function (t, e) {
      if (h("readyState %s", this.readyState), ~this.readyState.indexOf("open")) return this;
      h("opening %s", this.uri), this.engine = n(this.uri, this.opts);
      var r = this.engine,
      o = this;
      this.readyState = "opening", this.skipReconnect = !1;
      var i = a(r, "open", function () {
        o.onopen(), t && t();
      }),
      s = a(r, "error", function (e) {
        if (h("connect_error"), o.cleanup(), o.readyState = "closed", o.emitAll("connect_error", e), t) {
          var r = new Error("Connection error");
          r.data = e, t(r);
        } else o.maybeReconnectOnOpen();
      });
      if (!1 !== this._timeout) {
        var c = this._timeout;
        h("connect attempt will timeout after %d", c);
        var u = setTimeout(function () {
          h("connect attempt timed out after %d", c), i.destroy(), r.close(), r.emit("error", "timeout"), o.emitAll(
          "connect_timeout", c);
        }, c);
        this.subs.push({
          destroy: function destroy() {
            clearTimeout(u);
          } });

      }
      return this.subs.push(i), this.subs.push(s), this;
    }, l.prototype.onopen = function () {
      h("open"), this.cleanup(), this.readyState = "open", this.emit("open");
      var t = this.engine;
      this.subs.push(a(t, "data", c(this, "ondata"))), this.subs.push(a(t, "ping", c(this, "onping"))), this.subs.push(
      a(t, "pong", c(this, "onpong"))), this.subs.push(a(t, "error", c(this, "onerror"))), this.subs.push(a(t,
      "close", c(this, "onclose"))), this.subs.push(a(this.decoder, "decoded", c(this, "ondecoded")));
    }, l.prototype.onping = function () {
      this.lastPing = new Date(), this.emitAll("ping");
    }, l.prototype.onpong = function () {
      this.emitAll("pong", new Date() - this.lastPing);
    }, l.prototype.ondata = function (t) {
      this.decoder.add(t);
    }, l.prototype.ondecoded = function (t) {
      this.emit("packet", t);
    }, l.prototype.onerror = function (t) {
      h("error", t), this.emitAll("error", t);
    }, l.prototype.socket = function (t, e) {
      var r = this.nsps[t];
      if (!r) {
        r = new o(this, t, e), this.nsps[t] = r;
        var n = this;
        r.on("connecting", i), r.on("connect", function () {
          r.id = n.generateId(t);
        }), this.autoConnect && i();
      }

      function i() {
        ~u(n.connecting, r) || n.connecting.push(r);
      }
      return r;
    }, l.prototype.destroy = function (t) {
      var e = u(this.connecting, t);
      ~e && this.connecting.splice(e, 1), this.connecting.length || this.close();
    }, l.prototype.packet = function (t) {
      h("writing packet %j", t);
      var e = this;
      t.query && 0 === t.type && (t.nsp += "?" + t.query), e.encoding ? e.packetBuffer.push(t) : (e.encoding = !0,
      this.encoder.encode(t, function (r) {
        for (var n = 0; n < r.length; n++) {e.engine.write(r[n], t.options);}
        e.encoding = !1, e.processPacketQueue();
      }));
    }, l.prototype.processPacketQueue = function () {
      if (this.packetBuffer.length > 0 && !this.encoding) {
        var t = this.packetBuffer.shift();
        this.packet(t);
      }
    }, l.prototype.cleanup = function () {
      h("cleanup");
      for (var t = this.subs.length, e = 0; e < t; e++) {
        this.subs.shift().destroy();
      }
      this.packetBuffer = [], this.encoding = !1, this.lastPing = null, this.decoder.destroy();
    }, l.prototype.close = l.prototype.disconnect = function () {
      h("disconnect"), this.skipReconnect = !0, this.reconnecting = !1, "opening" === this.readyState && this.cleanup(),
      this.backoff.reset(), this.readyState = "closed", this.engine && this.engine.close();
    }, l.prototype.onclose = function (t) {
      h("onclose"), this.cleanup(), this.backoff.reset(), this.readyState = "closed", this.emit("close", t), this._reconnection &&
      !this.skipReconnect && this.reconnect();
    }, l.prototype.reconnect = function () {
      if (this.reconnecting || this.skipReconnect) return this;
      var t = this;
      if (this.backoff.attempts >= this._reconnectionAttempts) h("reconnect failed"), this.backoff.reset(), this.emitAll(
      "reconnect_failed"), this.reconnecting = !1;else
      {
        var e = this.backoff.duration();
        h("will wait %dms before reconnect attempt", e), this.reconnecting = !0;
        var r = setTimeout(function () {
          t.skipReconnect || (h("attempting reconnect"), t.emitAll("reconnect_attempt", t.backoff.attempts), t.emitAll(
          "reconnecting", t.backoff.attempts), t.skipReconnect || t.open(function (e) {
            e ? (h("reconnect attempt error"), t.reconnecting = !1, t.reconnect(), t.emitAll("reconnect_error",
            e.data)) : (h("reconnect success"), t.onreconnect());
          }));
        }, e);
        this.subs.push({
          destroy: function destroy() {
            clearTimeout(r);
          } });

      }
    }, l.prototype.onreconnect = function () {
      var t = this.backoff.attempts;
      this.reconnecting = !1, this.backoff.reset(), this.updateSocketIds(), this.emitAll("reconnect", t);
    };
  }, function (t, e, r) {
    var n = r(27);
    e.websocket = n;
  }, function (t, e, r) {
    var n = r(2),
    o = r(1);

    function i(t) {
      this.path = t.path, this.hostname = t.hostname, this.port = t.port, this.secure = t.secure, this.query = t.query,
      this.timestampParam = t.timestampParam, this.timestampRequests = t.timestampRequests, this.readyState = "",
      this.agent = t.agent || !1, this.socket = t.socket, this.enablesXDR = t.enablesXDR, this.withCredentials = t.withCredentials,
      this.pfx = t.pfx, this.key = t.key, this.passphrase = t.passphrase, this.cert = t.cert, this.ca = t.ca, this.ciphers =
      t.ciphers, this.rejectUnauthorized = t.rejectUnauthorized, this.forceNode = t.forceNode, this.isReactNative =
      t.isReactNative, this.extraHeaders = t.extraHeaders, this.localAddress = t.localAddress;
    }
    t.exports = i, o(i.prototype), i.prototype.onError = function (t, e) {
      var r = new Error(t);
      return r.type = "TransportError", r.description = e, this.emit("error", r), this;
    }, i.prototype.open = function () {
      return "closed" !== this.readyState && "" !== this.readyState || (this.readyState = "opening", this.doOpen()),
      this;
    }, i.prototype.close = function () {
      return "opening" !== this.readyState && "open" !== this.readyState || (this.doClose(), this.onClose()), this;
    }, i.prototype.send = function (t) {
      if ("open" !== this.readyState) throw new Error("Transport not open");
      this.write(t);
    }, i.prototype.onOpen = function () {
      this.readyState = "open", this.writable = !0, this.emit("open");
    }, i.prototype.onData = function (t) {
      var e = n.decodePacket(t, this.socket.binaryType);
      this.onPacket(e);
    }, i.prototype.onPacket = function (t) {
      this.emit("packet", t);
    }, i.prototype.onClose = function () {
      this.readyState = "closed", this.emit("close");
    };
  }, function (t, e, r) {
    (function (e) {
      var n = r(29),
      o = Object.prototype.toString,
      i = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === o.call(Blob),
      s = "function" == typeof File || "undefined" != typeof File && "[object FileConstructor]" === o.call(File);
      t.exports = function t(r) {
        if (!r || "object" != typeof r) return !1;
        if (n(r)) {
          for (var o = 0, a = r.length; o < a; o++) {
            if (t(r[o])) return !0;}
          return !1;
        }
        if ("function" == typeof e && e.isBuffer && e.isBuffer(r) || "function" == typeof ArrayBuffer && r instanceof ArrayBuffer ||
        i && r instanceof Blob || s && r instanceof File) return !0;
        if (r.toJSON && "function" == typeof r.toJSON && 1 === arguments.length) return t(r.toJSON(), !0);
        for (var c in r) {
          if (Object.prototype.hasOwnProperty.call(r, c) && t(r[c])) return !0;}
        return !1;
      };
    }).call(this, r(4).Buffer);
  }, function (t, e) {
    var r = [].indexOf;
    t.exports = function (t, e) {
      if (r) return t.indexOf(e);
      for (var n = 0; n < t.length; ++n) {
        if (t[n] === e) return n;}
      return -1;
    };
  }, function (t, e, r) {
    var n = r(3),
    o = r(1),
    i = r(48),
    s = r(16),
    a = r(17),
    c = r(0)("socket.io-client:socket"),
    h = r(5),
    u = r(13);
    t.exports = l;
    var f = {
      connect: 1,
      connect_error: 1,
      connect_timeout: 1,
      connecting: 1,
      disconnect: 1,
      error: 1,
      reconnect: 1,
      reconnect_attempt: 1,
      reconnect_failed: 1,
      reconnect_error: 1,
      reconnecting: 1,
      ping: 1,
      pong: 1 },

    p = o.prototype.emit;

    function l(t, e, r) {
      this.io = t, this.nsp = e, this.json = this, this.ids = 0, this.acks = {}, this.receiveBuffer = [], this.sendBuffer = [],
      this.connected = !1, this.disconnected = !0, this.flags = {}, r && r.query && (this.query = r.query), this.io.autoConnect &&
      this.open();
    }
    o(l.prototype), l.prototype.subEvents = function () {
      if (!this.subs) {
        var t = this.io;
        this.subs = [s(t, "open", a(this, "onopen")), s(t, "packet", a(this, "onpacket")), s(t, "close", a(this,
        "onclose"))];
      }
    }, l.prototype.open = l.prototype.connect = function () {
      return this.connected || (this.subEvents(), this.io.open(), "open" === this.io.readyState && this.onopen(),
      this.emit("connecting")), this;
    }, l.prototype.send = function () {
      var t = i(arguments);
      return t.unshift("message"), this.emit.apply(this, t), this;
    }, l.prototype.emit = function (t) {
      if (f.hasOwnProperty(t)) return p.apply(this, arguments), this;
      var e = i(arguments),
      r = {
        type: (void 0 !== this.flags.binary ? this.flags.binary : u(e)) ? n.BINARY_EVENT : n.EVENT,
        data: e,
        options: {} };

      return r.options.compress = !this.flags || !1 !== this.flags.compress, "function" == typeof e[e.length - 1] && (
      c("emitting packet with ack id %d", this.ids), this.acks[this.ids] = e.pop(), r.id = this.ids++), this.connected ?
      this.packet(r) : this.sendBuffer.push(r), this.flags = {}, this;
    }, l.prototype.packet = function (t) {
      t.nsp = this.nsp, this.io.packet(t);
    }, l.prototype.onopen = function () {
      if (c("transport is open - connecting"), "/" !== this.nsp)
      if (this.query) {
        var t = "object" == typeof this.query ? h.encode(this.query) : this.query;
        c("sending connect packet with query %s", t), this.packet({
          type: n.CONNECT,
          query: t });

      } else this.packet({
        type: n.CONNECT });

    }, l.prototype.onclose = function (t) {
      c("close (%s)", t), this.connected = !1, this.disconnected = !0, delete this.id, this.emit("disconnect", t);
    }, l.prototype.onpacket = function (t) {
      var e = t.nsp === this.nsp,
      r = t.type === n.ERROR && "/" === t.nsp;
      if (e || r) switch (t.type) {
        case n.CONNECT:
          this.onconnect();
          break;
        case n.EVENT:
        case n.BINARY_EVENT:
          this.onevent(t);
          break;
        case n.ACK:
        case n.BINARY_ACK:
          this.onack(t);
          break;
        case n.DISCONNECT:
          this.ondisconnect();
          break;
        case n.ERROR:
          this.emit("error", t.data);}

    }, l.prototype.onevent = function (t) {
      var e = t.data || [];
      c("emitting event %j", e), null != t.id && (c("attaching ack callback to event"), e.push(this.ack(t.id))),
      this.connected ? p.apply(this, e) : this.receiveBuffer.push(e);
    }, l.prototype.ack = function (t) {
      var e = this,
      r = !1;
      return function () {
        if (!r) {
          r = !0;
          var o = i(arguments);
          c("sending ack %j", o), e.packet({
            type: u(o) ? n.BINARY_ACK : n.ACK,
            id: t,
            data: o });

        }
      };
    }, l.prototype.onack = function (t) {
      var e = this.acks[t.id];
      "function" == typeof e ? (c("calling ack %s with %j", t.id, t.data), e.apply(this, t.data), delete this.acks[t.
      id]) : c("bad ack %s", t.id);
    }, l.prototype.onconnect = function () {
      this.connected = !0, this.disconnected = !1, this.emit("connect"), this.emitBuffered();
    }, l.prototype.emitBuffered = function () {
      var t;
      for (t = 0; t < this.receiveBuffer.length; t++) {p.apply(this, this.receiveBuffer[t]);}
      for (this.receiveBuffer = [], t = 0; t < this.sendBuffer.length; t++) {this.packet(this.sendBuffer[t]);}
      this.sendBuffer = [];
    }, l.prototype.ondisconnect = function () {
      c("server disconnect (%s)", this.nsp), this.destroy(), this.onclose("io server disconnect");
    }, l.prototype.destroy = function () {
      if (this.subs) {
        for (var t = 0; t < this.subs.length; t++) {this.subs[t].destroy();}
        this.subs = null;
      }
      this.io.destroy(this);
    }, l.prototype.close = l.prototype.disconnect = function () {
      return this.connected && (c("performing disconnect (%s)", this.nsp), this.packet({
        type: n.DISCONNECT })),
      this.destroy(), this.connected && this.onclose("io client disconnect"), this;
    }, l.prototype.compress = function (t) {
      return this.flags.compress = t, this;
    }, l.prototype.binary = function (t) {
      return this.flags.binary = t, this;
    };
  }, function (t, e) {
    t.exports = function (t, e, r) {
      return t.on(e, r), {
        destroy: function destroy() {
          t.removeListener(e, r);
        } };

    };
  }, function (t, e) {
    var r = [].slice;
    t.exports = function (t, e) {
      if ("string" == typeof e && (e = t[e]), "function" != typeof e) throw new Error("bind() requires a function");
      var n = r.call(arguments, 2);
      return function () {
        return e.apply(t, n.concat(r.call(arguments)));
      };
    };
  }, function (t, e, r) {
    t.exports = r(19);
  }, function (t, e, r) {
    var n = r(20),
    o = r(3),
    i = r(10),
    s = r(0)("socket.io-client");
    t.exports = e = c;
    var a = e.managers = {};

    function c(t, e) {
      "object" == typeof t && (e = t, t = void 0), e = e || {};
      var r,o = n(t),
      c = o.source,
      h = o.id,
      u = o.path,
      f = a[h] && u in a[h].nsps;
      return e.forceNew || e["force new connection"] || !1 === e.multiplex || f ? (s("ignoring socket cache for %s",
      c), r = i(c, e)) : (a[h] || (s("new io instance for %s", c), a[h] = i(c, e)), r = a[h]), o.query && !e.query && (
      e.query = o.query), r.socket(o.path, e);
    }
    e.protocol = o.protocol, e.connect = c, e.Manager = r(10), e.Socket = r(15);
  }, function (t, e, r) {
    var n = r(6),
    o = r(0)("socket.io-client:url");
    t.exports = function (t, e) {
      var r = t;
      e = e || "undefined" != typeof location && location, null == t && (t = e.protocol + "//" + e.host);
      "string" == typeof t && ("/" === t.charAt(0) && (t = "/" === t.charAt(1) ? e.protocol + t : e.host + t),
      /^(https?|wss?):\/\//.test(t) || (o("protocol-less url %s", t), t = void 0 !== e ? e.protocol + "//" + t :
      "https://" + t), o("parse %s", t), r = n(t));
      r.port || (/^(http|ws)$/.test(r.protocol) ? r.port = "80" : /^(http|ws)s$/.test(r.protocol) && (r.port = "443"));
      r.path = r.path || "/";
      var i = -1 !== r.host.indexOf(":") ? "[" + r.host + "]" : r.host;
      return r.id = r.protocol + "://" + i + ":" + r.port, r.href = r.protocol + "://" + i + (e && e.port === r.port ?
      "" : ":" + r.port), r;
    };
  }, function (t, e, r) {
    var n = r(7),
    o = r(8),
    i = Object.prototype.toString,
    s = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === i.call(Blob),
    a = "function" == typeof File || "undefined" != typeof File && "[object FileConstructor]" === i.call(File);
    e.deconstructPacket = function (t) {
      var e = [],
      r = t.data,
      i = t;
      return i.data = function t(e, r) {
        if (!e) return e;
        if (o(e)) {
          var i = {
            _placeholder: !0,
            num: r.length };

          return r.push(e), i;
        }
        if (n(e)) {
          for (var s = new Array(e.length), a = 0; a < e.length; a++) {s[a] = t(e[a], r);}
          return s;
        }
        if ("object" == typeof e && !(e instanceof Date)) {
          s = {};
          for (var c in e) {s[c] = t(e[c], r);}
          return s;
        }
        return e;
      }(r, e), i.attachments = e.length, {
        packet: i,
        buffers: e };

    }, e.reconstructPacket = function (t, e) {
      return t.data = function t(e, r) {
        if (!e) return e;
        if (e && e._placeholder) return r[e.num];
        if (n(e))
        for (var o = 0; o < e.length; o++) {e[o] = t(e[o], r);} else
        if ("object" == typeof e)
        for (var i in e) {e[i] = t(e[i], r);}
        return e;
      }(t.data, e), t.attachments = void 0, t;
    }, e.removeBlobs = function (t, e) {
      var r = 0,
      i = t;
      !function t(c, h, u) {
        if (!c) return c;
        if (s && c instanceof Blob || a && c instanceof File) {
          r++;
          var f = new FileReader();
          f.onload = function () {
            u ? u[h] = this.result : i = this.result, --r || e(i);
          }, f.readAsArrayBuffer(c);
        } else if (n(c))
        for (var p = 0; p < c.length; p++) {t(c[p], p, c);} else
        if ("object" == typeof c && !o(c))
        for (var l in c) {t(c[l], l, c);}
      }(i), r || e(i);
    };
  }, function (t, e, r) {
    "use strict";
    e.byteLength = function (t) {
      var e = h(t),
      r = e[0],
      n = e[1];
      return 3 * (r + n) / 4 - n;
    }, e.toByteArray = function (t) {
      var e,r,n = h(t),
      s = n[0],
      a = n[1],
      c = new i(function (t, e, r) {
        return 3 * (e + r) / 4 - r;
      }(0, s, a)),
      u = 0,
      f = a > 0 ? s - 4 : s;
      for (r = 0; r < f; r += 4) {e = o[t.charCodeAt(r)] << 18 | o[t.charCodeAt(r + 1)] << 12 | o[t.charCodeAt(r + 2)] <<
        6 | o[t.charCodeAt(r + 3)], c[u++] = e >> 16 & 255, c[u++] = e >> 8 & 255, c[u++] = 255 & e;}
      2 === a && (e = o[t.charCodeAt(r)] << 2 | o[t.charCodeAt(r + 1)] >> 4, c[u++] = 255 & e);
      1 === a && (e = o[t.charCodeAt(r)] << 10 | o[t.charCodeAt(r + 1)] << 4 | o[t.charCodeAt(r + 2)] >> 2, c[u++] =
      e >> 8 & 255, c[u++] = 255 & e);
      return c;
    }, e.fromByteArray = function (t) {
      for (var e, r = t.length, o = r % 3, i = [], s = 0, a = r - o; s < a; s += 16383) {i.push(u(t, s, s + 16383 > a ?
        a : s + 16383));}
      1 === o ? (e = t[r - 1], i.push(n[e >> 2] + n[e << 4 & 63] + "==")) : 2 === o && (e = (t[r - 2] << 8) + t[r -
      1], i.push(n[e >> 10] + n[e >> 4 & 63] + n[e << 2 & 63] + "="));
      return i.join("");
    };
    for (var n = [], o = [], i = "undefined" != typeof Uint8Array ? Uint8Array : Array, s =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", a = 0, c = s.length; a < c; ++a) {n[a] = s[
      a], o[s.charCodeAt(a)] = a;}

    function h(t) {
      var e = t.length;
      if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
      var r = t.indexOf("=");
      return -1 === r && (r = e), [r, r === e ? 0 : 4 - r % 4];
    }

    function u(t, e, r) {
      for (var o, i, s = [], a = e; a < r; a += 3) {o = (t[a] << 16 & 16711680) + (t[a + 1] << 8 & 65280) + (255 & t[a +
        2]), s.push(n[(i = o) >> 18 & 63] + n[i >> 12 & 63] + n[i >> 6 & 63] + n[63 & i]);}
      return s.join("");
    }
    o["-".charCodeAt(0)] = 62, o["_".charCodeAt(0)] = 63;
  }, function (t, e) {
    e.read = function (t, e, r, n, o) {
      var i,s,a = 8 * o - n - 1,
      c = (1 << a) - 1,
      h = c >> 1,
      u = -7,
      f = r ? o - 1 : 0,
      p = r ? -1 : 1,
      l = t[e + f];
      for (f += p, i = l & (1 << -u) - 1, l >>= -u, u += a; u > 0; i = 256 * i + t[e + f], f += p, u -= 8) {;}
      for (s = i & (1 << -u) - 1, i >>= -u, u += n; u > 0; s = 256 * s + t[e + f], f += p, u -= 8) {;}
      if (0 === i) i = 1 - h;else
      {
        if (i === c) return s ? NaN : 1 / 0 * (l ? -1 : 1);
        s += Math.pow(2, n), i -= h;
      }
      return (l ? -1 : 1) * s * Math.pow(2, i - n);
    }, e.write = function (t, e, r, n, o, i) {
      var s,a,c,h = 8 * i - o - 1,
      u = (1 << h) - 1,
      f = u >> 1,
      p = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
      l = n ? 0 : i - 1,
      d = n ? 1 : -1,
      y = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
      for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (a = isNaN(e) ? 1 : 0, s = u) : (s = Math.floor(Math.log(e) /
      Math.LN2), e * (c = Math.pow(2, -s)) < 1 && (s--, c *= 2), (e += s + f >= 1 ? p / c : p * Math.pow(2, 1 - f)) *
      c >= 2 && (s++, c /= 2), s + f >= u ? (a = 0, s = u) : s + f >= 1 ? (a = (e * c - 1) * Math.pow(2, o), s +=
      f) : (a = e * Math.pow(2, f - 1) * Math.pow(2, o), s = 0)); o >= 8; t[r + l] = 255 & a, l += d, a /= 256, o -=
      8) {;}
      for (s = s << o | a, h += o; h > 0; t[r + l] = 255 & s, l += d, s /= 256, h -= 8) {;}
      t[r + l - d] |= 128 * y;
    };
  }, function (t, e) {
    var r = {}.toString;
    t.exports = Array.isArray || function (t) {
      return "[object Array]" == r.call(t);
    };
  }, function (t, e, r) {
    t.exports = r(26), t.exports.parser = r(2);
  }, function (t, e, r) {
    var n = r(11),
    o = r(1),
    i = r(0)("engine.io-client:socket"),
    s = r(14),
    a = r(2),
    c = r(6),
    h = r(5);

    function u(t, e) {
      if (!(this instanceof u)) return new u(t, e);
      e = e || {}, t && "object" == typeof t && (e = t, t = null), t ? (t = c(t), e.hostname = t.host, e.secure =
      "https" === t.protocol || "wss" === t.protocol, e.port = t.port, t.query && (e.query = t.query)) : e.host && (
      e.hostname = c(e.host).host), this.secure = null != e.secure ? e.secure : "undefined" != typeof location &&
      "https:" === location.protocol, e.hostname && !e.port && (e.port = this.secure ? "443" : "80"), this.agent = e.
      agent || !1, this.hostname = e.hostname || ("undefined" != typeof location ? location.hostname : "localhost"),
      this.port = e.port || ("undefined" != typeof location && location.port ? location.port : this.secure ? 443 :
      80), this.query = e.query || {}, "string" == typeof this.query && (this.query = h.decode(this.query)), this.upgrade = !
      1 !== e.upgrade, this.path = (e.path || "/engine.io").replace(/\/$/, "") + "/", this.forceJSONP = !!e.forceJSONP,
      this.jsonp = !1 !== e.jsonp, this.forceBase64 = !!e.forceBase64, this.enablesXDR = !!e.enablesXDR, this.withCredentials = !
      1 !== e.withCredentials, this.timestampParam = e.timestampParam || "t", this.timestampRequests = e.timestampRequests,
      this.transports = e.transports || ["websocket"], this.transportOptions = e.transportOptions || {}, this.readyState =
      "", this.writeBuffer = [], this.prevBufferLen = 0, this.policyPort = e.policyPort || 843, this.rememberUpgrade =
      e.rememberUpgrade || !1, this.binaryType = null, this.onlyBinaryUpgrades = e.onlyBinaryUpgrades, this.perMessageDeflate = !
      1 !== e.perMessageDeflate && (e.perMessageDeflate || {}), !0 === this.perMessageDeflate && (this.perMessageDeflate = {}),
      this.perMessageDeflate && null == this.perMessageDeflate.threshold && (this.perMessageDeflate.threshold = 1024),
      this.pfx = e.pfx || null, this.key = e.key || null, this.passphrase = e.passphrase || null, this.cert = e.cert ||
      null, this.ca = e.ca || null, this.ciphers = e.ciphers || null, this.rejectUnauthorized = void 0 === e.rejectUnauthorized ||
      e.rejectUnauthorized, this.forceNode = !!e.forceNode, this.isReactNative = "undefined" != typeof navigator &&
      "string" == typeof navigator.product && "reactnative" === navigator.product.toLowerCase(), ("undefined" ==
      typeof self || this.isReactNative) && (e.extraHeaders && Object.keys(e.extraHeaders).length > 0 && (this.extraHeaders =
      e.extraHeaders), e.localAddress && (this.localAddress = e.localAddress)), this.id = null, this.upgrades =
      null, this.pingInterval = null, this.pingTimeout = null, this.pingIntervalTimer = null, this.pingTimeoutTimer =
      null, this.open();
    }
    t.exports = u, u.priorWebsocketSuccess = !1, o(u.prototype), u.protocol = a.protocol, u.Socket = u, u.Transport =
    r(12), u.transports = r(11), u.parser = r(2), u.prototype.createTransport = function (t) {
      i('creating transport "%s"', t);
      var e = function (t) {
        var e = {};
        for (var r in t) {t.hasOwnProperty(r) && (e[r] = t[r]);}
        return e;
      }(this.query);
      e.EIO = a.protocol, e.transport = t;
      var r = this.transportOptions[t] || {};
      return this.id && (e.sid = this.id), new n[t]({
        query: e,
        socket: this,
        agent: r.agent || this.agent,
        hostname: r.hostname || this.hostname,
        port: r.port || this.port,
        secure: r.secure || this.secure,
        path: r.path || this.path,
        forceJSONP: r.forceJSONP || this.forceJSONP,
        jsonp: r.jsonp || this.jsonp,
        forceBase64: r.forceBase64 || this.forceBase64,
        enablesXDR: r.enablesXDR || this.enablesXDR,
        withCredentials: r.withCredentials || this.withCredentials,
        timestampRequests: r.timestampRequests || this.timestampRequests,
        timestampParam: r.timestampParam || this.timestampParam,
        policyPort: r.policyPort || this.policyPort,
        pfx: r.pfx || this.pfx,
        key: r.key || this.key,
        passphrase: r.passphrase || this.passphrase,
        cert: r.cert || this.cert,
        ca: r.ca || this.ca,
        ciphers: r.ciphers || this.ciphers,
        rejectUnauthorized: r.rejectUnauthorized || this.rejectUnauthorized,
        perMessageDeflate: r.perMessageDeflate || this.perMessageDeflate,
        extraHeaders: r.extraHeaders || this.extraHeaders,
        forceNode: r.forceNode || this.forceNode,
        localAddress: r.localAddress || this.localAddress,
        requestTimeout: r.requestTimeout || this.requestTimeout,
        protocols: r.protocols || void 0,
        isReactNative: this.isReactNative });

    }, u.prototype.open = function () {
      var t;
      if (this.rememberUpgrade && u.priorWebsocketSuccess && -1 !== this.transports.indexOf("websocket")) t =
      "websocket";else
      {
        if (0 === this.transports.length) {
          var e = this;
          return void setTimeout(function () {
            e.emit("error", "No transports available");
          }, 0);
        }
        t = this.transports[0];
      }
      this.readyState = "opening";
      try {
        t = this.createTransport(t);
      } catch (t) {
        return this.transports.shift(), void this.open();
      }
      t.open(), this.setTransport(t);
    }, u.prototype.setTransport = function (t) {
      i("setting transport %s", t.name);
      var e = this;
      this.transport && (i("clearing existing transport %s", this.transport.name), this.transport.removeAllListeners()),
      this.transport = t, t.on("drain", function () {
        e.onDrain();
      }).on("packet", function (t) {
        e.onPacket(t);
      }).on("error", function (t) {
        e.onError(t);
      }).on("close", function () {
        e.onClose("transport close");
      });
    }, u.prototype.probe = function (t) {
      i('probing transport "%s"', t);
      var e = this.createTransport(t, {
        probe: 1 }),

      r = !1,
      n = this;

      function o() {
        if (n.onlyBinaryUpgrades) {
          var o = !this.supportsBinary && n.transport.supportsBinary;
          r = r || o;
        }
        r || (i('probe transport "%s" opened', t), e.send([{
          type: "ping",
          data: "probe" }]),
        e.once("packet", function (o) {
          if (!r)
          if ("pong" === o.type && "probe" === o.data) {
            if (i('probe transport "%s" pong', t), n.upgrading = !0, n.emit("upgrading", e), !e) return;
            u.priorWebsocketSuccess = "websocket" === e.name, i('pausing current transport "%s"', n.transport.name),
            n.transport.pause(function () {
              r || "closed" !== n.readyState && (i("changing transport and sending upgrade packet"), p(), n.setTransport(
              e), e.send([{
                type: "upgrade" }]),
              n.emit("upgrade", e), e = null, n.upgrading = !1, n.flush());
            });
          } else {
            i('probe transport "%s" failed', t);
            var s = new Error("probe error");
            s.transport = e.name, n.emit("upgradeError", s);
          }
        }));
      }

      function s() {
        r || (r = !0, p(), e.close(), e = null);
      }

      function a(r) {
        var o = new Error("probe error: " + r);
        o.transport = e.name, s(), i('probe transport "%s" failed because of error: %s', t, r), n.emit("upgradeError",
        o);
      }

      function c() {
        a("transport closed");
      }

      function h() {
        a("socket closed");
      }

      function f(t) {
        e && t.name !== e.name && (i('"%s" works - aborting "%s"', t.name, e.name), s());
      }

      function p() {
        e.removeListener("open", o), e.removeListener("error", a), e.removeListener("close", c), n.removeListener(
        "close", h), n.removeListener("upgrading", f);
      }
      u.priorWebsocketSuccess = !1, e.once("open", o), e.once("error", a), e.once("close", c), this.once("close", h),
      this.once("upgrading", f), e.open();
    }, u.prototype.onOpen = function () {
      if (i("socket open"), this.readyState = "open", u.priorWebsocketSuccess = "websocket" === this.transport.name,
      this.emit("open"), this.flush(), "open" === this.readyState && this.upgrade && this.transport.pause) {
        i("starting upgrade probes");
        for (var t = 0, e = this.upgrades.length; t < e; t++) {this.probe(this.upgrades[t]);}
      }
    }, u.prototype.onPacket = function (t) {
      if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) switch (i(
      'socket receive: type "%s", data "%s"', t.type, t.data), this.emit("packet", t), this.emit("heartbeat"), t.type) {
        case "open":
          this.onHandshake(JSON.parse(t.data));
          break;
        case "pong":
          this.setPing(), this.emit("pong");
          break;
        case "error":
          var e = new Error("server error");
          e.code = t.data, this.onError(e);
          break;
        case "message":
          this.emit("data", t.data), this.emit("message", t.data);} else
      i('packet received with socket readyState "%s"', this.readyState);
    }, u.prototype.onHandshake = function (t) {
      this.emit("handshake", t), this.id = t.sid, this.transport.query.sid = t.sid, this.upgrades = this.filterUpgrades(
      t.upgrades), this.pingInterval = t.pingInterval, this.pingTimeout = t.pingTimeout, this.onOpen(), "closed" !==
      this.readyState && (this.setPing(), this.removeListener("heartbeat", this.onHeartbeat), this.on("heartbeat",
      this.onHeartbeat));
    }, u.prototype.onHeartbeat = function (t) {
      clearTimeout(this.pingTimeoutTimer);
      var e = this;
      e.pingTimeoutTimer = setTimeout(function () {
        "closed" !== e.readyState && e.onClose("ping timeout");
      }, t || e.pingInterval + e.pingTimeout);
    }, u.prototype.setPing = function () {
      var t = this;
      clearTimeout(t.pingIntervalTimer), t.pingIntervalTimer = setTimeout(function () {
        i("writing ping packet - expecting pong within %sms", t.pingTimeout), t.ping(), t.onHeartbeat(t.pingTimeout);
      }, t.pingInterval);
    }, u.prototype.ping = function () {
      var t = this;
      this.sendPacket("ping", function () {
        t.emit("ping");
      });
    }, u.prototype.onDrain = function () {
      this.writeBuffer.splice(0, this.prevBufferLen), this.prevBufferLen = 0, 0 === this.writeBuffer.length ? this.emit(
      "drain") : this.flush();
    }, u.prototype.flush = function () {
      "closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (i(
      "flushing %d packets in socket", this.writeBuffer.length), this.transport.send(this.writeBuffer), this.prevBufferLen =
      this.writeBuffer.length, this.emit("flush"));
    }, u.prototype.write = u.prototype.send = function (t, e, r) {
      return this.sendPacket("message", t, e, r), this;
    }, u.prototype.sendPacket = function (t, e, r, n) {
      if ("function" == typeof e && (n = e, e = void 0), "function" == typeof r && (n = r, r = null), "closing" !==
      this.readyState && "closed" !== this.readyState) {
        (r = r || {}).compress = !1 !== r.compress;
        var o = {
          type: t,
          data: e,
          options: r };

        this.emit("packetCreate", o), this.writeBuffer.push(o), n && this.once("flush", n), this.flush();
      }
    }, u.prototype.close = function () {
      if ("opening" === this.readyState || "open" === this.readyState) {
        this.readyState = "closing";
        var t = this;
        this.writeBuffer.length ? this.once("drain", function () {
          this.upgrading ? n() : e();
        }) : this.upgrading ? n() : e();
      }

      function e() {
        t.onClose("forced close"), i("socket closing - telling transport to close"), t.transport.close();
      }

      function r() {
        t.removeListener("upgrade", r), t.removeListener("upgradeError", r), e();
      }

      function n() {
        t.once("upgrade", r), t.once("upgradeError", r);
      }
      return this;
    }, u.prototype.onError = function (t) {
      i("socket error %j", t), u.priorWebsocketSuccess = !1, this.emit("error", t), this.onClose("transport error",
      t);
    }, u.prototype.onClose = function (t, e) {
      if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
        i('socket close with reason: "%s"', t);
        clearTimeout(this.pingIntervalTimer), clearTimeout(this.pingTimeoutTimer), this.transport.removeAllListeners(
        "close"), this.transport.close(), this.transport.removeAllListeners(), this.readyState = "closed", this.id =
        null, this.emit("close", t, e), this.writeBuffer = [], this.prevBufferLen = 0;
      }
    }, u.prototype.filterUpgrades = function (t) {
      for (var e = [], r = 0, n = t.length; r < n; r++) {~s(this.transports, t[r]) && e.push(t[r]);}
      return e;
    };
  }, function (t, e, r) {
    (function (e) {
      var n,o,i = r(12),
      s = r(2),
      a = r(5),
      c = r(35),
      h = r(36),
      u = r(0)("engine.io-client:websocket");
      if ("undefined" != typeof WebSocket ? n = WebSocket : "undefined" != typeof self && (n = self.WebSocket ||
      self.MozWebSocket), "undefined" == typeof window || "undefined" != typeof window) try {
        o = r(37);
      } catch (t) {}
      var f = n || o;

      function p(t) {
        t && t.forceBase64 && (this.supportsBinary = !1), this.perMessageDeflate = t.perMessageDeflate, this.usingBrowserWebSocket =
        n && !t.forceNode, this.protocols = t.protocols, this.usingBrowserWebSocket || (f = o), i.call(this, t);
      }
      t.exports = p, c(p, i), p.prototype.name = "websocket", p.prototype.supportsBinary = !0, p.prototype.doOpen =
      function () {
        if (this.check()) {
          var t = this.uri(),
          e = this.protocols,
          r = {
            agent: this.agent,
            perMessageDeflate: this.perMessageDeflate };

          r.pfx = this.pfx, r.key = this.key, r.passphrase = this.passphrase, r.cert = this.cert, r.ca = this.ca, r.ciphers =
          this.ciphers, r.rejectUnauthorized = this.rejectUnauthorized, this.extraHeaders && (r.headers = this.extraHeaders),
          this.localAddress && (r.localAddress = this.localAddress);
          try {
            this.ws = this.usingBrowserWebSocket && !this.isReactNative ? e ? new f(t, e) : new f(t) : new f(t, e, r);
          } catch (t) {
            return this.emit("error", t);
          }
          void 0 === this.ws.binaryType && (this.supportsBinary = !1), this.ws.supports && this.ws.supports.binary ? (
          this.supportsBinary = !0, this.ws.binaryType = "nodebuffer") : this.ws.binaryType = "arraybuffer", this.addEventListeners();
        }
      }, p.prototype.addEventListeners = function () {
        var t = this;
        this.ws.onopen = function () {
          t.onOpen();
        }, this.ws.onclose = function () {
          t.onClose();
        }, this.ws.onmessage = function (e) {
          t.onData(e.data);
        }, this.ws.onerror = function (e) {
          t.onError("websocket error", e);
        };
      }, p.prototype.write = function (t) {
        var r = this;
        this.writable = !1;
        for (var n = t.length, o = 0, i = n; o < i; o++) {!function (t) {
            s.encodePacket(t, r.supportsBinary, function (o) {
              if (!r.usingBrowserWebSocket) {
                var i = {};
                if (t.options && (i.compress = t.options.compress), r.perMessageDeflate) ("string" == typeof o ? e.byteLength(
                o) : o.length) < r.perMessageDeflate.threshold && (i.compress = !1);
              }
              try {
                r.usingBrowserWebSocket ? r.ws.send(o) : r.ws.send(o, i);
              } catch (t) {
                u("websocket closed before onclose event");
              }--n || a();
            });
          }(t[o]);}

        function a() {
          r.emit("flush"), setTimeout(function () {
            r.writable = !0, r.emit("drain");
          }, 0);
        }
      }, p.prototype.onClose = function () {
        i.prototype.onClose.call(this);
      }, p.prototype.doClose = function () {
        void 0 !== this.ws && this.ws.close();
      }, p.prototype.uri = function () {
        var t = this.query || {},
        e = this.secure ? "wss" : "ws",
        r = "";
        return this.port && ("wss" === e && 443 !== Number(this.port) || "ws" === e && 80 !== Number(this.port)) && (
        r = ":" + this.port), this.timestampRequests && (t[this.timestampParam] = h()), this.supportsBinary || (t.b64 =
        1), (t = a.encode(t)).length && (t = "?" + t), e + "://" + (-1 !== this.hostname.indexOf(":") ? "[" + this.
        hostname + "]" : this.hostname) + r + this.path + t;
      }, p.prototype.check = function () {
        return !(!f || "__initialize" in f && this.name === p.prototype.name);
      };
    }).call(this, r(4).Buffer);
  }, function (t, e) {
    t.exports = Object.keys || function (t) {
      var e = [],
      r = Object.prototype.hasOwnProperty;
      for (var n in t) {r.call(t, n) && e.push(n);}
      return e;
    };
  }, function (t, e) {
    var r = {}.toString;
    t.exports = Array.isArray || function (t) {
      return "[object Array]" == r.call(t);
    };
  }, function (t, e) {
    t.exports = function (t, e, r) {
      var n = t.byteLength;
      if (e = e || 0, r = r || n, t.slice) return t.slice(e, r);
      if (e < 0 && (e += n), r < 0 && (r += n), r > n && (r = n), e >= n || e >= r || 0 === n) return new ArrayBuffer(
      0);
      for (var o = new Uint8Array(t), i = new Uint8Array(r - e), s = e, a = 0; s < r; s++, a++) {i[a] = o[s];}
      return i.buffer;
    };
  }, function (t, e) {
    function r() {}
    t.exports = function (t, e, n) {
      var o = !1;
      return n = n || r, i.count = t, 0 === t ? e() : i;

      function i(t, r) {
        if (i.count <= 0) throw new Error("after called too many times");
        --i.count, t ? (o = !0, e(t), e = n) : 0 !== i.count || o || e(null, r);
      }
    };
  }, function (t, e) {
    /*! https://mths.be/utf8js v2.1.2 by @mathias */
    var r,n,o,i = String.fromCharCode;

    function s(t) {
      for (var e, r, n = [], o = 0, i = t.length; o < i;) {(e = t.charCodeAt(o++)) >= 55296 && e <= 56319 && o < i ?
        56320 == (64512 & (r = t.charCodeAt(o++))) ? n.push(((1023 & e) << 10) + (1023 & r) + 65536) : (n.push(e), o--) :
        n.push(e);}
      return n;
    }

    function a(t, e) {
      if (t >= 55296 && t <= 57343) {
        if (e) throw Error("Lone surrogate U+" + t.toString(16).toUpperCase() + " is not a scalar value");
        return !1;
      }
      return !0;
    }

    function c(t, e) {
      return i(t >> e & 63 | 128);
    }

    function h(t, e) {
      if (0 == (4294967168 & t)) return i(t);
      var r = "";
      return 0 == (4294965248 & t) ? r = i(t >> 6 & 31 | 192) : 0 == (4294901760 & t) ? (a(t, e) || (t = 65533), r =
      i(t >> 12 & 15 | 224), r += c(t, 6)) : 0 == (4292870144 & t) && (r = i(t >> 18 & 7 | 240), r += c(t, 12), r +=
      c(t, 6)), r += i(63 & t | 128);
    }

    function u() {
      if (o >= n) throw Error("Invalid byte index");
      var t = 255 & r[o];
      if (o++, 128 == (192 & t)) return 63 & t;
      throw Error("Invalid continuation byte");
    }

    function f(t) {
      var e, i;
      if (o > n) throw Error("Invalid byte index");
      if (o == n) return !1;
      if (e = 255 & r[o], o++, 0 == (128 & e)) return e;
      if (192 == (224 & e)) {
        if ((i = (31 & e) << 6 | u()) >= 128) return i;
        throw Error("Invalid continuation byte");
      }
      if (224 == (240 & e)) {
        if ((i = (15 & e) << 12 | u() << 6 | u()) >= 2048) return a(i, t) ? i : 65533;
        throw Error("Invalid continuation byte");
      }
      if (240 == (248 & e) && (i = (7 & e) << 18 | u() << 12 | u() << 6 | u()) >= 65536 && i <= 1114111) return i;
      throw Error("Invalid UTF-8 detected");
    }
    t.exports = {
      version: "2.1.2",
      encode: function encode(t, e) {
        for (var r = !1 !== (e = e || {}).strict, n = s(t), o = n.length, i = -1, a = ""; ++i < o;) {a += h(n[i], r);}
        return a;
      },
      decode: function decode(t, e) {
        var a = !1 !== (e = e || {}).strict;
        r = s(t), n = r.length, o = 0;
        for (var c, h = []; !1 !== (c = f(a));) {h.push(c);}
        return function (t) {
          for (var e, r = t.length, n = -1, o = ""; ++n < r;) {(e = t[n]) > 65535 && (o += i((e -= 65536) >>> 10 &
            1023 | 55296), e = 56320 | 1023 & e), o += i(e);}
          return o;
        }(h);
      } };

  }, function (t, e) {
    !function () {
      "use strict";
      for (var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", r = new Uint8Array(256), n = 0; n <
      t.length; n++) {r[t.charCodeAt(n)] = n;}
      e.encode = function (e) {
        var r,n = new Uint8Array(e),
        o = n.length,
        i = "";
        for (r = 0; r < o; r += 3) {i += t[n[r] >> 2], i += t[(3 & n[r]) << 4 | n[r + 1] >> 4], i += t[(15 & n[r + 1]) <<
          2 | n[r + 2] >> 6], i += t[63 & n[r + 2]];}
        return o % 3 == 2 ? i = i.substring(0, i.length - 1) + "=" : o % 3 == 1 && (i = i.substring(0, i.length - 2) +
        "=="), i;
      }, e.decode = function (t) {
        var e,n,o,i,s,a = .75 * t.length,
        c = t.length,
        h = 0;
        "=" === t[t.length - 1] && (a--, "=" === t[t.length - 2] && a--);
        var u = new ArrayBuffer(a),
        f = new Uint8Array(u);
        for (e = 0; e < c; e += 4) {n = r[t.charCodeAt(e)], o = r[t.charCodeAt(e + 1)], i = r[t.charCodeAt(e + 2)], s =
          r[t.charCodeAt(e + 3)], f[h++] = n << 2 | o >> 4, f[h++] = (15 & o) << 4 | i >> 2, f[h++] = (3 & i) << 6 |
          63 & s;}
        return u;
      };
    }();
  }, function (t, e) {
    var r = void 0 !== r ? r : "undefined" != typeof WebKitBlobBuilder ? WebKitBlobBuilder : "undefined" != typeof MSBlobBuilder ?
    MSBlobBuilder : "undefined" != typeof MozBlobBuilder && MozBlobBuilder,
    n = function () {
      try {
        return 2 === new Blob(["hi"]).size;
      } catch (t) {
        return !1;
      }
    }(),
    o = n && function () {
      try {
        return 2 === new Blob([new Uint8Array([1, 2])]).size;
      } catch (t) {
        return !1;
      }
    }(),
    i = r && r.prototype.append && r.prototype.getBlob;

    function s(t) {
      return t.map(function (t) {
        if (t.buffer instanceof ArrayBuffer) {
          var e = t.buffer;
          if (t.byteLength !== e.byteLength) {
            var r = new Uint8Array(t.byteLength);
            r.set(new Uint8Array(e, t.byteOffset, t.byteLength)), e = r.buffer;
          }
          return e;
        }
        return t;
      });
    }

    function a(t, e) {
      e = e || {};
      var n = new r();
      return s(t).forEach(function (t) {
        n.append(t);
      }), e.type ? n.getBlob(e.type) : n.getBlob();
    }

    function c(t, e) {
      return new Blob(s(t), e || {});
    }
    "undefined" != typeof Blob && (a.prototype = Blob.prototype, c.prototype = Blob.prototype), t.exports = n ? o ?
    Blob : c : i ? a : void 0;
  }, function (t, e) {
    t.exports = function (t, e) {
      var r = function r() {};
      r.prototype = e.prototype, t.prototype = new r(), t.prototype.constructor = t;
    };
  }, function (t, e, r) {
    "use strict";
    var n,o = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),
    i = {},
    s = 0,
    a = 0;

    function c(t) {
      var e = "";
      do {
        e = o[t % 64] + e, t = Math.floor(t / 64);
      } while (t > 0);
      return e;
    }

    function h() {
      var t = c(+new Date());
      return t !== n ? (s = 0, n = t) : t + "." + c(s++);
    }
    for (; a < 64; a++) {i[o[a]] = a;}
    h.encode = c, h.decode = function (t) {
      var e = 0;
      for (a = 0; a < t.length; a++) {e = 64 * e + i[t.charAt(a)];}
      return e;
    }, t.exports = h;
  }, function (t, e, r) {
    var n = r(38),_r =


    r(39),o = _r.URL,_r2 =



    r(46),i = _r2.addEventListener,s = _r2.removeEventListener,
    a = r(47),
    c = r(0)("wx-ws:wx-ws"),
    h = ["nodebuffer", "arraybuffer"],
    u = ["CONNECTING", "OPEN", "CLOSING", "CLOSED"];var
    f = /*#__PURE__*/function (_n) {"use strict";_inherits(f, _n);var _super = _createSuper(f);
      function f(t, e, r) {var _this;_classCallCheck(this, f);
        _this = _super.call(this), c("constructor: ", t, e, r), _this.readyState = f.CONNECTING, _this.protocol = "", _this._closeCode =
        1006, _this._closeMessage = "", _this._binaryType = h[0], _this._socket = null, _this.supports = {
          binary: !0 },
        null !== t && (_this._bufferedAmount = 0, _this._redirects = 0, "object" == typeof e && null !== e && (r =
        e, e = void 0), function (t, e, r, n) {
          var o = _objectSpread({
            maxPayload: 104857600,
            perMessageDeflate: !0 },
          n);

          c("initAsClient: opts: ", o), t.url = e;
          var i = function (t, e) {
            c("start create conn: ", t);
            var r = wx.connectSocket(t);
            if (r) return r;
            return {
              onClose: wx.onSocketClose,
              onOpen: wx.onSocketOpen,
              onError: wx.onSocketError,
              onMessage: wx.onSocketMessage,
              send: wx.sendSocketMessage,
              close: wx.closeSocket };

          }({
            url: t.url,
            header: o.headers,
            protocols: r,
            perMessageDeflate: !!o.perMessageDeflate,
            tcpNoDelay: !!o.tcpNoDelay });

          t.setSocket(i);
        }(_assertThisInitialized(_this), t, e, r));return _this;
      }_createClass(f, [{ key: "setSocket", value: function setSocket(





















        t, e) {var _this2 = this;
          this._socket = t, this._sender = new a(t), c("set socket: socket =", t, ", head =", e, ", this: ", this),
          this._socket.onOpen(function (t) {
            c("socket onopen: ", t), _this2.readyState = f.OPEN, _this2.emit("open", t);
          }), this._socket.onClose(function (t) {
            c("socket onclose: ", t), _this2._closeCode = t.code, _this2._closeMessage = t.reason, _this2.emitClose();
          }), this._socket.onError(function (t) {
            c("socket onerror: ", t), _this2.emit("error", t);
          }), this._socket.onMessage(function (t) {
            c("socket onmessage: ", t, _this2), _this2.emit("message", t.data);
          });
        } }, { key: "emitClose", value: function emitClose()
        {
          this.readyState = f.CLOSED, this.removeEventListener(), this.emit("close", this._closeCode, this._closeMessage);
        } }, { key: "send", value: function send(
        t, e, r) {
          if (c("socket send msg: ", t, this.readyState, ", sender: ", this._sender), this.readyState === f.CONNECTING)
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
          if ("number" == typeof t && (t = t.toString()), this.readyState === f.OPEN) this._sender.send(t, e, r);else
          if (r) {
            r(new Error("WebSocket is not open: readyState ".concat(this.readyState, " ") + "(".concat(u[this.readyState], ")")));
          }
        } }, { key: "close", value: function close(
        t, e) {var _this3 = this;
          if (c("closing connection: ", this.readyState), this.readyState !== f.CLOSED) {
            if (this.readyState === f.CONNECTING) {
              throw new Error("WebSocket was closed before the connection was established");
            }
            this.readyState !== f.CLOSING && (this.readyState = f.CLOSING, this._socket.close({
              code: t,
              reason: e,
              success: function success() {
                c("connection closed..."), _this3.readyState = f.CLOSED, _this3._socket = null;
              } }));

          }
        } }, { key: "CONNECTING", get: function get() {return f.CONNECTING;} }, { key: "CLOSING", get: function get() {return f.CLOSING;} }, { key: "CLOSED", get: function get() {return f.CLOSED;} }, { key: "OPEN", get: function get() {return f.OPEN;} }, { key: "bufferedAmount", get: function get() {return this._socket ? (this._socket.bufferSize || 0) + this._sender._bufferedBytes : this._bufferedAmount;} }, { key: "binaryType", get: function get() {return this._binaryType;}, set: function set(t) {c("set binaryType: ", t), h.includes(t) && (this._binaryType = t);} }]);return f;}(n);

    u.forEach(function (t, e) {
      f[t] = e;
    }), ["open", "error", "close", "message"].forEach(function (t) {
      Object.defineProperty(f.prototype, "on".concat(t), {
        get: function get() {
          var e = this.listeners(t);
          for (var _t = 0; _t < e.length; _t++) {
            if (e[_t]._listener) return e[_t]._listener;}
        },
        set: function set(e) {
          var r = this.listeners(t);
          for (var _e = 0; _e < r.length; _e++) {r[_e]._listener && this.removeListener(t, r[_e]);}
          this.addEventListener(t, e);
        } });

    }), f.prototype.addEventListener = i, f.prototype.removeEventListener = s, t.exports = f;
  }, function (t, e, r) {
    "use strict";
    var n,o = "object" == typeof Reflect ? Reflect : null,
    i = o && "function" == typeof o.apply ? o.apply : function (t, e, r) {
      return Function.prototype.apply.call(t, e, r);
    };
    n = o && "function" == typeof o.ownKeys ? o.ownKeys : Object.getOwnPropertySymbols ? function (t) {
      return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t));
    } : function (t) {
      return Object.getOwnPropertyNames(t);
    };
    var s = Number.isNaN || function (t) {
      return t != t;
    };

    function a() {
      a.init.call(this);
    }
    t.exports = a, a.EventEmitter = a, a.prototype._events = void 0, a.prototype._eventsCount = 0, a.prototype._maxListeners =
    void 0;
    var c = 10;

    function h(t) {
      if ("function" != typeof t) throw new TypeError(
      'The "listener" argument must be of type Function. Received type ' + typeof t);
    }

    function u(t) {
      return void 0 === t._maxListeners ? a.defaultMaxListeners : t._maxListeners;
    }

    function f(t, e, r, n) {
      var o, i, s, a;
      if (h(r), void 0 === (i = t._events) ? (i = t._events = Object.create(null), t._eventsCount = 0) : (void 0 !==
      i.newListener && (t.emit("newListener", e, r.listener ? r.listener : r), i = t._events), s = i[e]), void 0 ===
      s) s = i[e] = r, ++t._eventsCount;else
      if ("function" == typeof s ? s = i[e] = n ? [r, s] : [s, r] : n ? s.unshift(r) : s.push(r), (o = u(t)) > 0 &&
      s.length > o && !s.warned) {
        s.warned = !0;
        var c = new Error("Possible EventEmitter memory leak detected. " + s.length + " " + String(e) +
        " listeners added. Use emitter.setMaxListeners() to increase limit");
        c.name = "MaxListenersExceededWarning", c.emitter = t, c.type = e, c.count = s.length, a = c, console &&
        console.warn && console.warn(a);
      }
      return t;
    }

    function p() {
      if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, 0 === arguments.length ?
      this.listener.call(this.target) : this.listener.apply(this.target, arguments);
    }

    function l(t, e, r) {
      var n = {
        fired: !1,
        wrapFn: void 0,
        target: t,
        type: e,
        listener: r },

      o = p.bind(n);
      return o.listener = r, n.wrapFn = o, o;
    }

    function d(t, e, r) {
      var n = t._events;
      if (void 0 === n) return [];
      var o = n[e];
      return void 0 === o ? [] : "function" == typeof o ? r ? [o.listener || o] : [o] : r ? function (t) {
        for (var e = new Array(t.length), r = 0; r < e.length; ++r) {e[r] = t[r].listener || t[r];}
        return e;
      }(o) : g(o, o.length);
    }

    function y(t) {
      var e = this._events;
      if (void 0 !== e) {
        var r = e[t];
        if ("function" == typeof r) return 1;
        if (void 0 !== r) return r.length;
      }
      return 0;
    }

    function g(t, e) {
      for (var r = new Array(e), n = 0; n < e; ++n) {r[n] = t[n];}
      return r;
    }
    Object.defineProperty(a, "defaultMaxListeners", {
      enumerable: !0,
      get: function get() {
        return c;
      },
      set: function set(t) {
        if ("number" != typeof t || t < 0 || s(t)) throw new RangeError(
        'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + t +
        ".");
        c = t;
      } }),
    a.init = function () {
      void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = Object.create(
      null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
    }, a.prototype.setMaxListeners = function (t) {
      if ("number" != typeof t || t < 0 || s(t)) throw new RangeError(
      'The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
      return this._maxListeners = t, this;
    }, a.prototype.getMaxListeners = function () {
      return u(this);
    }, a.prototype.emit = function (t) {
      for (var e = [], r = 1; r < arguments.length; r++) {e.push(arguments[r]);}
      var n = "error" === t,
      o = this._events;
      if (void 0 !== o) n = n && void 0 === o.error;else
      if (!n) return !1;
      if (n) {
        var s;
        if (e.length > 0 && (s = e[0]), s instanceof Error) throw s;
        var a = new Error("Unhandled error." + (s ? " (" + s.message + ")" : ""));
        throw a.context = s, a;
      }
      var c = o[t];
      if (void 0 === c) return !1;
      if ("function" == typeof c) i(c, this, e);else
      {
        var h = c.length,
        u = g(c, h);
        for (r = 0; r < h; ++r) {i(u[r], this, e);}
      }
      return !0;
    }, a.prototype.addListener = function (t, e) {
      return f(this, t, e, !1);
    }, a.prototype.on = a.prototype.addListener, a.prototype.prependListener = function (t, e) {
      return f(this, t, e, !0);
    }, a.prototype.once = function (t, e) {
      return h(e), this.on(t, l(this, t, e)), this;
    }, a.prototype.prependOnceListener = function (t, e) {
      return h(e), this.prependListener(t, l(this, t, e)), this;
    }, a.prototype.removeListener = function (t, e) {
      var r, n, o, i, s;
      if (h(e), void 0 === (n = this._events)) return this;
      if (void 0 === (r = n[t])) return this;
      if (r === e || r.listener === e) 0 == --this._eventsCount ? this._events = Object.create(null) : (delete n[t],
      n.removeListener && this.emit("removeListener", t, r.listener || e));else
      if ("function" != typeof r) {
        for (o = -1, i = r.length - 1; i >= 0; i--) {
          if (r[i] === e || r[i].listener === e) {
            s = r[i].listener, o = i;
            break;
          }}if (o < 0) return this;
        0 === o ? r.shift() : function (t, e) {
          for (; e + 1 < t.length; e++) {t[e] = t[e + 1];}
          t.pop();
        }(r, o), 1 === r.length && (n[t] = r[0]), void 0 !== n.removeListener && this.emit("removeListener", t, s ||
        e);
      }
      return this;
    }, a.prototype.off = a.prototype.removeListener, a.prototype.removeAllListeners = function (t) {
      var e, r, n;
      if (void 0 === (r = this._events)) return this;
      if (void 0 === r.removeListener) return 0 === arguments.length ? (this._events = Object.create(null), this._eventsCount =
      0) : void 0 !== r[t] && (0 == --this._eventsCount ? this._events = Object.create(null) : delete r[t]), this;
      if (0 === arguments.length) {
        var o,i = Object.keys(r);
        for (n = 0; n < i.length; ++n) {"removeListener" !== (o = i[n]) && this.removeAllListeners(o);}
        return this.removeAllListeners("removeListener"), this._events = Object.create(null), this._eventsCount = 0,
        this;
      }
      if ("function" == typeof (e = r[t])) this.removeListener(t, e);else
      if (void 0 !== e)
      for (n = e.length - 1; n >= 0; n--) {this.removeListener(t, e[n]);}
      return this;
    }, a.prototype.listeners = function (t) {
      return d(this, t, !0);
    }, a.prototype.rawListeners = function (t) {
      return d(this, t, !1);
    }, a.listenerCount = function (t, e) {
      return "function" == typeof t.listenerCount ? t.listenerCount(e) : y.call(t, e);
    }, a.prototype.listenerCount = y, a.prototype.eventNames = function () {
      return this._eventsCount > 0 ? n(this._events) : [];
    };
  }, function (t, e, r) {
    "use strict";
    var n = r(40),
    o = r(42);

    function i() {
      this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname =
      null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href =
      null;
    }
    e.parse = b, e.resolve = function (t, e) {
      return b(t, !1, !0).resolve(e);
    }, e.resolveObject = function (t, e) {
      return t ? b(t, !1, !0).resolveObject(e) : e;
    }, e.format = function (t) {
      o.isString(t) && (t = b(t));
      return t instanceof i ? t.format() : i.prototype.format.call(t);
    }, e.Url = i;
    var s = /^([a-z0-9.+-]+:)/i,
    a = /:[0-9]*$/,
    c = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
    h = ["{", "}", "|", "\\", "^", "`"].concat(["<", ">", '"', "`", " ", "\r", "\n", "\t"]),
    u = ["'"].concat(h),
    f = ["%", "/", "?", ";", "#"].concat(u),
    p = ["/", "?", "#"],
    l = /^[+a-z0-9A-Z_-]{0,63}$/,
    d = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    y = {
      javascript: !0,
      "javascript:": !0 },

    g = {
      javascript: !0,
      "javascript:": !0 },

    v = {
      http: !0,
      https: !0,
      ftp: !0,
      gopher: !0,
      file: !0,
      "http:": !0,
      "https:": !0,
      "ftp:": !0,
      "gopher:": !0,
      "file:": !0 },

    m = r(43);

    function b(t, e, r) {
      if (t && o.isObject(t) && t instanceof i) return t;
      var n = new i();
      return n.parse(t, e, r), n;
    }
    i.prototype.parse = function (t, e, r) {
      if (!o.isString(t)) throw new TypeError("Parameter 'url' must be a string, not " + typeof t);
      var i = t.indexOf("?"),
      a = -1 !== i && i < t.indexOf("#") ? "?" : "#",
      h = t.split(a);
      h[0] = h[0].replace(/\\/g, "/");
      var b = t = h.join(a);
      if (b = b.trim(), !r && 1 === t.split("#").length) {
        var w = c.exec(b);
        if (w) return this.path = b, this.href = b, this.pathname = w[1], w[2] ? (this.search = w[2], this.query = e ?
        m.parse(this.search.substr(1)) : this.search.substr(1)) : e && (this.search = "", this.query = {}), this;
      }
      var A = s.exec(b);
      if (A) {
        var k = (A = A[0]).toLowerCase();
        this.protocol = k, b = b.substr(A.length);
      }
      if (r || A || b.match(/^\/\/[^@\/]+@[^@\/]+/)) {
        var _ = "//" === b.substr(0, 2);
        !_ || A && g[A] || (b = b.substr(2), this.slashes = !0);
      }
      if (!g[A] && (_ || A && !v[A])) {
        for (var E, B, S = -1, C = 0; C < p.length; C++) {
          -1 !== (R = b.indexOf(p[C])) && (-1 === S || R < S) && (S = R);
        }-1 !== (B = -1 === S ? b.lastIndexOf("@") : b.lastIndexOf("@", S)) && (E = b.slice(0, B), b = b.slice(B +
        1), this.auth = decodeURIComponent(E)), S = -1;
        for (C = 0; C < f.length; C++) {
          var R;-1 !== (R = b.indexOf(f[C])) && (-1 === S || R < S) && (S = R);
        }-1 === S && (S = b.length), this.host = b.slice(0, S), b = b.slice(S), this.parseHost(), this.hostname =
        this.hostname || "";
        var O = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
        if (!O)
        for (var x = this.hostname.split(/\./), P = (C = 0, x.length); C < P; C++) {
          var T = x[C];
          if (T && !T.match(l)) {
            for (var N = "", L = 0, j = T.length; L < j; L++) {T.charCodeAt(L) > 127 ? N += "x" : N += T[L];}
            if (!N.match(l)) {
              var I = x.slice(0, C),
              U = x.slice(C + 1),
              M = T.match(d);
              M && (I.push(M[1]), U.unshift(M[2])), U.length && (b = "/" + U.join(".") + b), this.hostname = I.join(".");
              break;
            }
          }
        }
        this.hostname.length > 255 ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), O || (this.hostname =
        n.toASCII(this.hostname));
        var D = this.port ? ":" + this.port : "",
        q = this.hostname || "";
        this.host = q + D, this.href += this.host, O && (this.hostname = this.hostname.substr(1, this.hostname.length -
        2), "/" !== b[0] && (b = "/" + b));
      }
      if (!y[k])
      for (C = 0, P = u.length; C < P; C++) {
        var Y = u[C];
        if (-1 !== b.indexOf(Y)) {
          var F = encodeURIComponent(Y);
          F === Y && (F = escape(Y)), b = b.split(Y).join(F);
        }
      }
      var z = b.indexOf("#");-1 !== z && (this.hash = b.substr(z), b = b.slice(0, z));
      var W = b.indexOf("?");
      if (-1 !== W ? (this.search = b.substr(W), this.query = b.substr(W + 1), e && (this.query = m.parse(this.query)),
      b = b.slice(0, W)) : e && (this.search = "", this.query = {}), b && (this.pathname = b), v[k] && this.hostname &&
      !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
        D = this.pathname || "";
        var H = this.search || "";
        this.path = D + H;
      }
      return this.href = this.format(), this;
    }, i.prototype.format = function () {
      var t = this.auth || "";
      t && (t = (t = encodeURIComponent(t)).replace(/%3A/i, ":"), t += "@");
      var e = this.protocol || "",
      r = this.pathname || "",
      n = this.hash || "",
      i = !1,
      s = "";
      this.host ? i = t + this.host : this.hostname && (i = t + (-1 === this.hostname.indexOf(":") ? this.hostname :
      "[" + this.hostname + "]"), this.port && (i += ":" + this.port)), this.query && o.isObject(this.query) &&
      Object.keys(this.query).length && (s = m.stringify(this.query));
      var a = this.search || s && "?" + s || "";
      return e && ":" !== e.substr(-1) && (e += ":"), this.slashes || (!e || v[e]) && !1 !== i ? (i = "//" + (i ||
      ""), r && "/" !== r.charAt(0) && (r = "/" + r)) : i || (i = ""), n && "#" !== n.charAt(0) && (n = "#" + n),
      a && "?" !== a.charAt(0) && (a = "?" + a), e + i + (r = r.replace(/[?#]/g, function (t) {
        return encodeURIComponent(t);
      })) + (a = a.replace("#", "%23")) + n;
    }, i.prototype.resolve = function (t) {
      return this.resolveObject(b(t, !1, !0)).format();
    }, i.prototype.resolveObject = function (t) {
      if (o.isString(t)) {
        var e = new i();
        e.parse(t, !1, !0), t = e;
      }
      for (var r = new i(), n = Object.keys(this), s = 0; s < n.length; s++) {
        var a = n[s];
        r[a] = this[a];
      }
      if (r.hash = t.hash, "" === t.href) return r.href = r.format(), r;
      if (t.slashes && !t.protocol) {
        for (var c = Object.keys(t), h = 0; h < c.length; h++) {
          var u = c[h];
          "protocol" !== u && (r[u] = t[u]);
        }
        return v[r.protocol] && r.hostname && !r.pathname && (r.path = r.pathname = "/"), r.href = r.format(), r;
      }
      if (t.protocol && t.protocol !== r.protocol) {
        if (!v[t.protocol]) {
          for (var f = Object.keys(t), p = 0; p < f.length; p++) {
            var l = f[p];
            r[l] = t[l];
          }
          return r.href = r.format(), r;
        }
        if (r.protocol = t.protocol, t.host || g[t.protocol]) r.pathname = t.pathname;else
        {
          for (var d = (t.pathname || "").split("/"); d.length && !(t.host = d.shift());) {;}
          t.host || (t.host = ""), t.hostname || (t.hostname = ""), "" !== d[0] && d.unshift(""), d.length < 2 && d.unshift(
          ""), r.pathname = d.join("/");
        }
        if (r.search = t.search, r.query = t.query, r.host = t.host || "", r.auth = t.auth, r.hostname = t.hostname ||
        t.host, r.port = t.port, r.pathname || r.search) {
          var y = r.pathname || "",
          m = r.search || "";
          r.path = y + m;
        }
        return r.slashes = r.slashes || t.slashes, r.href = r.format(), r;
      }
      var b = r.pathname && "/" === r.pathname.charAt(0),
      w = t.host || t.pathname && "/" === t.pathname.charAt(0),
      A = w || b || r.host && t.pathname,
      k = A,
      _ = r.pathname && r.pathname.split("/") || [],
      E = (d = t.pathname && t.pathname.split("/") || [], r.protocol && !v[r.protocol]);
      if (E && (r.hostname = "", r.port = null, r.host && ("" === _[0] ? _[0] = r.host : _.unshift(r.host)), r.host =
      "", t.protocol && (t.hostname = null, t.port = null, t.host && ("" === d[0] ? d[0] = t.host : d.unshift(t.host)),
      t.host = null), A = A && ("" === d[0] || "" === _[0])), w) r.host = t.host || "" === t.host ? t.host : r.host,
      r.hostname = t.hostname || "" === t.hostname ? t.hostname : r.hostname, r.search = t.search, r.query = t.query,
      _ = d;else
      if (d.length) _ || (_ = []), _.pop(), _ = _.concat(d), r.search = t.search, r.query = t.query;else
      if (!o.isNullOrUndefined(t.search)) {
        if (E) r.hostname = r.host = _.shift(), (O = !!(r.host && r.host.indexOf("@") > 0) && r.host.split("@")) && (
        r.auth = O.shift(), r.host = r.hostname = O.shift());
        return r.search = t.search, r.query = t.query, o.isNull(r.pathname) && o.isNull(r.search) || (r.path = (r.pathname ?
        r.pathname : "") + (r.search ? r.search : "")), r.href = r.format(), r;
      }
      if (!_.length) return r.pathname = null, r.search ? r.path = "/" + r.search : r.path = null, r.href = r.format(),
      r;
      for (var B = _.slice(-1)[0], S = (r.host || t.host || _.length > 1) && ("." === B || ".." === B) || "" === B,
      C = 0, R = _.length; R >= 0; R--) {"." === (B = _[R]) ? _.splice(R, 1) : ".." === B ? (_.splice(R, 1), C++) :
        C && (_.splice(R, 1), C--);}
      if (!A && !k)
      for (; C--; C) {_.unshift("..");}
      !A || "" === _[0] || _[0] && "/" === _[0].charAt(0) || _.unshift(""), S && "/" !== _.join("/").substr(-1) && _.
      push("");
      var O,x = "" === _[0] || _[0] && "/" === _[0].charAt(0);
      E && (r.hostname = r.host = x ? "" : _.length ? _.shift() : "", (O = !!(r.host && r.host.indexOf("@") > 0) &&
      r.host.split("@")) && (r.auth = O.shift(), r.host = r.hostname = O.shift()));
      return (A = A || r.host && _.length) && !x && _.unshift(""), _.length ? r.pathname = _.join("/") : (r.pathname =
      null, r.path = null), o.isNull(r.pathname) && o.isNull(r.search) || (r.path = (r.pathname ? r.pathname : "") + (
      r.search ? r.search : "")), r.auth = t.auth || r.auth, r.slashes = r.slashes || t.slashes, r.href = r.format(),
      r;
    }, i.prototype.parseHost = function () {
      var t = this.host,
      e = a.exec(t);
      e && (":" !== (e = e[0]) && (this.port = e.substr(1)), t = t.substr(0, t.length - e.length)), t && (this.hostname =
      t);
    };
  }, function (t, e, r) {
    (function (t, n) {
      var o; /*! https://mths.be/punycode v1.4.1 by @mathias */
      !function (i) {
        e && e.nodeType, t && t.nodeType;
        var s = "object" == typeof n && n;
        s.global !== s && s.window !== s && s.self;
        var a,c = 2147483647,
        h = /^xn--/,
        u = /[^\x20-\x7E]/,
        f = /[\x2E\u3002\uFF0E\uFF61]/g,
        p = {
          overflow: "Overflow: input needs wider integers to process",
          "not-basic": "Illegal input >= 0x80 (not a basic code point)",
          "invalid-input": "Invalid input" },

        l = Math.floor,
        d = String.fromCharCode;

        function y(t) {
          throw new RangeError(p[t]);
        }

        function g(t, e) {
          for (var r = t.length, n = []; r--;) {n[r] = e(t[r]);}
          return n;
        }

        function v(t, e) {
          var r = t.split("@"),
          n = "";
          return r.length > 1 && (n = r[0] + "@", t = r[1]), n + g((t = t.replace(f, ".")).split("."), e).join(".");
        }

        function m(t) {
          for (var e, r, n = [], o = 0, i = t.length; o < i;) {(e = t.charCodeAt(o++)) >= 55296 && e <= 56319 && o < i ?
            56320 == (64512 & (r = t.charCodeAt(o++))) ? n.push(((1023 & e) << 10) + (1023 & r) + 65536) : (n.push(e),
            o--) : n.push(e);}
          return n;
        }

        function b(t) {
          return g(t, function (t) {
            var e = "";
            return t > 65535 && (e += d((t -= 65536) >>> 10 & 1023 | 55296), t = 56320 | 1023 & t), e += d(t);
          }).join("");
        }

        function w(t, e) {
          return t + 22 + 75 * (t < 26) - ((0 != e) << 5);
        }

        function A(t, e, r) {
          var n = 0;
          for (t = r ? l(t / 700) : t >> 1, t += l(t / e); t > 455; n += 36) {t = l(t / 35);}
          return l(n + 36 * t / (t + 38));
        }

        function k(t) {
          var e,r,n,o,i,s,a,h,u,f,p,d = [],
          g = t.length,
          v = 0,
          m = 128,
          w = 72;
          for ((r = t.lastIndexOf("-")) < 0 && (r = 0), n = 0; n < r; ++n) {t.charCodeAt(n) >= 128 && y("not-basic"), d.
            push(t.charCodeAt(n));}
          for (o = r > 0 ? r + 1 : 0; o < g;) {
            for (i = v, s = 1, a = 36; o >= g && y("invalid-input"), ((h = (p = t.charCodeAt(o++)) - 48 < 10 ? p - 22 :
            p - 65 < 26 ? p - 65 : p - 97 < 26 ? p - 97 : 36) >= 36 || h > l((c - v) / s)) && y("overflow"), v += h *
            s, !(h < (u = a <= w ? 1 : a >= w + 26 ? 26 : a - w)); a += 36) {s > l(c / (f = 36 - u)) && y("overflow"),
              s *= f;}
            w = A(v - i, e = d.length + 1, 0 == i), l(v / e) > c - m && y("overflow"), m += l(v / e), v %= e, d.splice(
            v++, 0, m);
          }
          return b(d);
        }

        function _(t) {
          var e,r,n,o,i,s,a,h,u,f,p,g,v,b,k,_ = [];
          for (g = (t = m(t)).length, e = 128, r = 0, i = 72, s = 0; s < g; ++s) {(p = t[s]) < 128 && _.push(d(p));}
          for (n = o = _.length, o && _.push("-"); n < g;) {
            for (a = c, s = 0; s < g; ++s) {(p = t[s]) >= e && p < a && (a = p);}
            for (a - e > l((c - r) / (v = n + 1)) && y("overflow"), r += (a - e) * v, e = a, s = 0; s < g; ++s) {
              if ((p = t[s]) < e && ++r > c && y("overflow"), p == e) {
                for (h = r, u = 36; !(h < (f = u <= i ? 1 : u >= i + 26 ? 26 : u - i)); u += 36) {k = h - f, b = 36 - f, _.
                  push(d(w(f + k % b, 0))), h = l(k / b);}
                _.push(d(w(h, 0))), i = A(r, v, n == o), r = 0, ++n;
              }}++r, ++e;
          }
          return _.join("");
        }
        a = {
          version: "1.4.1",
          ucs2: {
            decode: m,
            encode: b },

          decode: k,
          encode: _,
          toASCII: function toASCII(t) {
            return v(t, function (t) {
              return u.test(t) ? "xn--" + _(t) : t;
            });
          },
          toUnicode: function toUnicode(t) {
            return v(t, function (t) {
              return h.test(t) ? k(t.slice(4).toLowerCase()) : t;
            });
          } },
        void 0 === (o = function () {
          return a;
        }.call(e, r, e, t)) || (t.exports = o);
      }();
    }).call(this, r(41)(t), r(9));
  }, function (t, e) {
    t.exports = function (t) {
      return t.webpackPolyfill || (t.deprecate = function () {}, t.paths = [], t.children || (t.children = []),
      Object.defineProperty(t, "loaded", {
        enumerable: !0,
        get: function get() {
          return t.l;
        } }),
      Object.defineProperty(t, "id", {
        enumerable: !0,
        get: function get() {
          return t.i;
        } }),
      t.webpackPolyfill = 1), t;
    };
  }, function (t, e, r) {
    "use strict";
    t.exports = {
      isString: function isString(t) {
        return "string" == typeof t;
      },
      isObject: function isObject(t) {
        return "object" == typeof t && null !== t;
      },
      isNull: function isNull(t) {
        return null === t;
      },
      isNullOrUndefined: function isNullOrUndefined(t) {
        return null == t;
      } };

  }, function (t, e, r) {
    "use strict";
    e.decode = e.parse = r(44), e.encode = e.stringify = r(45);
  }, function (t, e, r) {
    "use strict";

    function n(t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }
    t.exports = function (t, e, r, i) {
      e = e || "&", r = r || "=";
      var s = {};
      if ("string" != typeof t || 0 === t.length) return s;
      var a = /\+/g;
      t = t.split(e);
      var c = 1e3;
      i && "number" == typeof i.maxKeys && (c = i.maxKeys);
      var h = t.length;
      c > 0 && h > c && (h = c);
      for (var u = 0; u < h; ++u) {
        var f,p,l,d,y = t[u].replace(a, "%20"),
        g = y.indexOf(r);
        g >= 0 ? (f = y.substr(0, g), p = y.substr(g + 1)) : (f = y, p = ""), l = decodeURIComponent(f), d =
        decodeURIComponent(p), n(s, l) ? o(s[l]) ? s[l].push(d) : s[l] = [s[l], d] : s[l] = d;
      }
      return s;
    };
    var o = Array.isArray || function (t) {
      return "[object Array]" === Object.prototype.toString.call(t);
    };
  }, function (t, e, r) {
    "use strict";
    var n = function n(t) {
      switch (typeof t) {
        case "string":
          return t;
        case "boolean":
          return t ? "true" : "false";
        case "number":
          return isFinite(t) ? t : "";
        default:
          return "";}

    };
    t.exports = function (t, e, r, a) {
      return e = e || "&", r = r || "=", null === t && (t = void 0), "object" == typeof t ? i(s(t), function (s) {
        var a = encodeURIComponent(n(s)) + r;
        return o(t[s]) ? i(t[s], function (t) {
          return a + encodeURIComponent(n(t));
        }).join(e) : a + encodeURIComponent(n(t[s]));
      }).join(e) : a ? encodeURIComponent(n(a)) + r + encodeURIComponent(n(t)) : "";
    };
    var o = Array.isArray || function (t) {
      return "[object Array]" === Object.prototype.toString.call(t);
    };

    function i(t, e) {
      if (t.map) return t.map(e);
      for (var r = [], n = 0; n < t.length; n++) {r.push(e(t[n], n));}
      return r;
    }
    var s = Object.keys || function (t) {
      var e = [];
      for (var r in t) {Object.prototype.hasOwnProperty.call(t, r) && e.push(r);}
      return e;
    };
  }, function (t, e, r) {
    "use strict";var
    n =
    function n(t, e) {_classCallCheck(this, n);
      this.target = e, this.type = t;
    };var

    o = /*#__PURE__*/function (_n2) {_inherits(o, _n2);var _super2 = _createSuper(o);
      function o(t, e) {var _this4;_classCallCheck(this, o);
        _this4 = _super2.call(this, "message", e), _this4.data = t;return _this4;
      }return o;}(n);var

    i = /*#__PURE__*/function (_n3) {_inherits(i, _n3);var _super3 = _createSuper(i);
      function i(t, e, r) {var _this5;_classCallCheck(this, i);
        _this5 = _super3.call(this, "close", r), _this5.wasClean = r._closeFrameReceived && r._closeFrameSent, _this5.reason = e, _this5.code = t;return _this5;
      }return i;}(n);var

    s = /*#__PURE__*/function (_n4) {_inherits(s, _n4);var _super4 = _createSuper(s);
      function s(t) {_classCallCheck(this, s);return _super4.call(this,
        "open", t);
      }return s;}(n);var

    a = /*#__PURE__*/function (_n5) {_inherits(a, _n5);var _super5 = _createSuper(a);
      function a(t, e) {var _this6;_classCallCheck(this, a);
        _this6 = _super5.call(this, "error", e), _this6.message = t.message, _this6.error = t;return _this6;
      }return a;}(n);

    var c = {
      addEventListener: function addEventListener(t, e) {
        function r(t) {
          e.call(this, new o(t, this));
        }

        function n(t, r) {
          e.call(this, new i(t, r, this));
        }

        function c(t) {
          e.call(this, new a(t, this));
        }

        function h() {
          e.call(this, new s(this));
        }
        "function" == typeof e && ("message" === t ? (r._listener = e, this.on(t, r)) : "close" === t ? (n._listener =
        e, this.on(t, n)) : "error" === t ? (c._listener = e, this.on(t, c)) : "open" === t ? (h._listener = e,
        this.on(t, h)) : this.on(t, e));
      },
      removeEventListener: function removeEventListener(t, e) {
        var r = this.listeners(t);
        for (var _n6 = 0; _n6 < r.length; _n6++) {r[_n6] !== e && r[_n6]._listener !== e || this.removeListener(t, r[_n6]);}
      } };

    t.exports = c;
  }, function (t, e, r) {
    var n = r(0)("wx-ws:sender");
    t.exports = /*#__PURE__*/function () {"use strict";
      function _class(t) {_classCallCheck(this, _class);
        this._socket = t, this._queue = [], this._bufferedBytes = 0, this._deflating = !1;
      }_createClass(_class, [{ key: "send", value: function send(
        t, e, r) {
          n("send msg: ", t, " sender: ", this, this._deflating), this._deflating ? this.enqueue([this.dispatch, t, e,
          r]) :
          this.dispatch(t, e, r);
        } }, { key: "dispatch", value: function dispatch(
        t, e, r) {
          n("dispatch msg: ", t, ", sender: ", this), this._deflating = !0, "function" == typeof e && (r = e, e = {}),
          this._deflating = !1, this._socket.send({
            data: t,
            success: function success(t) {return r && r(null, t);},
            fail: function fail(t) {return r && r(t);} }),
          this.dequeue();
        } }, { key: "dequeue", value: function dequeue()
        {
          for (; !this._deflating && this._queue.length;) {
            var _t2 = this._queue.shift();
            this._bufferedBytes -= _t2[1].length, Reflect.apply(_t2[0], this, _t2.slice(1));
          }
        } }, { key: "enqueue", value: function enqueue(
        t) {
          this._bufferedBytes += t[1].length, this._queue.push(t);
        } }]);return _class;}();

  }, function (t, e) {
    t.exports = function (t, e) {
      for (var r = [], n = (e = e || 0) || 0; n < t.length; n++) {r[n - e] = t[n];}
      return r;
    };
  }, function (t, e) {
    function r(t) {
      t = t || {}, this.ms = t.min || 100, this.max = t.max || 1e4, this.factor = t.factor || 2, this.jitter = t.jitter >
      0 && t.jitter <= 1 ? t.jitter : 0, this.attempts = 0;
    }
    t.exports = r, r.prototype.duration = function () {
      var t = this.ms * Math.pow(this.factor, this.attempts++);
      if (this.jitter) {
        var e = Math.random(),
        r = Math.floor(e * this.jitter * t);
        t = 0 == (1 & Math.floor(10 * e)) ? t - r : t + r;
      }
      return 0 | Math.min(t, this.max);
    }, r.prototype.reset = function () {
      this.attempts = 0;
    }, r.prototype.setMin = function (t) {
      this.ms = t;
    }, r.prototype.setMax = function (t) {
      this.max = t;
    }, r.prototype.setJitter = function (t) {
      this.jitter = t;
    };
  }]);
});

/***/ }),

/***/ 111:
/*!***************************************************************!*\
  !*** C:/Users/86184/Desktop/毕业设计/Xchat/commons/js/uqrcode.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; //---------------------------------------------------------------------
// github https://github.com/Sansnn/uQRCode
//---------------------------------------------------------------------

var uQRCode = {};

(function () {
  //---------------------------------------------------------------------
  // QRCode for JavaScript
  //
  // Copyright (c) 2009 Kazuhiko Arase
  //
  // URL: http://www.d-project.com/
  //
  // Licensed under the MIT license:
  //   http://www.opensource.org/licenses/mit-license.php
  //
  // The word "QR Code" is registered trademark of 
  // DENSO WAVE INCORPORATED
  //   http://www.denso-wave.com/qrcode/faqpatent-e.html
  //
  //---------------------------------------------------------------------

  //---------------------------------------------------------------------
  // QR8bitByte
  //---------------------------------------------------------------------

  function QR8bitByte(data) {
    this.mode = QRMode.MODE_8BIT_BYTE;
    this.data = data;
  }

  QR8bitByte.prototype = {

    getLength: function getLength(buffer) {
      return this.data.length;
    },

    write: function write(buffer) {
      for (var i = 0; i < this.data.length; i++) {
        // not JIS ...
        buffer.put(this.data.charCodeAt(i), 8);
      }
    } };


  //---------------------------------------------------------------------
  // QRCode
  //---------------------------------------------------------------------

  function QRCode(typeNumber, errorCorrectLevel) {
    this.typeNumber = typeNumber;
    this.errorCorrectLevel = errorCorrectLevel;
    this.modules = null;
    this.moduleCount = 0;
    this.dataCache = null;
    this.dataList = new Array();
  }

  QRCode.prototype = {

    addData: function addData(data) {
      var newData = new QR8bitByte(data);
      this.dataList.push(newData);
      this.dataCache = null;
    },

    isDark: function isDark(row, col) {
      if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
        throw new Error(row + "," + col);
      }
      return this.modules[row][col];
    },

    getModuleCount: function getModuleCount() {
      return this.moduleCount;
    },

    make: function make() {
      // Calculate automatically typeNumber if provided is < 1
      if (this.typeNumber < 1) {
        var typeNumber = 1;
        for (typeNumber = 1; typeNumber < 40; typeNumber++) {
          var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, this.errorCorrectLevel);

          var buffer = new QRBitBuffer();
          var totalDataCount = 0;
          for (var i = 0; i < rsBlocks.length; i++) {
            totalDataCount += rsBlocks[i].dataCount;
          }

          for (var i = 0; i < this.dataList.length; i++) {
            var data = this.dataList[i];
            buffer.put(data.mode, 4);
            buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber));
            data.write(buffer);
          }
          if (buffer.getLengthInBits() <= totalDataCount * 8)
          break;
        }
        this.typeNumber = typeNumber;
      }
      this.makeImpl(false, this.getBestMaskPattern());
    },

    makeImpl: function makeImpl(test, maskPattern) {

      this.moduleCount = this.typeNumber * 4 + 17;
      this.modules = new Array(this.moduleCount);

      for (var row = 0; row < this.moduleCount; row++) {

        this.modules[row] = new Array(this.moduleCount);

        for (var col = 0; col < this.moduleCount; col++) {
          this.modules[row][col] = null; //(col + row) % 3;
        }
      }

      this.setupPositionProbePattern(0, 0);
      this.setupPositionProbePattern(this.moduleCount - 7, 0);
      this.setupPositionProbePattern(0, this.moduleCount - 7);
      this.setupPositionAdjustPattern();
      this.setupTimingPattern();
      this.setupTypeInfo(test, maskPattern);

      if (this.typeNumber >= 7) {
        this.setupTypeNumber(test);
      }

      if (this.dataCache == null) {
        this.dataCache = QRCode.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
      }

      this.mapData(this.dataCache, maskPattern);
    },

    setupPositionProbePattern: function setupPositionProbePattern(row, col) {

      for (var r = -1; r <= 7; r++) {

        if (row + r <= -1 || this.moduleCount <= row + r) continue;

        for (var c = -1; c <= 7; c++) {

          if (col + c <= -1 || this.moduleCount <= col + c) continue;

          if (0 <= r && r <= 6 && (c == 0 || c == 6) ||
          0 <= c && c <= 6 && (r == 0 || r == 6) ||
          2 <= r && r <= 4 && 2 <= c && c <= 4) {
            this.modules[row + r][col + c] = true;
          } else {
            this.modules[row + r][col + c] = false;
          }
        }
      }
    },

    getBestMaskPattern: function getBestMaskPattern() {

      var minLostPoint = 0;
      var pattern = 0;

      for (var i = 0; i < 8; i++) {

        this.makeImpl(true, i);

        var lostPoint = QRUtil.getLostPoint(this);

        if (i == 0 || minLostPoint > lostPoint) {
          minLostPoint = lostPoint;
          pattern = i;
        }
      }

      return pattern;
    },

    createMovieClip: function createMovieClip(target_mc, instance_name, depth) {

      var qr_mc = target_mc.createEmptyMovieClip(instance_name, depth);
      var cs = 1;

      this.make();

      for (var row = 0; row < this.modules.length; row++) {

        var y = row * cs;

        for (var col = 0; col < this.modules[row].length; col++) {

          var x = col * cs;
          var dark = this.modules[row][col];

          if (dark) {
            qr_mc.beginFill(0, 100);
            qr_mc.moveTo(x, y);
            qr_mc.lineTo(x + cs, y);
            qr_mc.lineTo(x + cs, y + cs);
            qr_mc.lineTo(x, y + cs);
            qr_mc.endFill();
          }
        }
      }

      return qr_mc;
    },

    setupTimingPattern: function setupTimingPattern() {

      for (var r = 8; r < this.moduleCount - 8; r++) {
        if (this.modules[r][6] != null) {
          continue;
        }
        this.modules[r][6] = r % 2 == 0;
      }

      for (var c = 8; c < this.moduleCount - 8; c++) {
        if (this.modules[6][c] != null) {
          continue;
        }
        this.modules[6][c] = c % 2 == 0;
      }
    },

    setupPositionAdjustPattern: function setupPositionAdjustPattern() {

      var pos = QRUtil.getPatternPosition(this.typeNumber);

      for (var i = 0; i < pos.length; i++) {

        for (var j = 0; j < pos.length; j++) {

          var row = pos[i];
          var col = pos[j];

          if (this.modules[row][col] != null) {
            continue;
          }

          for (var r = -2; r <= 2; r++) {

            for (var c = -2; c <= 2; c++) {

              if (r == -2 || r == 2 || c == -2 || c == 2 ||
              r == 0 && c == 0) {
                this.modules[row + r][col + c] = true;
              } else {
                this.modules[row + r][col + c] = false;
              }
            }
          }
        }
      }
    },

    setupTypeNumber: function setupTypeNumber(test) {

      var bits = QRUtil.getBCHTypeNumber(this.typeNumber);

      for (var i = 0; i < 18; i++) {
        var mod = !test && (bits >> i & 1) == 1;
        this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
      }

      for (var i = 0; i < 18; i++) {
        var mod = !test && (bits >> i & 1) == 1;
        this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
      }
    },

    setupTypeInfo: function setupTypeInfo(test, maskPattern) {

      var data = this.errorCorrectLevel << 3 | maskPattern;
      var bits = QRUtil.getBCHTypeInfo(data);

      // vertical		
      for (var i = 0; i < 15; i++) {

        var mod = !test && (bits >> i & 1) == 1;

        if (i < 6) {
          this.modules[i][8] = mod;
        } else if (i < 8) {
          this.modules[i + 1][8] = mod;
        } else {
          this.modules[this.moduleCount - 15 + i][8] = mod;
        }
      }

      // horizontal
      for (var i = 0; i < 15; i++) {

        var mod = !test && (bits >> i & 1) == 1;

        if (i < 8) {
          this.modules[8][this.moduleCount - i - 1] = mod;
        } else if (i < 9) {
          this.modules[8][15 - i - 1 + 1] = mod;
        } else {
          this.modules[8][15 - i - 1] = mod;
        }
      }

      // fixed module
      this.modules[this.moduleCount - 8][8] = !test;

    },

    mapData: function mapData(data, maskPattern) {

      var inc = -1;
      var row = this.moduleCount - 1;
      var bitIndex = 7;
      var byteIndex = 0;

      for (var col = this.moduleCount - 1; col > 0; col -= 2) {

        if (col == 6) col--;

        while (true) {

          for (var c = 0; c < 2; c++) {

            if (this.modules[row][col - c] == null) {

              var dark = false;

              if (byteIndex < data.length) {
                dark = (data[byteIndex] >>> bitIndex & 1) == 1;
              }

              var mask = QRUtil.getMask(maskPattern, row, col - c);

              if (mask) {
                dark = !dark;
              }

              this.modules[row][col - c] = dark;
              bitIndex--;

              if (bitIndex == -1) {
                byteIndex++;
                bitIndex = 7;
              }
            }
          }

          row += inc;

          if (row < 0 || this.moduleCount <= row) {
            row -= inc;
            inc = -inc;
            break;
          }
        }
      }

    } };



  QRCode.PAD0 = 0xEC;
  QRCode.PAD1 = 0x11;

  QRCode.createData = function (typeNumber, errorCorrectLevel, dataList) {

    var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);

    var buffer = new QRBitBuffer();

    for (var i = 0; i < dataList.length; i++) {
      var data = dataList[i];
      buffer.put(data.mode, 4);
      buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber));
      data.write(buffer);
    }

    // calc num max data.
    var totalDataCount = 0;
    for (var i = 0; i < rsBlocks.length; i++) {
      totalDataCount += rsBlocks[i].dataCount;
    }

    if (buffer.getLengthInBits() > totalDataCount * 8) {
      throw new Error("code length overflow. (" +
      buffer.getLengthInBits() +
      ">" +
      totalDataCount * 8 +
      ")");
    }

    // end code
    if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
      buffer.put(0, 4);
    }

    // padding
    while (buffer.getLengthInBits() % 8 != 0) {
      buffer.putBit(false);
    }

    // padding
    while (true) {

      if (buffer.getLengthInBits() >= totalDataCount * 8) {
        break;
      }
      buffer.put(QRCode.PAD0, 8);

      if (buffer.getLengthInBits() >= totalDataCount * 8) {
        break;
      }
      buffer.put(QRCode.PAD1, 8);
    }

    return QRCode.createBytes(buffer, rsBlocks);
  };

  QRCode.createBytes = function (buffer, rsBlocks) {

    var offset = 0;

    var maxDcCount = 0;
    var maxEcCount = 0;

    var dcdata = new Array(rsBlocks.length);
    var ecdata = new Array(rsBlocks.length);

    for (var r = 0; r < rsBlocks.length; r++) {

      var dcCount = rsBlocks[r].dataCount;
      var ecCount = rsBlocks[r].totalCount - dcCount;

      maxDcCount = Math.max(maxDcCount, dcCount);
      maxEcCount = Math.max(maxEcCount, ecCount);

      dcdata[r] = new Array(dcCount);

      for (var i = 0; i < dcdata[r].length; i++) {
        dcdata[r][i] = 0xff & buffer.buffer[i + offset];
      }
      offset += dcCount;

      var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
      var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);

      var modPoly = rawPoly.mod(rsPoly);
      ecdata[r] = new Array(rsPoly.getLength() - 1);
      for (var i = 0; i < ecdata[r].length; i++) {
        var modIndex = i + modPoly.getLength() - ecdata[r].length;
        ecdata[r][i] = modIndex >= 0 ? modPoly.get(modIndex) : 0;
      }

    }

    var totalCodeCount = 0;
    for (var i = 0; i < rsBlocks.length; i++) {
      totalCodeCount += rsBlocks[i].totalCount;
    }

    var data = new Array(totalCodeCount);
    var index = 0;

    for (var i = 0; i < maxDcCount; i++) {
      for (var r = 0; r < rsBlocks.length; r++) {
        if (i < dcdata[r].length) {
          data[index++] = dcdata[r][i];
        }
      }
    }

    for (var i = 0; i < maxEcCount; i++) {
      for (var r = 0; r < rsBlocks.length; r++) {
        if (i < ecdata[r].length) {
          data[index++] = ecdata[r][i];
        }
      }
    }

    return data;

  };

  //---------------------------------------------------------------------
  // QRMode
  //---------------------------------------------------------------------

  var QRMode = {
    MODE_NUMBER: 1 << 0,
    MODE_ALPHA_NUM: 1 << 1,
    MODE_8BIT_BYTE: 1 << 2,
    MODE_KANJI: 1 << 3 };


  //---------------------------------------------------------------------
  // QRErrorCorrectLevel
  //---------------------------------------------------------------------

  var QRErrorCorrectLevel = {
    L: 1,
    M: 0,
    Q: 3,
    H: 2 };


  //---------------------------------------------------------------------
  // QRMaskPattern
  //---------------------------------------------------------------------

  var QRMaskPattern = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7 };


  //---------------------------------------------------------------------
  // QRUtil
  //---------------------------------------------------------------------

  var QRUtil = {

    PATTERN_POSITION_TABLE: [
    [],
    [6, 18],
    [6, 22],
    [6, 26],
    [6, 30],
    [6, 34],
    [6, 22, 38],
    [6, 24, 42],
    [6, 26, 46],
    [6, 28, 50],
    [6, 30, 54],
    [6, 32, 58],
    [6, 34, 62],
    [6, 26, 46, 66],
    [6, 26, 48, 70],
    [6, 26, 50, 74],
    [6, 30, 54, 78],
    [6, 30, 56, 82],
    [6, 30, 58, 86],
    [6, 34, 62, 90],
    [6, 28, 50, 72, 94],
    [6, 26, 50, 74, 98],
    [6, 30, 54, 78, 102],
    [6, 28, 54, 80, 106],
    [6, 32, 58, 84, 110],
    [6, 30, 58, 86, 114],
    [6, 34, 62, 90, 118],
    [6, 26, 50, 74, 98, 122],
    [6, 30, 54, 78, 102, 126],
    [6, 26, 52, 78, 104, 130],
    [6, 30, 56, 82, 108, 134],
    [6, 34, 60, 86, 112, 138],
    [6, 30, 58, 86, 114, 142],
    [6, 34, 62, 90, 118, 146],
    [6, 30, 54, 78, 102, 126, 150],
    [6, 24, 50, 76, 102, 128, 154],
    [6, 28, 54, 80, 106, 132, 158],
    [6, 32, 58, 84, 110, 136, 162],
    [6, 26, 54, 82, 110, 138, 166],
    [6, 30, 58, 86, 114, 142, 170]],


    G15: 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0,
    G18: 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0,
    G15_MASK: 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1,

    getBCHTypeInfo: function getBCHTypeInfo(data) {
      var d = data << 10;
      while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
        d ^= QRUtil.G15 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15);
      }
      return (data << 10 | d) ^ QRUtil.G15_MASK;
    },

    getBCHTypeNumber: function getBCHTypeNumber(data) {
      var d = data << 12;
      while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
        d ^= QRUtil.G18 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18);
      }
      return data << 12 | d;
    },

    getBCHDigit: function getBCHDigit(data) {

      var digit = 0;

      while (data != 0) {
        digit++;
        data >>>= 1;
      }

      return digit;
    },

    getPatternPosition: function getPatternPosition(typeNumber) {
      return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
    },

    getMask: function getMask(maskPattern, i, j) {

      switch (maskPattern) {

        case QRMaskPattern.PATTERN000:
          return (i + j) % 2 == 0;
        case QRMaskPattern.PATTERN001:
          return i % 2 == 0;
        case QRMaskPattern.PATTERN010:
          return j % 3 == 0;
        case QRMaskPattern.PATTERN011:
          return (i + j) % 3 == 0;
        case QRMaskPattern.PATTERN100:
          return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
        case QRMaskPattern.PATTERN101:
          return i * j % 2 + i * j % 3 == 0;
        case QRMaskPattern.PATTERN110:
          return (i * j % 2 + i * j % 3) % 2 == 0;
        case QRMaskPattern.PATTERN111:
          return (i * j % 3 + (i + j) % 2) % 2 == 0;

        default:
          throw new Error("bad maskPattern:" + maskPattern);}

    },

    getErrorCorrectPolynomial: function getErrorCorrectPolynomial(errorCorrectLength) {

      var a = new QRPolynomial([1], 0);

      for (var i = 0; i < errorCorrectLength; i++) {
        a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0));
      }

      return a;
    },

    getLengthInBits: function getLengthInBits(mode, type) {

      if (1 <= type && type < 10) {

        // 1 - 9

        switch (mode) {
          case QRMode.MODE_NUMBER:
            return 10;
          case QRMode.MODE_ALPHA_NUM:
            return 9;
          case QRMode.MODE_8BIT_BYTE:
            return 8;
          case QRMode.MODE_KANJI:
            return 8;
          default:
            throw new Error("mode:" + mode);}


      } else if (type < 27) {

        // 10 - 26

        switch (mode) {
          case QRMode.MODE_NUMBER:
            return 12;
          case QRMode.MODE_ALPHA_NUM:
            return 11;
          case QRMode.MODE_8BIT_BYTE:
            return 16;
          case QRMode.MODE_KANJI:
            return 10;
          default:
            throw new Error("mode:" + mode);}


      } else if (type < 41) {

        // 27 - 40

        switch (mode) {
          case QRMode.MODE_NUMBER:
            return 14;
          case QRMode.MODE_ALPHA_NUM:
            return 13;
          case QRMode.MODE_8BIT_BYTE:
            return 16;
          case QRMode.MODE_KANJI:
            return 12;
          default:
            throw new Error("mode:" + mode);}


      } else {
        throw new Error("type:" + type);
      }
    },

    getLostPoint: function getLostPoint(qrCode) {

      var moduleCount = qrCode.getModuleCount();

      var lostPoint = 0;

      // LEVEL1

      for (var row = 0; row < moduleCount; row++) {

        for (var col = 0; col < moduleCount; col++) {

          var sameCount = 0;
          var dark = qrCode.isDark(row, col);

          for (var r = -1; r <= 1; r++) {

            if (row + r < 0 || moduleCount <= row + r) {
              continue;
            }

            for (var c = -1; c <= 1; c++) {

              if (col + c < 0 || moduleCount <= col + c) {
                continue;
              }

              if (r == 0 && c == 0) {
                continue;
              }

              if (dark == qrCode.isDark(row + r, col + c)) {
                sameCount++;
              }
            }
          }

          if (sameCount > 5) {
            lostPoint += 3 + sameCount - 5;
          }
        }
      }

      // LEVEL2

      for (var row = 0; row < moduleCount - 1; row++) {
        for (var col = 0; col < moduleCount - 1; col++) {
          var count = 0;
          if (qrCode.isDark(row, col)) count++;
          if (qrCode.isDark(row + 1, col)) count++;
          if (qrCode.isDark(row, col + 1)) count++;
          if (qrCode.isDark(row + 1, col + 1)) count++;
          if (count == 0 || count == 4) {
            lostPoint += 3;
          }
        }
      }

      // LEVEL3

      for (var row = 0; row < moduleCount; row++) {
        for (var col = 0; col < moduleCount - 6; col++) {
          if (qrCode.isDark(row, col) &&
          !qrCode.isDark(row, col + 1) &&
          qrCode.isDark(row, col + 2) &&
          qrCode.isDark(row, col + 3) &&
          qrCode.isDark(row, col + 4) &&
          !qrCode.isDark(row, col + 5) &&
          qrCode.isDark(row, col + 6)) {
            lostPoint += 40;
          }
        }
      }

      for (var col = 0; col < moduleCount; col++) {
        for (var row = 0; row < moduleCount - 6; row++) {
          if (qrCode.isDark(row, col) &&
          !qrCode.isDark(row + 1, col) &&
          qrCode.isDark(row + 2, col) &&
          qrCode.isDark(row + 3, col) &&
          qrCode.isDark(row + 4, col) &&
          !qrCode.isDark(row + 5, col) &&
          qrCode.isDark(row + 6, col)) {
            lostPoint += 40;
          }
        }
      }

      // LEVEL4

      var darkCount = 0;

      for (var col = 0; col < moduleCount; col++) {
        for (var row = 0; row < moduleCount; row++) {
          if (qrCode.isDark(row, col)) {
            darkCount++;
          }
        }
      }

      var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
      lostPoint += ratio * 10;

      return lostPoint;
    } };




  //---------------------------------------------------------------------
  // QRMath
  //---------------------------------------------------------------------

  var QRMath = {

    glog: function glog(n) {

      if (n < 1) {
        throw new Error("glog(" + n + ")");
      }

      return QRMath.LOG_TABLE[n];
    },

    gexp: function gexp(n) {

      while (n < 0) {
        n += 255;
      }

      while (n >= 256) {
        n -= 255;
      }

      return QRMath.EXP_TABLE[n];
    },

    EXP_TABLE: new Array(256),

    LOG_TABLE: new Array(256) };



  for (var i = 0; i < 8; i++) {
    QRMath.EXP_TABLE[i] = 1 << i;
  }
  for (var i = 8; i < 256; i++) {
    QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^
    QRMath.EXP_TABLE[i - 5] ^
    QRMath.EXP_TABLE[i - 6] ^
    QRMath.EXP_TABLE[i - 8];
  }
  for (var i = 0; i < 255; i++) {
    QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;
  }

  //---------------------------------------------------------------------
  // QRPolynomial
  //---------------------------------------------------------------------

  function QRPolynomial(num, shift) {

    if (num.length == undefined) {
      throw new Error(num.length + "/" + shift);
    }

    var offset = 0;

    while (offset < num.length && num[offset] == 0) {
      offset++;
    }

    this.num = new Array(num.length - offset + shift);
    for (var i = 0; i < num.length - offset; i++) {
      this.num[i] = num[i + offset];
    }
  }

  QRPolynomial.prototype = {

    get: function get(index) {
      return this.num[index];
    },

    getLength: function getLength() {
      return this.num.length;
    },

    multiply: function multiply(e) {

      var num = new Array(this.getLength() + e.getLength() - 1);

      for (var i = 0; i < this.getLength(); i++) {
        for (var j = 0; j < e.getLength(); j++) {
          num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j)));
        }
      }

      return new QRPolynomial(num, 0);
    },

    mod: function mod(e) {

      if (this.getLength() - e.getLength() < 0) {
        return this;
      }

      var ratio = QRMath.glog(this.get(0)) - QRMath.glog(e.get(0));

      var num = new Array(this.getLength());

      for (var i = 0; i < this.getLength(); i++) {
        num[i] = this.get(i);
      }

      for (var i = 0; i < e.getLength(); i++) {
        num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio);
      }

      // recursive call
      return new QRPolynomial(num, 0).mod(e);
    } };


  //---------------------------------------------------------------------
  // QRRSBlock
  //---------------------------------------------------------------------

  function QRRSBlock(totalCount, dataCount) {
    this.totalCount = totalCount;
    this.dataCount = dataCount;
  }

  QRRSBlock.RS_BLOCK_TABLE = [

  // L
  // M
  // Q
  // H

  // 1
  [1, 26, 19],
  [1, 26, 16],
  [1, 26, 13],
  [1, 26, 9],

  // 2
  [1, 44, 34],
  [1, 44, 28],
  [1, 44, 22],
  [1, 44, 16],

  // 3
  [1, 70, 55],
  [1, 70, 44],
  [2, 35, 17],
  [2, 35, 13],

  // 4		
  [1, 100, 80],
  [2, 50, 32],
  [2, 50, 24],
  [4, 25, 9],

  // 5
  [1, 134, 108],
  [2, 67, 43],
  [2, 33, 15, 2, 34, 16],
  [2, 33, 11, 2, 34, 12],

  // 6
  [2, 86, 68],
  [4, 43, 27],
  [4, 43, 19],
  [4, 43, 15],

  // 7		
  [2, 98, 78],
  [4, 49, 31],
  [2, 32, 14, 4, 33, 15],
  [4, 39, 13, 1, 40, 14],

  // 8
  [2, 121, 97],
  [2, 60, 38, 2, 61, 39],
  [4, 40, 18, 2, 41, 19],
  [4, 40, 14, 2, 41, 15],

  // 9
  [2, 146, 116],
  [3, 58, 36, 2, 59, 37],
  [4, 36, 16, 4, 37, 17],
  [4, 36, 12, 4, 37, 13],

  // 10		
  [2, 86, 68, 2, 87, 69],
  [4, 69, 43, 1, 70, 44],
  [6, 43, 19, 2, 44, 20],
  [6, 43, 15, 2, 44, 16],

  // 11
  [4, 101, 81],
  [1, 80, 50, 4, 81, 51],
  [4, 50, 22, 4, 51, 23],
  [3, 36, 12, 8, 37, 13],

  // 12
  [2, 116, 92, 2, 117, 93],
  [6, 58, 36, 2, 59, 37],
  [4, 46, 20, 6, 47, 21],
  [7, 42, 14, 4, 43, 15],

  // 13
  [4, 133, 107],
  [8, 59, 37, 1, 60, 38],
  [8, 44, 20, 4, 45, 21],
  [12, 33, 11, 4, 34, 12],

  // 14
  [3, 145, 115, 1, 146, 116],
  [4, 64, 40, 5, 65, 41],
  [11, 36, 16, 5, 37, 17],
  [11, 36, 12, 5, 37, 13],

  // 15
  [5, 109, 87, 1, 110, 88],
  [5, 65, 41, 5, 66, 42],
  [5, 54, 24, 7, 55, 25],
  [11, 36, 12],

  // 16
  [5, 122, 98, 1, 123, 99],
  [7, 73, 45, 3, 74, 46],
  [15, 43, 19, 2, 44, 20],
  [3, 45, 15, 13, 46, 16],

  // 17
  [1, 135, 107, 5, 136, 108],
  [10, 74, 46, 1, 75, 47],
  [1, 50, 22, 15, 51, 23],
  [2, 42, 14, 17, 43, 15],

  // 18
  [5, 150, 120, 1, 151, 121],
  [9, 69, 43, 4, 70, 44],
  [17, 50, 22, 1, 51, 23],
  [2, 42, 14, 19, 43, 15],

  // 19
  [3, 141, 113, 4, 142, 114],
  [3, 70, 44, 11, 71, 45],
  [17, 47, 21, 4, 48, 22],
  [9, 39, 13, 16, 40, 14],

  // 20
  [3, 135, 107, 5, 136, 108],
  [3, 67, 41, 13, 68, 42],
  [15, 54, 24, 5, 55, 25],
  [15, 43, 15, 10, 44, 16],

  // 21
  [4, 144, 116, 4, 145, 117],
  [17, 68, 42],
  [17, 50, 22, 6, 51, 23],
  [19, 46, 16, 6, 47, 17],

  // 22
  [2, 139, 111, 7, 140, 112],
  [17, 74, 46],
  [7, 54, 24, 16, 55, 25],
  [34, 37, 13],

  // 23
  [4, 151, 121, 5, 152, 122],
  [4, 75, 47, 14, 76, 48],
  [11, 54, 24, 14, 55, 25],
  [16, 45, 15, 14, 46, 16],

  // 24
  [6, 147, 117, 4, 148, 118],
  [6, 73, 45, 14, 74, 46],
  [11, 54, 24, 16, 55, 25],
  [30, 46, 16, 2, 47, 17],

  // 25
  [8, 132, 106, 4, 133, 107],
  [8, 75, 47, 13, 76, 48],
  [7, 54, 24, 22, 55, 25],
  [22, 45, 15, 13, 46, 16],

  // 26
  [10, 142, 114, 2, 143, 115],
  [19, 74, 46, 4, 75, 47],
  [28, 50, 22, 6, 51, 23],
  [33, 46, 16, 4, 47, 17],

  // 27
  [8, 152, 122, 4, 153, 123],
  [22, 73, 45, 3, 74, 46],
  [8, 53, 23, 26, 54, 24],
  [12, 45, 15, 28, 46, 16],

  // 28
  [3, 147, 117, 10, 148, 118],
  [3, 73, 45, 23, 74, 46],
  [4, 54, 24, 31, 55, 25],
  [11, 45, 15, 31, 46, 16],

  // 29
  [7, 146, 116, 7, 147, 117],
  [21, 73, 45, 7, 74, 46],
  [1, 53, 23, 37, 54, 24],
  [19, 45, 15, 26, 46, 16],

  // 30
  [5, 145, 115, 10, 146, 116],
  [19, 75, 47, 10, 76, 48],
  [15, 54, 24, 25, 55, 25],
  [23, 45, 15, 25, 46, 16],

  // 31
  [13, 145, 115, 3, 146, 116],
  [2, 74, 46, 29, 75, 47],
  [42, 54, 24, 1, 55, 25],
  [23, 45, 15, 28, 46, 16],

  // 32
  [17, 145, 115],
  [10, 74, 46, 23, 75, 47],
  [10, 54, 24, 35, 55, 25],
  [19, 45, 15, 35, 46, 16],

  // 33
  [17, 145, 115, 1, 146, 116],
  [14, 74, 46, 21, 75, 47],
  [29, 54, 24, 19, 55, 25],
  [11, 45, 15, 46, 46, 16],

  // 34
  [13, 145, 115, 6, 146, 116],
  [14, 74, 46, 23, 75, 47],
  [44, 54, 24, 7, 55, 25],
  [59, 46, 16, 1, 47, 17],

  // 35
  [12, 151, 121, 7, 152, 122],
  [12, 75, 47, 26, 76, 48],
  [39, 54, 24, 14, 55, 25],
  [22, 45, 15, 41, 46, 16],

  // 36
  [6, 151, 121, 14, 152, 122],
  [6, 75, 47, 34, 76, 48],
  [46, 54, 24, 10, 55, 25],
  [2, 45, 15, 64, 46, 16],

  // 37
  [17, 152, 122, 4, 153, 123],
  [29, 74, 46, 14, 75, 47],
  [49, 54, 24, 10, 55, 25],
  [24, 45, 15, 46, 46, 16],

  // 38
  [4, 152, 122, 18, 153, 123],
  [13, 74, 46, 32, 75, 47],
  [48, 54, 24, 14, 55, 25],
  [42, 45, 15, 32, 46, 16],

  // 39
  [20, 147, 117, 4, 148, 118],
  [40, 75, 47, 7, 76, 48],
  [43, 54, 24, 22, 55, 25],
  [10, 45, 15, 67, 46, 16],

  // 40
  [19, 148, 118, 6, 149, 119],
  [18, 75, 47, 31, 76, 48],
  [34, 54, 24, 34, 55, 25],
  [20, 45, 15, 61, 46, 16]];


  QRRSBlock.getRSBlocks = function (typeNumber, errorCorrectLevel) {

    var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);

    if (rsBlock == undefined) {
      throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
    }

    var length = rsBlock.length / 3;

    var list = new Array();

    for (var i = 0; i < length; i++) {

      var count = rsBlock[i * 3 + 0];
      var totalCount = rsBlock[i * 3 + 1];
      var dataCount = rsBlock[i * 3 + 2];

      for (var j = 0; j < count; j++) {
        list.push(new QRRSBlock(totalCount, dataCount));
      }
    }

    return list;
  };

  QRRSBlock.getRsBlockTable = function (typeNumber, errorCorrectLevel) {

    switch (errorCorrectLevel) {
      case QRErrorCorrectLevel.L:
        return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
      case QRErrorCorrectLevel.M:
        return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
      case QRErrorCorrectLevel.Q:
        return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
      case QRErrorCorrectLevel.H:
        return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
      default:
        return undefined;}

  };

  //---------------------------------------------------------------------
  // QRBitBuffer
  //---------------------------------------------------------------------

  function QRBitBuffer() {
    this.buffer = new Array();
    this.length = 0;
  }

  QRBitBuffer.prototype = {

    get: function get(index) {
      var bufIndex = Math.floor(index / 8);
      return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) == 1;
    },

    put: function put(num, length) {
      for (var i = 0; i < length; i++) {
        this.putBit((num >>> length - i - 1 & 1) == 1);
      }
    },

    getLengthInBits: function getLengthInBits() {
      return this.length;
    },

    putBit: function putBit(bit) {

      var bufIndex = Math.floor(this.length / 8);
      if (this.buffer.length <= bufIndex) {
        this.buffer.push(0);
      }

      if (bit) {
        this.buffer[bufIndex] |= 0x80 >>> this.length % 8;
      }

      this.length++;
    } };


  //---------------------------------------------------------------------
  // Support Chinese
  //---------------------------------------------------------------------
  function utf16To8(text) {
    var result = '';
    var c;
    for (var i = 0; i < text.length; i++) {
      c = text.charCodeAt(i);
      if (c >= 0x0001 && c <= 0x007F) {
        result += text.charAt(i);
      } else if (c > 0x07FF) {
        result += String.fromCharCode(0xE0 | c >> 12 & 0x0F);
        result += String.fromCharCode(0x80 | c >> 6 & 0x3F);
        result += String.fromCharCode(0x80 | c >> 0 & 0x3F);
      } else {
        result += String.fromCharCode(0xC0 | c >> 6 & 0x1F);
        result += String.fromCharCode(0x80 | c >> 0 & 0x3F);
      }
    }
    return result;
  }

  uQRCode = {

    errorCorrectLevel: QRErrorCorrectLevel,

    defaults: {
      size: 354,
      margin: 0,
      backgroundColor: '#ffffff',
      foregroundColor: '#000000',
      fileType: 'png', // 'jpg', 'png'
      errorCorrectLevel: QRErrorCorrectLevel.H,
      typeNumber: -1 },


    make: function make(options) {var _this = this;
      return new Promise(function (reslove, reject) {
        var defaultOptions = {
          canvasId: options.canvasId,
          componentInstance: options.componentInstance,
          text: options.text,
          size: _this.defaults.size,
          margin: _this.defaults.margin,
          backgroundColor: _this.defaults.backgroundColor,
          foregroundColor: _this.defaults.foregroundColor,
          fileType: _this.defaults.fileType,
          errorCorrectLevel: _this.defaults.errorCorrectLevel,
          typeNumber: _this.defaults.typeNumber };

        if (options) {
          for (var i in options) {
            defaultOptions[i] = options[i];
          }
        }
        options = defaultOptions;
        if (!options.canvasId) {
          console.error('uQRCode: Please set canvasId!');
          return;
        }

        function createCanvas() {
          var qrcode = new QRCode(options.typeNumber, options.errorCorrectLevel);
          qrcode.addData(utf16To8(options.text));
          qrcode.make();

          var ctx = uni.createCanvasContext(options.canvasId, options.componentInstance);
          ctx.setFillStyle(options.backgroundColor);
          ctx.fillRect(0, 0, options.size, options.size);

          var tileW = (options.size - options.margin * 2) / qrcode.getModuleCount();
          var tileH = tileW;

          for (var row = 0; row < qrcode.getModuleCount(); row++) {
            for (var col = 0; col < qrcode.getModuleCount(); col++) {
              var style = qrcode.isDark(row, col) ? options.foregroundColor : options.backgroundColor;
              ctx.setFillStyle(style);
              var x = Math.round(col * tileW) + options.margin;
              var y = Math.round(row * tileH) + options.margin;
              var w = Math.ceil((col + 1) * tileW) - Math.floor(col * tileW);
              var h = Math.ceil((row + 1) * tileW) - Math.floor(row * tileW);
              ctx.fillRect(x, y, w, h);
            }
          }

          setTimeout(function () {
            ctx.draw(false, function () {
              setTimeout(function () {
                uni.canvasToTempFilePath({
                  canvasId: options.canvasId,
                  fileType: options.fileType,
                  width: options.size,
                  height: options.size,
                  destWidth: options.size,
                  destHeight: options.size,
                  success: function success(res) {
                    var resData; // 将统一为base64格式
                    var tempFilePath = res.tempFilePath; // H5为base64，其他为相对路径



















                    uni.getFileSystemManager().readFile({
                      filePath: tempFilePath,
                      encoding: 'base64',
                      success: function success(res) {
                        resData = 'data:image/png;base64,' + res.data;
                        options.success && options.success(resData);
                        reslove(resData);
                      } });


























                  },
                  fail: function fail(error) {
                    options.fail && options.fail(error);
                    reject(error);
                  },
                  complete: function complete(res) {
                    options.complete && options.complete(res);
                  } },
                options.componentInstance);
              }, options.text.length + 100);
            }());
          }, 150);
        }

        createCanvas();
      });
    } };


})();var _default =

uQRCode;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 12:
/*!*******************************************************************!*\
  !*** C:/Users/86184/Desktop/毕业设计/Xchat/commons/js/getStorages.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.getStorages = getStorages;function getStorages() {
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
  } catch (err) {
    console.log(err);
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 13:
/*!***************************************************************!*\
  !*** C:/Users/86184/Desktop/毕业设计/Xchat/commons/js/request.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.request = request;function request(url, data) {var _this = this;
  //获取缓存数据
  try {
    var value = uni.getStorageSync('user');
    if (value) {
      var name = value.name;
    }
  } catch (e) {
    // error
  }
  return new Promise(function (resolve, reject) {
    uni.request({
      url: _this.serverUrl + url,
      data: data,
      method: 'POST',
      success: function success(data) {
        var status = data.data.status;
        if (status == 200) {
          resolve(data.data.result);
        } else if (status == 300) {
          //token过期，跳转到登录页面
          uni.redirectTo({
            url: '../login/login?name=' + name });

          uni.clearStorage(); //清除缓存
        } else if (status == 400) {
          _this.match = true;
          _this.relation = 2;
        } else if (status == 500) {
          //服务器错误
          uni.showToast({
            title: '服务器出错了',
            icon: 'none',
            duration: 2000 });

        }
      },
      fail: function fail(error) {
        console.log(error);
      } });

  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 147:
/*!*********************************************************************************************!*\
  !*** C:/Users/86184/Desktop/毕业设计/Xchat/uni_modules/uni-popup/components/uni-popup/popup.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _message = _interopRequireDefault(__webpack_require__(/*! ./message.js */ 148));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
// 定义 type 类型:弹出类型：top/bottom/center
var config = {
  // 顶部弹出
  top: 'top',
  // 底部弹出
  bottom: 'bottom',
  // 居中弹出
  center: 'center',
  // 消息提示
  message: 'top',
  // 对话框
  dialog: 'center',
  // 分享
  share: 'bottom' };var _default =


{
  data: function data() {
    return {
      config: config,
      popupWidth: 0,
      popupHeight: 0 };

  },
  mixins: [_message.default],
  computed: {
    isDesktop: function isDesktop() {
      return this.popupWidth >= 500 && this.popupHeight >= 500;
    } },

  mounted: function mounted() {var _this = this;
    var fixSize = function fixSize() {var _uni$getSystemInfoSyn =




      uni.getSystemInfoSync(),windowWidth = _uni$getSystemInfoSyn.windowWidth,windowHeight = _uni$getSystemInfoSyn.windowHeight,windowTop = _uni$getSystemInfoSyn.windowTop;
      _this.popupWidth = windowWidth;
      _this.popupHeight = windowHeight + windowTop;
    };
    fixSize();






  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 148:
/*!***********************************************************************************************!*\
  !*** C:/Users/86184/Desktop/毕业设计/Xchat/uni_modules/uni-popup/components/uni-popup/message.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  created: function created() {
    if (this.type === 'message') {
      // 不显示遮罩
      this.maskShow = false;
      // 获取子组件对象
      this.childrenMsg = null;
    }
  },
  methods: {
    customOpen: function customOpen() {
      if (this.childrenMsg) {
        this.childrenMsg.open();
      }
    },
    customClose: function customClose() {
      if (this.childrenMsg) {
        this.childrenMsg.close();
      }
    } } };exports.default = _default;

/***/ }),

/***/ 177:
/*!*********************************************************************************!*\
  !*** C:/Users/86184/Desktop/毕业设计/Xchat/node_modules/grapheme-splitter/index.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
Breaks a Javascript string into individual user-perceived "characters" 
called extended grapheme clusters by implementing the Unicode UAX-29 standard, version 10.0.0

Usage:
var splitter = new GraphemeSplitter();
//returns an array of strings, one string for each grapheme cluster
var graphemes = splitter.splitGraphemes(string); 

*/
function GraphemeSplitter() {
  var CR = 0,
  LF = 1,
  Control = 2,
  Extend = 3,
  Regional_Indicator = 4,
  SpacingMark = 5,
  L = 6,
  V = 7,
  T = 8,
  LV = 9,
  LVT = 10,
  Other = 11,
  Prepend = 12,
  E_Base = 13,
  E_Modifier = 14,
  ZWJ = 15,
  Glue_After_Zwj = 16,
  E_Base_GAZ = 17;

  // BreakTypes
  var NotBreak = 0,
  BreakStart = 1,
  Break = 2,
  BreakLastRegional = 3,
  BreakPenultimateRegional = 4;

  function isSurrogate(str, pos) {
    return 0xd800 <= str.charCodeAt(pos) && str.charCodeAt(pos) <= 0xdbff &&
    0xdc00 <= str.charCodeAt(pos + 1) && str.charCodeAt(pos + 1) <= 0xdfff;
  }

  // Private function, gets a Unicode code point from a JavaScript UTF-16 string
  // handling surrogate pairs appropriately
  function codePointAt(str, idx) {
    if (idx === undefined) {
      idx = 0;
    }
    var code = str.charCodeAt(idx);

    // if a high surrogate
    if (0xD800 <= code && code <= 0xDBFF &&
    idx < str.length - 1) {
      var hi = code;
      var low = str.charCodeAt(idx + 1);
      if (0xDC00 <= low && low <= 0xDFFF) {
        return (hi - 0xD800) * 0x400 + (low - 0xDC00) + 0x10000;
      }
      return hi;
    }

    // if a low surrogate
    if (0xDC00 <= code && code <= 0xDFFF &&
    idx >= 1) {
      var hi = str.charCodeAt(idx - 1);
      var low = code;
      if (0xD800 <= hi && hi <= 0xDBFF) {
        return (hi - 0xD800) * 0x400 + (low - 0xDC00) + 0x10000;
      }
      return low;
    }

    //just return the char if an unmatched surrogate half or a 
    //single-char codepoint
    return code;
  }

  // Private function, returns whether a break is allowed between the 
  // two given grapheme breaking classes
  function shouldBreak(start, mid, end) {
    var all = [start].concat(mid).concat([end]);
    var previous = all[all.length - 2];
    var next = end;

    // Lookahead termintor for:
    // GB10. (E_Base | EBG) Extend* ?	E_Modifier
    var eModifierIndex = all.lastIndexOf(E_Modifier);
    if (eModifierIndex > 1 &&
    all.slice(1, eModifierIndex).every(function (c) {return c == Extend;}) &&
    [Extend, E_Base, E_Base_GAZ].indexOf(start) == -1) {
      return Break;
    }

    // Lookahead termintor for:
    // GB12. ^ (RI RI)* RI	?	RI
    // GB13. [^RI] (RI RI)* RI	?	RI
    var rIIndex = all.lastIndexOf(Regional_Indicator);
    if (rIIndex > 0 &&
    all.slice(1, rIIndex).every(function (c) {return c == Regional_Indicator;}) &&
    [Prepend, Regional_Indicator].indexOf(previous) == -1) {
      if (all.filter(function (c) {return c == Regional_Indicator;}).length % 2 == 1) {
        return BreakLastRegional;
      } else
      {
        return BreakPenultimateRegional;
      }
    }

    // GB3. CR X LF
    if (previous == CR && next == LF) {
      return NotBreak;
    }
    // GB4. (Control|CR|LF) ÷
    else if (previous == Control || previous == CR || previous == LF) {
        if (next == E_Modifier && mid.every(function (c) {return c == Extend;})) {
          return Break;
        } else
        {
          return BreakStart;
        }
      }
      // GB5. ÷ (Control|CR|LF)
      else if (next == Control || next == CR || next == LF) {
          return BreakStart;
        }
        // GB6. L X (L|V|LV|LVT)
        else if (previous == L && (
          next == L || next == V || next == LV || next == LVT)) {
            return NotBreak;
          }
          // GB7. (LV|V) X (V|T)
          else if ((previous == LV || previous == V) && (
            next == V || next == T)) {
              return NotBreak;
            }
            // GB8. (LVT|T) X (T)
            else if ((previous == LVT || previous == T) &&
              next == T) {
                return NotBreak;
              }
              // GB9. X (Extend|ZWJ)
              else if (next == Extend || next == ZWJ) {
                  return NotBreak;
                }
                // GB9a. X SpacingMark
                else if (next == SpacingMark) {
                    return NotBreak;
                  }
                  // GB9b. Prepend X
                  else if (previous == Prepend) {
                      return NotBreak;
                    }

    // GB10. (E_Base | EBG) Extend* ?	E_Modifier
    var previousNonExtendIndex = all.indexOf(Extend) != -1 ? all.lastIndexOf(Extend) - 1 : all.length - 2;
    if ([E_Base, E_Base_GAZ].indexOf(all[previousNonExtendIndex]) != -1 &&
    all.slice(previousNonExtendIndex + 1, -1).every(function (c) {return c == Extend;}) &&
    next == E_Modifier) {
      return NotBreak;
    }

    // GB11. ZWJ ? (Glue_After_Zwj | EBG)
    if (previous == ZWJ && [Glue_After_Zwj, E_Base_GAZ].indexOf(next) != -1) {
      return NotBreak;
    }

    // GB12. ^ (RI RI)* RI ? RI
    // GB13. [^RI] (RI RI)* RI ? RI
    if (mid.indexOf(Regional_Indicator) != -1) {
      return Break;
    }
    if (previous == Regional_Indicator && next == Regional_Indicator) {
      return NotBreak;
    }

    // GB999. Any ? Any
    return BreakStart;
  }

  // Returns the next grapheme break in the string after the given index
  this.nextBreak = function (string, index) {
    if (index === undefined) {
      index = 0;
    }
    if (index < 0) {
      return 0;
    }
    if (index >= string.length - 1) {
      return string.length;
    }
    var prev = getGraphemeBreakProperty(codePointAt(string, index));
    var mid = [];
    for (var i = index + 1; i < string.length; i++) {
      // check for already processed low surrogates
      if (isSurrogate(string, i - 1)) {
        continue;
      }

      var next = getGraphemeBreakProperty(codePointAt(string, i));
      if (shouldBreak(prev, mid, next)) {
        return i;
      }

      mid.push(next);
    }
    return string.length;
  };

  // Breaks the given string into an array of grapheme cluster strings
  this.splitGraphemes = function (str) {
    var res = [];
    var index = 0;
    var brk;
    while ((brk = this.nextBreak(str, index)) < str.length) {
      res.push(str.slice(index, brk));
      index = brk;
    }
    if (index < str.length) {
      res.push(str.slice(index));
    }
    return res;
  };

  // Returns the iterator of grapheme clusters there are in the given string
  this.iterateGraphemes = function (str) {
    var index = 0;
    var res = {
      next: function () {
        var value;
        var brk;
        if ((brk = this.nextBreak(str, index)) < str.length) {
          value = str.slice(index, brk);
          index = brk;
          return { value: value, done: false };
        }
        if (index < str.length) {
          value = str.slice(index);
          index = str.length;
          return { value: value, done: false };
        }
        return { value: undefined, done: true };
      }.bind(this) };

    // ES2015 @@iterator method (iterable) for spread syntax and for...of statement
    if (typeof Symbol !== 'undefined' && Symbol.iterator) {
      res[Symbol.iterator] = function () {return res;};
    }
    return res;
  };

  // Returns the number of grapheme clusters there are in the given string
  this.countGraphemes = function (str) {
    var count = 0;
    var index = 0;
    var brk;
    while ((brk = this.nextBreak(str, index)) < str.length) {
      index = brk;
      count++;
    }
    if (index < str.length) {
      count++;
    }
    return count;
  };

  //given a Unicode code point, determines this symbol's grapheme break property
  function getGraphemeBreakProperty(code) {

    //grapheme break property for Unicode 10.0.0, 
    //taken from http://www.unicode.org/Public/10.0.0/ucd/auxiliary/GraphemeBreakProperty.txt
    //and adapted to JavaScript rules

    if (
    0x0600 <= code && code <= 0x0605 || // Cf   [6] ARABIC NUMBER SIGN..ARABIC NUMBER MARK ABOVE
    0x06DD == code || // Cf       ARABIC END OF AYAH
    0x070F == code || // Cf       SYRIAC ABBREVIATION MARK
    0x08E2 == code || // Cf       ARABIC DISPUTED END OF AYAH
    0x0D4E == code || // Lo       MALAYALAM LETTER DOT REPH
    0x110BD == code || // Cf       KAITHI NUMBER SIGN
    0x111C2 <= code && code <= 0x111C3 || // Lo   [2] SHARADA SIGN JIHVAMULIYA..SHARADA SIGN UPADHMANIYA
    0x11A3A == code || // Lo       ZANABAZAR SQUARE CLUSTER-INITIAL LETTER RA
    0x11A86 <= code && code <= 0x11A89 || // Lo   [4] SOYOMBO CLUSTER-INITIAL LETTER RA..SOYOMBO CLUSTER-INITIAL LETTER SA
    0x11D46 == code // Lo       MASARAM GONDI REPHA
    ) {
        return Prepend;
      }
    if (
    0x000D == code // Cc       <control-000D>
    ) {
        return CR;
      }

    if (
    0x000A == code // Cc       <control-000A>
    ) {
        return LF;
      }


    if (
    0x0000 <= code && code <= 0x0009 || // Cc  [10] <control-0000>..<control-0009>
    0x000B <= code && code <= 0x000C || // Cc   [2] <control-000B>..<control-000C>
    0x000E <= code && code <= 0x001F || // Cc  [18] <control-000E>..<control-001F>
    0x007F <= code && code <= 0x009F || // Cc  [33] <control-007F>..<control-009F>
    0x00AD == code || // Cf       SOFT HYPHEN
    0x061C == code || // Cf       ARABIC LETTER MARK

    0x180E == code || // Cf       MONGOLIAN VOWEL SEPARATOR
    0x200B == code || // Cf       ZERO WIDTH SPACE
    0x200E <= code && code <= 0x200F || // Cf   [2] LEFT-TO-RIGHT MARK..RIGHT-TO-LEFT MARK
    0x2028 == code || // Zl       LINE SEPARATOR
    0x2029 == code || // Zp       PARAGRAPH SEPARATOR
    0x202A <= code && code <= 0x202E || // Cf   [5] LEFT-TO-RIGHT EMBEDDING..RIGHT-TO-LEFT OVERRIDE
    0x2060 <= code && code <= 0x2064 || // Cf   [5] WORD JOINER..INVISIBLE PLUS
    0x2065 == code || // Cn       <reserved-2065>
    0x2066 <= code && code <= 0x206F || // Cf  [10] LEFT-TO-RIGHT ISOLATE..NOMINAL DIGIT SHAPES
    0xD800 <= code && code <= 0xDFFF || // Cs [2048] <surrogate-D800>..<surrogate-DFFF>
    0xFEFF == code || // Cf       ZERO WIDTH NO-BREAK SPACE
    0xFFF0 <= code && code <= 0xFFF8 || // Cn   [9] <reserved-FFF0>..<reserved-FFF8>
    0xFFF9 <= code && code <= 0xFFFB || // Cf   [3] INTERLINEAR ANNOTATION ANCHOR..INTERLINEAR ANNOTATION TERMINATOR
    0x1BCA0 <= code && code <= 0x1BCA3 || // Cf   [4] SHORTHAND FORMAT LETTER OVERLAP..SHORTHAND FORMAT UP STEP
    0x1D173 <= code && code <= 0x1D17A || // Cf   [8] MUSICAL SYMBOL BEGIN BEAM..MUSICAL SYMBOL END PHRASE
    0xE0000 == code || // Cn       <reserved-E0000>
    0xE0001 == code || // Cf       LANGUAGE TAG
    0xE0002 <= code && code <= 0xE001F || // Cn  [30] <reserved-E0002>..<reserved-E001F>
    0xE0080 <= code && code <= 0xE00FF || // Cn [128] <reserved-E0080>..<reserved-E00FF>
    0xE01F0 <= code && code <= 0xE0FFF // Cn [3600] <reserved-E01F0>..<reserved-E0FFF>
    ) {
        return Control;
      }


    if (
    0x0300 <= code && code <= 0x036F || // Mn [112] COMBINING GRAVE ACCENT..COMBINING LATIN SMALL LETTER X
    0x0483 <= code && code <= 0x0487 || // Mn   [5] COMBINING CYRILLIC TITLO..COMBINING CYRILLIC POKRYTIE
    0x0488 <= code && code <= 0x0489 || // Me   [2] COMBINING CYRILLIC HUNDRED THOUSANDS SIGN..COMBINING CYRILLIC MILLIONS SIGN
    0x0591 <= code && code <= 0x05BD || // Mn  [45] HEBREW ACCENT ETNAHTA..HEBREW POINT METEG
    0x05BF == code || // Mn       HEBREW POINT RAFE
    0x05C1 <= code && code <= 0x05C2 || // Mn   [2] HEBREW POINT SHIN DOT..HEBREW POINT SIN DOT
    0x05C4 <= code && code <= 0x05C5 || // Mn   [2] HEBREW MARK UPPER DOT..HEBREW MARK LOWER DOT
    0x05C7 == code || // Mn       HEBREW POINT QAMATS QATAN
    0x0610 <= code && code <= 0x061A || // Mn  [11] ARABIC SIGN SALLALLAHOU ALAYHE WASSALLAM..ARABIC SMALL KASRA
    0x064B <= code && code <= 0x065F || // Mn  [21] ARABIC FATHATAN..ARABIC WAVY HAMZA BELOW
    0x0670 == code || // Mn       ARABIC LETTER SUPERSCRIPT ALEF
    0x06D6 <= code && code <= 0x06DC || // Mn   [7] ARABIC SMALL HIGH LIGATURE SAD WITH LAM WITH ALEF MAKSURA..ARABIC SMALL HIGH SEEN
    0x06DF <= code && code <= 0x06E4 || // Mn   [6] ARABIC SMALL HIGH ROUNDED ZERO..ARABIC SMALL HIGH MADDA
    0x06E7 <= code && code <= 0x06E8 || // Mn   [2] ARABIC SMALL HIGH YEH..ARABIC SMALL HIGH NOON
    0x06EA <= code && code <= 0x06ED || // Mn   [4] ARABIC EMPTY CENTRE LOW STOP..ARABIC SMALL LOW MEEM
    0x0711 == code || // Mn       SYRIAC LETTER SUPERSCRIPT ALAPH
    0x0730 <= code && code <= 0x074A || // Mn  [27] SYRIAC PTHAHA ABOVE..SYRIAC BARREKH
    0x07A6 <= code && code <= 0x07B0 || // Mn  [11] THAANA ABAFILI..THAANA SUKUN
    0x07EB <= code && code <= 0x07F3 || // Mn   [9] NKO COMBINING SHORT HIGH TONE..NKO COMBINING DOUBLE DOT ABOVE
    0x0816 <= code && code <= 0x0819 || // Mn   [4] SAMARITAN MARK IN..SAMARITAN MARK DAGESH
    0x081B <= code && code <= 0x0823 || // Mn   [9] SAMARITAN MARK EPENTHETIC YUT..SAMARITAN VOWEL SIGN A
    0x0825 <= code && code <= 0x0827 || // Mn   [3] SAMARITAN VOWEL SIGN SHORT A..SAMARITAN VOWEL SIGN U
    0x0829 <= code && code <= 0x082D || // Mn   [5] SAMARITAN VOWEL SIGN LONG I..SAMARITAN MARK NEQUDAA
    0x0859 <= code && code <= 0x085B || // Mn   [3] MANDAIC AFFRICATION MARK..MANDAIC GEMINATION MARK
    0x08D4 <= code && code <= 0x08E1 || // Mn  [14] ARABIC SMALL HIGH WORD AR-RUB..ARABIC SMALL HIGH SIGN SAFHA
    0x08E3 <= code && code <= 0x0902 || // Mn  [32] ARABIC TURNED DAMMA BELOW..DEVANAGARI SIGN ANUSVARA
    0x093A == code || // Mn       DEVANAGARI VOWEL SIGN OE
    0x093C == code || // Mn       DEVANAGARI SIGN NUKTA
    0x0941 <= code && code <= 0x0948 || // Mn   [8] DEVANAGARI VOWEL SIGN U..DEVANAGARI VOWEL SIGN AI
    0x094D == code || // Mn       DEVANAGARI SIGN VIRAMA
    0x0951 <= code && code <= 0x0957 || // Mn   [7] DEVANAGARI STRESS SIGN UDATTA..DEVANAGARI VOWEL SIGN UUE
    0x0962 <= code && code <= 0x0963 || // Mn   [2] DEVANAGARI VOWEL SIGN VOCALIC L..DEVANAGARI VOWEL SIGN VOCALIC LL
    0x0981 == code || // Mn       BENGALI SIGN CANDRABINDU
    0x09BC == code || // Mn       BENGALI SIGN NUKTA
    0x09BE == code || // Mc       BENGALI VOWEL SIGN AA
    0x09C1 <= code && code <= 0x09C4 || // Mn   [4] BENGALI VOWEL SIGN U..BENGALI VOWEL SIGN VOCALIC RR
    0x09CD == code || // Mn       BENGALI SIGN VIRAMA
    0x09D7 == code || // Mc       BENGALI AU LENGTH MARK
    0x09E2 <= code && code <= 0x09E3 || // Mn   [2] BENGALI VOWEL SIGN VOCALIC L..BENGALI VOWEL SIGN VOCALIC LL
    0x0A01 <= code && code <= 0x0A02 || // Mn   [2] GURMUKHI SIGN ADAK BINDI..GURMUKHI SIGN BINDI
    0x0A3C == code || // Mn       GURMUKHI SIGN NUKTA
    0x0A41 <= code && code <= 0x0A42 || // Mn   [2] GURMUKHI VOWEL SIGN U..GURMUKHI VOWEL SIGN UU
    0x0A47 <= code && code <= 0x0A48 || // Mn   [2] GURMUKHI VOWEL SIGN EE..GURMUKHI VOWEL SIGN AI
    0x0A4B <= code && code <= 0x0A4D || // Mn   [3] GURMUKHI VOWEL SIGN OO..GURMUKHI SIGN VIRAMA
    0x0A51 == code || // Mn       GURMUKHI SIGN UDAAT
    0x0A70 <= code && code <= 0x0A71 || // Mn   [2] GURMUKHI TIPPI..GURMUKHI ADDAK
    0x0A75 == code || // Mn       GURMUKHI SIGN YAKASH
    0x0A81 <= code && code <= 0x0A82 || // Mn   [2] GUJARATI SIGN CANDRABINDU..GUJARATI SIGN ANUSVARA
    0x0ABC == code || // Mn       GUJARATI SIGN NUKTA
    0x0AC1 <= code && code <= 0x0AC5 || // Mn   [5] GUJARATI VOWEL SIGN U..GUJARATI VOWEL SIGN CANDRA E
    0x0AC7 <= code && code <= 0x0AC8 || // Mn   [2] GUJARATI VOWEL SIGN E..GUJARATI VOWEL SIGN AI
    0x0ACD == code || // Mn       GUJARATI SIGN VIRAMA
    0x0AE2 <= code && code <= 0x0AE3 || // Mn   [2] GUJARATI VOWEL SIGN VOCALIC L..GUJARATI VOWEL SIGN VOCALIC LL
    0x0AFA <= code && code <= 0x0AFF || // Mn   [6] GUJARATI SIGN SUKUN..GUJARATI SIGN TWO-CIRCLE NUKTA ABOVE
    0x0B01 == code || // Mn       ORIYA SIGN CANDRABINDU
    0x0B3C == code || // Mn       ORIYA SIGN NUKTA
    0x0B3E == code || // Mc       ORIYA VOWEL SIGN AA
    0x0B3F == code || // Mn       ORIYA VOWEL SIGN I
    0x0B41 <= code && code <= 0x0B44 || // Mn   [4] ORIYA VOWEL SIGN U..ORIYA VOWEL SIGN VOCALIC RR
    0x0B4D == code || // Mn       ORIYA SIGN VIRAMA
    0x0B56 == code || // Mn       ORIYA AI LENGTH MARK
    0x0B57 == code || // Mc       ORIYA AU LENGTH MARK
    0x0B62 <= code && code <= 0x0B63 || // Mn   [2] ORIYA VOWEL SIGN VOCALIC L..ORIYA VOWEL SIGN VOCALIC LL
    0x0B82 == code || // Mn       TAMIL SIGN ANUSVARA
    0x0BBE == code || // Mc       TAMIL VOWEL SIGN AA
    0x0BC0 == code || // Mn       TAMIL VOWEL SIGN II
    0x0BCD == code || // Mn       TAMIL SIGN VIRAMA
    0x0BD7 == code || // Mc       TAMIL AU LENGTH MARK
    0x0C00 == code || // Mn       TELUGU SIGN COMBINING CANDRABINDU ABOVE
    0x0C3E <= code && code <= 0x0C40 || // Mn   [3] TELUGU VOWEL SIGN AA..TELUGU VOWEL SIGN II
    0x0C46 <= code && code <= 0x0C48 || // Mn   [3] TELUGU VOWEL SIGN E..TELUGU VOWEL SIGN AI
    0x0C4A <= code && code <= 0x0C4D || // Mn   [4] TELUGU VOWEL SIGN O..TELUGU SIGN VIRAMA
    0x0C55 <= code && code <= 0x0C56 || // Mn   [2] TELUGU LENGTH MARK..TELUGU AI LENGTH MARK
    0x0C62 <= code && code <= 0x0C63 || // Mn   [2] TELUGU VOWEL SIGN VOCALIC L..TELUGU VOWEL SIGN VOCALIC LL
    0x0C81 == code || // Mn       KANNADA SIGN CANDRABINDU
    0x0CBC == code || // Mn       KANNADA SIGN NUKTA
    0x0CBF == code || // Mn       KANNADA VOWEL SIGN I
    0x0CC2 == code || // Mc       KANNADA VOWEL SIGN UU
    0x0CC6 == code || // Mn       KANNADA VOWEL SIGN E
    0x0CCC <= code && code <= 0x0CCD || // Mn   [2] KANNADA VOWEL SIGN AU..KANNADA SIGN VIRAMA
    0x0CD5 <= code && code <= 0x0CD6 || // Mc   [2] KANNADA LENGTH MARK..KANNADA AI LENGTH MARK
    0x0CE2 <= code && code <= 0x0CE3 || // Mn   [2] KANNADA VOWEL SIGN VOCALIC L..KANNADA VOWEL SIGN VOCALIC LL
    0x0D00 <= code && code <= 0x0D01 || // Mn   [2] MALAYALAM SIGN COMBINING ANUSVARA ABOVE..MALAYALAM SIGN CANDRABINDU
    0x0D3B <= code && code <= 0x0D3C || // Mn   [2] MALAYALAM SIGN VERTICAL BAR VIRAMA..MALAYALAM SIGN CIRCULAR VIRAMA
    0x0D3E == code || // Mc       MALAYALAM VOWEL SIGN AA
    0x0D41 <= code && code <= 0x0D44 || // Mn   [4] MALAYALAM VOWEL SIGN U..MALAYALAM VOWEL SIGN VOCALIC RR
    0x0D4D == code || // Mn       MALAYALAM SIGN VIRAMA
    0x0D57 == code || // Mc       MALAYALAM AU LENGTH MARK
    0x0D62 <= code && code <= 0x0D63 || // Mn   [2] MALAYALAM VOWEL SIGN VOCALIC L..MALAYALAM VOWEL SIGN VOCALIC LL
    0x0DCA == code || // Mn       SINHALA SIGN AL-LAKUNA
    0x0DCF == code || // Mc       SINHALA VOWEL SIGN AELA-PILLA
    0x0DD2 <= code && code <= 0x0DD4 || // Mn   [3] SINHALA VOWEL SIGN KETTI IS-PILLA..SINHALA VOWEL SIGN KETTI PAA-PILLA
    0x0DD6 == code || // Mn       SINHALA VOWEL SIGN DIGA PAA-PILLA
    0x0DDF == code || // Mc       SINHALA VOWEL SIGN GAYANUKITTA
    0x0E31 == code || // Mn       THAI CHARACTER MAI HAN-AKAT
    0x0E34 <= code && code <= 0x0E3A || // Mn   [7] THAI CHARACTER SARA I..THAI CHARACTER PHINTHU
    0x0E47 <= code && code <= 0x0E4E || // Mn   [8] THAI CHARACTER MAITAIKHU..THAI CHARACTER YAMAKKAN
    0x0EB1 == code || // Mn       LAO VOWEL SIGN MAI KAN
    0x0EB4 <= code && code <= 0x0EB9 || // Mn   [6] LAO VOWEL SIGN I..LAO VOWEL SIGN UU
    0x0EBB <= code && code <= 0x0EBC || // Mn   [2] LAO VOWEL SIGN MAI KON..LAO SEMIVOWEL SIGN LO
    0x0EC8 <= code && code <= 0x0ECD || // Mn   [6] LAO TONE MAI EK..LAO NIGGAHITA
    0x0F18 <= code && code <= 0x0F19 || // Mn   [2] TIBETAN ASTROLOGICAL SIGN -KHYUD PA..TIBETAN ASTROLOGICAL SIGN SDONG TSHUGS
    0x0F35 == code || // Mn       TIBETAN MARK NGAS BZUNG NYI ZLA
    0x0F37 == code || // Mn       TIBETAN MARK NGAS BZUNG SGOR RTAGS
    0x0F39 == code || // Mn       TIBETAN MARK TSA -PHRU
    0x0F71 <= code && code <= 0x0F7E || // Mn  [14] TIBETAN VOWEL SIGN AA..TIBETAN SIGN RJES SU NGA RO
    0x0F80 <= code && code <= 0x0F84 || // Mn   [5] TIBETAN VOWEL SIGN REVERSED I..TIBETAN MARK HALANTA
    0x0F86 <= code && code <= 0x0F87 || // Mn   [2] TIBETAN SIGN LCI RTAGS..TIBETAN SIGN YANG RTAGS
    0x0F8D <= code && code <= 0x0F97 || // Mn  [11] TIBETAN SUBJOINED SIGN LCE TSA CAN..TIBETAN SUBJOINED LETTER JA
    0x0F99 <= code && code <= 0x0FBC || // Mn  [36] TIBETAN SUBJOINED LETTER NYA..TIBETAN SUBJOINED LETTER FIXED-FORM RA
    0x0FC6 == code || // Mn       TIBETAN SYMBOL PADMA GDAN
    0x102D <= code && code <= 0x1030 || // Mn   [4] MYANMAR VOWEL SIGN I..MYANMAR VOWEL SIGN UU
    0x1032 <= code && code <= 0x1037 || // Mn   [6] MYANMAR VOWEL SIGN AI..MYANMAR SIGN DOT BELOW
    0x1039 <= code && code <= 0x103A || // Mn   [2] MYANMAR SIGN VIRAMA..MYANMAR SIGN ASAT
    0x103D <= code && code <= 0x103E || // Mn   [2] MYANMAR CONSONANT SIGN MEDIAL WA..MYANMAR CONSONANT SIGN MEDIAL HA
    0x1058 <= code && code <= 0x1059 || // Mn   [2] MYANMAR VOWEL SIGN VOCALIC L..MYANMAR VOWEL SIGN VOCALIC LL
    0x105E <= code && code <= 0x1060 || // Mn   [3] MYANMAR CONSONANT SIGN MON MEDIAL NA..MYANMAR CONSONANT SIGN MON MEDIAL LA
    0x1071 <= code && code <= 0x1074 || // Mn   [4] MYANMAR VOWEL SIGN GEBA KAREN I..MYANMAR VOWEL SIGN KAYAH EE
    0x1082 == code || // Mn       MYANMAR CONSONANT SIGN SHAN MEDIAL WA
    0x1085 <= code && code <= 0x1086 || // Mn   [2] MYANMAR VOWEL SIGN SHAN E ABOVE..MYANMAR VOWEL SIGN SHAN FINAL Y
    0x108D == code || // Mn       MYANMAR SIGN SHAN COUNCIL EMPHATIC TONE
    0x109D == code || // Mn       MYANMAR VOWEL SIGN AITON AI
    0x135D <= code && code <= 0x135F || // Mn   [3] ETHIOPIC COMBINING GEMINATION AND VOWEL LENGTH MARK..ETHIOPIC COMBINING GEMINATION MARK
    0x1712 <= code && code <= 0x1714 || // Mn   [3] TAGALOG VOWEL SIGN I..TAGALOG SIGN VIRAMA
    0x1732 <= code && code <= 0x1734 || // Mn   [3] HANUNOO VOWEL SIGN I..HANUNOO SIGN PAMUDPOD
    0x1752 <= code && code <= 0x1753 || // Mn   [2] BUHID VOWEL SIGN I..BUHID VOWEL SIGN U
    0x1772 <= code && code <= 0x1773 || // Mn   [2] TAGBANWA VOWEL SIGN I..TAGBANWA VOWEL SIGN U
    0x17B4 <= code && code <= 0x17B5 || // Mn   [2] KHMER VOWEL INHERENT AQ..KHMER VOWEL INHERENT AA
    0x17B7 <= code && code <= 0x17BD || // Mn   [7] KHMER VOWEL SIGN I..KHMER VOWEL SIGN UA
    0x17C6 == code || // Mn       KHMER SIGN NIKAHIT
    0x17C9 <= code && code <= 0x17D3 || // Mn  [11] KHMER SIGN MUUSIKATOAN..KHMER SIGN BATHAMASAT
    0x17DD == code || // Mn       KHMER SIGN ATTHACAN
    0x180B <= code && code <= 0x180D || // Mn   [3] MONGOLIAN FREE VARIATION SELECTOR ONE..MONGOLIAN FREE VARIATION SELECTOR THREE
    0x1885 <= code && code <= 0x1886 || // Mn   [2] MONGOLIAN LETTER ALI GALI BALUDA..MONGOLIAN LETTER ALI GALI THREE BALUDA
    0x18A9 == code || // Mn       MONGOLIAN LETTER ALI GALI DAGALGA
    0x1920 <= code && code <= 0x1922 || // Mn   [3] LIMBU VOWEL SIGN A..LIMBU VOWEL SIGN U
    0x1927 <= code && code <= 0x1928 || // Mn   [2] LIMBU VOWEL SIGN E..LIMBU VOWEL SIGN O
    0x1932 == code || // Mn       LIMBU SMALL LETTER ANUSVARA
    0x1939 <= code && code <= 0x193B || // Mn   [3] LIMBU SIGN MUKPHRENG..LIMBU SIGN SA-I
    0x1A17 <= code && code <= 0x1A18 || // Mn   [2] BUGINESE VOWEL SIGN I..BUGINESE VOWEL SIGN U
    0x1A1B == code || // Mn       BUGINESE VOWEL SIGN AE
    0x1A56 == code || // Mn       TAI THAM CONSONANT SIGN MEDIAL LA
    0x1A58 <= code && code <= 0x1A5E || // Mn   [7] TAI THAM SIGN MAI KANG LAI..TAI THAM CONSONANT SIGN SA
    0x1A60 == code || // Mn       TAI THAM SIGN SAKOT
    0x1A62 == code || // Mn       TAI THAM VOWEL SIGN MAI SAT
    0x1A65 <= code && code <= 0x1A6C || // Mn   [8] TAI THAM VOWEL SIGN I..TAI THAM VOWEL SIGN OA BELOW
    0x1A73 <= code && code <= 0x1A7C || // Mn  [10] TAI THAM VOWEL SIGN OA ABOVE..TAI THAM SIGN KHUEN-LUE KARAN
    0x1A7F == code || // Mn       TAI THAM COMBINING CRYPTOGRAMMIC DOT
    0x1AB0 <= code && code <= 0x1ABD || // Mn  [14] COMBINING DOUBLED CIRCUMFLEX ACCENT..COMBINING PARENTHESES BELOW
    0x1ABE == code || // Me       COMBINING PARENTHESES OVERLAY
    0x1B00 <= code && code <= 0x1B03 || // Mn   [4] BALINESE SIGN ULU RICEM..BALINESE SIGN SURANG
    0x1B34 == code || // Mn       BALINESE SIGN REREKAN
    0x1B36 <= code && code <= 0x1B3A || // Mn   [5] BALINESE VOWEL SIGN ULU..BALINESE VOWEL SIGN RA REPA
    0x1B3C == code || // Mn       BALINESE VOWEL SIGN LA LENGA
    0x1B42 == code || // Mn       BALINESE VOWEL SIGN PEPET
    0x1B6B <= code && code <= 0x1B73 || // Mn   [9] BALINESE MUSICAL SYMBOL COMBINING TEGEH..BALINESE MUSICAL SYMBOL COMBINING GONG
    0x1B80 <= code && code <= 0x1B81 || // Mn   [2] SUNDANESE SIGN PANYECEK..SUNDANESE SIGN PANGLAYAR
    0x1BA2 <= code && code <= 0x1BA5 || // Mn   [4] SUNDANESE CONSONANT SIGN PANYAKRA..SUNDANESE VOWEL SIGN PANYUKU
    0x1BA8 <= code && code <= 0x1BA9 || // Mn   [2] SUNDANESE VOWEL SIGN PAMEPET..SUNDANESE VOWEL SIGN PANEULEUNG
    0x1BAB <= code && code <= 0x1BAD || // Mn   [3] SUNDANESE SIGN VIRAMA..SUNDANESE CONSONANT SIGN PASANGAN WA
    0x1BE6 == code || // Mn       BATAK SIGN TOMPI
    0x1BE8 <= code && code <= 0x1BE9 || // Mn   [2] BATAK VOWEL SIGN PAKPAK E..BATAK VOWEL SIGN EE
    0x1BED == code || // Mn       BATAK VOWEL SIGN KARO O
    0x1BEF <= code && code <= 0x1BF1 || // Mn   [3] BATAK VOWEL SIGN U FOR SIMALUNGUN SA..BATAK CONSONANT SIGN H
    0x1C2C <= code && code <= 0x1C33 || // Mn   [8] LEPCHA VOWEL SIGN E..LEPCHA CONSONANT SIGN T
    0x1C36 <= code && code <= 0x1C37 || // Mn   [2] LEPCHA SIGN RAN..LEPCHA SIGN NUKTA
    0x1CD0 <= code && code <= 0x1CD2 || // Mn   [3] VEDIC TONE KARSHANA..VEDIC TONE PRENKHA
    0x1CD4 <= code && code <= 0x1CE0 || // Mn  [13] VEDIC SIGN YAJURVEDIC MIDLINE SVARITA..VEDIC TONE RIGVEDIC KASHMIRI INDEPENDENT SVARITA
    0x1CE2 <= code && code <= 0x1CE8 || // Mn   [7] VEDIC SIGN VISARGA SVARITA..VEDIC SIGN VISARGA ANUDATTA WITH TAIL
    0x1CED == code || // Mn       VEDIC SIGN TIRYAK
    0x1CF4 == code || // Mn       VEDIC TONE CANDRA ABOVE
    0x1CF8 <= code && code <= 0x1CF9 || // Mn   [2] VEDIC TONE RING ABOVE..VEDIC TONE DOUBLE RING ABOVE
    0x1DC0 <= code && code <= 0x1DF9 || // Mn  [58] COMBINING DOTTED GRAVE ACCENT..COMBINING WIDE INVERTED BRIDGE BELOW
    0x1DFB <= code && code <= 0x1DFF || // Mn   [5] COMBINING DELETION MARK..COMBINING RIGHT ARROWHEAD AND DOWN ARROWHEAD BELOW
    0x200C == code || // Cf       ZERO WIDTH NON-JOINER
    0x20D0 <= code && code <= 0x20DC || // Mn  [13] COMBINING LEFT HARPOON ABOVE..COMBINING FOUR DOTS ABOVE
    0x20DD <= code && code <= 0x20E0 || // Me   [4] COMBINING ENCLOSING CIRCLE..COMBINING ENCLOSING CIRCLE BACKSLASH
    0x20E1 == code || // Mn       COMBINING LEFT RIGHT ARROW ABOVE
    0x20E2 <= code && code <= 0x20E4 || // Me   [3] COMBINING ENCLOSING SCREEN..COMBINING ENCLOSING UPWARD POINTING TRIANGLE
    0x20E5 <= code && code <= 0x20F0 || // Mn  [12] COMBINING REVERSE SOLIDUS OVERLAY..COMBINING ASTERISK ABOVE
    0x2CEF <= code && code <= 0x2CF1 || // Mn   [3] COPTIC COMBINING NI ABOVE..COPTIC COMBINING SPIRITUS LENIS
    0x2D7F == code || // Mn       TIFINAGH CONSONANT JOINER
    0x2DE0 <= code && code <= 0x2DFF || // Mn  [32] COMBINING CYRILLIC LETTER BE..COMBINING CYRILLIC LETTER IOTIFIED BIG YUS
    0x302A <= code && code <= 0x302D || // Mn   [4] IDEOGRAPHIC LEVEL TONE MARK..IDEOGRAPHIC ENTERING TONE MARK
    0x302E <= code && code <= 0x302F || // Mc   [2] HANGUL SINGLE DOT TONE MARK..HANGUL DOUBLE DOT TONE MARK
    0x3099 <= code && code <= 0x309A || // Mn   [2] COMBINING KATAKANA-HIRAGANA VOICED SOUND MARK..COMBINING KATAKANA-HIRAGANA SEMI-VOICED SOUND MARK
    0xA66F == code || // Mn       COMBINING CYRILLIC VZMET
    0xA670 <= code && code <= 0xA672 || // Me   [3] COMBINING CYRILLIC TEN MILLIONS SIGN..COMBINING CYRILLIC THOUSAND MILLIONS SIGN
    0xA674 <= code && code <= 0xA67D || // Mn  [10] COMBINING CYRILLIC LETTER UKRAINIAN IE..COMBINING CYRILLIC PAYEROK
    0xA69E <= code && code <= 0xA69F || // Mn   [2] COMBINING CYRILLIC LETTER EF..COMBINING CYRILLIC LETTER IOTIFIED E
    0xA6F0 <= code && code <= 0xA6F1 || // Mn   [2] BAMUM COMBINING MARK KOQNDON..BAMUM COMBINING MARK TUKWENTIS
    0xA802 == code || // Mn       SYLOTI NAGRI SIGN DVISVARA
    0xA806 == code || // Mn       SYLOTI NAGRI SIGN HASANTA
    0xA80B == code || // Mn       SYLOTI NAGRI SIGN ANUSVARA
    0xA825 <= code && code <= 0xA826 || // Mn   [2] SYLOTI NAGRI VOWEL SIGN U..SYLOTI NAGRI VOWEL SIGN E
    0xA8C4 <= code && code <= 0xA8C5 || // Mn   [2] SAURASHTRA SIGN VIRAMA..SAURASHTRA SIGN CANDRABINDU
    0xA8E0 <= code && code <= 0xA8F1 || // Mn  [18] COMBINING DEVANAGARI DIGIT ZERO..COMBINING DEVANAGARI SIGN AVAGRAHA
    0xA926 <= code && code <= 0xA92D || // Mn   [8] KAYAH LI VOWEL UE..KAYAH LI TONE CALYA PLOPHU
    0xA947 <= code && code <= 0xA951 || // Mn  [11] REJANG VOWEL SIGN I..REJANG CONSONANT SIGN R
    0xA980 <= code && code <= 0xA982 || // Mn   [3] JAVANESE SIGN PANYANGGA..JAVANESE SIGN LAYAR
    0xA9B3 == code || // Mn       JAVANESE SIGN CECAK TELU
    0xA9B6 <= code && code <= 0xA9B9 || // Mn   [4] JAVANESE VOWEL SIGN WULU..JAVANESE VOWEL SIGN SUKU MENDUT
    0xA9BC == code || // Mn       JAVANESE VOWEL SIGN PEPET
    0xA9E5 == code || // Mn       MYANMAR SIGN SHAN SAW
    0xAA29 <= code && code <= 0xAA2E || // Mn   [6] CHAM VOWEL SIGN AA..CHAM VOWEL SIGN OE
    0xAA31 <= code && code <= 0xAA32 || // Mn   [2] CHAM VOWEL SIGN AU..CHAM VOWEL SIGN UE
    0xAA35 <= code && code <= 0xAA36 || // Mn   [2] CHAM CONSONANT SIGN LA..CHAM CONSONANT SIGN WA
    0xAA43 == code || // Mn       CHAM CONSONANT SIGN FINAL NG
    0xAA4C == code || // Mn       CHAM CONSONANT SIGN FINAL M
    0xAA7C == code || // Mn       MYANMAR SIGN TAI LAING TONE-2
    0xAAB0 == code || // Mn       TAI VIET MAI KANG
    0xAAB2 <= code && code <= 0xAAB4 || // Mn   [3] TAI VIET VOWEL I..TAI VIET VOWEL U
    0xAAB7 <= code && code <= 0xAAB8 || // Mn   [2] TAI VIET MAI KHIT..TAI VIET VOWEL IA
    0xAABE <= code && code <= 0xAABF || // Mn   [2] TAI VIET VOWEL AM..TAI VIET TONE MAI EK
    0xAAC1 == code || // Mn       TAI VIET TONE MAI THO
    0xAAEC <= code && code <= 0xAAED || // Mn   [2] MEETEI MAYEK VOWEL SIGN UU..MEETEI MAYEK VOWEL SIGN AAI
    0xAAF6 == code || // Mn       MEETEI MAYEK VIRAMA
    0xABE5 == code || // Mn       MEETEI MAYEK VOWEL SIGN ANAP
    0xABE8 == code || // Mn       MEETEI MAYEK VOWEL SIGN UNAP
    0xABED == code || // Mn       MEETEI MAYEK APUN IYEK
    0xFB1E == code || // Mn       HEBREW POINT JUDEO-SPANISH VARIKA
    0xFE00 <= code && code <= 0xFE0F || // Mn  [16] VARIATION SELECTOR-1..VARIATION SELECTOR-16
    0xFE20 <= code && code <= 0xFE2F || // Mn  [16] COMBINING LIGATURE LEFT HALF..COMBINING CYRILLIC TITLO RIGHT HALF
    0xFF9E <= code && code <= 0xFF9F || // Lm   [2] HALFWIDTH KATAKANA VOICED SOUND MARK..HALFWIDTH KATAKANA SEMI-VOICED SOUND MARK
    0x101FD == code || // Mn       PHAISTOS DISC SIGN COMBINING OBLIQUE STROKE
    0x102E0 == code || // Mn       COPTIC EPACT THOUSANDS MARK
    0x10376 <= code && code <= 0x1037A || // Mn   [5] COMBINING OLD PERMIC LETTER AN..COMBINING OLD PERMIC LETTER SII
    0x10A01 <= code && code <= 0x10A03 || // Mn   [3] KHAROSHTHI VOWEL SIGN I..KHAROSHTHI VOWEL SIGN VOCALIC R
    0x10A05 <= code && code <= 0x10A06 || // Mn   [2] KHAROSHTHI VOWEL SIGN E..KHAROSHTHI VOWEL SIGN O
    0x10A0C <= code && code <= 0x10A0F || // Mn   [4] KHAROSHTHI VOWEL LENGTH MARK..KHAROSHTHI SIGN VISARGA
    0x10A38 <= code && code <= 0x10A3A || // Mn   [3] KHAROSHTHI SIGN BAR ABOVE..KHAROSHTHI SIGN DOT BELOW
    0x10A3F == code || // Mn       KHAROSHTHI VIRAMA
    0x10AE5 <= code && code <= 0x10AE6 || // Mn   [2] MANICHAEAN ABBREVIATION MARK ABOVE..MANICHAEAN ABBREVIATION MARK BELOW
    0x11001 == code || // Mn       BRAHMI SIGN ANUSVARA
    0x11038 <= code && code <= 0x11046 || // Mn  [15] BRAHMI VOWEL SIGN AA..BRAHMI VIRAMA
    0x1107F <= code && code <= 0x11081 || // Mn   [3] BRAHMI NUMBER JOINER..KAITHI SIGN ANUSVARA
    0x110B3 <= code && code <= 0x110B6 || // Mn   [4] KAITHI VOWEL SIGN U..KAITHI VOWEL SIGN AI
    0x110B9 <= code && code <= 0x110BA || // Mn   [2] KAITHI SIGN VIRAMA..KAITHI SIGN NUKTA
    0x11100 <= code && code <= 0x11102 || // Mn   [3] CHAKMA SIGN CANDRABINDU..CHAKMA SIGN VISARGA
    0x11127 <= code && code <= 0x1112B || // Mn   [5] CHAKMA VOWEL SIGN A..CHAKMA VOWEL SIGN UU
    0x1112D <= code && code <= 0x11134 || // Mn   [8] CHAKMA VOWEL SIGN AI..CHAKMA MAAYYAA
    0x11173 == code || // Mn       MAHAJANI SIGN NUKTA
    0x11180 <= code && code <= 0x11181 || // Mn   [2] SHARADA SIGN CANDRABINDU..SHARADA SIGN ANUSVARA
    0x111B6 <= code && code <= 0x111BE || // Mn   [9] SHARADA VOWEL SIGN U..SHARADA VOWEL SIGN O
    0x111CA <= code && code <= 0x111CC || // Mn   [3] SHARADA SIGN NUKTA..SHARADA EXTRA SHORT VOWEL MARK
    0x1122F <= code && code <= 0x11231 || // Mn   [3] KHOJKI VOWEL SIGN U..KHOJKI VOWEL SIGN AI
    0x11234 == code || // Mn       KHOJKI SIGN ANUSVARA
    0x11236 <= code && code <= 0x11237 || // Mn   [2] KHOJKI SIGN NUKTA..KHOJKI SIGN SHADDA
    0x1123E == code || // Mn       KHOJKI SIGN SUKUN
    0x112DF == code || // Mn       KHUDAWADI SIGN ANUSVARA
    0x112E3 <= code && code <= 0x112EA || // Mn   [8] KHUDAWADI VOWEL SIGN U..KHUDAWADI SIGN VIRAMA
    0x11300 <= code && code <= 0x11301 || // Mn   [2] GRANTHA SIGN COMBINING ANUSVARA ABOVE..GRANTHA SIGN CANDRABINDU
    0x1133C == code || // Mn       GRANTHA SIGN NUKTA
    0x1133E == code || // Mc       GRANTHA VOWEL SIGN AA
    0x11340 == code || // Mn       GRANTHA VOWEL SIGN II
    0x11357 == code || // Mc       GRANTHA AU LENGTH MARK
    0x11366 <= code && code <= 0x1136C || // Mn   [7] COMBINING GRANTHA DIGIT ZERO..COMBINING GRANTHA DIGIT SIX
    0x11370 <= code && code <= 0x11374 || // Mn   [5] COMBINING GRANTHA LETTER A..COMBINING GRANTHA LETTER PA
    0x11438 <= code && code <= 0x1143F || // Mn   [8] NEWA VOWEL SIGN U..NEWA VOWEL SIGN AI
    0x11442 <= code && code <= 0x11444 || // Mn   [3] NEWA SIGN VIRAMA..NEWA SIGN ANUSVARA
    0x11446 == code || // Mn       NEWA SIGN NUKTA
    0x114B0 == code || // Mc       TIRHUTA VOWEL SIGN AA
    0x114B3 <= code && code <= 0x114B8 || // Mn   [6] TIRHUTA VOWEL SIGN U..TIRHUTA VOWEL SIGN VOCALIC LL
    0x114BA == code || // Mn       TIRHUTA VOWEL SIGN SHORT E
    0x114BD == code || // Mc       TIRHUTA VOWEL SIGN SHORT O
    0x114BF <= code && code <= 0x114C0 || // Mn   [2] TIRHUTA SIGN CANDRABINDU..TIRHUTA SIGN ANUSVARA
    0x114C2 <= code && code <= 0x114C3 || // Mn   [2] TIRHUTA SIGN VIRAMA..TIRHUTA SIGN NUKTA
    0x115AF == code || // Mc       SIDDHAM VOWEL SIGN AA
    0x115B2 <= code && code <= 0x115B5 || // Mn   [4] SIDDHAM VOWEL SIGN U..SIDDHAM VOWEL SIGN VOCALIC RR
    0x115BC <= code && code <= 0x115BD || // Mn   [2] SIDDHAM SIGN CANDRABINDU..SIDDHAM SIGN ANUSVARA
    0x115BF <= code && code <= 0x115C0 || // Mn   [2] SIDDHAM SIGN VIRAMA..SIDDHAM SIGN NUKTA
    0x115DC <= code && code <= 0x115DD || // Mn   [2] SIDDHAM VOWEL SIGN ALTERNATE U..SIDDHAM VOWEL SIGN ALTERNATE UU
    0x11633 <= code && code <= 0x1163A || // Mn   [8] MODI VOWEL SIGN U..MODI VOWEL SIGN AI
    0x1163D == code || // Mn       MODI SIGN ANUSVARA
    0x1163F <= code && code <= 0x11640 || // Mn   [2] MODI SIGN VIRAMA..MODI SIGN ARDHACANDRA
    0x116AB == code || // Mn       TAKRI SIGN ANUSVARA
    0x116AD == code || // Mn       TAKRI VOWEL SIGN AA
    0x116B0 <= code && code <= 0x116B5 || // Mn   [6] TAKRI VOWEL SIGN U..TAKRI VOWEL SIGN AU
    0x116B7 == code || // Mn       TAKRI SIGN NUKTA
    0x1171D <= code && code <= 0x1171F || // Mn   [3] AHOM CONSONANT SIGN MEDIAL LA..AHOM CONSONANT SIGN MEDIAL LIGATING RA
    0x11722 <= code && code <= 0x11725 || // Mn   [4] AHOM VOWEL SIGN I..AHOM VOWEL SIGN UU
    0x11727 <= code && code <= 0x1172B || // Mn   [5] AHOM VOWEL SIGN AW..AHOM SIGN KILLER
    0x11A01 <= code && code <= 0x11A06 || // Mn   [6] ZANABAZAR SQUARE VOWEL SIGN I..ZANABAZAR SQUARE VOWEL SIGN O
    0x11A09 <= code && code <= 0x11A0A || // Mn   [2] ZANABAZAR SQUARE VOWEL SIGN REVERSED I..ZANABAZAR SQUARE VOWEL LENGTH MARK
    0x11A33 <= code && code <= 0x11A38 || // Mn   [6] ZANABAZAR SQUARE FINAL CONSONANT MARK..ZANABAZAR SQUARE SIGN ANUSVARA
    0x11A3B <= code && code <= 0x11A3E || // Mn   [4] ZANABAZAR SQUARE CLUSTER-FINAL LETTER YA..ZANABAZAR SQUARE CLUSTER-FINAL LETTER VA
    0x11A47 == code || // Mn       ZANABAZAR SQUARE SUBJOINER
    0x11A51 <= code && code <= 0x11A56 || // Mn   [6] SOYOMBO VOWEL SIGN I..SOYOMBO VOWEL SIGN OE
    0x11A59 <= code && code <= 0x11A5B || // Mn   [3] SOYOMBO VOWEL SIGN VOCALIC R..SOYOMBO VOWEL LENGTH MARK
    0x11A8A <= code && code <= 0x11A96 || // Mn  [13] SOYOMBO FINAL CONSONANT SIGN G..SOYOMBO SIGN ANUSVARA
    0x11A98 <= code && code <= 0x11A99 || // Mn   [2] SOYOMBO GEMINATION MARK..SOYOMBO SUBJOINER
    0x11C30 <= code && code <= 0x11C36 || // Mn   [7] BHAIKSUKI VOWEL SIGN I..BHAIKSUKI VOWEL SIGN VOCALIC L
    0x11C38 <= code && code <= 0x11C3D || // Mn   [6] BHAIKSUKI VOWEL SIGN E..BHAIKSUKI SIGN ANUSVARA
    0x11C3F == code || // Mn       BHAIKSUKI SIGN VIRAMA
    0x11C92 <= code && code <= 0x11CA7 || // Mn  [22] MARCHEN SUBJOINED LETTER KA..MARCHEN SUBJOINED LETTER ZA
    0x11CAA <= code && code <= 0x11CB0 || // Mn   [7] MARCHEN SUBJOINED LETTER RA..MARCHEN VOWEL SIGN AA
    0x11CB2 <= code && code <= 0x11CB3 || // Mn   [2] MARCHEN VOWEL SIGN U..MARCHEN VOWEL SIGN E
    0x11CB5 <= code && code <= 0x11CB6 || // Mn   [2] MARCHEN SIGN ANUSVARA..MARCHEN SIGN CANDRABINDU
    0x11D31 <= code && code <= 0x11D36 || // Mn   [6] MASARAM GONDI VOWEL SIGN AA..MASARAM GONDI VOWEL SIGN VOCALIC R
    0x11D3A == code || // Mn       MASARAM GONDI VOWEL SIGN E
    0x11D3C <= code && code <= 0x11D3D || // Mn   [2] MASARAM GONDI VOWEL SIGN AI..MASARAM GONDI VOWEL SIGN O
    0x11D3F <= code && code <= 0x11D45 || // Mn   [7] MASARAM GONDI VOWEL SIGN AU..MASARAM GONDI VIRAMA
    0x11D47 == code || // Mn       MASARAM GONDI RA-KARA
    0x16AF0 <= code && code <= 0x16AF4 || // Mn   [5] BASSA VAH COMBINING HIGH TONE..BASSA VAH COMBINING HIGH-LOW TONE
    0x16B30 <= code && code <= 0x16B36 || // Mn   [7] PAHAWH HMONG MARK CIM TUB..PAHAWH HMONG MARK CIM TAUM
    0x16F8F <= code && code <= 0x16F92 || // Mn   [4] MIAO TONE RIGHT..MIAO TONE BELOW
    0x1BC9D <= code && code <= 0x1BC9E || // Mn   [2] DUPLOYAN THICK LETTER SELECTOR..DUPLOYAN DOUBLE MARK
    0x1D165 == code || // Mc       MUSICAL SYMBOL COMBINING STEM
    0x1D167 <= code && code <= 0x1D169 || // Mn   [3] MUSICAL SYMBOL COMBINING TREMOLO-1..MUSICAL SYMBOL COMBINING TREMOLO-3
    0x1D16E <= code && code <= 0x1D172 || // Mc   [5] MUSICAL SYMBOL COMBINING FLAG-1..MUSICAL SYMBOL COMBINING FLAG-5
    0x1D17B <= code && code <= 0x1D182 || // Mn   [8] MUSICAL SYMBOL COMBINING ACCENT..MUSICAL SYMBOL COMBINING LOURE
    0x1D185 <= code && code <= 0x1D18B || // Mn   [7] MUSICAL SYMBOL COMBINING DOIT..MUSICAL SYMBOL COMBINING TRIPLE TONGUE
    0x1D1AA <= code && code <= 0x1D1AD || // Mn   [4] MUSICAL SYMBOL COMBINING DOWN BOW..MUSICAL SYMBOL COMBINING SNAP PIZZICATO
    0x1D242 <= code && code <= 0x1D244 || // Mn   [3] COMBINING GREEK MUSICAL TRISEME..COMBINING GREEK MUSICAL PENTASEME
    0x1DA00 <= code && code <= 0x1DA36 || // Mn  [55] SIGNWRITING HEAD RIM..SIGNWRITING AIR SUCKING IN
    0x1DA3B <= code && code <= 0x1DA6C || // Mn  [50] SIGNWRITING MOUTH CLOSED NEUTRAL..SIGNWRITING EXCITEMENT
    0x1DA75 == code || // Mn       SIGNWRITING UPPER BODY TILTING FROM HIP JOINTS
    0x1DA84 == code || // Mn       SIGNWRITING LOCATION HEAD NECK
    0x1DA9B <= code && code <= 0x1DA9F || // Mn   [5] SIGNWRITING FILL MODIFIER-2..SIGNWRITING FILL MODIFIER-6
    0x1DAA1 <= code && code <= 0x1DAAF || // Mn  [15] SIGNWRITING ROTATION MODIFIER-2..SIGNWRITING ROTATION MODIFIER-16
    0x1E000 <= code && code <= 0x1E006 || // Mn   [7] COMBINING GLAGOLITIC LETTER AZU..COMBINING GLAGOLITIC LETTER ZHIVETE
    0x1E008 <= code && code <= 0x1E018 || // Mn  [17] COMBINING GLAGOLITIC LETTER ZEMLJA..COMBINING GLAGOLITIC LETTER HERU
    0x1E01B <= code && code <= 0x1E021 || // Mn   [7] COMBINING GLAGOLITIC LETTER SHTA..COMBINING GLAGOLITIC LETTER YATI
    0x1E023 <= code && code <= 0x1E024 || // Mn   [2] COMBINING GLAGOLITIC LETTER YU..COMBINING GLAGOLITIC LETTER SMALL YUS
    0x1E026 <= code && code <= 0x1E02A || // Mn   [5] COMBINING GLAGOLITIC LETTER YO..COMBINING GLAGOLITIC LETTER FITA
    0x1E8D0 <= code && code <= 0x1E8D6 || // Mn   [7] MENDE KIKAKUI COMBINING NUMBER TEENS..MENDE KIKAKUI COMBINING NUMBER MILLIONS
    0x1E944 <= code && code <= 0x1E94A || // Mn   [7] ADLAM ALIF LENGTHENER..ADLAM NUKTA
    0xE0020 <= code && code <= 0xE007F || // Cf  [96] TAG SPACE..CANCEL TAG
    0xE0100 <= code && code <= 0xE01EF // Mn [240] VARIATION SELECTOR-17..VARIATION SELECTOR-256
    ) {
        return Extend;
      }


    if (
    0x1F1E6 <= code && code <= 0x1F1FF) // So  [26] REGIONAL INDICATOR SYMBOL LETTER A..REGIONAL INDICATOR SYMBOL LETTER Z
      {
        return Regional_Indicator;
      }

    if (
    0x0903 == code || // Mc       DEVANAGARI SIGN VISARGA
    0x093B == code || // Mc       DEVANAGARI VOWEL SIGN OOE
    0x093E <= code && code <= 0x0940 || // Mc   [3] DEVANAGARI VOWEL SIGN AA..DEVANAGARI VOWEL SIGN II
    0x0949 <= code && code <= 0x094C || // Mc   [4] DEVANAGARI VOWEL SIGN CANDRA O..DEVANAGARI VOWEL SIGN AU
    0x094E <= code && code <= 0x094F || // Mc   [2] DEVANAGARI VOWEL SIGN PRISHTHAMATRA E..DEVANAGARI VOWEL SIGN AW
    0x0982 <= code && code <= 0x0983 || // Mc   [2] BENGALI SIGN ANUSVARA..BENGALI SIGN VISARGA
    0x09BF <= code && code <= 0x09C0 || // Mc   [2] BENGALI VOWEL SIGN I..BENGALI VOWEL SIGN II
    0x09C7 <= code && code <= 0x09C8 || // Mc   [2] BENGALI VOWEL SIGN E..BENGALI VOWEL SIGN AI
    0x09CB <= code && code <= 0x09CC || // Mc   [2] BENGALI VOWEL SIGN O..BENGALI VOWEL SIGN AU
    0x0A03 == code || // Mc       GURMUKHI SIGN VISARGA
    0x0A3E <= code && code <= 0x0A40 || // Mc   [3] GURMUKHI VOWEL SIGN AA..GURMUKHI VOWEL SIGN II
    0x0A83 == code || // Mc       GUJARATI SIGN VISARGA
    0x0ABE <= code && code <= 0x0AC0 || // Mc   [3] GUJARATI VOWEL SIGN AA..GUJARATI VOWEL SIGN II
    0x0AC9 == code || // Mc       GUJARATI VOWEL SIGN CANDRA O
    0x0ACB <= code && code <= 0x0ACC || // Mc   [2] GUJARATI VOWEL SIGN O..GUJARATI VOWEL SIGN AU
    0x0B02 <= code && code <= 0x0B03 || // Mc   [2] ORIYA SIGN ANUSVARA..ORIYA SIGN VISARGA
    0x0B40 == code || // Mc       ORIYA VOWEL SIGN II
    0x0B47 <= code && code <= 0x0B48 || // Mc   [2] ORIYA VOWEL SIGN E..ORIYA VOWEL SIGN AI
    0x0B4B <= code && code <= 0x0B4C || // Mc   [2] ORIYA VOWEL SIGN O..ORIYA VOWEL SIGN AU
    0x0BBF == code || // Mc       TAMIL VOWEL SIGN I
    0x0BC1 <= code && code <= 0x0BC2 || // Mc   [2] TAMIL VOWEL SIGN U..TAMIL VOWEL SIGN UU
    0x0BC6 <= code && code <= 0x0BC8 || // Mc   [3] TAMIL VOWEL SIGN E..TAMIL VOWEL SIGN AI
    0x0BCA <= code && code <= 0x0BCC || // Mc   [3] TAMIL VOWEL SIGN O..TAMIL VOWEL SIGN AU
    0x0C01 <= code && code <= 0x0C03 || // Mc   [3] TELUGU SIGN CANDRABINDU..TELUGU SIGN VISARGA
    0x0C41 <= code && code <= 0x0C44 || // Mc   [4] TELUGU VOWEL SIGN U..TELUGU VOWEL SIGN VOCALIC RR
    0x0C82 <= code && code <= 0x0C83 || // Mc   [2] KANNADA SIGN ANUSVARA..KANNADA SIGN VISARGA
    0x0CBE == code || // Mc       KANNADA VOWEL SIGN AA
    0x0CC0 <= code && code <= 0x0CC1 || // Mc   [2] KANNADA VOWEL SIGN II..KANNADA VOWEL SIGN U
    0x0CC3 <= code && code <= 0x0CC4 || // Mc   [2] KANNADA VOWEL SIGN VOCALIC R..KANNADA VOWEL SIGN VOCALIC RR
    0x0CC7 <= code && code <= 0x0CC8 || // Mc   [2] KANNADA VOWEL SIGN EE..KANNADA VOWEL SIGN AI
    0x0CCA <= code && code <= 0x0CCB || // Mc   [2] KANNADA VOWEL SIGN O..KANNADA VOWEL SIGN OO
    0x0D02 <= code && code <= 0x0D03 || // Mc   [2] MALAYALAM SIGN ANUSVARA..MALAYALAM SIGN VISARGA
    0x0D3F <= code && code <= 0x0D40 || // Mc   [2] MALAYALAM VOWEL SIGN I..MALAYALAM VOWEL SIGN II
    0x0D46 <= code && code <= 0x0D48 || // Mc   [3] MALAYALAM VOWEL SIGN E..MALAYALAM VOWEL SIGN AI
    0x0D4A <= code && code <= 0x0D4C || // Mc   [3] MALAYALAM VOWEL SIGN O..MALAYALAM VOWEL SIGN AU
    0x0D82 <= code && code <= 0x0D83 || // Mc   [2] SINHALA SIGN ANUSVARAYA..SINHALA SIGN VISARGAYA
    0x0DD0 <= code && code <= 0x0DD1 || // Mc   [2] SINHALA VOWEL SIGN KETTI AEDA-PILLA..SINHALA VOWEL SIGN DIGA AEDA-PILLA
    0x0DD8 <= code && code <= 0x0DDE || // Mc   [7] SINHALA VOWEL SIGN GAETTA-PILLA..SINHALA VOWEL SIGN KOMBUVA HAA GAYANUKITTA
    0x0DF2 <= code && code <= 0x0DF3 || // Mc   [2] SINHALA VOWEL SIGN DIGA GAETTA-PILLA..SINHALA VOWEL SIGN DIGA GAYANUKITTA
    0x0E33 == code || // Lo       THAI CHARACTER SARA AM
    0x0EB3 == code || // Lo       LAO VOWEL SIGN AM
    0x0F3E <= code && code <= 0x0F3F || // Mc   [2] TIBETAN SIGN YAR TSHES..TIBETAN SIGN MAR TSHES
    0x0F7F == code || // Mc       TIBETAN SIGN RNAM BCAD
    0x1031 == code || // Mc       MYANMAR VOWEL SIGN E
    0x103B <= code && code <= 0x103C || // Mc   [2] MYANMAR CONSONANT SIGN MEDIAL YA..MYANMAR CONSONANT SIGN MEDIAL RA
    0x1056 <= code && code <= 0x1057 || // Mc   [2] MYANMAR VOWEL SIGN VOCALIC R..MYANMAR VOWEL SIGN VOCALIC RR
    0x1084 == code || // Mc       MYANMAR VOWEL SIGN SHAN E
    0x17B6 == code || // Mc       KHMER VOWEL SIGN AA
    0x17BE <= code && code <= 0x17C5 || // Mc   [8] KHMER VOWEL SIGN OE..KHMER VOWEL SIGN AU
    0x17C7 <= code && code <= 0x17C8 || // Mc   [2] KHMER SIGN REAHMUK..KHMER SIGN YUUKALEAPINTU
    0x1923 <= code && code <= 0x1926 || // Mc   [4] LIMBU VOWEL SIGN EE..LIMBU VOWEL SIGN AU
    0x1929 <= code && code <= 0x192B || // Mc   [3] LIMBU SUBJOINED LETTER YA..LIMBU SUBJOINED LETTER WA
    0x1930 <= code && code <= 0x1931 || // Mc   [2] LIMBU SMALL LETTER KA..LIMBU SMALL LETTER NGA
    0x1933 <= code && code <= 0x1938 || // Mc   [6] LIMBU SMALL LETTER TA..LIMBU SMALL LETTER LA
    0x1A19 <= code && code <= 0x1A1A || // Mc   [2] BUGINESE VOWEL SIGN E..BUGINESE VOWEL SIGN O
    0x1A55 == code || // Mc       TAI THAM CONSONANT SIGN MEDIAL RA
    0x1A57 == code || // Mc       TAI THAM CONSONANT SIGN LA TANG LAI
    0x1A6D <= code && code <= 0x1A72 || // Mc   [6] TAI THAM VOWEL SIGN OY..TAI THAM VOWEL SIGN THAM AI
    0x1B04 == code || // Mc       BALINESE SIGN BISAH
    0x1B35 == code || // Mc       BALINESE VOWEL SIGN TEDUNG
    0x1B3B == code || // Mc       BALINESE VOWEL SIGN RA REPA TEDUNG
    0x1B3D <= code && code <= 0x1B41 || // Mc   [5] BALINESE VOWEL SIGN LA LENGA TEDUNG..BALINESE VOWEL SIGN TALING REPA TEDUNG
    0x1B43 <= code && code <= 0x1B44 || // Mc   [2] BALINESE VOWEL SIGN PEPET TEDUNG..BALINESE ADEG ADEG
    0x1B82 == code || // Mc       SUNDANESE SIGN PANGWISAD
    0x1BA1 == code || // Mc       SUNDANESE CONSONANT SIGN PAMINGKAL
    0x1BA6 <= code && code <= 0x1BA7 || // Mc   [2] SUNDANESE VOWEL SIGN PANAELAENG..SUNDANESE VOWEL SIGN PANOLONG
    0x1BAA == code || // Mc       SUNDANESE SIGN PAMAAEH
    0x1BE7 == code || // Mc       BATAK VOWEL SIGN E
    0x1BEA <= code && code <= 0x1BEC || // Mc   [3] BATAK VOWEL SIGN I..BATAK VOWEL SIGN O
    0x1BEE == code || // Mc       BATAK VOWEL SIGN U
    0x1BF2 <= code && code <= 0x1BF3 || // Mc   [2] BATAK PANGOLAT..BATAK PANONGONAN
    0x1C24 <= code && code <= 0x1C2B || // Mc   [8] LEPCHA SUBJOINED LETTER YA..LEPCHA VOWEL SIGN UU
    0x1C34 <= code && code <= 0x1C35 || // Mc   [2] LEPCHA CONSONANT SIGN NYIN-DO..LEPCHA CONSONANT SIGN KANG
    0x1CE1 == code || // Mc       VEDIC TONE ATHARVAVEDIC INDEPENDENT SVARITA
    0x1CF2 <= code && code <= 0x1CF3 || // Mc   [2] VEDIC SIGN ARDHAVISARGA..VEDIC SIGN ROTATED ARDHAVISARGA
    0x1CF7 == code || // Mc       VEDIC SIGN ATIKRAMA
    0xA823 <= code && code <= 0xA824 || // Mc   [2] SYLOTI NAGRI VOWEL SIGN A..SYLOTI NAGRI VOWEL SIGN I
    0xA827 == code || // Mc       SYLOTI NAGRI VOWEL SIGN OO
    0xA880 <= code && code <= 0xA881 || // Mc   [2] SAURASHTRA SIGN ANUSVARA..SAURASHTRA SIGN VISARGA
    0xA8B4 <= code && code <= 0xA8C3 || // Mc  [16] SAURASHTRA CONSONANT SIGN HAARU..SAURASHTRA VOWEL SIGN AU
    0xA952 <= code && code <= 0xA953 || // Mc   [2] REJANG CONSONANT SIGN H..REJANG VIRAMA
    0xA983 == code || // Mc       JAVANESE SIGN WIGNYAN
    0xA9B4 <= code && code <= 0xA9B5 || // Mc   [2] JAVANESE VOWEL SIGN TARUNG..JAVANESE VOWEL SIGN TOLONG
    0xA9BA <= code && code <= 0xA9BB || // Mc   [2] JAVANESE VOWEL SIGN TALING..JAVANESE VOWEL SIGN DIRGA MURE
    0xA9BD <= code && code <= 0xA9C0 || // Mc   [4] JAVANESE CONSONANT SIGN KERET..JAVANESE PANGKON
    0xAA2F <= code && code <= 0xAA30 || // Mc   [2] CHAM VOWEL SIGN O..CHAM VOWEL SIGN AI
    0xAA33 <= code && code <= 0xAA34 || // Mc   [2] CHAM CONSONANT SIGN YA..CHAM CONSONANT SIGN RA
    0xAA4D == code || // Mc       CHAM CONSONANT SIGN FINAL H
    0xAAEB == code || // Mc       MEETEI MAYEK VOWEL SIGN II
    0xAAEE <= code && code <= 0xAAEF || // Mc   [2] MEETEI MAYEK VOWEL SIGN AU..MEETEI MAYEK VOWEL SIGN AAU
    0xAAF5 == code || // Mc       MEETEI MAYEK VOWEL SIGN VISARGA
    0xABE3 <= code && code <= 0xABE4 || // Mc   [2] MEETEI MAYEK VOWEL SIGN ONAP..MEETEI MAYEK VOWEL SIGN INAP
    0xABE6 <= code && code <= 0xABE7 || // Mc   [2] MEETEI MAYEK VOWEL SIGN YENAP..MEETEI MAYEK VOWEL SIGN SOUNAP
    0xABE9 <= code && code <= 0xABEA || // Mc   [2] MEETEI MAYEK VOWEL SIGN CHEINAP..MEETEI MAYEK VOWEL SIGN NUNG
    0xABEC == code || // Mc       MEETEI MAYEK LUM IYEK
    0x11000 == code || // Mc       BRAHMI SIGN CANDRABINDU
    0x11002 == code || // Mc       BRAHMI SIGN VISARGA
    0x11082 == code || // Mc       KAITHI SIGN VISARGA
    0x110B0 <= code && code <= 0x110B2 || // Mc   [3] KAITHI VOWEL SIGN AA..KAITHI VOWEL SIGN II
    0x110B7 <= code && code <= 0x110B8 || // Mc   [2] KAITHI VOWEL SIGN O..KAITHI VOWEL SIGN AU
    0x1112C == code || // Mc       CHAKMA VOWEL SIGN E
    0x11182 == code || // Mc       SHARADA SIGN VISARGA
    0x111B3 <= code && code <= 0x111B5 || // Mc   [3] SHARADA VOWEL SIGN AA..SHARADA VOWEL SIGN II
    0x111BF <= code && code <= 0x111C0 || // Mc   [2] SHARADA VOWEL SIGN AU..SHARADA SIGN VIRAMA
    0x1122C <= code && code <= 0x1122E || // Mc   [3] KHOJKI VOWEL SIGN AA..KHOJKI VOWEL SIGN II
    0x11232 <= code && code <= 0x11233 || // Mc   [2] KHOJKI VOWEL SIGN O..KHOJKI VOWEL SIGN AU
    0x11235 == code || // Mc       KHOJKI SIGN VIRAMA
    0x112E0 <= code && code <= 0x112E2 || // Mc   [3] KHUDAWADI VOWEL SIGN AA..KHUDAWADI VOWEL SIGN II
    0x11302 <= code && code <= 0x11303 || // Mc   [2] GRANTHA SIGN ANUSVARA..GRANTHA SIGN VISARGA
    0x1133F == code || // Mc       GRANTHA VOWEL SIGN I
    0x11341 <= code && code <= 0x11344 || // Mc   [4] GRANTHA VOWEL SIGN U..GRANTHA VOWEL SIGN VOCALIC RR
    0x11347 <= code && code <= 0x11348 || // Mc   [2] GRANTHA VOWEL SIGN EE..GRANTHA VOWEL SIGN AI
    0x1134B <= code && code <= 0x1134D || // Mc   [3] GRANTHA VOWEL SIGN OO..GRANTHA SIGN VIRAMA
    0x11362 <= code && code <= 0x11363 || // Mc   [2] GRANTHA VOWEL SIGN VOCALIC L..GRANTHA VOWEL SIGN VOCALIC LL
    0x11435 <= code && code <= 0x11437 || // Mc   [3] NEWA VOWEL SIGN AA..NEWA VOWEL SIGN II
    0x11440 <= code && code <= 0x11441 || // Mc   [2] NEWA VOWEL SIGN O..NEWA VOWEL SIGN AU
    0x11445 == code || // Mc       NEWA SIGN VISARGA
    0x114B1 <= code && code <= 0x114B2 || // Mc   [2] TIRHUTA VOWEL SIGN I..TIRHUTA VOWEL SIGN II
    0x114B9 == code || // Mc       TIRHUTA VOWEL SIGN E
    0x114BB <= code && code <= 0x114BC || // Mc   [2] TIRHUTA VOWEL SIGN AI..TIRHUTA VOWEL SIGN O
    0x114BE == code || // Mc       TIRHUTA VOWEL SIGN AU
    0x114C1 == code || // Mc       TIRHUTA SIGN VISARGA
    0x115B0 <= code && code <= 0x115B1 || // Mc   [2] SIDDHAM VOWEL SIGN I..SIDDHAM VOWEL SIGN II
    0x115B8 <= code && code <= 0x115BB || // Mc   [4] SIDDHAM VOWEL SIGN E..SIDDHAM VOWEL SIGN AU
    0x115BE == code || // Mc       SIDDHAM SIGN VISARGA
    0x11630 <= code && code <= 0x11632 || // Mc   [3] MODI VOWEL SIGN AA..MODI VOWEL SIGN II
    0x1163B <= code && code <= 0x1163C || // Mc   [2] MODI VOWEL SIGN O..MODI VOWEL SIGN AU
    0x1163E == code || // Mc       MODI SIGN VISARGA
    0x116AC == code || // Mc       TAKRI SIGN VISARGA
    0x116AE <= code && code <= 0x116AF || // Mc   [2] TAKRI VOWEL SIGN I..TAKRI VOWEL SIGN II
    0x116B6 == code || // Mc       TAKRI SIGN VIRAMA
    0x11720 <= code && code <= 0x11721 || // Mc   [2] AHOM VOWEL SIGN A..AHOM VOWEL SIGN AA
    0x11726 == code || // Mc       AHOM VOWEL SIGN E
    0x11A07 <= code && code <= 0x11A08 || // Mc   [2] ZANABAZAR SQUARE VOWEL SIGN AI..ZANABAZAR SQUARE VOWEL SIGN AU
    0x11A39 == code || // Mc       ZANABAZAR SQUARE SIGN VISARGA
    0x11A57 <= code && code <= 0x11A58 || // Mc   [2] SOYOMBO VOWEL SIGN AI..SOYOMBO VOWEL SIGN AU
    0x11A97 == code || // Mc       SOYOMBO SIGN VISARGA
    0x11C2F == code || // Mc       BHAIKSUKI VOWEL SIGN AA
    0x11C3E == code || // Mc       BHAIKSUKI SIGN VISARGA
    0x11CA9 == code || // Mc       MARCHEN SUBJOINED LETTER YA
    0x11CB1 == code || // Mc       MARCHEN VOWEL SIGN I
    0x11CB4 == code || // Mc       MARCHEN VOWEL SIGN O
    0x16F51 <= code && code <= 0x16F7E || // Mc  [46] MIAO SIGN ASPIRATION..MIAO VOWEL SIGN NG
    0x1D166 == code || // Mc       MUSICAL SYMBOL COMBINING SPRECHGESANG STEM
    0x1D16D == code // Mc       MUSICAL SYMBOL COMBINING AUGMENTATION DOT
    ) {
        return SpacingMark;
      }


    if (
    0x1100 <= code && code <= 0x115F || // Lo  [96] HANGUL CHOSEONG KIYEOK..HANGUL CHOSEONG FILLER
    0xA960 <= code && code <= 0xA97C // Lo  [29] HANGUL CHOSEONG TIKEUT-MIEUM..HANGUL CHOSEONG SSANGYEORINHIEUH
    ) {
        return L;
      }

    if (
    0x1160 <= code && code <= 0x11A7 || // Lo  [72] HANGUL JUNGSEONG FILLER..HANGUL JUNGSEONG O-YAE
    0xD7B0 <= code && code <= 0xD7C6 // Lo  [23] HANGUL JUNGSEONG O-YEO..HANGUL JUNGSEONG ARAEA-E
    ) {
        return V;
      }


    if (
    0x11A8 <= code && code <= 0x11FF || // Lo  [88] HANGUL JONGSEONG KIYEOK..HANGUL JONGSEONG SSANGNIEUN
    0xD7CB <= code && code <= 0xD7FB // Lo  [49] HANGUL JONGSEONG NIEUN-RIEUL..HANGUL JONGSEONG PHIEUPH-THIEUTH
    ) {
        return T;
      }

    if (
    0xAC00 == code || // Lo       HANGUL SYLLABLE GA
    0xAC1C == code || // Lo       HANGUL SYLLABLE GAE
    0xAC38 == code || // Lo       HANGUL SYLLABLE GYA
    0xAC54 == code || // Lo       HANGUL SYLLABLE GYAE
    0xAC70 == code || // Lo       HANGUL SYLLABLE GEO
    0xAC8C == code || // Lo       HANGUL SYLLABLE GE
    0xACA8 == code || // Lo       HANGUL SYLLABLE GYEO
    0xACC4 == code || // Lo       HANGUL SYLLABLE GYE
    0xACE0 == code || // Lo       HANGUL SYLLABLE GO
    0xACFC == code || // Lo       HANGUL SYLLABLE GWA
    0xAD18 == code || // Lo       HANGUL SYLLABLE GWAE
    0xAD34 == code || // Lo       HANGUL SYLLABLE GOE
    0xAD50 == code || // Lo       HANGUL SYLLABLE GYO
    0xAD6C == code || // Lo       HANGUL SYLLABLE GU
    0xAD88 == code || // Lo       HANGUL SYLLABLE GWEO
    0xADA4 == code || // Lo       HANGUL SYLLABLE GWE
    0xADC0 == code || // Lo       HANGUL SYLLABLE GWI
    0xADDC == code || // Lo       HANGUL SYLLABLE GYU
    0xADF8 == code || // Lo       HANGUL SYLLABLE GEU
    0xAE14 == code || // Lo       HANGUL SYLLABLE GYI
    0xAE30 == code || // Lo       HANGUL SYLLABLE GI
    0xAE4C == code || // Lo       HANGUL SYLLABLE GGA
    0xAE68 == code || // Lo       HANGUL SYLLABLE GGAE
    0xAE84 == code || // Lo       HANGUL SYLLABLE GGYA
    0xAEA0 == code || // Lo       HANGUL SYLLABLE GGYAE
    0xAEBC == code || // Lo       HANGUL SYLLABLE GGEO
    0xAED8 == code || // Lo       HANGUL SYLLABLE GGE
    0xAEF4 == code || // Lo       HANGUL SYLLABLE GGYEO
    0xAF10 == code || // Lo       HANGUL SYLLABLE GGYE
    0xAF2C == code || // Lo       HANGUL SYLLABLE GGO
    0xAF48 == code || // Lo       HANGUL SYLLABLE GGWA
    0xAF64 == code || // Lo       HANGUL SYLLABLE GGWAE
    0xAF80 == code || // Lo       HANGUL SYLLABLE GGOE
    0xAF9C == code || // Lo       HANGUL SYLLABLE GGYO
    0xAFB8 == code || // Lo       HANGUL SYLLABLE GGU
    0xAFD4 == code || // Lo       HANGUL SYLLABLE GGWEO
    0xAFF0 == code || // Lo       HANGUL SYLLABLE GGWE
    0xB00C == code || // Lo       HANGUL SYLLABLE GGWI
    0xB028 == code || // Lo       HANGUL SYLLABLE GGYU
    0xB044 == code || // Lo       HANGUL SYLLABLE GGEU
    0xB060 == code || // Lo       HANGUL SYLLABLE GGYI
    0xB07C == code || // Lo       HANGUL SYLLABLE GGI
    0xB098 == code || // Lo       HANGUL SYLLABLE NA
    0xB0B4 == code || // Lo       HANGUL SYLLABLE NAE
    0xB0D0 == code || // Lo       HANGUL SYLLABLE NYA
    0xB0EC == code || // Lo       HANGUL SYLLABLE NYAE
    0xB108 == code || // Lo       HANGUL SYLLABLE NEO
    0xB124 == code || // Lo       HANGUL SYLLABLE NE
    0xB140 == code || // Lo       HANGUL SYLLABLE NYEO
    0xB15C == code || // Lo       HANGUL SYLLABLE NYE
    0xB178 == code || // Lo       HANGUL SYLLABLE NO
    0xB194 == code || // Lo       HANGUL SYLLABLE NWA
    0xB1B0 == code || // Lo       HANGUL SYLLABLE NWAE
    0xB1CC == code || // Lo       HANGUL SYLLABLE NOE
    0xB1E8 == code || // Lo       HANGUL SYLLABLE NYO
    0xB204 == code || // Lo       HANGUL SYLLABLE NU
    0xB220 == code || // Lo       HANGUL SYLLABLE NWEO
    0xB23C == code || // Lo       HANGUL SYLLABLE NWE
    0xB258 == code || // Lo       HANGUL SYLLABLE NWI
    0xB274 == code || // Lo       HANGUL SYLLABLE NYU
    0xB290 == code || // Lo       HANGUL SYLLABLE NEU
    0xB2AC == code || // Lo       HANGUL SYLLABLE NYI
    0xB2C8 == code || // Lo       HANGUL SYLLABLE NI
    0xB2E4 == code || // Lo       HANGUL SYLLABLE DA
    0xB300 == code || // Lo       HANGUL SYLLABLE DAE
    0xB31C == code || // Lo       HANGUL SYLLABLE DYA
    0xB338 == code || // Lo       HANGUL SYLLABLE DYAE
    0xB354 == code || // Lo       HANGUL SYLLABLE DEO
    0xB370 == code || // Lo       HANGUL SYLLABLE DE
    0xB38C == code || // Lo       HANGUL SYLLABLE DYEO
    0xB3A8 == code || // Lo       HANGUL SYLLABLE DYE
    0xB3C4 == code || // Lo       HANGUL SYLLABLE DO
    0xB3E0 == code || // Lo       HANGUL SYLLABLE DWA
    0xB3FC == code || // Lo       HANGUL SYLLABLE DWAE
    0xB418 == code || // Lo       HANGUL SYLLABLE DOE
    0xB434 == code || // Lo       HANGUL SYLLABLE DYO
    0xB450 == code || // Lo       HANGUL SYLLABLE DU
    0xB46C == code || // Lo       HANGUL SYLLABLE DWEO
    0xB488 == code || // Lo       HANGUL SYLLABLE DWE
    0xB4A4 == code || // Lo       HANGUL SYLLABLE DWI
    0xB4C0 == code || // Lo       HANGUL SYLLABLE DYU
    0xB4DC == code || // Lo       HANGUL SYLLABLE DEU
    0xB4F8 == code || // Lo       HANGUL SYLLABLE DYI
    0xB514 == code || // Lo       HANGUL SYLLABLE DI
    0xB530 == code || // Lo       HANGUL SYLLABLE DDA
    0xB54C == code || // Lo       HANGUL SYLLABLE DDAE
    0xB568 == code || // Lo       HANGUL SYLLABLE DDYA
    0xB584 == code || // Lo       HANGUL SYLLABLE DDYAE
    0xB5A0 == code || // Lo       HANGUL SYLLABLE DDEO
    0xB5BC == code || // Lo       HANGUL SYLLABLE DDE
    0xB5D8 == code || // Lo       HANGUL SYLLABLE DDYEO
    0xB5F4 == code || // Lo       HANGUL SYLLABLE DDYE
    0xB610 == code || // Lo       HANGUL SYLLABLE DDO
    0xB62C == code || // Lo       HANGUL SYLLABLE DDWA
    0xB648 == code || // Lo       HANGUL SYLLABLE DDWAE
    0xB664 == code || // Lo       HANGUL SYLLABLE DDOE
    0xB680 == code || // Lo       HANGUL SYLLABLE DDYO
    0xB69C == code || // Lo       HANGUL SYLLABLE DDU
    0xB6B8 == code || // Lo       HANGUL SYLLABLE DDWEO
    0xB6D4 == code || // Lo       HANGUL SYLLABLE DDWE
    0xB6F0 == code || // Lo       HANGUL SYLLABLE DDWI
    0xB70C == code || // Lo       HANGUL SYLLABLE DDYU
    0xB728 == code || // Lo       HANGUL SYLLABLE DDEU
    0xB744 == code || // Lo       HANGUL SYLLABLE DDYI
    0xB760 == code || // Lo       HANGUL SYLLABLE DDI
    0xB77C == code || // Lo       HANGUL SYLLABLE RA
    0xB798 == code || // Lo       HANGUL SYLLABLE RAE
    0xB7B4 == code || // Lo       HANGUL SYLLABLE RYA
    0xB7D0 == code || // Lo       HANGUL SYLLABLE RYAE
    0xB7EC == code || // Lo       HANGUL SYLLABLE REO
    0xB808 == code || // Lo       HANGUL SYLLABLE RE
    0xB824 == code || // Lo       HANGUL SYLLABLE RYEO
    0xB840 == code || // Lo       HANGUL SYLLABLE RYE
    0xB85C == code || // Lo       HANGUL SYLLABLE RO
    0xB878 == code || // Lo       HANGUL SYLLABLE RWA
    0xB894 == code || // Lo       HANGUL SYLLABLE RWAE
    0xB8B0 == code || // Lo       HANGUL SYLLABLE ROE
    0xB8CC == code || // Lo       HANGUL SYLLABLE RYO
    0xB8E8 == code || // Lo       HANGUL SYLLABLE RU
    0xB904 == code || // Lo       HANGUL SYLLABLE RWEO
    0xB920 == code || // Lo       HANGUL SYLLABLE RWE
    0xB93C == code || // Lo       HANGUL SYLLABLE RWI
    0xB958 == code || // Lo       HANGUL SYLLABLE RYU
    0xB974 == code || // Lo       HANGUL SYLLABLE REU
    0xB990 == code || // Lo       HANGUL SYLLABLE RYI
    0xB9AC == code || // Lo       HANGUL SYLLABLE RI
    0xB9C8 == code || // Lo       HANGUL SYLLABLE MA
    0xB9E4 == code || // Lo       HANGUL SYLLABLE MAE
    0xBA00 == code || // Lo       HANGUL SYLLABLE MYA
    0xBA1C == code || // Lo       HANGUL SYLLABLE MYAE
    0xBA38 == code || // Lo       HANGUL SYLLABLE MEO
    0xBA54 == code || // Lo       HANGUL SYLLABLE ME
    0xBA70 == code || // Lo       HANGUL SYLLABLE MYEO
    0xBA8C == code || // Lo       HANGUL SYLLABLE MYE
    0xBAA8 == code || // Lo       HANGUL SYLLABLE MO
    0xBAC4 == code || // Lo       HANGUL SYLLABLE MWA
    0xBAE0 == code || // Lo       HANGUL SYLLABLE MWAE
    0xBAFC == code || // Lo       HANGUL SYLLABLE MOE
    0xBB18 == code || // Lo       HANGUL SYLLABLE MYO
    0xBB34 == code || // Lo       HANGUL SYLLABLE MU
    0xBB50 == code || // Lo       HANGUL SYLLABLE MWEO
    0xBB6C == code || // Lo       HANGUL SYLLABLE MWE
    0xBB88 == code || // Lo       HANGUL SYLLABLE MWI
    0xBBA4 == code || // Lo       HANGUL SYLLABLE MYU
    0xBBC0 == code || // Lo       HANGUL SYLLABLE MEU
    0xBBDC == code || // Lo       HANGUL SYLLABLE MYI
    0xBBF8 == code || // Lo       HANGUL SYLLABLE MI
    0xBC14 == code || // Lo       HANGUL SYLLABLE BA
    0xBC30 == code || // Lo       HANGUL SYLLABLE BAE
    0xBC4C == code || // Lo       HANGUL SYLLABLE BYA
    0xBC68 == code || // Lo       HANGUL SYLLABLE BYAE
    0xBC84 == code || // Lo       HANGUL SYLLABLE BEO
    0xBCA0 == code || // Lo       HANGUL SYLLABLE BE
    0xBCBC == code || // Lo       HANGUL SYLLABLE BYEO
    0xBCD8 == code || // Lo       HANGUL SYLLABLE BYE
    0xBCF4 == code || // Lo       HANGUL SYLLABLE BO
    0xBD10 == code || // Lo       HANGUL SYLLABLE BWA
    0xBD2C == code || // Lo       HANGUL SYLLABLE BWAE
    0xBD48 == code || // Lo       HANGUL SYLLABLE BOE
    0xBD64 == code || // Lo       HANGUL SYLLABLE BYO
    0xBD80 == code || // Lo       HANGUL SYLLABLE BU
    0xBD9C == code || // Lo       HANGUL SYLLABLE BWEO
    0xBDB8 == code || // Lo       HANGUL SYLLABLE BWE
    0xBDD4 == code || // Lo       HANGUL SYLLABLE BWI
    0xBDF0 == code || // Lo       HANGUL SYLLABLE BYU
    0xBE0C == code || // Lo       HANGUL SYLLABLE BEU
    0xBE28 == code || // Lo       HANGUL SYLLABLE BYI
    0xBE44 == code || // Lo       HANGUL SYLLABLE BI
    0xBE60 == code || // Lo       HANGUL SYLLABLE BBA
    0xBE7C == code || // Lo       HANGUL SYLLABLE BBAE
    0xBE98 == code || // Lo       HANGUL SYLLABLE BBYA
    0xBEB4 == code || // Lo       HANGUL SYLLABLE BBYAE
    0xBED0 == code || // Lo       HANGUL SYLLABLE BBEO
    0xBEEC == code || // Lo       HANGUL SYLLABLE BBE
    0xBF08 == code || // Lo       HANGUL SYLLABLE BBYEO
    0xBF24 == code || // Lo       HANGUL SYLLABLE BBYE
    0xBF40 == code || // Lo       HANGUL SYLLABLE BBO
    0xBF5C == code || // Lo       HANGUL SYLLABLE BBWA
    0xBF78 == code || // Lo       HANGUL SYLLABLE BBWAE
    0xBF94 == code || // Lo       HANGUL SYLLABLE BBOE
    0xBFB0 == code || // Lo       HANGUL SYLLABLE BBYO
    0xBFCC == code || // Lo       HANGUL SYLLABLE BBU
    0xBFE8 == code || // Lo       HANGUL SYLLABLE BBWEO
    0xC004 == code || // Lo       HANGUL SYLLABLE BBWE
    0xC020 == code || // Lo       HANGUL SYLLABLE BBWI
    0xC03C == code || // Lo       HANGUL SYLLABLE BBYU
    0xC058 == code || // Lo       HANGUL SYLLABLE BBEU
    0xC074 == code || // Lo       HANGUL SYLLABLE BBYI
    0xC090 == code || // Lo       HANGUL SYLLABLE BBI
    0xC0AC == code || // Lo       HANGUL SYLLABLE SA
    0xC0C8 == code || // Lo       HANGUL SYLLABLE SAE
    0xC0E4 == code || // Lo       HANGUL SYLLABLE SYA
    0xC100 == code || // Lo       HANGUL SYLLABLE SYAE
    0xC11C == code || // Lo       HANGUL SYLLABLE SEO
    0xC138 == code || // Lo       HANGUL SYLLABLE SE
    0xC154 == code || // Lo       HANGUL SYLLABLE SYEO
    0xC170 == code || // Lo       HANGUL SYLLABLE SYE
    0xC18C == code || // Lo       HANGUL SYLLABLE SO
    0xC1A8 == code || // Lo       HANGUL SYLLABLE SWA
    0xC1C4 == code || // Lo       HANGUL SYLLABLE SWAE
    0xC1E0 == code || // Lo       HANGUL SYLLABLE SOE
    0xC1FC == code || // Lo       HANGUL SYLLABLE SYO
    0xC218 == code || // Lo       HANGUL SYLLABLE SU
    0xC234 == code || // Lo       HANGUL SYLLABLE SWEO
    0xC250 == code || // Lo       HANGUL SYLLABLE SWE
    0xC26C == code || // Lo       HANGUL SYLLABLE SWI
    0xC288 == code || // Lo       HANGUL SYLLABLE SYU
    0xC2A4 == code || // Lo       HANGUL SYLLABLE SEU
    0xC2C0 == code || // Lo       HANGUL SYLLABLE SYI
    0xC2DC == code || // Lo       HANGUL SYLLABLE SI
    0xC2F8 == code || // Lo       HANGUL SYLLABLE SSA
    0xC314 == code || // Lo       HANGUL SYLLABLE SSAE
    0xC330 == code || // Lo       HANGUL SYLLABLE SSYA
    0xC34C == code || // Lo       HANGUL SYLLABLE SSYAE
    0xC368 == code || // Lo       HANGUL SYLLABLE SSEO
    0xC384 == code || // Lo       HANGUL SYLLABLE SSE
    0xC3A0 == code || // Lo       HANGUL SYLLABLE SSYEO
    0xC3BC == code || // Lo       HANGUL SYLLABLE SSYE
    0xC3D8 == code || // Lo       HANGUL SYLLABLE SSO
    0xC3F4 == code || // Lo       HANGUL SYLLABLE SSWA
    0xC410 == code || // Lo       HANGUL SYLLABLE SSWAE
    0xC42C == code || // Lo       HANGUL SYLLABLE SSOE
    0xC448 == code || // Lo       HANGUL SYLLABLE SSYO
    0xC464 == code || // Lo       HANGUL SYLLABLE SSU
    0xC480 == code || // Lo       HANGUL SYLLABLE SSWEO
    0xC49C == code || // Lo       HANGUL SYLLABLE SSWE
    0xC4B8 == code || // Lo       HANGUL SYLLABLE SSWI
    0xC4D4 == code || // Lo       HANGUL SYLLABLE SSYU
    0xC4F0 == code || // Lo       HANGUL SYLLABLE SSEU
    0xC50C == code || // Lo       HANGUL SYLLABLE SSYI
    0xC528 == code || // Lo       HANGUL SYLLABLE SSI
    0xC544 == code || // Lo       HANGUL SYLLABLE A
    0xC560 == code || // Lo       HANGUL SYLLABLE AE
    0xC57C == code || // Lo       HANGUL SYLLABLE YA
    0xC598 == code || // Lo       HANGUL SYLLABLE YAE
    0xC5B4 == code || // Lo       HANGUL SYLLABLE EO
    0xC5D0 == code || // Lo       HANGUL SYLLABLE E
    0xC5EC == code || // Lo       HANGUL SYLLABLE YEO
    0xC608 == code || // Lo       HANGUL SYLLABLE YE
    0xC624 == code || // Lo       HANGUL SYLLABLE O
    0xC640 == code || // Lo       HANGUL SYLLABLE WA
    0xC65C == code || // Lo       HANGUL SYLLABLE WAE
    0xC678 == code || // Lo       HANGUL SYLLABLE OE
    0xC694 == code || // Lo       HANGUL SYLLABLE YO
    0xC6B0 == code || // Lo       HANGUL SYLLABLE U
    0xC6CC == code || // Lo       HANGUL SYLLABLE WEO
    0xC6E8 == code || // Lo       HANGUL SYLLABLE WE
    0xC704 == code || // Lo       HANGUL SYLLABLE WI
    0xC720 == code || // Lo       HANGUL SYLLABLE YU
    0xC73C == code || // Lo       HANGUL SYLLABLE EU
    0xC758 == code || // Lo       HANGUL SYLLABLE YI
    0xC774 == code || // Lo       HANGUL SYLLABLE I
    0xC790 == code || // Lo       HANGUL SYLLABLE JA
    0xC7AC == code || // Lo       HANGUL SYLLABLE JAE
    0xC7C8 == code || // Lo       HANGUL SYLLABLE JYA
    0xC7E4 == code || // Lo       HANGUL SYLLABLE JYAE
    0xC800 == code || // Lo       HANGUL SYLLABLE JEO
    0xC81C == code || // Lo       HANGUL SYLLABLE JE
    0xC838 == code || // Lo       HANGUL SYLLABLE JYEO
    0xC854 == code || // Lo       HANGUL SYLLABLE JYE
    0xC870 == code || // Lo       HANGUL SYLLABLE JO
    0xC88C == code || // Lo       HANGUL SYLLABLE JWA
    0xC8A8 == code || // Lo       HANGUL SYLLABLE JWAE
    0xC8C4 == code || // Lo       HANGUL SYLLABLE JOE
    0xC8E0 == code || // Lo       HANGUL SYLLABLE JYO
    0xC8FC == code || // Lo       HANGUL SYLLABLE JU
    0xC918 == code || // Lo       HANGUL SYLLABLE JWEO
    0xC934 == code || // Lo       HANGUL SYLLABLE JWE
    0xC950 == code || // Lo       HANGUL SYLLABLE JWI
    0xC96C == code || // Lo       HANGUL SYLLABLE JYU
    0xC988 == code || // Lo       HANGUL SYLLABLE JEU
    0xC9A4 == code || // Lo       HANGUL SYLLABLE JYI
    0xC9C0 == code || // Lo       HANGUL SYLLABLE JI
    0xC9DC == code || // Lo       HANGUL SYLLABLE JJA
    0xC9F8 == code || // Lo       HANGUL SYLLABLE JJAE
    0xCA14 == code || // Lo       HANGUL SYLLABLE JJYA
    0xCA30 == code || // Lo       HANGUL SYLLABLE JJYAE
    0xCA4C == code || // Lo       HANGUL SYLLABLE JJEO
    0xCA68 == code || // Lo       HANGUL SYLLABLE JJE
    0xCA84 == code || // Lo       HANGUL SYLLABLE JJYEO
    0xCAA0 == code || // Lo       HANGUL SYLLABLE JJYE
    0xCABC == code || // Lo       HANGUL SYLLABLE JJO
    0xCAD8 == code || // Lo       HANGUL SYLLABLE JJWA
    0xCAF4 == code || // Lo       HANGUL SYLLABLE JJWAE
    0xCB10 == code || // Lo       HANGUL SYLLABLE JJOE
    0xCB2C == code || // Lo       HANGUL SYLLABLE JJYO
    0xCB48 == code || // Lo       HANGUL SYLLABLE JJU
    0xCB64 == code || // Lo       HANGUL SYLLABLE JJWEO
    0xCB80 == code || // Lo       HANGUL SYLLABLE JJWE
    0xCB9C == code || // Lo       HANGUL SYLLABLE JJWI
    0xCBB8 == code || // Lo       HANGUL SYLLABLE JJYU
    0xCBD4 == code || // Lo       HANGUL SYLLABLE JJEU
    0xCBF0 == code || // Lo       HANGUL SYLLABLE JJYI
    0xCC0C == code || // Lo       HANGUL SYLLABLE JJI
    0xCC28 == code || // Lo       HANGUL SYLLABLE CA
    0xCC44 == code || // Lo       HANGUL SYLLABLE CAE
    0xCC60 == code || // Lo       HANGUL SYLLABLE CYA
    0xCC7C == code || // Lo       HANGUL SYLLABLE CYAE
    0xCC98 == code || // Lo       HANGUL SYLLABLE CEO
    0xCCB4 == code || // Lo       HANGUL SYLLABLE CE
    0xCCD0 == code || // Lo       HANGUL SYLLABLE CYEO
    0xCCEC == code || // Lo       HANGUL SYLLABLE CYE
    0xCD08 == code || // Lo       HANGUL SYLLABLE CO
    0xCD24 == code || // Lo       HANGUL SYLLABLE CWA
    0xCD40 == code || // Lo       HANGUL SYLLABLE CWAE
    0xCD5C == code || // Lo       HANGUL SYLLABLE COE
    0xCD78 == code || // Lo       HANGUL SYLLABLE CYO
    0xCD94 == code || // Lo       HANGUL SYLLABLE CU
    0xCDB0 == code || // Lo       HANGUL SYLLABLE CWEO
    0xCDCC == code || // Lo       HANGUL SYLLABLE CWE
    0xCDE8 == code || // Lo       HANGUL SYLLABLE CWI
    0xCE04 == code || // Lo       HANGUL SYLLABLE CYU
    0xCE20 == code || // Lo       HANGUL SYLLABLE CEU
    0xCE3C == code || // Lo       HANGUL SYLLABLE CYI
    0xCE58 == code || // Lo       HANGUL SYLLABLE CI
    0xCE74 == code || // Lo       HANGUL SYLLABLE KA
    0xCE90 == code || // Lo       HANGUL SYLLABLE KAE
    0xCEAC == code || // Lo       HANGUL SYLLABLE KYA
    0xCEC8 == code || // Lo       HANGUL SYLLABLE KYAE
    0xCEE4 == code || // Lo       HANGUL SYLLABLE KEO
    0xCF00 == code || // Lo       HANGUL SYLLABLE KE
    0xCF1C == code || // Lo       HANGUL SYLLABLE KYEO
    0xCF38 == code || // Lo       HANGUL SYLLABLE KYE
    0xCF54 == code || // Lo       HANGUL SYLLABLE KO
    0xCF70 == code || // Lo       HANGUL SYLLABLE KWA
    0xCF8C == code || // Lo       HANGUL SYLLABLE KWAE
    0xCFA8 == code || // Lo       HANGUL SYLLABLE KOE
    0xCFC4 == code || // Lo       HANGUL SYLLABLE KYO
    0xCFE0 == code || // Lo       HANGUL SYLLABLE KU
    0xCFFC == code || // Lo       HANGUL SYLLABLE KWEO
    0xD018 == code || // Lo       HANGUL SYLLABLE KWE
    0xD034 == code || // Lo       HANGUL SYLLABLE KWI
    0xD050 == code || // Lo       HANGUL SYLLABLE KYU
    0xD06C == code || // Lo       HANGUL SYLLABLE KEU
    0xD088 == code || // Lo       HANGUL SYLLABLE KYI
    0xD0A4 == code || // Lo       HANGUL SYLLABLE KI
    0xD0C0 == code || // Lo       HANGUL SYLLABLE TA
    0xD0DC == code || // Lo       HANGUL SYLLABLE TAE
    0xD0F8 == code || // Lo       HANGUL SYLLABLE TYA
    0xD114 == code || // Lo       HANGUL SYLLABLE TYAE
    0xD130 == code || // Lo       HANGUL SYLLABLE TEO
    0xD14C == code || // Lo       HANGUL SYLLABLE TE
    0xD168 == code || // Lo       HANGUL SYLLABLE TYEO
    0xD184 == code || // Lo       HANGUL SYLLABLE TYE
    0xD1A0 == code || // Lo       HANGUL SYLLABLE TO
    0xD1BC == code || // Lo       HANGUL SYLLABLE TWA
    0xD1D8 == code || // Lo       HANGUL SYLLABLE TWAE
    0xD1F4 == code || // Lo       HANGUL SYLLABLE TOE
    0xD210 == code || // Lo       HANGUL SYLLABLE TYO
    0xD22C == code || // Lo       HANGUL SYLLABLE TU
    0xD248 == code || // Lo       HANGUL SYLLABLE TWEO
    0xD264 == code || // Lo       HANGUL SYLLABLE TWE
    0xD280 == code || // Lo       HANGUL SYLLABLE TWI
    0xD29C == code || // Lo       HANGUL SYLLABLE TYU
    0xD2B8 == code || // Lo       HANGUL SYLLABLE TEU
    0xD2D4 == code || // Lo       HANGUL SYLLABLE TYI
    0xD2F0 == code || // Lo       HANGUL SYLLABLE TI
    0xD30C == code || // Lo       HANGUL SYLLABLE PA
    0xD328 == code || // Lo       HANGUL SYLLABLE PAE
    0xD344 == code || // Lo       HANGUL SYLLABLE PYA
    0xD360 == code || // Lo       HANGUL SYLLABLE PYAE
    0xD37C == code || // Lo       HANGUL SYLLABLE PEO
    0xD398 == code || // Lo       HANGUL SYLLABLE PE
    0xD3B4 == code || // Lo       HANGUL SYLLABLE PYEO
    0xD3D0 == code || // Lo       HANGUL SYLLABLE PYE
    0xD3EC == code || // Lo       HANGUL SYLLABLE PO
    0xD408 == code || // Lo       HANGUL SYLLABLE PWA
    0xD424 == code || // Lo       HANGUL SYLLABLE PWAE
    0xD440 == code || // Lo       HANGUL SYLLABLE POE
    0xD45C == code || // Lo       HANGUL SYLLABLE PYO
    0xD478 == code || // Lo       HANGUL SYLLABLE PU
    0xD494 == code || // Lo       HANGUL SYLLABLE PWEO
    0xD4B0 == code || // Lo       HANGUL SYLLABLE PWE
    0xD4CC == code || // Lo       HANGUL SYLLABLE PWI
    0xD4E8 == code || // Lo       HANGUL SYLLABLE PYU
    0xD504 == code || // Lo       HANGUL SYLLABLE PEU
    0xD520 == code || // Lo       HANGUL SYLLABLE PYI
    0xD53C == code || // Lo       HANGUL SYLLABLE PI
    0xD558 == code || // Lo       HANGUL SYLLABLE HA
    0xD574 == code || // Lo       HANGUL SYLLABLE HAE
    0xD590 == code || // Lo       HANGUL SYLLABLE HYA
    0xD5AC == code || // Lo       HANGUL SYLLABLE HYAE
    0xD5C8 == code || // Lo       HANGUL SYLLABLE HEO
    0xD5E4 == code || // Lo       HANGUL SYLLABLE HE
    0xD600 == code || // Lo       HANGUL SYLLABLE HYEO
    0xD61C == code || // Lo       HANGUL SYLLABLE HYE
    0xD638 == code || // Lo       HANGUL SYLLABLE HO
    0xD654 == code || // Lo       HANGUL SYLLABLE HWA
    0xD670 == code || // Lo       HANGUL SYLLABLE HWAE
    0xD68C == code || // Lo       HANGUL SYLLABLE HOE
    0xD6A8 == code || // Lo       HANGUL SYLLABLE HYO
    0xD6C4 == code || // Lo       HANGUL SYLLABLE HU
    0xD6E0 == code || // Lo       HANGUL SYLLABLE HWEO
    0xD6FC == code || // Lo       HANGUL SYLLABLE HWE
    0xD718 == code || // Lo       HANGUL SYLLABLE HWI
    0xD734 == code || // Lo       HANGUL SYLLABLE HYU
    0xD750 == code || // Lo       HANGUL SYLLABLE HEU
    0xD76C == code || // Lo       HANGUL SYLLABLE HYI
    0xD788 == code // Lo       HANGUL SYLLABLE HI
    ) {
        return LV;
      }

    if (
    0xAC01 <= code && code <= 0xAC1B || // Lo  [27] HANGUL SYLLABLE GAG..HANGUL SYLLABLE GAH
    0xAC1D <= code && code <= 0xAC37 || // Lo  [27] HANGUL SYLLABLE GAEG..HANGUL SYLLABLE GAEH
    0xAC39 <= code && code <= 0xAC53 || // Lo  [27] HANGUL SYLLABLE GYAG..HANGUL SYLLABLE GYAH
    0xAC55 <= code && code <= 0xAC6F || // Lo  [27] HANGUL SYLLABLE GYAEG..HANGUL SYLLABLE GYAEH
    0xAC71 <= code && code <= 0xAC8B || // Lo  [27] HANGUL SYLLABLE GEOG..HANGUL SYLLABLE GEOH
    0xAC8D <= code && code <= 0xACA7 || // Lo  [27] HANGUL SYLLABLE GEG..HANGUL SYLLABLE GEH
    0xACA9 <= code && code <= 0xACC3 || // Lo  [27] HANGUL SYLLABLE GYEOG..HANGUL SYLLABLE GYEOH
    0xACC5 <= code && code <= 0xACDF || // Lo  [27] HANGUL SYLLABLE GYEG..HANGUL SYLLABLE GYEH
    0xACE1 <= code && code <= 0xACFB || // Lo  [27] HANGUL SYLLABLE GOG..HANGUL SYLLABLE GOH
    0xACFD <= code && code <= 0xAD17 || // Lo  [27] HANGUL SYLLABLE GWAG..HANGUL SYLLABLE GWAH
    0xAD19 <= code && code <= 0xAD33 || // Lo  [27] HANGUL SYLLABLE GWAEG..HANGUL SYLLABLE GWAEH
    0xAD35 <= code && code <= 0xAD4F || // Lo  [27] HANGUL SYLLABLE GOEG..HANGUL SYLLABLE GOEH
    0xAD51 <= code && code <= 0xAD6B || // Lo  [27] HANGUL SYLLABLE GYOG..HANGUL SYLLABLE GYOH
    0xAD6D <= code && code <= 0xAD87 || // Lo  [27] HANGUL SYLLABLE GUG..HANGUL SYLLABLE GUH
    0xAD89 <= code && code <= 0xADA3 || // Lo  [27] HANGUL SYLLABLE GWEOG..HANGUL SYLLABLE GWEOH
    0xADA5 <= code && code <= 0xADBF || // Lo  [27] HANGUL SYLLABLE GWEG..HANGUL SYLLABLE GWEH
    0xADC1 <= code && code <= 0xADDB || // Lo  [27] HANGUL SYLLABLE GWIG..HANGUL SYLLABLE GWIH
    0xADDD <= code && code <= 0xADF7 || // Lo  [27] HANGUL SYLLABLE GYUG..HANGUL SYLLABLE GYUH
    0xADF9 <= code && code <= 0xAE13 || // Lo  [27] HANGUL SYLLABLE GEUG..HANGUL SYLLABLE GEUH
    0xAE15 <= code && code <= 0xAE2F || // Lo  [27] HANGUL SYLLABLE GYIG..HANGUL SYLLABLE GYIH
    0xAE31 <= code && code <= 0xAE4B || // Lo  [27] HANGUL SYLLABLE GIG..HANGUL SYLLABLE GIH
    0xAE4D <= code && code <= 0xAE67 || // Lo  [27] HANGUL SYLLABLE GGAG..HANGUL SYLLABLE GGAH
    0xAE69 <= code && code <= 0xAE83 || // Lo  [27] HANGUL SYLLABLE GGAEG..HANGUL SYLLABLE GGAEH
    0xAE85 <= code && code <= 0xAE9F || // Lo  [27] HANGUL SYLLABLE GGYAG..HANGUL SYLLABLE GGYAH
    0xAEA1 <= code && code <= 0xAEBB || // Lo  [27] HANGUL SYLLABLE GGYAEG..HANGUL SYLLABLE GGYAEH
    0xAEBD <= code && code <= 0xAED7 || // Lo  [27] HANGUL SYLLABLE GGEOG..HANGUL SYLLABLE GGEOH
    0xAED9 <= code && code <= 0xAEF3 || // Lo  [27] HANGUL SYLLABLE GGEG..HANGUL SYLLABLE GGEH
    0xAEF5 <= code && code <= 0xAF0F || // Lo  [27] HANGUL SYLLABLE GGYEOG..HANGUL SYLLABLE GGYEOH
    0xAF11 <= code && code <= 0xAF2B || // Lo  [27] HANGUL SYLLABLE GGYEG..HANGUL SYLLABLE GGYEH
    0xAF2D <= code && code <= 0xAF47 || // Lo  [27] HANGUL SYLLABLE GGOG..HANGUL SYLLABLE GGOH
    0xAF49 <= code && code <= 0xAF63 || // Lo  [27] HANGUL SYLLABLE GGWAG..HANGUL SYLLABLE GGWAH
    0xAF65 <= code && code <= 0xAF7F || // Lo  [27] HANGUL SYLLABLE GGWAEG..HANGUL SYLLABLE GGWAEH
    0xAF81 <= code && code <= 0xAF9B || // Lo  [27] HANGUL SYLLABLE GGOEG..HANGUL SYLLABLE GGOEH
    0xAF9D <= code && code <= 0xAFB7 || // Lo  [27] HANGUL SYLLABLE GGYOG..HANGUL SYLLABLE GGYOH
    0xAFB9 <= code && code <= 0xAFD3 || // Lo  [27] HANGUL SYLLABLE GGUG..HANGUL SYLLABLE GGUH
    0xAFD5 <= code && code <= 0xAFEF || // Lo  [27] HANGUL SYLLABLE GGWEOG..HANGUL SYLLABLE GGWEOH
    0xAFF1 <= code && code <= 0xB00B || // Lo  [27] HANGUL SYLLABLE GGWEG..HANGUL SYLLABLE GGWEH
    0xB00D <= code && code <= 0xB027 || // Lo  [27] HANGUL SYLLABLE GGWIG..HANGUL SYLLABLE GGWIH
    0xB029 <= code && code <= 0xB043 || // Lo  [27] HANGUL SYLLABLE GGYUG..HANGUL SYLLABLE GGYUH
    0xB045 <= code && code <= 0xB05F || // Lo  [27] HANGUL SYLLABLE GGEUG..HANGUL SYLLABLE GGEUH
    0xB061 <= code && code <= 0xB07B || // Lo  [27] HANGUL SYLLABLE GGYIG..HANGUL SYLLABLE GGYIH
    0xB07D <= code && code <= 0xB097 || // Lo  [27] HANGUL SYLLABLE GGIG..HANGUL SYLLABLE GGIH
    0xB099 <= code && code <= 0xB0B3 || // Lo  [27] HANGUL SYLLABLE NAG..HANGUL SYLLABLE NAH
    0xB0B5 <= code && code <= 0xB0CF || // Lo  [27] HANGUL SYLLABLE NAEG..HANGUL SYLLABLE NAEH
    0xB0D1 <= code && code <= 0xB0EB || // Lo  [27] HANGUL SYLLABLE NYAG..HANGUL SYLLABLE NYAH
    0xB0ED <= code && code <= 0xB107 || // Lo  [27] HANGUL SYLLABLE NYAEG..HANGUL SYLLABLE NYAEH
    0xB109 <= code && code <= 0xB123 || // Lo  [27] HANGUL SYLLABLE NEOG..HANGUL SYLLABLE NEOH
    0xB125 <= code && code <= 0xB13F || // Lo  [27] HANGUL SYLLABLE NEG..HANGUL SYLLABLE NEH
    0xB141 <= code && code <= 0xB15B || // Lo  [27] HANGUL SYLLABLE NYEOG..HANGUL SYLLABLE NYEOH
    0xB15D <= code && code <= 0xB177 || // Lo  [27] HANGUL SYLLABLE NYEG..HANGUL SYLLABLE NYEH
    0xB179 <= code && code <= 0xB193 || // Lo  [27] HANGUL SYLLABLE NOG..HANGUL SYLLABLE NOH
    0xB195 <= code && code <= 0xB1AF || // Lo  [27] HANGUL SYLLABLE NWAG..HANGUL SYLLABLE NWAH
    0xB1B1 <= code && code <= 0xB1CB || // Lo  [27] HANGUL SYLLABLE NWAEG..HANGUL SYLLABLE NWAEH
    0xB1CD <= code && code <= 0xB1E7 || // Lo  [27] HANGUL SYLLABLE NOEG..HANGUL SYLLABLE NOEH
    0xB1E9 <= code && code <= 0xB203 || // Lo  [27] HANGUL SYLLABLE NYOG..HANGUL SYLLABLE NYOH
    0xB205 <= code && code <= 0xB21F || // Lo  [27] HANGUL SYLLABLE NUG..HANGUL SYLLABLE NUH
    0xB221 <= code && code <= 0xB23B || // Lo  [27] HANGUL SYLLABLE NWEOG..HANGUL SYLLABLE NWEOH
    0xB23D <= code && code <= 0xB257 || // Lo  [27] HANGUL SYLLABLE NWEG..HANGUL SYLLABLE NWEH
    0xB259 <= code && code <= 0xB273 || // Lo  [27] HANGUL SYLLABLE NWIG..HANGUL SYLLABLE NWIH
    0xB275 <= code && code <= 0xB28F || // Lo  [27] HANGUL SYLLABLE NYUG..HANGUL SYLLABLE NYUH
    0xB291 <= code && code <= 0xB2AB || // Lo  [27] HANGUL SYLLABLE NEUG..HANGUL SYLLABLE NEUH
    0xB2AD <= code && code <= 0xB2C7 || // Lo  [27] HANGUL SYLLABLE NYIG..HANGUL SYLLABLE NYIH
    0xB2C9 <= code && code <= 0xB2E3 || // Lo  [27] HANGUL SYLLABLE NIG..HANGUL SYLLABLE NIH
    0xB2E5 <= code && code <= 0xB2FF || // Lo  [27] HANGUL SYLLABLE DAG..HANGUL SYLLABLE DAH
    0xB301 <= code && code <= 0xB31B || // Lo  [27] HANGUL SYLLABLE DAEG..HANGUL SYLLABLE DAEH
    0xB31D <= code && code <= 0xB337 || // Lo  [27] HANGUL SYLLABLE DYAG..HANGUL SYLLABLE DYAH
    0xB339 <= code && code <= 0xB353 || // Lo  [27] HANGUL SYLLABLE DYAEG..HANGUL SYLLABLE DYAEH
    0xB355 <= code && code <= 0xB36F || // Lo  [27] HANGUL SYLLABLE DEOG..HANGUL SYLLABLE DEOH
    0xB371 <= code && code <= 0xB38B || // Lo  [27] HANGUL SYLLABLE DEG..HANGUL SYLLABLE DEH
    0xB38D <= code && code <= 0xB3A7 || // Lo  [27] HANGUL SYLLABLE DYEOG..HANGUL SYLLABLE DYEOH
    0xB3A9 <= code && code <= 0xB3C3 || // Lo  [27] HANGUL SYLLABLE DYEG..HANGUL SYLLABLE DYEH
    0xB3C5 <= code && code <= 0xB3DF || // Lo  [27] HANGUL SYLLABLE DOG..HANGUL SYLLABLE DOH
    0xB3E1 <= code && code <= 0xB3FB || // Lo  [27] HANGUL SYLLABLE DWAG..HANGUL SYLLABLE DWAH
    0xB3FD <= code && code <= 0xB417 || // Lo  [27] HANGUL SYLLABLE DWAEG..HANGUL SYLLABLE DWAEH
    0xB419 <= code && code <= 0xB433 || // Lo  [27] HANGUL SYLLABLE DOEG..HANGUL SYLLABLE DOEH
    0xB435 <= code && code <= 0xB44F || // Lo  [27] HANGUL SYLLABLE DYOG..HANGUL SYLLABLE DYOH
    0xB451 <= code && code <= 0xB46B || // Lo  [27] HANGUL SYLLABLE DUG..HANGUL SYLLABLE DUH
    0xB46D <= code && code <= 0xB487 || // Lo  [27] HANGUL SYLLABLE DWEOG..HANGUL SYLLABLE DWEOH
    0xB489 <= code && code <= 0xB4A3 || // Lo  [27] HANGUL SYLLABLE DWEG..HANGUL SYLLABLE DWEH
    0xB4A5 <= code && code <= 0xB4BF || // Lo  [27] HANGUL SYLLABLE DWIG..HANGUL SYLLABLE DWIH
    0xB4C1 <= code && code <= 0xB4DB || // Lo  [27] HANGUL SYLLABLE DYUG..HANGUL SYLLABLE DYUH
    0xB4DD <= code && code <= 0xB4F7 || // Lo  [27] HANGUL SYLLABLE DEUG..HANGUL SYLLABLE DEUH
    0xB4F9 <= code && code <= 0xB513 || // Lo  [27] HANGUL SYLLABLE DYIG..HANGUL SYLLABLE DYIH
    0xB515 <= code && code <= 0xB52F || // Lo  [27] HANGUL SYLLABLE DIG..HANGUL SYLLABLE DIH
    0xB531 <= code && code <= 0xB54B || // Lo  [27] HANGUL SYLLABLE DDAG..HANGUL SYLLABLE DDAH
    0xB54D <= code && code <= 0xB567 || // Lo  [27] HANGUL SYLLABLE DDAEG..HANGUL SYLLABLE DDAEH
    0xB569 <= code && code <= 0xB583 || // Lo  [27] HANGUL SYLLABLE DDYAG..HANGUL SYLLABLE DDYAH
    0xB585 <= code && code <= 0xB59F || // Lo  [27] HANGUL SYLLABLE DDYAEG..HANGUL SYLLABLE DDYAEH
    0xB5A1 <= code && code <= 0xB5BB || // Lo  [27] HANGUL SYLLABLE DDEOG..HANGUL SYLLABLE DDEOH
    0xB5BD <= code && code <= 0xB5D7 || // Lo  [27] HANGUL SYLLABLE DDEG..HANGUL SYLLABLE DDEH
    0xB5D9 <= code && code <= 0xB5F3 || // Lo  [27] HANGUL SYLLABLE DDYEOG..HANGUL SYLLABLE DDYEOH
    0xB5F5 <= code && code <= 0xB60F || // Lo  [27] HANGUL SYLLABLE DDYEG..HANGUL SYLLABLE DDYEH
    0xB611 <= code && code <= 0xB62B || // Lo  [27] HANGUL SYLLABLE DDOG..HANGUL SYLLABLE DDOH
    0xB62D <= code && code <= 0xB647 || // Lo  [27] HANGUL SYLLABLE DDWAG..HANGUL SYLLABLE DDWAH
    0xB649 <= code && code <= 0xB663 || // Lo  [27] HANGUL SYLLABLE DDWAEG..HANGUL SYLLABLE DDWAEH
    0xB665 <= code && code <= 0xB67F || // Lo  [27] HANGUL SYLLABLE DDOEG..HANGUL SYLLABLE DDOEH
    0xB681 <= code && code <= 0xB69B || // Lo  [27] HANGUL SYLLABLE DDYOG..HANGUL SYLLABLE DDYOH
    0xB69D <= code && code <= 0xB6B7 || // Lo  [27] HANGUL SYLLABLE DDUG..HANGUL SYLLABLE DDUH
    0xB6B9 <= code && code <= 0xB6D3 || // Lo  [27] HANGUL SYLLABLE DDWEOG..HANGUL SYLLABLE DDWEOH
    0xB6D5 <= code && code <= 0xB6EF || // Lo  [27] HANGUL SYLLABLE DDWEG..HANGUL SYLLABLE DDWEH
    0xB6F1 <= code && code <= 0xB70B || // Lo  [27] HANGUL SYLLABLE DDWIG..HANGUL SYLLABLE DDWIH
    0xB70D <= code && code <= 0xB727 || // Lo  [27] HANGUL SYLLABLE DDYUG..HANGUL SYLLABLE DDYUH
    0xB729 <= code && code <= 0xB743 || // Lo  [27] HANGUL SYLLABLE DDEUG..HANGUL SYLLABLE DDEUH
    0xB745 <= code && code <= 0xB75F || // Lo  [27] HANGUL SYLLABLE DDYIG..HANGUL SYLLABLE DDYIH
    0xB761 <= code && code <= 0xB77B || // Lo  [27] HANGUL SYLLABLE DDIG..HANGUL SYLLABLE DDIH
    0xB77D <= code && code <= 0xB797 || // Lo  [27] HANGUL SYLLABLE RAG..HANGUL SYLLABLE RAH
    0xB799 <= code && code <= 0xB7B3 || // Lo  [27] HANGUL SYLLABLE RAEG..HANGUL SYLLABLE RAEH
    0xB7B5 <= code && code <= 0xB7CF || // Lo  [27] HANGUL SYLLABLE RYAG..HANGUL SYLLABLE RYAH
    0xB7D1 <= code && code <= 0xB7EB || // Lo  [27] HANGUL SYLLABLE RYAEG..HANGUL SYLLABLE RYAEH
    0xB7ED <= code && code <= 0xB807 || // Lo  [27] HANGUL SYLLABLE REOG..HANGUL SYLLABLE REOH
    0xB809 <= code && code <= 0xB823 || // Lo  [27] HANGUL SYLLABLE REG..HANGUL SYLLABLE REH
    0xB825 <= code && code <= 0xB83F || // Lo  [27] HANGUL SYLLABLE RYEOG..HANGUL SYLLABLE RYEOH
    0xB841 <= code && code <= 0xB85B || // Lo  [27] HANGUL SYLLABLE RYEG..HANGUL SYLLABLE RYEH
    0xB85D <= code && code <= 0xB877 || // Lo  [27] HANGUL SYLLABLE ROG..HANGUL SYLLABLE ROH
    0xB879 <= code && code <= 0xB893 || // Lo  [27] HANGUL SYLLABLE RWAG..HANGUL SYLLABLE RWAH
    0xB895 <= code && code <= 0xB8AF || // Lo  [27] HANGUL SYLLABLE RWAEG..HANGUL SYLLABLE RWAEH
    0xB8B1 <= code && code <= 0xB8CB || // Lo  [27] HANGUL SYLLABLE ROEG..HANGUL SYLLABLE ROEH
    0xB8CD <= code && code <= 0xB8E7 || // Lo  [27] HANGUL SYLLABLE RYOG..HANGUL SYLLABLE RYOH
    0xB8E9 <= code && code <= 0xB903 || // Lo  [27] HANGUL SYLLABLE RUG..HANGUL SYLLABLE RUH
    0xB905 <= code && code <= 0xB91F || // Lo  [27] HANGUL SYLLABLE RWEOG..HANGUL SYLLABLE RWEOH
    0xB921 <= code && code <= 0xB93B || // Lo  [27] HANGUL SYLLABLE RWEG..HANGUL SYLLABLE RWEH
    0xB93D <= code && code <= 0xB957 || // Lo  [27] HANGUL SYLLABLE RWIG..HANGUL SYLLABLE RWIH
    0xB959 <= code && code <= 0xB973 || // Lo  [27] HANGUL SYLLABLE RYUG..HANGUL SYLLABLE RYUH
    0xB975 <= code && code <= 0xB98F || // Lo  [27] HANGUL SYLLABLE REUG..HANGUL SYLLABLE REUH
    0xB991 <= code && code <= 0xB9AB || // Lo  [27] HANGUL SYLLABLE RYIG..HANGUL SYLLABLE RYIH
    0xB9AD <= code && code <= 0xB9C7 || // Lo  [27] HANGUL SYLLABLE RIG..HANGUL SYLLABLE RIH
    0xB9C9 <= code && code <= 0xB9E3 || // Lo  [27] HANGUL SYLLABLE MAG..HANGUL SYLLABLE MAH
    0xB9E5 <= code && code <= 0xB9FF || // Lo  [27] HANGUL SYLLABLE MAEG..HANGUL SYLLABLE MAEH
    0xBA01 <= code && code <= 0xBA1B || // Lo  [27] HANGUL SYLLABLE MYAG..HANGUL SYLLABLE MYAH
    0xBA1D <= code && code <= 0xBA37 || // Lo  [27] HANGUL SYLLABLE MYAEG..HANGUL SYLLABLE MYAEH
    0xBA39 <= code && code <= 0xBA53 || // Lo  [27] HANGUL SYLLABLE MEOG..HANGUL SYLLABLE MEOH
    0xBA55 <= code && code <= 0xBA6F || // Lo  [27] HANGUL SYLLABLE MEG..HANGUL SYLLABLE MEH
    0xBA71 <= code && code <= 0xBA8B || // Lo  [27] HANGUL SYLLABLE MYEOG..HANGUL SYLLABLE MYEOH
    0xBA8D <= code && code <= 0xBAA7 || // Lo  [27] HANGUL SYLLABLE MYEG..HANGUL SYLLABLE MYEH
    0xBAA9 <= code && code <= 0xBAC3 || // Lo  [27] HANGUL SYLLABLE MOG..HANGUL SYLLABLE MOH
    0xBAC5 <= code && code <= 0xBADF || // Lo  [27] HANGUL SYLLABLE MWAG..HANGUL SYLLABLE MWAH
    0xBAE1 <= code && code <= 0xBAFB || // Lo  [27] HANGUL SYLLABLE MWAEG..HANGUL SYLLABLE MWAEH
    0xBAFD <= code && code <= 0xBB17 || // Lo  [27] HANGUL SYLLABLE MOEG..HANGUL SYLLABLE MOEH
    0xBB19 <= code && code <= 0xBB33 || // Lo  [27] HANGUL SYLLABLE MYOG..HANGUL SYLLABLE MYOH
    0xBB35 <= code && code <= 0xBB4F || // Lo  [27] HANGUL SYLLABLE MUG..HANGUL SYLLABLE MUH
    0xBB51 <= code && code <= 0xBB6B || // Lo  [27] HANGUL SYLLABLE MWEOG..HANGUL SYLLABLE MWEOH
    0xBB6D <= code && code <= 0xBB87 || // Lo  [27] HANGUL SYLLABLE MWEG..HANGUL SYLLABLE MWEH
    0xBB89 <= code && code <= 0xBBA3 || // Lo  [27] HANGUL SYLLABLE MWIG..HANGUL SYLLABLE MWIH
    0xBBA5 <= code && code <= 0xBBBF || // Lo  [27] HANGUL SYLLABLE MYUG..HANGUL SYLLABLE MYUH
    0xBBC1 <= code && code <= 0xBBDB || // Lo  [27] HANGUL SYLLABLE MEUG..HANGUL SYLLABLE MEUH
    0xBBDD <= code && code <= 0xBBF7 || // Lo  [27] HANGUL SYLLABLE MYIG..HANGUL SYLLABLE MYIH
    0xBBF9 <= code && code <= 0xBC13 || // Lo  [27] HANGUL SYLLABLE MIG..HANGUL SYLLABLE MIH
    0xBC15 <= code && code <= 0xBC2F || // Lo  [27] HANGUL SYLLABLE BAG..HANGUL SYLLABLE BAH
    0xBC31 <= code && code <= 0xBC4B || // Lo  [27] HANGUL SYLLABLE BAEG..HANGUL SYLLABLE BAEH
    0xBC4D <= code && code <= 0xBC67 || // Lo  [27] HANGUL SYLLABLE BYAG..HANGUL SYLLABLE BYAH
    0xBC69 <= code && code <= 0xBC83 || // Lo  [27] HANGUL SYLLABLE BYAEG..HANGUL SYLLABLE BYAEH
    0xBC85 <= code && code <= 0xBC9F || // Lo  [27] HANGUL SYLLABLE BEOG..HANGUL SYLLABLE BEOH
    0xBCA1 <= code && code <= 0xBCBB || // Lo  [27] HANGUL SYLLABLE BEG..HANGUL SYLLABLE BEH
    0xBCBD <= code && code <= 0xBCD7 || // Lo  [27] HANGUL SYLLABLE BYEOG..HANGUL SYLLABLE BYEOH
    0xBCD9 <= code && code <= 0xBCF3 || // Lo  [27] HANGUL SYLLABLE BYEG..HANGUL SYLLABLE BYEH
    0xBCF5 <= code && code <= 0xBD0F || // Lo  [27] HANGUL SYLLABLE BOG..HANGUL SYLLABLE BOH
    0xBD11 <= code && code <= 0xBD2B || // Lo  [27] HANGUL SYLLABLE BWAG..HANGUL SYLLABLE BWAH
    0xBD2D <= code && code <= 0xBD47 || // Lo  [27] HANGUL SYLLABLE BWAEG..HANGUL SYLLABLE BWAEH
    0xBD49 <= code && code <= 0xBD63 || // Lo  [27] HANGUL SYLLABLE BOEG..HANGUL SYLLABLE BOEH
    0xBD65 <= code && code <= 0xBD7F || // Lo  [27] HANGUL SYLLABLE BYOG..HANGUL SYLLABLE BYOH
    0xBD81 <= code && code <= 0xBD9B || // Lo  [27] HANGUL SYLLABLE BUG..HANGUL SYLLABLE BUH
    0xBD9D <= code && code <= 0xBDB7 || // Lo  [27] HANGUL SYLLABLE BWEOG..HANGUL SYLLABLE BWEOH
    0xBDB9 <= code && code <= 0xBDD3 || // Lo  [27] HANGUL SYLLABLE BWEG..HANGUL SYLLABLE BWEH
    0xBDD5 <= code && code <= 0xBDEF || // Lo  [27] HANGUL SYLLABLE BWIG..HANGUL SYLLABLE BWIH
    0xBDF1 <= code && code <= 0xBE0B || // Lo  [27] HANGUL SYLLABLE BYUG..HANGUL SYLLABLE BYUH
    0xBE0D <= code && code <= 0xBE27 || // Lo  [27] HANGUL SYLLABLE BEUG..HANGUL SYLLABLE BEUH
    0xBE29 <= code && code <= 0xBE43 || // Lo  [27] HANGUL SYLLABLE BYIG..HANGUL SYLLABLE BYIH
    0xBE45 <= code && code <= 0xBE5F || // Lo  [27] HANGUL SYLLABLE BIG..HANGUL SYLLABLE BIH
    0xBE61 <= code && code <= 0xBE7B || // Lo  [27] HANGUL SYLLABLE BBAG..HANGUL SYLLABLE BBAH
    0xBE7D <= code && code <= 0xBE97 || // Lo  [27] HANGUL SYLLABLE BBAEG..HANGUL SYLLABLE BBAEH
    0xBE99 <= code && code <= 0xBEB3 || // Lo  [27] HANGUL SYLLABLE BBYAG..HANGUL SYLLABLE BBYAH
    0xBEB5 <= code && code <= 0xBECF || // Lo  [27] HANGUL SYLLABLE BBYAEG..HANGUL SYLLABLE BBYAEH
    0xBED1 <= code && code <= 0xBEEB || // Lo  [27] HANGUL SYLLABLE BBEOG..HANGUL SYLLABLE BBEOH
    0xBEED <= code && code <= 0xBF07 || // Lo  [27] HANGUL SYLLABLE BBEG..HANGUL SYLLABLE BBEH
    0xBF09 <= code && code <= 0xBF23 || // Lo  [27] HANGUL SYLLABLE BBYEOG..HANGUL SYLLABLE BBYEOH
    0xBF25 <= code && code <= 0xBF3F || // Lo  [27] HANGUL SYLLABLE BBYEG..HANGUL SYLLABLE BBYEH
    0xBF41 <= code && code <= 0xBF5B || // Lo  [27] HANGUL SYLLABLE BBOG..HANGUL SYLLABLE BBOH
    0xBF5D <= code && code <= 0xBF77 || // Lo  [27] HANGUL SYLLABLE BBWAG..HANGUL SYLLABLE BBWAH
    0xBF79 <= code && code <= 0xBF93 || // Lo  [27] HANGUL SYLLABLE BBWAEG..HANGUL SYLLABLE BBWAEH
    0xBF95 <= code && code <= 0xBFAF || // Lo  [27] HANGUL SYLLABLE BBOEG..HANGUL SYLLABLE BBOEH
    0xBFB1 <= code && code <= 0xBFCB || // Lo  [27] HANGUL SYLLABLE BBYOG..HANGUL SYLLABLE BBYOH
    0xBFCD <= code && code <= 0xBFE7 || // Lo  [27] HANGUL SYLLABLE BBUG..HANGUL SYLLABLE BBUH
    0xBFE9 <= code && code <= 0xC003 || // Lo  [27] HANGUL SYLLABLE BBWEOG..HANGUL SYLLABLE BBWEOH
    0xC005 <= code && code <= 0xC01F || // Lo  [27] HANGUL SYLLABLE BBWEG..HANGUL SYLLABLE BBWEH
    0xC021 <= code && code <= 0xC03B || // Lo  [27] HANGUL SYLLABLE BBWIG..HANGUL SYLLABLE BBWIH
    0xC03D <= code && code <= 0xC057 || // Lo  [27] HANGUL SYLLABLE BBYUG..HANGUL SYLLABLE BBYUH
    0xC059 <= code && code <= 0xC073 || // Lo  [27] HANGUL SYLLABLE BBEUG..HANGUL SYLLABLE BBEUH
    0xC075 <= code && code <= 0xC08F || // Lo  [27] HANGUL SYLLABLE BBYIG..HANGUL SYLLABLE BBYIH
    0xC091 <= code && code <= 0xC0AB || // Lo  [27] HANGUL SYLLABLE BBIG..HANGUL SYLLABLE BBIH
    0xC0AD <= code && code <= 0xC0C7 || // Lo  [27] HANGUL SYLLABLE SAG..HANGUL SYLLABLE SAH
    0xC0C9 <= code && code <= 0xC0E3 || // Lo  [27] HANGUL SYLLABLE SAEG..HANGUL SYLLABLE SAEH
    0xC0E5 <= code && code <= 0xC0FF || // Lo  [27] HANGUL SYLLABLE SYAG..HANGUL SYLLABLE SYAH
    0xC101 <= code && code <= 0xC11B || // Lo  [27] HANGUL SYLLABLE SYAEG..HANGUL SYLLABLE SYAEH
    0xC11D <= code && code <= 0xC137 || // Lo  [27] HANGUL SYLLABLE SEOG..HANGUL SYLLABLE SEOH
    0xC139 <= code && code <= 0xC153 || // Lo  [27] HANGUL SYLLABLE SEG..HANGUL SYLLABLE SEH
    0xC155 <= code && code <= 0xC16F || // Lo  [27] HANGUL SYLLABLE SYEOG..HANGUL SYLLABLE SYEOH
    0xC171 <= code && code <= 0xC18B || // Lo  [27] HANGUL SYLLABLE SYEG..HANGUL SYLLABLE SYEH
    0xC18D <= code && code <= 0xC1A7 || // Lo  [27] HANGUL SYLLABLE SOG..HANGUL SYLLABLE SOH
    0xC1A9 <= code && code <= 0xC1C3 || // Lo  [27] HANGUL SYLLABLE SWAG..HANGUL SYLLABLE SWAH
    0xC1C5 <= code && code <= 0xC1DF || // Lo  [27] HANGUL SYLLABLE SWAEG..HANGUL SYLLABLE SWAEH
    0xC1E1 <= code && code <= 0xC1FB || // Lo  [27] HANGUL SYLLABLE SOEG..HANGUL SYLLABLE SOEH
    0xC1FD <= code && code <= 0xC217 || // Lo  [27] HANGUL SYLLABLE SYOG..HANGUL SYLLABLE SYOH
    0xC219 <= code && code <= 0xC233 || // Lo  [27] HANGUL SYLLABLE SUG..HANGUL SYLLABLE SUH
    0xC235 <= code && code <= 0xC24F || // Lo  [27] HANGUL SYLLABLE SWEOG..HANGUL SYLLABLE SWEOH
    0xC251 <= code && code <= 0xC26B || // Lo  [27] HANGUL SYLLABLE SWEG..HANGUL SYLLABLE SWEH
    0xC26D <= code && code <= 0xC287 || // Lo  [27] HANGUL SYLLABLE SWIG..HANGUL SYLLABLE SWIH
    0xC289 <= code && code <= 0xC2A3 || // Lo  [27] HANGUL SYLLABLE SYUG..HANGUL SYLLABLE SYUH
    0xC2A5 <= code && code <= 0xC2BF || // Lo  [27] HANGUL SYLLABLE SEUG..HANGUL SYLLABLE SEUH
    0xC2C1 <= code && code <= 0xC2DB || // Lo  [27] HANGUL SYLLABLE SYIG..HANGUL SYLLABLE SYIH
    0xC2DD <= code && code <= 0xC2F7 || // Lo  [27] HANGUL SYLLABLE SIG..HANGUL SYLLABLE SIH
    0xC2F9 <= code && code <= 0xC313 || // Lo  [27] HANGUL SYLLABLE SSAG..HANGUL SYLLABLE SSAH
    0xC315 <= code && code <= 0xC32F || // Lo  [27] HANGUL SYLLABLE SSAEG..HANGUL SYLLABLE SSAEH
    0xC331 <= code && code <= 0xC34B || // Lo  [27] HANGUL SYLLABLE SSYAG..HANGUL SYLLABLE SSYAH
    0xC34D <= code && code <= 0xC367 || // Lo  [27] HANGUL SYLLABLE SSYAEG..HANGUL SYLLABLE SSYAEH
    0xC369 <= code && code <= 0xC383 || // Lo  [27] HANGUL SYLLABLE SSEOG..HANGUL SYLLABLE SSEOH
    0xC385 <= code && code <= 0xC39F || // Lo  [27] HANGUL SYLLABLE SSEG..HANGUL SYLLABLE SSEH
    0xC3A1 <= code && code <= 0xC3BB || // Lo  [27] HANGUL SYLLABLE SSYEOG..HANGUL SYLLABLE SSYEOH
    0xC3BD <= code && code <= 0xC3D7 || // Lo  [27] HANGUL SYLLABLE SSYEG..HANGUL SYLLABLE SSYEH
    0xC3D9 <= code && code <= 0xC3F3 || // Lo  [27] HANGUL SYLLABLE SSOG..HANGUL SYLLABLE SSOH
    0xC3F5 <= code && code <= 0xC40F || // Lo  [27] HANGUL SYLLABLE SSWAG..HANGUL SYLLABLE SSWAH
    0xC411 <= code && code <= 0xC42B || // Lo  [27] HANGUL SYLLABLE SSWAEG..HANGUL SYLLABLE SSWAEH
    0xC42D <= code && code <= 0xC447 || // Lo  [27] HANGUL SYLLABLE SSOEG..HANGUL SYLLABLE SSOEH
    0xC449 <= code && code <= 0xC463 || // Lo  [27] HANGUL SYLLABLE SSYOG..HANGUL SYLLABLE SSYOH
    0xC465 <= code && code <= 0xC47F || // Lo  [27] HANGUL SYLLABLE SSUG..HANGUL SYLLABLE SSUH
    0xC481 <= code && code <= 0xC49B || // Lo  [27] HANGUL SYLLABLE SSWEOG..HANGUL SYLLABLE SSWEOH
    0xC49D <= code && code <= 0xC4B7 || // Lo  [27] HANGUL SYLLABLE SSWEG..HANGUL SYLLABLE SSWEH
    0xC4B9 <= code && code <= 0xC4D3 || // Lo  [27] HANGUL SYLLABLE SSWIG..HANGUL SYLLABLE SSWIH
    0xC4D5 <= code && code <= 0xC4EF || // Lo  [27] HANGUL SYLLABLE SSYUG..HANGUL SYLLABLE SSYUH
    0xC4F1 <= code && code <= 0xC50B || // Lo  [27] HANGUL SYLLABLE SSEUG..HANGUL SYLLABLE SSEUH
    0xC50D <= code && code <= 0xC527 || // Lo  [27] HANGUL SYLLABLE SSYIG..HANGUL SYLLABLE SSYIH
    0xC529 <= code && code <= 0xC543 || // Lo  [27] HANGUL SYLLABLE SSIG..HANGUL SYLLABLE SSIH
    0xC545 <= code && code <= 0xC55F || // Lo  [27] HANGUL SYLLABLE AG..HANGUL SYLLABLE AH
    0xC561 <= code && code <= 0xC57B || // Lo  [27] HANGUL SYLLABLE AEG..HANGUL SYLLABLE AEH
    0xC57D <= code && code <= 0xC597 || // Lo  [27] HANGUL SYLLABLE YAG..HANGUL SYLLABLE YAH
    0xC599 <= code && code <= 0xC5B3 || // Lo  [27] HANGUL SYLLABLE YAEG..HANGUL SYLLABLE YAEH
    0xC5B5 <= code && code <= 0xC5CF || // Lo  [27] HANGUL SYLLABLE EOG..HANGUL SYLLABLE EOH
    0xC5D1 <= code && code <= 0xC5EB || // Lo  [27] HANGUL SYLLABLE EG..HANGUL SYLLABLE EH
    0xC5ED <= code && code <= 0xC607 || // Lo  [27] HANGUL SYLLABLE YEOG..HANGUL SYLLABLE YEOH
    0xC609 <= code && code <= 0xC623 || // Lo  [27] HANGUL SYLLABLE YEG..HANGUL SYLLABLE YEH
    0xC625 <= code && code <= 0xC63F || // Lo  [27] HANGUL SYLLABLE OG..HANGUL SYLLABLE OH
    0xC641 <= code && code <= 0xC65B || // Lo  [27] HANGUL SYLLABLE WAG..HANGUL SYLLABLE WAH
    0xC65D <= code && code <= 0xC677 || // Lo  [27] HANGUL SYLLABLE WAEG..HANGUL SYLLABLE WAEH
    0xC679 <= code && code <= 0xC693 || // Lo  [27] HANGUL SYLLABLE OEG..HANGUL SYLLABLE OEH
    0xC695 <= code && code <= 0xC6AF || // Lo  [27] HANGUL SYLLABLE YOG..HANGUL SYLLABLE YOH
    0xC6B1 <= code && code <= 0xC6CB || // Lo  [27] HANGUL SYLLABLE UG..HANGUL SYLLABLE UH
    0xC6CD <= code && code <= 0xC6E7 || // Lo  [27] HANGUL SYLLABLE WEOG..HANGUL SYLLABLE WEOH
    0xC6E9 <= code && code <= 0xC703 || // Lo  [27] HANGUL SYLLABLE WEG..HANGUL SYLLABLE WEH
    0xC705 <= code && code <= 0xC71F || // Lo  [27] HANGUL SYLLABLE WIG..HANGUL SYLLABLE WIH
    0xC721 <= code && code <= 0xC73B || // Lo  [27] HANGUL SYLLABLE YUG..HANGUL SYLLABLE YUH
    0xC73D <= code && code <= 0xC757 || // Lo  [27] HANGUL SYLLABLE EUG..HANGUL SYLLABLE EUH
    0xC759 <= code && code <= 0xC773 || // Lo  [27] HANGUL SYLLABLE YIG..HANGUL SYLLABLE YIH
    0xC775 <= code && code <= 0xC78F || // Lo  [27] HANGUL SYLLABLE IG..HANGUL SYLLABLE IH
    0xC791 <= code && code <= 0xC7AB || // Lo  [27] HANGUL SYLLABLE JAG..HANGUL SYLLABLE JAH
    0xC7AD <= code && code <= 0xC7C7 || // Lo  [27] HANGUL SYLLABLE JAEG..HANGUL SYLLABLE JAEH
    0xC7C9 <= code && code <= 0xC7E3 || // Lo  [27] HANGUL SYLLABLE JYAG..HANGUL SYLLABLE JYAH
    0xC7E5 <= code && code <= 0xC7FF || // Lo  [27] HANGUL SYLLABLE JYAEG..HANGUL SYLLABLE JYAEH
    0xC801 <= code && code <= 0xC81B || // Lo  [27] HANGUL SYLLABLE JEOG..HANGUL SYLLABLE JEOH
    0xC81D <= code && code <= 0xC837 || // Lo  [27] HANGUL SYLLABLE JEG..HANGUL SYLLABLE JEH
    0xC839 <= code && code <= 0xC853 || // Lo  [27] HANGUL SYLLABLE JYEOG..HANGUL SYLLABLE JYEOH
    0xC855 <= code && code <= 0xC86F || // Lo  [27] HANGUL SYLLABLE JYEG..HANGUL SYLLABLE JYEH
    0xC871 <= code && code <= 0xC88B || // Lo  [27] HANGUL SYLLABLE JOG..HANGUL SYLLABLE JOH
    0xC88D <= code && code <= 0xC8A7 || // Lo  [27] HANGUL SYLLABLE JWAG..HANGUL SYLLABLE JWAH
    0xC8A9 <= code && code <= 0xC8C3 || // Lo  [27] HANGUL SYLLABLE JWAEG..HANGUL SYLLABLE JWAEH
    0xC8C5 <= code && code <= 0xC8DF || // Lo  [27] HANGUL SYLLABLE JOEG..HANGUL SYLLABLE JOEH
    0xC8E1 <= code && code <= 0xC8FB || // Lo  [27] HANGUL SYLLABLE JYOG..HANGUL SYLLABLE JYOH
    0xC8FD <= code && code <= 0xC917 || // Lo  [27] HANGUL SYLLABLE JUG..HANGUL SYLLABLE JUH
    0xC919 <= code && code <= 0xC933 || // Lo  [27] HANGUL SYLLABLE JWEOG..HANGUL SYLLABLE JWEOH
    0xC935 <= code && code <= 0xC94F || // Lo  [27] HANGUL SYLLABLE JWEG..HANGUL SYLLABLE JWEH
    0xC951 <= code && code <= 0xC96B || // Lo  [27] HANGUL SYLLABLE JWIG..HANGUL SYLLABLE JWIH
    0xC96D <= code && code <= 0xC987 || // Lo  [27] HANGUL SYLLABLE JYUG..HANGUL SYLLABLE JYUH
    0xC989 <= code && code <= 0xC9A3 || // Lo  [27] HANGUL SYLLABLE JEUG..HANGUL SYLLABLE JEUH
    0xC9A5 <= code && code <= 0xC9BF || // Lo  [27] HANGUL SYLLABLE JYIG..HANGUL SYLLABLE JYIH
    0xC9C1 <= code && code <= 0xC9DB || // Lo  [27] HANGUL SYLLABLE JIG..HANGUL SYLLABLE JIH
    0xC9DD <= code && code <= 0xC9F7 || // Lo  [27] HANGUL SYLLABLE JJAG..HANGUL SYLLABLE JJAH
    0xC9F9 <= code && code <= 0xCA13 || // Lo  [27] HANGUL SYLLABLE JJAEG..HANGUL SYLLABLE JJAEH
    0xCA15 <= code && code <= 0xCA2F || // Lo  [27] HANGUL SYLLABLE JJYAG..HANGUL SYLLABLE JJYAH
    0xCA31 <= code && code <= 0xCA4B || // Lo  [27] HANGUL SYLLABLE JJYAEG..HANGUL SYLLABLE JJYAEH
    0xCA4D <= code && code <= 0xCA67 || // Lo  [27] HANGUL SYLLABLE JJEOG..HANGUL SYLLABLE JJEOH
    0xCA69 <= code && code <= 0xCA83 || // Lo  [27] HANGUL SYLLABLE JJEG..HANGUL SYLLABLE JJEH
    0xCA85 <= code && code <= 0xCA9F || // Lo  [27] HANGUL SYLLABLE JJYEOG..HANGUL SYLLABLE JJYEOH
    0xCAA1 <= code && code <= 0xCABB || // Lo  [27] HANGUL SYLLABLE JJYEG..HANGUL SYLLABLE JJYEH
    0xCABD <= code && code <= 0xCAD7 || // Lo  [27] HANGUL SYLLABLE JJOG..HANGUL SYLLABLE JJOH
    0xCAD9 <= code && code <= 0xCAF3 || // Lo  [27] HANGUL SYLLABLE JJWAG..HANGUL SYLLABLE JJWAH
    0xCAF5 <= code && code <= 0xCB0F || // Lo  [27] HANGUL SYLLABLE JJWAEG..HANGUL SYLLABLE JJWAEH
    0xCB11 <= code && code <= 0xCB2B || // Lo  [27] HANGUL SYLLABLE JJOEG..HANGUL SYLLABLE JJOEH
    0xCB2D <= code && code <= 0xCB47 || // Lo  [27] HANGUL SYLLABLE JJYOG..HANGUL SYLLABLE JJYOH
    0xCB49 <= code && code <= 0xCB63 || // Lo  [27] HANGUL SYLLABLE JJUG..HANGUL SYLLABLE JJUH
    0xCB65 <= code && code <= 0xCB7F || // Lo  [27] HANGUL SYLLABLE JJWEOG..HANGUL SYLLABLE JJWEOH
    0xCB81 <= code && code <= 0xCB9B || // Lo  [27] HANGUL SYLLABLE JJWEG..HANGUL SYLLABLE JJWEH
    0xCB9D <= code && code <= 0xCBB7 || // Lo  [27] HANGUL SYLLABLE JJWIG..HANGUL SYLLABLE JJWIH
    0xCBB9 <= code && code <= 0xCBD3 || // Lo  [27] HANGUL SYLLABLE JJYUG..HANGUL SYLLABLE JJYUH
    0xCBD5 <= code && code <= 0xCBEF || // Lo  [27] HANGUL SYLLABLE JJEUG..HANGUL SYLLABLE JJEUH
    0xCBF1 <= code && code <= 0xCC0B || // Lo  [27] HANGUL SYLLABLE JJYIG..HANGUL SYLLABLE JJYIH
    0xCC0D <= code && code <= 0xCC27 || // Lo  [27] HANGUL SYLLABLE JJIG..HANGUL SYLLABLE JJIH
    0xCC29 <= code && code <= 0xCC43 || // Lo  [27] HANGUL SYLLABLE CAG..HANGUL SYLLABLE CAH
    0xCC45 <= code && code <= 0xCC5F || // Lo  [27] HANGUL SYLLABLE CAEG..HANGUL SYLLABLE CAEH
    0xCC61 <= code && code <= 0xCC7B || // Lo  [27] HANGUL SYLLABLE CYAG..HANGUL SYLLABLE CYAH
    0xCC7D <= code && code <= 0xCC97 || // Lo  [27] HANGUL SYLLABLE CYAEG..HANGUL SYLLABLE CYAEH
    0xCC99 <= code && code <= 0xCCB3 || // Lo  [27] HANGUL SYLLABLE CEOG..HANGUL SYLLABLE CEOH
    0xCCB5 <= code && code <= 0xCCCF || // Lo  [27] HANGUL SYLLABLE CEG..HANGUL SYLLABLE CEH
    0xCCD1 <= code && code <= 0xCCEB || // Lo  [27] HANGUL SYLLABLE CYEOG..HANGUL SYLLABLE CYEOH
    0xCCED <= code && code <= 0xCD07 || // Lo  [27] HANGUL SYLLABLE CYEG..HANGUL SYLLABLE CYEH
    0xCD09 <= code && code <= 0xCD23 || // Lo  [27] HANGUL SYLLABLE COG..HANGUL SYLLABLE COH
    0xCD25 <= code && code <= 0xCD3F || // Lo  [27] HANGUL SYLLABLE CWAG..HANGUL SYLLABLE CWAH
    0xCD41 <= code && code <= 0xCD5B || // Lo  [27] HANGUL SYLLABLE CWAEG..HANGUL SYLLABLE CWAEH
    0xCD5D <= code && code <= 0xCD77 || // Lo  [27] HANGUL SYLLABLE COEG..HANGUL SYLLABLE COEH
    0xCD79 <= code && code <= 0xCD93 || // Lo  [27] HANGUL SYLLABLE CYOG..HANGUL SYLLABLE CYOH
    0xCD95 <= code && code <= 0xCDAF || // Lo  [27] HANGUL SYLLABLE CUG..HANGUL SYLLABLE CUH
    0xCDB1 <= code && code <= 0xCDCB || // Lo  [27] HANGUL SYLLABLE CWEOG..HANGUL SYLLABLE CWEOH
    0xCDCD <= code && code <= 0xCDE7 || // Lo  [27] HANGUL SYLLABLE CWEG..HANGUL SYLLABLE CWEH
    0xCDE9 <= code && code <= 0xCE03 || // Lo  [27] HANGUL SYLLABLE CWIG..HANGUL SYLLABLE CWIH
    0xCE05 <= code && code <= 0xCE1F || // Lo  [27] HANGUL SYLLABLE CYUG..HANGUL SYLLABLE CYUH
    0xCE21 <= code && code <= 0xCE3B || // Lo  [27] HANGUL SYLLABLE CEUG..HANGUL SYLLABLE CEUH
    0xCE3D <= code && code <= 0xCE57 || // Lo  [27] HANGUL SYLLABLE CYIG..HANGUL SYLLABLE CYIH
    0xCE59 <= code && code <= 0xCE73 || // Lo  [27] HANGUL SYLLABLE CIG..HANGUL SYLLABLE CIH
    0xCE75 <= code && code <= 0xCE8F || // Lo  [27] HANGUL SYLLABLE KAG..HANGUL SYLLABLE KAH
    0xCE91 <= code && code <= 0xCEAB || // Lo  [27] HANGUL SYLLABLE KAEG..HANGUL SYLLABLE KAEH
    0xCEAD <= code && code <= 0xCEC7 || // Lo  [27] HANGUL SYLLABLE KYAG..HANGUL SYLLABLE KYAH
    0xCEC9 <= code && code <= 0xCEE3 || // Lo  [27] HANGUL SYLLABLE KYAEG..HANGUL SYLLABLE KYAEH
    0xCEE5 <= code && code <= 0xCEFF || // Lo  [27] HANGUL SYLLABLE KEOG..HANGUL SYLLABLE KEOH
    0xCF01 <= code && code <= 0xCF1B || // Lo  [27] HANGUL SYLLABLE KEG..HANGUL SYLLABLE KEH
    0xCF1D <= code && code <= 0xCF37 || // Lo  [27] HANGUL SYLLABLE KYEOG..HANGUL SYLLABLE KYEOH
    0xCF39 <= code && code <= 0xCF53 || // Lo  [27] HANGUL SYLLABLE KYEG..HANGUL SYLLABLE KYEH
    0xCF55 <= code && code <= 0xCF6F || // Lo  [27] HANGUL SYLLABLE KOG..HANGUL SYLLABLE KOH
    0xCF71 <= code && code <= 0xCF8B || // Lo  [27] HANGUL SYLLABLE KWAG..HANGUL SYLLABLE KWAH
    0xCF8D <= code && code <= 0xCFA7 || // Lo  [27] HANGUL SYLLABLE KWAEG..HANGUL SYLLABLE KWAEH
    0xCFA9 <= code && code <= 0xCFC3 || // Lo  [27] HANGUL SYLLABLE KOEG..HANGUL SYLLABLE KOEH
    0xCFC5 <= code && code <= 0xCFDF || // Lo  [27] HANGUL SYLLABLE KYOG..HANGUL SYLLABLE KYOH
    0xCFE1 <= code && code <= 0xCFFB || // Lo  [27] HANGUL SYLLABLE KUG..HANGUL SYLLABLE KUH
    0xCFFD <= code && code <= 0xD017 || // Lo  [27] HANGUL SYLLABLE KWEOG..HANGUL SYLLABLE KWEOH
    0xD019 <= code && code <= 0xD033 || // Lo  [27] HANGUL SYLLABLE KWEG..HANGUL SYLLABLE KWEH
    0xD035 <= code && code <= 0xD04F || // Lo  [27] HANGUL SYLLABLE KWIG..HANGUL SYLLABLE KWIH
    0xD051 <= code && code <= 0xD06B || // Lo  [27] HANGUL SYLLABLE KYUG..HANGUL SYLLABLE KYUH
    0xD06D <= code && code <= 0xD087 || // Lo  [27] HANGUL SYLLABLE KEUG..HANGUL SYLLABLE KEUH
    0xD089 <= code && code <= 0xD0A3 || // Lo  [27] HANGUL SYLLABLE KYIG..HANGUL SYLLABLE KYIH
    0xD0A5 <= code && code <= 0xD0BF || // Lo  [27] HANGUL SYLLABLE KIG..HANGUL SYLLABLE KIH
    0xD0C1 <= code && code <= 0xD0DB || // Lo  [27] HANGUL SYLLABLE TAG..HANGUL SYLLABLE TAH
    0xD0DD <= code && code <= 0xD0F7 || // Lo  [27] HANGUL SYLLABLE TAEG..HANGUL SYLLABLE TAEH
    0xD0F9 <= code && code <= 0xD113 || // Lo  [27] HANGUL SYLLABLE TYAG..HANGUL SYLLABLE TYAH
    0xD115 <= code && code <= 0xD12F || // Lo  [27] HANGUL SYLLABLE TYAEG..HANGUL SYLLABLE TYAEH
    0xD131 <= code && code <= 0xD14B || // Lo  [27] HANGUL SYLLABLE TEOG..HANGUL SYLLABLE TEOH
    0xD14D <= code && code <= 0xD167 || // Lo  [27] HANGUL SYLLABLE TEG..HANGUL SYLLABLE TEH
    0xD169 <= code && code <= 0xD183 || // Lo  [27] HANGUL SYLLABLE TYEOG..HANGUL SYLLABLE TYEOH
    0xD185 <= code && code <= 0xD19F || // Lo  [27] HANGUL SYLLABLE TYEG..HANGUL SYLLABLE TYEH
    0xD1A1 <= code && code <= 0xD1BB || // Lo  [27] HANGUL SYLLABLE TOG..HANGUL SYLLABLE TOH
    0xD1BD <= code && code <= 0xD1D7 || // Lo  [27] HANGUL SYLLABLE TWAG..HANGUL SYLLABLE TWAH
    0xD1D9 <= code && code <= 0xD1F3 || // Lo  [27] HANGUL SYLLABLE TWAEG..HANGUL SYLLABLE TWAEH
    0xD1F5 <= code && code <= 0xD20F || // Lo  [27] HANGUL SYLLABLE TOEG..HANGUL SYLLABLE TOEH
    0xD211 <= code && code <= 0xD22B || // Lo  [27] HANGUL SYLLABLE TYOG..HANGUL SYLLABLE TYOH
    0xD22D <= code && code <= 0xD247 || // Lo  [27] HANGUL SYLLABLE TUG..HANGUL SYLLABLE TUH
    0xD249 <= code && code <= 0xD263 || // Lo  [27] HANGUL SYLLABLE TWEOG..HANGUL SYLLABLE TWEOH
    0xD265 <= code && code <= 0xD27F || // Lo  [27] HANGUL SYLLABLE TWEG..HANGUL SYLLABLE TWEH
    0xD281 <= code && code <= 0xD29B || // Lo  [27] HANGUL SYLLABLE TWIG..HANGUL SYLLABLE TWIH
    0xD29D <= code && code <= 0xD2B7 || // Lo  [27] HANGUL SYLLABLE TYUG..HANGUL SYLLABLE TYUH
    0xD2B9 <= code && code <= 0xD2D3 || // Lo  [27] HANGUL SYLLABLE TEUG..HANGUL SYLLABLE TEUH
    0xD2D5 <= code && code <= 0xD2EF || // Lo  [27] HANGUL SYLLABLE TYIG..HANGUL SYLLABLE TYIH
    0xD2F1 <= code && code <= 0xD30B || // Lo  [27] HANGUL SYLLABLE TIG..HANGUL SYLLABLE TIH
    0xD30D <= code && code <= 0xD327 || // Lo  [27] HANGUL SYLLABLE PAG..HANGUL SYLLABLE PAH
    0xD329 <= code && code <= 0xD343 || // Lo  [27] HANGUL SYLLABLE PAEG..HANGUL SYLLABLE PAEH
    0xD345 <= code && code <= 0xD35F || // Lo  [27] HANGUL SYLLABLE PYAG..HANGUL SYLLABLE PYAH
    0xD361 <= code && code <= 0xD37B || // Lo  [27] HANGUL SYLLABLE PYAEG..HANGUL SYLLABLE PYAEH
    0xD37D <= code && code <= 0xD397 || // Lo  [27] HANGUL SYLLABLE PEOG..HANGUL SYLLABLE PEOH
    0xD399 <= code && code <= 0xD3B3 || // Lo  [27] HANGUL SYLLABLE PEG..HANGUL SYLLABLE PEH
    0xD3B5 <= code && code <= 0xD3CF || // Lo  [27] HANGUL SYLLABLE PYEOG..HANGUL SYLLABLE PYEOH
    0xD3D1 <= code && code <= 0xD3EB || // Lo  [27] HANGUL SYLLABLE PYEG..HANGUL SYLLABLE PYEH
    0xD3ED <= code && code <= 0xD407 || // Lo  [27] HANGUL SYLLABLE POG..HANGUL SYLLABLE POH
    0xD409 <= code && code <= 0xD423 || // Lo  [27] HANGUL SYLLABLE PWAG..HANGUL SYLLABLE PWAH
    0xD425 <= code && code <= 0xD43F || // Lo  [27] HANGUL SYLLABLE PWAEG..HANGUL SYLLABLE PWAEH
    0xD441 <= code && code <= 0xD45B || // Lo  [27] HANGUL SYLLABLE POEG..HANGUL SYLLABLE POEH
    0xD45D <= code && code <= 0xD477 || // Lo  [27] HANGUL SYLLABLE PYOG..HANGUL SYLLABLE PYOH
    0xD479 <= code && code <= 0xD493 || // Lo  [27] HANGUL SYLLABLE PUG..HANGUL SYLLABLE PUH
    0xD495 <= code && code <= 0xD4AF || // Lo  [27] HANGUL SYLLABLE PWEOG..HANGUL SYLLABLE PWEOH
    0xD4B1 <= code && code <= 0xD4CB || // Lo  [27] HANGUL SYLLABLE PWEG..HANGUL SYLLABLE PWEH
    0xD4CD <= code && code <= 0xD4E7 || // Lo  [27] HANGUL SYLLABLE PWIG..HANGUL SYLLABLE PWIH
    0xD4E9 <= code && code <= 0xD503 || // Lo  [27] HANGUL SYLLABLE PYUG..HANGUL SYLLABLE PYUH
    0xD505 <= code && code <= 0xD51F || // Lo  [27] HANGUL SYLLABLE PEUG..HANGUL SYLLABLE PEUH
    0xD521 <= code && code <= 0xD53B || // Lo  [27] HANGUL SYLLABLE PYIG..HANGUL SYLLABLE PYIH
    0xD53D <= code && code <= 0xD557 || // Lo  [27] HANGUL SYLLABLE PIG..HANGUL SYLLABLE PIH
    0xD559 <= code && code <= 0xD573 || // Lo  [27] HANGUL SYLLABLE HAG..HANGUL SYLLABLE HAH
    0xD575 <= code && code <= 0xD58F || // Lo  [27] HANGUL SYLLABLE HAEG..HANGUL SYLLABLE HAEH
    0xD591 <= code && code <= 0xD5AB || // Lo  [27] HANGUL SYLLABLE HYAG..HANGUL SYLLABLE HYAH
    0xD5AD <= code && code <= 0xD5C7 || // Lo  [27] HANGUL SYLLABLE HYAEG..HANGUL SYLLABLE HYAEH
    0xD5C9 <= code && code <= 0xD5E3 || // Lo  [27] HANGUL SYLLABLE HEOG..HANGUL SYLLABLE HEOH
    0xD5E5 <= code && code <= 0xD5FF || // Lo  [27] HANGUL SYLLABLE HEG..HANGUL SYLLABLE HEH
    0xD601 <= code && code <= 0xD61B || // Lo  [27] HANGUL SYLLABLE HYEOG..HANGUL SYLLABLE HYEOH
    0xD61D <= code && code <= 0xD637 || // Lo  [27] HANGUL SYLLABLE HYEG..HANGUL SYLLABLE HYEH
    0xD639 <= code && code <= 0xD653 || // Lo  [27] HANGUL SYLLABLE HOG..HANGUL SYLLABLE HOH
    0xD655 <= code && code <= 0xD66F || // Lo  [27] HANGUL SYLLABLE HWAG..HANGUL SYLLABLE HWAH
    0xD671 <= code && code <= 0xD68B || // Lo  [27] HANGUL SYLLABLE HWAEG..HANGUL SYLLABLE HWAEH
    0xD68D <= code && code <= 0xD6A7 || // Lo  [27] HANGUL SYLLABLE HOEG..HANGUL SYLLABLE HOEH
    0xD6A9 <= code && code <= 0xD6C3 || // Lo  [27] HANGUL SYLLABLE HYOG..HANGUL SYLLABLE HYOH
    0xD6C5 <= code && code <= 0xD6DF || // Lo  [27] HANGUL SYLLABLE HUG..HANGUL SYLLABLE HUH
    0xD6E1 <= code && code <= 0xD6FB || // Lo  [27] HANGUL SYLLABLE HWEOG..HANGUL SYLLABLE HWEOH
    0xD6FD <= code && code <= 0xD717 || // Lo  [27] HANGUL SYLLABLE HWEG..HANGUL SYLLABLE HWEH
    0xD719 <= code && code <= 0xD733 || // Lo  [27] HANGUL SYLLABLE HWIG..HANGUL SYLLABLE HWIH
    0xD735 <= code && code <= 0xD74F || // Lo  [27] HANGUL SYLLABLE HYUG..HANGUL SYLLABLE HYUH
    0xD751 <= code && code <= 0xD76B || // Lo  [27] HANGUL SYLLABLE HEUG..HANGUL SYLLABLE HEUH
    0xD76D <= code && code <= 0xD787 || // Lo  [27] HANGUL SYLLABLE HYIG..HANGUL SYLLABLE HYIH
    0xD789 <= code && code <= 0xD7A3 // Lo  [27] HANGUL SYLLABLE HIG..HANGUL SYLLABLE HIH
    ) {
        return LVT;
      }

    if (
    0x261D == code || // So       WHITE UP POINTING INDEX
    0x26F9 == code || // So       PERSON WITH BALL
    0x270A <= code && code <= 0x270D || // So   [4] RAISED FIST..WRITING HAND
    0x1F385 == code || // So       FATHER CHRISTMAS
    0x1F3C2 <= code && code <= 0x1F3C4 || // So   [3] SNOWBOARDER..SURFER
    0x1F3C7 == code || // So       HORSE RACING
    0x1F3CA <= code && code <= 0x1F3CC || // So   [3] SWIMMER..GOLFER
    0x1F442 <= code && code <= 0x1F443 || // So   [2] EAR..NOSE
    0x1F446 <= code && code <= 0x1F450 || // So  [11] WHITE UP POINTING BACKHAND INDEX..OPEN HANDS SIGN
    0x1F46E == code || // So       POLICE OFFICER
    0x1F470 <= code && code <= 0x1F478 || // So   [9] BRIDE WITH VEIL..PRINCESS
    0x1F47C == code || // So       BABY ANGEL
    0x1F481 <= code && code <= 0x1F483 || // So   [3] INFORMATION DESK PERSON..DANCER
    0x1F485 <= code && code <= 0x1F487 || // So   [3] NAIL POLISH..HAIRCUT
    0x1F4AA == code || // So       FLEXED BICEPS
    0x1F574 <= code && code <= 0x1F575 || // So   [2] MAN IN BUSINESS SUIT LEVITATING..SLEUTH OR SPY
    0x1F57A == code || // So       MAN DANCING
    0x1F590 == code || // So       RAISED HAND WITH FINGERS SPLAYED
    0x1F595 <= code && code <= 0x1F596 || // So   [2] REVERSED HAND WITH MIDDLE FINGER EXTENDED..RAISED HAND WITH PART BETWEEN MIDDLE AND RING FINGERS
    0x1F645 <= code && code <= 0x1F647 || // So   [3] FACE WITH NO GOOD GESTURE..PERSON BOWING DEEPLY
    0x1F64B <= code && code <= 0x1F64F || // So   [5] HAPPY PERSON RAISING ONE HAND..PERSON WITH FOLDED HANDS
    0x1F6A3 == code || // So       ROWBOAT
    0x1F6B4 <= code && code <= 0x1F6B6 || // So   [3] BICYCLIST..PEDESTRIAN
    0x1F6C0 == code || // So       BATH
    0x1F6CC == code || // So       SLEEPING ACCOMMODATION
    0x1F918 <= code && code <= 0x1F91C || // So   [5] SIGN OF THE HORNS..RIGHT-FACING FIST
    0x1F91E <= code && code <= 0x1F91F || // So   [2] HAND WITH INDEX AND MIDDLE FINGERS CROSSED..I LOVE YOU HAND SIGN
    0x1F926 == code || // So       FACE PALM
    0x1F930 <= code && code <= 0x1F939 || // So  [10] PREGNANT WOMAN..JUGGLING
    0x1F93D <= code && code <= 0x1F93E || // So   [2] WATER POLO..HANDBALL
    0x1F9D1 <= code && code <= 0x1F9DD // So  [13] ADULT..ELF
    ) {
        return E_Base;
      }

    if (
    0x1F3FB <= code && code <= 0x1F3FF) // Sk   [5] EMOJI MODIFIER FITZPATRICK TYPE-1-2..EMOJI MODIFIER FITZPATRICK TYPE-6
      {
        return E_Modifier;
      }

    if (
    0x200D == code // Cf       ZERO WIDTH JOINER
    ) {
        return ZWJ;
      }

    if (
    0x2640 == code || // So       FEMALE SIGN
    0x2642 == code || // So       MALE SIGN
    0x2695 <= code && code <= 0x2696 || // So   [2] STAFF OF AESCULAPIUS..SCALES
    0x2708 == code || // So       AIRPLANE
    0x2764 == code || // So       HEAVY BLACK HEART
    0x1F308 == code || // So       RAINBOW
    0x1F33E == code || // So       EAR OF RICE
    0x1F373 == code || // So       COOKING
    0x1F393 == code || // So       GRADUATION CAP
    0x1F3A4 == code || // So       MICROPHONE
    0x1F3A8 == code || // So       ARTIST PALETTE
    0x1F3EB == code || // So       SCHOOL
    0x1F3ED == code || // So       FACTORY
    0x1F48B == code || // So       KISS MARK
    0x1F4BB <= code && code <= 0x1F4BC || // So   [2] PERSONAL COMPUTER..BRIEFCASE
    0x1F527 == code || // So       WRENCH
    0x1F52C == code || // So       MICROSCOPE
    0x1F5E8 == code || // So       LEFT SPEECH BUBBLE
    0x1F680 == code || // So       ROCKET
    0x1F692 == code // So       FIRE ENGINE
    ) {
        return Glue_After_Zwj;
      }

    if (
    0x1F466 <= code && code <= 0x1F469) // So   [4] BOY..WOMAN
      {
        return E_Base_GAZ;
      }


    //all unlisted characters have a grapheme break property of "Other"
    return Other;
  }
  return this;
}

if ( true && module.exports) {
  module.exports = GraphemeSplitter;
}

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"Xchat","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"Xchat","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"Xchat","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"Xchat","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/*!****************************************************!*\
  !*** C:/Users/86184/Desktop/毕业设计/Xchat/pages.json ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 44:
/*!*************************************************************!*\
  !*** C:/Users/86184/Desktop/毕业设计/Xchat/commons/js/datas.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  friends: function friends() {
    var friendList = [{
      id: 1,
      imgurl: '../../static/images/img/one.png',
      tip: 555,
      name: 'GEKYUME',
      time: new Date(),
      email: '934229118@qq.com',
      message: '我是XXX' },

    {
      id: 2,
      imgurl: '../../static/images/img/three.png',
      tip: 23,
      name: '薯条',
      time: new Date(),
      email: '934229118@qq.com',
      message: '我是XXX我是XXX我是XXX我是XXX我是XXX我是XXX' },

    {
      id: 3,
      imgurl: '../../static/images/img/one.png',
      tip: 9,
      name: '麦乐鸡',
      time: new Date(),
      email: '934229118@qq.com',
      message: '日前召开的中央经济工作会议提出，要巩固拓展脱贫攻坚成果，坚决防止发生规模性返贫现象。要做好同乡村振兴的有效衔接，帮扶政策保持总体稳定，分类调整优化，留足政策过渡期。' },

    {
      id: 4,
      imgurl: '../../static/images/img/two.png',
      tip: 0,
      name: '狮子',
      time: new Date(),
      email: '934229118@qq.com',
      message: '今年以来，在会议、国内考察等重要活动中，习近平总书记谈及乡村振兴，都会反复强调“有效衔接”这四个X' },

    {
      id: 5,
      imgurl: '../../static/images/img/three.png',
      tip: 1,
      name: '猪',
      time: new Date(),
      email: '934229118@qq.com',
      message: '我是XXX' },

    {
      id: 6,
      imgurl: '../../static/images/img/two.png',
      tip: 2,
      name: 'fiveaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      time: new Date(),
      email: '934229118@qq.com',
      message: '我是XXX' },

    {
      id: 7,
      imgurl: '../../static/images/img/three.png',
      tip: 2,
      name: 'six',
      time: new Date(),
      email: '934229118@qq.com',
      message: '我是XXX' },

    {
      id: 7,
      imgurl: '../../static/images/img/three.png',
      tip: 2,
      name: 'six',
      time: new Date(),
      email: '934229118@qq.com',
      message: '我是XXX' },

    {
      id: 7,
      imgurl: '../../static/images/img/three.png',
      tip: 2,
      name: 'six',
      time: new Date(),
      email: '934229118@qq.com',
      message: '我是XXX' },

    {
      id: 7,
      imgurl: '../../static/images/img/three.png',
      tip: 2,
      name: 'six',
      time: new Date(),
      email: '934229118@qq.com',
      message: '我是XXX' },

    {
      id: 7,
      imgurl: '../../static/images/img/three.png',
      tip: 2,
      name: 'six',
      time: new Date(),
      email: '934229118@qq.com',
      message: '我是XXX' },

    {
      id: 7,
      imgurl: '../../static/images/img/three.png',
      tip: 2,
      name: 'six',
      time: new Date(),
      email: '934229118@qq.com',
      message: '我是XXX' },

    {
      id: 7,
      imgurl: '../../static/images/img/three.png',
      tip: 2,
      name: 'six',
      time: new Date(),
      email: '934229118@qq.com',
      message: '我是XXX' },

    {
      id: 7,
      imgurl: '../../static/images/img/three.png',
      tip: 2,
      name: 'six',
      time: new Date(),
      email: '934229118@qq.com',
      message: '我是XXX' },

    {
      id: 7,
      imgurl: '../../static/images/img/three.png',
      tip: 2,
      name: 'six',
      time: new Date(),
      email: '934229118@qq.com',
      message: '我是XXX' },

    {
      id: 7,
      imgurl: '../../static/images/img/three.png',
      tip: 2,
      name: 'six',
      time: new Date(),
      email: '934229118@qq.com',
      message: '我是XXX' },

    {
      id: 7,
      imgurl: '../../static/images/img/three.png',
      tip: 2,
      name: 'six',
      time: new Date(),
      email: '934229118@qq.com',
      message: '我是XXX' }];


    return friendList;
  },
  //好友关系
  isFriend: function isFriend() {
    var isfriend = [{
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
    }];

    return isfriend;
  },
  //聊天
  message: function message() {
    var msgs = [
    {
      id: 'a',
      imgurl: 'three.png',
      message: '需注意在webview渲染的页面中，区域滚动的性能不及页面滚动。',
      types: 0,
      time: new Date() - 1000 * 60 * 30,
      tip: 0 },

    {
      id: 'a',
      imgurl: 'three.png',
      message: 'test.png',
      types: 1,
      time: new Date() - 1000 * 60 * 24,
      tip: 1 },

    {
      id: 'b',
      imgurl: 'two.png',
      message: '可滚动视图区域。用于区域滚动',
      types: 0,
      time: new Date() - 1000 * 60 * 12,
      tip: 2 },

    {
      id: 'b',
      imgurl: 'two.png',
      message: '在设置滚动条位置时使用动画过渡',
      types: 0,
      time: new Date() - 1000 * 60 * 11,
      tip: 3 },

    {
      id: 'a',
      imgurl: 'three.png',
      message: '值应为某子元素id（id不能以数字开头）。设置哪个方向可滚动，则在哪个方向滚动到该元素',
      types: 0,
      time: new Date() - 1000 * 60 * 10,
      tip: 4 },

    {
      id: 'b',
      imgurl: 'two.png',
      message: 'pig.png',
      types: 1,
      time: new Date() - 1000 * 60 * 4,
      tip: 5 },

    {
      id: 'b',
      imgurl: 'two.png',
      message: '设置自定义下拉刷新默认样式，支持设置 black,white,none,none 表示不使用默认样式',
      types: 0,
      time: new Date() - 1000 * 60 * 3,
      tip: 6 },

    {
      id: 'b',
      imgurl: 'two.png',
      message: 'one.png',
      types: 1,
      time: new Date() - 1000 * 60 * 2,
      tip: 7 },

    {
      id: 'a',
      imgurl: 'three.png',
      message: 'mine.png',
      types: 1,
      time: new Date() - 1000 * 60,
      tip: 8 },

    {
      id: 'a',
      imgurl: 'three.png',
      message: {
        record: '../../static/mp3.mp3',
        time: 60 },

      types: 2,
      time: new Date() - 1000 * 30,
      tip: 9 },

    {
      id: 'b',
      imgurl: 'two.png',
      message: {
        record: '../../static/mp3.mp3',
        time: 10 },

      types: 2,
      time: new Date(),
      tip: 10 },

    {
      id: 'b',
      imgurl: 'two.png',
      message: {
        name: '翔顺花园三区(东门)',
        address: '东堤南路',
        latitude: 22.678714,
        longitude: 112.232027 },

      types: 3,
      time: new Date(),
      tip: 11 },

    {
      id: 'a',
      imgurl: 'three.png',
      message: {
        name: '翔顺花园三区(东门)翔顺花园三区(东门)翔顺花园三区(东门)',
        address: '东堤南路东堤南路东堤南路东堤南路东堤南路',
        latitude: 22.678714,
        longitude: 112.232027 },

      types: 3,
      time: new Date(),
      tip: 12 }];


    return msgs;
  } };exports.default = _default;

/***/ }),

/***/ 45:
/*!****************************************************************!*\
  !*** C:/Users/86184/Desktop/毕业设计/Xchat/commons/js/debounce.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.debounce = debounce; //防抖
function debounce(fn, t) {
  var delay = t || 500;
  var timer;
  return function () {var _this = this;
    var args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      timer = null;
      fn.apply(_this, args);
    }, delay);
  };
}

/***/ }),

/***/ 78:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 79);

/***/ }),

/***/ 79:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 80);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 80:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map