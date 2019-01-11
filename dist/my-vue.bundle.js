/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _myVue = _interopRequireDefault(__webpack_require__(/*! ./js/myVue */ \"./src/js/myVue.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/js/myVue.js":
/*!*************************!*\
  !*** ./src/js/myVue.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nvar myVue = function myVue(options) {\n  this.$el = document.querySelector(options.el);\n  this.$data = options.data;\n  this.$methods = options.methods; //通过binding建立属性与指令的联系\n\n  this._binding = [];\n\n  this._observer(this.$data);\n\n  this._compile(this.$el);\n}; //遍历所有属性 监听劫持数据变化\n\n\nmyVue.prototype._observer = function (obj) {\n  var _this2 = this;\n\n  var _loop = function _loop(key) {\n    var value = obj[key]; //遍历所有属性\n\n    if (value && _typeof(value) === 'object') _this2._observer(value); //给指令订阅数据变化\n\n    _this2._binding[key] = {\n      directives: []\n    };\n    var directives = _this2._binding[key].directives; //监听劫持属性\n\n    Object.defineProperty(_this2.$data, key, {\n      get: function get() {\n        return value;\n      },\n      set: function set(newValue) {\n        if (newValue != value) {\n          value = newValue;\n          console.log(\"\\u76D1\\u542C\\u5230\\u6570\\u636E\\u53D8\\u5316\".concat(newValue));\n          directives.forEach(function (item) {\n            item.update();\n          });\n        }\n      }\n    });\n  };\n\n  for (var key in obj) {\n    _loop(key);\n  }\n}; //解析指令\n\n\nmyVue.prototype._compile = function (root) {\n  var nodes = root.children;\n\n  var _this = this;\n\n  var _loop2 = function _loop2(i) {\n    var node = nodes[i]; //遍历所有的控件\n\n    if (node.children.length > 0) _this._compile(node); //v-click指令\n\n    if (node.hasAttribute('v-click')) {\n      node.onclick = function () {\n        var attrVal = node.getAttribute('v-click');\n        return _this.$methods[attrVal].bind(_this.$data);\n      }();\n    } //v-model指令\n\n\n    if (node.hasAttribute('v-model') && (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA')) {\n      node.addEventListener('input', function () {\n        var attrVal = node.getAttribute('v-model');\n\n        _this._binding[attrVal].directives.push(new Watcher(node, _this, 'value', attrVal));\n\n        return function () {\n          _this.$data[attrVal] = node.value;\n        };\n      }());\n    } //v-bind\n\n\n    if (node.hasAttribute(\"v-bind\")) {\n      var attrVal = node.getAttribute('v-bind');\n\n      _this._binding[attrVal].directives.push(new Watcher(node, _this, 'innerText', attrVal));\n    }\n  };\n\n  for (var i = 0; i < nodes.length; i++) {\n    _loop2(i);\n  }\n}; //建立Watcher\n\n\nfunction Watcher(el, vm, attr, exp) {\n  this.el = el;\n  this.vm = vm;\n  this.attr = attr;\n  this.exp = exp; //初始化数据\n\n  this.update();\n} //建立Update\n\n\nWatcher.prototype.update = function () {\n  this.el[this.attr] = this.vm.$data[this.exp];\n};\n\nvar _default = myVue;\nexports.default = _default;\n\n//# sourceURL=webpack:///./src/js/myVue.js?");

/***/ })

/******/ });