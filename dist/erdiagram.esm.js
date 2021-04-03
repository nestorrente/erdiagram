/*!
 * Entity-Relationship Diagram Code Generator v0.1.0-alpha.3
 * https://github.com/nestorrente/erdiagram
 * 
 * Released under the MIT License.
 * 
 * Build date: 2021-04-03T09:08:20.033Z
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main/module-entry.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/graphre/dist/graphre.js":
/*!**********************************************!*\
  !*** ./node_modules/graphre/dist/graphre.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(e,r){ true?r(exports):undefined}(this,(function(e){"use strict";class r{constructor(){var e={};e._next=e._prev=e,this._sentinel=e}dequeue(){var e=this._sentinel,r=e._prev;if(r!==e)return n(r),r}enqueue(e){var r=this._sentinel,t=e;t._prev&&t._next&&n(t),t._next=r._next,r._next._prev=t,r._next=t,t._prev=r}toString(){for(var e=[],r=this._sentinel,n=r._prev;n!==r;)e.push(JSON.stringify(n,t)),n=n._prev;return"["+e.join(", ")+"]"}}function n(e){e._prev._next=e._next,e._next._prev=e._prev,delete e._next,delete e._prev}function t(e,r){if("_next"!==e&&"_prev"!==e)return r}var o=Object.freeze({__proto__:null,List:r});const i={};function a(e){var r=[];for(var n of e)r.push(...n);return r}function s(e,r){return null!=e&&e.hasOwnProperty(r)}function d(e){const r=null==e?0:e.length;return r?e[r-1]:void 0}function u(e,r){e=Object(e);const n={};return Object.keys(e).forEach((t=>{n[t]=r(e[t],t)})),n}function f(e,r){var n=Number.POSITIVE_INFINITY,t=void 0;for(var o of e){var i=r(o);i<n&&(n=i,t=o)}return t}function h(e,r){var n=e<r?1:-1;let t=-1,o=Math.max(Math.ceil((r-e)/(n||1)),0);const i=new Array(o);for(;o--;)i[++t]=e,e+=n;return i}function c(e,r){return e.slice().sort(((e,n)=>r(e)-r(n)))}function v(e){i[e]||(i[e]=0);return`${e}${++i[e]}`}function l(e){return e?Object.keys(e).map((r=>e[r])):[]}function g(e,r){for(var n=[],t=0;t<e;t++)n.push(r());return n}function p(e){return void 0===e}function m(e,r){for(var n of Object.keys(e))r(e[n],n)}function w(e){return 0===Object.keys(e).length}function _(e){var r={},n=e.nodes().filter((r=>!e.children(r).length)),t=g(Math.max(...n.map((r=>e.node(r).rank)))+1,(()=>[]));return c(n,(r=>e.node(r).rank)).forEach((function n(o){if(!s(r,o)){r[o]=!0;var i=e.node(o);t[i.rank].push(o),e.successors(o).forEach(n)}})),t}function b(e,r){for(var n=0,t=1;t<r.length;++t)n+=y(e,r[t-1],r[t]);return n}function y(e,r,n){for(var t={},o=0;o<n.length;o++)t[n[o]]=o;for(var i=a(r.map((function(r){return c(e.outEdges(r).map((function(r){return{pos:t[r.w],weight:e.edge(r).weight}})),(e=>e.pos))}))),s=1;s<n.length;)s<<=1;var d=2*s-1;s-=1;var u=g(d,(()=>0)),f=0;return i.forEach((function(e){var r=e.pos+s;u[r]+=e.weight;for(var n=0;r>0;)r%2&&(n+=u[r+1]),u[r=r-1>>1]+=e.weight;f+=e.weight*n})),f}function k(e,r){return r?r.map((function(r){var n=e.inEdges(r);if(n.length){var t=n.reduce((function(r,n){var t=e.edge(n),o=e.node(n.v);return{sum:r.sum+t.weight*o.order,weight:r.weight+t.weight}}),{sum:0,weight:0});return{v:r,barycenter:t.sum/t.weight,weight:t.weight}}return{v:r}})):[]}function E(e,r){for(var n={},t=0;t<e.length;t++){var o=e[t],i=n[o.v]={indegree:0,in:[],out:[],vs:[o.v],i:t};void 0!==o.barycenter&&(i.barycenter=o.barycenter,i.weight=o.weight)}for(var a of r.edges()){var s=n[a.v],d=n[a.w];void 0!==s&&void 0!==d&&(d.indegree++,s.out.push(n[a.w]))}return function(e){var r=[];function n(e){return function(r){r.merged||(void 0===r.barycenter||void 0===e.barycenter||r.barycenter>=e.barycenter)&&function(e,r){var n=0,t=0;e.weight&&(n+=e.barycenter*e.weight,t+=e.weight);r.weight&&(n+=r.barycenter*r.weight,t+=r.weight);e.vs=r.vs.concat(e.vs),e.barycenter=n/t,e.weight=t,e.i=Math.min(r.i,e.i),r.merged=!0}(e,r)}}function t(r){return function(n){n.in.push(r),0==--n.indegree&&e.push(n)}}for(;e.length;){var o=e.pop();r.push(o),o.in.reverse().forEach(n(o)),o.out.forEach(t(o))}return r.filter((e=>!e.merged)).map((function(e){var r={vs:e.vs,i:e.i};return"barycenter"in e&&(r.barycenter=e.barycenter),"weight"in e&&(r.weight=e.weight),r}))}(l(n).filter((e=>!e.indegree)))}var N="\0";class x{constructor(e={}){this._label=void 0,this._nodeCount=0,this._edgeCount=0,this._isDirected=!s(e,"directed")||e.directed,this._isMultigraph=!!s(e,"multigraph")&&e.multigraph,this._isCompound=!!s(e,"compound")&&e.compound,this._defaultNodeLabelFn=()=>{},this._defaultEdgeLabelFn=()=>{},this._nodes={},this._isCompound&&(this._parent={},this._children={},this._children["\0"]={}),this._in={},this._preds={},this._out={},this._sucs={},this._edgeObjs={},this._edgeLabels={}}isDirected(){return this._isDirected}isMultigraph(){return this._isMultigraph}isCompound(){return this._isCompound}setGraph(e){return this._label=e,this}graph(){return this._label}setDefaultNodeLabel(e){var r;return r=e,this._defaultNodeLabelFn="function"!=typeof r?()=>e:e,this}nodeCount(){return this._nodeCount}nodes(){return Object.keys(this._nodes)}sources(){var e=this;return this.nodes().filter((function(r){return w(e._in[r])}))}sinks(){var e=this;return this.nodes().filter((r=>w(e._out[r])))}setNodes(e,r){for(var n of e)void 0!==r?this.setNode(n,r):this.setNode(n);return this}setNode(e,r){return s(this._nodes,e)?(arguments.length>1&&(this._nodes[e]=r),this):(this._nodes[e]=arguments.length>1?r:this._defaultNodeLabelFn(e),this._isCompound&&(this._parent[e]=N,this._children[e]={},this._children["\0"][e]=!0),this._in[e]={},this._preds[e]={},this._out[e]={},this._sucs[e]={},++this._nodeCount,this)}node(e){return this._nodes[e]}hasNode(e){return s(this._nodes,e)}removeNode(e){var r=this;if(s(this._nodes,e)){var n=e=>{r.removeEdge(this._edgeObjs[e])};if(delete this._nodes[e],this._isCompound){for(var t of(this._removeFromParentsChildList(e),delete this._parent[e],this.children(e)))r.setParent(t);delete this._children[e]}for(var o of Object.keys(this._in[e]))n(o);for(var o of(delete this._in[e],delete this._preds[e],Object.keys(this._out[e])))n(o);delete this._out[e],delete this._sucs[e],--this._nodeCount}return this}setParent(e,r){if(!this._isCompound)throw new Error("Cannot set parent in a non-compound graph");if(void 0===r)r=N;else{for(var n=r+="";!p(n);n=this.parent(n))if(n===e)throw new Error(`Setting ${r} as parent of ${e} would create a cycle`);this.setNode(r)}return this.setNode(e),this._removeFromParentsChildList(e),this._parent[e]=r,this._children[r][e]=!0,this}_removeFromParentsChildList(e){delete this._children[this._parent[e]][e]}parent(e){if(this._isCompound){var r=this._parent[e];if(r!==N)return r}}children(e){if(p(e)&&(e=N),this._isCompound){var r=this._children[e];return r?Object.keys(r):void 0}return e===N?this.nodes():this.hasNode(e)?[]:void 0}predecessors(e){var r=this._preds[e];if(r)return Object.keys(r)}successors(e){var r=this._sucs[e];if(r)return Object.keys(r)}neighbors(e){var r=this.predecessors(e);if(r)return function(e,r){var n=[...e];for(var t of r)-1===n.indexOf(t)&&n.push(t);return n}(r,this.successors(e))}isLeaf(e){return 0===(this.isDirected()?this.successors(e):this.neighbors(e)).length}filterNodes(e){var r=new x({directed:this._isDirected,multigraph:this._isMultigraph,compound:this._isCompound});r.setGraph(this.graph());var n=this;m(this._nodes,(function(n,t){e(t)&&r.setNode(t,n)})),m(this._edgeObjs,(function(e){r.hasNode(e.v)&&r.hasNode(e.w)&&r.setEdge(e,n.edge(e))}));var t={};function o(e){var i=n.parent(e);return void 0===i||r.hasNode(i)?(t[e]=i,i):i in t?t[i]:o(i)}if(this._isCompound)for(var i of r.nodes())r.setParent(i,o(i));return r}setDefaultEdgeLabel(e){var r;return r=e,this._defaultEdgeLabelFn="function"!=typeof r?()=>e:e,this}edgeCount(){return this._edgeCount}edges(){return Object.values(this._edgeObjs)}setPath(e,r){var n=this,t=arguments;return e.reduce((function(e,o){return t.length>1?n.setEdge(e,o,r):n.setEdge(e,o),o})),this}setEdge(e,r,n,t){var o=!1,i=e;"object"==typeof i&&null!==i&&"v"in i?(e=i.v,r=i.w,t=i.name,2===arguments.length&&(n=arguments[1],o=!0)):(e=i,r=arguments[1],t=arguments[3],arguments.length>2&&(n=arguments[2],o=!0)),e=""+e,r=""+r,p(t)||(t=""+t);var a=j(this._isDirected,e,r,t);if(s(this._edgeLabels,a))return o&&(this._edgeLabels[a]=n),this;if(!p(t)&&!this._isMultigraph)throw new Error("Cannot set a named edge when isMultigraph = false");this.setNode(e),this.setNode(r),this._edgeLabels[a]=o?n:this._defaultEdgeLabelFn(e,r,t);var d=function(e,r,n,t){var o=""+r,i=""+n;if(!e&&o>i){var a=o;o=i,i=a}var s={v:o,w:i};t&&(s.name=t);return s}(this._isDirected,e,r,t);return e=d.v,r=d.w,Object.freeze(d),this._edgeObjs[a]=d,C(this._preds[r],e),C(this._sucs[e],r),this._in[r][a]=d,this._out[e][a]=d,this._edgeCount++,this}edge(e,r,n){var t="object"==typeof e?M(this._isDirected,e):j(this._isDirected,e,r,n);return this._edgeLabels[t]}hasEdge(e,r,n){var t=1===arguments.length?M(this._isDirected,arguments[0]):j(this._isDirected,e,r,n);return s(this._edgeLabels,t)}removeEdge(e,r,n){var t="object"==typeof e?M(this._isDirected,e):j(this._isDirected,e,r,n),o=this._edgeObjs[t];return o&&(e=o.v,r=o.w,delete this._edgeLabels[t],delete this._edgeObjs[t],O(this._preds[r],e),O(this._sucs[e],r),delete this._in[r][t],delete this._out[e][t],this._edgeCount--),this}inEdges(e,r){var n=this._in[e];if(n){var t=Object.values(n);return r?t.filter((function(e){return e.v===r})):t}}outEdges(e,r){var n=this._out[e];if(n){var t=Object.values(n);return r?t.filter((function(e){return e.w===r})):t}}nodeEdges(e,r){var n=this.inEdges(e,r);if(n)return n.concat(this.outEdges(e,r))}}class I extends x{}function C(e,r){e[r]?e[r]++:e[r]=1}function O(e,r){--e[r]||delete e[r]}function j(e,r,n,t){var o=""+r,i=""+n;if(!e&&o>i){var a=o;o=i,i=a}return o+""+i+""+(p(t)?"\0":t)}function M(e,r){return j(e,r.v,r.w,r.name)}function L(e,r,n,t){var o;do{o=v(t)}while(e.hasNode(o));return n.dummy=r,e.setNode(o,n),o}function T(e){var r=(new x).setGraph(e.graph());for(var n of e.nodes())r.setNode(n,e.node(n));for(var t of e.edges()){var o=r.edge(t.v,t.w)||{weight:0,minlen:1},i=e.edge(t);r.setEdge(t.v,t.w,{weight:o.weight+i.weight,minlen:Math.max(o.minlen,i.minlen)})}return r}function S(e){var r=new x({multigraph:e.isMultigraph()}).setGraph(e.graph());for(var n of e.nodes())e.children(n).length||r.setNode(n,e.node(n));for(var t of e.edges())r.setEdge(t,e.edge(t));return r}function P(e,r){var n,t,o=e.x,i=e.y,a=r.x-o,s=r.y-i,d=e.width/2,u=e.height/2;if(!a&&!s)throw new Error("Not possible to find intersection inside of the rectangle");return Math.abs(s)*d>Math.abs(a)*u?(s<0&&(u=-u),n=u*a/s,t=u):(a<0&&(d=-d),n=d,t=d*s/a),{x:o+n,y:i+t}}function R(e){var r=g(G(e)+1,(()=>[]));for(var n of e.nodes()){var t=e.node(n),o=t.rank;void 0!==o&&(r[o][t.order]=n)}return r}function F(e){var r=Math.min(...e.nodes().map((r=>e.node(r).rank)).filter((e=>void 0!==e)));for(var n of e.nodes()){var t=e.node(n);s(t,"rank")&&(t.rank-=r)}}function D(e){var r=Math.min(...e.nodes().map((r=>e.node(r).rank)).filter((e=>void 0!==e))),n=[];for(var t of e.nodes()){var o=e.node(t).rank-r;n[o]||(n[o]=[]),n[o].push(t)}for(var i=0,a=e.graph().nodeRankFactor,s=0;s<n.length;s++){var d=n[s];if(void 0===d&&s%a!=0)--i;else if(i&&null!=d)for(var t of d)e.node(t).rank+=i}}function z(e,r,n,t){var o={width:0,height:0};return arguments.length>=4&&(o.rank=n,o.order=t),L(e,"border",o,r)}function G(e){var r=e.nodes().map((r=>e.node(r).rank)).filter((e=>void 0!==e));return Math.max(...r)}function V(e,r){var n=[],t=[];for(var o of e)r(o)?n.push(o):t.push(o);return{lhs:n,rhs:t}}function Y(e,r){var n=Date.now();try{return r()}finally{console.log(e+" time: "+(Date.now()-n)+"ms")}}function B(e,r){return r()}var A=Object.freeze({__proto__:null,addDummyNode:L,simplify:T,asNonCompoundGraph:S,successorWeights:function(e){var r={};for(var n of e.nodes()){var t={};for(var o of e.outEdges(n))t[o.w]=(t[o.w]||0)+e.edge(o).weight;r[n]=t}return r},predecessorWeights:function(e){var r={};for(var n of e.nodes()){var t={};for(var o of e.inEdges(n))t[o.v]=(t[o.v]||0)+e.edge(o).weight;r[n]=t}return r},intersectRect:P,buildLayerMatrix:R,normalizeRanks:F,removeEmptyRanks:D,addBorderNode:z,maxRank:G,partition:V,time:Y,notime:B});function q(e,r){var n,t=V(e,(function(e){return s(e,"barycenter")})),o=t.lhs,i=c(t.rhs,(e=>-e.i)),d=[],u=0,f=0,h=0;for(var v of(o.sort((n=!!r,function(e,r){return e.barycenter<r.barycenter?-1:e.barycenter>r.barycenter?1:n?r.i-e.i:e.i-r.i})),h=W(d,i,h),o))h+=v.vs.length,d.push(v.vs),u+=v.barycenter*v.weight,f+=v.weight,h=W(d,i,h);var l={vs:a(d)};return f&&(l.barycenter=u/f,l.weight=f),l}function W(e,r,n){for(var t;r.length&&(t=d(r)).i<=n;)r.pop(),e.push(t.vs),n++;return n}function $(e,r,n,t){var o=e.children(r),i=e.node(r),d=i?i.borderLeft:void 0,u=i?i.borderRight:void 0,f={};d&&(o=o.filter((e=>e!==d&&e!==u)));var h=k(e,o);for(var c of h)if(e.children(c.v).length){var v=$(e,c.v,n,t);f[c.v]=v,s(v,"barycenter")&&J(c,v)}var l=E(h,n);!function(e,r){for(var n of e)n.vs=a(n.vs.map((function(e){return r[e]?r[e].vs:[e]})))}(l,f);var g=q(l,t);if(d&&(g.vs=[d,...g.vs,u],e.predecessors(d).length)){var p=e.node(e.predecessors(d)[0]),m=e.node(e.predecessors(u)[0]);s(g,"barycenter")||(g.barycenter=0,g.weight=0),g.barycenter=(g.barycenter*g.weight+p.order+m.order)/(g.weight+2),g.weight+=2}return g}function J(e,r){void 0!==e.barycenter?(e.barycenter=(e.barycenter*e.weight+r.barycenter*r.weight)/(e.weight+r.weight),e.weight+=r.weight):(e.barycenter=r.barycenter,e.weight=r.weight)}function Q(e,r,n){var t=function(e){var r;for(;e.hasNode(r=v("_root")););return r}(e),o=new x({compound:!0}).setGraph({root:t}).setDefaultNodeLabel((r=>e.node(r)));for(var i of e.nodes()){var a=e.node(i),d=e.parent(i);if(a.rank===r||a.minRank<=r&&r<=a.maxRank){for(var u of(o.setNode(i),o.setParent(i,d||t),e[n](i))){var f=u.v===i?u.w:u.v,h=o.edge(f,i),c=void 0!==h?h.weight:0;o.setEdge(f,i,{weight:e.edge(u).weight+c})}s(a,"minRank")&&o.setNode(i,{borderLeft:a.borderLeft[r],borderRight:a.borderRight[r]})}}return o}function K(e,r,n){var t,o={};for(var i of n)!function(){for(var n,a=e.parent(i);a;){var s=e.parent(a);if(s?(n=o[s],o[s]=a):(n=t,t=a),n&&n!==a)return void r.setEdge(n,a);a=s}}()}function X(e){var r=G(e),n=H(e,h(1,r+1),"inEdges"),t=H(e,h(r-1,-1),"outEdges"),o=_(e);Z(e,o);for(var i,a=Number.POSITIVE_INFINITY,s=0,d=0;d<4;++s,++d){U(s%2?n:t,s%4>=2);var u=b(e,o=R(e));u<a&&(d=0,i=o.map((e=>e.slice(0))),a=u)}Z(e,i)}function H(e,r,n){return r.map((r=>Q(e,r,n)))}function U(e,r){var n=new x;for(var t of e){var o=t.graph().root,i=$(t,o,n,r);i.vs.map((function(e,r){t.node(e).order=r})),K(t,n,i.vs)}}function Z(e,r){for(var n of r)n.map((function(r,n){e.node(r).order=n}))}var ee=Object.freeze({__proto__:null,order:X,addSubgraphConstraints:K,barycenter:k,buildLayerGraph:Q,crossCount:b,initOrder:_,resolveConflicts:E,sortSubgraph:$,sort:q});function re(e,r){var n={};return r.reduce((function(r,t){for(var o=0,i=0,a=r.length,s=d(t),u=0;u<t.length;u++){var f=t[u],h=te(e,f),c=h?e.node(h).order:a;if(h||f===s){for(var v of t.slice(i,u+1))for(var l of e.predecessors(v)){var g=e.node(l),p=g.order;!(p<o||c<p)||g.dummy&&e.node(v).dummy||oe(n,l,v)}i=u+1,o=c}}return t})),n}function ne(e,r){var n={};function t(r,t,o,i,a){var s;for(var d of h(t,o))if(s=r[d],e.node(s).dummy)for(var u of e.predecessors(s)){var f=e.node(u);f.dummy&&(f.order<i||f.order>a)&&oe(n,u,s)}}return r.reduce((function(r,n){for(var o,i=-1,a=0,s=0;s<n.length;s++){var d=s,u=n[s];if(void 0!==u){if("border"===e.node(u).dummy){var f=e.predecessors(u);f.length&&(t(n,a,d,i,o=e.node(f[0]).order),a=d,i=o)}t(n,a,n.length,o,r.length)}}return n})),n}function te(e,r){if(e.node(r).dummy)for(var n of e.predecessors(r))if(e.node(n).dummy)return n}function oe(e,r,n){if(r>n){var t=r;r=n,n=t}var o=e[r];o||(e[r]=o={}),o[n]=!0}function ie(e,r,n){if(r>n){var t=r;r=n,n=t}return s(e[r],n)}function ae(e,r,n,t){var o={},i={},a={};for(var s of r)for(var d=0;d<s.length;d++){o[f=s[d]]=f,i[f]=f,a[f]=d}for(var s of r){var u=-1;for(var f of s){var h=t(f);if(h.length)for(var v=((h=c(h,(e=>a[e]))).length-1)/2,l=Math.floor(v),g=Math.ceil(v);l<=g;++l){var p=h[l];i[f]===f&&u<a[p]&&!ie(n,f,p)&&(i[p]=f,i[f]=o[f]=o[p],u=a[p])}}}return{root:o,align:i}}function se(e,r,n,t,o){var i={},a=function(e,r,n,t){var o=new x,i=e.graph(),a=ce(i.nodesep,i.edgesep,t);for(var s of r){var d=null;for(var u of s){var f=n[u];if(o.setNode(f),d){var h=n[d],c=o.edge(h,f);o.setEdge(h,f,Math.max(a(e,u,d),c||0))}d=u}}return o}(e,r,n,o),s=o?"borderLeft":"borderRight";function d(e,r){for(var n=a.nodes(),t=n.pop(),o={};t;)o[t]?e(t):(o[t]=!0,n.push(t),n=n.concat(r(t))),t=n.pop()}for(var u of(d((function(e){i[e]=a.inEdges(e).reduce((function(e,r){return Math.max(e,i[r.v]+a.edge(r))}),0)}),(e=>a.predecessors(e))),d((function(r){var n=a.outEdges(r).reduce((function(e,r){return Math.min(e,i[r.w]-a.edge(r))}),Number.POSITIVE_INFINITY),t=e.node(r);n!==Number.POSITIVE_INFINITY&&t.borderType!==s&&(i[r]=Math.max(i[r],n))}),(e=>a.successors(e))),Object.keys(t))){var f=t[u];i[f]=i[n[f]]}return i}function de(e,r){return f(l(r),(function(r){var n=Number.NEGATIVE_INFINITY,t=Number.POSITIVE_INFINITY;for(var o in r){var i=r[o],a=ve(e,o)/2;n=Math.max(i+a,n),t=Math.min(i-a,t)}return n-t}))}function ue(e,r){var n=l(r),t=Math.min(...n),o=Math.max(...n);for(var i of["ul","ur","dl","dr"]){var a=i[1],s=e[i];if(s!==r){var d=l(s),f="l"===a?t-Math.min(...d):o-Math.max(...d);f&&(e[i]=u(s,(e=>e+f)))}}}function fe(e,r){return u(e.ul,(function(n,t){if(r)return e[r.toLowerCase()][t];var o=c([e.ul[t],e.ur[t],e.dl[t],e.dr[t]],(e=>e));return(o[1]+o[2])/2}))}function he(e){var r,n=R(e),t=Object.assign(Object.assign({},re(e,n)),ne(e,n)),o={ul:{},ur:{},dl:{},dr:{}};for(var i of["u","d"])for(var a of(r="u"===i?n:n.map((e=>e)).reverse(),["l","r"])){"r"===a&&(r=r.map((e=>e.map((e=>e)).reverse())));var s=ae(0,r,t,("u"===i?e.predecessors:e.successors).bind(e)),d=se(e,r,s.root,s.align,"r"===a);"r"===a&&(d=u(d,(e=>-e))),o[i+a]=d}return ue(o,de(e,o)),fe(o,e.graph().align)}function ce(e,r,n){return function(t,o,i){var a,d=t.node(o),u=t.node(i),f=0;if(f+=d.width/2,s(d,"labelpos"))switch(d.labelpos.toLowerCase()){case"l":a=-d.width/2;break;case"r":a=d.width/2}if(a&&(f+=n?a:-a),a=0,f+=(d.dummy?r:e)/2,f+=(u.dummy?r:e)/2,f+=u.width/2,s(u,"labelpos"))switch(u.labelpos.toLowerCase()){case"l":a=u.width/2;break;case"r":a=-u.width/2}return a&&(f+=n?a:-a),a=0,f}}function ve(e,r){return e.node(r).width}var le=Object.freeze({__proto__:null,findType1Conflicts:re,findType2Conflicts:ne,findOtherInnerSegmentNode:te,addConflict:oe,hasConflict:ie,verticalAlignment:ae,horizontalCompaction:se,findSmallestWidthAlignment:de,alignCoordinates:ue,balance:fe,positionX:he,sep:ce,width:ve});function ge(e){!function(e){var r=R(e),n=e.graph().ranksep,t=0;for(var o of r){var i=Math.max(...o.map((r=>e.node(r).height)));for(var a of o)e.node(a).y=t+i/2;t+=i+n}}(e=S(e));var r=he(e);for(var n in r)e.node(n).x=r[n]}var pe=Object.freeze({__proto__:null,bk:le,position:ge});function me(e){var r={};e.sources().forEach((function n(t){var o=e.node(t);if(s(r,t))return o.rank;r[t]=!0;var i=Math.min(...e.outEdges(t).map((r=>n(r.w)-e.edge(r).minlen)));return i!==Number.POSITIVE_INFINITY&&null!=i||(i=0),o.rank=i}))}function we(e,r){return e.node(r.w).rank-e.node(r.v).rank-e.edge(r).minlen}function _e(e){var r,n=new x({directed:!1}),t=e.nodes()[0],o=e.nodeCount();for(n.setNode(t,{});i(e)<o;)r=a(e),s(e,n.hasNode(r.v)?we(e,r):-we(e,r));return n;function i(e){return n.nodes().forEach((function r(t){for(var o of e.nodeEdges(t)){var i=o.v,a=t===i?o.w:i;n.hasNode(a)||we(e,o)||(n.setNode(a,{}),n.setEdge(t,a,{}),r(a))}})),n.nodeCount()}function a(e){return f(e.edges(),(function(r){if(n.hasNode(r.v)!==n.hasNode(r.w))return we(e,r)}))}function s(e,r){for(var t of n.nodes())e.node(t).rank+=r}}class be{constructor(){this._arr=[],this._keyIndices={}}size(){return this._arr.length}keys(){return this._arr.map((function(e){return e.key}))}has(e){return e in this._keyIndices}priority(e){var r=this._keyIndices[e];if(void 0!==r)return this._arr[r].priority}min(){if(0===this.size())throw new Error("Queue underflow");return this._arr[0].key}add(e,r){var n=this._keyIndices;if(!((e=String(e))in n)){var t=this._arr,o=t.length;return n[e]=o,t.push({key:e,priority:r}),this._decrease(o),!0}return!1}removeMin(){this._swap(0,this._arr.length-1);var e=this._arr.pop();return delete this._keyIndices[e.key],this._heapify(0),e.key}decrease(e,r){var n=this._keyIndices[e];if(r>this._arr[n].priority)throw new Error("New priority is greater than current priority. Key: "+e+" Old: "+this._arr[n].priority+" New: "+r);this._arr[n].priority=r,this._decrease(n)}_heapify(e){var r=this._arr,n=2*e,t=n+1,o=e;n<r.length&&(o=r[n].priority<r[o].priority?n:o,t<r.length&&(o=r[t].priority<r[o].priority?t:o),o!==e&&(this._swap(e,o),this._heapify(o)))}_decrease(e){for(var r,n=this._arr,t=n[e].priority;0!==e&&!(n[r=e>>1].priority<t);)this._swap(e,r),e=r}_swap(e,r){var n=this._arr,t=this._keyIndices,o=n[e],i=n[r];n[e]=i,n[r]=o,t[i.key]=e,t[o.key]=r}}var ye=()=>1;function ke(e,r,n,t){return function(e,r,n,t){var o,i,a={},s=new be,d=function(e){var r=e.v!==o?e.v:e.w,t=a[r],d=n(e),u=i.distance+d;if(d<0)throw new Error("dijkstra does not allow negative edge weights. Bad edge: "+e+" Weight: "+d);u<t.distance&&(t.distance=u,t.predecessor=o,s.decrease(r,u))};e.nodes().forEach((function(e){var n=e===r?0:Number.POSITIVE_INFINITY;a[e]={distance:n},s.add(e,n)}));for(;s.size()>0&&(o=s.removeMin(),(i=a[o]).distance!==Number.POSITIVE_INFINITY);)t(o).forEach(d);return a}(e,String(r),n||ye,t||function(r){return e.outEdges(r)})}function Ee(e){var r=0,n=[],t={},o=[];function i(a){var s=t[a]={onStack:!0,lowlink:r,index:r++};if(n.push(a),e.successors(a).forEach((function(e){e in t?t[e].onStack&&(s.lowlink=Math.min(s.lowlink,t[e].index)):(i(e),s.lowlink=Math.min(s.lowlink,t[e].lowlink))})),s.lowlink===s.index){var d,u=[];do{d=n.pop(),t[d].onStack=!1,u.push(d)}while(a!==d);o.push(u)}}return e.nodes().forEach((function(e){e in t||i(e)})),o}var Ne=()=>1;class xe extends Error{}function Ie(e){var r={},n={},t=[];function o(i){if(i in n)throw new xe;if(!(i in r)){for(var a of(n[i]=!0,r[i]=!0,e.predecessors(i)))o(a);delete n[i],t.push(i)}}for(var i of e.sinks())o(i);if(Object.keys(r).length!==e.nodeCount())throw new xe;return t}function Ce(e,r,n){var t=Array.isArray(r)?r:[r],o=(e.isDirected()?e.successors:e.neighbors).bind(e),i=[],a={};for(var s of t){if(!e.hasNode(s))throw new Error("Graph does not have node: "+s);Oe(e,s,"post"===n,a,o,i)}return i}function Oe(e,r,n,t,o,i){if(!(r in t)){for(var a of(t[r]=!0,n||i.push(r),o(r)))Oe(e,a,n,t,o,i);n&&i.push(r)}}function je(e,r){return Ce(e,r,"post")}function Me(e,r){return Ce(e,r,"pre")}var Le=Object.freeze({__proto__:null,components:function(e){var r,n={},t=[];function o(t){if(!(t in n)){for(var i of(n[t]=!0,r.push(t),e.successors(t)))o(i);for(var a of e.predecessors(t))o(a)}}for(var i of e.nodes())r=[],o(i),r.length&&t.push(r);return t},dijkstra:ke,dijkstraAll:function(e,r,n){var t={};for(var o of e.nodes())t[o]=ke(e,o,r,n);return t},findCycles:function(e){return Ee(e).filter((function(r){return r.length>1||1===r.length&&e.hasEdge(r[0],r[0])}))},floydWarshall:function(e,r,n){return function(e,r,n){var t={},o=e.nodes();return o.forEach((function(e){t[e]={},t[e][e]={distance:0},o.forEach((function(r){e!==r&&(t[e][r]={distance:Number.POSITIVE_INFINITY})})),n(e).forEach((function(n){var o=n.v===e?n.w:n.v,i=r(n);t[e][o]={distance:i,predecessor:e}}))})),o.forEach((function(e){var r=t[e];o.forEach((function(n){var i=t[n];o.forEach((function(n){var t=i[e],o=r[n],a=i[n],s=t.distance+o.distance;s<a.distance&&(a.distance=s,a.predecessor=o.predecessor)}))}))})),t}(e,r||Ne,n||function(r){return e.outEdges(r)})},isAcyclic:function(e){try{Ie(e)}catch(e){if(e instanceof xe)return!1;throw e}return!0},postorder:je,preorder:Me,prim:function(e,r){var n,t=new I({}),o={},i=new be;function a(e){var t=e.v===n?e.w:e.v,a=i.priority(t);if(void 0!==a){var s=r(e);s<a&&(o[t]=n,i.decrease(t,s))}}if(0===e.nodeCount())return t;for(n of e.nodes())i.add(n,Number.POSITIVE_INFINITY),t.setNode(n);i.decrease(e.nodes()[0],0);for(var s=!1;i.size()>0;){if((n=i.removeMin())in o)t.setEdge(n,o[n]);else{if(s)throw new Error("Input graph is not connected: "+e);s=!0}e.nodeEdges(n).forEach(a)}return t},tarjan:Ee,topsort:Ie});function Te(e){me(e=T(e));var r,n=_e(e);for(Fe(n),Se(n,e);r=ze(n);)Ve(n,e,r,Ge(n,e,r))}function Se(e,r){var n=je(e,e.nodes());for(var t of n=n.slice(0,n.length-1))Pe(e,r,t)}function Pe(e,r,n){var t=e.node(n).parent;e.edge(n,t).cutvalue=Re(e,r,n)}function Re(e,r,n){var t,o,i=e.node(n).parent,a=!0,s=r.edge(n,i),d=0;for(var u of(s||(a=!1,s=r.edge(i,n)),d=s.weight,r.nodeEdges(n))){var f=u.v===n,h=f?u.w:u.v;if(h!==i){var c=f===a,v=r.edge(u).weight;if(d+=c?v:-v,t=n,o=h,e.hasEdge(t,o)){var l=e.edge(n,h).cutvalue;d+=c?-l:l}}}return d}function Fe(e,r){arguments.length<2&&(r=e.nodes()[0]),De(e,{},1,r)}function De(e,r,n,t,o){var i=n,a=e.node(t);for(var d of(r[t]=!0,e.neighbors(t)))s(r,d)||(n=De(e,r,n,d,t));return a.low=i,a.lim=n++,o?a.parent=o:delete a.parent,n}function ze(e){for(var r of e.edges())if(e.edge(r).cutvalue<0)return r}function Ge(e,r,n){var t=n.v,o=n.w;r.hasEdge(t,o)||(t=n.w,o=n.v);var i=e.node(t),a=e.node(o),s=i,d=!1;return i.lim>a.lim&&(s=a,d=!0),f(r.edges().filter((function(r){return d===Ye(e,e.node(r.v),s)&&d!==Ye(e,e.node(r.w),s)})),(e=>we(r,e)))}function Ve(e,r,n,t){var o=n.v,i=n.w;e.removeEdge(o,i),e.setEdge(t.v,t.w,{}),Fe(e),Se(e,r),function(e,r){var n=function(e,r){for(var n of e.nodes())if(!r.node(n).parent)return n;return}(e,r),t=Me(e,n);for(var o of t=t.slice(1)){var i=e.node(o).parent,a=r.edge(o,i),s=!1;a||(a=r.edge(i,o),s=!0),r.node(o).rank=r.node(i).rank+(s?a.minlen:-a.minlen)}}(e,r)}function Ye(e,r,n){return n.low<=r.lim&&r.lim<=n.lim}function Be(e){switch(e.graph().ranker){case"network-simplex":We(e);break;case"tight-tree":qe(e);break;case"longest-path":Ae(e);break;default:We(e)}}Te.initLowLimValues=Fe,Te.initCutValues=Se,Te.calcCutValue=Re,Te.leaveEdge=ze,Te.enterEdge=Ge,Te.exchangeEdges=Ve;var Ae=me;function qe(e){me(e),_e(e)}function We(e){Te(e)}var $e=Object.freeze({__proto__:null,rank:Be,tightTreeRanker:qe,networkSimplexRanker:We,networkSimplex:Te,feasibleTree:_e,longestPath:me}),Je=e=>1;function Qe(e,n){if(e.nodeCount()<=1)return[];var t=function(e,n){var t=new x,o=0,i=0;for(var a of e.nodes())t.setNode(a,{v:a,in:0,out:0});for(var s of e.edges()){var d=t.edge(s.v,s.w)||0,u=n(s),f=d+u;t.setEdge(s.v,s.w,f),i=Math.max(i,t.node(s.v).out+=u),o=Math.max(o,t.node(s.w).in+=u)}var h=g(i+o+3,(()=>new r)),c=o+1;for(var a of t.nodes())Xe(h,c,t.node(a));return{graph:t,buckets:h,zeroIdx:c}}(e,n||Je);return a(function(e,r,n){var t,o=[],i=r[r.length-1],a=r[0];for(;e.nodeCount();){for(;t=a.dequeue();)Ke(e,r,n,t);for(;t=i.dequeue();)Ke(e,r,n,t);if(e.nodeCount())for(var s=r.length-2;s>0;--s)if(t=r[s].dequeue()){o=o.concat(Ke(e,r,n,t,!0));break}}return o}(t.graph,t.buckets,t.zeroIdx).map((r=>e.outEdges(r.v,r.w))))}function Ke(e,r,n,t,o){var i=o?[]:void 0;for(var a of e.inEdges(t.v)){var s=e.edge(a),d=e.node(a.v);o&&i.push({v:a.v,w:a.w}),d.out-=s,Xe(r,n,d)}for(var a of e.outEdges(t.v)){s=e.edge(a);var u=a.w,f=e.node(u);f.in-=s,Xe(r,n,f)}return e.removeNode(t.v),i}function Xe(e,r,n){n.out?n.in?e[n.out-n.in+r].enqueue(n):e[e.length-1].enqueue(n):e[0].enqueue(n)}var He={run:function(e){var r="greedy"===e.graph().acyclicer?Qe(e,function(e){return function(r){return e.edge(r).weight}}(e)):function(e){var r=[],n={},t={};function o(i){if(!s(t,i)){for(var a of(t[i]=!0,n[i]=!0,e.outEdges(i)))s(n,a.w)?r.push(a):o(a.w);delete n[i]}}return e.nodes().forEach(o),r}(e);for(var n of r){var t=e.edge(n);e.removeEdge(n),t.forwardName=n.name,t.reversed=!0,e.setEdge(n.w,n.v,t,v("rev"))}},undo:function(e){for(var r of e.edges()){var n=e.edge(r);if(n.reversed){e.removeEdge(r);var t=n.forwardName;delete n.reversed,delete n.forwardName,e.setEdge(r.w,r.v,n,t)}}}};function Ue(e){e.children().forEach((function r(n){var t=e.children(n),o=e.node(n);if(t.length&&t.forEach(r),s(o,"minRank")){o.borderLeft=[],o.borderRight=[];for(var i=o.minRank,a=o.maxRank+1;i<a;++i)Ze(e,"borderLeft","_bl",n,o,i),Ze(e,"borderRight","_br",n,o,i)}}))}function Ze(e,r,n,t,o,i){var a={width:0,height:0,rank:i,borderType:r},s=o[r][i-1],d=L(e,"border",a,n);o[r][i]=d,e.setParent(d,t),s&&e.setEdge(s,d,{weight:1})}var er={adjust:function(e){var r=e.graph().rankdir.toLowerCase();"lr"!==r&&"rl"!==r||rr(e)},undo:function(e){var r=e.graph().rankdir.toLowerCase();"bt"!==r&&"rl"!==r||function(e){for(var r of e.nodes())tr(e.node(r));for(var n of e.edges()){var t=e.edge(n);t.points.forEach(tr),s(t,"y")&&tr(t)}}(e);"lr"!==r&&"rl"!==r||(!function(e){for(var r of e.nodes())or(e.node(r));for(var n of e.edges()){var t=e.edge(n);t.points.forEach(or),s(t,"x")&&or(t)}}(e),rr(e))}};function rr(e){for(var r of e.nodes())nr(e.node(r));for(var n of e.edges())nr(e.edge(n))}function nr(e){var r=e.width;e.width=e.height,e.height=r}function tr(e){e.y=-e.y}function or(e){var r=e.x;e.x=e.y,e.y=r}var ir=Object.freeze({__proto__:null,debugOrdering:function(e){var r=R(e),n=new x({compound:!0,multigraph:!0}).setGraph({});for(var t of e.nodes())n.setNode(t,{label:t}),n.setParent(t,"layer"+e.node(t).rank);for(var o of e.edges())n.setEdge(o.v,o.w,{},o.name);var i=0;for(var a of r){var s="layer"+i;i++,n.setNode(s,{rank:"same"}),a.reduce((function(e,r){return n.setEdge(e.toString(),r,{style:"invis"}),r}))}return n}}),ar={run:function(e){for(var r of(e.graph().dummyChains=[],e.edges()))sr(e,r)},undo:function(e){for(var r of e.graph().dummyChains){var n,t=e.node(r),o=t.edgeLabel;for(e.setEdge(t.edgeObj,o);t.dummy;)n=e.successors(r)[0],e.removeNode(r),o.points.push({x:t.x,y:t.y}),"edge-label"===t.dummy&&(o.x=t.x,o.y=t.y,o.width=t.width,o.height=t.height),r=n,t=e.node(r)}}};function sr(e,r){var n=r.v,t=e.node(n).rank,o=r.w,i=e.node(o).rank,a=r.name,s=e.edge(r),d=s.labelRank;if(i!==t+1){var u,f,h;for(e.removeEdge(r),h=0,++t;t<i;++h,++t)s.points=[],u=L(e,"edge",f={width:0,height:0,edgeLabel:s,edgeObj:r,rank:t},"_d"),t===d&&(f.width=s.width,f.height=s.height,f.dummy="edge-label",f.labelpos=s.labelpos),e.setEdge(n,u,{weight:s.weight},a),0===h&&e.graph().dummyChains.push(u),n=u;e.setEdge(n,o,{weight:s.weight},a)}}function dr(e){var r=function(e){var r={},n=0;function t(o){var i=n;e.children(o).forEach(t),r[o]={low:i,lim:n++}}return e.children().forEach(t),r}(e);for(var n of e.graph().dummyChains)for(var t=e.node(n),o=t.edgeObj,i=ur(e,r,o.v,o.w),a=i.path,s=i.lca,d=0,u=a[d],f=!0;n!==o.w;){if(t=e.node(n),f){for(;(u=a[d])!==s&&e.node(u).maxRank<t.rank;)d++;u===s&&(f=!1)}if(!f){for(;d<a.length-1&&e.node(u=a[d+1]).minRank<=t.rank;)d++;u=a[d]}e.setParent(n,u),n=e.successors(n)[0]}}function ur(e,r,n,t){var o,i,a=[],s=[],d=Math.min(r[n].low,r[t].low),u=Math.max(r[n].lim,r[t].lim);o=n;do{o=e.parent(o),a.push(o)}while(o&&(r[o].low>d||u>r[o].lim));for(i=o,o=t;(o=e.parent(o))!==i;)s.push(o);return{path:a.concat(s.reverse()),lca:i}}var fr={run:function(e){var r=L(e,"root",{},"_root"),n=function(e){var r={};function n(t,o){var i=e.children(t);if(i&&i.length)for(var a of i)n(a,o+1);r[t]=o}for(var t of e.children())n(t,1);return r}(e),t=Math.max(...l(n))-1,o=2*t+1;for(var i of(e.graph().nestingRoot=r,e.edges()))e.edge(i).minlen*=o;var a=function(e){return e.edges().reduce(((r,n)=>r+e.edge(n).weight),0)}(e)+1;for(var s of e.children())hr(e,r,o,a,t,n,s);e.graph().nodeRankFactor=o},cleanup:function(e){var r=e.graph();for(var n of(e.removeNode(r.nestingRoot),delete r.nestingRoot,e.edges())){e.edge(n).nestingEdge&&e.removeEdge(n)}}};function hr(e,r,n,t,o,i,a){var s=e.children(a);if(s.length){var d=z(e,"_bt"),u=z(e,"_bb"),f=e.node(a);for(var h of(e.setParent(d,a),f.borderTop=d,e.setParent(u,a),f.borderBottom=u,s)){hr(e,r,n,t,o,i,h);var c=e.node(h),v=c.borderTop?c.borderTop:h,l=c.borderBottom?c.borderBottom:h,g=c.borderTop?t:2*t,p=v!==l?1:o-i[a]+1;e.setEdge(d,v,{weight:g,minlen:p,nestingEdge:!0}),e.setEdge(l,u,{weight:g,minlen:p,nestingEdge:!0})}e.parent(a)||e.setEdge(r,d,{weight:0,minlen:o+i[a]})}else a!==r&&e.setEdge(r,a,{weight:0,minlen:n})}function cr(e){return"edge-proxy"==e.dummy}function vr(e){return"selfedge"==e.dummy}var lr=50,gr=20,pr=50,mr="tb",wr=1,_r=1,br=0,yr=0,kr=10,Er="r";function Nr(e={}){var r={};for(var n of Object.keys(e))r[n.toLowerCase()]=e[n];return r}function xr(e){return e.nodes().map((function(r){var n=e.node(r),t=e.parent(r),o={v:r};return void 0!==n&&(o.value=n),void 0!==t&&(o.parent=t),o}))}function Ir(e){return e.edges().map((function(r){var n=e.edge(r),t={v:r.v,w:r.w};return void 0!==r.name&&(t.name=r.name),void 0!==n&&(t.value=n),t}))}var Cr=Object.freeze({__proto__:null,write:function(e){var r={options:{directed:e.isDirected(),multigraph:e.isMultigraph(),compound:e.isCompound()},nodes:xr(e),edges:Ir(e)};return void 0!==e.graph()&&(r.value=JSON.parse(JSON.stringify(e.graph()))),r},read:function(e){var r=new x(e.options).setGraph(e.value);for(var n of e.nodes)r.setNode(n.v,n.value),n.parent&&r.setParent(n.v,n.parent);for(var n of e.edges)r.setEdge({v:n.v,w:n.w,name:n.name},n.value);return r}}),Or={Graph:x,GraphLike:I,alg:Le,json:Cr,PriorityQueue:be};e.Graph=x,e.GraphLike=I,e.PriorityQueue=be,e.acyclic=He,e.addBorderSegments=Ue,e.alg=Le,e.coordinateSystem=er,e.data=o,e.debug=ir,e.graphlib=Or,e.greedyFAS=Qe,e.json=Cr,e.layout=function(e,r){var n=r&&r.debugTiming?Y:B;n("layout",(function(){var r=n("  buildLayoutGraph",(function(){return function(e){var r,n,t,o,i,a,s,d,u,f,h,c,v,l,g,p=new x({multigraph:!0,compound:!0}),m=Nr(e.graph()),w={nodesep:null!==(r=m.nodesep)&&void 0!==r?r:pr,edgesep:null!==(n=m.edgesep)&&void 0!==n?n:gr,ranksep:null!==(t=m.ranksep)&&void 0!==t?t:lr,marginx:+(null!==(o=m.marginx)&&void 0!==o?o:0),marginy:+(null!==(i=m.marginy)&&void 0!==i?i:0),acyclicer:m.acyclicer,ranker:null!==(a=m.ranker)&&void 0!==a?a:"network-simplex",rankdir:null!==(s=m.rankdir)&&void 0!==s?s:mr,align:m.align};for(var _ of(p.setGraph(w),e.nodes())){var b=Nr(e.node(_)),y={width:+(null!==(d=b&&b.width)&&void 0!==d?d:0),height:+(null!==(u=b&&b.height)&&void 0!==u?u:0)};p.setNode(_,y),p.setParent(_,e.parent(_))}for(var k of e.edges()){var E=Nr(e.edge(k)),N={minlen:null!==(f=E.minlen)&&void 0!==f?f:wr,weight:null!==(h=E.weight)&&void 0!==h?h:_r,width:null!==(c=E.width)&&void 0!==c?c:br,height:null!==(v=E.height)&&void 0!==v?v:yr,labeloffset:null!==(l=E.labeloffset)&&void 0!==l?l:kr,labelpos:null!==(g=E.labelpos)&&void 0!==g?g:Er};p.setEdge(k,N)}return p}(e)}));n("  runLayout",(function(){!function(e,r){r("    makeSpaceForEdgeLabels",(function(){!function(e){var r=e.graph();for(var n of(r.ranksep/=2,e.edges())){var t=e.edge(n);t.minlen*=2,"c"!==t.labelpos.toLowerCase()&&("TB"===r.rankdir||"BT"===r.rankdir?t.width+=t.labeloffset:t.height+=t.labeloffset)}}(e)})),r("    removeSelfEdges",(function(){!function(e){for(var r of e.edges())if(r.v===r.w){var n=e.node(r.v);n.selfEdges||(n.selfEdges=[]),n.selfEdges.push({e:r,label:e.edge(r)}),e.removeEdge(r)}}(e)})),r("    acyclic",(function(){He.run(e)})),r("    nestingGraph.run",(function(){fr.run(e)})),r("    rank",(function(){Be(S(e))})),r("    injectEdgeLabelProxies",(function(){!function(e){for(var r of e.edges()){var n=e.edge(r);if(n.width&&n.height){var t=e.node(r.v),o=e.node(r.w);L(e,"edge-proxy",{rank:(o.rank-t.rank)/2+t.rank,e:r},"_ep")}}}(e)})),r("    removeEmptyRanks",(function(){D(e)})),r("    nestingGraph.cleanup",(function(){fr.cleanup(e)})),r("    normalizeRanks",(function(){F(e)})),r("    assignRankMinMax",(function(){!function(e){var r=0;for(var n of e.nodes()){var t=e.node(n);t.borderTop&&(t.minRank=e.node(t.borderTop).rank,t.maxRank=e.node(t.borderBottom).rank,r=Math.max(r,t.maxRank))}e.graph().maxRank=r}(e)})),r("    removeEdgeLabelProxies",(function(){!function(e){for(var r of e.nodes()){var n=e.node(r);cr(n)&&(e.edge(n.e).labelRank=n.rank,e.removeNode(r))}}(e)})),r("    normalize.run",(function(){ar.run(e)})),r("    parentDummyChains",(function(){dr(e)})),r("    addBorderSegments",(function(){Ue(e)})),r("    order",(function(){X(e)})),r("    insertSelfEdges",(function(){!function(e){var r,n=R(e);for(var t of n)for(var o=0,i=0;i<t.length;i++){var a=t[i],s=e.node(a);for(var d of(s.order=i+o,null!==(r=s.selfEdges)&&void 0!==r?r:[]))L(e,"selfedge",{width:d.label.width,height:d.label.height,rank:s.rank,order:i+ ++o,e:d.e,label:d.label},"_se");delete s.selfEdges}}(e)})),r("    adjustCoordinateSystem",(function(){er.adjust(e)})),r("    position",(function(){ge(e)})),r("    positionSelfEdges",(function(){!function(e){for(var r of e.nodes()){var n=e.node(r);if(vr(n)){var t=e.node(n.e.v),o=t.x+t.width/2,i=t.y,a=n.x-o,s=t.height/2;e.setEdge(n.e,n.label),e.removeNode(r),n.label.points=[{x:o+2*a/3,y:i-s},{x:o+5*a/6,y:i-s},{x:o+a,y:i},{x:o+5*a/6,y:i+s},{x:o+2*a/3,y:i+s}],n.label.x=n.x,n.label.y=n.y}}}(e)})),r("    removeBorderNodes",(function(){!function(e){for(var r of e.nodes())if(e.children(r).length){var n=e.node(r),t=e.node(n.borderTop),o=e.node(n.borderBottom),i=e.node(d(n.borderLeft)),a=e.node(d(n.borderRight));n.width=Math.abs(a.x-i.x),n.height=Math.abs(o.y-t.y),n.x=i.x+n.width/2,n.y=t.y+n.height/2}for(var r of e.nodes())"border"===e.node(r).dummy&&e.removeNode(r)}(e)})),r("    normalize.undo",(function(){ar.undo(e)})),r("    fixupEdgeLabelCoords",(function(){!function(e){for(var r of e.edges()){var n=e.edge(r);if(s(n,"x"))switch("l"!==n.labelpos&&"r"!==n.labelpos||(n.width-=n.labeloffset),n.labelpos){case"l":n.x-=n.width/2+n.labeloffset;break;case"r":n.x+=n.width/2+n.labeloffset}}}(e)})),r("    undoCoordinateSystem",(function(){er.undo(e)})),r("    translateGraph",(function(){!function(e){var r,n,t,o=Number.POSITIVE_INFINITY,i=0,a=Number.POSITIVE_INFINITY,d=0,u=e.graph(),f=null!==(r=u.marginx)&&void 0!==r?r:0,h=null!==(n=u.marginy)&&void 0!==n?n:0;function c(e){var r=e.x,n=e.y,t=e.width,s=e.height;o=Math.min(o,r-t/2),i=Math.max(i,r+t/2),a=Math.min(a,n-s/2),d=Math.max(d,n+s/2)}for(var v of e.nodes())c(e.node(v));for(var l of e.edges()){s(p=e.edge(l),"x")&&c(p)}for(var v of(o-=f,a-=h,e.nodes())){var g=e.node(v);g.x-=o,g.y-=a}for(var l of e.edges()){var p=e.edge(l);for(var m of null!==(t=p.points)&&void 0!==t?t:[])m.x-=o,m.y-=a;p.hasOwnProperty("x")&&(p.x-=o),p.hasOwnProperty("y")&&(p.y-=a)}u.width=i-o+f,u.height=d-a+h}(e)})),r("    assignNodeIntersects",(function(){!function(e){for(var r of e.edges()){var n,t,o=e.edge(r),i=e.node(r.v),a=e.node(r.w);o.points?(n=o.points[0],t=o.points[o.points.length-1]):(o.points=[],n=a,t=i),o.points.unshift(P(i,n)),o.points.push(P(a,t))}}(e)})),r("    reversePoints",(function(){!function(e){for(var r of e.edges()){var n=e.edge(r);n.reversed&&n.points.reverse()}}(e)})),r("    acyclic.undo",(function(){He.undo(e)}))}(r,n)})),n("  updateInputGraph",(function(){!function(e,r){for(var n of e.nodes()){var t=e.node(n),o=r.node(n);t&&(t.x=o.x,t.y=o.y,r.children(n).length&&(t.width=o.width,t.height=o.height))}for(var i of e.edges()){var a=e.edge(i),d=r.edge(i);a.points=d.points,s(d,"x")&&(a.x=d.x,a.y=d.y)}e.graph().width=r.graph().width,e.graph().height=r.graph().height}(e,r)}))}))},e.nestingGraph=fr,e.normalize=ar,e.order=ee,e.parentDummyChains=dr,e.position=pe,e.rank=$e,e.util=A,e.version="0.1.3",Object.defineProperty(e,"__esModule",{value:!0})}));


/***/ }),

/***/ "./node_modules/graphre/index.js":
/*!***************************************!*\
  !*** ./node_modules/graphre/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
Copyright (c) 2012-2014 Chris Pettitt

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

module.exports = __webpack_require__(/*! ./dist/graphre */ "./node_modules/graphre/dist/graphre.js");


/***/ }),

/***/ "./node_modules/node-libs-browser/mock/empty.js":
/*!******************************************************!*\
  !*** ./node_modules/node-libs-browser/mock/empty.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./node_modules/nomnoml/dist/nomnoml.js":
/*!**********************************************!*\
  !*** ./node_modules/nomnoml/dist/nomnoml.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (factoryFn) {
  if ( true && module.exports)
  	module.exports = factoryFn(__webpack_require__(/*! graphre */ "./node_modules/graphre/index.js"));
  else window.nomnoml = factoryFn(graphre);
})(function (graphre) {
  var nomnoml;
(function (nomnoml) {
    function buildStyle(conf, title, body) {
        if (body === void 0) { body = {}; }
        return {
            title: {
                bold: title.bold || false,
                underline: title.underline || false,
                italic: title.italic || false,
                center: title.center || false,
            },
            body: {
                bold: body.bold || false,
                underline: body.underline || false,
                italic: body.italic || false,
                center: body.center || false,
            },
            dashed: conf.dashed || false,
            empty: conf.empty || false,
            fill: conf.fill || undefined,
            stroke: conf.stroke || undefined,
            visual: conf.visual || 'class',
            direction: conf.direction || undefined,
        };
    }
    nomnoml.buildStyle = buildStyle;
    var Compartment = (function () {
        function Compartment(lines, nodes, relations) {
            this.lines = lines;
            this.nodes = nodes;
            this.relations = relations;
        }
        return Compartment;
    }());
    nomnoml.Compartment = Compartment;
    var Relation = (function () {
        function Relation() {
        }
        return Relation;
    }());
    nomnoml.Relation = Relation;
    var Classifier = (function () {
        function Classifier(type, name, compartments) {
            this.type = type;
            this.name = name;
            this.compartments = compartments;
            this.dividers = [];
        }
        return Classifier;
    }());
    nomnoml.Classifier = Classifier;
})(nomnoml || (nomnoml = {}));
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var nomnoml;
(function (nomnoml) {
    function layout(measurer, config, ast) {
        function measureLines(lines, fontWeight) {
            if (!lines.length)
                return { width: 0, height: config.padding };
            measurer.setFont(config, fontWeight, 'normal');
            return {
                width: Math.round(Math.max.apply(Math, lines.map(measurer.textWidth)) + 2 * config.padding),
                height: Math.round(measurer.textHeight() * lines.length + 2 * config.padding)
            };
        }
        function layoutCompartment(c, compartmentIndex, style) {
            var _a;
            var textSize = measureLines(c.lines, compartmentIndex ? 'normal' : 'bold');
            if (!c.nodes.length && !c.relations.length) {
                c.width = textSize.width;
                c.height = textSize.height;
                c.offset = { x: config.padding, y: config.padding };
                return;
            }
            c.nodes.forEach(layoutClassifier);
            var g = new graphre.graphlib.Graph();
            g.setGraph({
                rankdir: style.direction || config.direction,
                nodesep: config.spacing,
                edgesep: config.spacing,
                ranksep: config.spacing,
                acyclicer: config.acyclicer,
                ranker: config.ranker
            });
            for (var _i = 0, _b = c.nodes; _i < _b.length; _i++) {
                var e = _b[_i];
                g.setNode(e.name, { width: e.layoutWidth, height: e.layoutHeight });
            }
            for (var _c = 0, _d = c.relations; _c < _d.length; _c++) {
                var r = _d[_c];
                if (r.assoc.indexOf('_') > -1) {
                    g.setEdge(r.start, r.end, { id: r.id, minlen: 0 });
                }
                else if (((_a = config.gravity) !== null && _a !== void 0 ? _a : 1) != 1) {
                    g.setEdge(r.start, r.end, { id: r.id, minlen: config.gravity });
                }
                else {
                    g.setEdge(r.start, r.end, { id: r.id });
                }
            }
            graphre.layout(g);
            var rels = nomnoml.skanaar.indexBy(c.relations, 'id');
            var nodes = nomnoml.skanaar.indexBy(c.nodes, 'name');
            g.nodes().forEach(function (name) {
                var node = g.node(name);
                nodes[name].x = node.x;
                nodes[name].y = node.y;
            });
            var left = 0;
            var right = 0;
            var top = 0;
            var bottom = 0;
            g.edges().forEach(function (edgeObj) {
                var edge = g.edge(edgeObj);
                var start = nodes[edgeObj.v];
                var end = nodes[edgeObj.w];
                var rel = rels[edge.id];
                rel.path = __spreadArrays([start], edge.points, [end]).map(toPoint);
                var startP = rel.path[1];
                var endP = rel.path[rel.path.length - 2];
                layoutLabel(rel.startLabel, startP, adjustQuadrant(quadrant(startP, start, 4), start, end));
                layoutLabel(rel.endLabel, endP, adjustQuadrant(quadrant(endP, end, 2), end, start));
                left = Math.min.apply(Math, __spreadArrays([left, rel.startLabel.x, rel.endLabel.x], edge.points.map(function (e) { return e.x; }), edge.points.map(function (e) { return e.x; })));
                right = Math.max.apply(Math, __spreadArrays([right, rel.startLabel.x + rel.startLabel.width, rel.endLabel.x + rel.endLabel.width], edge.points.map(function (e) { return e.x; })));
                top = Math.min.apply(Math, __spreadArrays([top, rel.startLabel.y, rel.endLabel.y], edge.points.map(function (e) { return e.y; })));
                bottom = Math.max.apply(Math, __spreadArrays([bottom, rel.startLabel.y + rel.startLabel.height, rel.endLabel.y + rel.endLabel.height], edge.points.map(function (e) { return e.y; })));
            });
            var graph = g.graph();
            var width = Math.max(graph.width, right - left);
            var height = Math.max(graph.height, bottom - top);
            var graphHeight = height ? height + 2 * config.gutter : 0;
            var graphWidth = width ? width + 2 * config.gutter : 0;
            c.width = Math.max(textSize.width, graphWidth) + 2 * config.padding;
            c.height = textSize.height + graphHeight + config.padding;
            c.offset = { x: config.padding - left, y: config.padding - top };
        }
        function toPoint(o) {
            return { x: o.x, y: o.y };
        }
        function layoutLabel(label, point, quadrant) {
            if (!label.text) {
                label.width = 0;
                label.height = 0;
                label.x = point.x;
                label.y = point.y;
            }
            else {
                var fontSize = config.fontSize;
                var lines = label.text.split('`');
                label.width = Math.max.apply(Math, lines.map(function (l) { return measurer.textWidth(l); })),
                    label.height = fontSize * lines.length;
                label.x = point.x + ((quadrant == 1 || quadrant == 4) ? config.padding : -label.width - config.padding),
                    label.y = point.y + ((quadrant == 3 || quadrant == 4) ? config.padding : -label.height - config.padding);
            }
        }
        function quadrant(point, node, fallback) {
            if (point.x < node.x && point.y < node.y)
                return 1;
            if (point.x > node.x && point.y < node.y)
                return 2;
            if (point.x > node.x && point.y > node.y)
                return 3;
            if (point.x < node.x && point.y > node.y)
                return 4;
            return fallback;
        }
        function adjustQuadrant(quadrant, point, opposite) {
            if ((opposite.x == point.x) || (opposite.y == point.y))
                return quadrant;
            var flipHorizontally = [4, 3, 2, 1];
            var flipVertically = [2, 1, 4, 3];
            var oppositeQuadrant = (opposite.y < point.y) ?
                ((opposite.x < point.x) ? 2 : 1) :
                ((opposite.x < point.x) ? 3 : 4);
            if (oppositeQuadrant === quadrant) {
                if (config.direction === 'LR')
                    return flipHorizontally[quadrant - 1];
                if (config.direction === 'TB')
                    return flipVertically[quadrant - 1];
            }
            return quadrant;
        }
        function layoutClassifier(clas) {
            var style = config.styles[clas.type] || nomnoml.styles.CLASS;
            clas.compartments.forEach(function (co, i) { layoutCompartment(co, i, style); });
            nomnoml.layouters[style.visual](config, clas);
            clas.layoutWidth = clas.width + 2 * config.edgeMargin;
            clas.layoutHeight = clas.height + 2 * config.edgeMargin;
        }
        layoutCompartment(ast, 0, nomnoml.styles.CLASS);
        return ast;
    }
    nomnoml.layout = layout;
})(nomnoml || (nomnoml = {}));
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var nomnoml;
(function (nomnoml) {
    var ImportDepthError = (function (_super) {
        __extends(ImportDepthError, _super);
        function ImportDepthError() {
            return _super.call(this, 'max_import_depth exceeded') || this;
        }
        return ImportDepthError;
    }(Error));
    nomnoml.ImportDepthError = ImportDepthError;
    function compileFile(filepath, maxImportDepth) {
        var fs = __webpack_require__(/*! fs */ "./node_modules/node-libs-browser/mock/empty.js");
        var path = __webpack_require__(/*! path */ "./node_modules/path-browserify/index.js");
        var directory = path.dirname(filepath);
        var rootFileName = filepath.substr(directory.length);
        function loadFile(filename) {
            return fs.readFileSync(path.join(directory, filename), { encoding: 'utf8' });
        }
        return nomnoml.processImports(loadFile(rootFileName), loadFile, maxImportDepth);
    }
    nomnoml.compileFile = compileFile;
})(nomnoml || (nomnoml = {}));
var nomnoml;
(function (nomnoml) {
    nomnoml.version = '1.3.1';
    function fitCanvasSize(canvas, rect, zoom) {
        canvas.width = rect.width * zoom;
        canvas.height = rect.height * zoom;
    }
    function Measurer(config, graphics) {
        return {
            setFont: function (conf, bold, ital) {
                graphics.setFont(conf.font, bold, ital, config.fontSize);
            },
            textWidth: function (s) { return graphics.measureText(s).width; },
            textHeight: function () { return config.leading * config.fontSize; }
        };
    }
    ;
    function parseAndRender(code, graphics, canvas, scale) {
        var parsedDiagram = nomnoml.parse(code);
        var config = parsedDiagram.config;
        var measurer = Measurer(config, graphics);
        var layout = nomnoml.layout(measurer, config, parsedDiagram.root);
        if (canvas) {
            fitCanvasSize(canvas, layout, config.zoom * scale);
        }
        config.zoom *= scale;
        nomnoml.render(graphics, config, layout, measurer.setFont);
        return { config: config, layout: layout };
    }
    function draw(canvas, code, scale) {
        return parseAndRender(code, nomnoml.skanaar.Canvas(canvas), canvas, scale || 1);
    }
    nomnoml.draw = draw;
    function renderSvg(code, document) {
        var skCanvas = nomnoml.skanaar.Svg('', document);
        var _a = parseAndRender(code, skCanvas, null, 1), config = _a.config, layout = _a.layout;
        return skCanvas.serialize({
            width: layout.width,
            height: layout.height
        }, code, config.title);
    }
    nomnoml.renderSvg = renderSvg;
    function processImports(source, loadFile, maxImportDepth) {
        if (maxImportDepth === void 0) { maxImportDepth = 10; }
        if (maxImportDepth == -1) {
            throw new nomnoml.ImportDepthError();
        }
        function lenientLoadFile(key) {
            try {
                return loadFile(key) || '';
            }
            catch (e) {
                return '';
            }
        }
        return source.replace(/#import: *(.*)/g, function (a, file) {
            return processImports(lenientLoadFile(file), loadFile, maxImportDepth - 1);
        });
    }
    nomnoml.processImports = processImports;
})(nomnoml || (nomnoml = {}));
var nomnoml;
(function (nomnoml) {
    var Line = (function () {
        function Line() {
        }
        return Line;
    }());
    function parse(source) {
        function onlyCompilables(line) {
            var ok = line[0] !== '#' && line.trim().substring(0, 2) !== '//';
            return ok ? line.trim() : '';
        }
        function isDirective(line) { return line.text[0] === '#'; }
        var lines = source.split('\n').map(function (s, i) {
            return { text: s, index: i };
        });
        var pureDirectives = lines.filter(isDirective);
        var directives = {};
        pureDirectives.forEach(function (line) {
            try {
                var tokens = line.text.substring(1).split(':');
                directives[tokens[0].trim()] = tokens[1].trim();
            }
            catch (e) {
                throw new Error('line ' + (line.index + 1) + ': Malformed directive');
            }
        });
        var pureDiagramCode = lines.map(function (e) { return onlyCompilables(e.text); }).join('\n');
        if (pureDiagramCode == '') {
            return {
                root: new nomnoml.Compartment([], [], []),
                config: getConfig(directives)
            };
        }
        var parseTree = nomnoml.intermediateParse(pureDiagramCode);
        return {
            root: nomnoml.transformParseIntoSyntaxTree(parseTree),
            config: getConfig(directives)
        };
        function directionToDagre(word) {
            if (word == 'down')
                return 'TB';
            if (word == 'right')
                return 'LR';
            else
                return 'TB';
        }
        function parseRanker(word) {
            if (word == 'network-simplex' || word == 'tight-tree' || word == 'longest-path') {
                return word;
            }
            return 'network-simplex';
        }
        function parseCustomStyle(styleDef) {
            var contains = nomnoml.skanaar.hasSubstring;
            var floatingKeywords = styleDef.replace(/[a-z]*=[^ ]+/g, '');
            var titleDef = nomnoml.skanaar.last(styleDef.match('title=([^ ]*)') || ['']);
            var bodyDef = nomnoml.skanaar.last(styleDef.match('body=([^ ]*)') || ['']);
            return {
                title: {
                    bold: contains(titleDef, 'bold') || contains(floatingKeywords, 'bold'),
                    underline: contains(titleDef, 'underline') || contains(floatingKeywords, 'underline'),
                    italic: contains(titleDef, 'italic') || contains(floatingKeywords, 'italic'),
                    center: !(contains(titleDef, 'left') || contains(styleDef, 'align=left')),
                },
                body: {
                    bold: contains(bodyDef, 'bold'),
                    underline: contains(bodyDef, 'underline'),
                    italic: contains(bodyDef, 'italic'),
                    center: contains(bodyDef, 'center'),
                },
                dashed: contains(styleDef, 'dashed'),
                empty: contains(styleDef, 'empty'),
                fill: nomnoml.skanaar.last(styleDef.match('fill=([^ ]*)') || []),
                stroke: nomnoml.skanaar.last(styleDef.match('stroke=([^ ]*)') || []),
                visual: (nomnoml.skanaar.last(styleDef.match('visual=([^ ]*)') || []) || 'class'),
                direction: directionToDagre(nomnoml.skanaar.last(styleDef.match('direction=([^ ]*)') || [])),
            };
        }
        function getConfig(d) {
            var _a;
            var userStyles = {};
            for (var key in d) {
                if (key[0] != '.')
                    continue;
                var styleDef = d[key];
                userStyles[key.substring(1).toUpperCase()] = parseCustomStyle(styleDef);
            }
            return {
                arrowSize: +d.arrowSize || 1,
                bendSize: +d.bendSize || 0.3,
                direction: directionToDagre(d.direction),
                gutter: +d.gutter || 5,
                edgeMargin: (+d.edgeMargin) || 0,
                gravity: +((_a = d.gravity) !== null && _a !== void 0 ? _a : 1),
                edges: d.edges == 'hard' ? 'hard' : 'rounded',
                fill: (d.fill || '#eee8d5;#fdf6e3;#eee8d5;#fdf6e3').split(';'),
                background: d.background || 'transparent',
                fillArrows: d.fillArrows === 'true',
                font: d.font || 'Helvetica',
                fontSize: (+d.fontSize) || 12,
                leading: (+d.leading) || 1.25,
                lineWidth: (+d.lineWidth) || 3,
                padding: (+d.padding) || 8,
                spacing: (+d.spacing) || 40,
                stroke: d.stroke || '#33322E',
                title: d.title || '',
                zoom: +d.zoom || 1,
                acyclicer: d.acyclicer === 'greedy' ? 'greedy' : undefined,
                ranker: parseRanker(d.ranker),
                styles: nomnoml.skanaar.merged(nomnoml.styles, userStyles)
            };
        }
    }
    nomnoml.parse = parse;
    function intermediateParse(source) {
        return nomnomlCoreParser.parse(source);
    }
    nomnoml.intermediateParse = intermediateParse;
    function transformParseIntoSyntaxTree(entity) {
        function isAstClassifier(obj) {
            return obj.parts !== undefined;
        }
        function isAstRelation(obj) {
            return obj.assoc !== undefined;
        }
        function isAstCompartment(obj) {
            return Array.isArray(obj);
        }
        var relationId = 0;
        function transformCompartment(slots) {
            var lines = [];
            var rawClassifiers = [];
            var relations = [];
            slots.forEach(function (p) {
                if (typeof p === 'string')
                    lines.push(p);
                if (isAstRelation(p)) {
                    rawClassifiers.push(p.start);
                    rawClassifiers.push(p.end);
                    relations.push({
                        id: relationId++,
                        assoc: p.assoc,
                        start: p.start.parts[0][0],
                        end: p.end.parts[0][0],
                        startLabel: { text: p.startLabel },
                        endLabel: { text: p.endLabel }
                    });
                }
                if (isAstClassifier(p)) {
                    rawClassifiers.push(p);
                }
            });
            var allClassifiers = rawClassifiers
                .map(transformClassifier)
                .sort(function (a, b) {
                return b.compartments.length - a.compartments.length;
            });
            var uniqClassifiers = nomnoml.skanaar.uniqueBy(allClassifiers, 'name');
            var uniqRelations = relations.filter(function (a) {
                for (var _i = 0, relations_1 = relations; _i < relations_1.length; _i++) {
                    var b = relations_1[_i];
                    if (a === b)
                        return true;
                    if (b.start == a.start && b.end == a.end)
                        return false;
                }
                return true;
            });
            return new nomnoml.Compartment(lines, uniqClassifiers, uniqRelations);
        }
        function transformClassifier(entity) {
            var compartments = entity.parts.map(transformCompartment);
            return new nomnoml.Classifier(entity.type, entity.id, compartments);
        }
        return transformCompartment(entity);
    }
    nomnoml.transformParseIntoSyntaxTree = transformParseIntoSyntaxTree;
})(nomnoml || (nomnoml = {}));
var nomnoml;
(function (nomnoml) {
    function render(graphics, config, compartment, setFont) {
        var g = graphics;
        var vm = nomnoml.skanaar.vector;
        function renderCompartment(compartment, color, style, level) {
            g.save();
            g.translate(compartment.offset.x, compartment.offset.y);
            g.fillStyle(color || config.stroke);
            compartment.lines.forEach(function (text, i) {
                g.textAlign(style.center ? 'center' : 'left');
                var x = style.center ? compartment.width / 2 - config.padding : 0;
                var y = (0.5 + (i + 0.5) * config.leading) * config.fontSize;
                if (text) {
                    g.fillText(text, x, y);
                }
                if (style.underline) {
                    var w = g.measureText(text).width;
                    y += Math.round(config.fontSize * 0.2) + 0.5;
                    if (style.center) {
                        g.path([{ x: x - w / 2, y: y }, { x: x + w / 2, y: y }]).stroke();
                    }
                    else {
                        g.path([{ x: x, y: y }, { x: x + w, y: y }]).stroke();
                    }
                    g.lineWidth(config.lineWidth);
                }
            });
            g.translate(config.gutter, config.gutter);
            compartment.relations.forEach(function (r) { renderRelation(r); });
            compartment.nodes.forEach(function (n) { renderNode(n, level); });
            g.restore();
        }
        function renderNode(node, level) {
            var x = Math.round(node.x - node.width / 2);
            var y = Math.round(node.y - node.height / 2);
            var style = config.styles[node.type] || nomnoml.styles.CLASS;
            g.fillStyle(style.fill || config.fill[level] || nomnoml.skanaar.last(config.fill));
            g.strokeStyle(style.stroke || config.stroke);
            if (style.dashed) {
                var dash = Math.max(4, 2 * config.lineWidth);
                g.setLineDash([dash, dash]);
            }
            var drawNode = nomnoml.visualizers[style.visual] || nomnoml.visualizers.class;
            g.setData('name', node.name);
            drawNode(node, x, y, config, g);
            g.setLineDash([]);
            g.save();
            g.translate(x, y);
            node.compartments.forEach(function (part, i) {
                var textStyle = i == 0 ? style.title : style.body;
                if (style.empty)
                    return;
                g.save();
                g.translate(part.x, part.y);
                setFont(config, textStyle.bold ? 'bold' : 'normal', textStyle.italic ? 'italic' : undefined);
                renderCompartment(part, style.stroke, textStyle, level + 1);
                g.restore();
            });
            for (var _i = 0, _a = node.dividers; _i < _a.length; _i++) {
                var divider = _a[_i];
                g.path(divider).stroke();
            }
            g.restore();
        }
        function strokePath(p) {
            if (config.edges === 'rounded') {
                var radius = config.spacing * config.bendSize;
                g.beginPath();
                g.moveTo(p[0].x, p[0].y);
                for (var i = 1; i < p.length - 1; i++) {
                    g.arcTo(p[i].x, p[i].y, p[i + 1].x, p[i + 1].y, radius);
                }
                g.lineTo(nomnoml.skanaar.last(p).x, nomnoml.skanaar.last(p).y);
                g.stroke();
            }
            else
                g.path(p).stroke();
        }
        var empty = false, filled = true, diamond = true;
        function renderLabel(label) {
            if (!label || !label.text)
                return;
            var fontSize = config.fontSize;
            var lines = label.text.split('`');
            lines.forEach(function (l, i) { return g.fillText(l, label.x, label.y + fontSize * (i + 1)); });
        }
        function renderRelation(r) {
            var start = r.path[1];
            var end = r.path[r.path.length - 2];
            var path = r.path.slice(1, -1);
            g.fillStyle(config.stroke);
            setFont(config, 'normal');
            renderLabel(r.startLabel);
            renderLabel(r.endLabel);
            if (r.assoc !== '-/-' && r.assoc !== '_/_') {
                if (nomnoml.skanaar.hasSubstring(r.assoc, '--') || nomnoml.skanaar.hasSubstring(r.assoc, '__')) {
                    var dash = Math.max(4, 2 * config.lineWidth);
                    g.setLineDash([dash, dash]);
                    strokePath(path);
                    g.setLineDash([]);
                }
                else
                    strokePath(path);
            }
            function drawArrowEnd(id, path, end) {
                if (id === '>' || id === '<')
                    drawArrow(path, filled, end, false);
                else if (id === ':>' || id === '<:')
                    drawArrow(path, empty, end, false);
                else if (id === '+')
                    drawArrow(path, filled, end, diamond);
                else if (id === 'o')
                    drawArrow(path, empty, end, diamond);
            }
            var tokens = r.assoc.split(/[-_]/);
            drawArrowEnd(nomnoml.skanaar.last(tokens), path, end);
            drawArrowEnd(tokens[0], path.reverse(), start);
        }
        function drawArrow(path, isOpen, arrowPoint, diamond) {
            var size = config.spacing * config.arrowSize / 30;
            var v = vm.diff(path[path.length - 2], nomnoml.skanaar.last(path));
            var nv = vm.normalize(v);
            function getArrowBase(s) { return vm.add(arrowPoint, vm.mult(nv, s * size)); }
            var arrowBase = getArrowBase(diamond ? 7 : 10);
            var t = vm.rot(nv);
            var arrowButt = (diamond) ? getArrowBase(14)
                : (isOpen && !config.fillArrows) ? getArrowBase(5) : arrowBase;
            var arrow = [
                vm.add(arrowBase, vm.mult(t, 4 * size)),
                arrowButt,
                vm.add(arrowBase, vm.mult(t, -4 * size)),
                arrowPoint
            ];
            g.fillStyle(isOpen ? config.stroke : config.fill[0]);
            g.circuit(arrow).fillAndStroke();
        }
        function snapToPixels() {
            if (config.lineWidth % 2 === 1)
                g.translate(0.5, 0.5);
        }
        function setBackground() {
            g.clear();
            g.save();
            g.strokeStyle('transparent');
            g.fillStyle(config.background);
            g.rect(0, 0, compartment.width, compartment.height).fill();
            g.restore();
        }
        g.save();
        g.scale(config.zoom, config.zoom);
        setBackground();
        setFont(config, 'bold');
        g.lineWidth(config.lineWidth);
        g.lineJoin('round');
        g.lineCap('round');
        g.strokeStyle(config.stroke);
        snapToPixels();
        renderCompartment(compartment, undefined, nomnoml.buildStyle({}, {}).title, 0);
        g.restore();
    }
    nomnoml.render = render;
})(nomnoml || (nomnoml = {}));
var nomnoml;
(function (nomnoml) {
    var skanaar;
    (function (skanaar) {
        function Canvas(canvas, callbacks) {
            var ctx = canvas.getContext('2d');
            var mousePos = { x: 0, y: 0 };
            var twopi = 2 * 3.1416;
            function mouseEventToPos(event) {
                var e = canvas;
                return {
                    x: event.clientX - e.getBoundingClientRect().left - e.clientLeft + e.scrollLeft,
                    y: event.clientY - e.getBoundingClientRect().top - e.clientTop + e.scrollTop
                };
            }
            if (callbacks) {
                canvas.addEventListener('mousedown', function (event) {
                    if (callbacks.mousedown)
                        callbacks.mousedown(mouseEventToPos(event));
                });
                canvas.addEventListener('mouseup', function (event) {
                    if (callbacks.mouseup)
                        callbacks.mouseup(mouseEventToPos(event));
                });
                canvas.addEventListener('mousemove', function (event) {
                    mousePos = mouseEventToPos(event);
                    if (callbacks.mousemove)
                        callbacks.mousemove(mouseEventToPos(event));
                });
            }
            var chainable = {
                stroke: function () {
                    ctx.stroke();
                    return chainable;
                },
                fill: function () {
                    ctx.fill();
                    return chainable;
                },
                fillAndStroke: function () {
                    ctx.fill();
                    ctx.stroke();
                    return chainable;
                }
            };
            function tracePath(path, offset, s) {
                s = s === undefined ? 1 : s;
                offset = offset || { x: 0, y: 0 };
                ctx.beginPath();
                ctx.moveTo(offset.x + s * path[0].x, offset.y + s * path[0].y);
                for (var i = 1, len = path.length; i < len; i++)
                    ctx.lineTo(offset.x + s * path[i].x, offset.y + s * path[i].y);
                return chainable;
            }
            return {
                mousePos: function () { return mousePos; },
                width: function () { return canvas.width; },
                height: function () { return canvas.height; },
                clear: function () {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                },
                circle: function (p, r) {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, r, 0, twopi);
                    return chainable;
                },
                ellipse: function (center, rx, ry, start, stop) {
                    if (start === undefined)
                        start = 0;
                    if (stop === undefined)
                        stop = twopi;
                    ctx.beginPath();
                    ctx.save();
                    ctx.translate(center.x, center.y);
                    ctx.scale(1, ry / rx);
                    ctx.arc(0, 0, rx / 2, start, stop);
                    ctx.restore();
                    return chainable;
                },
                arc: function (x, y, r, start, stop) {
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.arc(x, y, r, start, stop);
                    return chainable;
                },
                roundRect: function (x, y, w, h, r) {
                    ctx.beginPath();
                    ctx.moveTo(x + r, y);
                    ctx.arcTo(x + w, y, x + w, y + r, r);
                    ctx.lineTo(x + w, y + h - r);
                    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
                    ctx.lineTo(x + r, y + h);
                    ctx.arcTo(x, y + h, x, y + h - r, r);
                    ctx.lineTo(x, y + r);
                    ctx.arcTo(x, y, x + r, y, r);
                    ctx.closePath();
                    return chainable;
                },
                rect: function (x, y, w, h) {
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(x + w, y);
                    ctx.lineTo(x + w, y + h);
                    ctx.lineTo(x, y + h);
                    ctx.closePath();
                    return chainable;
                },
                path: tracePath,
                circuit: function (path, offset, s) {
                    tracePath(path, offset, s);
                    ctx.closePath();
                    return chainable;
                },
                setFont: function (font, bold, ital, fontSize) {
                    ctx.font = bold + " " + (ital || '') + " " + fontSize + "pt " + font + ", Helvetica, sans-serif";
                },
                fillStyle: function (s) { ctx.fillStyle = s; },
                strokeStyle: function (s) { ctx.strokeStyle = s; },
                textAlign: function (a) { ctx.textAlign = a; },
                lineCap: function (cap) { ctx.lineCap = cap; },
                lineJoin: function (join) { ctx.lineJoin = join; },
                lineWidth: function (w) { ctx.lineWidth = w; },
                arcTo: function () { return ctx.arcTo.apply(ctx, arguments); },
                beginPath: function () { return ctx.beginPath.apply(ctx, arguments); },
                fillText: function () { return ctx.fillText.apply(ctx, arguments); },
                lineTo: function () { return ctx.lineTo.apply(ctx, arguments); },
                measureText: function () { return ctx.measureText.apply(ctx, arguments); },
                moveTo: function () { return ctx.moveTo.apply(ctx, arguments); },
                restore: function () { return ctx.restore.apply(ctx, arguments); },
                setData: function (name, value) { },
                save: function () { return ctx.save.apply(ctx, arguments); },
                scale: function () { return ctx.scale.apply(ctx, arguments); },
                setLineDash: function () { return ctx.setLineDash.apply(ctx, arguments); },
                stroke: function () { return ctx.stroke.apply(ctx, arguments); },
                translate: function () { return ctx.translate.apply(ctx, arguments); }
            };
        }
        skanaar.Canvas = Canvas;
    })(skanaar = nomnoml.skanaar || (nomnoml.skanaar = {}));
})(nomnoml || (nomnoml = {}));
var nomnoml;
(function (nomnoml) {
    var skanaar;
    (function (skanaar) {
        function xmlEncode(str) {
            return (str !== null && str !== void 0 ? str : '').toString()
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&apos;');
        }
        skanaar.charWidths = { "0": 10, "1": 10, "2": 10, "3": 10, "4": 10, "5": 10, "6": 10, "7": 10, "8": 10, "9": 10, " ": 5, "!": 5, "\"": 6, "#": 10, "$": 10, "%": 15, "&": 11, "'": 4, "(": 6, ")": 6, "*": 7, "+": 10, ",": 5, "-": 6, ".": 5, "/": 5, ":": 5, ";": 5, "<": 10, "=": 10, ">": 10, "?": 10, "@": 17, "A": 11, "B": 11, "C": 12, "D": 12, "E": 11, "F": 10, "G": 13, "H": 12, "I": 5, "J": 9, "K": 11, "L": 10, "M": 14, "N": 12, "O": 13, "P": 11, "Q": 13, "R": 12, "S": 11, "T": 10, "U": 12, "V": 11, "W": 16, "X": 11, "Y": 11, "Z": 10, "[": 5, "\\": 5, "]": 5, "^": 8, "_": 10, "`": 6, "a": 10, "b": 10, "c": 9, "d": 10, "e": 10, "f": 5, "g": 10, "h": 10, "i": 4, "j": 4, "k": 9, "l": 4, "m": 14, "n": 10, "o": 10, "p": 10, "q": 10, "r": 6, "s": 9, "t": 5, "u": 10, "v": 9, "w": 12, "x": 9, "y": 9, "z": 9, "{": 6, "|": 5, "}": 6, "~": 10 };
        function Svg(globalStyle, document) {
            var initialState = {
                x: 0,
                y: 0,
                stroke: 'none',
                strokeWidth: 1,
                dashArray: 'none',
                fill: 'none',
                textAlign: 'left',
                font: 'Helvetica, Arial, sans-serif',
                fontSize: 12,
                attributes: {}
            };
            var states = [initialState];
            var elements = [];
            var measurementCanvas = document ? document.createElement('canvas') : null;
            var ctx = measurementCanvas ? measurementCanvas.getContext('2d') : null;
            var Element = (function () {
                function Element(name, attr, content) {
                    this.name = name;
                    this.attr = attr;
                    this.content = content || undefined;
                }
                Element.prototype.stroke = function () {
                    var base = this.attr.style || '';
                    this.attr.style = base +
                        'stroke:' + lastDefined('stroke') +
                        ';fill:none' +
                        ';stroke-dasharray:' + lastDefined('dashArray') +
                        ';stroke-width:' + lastDefined('strokeWidth') + ';';
                    return this;
                };
                Element.prototype.fill = function () {
                    var base = this.attr.style || '';
                    this.attr.style = base + 'stroke:none; fill:' + lastDefined('fill') + ';';
                    return this;
                };
                Element.prototype.fillAndStroke = function () {
                    var base = this.attr.style || '';
                    this.attr.style = base +
                        'stroke:' + lastDefined('stroke') +
                        ';fill:' + lastDefined('fill') +
                        ';stroke-dasharray:' + lastDefined('dashArray') +
                        ';stroke-width:' + lastDefined('strokeWidth') + ';';
                    return this;
                };
                return Element;
            }());
            function State(dx, dy) {
                return {
                    x: dx,
                    y: dy,
                    stroke: null,
                    strokeWidth: null,
                    fill: null,
                    textAlign: null,
                    dashArray: 'none',
                    font: null,
                    fontSize: null,
                    attributes: null
                };
            }
            function trans(coord, axis) {
                states.forEach(function (t) { coord += t[axis]; });
                return coord;
            }
            function tX(coord) { return Math.round(10 * trans(coord, 'x')) / 10; }
            function tY(coord) { return Math.round(10 * trans(coord, 'y')) / 10; }
            function lastDefined(property) {
                for (var i = states.length - 1; i >= 0; i--)
                    if (states[i][property])
                        return states[i][property];
                return undefined;
            }
            function last(list) { return list[list.length - 1]; }
            function tracePath(path, offset, s) {
                s = s === undefined ? 1 : s;
                offset = offset || { x: 0, y: 0 };
                var d = path.map(function (e, i) {
                    return (i ? 'L' : 'M') + tX(offset.x + s * e.x) + ' ' + tY(offset.y + s * e.y);
                }).join(' ');
                return newElement('path', { d: d });
            }
            function newElement(type, attr, content) {
                var element = new Element(type, attr, content);
                var extraData = lastDefined('attributes');
                for (var key in extraData) {
                    element.attr['data-' + key] = extraData[key];
                }
                elements.push(element);
                return element;
            }
            return {
                width: function () { return 0; },
                height: function () { return 0; },
                clear: function () { },
                circle: function (p, r) {
                    return newElement('circle', { r: r, cx: tX(p.x), cy: tY(p.y) });
                },
                ellipse: function (center, w, h, start, stop) {
                    if (stop) {
                        var y = tY(center.y);
                        return newElement('path', { d: 'M' + tX(center.x - w / 2) + ' ' + y +
                                'A' + w / 2 + ' ' + h / 2 + ' 0 1 0 ' + tX(center.x + w / 2) + ' ' + y
                        });
                    }
                    else {
                        return newElement('ellipse', { cx: tX(center.x), cy: tY(center.y), rx: w / 2, ry: h / 2 });
                    }
                },
                arc: function (x, y, r) {
                    return newElement('ellipse', { cx: tX(x), cy: tY(y), rx: r, ry: r });
                },
                roundRect: function (x, y, w, h, r) {
                    return newElement('rect', { x: tX(x), y: tY(y), rx: r, ry: r, height: h, width: w });
                },
                rect: function (x, y, w, h) {
                    return newElement('rect', { x: tX(x), y: tY(y), height: h, width: w });
                },
                path: tracePath,
                circuit: function (path, offset, s) {
                    var element = tracePath(path, offset, s);
                    element.attr.d += ' Z';
                    return element;
                },
                setFont: function (font, bold, ital, fontSize) {
                    var font = bold + " " + (ital || '') + " " + fontSize + "pt " + font + ", Helvetica, sans-serif";
                    last(states).font = font;
                    last(states).fontSize = fontSize;
                },
                strokeStyle: function (stroke) {
                    last(states).stroke = stroke;
                },
                fillStyle: function (fill) {
                    last(states).fill = fill;
                },
                arcTo: function (x1, y1, x2, y2) {
                    last(elements).attr.d += ('L' + tX(x1) + ' ' + tY(y1) + ' L' + tX(x2) + ' ' + tY(y2) + ' ');
                },
                beginPath: function () {
                    return newElement('path', { d: '' });
                },
                fillText: function (text, x, y) {
                    var attr = { x: tX(x), y: tY(y), style: 'fill: ' + last(states).fill + ';' };
                    var font = lastDefined('font');
                    if (font) {
                        attr.style += 'font:' + font + ';';
                    }
                    if (lastDefined('textAlign') === 'center') {
                        attr.style += 'text-anchor: middle;';
                    }
                    return newElement('text', attr, text);
                },
                lineCap: function (cap) { globalStyle += ';stroke-linecap:' + cap; },
                lineJoin: function (join) { globalStyle += ';stroke-linejoin:' + join; },
                lineTo: function (x, y) {
                    last(elements).attr.d += ('L' + tX(x) + ' ' + tY(y) + ' ');
                    return last(elements);
                },
                lineWidth: function (w) {
                    last(states).strokeWidth = w;
                },
                measureText: function (s) {
                    if (ctx) {
                        ctx.font = lastDefined('font') || 'normal 12pt Helvetica';
                        return ctx.measureText(s);
                    }
                    else {
                        return {
                            width: skanaar.sum(s, function (c) {
                                var scale = lastDefined('fontSize') / 12;
                                if (skanaar.charWidths[c]) {
                                    return skanaar.charWidths[c] * scale;
                                }
                                return 16 * scale;
                            })
                        };
                    }
                },
                moveTo: function (x, y) {
                    last(elements).attr.d += ('M' + tX(x) + ' ' + tY(y) + ' ');
                },
                restore: function () {
                    states.pop();
                },
                save: function () {
                    states.push(State(0, 0));
                },
                setData: function (name, value) {
                    lastDefined('attributes')[name] = value;
                },
                scale: function () { },
                setLineDash: function (d) {
                    last(states).dashArray = (d.length === 0) ? 'none' : d[0] + ' ' + d[1];
                },
                stroke: function () {
                    last(elements).stroke();
                },
                textAlign: function (a) {
                    last(states).textAlign = a;
                },
                translate: function (dx, dy) {
                    last(states).x += dx;
                    last(states).y += dy;
                },
                serialize: function (size, desc, title) {
                    function toAttr(obj) {
                        return Object.keys(obj).map(function (key) { return key + "=\"" + xmlEncode(obj[key]) + "\""; }).join(' ');
                    }
                    function toHtml(e) {
                        return "<" + e.name + " " + toAttr(e.attr) + ">" + xmlEncode(e.content) + "</" + e.name + ">";
                    }
                    var elementsToSerialize = elements;
                    if (desc) {
                        elementsToSerialize.unshift(new Element('desc', {}, desc));
                    }
                    if (title) {
                        elementsToSerialize.unshift(new Element('title', {}, title));
                    }
                    var innerSvg = elementsToSerialize.map(toHtml).join('\n  ');
                    var attrs = {
                        version: '1.1',
                        baseProfile: 'full',
                        width: size.width,
                        height: size.height,
                        viewbox: '0 0 ' + size.width + ' ' + size.height,
                        xmlns: 'http://www.w3.org/2000/svg',
                        'xmlns:xlink': 'http://www.w3.org/1999/xlink',
                        'xmlns:ev': 'http://www.w3.org/2001/xml-events',
                        style: 'font:' + lastDefined('font') + ';' + globalStyle,
                    };
                    return '<svg ' + toAttr(attrs) + '>\n  ' + innerSvg + '\n</svg>';
                }
            };
        }
        skanaar.Svg = Svg;
    })(skanaar = nomnoml.skanaar || (nomnoml.skanaar = {}));
})(nomnoml || (nomnoml = {}));
var nomnoml;
(function (nomnoml) {
    var skanaar;
    (function (skanaar) {
        function range(_a, count) {
            var min = _a[0], max = _a[1];
            var output = [];
            for (var i = 0; i < count; i++)
                output.push(min + (max - min) * i / (count - 1));
            return output;
        }
        skanaar.range = range;
        function sum(list, transform) {
            for (var i = 0, summation = 0, len = list.length; i < len; i++)
                summation += transform(list[i]);
            return summation;
        }
        skanaar.sum = sum;
        function find(list, predicate) {
            for (var i = 0; i < list.length; i++)
                if (predicate(list[i]))
                    return list[i];
            return undefined;
        }
        skanaar.find = find;
        function last(list) {
            return list[list.length - 1];
        }
        skanaar.last = last;
        function hasSubstring(haystack, needle) {
            if (needle === '')
                return true;
            if (!haystack)
                return false;
            return haystack.indexOf(needle) !== -1;
        }
        skanaar.hasSubstring = hasSubstring;
        function merged(a, b) {
            function assign(target, data) {
                for (var key in data)
                    target[key] = data[key];
            }
            var obj = {};
            assign(obj, a);
            assign(obj, b);
            return obj;
        }
        skanaar.merged = merged;
        function indexBy(list, key) {
            var obj = {};
            for (var i = 0; i < list.length; i++)
                obj[list[i][key]] = list[i];
            return obj;
        }
        skanaar.indexBy = indexBy;
        function uniqueBy(list, property) {
            var seen = {};
            var out = [];
            for (var i = 0; i < list.length; i++) {
                var key = list[i][property];
                if (!seen[key]) {
                    seen[key] = true;
                    out.push(list[i]);
                }
            }
            return out;
        }
        skanaar.uniqueBy = uniqueBy;
    })(skanaar = nomnoml.skanaar || (nomnoml.skanaar = {}));
})(nomnoml || (nomnoml = {}));
var nomnoml;
(function (nomnoml) {
    var skanaar;
    (function (skanaar) {
        skanaar.vector = {
            dist: function (a, b) { return skanaar.vector.mag(skanaar.vector.diff(a, b)); },
            add: function (a, b) { return { x: a.x + b.x, y: a.y + b.y }; },
            diff: function (a, b) { return { x: a.x - b.x, y: a.y - b.y }; },
            mult: function (v, factor) { return { x: factor * v.x, y: factor * v.y }; },
            mag: function (v) { return Math.sqrt(v.x * v.x + v.y * v.y); },
            normalize: function (v) { return skanaar.vector.mult(v, 1 / skanaar.vector.mag(v)); },
            rot: function (a) { return { x: a.y, y: -a.x }; }
        };
    })(skanaar = nomnoml.skanaar || (nomnoml.skanaar = {}));
})(nomnoml || (nomnoml = {}));
var nomnoml;
(function (nomnoml) {
    nomnoml.styles = {
        ABSTRACT: nomnoml.buildStyle({ visual: 'class' }, { center: true, italic: true }),
        ACTOR: nomnoml.buildStyle({ visual: 'actor' }, { center: true }, { center: true }),
        CHOICE: nomnoml.buildStyle({ visual: 'rhomb' }, { center: true }, { center: true }),
        CLASS: nomnoml.buildStyle({ visual: 'class' }, { center: true, bold: true }),
        DATABASE: nomnoml.buildStyle({ visual: 'database' }, { center: true, bold: true }, { center: true }),
        END: nomnoml.buildStyle({ visual: 'end', empty: true }, {}),
        FRAME: nomnoml.buildStyle({ visual: 'frame' }, {}),
        HIDDEN: nomnoml.buildStyle({ visual: 'hidden', empty: true }, {}),
        INPUT: nomnoml.buildStyle({ visual: 'input' }, { center: true }),
        INSTANCE: nomnoml.buildStyle({ visual: 'class' }, { center: true, underline: true }),
        LABEL: nomnoml.buildStyle({ visual: 'none' }, {}),
        NOTE: nomnoml.buildStyle({ visual: 'note' }, {}),
        PACKAGE: nomnoml.buildStyle({ visual: 'package' }, {}),
        RECEIVER: nomnoml.buildStyle({ visual: 'receiver' }, {}),
        REFERENCE: nomnoml.buildStyle({ visual: 'class', dashed: true }, { center: true }),
        SENDER: nomnoml.buildStyle({ visual: 'sender' }, {}),
        START: nomnoml.buildStyle({ visual: 'start', empty: true }, {}),
        STATE: nomnoml.buildStyle({ visual: 'roundrect' }, { center: true }),
        TABLE: nomnoml.buildStyle({ visual: 'table' }, { center: true, bold: true }),
        TRANSCEIVER: nomnoml.buildStyle({ visual: 'transceiver' }, {}),
        USECASE: nomnoml.buildStyle({ visual: 'ellipse' }, { center: true }, { center: true }),
    };
    function box(config, clas) {
        clas.width = Math.max.apply(Math, clas.compartments.map(function (e) { return e.width; }));
        clas.height = nomnoml.skanaar.sum(clas.compartments, function (e) { return e.height; });
        clas.dividers = [];
        var y = 0;
        for (var _i = 0, _a = clas.compartments; _i < _a.length; _i++) {
            var comp = _a[_i];
            comp.x = 0;
            comp.y = y;
            comp.width = clas.width;
            y += comp.height;
            if (comp != nomnoml.skanaar.last(clas.compartments))
                clas.dividers.push([{ x: 0, y: y }, { x: clas.width, y: y }]);
        }
    }
    function icon(config, clas) {
        clas.dividers = [];
        clas.compartments = [];
        clas.width = config.fontSize * 2.5;
        clas.height = config.fontSize * 2.5;
    }
    nomnoml.layouters = {
        actor: function (config, clas) {
            clas.width = Math.max.apply(Math, __spreadArrays([config.padding * 2], clas.compartments.map(function (e) { return e.width; })));
            clas.height = config.padding * 3 + nomnoml.skanaar.sum(clas.compartments, function (e) { return e.height; });
            clas.dividers = [];
            var y = config.padding * 3;
            for (var _i = 0, _a = clas.compartments; _i < _a.length; _i++) {
                var comp = _a[_i];
                comp.x = 0;
                comp.y = y;
                comp.width = clas.width;
                y += comp.height;
                if (comp != nomnoml.skanaar.last(clas.compartments))
                    clas.dividers.push([{ x: config.padding, y: y }, { x: clas.width - config.padding, y: y }]);
            }
        },
        class: box,
        database: function (config, clas) {
            clas.width = Math.max.apply(Math, clas.compartments.map(function (e) { return e.width; }));
            clas.height = nomnoml.skanaar.sum(clas.compartments, function (e) { return e.height; }) + config.padding * 2;
            clas.dividers = [];
            var y = config.padding * 1.5;
            for (var _i = 0, _a = clas.compartments; _i < _a.length; _i++) {
                var comp = _a[_i];
                comp.x = 0;
                comp.y = y;
                comp.width = clas.width;
                y += comp.height;
                if (comp != nomnoml.skanaar.last(clas.compartments)) {
                    var path = nomnoml.skanaar.range([0, Math.PI], 16).map(function (a) { return ({
                        x: clas.width * 0.5 * (1 - Math.cos(a)),
                        y: y + config.padding * (0.75 * Math.sin(a) - 0.5),
                    }); });
                    clas.dividers.push(path);
                }
            }
        },
        ellipse: function (config, clas) {
            var width = Math.max.apply(Math, clas.compartments.map(function (e) { return e.width; }));
            var height = nomnoml.skanaar.sum(clas.compartments, function (e) { return e.height; });
            clas.width = width * 1.25;
            clas.height = height * 1.25;
            clas.dividers = [];
            var y = height * 0.125;
            var sq = function (x) { return x * x; };
            var rimPos = function (y) { return Math.sqrt(sq(0.5) - sq(y / clas.height - 0.5)) * clas.width; };
            for (var _i = 0, _a = clas.compartments; _i < _a.length; _i++) {
                var comp = _a[_i];
                comp.x = width * 0.125;
                comp.y = y;
                comp.width = width;
                y += comp.height;
                if (comp != nomnoml.skanaar.last(clas.compartments))
                    clas.dividers.push([
                        { x: clas.width / 2 + rimPos(y) - 1, y: y },
                        { x: clas.width / 2 - rimPos(y) + 1, y: y }
                    ]);
            }
        },
        end: icon,
        frame: function (config, clas) {
            var w = clas.compartments[0].width;
            var h = clas.compartments[0].height;
            box(config, clas);
            if (clas.dividers.length)
                clas.dividers.shift();
            clas.dividers.unshift([
                { x: 0, y: h },
                { x: w - h / 4, y: h },
                { x: w + h / 4, y: h / 2 },
                { x: w + h / 4, y: 0 }
            ]);
        },
        hidden: function (config, clas) {
            clas.dividers = [];
            clas.compartments = [];
            clas.width = 1;
            clas.height = 1;
        },
        input: box,
        none: box,
        note: box,
        package: box,
        receiver: box,
        rhomb: function (config, clas) {
            var width = Math.max.apply(Math, clas.compartments.map(function (e) { return e.width; }));
            var height = nomnoml.skanaar.sum(clas.compartments, function (e) { return e.height; });
            clas.width = width * 1.5;
            clas.height = height * 1.5;
            clas.dividers = [];
            var y = height * 0.25;
            for (var _i = 0, _a = clas.compartments; _i < _a.length; _i++) {
                var comp = _a[_i];
                comp.x = width * 0.25;
                comp.y = y;
                comp.width = width;
                y += comp.height;
                var slope = clas.width / clas.height;
                if (comp != nomnoml.skanaar.last(clas.compartments))
                    clas.dividers.push([
                        { x: clas.width / 2 + (y < clas.height / 2 ? y * slope : (clas.height - y) * slope), y: y },
                        { x: clas.width / 2 - (y < clas.height / 2 ? y * slope : (clas.height - y) * slope), y: y }
                    ]);
            }
        },
        roundrect: box,
        sender: box,
        start: icon,
        table: function (config, clas) {
            if (clas.compartments.length == 1) {
                box(config, clas);
                return;
            }
            var gridcells = clas.compartments.slice(1);
            var rows = [[]];
            function isRowBreak(e) {
                return !e.lines.length && !e.nodes.length && !e.relations.length;
            }
            function isRowFull(e) {
                var current = nomnoml.skanaar.last(rows);
                return rows[0] != current && rows[0].length == current.length;
            }
            function isEnd(e) {
                return comp == nomnoml.skanaar.last(gridcells);
            }
            for (var _i = 0, gridcells_1 = gridcells; _i < gridcells_1.length; _i++) {
                var comp = gridcells_1[_i];
                if (!isEnd(comp) && isRowBreak(comp) && nomnoml.skanaar.last(rows).length) {
                    rows.push([]);
                }
                else if (isRowFull(comp)) {
                    rows.push([comp]);
                }
                else {
                    nomnoml.skanaar.last(rows).push(comp);
                }
            }
            var header = clas.compartments[0];
            var cellW = Math.max.apply(Math, __spreadArrays([header.width / rows[0].length], gridcells.map(function (e) { return e.width; })));
            var cellH = Math.max.apply(Math, gridcells.map(function (e) { return e.height; }));
            clas.width = cellW * rows[0].length;
            clas.height = header.height + cellH * rows.length;
            var hh = header.height;
            clas.dividers = __spreadArrays([
                [{ x: 0, y: header.height }, { x: 0, y: header.height }]
            ], rows.map(function (e, i) { return [{ x: 0, y: hh + i * cellH }, { x: clas.width, y: hh + i * cellH }]; }), rows[0].map(function (e, i) { return [{ x: (i + 1) * cellW, y: hh }, { x: (i + 1) * cellW, y: clas.height }]; }));
            header.x = 0;
            header.y = 0;
            header.width = clas.width;
            for (var i = 0; i < rows.length; i++) {
                for (var j = 0; j < rows[i].length; j++) {
                    var cell = rows[i][j];
                    cell.x = j * cellW;
                    cell.y = hh + i * cellH;
                    cell.width = cellW;
                }
            }
        },
        transceiver: box,
    };
    nomnoml.visualizers = {
        actor: function (node, x, y, config, g) {
            var a = config.padding / 2;
            var yp = y + a * 4;
            var faceCenter = { x: node.x, y: yp - a };
            g.circle(faceCenter, a).fillAndStroke();
            g.path([{ x: node.x, y: yp }, { x: node.x, y: yp + 2 * a }]).stroke();
            g.path([{ x: node.x - a, y: yp + a }, { x: node.x + a, y: yp + a }]).stroke();
            g.path([{ x: node.x - a, y: yp + a + config.padding },
                { x: node.x, y: yp + config.padding },
                { x: node.x + a, y: yp + a + config.padding }]).stroke();
        },
        class: function (node, x, y, config, g) {
            g.rect(x, y, node.width, node.height).fillAndStroke();
        },
        database: function (node, x, y, config, g) {
            var pad = config.padding;
            var cy = y - pad / 2;
            var pi = 3.1416;
            g.rect(x, y + pad, node.width, node.height - pad * 1.5).fill();
            g.path([{ x: x, y: cy + pad * 1.5 }, { x: x, y: cy - pad * 0.5 + node.height }]).stroke();
            g.path([
                { x: x + node.width, y: cy + pad * 1.5 },
                { x: x + node.width, y: cy - pad * 0.5 + node.height }
            ]).stroke();
            g.ellipse({ x: node.x, y: cy + pad * 1.5 }, node.width, pad * 1.5).fillAndStroke();
            g.ellipse({ x: node.x, y: cy - pad * 0.5 + node.height }, node.width, pad * 1.5, 0, pi)
                .fillAndStroke();
        },
        ellipse: function (node, x, y, config, g) {
            g.ellipse({ x: node.x, y: node.y }, node.width, node.height).fillAndStroke();
        },
        end: function (node, x, y, config, g) {
            g.circle({ x: node.x, y: y + node.height / 2 }, node.height / 3).fillAndStroke();
            g.fillStyle(config.stroke);
            g.circle({ x: node.x, y: y + node.height / 2 }, node.height / 3 - config.padding / 2).fill();
        },
        frame: function (node, x, y, config, g) {
            g.rect(x, y, node.width, node.height).fillAndStroke();
        },
        hidden: function (node, x, y, config, g) {
        },
        input: function (node, x, y, config, g) {
            g.circuit([
                { x: x + config.padding, y: y },
                { x: x + node.width, y: y },
                { x: x + node.width - config.padding, y: y + node.height },
                { x: x, y: y + node.height }
            ]).fillAndStroke();
        },
        none: function (node, x, y, config, g) {
        },
        note: function (node, x, y, config, g) {
            g.circuit([
                { x: x, y: y },
                { x: x + node.width - config.padding, y: y },
                { x: x + node.width, y: y + config.padding },
                { x: x + node.width, y: y + node.height },
                { x: x, y: y + node.height },
                { x: x, y: y }
            ]).fillAndStroke();
            g.path([
                { x: x + node.width - config.padding, y: y },
                { x: x + node.width - config.padding, y: y + config.padding },
                { x: x + node.width, y: y + config.padding }
            ]).stroke();
        },
        package: function (node, x, y, config, g) {
            var headHeight = node.compartments[0].height;
            g.rect(x, y + headHeight, node.width, node.height - headHeight).fillAndStroke();
            var w = g.measureText(node.name).width + 2 * config.padding;
            g.circuit([
                { x: x, y: y + headHeight },
                { x: x, y: y },
                { x: x + w, y: y },
                { x: x + w, y: y + headHeight }
            ]).fillAndStroke();
        },
        receiver: function (node, x, y, config, g) {
            g.circuit([
                { x: x - config.padding, y: y },
                { x: x + node.width, y: y },
                { x: x + node.width, y: y + node.height },
                { x: x - config.padding, y: y + node.height },
                { x: x, y: y + node.height / 2 },
            ]).fillAndStroke();
        },
        rhomb: function (node, x, y, config, g) {
            g.circuit([
                { x: node.x, y: y },
                { x: x + node.width, y: node.y },
                { x: node.x, y: y + node.height },
                { x: x, y: node.y }
            ]).fillAndStroke();
        },
        roundrect: function (node, x, y, config, g) {
            var r = Math.min(config.padding * 2 * config.leading, node.height / 2);
            g.roundRect(x, y, node.width, node.height, r).fillAndStroke();
        },
        sender: function (node, x, y, config, g) {
            g.circuit([
                { x: x, y: y },
                { x: x + node.width - config.padding, y: y },
                { x: x + node.width, y: y + node.height / 2 },
                { x: x + node.width - config.padding, y: y + node.height },
                { x: x, y: y + node.height }
            ]).fillAndStroke();
        },
        start: function (node, x, y, config, g) {
            g.fillStyle(config.stroke);
            g.circle({ x: node.x, y: y + node.height / 2 }, node.height / 2.5).fill();
        },
        table: function (node, x, y, config, g) {
            g.rect(x, y, node.width, node.height).fillAndStroke();
        },
        transceiver: function (node, x, y, config, g) {
            g.circuit([
                { x: x - config.padding, y: y },
                { x: x + node.width, y: y },
                { x: x + node.width + config.padding, y: y + node.height / 2 },
                { x: x + node.width, y: y + node.height },
                { x: x - config.padding, y: y + node.height },
                { x: x, y: y + node.height / 2 }
            ]).fillAndStroke();
        },
    };
})(nomnoml || (nomnoml = {}));
;
/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var nomnomlCoreParser = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,5],$V1=[1,8],$V2=[5,6,12,14],$V3=[12,14],$V4=[1,22];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"root":3,"compartment":4,"EOF":5,"SEP":6,"slot":7,"IDENT":8,"class":9,"association":10,"parts":11,"|":12,"[":13,"]":14,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",6:"SEP",8:"IDENT",12:"|",13:"[",14:"]"},
productions_: [0,[3,2],[3,3],[3,4],[3,3],[7,1],[7,1],[7,1],[4,1],[4,3],[11,1],[11,3],[11,2],[10,3],[9,3]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1: case 2:
 return $$[$0-1] 
break;
case 3: case 4:
 return $$[$0-2] 
break;
case 5:
this.$ = $$[$0].trim().replace(/\\(\[|\]|\|)/g, '$'+'1');
break;
case 6: case 7:
this.$ = $$[$0];
break;
case 8: case 10:
this.$ = [$$[$0]];
break;
case 9:
this.$ = $$[$0-2].concat($$[$0]);
break;
case 11:
this.$ = $$[$0-2].concat([$$[$0]]);
break;
case 12:
this.$ = $$[$0-1].concat([[]]);
break;
case 13:

           var t = $$[$0-1].trim().replace(/\\(\[|\]|\|)/g, '$'+'1').match('^(.*?)([<:o+]*[-_]/?[-_]*[:o+>]*)(.*)$');
           if (!t) {
             throw new Error('line '+_$[$0].first_line+': Classifiers must be separated by a relation or a line break')
           }
           this.$ = {assoc:t[2], start:$$[$0-2], end:$$[$0], startLabel:t[1].trim(), endLabel:t[3].trim()};
  
break;
case 14:

           var type = 'CLASS';
           var id = $$[$0-1][0][0];
           var typeMatch = $$[$0-1][0][0].match('<([a-z]*)>(.*)');
           if (typeMatch) {
               type = typeMatch[1].toUpperCase();
               id = typeMatch[2].trim();
           }
           $$[$0-1][0][0] = id;
           this.$ = {type:type, id:id, parts:$$[$0-1]};
  
break;
}
},
table: [{3:1,4:2,6:[1,3],7:4,8:$V0,9:6,10:7,13:$V1},{1:[3]},{5:[1,9],6:[1,10]},{4:11,7:4,8:$V0,9:6,10:7,13:$V1},o($V2,[2,8]),o($V2,[2,5]),o($V2,[2,6],{8:[1,12]}),o($V2,[2,7]),{4:14,7:4,8:$V0,9:6,10:7,11:13,13:$V1},{1:[2,1]},{5:[1,15],7:16,8:$V0,9:6,10:7,13:$V1},{5:[1,17],6:[1,18]},{9:19,13:$V1},{12:[1,21],14:[1,20]},o($V3,[2,10],{6:$V4}),{1:[2,4]},o($V2,[2,9]),{1:[2,2]},{5:[1,23],7:16,8:$V0,9:6,10:7,13:$V1},o($V2,[2,13]),o([5,6,8,12,14],[2,14]),o($V3,[2,12],{7:4,9:6,10:7,4:24,8:$V0,13:$V1}),{7:16,8:$V0,9:6,10:7,13:$V1},{1:[2,3]},o($V3,[2,11],{6:$V4})],
defaultActions: {9:[2,1],15:[2,4],17:[2,2],23:[2,3]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:return 12
break;
case 1:return 8
break;
case 2:return 13
break;
case 3:return 14
break;
case 4:return 6
break;
case 5:return 5
break;
case 6:return 'INVALID'
break;
}
},
rules: [/^(?:\s*\|\s*)/,/^(?:(\\(\[|\]|\|)|[^\]\[|;\n])+)/,/^(?:\[)/,/^(?:\s*\])/,/^(?:[ ]*(;|\n)+[ ]*)/,/^(?:$)/,/^(?:.)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();;
  return nomnoml;
});

/***/ }),

/***/ "./node_modules/path-browserify/index.js":
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/pluralize/pluralize.js":
/*!*********************************************!*\
  !*** ./node_modules/pluralize/pluralize.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* global define */

(function (root, pluralize) {
  /* istanbul ignore else */
  if (true) {
    // Node.
    module.exports = pluralize();
  } else {}
})(this, function () {
  // Rule storage - pluralize and singularize need to be run sequentially,
  // while other rules can be optimized using an object for instant lookups.
  var pluralRules = [];
  var singularRules = [];
  var uncountables = {};
  var irregularPlurals = {};
  var irregularSingles = {};

  /**
   * Sanitize a pluralization rule to a usable regular expression.
   *
   * @param  {(RegExp|string)} rule
   * @return {RegExp}
   */
  function sanitizeRule (rule) {
    if (typeof rule === 'string') {
      return new RegExp('^' + rule + '$', 'i');
    }

    return rule;
  }

  /**
   * Pass in a word token to produce a function that can replicate the case on
   * another word.
   *
   * @param  {string}   word
   * @param  {string}   token
   * @return {Function}
   */
  function restoreCase (word, token) {
    // Tokens are an exact match.
    if (word === token) return token;

    // Lower cased words. E.g. "hello".
    if (word === word.toLowerCase()) return token.toLowerCase();

    // Upper cased words. E.g. "WHISKY".
    if (word === word.toUpperCase()) return token.toUpperCase();

    // Title cased words. E.g. "Title".
    if (word[0] === word[0].toUpperCase()) {
      return token.charAt(0).toUpperCase() + token.substr(1).toLowerCase();
    }

    // Lower cased words. E.g. "test".
    return token.toLowerCase();
  }

  /**
   * Interpolate a regexp string.
   *
   * @param  {string} str
   * @param  {Array}  args
   * @return {string}
   */
  function interpolate (str, args) {
    return str.replace(/\$(\d{1,2})/g, function (match, index) {
      return args[index] || '';
    });
  }

  /**
   * Replace a word using a rule.
   *
   * @param  {string} word
   * @param  {Array}  rule
   * @return {string}
   */
  function replace (word, rule) {
    return word.replace(rule[0], function (match, index) {
      var result = interpolate(rule[1], arguments);

      if (match === '') {
        return restoreCase(word[index - 1], result);
      }

      return restoreCase(match, result);
    });
  }

  /**
   * Sanitize a word by passing in the word and sanitization rules.
   *
   * @param  {string}   token
   * @param  {string}   word
   * @param  {Array}    rules
   * @return {string}
   */
  function sanitizeWord (token, word, rules) {
    // Empty string or doesn't need fixing.
    if (!token.length || uncountables.hasOwnProperty(token)) {
      return word;
    }

    var len = rules.length;

    // Iterate over the sanitization rules and use the first one to match.
    while (len--) {
      var rule = rules[len];

      if (rule[0].test(word)) return replace(word, rule);
    }

    return word;
  }

  /**
   * Replace a word with the updated word.
   *
   * @param  {Object}   replaceMap
   * @param  {Object}   keepMap
   * @param  {Array}    rules
   * @return {Function}
   */
  function replaceWord (replaceMap, keepMap, rules) {
    return function (word) {
      // Get the correct token and case restoration functions.
      var token = word.toLowerCase();

      // Check against the keep object map.
      if (keepMap.hasOwnProperty(token)) {
        return restoreCase(word, token);
      }

      // Check against the replacement map for a direct word replacement.
      if (replaceMap.hasOwnProperty(token)) {
        return restoreCase(word, replaceMap[token]);
      }

      // Run all the rules against the word.
      return sanitizeWord(token, word, rules);
    };
  }

  /**
   * Check if a word is part of the map.
   */
  function checkWord (replaceMap, keepMap, rules, bool) {
    return function (word) {
      var token = word.toLowerCase();

      if (keepMap.hasOwnProperty(token)) return true;
      if (replaceMap.hasOwnProperty(token)) return false;

      return sanitizeWord(token, token, rules) === token;
    };
  }

  /**
   * Pluralize or singularize a word based on the passed in count.
   *
   * @param  {string}  word      The word to pluralize
   * @param  {number}  count     How many of the word exist
   * @param  {boolean} inclusive Whether to prefix with the number (e.g. 3 ducks)
   * @return {string}
   */
  function pluralize (word, count, inclusive) {
    var pluralized = count === 1
      ? pluralize.singular(word) : pluralize.plural(word);

    return (inclusive ? count + ' ' : '') + pluralized;
  }

  /**
   * Pluralize a word.
   *
   * @type {Function}
   */
  pluralize.plural = replaceWord(
    irregularSingles, irregularPlurals, pluralRules
  );

  /**
   * Check if a word is plural.
   *
   * @type {Function}
   */
  pluralize.isPlural = checkWord(
    irregularSingles, irregularPlurals, pluralRules
  );

  /**
   * Singularize a word.
   *
   * @type {Function}
   */
  pluralize.singular = replaceWord(
    irregularPlurals, irregularSingles, singularRules
  );

  /**
   * Check if a word is singular.
   *
   * @type {Function}
   */
  pluralize.isSingular = checkWord(
    irregularPlurals, irregularSingles, singularRules
  );

  /**
   * Add a pluralization rule to the collection.
   *
   * @param {(string|RegExp)} rule
   * @param {string}          replacement
   */
  pluralize.addPluralRule = function (rule, replacement) {
    pluralRules.push([sanitizeRule(rule), replacement]);
  };

  /**
   * Add a singularization rule to the collection.
   *
   * @param {(string|RegExp)} rule
   * @param {string}          replacement
   */
  pluralize.addSingularRule = function (rule, replacement) {
    singularRules.push([sanitizeRule(rule), replacement]);
  };

  /**
   * Add an uncountable word rule.
   *
   * @param {(string|RegExp)} word
   */
  pluralize.addUncountableRule = function (word) {
    if (typeof word === 'string') {
      uncountables[word.toLowerCase()] = true;
      return;
    }

    // Set singular and plural references for the word.
    pluralize.addPluralRule(word, '$0');
    pluralize.addSingularRule(word, '$0');
  };

  /**
   * Add an irregular word definition.
   *
   * @param {string} single
   * @param {string} plural
   */
  pluralize.addIrregularRule = function (single, plural) {
    plural = plural.toLowerCase();
    single = single.toLowerCase();

    irregularSingles[single] = plural;
    irregularPlurals[plural] = single;
  };

  /**
   * Irregular rules.
   */
  [
    // Pronouns.
    ['I', 'we'],
    ['me', 'us'],
    ['he', 'they'],
    ['she', 'they'],
    ['them', 'them'],
    ['myself', 'ourselves'],
    ['yourself', 'yourselves'],
    ['itself', 'themselves'],
    ['herself', 'themselves'],
    ['himself', 'themselves'],
    ['themself', 'themselves'],
    ['is', 'are'],
    ['was', 'were'],
    ['has', 'have'],
    ['this', 'these'],
    ['that', 'those'],
    // Words ending in with a consonant and `o`.
    ['echo', 'echoes'],
    ['dingo', 'dingoes'],
    ['volcano', 'volcanoes'],
    ['tornado', 'tornadoes'],
    ['torpedo', 'torpedoes'],
    // Ends with `us`.
    ['genus', 'genera'],
    ['viscus', 'viscera'],
    // Ends with `ma`.
    ['stigma', 'stigmata'],
    ['stoma', 'stomata'],
    ['dogma', 'dogmata'],
    ['lemma', 'lemmata'],
    ['schema', 'schemata'],
    ['anathema', 'anathemata'],
    // Other irregular rules.
    ['ox', 'oxen'],
    ['axe', 'axes'],
    ['die', 'dice'],
    ['yes', 'yeses'],
    ['foot', 'feet'],
    ['eave', 'eaves'],
    ['goose', 'geese'],
    ['tooth', 'teeth'],
    ['quiz', 'quizzes'],
    ['human', 'humans'],
    ['proof', 'proofs'],
    ['carve', 'carves'],
    ['valve', 'valves'],
    ['looey', 'looies'],
    ['thief', 'thieves'],
    ['groove', 'grooves'],
    ['pickaxe', 'pickaxes'],
    ['passerby', 'passersby']
  ].forEach(function (rule) {
    return pluralize.addIrregularRule(rule[0], rule[1]);
  });

  /**
   * Pluralization rules.
   */
  [
    [/s?$/i, 's'],
    [/[^\u0000-\u007F]$/i, '$0'],
    [/([^aeiou]ese)$/i, '$1'],
    [/(ax|test)is$/i, '$1es'],
    [/(alias|[^aou]us|t[lm]as|gas|ris)$/i, '$1es'],
    [/(e[mn]u)s?$/i, '$1s'],
    [/([^l]ias|[aeiou]las|[ejzr]as|[iu]am)$/i, '$1'],
    [/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, '$1i'],
    [/(alumn|alg|vertebr)(?:a|ae)$/i, '$1ae'],
    [/(seraph|cherub)(?:im)?$/i, '$1im'],
    [/(her|at|gr)o$/i, '$1oes'],
    [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/i, '$1a'],
    [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)(?:a|on)$/i, '$1a'],
    [/sis$/i, 'ses'],
    [/(?:(kni|wi|li)fe|(ar|l|ea|eo|oa|hoo)f)$/i, '$1$2ves'],
    [/([^aeiouy]|qu)y$/i, '$1ies'],
    [/([^ch][ieo][ln])ey$/i, '$1ies'],
    [/(x|ch|ss|sh|zz)$/i, '$1es'],
    [/(matr|cod|mur|sil|vert|ind|append)(?:ix|ex)$/i, '$1ices'],
    [/\b((?:tit)?m|l)(?:ice|ouse)$/i, '$1ice'],
    [/(pe)(?:rson|ople)$/i, '$1ople'],
    [/(child)(?:ren)?$/i, '$1ren'],
    [/eaux$/i, '$0'],
    [/m[ae]n$/i, 'men'],
    ['thou', 'you']
  ].forEach(function (rule) {
    return pluralize.addPluralRule(rule[0], rule[1]);
  });

  /**
   * Singularization rules.
   */
  [
    [/s$/i, ''],
    [/(ss)$/i, '$1'],
    [/(wi|kni|(?:after|half|high|low|mid|non|night|[^\w]|^)li)ves$/i, '$1fe'],
    [/(ar|(?:wo|[ae])l|[eo][ao])ves$/i, '$1f'],
    [/ies$/i, 'y'],
    [/\b([pl]|zomb|(?:neck|cross)?t|coll|faer|food|gen|goon|group|lass|talk|goal|cut)ies$/i, '$1ie'],
    [/\b(mon|smil)ies$/i, '$1ey'],
    [/\b((?:tit)?m|l)ice$/i, '$1ouse'],
    [/(seraph|cherub)im$/i, '$1'],
    [/(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|t[lm]as|gas|(?:her|at|gr)o|[aeiou]ris)(?:es)?$/i, '$1'],
    [/(analy|diagno|parenthe|progno|synop|the|empha|cri|ne)(?:sis|ses)$/i, '$1sis'],
    [/(movie|twelve|abuse|e[mn]u)s$/i, '$1'],
    [/(test)(?:is|es)$/i, '$1is'],
    [/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, '$1us'],
    [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|quor)a$/i, '$1um'],
    [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)a$/i, '$1on'],
    [/(alumn|alg|vertebr)ae$/i, '$1a'],
    [/(cod|mur|sil|vert|ind)ices$/i, '$1ex'],
    [/(matr|append)ices$/i, '$1ix'],
    [/(pe)(rson|ople)$/i, '$1rson'],
    [/(child)ren$/i, '$1'],
    [/(eau)x?$/i, '$1'],
    [/men$/i, 'man']
  ].forEach(function (rule) {
    return pluralize.addSingularRule(rule[0], rule[1]);
  });

  /**
   * Uncountable rules.
   */
  [
    // Singular words with no plurals.
    'adulthood',
    'advice',
    'agenda',
    'aid',
    'aircraft',
    'alcohol',
    'ammo',
    'analytics',
    'anime',
    'athletics',
    'audio',
    'bison',
    'blood',
    'bream',
    'buffalo',
    'butter',
    'carp',
    'cash',
    'chassis',
    'chess',
    'clothing',
    'cod',
    'commerce',
    'cooperation',
    'corps',
    'debris',
    'diabetes',
    'digestion',
    'elk',
    'energy',
    'equipment',
    'excretion',
    'expertise',
    'firmware',
    'flounder',
    'fun',
    'gallows',
    'garbage',
    'graffiti',
    'hardware',
    'headquarters',
    'health',
    'herpes',
    'highjinks',
    'homework',
    'housework',
    'information',
    'jeans',
    'justice',
    'kudos',
    'labour',
    'literature',
    'machinery',
    'mackerel',
    'mail',
    'media',
    'mews',
    'moose',
    'music',
    'mud',
    'manga',
    'news',
    'only',
    'personnel',
    'pike',
    'plankton',
    'pliers',
    'police',
    'pollution',
    'premises',
    'rain',
    'research',
    'rice',
    'salmon',
    'scissors',
    'series',
    'sewage',
    'shambles',
    'shrimp',
    'software',
    'species',
    'staff',
    'swine',
    'tennis',
    'traffic',
    'transportation',
    'trout',
    'tuna',
    'wealth',
    'welfare',
    'whiting',
    'wildebeest',
    'wildlife',
    'you',
    /pok[eé]mon$/i,
    // Regexes.
    /[^aeiou]ese$/i, // "chinese", "japanese"
    /deer$/i, // "deer", "reindeer"
    /fish$/i, // "fish", "blowfish", "angelfish"
    /measles$/i,
    /o[iu]s$/i, // "carnivorous"
    /pox$/i, // "chickpox", "smallpox"
    /sheep$/i
  ].forEach(pluralize.addUncountableRule);

  return pluralize;
});


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./src/main/erdiagram/common/config/AbstractComponentConfigManager.ts":
/*!****************************************************************************!*\
  !*** ./src/main/erdiagram/common/config/AbstractComponentConfigManager.ts ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AbstractComponentConfigManager; });
class AbstractComponentConfigManager {
    mergeWithDefaultConfig(partialConfig) {
        return this.mergeConfigs(this.getDefaultConfig(), partialConfig);
    }
    cloneConfig(fullConfig) {
        return this.mergeConfigs(fullConfig);
    }
}


/***/ }),

/***/ "./src/main/erdiagram/common/config/exports.ts":
/*!*****************************************************!*\
  !*** ./src/main/erdiagram/common/config/exports.ts ***!
  \*****************************************************/
/*! exports provided: AbstractComponentConfigManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractComponentConfigManager */ "./src/main/erdiagram/common/config/AbstractComponentConfigManager.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AbstractComponentConfigManager", function() { return _AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"]; });





/***/ }),

/***/ "./src/main/erdiagram/common/exports.ts":
/*!**********************************************!*\
  !*** ./src/main/erdiagram/common/exports.ts ***!
  \**********************************************/
/*! exports provided: AbstractComponentConfigManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config_exports__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config/exports */ "./src/main/erdiagram/common/config/exports.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AbstractComponentConfigManager", function() { return _config_exports__WEBPACK_IMPORTED_MODULE_0__["AbstractComponentConfigManager"]; });




/***/ }),

/***/ "./src/main/erdiagram/exports.ts":
/*!***************************************!*\
  !*** ./src/main/erdiagram/exports.ts ***!
  \***************************************/
/*! exports provided: AbstractComponentConfigManager, StandardCaseFormats, CaseConverter, StandardIdNamingStrategies, MysqlDatabaseModelToCodeConverterConfigManager, mysqlDatabaseModelToCodeConverterConfigManager, MysqlDatabaseModelToCodeConverter, OracleDatabaseModelToCodeConverterConfigManager, oracleDatabaseModelToCodeConverterConfigManager, OracleDatabaseModelToCodeConverter, SqlServerDatabaseModelToCodeConverterConfigManager, sqlServerDatabaseModelToCodeConverterConfigManager, SqlServerDatabaseModelToCodeConverter, PostgresqlDatabaseModelToCodeConverterConfigManager, postgresqlDatabaseModelToCodeConverterConfigManager, PostgresqlDatabaseModelToCodeConverter, EntityRelationshipModelToDatabaseCodeConverter, DatabaseModelGeneratorConfigManager, databaseModelGeneratorConfigManager, DatabaseModelGenerator, JavaClassModelToCodeConverterConfigManager, javaClassModelToCodeConverterConfigManager, createJavaType, createJavaParameterizedType, createJavaArrayType, isJavaParameterizedType, parseJavaType, JavaClassModelToCodeConverter, TypeScriptClassModelToCodeConverterConfigManager, typescriptClassModelToCodeConverterConfigManager, createTypeScriptType, createTypeScriptParameterizedType, createTypeScriptArrayType, isTypeScriptParameterizedType, parseTypeScriptType, TypeScriptClassModelToCodeConverter, EntityRelationshipModelToClassCodeConverter, ClassModelGeneratorConfigManager, classModelGeneratorConfigManager, ClassModelGenerator, NomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager, nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager, NomnomlEntityRelationshipModelToDiagramCodeConverter, NomnomlEntityRelationshipModelToDiagramConverter, PlantUmlEntityRelationshipModelToDiagramCodeConverterConfigManager, plantumlEntityRelationshipModelToDiagramCodeConverterConfigManager, PlantUmlEntityRelationshipModelToDiagramCodeConverter, PlantUmlEntityRelationshipModelToDiagramConverter, BaseEntityRelationshipModelToDiagramConverter, EntityRelationshipModelParserConfigManager, entityRelationshipModelParserConfigManager, EntityPropertyType, Cardinality, Direction, ERDiagramError, ERDiagramParseLineError, ERDiagramSyntaxError, ERDiagramUnknownTypeError, ERDiagramRelationshipError, ERDiagramUnknownEntityError, ERDiagramEntityError, ERDiagramDuplicatedEntityNameError, ERDiagramEntityPropertyError, ERDiagramMultipleIdentifiersError, ERDiagramInvalidIdentifierDefinitionError, ERDiagramDuplicatedPropertyNameError, EntityRelationshipModelParser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_exports__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common/exports */ "./src/main/erdiagram/common/exports.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AbstractComponentConfigManager", function() { return _common_exports__WEBPACK_IMPORTED_MODULE_0__["AbstractComponentConfigManager"]; });

/* harmony import */ var _generator_exports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./generator/exports */ "./src/main/erdiagram/generator/exports.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StandardCaseFormats", function() { return _generator_exports__WEBPACK_IMPORTED_MODULE_1__["StandardCaseFormats"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CaseConverter", function() { return _generator_exports__WEBPACK_IMPORTED_MODULE_1__["CaseConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StandardIdNamingStrategies", function() { return _generator_exports__WEBPACK_IMPORTED_MODULE_1__["StandardIdNamingStrategies"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MysqlDatabaseModelToCodeConverterConfigManager", function() { return _generator_exports__WEBPACK_IMPORTED_MODULE_1__["MysqlDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mysqlDatabaseModelToCodeConverterConfigManager", function() { return _generator_exports__WEBPACK_IMPORTED_MODULE_1__["mysqlDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MysqlDatabaseModelToCodeConverter", function() { return _generator_exports__WEBPACK_IMPORTED_MODULE_1__["MysqlDatabaseModelToCodeConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OracleDatabaseModelToCodeConverterConfigManager", function() { return _generator_exports__WEBPACK_IMPORTED_MODULE_1__["OracleDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "oracleDatabaseModelToCodeConverterConfigManager", function() { return _generator_exports__WEBPACK_IMPORTED_MODULE_1__["oracleDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OracleDatabaseModelToCodeConverter", function() { return _generator_exports__WEBPACK_IMPORTED_MODULE_1__["OracleDatabaseModelToCodeConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SqlServerDatabaseModelToCodeConverterConfigManager", function() { return _generator_exports__WEBPACK_IMPORTED_MODULE_1__["SqlServerDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sqlServerDatabaseModelToCodeConverterConfigManager", function() { return _generator_exports__WEBPACK_IMPORTED_MODULE_1__["sqlServerDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SqlServerDatabaseModelToCodeConverter", function() { return _generator_exports__WEBPACK_IMPORTED_MODULE_1__["SqlServerDatabaseModelToCodeConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PostgresqlDatabaseModelToCodeConverterConfigManager", function() { return _generator_exports__WEBPACK_IMPORTED_MODULE_1__["PostgresqlDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "postgresqlDatabaseModelToCodeConverterConfigManager", function() { return _generator_exports__WEBPACK_IMPORTED_MODULE_1__["postgresqlDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PostgresqlDatabaseModelToCodeConverter", function() { return _generator_exports__WEBPACK_IMPORTED_MODULE_1__["PostgresqlDatabaseModelToCodeConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EntityRelationshipModelToDatabaseCodeConverter", function() { return _generator_exports__WEBPACK_IMPORTED_MODULE_1__["EntityRelationshipModelToDatabaseCodeConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DatabaseModelGeneratorConfigManager", function() { return _generator_exports__WEBPACK_IMPORTED_MODULE_1__["DatabaseModelGeneratorConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "databaseModelGeneratorConfigManager", function() { return _generator_exports__WEBPACK_IMPORTED_MODULE_1__["databaseModelGeneratorConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DatabaseModelGenerator", function() { return _generator_exports__WEBPACK_IMPORTED_MODULE_1__["DatabaseModelGenerator"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JavaClassModelToCodeConverterConfigManager", function() { return _generator_exports__WEBPACK_IMPORTED_MODULE_1__["JavaClassModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "javaClassModelToCodeConverterConfigManager", function() { return _generator_exports__WEBPACK_IMPORTED_MODULE_1__["javaClassModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createJavaType", function() { return _generator_exports__WEBPACK_IMPORTED_MODULE_1__["createJavaType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createJavaParameterizedType", function() { return _generator_exports__WEBPACK_IMPORTED_MODULE_1__["createJavaParameterizedType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createJavaArrayType", function() { return _generator_exports__WEBPACK_IMPORTED_MODULE_1__["createJavaArrayType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isJavaParameterizedType", function() { return _generator_exports__WEBPACK_IMPORTED_MODULE_1__["isJavaParameterizedType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseJavaType", function() { return _generator_exports__WEBPACK_IMPORTED_MODULE_1__["parseJavaType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JavaClassModelToCodeConverter", function() { return _generator_exports__WEBPACK_IMPORTED_MODULE_1__["JavaClassModelToCodeConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TypeScriptClassModelToCodeConverterConfigManager", function() { return _generator_exports__WEBPACK_IMPORTED_MODULE_1__["TypeScriptClassModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "typescriptClassModelToCodeConverterConfigManager", function() { return _generator_exports__WEBPACK_IMPORTED_MODULE_1__["typescriptClassModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createTypeScriptType", function() { return _generator_exports__WEBPACK_IMPORTED_MODULE_1__["createTypeScriptType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createTypeScriptParameterizedType", function() { return _generator_exports__WEBPACK_IMPORTED_MODULE_1__["createTypeScriptParameterizedType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createTypeScriptArrayType", function() { return _generator_exports__WEBPACK_IMPORTED_MODULE_1__["createTypeScriptArrayType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isTypeScriptParameterizedType", function() { return _generator_exports__WEBPACK_IMPORTED_MODULE_1__["isTypeScriptParameterizedType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseTypeScriptType", function() { return _generator_exports__WEBPACK_IMPORTED_MODULE_1__["parseTypeScriptType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TypeScriptClassModelToCodeConverter", function() { return _generator_exports__WEBPACK_IMPORTED_MODULE_1__["TypeScriptClassModelToCodeConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EntityRelationshipModelToClassCodeConverter", function() { return _generator_exports__WEBPACK_IMPORTED_MODULE_1__["EntityRelationshipModelToClassCodeConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ClassModelGeneratorConfigManager", function() { return _generator_exports__WEBPACK_IMPORTED_MODULE_1__["ClassModelGeneratorConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "classModelGeneratorConfigManager", function() { return _generator_exports__WEBPACK_IMPORTED_MODULE_1__["classModelGeneratorConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ClassModelGenerator", function() { return _generator_exports__WEBPACK_IMPORTED_MODULE_1__["ClassModelGenerator"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager", function() { return _generator_exports__WEBPACK_IMPORTED_MODULE_1__["NomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager", function() { return _generator_exports__WEBPACK_IMPORTED_MODULE_1__["nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NomnomlEntityRelationshipModelToDiagramCodeConverter", function() { return _generator_exports__WEBPACK_IMPORTED_MODULE_1__["NomnomlEntityRelationshipModelToDiagramCodeConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NomnomlEntityRelationshipModelToDiagramConverter", function() { return _generator_exports__WEBPACK_IMPORTED_MODULE_1__["NomnomlEntityRelationshipModelToDiagramConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PlantUmlEntityRelationshipModelToDiagramCodeConverterConfigManager", function() { return _generator_exports__WEBPACK_IMPORTED_MODULE_1__["PlantUmlEntityRelationshipModelToDiagramCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "plantumlEntityRelationshipModelToDiagramCodeConverterConfigManager", function() { return _generator_exports__WEBPACK_IMPORTED_MODULE_1__["plantumlEntityRelationshipModelToDiagramCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PlantUmlEntityRelationshipModelToDiagramCodeConverter", function() { return _generator_exports__WEBPACK_IMPORTED_MODULE_1__["PlantUmlEntityRelationshipModelToDiagramCodeConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PlantUmlEntityRelationshipModelToDiagramConverter", function() { return _generator_exports__WEBPACK_IMPORTED_MODULE_1__["PlantUmlEntityRelationshipModelToDiagramConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseEntityRelationshipModelToDiagramConverter", function() { return _generator_exports__WEBPACK_IMPORTED_MODULE_1__["BaseEntityRelationshipModelToDiagramConverter"]; });

/* harmony import */ var _parser_exports__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parser/exports */ "./src/main/erdiagram/parser/exports.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EntityRelationshipModelParserConfigManager", function() { return _parser_exports__WEBPACK_IMPORTED_MODULE_2__["EntityRelationshipModelParserConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "entityRelationshipModelParserConfigManager", function() { return _parser_exports__WEBPACK_IMPORTED_MODULE_2__["entityRelationshipModelParserConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EntityPropertyType", function() { return _parser_exports__WEBPACK_IMPORTED_MODULE_2__["EntityPropertyType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Cardinality", function() { return _parser_exports__WEBPACK_IMPORTED_MODULE_2__["Cardinality"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Direction", function() { return _parser_exports__WEBPACK_IMPORTED_MODULE_2__["Direction"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERDiagramError", function() { return _parser_exports__WEBPACK_IMPORTED_MODULE_2__["ERDiagramError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERDiagramParseLineError", function() { return _parser_exports__WEBPACK_IMPORTED_MODULE_2__["ERDiagramParseLineError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERDiagramSyntaxError", function() { return _parser_exports__WEBPACK_IMPORTED_MODULE_2__["ERDiagramSyntaxError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERDiagramUnknownTypeError", function() { return _parser_exports__WEBPACK_IMPORTED_MODULE_2__["ERDiagramUnknownTypeError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERDiagramRelationshipError", function() { return _parser_exports__WEBPACK_IMPORTED_MODULE_2__["ERDiagramRelationshipError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERDiagramUnknownEntityError", function() { return _parser_exports__WEBPACK_IMPORTED_MODULE_2__["ERDiagramUnknownEntityError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERDiagramEntityError", function() { return _parser_exports__WEBPACK_IMPORTED_MODULE_2__["ERDiagramEntityError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERDiagramDuplicatedEntityNameError", function() { return _parser_exports__WEBPACK_IMPORTED_MODULE_2__["ERDiagramDuplicatedEntityNameError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERDiagramEntityPropertyError", function() { return _parser_exports__WEBPACK_IMPORTED_MODULE_2__["ERDiagramEntityPropertyError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERDiagramMultipleIdentifiersError", function() { return _parser_exports__WEBPACK_IMPORTED_MODULE_2__["ERDiagramMultipleIdentifiersError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERDiagramInvalidIdentifierDefinitionError", function() { return _parser_exports__WEBPACK_IMPORTED_MODULE_2__["ERDiagramInvalidIdentifierDefinitionError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERDiagramDuplicatedPropertyNameError", function() { return _parser_exports__WEBPACK_IMPORTED_MODULE_2__["ERDiagramDuplicatedPropertyNameError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EntityRelationshipModelParser", function() { return _parser_exports__WEBPACK_IMPORTED_MODULE_2__["EntityRelationshipModelParser"]; });






/***/ }),

/***/ "./src/main/erdiagram/generator/EntityRelationshipModelToDiagramConverter.ts":
/*!***********************************************************************************!*\
  !*** ./src/main/erdiagram/generator/EntityRelationshipModelToDiagramConverter.ts ***!
  \***********************************************************************************/
/*! exports provided: BaseEntityRelationshipModelToDiagramConverter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseEntityRelationshipModelToDiagramConverter", function() { return BaseEntityRelationshipModelToDiagramConverter; });
const EMPTY_SVG_FILE = '<svg width="0" height="0"></svg>';
class BaseEntityRelationshipModelToDiagramConverter {
    convertToDiagram(model) {
        if (model.entities.length === 0 && model.relationships.length === 0) {
            return Promise.resolve(EMPTY_SVG_FILE);
        }
        return this.convertNonEmptyModelToDiagram(model);
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/common/case-format/AbstractCamelCaseFormat.ts":
/*!************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/common/case-format/AbstractCamelCaseFormat.ts ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AbstractCamelCaseFormat; });
/* harmony import */ var _erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/util/string-utils */ "./src/main/erdiagram/util/string-utils.ts");

const CAMEL_CASE_WORD_BOUNDARIES_REGEX = /((?<=[^A-Z])(?=[A-Z])|(?=[A-Z][a-z])|(?<=[A-Za-z])(?=[0-9]))/;
class AbstractCamelCaseFormat {
    splitWords(text) {
        return Object(_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_0__["removeNonEmptyStrings"])(text.split(CAMEL_CASE_WORD_BOUNDARIES_REGEX));
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/common/case-format/AbstractUnderscoreCaseFormat.ts":
/*!*****************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/common/case-format/AbstractUnderscoreCaseFormat.ts ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AbstractUnderscoreCaseFormat; });
/* harmony import */ var _erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/util/string-utils */ "./src/main/erdiagram/util/string-utils.ts");

class AbstractUnderscoreCaseFormat {
    splitWords(text) {
        return Object(_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_0__["removeNonEmptyStrings"])(text.split('_'));
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/common/case-format/CapitalizedUnderscoreCaseFormat.ts":
/*!********************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/common/case-format/CapitalizedUnderscoreCaseFormat.ts ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CapitalizedUnderscoreCaseFormat; });
/* harmony import */ var _erdiagram_generator_common_case_format_AbstractUnderscoreCaseFormat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/generator/common/case-format/AbstractUnderscoreCaseFormat */ "./src/main/erdiagram/generator/common/case-format/AbstractUnderscoreCaseFormat.ts");
/* harmony import */ var _erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/util/string-utils */ "./src/main/erdiagram/util/string-utils.ts");


class CapitalizedUnderscoreCaseFormat extends _erdiagram_generator_common_case_format_AbstractUnderscoreCaseFormat__WEBPACK_IMPORTED_MODULE_0__["default"] {
    joinWords(words) {
        return Object(_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_1__["removeNonEmptyStrings"])(words)
            .map(word => word.toLowerCase())
            .map(_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_1__["capitalizeWord"])
            .join('_');
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/common/case-format/CaseConverter.ts":
/*!**************************************************************************!*\
  !*** ./src/main/erdiagram/generator/common/case-format/CaseConverter.ts ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CaseConverter; });
class CaseConverter {
    constructor(originCaseFormat, targetCaseFormat) {
        this.originCaseFormat = originCaseFormat;
        this.targetCaseFormat = targetCaseFormat;
    }
    convertCase(text) {
        const words = this.originCaseFormat.splitWords(text);
        return this.targetCaseFormat.joinWords(words);
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/common/case-format/CaseInsensitiveUnderscoreCaseFormat.ts":
/*!************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/common/case-format/CaseInsensitiveUnderscoreCaseFormat.ts ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CaseInsensitiveUnderscoreCaseFormat; });
/* harmony import */ var _erdiagram_generator_common_case_format_AbstractUnderscoreCaseFormat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/generator/common/case-format/AbstractUnderscoreCaseFormat */ "./src/main/erdiagram/generator/common/case-format/AbstractUnderscoreCaseFormat.ts");
/* harmony import */ var _erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/util/string-utils */ "./src/main/erdiagram/util/string-utils.ts");


class CaseInsensitiveUnderscoreCaseFormat extends _erdiagram_generator_common_case_format_AbstractUnderscoreCaseFormat__WEBPACK_IMPORTED_MODULE_0__["default"] {
    joinWords(words) {
        return Object(_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_1__["removeNonEmptyStrings"])(words).join('_');
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/common/case-format/LowerCamelCaseFormat.ts":
/*!*********************************************************************************!*\
  !*** ./src/main/erdiagram/generator/common/case-format/LowerCamelCaseFormat.ts ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LowerCamelCaseFormat; });
/* harmony import */ var _erdiagram_generator_common_case_format_AbstractCamelCaseFormat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/generator/common/case-format/AbstractCamelCaseFormat */ "./src/main/erdiagram/generator/common/case-format/AbstractCamelCaseFormat.ts");
/* harmony import */ var _erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/util/string-utils */ "./src/main/erdiagram/util/string-utils.ts");


class LowerCamelCaseFormat extends _erdiagram_generator_common_case_format_AbstractCamelCaseFormat__WEBPACK_IMPORTED_MODULE_0__["default"] {
    joinWords(words) {
        const nonEmptyWords = Object(_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_1__["removeNonEmptyStrings"])(words);
        if (nonEmptyWords.length === 0) {
            return '';
        }
        const [firstWord, ...otherWords] = nonEmptyWords;
        const lowerCaseFirstWord = firstWord.toLowerCase();
        const capitalizedOtherWords = otherWords
            .map(word => word.toLowerCase())
            .map(_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_1__["capitalizeWord"]);
        return lowerCaseFirstWord + capitalizedOtherWords.join('');
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/common/case-format/LowerUnderscoreCaseFormat.ts":
/*!**************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/common/case-format/LowerUnderscoreCaseFormat.ts ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LowerUnderscoreCaseFormat; });
/* harmony import */ var _erdiagram_generator_common_case_format_AbstractUnderscoreCaseFormat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/generator/common/case-format/AbstractUnderscoreCaseFormat */ "./src/main/erdiagram/generator/common/case-format/AbstractUnderscoreCaseFormat.ts");
/* harmony import */ var _erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/util/string-utils */ "./src/main/erdiagram/util/string-utils.ts");


class LowerUnderscoreCaseFormat extends _erdiagram_generator_common_case_format_AbstractUnderscoreCaseFormat__WEBPACK_IMPORTED_MODULE_0__["default"] {
    joinWords(words) {
        return Object(_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_1__["removeNonEmptyStrings"])(words)
            .map(word => word.toLowerCase())
            .join('_');
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/common/case-format/StandardCaseFormats.ts":
/*!********************************************************************************!*\
  !*** ./src/main/erdiagram/generator/common/case-format/StandardCaseFormats.ts ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _erdiagram_generator_common_case_format_LowerCamelCaseFormat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/generator/common/case-format/LowerCamelCaseFormat */ "./src/main/erdiagram/generator/common/case-format/LowerCamelCaseFormat.ts");
/* harmony import */ var _erdiagram_generator_common_case_format_UpperCamelCaseFormat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/generator/common/case-format/UpperCamelCaseFormat */ "./src/main/erdiagram/generator/common/case-format/UpperCamelCaseFormat.ts");
/* harmony import */ var _erdiagram_generator_common_case_format_LowerUnderscoreCaseFormat__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/generator/common/case-format/LowerUnderscoreCaseFormat */ "./src/main/erdiagram/generator/common/case-format/LowerUnderscoreCaseFormat.ts");
/* harmony import */ var _erdiagram_generator_common_case_format_CapitalizedUnderscoreCaseFormat__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/generator/common/case-format/CapitalizedUnderscoreCaseFormat */ "./src/main/erdiagram/generator/common/case-format/CapitalizedUnderscoreCaseFormat.ts");
/* harmony import */ var _erdiagram_generator_common_case_format_UpperUnderscoreCaseFormat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/erdiagram/generator/common/case-format/UpperUnderscoreCaseFormat */ "./src/main/erdiagram/generator/common/case-format/UpperUnderscoreCaseFormat.ts");
/* harmony import */ var _erdiagram_generator_common_case_format_CaseInsensitiveUnderscoreCaseFormat__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/erdiagram/generator/common/case-format/CaseInsensitiveUnderscoreCaseFormat */ "./src/main/erdiagram/generator/common/case-format/CaseInsensitiveUnderscoreCaseFormat.ts");






const StandardCaseFormats = {
    LOWER_CAMEL: new _erdiagram_generator_common_case_format_LowerCamelCaseFormat__WEBPACK_IMPORTED_MODULE_0__["default"](),
    UPPER_CAMEL: new _erdiagram_generator_common_case_format_UpperCamelCaseFormat__WEBPACK_IMPORTED_MODULE_1__["default"](),
    LOWER_UNDERSCORE: new _erdiagram_generator_common_case_format_LowerUnderscoreCaseFormat__WEBPACK_IMPORTED_MODULE_2__["default"](),
    CAPITALIZED_UNDERSCORE: new _erdiagram_generator_common_case_format_CapitalizedUnderscoreCaseFormat__WEBPACK_IMPORTED_MODULE_3__["default"](),
    UPPER_UNDERSCORE: new _erdiagram_generator_common_case_format_UpperUnderscoreCaseFormat__WEBPACK_IMPORTED_MODULE_4__["default"](),
    CASE_INSENSITIVE_UNDERSCORE: new _erdiagram_generator_common_case_format_CaseInsensitiveUnderscoreCaseFormat__WEBPACK_IMPORTED_MODULE_5__["default"](),
};
/* harmony default export */ __webpack_exports__["default"] = (StandardCaseFormats);


/***/ }),

/***/ "./src/main/erdiagram/generator/common/case-format/UpperCamelCaseFormat.ts":
/*!*********************************************************************************!*\
  !*** ./src/main/erdiagram/generator/common/case-format/UpperCamelCaseFormat.ts ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UpperCamelCaseFormat; });
/* harmony import */ var _erdiagram_generator_common_case_format_AbstractCamelCaseFormat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/generator/common/case-format/AbstractCamelCaseFormat */ "./src/main/erdiagram/generator/common/case-format/AbstractCamelCaseFormat.ts");
/* harmony import */ var _erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/util/string-utils */ "./src/main/erdiagram/util/string-utils.ts");


class UpperCamelCaseFormat extends _erdiagram_generator_common_case_format_AbstractCamelCaseFormat__WEBPACK_IMPORTED_MODULE_0__["default"] {
    joinWords(words) {
        return Object(_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_1__["removeNonEmptyStrings"])(words)
            .map(word => word.toLowerCase())
            .map(_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_1__["capitalizeWord"])
            .join('');
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/common/case-format/UpperUnderscoreCaseFormat.ts":
/*!**************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/common/case-format/UpperUnderscoreCaseFormat.ts ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UpperUnderscoreCaseFormat; });
/* harmony import */ var _erdiagram_generator_common_case_format_AbstractUnderscoreCaseFormat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/generator/common/case-format/AbstractUnderscoreCaseFormat */ "./src/main/erdiagram/generator/common/case-format/AbstractUnderscoreCaseFormat.ts");
/* harmony import */ var _erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/util/string-utils */ "./src/main/erdiagram/util/string-utils.ts");


class UpperUnderscoreCaseFormat extends _erdiagram_generator_common_case_format_AbstractUnderscoreCaseFormat__WEBPACK_IMPORTED_MODULE_0__["default"] {
    joinWords(words) {
        return Object(_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_1__["removeNonEmptyStrings"])(words)
            .map(word => word.toUpperCase())
            .join('_');
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/common/case-format/exports.ts":
/*!********************************************************************!*\
  !*** ./src/main/erdiagram/generator/common/case-format/exports.ts ***!
  \********************************************************************/
/*! exports provided: StandardCaseFormats, CaseConverter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CaseConverter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CaseConverter */ "./src/main/erdiagram/generator/common/case-format/CaseConverter.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CaseConverter", function() { return _CaseConverter__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StandardCaseFormats */ "./src/main/erdiagram/generator/common/case-format/StandardCaseFormats.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StandardCaseFormats", function() { return _StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"]; });






/***/ }),

/***/ "./src/main/erdiagram/generator/common/exports.ts":
/*!********************************************************!*\
  !*** ./src/main/erdiagram/generator/common/exports.ts ***!
  \********************************************************/
/*! exports provided: StandardCaseFormats, CaseConverter, StandardIdNamingStrategies */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _case_format_exports__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./case-format/exports */ "./src/main/erdiagram/generator/common/case-format/exports.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StandardCaseFormats", function() { return _case_format_exports__WEBPACK_IMPORTED_MODULE_0__["StandardCaseFormats"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CaseConverter", function() { return _case_format_exports__WEBPACK_IMPORTED_MODULE_0__["CaseConverter"]; });

/* harmony import */ var _id_naming_strategy_exports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./id-naming-strategy/exports */ "./src/main/erdiagram/generator/common/id-naming-strategy/exports.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StandardIdNamingStrategies", function() { return _id_naming_strategy_exports__WEBPACK_IMPORTED_MODULE_1__["StandardIdNamingStrategies"]; });





/***/ }),

/***/ "./src/main/erdiagram/generator/common/id-naming-strategy/StandardIdNamingStrategies.ts":
/*!**********************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/common/id-naming-strategy/StandardIdNamingStrategies.ts ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/util/string-utils */ "./src/main/erdiagram/util/string-utils.ts");

const defaultIdNamingStrategy = () => 'id';
const entityNamePrefixIdNamingStrategy = entityName => `${Object(_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_0__["uncapitalizeWord"])(entityName)}Id`;
const StandardIdNamingStrategies = {
    DEFAULT: defaultIdNamingStrategy,
    ENTITY_NAME_PREFIX: entityNamePrefixIdNamingStrategy
};
/* harmony default export */ __webpack_exports__["default"] = (StandardIdNamingStrategies);


/***/ }),

/***/ "./src/main/erdiagram/generator/common/id-naming-strategy/exports.ts":
/*!***************************************************************************!*\
  !*** ./src/main/erdiagram/generator/common/id-naming-strategy/exports.ts ***!
  \***************************************************************************/
/*! exports provided: StandardIdNamingStrategies */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _StandardIdNamingStrategies__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StandardIdNamingStrategies */ "./src/main/erdiagram/generator/common/id-naming-strategy/StandardIdNamingStrategies.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StandardIdNamingStrategies", function() { return _StandardIdNamingStrategies__WEBPACK_IMPORTED_MODULE_0__["default"]; });





/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/EntityRelationshipModelToDatabaseCodeConverter.ts":
/*!****************************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/EntityRelationshipModelToDatabaseCodeConverter.ts ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EntityRelationshipModelToDatabaseCodeConverter; });
class EntityRelationshipModelToDatabaseCodeConverter {
    constructor(databaseModelGenerator, databaseModelToCodeConverter) {
        this.databaseModelGenerator = databaseModelGenerator;
        this.databaseModelToCodeConverter = databaseModelToCodeConverter;
    }
    convertToCode(entityRelationshipModel) {
        const databaseModel = this.databaseModelGenerator.generateDatabaseModel(entityRelationshipModel);
        return this.databaseModelToCodeConverter.convertToCode(databaseModel);
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/exports.ts":
/*!*************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/exports.ts ***!
  \*************************************************************************/
/*! exports provided: MysqlDatabaseModelToCodeConverterConfigManager, mysqlDatabaseModelToCodeConverterConfigManager, MysqlDatabaseModelToCodeConverter, OracleDatabaseModelToCodeConverterConfigManager, oracleDatabaseModelToCodeConverterConfigManager, OracleDatabaseModelToCodeConverter, SqlServerDatabaseModelToCodeConverterConfigManager, sqlServerDatabaseModelToCodeConverterConfigManager, SqlServerDatabaseModelToCodeConverter, PostgresqlDatabaseModelToCodeConverterConfigManager, postgresqlDatabaseModelToCodeConverterConfigManager, PostgresqlDatabaseModelToCodeConverter, EntityRelationshipModelToDatabaseCodeConverter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EntityRelationshipModelToDatabaseCodeConverter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EntityRelationshipModelToDatabaseCodeConverter */ "./src/main/erdiagram/generator/database/code-converter/EntityRelationshipModelToDatabaseCodeConverter.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EntityRelationshipModelToDatabaseCodeConverter", function() { return _EntityRelationshipModelToDatabaseCodeConverter__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _mysql_exports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mysql/exports */ "./src/main/erdiagram/generator/database/code-converter/mysql/exports.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MysqlDatabaseModelToCodeConverterConfigManager", function() { return _mysql_exports__WEBPACK_IMPORTED_MODULE_1__["MysqlDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mysqlDatabaseModelToCodeConverterConfigManager", function() { return _mysql_exports__WEBPACK_IMPORTED_MODULE_1__["mysqlDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MysqlDatabaseModelToCodeConverter", function() { return _mysql_exports__WEBPACK_IMPORTED_MODULE_1__["MysqlDatabaseModelToCodeConverter"]; });

/* harmony import */ var _oracle_exports__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./oracle/exports */ "./src/main/erdiagram/generator/database/code-converter/oracle/exports.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OracleDatabaseModelToCodeConverterConfigManager", function() { return _oracle_exports__WEBPACK_IMPORTED_MODULE_2__["OracleDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "oracleDatabaseModelToCodeConverterConfigManager", function() { return _oracle_exports__WEBPACK_IMPORTED_MODULE_2__["oracleDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OracleDatabaseModelToCodeConverter", function() { return _oracle_exports__WEBPACK_IMPORTED_MODULE_2__["OracleDatabaseModelToCodeConverter"]; });

/* harmony import */ var _sqlserver_exports__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sqlserver/exports */ "./src/main/erdiagram/generator/database/code-converter/sqlserver/exports.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SqlServerDatabaseModelToCodeConverterConfigManager", function() { return _sqlserver_exports__WEBPACK_IMPORTED_MODULE_3__["SqlServerDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sqlServerDatabaseModelToCodeConverterConfigManager", function() { return _sqlserver_exports__WEBPACK_IMPORTED_MODULE_3__["sqlServerDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SqlServerDatabaseModelToCodeConverter", function() { return _sqlserver_exports__WEBPACK_IMPORTED_MODULE_3__["SqlServerDatabaseModelToCodeConverter"]; });

/* harmony import */ var _postgresql_exports__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./postgresql/exports */ "./src/main/erdiagram/generator/database/code-converter/postgresql/exports.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PostgresqlDatabaseModelToCodeConverterConfigManager", function() { return _postgresql_exports__WEBPACK_IMPORTED_MODULE_4__["PostgresqlDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "postgresqlDatabaseModelToCodeConverterConfigManager", function() { return _postgresql_exports__WEBPACK_IMPORTED_MODULE_4__["postgresqlDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PostgresqlDatabaseModelToCodeConverter", function() { return _postgresql_exports__WEBPACK_IMPORTED_MODULE_4__["PostgresqlDatabaseModelToCodeConverter"]; });









/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/mysql/MysqlDatabaseModelToCodeConverter.ts":
/*!*********************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/mysql/MysqlDatabaseModelToCodeConverter.ts ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MysqlDatabaseModelToCodeConverter; });
/* harmony import */ var _erdiagram_generator_database_code_converter_mysql_column_MysqlColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/generator/database/code-converter/mysql/column/MysqlColumnCodeGenerator */ "./src/main/erdiagram/generator/database/code-converter/mysql/column/MysqlColumnCodeGenerator.ts");
/* harmony import */ var _erdiagram_generator_database_code_converter_mysql_type_MysqlTypeResolver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/generator/database/code-converter/mysql/type/MysqlTypeResolver */ "./src/main/erdiagram/generator/database/code-converter/mysql/type/MysqlTypeResolver.ts");
/* harmony import */ var _erdiagram_generator_database_code_converter_mysql_column_MysqlIdColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/generator/database/code-converter/mysql/column/MysqlIdColumnCodeGenerator */ "./src/main/erdiagram/generator/database/code-converter/mysql/column/MysqlIdColumnCodeGenerator.ts");
/* harmony import */ var _erdiagram_generator_database_code_converter_mysql_column_MysqlForeignColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/generator/database/code-converter/mysql/column/MysqlForeignColumnCodeGenerator */ "./src/main/erdiagram/generator/database/code-converter/mysql/column/MysqlForeignColumnCodeGenerator.ts");
/* harmony import */ var _erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/erdiagram/util/indent-utils */ "./src/main/erdiagram/util/indent-utils.ts");
/* harmony import */ var _erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/erdiagram/generator/common/case-format/StandardCaseFormats */ "./src/main/erdiagram/generator/common/case-format/StandardCaseFormats.ts");
/* harmony import */ var _erdiagram_generator_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/erdiagram/generator/common/case-format/CaseConverter */ "./src/main/erdiagram/generator/common/case-format/CaseConverter.ts");
/* harmony import */ var _erdiagram_generator_database_code_converter_mysql_config_MysqlDatabaseModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/erdiagram/generator/database/code-converter/mysql/config/MysqlDatabaseModelToCodeConverterConfigManager */ "./src/main/erdiagram/generator/database/code-converter/mysql/config/MysqlDatabaseModelToCodeConverterConfigManager.ts");








class MysqlDatabaseModelToCodeConverter {
    constructor(config) {
        this.config = _erdiagram_generator_database_code_converter_mysql_config_MysqlDatabaseModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_7__["default"].mergeWithDefaultConfig(config);
        this.tableNameCaseConverter = new _erdiagram_generator_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_6__["default"](_erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_5__["default"].LOWER_CAMEL, this.config.tableNameCaseFormat);
        const columnNameCaseConverter = new _erdiagram_generator_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_6__["default"](_erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_5__["default"].LOWER_CAMEL, this.config.columnNameCaseFormat);
        this.columnCodeGenerator = new _erdiagram_generator_database_code_converter_mysql_column_MysqlColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_0__["default"](new _erdiagram_generator_database_code_converter_mysql_type_MysqlTypeResolver__WEBPACK_IMPORTED_MODULE_1__["default"](this.config.typeBindings), columnNameCaseConverter);
        this.idColumnCodeGenerator = new _erdiagram_generator_database_code_converter_mysql_column_MysqlIdColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_2__["default"](this.columnCodeGenerator, columnNameCaseConverter);
        this.foreignColumnCodeGenerator = new _erdiagram_generator_database_code_converter_mysql_column_MysqlForeignColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_3__["default"](this.columnCodeGenerator, this.tableNameCaseConverter, columnNameCaseConverter);
    }
    convertToCode(databaseModel) {
        const allCreateTableStatements = [];
        const allAlterTableStatements = [];
        databaseModel.tables
            .map(table => this.generateTableCode(table))
            .forEach(({ createTableStatement, alterTableStatements }) => {
            allCreateTableStatements.push(createTableStatement);
            if (alterTableStatements) {
                allAlterTableStatements.push(alterTableStatements);
            }
        });
        return [
            ...allCreateTableStatements,
            ...allAlterTableStatements
        ].join('\n\n');
    }
    // FIXME split this method
    generateTableCode(table) {
        const lines = {
            columns: [],
            fkConstraints: [],
            otherConstraints: []
        };
        const outputTableName = this.tableNameCaseConverter.convertCase(table.name);
        const { columnLine: idColumnLine, pkConstraintLine } = this.idColumnCodeGenerator.generateIdColumnCode(outputTableName, table.identifierColumnName);
        lines.columns.push(idColumnLine);
        lines.otherConstraints.push(pkConstraintLine);
        this.processColumns(outputTableName, table.columns, lines);
        this.processReferences(outputTableName, table.references, lines);
        const createTableInnerLines = [
            ...lines.columns,
            ...lines.otherConstraints
        ];
        const createTableLines = [
            `CREATE TABLE \`${outputTableName}\` (`,
            Object(_erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_4__["indentLines"])(createTableInnerLines).join(',\n'),
            ');'
        ];
        const createTableStatement = createTableLines.join('\n');
        const alterTableStatements = lines.fkConstraints.map(fkConstraintLine => {
            return `ALTER TABLE \`${outputTableName}\` ADD ${fkConstraintLine};`;
        }).join('\n');
        return {
            createTableStatement,
            alterTableStatements
        };
    }
    processReferences(outputTableName, references, lines) {
        for (const reference of references) {
            const { columnLine, uniqueConstraintLine, fkConstraintLine } = this.foreignColumnCodeGenerator.generateForeignColumnCode(outputTableName, reference);
            lines.columns.push(columnLine);
            lines.fkConstraints.push(fkConstraintLine);
            if (uniqueConstraintLine) {
                lines.otherConstraints.push(uniqueConstraintLine);
            }
        }
    }
    processColumns(outputTableName, columns, lines) {
        for (const column of columns) {
            const { columnLine, uniqueConstraintLine } = this.columnCodeGenerator.generateColumnCode(outputTableName, column);
            lines.columns.push(columnLine);
            if (uniqueConstraintLine) {
                lines.otherConstraints.push(uniqueConstraintLine);
            }
        }
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/mysql/column/MysqlColumnCodeGenerator.ts":
/*!*******************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/mysql/column/MysqlColumnCodeGenerator.ts ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MysqlColumnCodeGenerator; });
class MysqlColumnCodeGenerator {
    constructor(typeResolver, columnNameCaseConverter) {
        this.typeResolver = typeResolver;
        this.columnNameCaseConverter = columnNameCaseConverter;
    }
    generateColumnCode(outputTableName, column) {
        const outputColumnName = this.columnNameCaseConverter.convertCase(column.name);
        return {
            columnLine: this.generateColumnDeclarationLine(outputColumnName, column),
            uniqueConstraintLine: column.unique ? this.generateUniqueConstraintLine(outputTableName, outputColumnName) : undefined
        };
    }
    generateColumnDeclarationLine(outputColumnName, column) {
        const { notNull, autoincremental, type, length } = column;
        const lineParts = [
            `\`${outputColumnName}\``,
            this.generateMysqlTypeDeclaration(type, length)
        ];
        if (notNull) {
            lineParts.push('NOT NULL');
        }
        if (autoincremental) {
            lineParts.push('AUTO_INCREMENT');
        }
        return lineParts.join(' ');
    }
    generateMysqlTypeDeclaration(type, length) {
        const mysqlType = this.typeResolver.resolveMysqlType(type);
        const lengthCode = this.generateLengthCode(length);
        return mysqlType + lengthCode;
    }
    generateLengthCode(length) {
        if (length.length === 0) {
            return '';
        }
        return `(${length.join(', ')})`;
    }
    generateUniqueConstraintLine(outputTableName, outputColumnName) {
        return `CONSTRAINT \`${outputTableName}_${outputColumnName}_unique\` UNIQUE (\`${outputColumnName}\`)`;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/mysql/column/MysqlForeignColumnCodeGenerator.ts":
/*!**************************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/mysql/column/MysqlForeignColumnCodeGenerator.ts ***!
  \**************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MysqlForeignColumnCodeGenerator; });
/* harmony import */ var _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/entity-relationship-model-types */ "./src/main/erdiagram/parser/entity-relationship-model-types.ts");

class MysqlForeignColumnCodeGenerator {
    constructor(columnCodeGenerator, tableNameCaseConverter, columnNameCaseConverter) {
        this.columnCodeGenerator = columnCodeGenerator;
        this.tableNameCaseConverter = tableNameCaseConverter;
        this.columnNameCaseConverter = columnNameCaseConverter;
    }
    generateForeignColumnCode(outputTableName, reference) {
        const columnDescriptor = this.createForeignKeyColumnDescriptor(reference);
        const { columnLine, uniqueConstraintLine } = this.columnCodeGenerator.generateColumnCode(outputTableName, columnDescriptor);
        return {
            columnLine,
            uniqueConstraintLine,
            fkConstraintLine: this.createForeignKeyConstraint(outputTableName, reference)
        };
    }
    createForeignKeyColumnDescriptor(reference) {
        const { columnName, notNull, unique } = reference;
        return {
            name: columnName,
            type: _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].IDENTIFIER,
            length: [],
            notNull,
            unique,
            autoincremental: false
        };
    }
    createForeignKeyConstraint(outputTableName, reference) {
        const outputColumnName = this.columnNameCaseConverter.convertCase(reference.columnName);
        const outputTargetTableName = this.tableNameCaseConverter.convertCase(reference.targetTableName);
        const outputTargetColumnName = this.columnNameCaseConverter.convertCase(reference.targetTableIdentifierColumnName);
        return `CONSTRAINT \`${outputTableName}_${outputColumnName}_fk\` FOREIGN KEY (\`${outputColumnName}\`)`
            + ` REFERENCES \`${outputTargetTableName}\` (\`${outputTargetColumnName}\`)`;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/mysql/column/MysqlIdColumnCodeGenerator.ts":
/*!*********************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/mysql/column/MysqlIdColumnCodeGenerator.ts ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MysqlIdColumnCodeGenerator; });
/* harmony import */ var _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/entity-relationship-model-types */ "./src/main/erdiagram/parser/entity-relationship-model-types.ts");

class MysqlIdColumnCodeGenerator {
    constructor(columnCodeGenerator, columnNameCaseConverter) {
        this.columnCodeGenerator = columnCodeGenerator;
        this.columnNameCaseConverter = columnNameCaseConverter;
    }
    generateIdColumnCode(outputTableName, identifierColumnName) {
        const column = this.createIdColumnDescriptor(identifierColumnName);
        const { columnLine } = this.columnCodeGenerator.generateColumnCode(outputTableName, column);
        const pkConstraintLine = this.createPrimaryKeyConstraint(outputTableName, column);
        return {
            columnLine,
            pkConstraintLine
        };
    }
    createIdColumnDescriptor(identifierColumnName) {
        return {
            name: identifierColumnName,
            type: _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].IDENTIFIER,
            length: [],
            notNull: true,
            autoincremental: true,
            // As primary keys are unique by default, we don't
            // need to manually define an UNIQUE KEY constraint
            unique: false
        };
    }
    createPrimaryKeyConstraint(outputTableName, column) {
        const columnName = this.columnNameCaseConverter.convertCase(column.name);
        return `CONSTRAINT \`${outputTableName}_pk\` PRIMARY KEY (\`${columnName}\`)`;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/mysql/config/MysqlDatabaseModelToCodeConverterConfigManager.ts":
/*!*****************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/mysql/config/MysqlDatabaseModelToCodeConverterConfigManager.ts ***!
  \*****************************************************************************************************************************/
/*! exports provided: MysqlDatabaseModelToCodeConverterConfigManager, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MysqlDatabaseModelToCodeConverterConfigManager", function() { return MysqlDatabaseModelToCodeConverterConfigManager; });
/* harmony import */ var _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/entity-relationship-model-types */ "./src/main/erdiagram/parser/entity-relationship-model-types.ts");
/* harmony import */ var _erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/generator/common/case-format/StandardCaseFormats */ "./src/main/erdiagram/generator/common/case-format/StandardCaseFormats.ts");
/* harmony import */ var _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/common/config/AbstractComponentConfigManager */ "./src/main/erdiagram/common/config/AbstractComponentConfigManager.ts");
/* harmony import */ var _erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/util/record-utils */ "./src/main/erdiagram/util/record-utils.ts");




class MysqlDatabaseModelToCodeConverterConfigManager extends _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_2__["default"] {
    getDefaultConfig() {
        return {
            typeBindings: {
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].IDENTIFIER]: 'BIGINT',
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].TEXT]: 'VARCHAR',
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].LONG]: 'BIGINT',
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].INT]: 'INT',
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].SHORT]: 'SHORT',
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].DECIMAL]: 'DECIMAL',
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].BOOLEAN]: 'BOOLEAN',
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].DATE]: 'DATE',
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].TIME]: 'TIME',
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].DATETIME]: 'TIMESTAMP',
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].BLOB]: 'BLOB'
            },
            tableNameCaseFormat: _erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"].UPPER_CAMEL,
            columnNameCaseFormat: _erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"].LOWER_CAMEL,
        };
    }
    mergeConfigs(fullConfig, partialConfig) {
        return Object.assign(Object.assign(Object.assign({}, fullConfig), partialConfig), { typeBindings: Object.assign(Object.assign({}, fullConfig.typeBindings), partialConfig === null || partialConfig === void 0 ? void 0 : partialConfig.typeBindings) });
    }
    convertToSerializableObject(fullConfig) {
        return Object.assign(Object.assign({}, fullConfig), { tableNameCaseFormat: Object(_erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_3__["findKeyFromValue"])(_erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"], fullConfig.tableNameCaseFormat), columnNameCaseFormat: Object(_erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_3__["findKeyFromValue"])(_erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"], fullConfig.columnNameCaseFormat) });
    }
    convertFromSerializableObject(serializableConfig) {
        return Object.assign(Object.assign({}, serializableConfig), { tableNameCaseFormat: Object(_erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_3__["findValueFromNullableKey"])(_erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"], serializableConfig.tableNameCaseFormat, _erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"].UPPER_CAMEL), columnNameCaseFormat: Object(_erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_3__["findValueFromNullableKey"])(_erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"], serializableConfig.columnNameCaseFormat, _erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"].UPPER_CAMEL) });
    }
}
const mysqlDatabaseModelToCodeConverterConfigManager = new MysqlDatabaseModelToCodeConverterConfigManager();
/* harmony default export */ __webpack_exports__["default"] = (mysqlDatabaseModelToCodeConverterConfigManager);


/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/mysql/config/exports.ts":
/*!**************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/mysql/config/exports.ts ***!
  \**************************************************************************************/
/*! exports provided: MysqlDatabaseModelToCodeConverterConfigManager, mysqlDatabaseModelToCodeConverterConfigManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MysqlDatabaseModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MysqlDatabaseModelToCodeConverterConfigManager */ "./src/main/erdiagram/generator/database/code-converter/mysql/config/MysqlDatabaseModelToCodeConverterConfigManager.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MysqlDatabaseModelToCodeConverterConfigManager", function() { return _MysqlDatabaseModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_0__["MysqlDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mysqlDatabaseModelToCodeConverterConfigManager", function() { return _MysqlDatabaseModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"]; });





/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/mysql/exports.ts":
/*!*******************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/mysql/exports.ts ***!
  \*******************************************************************************/
/*! exports provided: MysqlDatabaseModelToCodeConverterConfigManager, mysqlDatabaseModelToCodeConverterConfigManager, MysqlDatabaseModelToCodeConverter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MysqlDatabaseModelToCodeConverter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MysqlDatabaseModelToCodeConverter */ "./src/main/erdiagram/generator/database/code-converter/mysql/MysqlDatabaseModelToCodeConverter.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MysqlDatabaseModelToCodeConverter", function() { return _MysqlDatabaseModelToCodeConverter__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _config_exports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config/exports */ "./src/main/erdiagram/generator/database/code-converter/mysql/config/exports.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MysqlDatabaseModelToCodeConverterConfigManager", function() { return _config_exports__WEBPACK_IMPORTED_MODULE_1__["MysqlDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mysqlDatabaseModelToCodeConverterConfigManager", function() { return _config_exports__WEBPACK_IMPORTED_MODULE_1__["mysqlDatabaseModelToCodeConverterConfigManager"]; });






/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/mysql/type/MysqlTypeResolver.ts":
/*!**********************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/mysql/type/MysqlTypeResolver.ts ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MysqlTypeResolver; });
class MysqlTypeResolver {
    constructor(typeBindings) {
        this.typeBindings = typeBindings;
    }
    resolveMysqlType(type) {
        /* istanbul ignore next */
        if (!this.typeBindings.hasOwnProperty(type)) {
            throw new Error('Unsupported type: ' + type);
        }
        return this.typeBindings[type];
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/oracle/OracleDatabaseModelToCodeConverter.ts":
/*!***********************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/oracle/OracleDatabaseModelToCodeConverter.ts ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return OracleDatabaseModelToCodeConverter; });
/* harmony import */ var _erdiagram_generator_database_code_converter_oracle_column_OracleColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/generator/database/code-converter/oracle/column/OracleColumnCodeGenerator */ "./src/main/erdiagram/generator/database/code-converter/oracle/column/OracleColumnCodeGenerator.ts");
/* harmony import */ var _erdiagram_generator_database_code_converter_oracle_type_OracleTypeResolver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/generator/database/code-converter/oracle/type/OracleTypeResolver */ "./src/main/erdiagram/generator/database/code-converter/oracle/type/OracleTypeResolver.ts");
/* harmony import */ var _erdiagram_generator_database_code_converter_oracle_column_OracleIdColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/generator/database/code-converter/oracle/column/OracleIdColumnCodeGenerator */ "./src/main/erdiagram/generator/database/code-converter/oracle/column/OracleIdColumnCodeGenerator.ts");
/* harmony import */ var _erdiagram_generator_database_code_converter_oracle_column_OracleForeignColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/generator/database/code-converter/oracle/column/OracleForeignColumnCodeGenerator */ "./src/main/erdiagram/generator/database/code-converter/oracle/column/OracleForeignColumnCodeGenerator.ts");
/* harmony import */ var _erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/erdiagram/util/indent-utils */ "./src/main/erdiagram/util/indent-utils.ts");
/* harmony import */ var _erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/erdiagram/generator/common/case-format/StandardCaseFormats */ "./src/main/erdiagram/generator/common/case-format/StandardCaseFormats.ts");
/* harmony import */ var _erdiagram_generator_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/erdiagram/generator/common/case-format/CaseConverter */ "./src/main/erdiagram/generator/common/case-format/CaseConverter.ts");
/* harmony import */ var _erdiagram_generator_database_code_converter_oracle_config_OracleDatabaseModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/erdiagram/generator/database/code-converter/oracle/config/OracleDatabaseModelToCodeConverterConfigManager */ "./src/main/erdiagram/generator/database/code-converter/oracle/config/OracleDatabaseModelToCodeConverterConfigManager.ts");








class OracleDatabaseModelToCodeConverter {
    constructor(config) {
        this.config = _erdiagram_generator_database_code_converter_oracle_config_OracleDatabaseModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_7__["default"].mergeWithDefaultConfig(config);
        this.tableNameCaseConverter = new _erdiagram_generator_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_6__["default"](_erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_5__["default"].LOWER_CAMEL, this.config.tableNameCaseFormat);
        const columnNameCaseConverter = new _erdiagram_generator_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_6__["default"](_erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_5__["default"].LOWER_CAMEL, this.config.columnNameCaseFormat);
        this.columnCodeGenerator = new _erdiagram_generator_database_code_converter_oracle_column_OracleColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_0__["default"](new _erdiagram_generator_database_code_converter_oracle_type_OracleTypeResolver__WEBPACK_IMPORTED_MODULE_1__["default"](this.config.typeBindings), columnNameCaseConverter);
        this.idColumnCodeGenerator = new _erdiagram_generator_database_code_converter_oracle_column_OracleIdColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_2__["default"](this.columnCodeGenerator, columnNameCaseConverter);
        this.foreignColumnCodeGenerator = new _erdiagram_generator_database_code_converter_oracle_column_OracleForeignColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_3__["default"](this.columnCodeGenerator, this.tableNameCaseConverter, columnNameCaseConverter);
    }
    convertToCode(databaseModel) {
        const allCreateTableStatements = [];
        const allAlterTableStatements = [];
        databaseModel.tables
            .map(table => this.generateTableCode(table))
            .forEach(({ createTableStatement, alterTableStatements }) => {
            allCreateTableStatements.push(createTableStatement);
            if (alterTableStatements) {
                allAlterTableStatements.push(alterTableStatements);
            }
        });
        return [
            ...allCreateTableStatements,
            ...allAlterTableStatements
        ].join('\n\n');
    }
    // FIXME split this method
    generateTableCode(table) {
        const lines = {
            columns: [],
            fkConstraints: [],
            otherConstraints: [],
            sequences: []
        };
        const outputTableName = this.tableNameCaseConverter.convertCase(table.name);
        const { createSequenceLine: idCreateSequenceLine, columnLine: idColumnLine, pkConstraintLine } = this.idColumnCodeGenerator.generateIdColumnCode(outputTableName, table.identifierColumnName);
        lines.sequences.push(idCreateSequenceLine);
        lines.columns.push(idColumnLine);
        lines.otherConstraints.push(pkConstraintLine);
        this.processColumns(outputTableName, table.columns, lines);
        this.processReferences(outputTableName, table.references, lines);
        const createTableInnerLines = [
            ...lines.columns,
            ...lines.otherConstraints
        ];
        const createTableLines = [
            ...lines.sequences,
            `CREATE TABLE "${outputTableName}" (`,
            Object(_erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_4__["indentLines"])(createTableInnerLines).join(',\n'),
            ');'
        ];
        const createTableStatement = createTableLines.join('\n');
        const alterTableStatements = lines.fkConstraints.map(fkConstraintLine => {
            return `ALTER TABLE "${outputTableName}" ADD ${fkConstraintLine};`;
        }).join('\n');
        return {
            createTableStatement,
            alterTableStatements
        };
    }
    processColumns(outputTableName, columns, lines) {
        for (const column of columns) {
            const { columnLine, createSequenceLine, uniqueConstraintLine } = this.columnCodeGenerator.generateColumnCode(outputTableName, column);
            lines.columns.push(columnLine);
            if (createSequenceLine) {
                lines.sequences.push(createSequenceLine);
            }
            if (uniqueConstraintLine) {
                lines.otherConstraints.push(uniqueConstraintLine);
            }
        }
    }
    processReferences(outputTableName, references, lines) {
        for (const reference of references) {
            const { columnLine, uniqueConstraintLine, fkConstraintLine } = this.foreignColumnCodeGenerator.generateForeignColumnCode(outputTableName, reference);
            lines.columns.push(columnLine);
            lines.fkConstraints.push(fkConstraintLine);
            if (uniqueConstraintLine) {
                lines.otherConstraints.push(uniqueConstraintLine);
            }
        }
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/oracle/column/OracleColumnCodeGenerator.ts":
/*!*********************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/oracle/column/OracleColumnCodeGenerator.ts ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return OracleColumnCodeGenerator; });
class OracleColumnCodeGenerator {
    constructor(typeResolver, columnNameCaseConverter) {
        this.typeResolver = typeResolver;
        this.columnNameCaseConverter = columnNameCaseConverter;
    }
    generateColumnCode(outputTableName, column) {
        const outputColumnName = this.columnNameCaseConverter.convertCase(column.name);
        const autoincrementalSequenceName = this.getAutoincrementalSequenceName(outputTableName, outputColumnName);
        return {
            createSequenceLine: column.autoincremental ? this.generateCreateSequenceLine(autoincrementalSequenceName) : undefined,
            columnLine: this.generateColumnDeclarationLine(outputColumnName, column, autoincrementalSequenceName),
            uniqueConstraintLine: column.unique ? this.generateUniqueConstraintLine(outputTableName, outputColumnName) : undefined
        };
    }
    getAutoincrementalSequenceName(outputTableName, outputColumnName) {
        return `${outputTableName}_${outputColumnName}_SEQ`;
    }
    generateCreateSequenceLine(autoincrementalSequenceName) {
        return `CREATE SEQUENCE "${autoincrementalSequenceName}" START WITH 1;`;
    }
    generateColumnDeclarationLine(outputColumnName, column, autoincrementalSequenceName) {
        const { notNull, autoincremental, type, length } = column;
        const lineParts = [
            `"${outputColumnName}"`,
            this.generateOracleTypeDeclaration(type, length)
        ];
        if (notNull) {
            lineParts.push('NOT NULL');
        }
        if (autoincremental) {
            lineParts.push(`DEFAULT "${autoincrementalSequenceName}".nextval`);
        }
        return lineParts.join(' ');
    }
    generateOracleTypeDeclaration(type, length) {
        const oracleType = this.typeResolver.resolveOracleType(type);
        const lengthCode = this.generateLengthCode(length);
        return oracleType + lengthCode;
    }
    generateLengthCode(length) {
        if (length.length === 0) {
            return '';
        }
        return `(${length.join(', ')})`;
    }
    generateUniqueConstraintLine(outputTableName, outputColumnName) {
        return `CONSTRAINT "${outputTableName}_${outputColumnName}_UNIQUE" UNIQUE ("${outputColumnName}")`;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/oracle/column/OracleForeignColumnCodeGenerator.ts":
/*!****************************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/oracle/column/OracleForeignColumnCodeGenerator.ts ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return OracleForeignColumnCodeGenerator; });
/* harmony import */ var _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/entity-relationship-model-types */ "./src/main/erdiagram/parser/entity-relationship-model-types.ts");

class OracleForeignColumnCodeGenerator {
    constructor(columnCodeGenerator, tableNameCaseConverter, columnNameCaseConverter) {
        this.columnCodeGenerator = columnCodeGenerator;
        this.tableNameCaseConverter = tableNameCaseConverter;
        this.columnNameCaseConverter = columnNameCaseConverter;
    }
    generateForeignColumnCode(outputTableName, reference) {
        const columnDescriptor = this.createForeignKeyColumnDescriptor(reference);
        const { columnLine, uniqueConstraintLine } = this.columnCodeGenerator.generateColumnCode(outputTableName, columnDescriptor);
        return {
            columnLine,
            uniqueConstraintLine,
            fkConstraintLine: this.createForeignKeyConstraint(outputTableName, reference)
        };
    }
    createForeignKeyColumnDescriptor(reference) {
        const { columnName, notNull, unique } = reference;
        return {
            name: columnName,
            type: _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].IDENTIFIER,
            length: [],
            notNull,
            unique,
            autoincremental: false
        };
    }
    createForeignKeyConstraint(outputTableName, reference) {
        const outputColumnName = this.columnNameCaseConverter.convertCase(reference.columnName);
        const outputTargetTableName = this.tableNameCaseConverter.convertCase(reference.targetTableName);
        const outputTargetColumnName = this.columnNameCaseConverter.convertCase(reference.targetTableIdentifierColumnName);
        return `CONSTRAINT "${outputTableName}_${outputColumnName}_FK" FOREIGN KEY ("${outputColumnName}")`
            + ` REFERENCES "${outputTargetTableName}" ("${outputTargetColumnName}")`;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/oracle/column/OracleIdColumnCodeGenerator.ts":
/*!***********************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/oracle/column/OracleIdColumnCodeGenerator.ts ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return OracleIdColumnCodeGenerator; });
/* harmony import */ var _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/entity-relationship-model-types */ "./src/main/erdiagram/parser/entity-relationship-model-types.ts");

class OracleIdColumnCodeGenerator {
    constructor(columnCodeGenerator, columnNameCaseConverter) {
        this.columnCodeGenerator = columnCodeGenerator;
        this.columnNameCaseConverter = columnNameCaseConverter;
    }
    generateIdColumnCode(outputTableName, identifierColumnName) {
        const column = this.createIdColumnDescriptor(identifierColumnName);
        const { createSequenceLine, columnLine } = this.columnCodeGenerator.generateColumnCode(outputTableName, column);
        /* istanbul ignore next */
        if (createSequenceLine == null) {
            throw new Error('Unexpected error: missing sequence for primary key column');
        }
        const pkConstraintLine = this.createPrimaryKeyConstraint(outputTableName, column);
        return {
            createSequenceLine,
            columnLine,
            pkConstraintLine
        };
    }
    createIdColumnDescriptor(identifierColumnName) {
        return {
            name: identifierColumnName,
            type: _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].IDENTIFIER,
            length: [],
            notNull: true,
            // FIXME when different IDENTITY strategies are supported, we must
            //  change this to false and manage the IDENTITY generation manually.
            autoincremental: true,
            // As primary keys are unique by default, we don't
            // need to manually define an UNIQUE KEY constraint
            unique: false
        };
    }
    createPrimaryKeyConstraint(outputTableName, column) {
        const columnName = this.columnNameCaseConverter.convertCase(column.name);
        return `CONSTRAINT "${outputTableName}_PK" PRIMARY KEY ("${columnName}")`;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/oracle/config/OracleDatabaseModelToCodeConverterConfigManager.ts":
/*!*******************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/oracle/config/OracleDatabaseModelToCodeConverterConfigManager.ts ***!
  \*******************************************************************************************************************************/
/*! exports provided: OracleDatabaseModelToCodeConverterConfigManager, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OracleDatabaseModelToCodeConverterConfigManager", function() { return OracleDatabaseModelToCodeConverterConfigManager; });
/* harmony import */ var _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/entity-relationship-model-types */ "./src/main/erdiagram/parser/entity-relationship-model-types.ts");
/* harmony import */ var _erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/generator/common/case-format/StandardCaseFormats */ "./src/main/erdiagram/generator/common/case-format/StandardCaseFormats.ts");
/* harmony import */ var _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/common/config/AbstractComponentConfigManager */ "./src/main/erdiagram/common/config/AbstractComponentConfigManager.ts");
/* harmony import */ var _erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/util/record-utils */ "./src/main/erdiagram/util/record-utils.ts");




class OracleDatabaseModelToCodeConverterConfigManager extends _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_2__["default"] {
    getDefaultConfig() {
        return {
            typeBindings: {
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].IDENTIFIER]: 'NUMBER',
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].TEXT]: 'VARCHAR2',
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].LONG]: 'NUMBER',
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].INT]: 'NUMBER',
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].SHORT]: 'NUMBER',
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].DECIMAL]: 'NUMBER',
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].BOOLEAN]: 'NUMBER(1, 0)',
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].DATE]: 'DATE',
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].TIME]: 'TIMESTAMP',
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].DATETIME]: 'TIMESTAMP',
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].BLOB]: 'BLOB'
            },
            tableNameCaseFormat: _erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"].UPPER_UNDERSCORE,
            columnNameCaseFormat: _erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"].UPPER_UNDERSCORE,
        };
    }
    mergeConfigs(fullConfig, partialConfig) {
        return Object.assign(Object.assign(Object.assign({}, fullConfig), partialConfig), { typeBindings: Object.assign(Object.assign({}, fullConfig.typeBindings), partialConfig === null || partialConfig === void 0 ? void 0 : partialConfig.typeBindings) });
    }
    convertToSerializableObject(fullConfig) {
        return Object.assign(Object.assign({}, fullConfig), { tableNameCaseFormat: Object(_erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_3__["findKeyFromValue"])(_erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"], fullConfig.tableNameCaseFormat), columnNameCaseFormat: Object(_erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_3__["findKeyFromValue"])(_erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"], fullConfig.columnNameCaseFormat) });
    }
    convertFromSerializableObject(serializableConfig) {
        return Object.assign(Object.assign({}, serializableConfig), { tableNameCaseFormat: Object(_erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_3__["findValueFromNullableKey"])(_erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"], serializableConfig.tableNameCaseFormat, _erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"].UPPER_CAMEL), columnNameCaseFormat: Object(_erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_3__["findValueFromNullableKey"])(_erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"], serializableConfig.columnNameCaseFormat, _erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"].UPPER_CAMEL) });
    }
}
const oracleDatabaseModelToCodeConverterConfigManager = new OracleDatabaseModelToCodeConverterConfigManager();
/* harmony default export */ __webpack_exports__["default"] = (oracleDatabaseModelToCodeConverterConfigManager);


/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/oracle/config/exports.ts":
/*!***************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/oracle/config/exports.ts ***!
  \***************************************************************************************/
/*! exports provided: OracleDatabaseModelToCodeConverterConfigManager, oracleDatabaseModelToCodeConverterConfigManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _OracleDatabaseModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OracleDatabaseModelToCodeConverterConfigManager */ "./src/main/erdiagram/generator/database/code-converter/oracle/config/OracleDatabaseModelToCodeConverterConfigManager.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OracleDatabaseModelToCodeConverterConfigManager", function() { return _OracleDatabaseModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_0__["OracleDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "oracleDatabaseModelToCodeConverterConfigManager", function() { return _OracleDatabaseModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"]; });





/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/oracle/exports.ts":
/*!********************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/oracle/exports.ts ***!
  \********************************************************************************/
/*! exports provided: OracleDatabaseModelToCodeConverterConfigManager, oracleDatabaseModelToCodeConverterConfigManager, OracleDatabaseModelToCodeConverter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _OracleDatabaseModelToCodeConverter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OracleDatabaseModelToCodeConverter */ "./src/main/erdiagram/generator/database/code-converter/oracle/OracleDatabaseModelToCodeConverter.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OracleDatabaseModelToCodeConverter", function() { return _OracleDatabaseModelToCodeConverter__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _config_exports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config/exports */ "./src/main/erdiagram/generator/database/code-converter/oracle/config/exports.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OracleDatabaseModelToCodeConverterConfigManager", function() { return _config_exports__WEBPACK_IMPORTED_MODULE_1__["OracleDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "oracleDatabaseModelToCodeConverterConfigManager", function() { return _config_exports__WEBPACK_IMPORTED_MODULE_1__["oracleDatabaseModelToCodeConverterConfigManager"]; });






/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/oracle/type/OracleTypeResolver.ts":
/*!************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/oracle/type/OracleTypeResolver.ts ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return OracleTypeResolver; });
class OracleTypeResolver {
    constructor(typeBindings) {
        this.typeBindings = typeBindings;
    }
    resolveOracleType(type) {
        /* istanbul ignore next */
        if (!this.typeBindings.hasOwnProperty(type)) {
            throw new Error('Unsupported type: ' + type);
        }
        return this.typeBindings[type];
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/postgresql/PostgresqlDatabaseModelToCodeConverter.ts":
/*!*******************************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/postgresql/PostgresqlDatabaseModelToCodeConverter.ts ***!
  \*******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PostgresqlDatabaseModelToCodeConverter; });
/* harmony import */ var _erdiagram_generator_database_code_converter_postgresql_column_PostgresqlColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/generator/database/code-converter/postgresql/column/PostgresqlColumnCodeGenerator */ "./src/main/erdiagram/generator/database/code-converter/postgresql/column/PostgresqlColumnCodeGenerator.ts");
/* harmony import */ var _erdiagram_generator_database_code_converter_postgresql_type_PostgresqlTypeResolver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/generator/database/code-converter/postgresql/type/PostgresqlTypeResolver */ "./src/main/erdiagram/generator/database/code-converter/postgresql/type/PostgresqlTypeResolver.ts");
/* harmony import */ var _erdiagram_generator_database_code_converter_postgresql_column_PostgresqlIdColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/generator/database/code-converter/postgresql/column/PostgresqlIdColumnCodeGenerator */ "./src/main/erdiagram/generator/database/code-converter/postgresql/column/PostgresqlIdColumnCodeGenerator.ts");
/* harmony import */ var _erdiagram_generator_database_code_converter_postgresql_column_PostgresqlForeignColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/generator/database/code-converter/postgresql/column/PostgresqlForeignColumnCodeGenerator */ "./src/main/erdiagram/generator/database/code-converter/postgresql/column/PostgresqlForeignColumnCodeGenerator.ts");
/* harmony import */ var _erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/erdiagram/util/indent-utils */ "./src/main/erdiagram/util/indent-utils.ts");
/* harmony import */ var _erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/erdiagram/generator/common/case-format/StandardCaseFormats */ "./src/main/erdiagram/generator/common/case-format/StandardCaseFormats.ts");
/* harmony import */ var _erdiagram_generator_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/erdiagram/generator/common/case-format/CaseConverter */ "./src/main/erdiagram/generator/common/case-format/CaseConverter.ts");
/* harmony import */ var _erdiagram_generator_database_code_converter_postgresql_config_PostgresqlDatabaseModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/erdiagram/generator/database/code-converter/postgresql/config/PostgresqlDatabaseModelToCodeConverterConfigManager */ "./src/main/erdiagram/generator/database/code-converter/postgresql/config/PostgresqlDatabaseModelToCodeConverterConfigManager.ts");








class PostgresqlDatabaseModelToCodeConverter {
    constructor(config) {
        this.config = _erdiagram_generator_database_code_converter_postgresql_config_PostgresqlDatabaseModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_7__["default"].mergeWithDefaultConfig(config);
        this.tableNameCaseConverter = new _erdiagram_generator_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_6__["default"](_erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_5__["default"].LOWER_CAMEL, this.config.tableNameCaseFormat);
        const columnNameCaseConverter = new _erdiagram_generator_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_6__["default"](_erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_5__["default"].LOWER_CAMEL, this.config.columnNameCaseFormat);
        this.columnCodeGenerator = new _erdiagram_generator_database_code_converter_postgresql_column_PostgresqlColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_0__["default"](new _erdiagram_generator_database_code_converter_postgresql_type_PostgresqlTypeResolver__WEBPACK_IMPORTED_MODULE_1__["default"](this.config.typeBindings), columnNameCaseConverter);
        this.idColumnCodeGenerator = new _erdiagram_generator_database_code_converter_postgresql_column_PostgresqlIdColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_2__["default"](this.columnCodeGenerator, columnNameCaseConverter);
        this.foreignColumnCodeGenerator = new _erdiagram_generator_database_code_converter_postgresql_column_PostgresqlForeignColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_3__["default"](this.columnCodeGenerator, this.tableNameCaseConverter, columnNameCaseConverter);
    }
    convertToCode(databaseModel) {
        const allCreateTableStatements = [];
        const allAlterTableStatements = [];
        databaseModel.tables
            .map(table => this.generateTableCode(table))
            .forEach(({ createTableStatement, alterTableStatements }) => {
            allCreateTableStatements.push(createTableStatement);
            if (alterTableStatements) {
                allAlterTableStatements.push(alterTableStatements);
            }
        });
        return [
            ...allCreateTableStatements,
            ...allAlterTableStatements
        ].join('\n\n');
    }
    // FIXME split this method
    generateTableCode(table) {
        const lines = {
            columns: [],
            fkConstraints: [],
            otherConstraints: [],
            sequences: []
        };
        const outputTableName = this.tableNameCaseConverter.convertCase(table.name);
        const { columnLine: idColumnLine, pkConstraintLine } = this.idColumnCodeGenerator.generateIdColumnCode(outputTableName, table.identifierColumnName);
        lines.columns.push(idColumnLine);
        lines.otherConstraints.push(pkConstraintLine);
        this.processColumns(outputTableName, table.columns, lines);
        this.processReferences(outputTableName, table.references, lines);
        const createTableInnerLines = [
            ...lines.columns,
            ...lines.otherConstraints
        ];
        const createTableLines = [
            ...lines.sequences,
            `CREATE TABLE "${outputTableName}" (`,
            Object(_erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_4__["indentLines"])(createTableInnerLines).join(',\n'),
            ');'
        ];
        const createTableStatement = createTableLines.join('\n');
        const alterTableStatements = lines.fkConstraints.map(fkConstraintLine => {
            return `ALTER TABLE "${outputTableName}" ADD ${fkConstraintLine};`;
        }).join('\n');
        return {
            createTableStatement,
            alterTableStatements
        };
    }
    processColumns(outputTableName, columns, lines) {
        for (const column of columns) {
            const { columnLine, createSequenceLine, uniqueConstraintLine } = this.columnCodeGenerator.generateColumnCode(outputTableName, column);
            lines.columns.push(columnLine);
            if (createSequenceLine) {
                lines.sequences.push(createSequenceLine);
            }
            if (uniqueConstraintLine) {
                lines.otherConstraints.push(uniqueConstraintLine);
            }
        }
    }
    processReferences(outputTableName, references, lines) {
        for (const reference of references) {
            const { columnLine, uniqueConstraintLine, fkConstraintLine } = this.foreignColumnCodeGenerator.generateForeignColumnCode(outputTableName, reference);
            lines.columns.push(columnLine);
            lines.fkConstraints.push(fkConstraintLine);
            if (uniqueConstraintLine) {
                lines.otherConstraints.push(uniqueConstraintLine);
            }
        }
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/postgresql/column/PostgresqlColumnCodeGenerator.ts":
/*!*****************************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/postgresql/column/PostgresqlColumnCodeGenerator.ts ***!
  \*****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PostgresqlColumnCodeGenerator; });
class PostgresqlColumnCodeGenerator {
    constructor(typeResolver, columnNameCaseConverter) {
        this.typeResolver = typeResolver;
        this.columnNameCaseConverter = columnNameCaseConverter;
    }
    generateColumnCode(outputTableName, column, identity = false) {
        const outputColumnName = this.columnNameCaseConverter.convertCase(column.name);
        const autoincrementalSequenceName = this.getAutoincrementalSequenceName(outputTableName, outputColumnName);
        return {
            createSequenceLine: column.autoincremental ? this.generateCreateSequenceLine(autoincrementalSequenceName) : undefined,
            columnLine: this.generateColumnDeclarationLine(outputColumnName, column, identity, autoincrementalSequenceName),
            uniqueConstraintLine: column.unique ? this.generateUniqueConstraintLine(outputTableName, outputColumnName) : undefined
        };
    }
    getAutoincrementalSequenceName(outputTableName, outputColumnName) {
        return `${outputTableName}_${outputColumnName}_seq`;
    }
    generateCreateSequenceLine(autoincrementalSequenceName) {
        return `CREATE SEQUENCE "${autoincrementalSequenceName}" START WITH 1;`;
    }
    // FIXME refactor this methods - it receives too much arguments
    generateColumnDeclarationLine(outputColumnName, column, identity, autoincrementalSequenceName) {
        const { notNull, autoincremental, type, length } = column;
        const lineParts = [
            `"${outputColumnName}"`,
            this.generatePostgresqlTypeDeclaration(type, length)
        ];
        if (notNull) {
            lineParts.push('NOT NULL');
        }
        if (identity) {
            lineParts.push('GENERATED ALWAYS AS IDENTITY');
        }
        if (autoincremental) {
            lineParts.push(`DEFAULT nextval('"${autoincrementalSequenceName}"')`);
        }
        return lineParts.join(' ');
    }
    generatePostgresqlTypeDeclaration(type, length) {
        const postgresqlType = this.typeResolver.resolvePostgresqlType(type);
        const lengthCode = this.generateLengthCode(length);
        return postgresqlType + lengthCode;
    }
    generateLengthCode(length) {
        if (length.length === 0) {
            return '';
        }
        return `(${length.join(', ')})`;
    }
    generateUniqueConstraintLine(outputTableName, outputColumnName) {
        return `CONSTRAINT "${outputTableName}_${outputColumnName}_unique" UNIQUE ("${outputColumnName}")`;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/postgresql/column/PostgresqlForeignColumnCodeGenerator.ts":
/*!************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/postgresql/column/PostgresqlForeignColumnCodeGenerator.ts ***!
  \************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PostgresqlForeignColumnCodeGenerator; });
/* harmony import */ var _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/entity-relationship-model-types */ "./src/main/erdiagram/parser/entity-relationship-model-types.ts");

class PostgresqlForeignColumnCodeGenerator {
    constructor(columnCodeGenerator, tableNameCaseConverter, columnNameCaseConverter) {
        this.columnCodeGenerator = columnCodeGenerator;
        this.tableNameCaseConverter = tableNameCaseConverter;
        this.columnNameCaseConverter = columnNameCaseConverter;
    }
    generateForeignColumnCode(outputTableName, reference) {
        const columnDescriptor = this.createForeignKeyColumnDescriptor(reference);
        const { columnLine, uniqueConstraintLine } = this.columnCodeGenerator.generateColumnCode(outputTableName, columnDescriptor);
        return {
            columnLine,
            uniqueConstraintLine,
            fkConstraintLine: this.createForeignKeyConstraint(outputTableName, reference)
        };
    }
    createForeignKeyColumnDescriptor(reference) {
        const { columnName, notNull, unique } = reference;
        return {
            name: columnName,
            type: _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].IDENTIFIER,
            length: [],
            notNull,
            unique,
            autoincremental: false
        };
    }
    createForeignKeyConstraint(outputTableName, reference) {
        const outputColumnName = this.columnNameCaseConverter.convertCase(reference.columnName);
        const outputTargetTableName = this.tableNameCaseConverter.convertCase(reference.targetTableName);
        const outputTargetColumnName = this.columnNameCaseConverter.convertCase(reference.targetTableIdentifierColumnName);
        return `CONSTRAINT "${outputTableName}_${outputColumnName}_fk" FOREIGN KEY ("${outputColumnName}")`
            + ` REFERENCES "${outputTargetTableName}" ("${outputTargetColumnName}")`;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/postgresql/column/PostgresqlIdColumnCodeGenerator.ts":
/*!*******************************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/postgresql/column/PostgresqlIdColumnCodeGenerator.ts ***!
  \*******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PostgresqlIdColumnCodeGenerator; });
/* harmony import */ var _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/entity-relationship-model-types */ "./src/main/erdiagram/parser/entity-relationship-model-types.ts");

class PostgresqlIdColumnCodeGenerator {
    constructor(columnCodeGenerator, columnNameCaseConverter) {
        this.columnCodeGenerator = columnCodeGenerator;
        this.columnNameCaseConverter = columnNameCaseConverter;
    }
    generateIdColumnCode(outputTableName, identifierColumnName) {
        const column = this.createIdColumnDescriptor(identifierColumnName);
        const { columnLine } = this.columnCodeGenerator.generateColumnCode(outputTableName, column, true);
        const pkConstraintLine = this.createPrimaryKeyConstraint(outputTableName, column);
        return {
            columnLine,
            pkConstraintLine
        };
    }
    createIdColumnDescriptor(identifierColumnName) {
        return {
            name: identifierColumnName,
            type: _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].IDENTIFIER,
            length: [],
            notNull: true,
            // Autoincrement of identity columns have to be achieved using serial types,
            // while other autoincremental columns have to use a custom sequence.
            autoincremental: false,
            // As primary keys are unique by default, we don't
            // need to manually define an UNIQUE KEY constraint
            unique: false
        };
    }
    createPrimaryKeyConstraint(outputTableName, column) {
        const columnName = this.columnNameCaseConverter.convertCase(column.name);
        return `CONSTRAINT "${outputTableName}_pk" PRIMARY KEY ("${columnName}")`;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/postgresql/config/PostgresqlDatabaseModelToCodeConverterConfigManager.ts":
/*!***************************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/postgresql/config/PostgresqlDatabaseModelToCodeConverterConfigManager.ts ***!
  \***************************************************************************************************************************************/
/*! exports provided: PostgresqlDatabaseModelToCodeConverterConfigManager, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostgresqlDatabaseModelToCodeConverterConfigManager", function() { return PostgresqlDatabaseModelToCodeConverterConfigManager; });
/* harmony import */ var _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/entity-relationship-model-types */ "./src/main/erdiagram/parser/entity-relationship-model-types.ts");
/* harmony import */ var _erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/generator/common/case-format/StandardCaseFormats */ "./src/main/erdiagram/generator/common/case-format/StandardCaseFormats.ts");
/* harmony import */ var _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/common/config/AbstractComponentConfigManager */ "./src/main/erdiagram/common/config/AbstractComponentConfigManager.ts");
/* harmony import */ var _erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/util/record-utils */ "./src/main/erdiagram/util/record-utils.ts");




class PostgresqlDatabaseModelToCodeConverterConfigManager extends _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_2__["default"] {
    getDefaultConfig() {
        return {
            typeBindings: {
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].IDENTIFIER]: 'BIGINT',
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].TEXT]: 'VARCHAR',
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].LONG]: 'BIGINT',
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].INT]: 'INTEGER',
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].SHORT]: 'SMALLINT',
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].DECIMAL]: 'DECIMAL',
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].BOOLEAN]: 'BOOLEAN',
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].DATE]: 'DATE',
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].TIME]: 'TIME',
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].DATETIME]: 'TIMESTAMP',
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].BLOB]: 'BYTEA'
            },
            tableNameCaseFormat: _erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"].LOWER_UNDERSCORE,
            columnNameCaseFormat: _erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"].LOWER_UNDERSCORE,
        };
    }
    mergeConfigs(fullConfig, partialConfig) {
        return Object.assign(Object.assign(Object.assign({}, fullConfig), partialConfig), { typeBindings: Object.assign(Object.assign({}, fullConfig.typeBindings), partialConfig === null || partialConfig === void 0 ? void 0 : partialConfig.typeBindings) });
    }
    convertToSerializableObject(fullConfig) {
        return Object.assign(Object.assign({}, fullConfig), { tableNameCaseFormat: Object(_erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_3__["findKeyFromValue"])(_erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"], fullConfig.tableNameCaseFormat), columnNameCaseFormat: Object(_erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_3__["findKeyFromValue"])(_erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"], fullConfig.columnNameCaseFormat) });
    }
    convertFromSerializableObject(serializableConfig) {
        return Object.assign(Object.assign({}, serializableConfig), { tableNameCaseFormat: Object(_erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_3__["findValueFromNullableKey"])(_erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"], serializableConfig.tableNameCaseFormat, _erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"].UPPER_CAMEL), columnNameCaseFormat: Object(_erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_3__["findValueFromNullableKey"])(_erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"], serializableConfig.columnNameCaseFormat, _erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"].UPPER_CAMEL) });
    }
}
const postgresqlDatabaseModelToCodeConverterConfigManager = new PostgresqlDatabaseModelToCodeConverterConfigManager();
/* harmony default export */ __webpack_exports__["default"] = (postgresqlDatabaseModelToCodeConverterConfigManager);


/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/postgresql/config/exports.ts":
/*!*******************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/postgresql/config/exports.ts ***!
  \*******************************************************************************************/
/*! exports provided: PostgresqlDatabaseModelToCodeConverterConfigManager, postgresqlDatabaseModelToCodeConverterConfigManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PostgresqlDatabaseModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PostgresqlDatabaseModelToCodeConverterConfigManager */ "./src/main/erdiagram/generator/database/code-converter/postgresql/config/PostgresqlDatabaseModelToCodeConverterConfigManager.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PostgresqlDatabaseModelToCodeConverterConfigManager", function() { return _PostgresqlDatabaseModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_0__["PostgresqlDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "postgresqlDatabaseModelToCodeConverterConfigManager", function() { return _PostgresqlDatabaseModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"]; });





/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/postgresql/exports.ts":
/*!************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/postgresql/exports.ts ***!
  \************************************************************************************/
/*! exports provided: PostgresqlDatabaseModelToCodeConverterConfigManager, postgresqlDatabaseModelToCodeConverterConfigManager, PostgresqlDatabaseModelToCodeConverter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PostgresqlDatabaseModelToCodeConverter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PostgresqlDatabaseModelToCodeConverter */ "./src/main/erdiagram/generator/database/code-converter/postgresql/PostgresqlDatabaseModelToCodeConverter.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PostgresqlDatabaseModelToCodeConverter", function() { return _PostgresqlDatabaseModelToCodeConverter__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _config_exports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config/exports */ "./src/main/erdiagram/generator/database/code-converter/postgresql/config/exports.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PostgresqlDatabaseModelToCodeConverterConfigManager", function() { return _config_exports__WEBPACK_IMPORTED_MODULE_1__["PostgresqlDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "postgresqlDatabaseModelToCodeConverterConfigManager", function() { return _config_exports__WEBPACK_IMPORTED_MODULE_1__["postgresqlDatabaseModelToCodeConverterConfigManager"]; });






/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/postgresql/type/PostgresqlTypeResolver.ts":
/*!********************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/postgresql/type/PostgresqlTypeResolver.ts ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PostgresqlTypeResolver; });
class PostgresqlTypeResolver {
    constructor(typeBindings) {
        this.typeBindings = typeBindings;
    }
    resolvePostgresqlType(type) {
        /* istanbul ignore next */
        if (!this.typeBindings.hasOwnProperty(type)) {
            throw new Error('Unsupported type: ' + type);
        }
        return this.typeBindings[type];
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/sqlserver/SqlServerDatabaseModelToCodeConverter.ts":
/*!*****************************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/sqlserver/SqlServerDatabaseModelToCodeConverter.ts ***!
  \*****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SqlServerDatabaseModelToCodeConverter; });
/* harmony import */ var _erdiagram_generator_database_code_converter_sqlserver_column_SqlServerColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/generator/database/code-converter/sqlserver/column/SqlServerColumnCodeGenerator */ "./src/main/erdiagram/generator/database/code-converter/sqlserver/column/SqlServerColumnCodeGenerator.ts");
/* harmony import */ var _erdiagram_generator_database_code_converter_sqlserver_type_SqlServerTypeResolver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/generator/database/code-converter/sqlserver/type/SqlServerTypeResolver */ "./src/main/erdiagram/generator/database/code-converter/sqlserver/type/SqlServerTypeResolver.ts");
/* harmony import */ var _erdiagram_generator_database_code_converter_sqlserver_column_SqlServerIdColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/generator/database/code-converter/sqlserver/column/SqlServerIdColumnCodeGenerator */ "./src/main/erdiagram/generator/database/code-converter/sqlserver/column/SqlServerIdColumnCodeGenerator.ts");
/* harmony import */ var _erdiagram_generator_database_code_converter_sqlserver_column_SqlServerForeignColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/generator/database/code-converter/sqlserver/column/SqlServerForeignColumnCodeGenerator */ "./src/main/erdiagram/generator/database/code-converter/sqlserver/column/SqlServerForeignColumnCodeGenerator.ts");
/* harmony import */ var _erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/erdiagram/util/indent-utils */ "./src/main/erdiagram/util/indent-utils.ts");
/* harmony import */ var _erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/erdiagram/generator/common/case-format/StandardCaseFormats */ "./src/main/erdiagram/generator/common/case-format/StandardCaseFormats.ts");
/* harmony import */ var _erdiagram_generator_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/erdiagram/generator/common/case-format/CaseConverter */ "./src/main/erdiagram/generator/common/case-format/CaseConverter.ts");
/* harmony import */ var _erdiagram_generator_database_code_converter_sqlserver_config_SqlServerDatabaseModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/erdiagram/generator/database/code-converter/sqlserver/config/SqlServerDatabaseModelToCodeConverterConfigManager */ "./src/main/erdiagram/generator/database/code-converter/sqlserver/config/SqlServerDatabaseModelToCodeConverterConfigManager.ts");








class SqlServerDatabaseModelToCodeConverter {
    constructor(config) {
        this.config = _erdiagram_generator_database_code_converter_sqlserver_config_SqlServerDatabaseModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_7__["default"].mergeWithDefaultConfig(config);
        this.tableNameCaseConverter = new _erdiagram_generator_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_6__["default"](_erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_5__["default"].LOWER_CAMEL, this.config.tableNameCaseFormat);
        const columnNameCaseConverter = new _erdiagram_generator_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_6__["default"](_erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_5__["default"].LOWER_CAMEL, this.config.columnNameCaseFormat);
        this.columnCodeGenerator = new _erdiagram_generator_database_code_converter_sqlserver_column_SqlServerColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_0__["default"](new _erdiagram_generator_database_code_converter_sqlserver_type_SqlServerTypeResolver__WEBPACK_IMPORTED_MODULE_1__["default"](this.config.typeBindings), columnNameCaseConverter);
        this.idColumnCodeGenerator = new _erdiagram_generator_database_code_converter_sqlserver_column_SqlServerIdColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_2__["default"](this.columnCodeGenerator, columnNameCaseConverter);
        this.foreignColumnCodeGenerator = new _erdiagram_generator_database_code_converter_sqlserver_column_SqlServerForeignColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_3__["default"](this.columnCodeGenerator, this.tableNameCaseConverter, columnNameCaseConverter);
    }
    convertToCode(databaseModel) {
        const allCreateTableStatements = [];
        const allAlterTableStatements = [];
        databaseModel.tables
            .map(table => this.generateTableCode(table))
            .forEach(({ createTableStatement, alterTableStatements }) => {
            allCreateTableStatements.push(createTableStatement);
            if (alterTableStatements) {
                allAlterTableStatements.push(alterTableStatements);
            }
        });
        return [
            ...allCreateTableStatements,
            ...allAlterTableStatements
        ].join('\n\n');
    }
    // FIXME split this method
    generateTableCode(table) {
        const lines = {
            columns: [],
            fkConstraints: [],
            otherConstraints: [],
            sequences: []
        };
        const outputTableName = this.tableNameCaseConverter.convertCase(table.name);
        const { columnLine: idColumnLine, pkConstraintLine } = this.idColumnCodeGenerator.generateIdColumnCode(outputTableName, table.identifierColumnName);
        lines.columns.push(idColumnLine);
        lines.otherConstraints.push(pkConstraintLine);
        this.processColumns(outputTableName, table.columns, lines);
        this.processReferences(outputTableName, table.references, lines);
        const createTableInnerLines = [
            ...lines.columns,
            ...lines.otherConstraints
        ];
        const createTableLines = [
            ...lines.sequences,
            `CREATE TABLE "${outputTableName}" (`,
            Object(_erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_4__["indentLines"])(createTableInnerLines).join(',\n'),
            ');'
        ];
        const createTableStatement = createTableLines.join('\n');
        const alterTableStatements = lines.fkConstraints.map(fkConstraintLine => {
            return `ALTER TABLE "${outputTableName}" ADD ${fkConstraintLine};`;
        }).join('\n');
        return {
            createTableStatement,
            alterTableStatements
        };
    }
    processColumns(outputTableName, columns, lines) {
        for (const column of columns) {
            const { columnLine, createSequenceLine, uniqueConstraintLine } = this.columnCodeGenerator.generateColumnCode(outputTableName, column);
            lines.columns.push(columnLine);
            if (createSequenceLine) {
                lines.sequences.push(createSequenceLine);
            }
            if (uniqueConstraintLine) {
                lines.otherConstraints.push(uniqueConstraintLine);
            }
        }
    }
    processReferences(outputTableName, references, lines) {
        for (const reference of references) {
            const { columnLine, uniqueConstraintLine, fkConstraintLine } = this.foreignColumnCodeGenerator.generateForeignColumnCode(outputTableName, reference);
            lines.columns.push(columnLine);
            lines.fkConstraints.push(fkConstraintLine);
            if (uniqueConstraintLine) {
                lines.otherConstraints.push(uniqueConstraintLine);
            }
        }
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/sqlserver/column/SqlServerColumnCodeGenerator.ts":
/*!***************************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/sqlserver/column/SqlServerColumnCodeGenerator.ts ***!
  \***************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SqlServerColumnCodeGenerator; });
class SqlServerColumnCodeGenerator {
    constructor(typeResolver, columnNameCaseConverter) {
        this.typeResolver = typeResolver;
        this.columnNameCaseConverter = columnNameCaseConverter;
    }
    // FIXME refactor the way "identity" flag is used
    generateColumnCode(outputTableName, column, identity = false) {
        const outputColumnName = this.columnNameCaseConverter.convertCase(column.name);
        const autoincrementalSequenceName = this.getAutoincrementalSequenceName(outputTableName, outputColumnName);
        return {
            createSequenceLine: column.autoincremental ? this.generateCreateSequenceLine(autoincrementalSequenceName) : undefined,
            columnLine: this.generateColumnDeclarationLine(outputColumnName, column, identity, autoincrementalSequenceName),
            uniqueConstraintLine: column.unique ? this.generateUniqueConstraintLine(outputTableName, outputColumnName) : undefined
        };
    }
    getAutoincrementalSequenceName(outputTableName, outputColumnName) {
        return `${outputTableName}_${outputColumnName}_seq`;
    }
    generateCreateSequenceLine(autoincrementalSequenceName) {
        return `CREATE SEQUENCE "${autoincrementalSequenceName}" START WITH 1;`;
    }
    // FIXME refactor this methods - it receives too much arguments
    generateColumnDeclarationLine(outputColumnName, column, identity, autoincrementalSequenceName) {
        const { notNull, autoincremental, type, length } = column;
        const lineParts = [
            `"${outputColumnName}"`,
            this.generateSqlServerTypeDeclaration(type, length)
        ];
        if (notNull) {
            lineParts.push('NOT NULL');
        }
        if (identity) {
            lineParts.push('IDENTITY(1, 1)');
        }
        if (autoincremental) {
            lineParts.push(`DEFAULT NEXT VALUE FOR "${autoincrementalSequenceName}"`);
        }
        return lineParts.join(' ');
    }
    generateSqlServerTypeDeclaration(type, length) {
        const sqlServerType = this.typeResolver.resolveSqlServerType(type);
        const lengthCode = this.generateLengthCode(length);
        return sqlServerType + lengthCode;
    }
    generateLengthCode(length) {
        if (length.length === 0) {
            return '';
        }
        return `(${length.join(', ')})`;
    }
    generateUniqueConstraintLine(outputTableName, outputColumnName) {
        return `CONSTRAINT "${outputTableName}_${outputColumnName}_unique" UNIQUE ("${outputColumnName}")`;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/sqlserver/column/SqlServerForeignColumnCodeGenerator.ts":
/*!**********************************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/sqlserver/column/SqlServerForeignColumnCodeGenerator.ts ***!
  \**********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SqlServerForeignColumnCodeGenerator; });
/* harmony import */ var _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/entity-relationship-model-types */ "./src/main/erdiagram/parser/entity-relationship-model-types.ts");

class SqlServerForeignColumnCodeGenerator {
    constructor(columnCodeGenerator, tableNameCaseConverter, columnNameCaseConverter) {
        this.columnCodeGenerator = columnCodeGenerator;
        this.tableNameCaseConverter = tableNameCaseConverter;
        this.columnNameCaseConverter = columnNameCaseConverter;
    }
    generateForeignColumnCode(outputTableName, reference) {
        const columnDescriptor = this.createForeignKeyColumnDescriptor(reference);
        const { columnLine, uniqueConstraintLine } = this.columnCodeGenerator.generateColumnCode(outputTableName, columnDescriptor);
        return {
            columnLine,
            uniqueConstraintLine,
            fkConstraintLine: this.createForeignKeyConstraint(outputTableName, reference)
        };
    }
    createForeignKeyColumnDescriptor(reference) {
        const { columnName, notNull, unique } = reference;
        return {
            name: columnName,
            type: _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].IDENTIFIER,
            length: [],
            notNull,
            unique,
            autoincremental: false
        };
    }
    createForeignKeyConstraint(outputTableName, reference) {
        const outputColumnName = this.columnNameCaseConverter.convertCase(reference.columnName);
        const outputTargetTableName = this.tableNameCaseConverter.convertCase(reference.targetTableName);
        const outputTargetColumnName = this.columnNameCaseConverter.convertCase(reference.targetTableIdentifierColumnName);
        return `CONSTRAINT "${outputTableName}_${outputColumnName}_fk" FOREIGN KEY ("${outputColumnName}")`
            + ` REFERENCES "${outputTargetTableName}" ("${outputTargetColumnName}")`;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/sqlserver/column/SqlServerIdColumnCodeGenerator.ts":
/*!*****************************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/sqlserver/column/SqlServerIdColumnCodeGenerator.ts ***!
  \*****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SqlServerIdColumnCodeGenerator; });
/* harmony import */ var _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/entity-relationship-model-types */ "./src/main/erdiagram/parser/entity-relationship-model-types.ts");

class SqlServerIdColumnCodeGenerator {
    constructor(columnCodeGenerator, columnNameCaseConverter) {
        this.columnCodeGenerator = columnCodeGenerator;
        this.columnNameCaseConverter = columnNameCaseConverter;
    }
    generateIdColumnCode(outputTableName, identifierColumnName) {
        const column = this.createIdColumnDescriptor(identifierColumnName);
        const { columnLine } = this.columnCodeGenerator.generateColumnCode(outputTableName, column, true);
        const pkConstraintLine = this.createPrimaryKeyConstraint(outputTableName, column);
        return {
            columnLine,
            pkConstraintLine
        };
    }
    createIdColumnDescriptor(identifierColumnName) {
        return {
            name: identifierColumnName,
            type: _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].IDENTIFIER,
            length: [],
            notNull: true,
            // Autoincrement of identity columns have to be achieved using IDENTITY,
            // while other autoincremental columns have to use a custom sequence.
            autoincremental: false,
            // As primary keys are unique by default, we don't
            // need to manually define an UNIQUE KEY constraint
            unique: false
        };
    }
    createPrimaryKeyConstraint(outputTableName, column) {
        const columnName = this.columnNameCaseConverter.convertCase(column.name);
        return `CONSTRAINT "${outputTableName}_pk" PRIMARY KEY ("${columnName}")`;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/sqlserver/config/SqlServerDatabaseModelToCodeConverterConfigManager.ts":
/*!*************************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/sqlserver/config/SqlServerDatabaseModelToCodeConverterConfigManager.ts ***!
  \*************************************************************************************************************************************/
/*! exports provided: SqlServerDatabaseModelToCodeConverterConfigManager, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SqlServerDatabaseModelToCodeConverterConfigManager", function() { return SqlServerDatabaseModelToCodeConverterConfigManager; });
/* harmony import */ var _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/entity-relationship-model-types */ "./src/main/erdiagram/parser/entity-relationship-model-types.ts");
/* harmony import */ var _erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/generator/common/case-format/StandardCaseFormats */ "./src/main/erdiagram/generator/common/case-format/StandardCaseFormats.ts");
/* harmony import */ var _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/common/config/AbstractComponentConfigManager */ "./src/main/erdiagram/common/config/AbstractComponentConfigManager.ts");
/* harmony import */ var _erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/util/record-utils */ "./src/main/erdiagram/util/record-utils.ts");




class SqlServerDatabaseModelToCodeConverterConfigManager extends _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_2__["default"] {
    getDefaultConfig() {
        return {
            typeBindings: {
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].IDENTIFIER]: 'BIGINT',
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].TEXT]: 'NVARCHAR',
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].LONG]: 'BIGINT',
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].INT]: 'INT',
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].SHORT]: 'SMALLINT',
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].DECIMAL]: 'DECIMAL',
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].BOOLEAN]: 'BIT',
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].DATE]: 'DATE',
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].TIME]: 'TIME',
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].DATETIME]: 'DATETIME2',
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].BLOB]: 'VARBINARY(MAX)'
            },
            tableNameCaseFormat: _erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"].UPPER_CAMEL,
            columnNameCaseFormat: _erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"].UPPER_CAMEL,
        };
    }
    mergeConfigs(fullConfig, partialConfig) {
        return Object.assign(Object.assign(Object.assign({}, fullConfig), partialConfig), { typeBindings: Object.assign(Object.assign({}, fullConfig.typeBindings), partialConfig === null || partialConfig === void 0 ? void 0 : partialConfig.typeBindings) });
    }
    convertToSerializableObject(fullConfig) {
        return Object.assign(Object.assign({}, fullConfig), { tableNameCaseFormat: Object(_erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_3__["findKeyFromValue"])(_erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"], fullConfig.tableNameCaseFormat), columnNameCaseFormat: Object(_erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_3__["findKeyFromValue"])(_erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"], fullConfig.columnNameCaseFormat) });
    }
    convertFromSerializableObject(serializableConfig) {
        return Object.assign(Object.assign({}, serializableConfig), { tableNameCaseFormat: Object(_erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_3__["findValueFromNullableKey"])(_erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"], serializableConfig.tableNameCaseFormat, _erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"].UPPER_CAMEL), columnNameCaseFormat: Object(_erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_3__["findValueFromNullableKey"])(_erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"], serializableConfig.columnNameCaseFormat, _erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"].UPPER_CAMEL) });
    }
}
const sqlServerDatabaseModelToCodeConverterConfigManager = new SqlServerDatabaseModelToCodeConverterConfigManager();
/* harmony default export */ __webpack_exports__["default"] = (sqlServerDatabaseModelToCodeConverterConfigManager);


/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/sqlserver/config/exports.ts":
/*!******************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/sqlserver/config/exports.ts ***!
  \******************************************************************************************/
/*! exports provided: SqlServerDatabaseModelToCodeConverterConfigManager, sqlServerDatabaseModelToCodeConverterConfigManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SqlServerDatabaseModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SqlServerDatabaseModelToCodeConverterConfigManager */ "./src/main/erdiagram/generator/database/code-converter/sqlserver/config/SqlServerDatabaseModelToCodeConverterConfigManager.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SqlServerDatabaseModelToCodeConverterConfigManager", function() { return _SqlServerDatabaseModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_0__["SqlServerDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sqlServerDatabaseModelToCodeConverterConfigManager", function() { return _SqlServerDatabaseModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"]; });





/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/sqlserver/exports.ts":
/*!***********************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/sqlserver/exports.ts ***!
  \***********************************************************************************/
/*! exports provided: SqlServerDatabaseModelToCodeConverterConfigManager, sqlServerDatabaseModelToCodeConverterConfigManager, SqlServerDatabaseModelToCodeConverter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SqlServerDatabaseModelToCodeConverter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SqlServerDatabaseModelToCodeConverter */ "./src/main/erdiagram/generator/database/code-converter/sqlserver/SqlServerDatabaseModelToCodeConverter.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SqlServerDatabaseModelToCodeConverter", function() { return _SqlServerDatabaseModelToCodeConverter__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _config_exports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config/exports */ "./src/main/erdiagram/generator/database/code-converter/sqlserver/config/exports.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SqlServerDatabaseModelToCodeConverterConfigManager", function() { return _config_exports__WEBPACK_IMPORTED_MODULE_1__["SqlServerDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sqlServerDatabaseModelToCodeConverterConfigManager", function() { return _config_exports__WEBPACK_IMPORTED_MODULE_1__["sqlServerDatabaseModelToCodeConverterConfigManager"]; });






/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/sqlserver/type/SqlServerTypeResolver.ts":
/*!******************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/sqlserver/type/SqlServerTypeResolver.ts ***!
  \******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SqlServerTypeResolver; });
class SqlServerTypeResolver {
    constructor(typeBindings) {
        this.typeBindings = typeBindings;
    }
    resolveSqlServerType(type) {
        /* istanbul ignore next */
        if (!this.typeBindings.hasOwnProperty(type)) {
            throw new Error('Unsupported type: ' + type);
        }
        return this.typeBindings[type];
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/database/exports.ts":
/*!**********************************************************!*\
  !*** ./src/main/erdiagram/generator/database/exports.ts ***!
  \**********************************************************/
/*! exports provided: MysqlDatabaseModelToCodeConverterConfigManager, mysqlDatabaseModelToCodeConverterConfigManager, MysqlDatabaseModelToCodeConverter, OracleDatabaseModelToCodeConverterConfigManager, oracleDatabaseModelToCodeConverterConfigManager, OracleDatabaseModelToCodeConverter, SqlServerDatabaseModelToCodeConverterConfigManager, sqlServerDatabaseModelToCodeConverterConfigManager, SqlServerDatabaseModelToCodeConverter, PostgresqlDatabaseModelToCodeConverterConfigManager, postgresqlDatabaseModelToCodeConverterConfigManager, PostgresqlDatabaseModelToCodeConverter, EntityRelationshipModelToDatabaseCodeConverter, DatabaseModelGeneratorConfigManager, databaseModelGeneratorConfigManager, DatabaseModelGenerator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _code_converter_exports__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./code-converter/exports */ "./src/main/erdiagram/generator/database/code-converter/exports.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MysqlDatabaseModelToCodeConverterConfigManager", function() { return _code_converter_exports__WEBPACK_IMPORTED_MODULE_0__["MysqlDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mysqlDatabaseModelToCodeConverterConfigManager", function() { return _code_converter_exports__WEBPACK_IMPORTED_MODULE_0__["mysqlDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MysqlDatabaseModelToCodeConverter", function() { return _code_converter_exports__WEBPACK_IMPORTED_MODULE_0__["MysqlDatabaseModelToCodeConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OracleDatabaseModelToCodeConverterConfigManager", function() { return _code_converter_exports__WEBPACK_IMPORTED_MODULE_0__["OracleDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "oracleDatabaseModelToCodeConverterConfigManager", function() { return _code_converter_exports__WEBPACK_IMPORTED_MODULE_0__["oracleDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OracleDatabaseModelToCodeConverter", function() { return _code_converter_exports__WEBPACK_IMPORTED_MODULE_0__["OracleDatabaseModelToCodeConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SqlServerDatabaseModelToCodeConverterConfigManager", function() { return _code_converter_exports__WEBPACK_IMPORTED_MODULE_0__["SqlServerDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sqlServerDatabaseModelToCodeConverterConfigManager", function() { return _code_converter_exports__WEBPACK_IMPORTED_MODULE_0__["sqlServerDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SqlServerDatabaseModelToCodeConverter", function() { return _code_converter_exports__WEBPACK_IMPORTED_MODULE_0__["SqlServerDatabaseModelToCodeConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PostgresqlDatabaseModelToCodeConverterConfigManager", function() { return _code_converter_exports__WEBPACK_IMPORTED_MODULE_0__["PostgresqlDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "postgresqlDatabaseModelToCodeConverterConfigManager", function() { return _code_converter_exports__WEBPACK_IMPORTED_MODULE_0__["postgresqlDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PostgresqlDatabaseModelToCodeConverter", function() { return _code_converter_exports__WEBPACK_IMPORTED_MODULE_0__["PostgresqlDatabaseModelToCodeConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EntityRelationshipModelToDatabaseCodeConverter", function() { return _code_converter_exports__WEBPACK_IMPORTED_MODULE_0__["EntityRelationshipModelToDatabaseCodeConverter"]; });

/* harmony import */ var _model_exports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model/exports */ "./src/main/erdiagram/generator/database/model/exports.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DatabaseModelGeneratorConfigManager", function() { return _model_exports__WEBPACK_IMPORTED_MODULE_1__["DatabaseModelGeneratorConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "databaseModelGeneratorConfigManager", function() { return _model_exports__WEBPACK_IMPORTED_MODULE_1__["databaseModelGeneratorConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DatabaseModelGenerator", function() { return _model_exports__WEBPACK_IMPORTED_MODULE_1__["DatabaseModelGenerator"]; });





/***/ }),

/***/ "./src/main/erdiagram/generator/database/model/DatabaseModelGenerator.ts":
/*!*******************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/model/DatabaseModelGenerator.ts ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DatabaseModelGenerator; });
/* harmony import */ var pluralize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pluralize */ "./node_modules/pluralize/pluralize.js");
/* harmony import */ var pluralize__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pluralize__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/parser/entity-relationship-model-types */ "./src/main/erdiagram/parser/entity-relationship-model-types.ts");
/* harmony import */ var _erdiagram_generator_database_model_config_DatabaseModelGeneratorConfigManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/generator/database/model/config/DatabaseModelGeneratorConfigManager */ "./src/main/erdiagram/generator/database/model/config/DatabaseModelGeneratorConfigManager.ts");
/* harmony import */ var _erdiagram_util_map_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/util/map-utils */ "./src/main/erdiagram/util/map-utils.ts");
/* harmony import */ var _erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/erdiagram/util/string-utils */ "./src/main/erdiagram/util/string-utils.ts");





class DatabaseModelGenerator {
    constructor(config) {
        this.config = _erdiagram_generator_database_model_config_DatabaseModelGeneratorConfigManager__WEBPACK_IMPORTED_MODULE_2__["default"].mergeWithDefaultConfig(config);
    }
    generateDatabaseModel(model) {
        const entityIdentifiersMap = Object(_erdiagram_util_map_utils__WEBPACK_IMPORTED_MODULE_3__["classifyBy"])(model.entities.filter(entity => entity.identifierPropertyName), entity => entity.name, entity => entity.identifierPropertyName);
        const tables = [];
        this.generateEntityTables(model, entityIdentifiersMap, tables);
        this.generateRelationshipTables(model, entityIdentifiersMap, tables);
        return {
            tables
        };
    }
    generateEntityTables(model, entityIdentifiersMap, tables) {
        model.entities
            .map(entity => this.generateEntityTable(entity, model, entityIdentifiersMap))
            .forEach(sentence => tables.push(sentence));
    }
    generateEntityTable(entity, model, entityIdentifiersMap) {
        const columns = [];
        const references = [];
        for (const property of entity.properties) {
            columns.push(this.mapPropertyToColumn(property));
        }
        for (const relationship of model.relationships) {
            if (relationship.rightMember.cardinality !== _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_1__["Cardinality"].MANY) {
                if (relationship.leftMember.entity === entity.name) {
                    const isOneToOneRelationship = relationship.leftMember.cardinality !== _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_1__["Cardinality"].MANY;
                    references.push(this.createTableReference(relationship.rightMember, entityIdentifiersMap, isOneToOneRelationship));
                }
            }
            else if (relationship.leftMember.cardinality !== _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_1__["Cardinality"].MANY) {
                if (relationship.rightMember.entity === entity.name) {
                    references.push(this.createTableReference(relationship.leftMember, entityIdentifiersMap));
                }
            }
        }
        return {
            name: this.pluralizeEntityNameIfApplies(entity.name),
            identifierColumnName: this.getIdentifierColumnName(entity.name, entityIdentifiersMap),
            columns,
            references
        };
    }
    generateRelationshipTables(model, entityIdentifiersMap, tables) {
        model.relationships
            .filter(relationship => this.isManyToManyRelationship(relationship))
            .map(relationship => this.generateRelationshipTable(relationship, entityIdentifiersMap))
            .forEach(sentence => tables.push(sentence));
    }
    generateRelationshipTable(relationship, entityIdentifiersMap) {
        const name = this.getRelationshipTableName(relationship);
        const identifierColumnName = this.getRelationshipTableIdentifierColumnName(relationship, entityIdentifiersMap);
        return {
            name,
            identifierColumnName,
            columns: [],
            references: [
                this.createTableReference(relationship.leftMember, entityIdentifiersMap),
                this.createTableReference(relationship.rightMember, entityIdentifiersMap)
            ]
        };
    }
    getRelationshipTableName(relationship) {
        const { relationshipName, leftMember, rightMember } = relationship;
        if (relationshipName) {
            return relationshipName;
        }
        return this.pluralizeEntityNameIfApplies(leftMember.entity)
            + this.pluralizeEntityNameIfApplies(rightMember.entity);
    }
    getRelationshipTableIdentifierColumnName(relationship, entityIdentifiersMap) {
        const { relationshipName, leftMember, rightMember } = relationship;
        if (relationshipName) {
            return this.getIdentifierColumnName(relationshipName, entityIdentifiersMap);
        }
        return this.getIdentifierColumnName(leftMember.entity + rightMember.entity, entityIdentifiersMap);
    }
    createTableReference(toMember, entityIdentifiersMap, unique = false) {
        const { entityAlias, entity, cardinality } = toMember;
        return {
            columnName: `${entityAlias}Id`,
            targetTableName: this.pluralizeEntityNameIfApplies(entity),
            targetTableIdentifierColumnName: this.getIdentifierColumnName(entity, entityIdentifiersMap),
            notNull: cardinality !== _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_1__["Cardinality"].ZERO_OR_ONE,
            unique
        };
    }
    pluralizeEntityNameIfApplies(entityName) {
        if (!this.config.usePluralTableNames) {
            return entityName;
        }
        // pluralize() takes into account the case of the word, so 'A' is pluralized to 'AS' instead of 'As'.
        // This means that we have to uncapitalize the entity name before calling pluralize() in order to get the
        // expected behavior, then capitalize the result.
        const uncapitalizedEntityName = Object(_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_4__["uncapitalizeWord"])(entityName);
        const pluralizedUncapitalizedEntityName = pluralize__WEBPACK_IMPORTED_MODULE_0___default()(uncapitalizedEntityName);
        return Object(_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_4__["capitalizeWord"])(pluralizedUncapitalizedEntityName);
    }
    getIdentifierColumnName(entityName, entityIdentifiersMap) {
        if (entityIdentifiersMap.has(entityName)) {
            return entityIdentifiersMap.get(entityName);
        }
        const { idNamingStrategy } = this.config;
        return idNamingStrategy(entityName);
    }
    mapPropertyToColumn(property) {
        const { name, optional, autoincremental, unique, type, length } = property;
        return {
            name,
            notNull: !optional,
            autoincremental,
            unique,
            type,
            length
        };
    }
    isManyToManyRelationship(relationship) {
        return [
            relationship.leftMember,
            relationship.rightMember
        ].every(member => member.cardinality === _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_1__["Cardinality"].MANY);
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/database/model/config/DatabaseModelGeneratorConfigManager.ts":
/*!***************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/model/config/DatabaseModelGeneratorConfigManager.ts ***!
  \***************************************************************************************************/
/*! exports provided: DatabaseModelGeneratorConfigManager, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DatabaseModelGeneratorConfigManager", function() { return DatabaseModelGeneratorConfigManager; });
/* harmony import */ var _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/common/config/AbstractComponentConfigManager */ "./src/main/erdiagram/common/config/AbstractComponentConfigManager.ts");
/* harmony import */ var _erdiagram_generator_common_id_naming_strategy_StandardIdNamingStrategies__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/generator/common/id-naming-strategy/StandardIdNamingStrategies */ "./src/main/erdiagram/generator/common/id-naming-strategy/StandardIdNamingStrategies.ts");
/* harmony import */ var _erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/util/record-utils */ "./src/main/erdiagram/util/record-utils.ts");



class DatabaseModelGeneratorConfigManager extends _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"] {
    getDefaultConfig() {
        return {
            usePluralTableNames: false,
            idNamingStrategy: _erdiagram_generator_common_id_naming_strategy_StandardIdNamingStrategies__WEBPACK_IMPORTED_MODULE_1__["default"].DEFAULT
        };
    }
    mergeConfigs(fullConfig, partialConfig) {
        return Object.assign(Object.assign({}, fullConfig), partialConfig);
    }
    convertToSerializableObject(fullConfig) {
        return Object.assign(Object.assign({}, fullConfig), { idNamingStrategy: Object(_erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_2__["findKeyFromValue"])(_erdiagram_generator_common_id_naming_strategy_StandardIdNamingStrategies__WEBPACK_IMPORTED_MODULE_1__["default"], fullConfig.idNamingStrategy) });
    }
    convertFromSerializableObject(serializableConfig) {
        return Object.assign(Object.assign({}, serializableConfig), { idNamingStrategy: Object(_erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_2__["findValueFromNullableKey"])(_erdiagram_generator_common_id_naming_strategy_StandardIdNamingStrategies__WEBPACK_IMPORTED_MODULE_1__["default"], serializableConfig.idNamingStrategy, _erdiagram_generator_common_id_naming_strategy_StandardIdNamingStrategies__WEBPACK_IMPORTED_MODULE_1__["default"].DEFAULT) });
    }
}
const databaseModelGeneratorConfigManager = new DatabaseModelGeneratorConfigManager();
/* harmony default export */ __webpack_exports__["default"] = (databaseModelGeneratorConfigManager);


/***/ }),

/***/ "./src/main/erdiagram/generator/database/model/config/exports.ts":
/*!***********************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/model/config/exports.ts ***!
  \***********************************************************************/
/*! exports provided: DatabaseModelGeneratorConfigManager, databaseModelGeneratorConfigManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DatabaseModelGeneratorConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DatabaseModelGeneratorConfigManager */ "./src/main/erdiagram/generator/database/model/config/DatabaseModelGeneratorConfigManager.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DatabaseModelGeneratorConfigManager", function() { return _DatabaseModelGeneratorConfigManager__WEBPACK_IMPORTED_MODULE_0__["DatabaseModelGeneratorConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "databaseModelGeneratorConfigManager", function() { return _DatabaseModelGeneratorConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"]; });





/***/ }),

/***/ "./src/main/erdiagram/generator/database/model/database-model-types.ts":
/*!*****************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/model/database-model-types.ts ***!
  \*****************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./src/main/erdiagram/generator/database/model/exports.ts":
/*!****************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/model/exports.ts ***!
  \****************************************************************/
/*! exports provided: DatabaseModelGeneratorConfigManager, databaseModelGeneratorConfigManager, DatabaseModelGenerator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DatabaseModelGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DatabaseModelGenerator */ "./src/main/erdiagram/generator/database/model/DatabaseModelGenerator.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DatabaseModelGenerator", function() { return _DatabaseModelGenerator__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _database_model_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./database-model-types */ "./src/main/erdiagram/generator/database/model/database-model-types.ts");
/* empty/unused harmony star reexport *//* harmony import */ var _config_exports__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config/exports */ "./src/main/erdiagram/generator/database/model/config/exports.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DatabaseModelGeneratorConfigManager", function() { return _config_exports__WEBPACK_IMPORTED_MODULE_2__["DatabaseModelGeneratorConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "databaseModelGeneratorConfigManager", function() { return _config_exports__WEBPACK_IMPORTED_MODULE_2__["databaseModelGeneratorConfigManager"]; });







/***/ }),

/***/ "./src/main/erdiagram/generator/diagram/exports.ts":
/*!*********************************************************!*\
  !*** ./src/main/erdiagram/generator/diagram/exports.ts ***!
  \*********************************************************/
/*! exports provided: NomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager, nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager, NomnomlEntityRelationshipModelToDiagramCodeConverter, NomnomlEntityRelationshipModelToDiagramConverter, PlantUmlEntityRelationshipModelToDiagramCodeConverterConfigManager, plantumlEntityRelationshipModelToDiagramCodeConverterConfigManager, PlantUmlEntityRelationshipModelToDiagramCodeConverter, PlantUmlEntityRelationshipModelToDiagramConverter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _nomnoml_exports__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nomnoml/exports */ "./src/main/erdiagram/generator/diagram/nomnoml/exports.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager", function() { return _nomnoml_exports__WEBPACK_IMPORTED_MODULE_0__["NomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager", function() { return _nomnoml_exports__WEBPACK_IMPORTED_MODULE_0__["nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NomnomlEntityRelationshipModelToDiagramCodeConverter", function() { return _nomnoml_exports__WEBPACK_IMPORTED_MODULE_0__["NomnomlEntityRelationshipModelToDiagramCodeConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NomnomlEntityRelationshipModelToDiagramConverter", function() { return _nomnoml_exports__WEBPACK_IMPORTED_MODULE_0__["NomnomlEntityRelationshipModelToDiagramConverter"]; });

/* harmony import */ var _plantuml_exports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plantuml/exports */ "./src/main/erdiagram/generator/diagram/plantuml/exports.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PlantUmlEntityRelationshipModelToDiagramCodeConverterConfigManager", function() { return _plantuml_exports__WEBPACK_IMPORTED_MODULE_1__["PlantUmlEntityRelationshipModelToDiagramCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "plantumlEntityRelationshipModelToDiagramCodeConverterConfigManager", function() { return _plantuml_exports__WEBPACK_IMPORTED_MODULE_1__["plantumlEntityRelationshipModelToDiagramCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PlantUmlEntityRelationshipModelToDiagramCodeConverter", function() { return _plantuml_exports__WEBPACK_IMPORTED_MODULE_1__["PlantUmlEntityRelationshipModelToDiagramCodeConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PlantUmlEntityRelationshipModelToDiagramConverter", function() { return _plantuml_exports__WEBPACK_IMPORTED_MODULE_1__["PlantUmlEntityRelationshipModelToDiagramConverter"]; });





/***/ }),

/***/ "./src/main/erdiagram/generator/diagram/nomnoml/NomnomlEntityRelationshipModelToDiagramCodeConverter.ts":
/*!**************************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/diagram/nomnoml/NomnomlEntityRelationshipModelToDiagramCodeConverter.ts ***!
  \**************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NomnomlEntityRelationshipModelToDiagramCodeConverter; });
/* harmony import */ var _erdiagram_generator_diagram_nomnoml_entity_NomnomlEntityCodeGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/generator/diagram/nomnoml/entity/NomnomlEntityCodeGenerator */ "./src/main/erdiagram/generator/diagram/nomnoml/entity/NomnomlEntityCodeGenerator.ts");
/* harmony import */ var _erdiagram_generator_diagram_nomnoml_relationship_NomnomlRelationshipCodeGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/generator/diagram/nomnoml/relationship/NomnomlRelationshipCodeGenerator */ "./src/main/erdiagram/generator/diagram/nomnoml/relationship/NomnomlRelationshipCodeGenerator.ts");
/* harmony import */ var _erdiagram_generator_diagram_nomnoml_config_NomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/generator/diagram/nomnoml/config/NomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager */ "./src/main/erdiagram/generator/diagram/nomnoml/config/NomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager.ts");
/* harmony import */ var _erdiagram_generator_diagram_nomnoml_directive_NomnomlDirectivesCodeGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/generator/diagram/nomnoml/directive/NomnomlDirectivesCodeGenerator */ "./src/main/erdiagram/generator/diagram/nomnoml/directive/NomnomlDirectivesCodeGenerator.ts");




class NomnomlEntityRelationshipModelToDiagramCodeConverter {
    constructor(config) {
        this.entityCodeGenerator = new _erdiagram_generator_diagram_nomnoml_entity_NomnomlEntityCodeGenerator__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.relationshipCodeGenerator = new _erdiagram_generator_diagram_nomnoml_relationship_NomnomlRelationshipCodeGenerator__WEBPACK_IMPORTED_MODULE_1__["default"]();
        this.directivesCodeGenerator = new _erdiagram_generator_diagram_nomnoml_directive_NomnomlDirectivesCodeGenerator__WEBPACK_IMPORTED_MODULE_3__["default"]();
        this.config = _erdiagram_generator_diagram_nomnoml_config_NomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_2__["default"].mergeWithDefaultConfig(config);
    }
    convertToCode(model) {
        return [
            ...model.entities.map(entity => this.entityCodeGenerator.generateEntityCode(entity)),
            ...model.relationships.map(relationship => this.relationshipCodeGenerator.generateRelationshipCode(relationship)),
            this.directivesCodeGenerator.generateDirectivesCode(this.config)
        ].join('\n\n');
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/diagram/nomnoml/NomnomlEntityRelationshipModelToDiagramConverter.ts":
/*!**********************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/diagram/nomnoml/NomnomlEntityRelationshipModelToDiagramConverter.ts ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NomnomlEntityRelationshipModelToDiagramConverter; });
/* harmony import */ var _erdiagram_generator_EntityRelationshipModelToDiagramConverter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/generator/EntityRelationshipModelToDiagramConverter */ "./src/main/erdiagram/generator/EntityRelationshipModelToDiagramConverter.ts");
/* harmony import */ var nomnoml__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nomnoml */ "./node_modules/nomnoml/dist/nomnoml.js");
/* harmony import */ var nomnoml__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nomnoml__WEBPACK_IMPORTED_MODULE_1__);


class NomnomlEntityRelationshipModelToDiagramConverter extends _erdiagram_generator_EntityRelationshipModelToDiagramConverter__WEBPACK_IMPORTED_MODULE_0__["BaseEntityRelationshipModelToDiagramConverter"] {
    constructor(erModelToDiagramCodeConverter) {
        super();
        this.erModelToDiagramCodeConverter = erModelToDiagramCodeConverter;
    }
    convertNonEmptyModelToDiagram(model) {
        const diagramCode = this.erModelToDiagramCodeConverter.convertToCode(model);
        return Promise.resolve(nomnoml__WEBPACK_IMPORTED_MODULE_1___default.a.renderSvg(diagramCode));
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/diagram/nomnoml/config/NomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager.ts":
/*!**********************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/diagram/nomnoml/config/NomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager.ts ***!
  \**********************************************************************************************************************************/
/*! exports provided: NomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager", function() { return NomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager; });
/* harmony import */ var _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/common/config/AbstractComponentConfigManager */ "./src/main/erdiagram/common/config/AbstractComponentConfigManager.ts");

class NomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager extends _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"] {
    getDefaultConfig() {
        return {
            arrowSize: 1,
            bendSize: undefined,
            direction: undefined,
            gutter: undefined,
            edgeMargin: undefined,
            gravity: 1.5,
            edges: undefined,
            background: 'transparent',
            fill: '#eef6ff',
            fillArrows: undefined,
            font: undefined,
            fontSize: undefined,
            leading: undefined,
            lineWidth: 1,
            padding: undefined,
            spacing: undefined,
            stroke: '#555',
            title: undefined,
            zoom: undefined,
            acyclicer: undefined,
            ranker: 'longest-path'
        };
    }
    mergeConfigs(fullConfig, partialConfig) {
        return Object.assign(Object.assign({}, fullConfig), partialConfig);
    }
    convertToSerializableObject(fullConfig) {
        return Object.assign({}, fullConfig);
    }
    convertFromSerializableObject(serializableConfig) {
        return Object.assign({}, serializableConfig);
    }
}
const nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager = new NomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager();
/* harmony default export */ __webpack_exports__["default"] = (nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager);


/***/ }),

/***/ "./src/main/erdiagram/generator/diagram/nomnoml/config/exports.ts":
/*!************************************************************************!*\
  !*** ./src/main/erdiagram/generator/diagram/nomnoml/config/exports.ts ***!
  \************************************************************************/
/*! exports provided: NomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager, nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager */ "./src/main/erdiagram/generator/diagram/nomnoml/config/NomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager", function() { return _NomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_0__["NomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager", function() { return _NomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"]; });





/***/ }),

/***/ "./src/main/erdiagram/generator/diagram/nomnoml/directive/NomnomlDirectivesCodeGenerator.ts":
/*!**************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/diagram/nomnoml/directive/NomnomlDirectivesCodeGenerator.ts ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NomnomlDirectivesCodeGenerator; });
class NomnomlDirectivesCodeGenerator {
    generateDirectivesCode(config) {
        return Object.entries(config)
            .filter(([key, value]) => value != null && value !== '')
            .map(([key, value]) => `#${key}: ${value}`)
            .join('\n');
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/diagram/nomnoml/entity/NomnomlEntityCodeGenerator.ts":
/*!*******************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/diagram/nomnoml/entity/NomnomlEntityCodeGenerator.ts ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NomnomlEntityCodeGenerator; });
/* harmony import */ var _erdiagram_generator_diagram_nomnoml_entity_NomnomlEntityIdentifierPropertyCodeGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/generator/diagram/nomnoml/entity/NomnomlEntityIdentifierPropertyCodeGenerator */ "./src/main/erdiagram/generator/diagram/nomnoml/entity/NomnomlEntityIdentifierPropertyCodeGenerator.ts");
/* harmony import */ var _erdiagram_generator_diagram_nomnoml_entity_NomnomlEntityPropertyCodeGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/generator/diagram/nomnoml/entity/NomnomlEntityPropertyCodeGenerator */ "./src/main/erdiagram/generator/diagram/nomnoml/entity/NomnomlEntityPropertyCodeGenerator.ts");
/* harmony import */ var _erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/util/indent-utils */ "./src/main/erdiagram/util/indent-utils.ts");



class NomnomlEntityCodeGenerator {
    constructor() {
        this.entityIdentifierPropertyCodeGenerator = new _erdiagram_generator_diagram_nomnoml_entity_NomnomlEntityIdentifierPropertyCodeGenerator__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.entityPropertyCodeGenerator = new _erdiagram_generator_diagram_nomnoml_entity_NomnomlEntityPropertyCodeGenerator__WEBPACK_IMPORTED_MODULE_1__["default"]();
    }
    generateEntityCode(entity) {
        const propertiesCode = this.generateEntityPropertiesCode(entity);
        if (!propertiesCode) {
            return `[${entity.name}]`;
        }
        return [
            `[${entity.name}|`,
            propertiesCode,
            ']'
        ].join('\n');
    }
    generateEntityPropertiesCode(entity) {
        const { identifierPropertyName, properties } = entity;
        const propertiesCode = properties.map(property => this.entityPropertyCodeGenerator.generateEntityPropertyCode(property));
        if (identifierPropertyName) {
            propertiesCode.unshift(this.entityIdentifierPropertyCodeGenerator.generateEntityIdentifierPropertyCode(identifierPropertyName));
        }
        return Object(_erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_2__["indentLines"])(propertiesCode).join('\n');
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/diagram/nomnoml/entity/NomnomlEntityIdentifierPropertyCodeGenerator.ts":
/*!*************************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/diagram/nomnoml/entity/NomnomlEntityIdentifierPropertyCodeGenerator.ts ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NomnomlEntityIdentifierPropertyCodeGenerator; });
/* harmony import */ var _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/entity-relationship-model-types */ "./src/main/erdiagram/parser/entity-relationship-model-types.ts");

class NomnomlEntityIdentifierPropertyCodeGenerator {
    generateEntityIdentifierPropertyCode(identifierPropertyName) {
        return `${identifierPropertyName}: ${_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].IDENTIFIER}`;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/diagram/nomnoml/entity/NomnomlEntityPropertyCodeGenerator.ts":
/*!***************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/diagram/nomnoml/entity/NomnomlEntityPropertyCodeGenerator.ts ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NomnomlEntityPropertyCodeGenerator; });
class NomnomlEntityPropertyCodeGenerator {
    generateEntityPropertyCode(property) {
        const { name, type, length, optional, unique, autoincremental } = property;
        const typeWithLengthCode = this.getTypeWithLengthCode(type, length);
        const modifiersCode = this.getModifiersCode(optional, unique, autoincremental);
        return `${name}${modifiersCode}: ${typeWithLengthCode}`;
    }
    getTypeWithLengthCode(type, length) {
        if (length.length === 0) {
            return type;
        }
        return `${type}(${length.join(', ')})`;
    }
    getModifiersCode(optional, unique, autoincremental) {
        const optionalModifierCode = optional ? '?' : '';
        const uniqueModifierCode = unique ? '!' : '';
        const autoincrementalModifierCode = autoincremental ? '+' : '';
        return optionalModifierCode + uniqueModifierCode + autoincrementalModifierCode;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/diagram/nomnoml/exports.ts":
/*!*****************************************************************!*\
  !*** ./src/main/erdiagram/generator/diagram/nomnoml/exports.ts ***!
  \*****************************************************************/
/*! exports provided: NomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager, nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager, NomnomlEntityRelationshipModelToDiagramCodeConverter, NomnomlEntityRelationshipModelToDiagramConverter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NomnomlEntityRelationshipModelToDiagramCodeConverter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NomnomlEntityRelationshipModelToDiagramCodeConverter */ "./src/main/erdiagram/generator/diagram/nomnoml/NomnomlEntityRelationshipModelToDiagramCodeConverter.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NomnomlEntityRelationshipModelToDiagramCodeConverter", function() { return _NomnomlEntityRelationshipModelToDiagramCodeConverter__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _NomnomlEntityRelationshipModelToDiagramConverter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NomnomlEntityRelationshipModelToDiagramConverter */ "./src/main/erdiagram/generator/diagram/nomnoml/NomnomlEntityRelationshipModelToDiagramConverter.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NomnomlEntityRelationshipModelToDiagramConverter", function() { return _NomnomlEntityRelationshipModelToDiagramConverter__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _config_exports__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config/exports */ "./src/main/erdiagram/generator/diagram/nomnoml/config/exports.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager", function() { return _config_exports__WEBPACK_IMPORTED_MODULE_2__["NomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager", function() { return _config_exports__WEBPACK_IMPORTED_MODULE_2__["nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager"]; });







/***/ }),

/***/ "./src/main/erdiagram/generator/diagram/nomnoml/relationship/NomnomlNamedRelationshipCodeGenerator.ts":
/*!************************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/diagram/nomnoml/relationship/NomnomlNamedRelationshipCodeGenerator.ts ***!
  \************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NomnomlNamedRelationshipCodeGenerator; });
class NomnomlNamedRelationshipCodeGenerator {
    constructor(relationshipDirectionCodeGenerator, relationshipCardinalityCodeGenerator) {
        this.relationshipDirectionCodeGenerator = relationshipDirectionCodeGenerator;
        this.relationshipCardinalityCodeGenerator = relationshipCardinalityCodeGenerator;
    }
    generateNamedRelationshipCode(relationship) {
        const { leftMember, rightMember, direction, relationshipName } = relationship;
        const leftMemberCardinalityCode = this.relationshipCardinalityCodeGenerator.generateCardinalityCode(leftMember.cardinality);
        const rightMemberCardinalityCode = this.relationshipCardinalityCodeGenerator.generateCardinalityCode(rightMember.cardinality);
        const leftSideDirectionCode = this.relationshipDirectionCodeGenerator.generateLeftSideDirectionCode(direction);
        const rightSideDirectionCode = this.relationshipDirectionCodeGenerator.generateRightSideDirectionCode(direction);
        return [
            `[<label>${relationshipName}]`,
            `[${leftMember.entity}] ${leftMemberCardinalityCode}${leftSideDirectionCode} [${relationshipName}]`,
            `[${relationshipName}] ${rightSideDirectionCode}${rightMemberCardinalityCode} [${rightMember.entity}]`
        ].join('\n');
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/diagram/nomnoml/relationship/NomnomlRelationshipCardinalityCodeGenerator.ts":
/*!******************************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/diagram/nomnoml/relationship/NomnomlRelationshipCardinalityCodeGenerator.ts ***!
  \******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NomnomlRelationshipCardinalityCodeGenerator; });
/* harmony import */ var _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/entity-relationship-model-types */ "./src/main/erdiagram/parser/entity-relationship-model-types.ts");

class NomnomlRelationshipCardinalityCodeGenerator {
    generateCardinalityCode(cardinality) {
        switch (cardinality) {
            case _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["Cardinality"].ZERO_OR_ONE:
                return '0..1';
            case _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["Cardinality"].ONE:
                return '1';
            case _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["Cardinality"].MANY:
                return '*';
        }
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/diagram/nomnoml/relationship/NomnomlRelationshipCodeGenerator.ts":
/*!*******************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/diagram/nomnoml/relationship/NomnomlRelationshipCodeGenerator.ts ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NomnomlRelationshipCodeGenerator; });
/* harmony import */ var _erdiagram_generator_diagram_nomnoml_relationship_NomnomlRelationshipDirectionCodeGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/generator/diagram/nomnoml/relationship/NomnomlRelationshipDirectionCodeGenerator */ "./src/main/erdiagram/generator/diagram/nomnoml/relationship/NomnomlRelationshipDirectionCodeGenerator.ts");
/* harmony import */ var _erdiagram_generator_diagram_nomnoml_relationship_NomnomlRelationshipCardinalityCodeGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/generator/diagram/nomnoml/relationship/NomnomlRelationshipCardinalityCodeGenerator */ "./src/main/erdiagram/generator/diagram/nomnoml/relationship/NomnomlRelationshipCardinalityCodeGenerator.ts");
/* harmony import */ var _erdiagram_generator_diagram_nomnoml_relationship_NomnomlUnnamedRelationshipCodeGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/generator/diagram/nomnoml/relationship/NomnomlUnnamedRelationshipCodeGenerator */ "./src/main/erdiagram/generator/diagram/nomnoml/relationship/NomnomlUnnamedRelationshipCodeGenerator.ts");
/* harmony import */ var _erdiagram_generator_diagram_nomnoml_relationship_NomnomlNamedRelationshipCodeGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/generator/diagram/nomnoml/relationship/NomnomlNamedRelationshipCodeGenerator */ "./src/main/erdiagram/generator/diagram/nomnoml/relationship/NomnomlNamedRelationshipCodeGenerator.ts");




class NomnomlRelationshipCodeGenerator {
    constructor() {
        this.relationshipDirectionCodeGenerator = new _erdiagram_generator_diagram_nomnoml_relationship_NomnomlRelationshipDirectionCodeGenerator__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.relationshipCardinalityCodeGenerator = new _erdiagram_generator_diagram_nomnoml_relationship_NomnomlRelationshipCardinalityCodeGenerator__WEBPACK_IMPORTED_MODULE_1__["default"]();
        this.namedRelationshipCodeGenerator = new _erdiagram_generator_diagram_nomnoml_relationship_NomnomlNamedRelationshipCodeGenerator__WEBPACK_IMPORTED_MODULE_3__["default"](this.relationshipDirectionCodeGenerator, this.relationshipCardinalityCodeGenerator);
        this.unnamedRelationshipCodeGenerator = new _erdiagram_generator_diagram_nomnoml_relationship_NomnomlUnnamedRelationshipCodeGenerator__WEBPACK_IMPORTED_MODULE_2__["default"](this.relationshipDirectionCodeGenerator, this.relationshipCardinalityCodeGenerator);
    }
    generateRelationshipCode(relationship) {
        if (relationship.relationshipName) {
            return this.namedRelationshipCodeGenerator.generateNamedRelationshipCode(relationship);
        }
        else {
            return this.unnamedRelationshipCodeGenerator.generateUnnamedRelationshipCode(relationship);
        }
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/diagram/nomnoml/relationship/NomnomlRelationshipDirectionCodeGenerator.ts":
/*!****************************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/diagram/nomnoml/relationship/NomnomlRelationshipDirectionCodeGenerator.ts ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NomnomlRelationshipDirectionCodeGenerator; });
/* harmony import */ var _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/entity-relationship-model-types */ "./src/main/erdiagram/parser/entity-relationship-model-types.ts");

class NomnomlRelationshipDirectionCodeGenerator {
    generateDirectionCode(direction) {
        switch (direction) {
            case _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["Direction"].LEFT_TO_RIGHT:
                return '->';
            case _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["Direction"].RIGHT_TO_LEFT:
                return '<-';
            case _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["Direction"].BIDIRECTIONAL:
                return '<->';
        }
    }
    generateLeftSideDirectionCode(direction) {
        return [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["Direction"].RIGHT_TO_LEFT, _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["Direction"].BIDIRECTIONAL].includes(direction) ? '<-' : '-';
    }
    generateRightSideDirectionCode(direction) {
        return [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["Direction"].LEFT_TO_RIGHT, _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["Direction"].BIDIRECTIONAL].includes(direction) ? '->' : '-';
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/diagram/nomnoml/relationship/NomnomlUnnamedRelationshipCodeGenerator.ts":
/*!**************************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/diagram/nomnoml/relationship/NomnomlUnnamedRelationshipCodeGenerator.ts ***!
  \**************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NomnomlUnnamedRelationshipCodeGenerator; });
class NomnomlUnnamedRelationshipCodeGenerator {
    constructor(relationshipDirectionCodeGenerator, relationshipCardinalityCodeGenerator) {
        this.relationshipDirectionCodeGenerator = relationshipDirectionCodeGenerator;
        this.relationshipCardinalityCodeGenerator = relationshipCardinalityCodeGenerator;
    }
    generateUnnamedRelationshipCode(relationship) {
        const { leftMember, rightMember, direction } = relationship;
        const leftMemberCardinalityCode = this.relationshipCardinalityCodeGenerator.generateCardinalityCode(leftMember.cardinality);
        const rightMemberCardinalityCode = this.relationshipCardinalityCodeGenerator.generateCardinalityCode(rightMember.cardinality);
        const directionCode = this.relationshipDirectionCodeGenerator.generateDirectionCode(direction);
        return `[${leftMember.entity}] ${leftMemberCardinalityCode}${directionCode}${rightMemberCardinalityCode} [${rightMember.entity}]`;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/diagram/plantuml/PlantUmlEntityRelationshipModelToDiagramCodeConverter.ts":
/*!****************************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/diagram/plantuml/PlantUmlEntityRelationshipModelToDiagramCodeConverter.ts ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PlantUmlEntityRelationshipModelToDiagramCodeConverter; });
/* harmony import */ var _erdiagram_generator_diagram_plantuml_config_PlantUmlEntityRelationshipModelToDiagramCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/generator/diagram/plantuml/config/PlantUmlEntityRelationshipModelToDiagramCodeConverterConfigManager */ "./src/main/erdiagram/generator/diagram/plantuml/config/PlantUmlEntityRelationshipModelToDiagramCodeConverterConfigManager.ts");
/* harmony import */ var _erdiagram_generator_diagram_plantuml_entity_PlantUmlEntityCodeGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/generator/diagram/plantuml/entity/PlantUmlEntityCodeGenerator */ "./src/main/erdiagram/generator/diagram/plantuml/entity/PlantUmlEntityCodeGenerator.ts");
/* harmony import */ var _erdiagram_generator_diagram_plantuml_relationship_PlantUmlRelationshipCodeGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/generator/diagram/plantuml/relationship/PlantUmlRelationshipCodeGenerator */ "./src/main/erdiagram/generator/diagram/plantuml/relationship/PlantUmlRelationshipCodeGenerator.ts");



class PlantUmlEntityRelationshipModelToDiagramCodeConverter {
    constructor(config) {
        this.entityCodeGenerator = new _erdiagram_generator_diagram_plantuml_entity_PlantUmlEntityCodeGenerator__WEBPACK_IMPORTED_MODULE_1__["default"]();
        this.relationshipCodeGenerator = new _erdiagram_generator_diagram_plantuml_relationship_PlantUmlRelationshipCodeGenerator__WEBPACK_IMPORTED_MODULE_2__["default"]();
        this.config = _erdiagram_generator_diagram_plantuml_config_PlantUmlEntityRelationshipModelToDiagramCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"].mergeWithDefaultConfig(config);
    }
    convertToCode(model) {
        return [
            '@startuml',
            ...model.entities.map(entity => this.entityCodeGenerator.generateEntityCode(entity)),
            ...model.relationships.map(relationship => this.relationshipCodeGenerator.generateRelationshipCode(relationship)),
            '@enduml'
        ].join('\n\n');
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/diagram/plantuml/PlantUmlEntityRelationshipModelToDiagramConverter.ts":
/*!************************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/diagram/plantuml/PlantUmlEntityRelationshipModelToDiagramConverter.ts ***!
  \************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PlantUmlEntityRelationshipModelToDiagramConverter; });
/* harmony import */ var _erdiagram_generator_EntityRelationshipModelToDiagramConverter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/generator/EntityRelationshipModelToDiagramConverter */ "./src/main/erdiagram/generator/EntityRelationshipModelToDiagramConverter.ts");

class PlantUmlEntityRelationshipModelToDiagramConverter extends _erdiagram_generator_EntityRelationshipModelToDiagramConverter__WEBPACK_IMPORTED_MODULE_0__["BaseEntityRelationshipModelToDiagramConverter"] {
    constructor(erModelToDiagramCodeConverter) {
        super();
        this.erModelToDiagramCodeConverter = erModelToDiagramCodeConverter;
    }
    convertNonEmptyModelToDiagram(model) {
        const diagramCode = this.erModelToDiagramCodeConverter.convertToCode(model);
        const diagramUrl = this.getDiagramUrl(diagramCode);
        return this.fetchDiagram(diagramUrl);
    }
    getDiagramUrl(diagramCode) {
        const diagramHexCode = this.convertToHexString(diagramCode);
        return `https://www.plantuml.com/plantuml/svg/~h${diagramHexCode}`;
    }
    convertToHexString(text) {
        return [...text].map(character => this.convertToHexChar(character)).join('');
    }
    convertToHexChar(character) {
        return character.charCodeAt(0)
            .toString(16)
            .padStart(2, '0');
    }
    fetchDiagram(diagramUrl) {
        return fetch(diagramUrl, {
        // TODO allow to customize this option
        //cache: ''
        }).then(response => response.text());
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/diagram/plantuml/config/PlantUmlEntityRelationshipModelToDiagramCodeConverterConfigManager.ts":
/*!************************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/diagram/plantuml/config/PlantUmlEntityRelationshipModelToDiagramCodeConverterConfigManager.ts ***!
  \************************************************************************************************************************************/
/*! exports provided: PlantUmlEntityRelationshipModelToDiagramCodeConverterConfigManager, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlantUmlEntityRelationshipModelToDiagramCodeConverterConfigManager", function() { return PlantUmlEntityRelationshipModelToDiagramCodeConverterConfigManager; });
/* harmony import */ var _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/common/config/AbstractComponentConfigManager */ "./src/main/erdiagram/common/config/AbstractComponentConfigManager.ts");

class PlantUmlEntityRelationshipModelToDiagramCodeConverterConfigManager extends _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"] {
    getDefaultConfig() {
        return {};
    }
    mergeConfigs(fullConfig, partialConfig) {
        return Object.assign(Object.assign({}, fullConfig), partialConfig);
    }
    convertToSerializableObject(fullConfig) {
        return Object.assign({}, fullConfig);
    }
    convertFromSerializableObject(serializableConfig) {
        return Object.assign({}, serializableConfig);
    }
}
const plantumlEntityRelationshipModelToDiagramCodeConverterConfigManager = new PlantUmlEntityRelationshipModelToDiagramCodeConverterConfigManager();
/* harmony default export */ __webpack_exports__["default"] = (plantumlEntityRelationshipModelToDiagramCodeConverterConfigManager);


/***/ }),

/***/ "./src/main/erdiagram/generator/diagram/plantuml/config/exports.ts":
/*!*************************************************************************!*\
  !*** ./src/main/erdiagram/generator/diagram/plantuml/config/exports.ts ***!
  \*************************************************************************/
/*! exports provided: PlantUmlEntityRelationshipModelToDiagramCodeConverterConfigManager, plantumlEntityRelationshipModelToDiagramCodeConverterConfigManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PlantUmlEntityRelationshipModelToDiagramCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PlantUmlEntityRelationshipModelToDiagramCodeConverterConfigManager */ "./src/main/erdiagram/generator/diagram/plantuml/config/PlantUmlEntityRelationshipModelToDiagramCodeConverterConfigManager.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PlantUmlEntityRelationshipModelToDiagramCodeConverterConfigManager", function() { return _PlantUmlEntityRelationshipModelToDiagramCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_0__["PlantUmlEntityRelationshipModelToDiagramCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "plantumlEntityRelationshipModelToDiagramCodeConverterConfigManager", function() { return _PlantUmlEntityRelationshipModelToDiagramCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"]; });





/***/ }),

/***/ "./src/main/erdiagram/generator/diagram/plantuml/entity/PlantUmlEntityCodeGenerator.ts":
/*!*********************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/diagram/plantuml/entity/PlantUmlEntityCodeGenerator.ts ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PlantUmlEntityCodeGenerator; });
/* harmony import */ var _erdiagram_generator_diagram_plantuml_entity_PlantUmlEntityIdentifierPropertyCodeGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/generator/diagram/plantuml/entity/PlantUmlEntityIdentifierPropertyCodeGenerator */ "./src/main/erdiagram/generator/diagram/plantuml/entity/PlantUmlEntityIdentifierPropertyCodeGenerator.ts");
/* harmony import */ var _erdiagram_generator_diagram_plantuml_entity_PlantUmlEntityPropertyCodeGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/generator/diagram/plantuml/entity/PlantUmlEntityPropertyCodeGenerator */ "./src/main/erdiagram/generator/diagram/plantuml/entity/PlantUmlEntityPropertyCodeGenerator.ts");
/* harmony import */ var _erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/util/indent-utils */ "./src/main/erdiagram/util/indent-utils.ts");



class PlantUmlEntityCodeGenerator {
    constructor() {
        this.entityIdentifierPropertyCodeGenerator = new _erdiagram_generator_diagram_plantuml_entity_PlantUmlEntityIdentifierPropertyCodeGenerator__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.entityPropertyCodeGenerator = new _erdiagram_generator_diagram_plantuml_entity_PlantUmlEntityPropertyCodeGenerator__WEBPACK_IMPORTED_MODULE_1__["default"]();
    }
    generateEntityCode(entity) {
        const propertiesCode = this.generateEntityPropertiesCode(entity);
        if (!propertiesCode) {
            return `class ${entity.name} {}`;
        }
        return [
            `class ${entity.name} {`,
            propertiesCode,
            '}'
        ].join('\n');
    }
    generateEntityPropertiesCode(entity) {
        const { identifierPropertyName, properties } = entity;
        const propertiesCode = properties.map(property => this.entityPropertyCodeGenerator.generateEntityPropertyCode(property));
        if (identifierPropertyName) {
            propertiesCode.unshift(this.entityIdentifierPropertyCodeGenerator.generateEntityIdentifierPropertyCode(identifierPropertyName));
        }
        return Object(_erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_2__["indentLines"])(propertiesCode).join('\n');
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/diagram/plantuml/entity/PlantUmlEntityIdentifierPropertyCodeGenerator.ts":
/*!***************************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/diagram/plantuml/entity/PlantUmlEntityIdentifierPropertyCodeGenerator.ts ***!
  \***************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PlantUmlEntityIdentifierPropertyCodeGenerator; });
/* harmony import */ var _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/entity-relationship-model-types */ "./src/main/erdiagram/parser/entity-relationship-model-types.ts");

class PlantUmlEntityIdentifierPropertyCodeGenerator {
    generateEntityIdentifierPropertyCode(identifierPropertyName) {
        return `{field} ${identifierPropertyName}: ${_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].IDENTIFIER}`;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/diagram/plantuml/entity/PlantUmlEntityPropertyCodeGenerator.ts":
/*!*****************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/diagram/plantuml/entity/PlantUmlEntityPropertyCodeGenerator.ts ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PlantUmlEntityPropertyCodeGenerator; });
class PlantUmlEntityPropertyCodeGenerator {
    generateEntityPropertyCode(property) {
        const { name, type, length, optional, unique, autoincremental } = property;
        const typeWithLengthCode = this.getTypeWithLengthCode(type, length);
        const modifiersCode = this.getModifiersCode(optional, unique, autoincremental);
        return `{field} ${name}${modifiersCode}: ${typeWithLengthCode}`;
    }
    getTypeWithLengthCode(type, length) {
        if (length.length === 0) {
            return type;
        }
        return `${type}(${length.join(', ')})`;
    }
    getModifiersCode(optional, unique, autoincremental) {
        const optionalModifierCode = optional ? '?' : '';
        const uniqueModifierCode = unique ? '!' : '';
        const autoincrementalModifierCode = autoincremental ? '+' : '';
        return optionalModifierCode + uniqueModifierCode + autoincrementalModifierCode;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/diagram/plantuml/exports.ts":
/*!******************************************************************!*\
  !*** ./src/main/erdiagram/generator/diagram/plantuml/exports.ts ***!
  \******************************************************************/
/*! exports provided: PlantUmlEntityRelationshipModelToDiagramCodeConverterConfigManager, plantumlEntityRelationshipModelToDiagramCodeConverterConfigManager, PlantUmlEntityRelationshipModelToDiagramCodeConverter, PlantUmlEntityRelationshipModelToDiagramConverter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PlantUmlEntityRelationshipModelToDiagramCodeConverter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PlantUmlEntityRelationshipModelToDiagramCodeConverter */ "./src/main/erdiagram/generator/diagram/plantuml/PlantUmlEntityRelationshipModelToDiagramCodeConverter.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PlantUmlEntityRelationshipModelToDiagramCodeConverter", function() { return _PlantUmlEntityRelationshipModelToDiagramCodeConverter__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _PlantUmlEntityRelationshipModelToDiagramConverter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PlantUmlEntityRelationshipModelToDiagramConverter */ "./src/main/erdiagram/generator/diagram/plantuml/PlantUmlEntityRelationshipModelToDiagramConverter.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PlantUmlEntityRelationshipModelToDiagramConverter", function() { return _PlantUmlEntityRelationshipModelToDiagramConverter__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _config_exports__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config/exports */ "./src/main/erdiagram/generator/diagram/plantuml/config/exports.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PlantUmlEntityRelationshipModelToDiagramCodeConverterConfigManager", function() { return _config_exports__WEBPACK_IMPORTED_MODULE_2__["PlantUmlEntityRelationshipModelToDiagramCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "plantumlEntityRelationshipModelToDiagramCodeConverterConfigManager", function() { return _config_exports__WEBPACK_IMPORTED_MODULE_2__["plantumlEntityRelationshipModelToDiagramCodeConverterConfigManager"]; });







/***/ }),

/***/ "./src/main/erdiagram/generator/diagram/plantuml/relationship/PlantUmlRelationshipCardinalityCodeGenerator.ts":
/*!********************************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/diagram/plantuml/relationship/PlantUmlRelationshipCardinalityCodeGenerator.ts ***!
  \********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PlantUmlRelationshipCardinalityCodeGenerator; });
/* harmony import */ var _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/entity-relationship-model-types */ "./src/main/erdiagram/parser/entity-relationship-model-types.ts");

class PlantUmlRelationshipCardinalityCodeGenerator {
    generateCardinalityCode(cardinality) {
        switch (cardinality) {
            case _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["Cardinality"].ZERO_OR_ONE:
                return '0..1';
            case _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["Cardinality"].ONE:
                return '1';
            case _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["Cardinality"].MANY:
                return '*';
        }
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/diagram/plantuml/relationship/PlantUmlRelationshipCodeGenerator.ts":
/*!*********************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/diagram/plantuml/relationship/PlantUmlRelationshipCodeGenerator.ts ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PlantUmlRelationshipCodeGenerator; });
/* harmony import */ var _erdiagram_generator_diagram_plantuml_relationship_PlantUmlRelationshipDirectionCodeGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/generator/diagram/plantuml/relationship/PlantUmlRelationshipDirectionCodeGenerator */ "./src/main/erdiagram/generator/diagram/plantuml/relationship/PlantUmlRelationshipDirectionCodeGenerator.ts");
/* harmony import */ var _erdiagram_generator_diagram_plantuml_relationship_PlantUmlRelationshipCardinalityCodeGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/generator/diagram/plantuml/relationship/PlantUmlRelationshipCardinalityCodeGenerator */ "./src/main/erdiagram/generator/diagram/plantuml/relationship/PlantUmlRelationshipCardinalityCodeGenerator.ts");


class PlantUmlRelationshipCodeGenerator {
    constructor() {
        this.relationshipDirectionCodeGenerator = new _erdiagram_generator_diagram_plantuml_relationship_PlantUmlRelationshipDirectionCodeGenerator__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.relationshipCardinalityCodeGenerator = new _erdiagram_generator_diagram_plantuml_relationship_PlantUmlRelationshipCardinalityCodeGenerator__WEBPACK_IMPORTED_MODULE_1__["default"]();
    }
    generateRelationshipCode(relationship) {
        const { leftMember, rightMember, direction } = relationship;
        const leftMemberCardinalityCode = this.relationshipCardinalityCodeGenerator.generateCardinalityCode(leftMember.cardinality);
        const rightMemberCardinalityCode = this.relationshipCardinalityCodeGenerator.generateCardinalityCode(rightMember.cardinality);
        const directionCode = this.relationshipDirectionCodeGenerator.generateDirectionCode(direction);
        const relationshipCode = `${leftMember.entity} "${leftMemberCardinalityCode}" ${directionCode} "${rightMemberCardinalityCode}" ${rightMember.entity}`;
        if (relationship.relationshipName) {
            return `${relationshipCode} : ${relationship.relationshipName}`;
        }
        else {
            return relationshipCode;
        }
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/diagram/plantuml/relationship/PlantUmlRelationshipDirectionCodeGenerator.ts":
/*!******************************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/diagram/plantuml/relationship/PlantUmlRelationshipDirectionCodeGenerator.ts ***!
  \******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PlantUmlRelationshipDirectionCodeGenerator; });
/* harmony import */ var _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/entity-relationship-model-types */ "./src/main/erdiagram/parser/entity-relationship-model-types.ts");

class PlantUmlRelationshipDirectionCodeGenerator {
    generateDirectionCode(direction) {
        switch (direction) {
            case _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["Direction"].LEFT_TO_RIGHT:
                return '-->';
            case _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["Direction"].RIGHT_TO_LEFT:
                return '<--';
            case _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["Direction"].BIDIRECTIONAL:
                return '<-->';
        }
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/exports.ts":
/*!*************************************************!*\
  !*** ./src/main/erdiagram/generator/exports.ts ***!
  \*************************************************/
/*! exports provided: StandardCaseFormats, CaseConverter, StandardIdNamingStrategies, MysqlDatabaseModelToCodeConverterConfigManager, mysqlDatabaseModelToCodeConverterConfigManager, MysqlDatabaseModelToCodeConverter, OracleDatabaseModelToCodeConverterConfigManager, oracleDatabaseModelToCodeConverterConfigManager, OracleDatabaseModelToCodeConverter, SqlServerDatabaseModelToCodeConverterConfigManager, sqlServerDatabaseModelToCodeConverterConfigManager, SqlServerDatabaseModelToCodeConverter, PostgresqlDatabaseModelToCodeConverterConfigManager, postgresqlDatabaseModelToCodeConverterConfigManager, PostgresqlDatabaseModelToCodeConverter, EntityRelationshipModelToDatabaseCodeConverter, DatabaseModelGeneratorConfigManager, databaseModelGeneratorConfigManager, DatabaseModelGenerator, JavaClassModelToCodeConverterConfigManager, javaClassModelToCodeConverterConfigManager, createJavaType, createJavaParameterizedType, createJavaArrayType, isJavaParameterizedType, parseJavaType, JavaClassModelToCodeConverter, TypeScriptClassModelToCodeConverterConfigManager, typescriptClassModelToCodeConverterConfigManager, createTypeScriptType, createTypeScriptParameterizedType, createTypeScriptArrayType, isTypeScriptParameterizedType, parseTypeScriptType, TypeScriptClassModelToCodeConverter, EntityRelationshipModelToClassCodeConverter, ClassModelGeneratorConfigManager, classModelGeneratorConfigManager, ClassModelGenerator, NomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager, nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager, NomnomlEntityRelationshipModelToDiagramCodeConverter, NomnomlEntityRelationshipModelToDiagramConverter, PlantUmlEntityRelationshipModelToDiagramCodeConverterConfigManager, plantumlEntityRelationshipModelToDiagramCodeConverterConfigManager, PlantUmlEntityRelationshipModelToDiagramCodeConverter, PlantUmlEntityRelationshipModelToDiagramConverter, BaseEntityRelationshipModelToDiagramConverter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EntityRelationshipModelToDiagramConverter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EntityRelationshipModelToDiagramConverter */ "./src/main/erdiagram/generator/EntityRelationshipModelToDiagramConverter.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseEntityRelationshipModelToDiagramConverter", function() { return _EntityRelationshipModelToDiagramConverter__WEBPACK_IMPORTED_MODULE_0__["BaseEntityRelationshipModelToDiagramConverter"]; });

/* harmony import */ var _common_exports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/exports */ "./src/main/erdiagram/generator/common/exports.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StandardCaseFormats", function() { return _common_exports__WEBPACK_IMPORTED_MODULE_1__["StandardCaseFormats"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CaseConverter", function() { return _common_exports__WEBPACK_IMPORTED_MODULE_1__["CaseConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StandardIdNamingStrategies", function() { return _common_exports__WEBPACK_IMPORTED_MODULE_1__["StandardIdNamingStrategies"]; });

/* harmony import */ var _database_exports__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./database/exports */ "./src/main/erdiagram/generator/database/exports.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MysqlDatabaseModelToCodeConverterConfigManager", function() { return _database_exports__WEBPACK_IMPORTED_MODULE_2__["MysqlDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mysqlDatabaseModelToCodeConverterConfigManager", function() { return _database_exports__WEBPACK_IMPORTED_MODULE_2__["mysqlDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MysqlDatabaseModelToCodeConverter", function() { return _database_exports__WEBPACK_IMPORTED_MODULE_2__["MysqlDatabaseModelToCodeConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OracleDatabaseModelToCodeConverterConfigManager", function() { return _database_exports__WEBPACK_IMPORTED_MODULE_2__["OracleDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "oracleDatabaseModelToCodeConverterConfigManager", function() { return _database_exports__WEBPACK_IMPORTED_MODULE_2__["oracleDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OracleDatabaseModelToCodeConverter", function() { return _database_exports__WEBPACK_IMPORTED_MODULE_2__["OracleDatabaseModelToCodeConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SqlServerDatabaseModelToCodeConverterConfigManager", function() { return _database_exports__WEBPACK_IMPORTED_MODULE_2__["SqlServerDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sqlServerDatabaseModelToCodeConverterConfigManager", function() { return _database_exports__WEBPACK_IMPORTED_MODULE_2__["sqlServerDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SqlServerDatabaseModelToCodeConverter", function() { return _database_exports__WEBPACK_IMPORTED_MODULE_2__["SqlServerDatabaseModelToCodeConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PostgresqlDatabaseModelToCodeConverterConfigManager", function() { return _database_exports__WEBPACK_IMPORTED_MODULE_2__["PostgresqlDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "postgresqlDatabaseModelToCodeConverterConfigManager", function() { return _database_exports__WEBPACK_IMPORTED_MODULE_2__["postgresqlDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PostgresqlDatabaseModelToCodeConverter", function() { return _database_exports__WEBPACK_IMPORTED_MODULE_2__["PostgresqlDatabaseModelToCodeConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EntityRelationshipModelToDatabaseCodeConverter", function() { return _database_exports__WEBPACK_IMPORTED_MODULE_2__["EntityRelationshipModelToDatabaseCodeConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DatabaseModelGeneratorConfigManager", function() { return _database_exports__WEBPACK_IMPORTED_MODULE_2__["DatabaseModelGeneratorConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "databaseModelGeneratorConfigManager", function() { return _database_exports__WEBPACK_IMPORTED_MODULE_2__["databaseModelGeneratorConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DatabaseModelGenerator", function() { return _database_exports__WEBPACK_IMPORTED_MODULE_2__["DatabaseModelGenerator"]; });

/* harmony import */ var _oop_exports__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./oop/exports */ "./src/main/erdiagram/generator/oop/exports.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JavaClassModelToCodeConverterConfigManager", function() { return _oop_exports__WEBPACK_IMPORTED_MODULE_3__["JavaClassModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "javaClassModelToCodeConverterConfigManager", function() { return _oop_exports__WEBPACK_IMPORTED_MODULE_3__["javaClassModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createJavaType", function() { return _oop_exports__WEBPACK_IMPORTED_MODULE_3__["createJavaType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createJavaParameterizedType", function() { return _oop_exports__WEBPACK_IMPORTED_MODULE_3__["createJavaParameterizedType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createJavaArrayType", function() { return _oop_exports__WEBPACK_IMPORTED_MODULE_3__["createJavaArrayType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isJavaParameterizedType", function() { return _oop_exports__WEBPACK_IMPORTED_MODULE_3__["isJavaParameterizedType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseJavaType", function() { return _oop_exports__WEBPACK_IMPORTED_MODULE_3__["parseJavaType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JavaClassModelToCodeConverter", function() { return _oop_exports__WEBPACK_IMPORTED_MODULE_3__["JavaClassModelToCodeConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TypeScriptClassModelToCodeConverterConfigManager", function() { return _oop_exports__WEBPACK_IMPORTED_MODULE_3__["TypeScriptClassModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "typescriptClassModelToCodeConverterConfigManager", function() { return _oop_exports__WEBPACK_IMPORTED_MODULE_3__["typescriptClassModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createTypeScriptType", function() { return _oop_exports__WEBPACK_IMPORTED_MODULE_3__["createTypeScriptType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createTypeScriptParameterizedType", function() { return _oop_exports__WEBPACK_IMPORTED_MODULE_3__["createTypeScriptParameterizedType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createTypeScriptArrayType", function() { return _oop_exports__WEBPACK_IMPORTED_MODULE_3__["createTypeScriptArrayType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isTypeScriptParameterizedType", function() { return _oop_exports__WEBPACK_IMPORTED_MODULE_3__["isTypeScriptParameterizedType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseTypeScriptType", function() { return _oop_exports__WEBPACK_IMPORTED_MODULE_3__["parseTypeScriptType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TypeScriptClassModelToCodeConverter", function() { return _oop_exports__WEBPACK_IMPORTED_MODULE_3__["TypeScriptClassModelToCodeConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EntityRelationshipModelToClassCodeConverter", function() { return _oop_exports__WEBPACK_IMPORTED_MODULE_3__["EntityRelationshipModelToClassCodeConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ClassModelGeneratorConfigManager", function() { return _oop_exports__WEBPACK_IMPORTED_MODULE_3__["ClassModelGeneratorConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "classModelGeneratorConfigManager", function() { return _oop_exports__WEBPACK_IMPORTED_MODULE_3__["classModelGeneratorConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ClassModelGenerator", function() { return _oop_exports__WEBPACK_IMPORTED_MODULE_3__["ClassModelGenerator"]; });

/* harmony import */ var _diagram_exports__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./diagram/exports */ "./src/main/erdiagram/generator/diagram/exports.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager", function() { return _diagram_exports__WEBPACK_IMPORTED_MODULE_4__["NomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager", function() { return _diagram_exports__WEBPACK_IMPORTED_MODULE_4__["nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NomnomlEntityRelationshipModelToDiagramCodeConverter", function() { return _diagram_exports__WEBPACK_IMPORTED_MODULE_4__["NomnomlEntityRelationshipModelToDiagramCodeConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NomnomlEntityRelationshipModelToDiagramConverter", function() { return _diagram_exports__WEBPACK_IMPORTED_MODULE_4__["NomnomlEntityRelationshipModelToDiagramConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PlantUmlEntityRelationshipModelToDiagramCodeConverterConfigManager", function() { return _diagram_exports__WEBPACK_IMPORTED_MODULE_4__["PlantUmlEntityRelationshipModelToDiagramCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "plantumlEntityRelationshipModelToDiagramCodeConverterConfigManager", function() { return _diagram_exports__WEBPACK_IMPORTED_MODULE_4__["plantumlEntityRelationshipModelToDiagramCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PlantUmlEntityRelationshipModelToDiagramCodeConverter", function() { return _diagram_exports__WEBPACK_IMPORTED_MODULE_4__["PlantUmlEntityRelationshipModelToDiagramCodeConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PlantUmlEntityRelationshipModelToDiagramConverter", function() { return _diagram_exports__WEBPACK_IMPORTED_MODULE_4__["PlantUmlEntityRelationshipModelToDiagramConverter"]; });









/***/ }),

/***/ "./src/main/erdiagram/generator/oop/code-converter/EntityRelationshipModelToClassCodeConverter.ts":
/*!********************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/oop/code-converter/EntityRelationshipModelToClassCodeConverter.ts ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EntityRelationshipModelToClassCodeConverter; });
class EntityRelationshipModelToClassCodeConverter {
    constructor(classModelGenerator, classModelToCodeConverter) {
        this.classModelGenerator = classModelGenerator;
        this.classModelToCodeConverter = classModelToCodeConverter;
    }
    convertToCode(entityRelationshipModel) {
        const classModel = this.classModelGenerator.generateClassModel(entityRelationshipModel);
        return this.classModelToCodeConverter.convertToCode(classModel);
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/oop/code-converter/exports.ts":
/*!********************************************************************!*\
  !*** ./src/main/erdiagram/generator/oop/code-converter/exports.ts ***!
  \********************************************************************/
/*! exports provided: JavaClassModelToCodeConverterConfigManager, javaClassModelToCodeConverterConfigManager, createJavaType, createJavaParameterizedType, createJavaArrayType, isJavaParameterizedType, parseJavaType, JavaClassModelToCodeConverter, TypeScriptClassModelToCodeConverterConfigManager, typescriptClassModelToCodeConverterConfigManager, createTypeScriptType, createTypeScriptParameterizedType, createTypeScriptArrayType, isTypeScriptParameterizedType, parseTypeScriptType, TypeScriptClassModelToCodeConverter, EntityRelationshipModelToClassCodeConverter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EntityRelationshipModelToClassCodeConverter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EntityRelationshipModelToClassCodeConverter */ "./src/main/erdiagram/generator/oop/code-converter/EntityRelationshipModelToClassCodeConverter.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EntityRelationshipModelToClassCodeConverter", function() { return _EntityRelationshipModelToClassCodeConverter__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _java_exports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./java/exports */ "./src/main/erdiagram/generator/oop/code-converter/java/exports.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JavaClassModelToCodeConverterConfigManager", function() { return _java_exports__WEBPACK_IMPORTED_MODULE_1__["JavaClassModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "javaClassModelToCodeConverterConfigManager", function() { return _java_exports__WEBPACK_IMPORTED_MODULE_1__["javaClassModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createJavaType", function() { return _java_exports__WEBPACK_IMPORTED_MODULE_1__["createJavaType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createJavaParameterizedType", function() { return _java_exports__WEBPACK_IMPORTED_MODULE_1__["createJavaParameterizedType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createJavaArrayType", function() { return _java_exports__WEBPACK_IMPORTED_MODULE_1__["createJavaArrayType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isJavaParameterizedType", function() { return _java_exports__WEBPACK_IMPORTED_MODULE_1__["isJavaParameterizedType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseJavaType", function() { return _java_exports__WEBPACK_IMPORTED_MODULE_1__["parseJavaType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JavaClassModelToCodeConverter", function() { return _java_exports__WEBPACK_IMPORTED_MODULE_1__["JavaClassModelToCodeConverter"]; });

/* harmony import */ var _typescript_exports__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./typescript/exports */ "./src/main/erdiagram/generator/oop/code-converter/typescript/exports.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TypeScriptClassModelToCodeConverterConfigManager", function() { return _typescript_exports__WEBPACK_IMPORTED_MODULE_2__["TypeScriptClassModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "typescriptClassModelToCodeConverterConfigManager", function() { return _typescript_exports__WEBPACK_IMPORTED_MODULE_2__["typescriptClassModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createTypeScriptType", function() { return _typescript_exports__WEBPACK_IMPORTED_MODULE_2__["createTypeScriptType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createTypeScriptParameterizedType", function() { return _typescript_exports__WEBPACK_IMPORTED_MODULE_2__["createTypeScriptParameterizedType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createTypeScriptArrayType", function() { return _typescript_exports__WEBPACK_IMPORTED_MODULE_2__["createTypeScriptArrayType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isTypeScriptParameterizedType", function() { return _typescript_exports__WEBPACK_IMPORTED_MODULE_2__["isTypeScriptParameterizedType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseTypeScriptType", function() { return _typescript_exports__WEBPACK_IMPORTED_MODULE_2__["parseTypeScriptType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TypeScriptClassModelToCodeConverter", function() { return _typescript_exports__WEBPACK_IMPORTED_MODULE_2__["TypeScriptClassModelToCodeConverter"]; });







/***/ }),

/***/ "./src/main/erdiagram/generator/oop/code-converter/java/JavaClassModelToCodeConverter.ts":
/*!***********************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/oop/code-converter/java/JavaClassModelToCodeConverter.ts ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return JavaClassModelToCodeConverter; });
/* harmony import */ var _erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/util/string-utils */ "./src/main/erdiagram/util/string-utils.ts");
/* harmony import */ var _erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/util/indent-utils */ "./src/main/erdiagram/util/indent-utils.ts");
/* harmony import */ var _erdiagram_generator_oop_code_converter_java_type_JavaParameterizedType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/generator/oop/code-converter/java/type/JavaParameterizedType */ "./src/main/erdiagram/generator/oop/code-converter/java/type/JavaParameterizedType.ts");
/* harmony import */ var _erdiagram_generator_oop_code_converter_java_type_JavaType__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/generator/oop/code-converter/java/type/JavaType */ "./src/main/erdiagram/generator/oop/code-converter/java/type/JavaType.ts");
/* harmony import */ var _erdiagram_util_array_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/erdiagram/util/array-utils */ "./src/main/erdiagram/util/array-utils.ts");
/* harmony import */ var _erdiagram_generator_oop_code_converter_java_config_JavaClassModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/erdiagram/generator/oop/code-converter/java/config/JavaClassModelToCodeConverterConfigManager */ "./src/main/erdiagram/generator/oop/code-converter/java/config/JavaClassModelToCodeConverterConfigManager.ts");






const EMPTY_STRING = '';
class JavaClassModelToCodeConverter {
    constructor(config) {
        this.config = _erdiagram_generator_oop_code_converter_java_config_JavaClassModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_5__["default"].mergeWithDefaultConfig(config);
    }
    convertToCode(classModel) {
        return classModel.classes
            .map(classDescriptor => this.generateClass(classDescriptor))
            .join('\n\n');
    }
    generateClass(classDescriptor) {
        const className = Object(_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_0__["capitalizeWord"])(classDescriptor.name);
        const usedTypes = [];
        const fieldsLines = [];
        const methodsLines = [];
        for (const field of classDescriptor.fields) {
            const { usedTypes: fieldUsedTypes, fieldLines, getterLines, setterLines } = this.createField(field);
            usedTypes.push(...fieldUsedTypes);
            fieldsLines.push(...fieldLines);
            methodsLines.push(...getterLines, EMPTY_STRING, ...setterLines, EMPTY_STRING);
        }
        const classOuterLines = [
            `/* ========== ${className} class ========== */`,
            EMPTY_STRING
        ];
        if (this.config.generatedClassesPackage) {
            classOuterLines.push(`package ${this.config.generatedClassesPackage};`, EMPTY_STRING);
        }
        const importLines = this.createImportStatements(usedTypes, classDescriptor.fields);
        if (importLines.length !== 0) {
            classOuterLines.push(...importLines, EMPTY_STRING);
        }
        classOuterLines.push(`public class ${className} {`);
        const classContentLines = [
            EMPTY_STRING,
            ...fieldsLines,
            EMPTY_STRING,
            ...methodsLines
        ];
        classOuterLines.push(...Object(_erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_1__["indentLines"])(classContentLines));
        classOuterLines.push(`}`);
        return classOuterLines.join('\n');
    }
    createField(field) {
        const fieldName = field.name;
        const capitalizedFieldName = Object(_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_0__["capitalizeWord"])(fieldName);
        const fieldLines = [];
        const usedTypes = [];
        // TODO use length for validation annotations?
        if (this.config.useSpringNullabilityAnnotations) {
            if (field.nullable) {
                fieldLines.push('@Nullable');
                usedTypes.push(Object(_erdiagram_generator_oop_code_converter_java_type_JavaType__WEBPACK_IMPORTED_MODULE_3__["createJavaType"])('Nullable', 'org.springframework.lang'));
            }
            else {
                fieldLines.push('@NonNull');
                usedTypes.push(Object(_erdiagram_generator_oop_code_converter_java_type_JavaType__WEBPACK_IMPORTED_MODULE_3__["createJavaType"])('NonNull', 'org.springframework.lang'));
            }
        }
        const fieldType = this.mapFieldTypeToJavaType(field);
        usedTypes.push(fieldType);
        const formattedJavaType = fieldType.formatSimple();
        fieldLines.push(`private ${formattedJavaType} ${fieldName};`);
        const getterLines = [
            `public ${formattedJavaType} get${capitalizedFieldName}() {`,
            Object(_erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_1__["indentLine"])(`return ${fieldName};`),
            '}',
        ];
        const setterLines = [
            `public void set${capitalizedFieldName}(${formattedJavaType} ${fieldName}) {`,
            Object(_erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_1__["indentLine"])(`this.${fieldName} = ${fieldName};`),
            '}',
        ];
        return {
            usedTypes,
            fieldLines,
            getterLines,
            setterLines
        };
    }
    mapFieldTypeToJavaType(field) {
        if (field.list) {
            return this.mapListTypeToJavaType(field);
        }
        else {
            return this.mapSingleTypeToJavaType(field);
        }
    }
    mapListTypeToJavaType(field) {
        return Object(_erdiagram_generator_oop_code_converter_java_type_JavaParameterizedType__WEBPACK_IMPORTED_MODULE_2__["createJavaParameterizedType"])('List', 'java.util', [
            this.mapSingleTypeToJavaType(field)
        ]);
    }
    mapSingleTypeToJavaType(field) {
        const { entityType, primitiveType } = field;
        if (entityType) {
            if (primitiveType) {
                throw new Error('Invalid field descriptor: provided both primitive and entity types');
            }
            return Object(_erdiagram_generator_oop_code_converter_java_type_JavaType__WEBPACK_IMPORTED_MODULE_3__["createJavaType"])(entityType, this.config.generatedClassesPackage);
        }
        if (!primitiveType) {
            throw new Error('Invalid field descriptor: missing type');
        }
        /* istanbul ignore next */
        if (!this.config.typeBindings.hasOwnProperty(primitiveType)) {
            throw new Error('Unsupported type: ' + primitiveType);
        }
        return this.config.typeBindings[primitiveType];
    }
    createImportStatements(javaTypes, classFields) {
        const importStatements = this.unrollTypesRecursively(javaTypes)
            .filter(javaType => this.isImportRequired(javaType))
            .map(javaType => `import ${javaType.canonicalName};`);
        return Object(_erdiagram_util_array_utils__WEBPACK_IMPORTED_MODULE_4__["removeDuplicates"])(importStatements).sort();
    }
    unrollTypesRecursively(javaTypes, appendTo = []) {
        for (const javaType of javaTypes) {
            appendTo.push(javaType);
            if (Object(_erdiagram_generator_oop_code_converter_java_type_JavaParameterizedType__WEBPACK_IMPORTED_MODULE_2__["isJavaParameterizedType"])(javaType)) {
                this.unrollTypesRecursively(javaType.parameterTypes, appendTo);
            }
        }
        return appendTo;
    }
    isImportRequired(javaType) {
        return !!javaType.packageName
            && javaType.packageName !== 'java.lang'
            && this.config.generatedClassesPackage !== javaType.packageName;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/oop/code-converter/java/config/JavaClassModelToCodeConverterConfigManager.ts":
/*!*******************************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/oop/code-converter/java/config/JavaClassModelToCodeConverterConfigManager.ts ***!
  \*******************************************************************************************************************/
/*! exports provided: JavaClassModelToCodeConverterConfigManager, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JavaClassModelToCodeConverterConfigManager", function() { return JavaClassModelToCodeConverterConfigManager; });
/* harmony import */ var _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/entity-relationship-model-types */ "./src/main/erdiagram/parser/entity-relationship-model-types.ts");
/* harmony import */ var _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/common/config/AbstractComponentConfigManager */ "./src/main/erdiagram/common/config/AbstractComponentConfigManager.ts");
/* harmony import */ var _erdiagram_generator_oop_code_converter_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/generator/oop/code-converter/java/type/parseJavaType */ "./src/main/erdiagram/generator/oop/code-converter/java/type/parseJavaType.ts");
/* harmony import */ var _erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/util/record-utils */ "./src/main/erdiagram/util/record-utils.ts");




class JavaClassModelToCodeConverterConfigManager extends _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_1__["default"] {
    getDefaultConfig() {
        return {
            typeBindings: {
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].IDENTIFIER]: Object(_erdiagram_generator_oop_code_converter_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__["default"])('java.lang.Long'),
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].TEXT]: Object(_erdiagram_generator_oop_code_converter_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__["default"])('java.lang.String'),
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].LONG]: Object(_erdiagram_generator_oop_code_converter_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__["default"])('java.lang.Long'),
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].INT]: Object(_erdiagram_generator_oop_code_converter_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__["default"])('java.lang.Integer'),
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].SHORT]: Object(_erdiagram_generator_oop_code_converter_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__["default"])('java.lang.Short'),
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].DECIMAL]: Object(_erdiagram_generator_oop_code_converter_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__["default"])('java.math.BigDecimal'),
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].BOOLEAN]: Object(_erdiagram_generator_oop_code_converter_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__["default"])('java.lang.Boolean'),
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].DATE]: Object(_erdiagram_generator_oop_code_converter_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__["default"])('java.time.LocalDate'),
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].TIME]: Object(_erdiagram_generator_oop_code_converter_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__["default"])('java.time.LocalTime'),
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].DATETIME]: Object(_erdiagram_generator_oop_code_converter_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__["default"])('java.time.LocalDateTime'),
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].BLOB]: Object(_erdiagram_generator_oop_code_converter_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__["default"])('byte[]')
            },
            useSpringNullabilityAnnotations: false
        };
    }
    mergeConfigs(fullConfig, partialConfig) {
        return Object.assign(Object.assign(Object.assign({}, fullConfig), partialConfig), { typeBindings: Object.assign(Object.assign({}, fullConfig.typeBindings), partialConfig === null || partialConfig === void 0 ? void 0 : partialConfig.typeBindings) });
    }
    convertToSerializableObject(fullConfig) {
        return Object.assign(Object.assign({}, fullConfig), { typeBindings: Object(_erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_3__["mapValues"])(fullConfig.typeBindings, javaType => javaType.formatCanonical()) });
    }
    convertFromSerializableObject(serializableConfig) {
        return Object.assign(Object.assign({}, serializableConfig), { typeBindings: Object(_erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_3__["mapValues"])(serializableConfig.typeBindings, _erdiagram_generator_oop_code_converter_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__["default"]) });
    }
}
const javaClassModelToCodeConverterConfigManager = new JavaClassModelToCodeConverterConfigManager();
/* harmony default export */ __webpack_exports__["default"] = (javaClassModelToCodeConverterConfigManager);


/***/ }),

/***/ "./src/main/erdiagram/generator/oop/code-converter/java/config/exports.ts":
/*!********************************************************************************!*\
  !*** ./src/main/erdiagram/generator/oop/code-converter/java/config/exports.ts ***!
  \********************************************************************************/
/*! exports provided: JavaClassModelToCodeConverterConfigManager, javaClassModelToCodeConverterConfigManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _JavaClassModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./JavaClassModelToCodeConverterConfigManager */ "./src/main/erdiagram/generator/oop/code-converter/java/config/JavaClassModelToCodeConverterConfigManager.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JavaClassModelToCodeConverterConfigManager", function() { return _JavaClassModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_0__["JavaClassModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "javaClassModelToCodeConverterConfigManager", function() { return _JavaClassModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"]; });





/***/ }),

/***/ "./src/main/erdiagram/generator/oop/code-converter/java/exports.ts":
/*!*************************************************************************!*\
  !*** ./src/main/erdiagram/generator/oop/code-converter/java/exports.ts ***!
  \*************************************************************************/
/*! exports provided: JavaClassModelToCodeConverterConfigManager, javaClassModelToCodeConverterConfigManager, createJavaType, createJavaParameterizedType, createJavaArrayType, isJavaParameterizedType, parseJavaType, JavaClassModelToCodeConverter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _type_JavaType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./type/JavaType */ "./src/main/erdiagram/generator/oop/code-converter/java/type/JavaType.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createJavaType", function() { return _type_JavaType__WEBPACK_IMPORTED_MODULE_0__["createJavaType"]; });

/* harmony import */ var _type_JavaParameterizedType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./type/JavaParameterizedType */ "./src/main/erdiagram/generator/oop/code-converter/java/type/JavaParameterizedType.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createJavaParameterizedType", function() { return _type_JavaParameterizedType__WEBPACK_IMPORTED_MODULE_1__["createJavaParameterizedType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createJavaArrayType", function() { return _type_JavaParameterizedType__WEBPACK_IMPORTED_MODULE_1__["createJavaArrayType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isJavaParameterizedType", function() { return _type_JavaParameterizedType__WEBPACK_IMPORTED_MODULE_1__["isJavaParameterizedType"]; });

/* harmony import */ var _type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./type/parseJavaType */ "./src/main/erdiagram/generator/oop/code-converter/java/type/parseJavaType.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseJavaType", function() { return _type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _JavaClassModelToCodeConverter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./JavaClassModelToCodeConverter */ "./src/main/erdiagram/generator/oop/code-converter/java/JavaClassModelToCodeConverter.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JavaClassModelToCodeConverter", function() { return _JavaClassModelToCodeConverter__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _config_exports__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./config/exports */ "./src/main/erdiagram/generator/oop/code-converter/java/config/exports.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JavaClassModelToCodeConverterConfigManager", function() { return _config_exports__WEBPACK_IMPORTED_MODULE_4__["JavaClassModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "javaClassModelToCodeConverterConfigManager", function() { return _config_exports__WEBPACK_IMPORTED_MODULE_4__["javaClassModelToCodeConverterConfigManager"]; });









/***/ }),

/***/ "./src/main/erdiagram/generator/oop/code-converter/java/type/JavaParameterizedType.ts":
/*!********************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/oop/code-converter/java/type/JavaParameterizedType.ts ***!
  \********************************************************************************************/
/*! exports provided: createJavaParameterizedType, createJavaArrayType, isJavaParameterizedType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createJavaParameterizedType", function() { return createJavaParameterizedType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createJavaArrayType", function() { return createJavaArrayType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isJavaParameterizedType", function() { return isJavaParameterizedType; });
function createJavaParameterizedType(name, packageName, parameterTypes) {
    const canonicalName = packageName ? `${packageName}.${name}` : name;
    return {
        packageName,
        name,
        parameterTypes,
        canonicalName,
        formatSimple(canonical = false) {
            const formattedParameterTypes = parameterTypes.map(t => t.formatSimple()).join(', ');
            return `${name}<${formattedParameterTypes}>`;
        },
        formatCanonical(canonical = false) {
            const formattedParameterTypes = parameterTypes.map(t => t.formatCanonical()).join(', ');
            return `${canonicalName}<${formattedParameterTypes}>`;
        }
    };
}
function createJavaArrayType(parameterType) {
    const name = `${parameterType.name}[]`;
    return {
        name,
        parameterTypes: [parameterType],
        canonicalName: name,
        formatSimple() {
            return `${parameterType.formatSimple()}[]`;
        },
        formatCanonical() {
            return `${parameterType.formatCanonical()}[]`;
        }
    };
}
function isJavaParameterizedType(javaType) {
    return Array.isArray(javaType.parameterTypes);
}


/***/ }),

/***/ "./src/main/erdiagram/generator/oop/code-converter/java/type/JavaType.ts":
/*!*******************************************************************************!*\
  !*** ./src/main/erdiagram/generator/oop/code-converter/java/type/JavaType.ts ***!
  \*******************************************************************************/
/*! exports provided: createJavaType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createJavaType", function() { return createJavaType; });
function createJavaType(name, packageName) {
    const canonicalName = packageName ? `${packageName}.${name}` : name;
    return {
        packageName,
        name,
        canonicalName,
        formatSimple() {
            return name;
        },
        formatCanonical() {
            return canonicalName;
        }
    };
}


/***/ }),

/***/ "./src/main/erdiagram/generator/oop/code-converter/java/type/parseJavaType.ts":
/*!************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/oop/code-converter/java/type/parseJavaType.ts ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return parseJavaType; });
/* harmony import */ var _erdiagram_generator_oop_code_converter_java_type_JavaParameterizedType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/generator/oop/code-converter/java/type/JavaParameterizedType */ "./src/main/erdiagram/generator/oop/code-converter/java/type/JavaParameterizedType.ts");
/* harmony import */ var _erdiagram_generator_oop_code_converter_java_type_JavaType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/generator/oop/code-converter/java/type/JavaType */ "./src/main/erdiagram/generator/oop/code-converter/java/type/JavaType.ts");


const RAW_TYPE_REGEX = /^(?:[a-zA-Z_$][a-zA-Z_$\d]*\.)*[a-zA-Z_$][a-zA-Z_$\d]*$/;
const ARRAY_TYPE_REGEX = /^(.*)\[\s*]\s*$/;
const PACKAGE_SEPARATOR = '.';
function parseJavaType(text) {
    try {
        return parseJavaTypeInternal(text);
    }
    catch (error) {
        throw new Error('Malformed Java type: ' + text);
    }
}
function parseJavaTypeInternal(text) {
    const trimmedText = text.trim();
    if (ARRAY_TYPE_REGEX.test(trimmedText)) {
        const [fullMatch, rawTypeText] = ARRAY_TYPE_REGEX.exec(trimmedText);
        return Object(_erdiagram_generator_oop_code_converter_java_type_JavaParameterizedType__WEBPACK_IMPORTED_MODULE_0__["createJavaArrayType"])(parseJavaTypeInternal(rawTypeText));
    }
    const startOfParameterTypes = trimmedText.indexOf('<');
    if (startOfParameterTypes === -1) {
        return parseJavaRawType(trimmedText);
    }
    const endOfParameterTypes = trimmedText.lastIndexOf('>');
    if (endOfParameterTypes === -1) {
        throw new Error('Missing end character of parameter types (>)');
    }
    if (endOfParameterTypes !== trimmedText.length - 1) {
        throw new Error('Unexpected characters found after parameter types');
    }
    const rawType = parseJavaRawType(trimmedText.substring(0, startOfParameterTypes));
    const parameterTypes = splitParameterTypes(trimmedText.substring(startOfParameterTypes + 1, endOfParameterTypes))
        .map(parameterType => parseJavaTypeInternal(parameterType));
    return Object(_erdiagram_generator_oop_code_converter_java_type_JavaParameterizedType__WEBPACK_IMPORTED_MODULE_0__["createJavaParameterizedType"])(rawType.name, rawType.packageName, parameterTypes);
}
function parseJavaRawType(text) {
    const trimmedText = trimRawJavaTypeParts(text.trim());
    if (!RAW_TYPE_REGEX.test(trimmedText)) {
        throw new Error(`Illegal Java type format: ${text}`);
    }
    const lastDotIndex = trimmedText.lastIndexOf(PACKAGE_SEPARATOR);
    if (lastDotIndex === -1) {
        return Object(_erdiagram_generator_oop_code_converter_java_type_JavaType__WEBPACK_IMPORTED_MODULE_1__["createJavaType"])(trimmedText);
    }
    const packageName = trimmedText.substring(0, lastDotIndex);
    const className = trimmedText.substring(lastDotIndex + 1);
    return Object(_erdiagram_generator_oop_code_converter_java_type_JavaType__WEBPACK_IMPORTED_MODULE_1__["createJavaType"])(className, packageName);
}
function trimRawJavaTypeParts(packageName) {
    return packageName.split(PACKAGE_SEPARATOR).map(e => e.trim()).join(PACKAGE_SEPARATOR);
}
function splitParameterTypes(parameterTypesText) {
    if (!parameterTypesText.includes(',')) {
        return [parameterTypesText];
    }
    const commaIndices = [];
    let nestedLevelsCount = 0;
    [...parameterTypesText].forEach((character, index) => {
        switch (character) {
            case ',':
                if (nestedLevelsCount === 0) {
                    commaIndices.push(index);
                }
                break;
            case '<':
                nestedLevelsCount++;
                break;
            case '>':
                if (nestedLevelsCount === 0) {
                    throw new Error('Unexpected character ">"');
                }
                nestedLevelsCount--;
                break;
        }
    });
    const splittedParameterTypes = [];
    let startIndex = 0;
    for (const commaIndex of commaIndices) {
        splittedParameterTypes.push(parameterTypesText.substring(startIndex, commaIndex));
        startIndex = commaIndex + 1;
    }
    // Text after the last comma
    splittedParameterTypes.push(parameterTypesText.substring(startIndex));
    return splittedParameterTypes;
}


/***/ }),

/***/ "./src/main/erdiagram/generator/oop/code-converter/typescript/TypeScriptClassModelToCodeConverter.ts":
/*!***********************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/oop/code-converter/typescript/TypeScriptClassModelToCodeConverter.ts ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TypeScriptClassModelToCodeConverter; });
/* harmony import */ var _erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/util/string-utils */ "./src/main/erdiagram/util/string-utils.ts");
/* harmony import */ var _erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/util/indent-utils */ "./src/main/erdiagram/util/indent-utils.ts");
/* harmony import */ var _erdiagram_generator_oop_code_converter_typescript_type_TypeScriptParameterizedType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/generator/oop/code-converter/typescript/type/TypeScriptParameterizedType */ "./src/main/erdiagram/generator/oop/code-converter/typescript/type/TypeScriptParameterizedType.ts");
/* harmony import */ var _erdiagram_generator_oop_code_converter_typescript_type_TypeScriptType__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/generator/oop/code-converter/typescript/type/TypeScriptType */ "./src/main/erdiagram/generator/oop/code-converter/typescript/type/TypeScriptType.ts");
/* harmony import */ var _erdiagram_generator_oop_code_converter_typescript_config_TypeScriptClassModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/erdiagram/generator/oop/code-converter/typescript/config/TypeScriptClassModelToCodeConverterConfigManager */ "./src/main/erdiagram/generator/oop/code-converter/typescript/config/TypeScriptClassModelToCodeConverterConfigManager.ts");





class TypeScriptClassModelToCodeConverter {
    constructor(config) {
        this.config = _erdiagram_generator_oop_code_converter_typescript_config_TypeScriptClassModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_4__["default"].mergeWithDefaultConfig(config);
    }
    convertToCode(classModel) {
        return classModel.classes
            .map(classDescriptor => this.generateClass(classDescriptor))
            .join('\n\n');
    }
    generateClass(classDescriptor) {
        const interfaceName = Object(_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_0__["capitalizeWord"])(classDescriptor.name);
        const fieldsLines = classDescriptor.fields
            .map(field => this.createField(field));
        const classOuterLines = [
            `interface ${interfaceName} {`
        ];
        classOuterLines.push(...Object(_erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_1__["indentLines"])(fieldsLines));
        classOuterLines.push(`}`);
        return classOuterLines.join('\n');
    }
    createField(field) {
        const fieldName = field.name;
        const typescriptType = this.mapFieldTypeToTypeScriptType(field);
        const formattedTypeScriptType = typescriptType.format();
        const optionalIndicatorChar = field.nullable ? '?' : '';
        return `${fieldName}${optionalIndicatorChar}: ${formattedTypeScriptType};`;
    }
    mapFieldTypeToTypeScriptType(field) {
        if (field.list) {
            return this.mapListTypeToTypeScriptType(field);
        }
        else {
            return this.mapSingleTypeToTypeScriptType(field);
        }
    }
    mapListTypeToTypeScriptType(field) {
        return Object(_erdiagram_generator_oop_code_converter_typescript_type_TypeScriptParameterizedType__WEBPACK_IMPORTED_MODULE_2__["createTypeScriptArrayType"])(this.mapSingleTypeToTypeScriptType(field));
    }
    mapSingleTypeToTypeScriptType(field) {
        const { entityType, primitiveType } = field;
        if (entityType) {
            if (primitiveType) {
                throw new Error('Invalid field descriptor: provided both primitive and entity types');
            }
            return Object(_erdiagram_generator_oop_code_converter_typescript_type_TypeScriptType__WEBPACK_IMPORTED_MODULE_3__["createTypeScriptType"])(entityType);
        }
        if (!primitiveType) {
            throw new Error('Invalid field descriptor: missing type');
        }
        if (!this.config.typeBindings.hasOwnProperty(primitiveType)) {
            throw new Error('Unsupported type: ' + primitiveType);
        }
        return this.config.typeBindings[primitiveType];
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/oop/code-converter/typescript/config/TypeScriptClassModelToCodeConverterConfigManager.ts":
/*!*******************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/oop/code-converter/typescript/config/TypeScriptClassModelToCodeConverterConfigManager.ts ***!
  \*******************************************************************************************************************************/
/*! exports provided: TypeScriptClassModelToCodeConverterConfigManager, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TypeScriptClassModelToCodeConverterConfigManager", function() { return TypeScriptClassModelToCodeConverterConfigManager; });
/* harmony import */ var _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/entity-relationship-model-types */ "./src/main/erdiagram/parser/entity-relationship-model-types.ts");
/* harmony import */ var _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/common/config/AbstractComponentConfigManager */ "./src/main/erdiagram/common/config/AbstractComponentConfigManager.ts");
/* harmony import */ var _erdiagram_generator_oop_code_converter_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/generator/oop/code-converter/typescript/type/parseTypeScriptType */ "./src/main/erdiagram/generator/oop/code-converter/typescript/type/parseTypeScriptType.ts");
/* harmony import */ var _erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/util/record-utils */ "./src/main/erdiagram/util/record-utils.ts");




class TypeScriptClassModelToCodeConverterConfigManager extends _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_1__["default"] {
    getDefaultConfig() {
        return {
            typeBindings: {
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].IDENTIFIER]: Object(_erdiagram_generator_oop_code_converter_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__["default"])('number'),
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].TEXT]: Object(_erdiagram_generator_oop_code_converter_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__["default"])('string'),
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].LONG]: Object(_erdiagram_generator_oop_code_converter_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__["default"])('number'),
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].INT]: Object(_erdiagram_generator_oop_code_converter_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__["default"])('number'),
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].SHORT]: Object(_erdiagram_generator_oop_code_converter_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__["default"])('number'),
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].DECIMAL]: Object(_erdiagram_generator_oop_code_converter_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__["default"])('number'),
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].BOOLEAN]: Object(_erdiagram_generator_oop_code_converter_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__["default"])('boolean'),
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].DATE]: Object(_erdiagram_generator_oop_code_converter_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__["default"])('Date'),
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].TIME]: Object(_erdiagram_generator_oop_code_converter_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__["default"])('Date'),
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].DATETIME]: Object(_erdiagram_generator_oop_code_converter_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__["default"])('Date'),
                [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].BLOB]: Object(_erdiagram_generator_oop_code_converter_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__["default"])('Uint8Array'),
            }
        };
    }
    mergeConfigs(fullConfig, partialConfig) {
        return Object.assign(Object.assign(Object.assign({}, fullConfig), partialConfig), { typeBindings: Object.assign(Object.assign({}, fullConfig.typeBindings), partialConfig === null || partialConfig === void 0 ? void 0 : partialConfig.typeBindings) });
    }
    convertToSerializableObject(fullConfig) {
        return Object.assign(Object.assign({}, fullConfig), { typeBindings: Object(_erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_3__["mapValues"])(fullConfig.typeBindings, typeScriptType => typeScriptType.format()) });
    }
    convertFromSerializableObject(serializableConfig) {
        return Object.assign(Object.assign({}, serializableConfig), { typeBindings: Object(_erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_3__["mapValues"])(serializableConfig.typeBindings, _erdiagram_generator_oop_code_converter_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__["default"]) });
    }
}
const typescriptClassModelToCodeConverterConfigManager = new TypeScriptClassModelToCodeConverterConfigManager();
/* harmony default export */ __webpack_exports__["default"] = (typescriptClassModelToCodeConverterConfigManager);


/***/ }),

/***/ "./src/main/erdiagram/generator/oop/code-converter/typescript/config/exports.ts":
/*!**************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/oop/code-converter/typescript/config/exports.ts ***!
  \**************************************************************************************/
/*! exports provided: TypeScriptClassModelToCodeConverterConfigManager, typescriptClassModelToCodeConverterConfigManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TypeScriptClassModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TypeScriptClassModelToCodeConverterConfigManager */ "./src/main/erdiagram/generator/oop/code-converter/typescript/config/TypeScriptClassModelToCodeConverterConfigManager.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TypeScriptClassModelToCodeConverterConfigManager", function() { return _TypeScriptClassModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_0__["TypeScriptClassModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "typescriptClassModelToCodeConverterConfigManager", function() { return _TypeScriptClassModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"]; });





/***/ }),

/***/ "./src/main/erdiagram/generator/oop/code-converter/typescript/exports.ts":
/*!*******************************************************************************!*\
  !*** ./src/main/erdiagram/generator/oop/code-converter/typescript/exports.ts ***!
  \*******************************************************************************/
/*! exports provided: TypeScriptClassModelToCodeConverterConfigManager, typescriptClassModelToCodeConverterConfigManager, createTypeScriptType, createTypeScriptParameterizedType, createTypeScriptArrayType, isTypeScriptParameterizedType, parseTypeScriptType, TypeScriptClassModelToCodeConverter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _type_TypeScriptType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./type/TypeScriptType */ "./src/main/erdiagram/generator/oop/code-converter/typescript/type/TypeScriptType.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createTypeScriptType", function() { return _type_TypeScriptType__WEBPACK_IMPORTED_MODULE_0__["createTypeScriptType"]; });

/* harmony import */ var _type_TypeScriptParameterizedType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./type/TypeScriptParameterizedType */ "./src/main/erdiagram/generator/oop/code-converter/typescript/type/TypeScriptParameterizedType.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createTypeScriptParameterizedType", function() { return _type_TypeScriptParameterizedType__WEBPACK_IMPORTED_MODULE_1__["createTypeScriptParameterizedType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createTypeScriptArrayType", function() { return _type_TypeScriptParameterizedType__WEBPACK_IMPORTED_MODULE_1__["createTypeScriptArrayType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isTypeScriptParameterizedType", function() { return _type_TypeScriptParameterizedType__WEBPACK_IMPORTED_MODULE_1__["isTypeScriptParameterizedType"]; });

/* harmony import */ var _type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./type/parseTypeScriptType */ "./src/main/erdiagram/generator/oop/code-converter/typescript/type/parseTypeScriptType.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseTypeScriptType", function() { return _type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _TypeScriptClassModelToCodeConverter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TypeScriptClassModelToCodeConverter */ "./src/main/erdiagram/generator/oop/code-converter/typescript/TypeScriptClassModelToCodeConverter.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TypeScriptClassModelToCodeConverter", function() { return _TypeScriptClassModelToCodeConverter__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _config_exports__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./config/exports */ "./src/main/erdiagram/generator/oop/code-converter/typescript/config/exports.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TypeScriptClassModelToCodeConverterConfigManager", function() { return _config_exports__WEBPACK_IMPORTED_MODULE_4__["TypeScriptClassModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "typescriptClassModelToCodeConverterConfigManager", function() { return _config_exports__WEBPACK_IMPORTED_MODULE_4__["typescriptClassModelToCodeConverterConfigManager"]; });









/***/ }),

/***/ "./src/main/erdiagram/generator/oop/code-converter/typescript/type/TypeScriptParameterizedType.ts":
/*!********************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/oop/code-converter/typescript/type/TypeScriptParameterizedType.ts ***!
  \********************************************************************************************************/
/*! exports provided: createTypeScriptParameterizedType, createTypeScriptArrayType, isTypeScriptParameterizedType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTypeScriptParameterizedType", function() { return createTypeScriptParameterizedType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTypeScriptArrayType", function() { return createTypeScriptArrayType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isTypeScriptParameterizedType", function() { return isTypeScriptParameterizedType; });
function createTypeScriptParameterizedType(name, parameterTypes) {
    return {
        name,
        parameterTypes,
        format: () => {
            const formattedParameterTypes = parameterTypes.map(t => t.format()).join(', ');
            return `${name}<${formattedParameterTypes}>`;
        }
    };
}
function createTypeScriptArrayType(parameterType) {
    return {
        name: 'Array',
        parameterTypes: [parameterType],
        format: () => `${parameterType.format()}[]`
    };
}
function isTypeScriptParameterizedType(javaType) {
    return Array.isArray(javaType.parameterTypes);
}


/***/ }),

/***/ "./src/main/erdiagram/generator/oop/code-converter/typescript/type/TypeScriptType.ts":
/*!*******************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/oop/code-converter/typescript/type/TypeScriptType.ts ***!
  \*******************************************************************************************/
/*! exports provided: createTypeScriptType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTypeScriptType", function() { return createTypeScriptType; });
function createTypeScriptType(name) {
    return {
        name,
        format: () => name
    };
}


/***/ }),

/***/ "./src/main/erdiagram/generator/oop/code-converter/typescript/type/parseTypeScriptType.ts":
/*!************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/oop/code-converter/typescript/type/parseTypeScriptType.ts ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return parseTypeScriptType; });
/* harmony import */ var _erdiagram_generator_oop_code_converter_typescript_type_TypeScriptType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/generator/oop/code-converter/typescript/type/TypeScriptType */ "./src/main/erdiagram/generator/oop/code-converter/typescript/type/TypeScriptType.ts");
/* harmony import */ var _erdiagram_generator_oop_code_converter_typescript_type_TypeScriptParameterizedType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/generator/oop/code-converter/typescript/type/TypeScriptParameterizedType */ "./src/main/erdiagram/generator/oop/code-converter/typescript/type/TypeScriptParameterizedType.ts");


const RAW_TYPE_REGEX = /^[a-zA-Z_$][a-zA-Z_$\d]*$/;
const ARRAY_TYPE_REGEX = /^(.*)\[\s*]\s*$/;
function parseTypeScriptType(text) {
    try {
        return parseTypeScriptTypeInternal(text);
    }
    catch (error) {
        throw new Error('Malformed TypeScript type: ' + text);
    }
}
function parseTypeScriptTypeInternal(text) {
    const trimmedText = text.trim();
    if (ARRAY_TYPE_REGEX.test(trimmedText)) {
        const [fullMatch, rawTypeText] = ARRAY_TYPE_REGEX.exec(trimmedText);
        return Object(_erdiagram_generator_oop_code_converter_typescript_type_TypeScriptParameterizedType__WEBPACK_IMPORTED_MODULE_1__["createTypeScriptArrayType"])(parseTypeScriptTypeInternal(rawTypeText));
    }
    const startOfParameterTypes = trimmedText.indexOf('<');
    if (startOfParameterTypes === -1) {
        return parseTypeScriptRawType(trimmedText);
    }
    const endOfParameterTypes = trimmedText.lastIndexOf('>');
    if (endOfParameterTypes === -1) {
        throw new Error('Missing end character of parameter types (>)');
    }
    if (endOfParameterTypes !== trimmedText.length - 1) {
        throw new Error('Unexpected characters found after parameter types');
    }
    const rawType = parseTypeScriptRawType(trimmedText.substring(0, startOfParameterTypes));
    const parameterTypes = splitParameterTypes(trimmedText.substring(startOfParameterTypes + 1, endOfParameterTypes))
        .map(parameterType => parseTypeScriptTypeInternal(parameterType));
    return Object(_erdiagram_generator_oop_code_converter_typescript_type_TypeScriptParameterizedType__WEBPACK_IMPORTED_MODULE_1__["createTypeScriptParameterizedType"])(rawType.name, parameterTypes);
}
function parseTypeScriptRawType(text) {
    const trimmedText = text.trim();
    if (!RAW_TYPE_REGEX.test(trimmedText)) {
        throw new Error(`Illegal TypeScript type format: ${text}`);
    }
    return Object(_erdiagram_generator_oop_code_converter_typescript_type_TypeScriptType__WEBPACK_IMPORTED_MODULE_0__["createTypeScriptType"])(trimmedText);
}
function splitParameterTypes(parameterTypesText) {
    if (!parameterTypesText.includes(',')) {
        return [parameterTypesText];
    }
    const commaIndices = [];
    let nestedLevelsCount = 0;
    [...parameterTypesText].forEach((character, index) => {
        switch (character) {
            case ',':
                if (nestedLevelsCount === 0) {
                    commaIndices.push(index);
                }
                break;
            case '<':
                nestedLevelsCount++;
                break;
            case '>':
                if (nestedLevelsCount === 0) {
                    throw new Error('Unexpected character ">"');
                }
                nestedLevelsCount--;
                break;
        }
    });
    const splittedParameterTypes = [];
    let startIndex = 0;
    for (const commaIndex of commaIndices) {
        splittedParameterTypes.push(parameterTypesText.substring(startIndex, commaIndex));
        startIndex = commaIndex + 1;
    }
    // Text after the last comma
    splittedParameterTypes.push(parameterTypesText.substring(startIndex));
    return splittedParameterTypes;
}


/***/ }),

/***/ "./src/main/erdiagram/generator/oop/exports.ts":
/*!*****************************************************!*\
  !*** ./src/main/erdiagram/generator/oop/exports.ts ***!
  \*****************************************************/
/*! exports provided: JavaClassModelToCodeConverterConfigManager, javaClassModelToCodeConverterConfigManager, createJavaType, createJavaParameterizedType, createJavaArrayType, isJavaParameterizedType, parseJavaType, JavaClassModelToCodeConverter, TypeScriptClassModelToCodeConverterConfigManager, typescriptClassModelToCodeConverterConfigManager, createTypeScriptType, createTypeScriptParameterizedType, createTypeScriptArrayType, isTypeScriptParameterizedType, parseTypeScriptType, TypeScriptClassModelToCodeConverter, EntityRelationshipModelToClassCodeConverter, ClassModelGeneratorConfigManager, classModelGeneratorConfigManager, ClassModelGenerator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _code_converter_exports__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./code-converter/exports */ "./src/main/erdiagram/generator/oop/code-converter/exports.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JavaClassModelToCodeConverterConfigManager", function() { return _code_converter_exports__WEBPACK_IMPORTED_MODULE_0__["JavaClassModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "javaClassModelToCodeConverterConfigManager", function() { return _code_converter_exports__WEBPACK_IMPORTED_MODULE_0__["javaClassModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createJavaType", function() { return _code_converter_exports__WEBPACK_IMPORTED_MODULE_0__["createJavaType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createJavaParameterizedType", function() { return _code_converter_exports__WEBPACK_IMPORTED_MODULE_0__["createJavaParameterizedType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createJavaArrayType", function() { return _code_converter_exports__WEBPACK_IMPORTED_MODULE_0__["createJavaArrayType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isJavaParameterizedType", function() { return _code_converter_exports__WEBPACK_IMPORTED_MODULE_0__["isJavaParameterizedType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseJavaType", function() { return _code_converter_exports__WEBPACK_IMPORTED_MODULE_0__["parseJavaType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JavaClassModelToCodeConverter", function() { return _code_converter_exports__WEBPACK_IMPORTED_MODULE_0__["JavaClassModelToCodeConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TypeScriptClassModelToCodeConverterConfigManager", function() { return _code_converter_exports__WEBPACK_IMPORTED_MODULE_0__["TypeScriptClassModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "typescriptClassModelToCodeConverterConfigManager", function() { return _code_converter_exports__WEBPACK_IMPORTED_MODULE_0__["typescriptClassModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createTypeScriptType", function() { return _code_converter_exports__WEBPACK_IMPORTED_MODULE_0__["createTypeScriptType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createTypeScriptParameterizedType", function() { return _code_converter_exports__WEBPACK_IMPORTED_MODULE_0__["createTypeScriptParameterizedType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createTypeScriptArrayType", function() { return _code_converter_exports__WEBPACK_IMPORTED_MODULE_0__["createTypeScriptArrayType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isTypeScriptParameterizedType", function() { return _code_converter_exports__WEBPACK_IMPORTED_MODULE_0__["isTypeScriptParameterizedType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseTypeScriptType", function() { return _code_converter_exports__WEBPACK_IMPORTED_MODULE_0__["parseTypeScriptType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TypeScriptClassModelToCodeConverter", function() { return _code_converter_exports__WEBPACK_IMPORTED_MODULE_0__["TypeScriptClassModelToCodeConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EntityRelationshipModelToClassCodeConverter", function() { return _code_converter_exports__WEBPACK_IMPORTED_MODULE_0__["EntityRelationshipModelToClassCodeConverter"]; });

/* harmony import */ var _model_exports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model/exports */ "./src/main/erdiagram/generator/oop/model/exports.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ClassModelGeneratorConfigManager", function() { return _model_exports__WEBPACK_IMPORTED_MODULE_1__["ClassModelGeneratorConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "classModelGeneratorConfigManager", function() { return _model_exports__WEBPACK_IMPORTED_MODULE_1__["classModelGeneratorConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ClassModelGenerator", function() { return _model_exports__WEBPACK_IMPORTED_MODULE_1__["ClassModelGenerator"]; });





/***/ }),

/***/ "./src/main/erdiagram/generator/oop/model/ClassModelGenerator.ts":
/*!***********************************************************************!*\
  !*** ./src/main/erdiagram/generator/oop/model/ClassModelGenerator.ts ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ClassModelGenerator; });
/* harmony import */ var pluralize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pluralize */ "./node_modules/pluralize/pluralize.js");
/* harmony import */ var pluralize__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pluralize__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/util/string-utils */ "./src/main/erdiagram/util/string-utils.ts");
/* harmony import */ var _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/parser/entity-relationship-model-types */ "./src/main/erdiagram/parser/entity-relationship-model-types.ts");
/* harmony import */ var _erdiagram_generator_oop_model_config_ClassModelGeneratorConfigManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/generator/oop/model/config/ClassModelGeneratorConfigManager */ "./src/main/erdiagram/generator/oop/model/config/ClassModelGeneratorConfigManager.ts");




class ClassModelGenerator {
    constructor(config) {
        this.config = _erdiagram_generator_oop_model_config_ClassModelGeneratorConfigManager__WEBPACK_IMPORTED_MODULE_3__["default"].mergeWithDefaultConfig(config);
    }
    generateClassModel(model) {
        const classes = [];
        model.entities
            .map(entity => this.generateEntityTable(entity, model))
            .forEach(sentence => classes.push(sentence));
        return {
            classes
        };
    }
    generateEntityTable(entity, model) {
        const name = Object(_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_1__["capitalizeWord"])(entity.name);
        const fields = [
            this.createIdField(entity)
        ];
        for (const property of entity.properties) {
            fields.push(this.mapPropertyToField(property));
        }
        for (const relationship of model.relationships) {
            const { leftMember, rightMember, direction } = relationship;
            if (leftMember.entity === entity.name && [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__["Direction"].LEFT_TO_RIGHT, _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__["Direction"].BIDIRECTIONAL].includes(direction)) {
                fields.push(this.mapRelationshipMemberToField(rightMember));
            }
            if (rightMember.entity === entity.name && [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__["Direction"].RIGHT_TO_LEFT, _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__["Direction"].BIDIRECTIONAL].includes(direction)) {
                fields.push(this.mapRelationshipMemberToField(leftMember));
            }
        }
        return {
            name,
            fields
        };
    }
    createIdField(entity) {
        return {
            name: this.getIdentifierFieldName(entity),
            primitiveType: _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__["EntityPropertyType"].IDENTIFIER,
            // ID field must be nullable, so NULL value can be used to represent an unsaved instance
            nullable: true,
            list: false
        };
    }
    getIdentifierFieldName(entity) {
        if (entity.identifierPropertyName) {
            return entity.identifierPropertyName;
        }
        const { idNamingStrategy } = this.config;
        return idNamingStrategy(entity.name);
    }
    mapRelationshipMemberToField(toMember) {
        const list = toMember.cardinality === _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__["Cardinality"].MANY;
        const name = list ? pluralize__WEBPACK_IMPORTED_MODULE_0___default()(toMember.entityAlias) : toMember.entityAlias;
        return {
            name,
            nullable: toMember.cardinality === _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__["Cardinality"].ZERO_OR_ONE,
            entityType: toMember.entity,
            list
        };
    }
    mapPropertyToField(property) {
        const { name, optional, type } = property;
        return {
            name,
            nullable: optional,
            primitiveType: type,
            list: false
        };
    }
}
;


/***/ }),

/***/ "./src/main/erdiagram/generator/oop/model/class-model-types.ts":
/*!*********************************************************************!*\
  !*** ./src/main/erdiagram/generator/oop/model/class-model-types.ts ***!
  \*********************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./src/main/erdiagram/generator/oop/model/config/ClassModelGeneratorConfigManager.ts":
/*!*******************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/oop/model/config/ClassModelGeneratorConfigManager.ts ***!
  \*******************************************************************************************/
/*! exports provided: ClassModelGeneratorConfigManager, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClassModelGeneratorConfigManager", function() { return ClassModelGeneratorConfigManager; });
/* harmony import */ var _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/common/config/AbstractComponentConfigManager */ "./src/main/erdiagram/common/config/AbstractComponentConfigManager.ts");
/* harmony import */ var _erdiagram_generator_common_id_naming_strategy_StandardIdNamingStrategies__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/generator/common/id-naming-strategy/StandardIdNamingStrategies */ "./src/main/erdiagram/generator/common/id-naming-strategy/StandardIdNamingStrategies.ts");
/* harmony import */ var _erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/util/record-utils */ "./src/main/erdiagram/util/record-utils.ts");



class ClassModelGeneratorConfigManager extends _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"] {
    getDefaultConfig() {
        return {
            idNamingStrategy: _erdiagram_generator_common_id_naming_strategy_StandardIdNamingStrategies__WEBPACK_IMPORTED_MODULE_1__["default"].DEFAULT
        };
    }
    mergeConfigs(fullConfig, partialConfig) {
        return Object.assign(Object.assign({}, fullConfig), partialConfig);
    }
    convertToSerializableObject(fullConfig) {
        return Object.assign(Object.assign({}, fullConfig), { idNamingStrategy: Object(_erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_2__["findKeyFromValue"])(_erdiagram_generator_common_id_naming_strategy_StandardIdNamingStrategies__WEBPACK_IMPORTED_MODULE_1__["default"], fullConfig.idNamingStrategy) });
    }
    convertFromSerializableObject(serializableConfig) {
        return Object.assign(Object.assign({}, serializableConfig), { idNamingStrategy: Object(_erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_2__["findValueFromNullableKey"])(_erdiagram_generator_common_id_naming_strategy_StandardIdNamingStrategies__WEBPACK_IMPORTED_MODULE_1__["default"], serializableConfig.idNamingStrategy, _erdiagram_generator_common_id_naming_strategy_StandardIdNamingStrategies__WEBPACK_IMPORTED_MODULE_1__["default"].DEFAULT) });
    }
}
const classModelGeneratorConfigManager = new ClassModelGeneratorConfigManager();
/* harmony default export */ __webpack_exports__["default"] = (classModelGeneratorConfigManager);


/***/ }),

/***/ "./src/main/erdiagram/generator/oop/model/config/exports.ts":
/*!******************************************************************!*\
  !*** ./src/main/erdiagram/generator/oop/model/config/exports.ts ***!
  \******************************************************************/
/*! exports provided: ClassModelGeneratorConfigManager, classModelGeneratorConfigManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ClassModelGeneratorConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ClassModelGeneratorConfigManager */ "./src/main/erdiagram/generator/oop/model/config/ClassModelGeneratorConfigManager.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ClassModelGeneratorConfigManager", function() { return _ClassModelGeneratorConfigManager__WEBPACK_IMPORTED_MODULE_0__["ClassModelGeneratorConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "classModelGeneratorConfigManager", function() { return _ClassModelGeneratorConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"]; });





/***/ }),

/***/ "./src/main/erdiagram/generator/oop/model/exports.ts":
/*!***********************************************************!*\
  !*** ./src/main/erdiagram/generator/oop/model/exports.ts ***!
  \***********************************************************/
/*! exports provided: ClassModelGeneratorConfigManager, classModelGeneratorConfigManager, ClassModelGenerator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ClassModelGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ClassModelGenerator */ "./src/main/erdiagram/generator/oop/model/ClassModelGenerator.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ClassModelGenerator", function() { return _ClassModelGenerator__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _class_model_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./class-model-types */ "./src/main/erdiagram/generator/oop/model/class-model-types.ts");
/* empty/unused harmony star reexport *//* harmony import */ var _config_exports__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config/exports */ "./src/main/erdiagram/generator/oop/model/config/exports.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ClassModelGeneratorConfigManager", function() { return _config_exports__WEBPACK_IMPORTED_MODULE_2__["ClassModelGeneratorConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "classModelGeneratorConfigManager", function() { return _config_exports__WEBPACK_IMPORTED_MODULE_2__["classModelGeneratorConfigManager"]; });







/***/ }),

/***/ "./src/main/erdiagram/parser/EntityRelationshipModelParser.ts":
/*!********************************************************************!*\
  !*** ./src/main/erdiagram/parser/EntityRelationshipModelParser.ts ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EntityRelationshipModelParser; });
/* harmony import */ var _erdiagram_parser_statement_statement_types_parse_functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/statement/statement-types-parse-functions */ "./src/main/erdiagram/parser/statement/statement-types-parse-functions.ts");
/* harmony import */ var _erdiagram_parser_statement_statement_type_guesser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/parser/statement/statement-type-guesser */ "./src/main/erdiagram/parser/statement/statement-type-guesser.ts");
/* harmony import */ var _erdiagram_parser_validator_ParsedEntityRelationshipModelValidator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/parser/validator/ParsedEntityRelationshipModelValidator */ "./src/main/erdiagram/parser/validator/ParsedEntityRelationshipModelValidator.ts");
/* harmony import */ var _erdiagram_parser_config_EntityRelationshipModelParserConfigManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/parser/config/EntityRelationshipModelParserConfigManager */ "./src/main/erdiagram/parser/config/EntityRelationshipModelParserConfigManager.ts");
/* harmony import */ var _erdiagram_parser_parse_errors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/erdiagram/parser/parse-errors */ "./src/main/erdiagram/parser/parse-errors.ts");
/* harmony import */ var _erdiagram_parser_ParsedModelToPublicModelConverter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/erdiagram/parser/ParsedModelToPublicModelConverter */ "./src/main/erdiagram/parser/ParsedModelToPublicModelConverter.ts");






class EntityRelationshipModelParser {
    constructor(config) {
        this.config = _erdiagram_parser_config_EntityRelationshipModelParserConfigManager__WEBPACK_IMPORTED_MODULE_3__["default"].mergeWithDefaultConfig(config);
        this.validator = new _erdiagram_parser_validator_ParsedEntityRelationshipModelValidator__WEBPACK_IMPORTED_MODULE_2__["default"](this.config.allowUnknownEntities);
        this.parsedModelToPublicModelConverter = new _erdiagram_parser_ParsedModelToPublicModelConverter__WEBPACK_IMPORTED_MODULE_5__["default"]();
    }
    parseModel(code) {
        const { model, statementResultToLineMap } = this.parseModelWithoutValidation(code);
        try {
            this.validator.validateParsedModel(model);
        }
        catch (error) {
            this.handleValidationError(error, statementResultToLineMap);
        }
        return this.parsedModelToPublicModelConverter.convertParsedModelToPublicModel(model);
    }
    parseModelWithoutValidation(code) {
        const lines = code.split('\n');
        const state = {
            entities: [],
            relationships: [],
            entityBeingParsed: null,
            statementResultToLineMap: new Map()
        };
        lines.forEach((line, lineIndex) => {
            try {
                this.parseLine(line, lineIndex, state);
            }
            catch (error) {
                this.handleLineError(error, lineIndex);
            }
        });
        return {
            model: {
                entities: state.entities,
                relationships: state.relationships
            },
            statementResultToLineMap: state.statementResultToLineMap
        };
    }
    parseLine(line, lineIndex, state) {
        const statementType = Object(_erdiagram_parser_statement_statement_type_guesser__WEBPACK_IMPORTED_MODULE_1__["guessStatementType"])(line);
        switch (statementType) {
            case _erdiagram_parser_statement_statement_type_guesser__WEBPACK_IMPORTED_MODULE_1__["StatementType"].ENTITY_NAME:
                const entityDescriptor = {
                    name: Object(_erdiagram_parser_statement_statement_types_parse_functions__WEBPACK_IMPORTED_MODULE_0__["parseEntityNameStatement"])(line),
                    properties: []
                };
                state.entities.push(entityDescriptor);
                state.entityBeingParsed = entityDescriptor;
                state.statementResultToLineMap.set(entityDescriptor, lineIndex);
                break;
            case _erdiagram_parser_statement_statement_type_guesser__WEBPACK_IMPORTED_MODULE_1__["StatementType"].ENTITY_PROPERTY:
                if (state.entityBeingParsed == null) {
                    throw new _erdiagram_parser_parse_errors__WEBPACK_IMPORTED_MODULE_4__["ERDiagramSyntaxError"]('Unexpected entity property statement');
                }
                const entityPropertyDescriptor = Object(_erdiagram_parser_statement_statement_types_parse_functions__WEBPACK_IMPORTED_MODULE_0__["parseEntityPropertyStatement"])(line);
                state.entityBeingParsed.properties.push(entityPropertyDescriptor);
                state.statementResultToLineMap.set(entityPropertyDescriptor, lineIndex);
                break;
            case _erdiagram_parser_statement_statement_type_guesser__WEBPACK_IMPORTED_MODULE_1__["StatementType"].RELATIONSHIP:
                const relationshipDescriptor = Object(_erdiagram_parser_statement_statement_types_parse_functions__WEBPACK_IMPORTED_MODULE_0__["parseRelationshipStatement"])(line);
                state.relationships.push(relationshipDescriptor);
                state.entityBeingParsed = null;
                state.statementResultToLineMap.set(relationshipDescriptor, lineIndex);
                break;
            case _erdiagram_parser_statement_statement_type_guesser__WEBPACK_IMPORTED_MODULE_1__["StatementType"].BLANK_LINE:
                // Ignore
                break;
            default:
                throw new _erdiagram_parser_parse_errors__WEBPACK_IMPORTED_MODULE_4__["ERDiagramSyntaxError"](`Unknown statement type`);
        }
    }
    handleLineError(error, lineIndex) {
        if (error instanceof _erdiagram_parser_parse_errors__WEBPACK_IMPORTED_MODULE_4__["ERDiagramError"]) {
            throw new _erdiagram_parser_parse_errors__WEBPACK_IMPORTED_MODULE_4__["ERDiagramParseLineError"](error, lineIndex);
        }
        /* istanbul ignore next */
        throw error;
    }
    handleValidationError(error, statementResultToLineMap) {
        if (error instanceof _erdiagram_parser_parse_errors__WEBPACK_IMPORTED_MODULE_4__["ERDiagramEntityPropertyError"]) {
            throw new _erdiagram_parser_parse_errors__WEBPACK_IMPORTED_MODULE_4__["ERDiagramParseLineError"](error, statementResultToLineMap.get(error.property));
        }
        if (error instanceof _erdiagram_parser_parse_errors__WEBPACK_IMPORTED_MODULE_4__["ERDiagramEntityError"]) {
            throw new _erdiagram_parser_parse_errors__WEBPACK_IMPORTED_MODULE_4__["ERDiagramParseLineError"](error, statementResultToLineMap.get(error.entity));
        }
        if (error instanceof _erdiagram_parser_parse_errors__WEBPACK_IMPORTED_MODULE_4__["ERDiagramRelationshipError"]) {
            throw new _erdiagram_parser_parse_errors__WEBPACK_IMPORTED_MODULE_4__["ERDiagramParseLineError"](error, statementResultToLineMap.get(error.relationship));
        }
        /* istanbul ignore next */
        throw error;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/parser/ParsedModelToPublicModelConverter.ts":
/*!************************************************************************!*\
  !*** ./src/main/erdiagram/parser/ParsedModelToPublicModelConverter.ts ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ParsedModelToPublicModelConverter; });
/* harmony import */ var _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/entity-relationship-model-types */ "./src/main/erdiagram/parser/entity-relationship-model-types.ts");

class ParsedModelToPublicModelConverter {
    convertParsedModelToPublicModel(parsedModel) {
        return {
            entities: parsedModel.entities.map(parsedEntity => this.convertParsedEntityToPublicEntity(parsedEntity)),
            relationships: parsedModel.relationships
        };
    }
    convertParsedEntityToPublicEntity(parsedEntity) {
        const identifierProperty = this.getEntityIdentifierProperty(parsedEntity);
        return {
            name: parsedEntity.name,
            identifierPropertyName: identifierProperty === null || identifierProperty === void 0 ? void 0 : identifierProperty.name,
            properties: parsedEntity.properties.filter(property => property != identifierProperty)
        };
    }
    getEntityIdentifierProperty(parsedEntity) {
        return parsedEntity.properties.find(property => property.type === _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].IDENTIFIER);
    }
}


/***/ }),

/***/ "./src/main/erdiagram/parser/config/EntityRelationshipModelParserConfigManager.ts":
/*!****************************************************************************************!*\
  !*** ./src/main/erdiagram/parser/config/EntityRelationshipModelParserConfigManager.ts ***!
  \****************************************************************************************/
/*! exports provided: EntityRelationshipModelParserConfigManager, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntityRelationshipModelParserConfigManager", function() { return EntityRelationshipModelParserConfigManager; });
/* harmony import */ var _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/common/config/AbstractComponentConfigManager */ "./src/main/erdiagram/common/config/AbstractComponentConfigManager.ts");

class EntityRelationshipModelParserConfigManager extends _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"] {
    getDefaultConfig() {
        return {
            allowUnknownEntities: false
        };
    }
    mergeConfigs(fullConfig, partialConfig) {
        return Object.assign(Object.assign({}, fullConfig), partialConfig);
    }
    convertToSerializableObject(fullConfig) {
        return Object.assign({}, fullConfig);
    }
    convertFromSerializableObject(serializableConfig) {
        return Object.assign({}, serializableConfig);
    }
}
const entityRelationshipModelParserConfigManager = new EntityRelationshipModelParserConfigManager();
/* harmony default export */ __webpack_exports__["default"] = (entityRelationshipModelParserConfigManager);


/***/ }),

/***/ "./src/main/erdiagram/parser/config/exports.ts":
/*!*****************************************************!*\
  !*** ./src/main/erdiagram/parser/config/exports.ts ***!
  \*****************************************************/
/*! exports provided: EntityRelationshipModelParserConfigManager, entityRelationshipModelParserConfigManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EntityRelationshipModelParserConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EntityRelationshipModelParserConfigManager */ "./src/main/erdiagram/parser/config/EntityRelationshipModelParserConfigManager.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EntityRelationshipModelParserConfigManager", function() { return _EntityRelationshipModelParserConfigManager__WEBPACK_IMPORTED_MODULE_0__["EntityRelationshipModelParserConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "entityRelationshipModelParserConfigManager", function() { return _EntityRelationshipModelParserConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"]; });





/***/ }),

/***/ "./src/main/erdiagram/parser/entity-relationship-model-types.ts":
/*!**********************************************************************!*\
  !*** ./src/main/erdiagram/parser/entity-relationship-model-types.ts ***!
  \**********************************************************************/
/*! exports provided: EntityPropertyType, Cardinality, Direction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntityPropertyType", function() { return EntityPropertyType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cardinality", function() { return Cardinality; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Direction", function() { return Direction; });
var EntityPropertyType;
(function (EntityPropertyType) {
    EntityPropertyType["IDENTIFIER"] = "identifier";
    EntityPropertyType["BOOLEAN"] = "bool";
    EntityPropertyType["SHORT"] = "short";
    EntityPropertyType["INT"] = "int";
    EntityPropertyType["LONG"] = "long";
    EntityPropertyType["DECIMAL"] = "decimal";
    EntityPropertyType["TEXT"] = "text";
    EntityPropertyType["DATE"] = "date";
    EntityPropertyType["TIME"] = "time";
    EntityPropertyType["DATETIME"] = "datetime";
    EntityPropertyType["BLOB"] = "blob";
})(EntityPropertyType || (EntityPropertyType = {}));
var Cardinality;
(function (Cardinality) {
    Cardinality["MANY"] = "many";
    Cardinality["ONE"] = "one";
    Cardinality["ZERO_OR_ONE"] = "zero_or_one";
})(Cardinality || (Cardinality = {}));
var Direction;
(function (Direction) {
    Direction["LEFT_TO_RIGHT"] = "left_to_right";
    Direction["RIGHT_TO_LEFT"] = "right_to_left";
    Direction["BIDIRECTIONAL"] = "bidirectional";
})(Direction || (Direction = {}));


/***/ }),

/***/ "./src/main/erdiagram/parser/exports.ts":
/*!**********************************************!*\
  !*** ./src/main/erdiagram/parser/exports.ts ***!
  \**********************************************/
/*! exports provided: EntityRelationshipModelParserConfigManager, entityRelationshipModelParserConfigManager, EntityPropertyType, Cardinality, Direction, ERDiagramError, ERDiagramParseLineError, ERDiagramSyntaxError, ERDiagramUnknownTypeError, ERDiagramRelationshipError, ERDiagramUnknownEntityError, ERDiagramEntityError, ERDiagramDuplicatedEntityNameError, ERDiagramEntityPropertyError, ERDiagramMultipleIdentifiersError, ERDiagramInvalidIdentifierDefinitionError, ERDiagramDuplicatedPropertyNameError, EntityRelationshipModelParser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EntityRelationshipModelParser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EntityRelationshipModelParser */ "./src/main/erdiagram/parser/EntityRelationshipModelParser.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EntityRelationshipModelParser", function() { return _EntityRelationshipModelParser__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _config_exports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config/exports */ "./src/main/erdiagram/parser/config/exports.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EntityRelationshipModelParserConfigManager", function() { return _config_exports__WEBPACK_IMPORTED_MODULE_1__["EntityRelationshipModelParserConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "entityRelationshipModelParserConfigManager", function() { return _config_exports__WEBPACK_IMPORTED_MODULE_1__["entityRelationshipModelParserConfigManager"]; });

/* harmony import */ var _entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./entity-relationship-model-types */ "./src/main/erdiagram/parser/entity-relationship-model-types.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EntityPropertyType", function() { return _entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__["EntityPropertyType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Cardinality", function() { return _entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__["Cardinality"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Direction", function() { return _entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__["Direction"]; });

/* harmony import */ var _parse_errors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./parse-errors */ "./src/main/erdiagram/parser/parse-errors.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERDiagramError", function() { return _parse_errors__WEBPACK_IMPORTED_MODULE_3__["ERDiagramError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERDiagramParseLineError", function() { return _parse_errors__WEBPACK_IMPORTED_MODULE_3__["ERDiagramParseLineError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERDiagramSyntaxError", function() { return _parse_errors__WEBPACK_IMPORTED_MODULE_3__["ERDiagramSyntaxError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERDiagramUnknownTypeError", function() { return _parse_errors__WEBPACK_IMPORTED_MODULE_3__["ERDiagramUnknownTypeError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERDiagramRelationshipError", function() { return _parse_errors__WEBPACK_IMPORTED_MODULE_3__["ERDiagramRelationshipError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERDiagramUnknownEntityError", function() { return _parse_errors__WEBPACK_IMPORTED_MODULE_3__["ERDiagramUnknownEntityError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERDiagramEntityError", function() { return _parse_errors__WEBPACK_IMPORTED_MODULE_3__["ERDiagramEntityError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERDiagramDuplicatedEntityNameError", function() { return _parse_errors__WEBPACK_IMPORTED_MODULE_3__["ERDiagramDuplicatedEntityNameError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERDiagramEntityPropertyError", function() { return _parse_errors__WEBPACK_IMPORTED_MODULE_3__["ERDiagramEntityPropertyError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERDiagramMultipleIdentifiersError", function() { return _parse_errors__WEBPACK_IMPORTED_MODULE_3__["ERDiagramMultipleIdentifiersError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERDiagramInvalidIdentifierDefinitionError", function() { return _parse_errors__WEBPACK_IMPORTED_MODULE_3__["ERDiagramInvalidIdentifierDefinitionError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERDiagramDuplicatedPropertyNameError", function() { return _parse_errors__WEBPACK_IMPORTED_MODULE_3__["ERDiagramDuplicatedPropertyNameError"]; });








/***/ }),

/***/ "./src/main/erdiagram/parser/parse-errors.ts":
/*!***************************************************!*\
  !*** ./src/main/erdiagram/parser/parse-errors.ts ***!
  \***************************************************/
/*! exports provided: ERDiagramError, ERDiagramParseLineError, ERDiagramSyntaxError, ERDiagramUnknownTypeError, ERDiagramRelationshipError, ERDiagramUnknownEntityError, ERDiagramEntityError, ERDiagramDuplicatedEntityNameError, ERDiagramEntityPropertyError, ERDiagramMultipleIdentifiersError, ERDiagramInvalidIdentifierDefinitionError, ERDiagramDuplicatedPropertyNameError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ERDiagramError", function() { return ERDiagramError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ERDiagramParseLineError", function() { return ERDiagramParseLineError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ERDiagramSyntaxError", function() { return ERDiagramSyntaxError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ERDiagramUnknownTypeError", function() { return ERDiagramUnknownTypeError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ERDiagramRelationshipError", function() { return ERDiagramRelationshipError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ERDiagramUnknownEntityError", function() { return ERDiagramUnknownEntityError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ERDiagramEntityError", function() { return ERDiagramEntityError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ERDiagramDuplicatedEntityNameError", function() { return ERDiagramDuplicatedEntityNameError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ERDiagramEntityPropertyError", function() { return ERDiagramEntityPropertyError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ERDiagramMultipleIdentifiersError", function() { return ERDiagramMultipleIdentifiersError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ERDiagramInvalidIdentifierDefinitionError", function() { return ERDiagramInvalidIdentifierDefinitionError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ERDiagramDuplicatedPropertyNameError", function() { return ERDiagramDuplicatedPropertyNameError; });
class ERDiagramError extends Error {
}
class ERDiagramParseLineError extends ERDiagramError {
    constructor(cause, lineIndex) {
        super(cause.message);
        this.cause = cause;
        this.lineIndex = lineIndex;
    }
    get lineNumber() {
        return this.lineIndex + 1;
    }
}
class ERDiagramSyntaxError extends ERDiagramError {
}
class ERDiagramUnknownTypeError extends ERDiagramError {
}
class ERDiagramRelationshipError extends ERDiagramError {
    constructor(message, relationship) {
        super(message);
        this.relationship = relationship;
    }
}
class ERDiagramUnknownEntityError extends ERDiagramRelationshipError {
    constructor(message, relationship, member) {
        super(message, relationship);
        this.member = member;
    }
}
class ERDiagramEntityError extends ERDiagramError {
    constructor(message, entity) {
        super(message);
        this.entity = entity;
    }
}
class ERDiagramDuplicatedEntityNameError extends ERDiagramEntityError {
}
class ERDiagramEntityPropertyError extends ERDiagramEntityError {
    constructor(message, entity, property) {
        super(message, entity);
        this.property = property;
    }
}
class ERDiagramMultipleIdentifiersError extends ERDiagramEntityPropertyError {
    constructor(message, entity, identifierProperties) {
        const firstDuplicateApparition = identifierProperties[1];
        super(message, entity, firstDuplicateApparition);
        this.identifierProperties = identifierProperties;
    }
}
class ERDiagramInvalidIdentifierDefinitionError extends ERDiagramEntityPropertyError {
}
class ERDiagramDuplicatedPropertyNameError extends ERDiagramEntityPropertyError {
}


/***/ }),

/***/ "./src/main/erdiagram/parser/statement/statement-type-guesser.ts":
/*!***********************************************************************!*\
  !*** ./src/main/erdiagram/parser/statement/statement-type-guesser.ts ***!
  \***********************************************************************/
/*! exports provided: StatementType, guessStatementType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatementType", function() { return StatementType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "guessStatementType", function() { return guessStatementType; });
/* harmony import */ var _erdiagram_parser_statement_statement_types_regexes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/statement/statement-types-regexes */ "./src/main/erdiagram/parser/statement/statement-types-regexes.ts");

var StatementType;
(function (StatementType) {
    StatementType["ENTITY_NAME"] = "entityName";
    StatementType["ENTITY_PROPERTY"] = "entityProperty";
    StatementType["RELATIONSHIP"] = "relationship";
    StatementType["BLANK_LINE"] = "blankLine";
    StatementType["UNKNOWN"] = "unknown";
})(StatementType || (StatementType = {}));
function guessStatementType(line) {
    if (_erdiagram_parser_statement_statement_types_regexes__WEBPACK_IMPORTED_MODULE_0__["ENTITY_NAME_LINE_REGEX"].test(line)) {
        return StatementType.ENTITY_NAME;
    }
    else if (_erdiagram_parser_statement_statement_types_regexes__WEBPACK_IMPORTED_MODULE_0__["ENTITY_PROPERTY_LINE_REGEX"].test(line)) {
        return StatementType.ENTITY_PROPERTY;
    }
    else if (_erdiagram_parser_statement_statement_types_regexes__WEBPACK_IMPORTED_MODULE_0__["RELATIONSHIP_LINE_REGEX"].test(line)) {
        return StatementType.RELATIONSHIP;
    }
    else if (isBlankLine(line)) {
        return StatementType.BLANK_LINE;
    }
    else {
        return StatementType.UNKNOWN;
    }
}
function isBlankLine(line) {
    return /^\s*(#.*)?$/.test(line);
}


/***/ }),

/***/ "./src/main/erdiagram/parser/statement/statement-types-parse-functions.ts":
/*!********************************************************************************!*\
  !*** ./src/main/erdiagram/parser/statement/statement-types-parse-functions.ts ***!
  \********************************************************************************/
/*! exports provided: parseEntityNameStatement, parseEntityPropertyStatement, parseRelationshipStatement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseEntityNameStatement", function() { return parseEntityNameStatement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseEntityPropertyStatement", function() { return parseEntityPropertyStatement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseRelationshipStatement", function() { return parseRelationshipStatement; });
/* harmony import */ var _erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/util/string-utils */ "./src/main/erdiagram/util/string-utils.ts");
/* harmony import */ var _erdiagram_parser_statement_statement_types_regexes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/parser/statement/statement-types-regexes */ "./src/main/erdiagram/parser/statement/statement-types-regexes.ts");
/* harmony import */ var _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/parser/entity-relationship-model-types */ "./src/main/erdiagram/parser/entity-relationship-model-types.ts");
/* harmony import */ var _erdiagram_parser_parse_errors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/parser/parse-errors */ "./src/main/erdiagram/parser/parse-errors.ts");




function parseEntityNameStatement(line) {
    const result = _erdiagram_parser_statement_statement_types_regexes__WEBPACK_IMPORTED_MODULE_1__["ENTITY_NAME_LINE_REGEX"].exec(line);
    if (result == null) {
        throw new _erdiagram_parser_parse_errors__WEBPACK_IMPORTED_MODULE_3__["ERDiagramSyntaxError"]('Syntax error');
    }
    const [fullMatch, entityName] = result;
    return Object(_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_0__["capitalizeWord"])(entityName);
}
function parseEntityPropertyStatement(line) {
    const result = _erdiagram_parser_statement_statement_types_regexes__WEBPACK_IMPORTED_MODULE_1__["ENTITY_PROPERTY_LINE_REGEX"].exec(line);
    if (result == null) {
        throw new _erdiagram_parser_parse_errors__WEBPACK_IMPORTED_MODULE_3__["ERDiagramSyntaxError"]('Syntax error');
    }
    const [fullMatch, name, modifiers, type, length] = result;
    const mappedType = type.toLowerCase();
    if (!Object.values(_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__["EntityPropertyType"]).includes(mappedType)) {
        throw new _erdiagram_parser_parse_errors__WEBPACK_IMPORTED_MODULE_3__["ERDiagramUnknownTypeError"]('Unknown type: ' + type);
    }
    return {
        name: Object(_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_0__["uncapitalizeWord"])(name),
        optional: modifiers.includes('?'),
        autoincremental: modifiers.includes('+'),
        unique: modifiers.includes('!'),
        type: mappedType,
        length: parsePropertyLength(length)
    };
}
function parsePropertyLength(length) {
    if (!length) {
        return [];
    }
    return length.split(',')
        .map(lengthNumber => parseInt(lengthNumber.trim(), 10));
}
function parseRelationshipStatement(line) {
    const result = _erdiagram_parser_statement_statement_types_regexes__WEBPACK_IMPORTED_MODULE_1__["RELATIONSHIP_LINE_REGEX"].exec(line);
    if (result == null) {
        throw new _erdiagram_parser_parse_errors__WEBPACK_IMPORTED_MODULE_3__["ERDiagramSyntaxError"]('Syntax error');
    }
    const [fullMatch, leftEntity, leftEntityAlias = leftEntity, leftCardinalityCharacter, direction, rightCardinalityCharacter, rightEntity, rightEntityAlias = rightEntity, relationshipName] = result;
    return {
        relationshipName: relationshipName ? Object(_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_0__["capitalizeWord"])(relationshipName) : undefined,
        direction: direction === '->' ? _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__["Direction"].LEFT_TO_RIGHT : (direction === '<-' ? _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__["Direction"].RIGHT_TO_LEFT : _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__["Direction"].BIDIRECTIONAL),
        leftMember: {
            entity: Object(_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_0__["capitalizeWord"])(leftEntity),
            entityAlias: Object(_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_0__["uncapitalizeWord"])(leftEntityAlias),
            cardinality: parseRelationshipMemberCardinality(leftCardinalityCharacter)
        },
        rightMember: {
            entity: Object(_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_0__["capitalizeWord"])(rightEntity),
            entityAlias: Object(_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_0__["uncapitalizeWord"])(rightEntityAlias),
            cardinality: parseRelationshipMemberCardinality(rightCardinalityCharacter)
        }
    };
}
function parseRelationshipMemberCardinality(leftCardinalityCharacter) {
    switch (leftCardinalityCharacter) {
        case '*':
            return _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__["Cardinality"].MANY;
        case '?':
            return _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__["Cardinality"].ZERO_OR_ONE;
        default:
            return _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__["Cardinality"].ONE;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/parser/statement/statement-types-regexes.ts":
/*!************************************************************************!*\
  !*** ./src/main/erdiagram/parser/statement/statement-types-regexes.ts ***!
  \************************************************************************/
/*! exports provided: ENTITY_NAME_LINE_REGEX, ENTITY_PROPERTY_LINE_REGEX, RELATIONSHIP_LINE_REGEX */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ENTITY_NAME_LINE_REGEX", function() { return ENTITY_NAME_LINE_REGEX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ENTITY_PROPERTY_LINE_REGEX", function() { return ENTITY_PROPERTY_LINE_REGEX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RELATIONSHIP_LINE_REGEX", function() { return RELATIONSHIP_LINE_REGEX; });
/* harmony import */ var _erdiagram_util_regex_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/util/regex-utils */ "./src/main/erdiagram/util/regex-utils.ts");

const IDENTIFIER_REGEX = /[a-zA-Z_][a-zA-Z_0-9]*/;
const OPTIONAL_TRAILING_SPACES_AND_COMMENT = /\s*(#.*)?$/;
// Entity name
const ENTITY_NAME_LINE_REGEX = new RegExp(`^(${IDENTIFIER_REGEX.source})${OPTIONAL_TRAILING_SPACES_AND_COMMENT.source}`);
// Entity property
const PROPERTY_NAME_REGEX = new RegExp(`(${IDENTIFIER_REGEX.source})`);
const PROPERTY_MODIFIERS_REGEX = new RegExp(`([?!+]*)`);
const PROPERTY_TYPE_NAME_REGEX = new RegExp(`(${IDENTIFIER_REGEX.source})`);
const PROPERTY_TYPE_LENGTH_REGEX = new RegExp(`(?:\\((\\s*\\d+\\s*(?:,\\s*\\d+\\s*)*)\\))?`);
const ENTITY_PROPERTY_REGEX = Object(_erdiagram_util_regex_utils__WEBPACK_IMPORTED_MODULE_0__["joinRegExps"])(PROPERTY_NAME_REGEX, PROPERTY_MODIFIERS_REGEX, /\s+/, PROPERTY_TYPE_NAME_REGEX, PROPERTY_TYPE_LENGTH_REGEX);
const ENTITY_PROPERTY_LINE_REGEX = new RegExp(`^\\s+${ENTITY_PROPERTY_REGEX.source}${OPTIONAL_TRAILING_SPACES_AND_COMMENT.source}`);
// Relationship
const RELATIONSHIP_DIRECTION_REGEX = /(<-|->|<->)/;
const RELATIONSHIP_CARDINALITY_REGEX = /([?1*])?/;
const DIRECTION_AND_CARDINALITY_REGEX = Object(_erdiagram_util_regex_utils__WEBPACK_IMPORTED_MODULE_0__["joinRegExps"])(RELATIONSHIP_CARDINALITY_REGEX, RELATIONSHIP_DIRECTION_REGEX, RELATIONSHIP_CARDINALITY_REGEX);
const ENTITY_AND_ALIAS_REGEX = new RegExp(`(${IDENTIFIER_REGEX.source})(?:\\s+(${IDENTIFIER_REGEX.source}))?`);
const RELATIONSHIP_LINE_REGEX = new RegExp(`^${ENTITY_AND_ALIAS_REGEX.source}\\s*?${DIRECTION_AND_CARDINALITY_REGEX.source}\\s*?${ENTITY_AND_ALIAS_REGEX.source}(?:\\s+\\(\\s*(${IDENTIFIER_REGEX.source})\\s*\\))?${OPTIONAL_TRAILING_SPACES_AND_COMMENT.source}`);


/***/ }),

/***/ "./src/main/erdiagram/parser/validator/ParsedEntityRelationshipModelValidator.ts":
/*!***************************************************************************************!*\
  !*** ./src/main/erdiagram/parser/validator/ParsedEntityRelationshipModelValidator.ts ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ParsedEntityRelationshipModelValidator; });
/* harmony import */ var _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/entity-relationship-model-types */ "./src/main/erdiagram/parser/entity-relationship-model-types.ts");
/* harmony import */ var _erdiagram_parser_parse_errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/parser/parse-errors */ "./src/main/erdiagram/parser/parse-errors.ts");


class ParsedEntityRelationshipModelValidator {
    constructor(allowUnknownEntities) {
        this.allowUnknownEntities = allowUnknownEntities;
    }
    validateParsedModel(model) {
        this.validateNonRepeatedEntityNames(model);
        this.validateNonRepeatedPropertyNames(model);
        this.validateIdentifierProperties(model);
        if (!this.allowUnknownEntities) {
            this.validateRelationshipsHaveNoUnknownEntities(model);
        }
    }
    validateNonRepeatedEntityNames(model) {
        const entityNames = new Set();
        model.entities.forEach(entity => {
            const entityName = entity.name;
            if (entityNames.has(entityName)) {
                throw new _erdiagram_parser_parse_errors__WEBPACK_IMPORTED_MODULE_1__["ERDiagramDuplicatedEntityNameError"](`Repeated entity "${entityName}"`, entity);
            }
            entityNames.add(entityName);
        });
    }
    validateNonRepeatedPropertyNames(model) {
        model.entities.forEach(entity => {
            const entityPropertyNames = new Set();
            entity.properties.forEach(property => {
                const propertyName = property.name;
                if (entityPropertyNames.has(propertyName)) {
                    throw new _erdiagram_parser_parse_errors__WEBPACK_IMPORTED_MODULE_1__["ERDiagramDuplicatedPropertyNameError"](`Repeated property "${propertyName}" in "${entity.name}" entity`, entity, property);
                }
                entityPropertyNames.add(propertyName);
            });
        });
    }
    validateIdentifierProperties(model) {
        model.entities.forEach(entity => {
            const identifierProperties = entity.properties.filter(property => property.type === _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].IDENTIFIER);
            if (identifierProperties.length > 1) {
                throw new _erdiagram_parser_parse_errors__WEBPACK_IMPORTED_MODULE_1__["ERDiagramMultipleIdentifiersError"](`Entity ${entity.name} has more than one identifier property`, entity, identifierProperties);
            }
            const identifierProperty = identifierProperties[0];
            if (identifierProperty != null) {
                if (identifierProperty.autoincremental) {
                    throw new _erdiagram_parser_parse_errors__WEBPACK_IMPORTED_MODULE_1__["ERDiagramInvalidIdentifierDefinitionError"]('Autoincremental modifier (+) cannot be used in identifier properties', entity, identifierProperty);
                }
                if (identifierProperty.optional) {
                    throw new _erdiagram_parser_parse_errors__WEBPACK_IMPORTED_MODULE_1__["ERDiagramInvalidIdentifierDefinitionError"]('Optional modifier (?) cannot be used in identifier properties', entity, identifierProperty);
                }
                if (identifierProperty.unique) {
                    throw new _erdiagram_parser_parse_errors__WEBPACK_IMPORTED_MODULE_1__["ERDiagramInvalidIdentifierDefinitionError"]('Unique modifier (!) cannot be used in identifier properties', entity, identifierProperty);
                }
                if (identifierProperty.length.length > 0) {
                    throw new _erdiagram_parser_parse_errors__WEBPACK_IMPORTED_MODULE_1__["ERDiagramInvalidIdentifierDefinitionError"]('Identifier properties cannot have a length', entity, identifierProperty);
                }
            }
        });
    }
    validateRelationshipsHaveNoUnknownEntities(model) {
        const entityNames = model.entities.map(e => e.name);
        model.relationships.forEach(relationship => {
            if (!entityNames.includes(relationship.leftMember.entity)) {
                throw new _erdiagram_parser_parse_errors__WEBPACK_IMPORTED_MODULE_1__["ERDiagramUnknownEntityError"](`Uknown entity "${relationship.leftMember.entity}" in relationship's left member`, relationship, relationship.leftMember);
            }
            if (!entityNames.includes(relationship.rightMember.entity)) {
                throw new _erdiagram_parser_parse_errors__WEBPACK_IMPORTED_MODULE_1__["ERDiagramUnknownEntityError"](`Uknown entity "${relationship.rightMember.entity}" in relationship's right member`, relationship, relationship.rightMember);
            }
        });
    }
}


/***/ }),

/***/ "./src/main/erdiagram/util/array-utils.ts":
/*!************************************************!*\
  !*** ./src/main/erdiagram/util/array-utils.ts ***!
  \************************************************/
/*! exports provided: removeDuplicates */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeDuplicates", function() { return removeDuplicates; });
function removeDuplicates(array) {
    return [...new Set(array)];
}


/***/ }),

/***/ "./src/main/erdiagram/util/indent-utils.ts":
/*!*************************************************!*\
  !*** ./src/main/erdiagram/util/indent-utils.ts ***!
  \*************************************************/
/*! exports provided: indentLines, indentLine */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "indentLines", function() { return indentLines; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "indentLine", function() { return indentLine; });
const DEFAULT_INDENT = '    ';
function indentLines(lines, indent) {
    return lines.map(line => indentLineUsingIndentText(line, generateIndentText(indent)));
}
function indentLine(line, indent) {
    return indentLineUsingIndentText(line, generateIndentText(indent));
}
function generateIndentText(indent = DEFAULT_INDENT) {
    if (typeof indent !== 'number') {
        return indent;
    }
    return ''.padEnd(indent, ' ');
}
function indentLineUsingIndentText(line, indentText) {
    if (line.trim().length === 0) {
        return line;
    }
    else {
        return indentText + line;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/util/map-utils.ts":
/*!**********************************************!*\
  !*** ./src/main/erdiagram/util/map-utils.ts ***!
  \**********************************************/
/*! exports provided: classifyBy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "classifyBy", function() { return classifyBy; });
function classifyBy(objects, keyMapper, valueMapper) {
    const map = new Map();
    objects.forEach(object => {
        const key = keyMapper(object);
        const value = valueMapper(object);
        map.set(key, value);
    });
    return map;
}


/***/ }),

/***/ "./src/main/erdiagram/util/record-utils.ts":
/*!*************************************************!*\
  !*** ./src/main/erdiagram/util/record-utils.ts ***!
  \*************************************************/
/*! exports provided: mapValues, findKeyFromValue, findValueFromNullableKey */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapValues", function() { return mapValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findKeyFromValue", function() { return findKeyFromValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findValueFromNullableKey", function() { return findValueFromNullableKey; });
function mapValues(record, mapper) {
    return Object.fromEntries(Object.entries(record).map(([key, value]) => [key, mapper(value)]));
}
function findKeyFromValue(record, value) {
    const entry = Object.entries(record).find(entry => value === entry[1]);
    return entry === null || entry === void 0 ? void 0 : entry[0];
}
function findValueFromNullableKey(record, key, defaultValue) {
    return key == null ? defaultValue : record[key];
}


/***/ }),

/***/ "./src/main/erdiagram/util/regex-utils.ts":
/*!************************************************!*\
  !*** ./src/main/erdiagram/util/regex-utils.ts ***!
  \************************************************/
/*! exports provided: escapeRegExpSpecialChars, joinRegExps */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "escapeRegExpSpecialChars", function() { return escapeRegExpSpecialChars; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "joinRegExps", function() { return joinRegExps; });
function escapeRegExpSpecialChars(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
function joinRegExps(...regexes) {
    const source = regexes
        .map((e) => {
        if (typeof e === 'string') {
            return escapeRegExpSpecialChars(e);
        }
        else {
            return e.source;
        }
    })
        .join('');
    return new RegExp(source);
}


/***/ }),

/***/ "./src/main/erdiagram/util/string-utils.ts":
/*!*************************************************!*\
  !*** ./src/main/erdiagram/util/string-utils.ts ***!
  \*************************************************/
/*! exports provided: capitalizeWord, uncapitalizeWord, removeNonEmptyStrings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "capitalizeWord", function() { return capitalizeWord; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uncapitalizeWord", function() { return uncapitalizeWord; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeNonEmptyStrings", function() { return removeNonEmptyStrings; });
function capitalizeWord(text) {
    return text[0].toUpperCase() + text.substring(1);
}
function uncapitalizeWord(text) {
    return text[0].toLowerCase() + text.substring(1);
}
function removeNonEmptyStrings(strings) {
    return strings.filter(chunk => chunk.length > 0);
}


/***/ }),

/***/ "./src/main/module-entry.ts":
/*!**********************************!*\
  !*** ./src/main/module-entry.ts ***!
  \**********************************/
/*! exports provided: AbstractComponentConfigManager, StandardCaseFormats, CaseConverter, StandardIdNamingStrategies, MysqlDatabaseModelToCodeConverterConfigManager, mysqlDatabaseModelToCodeConverterConfigManager, MysqlDatabaseModelToCodeConverter, OracleDatabaseModelToCodeConverterConfigManager, oracleDatabaseModelToCodeConverterConfigManager, OracleDatabaseModelToCodeConverter, SqlServerDatabaseModelToCodeConverterConfigManager, sqlServerDatabaseModelToCodeConverterConfigManager, SqlServerDatabaseModelToCodeConverter, PostgresqlDatabaseModelToCodeConverterConfigManager, postgresqlDatabaseModelToCodeConverterConfigManager, PostgresqlDatabaseModelToCodeConverter, EntityRelationshipModelToDatabaseCodeConverter, DatabaseModelGeneratorConfigManager, databaseModelGeneratorConfigManager, DatabaseModelGenerator, JavaClassModelToCodeConverterConfigManager, javaClassModelToCodeConverterConfigManager, createJavaType, createJavaParameterizedType, createJavaArrayType, isJavaParameterizedType, parseJavaType, JavaClassModelToCodeConverter, TypeScriptClassModelToCodeConverterConfigManager, typescriptClassModelToCodeConverterConfigManager, createTypeScriptType, createTypeScriptParameterizedType, createTypeScriptArrayType, isTypeScriptParameterizedType, parseTypeScriptType, TypeScriptClassModelToCodeConverter, EntityRelationshipModelToClassCodeConverter, ClassModelGeneratorConfigManager, classModelGeneratorConfigManager, ClassModelGenerator, NomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager, nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager, NomnomlEntityRelationshipModelToDiagramCodeConverter, NomnomlEntityRelationshipModelToDiagramConverter, PlantUmlEntityRelationshipModelToDiagramCodeConverterConfigManager, plantumlEntityRelationshipModelToDiagramCodeConverterConfigManager, PlantUmlEntityRelationshipModelToDiagramCodeConverter, PlantUmlEntityRelationshipModelToDiagramConverter, BaseEntityRelationshipModelToDiagramConverter, EntityRelationshipModelParserConfigManager, entityRelationshipModelParserConfigManager, EntityPropertyType, Cardinality, Direction, ERDiagramError, ERDiagramParseLineError, ERDiagramSyntaxError, ERDiagramUnknownTypeError, ERDiagramRelationshipError, ERDiagramUnknownEntityError, ERDiagramEntityError, ERDiagramDuplicatedEntityNameError, ERDiagramEntityPropertyError, ERDiagramMultipleIdentifiersError, ERDiagramInvalidIdentifierDefinitionError, ERDiagramDuplicatedPropertyNameError, EntityRelationshipModelParser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./erdiagram/exports */ "./src/main/erdiagram/exports.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AbstractComponentConfigManager", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["AbstractComponentConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StandardCaseFormats", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["StandardCaseFormats"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CaseConverter", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["CaseConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StandardIdNamingStrategies", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["StandardIdNamingStrategies"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MysqlDatabaseModelToCodeConverterConfigManager", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["MysqlDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mysqlDatabaseModelToCodeConverterConfigManager", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["mysqlDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MysqlDatabaseModelToCodeConverter", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["MysqlDatabaseModelToCodeConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OracleDatabaseModelToCodeConverterConfigManager", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["OracleDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "oracleDatabaseModelToCodeConverterConfigManager", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["oracleDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OracleDatabaseModelToCodeConverter", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["OracleDatabaseModelToCodeConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SqlServerDatabaseModelToCodeConverterConfigManager", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["SqlServerDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sqlServerDatabaseModelToCodeConverterConfigManager", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["sqlServerDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SqlServerDatabaseModelToCodeConverter", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["SqlServerDatabaseModelToCodeConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PostgresqlDatabaseModelToCodeConverterConfigManager", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["PostgresqlDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "postgresqlDatabaseModelToCodeConverterConfigManager", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["postgresqlDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PostgresqlDatabaseModelToCodeConverter", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["PostgresqlDatabaseModelToCodeConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EntityRelationshipModelToDatabaseCodeConverter", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["EntityRelationshipModelToDatabaseCodeConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DatabaseModelGeneratorConfigManager", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["DatabaseModelGeneratorConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "databaseModelGeneratorConfigManager", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["databaseModelGeneratorConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DatabaseModelGenerator", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["DatabaseModelGenerator"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JavaClassModelToCodeConverterConfigManager", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["JavaClassModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "javaClassModelToCodeConverterConfigManager", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["javaClassModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createJavaType", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["createJavaType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createJavaParameterizedType", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["createJavaParameterizedType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createJavaArrayType", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["createJavaArrayType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isJavaParameterizedType", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["isJavaParameterizedType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseJavaType", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["parseJavaType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JavaClassModelToCodeConverter", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["JavaClassModelToCodeConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TypeScriptClassModelToCodeConverterConfigManager", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["TypeScriptClassModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "typescriptClassModelToCodeConverterConfigManager", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["typescriptClassModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createTypeScriptType", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["createTypeScriptType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createTypeScriptParameterizedType", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["createTypeScriptParameterizedType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createTypeScriptArrayType", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["createTypeScriptArrayType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isTypeScriptParameterizedType", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["isTypeScriptParameterizedType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseTypeScriptType", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["parseTypeScriptType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TypeScriptClassModelToCodeConverter", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["TypeScriptClassModelToCodeConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EntityRelationshipModelToClassCodeConverter", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["EntityRelationshipModelToClassCodeConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ClassModelGeneratorConfigManager", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["ClassModelGeneratorConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "classModelGeneratorConfigManager", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["classModelGeneratorConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ClassModelGenerator", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["ClassModelGenerator"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["NomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NomnomlEntityRelationshipModelToDiagramCodeConverter", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["NomnomlEntityRelationshipModelToDiagramCodeConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NomnomlEntityRelationshipModelToDiagramConverter", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["NomnomlEntityRelationshipModelToDiagramConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PlantUmlEntityRelationshipModelToDiagramCodeConverterConfigManager", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["PlantUmlEntityRelationshipModelToDiagramCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "plantumlEntityRelationshipModelToDiagramCodeConverterConfigManager", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["plantumlEntityRelationshipModelToDiagramCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PlantUmlEntityRelationshipModelToDiagramCodeConverter", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["PlantUmlEntityRelationshipModelToDiagramCodeConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PlantUmlEntityRelationshipModelToDiagramConverter", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["PlantUmlEntityRelationshipModelToDiagramConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseEntityRelationshipModelToDiagramConverter", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["BaseEntityRelationshipModelToDiagramConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EntityRelationshipModelParserConfigManager", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["EntityRelationshipModelParserConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "entityRelationshipModelParserConfigManager", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["entityRelationshipModelParserConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EntityPropertyType", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Cardinality", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["Cardinality"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Direction", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["Direction"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERDiagramError", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["ERDiagramError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERDiagramParseLineError", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["ERDiagramParseLineError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERDiagramSyntaxError", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["ERDiagramSyntaxError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERDiagramUnknownTypeError", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["ERDiagramUnknownTypeError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERDiagramRelationshipError", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["ERDiagramRelationshipError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERDiagramUnknownEntityError", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["ERDiagramUnknownEntityError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERDiagramEntityError", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["ERDiagramEntityError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERDiagramDuplicatedEntityNameError", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["ERDiagramDuplicatedEntityNameError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERDiagramEntityPropertyError", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["ERDiagramEntityPropertyError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERDiagramMultipleIdentifiersError", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["ERDiagramMultipleIdentifiersError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERDiagramInvalidIdentifierDefinitionError", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["ERDiagramInvalidIdentifierDefinitionError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERDiagramDuplicatedPropertyNameError", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["ERDiagramDuplicatedPropertyNameError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EntityRelationshipModelParser", function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__["EntityRelationshipModelParser"]; });




/***/ })

/******/ });
});
//# sourceMappingURL=erdiagram.esm.js.map