/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;!function(){function n(n,t){for(property in t)t.hasOwnProperty(property)&&(n[property]=t[property]);return n}function t(n,t){var e=document.createElement("div");e.className="notyf__toast";var o=document.createElement("div");o.className="notyf__wrapper";var i=document.createElement("div");i.className="notyf__icon";var a=document.createElement("i");a.className=t;var r=document.createElement("div");r.className="notyf__message",r.innerHTML=n,i.appendChild(a),o.appendChild(i),o.appendChild(r),e.appendChild(o);var c=this;return setTimeout(function(){e.className+=" notyf--disappear",e.addEventListener(c.animationEnd,function(n){n.target==e&&c.container.removeChild(e)});var n=c.notifications.indexOf(e);c.notifications.splice(n,1)},c.options.delay),e}function e(){var n,t=document.createElement("fake"),e={transition:"animationend",OTransition:"oAnimationEnd",MozTransition:"animationend",WebkitTransition:"webkitAnimationEnd"};for(n in e)if(void 0!==t.style[n])return e[n]}this.Notyf=function(){this.notifications=[];var t={delay:2e3,alertIcon:"notyf__icon--alert",confirmIcon:"notyf__icon--confirm"};arguments[0]&&"object"==typeof arguments[0]?this.options=n(t,arguments[0]):this.options=t;var o=document.createDocumentFragment(),i=document.createElement("div");i.className="notyf",o.appendChild(i),document.body.appendChild(o),this.container=i,this.animationEnd=e()},this.Notyf.prototype.alert=function(n){var e=t.call(this,n,this.options.alertIcon);e.className+=" notyf--alert",this.container.appendChild(e),this.notifications.push(e)},this.Notyf.prototype.confirm=function(n){var e=t.call(this,n,this.options.confirmIcon);e.className+=" notyf--confirm",this.container.appendChild(e),this.notifications.push(e)}}(),function(){ true?!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return Notyf}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"undefined"!=typeof module&&module.exports?module.exports=Notyf:window.Notyf=Notyf}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var Notyf = __webpack_require__(0);


var notyf = new Notyf();

document.getElementById('confirm-btn')
        .addEventListener('click', function(){
            notyf.confirm('confirming');
        });

document.getElementById('alert-btn')
        .addEventListener('click', function(){
            notyf.alert('confirming');
        });

/***/ })
/******/ ]);