/*!
 * Entity-Relationship Diagram Code Generator v1.2.0
 * https://github.com/nestorrente/erdiagram
 *
 * Released under the MIT License.
 *
 * Build date: 2024-09-10T22:20:58.938Z
 */
var ERDiagram;
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/pluralize/pluralize.js":
/*!*********************************************!*\
  !*** ./node_modules/pluralize/pluralize.js ***!
  \*********************************************/
/***/ (function(module) {

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

/***/ "./node_modules/true-json/dist/true-json.umd.js":
/*!******************************************************!*\
  !*** ./node_modules/true-json/dist/true-json.umd.js ***!
  \******************************************************/
/***/ (function(module) {

/*!
 * TrueJSON: respectful JSON serialization & deserialization for JavaScript
 * v1.0.3
 *
 * https://github.com/nestorrente/true-json
 *
 * Released under the MIT License.
 *
 * Build date: 2023-10-22T21:12:53.769Z
 */
!function(e,r){ true?module.exports=r():0}("undefined"!=typeof self?self:this,(()=>(()=>{var e={146:e=>{var r,t,o=Function.prototype,n=Object.prototype,i=o.toString,a=n.hasOwnProperty,s=i.call(Object),c=n.toString,u=(r=Object.getPrototypeOf,t=Object,function(e){return r(t(e))});e.exports=function(e){if(!function(e){return!!e&&"object"==typeof e}(e)||"[object Object]"!=c.call(e)||function(e){var r=!1;if(null!=e&&"function"!=typeof e.toString)try{r=!!(e+"")}catch(e){}return r}(e))return!1;var r=u(e);if(null===r)return!0;var t=a.call(r,"constructor")&&r.constructor;return"function"==typeof t&&t instanceof t&&i.call(t)==s}}},r={};function t(o){var n=r[o];if(void 0!==n)return n.exports;var i=r[o]={exports:{}};return e[o](i,i.exports,t),i.exports}t.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return t.d(r,{a:r}),r},t.d=(e,r)=>{for(var o in r)t.o(r,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:r[o]})},t.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),t.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var o={};return(()=>{"use strict";t.r(o),t.d(o,{JsonAdapters:()=>j,JsonConverter:()=>a});var e,r,n=function(e,r,t,o,n){if("m"===o)throw new TypeError("Private method is not writable");if("a"===o&&!n)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof r?e!==r||!n:!r.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===o?n.call(e,t):n?n.value=t:r.set(e,t),t},i=function(e,r,t,o){if("a"===t&&!o)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof r?e!==r||!o:!r.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===t?o:"a"===t?o.call(e):o?o.value:r.get(e)};e=new WeakMap,r=new WeakMap;const a=class{constructor(t,o=JSON){e.set(this,void 0),r.set(this,void 0),n(this,e,o,"f"),n(this,r,t,"f")}stringify(t,o){return i(this,e,"f").stringify(i(this,r,"f").adaptToJson(t),void 0,o)}parse(t){return i(this,r,"f").recoverFromJson(i(this,e,"f").parse(t))}};function s(e){return null==e?{adaptToJson:e=>e,recoverFromJson:e=>e}:{adaptToJson:r=>(e(r),r),recoverFromJson:r=>(e(r),r)}}var c=t(146),u=t.n(c);function p(e,r){return Object.prototype.hasOwnProperty.call(e,r)}const f=e=>{if("number"!=typeof e||!Number.isFinite(e))throw new TypeError("input value is not a finite number")},d=e=>{if("string"!=typeof e)throw new TypeError("input value is not a string")},l=e=>{if((e=>{if(!(e instanceof Date))throw new TypeError("input value is not a date")})(e),Number.isNaN(e.getTime()))throw new TypeError("input value is not a valid date")},v=e=>{if(!Array.isArray(e))throw new TypeError("input value is not an array")},m=e=>{if(!(e instanceof Map))throw new TypeError("input value is not a map")};function y(e){if(!Array.isArray(e)||2!==e.length)throw new TypeError("input value is not a tuple")}const J=e=>{if(!u()(e))throw new TypeError("input value is not a plain object")};function w(e){return{adaptToJson:r=>(v(r),r.map((r=>e.adaptToJson(r)))),recoverFromJson:r=>(v(r),r.map((r=>e.recoverFromJson(r))))}}function b(e){var r,t;const o=null!==(r=null==e?void 0:e.keyAdapter)&&void 0!==r?r:s(),n=null!==(t=null==e?void 0:e.valueAdapter)&&void 0!==t?t:s(),i=w({adaptToJson(e){y(e);const[r,t]=e;return[o.adaptToJson(r),n.adaptToJson(t)]},recoverFromJson(e){y(e);const[r,t]=e;return[o.recoverFromJson(r),n.recoverFromJson(t)]}});return{adaptToJson:e=>(m(e),i.adaptToJson([...e])),recoverFromJson:e=>new Map(i.recoverFromJson(e))}}function T(e,r,t){const{omitUnmappedProperties:o,omittedProperties:n}=t,i=Object.entries(e);return o||0!==n.length?i.filter((([e])=>!function(e,r,t){return function(e,r){const{omittedProperties:t}=r;return t.includes(e)}(e,t)||t.omitUnmappedProperties&&function(e,r){return!p(r,e)}(e,r)}(e,r,t))):i}function h(e){return null==e}const j={identity:s,stringIdentity:function(){return s((e=>d(e)))},numberIdentity:function(){return s((e=>f(e)))},integerIdentity:function(){return s((e=>(e=>{if("number"!=typeof e||!Number.isInteger(e))throw new TypeError("input value is not an integer")})(e)))},booleanIdentity:function(){return s((e=>(e=>{if("boolean"!=typeof e)throw new TypeError("input value is not a boolean")})(e)))},isoDate:function(){return{adaptToJson:e=>(l(e),e.toJSON()),recoverFromJson:e=>((e=>{if(d(e),Number.isNaN(new Date(e).getTime()))throw new TypeError("input value has not a valid date format")})(e),new Date(e))}},dateTimestamp:function(){return{adaptToJson:e=>(l(e),e.getTime()),recoverFromJson:e=>(f(e),new Date(e))}},array:w,set:function(e=s()){const r=w(e);return{adaptToJson:e=>((e=>{if(!(e instanceof Set))throw new TypeError("input value is not a set")})(e),r.adaptToJson([...e])),recoverFromJson:e=>(v(e),new Set(r.recoverFromJson(e)))}},record:function(e,r){const t=(o=r,Object.assign({strictPlainObjectCheck:!1},o));var o;return{adaptToJson(r){t.strictPlainObjectCheck&&J(r);const o=Object.entries(r).map((([r,t])=>[r,e.adaptToJson(t)]));return Object.fromEntries(o)},recoverFromJson(r){J(r);const t=Object.entries(r).map((([r,t])=>[r,e.recoverFromJson(t)]));return Object.fromEntries(t)}}},mapAsEntries:b,mapAsRecord:function(e){const r=b(e);return{adaptToJson(e){const t=r.adaptToJson(e);return Object.fromEntries(t)},recoverFromJson(e){J(e);const t=Object.entries(e);return r.recoverFromJson(t)}}},object:function(e,r){const t=(o=r,Object.assign({strictPlainObjectCheck:!1,omitUnmappedProperties:!1,omittedProperties:[]},o));var o;return{adaptToJson(r){t.strictPlainObjectCheck&&J(r);const o=T(r,e,t).map((([r,t])=>{const o=e[r];return[r,o?o.adaptToJson(t):t]}));return Object.fromEntries(o)},recoverFromJson(r){J(r);const o=T(r,e,t).map((([r,t])=>{const o=e[r];return[r,o?o.recoverFromJson(t):t]}));return Object.fromEntries(o)}}},byKey:function(e){return{adaptToJson(r){const t=Object.entries(e).find((([,e])=>r===e));if(t){const[e]=t;return e}throw new Error("input value is not associated with any key")},recoverFromJson:r=>(function(e,r){if(d(e),!p(r,e))throw new Error("input value is not a valid key")}(r,e),e[r])}},byKeyLenient:function(e,r){return{adaptToJson(t){const o=Object.entries(e).find((([,e])=>t===e));if(o){const[e]=o;return e}return r},recoverFromJson(t){if(void 0!==r||void 0!==t)return d(t),p(e,t)?e[t]:null!=r?e[r]:void 0}}},custom:function(e){return e},nullAware:function(e){return{adaptToJson:r=>null===r?null:e.adaptToJson(r),recoverFromJson:r=>null===r?null:e.recoverFromJson(r)}},undefinedAware:function(e){return{adaptToJson(r){if(void 0!==r)return e.adaptToJson(r)},recoverFromJson(r){if(void 0!==r)return e.recoverFromJson(r)}}},nullishAware:function(e){return{adaptToJson:r=>h(r)?r:e.adaptToJson(r),recoverFromJson:r=>h(r)?r:e.recoverFromJson(r)}}}})(),o})()));
//# sourceMappingURL=true-json.umd.js.map

/***/ }),

/***/ "./src/main/erdiagram/common/config/AbstractConfigManager.ts":
/*!*******************************************************************!*\
  !*** ./src/main/erdiagram/common/config/AbstractConfigManager.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AbstractConfigManager)
/* harmony export */ });
/* harmony import */ var true_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! true-json */ "./node_modules/true-json/dist/true-json.umd.js");
/* harmony import */ var true_json__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(true_json__WEBPACK_IMPORTED_MODULE_0__);

class AbstractConfigManager {
    _jsonAdapter;
    constructor() {
        this._jsonAdapter = this.getJsonAdapter();
    }
    mergeWithDefaultConfig(partialConfig) {
        return this.mergeConfigs(this.getDefaultConfig(), partialConfig);
    }
    convertToSerializableObject(fullConfig) {
        return this._jsonAdapter.adaptToJson(fullConfig);
    }
    convertFromSerializableObject(serializableConfig) {
        return this._jsonAdapter.recoverFromJson(serializableConfig);
    }
    getJsonAdapter() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return true_json__WEBPACK_IMPORTED_MODULE_0__.JsonAdapters.identity();
    }
}


/***/ }),

/***/ "./src/main/erdiagram/common/config/exports.ts":
/*!*****************************************************!*\
  !*** ./src/main/erdiagram/common/config/exports.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbstractConfigManager: () => (/* reexport safe */ _AbstractConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _AbstractConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractConfigManager */ "./src/main/erdiagram/common/config/AbstractConfigManager.ts");




/***/ }),

/***/ "./src/main/erdiagram/common/exports.ts":
/*!**********************************************!*\
  !*** ./src/main/erdiagram/common/exports.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbstractConfigManager: () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_0__.AbstractConfigManager)
/* harmony export */ });
/* harmony import */ var _config_exports__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config/exports */ "./src/main/erdiagram/common/config/exports.ts");



/***/ }),

/***/ "./src/main/erdiagram/converter/MultipleFileSourceCodeGenerator.ts":
/*!*************************************************************************!*\
  !*** ./src/main/erdiagram/converter/MultipleFileSourceCodeGenerator.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isMultipleFileSourceCodeGenerator: () => (/* binding */ isMultipleFileSourceCodeGenerator)
/* harmony export */ });
function isMultipleFileSourceCodeGenerator(generator) {
    const uncheckedCastedGenerator = generator;
    return typeof uncheckedCastedGenerator.generateSourceFiles === 'function';
}


/***/ }),

/***/ "./src/main/erdiagram/converter/common/case-format/AbstractCamelCaseFormat.ts":
/*!************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/common/case-format/AbstractCamelCaseFormat.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AbstractCamelCaseFormat)
/* harmony export */ });
/* harmony import */ var _erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/util/string-utils */ "./src/main/erdiagram/util/string-utils.ts");

const CAMEL_CASE_WORD_BOUNDARIES_REGEX = /((?<=[^A-Z])(?=[A-Z])|(?=[A-Z][a-z])|(?<=[A-Za-z])(?=[0-9]))/;
class AbstractCamelCaseFormat {
    splitWords(text) {
        return (0,_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_0__.removeNonEmptyStrings)(text.split(CAMEL_CASE_WORD_BOUNDARIES_REGEX));
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/common/case-format/AbstractUnderscoreCaseFormat.ts":
/*!*****************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/common/case-format/AbstractUnderscoreCaseFormat.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AbstractUnderscoreCaseFormat)
/* harmony export */ });
/* harmony import */ var _erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/util/string-utils */ "./src/main/erdiagram/util/string-utils.ts");

class AbstractUnderscoreCaseFormat {
    splitWords(text) {
        return (0,_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_0__.removeNonEmptyStrings)(text.split('_'));
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/common/case-format/CapitalizedUnderscoreCaseFormat.ts":
/*!********************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/common/case-format/CapitalizedUnderscoreCaseFormat.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CapitalizedUnderscoreCaseFormat)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_common_case_format_AbstractUnderscoreCaseFormat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/common/case-format/AbstractUnderscoreCaseFormat */ "./src/main/erdiagram/converter/common/case-format/AbstractUnderscoreCaseFormat.ts");
/* harmony import */ var _erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/util/string-utils */ "./src/main/erdiagram/util/string-utils.ts");


class CapitalizedUnderscoreCaseFormat extends _erdiagram_converter_common_case_format_AbstractUnderscoreCaseFormat__WEBPACK_IMPORTED_MODULE_0__["default"] {
    joinWords(words) {
        return (0,_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_1__.removeNonEmptyStrings)(words)
            .map(word => word.toLowerCase())
            .map(_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_1__.capitalizeWord)
            .join('_');
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/common/case-format/CaseConverter.ts":
/*!**************************************************************************!*\
  !*** ./src/main/erdiagram/converter/common/case-format/CaseConverter.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CaseConverter)
/* harmony export */ });
class CaseConverter {
    sourceCaseFormat;
    targetCaseFormat;
    constructor(sourceCaseFormat, targetCaseFormat) {
        this.sourceCaseFormat = sourceCaseFormat;
        this.targetCaseFormat = targetCaseFormat;
    }
    convertCase(text) {
        if (this.sourceCaseFormat === this.targetCaseFormat) {
            return text;
        }
        const words = this.sourceCaseFormat.splitWords(text);
        return this.targetCaseFormat.joinWords(words);
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/common/case-format/LowerCamelCaseFormat.ts":
/*!*********************************************************************************!*\
  !*** ./src/main/erdiagram/converter/common/case-format/LowerCamelCaseFormat.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LowerCamelCaseFormat)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_common_case_format_AbstractCamelCaseFormat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/common/case-format/AbstractCamelCaseFormat */ "./src/main/erdiagram/converter/common/case-format/AbstractCamelCaseFormat.ts");
/* harmony import */ var _erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/util/string-utils */ "./src/main/erdiagram/util/string-utils.ts");


class LowerCamelCaseFormat extends _erdiagram_converter_common_case_format_AbstractCamelCaseFormat__WEBPACK_IMPORTED_MODULE_0__["default"] {
    joinWords(words) {
        const nonEmptyWords = (0,_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_1__.removeNonEmptyStrings)(words);
        if (nonEmptyWords.length === 0) {
            return '';
        }
        const [firstWord, ...otherWords] = nonEmptyWords;
        const lowerCaseFirstWord = firstWord.toLowerCase();
        const capitalizedOtherWords = otherWords
            .map(word => word.toLowerCase())
            .map(_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_1__.capitalizeWord);
        return lowerCaseFirstWord + capitalizedOtherWords.join('');
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/common/case-format/LowerUnderscoreCaseFormat.ts":
/*!**************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/common/case-format/LowerUnderscoreCaseFormat.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LowerUnderscoreCaseFormat)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_common_case_format_AbstractUnderscoreCaseFormat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/common/case-format/AbstractUnderscoreCaseFormat */ "./src/main/erdiagram/converter/common/case-format/AbstractUnderscoreCaseFormat.ts");
/* harmony import */ var _erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/util/string-utils */ "./src/main/erdiagram/util/string-utils.ts");


class LowerUnderscoreCaseFormat extends _erdiagram_converter_common_case_format_AbstractUnderscoreCaseFormat__WEBPACK_IMPORTED_MODULE_0__["default"] {
    joinWords(words) {
        return (0,_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_1__.removeNonEmptyStrings)(words)
            .map(word => word.toLowerCase())
            .join('_');
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/common/case-format/StandardCaseFormats.ts":
/*!********************************************************************************!*\
  !*** ./src/main/erdiagram/converter/common/case-format/StandardCaseFormats.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_common_case_format_LowerCamelCaseFormat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/common/case-format/LowerCamelCaseFormat */ "./src/main/erdiagram/converter/common/case-format/LowerCamelCaseFormat.ts");
/* harmony import */ var _erdiagram_converter_common_case_format_UpperCamelCaseFormat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/common/case-format/UpperCamelCaseFormat */ "./src/main/erdiagram/converter/common/case-format/UpperCamelCaseFormat.ts");
/* harmony import */ var _erdiagram_converter_common_case_format_LowerUnderscoreCaseFormat__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/common/case-format/LowerUnderscoreCaseFormat */ "./src/main/erdiagram/converter/common/case-format/LowerUnderscoreCaseFormat.ts");
/* harmony import */ var _erdiagram_converter_common_case_format_CapitalizedUnderscoreCaseFormat__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/converter/common/case-format/CapitalizedUnderscoreCaseFormat */ "./src/main/erdiagram/converter/common/case-format/CapitalizedUnderscoreCaseFormat.ts");
/* harmony import */ var _erdiagram_converter_common_case_format_UpperUnderscoreCaseFormat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/erdiagram/converter/common/case-format/UpperUnderscoreCaseFormat */ "./src/main/erdiagram/converter/common/case-format/UpperUnderscoreCaseFormat.ts");





const StandardCaseFormats = {
    LOWER_CAMEL: new _erdiagram_converter_common_case_format_LowerCamelCaseFormat__WEBPACK_IMPORTED_MODULE_0__["default"](),
    UPPER_CAMEL: new _erdiagram_converter_common_case_format_UpperCamelCaseFormat__WEBPACK_IMPORTED_MODULE_1__["default"](),
    LOWER_UNDERSCORE: new _erdiagram_converter_common_case_format_LowerUnderscoreCaseFormat__WEBPACK_IMPORTED_MODULE_2__["default"](),
    CAPITALIZED_UNDERSCORE: new _erdiagram_converter_common_case_format_CapitalizedUnderscoreCaseFormat__WEBPACK_IMPORTED_MODULE_3__["default"](),
    UPPER_UNDERSCORE: new _erdiagram_converter_common_case_format_UpperUnderscoreCaseFormat__WEBPACK_IMPORTED_MODULE_4__["default"](),
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StandardCaseFormats);


/***/ }),

/***/ "./src/main/erdiagram/converter/common/case-format/UpperCamelCaseFormat.ts":
/*!*********************************************************************************!*\
  !*** ./src/main/erdiagram/converter/common/case-format/UpperCamelCaseFormat.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UpperCamelCaseFormat)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_common_case_format_AbstractCamelCaseFormat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/common/case-format/AbstractCamelCaseFormat */ "./src/main/erdiagram/converter/common/case-format/AbstractCamelCaseFormat.ts");
/* harmony import */ var _erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/util/string-utils */ "./src/main/erdiagram/util/string-utils.ts");


class UpperCamelCaseFormat extends _erdiagram_converter_common_case_format_AbstractCamelCaseFormat__WEBPACK_IMPORTED_MODULE_0__["default"] {
    joinWords(words) {
        return (0,_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_1__.removeNonEmptyStrings)(words)
            .map(word => word.toLowerCase())
            .map(_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_1__.capitalizeWord)
            .join('');
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/common/case-format/UpperUnderscoreCaseFormat.ts":
/*!**************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/common/case-format/UpperUnderscoreCaseFormat.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UpperUnderscoreCaseFormat)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_common_case_format_AbstractUnderscoreCaseFormat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/common/case-format/AbstractUnderscoreCaseFormat */ "./src/main/erdiagram/converter/common/case-format/AbstractUnderscoreCaseFormat.ts");
/* harmony import */ var _erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/util/string-utils */ "./src/main/erdiagram/util/string-utils.ts");


class UpperUnderscoreCaseFormat extends _erdiagram_converter_common_case_format_AbstractUnderscoreCaseFormat__WEBPACK_IMPORTED_MODULE_0__["default"] {
    joinWords(words) {
        return (0,_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_1__.removeNonEmptyStrings)(words)
            .map(word => word.toUpperCase())
            .join('_');
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/common/case-format/exports.ts":
/*!********************************************************************!*\
  !*** ./src/main/erdiagram/converter/common/case-format/exports.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CaseConverter: () => (/* reexport safe */ _CaseConverter__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   StandardCaseFormats: () => (/* reexport safe */ _StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"])
/* harmony export */ });
/* harmony import */ var _CaseConverter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CaseConverter */ "./src/main/erdiagram/converter/common/case-format/CaseConverter.ts");
/* harmony import */ var _StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StandardCaseFormats */ "./src/main/erdiagram/converter/common/case-format/StandardCaseFormats.ts");





/***/ }),

/***/ "./src/main/erdiagram/converter/common/exports.ts":
/*!********************************************************!*\
  !*** ./src/main/erdiagram/converter/common/exports.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CaseConverter: () => (/* reexport safe */ _case_format_exports__WEBPACK_IMPORTED_MODULE_0__.CaseConverter),
/* harmony export */   StandardCaseFormats: () => (/* reexport safe */ _case_format_exports__WEBPACK_IMPORTED_MODULE_0__.StandardCaseFormats),
/* harmony export */   StandardIdNamingStrategies: () => (/* reexport safe */ _id_naming_strategy_exports__WEBPACK_IMPORTED_MODULE_1__.StandardIdNamingStrategies)
/* harmony export */ });
/* harmony import */ var _case_format_exports__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./case-format/exports */ "./src/main/erdiagram/converter/common/case-format/exports.ts");
/* harmony import */ var _id_naming_strategy_exports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./id-naming-strategy/exports */ "./src/main/erdiagram/converter/common/id-naming-strategy/exports.ts");




/***/ }),

/***/ "./src/main/erdiagram/converter/common/id-naming-strategy/StandardIdNamingStrategies.ts":
/*!**********************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/common/id-naming-strategy/StandardIdNamingStrategies.ts ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/util/string-utils */ "./src/main/erdiagram/util/string-utils.ts");

const defaultIdNamingStrategy = () => 'id';
const entityNamePrefixIdNamingStrategy = entityName => `${(0,_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_0__.uncapitalizeWord)(entityName)}Id`;
const StandardIdNamingStrategies = {
    DEFAULT: defaultIdNamingStrategy,
    ENTITY_NAME_PREFIX: entityNamePrefixIdNamingStrategy
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StandardIdNamingStrategies);


/***/ }),

/***/ "./src/main/erdiagram/converter/common/id-naming-strategy/exports.ts":
/*!***************************************************************************!*\
  !*** ./src/main/erdiagram/converter/common/id-naming-strategy/exports.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StandardIdNamingStrategies: () => (/* reexport safe */ _StandardIdNamingStrategies__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _StandardIdNamingStrategies__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StandardIdNamingStrategies */ "./src/main/erdiagram/converter/common/id-naming-strategy/StandardIdNamingStrategies.ts");




/***/ }),

/***/ "./src/main/erdiagram/converter/database/exports.ts":
/*!**********************************************************!*\
  !*** ./src/main/erdiagram/converter/database/exports.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DatabaseModelConfigManager: () => (/* reexport safe */ _model_exports__WEBPACK_IMPORTED_MODULE_1__.DatabaseModelConfigManager),
/* harmony export */   DatabaseModelGenerator: () => (/* reexport safe */ _model_exports__WEBPACK_IMPORTED_MODULE_1__.DatabaseModelGenerator),
/* harmony export */   DatabaseModelToSqlCodeConverter: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.DatabaseModelToSqlCodeConverter),
/* harmony export */   MysqlDialect: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.MysqlDialect),
/* harmony export */   MysqlDialectConfigManager: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.MysqlDialectConfigManager),
/* harmony export */   OracleDialect: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.OracleDialect),
/* harmony export */   OracleDialectConfigManager: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.OracleDialectConfigManager),
/* harmony export */   PostgresqlDialect: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.PostgresqlDialect),
/* harmony export */   PostgresqlDialectConfigManager: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.PostgresqlDialectConfigManager),
/* harmony export */   SqlServerDialect: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.SqlServerDialect),
/* harmony export */   SqlServerDialectConfigManager: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.SqlServerDialectConfigManager),
/* harmony export */   SqlSourceCodeGenerator: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.SqlSourceCodeGenerator),
/* harmony export */   SqlSourceCodeGeneratorBuilder: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.SqlSourceCodeGeneratorBuilder),
/* harmony export */   SqliteDialect: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.SqliteDialect),
/* harmony export */   SqliteDialectConfigManager: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.SqliteDialectConfigManager),
/* harmony export */   databaseModelConfigManager: () => (/* reexport safe */ _model_exports__WEBPACK_IMPORTED_MODULE_1__.databaseModelConfigManager),
/* harmony export */   mysqlDialectConfigManager: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.mysqlDialectConfigManager),
/* harmony export */   oracleDialectConfigManager: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.oracleDialectConfigManager),
/* harmony export */   postgresqlDialectConfigManager: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.postgresqlDialectConfigManager),
/* harmony export */   sqlServerDialectConfigManager: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.sqlServerDialectConfigManager),
/* harmony export */   sqliteDialectConfigManager: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.sqliteDialectConfigManager)
/* harmony export */ });
/* harmony import */ var _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./source-code-generator/exports */ "./src/main/erdiagram/converter/database/source-code-generator/exports.ts");
/* harmony import */ var _model_exports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model/exports */ "./src/main/erdiagram/converter/database/model/exports.ts");




/***/ }),

/***/ "./src/main/erdiagram/converter/database/model/DatabaseModelGenerator.ts":
/*!*******************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/model/DatabaseModelGenerator.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DatabaseModelGenerator)
/* harmony export */ });
/* harmony import */ var pluralize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pluralize */ "./node_modules/pluralize/pluralize.js");
/* harmony import */ var pluralize__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pluralize__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/parser/types/entity-relationship-model-types */ "./src/main/erdiagram/parser/types/entity-relationship-model-types.ts");
/* harmony import */ var _erdiagram_converter_database_model_config_DatabaseModelConfigManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/database/model/config/DatabaseModelConfigManager */ "./src/main/erdiagram/converter/database/model/config/DatabaseModelConfigManager.ts");
/* harmony import */ var _erdiagram_util_map_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/util/map-utils */ "./src/main/erdiagram/util/map-utils.ts");
/* harmony import */ var _erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/erdiagram/util/string-utils */ "./src/main/erdiagram/util/string-utils.ts");
/* harmony import */ var _erdiagram_converter_oop_model_source_metadata_source_metadata_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/erdiagram/converter/oop/model/source-metadata/source-metadata-types */ "./src/main/erdiagram/converter/oop/model/source-metadata/source-metadata-types.ts");






class DatabaseModelGenerator {
    config;
    constructor(config) {
        this.config = _erdiagram_converter_database_model_config_DatabaseModelConfigManager__WEBPACK_IMPORTED_MODULE_2__["default"].mergeWithDefaultConfig(config);
    }
    generateDatabaseModel(model) {
        const entityIdentitiesMap = (0,_erdiagram_util_map_utils__WEBPACK_IMPORTED_MODULE_3__.classifyBy)(model.entities.filter(entity => entity.identityPropertyName), entity => entity.name, entity => entity.identityPropertyName);
        const tables = [];
        this.generateEntityTables(model, entityIdentitiesMap, tables);
        this.generateRelationshipTables(model, entityIdentitiesMap, tables);
        return {
            tables
        };
    }
    generateEntityTables(model, entityIdentitiesMap, tables) {
        model.entities
            .map(entity => this.generateEntityTable(entity, model, entityIdentitiesMap))
            .forEach(sentence => tables.push(sentence));
    }
    generateEntityTable(entity, model, entityIdentitiesMap) {
        const columns = [];
        const references = [];
        for (const property of entity.properties) {
            columns.push(this.mapPropertyToColumn(entity, property));
        }
        for (const relationship of model.relationships) {
            if (relationship.rightMember.cardinality !== _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_1__.Cardinality.MANY) {
                if (relationship.leftMember.entity === entity.name) {
                    const isOneToOneRelationship = relationship.leftMember.cardinality !== _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_1__.Cardinality.MANY;
                    references.push(this.createTableReference(relationship, relationship.rightMember, entityIdentitiesMap, isOneToOneRelationship));
                }
            }
            else if (relationship.leftMember.cardinality !== _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_1__.Cardinality.MANY) {
                if (relationship.rightMember.entity === entity.name) {
                    references.push(this.createTableReference(relationship, relationship.leftMember, entityIdentitiesMap));
                }
            }
        }
        return {
            name: this.pluralizeEntityNameIfApplies(entity.name),
            identityColumnName: this.getIdentityColumnName(entity.name, entityIdentitiesMap),
            columns,
            references,
            sourceMetadata: {
                sourceType: _erdiagram_converter_oop_model_source_metadata_source_metadata_types__WEBPACK_IMPORTED_MODULE_5__.SourceType.ENTITY,
                entity
            }
        };
    }
    generateRelationshipTables(model, entityIdentitiesMap, tables) {
        model.relationships
            .filter(relationship => this.isManyToManyRelationship(relationship))
            .map(relationship => this.generateRelationshipTable(relationship, entityIdentitiesMap))
            .forEach(sentence => tables.push(sentence));
    }
    generateRelationshipTable(relationship, entityIdentitiesMap) {
        const name = this.getRelationshipTableName(relationship);
        const identityColumnName = this.getRelationshipTableIdentityColumnName(relationship, entityIdentitiesMap);
        return {
            name,
            identityColumnName: identityColumnName,
            columns: [],
            references: [
                this.createTableReference(relationship, relationship.leftMember, entityIdentitiesMap),
                this.createTableReference(relationship, relationship.rightMember, entityIdentitiesMap)
            ],
            sourceMetadata: {
                sourceType: _erdiagram_converter_oop_model_source_metadata_source_metadata_types__WEBPACK_IMPORTED_MODULE_5__.SourceType.RELATIONSHIP,
                relationship
            }
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
    getRelationshipTableIdentityColumnName(relationship, entityIdentitiesMap) {
        const { relationshipName, leftMember, rightMember } = relationship;
        if (relationshipName) {
            return this.getIdentityColumnName(relationshipName, entityIdentitiesMap);
        }
        return this.getIdentityColumnName(leftMember.entity + rightMember.entity, entityIdentitiesMap);
    }
    createTableReference(relationship, toMember, entityIdentitiesMap, unique = false) {
        const { entityAlias, entity, cardinality } = toMember;
        return {
            columnName: `${entityAlias}Id`,
            targetTableName: this.pluralizeEntityNameIfApplies(entity),
            targetTableIdentityColumnName: this.getIdentityColumnName(entity, entityIdentitiesMap),
            notNull: cardinality !== _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_1__.Cardinality.ZERO_OR_ONE,
            unique,
            sourceMetadata: {
                sourceType: _erdiagram_converter_oop_model_source_metadata_source_metadata_types__WEBPACK_IMPORTED_MODULE_5__.SourceType.RELATIONSHIP_MEMBER,
                relationship,
                referencedMember: toMember
            }
        };
    }
    pluralizeEntityNameIfApplies(entityName) {
        if (!this.config.usePluralTableNames) {
            return entityName;
        }
        // pluralize() takes into account the case of the word, so 'A' is pluralized to 'AS' instead of 'As'.
        // This means that we have to uncapitalize the entity name before calling pluralize() in order to get the
        // expected behavior, then capitalize the result.
        const uncapitalizedEntityName = (0,_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_4__.uncapitalizeWord)(entityName);
        const pluralizedUncapitalizedEntityName = pluralize__WEBPACK_IMPORTED_MODULE_0___default()(uncapitalizedEntityName);
        return (0,_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_4__.capitalizeWord)(pluralizedUncapitalizedEntityName);
    }
    getIdentityColumnName(entityName, entityIdentitiesMap) {
        if (entityIdentitiesMap.has(entityName)) {
            return entityIdentitiesMap.get(entityName);
        }
        const { idNamingStrategy } = this.config;
        return idNamingStrategy(entityName);
    }
    mapPropertyToColumn(entity, property) {
        const { name, optional, unique, type, length } = property;
        return {
            name,
            notNull: !optional,
            unique,
            type,
            length,
            sourceMetadata: {
                sourceType: _erdiagram_converter_oop_model_source_metadata_source_metadata_types__WEBPACK_IMPORTED_MODULE_5__.SourceType.ENTITY_PROPERTY,
                entity,
                property
            }
        };
    }
    isManyToManyRelationship(relationship) {
        return [
            relationship.leftMember,
            relationship.rightMember
        ].every(member => member.cardinality === _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_1__.Cardinality.MANY);
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/database/model/config/DatabaseModelConfigManager.ts":
/*!******************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/model/config/DatabaseModelConfigManager.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DatabaseModelConfigManager: () => (/* binding */ DatabaseModelConfigManager),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _erdiagram_common_config_AbstractConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/common/config/AbstractConfigManager */ "./src/main/erdiagram/common/config/AbstractConfigManager.ts");
/* harmony import */ var _erdiagram_converter_common_id_naming_strategy_StandardIdNamingStrategies__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/common/id-naming-strategy/StandardIdNamingStrategies */ "./src/main/erdiagram/converter/common/id-naming-strategy/StandardIdNamingStrategies.ts");
/* harmony import */ var true_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! true-json */ "./node_modules/true-json/dist/true-json.umd.js");
/* harmony import */ var true_json__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(true_json__WEBPACK_IMPORTED_MODULE_2__);



class DatabaseModelConfigManager extends _erdiagram_common_config_AbstractConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"] {
    getDefaultConfig() {
        return {
            usePluralTableNames: false,
            idNamingStrategy: _erdiagram_converter_common_id_naming_strategy_StandardIdNamingStrategies__WEBPACK_IMPORTED_MODULE_1__["default"].DEFAULT
        };
    }
    mergeConfigs(fullConfig, partialConfig) {
        return {
            ...fullConfig,
            ...partialConfig
        };
    }
    getJsonAdapter() {
        return true_json__WEBPACK_IMPORTED_MODULE_2__.JsonAdapters.object({
            idNamingStrategy: true_json__WEBPACK_IMPORTED_MODULE_2__.JsonAdapters.byKeyLenient(_erdiagram_converter_common_id_naming_strategy_StandardIdNamingStrategies__WEBPACK_IMPORTED_MODULE_1__["default"], 'DEFAULT')
        });
    }
}
const databaseModelConfigManager = new DatabaseModelConfigManager();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (databaseModelConfigManager);


/***/ }),

/***/ "./src/main/erdiagram/converter/database/model/config/exports.ts":
/*!***********************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/model/config/exports.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DatabaseModelConfigManager: () => (/* reexport safe */ _DatabaseModelConfigManager__WEBPACK_IMPORTED_MODULE_0__.DatabaseModelConfigManager),
/* harmony export */   databaseModelConfigManager: () => (/* reexport safe */ _DatabaseModelConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _DatabaseModelConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DatabaseModelConfigManager */ "./src/main/erdiagram/converter/database/model/config/DatabaseModelConfigManager.ts");




/***/ }),

/***/ "./src/main/erdiagram/converter/database/model/database-model-types.ts":
/*!*****************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/model/database-model-types.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./src/main/erdiagram/converter/database/model/exports.ts":
/*!****************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/model/exports.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DatabaseModelConfigManager: () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_2__.DatabaseModelConfigManager),
/* harmony export */   DatabaseModelGenerator: () => (/* reexport safe */ _DatabaseModelGenerator__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   databaseModelConfigManager: () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_2__.databaseModelConfigManager)
/* harmony export */ });
/* harmony import */ var _DatabaseModelGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DatabaseModelGenerator */ "./src/main/erdiagram/converter/database/model/DatabaseModelGenerator.ts");
/* harmony import */ var _database_model_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./database-model-types */ "./src/main/erdiagram/converter/database/model/database-model-types.ts");
/* harmony import */ var _config_exports__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config/exports */ "./src/main/erdiagram/converter/database/model/config/exports.ts");






/***/ }),

/***/ "./src/main/erdiagram/converter/database/source-code-generator/SqlSourceCodeGenerator.ts":
/*!***********************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/source-code-generator/SqlSourceCodeGenerator.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SqlSourceCodeGenerator)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_database_source_code_generator_SqlSourceCodeGeneratorBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/database/source-code-generator/SqlSourceCodeGeneratorBuilder */ "./src/main/erdiagram/converter/database/source-code-generator/SqlSourceCodeGeneratorBuilder.ts");

class SqlSourceCodeGenerator {
    databaseModelGenerator;
    databaseModelToSqlCodeConverter;
    constructor(databaseModelGenerator, databaseModelToSqlCodeConverter) {
        this.databaseModelGenerator = databaseModelGenerator;
        this.databaseModelToSqlCodeConverter = databaseModelToSqlCodeConverter;
    }
    generateSourceCode(entityRelationshipModel) {
        const databaseModel = this.databaseModelGenerator.generateDatabaseModel(entityRelationshipModel);
        return this.databaseModelToSqlCodeConverter.convertToCode(databaseModel);
    }
    static withDefaultConfig(sqlDialect) {
        return this.builder(sqlDialect).build();
    }
    static builder(sqlDialect) {
        return new _erdiagram_converter_database_source_code_generator_SqlSourceCodeGeneratorBuilder__WEBPACK_IMPORTED_MODULE_0__["default"](sqlDialect);
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/database/source-code-generator/SqlSourceCodeGeneratorBuilder.ts":
/*!******************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/source-code-generator/SqlSourceCodeGeneratorBuilder.ts ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SqlSourceCodeGeneratorBuilder)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_database_model_DatabaseModelGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/database/model/DatabaseModelGenerator */ "./src/main/erdiagram/converter/database/model/DatabaseModelGenerator.ts");
/* harmony import */ var _erdiagram_converter_database_source_code_generator_SqlSourceCodeGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/database/source-code-generator/SqlSourceCodeGenerator */ "./src/main/erdiagram/converter/database/source-code-generator/SqlSourceCodeGenerator.ts");
/* harmony import */ var _erdiagram_converter_database_source_code_generator_sql_DatabaseModelToSqlCodeConverter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/database/source-code-generator/sql/DatabaseModelToSqlCodeConverter */ "./src/main/erdiagram/converter/database/source-code-generator/sql/DatabaseModelToSqlCodeConverter.ts");



class SqlSourceCodeGeneratorBuilder {
    _sqlDialect;
    _databaseModelConfig = {};
    constructor(sqlDialect) {
        this._sqlDialect = sqlDialect;
    }
    configureDatabaseModel(config) {
        this._databaseModelConfig = config;
        return this;
    }
    build() {
        return new _erdiagram_converter_database_source_code_generator_SqlSourceCodeGenerator__WEBPACK_IMPORTED_MODULE_1__["default"](new _erdiagram_converter_database_model_DatabaseModelGenerator__WEBPACK_IMPORTED_MODULE_0__["default"](this._databaseModelConfig), new _erdiagram_converter_database_source_code_generator_sql_DatabaseModelToSqlCodeConverter__WEBPACK_IMPORTED_MODULE_2__["default"](this._sqlDialect));
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/database/source-code-generator/exports.ts":
/*!********************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/source-code-generator/exports.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DatabaseModelToSqlCodeConverter: () => (/* reexport safe */ _sql_exports__WEBPACK_IMPORTED_MODULE_2__.DatabaseModelToSqlCodeConverter),
/* harmony export */   MysqlDialect: () => (/* reexport safe */ _sql_exports__WEBPACK_IMPORTED_MODULE_2__.MysqlDialect),
/* harmony export */   MysqlDialectConfigManager: () => (/* reexport safe */ _sql_exports__WEBPACK_IMPORTED_MODULE_2__.MysqlDialectConfigManager),
/* harmony export */   OracleDialect: () => (/* reexport safe */ _sql_exports__WEBPACK_IMPORTED_MODULE_2__.OracleDialect),
/* harmony export */   OracleDialectConfigManager: () => (/* reexport safe */ _sql_exports__WEBPACK_IMPORTED_MODULE_2__.OracleDialectConfigManager),
/* harmony export */   PostgresqlDialect: () => (/* reexport safe */ _sql_exports__WEBPACK_IMPORTED_MODULE_2__.PostgresqlDialect),
/* harmony export */   PostgresqlDialectConfigManager: () => (/* reexport safe */ _sql_exports__WEBPACK_IMPORTED_MODULE_2__.PostgresqlDialectConfigManager),
/* harmony export */   SqlServerDialect: () => (/* reexport safe */ _sql_exports__WEBPACK_IMPORTED_MODULE_2__.SqlServerDialect),
/* harmony export */   SqlServerDialectConfigManager: () => (/* reexport safe */ _sql_exports__WEBPACK_IMPORTED_MODULE_2__.SqlServerDialectConfigManager),
/* harmony export */   SqlSourceCodeGenerator: () => (/* reexport safe */ _SqlSourceCodeGenerator__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   SqlSourceCodeGeneratorBuilder: () => (/* reexport safe */ _erdiagram_converter_database_source_code_generator_SqlSourceCodeGeneratorBuilder__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   SqliteDialect: () => (/* reexport safe */ _sql_exports__WEBPACK_IMPORTED_MODULE_2__.SqliteDialect),
/* harmony export */   SqliteDialectConfigManager: () => (/* reexport safe */ _sql_exports__WEBPACK_IMPORTED_MODULE_2__.SqliteDialectConfigManager),
/* harmony export */   mysqlDialectConfigManager: () => (/* reexport safe */ _sql_exports__WEBPACK_IMPORTED_MODULE_2__.mysqlDialectConfigManager),
/* harmony export */   oracleDialectConfigManager: () => (/* reexport safe */ _sql_exports__WEBPACK_IMPORTED_MODULE_2__.oracleDialectConfigManager),
/* harmony export */   postgresqlDialectConfigManager: () => (/* reexport safe */ _sql_exports__WEBPACK_IMPORTED_MODULE_2__.postgresqlDialectConfigManager),
/* harmony export */   sqlServerDialectConfigManager: () => (/* reexport safe */ _sql_exports__WEBPACK_IMPORTED_MODULE_2__.sqlServerDialectConfigManager),
/* harmony export */   sqliteDialectConfigManager: () => (/* reexport safe */ _sql_exports__WEBPACK_IMPORTED_MODULE_2__.sqliteDialectConfigManager)
/* harmony export */ });
/* harmony import */ var _SqlSourceCodeGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SqlSourceCodeGenerator */ "./src/main/erdiagram/converter/database/source-code-generator/SqlSourceCodeGenerator.ts");
/* harmony import */ var _erdiagram_converter_database_source_code_generator_SqlSourceCodeGeneratorBuilder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/database/source-code-generator/SqlSourceCodeGeneratorBuilder */ "./src/main/erdiagram/converter/database/source-code-generator/SqlSourceCodeGeneratorBuilder.ts");
/* harmony import */ var _sql_exports__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sql/exports */ "./src/main/erdiagram/converter/database/source-code-generator/sql/exports.ts");






/***/ }),

/***/ "./src/main/erdiagram/converter/database/source-code-generator/sql/DatabaseModelToSqlCodeConverter.ts":
/*!************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/source-code-generator/sql/DatabaseModelToSqlCodeConverter.ts ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DatabaseModelToSqlCodeConverter)
/* harmony export */ });
/* harmony import */ var _erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/util/indent-utils */ "./src/main/erdiagram/util/indent-utils.ts");

class DatabaseModelToSqlCodeConverter {
    sqlDialect;
    constructor(sqlDialect) {
        this.sqlDialect = sqlDialect;
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
        const allScriptStatements = [
            ...allCreateTableStatements,
            ...allAlterTableStatements
        ];
        const scriptStartCode = this.sqlDialect.getScriptStartCode();
        const scriptEndCode = this.sqlDialect.getScriptEndCode();
        if (scriptStartCode) {
            allScriptStatements.unshift(scriptStartCode);
        }
        if (scriptEndCode) {
            allScriptStatements.push(scriptEndCode);
        }
        return allScriptStatements.join('\n\n');
    }
    // FIXME split this method
    generateTableCode(table) {
        const lines = {
            sequences: [],
            columns: [],
            fkConstraints: [],
            otherConstraints: []
        };
        const { createSequenceLine: idCreateSequenceLine, columnLine: idColumnLine, pkConstraintLine } = this.sqlDialect.getIdColumnCode(table.name, table.identityColumnName);
        if (idCreateSequenceLine) {
            lines.sequences.push(idCreateSequenceLine);
        }
        lines.columns.push(idColumnLine);
        if (pkConstraintLine != null) {
            lines.otherConstraints.push(pkConstraintLine);
        }
        this.processColumns(table.name, table.columns, lines);
        this.processReferences(table.name, table.references, lines);
        const createTableInnerLines = this.getCreateTableInnerLines(lines);
        const createTableLines = [
            ...lines.sequences,
            this.sqlDialect.getCreateTableStartCode(table.name),
            (0,_erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_0__.indentLines)(createTableInnerLines).join(',\n'),
            this.sqlDialect.getCreateTableEndCode()
        ];
        const alterTableLines = this.getAlterTableLines(table, lines);
        return {
            createTableStatement: createTableLines.join('\n'),
            alterTableStatements: alterTableLines.join('\n')
        };
    }
    processColumns(tableName, columns, lines) {
        for (const column of columns) {
            const { columnLine, uniqueConstraintLine } = this.sqlDialect.getColumnCode(tableName, column);
            lines.columns.push(columnLine);
            if (uniqueConstraintLine) {
                lines.otherConstraints.push(uniqueConstraintLine);
            }
        }
    }
    processReferences(tableName, references, lines) {
        for (const reference of references) {
            const { columnLine, uniqueConstraintLine, fkConstraintLine } = this.sqlDialect.getForeignColumnCode(tableName, reference);
            lines.columns.push(columnLine);
            lines.fkConstraints.push(fkConstraintLine);
            if (uniqueConstraintLine) {
                lines.otherConstraints.push(uniqueConstraintLine);
            }
        }
    }
    getCreateTableInnerLines(lines) {
        const createTableInnerLines = [
            ...lines.columns,
            ...lines.otherConstraints
        ];
        if (!this.sqlDialect.mustUseAlterTableForForeignKeys()) {
            createTableInnerLines.push(...lines.fkConstraints);
        }
        return createTableInnerLines;
    }
    getAlterTableLines(table, lines) {
        if (!this.sqlDialect.mustUseAlterTableForForeignKeys()) {
            return [];
        }
        return lines.fkConstraints.map(fkConstraintLine => {
            return this.sqlDialect.getAlterTableAddCode(table.name, fkConstraintLine);
        });
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/common/SqlTypeResolver.ts":
/*!***********************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/common/SqlTypeResolver.ts ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SqlTypeResolver)
/* harmony export */ });
class SqlTypeResolver {
    typeBindings;
    constructor(typeBindings) {
        this.typeBindings = typeBindings;
    }
    resolveSqlType(type) {
        /* istanbul ignore next */
        if (!Object.hasOwn(this.typeBindings, type)) {
            throw new Error('Unsupported type: ' + type);
        }
        return this.typeBindings[type];
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/common/config/exports.ts":
/*!**********************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/common/config/exports.ts ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/common/exports.ts":
/*!***************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/common/exports.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config_exports__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config/exports */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/common/config/exports.ts");



/***/ }),

/***/ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/exports.ts":
/*!********************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/exports.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MysqlDialect: () => (/* reexport safe */ _mysql_exports__WEBPACK_IMPORTED_MODULE_1__.MysqlDialect),
/* harmony export */   MysqlDialectConfigManager: () => (/* reexport safe */ _mysql_exports__WEBPACK_IMPORTED_MODULE_1__.MysqlDialectConfigManager),
/* harmony export */   OracleDialect: () => (/* reexport safe */ _oracle_exports__WEBPACK_IMPORTED_MODULE_2__.OracleDialect),
/* harmony export */   OracleDialectConfigManager: () => (/* reexport safe */ _oracle_exports__WEBPACK_IMPORTED_MODULE_2__.OracleDialectConfigManager),
/* harmony export */   PostgresqlDialect: () => (/* reexport safe */ _postgresql_exports__WEBPACK_IMPORTED_MODULE_5__.PostgresqlDialect),
/* harmony export */   PostgresqlDialectConfigManager: () => (/* reexport safe */ _postgresql_exports__WEBPACK_IMPORTED_MODULE_5__.PostgresqlDialectConfigManager),
/* harmony export */   SqlServerDialect: () => (/* reexport safe */ _sqlserver_exports__WEBPACK_IMPORTED_MODULE_4__.SqlServerDialect),
/* harmony export */   SqlServerDialectConfigManager: () => (/* reexport safe */ _sqlserver_exports__WEBPACK_IMPORTED_MODULE_4__.SqlServerDialectConfigManager),
/* harmony export */   SqliteDialect: () => (/* reexport safe */ _sqlite_exports__WEBPACK_IMPORTED_MODULE_3__.SqliteDialect),
/* harmony export */   SqliteDialectConfigManager: () => (/* reexport safe */ _sqlite_exports__WEBPACK_IMPORTED_MODULE_3__.SqliteDialectConfigManager),
/* harmony export */   mysqlDialectConfigManager: () => (/* reexport safe */ _mysql_exports__WEBPACK_IMPORTED_MODULE_1__.mysqlDialectConfigManager),
/* harmony export */   oracleDialectConfigManager: () => (/* reexport safe */ _oracle_exports__WEBPACK_IMPORTED_MODULE_2__.oracleDialectConfigManager),
/* harmony export */   postgresqlDialectConfigManager: () => (/* reexport safe */ _postgresql_exports__WEBPACK_IMPORTED_MODULE_5__.postgresqlDialectConfigManager),
/* harmony export */   sqlServerDialectConfigManager: () => (/* reexport safe */ _sqlserver_exports__WEBPACK_IMPORTED_MODULE_4__.sqlServerDialectConfigManager),
/* harmony export */   sqliteDialectConfigManager: () => (/* reexport safe */ _sqlite_exports__WEBPACK_IMPORTED_MODULE_3__.sqliteDialectConfigManager)
/* harmony export */ });
/* harmony import */ var _common_exports__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common/exports */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/common/exports.ts");
/* harmony import */ var _mysql_exports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mysql/exports */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/mysql/exports.ts");
/* harmony import */ var _oracle_exports__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./oracle/exports */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/oracle/exports.ts");
/* harmony import */ var _sqlite_exports__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sqlite/exports */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/sqlite/exports.ts");
/* harmony import */ var _sqlserver_exports__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sqlserver/exports */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/sqlserver/exports.ts");
/* harmony import */ var _postgresql_exports__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./postgresql/exports */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/postgresql/exports.ts");








/***/ }),

/***/ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/mysql/MysqlDialect.ts":
/*!*******************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/mysql/MysqlDialect.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MysqlDialect)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/common/case-format/CaseConverter */ "./src/main/erdiagram/converter/common/case-format/CaseConverter.ts");
/* harmony import */ var _erdiagram_converter_database_source_code_generator_sql_dialect_mysql_column_MysqlColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/database/source-code-generator/sql/dialect/mysql/column/MysqlColumnCodeGenerator */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/mysql/column/MysqlColumnCodeGenerator.ts");
/* harmony import */ var _erdiagram_converter_database_source_code_generator_sql_dialect_mysql_column_MysqlIdColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/database/source-code-generator/sql/dialect/mysql/column/MysqlIdColumnCodeGenerator */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/mysql/column/MysqlIdColumnCodeGenerator.ts");
/* harmony import */ var _erdiagram_converter_database_source_code_generator_sql_dialect_mysql_column_MysqlForeignColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/converter/database/source-code-generator/sql/dialect/mysql/column/MysqlForeignColumnCodeGenerator */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/mysql/column/MysqlForeignColumnCodeGenerator.ts");
/* harmony import */ var _erdiagram_converter_database_source_code_generator_sql_dialect_common_SqlTypeResolver__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/erdiagram/converter/database/source-code-generator/sql/dialect/common/SqlTypeResolver */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/common/SqlTypeResolver.ts");
/* harmony import */ var _erdiagram_converter_database_source_code_generator_sql_dialect_mysql_config_MysqlDialectConfigManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/erdiagram/converter/database/source-code-generator/sql/dialect/mysql/config/MysqlDialectConfigManager */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/mysql/config/MysqlDialectConfigManager.ts");
/* harmony import */ var _erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/erdiagram/converter/common/case-format/StandardCaseFormats */ "./src/main/erdiagram/converter/common/case-format/StandardCaseFormats.ts");







class MysqlDialect {
    tableNameCaseConverter;
    columnCodeGenerator;
    idColumnCodeGenerator;
    foreignColumnCodeGenerator;
    constructor(config) {
        const fullConfig = _erdiagram_converter_database_source_code_generator_sql_dialect_mysql_config_MysqlDialectConfigManager__WEBPACK_IMPORTED_MODULE_5__["default"].mergeWithDefaultConfig(config);
        this.tableNameCaseConverter = new _erdiagram_converter_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_0__["default"](_erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_6__["default"].LOWER_CAMEL, fullConfig.tableNameCaseFormat);
        const columnNameCaseConverter = new _erdiagram_converter_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_0__["default"](_erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_6__["default"].LOWER_CAMEL, fullConfig.columnNameCaseFormat);
        const sqlTypeResolver = new _erdiagram_converter_database_source_code_generator_sql_dialect_common_SqlTypeResolver__WEBPACK_IMPORTED_MODULE_4__["default"](fullConfig.typeBindings);
        this.columnCodeGenerator = new _erdiagram_converter_database_source_code_generator_sql_dialect_mysql_column_MysqlColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_1__["default"](sqlTypeResolver, columnNameCaseConverter);
        this.idColumnCodeGenerator = new _erdiagram_converter_database_source_code_generator_sql_dialect_mysql_column_MysqlIdColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_2__["default"](sqlTypeResolver, columnNameCaseConverter);
        this.foreignColumnCodeGenerator = new _erdiagram_converter_database_source_code_generator_sql_dialect_mysql_column_MysqlForeignColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_3__["default"](this.columnCodeGenerator, this.tableNameCaseConverter, columnNameCaseConverter);
    }
    getScriptStartCode() {
        return '';
    }
    getScriptEndCode() {
        return '';
    }
    mustUseAlterTableForForeignKeys() {
        return true;
    }
    getCreateTableStartCode(tableName) {
        const outputTableName = this.tableNameCaseConverter.convertCase(tableName);
        return `CREATE TABLE \`${outputTableName}\` (`;
    }
    getCreateTableEndCode() {
        return ');';
    }
    getIdColumnCode(tableName, identityColumnName) {
        const outputTableName = this.tableNameCaseConverter.convertCase(tableName);
        return this.idColumnCodeGenerator.generateIdColumnCode(outputTableName, identityColumnName);
    }
    getColumnCode(tableName, column) {
        const outputTableName = this.tableNameCaseConverter.convertCase(tableName);
        return this.columnCodeGenerator.generateColumnCode(outputTableName, column);
    }
    getForeignColumnCode(tableName, reference) {
        const outputTableName = this.tableNameCaseConverter.convertCase(tableName);
        return this.foreignColumnCodeGenerator.generateForeignColumnCode(outputTableName, reference);
    }
    getAlterTableAddCode(tableName, constraintCode) {
        const outputTableName = this.tableNameCaseConverter.convertCase(tableName);
        return `ALTER TABLE \`${outputTableName}\` ADD ${constraintCode};`;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/mysql/column/MysqlColumnCodeGenerator.ts":
/*!**************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/mysql/column/MysqlColumnCodeGenerator.ts ***!
  \**************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MysqlColumnCodeGenerator)
/* harmony export */ });
class MysqlColumnCodeGenerator {
    typeResolver;
    columnNameCaseConverter;
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
        const { notNull, type, length } = column;
        const lineParts = [
            `\`${outputColumnName}\``,
            this.generateMysqlTypeDeclaration(type, length)
        ];
        if (notNull) {
            lineParts.push('NOT NULL');
        }
        return lineParts.join(' ');
    }
    generateMysqlTypeDeclaration(type, length) {
        const mysqlType = this.typeResolver.resolveSqlType(type);
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

/***/ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/mysql/column/MysqlForeignColumnCodeGenerator.ts":
/*!*********************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/mysql/column/MysqlForeignColumnCodeGenerator.ts ***!
  \*********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MysqlForeignColumnCodeGenerator)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/entity-relationship-model-types */ "./src/main/erdiagram/parser/types/entity-relationship-model-types.ts");

class MysqlForeignColumnCodeGenerator {
    columnCodeGenerator;
    tableNameCaseConverter;
    columnNameCaseConverter;
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
            type: _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.IDENTITY,
            length: [],
            notNull,
            unique
        };
    }
    createForeignKeyConstraint(outputTableName, reference) {
        const outputColumnName = this.columnNameCaseConverter.convertCase(reference.columnName);
        const outputTargetTableName = this.tableNameCaseConverter.convertCase(reference.targetTableName);
        const outputTargetColumnName = this.columnNameCaseConverter.convertCase(reference.targetTableIdentityColumnName);
        return `CONSTRAINT \`${outputTableName}_${outputColumnName}_fk\` FOREIGN KEY (\`${outputColumnName}\`)`
            + ` REFERENCES \`${outputTargetTableName}\` (\`${outputTargetColumnName}\`)`;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/mysql/column/MysqlIdColumnCodeGenerator.ts":
/*!****************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/mysql/column/MysqlIdColumnCodeGenerator.ts ***!
  \****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MysqlIdColumnCodeGenerator)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/entity-relationship-model-types */ "./src/main/erdiagram/parser/types/entity-relationship-model-types.ts");

class MysqlIdColumnCodeGenerator {
    typeResolver;
    columnNameCaseConverter;
    constructor(typeResolver, columnNameCaseConverter) {
        this.typeResolver = typeResolver;
        this.columnNameCaseConverter = columnNameCaseConverter;
    }
    generateIdColumnCode(outputTableName, identityColumnName) {
        const outputIdentityColumnName = this.columnNameCaseConverter.convertCase(identityColumnName);
        return {
            columnLine: this.generateIdColumnDeclarationLine(outputIdentityColumnName),
            pkConstraintLine: this.createPrimaryKeyConstraint(outputTableName, outputIdentityColumnName)
        };
    }
    generateIdColumnDeclarationLine(outputIdentityColumnName) {
        const sqlType = this.typeResolver.resolveSqlType(_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.IDENTITY);
        return `\`${outputIdentityColumnName}\` ${sqlType} NOT NULL AUTO_INCREMENT`;
    }
    createPrimaryKeyConstraint(outputTableName, outputIdentityColumnName) {
        return `CONSTRAINT \`${outputTableName}_pk\` PRIMARY KEY (\`${outputIdentityColumnName}\`)`;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/mysql/config/MysqlDialectConfigManager.ts":
/*!***************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/mysql/config/MysqlDialectConfigManager.ts ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MysqlDialectConfigManager: () => (/* binding */ MysqlDialectConfigManager),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/entity-relationship-model-types */ "./src/main/erdiagram/parser/types/entity-relationship-model-types.ts");
/* harmony import */ var _erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/common/case-format/StandardCaseFormats */ "./src/main/erdiagram/converter/common/case-format/StandardCaseFormats.ts");
/* harmony import */ var _erdiagram_common_config_AbstractConfigManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/common/config/AbstractConfigManager */ "./src/main/erdiagram/common/config/AbstractConfigManager.ts");
/* harmony import */ var true_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! true-json */ "./node_modules/true-json/dist/true-json.umd.js");
/* harmony import */ var true_json__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(true_json__WEBPACK_IMPORTED_MODULE_3__);




class MysqlDialectConfigManager extends _erdiagram_common_config_AbstractConfigManager__WEBPACK_IMPORTED_MODULE_2__["default"] {
    getDefaultConfig() {
        return {
            typeBindings: {
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.IDENTITY]: 'BIGINT',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.TEXT]: 'VARCHAR',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.LONG]: 'BIGINT',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.INT]: 'INT',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.SHORT]: 'SHORT',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.DECIMAL]: 'DECIMAL',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.BOOLEAN]: 'BOOLEAN',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.DATE]: 'DATE',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.TIME]: 'TIME',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.DATETIME]: 'TIMESTAMP',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.BLOB]: 'BLOB'
            },
            tableNameCaseFormat: _erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"].UPPER_CAMEL,
            columnNameCaseFormat: _erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"].LOWER_CAMEL,
        };
    }
    mergeConfigs(fullConfig, partialConfig) {
        return {
            ...fullConfig,
            ...partialConfig,
            typeBindings: {
                ...fullConfig.typeBindings,
                ...partialConfig?.typeBindings
            }
        };
    }
    getJsonAdapter() {
        return true_json__WEBPACK_IMPORTED_MODULE_3__.JsonAdapters.object({
            tableNameCaseFormat: true_json__WEBPACK_IMPORTED_MODULE_3__.JsonAdapters.byKeyLenient(_erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"], 'UPPER_CAMEL'),
            columnNameCaseFormat: true_json__WEBPACK_IMPORTED_MODULE_3__.JsonAdapters.byKeyLenient(_erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"], 'LOWER_CAMEL')
        });
    }
}
const mysqlDialectConfigManager = new MysqlDialectConfigManager();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mysqlDialectConfigManager);


/***/ }),

/***/ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/mysql/config/exports.ts":
/*!*********************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/mysql/config/exports.ts ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MysqlDialectConfigManager: () => (/* reexport safe */ _MysqlDialectConfigManager__WEBPACK_IMPORTED_MODULE_0__.MysqlDialectConfigManager),
/* harmony export */   mysqlDialectConfigManager: () => (/* reexport safe */ _MysqlDialectConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _MysqlDialectConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MysqlDialectConfigManager */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/mysql/config/MysqlDialectConfigManager.ts");




/***/ }),

/***/ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/mysql/exports.ts":
/*!**************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/mysql/exports.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MysqlDialect: () => (/* reexport safe */ _erdiagram_converter_database_source_code_generator_sql_dialect_mysql_MysqlDialect__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   MysqlDialectConfigManager: () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_1__.MysqlDialectConfigManager),
/* harmony export */   mysqlDialectConfigManager: () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_1__.mysqlDialectConfigManager)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_database_source_code_generator_sql_dialect_mysql_MysqlDialect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/database/source-code-generator/sql/dialect/mysql/MysqlDialect */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/mysql/MysqlDialect.ts");
/* harmony import */ var _config_exports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config/exports */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/mysql/config/exports.ts");





/***/ }),

/***/ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/oracle/OracleDialect.ts":
/*!*********************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/oracle/OracleDialect.ts ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OracleDialect)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/common/case-format/CaseConverter */ "./src/main/erdiagram/converter/common/case-format/CaseConverter.ts");
/* harmony import */ var _erdiagram_converter_database_source_code_generator_sql_dialect_oracle_column_OracleColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/database/source-code-generator/sql/dialect/oracle/column/OracleColumnCodeGenerator */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/oracle/column/OracleColumnCodeGenerator.ts");
/* harmony import */ var _erdiagram_converter_database_source_code_generator_sql_dialect_oracle_column_OracleIdColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/database/source-code-generator/sql/dialect/oracle/column/OracleIdColumnCodeGenerator */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/oracle/column/OracleIdColumnCodeGenerator.ts");
/* harmony import */ var _erdiagram_converter_database_source_code_generator_sql_dialect_oracle_column_OracleForeignColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/converter/database/source-code-generator/sql/dialect/oracle/column/OracleForeignColumnCodeGenerator */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/oracle/column/OracleForeignColumnCodeGenerator.ts");
/* harmony import */ var _erdiagram_converter_database_source_code_generator_sql_dialect_oracle_config_OracleDialectConfigManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/erdiagram/converter/database/source-code-generator/sql/dialect/oracle/config/OracleDialectConfigManager */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/oracle/config/OracleDialectConfigManager.ts");
/* harmony import */ var _erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/erdiagram/converter/common/case-format/StandardCaseFormats */ "./src/main/erdiagram/converter/common/case-format/StandardCaseFormats.ts");
/* harmony import */ var _erdiagram_converter_database_source_code_generator_sql_dialect_common_SqlTypeResolver__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/erdiagram/converter/database/source-code-generator/sql/dialect/common/SqlTypeResolver */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/common/SqlTypeResolver.ts");







class OracleDialect {
    tableNameCaseConverter;
    columnCodeGenerator;
    idColumnCodeGenerator;
    foreignColumnCodeGenerator;
    constructor(config) {
        const fullConfig = _erdiagram_converter_database_source_code_generator_sql_dialect_oracle_config_OracleDialectConfigManager__WEBPACK_IMPORTED_MODULE_4__["default"].mergeWithDefaultConfig(config);
        this.tableNameCaseConverter = new _erdiagram_converter_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_0__["default"](_erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_5__["default"].LOWER_CAMEL, fullConfig.tableNameCaseFormat);
        const columnNameCaseConverter = new _erdiagram_converter_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_0__["default"](_erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_5__["default"].LOWER_CAMEL, fullConfig.columnNameCaseFormat);
        const sqlTypeResolver = new _erdiagram_converter_database_source_code_generator_sql_dialect_common_SqlTypeResolver__WEBPACK_IMPORTED_MODULE_6__["default"](fullConfig.typeBindings);
        this.columnCodeGenerator = new _erdiagram_converter_database_source_code_generator_sql_dialect_oracle_column_OracleColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_1__["default"](sqlTypeResolver, columnNameCaseConverter);
        this.idColumnCodeGenerator = new _erdiagram_converter_database_source_code_generator_sql_dialect_oracle_column_OracleIdColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_2__["default"](sqlTypeResolver, columnNameCaseConverter);
        this.foreignColumnCodeGenerator = new _erdiagram_converter_database_source_code_generator_sql_dialect_oracle_column_OracleForeignColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_3__["default"](this.columnCodeGenerator, this.tableNameCaseConverter, columnNameCaseConverter);
    }
    getScriptStartCode() {
        return '';
    }
    getScriptEndCode() {
        return '';
    }
    mustUseAlterTableForForeignKeys() {
        return true;
    }
    getCreateTableStartCode(tableName) {
        const outputTableName = this.tableNameCaseConverter.convertCase(tableName);
        return `CREATE TABLE "${outputTableName}" (`;
    }
    getCreateTableEndCode() {
        return ');';
    }
    getIdColumnCode(tableName, identityColumnName) {
        const outputTableName = this.tableNameCaseConverter.convertCase(tableName);
        return this.idColumnCodeGenerator.generateIdColumnCode(outputTableName, identityColumnName);
    }
    getColumnCode(tableName, column) {
        const outputTableName = this.tableNameCaseConverter.convertCase(tableName);
        return this.columnCodeGenerator.generateColumnCode(outputTableName, column);
    }
    getForeignColumnCode(tableName, reference) {
        const outputTableName = this.tableNameCaseConverter.convertCase(tableName);
        return this.foreignColumnCodeGenerator.generateForeignColumnCode(outputTableName, reference);
    }
    getAlterTableAddCode(tableName, constraintCode) {
        const outputTableName = this.tableNameCaseConverter.convertCase(tableName);
        return `ALTER TABLE "${outputTableName}" ADD ${constraintCode};`;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/oracle/column/OracleColumnCodeGenerator.ts":
/*!****************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/oracle/column/OracleColumnCodeGenerator.ts ***!
  \****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OracleColumnCodeGenerator)
/* harmony export */ });
class OracleColumnCodeGenerator {
    typeResolver;
    columnNameCaseConverter;
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
        const { notNull, type, length } = column;
        const lineParts = [
            `"${outputColumnName}"`,
            this.generateOracleTypeDeclaration(type, length)
        ];
        if (notNull) {
            lineParts.push('NOT NULL');
        }
        return lineParts.join(' ');
    }
    generateOracleTypeDeclaration(type, length) {
        const oracleType = this.typeResolver.resolveSqlType(type);
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

/***/ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/oracle/column/OracleForeignColumnCodeGenerator.ts":
/*!***********************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/oracle/column/OracleForeignColumnCodeGenerator.ts ***!
  \***********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OracleForeignColumnCodeGenerator)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/entity-relationship-model-types */ "./src/main/erdiagram/parser/types/entity-relationship-model-types.ts");

class OracleForeignColumnCodeGenerator {
    columnCodeGenerator;
    tableNameCaseConverter;
    columnNameCaseConverter;
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
            type: _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.IDENTITY,
            length: [],
            notNull,
            unique
        };
    }
    createForeignKeyConstraint(outputTableName, reference) {
        const outputColumnName = this.columnNameCaseConverter.convertCase(reference.columnName);
        const outputTargetTableName = this.tableNameCaseConverter.convertCase(reference.targetTableName);
        const outputTargetColumnName = this.columnNameCaseConverter.convertCase(reference.targetTableIdentityColumnName);
        return `CONSTRAINT "${outputTableName}_${outputColumnName}_FK" FOREIGN KEY ("${outputColumnName}")`
            + ` REFERENCES "${outputTargetTableName}" ("${outputTargetColumnName}")`;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/oracle/column/OracleIdColumnCodeGenerator.ts":
/*!******************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/oracle/column/OracleIdColumnCodeGenerator.ts ***!
  \******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OracleIdColumnCodeGenerator)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/entity-relationship-model-types */ "./src/main/erdiagram/parser/types/entity-relationship-model-types.ts");

class OracleIdColumnCodeGenerator {
    typeResolver;
    columnNameCaseConverter;
    constructor(typeResolver, columnNameCaseConverter) {
        this.typeResolver = typeResolver;
        this.columnNameCaseConverter = columnNameCaseConverter;
    }
    generateIdColumnCode(outputTableName, identityColumnName) {
        const outputIdentityColumnName = this.columnNameCaseConverter.convertCase(identityColumnName);
        const sequenceName = this.getSequenceName(outputTableName);
        return {
            createSequenceLine: this.generateCreateSequenceLine(sequenceName),
            columnLine: this.generateIdColumnDeclarationLine(outputIdentityColumnName, sequenceName),
            pkConstraintLine: this.createPrimaryKeyConstraint(outputTableName, outputIdentityColumnName)
        };
    }
    getSequenceName(outputTableName) {
        return `${outputTableName}_SEQ`;
    }
    generateCreateSequenceLine(sequenceName) {
        return `CREATE SEQUENCE "${sequenceName}" START WITH 1;`;
    }
    generateIdColumnDeclarationLine(outputIdentityColumnName, sequenceName) {
        const sqlType = this.typeResolver.resolveSqlType(_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.IDENTITY);
        return `"${outputIdentityColumnName}" ${sqlType} NOT NULL DEFAULT "${sequenceName}".nextval`;
    }
    createPrimaryKeyConstraint(outputTableName, outputIdentityColumnName) {
        return `CONSTRAINT "${outputTableName}_PK" PRIMARY KEY ("${outputIdentityColumnName}")`;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/oracle/config/OracleDialectConfigManager.ts":
/*!*****************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/oracle/config/OracleDialectConfigManager.ts ***!
  \*****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OracleDialectConfigManager: () => (/* binding */ OracleDialectConfigManager),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/entity-relationship-model-types */ "./src/main/erdiagram/parser/types/entity-relationship-model-types.ts");
/* harmony import */ var _erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/common/case-format/StandardCaseFormats */ "./src/main/erdiagram/converter/common/case-format/StandardCaseFormats.ts");
/* harmony import */ var _erdiagram_common_config_AbstractConfigManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/common/config/AbstractConfigManager */ "./src/main/erdiagram/common/config/AbstractConfigManager.ts");
/* harmony import */ var true_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! true-json */ "./node_modules/true-json/dist/true-json.umd.js");
/* harmony import */ var true_json__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(true_json__WEBPACK_IMPORTED_MODULE_3__);




class OracleDialectConfigManager extends _erdiagram_common_config_AbstractConfigManager__WEBPACK_IMPORTED_MODULE_2__["default"] {
    getDefaultConfig() {
        return {
            typeBindings: {
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.IDENTITY]: 'NUMBER',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.TEXT]: 'VARCHAR2',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.LONG]: 'NUMBER',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.INT]: 'NUMBER',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.SHORT]: 'NUMBER',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.DECIMAL]: 'NUMBER',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.BOOLEAN]: 'NUMBER(1, 0)',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.DATE]: 'DATE',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.TIME]: 'TIMESTAMP',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.DATETIME]: 'TIMESTAMP',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.BLOB]: 'BLOB'
            },
            tableNameCaseFormat: _erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"].UPPER_UNDERSCORE,
            columnNameCaseFormat: _erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"].UPPER_UNDERSCORE,
        };
    }
    mergeConfigs(fullConfig, partialConfig) {
        return {
            ...fullConfig,
            ...partialConfig,
            typeBindings: {
                ...fullConfig.typeBindings,
                ...partialConfig?.typeBindings
            }
        };
    }
    getJsonAdapter() {
        return true_json__WEBPACK_IMPORTED_MODULE_3__.JsonAdapters.object({
            tableNameCaseFormat: true_json__WEBPACK_IMPORTED_MODULE_3__.JsonAdapters.byKeyLenient(_erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"], 'UPPER_UNDERSCORE'),
            columnNameCaseFormat: true_json__WEBPACK_IMPORTED_MODULE_3__.JsonAdapters.byKeyLenient(_erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"], 'UPPER_UNDERSCORE')
        });
    }
}
const oracleDialectConfigManager = new OracleDialectConfigManager();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (oracleDialectConfigManager);


/***/ }),

/***/ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/oracle/config/exports.ts":
/*!**********************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/oracle/config/exports.ts ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OracleDialectConfigManager: () => (/* reexport safe */ _OracleDialectConfigManager__WEBPACK_IMPORTED_MODULE_0__.OracleDialectConfigManager),
/* harmony export */   oracleDialectConfigManager: () => (/* reexport safe */ _OracleDialectConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _OracleDialectConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OracleDialectConfigManager */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/oracle/config/OracleDialectConfigManager.ts");




/***/ }),

/***/ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/oracle/exports.ts":
/*!***************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/oracle/exports.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OracleDialect: () => (/* reexport safe */ _erdiagram_converter_database_source_code_generator_sql_dialect_oracle_OracleDialect__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   OracleDialectConfigManager: () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_1__.OracleDialectConfigManager),
/* harmony export */   oracleDialectConfigManager: () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_1__.oracleDialectConfigManager)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_database_source_code_generator_sql_dialect_oracle_OracleDialect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/database/source-code-generator/sql/dialect/oracle/OracleDialect */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/oracle/OracleDialect.ts");
/* harmony import */ var _config_exports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config/exports */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/oracle/config/exports.ts");





/***/ }),

/***/ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/postgresql/PostgresqlDialect.ts":
/*!*****************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/postgresql/PostgresqlDialect.ts ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PostgresqlDialect)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/common/case-format/CaseConverter */ "./src/main/erdiagram/converter/common/case-format/CaseConverter.ts");
/* harmony import */ var _erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/common/case-format/StandardCaseFormats */ "./src/main/erdiagram/converter/common/case-format/StandardCaseFormats.ts");
/* harmony import */ var _erdiagram_converter_database_source_code_generator_sql_dialect_common_SqlTypeResolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/database/source-code-generator/sql/dialect/common/SqlTypeResolver */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/common/SqlTypeResolver.ts");
/* harmony import */ var _erdiagram_converter_database_source_code_generator_sql_dialect_postgresql_column_PostgresqlColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/converter/database/source-code-generator/sql/dialect/postgresql/column/PostgresqlColumnCodeGenerator */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/postgresql/column/PostgresqlColumnCodeGenerator.ts");
/* harmony import */ var _erdiagram_converter_database_source_code_generator_sql_dialect_postgresql_column_PostgresqlIdColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/erdiagram/converter/database/source-code-generator/sql/dialect/postgresql/column/PostgresqlIdColumnCodeGenerator */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/postgresql/column/PostgresqlIdColumnCodeGenerator.ts");
/* harmony import */ var _erdiagram_converter_database_source_code_generator_sql_dialect_postgresql_column_PostgresqlForeignColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/erdiagram/converter/database/source-code-generator/sql/dialect/postgresql/column/PostgresqlForeignColumnCodeGenerator */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/postgresql/column/PostgresqlForeignColumnCodeGenerator.ts");
/* harmony import */ var _erdiagram_converter_database_source_code_generator_sql_dialect_postgresql_config_PostgresqlDialectConfigManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/erdiagram/converter/database/source-code-generator/sql/dialect/postgresql/config/PostgresqlDialectConfigManager */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/postgresql/config/PostgresqlDialectConfigManager.ts");







class PostgresqlDialect {
    tableNameCaseConverter;
    columnCodeGenerator;
    idColumnCodeGenerator;
    foreignColumnCodeGenerator;
    constructor(config) {
        const fullConfig = _erdiagram_converter_database_source_code_generator_sql_dialect_postgresql_config_PostgresqlDialectConfigManager__WEBPACK_IMPORTED_MODULE_6__["default"].mergeWithDefaultConfig(config);
        this.tableNameCaseConverter = new _erdiagram_converter_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_0__["default"](_erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"].LOWER_CAMEL, fullConfig.tableNameCaseFormat);
        const columnNameCaseConverter = new _erdiagram_converter_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_0__["default"](_erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"].LOWER_CAMEL, fullConfig.columnNameCaseFormat);
        const sqlTypeResolver = new _erdiagram_converter_database_source_code_generator_sql_dialect_common_SqlTypeResolver__WEBPACK_IMPORTED_MODULE_2__["default"](fullConfig.typeBindings);
        this.columnCodeGenerator = new _erdiagram_converter_database_source_code_generator_sql_dialect_postgresql_column_PostgresqlColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_3__["default"](sqlTypeResolver, columnNameCaseConverter);
        this.idColumnCodeGenerator = new _erdiagram_converter_database_source_code_generator_sql_dialect_postgresql_column_PostgresqlIdColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_4__["default"](sqlTypeResolver, columnNameCaseConverter);
        this.foreignColumnCodeGenerator = new _erdiagram_converter_database_source_code_generator_sql_dialect_postgresql_column_PostgresqlForeignColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_5__["default"](this.columnCodeGenerator, this.tableNameCaseConverter, columnNameCaseConverter);
    }
    getScriptStartCode() {
        return '';
    }
    getScriptEndCode() {
        return '';
    }
    mustUseAlterTableForForeignKeys() {
        return true;
    }
    getCreateTableStartCode(tableName) {
        const outputTableName = this.tableNameCaseConverter.convertCase(tableName);
        return `CREATE TABLE "${outputTableName}" (`;
    }
    getCreateTableEndCode() {
        return ');';
    }
    getIdColumnCode(tableName, identityColumnName) {
        const outputTableName = this.tableNameCaseConverter.convertCase(tableName);
        return this.idColumnCodeGenerator.generateIdColumnCode(outputTableName, identityColumnName);
    }
    getColumnCode(tableName, column) {
        const outputTableName = this.tableNameCaseConverter.convertCase(tableName);
        return this.columnCodeGenerator.generateColumnCode(outputTableName, column);
    }
    getForeignColumnCode(tableName, reference) {
        const outputTableName = this.tableNameCaseConverter.convertCase(tableName);
        return this.foreignColumnCodeGenerator.generateForeignColumnCode(outputTableName, reference);
    }
    getAlterTableAddCode(tableName, constraintCode) {
        const outputTableName = this.tableNameCaseConverter.convertCase(tableName);
        return `ALTER TABLE "${outputTableName}" ADD ${constraintCode};`;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/postgresql/column/PostgresqlColumnCodeGenerator.ts":
/*!************************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/postgresql/column/PostgresqlColumnCodeGenerator.ts ***!
  \************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PostgresqlColumnCodeGenerator)
/* harmony export */ });
class PostgresqlColumnCodeGenerator {
    typeResolver;
    columnNameCaseConverter;
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
        const { notNull, type, length } = column;
        const lineParts = [
            `"${outputColumnName}"`,
            this.generatePostgresqlTypeDeclaration(type, length)
        ];
        if (notNull) {
            lineParts.push('NOT NULL');
        }
        return lineParts.join(' ');
    }
    generatePostgresqlTypeDeclaration(type, length) {
        const postgresqlType = this.typeResolver.resolveSqlType(type);
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

/***/ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/postgresql/column/PostgresqlForeignColumnCodeGenerator.ts":
/*!*******************************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/postgresql/column/PostgresqlForeignColumnCodeGenerator.ts ***!
  \*******************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PostgresqlForeignColumnCodeGenerator)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/entity-relationship-model-types */ "./src/main/erdiagram/parser/types/entity-relationship-model-types.ts");

class PostgresqlForeignColumnCodeGenerator {
    columnCodeGenerator;
    tableNameCaseConverter;
    columnNameCaseConverter;
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
            type: _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.IDENTITY,
            length: [],
            notNull,
            unique
        };
    }
    createForeignKeyConstraint(outputTableName, reference) {
        const outputColumnName = this.columnNameCaseConverter.convertCase(reference.columnName);
        const outputTargetTableName = this.tableNameCaseConverter.convertCase(reference.targetTableName);
        const outputTargetColumnName = this.columnNameCaseConverter.convertCase(reference.targetTableIdentityColumnName);
        return `CONSTRAINT "${outputTableName}_${outputColumnName}_fk" FOREIGN KEY ("${outputColumnName}")`
            + ` REFERENCES "${outputTargetTableName}" ("${outputTargetColumnName}")`;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/postgresql/column/PostgresqlIdColumnCodeGenerator.ts":
/*!**************************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/postgresql/column/PostgresqlIdColumnCodeGenerator.ts ***!
  \**************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PostgresqlIdColumnCodeGenerator)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/entity-relationship-model-types */ "./src/main/erdiagram/parser/types/entity-relationship-model-types.ts");

class PostgresqlIdColumnCodeGenerator {
    typeResolver;
    columnNameCaseConverter;
    constructor(typeResolver, columnNameCaseConverter) {
        this.typeResolver = typeResolver;
        this.columnNameCaseConverter = columnNameCaseConverter;
    }
    generateIdColumnCode(outputTableName, identityColumnName) {
        const outputIdentityColumnName = this.columnNameCaseConverter.convertCase(identityColumnName);
        return {
            columnLine: this.generateIdColumnDeclarationLine(outputIdentityColumnName),
            pkConstraintLine: this.createPrimaryKeyConstraint(outputTableName, outputIdentityColumnName)
        };
    }
    generateIdColumnDeclarationLine(outputIdentityColumnName) {
        const sqlType = this.typeResolver.resolveSqlType(_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.IDENTITY);
        return `"${outputIdentityColumnName}" ${sqlType} NOT NULL GENERATED ALWAYS AS IDENTITY`;
    }
    createPrimaryKeyConstraint(outputTableName, outputIdentityColumnName) {
        return `CONSTRAINT "${outputTableName}_pk" PRIMARY KEY ("${outputIdentityColumnName}")`;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/postgresql/config/PostgresqlDialectConfigManager.ts":
/*!*************************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/postgresql/config/PostgresqlDialectConfigManager.ts ***!
  \*************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PostgresqlDialectConfigManager: () => (/* binding */ PostgresqlDialectConfigManager),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/entity-relationship-model-types */ "./src/main/erdiagram/parser/types/entity-relationship-model-types.ts");
/* harmony import */ var _erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/common/case-format/StandardCaseFormats */ "./src/main/erdiagram/converter/common/case-format/StandardCaseFormats.ts");
/* harmony import */ var _erdiagram_common_config_AbstractConfigManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/common/config/AbstractConfigManager */ "./src/main/erdiagram/common/config/AbstractConfigManager.ts");
/* harmony import */ var true_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! true-json */ "./node_modules/true-json/dist/true-json.umd.js");
/* harmony import */ var true_json__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(true_json__WEBPACK_IMPORTED_MODULE_3__);




class PostgresqlDialectConfigManager extends _erdiagram_common_config_AbstractConfigManager__WEBPACK_IMPORTED_MODULE_2__["default"] {
    getDefaultConfig() {
        return {
            typeBindings: {
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.IDENTITY]: 'BIGINT',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.TEXT]: 'VARCHAR',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.LONG]: 'BIGINT',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.INT]: 'INTEGER',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.SHORT]: 'SMALLINT',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.DECIMAL]: 'DECIMAL',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.BOOLEAN]: 'BOOLEAN',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.DATE]: 'DATE',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.TIME]: 'TIME',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.DATETIME]: 'TIMESTAMP',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.BLOB]: 'BYTEA'
            },
            tableNameCaseFormat: _erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"].LOWER_UNDERSCORE,
            columnNameCaseFormat: _erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"].LOWER_UNDERSCORE,
        };
    }
    mergeConfigs(fullConfig, partialConfig) {
        return {
            ...fullConfig,
            ...partialConfig,
            typeBindings: {
                ...fullConfig.typeBindings,
                ...partialConfig?.typeBindings
            }
        };
    }
    getJsonAdapter() {
        return true_json__WEBPACK_IMPORTED_MODULE_3__.JsonAdapters.object({
            tableNameCaseFormat: true_json__WEBPACK_IMPORTED_MODULE_3__.JsonAdapters.byKeyLenient(_erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"], 'LOWER_UNDERSCORE'),
            columnNameCaseFormat: true_json__WEBPACK_IMPORTED_MODULE_3__.JsonAdapters.byKeyLenient(_erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"], 'LOWER_UNDERSCORE')
        });
    }
}
const postgresqlDialectConfigManager = new PostgresqlDialectConfigManager();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (postgresqlDialectConfigManager);


/***/ }),

/***/ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/postgresql/config/exports.ts":
/*!**************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/postgresql/config/exports.ts ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PostgresqlDialectConfigManager: () => (/* reexport safe */ _PostgresqlDialectConfigManager__WEBPACK_IMPORTED_MODULE_0__.PostgresqlDialectConfigManager),
/* harmony export */   postgresqlDialectConfigManager: () => (/* reexport safe */ _PostgresqlDialectConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _PostgresqlDialectConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PostgresqlDialectConfigManager */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/postgresql/config/PostgresqlDialectConfigManager.ts");




/***/ }),

/***/ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/postgresql/exports.ts":
/*!*******************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/postgresql/exports.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PostgresqlDialect: () => (/* reexport safe */ _erdiagram_converter_database_source_code_generator_sql_dialect_postgresql_PostgresqlDialect__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   PostgresqlDialectConfigManager: () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_1__.PostgresqlDialectConfigManager),
/* harmony export */   postgresqlDialectConfigManager: () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_1__.postgresqlDialectConfigManager)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_database_source_code_generator_sql_dialect_postgresql_PostgresqlDialect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/database/source-code-generator/sql/dialect/postgresql/PostgresqlDialect */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/postgresql/PostgresqlDialect.ts");
/* harmony import */ var _config_exports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config/exports */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/postgresql/config/exports.ts");





/***/ }),

/***/ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/sqlite/SqliteDialect.ts":
/*!*********************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/sqlite/SqliteDialect.ts ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SqliteDialect)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/common/case-format/CaseConverter */ "./src/main/erdiagram/converter/common/case-format/CaseConverter.ts");
/* harmony import */ var _erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/common/case-format/StandardCaseFormats */ "./src/main/erdiagram/converter/common/case-format/StandardCaseFormats.ts");
/* harmony import */ var _erdiagram_converter_database_source_code_generator_sql_dialect_common_SqlTypeResolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/database/source-code-generator/sql/dialect/common/SqlTypeResolver */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/common/SqlTypeResolver.ts");
/* harmony import */ var _erdiagram_converter_database_source_code_generator_sql_dialect_sqlite_column_SqliteColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/converter/database/source-code-generator/sql/dialect/sqlite/column/SqliteColumnCodeGenerator */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/sqlite/column/SqliteColumnCodeGenerator.ts");
/* harmony import */ var _erdiagram_converter_database_source_code_generator_sql_dialect_sqlite_column_SqliteIdColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/erdiagram/converter/database/source-code-generator/sql/dialect/sqlite/column/SqliteIdColumnCodeGenerator */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/sqlite/column/SqliteIdColumnCodeGenerator.ts");
/* harmony import */ var _erdiagram_converter_database_source_code_generator_sql_dialect_sqlite_column_SqliteForeignColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/erdiagram/converter/database/source-code-generator/sql/dialect/sqlite/column/SqliteForeignColumnCodeGenerator */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/sqlite/column/SqliteForeignColumnCodeGenerator.ts");
/* harmony import */ var _erdiagram_converter_database_source_code_generator_sql_dialect_sqlite_config_SqliteDialectConfigManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/erdiagram/converter/database/source-code-generator/sql/dialect/sqlite/config/SqliteDialectConfigManager */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/sqlite/config/SqliteDialectConfigManager.ts");







class SqliteDialect {
    tableNameCaseConverter;
    columnCodeGenerator;
    idColumnCodeGenerator;
    foreignColumnCodeGenerator;
    constructor(config) {
        const fullConfig = _erdiagram_converter_database_source_code_generator_sql_dialect_sqlite_config_SqliteDialectConfigManager__WEBPACK_IMPORTED_MODULE_6__["default"].mergeWithDefaultConfig(config);
        this.tableNameCaseConverter = new _erdiagram_converter_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_0__["default"](_erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"].LOWER_CAMEL, fullConfig.tableNameCaseFormat);
        const columnNameCaseConverter = new _erdiagram_converter_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_0__["default"](_erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"].LOWER_CAMEL, fullConfig.columnNameCaseFormat);
        const sqlTypeResolver = new _erdiagram_converter_database_source_code_generator_sql_dialect_common_SqlTypeResolver__WEBPACK_IMPORTED_MODULE_2__["default"](fullConfig.typeBindings);
        this.columnCodeGenerator = new _erdiagram_converter_database_source_code_generator_sql_dialect_sqlite_column_SqliteColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_3__["default"](sqlTypeResolver, columnNameCaseConverter);
        this.idColumnCodeGenerator = new _erdiagram_converter_database_source_code_generator_sql_dialect_sqlite_column_SqliteIdColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_4__["default"](sqlTypeResolver, columnNameCaseConverter);
        this.foreignColumnCodeGenerator = new _erdiagram_converter_database_source_code_generator_sql_dialect_sqlite_column_SqliteForeignColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_5__["default"](this.columnCodeGenerator, this.tableNameCaseConverter, columnNameCaseConverter);
    }
    getScriptStartCode() {
        return 'PRAGMA foreign_keys = OFF;';
    }
    getScriptEndCode() {
        return 'PRAGMA foreign_keys = ON;';
    }
    mustUseAlterTableForForeignKeys() {
        return false;
    }
    getCreateTableStartCode(tableName) {
        const outputTableName = this.tableNameCaseConverter.convertCase(tableName);
        return `CREATE TABLE "${outputTableName}" (`;
    }
    getCreateTableEndCode() {
        return ');';
    }
    getIdColumnCode(tableName, identityColumnName) {
        const outputTableName = this.tableNameCaseConverter.convertCase(tableName);
        return this.idColumnCodeGenerator.generateIdColumnCode(outputTableName, identityColumnName);
    }
    getColumnCode(tableName, column) {
        const outputTableName = this.tableNameCaseConverter.convertCase(tableName);
        return this.columnCodeGenerator.generateColumnCode(outputTableName, column);
    }
    getForeignColumnCode(tableName, reference) {
        const outputTableName = this.tableNameCaseConverter.convertCase(tableName);
        return this.foreignColumnCodeGenerator.generateForeignColumnCode(outputTableName, reference);
    }
    /* istanbul ignore next */
    getAlterTableAddCode() {
        throw new Error('Unsupported feature');
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/sqlite/column/SqliteColumnCodeGenerator.ts":
/*!****************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/sqlite/column/SqliteColumnCodeGenerator.ts ***!
  \****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SqliteColumnCodeGenerator)
/* harmony export */ });
class SqliteColumnCodeGenerator {
    typeResolver;
    columnNameCaseConverter;
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
        const { notNull, type, length } = column;
        const lineParts = [
            `"${outputColumnName}"`,
            this.generateSqliteTypeDeclaration(type, length)
        ];
        if (notNull) {
            lineParts.push('NOT NULL');
        }
        return lineParts.join(' ');
    }
    generateSqliteTypeDeclaration(type, length) {
        const sqliteType = this.typeResolver.resolveSqlType(type);
        const lengthCode = this.generateLengthCode(length);
        return sqliteType + lengthCode;
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

/***/ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/sqlite/column/SqliteForeignColumnCodeGenerator.ts":
/*!***********************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/sqlite/column/SqliteForeignColumnCodeGenerator.ts ***!
  \***********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SqliteForeignColumnCodeGenerator)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/entity-relationship-model-types */ "./src/main/erdiagram/parser/types/entity-relationship-model-types.ts");

class SqliteForeignColumnCodeGenerator {
    columnCodeGenerator;
    tableNameCaseConverter;
    columnNameCaseConverter;
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
            type: _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.IDENTITY,
            length: [],
            notNull,
            unique
        };
    }
    createForeignKeyConstraint(outputTableName, reference) {
        const outputColumnName = this.columnNameCaseConverter.convertCase(reference.columnName);
        const outputTargetTableName = this.tableNameCaseConverter.convertCase(reference.targetTableName);
        const outputTargetColumnName = this.columnNameCaseConverter.convertCase(reference.targetTableIdentityColumnName);
        return `CONSTRAINT "${outputTableName}_${outputColumnName}_fk" FOREIGN KEY ("${outputColumnName}")`
            + ` REFERENCES "${outputTargetTableName}" ("${outputTargetColumnName}")`;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/sqlite/column/SqliteIdColumnCodeGenerator.ts":
/*!******************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/sqlite/column/SqliteIdColumnCodeGenerator.ts ***!
  \******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SqliteIdColumnCodeGenerator)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/entity-relationship-model-types */ "./src/main/erdiagram/parser/types/entity-relationship-model-types.ts");

class SqliteIdColumnCodeGenerator {
    typeResolver;
    columnNameCaseConverter;
    constructor(typeResolver, columnNameCaseConverter) {
        this.typeResolver = typeResolver;
        this.columnNameCaseConverter = columnNameCaseConverter;
    }
    generateIdColumnCode(outputTableName, identityColumnName) {
        const outputIdentityColumnName = this.columnNameCaseConverter.convertCase(identityColumnName);
        return {
            columnLine: this.generateIdColumnDeclarationLine(outputIdentityColumnName)
        };
    }
    generateIdColumnDeclarationLine(outputIdentityColumnName) {
        const sqlType = this.typeResolver.resolveSqlType(_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.IDENTITY);
        return `"${outputIdentityColumnName}" ${sqlType} NOT NULL PRIMARY KEY AUTOINCREMENT`;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/sqlite/config/SqliteDialectConfigManager.ts":
/*!*****************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/sqlite/config/SqliteDialectConfigManager.ts ***!
  \*****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SqliteDialectConfigManager: () => (/* binding */ SqliteDialectConfigManager),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/entity-relationship-model-types */ "./src/main/erdiagram/parser/types/entity-relationship-model-types.ts");
/* harmony import */ var _erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/common/case-format/StandardCaseFormats */ "./src/main/erdiagram/converter/common/case-format/StandardCaseFormats.ts");
/* harmony import */ var _erdiagram_common_config_AbstractConfigManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/common/config/AbstractConfigManager */ "./src/main/erdiagram/common/config/AbstractConfigManager.ts");
/* harmony import */ var true_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! true-json */ "./node_modules/true-json/dist/true-json.umd.js");
/* harmony import */ var true_json__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(true_json__WEBPACK_IMPORTED_MODULE_3__);




class SqliteDialectConfigManager extends _erdiagram_common_config_AbstractConfigManager__WEBPACK_IMPORTED_MODULE_2__["default"] {
    getDefaultConfig() {
        return {
            typeBindings: {
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.IDENTITY]: 'INTEGER',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.TEXT]: 'TEXT',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.LONG]: 'INTEGER',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.INT]: 'INTEGER',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.SHORT]: 'INTEGER',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.DECIMAL]: 'REAL',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.BOOLEAN]: 'INTEGER',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.DATE]: 'INTEGER',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.TIME]: 'INTEGER',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.DATETIME]: 'INTEGER',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.BLOB]: 'BLOB'
            },
            tableNameCaseFormat: _erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"].LOWER_UNDERSCORE,
            columnNameCaseFormat: _erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"].LOWER_UNDERSCORE,
        };
    }
    mergeConfigs(fullConfig, partialConfig) {
        return {
            ...fullConfig,
            ...partialConfig,
            typeBindings: {
                ...fullConfig.typeBindings,
                ...partialConfig?.typeBindings
            }
        };
    }
    getJsonAdapter() {
        return true_json__WEBPACK_IMPORTED_MODULE_3__.JsonAdapters.object({
            tableNameCaseFormat: true_json__WEBPACK_IMPORTED_MODULE_3__.JsonAdapters.byKeyLenient(_erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"], 'LOWER_UNDERSCORE'),
            columnNameCaseFormat: true_json__WEBPACK_IMPORTED_MODULE_3__.JsonAdapters.byKeyLenient(_erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"], 'LOWER_UNDERSCORE')
        });
    }
}
const sqliteDialectConfigManager = new SqliteDialectConfigManager();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sqliteDialectConfigManager);


/***/ }),

/***/ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/sqlite/config/exports.ts":
/*!**********************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/sqlite/config/exports.ts ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SqliteDialectConfigManager: () => (/* reexport safe */ _SqliteDialectConfigManager__WEBPACK_IMPORTED_MODULE_0__.SqliteDialectConfigManager),
/* harmony export */   sqliteDialectConfigManager: () => (/* reexport safe */ _SqliteDialectConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _SqliteDialectConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SqliteDialectConfigManager */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/sqlite/config/SqliteDialectConfigManager.ts");




/***/ }),

/***/ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/sqlite/exports.ts":
/*!***************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/sqlite/exports.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SqliteDialect: () => (/* reexport safe */ _erdiagram_converter_database_source_code_generator_sql_dialect_sqlite_SqliteDialect__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   SqliteDialectConfigManager: () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_1__.SqliteDialectConfigManager),
/* harmony export */   sqliteDialectConfigManager: () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_1__.sqliteDialectConfigManager)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_database_source_code_generator_sql_dialect_sqlite_SqliteDialect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/database/source-code-generator/sql/dialect/sqlite/SqliteDialect */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/sqlite/SqliteDialect.ts");
/* harmony import */ var _config_exports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config/exports */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/sqlite/config/exports.ts");





/***/ }),

/***/ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/sqlserver/SqlServerDialect.ts":
/*!***************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/sqlserver/SqlServerDialect.ts ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SqlServerDialect)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/common/case-format/CaseConverter */ "./src/main/erdiagram/converter/common/case-format/CaseConverter.ts");
/* harmony import */ var _erdiagram_converter_database_source_code_generator_sql_dialect_sqlserver_column_SqlServerColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/database/source-code-generator/sql/dialect/sqlserver/column/SqlServerColumnCodeGenerator */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/sqlserver/column/SqlServerColumnCodeGenerator.ts");
/* harmony import */ var _erdiagram_converter_database_source_code_generator_sql_dialect_sqlserver_column_SqlServerIdColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/database/source-code-generator/sql/dialect/sqlserver/column/SqlServerIdColumnCodeGenerator */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/sqlserver/column/SqlServerIdColumnCodeGenerator.ts");
/* harmony import */ var _erdiagram_converter_database_source_code_generator_sql_dialect_sqlserver_column_SqlServerForeignColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/converter/database/source-code-generator/sql/dialect/sqlserver/column/SqlServerForeignColumnCodeGenerator */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/sqlserver/column/SqlServerForeignColumnCodeGenerator.ts");
/* harmony import */ var _erdiagram_converter_database_source_code_generator_sql_dialect_sqlserver_config_SqlServerDialectConfigManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/erdiagram/converter/database/source-code-generator/sql/dialect/sqlserver/config/SqlServerDialectConfigManager */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/sqlserver/config/SqlServerDialectConfigManager.ts");
/* harmony import */ var _erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/erdiagram/converter/common/case-format/StandardCaseFormats */ "./src/main/erdiagram/converter/common/case-format/StandardCaseFormats.ts");
/* harmony import */ var _erdiagram_converter_database_source_code_generator_sql_dialect_common_SqlTypeResolver__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/erdiagram/converter/database/source-code-generator/sql/dialect/common/SqlTypeResolver */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/common/SqlTypeResolver.ts");







class SqlServerDialect {
    tableNameCaseConverter;
    columnCodeGenerator;
    idColumnCodeGenerator;
    foreignColumnCodeGenerator;
    constructor(config) {
        const fullConfig = _erdiagram_converter_database_source_code_generator_sql_dialect_sqlserver_config_SqlServerDialectConfigManager__WEBPACK_IMPORTED_MODULE_4__["default"].mergeWithDefaultConfig(config);
        this.tableNameCaseConverter = new _erdiagram_converter_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_0__["default"](_erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_5__["default"].LOWER_CAMEL, fullConfig.tableNameCaseFormat);
        const columnNameCaseConverter = new _erdiagram_converter_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_0__["default"](_erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_5__["default"].LOWER_CAMEL, fullConfig.columnNameCaseFormat);
        const sqlTypeResolver = new _erdiagram_converter_database_source_code_generator_sql_dialect_common_SqlTypeResolver__WEBPACK_IMPORTED_MODULE_6__["default"](fullConfig.typeBindings);
        this.columnCodeGenerator = new _erdiagram_converter_database_source_code_generator_sql_dialect_sqlserver_column_SqlServerColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_1__["default"](sqlTypeResolver, columnNameCaseConverter);
        this.idColumnCodeGenerator = new _erdiagram_converter_database_source_code_generator_sql_dialect_sqlserver_column_SqlServerIdColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_2__["default"](sqlTypeResolver, columnNameCaseConverter);
        this.foreignColumnCodeGenerator = new _erdiagram_converter_database_source_code_generator_sql_dialect_sqlserver_column_SqlServerForeignColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_3__["default"](this.columnCodeGenerator, this.tableNameCaseConverter, columnNameCaseConverter);
    }
    getScriptStartCode() {
        return '';
    }
    getScriptEndCode() {
        return '';
    }
    mustUseAlterTableForForeignKeys() {
        return true;
    }
    getCreateTableStartCode(tableName) {
        const outputTableName = this.tableNameCaseConverter.convertCase(tableName);
        return `CREATE TABLE "${outputTableName}" (`;
    }
    getCreateTableEndCode() {
        return ');';
    }
    getIdColumnCode(tableName, identityColumnName) {
        const outputTableName = this.tableNameCaseConverter.convertCase(tableName);
        return this.idColumnCodeGenerator.generateIdColumnCode(outputTableName, identityColumnName);
    }
    getColumnCode(tableName, column) {
        const outputTableName = this.tableNameCaseConverter.convertCase(tableName);
        return this.columnCodeGenerator.generateColumnCode(outputTableName, column);
    }
    getForeignColumnCode(tableName, reference) {
        const outputTableName = this.tableNameCaseConverter.convertCase(tableName);
        return this.foreignColumnCodeGenerator.generateForeignColumnCode(outputTableName, reference);
    }
    getAlterTableAddCode(tableName, constraintCode) {
        const outputTableName = this.tableNameCaseConverter.convertCase(tableName);
        return `ALTER TABLE "${outputTableName}" ADD ${constraintCode};`;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/sqlserver/column/SqlServerColumnCodeGenerator.ts":
/*!**********************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/sqlserver/column/SqlServerColumnCodeGenerator.ts ***!
  \**********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SqlServerColumnCodeGenerator)
/* harmony export */ });
class SqlServerColumnCodeGenerator {
    typeResolver;
    columnNameCaseConverter;
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
        const { notNull, type, length } = column;
        const lineParts = [
            `"${outputColumnName}"`,
            this.generateSqlServerTypeDeclaration(type, length)
        ];
        if (notNull) {
            lineParts.push('NOT NULL');
        }
        return lineParts.join(' ');
    }
    generateSqlServerTypeDeclaration(type, length) {
        const sqlServerType = this.typeResolver.resolveSqlType(type);
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

/***/ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/sqlserver/column/SqlServerForeignColumnCodeGenerator.ts":
/*!*****************************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/sqlserver/column/SqlServerForeignColumnCodeGenerator.ts ***!
  \*****************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SqlServerForeignColumnCodeGenerator)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/entity-relationship-model-types */ "./src/main/erdiagram/parser/types/entity-relationship-model-types.ts");

class SqlServerForeignColumnCodeGenerator {
    columnCodeGenerator;
    tableNameCaseConverter;
    columnNameCaseConverter;
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
            type: _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.IDENTITY,
            length: [],
            notNull,
            unique
        };
    }
    createForeignKeyConstraint(outputTableName, reference) {
        const outputColumnName = this.columnNameCaseConverter.convertCase(reference.columnName);
        const outputTargetTableName = this.tableNameCaseConverter.convertCase(reference.targetTableName);
        const outputTargetColumnName = this.columnNameCaseConverter.convertCase(reference.targetTableIdentityColumnName);
        return `CONSTRAINT "${outputTableName}_${outputColumnName}_fk" FOREIGN KEY ("${outputColumnName}")`
            + ` REFERENCES "${outputTargetTableName}" ("${outputTargetColumnName}")`;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/sqlserver/column/SqlServerIdColumnCodeGenerator.ts":
/*!************************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/sqlserver/column/SqlServerIdColumnCodeGenerator.ts ***!
  \************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SqlServerIdColumnCodeGenerator)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/entity-relationship-model-types */ "./src/main/erdiagram/parser/types/entity-relationship-model-types.ts");

class SqlServerIdColumnCodeGenerator {
    typeResolver;
    columnNameCaseConverter;
    constructor(typeResolver, columnNameCaseConverter) {
        this.typeResolver = typeResolver;
        this.columnNameCaseConverter = columnNameCaseConverter;
    }
    generateIdColumnCode(outputTableName, identityColumnName) {
        const outputIdentityColumnName = this.columnNameCaseConverter.convertCase(identityColumnName);
        return {
            columnLine: this.generateIdColumnDeclarationLine(outputIdentityColumnName),
            pkConstraintLine: this.createPrimaryKeyConstraint(outputTableName, outputIdentityColumnName)
        };
    }
    generateIdColumnDeclarationLine(outputIdentityColumnName) {
        const sqlType = this.typeResolver.resolveSqlType(_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.IDENTITY);
        return `"${outputIdentityColumnName}" ${sqlType} NOT NULL IDENTITY(1, 1)`;
    }
    createPrimaryKeyConstraint(outputTableName, outputIdentityColumnName) {
        return `CONSTRAINT "${outputTableName}_pk" PRIMARY KEY ("${outputIdentityColumnName}")`;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/sqlserver/config/SqlServerDialectConfigManager.ts":
/*!***********************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/sqlserver/config/SqlServerDialectConfigManager.ts ***!
  \***********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SqlServerDialectConfigManager: () => (/* binding */ SqlServerDialectConfigManager),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/entity-relationship-model-types */ "./src/main/erdiagram/parser/types/entity-relationship-model-types.ts");
/* harmony import */ var _erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/common/case-format/StandardCaseFormats */ "./src/main/erdiagram/converter/common/case-format/StandardCaseFormats.ts");
/* harmony import */ var _erdiagram_common_config_AbstractConfigManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/common/config/AbstractConfigManager */ "./src/main/erdiagram/common/config/AbstractConfigManager.ts");
/* harmony import */ var true_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! true-json */ "./node_modules/true-json/dist/true-json.umd.js");
/* harmony import */ var true_json__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(true_json__WEBPACK_IMPORTED_MODULE_3__);




class SqlServerDialectConfigManager extends _erdiagram_common_config_AbstractConfigManager__WEBPACK_IMPORTED_MODULE_2__["default"] {
    getDefaultConfig() {
        return {
            typeBindings: {
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.IDENTITY]: 'BIGINT',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.TEXT]: 'NVARCHAR',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.LONG]: 'BIGINT',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.INT]: 'INT',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.SHORT]: 'SMALLINT',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.DECIMAL]: 'DECIMAL',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.BOOLEAN]: 'BIT',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.DATE]: 'DATE',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.TIME]: 'TIME',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.DATETIME]: 'DATETIME2',
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.BLOB]: 'VARBINARY(MAX)'
            },
            tableNameCaseFormat: _erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"].UPPER_CAMEL,
            columnNameCaseFormat: _erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"].UPPER_CAMEL,
        };
    }
    mergeConfigs(fullConfig, partialConfig) {
        return {
            ...fullConfig,
            ...partialConfig,
            typeBindings: {
                ...fullConfig.typeBindings,
                ...partialConfig?.typeBindings
            }
        };
    }
    getJsonAdapter() {
        return true_json__WEBPACK_IMPORTED_MODULE_3__.JsonAdapters.object({
            tableNameCaseFormat: true_json__WEBPACK_IMPORTED_MODULE_3__.JsonAdapters.byKeyLenient(_erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"], 'UPPER_CAMEL'),
            columnNameCaseFormat: true_json__WEBPACK_IMPORTED_MODULE_3__.JsonAdapters.byKeyLenient(_erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"], 'UPPER_CAMEL')
        });
    }
}
const sqlServerDialectConfigManager = new SqlServerDialectConfigManager();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sqlServerDialectConfigManager);


/***/ }),

/***/ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/sqlserver/config/exports.ts":
/*!*************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/sqlserver/config/exports.ts ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SqlServerDialectConfigManager: () => (/* reexport safe */ _SqlServerDialectConfigManager__WEBPACK_IMPORTED_MODULE_0__.SqlServerDialectConfigManager),
/* harmony export */   sqlServerDialectConfigManager: () => (/* reexport safe */ _SqlServerDialectConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _SqlServerDialectConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SqlServerDialectConfigManager */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/sqlserver/config/SqlServerDialectConfigManager.ts");




/***/ }),

/***/ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/sqlserver/exports.ts":
/*!******************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/sqlserver/exports.ts ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SqlServerDialect: () => (/* reexport safe */ _erdiagram_converter_database_source_code_generator_sql_dialect_sqlserver_SqlServerDialect__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   SqlServerDialectConfigManager: () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_1__.SqlServerDialectConfigManager),
/* harmony export */   sqlServerDialectConfigManager: () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_1__.sqlServerDialectConfigManager)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_database_source_code_generator_sql_dialect_sqlserver_SqlServerDialect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/database/source-code-generator/sql/dialect/sqlserver/SqlServerDialect */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/sqlserver/SqlServerDialect.ts");
/* harmony import */ var _config_exports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config/exports */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/sqlserver/config/exports.ts");





/***/ }),

/***/ "./src/main/erdiagram/converter/database/source-code-generator/sql/exports.ts":
/*!************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/source-code-generator/sql/exports.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DatabaseModelToSqlCodeConverter: () => (/* reexport safe */ _erdiagram_converter_database_source_code_generator_sql_DatabaseModelToSqlCodeConverter__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   MysqlDialect: () => (/* reexport safe */ _dialect_exports__WEBPACK_IMPORTED_MODULE_1__.MysqlDialect),
/* harmony export */   MysqlDialectConfigManager: () => (/* reexport safe */ _dialect_exports__WEBPACK_IMPORTED_MODULE_1__.MysqlDialectConfigManager),
/* harmony export */   OracleDialect: () => (/* reexport safe */ _dialect_exports__WEBPACK_IMPORTED_MODULE_1__.OracleDialect),
/* harmony export */   OracleDialectConfigManager: () => (/* reexport safe */ _dialect_exports__WEBPACK_IMPORTED_MODULE_1__.OracleDialectConfigManager),
/* harmony export */   PostgresqlDialect: () => (/* reexport safe */ _dialect_exports__WEBPACK_IMPORTED_MODULE_1__.PostgresqlDialect),
/* harmony export */   PostgresqlDialectConfigManager: () => (/* reexport safe */ _dialect_exports__WEBPACK_IMPORTED_MODULE_1__.PostgresqlDialectConfigManager),
/* harmony export */   SqlServerDialect: () => (/* reexport safe */ _dialect_exports__WEBPACK_IMPORTED_MODULE_1__.SqlServerDialect),
/* harmony export */   SqlServerDialectConfigManager: () => (/* reexport safe */ _dialect_exports__WEBPACK_IMPORTED_MODULE_1__.SqlServerDialectConfigManager),
/* harmony export */   SqliteDialect: () => (/* reexport safe */ _dialect_exports__WEBPACK_IMPORTED_MODULE_1__.SqliteDialect),
/* harmony export */   SqliteDialectConfigManager: () => (/* reexport safe */ _dialect_exports__WEBPACK_IMPORTED_MODULE_1__.SqliteDialectConfigManager),
/* harmony export */   mysqlDialectConfigManager: () => (/* reexport safe */ _dialect_exports__WEBPACK_IMPORTED_MODULE_1__.mysqlDialectConfigManager),
/* harmony export */   oracleDialectConfigManager: () => (/* reexport safe */ _dialect_exports__WEBPACK_IMPORTED_MODULE_1__.oracleDialectConfigManager),
/* harmony export */   postgresqlDialectConfigManager: () => (/* reexport safe */ _dialect_exports__WEBPACK_IMPORTED_MODULE_1__.postgresqlDialectConfigManager),
/* harmony export */   sqlServerDialectConfigManager: () => (/* reexport safe */ _dialect_exports__WEBPACK_IMPORTED_MODULE_1__.sqlServerDialectConfigManager),
/* harmony export */   sqliteDialectConfigManager: () => (/* reexport safe */ _dialect_exports__WEBPACK_IMPORTED_MODULE_1__.sqliteDialectConfigManager)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_database_source_code_generator_sql_DatabaseModelToSqlCodeConverter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/database/source-code-generator/sql/DatabaseModelToSqlCodeConverter */ "./src/main/erdiagram/converter/database/source-code-generator/sql/DatabaseModelToSqlCodeConverter.ts");
/* harmony import */ var _dialect_exports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dialect/exports */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/exports.ts");





/***/ }),

/***/ "./src/main/erdiagram/converter/diagram/common/config/DiagramLevel.ts":
/*!****************************************************************************!*\
  !*** ./src/main/erdiagram/converter/diagram/common/config/DiagramLevel.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var DiagramLevel;
(function (DiagramLevel) {
    DiagramLevel["CONCEPTUAL"] = "conceptual";
    DiagramLevel["LOGICAL"] = "logical";
})(DiagramLevel || (DiagramLevel = {}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DiagramLevel);


/***/ }),

/***/ "./src/main/erdiagram/converter/diagram/common/config/exports.ts":
/*!***********************************************************************!*\
  !*** ./src/main/erdiagram/converter/diagram/common/config/exports.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DiagramLevel: () => (/* reexport safe */ _DiagramLevel__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _DiagramLevel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DiagramLevel */ "./src/main/erdiagram/converter/diagram/common/config/DiagramLevel.ts");




/***/ }),

/***/ "./src/main/erdiagram/converter/diagram/common/exports.ts":
/*!****************************************************************!*\
  !*** ./src/main/erdiagram/converter/diagram/common/exports.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DiagramLevel: () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_0__.DiagramLevel)
/* harmony export */ });
/* harmony import */ var _config_exports__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config/exports */ "./src/main/erdiagram/converter/diagram/common/config/exports.ts");



/***/ }),

/***/ "./src/main/erdiagram/converter/diagram/exports.ts":
/*!*********************************************************!*\
  !*** ./src/main/erdiagram/converter/diagram/exports.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DiagramLevel: () => (/* reexport safe */ _common_exports__WEBPACK_IMPORTED_MODULE_0__.DiagramLevel),
/* harmony export */   NomnomlConfigManager: () => (/* reexport safe */ _nomnoml_exports__WEBPACK_IMPORTED_MODULE_1__.NomnomlConfigManager),
/* harmony export */   NomnomlSourceCodeGenerator: () => (/* reexport safe */ _nomnoml_exports__WEBPACK_IMPORTED_MODULE_1__.NomnomlSourceCodeGenerator),
/* harmony export */   PlantUmlConfigManager: () => (/* reexport safe */ _plantuml_exports__WEBPACK_IMPORTED_MODULE_2__.PlantUmlConfigManager),
/* harmony export */   PlantUmlSourceCodeGenerator: () => (/* reexport safe */ _plantuml_exports__WEBPACK_IMPORTED_MODULE_2__.PlantUmlSourceCodeGenerator),
/* harmony export */   nomnomlConfigManager: () => (/* reexport safe */ _nomnoml_exports__WEBPACK_IMPORTED_MODULE_1__.nomnomlConfigManager),
/* harmony export */   plantUmlConfigManager: () => (/* reexport safe */ _plantuml_exports__WEBPACK_IMPORTED_MODULE_2__.plantUmlConfigManager)
/* harmony export */ });
/* harmony import */ var _common_exports__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common/exports */ "./src/main/erdiagram/converter/diagram/common/exports.ts");
/* harmony import */ var _nomnoml_exports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./nomnoml/exports */ "./src/main/erdiagram/converter/diagram/nomnoml/exports.ts");
/* harmony import */ var _plantuml_exports__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./plantuml/exports */ "./src/main/erdiagram/converter/diagram/plantuml/exports.ts");





/***/ }),

/***/ "./src/main/erdiagram/converter/diagram/nomnoml/NomnomlSourceCodeGenerator.ts":
/*!************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/diagram/nomnoml/NomnomlSourceCodeGenerator.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NomnomlSourceCodeGenerator)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_diagram_nomnoml_entity_NomnomlEntityCodeGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/diagram/nomnoml/entity/NomnomlEntityCodeGenerator */ "./src/main/erdiagram/converter/diagram/nomnoml/entity/NomnomlEntityCodeGenerator.ts");
/* harmony import */ var _erdiagram_converter_diagram_nomnoml_relationship_NomnomlRelationshipCodeGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/diagram/nomnoml/relationship/NomnomlRelationshipCodeGenerator */ "./src/main/erdiagram/converter/diagram/nomnoml/relationship/NomnomlRelationshipCodeGenerator.ts");
/* harmony import */ var _erdiagram_converter_diagram_nomnoml_config_NomnomlConfigManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/diagram/nomnoml/config/NomnomlConfigManager */ "./src/main/erdiagram/converter/diagram/nomnoml/config/NomnomlConfigManager.ts");
/* harmony import */ var _erdiagram_converter_diagram_nomnoml_directive_NomnomlDirectivesCodeGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/converter/diagram/nomnoml/directive/NomnomlDirectivesCodeGenerator */ "./src/main/erdiagram/converter/diagram/nomnoml/directive/NomnomlDirectivesCodeGenerator.ts");




class NomnomlSourceCodeGenerator {
    config;
    entityCodeGenerator;
    relationshipCodeGenerator;
    directivesCodeGenerator;
    constructor(config) {
        this.config = _erdiagram_converter_diagram_nomnoml_config_NomnomlConfigManager__WEBPACK_IMPORTED_MODULE_2__["default"].mergeWithDefaultConfig(config);
        this.entityCodeGenerator = new _erdiagram_converter_diagram_nomnoml_entity_NomnomlEntityCodeGenerator__WEBPACK_IMPORTED_MODULE_0__["default"](this.config.diagramLevel);
        this.relationshipCodeGenerator = new _erdiagram_converter_diagram_nomnoml_relationship_NomnomlRelationshipCodeGenerator__WEBPACK_IMPORTED_MODULE_1__["default"]();
        this.directivesCodeGenerator = new _erdiagram_converter_diagram_nomnoml_directive_NomnomlDirectivesCodeGenerator__WEBPACK_IMPORTED_MODULE_3__["default"]();
    }
    generateSourceCode(model) {
        return [
            ...model.entities.map(entity => this.entityCodeGenerator.generateEntityCode(entity)),
            ...model.relationships.map(relationship => this.relationshipCodeGenerator.generateRelationshipCode(relationship)),
            this.directivesCodeGenerator.generateDirectivesCode(this.config.style)
        ].join('\n\n');
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/diagram/nomnoml/config/NomnomlConfigManager.ts":
/*!*************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/diagram/nomnoml/config/NomnomlConfigManager.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NomnomlConfigManager: () => (/* binding */ NomnomlConfigManager),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _erdiagram_common_config_AbstractConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/common/config/AbstractConfigManager */ "./src/main/erdiagram/common/config/AbstractConfigManager.ts");
/* harmony import */ var _erdiagram_converter_diagram_common_config_DiagramLevel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/diagram/common/config/DiagramLevel */ "./src/main/erdiagram/converter/diagram/common/config/DiagramLevel.ts");


class NomnomlConfigManager extends _erdiagram_common_config_AbstractConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"] {
    getDefaultConfig() {
        return {
            diagramLevel: _erdiagram_converter_diagram_common_config_DiagramLevel__WEBPACK_IMPORTED_MODULE_1__["default"].LOGICAL,
            style: {
                arrowSize: 1,
                bendSize: undefined,
                direction: undefined,
                gutter: undefined,
                edgeMargin: undefined,
                gravity: 1.5,
                edges: undefined,
                background: 'transparent',
                fill: '#fefece',
                fillArrows: undefined,
                font: undefined,
                fontSize: undefined,
                leading: undefined,
                lineWidth: 1,
                padding: undefined,
                spacing: undefined,
                stroke: '#333333',
                title: undefined,
                zoom: undefined,
                acyclicer: undefined,
                ranker: 'longest-path'
            }
        };
    }
    mergeConfigs(fullConfig, partialConfig) {
        return {
            ...fullConfig,
            ...partialConfig,
            style: {
                ...fullConfig.style,
                ...partialConfig?.style,
            }
        };
    }
}
const nomnomlConfigManager = new NomnomlConfigManager();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (nomnomlConfigManager);


/***/ }),

/***/ "./src/main/erdiagram/converter/diagram/nomnoml/config/exports.ts":
/*!************************************************************************!*\
  !*** ./src/main/erdiagram/converter/diagram/nomnoml/config/exports.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NomnomlConfigManager: () => (/* reexport safe */ _NomnomlConfigManager__WEBPACK_IMPORTED_MODULE_0__.NomnomlConfigManager),
/* harmony export */   nomnomlConfigManager: () => (/* reexport safe */ _NomnomlConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _NomnomlConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NomnomlConfigManager */ "./src/main/erdiagram/converter/diagram/nomnoml/config/NomnomlConfigManager.ts");




/***/ }),

/***/ "./src/main/erdiagram/converter/diagram/nomnoml/directive/NomnomlDirectivesCodeGenerator.ts":
/*!**************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/diagram/nomnoml/directive/NomnomlDirectivesCodeGenerator.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NomnomlDirectivesCodeGenerator)
/* harmony export */ });
class NomnomlDirectivesCodeGenerator {
    generateDirectivesCode(styleConfig) {
        return Object.entries(styleConfig)
            .filter(([, value]) => value != null && value !== '')
            .map(([key, value]) => `#${key}: ${value}`)
            .join('\n');
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/diagram/nomnoml/entity/NomnomlEntityCodeGenerator.ts":
/*!*******************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/diagram/nomnoml/entity/NomnomlEntityCodeGenerator.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NomnomlEntityCodeGenerator)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_diagram_nomnoml_entity_NomnomlEntityIdentityPropertyCodeGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/diagram/nomnoml/entity/NomnomlEntityIdentityPropertyCodeGenerator */ "./src/main/erdiagram/converter/diagram/nomnoml/entity/NomnomlEntityIdentityPropertyCodeGenerator.ts");
/* harmony import */ var _erdiagram_converter_diagram_nomnoml_entity_NomnomlEntityPropertyCodeGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/diagram/nomnoml/entity/NomnomlEntityPropertyCodeGenerator */ "./src/main/erdiagram/converter/diagram/nomnoml/entity/NomnomlEntityPropertyCodeGenerator.ts");
/* harmony import */ var _erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/util/indent-utils */ "./src/main/erdiagram/util/indent-utils.ts");
/* harmony import */ var _erdiagram_converter_diagram_common_config_DiagramLevel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/converter/diagram/common/config/DiagramLevel */ "./src/main/erdiagram/converter/diagram/common/config/DiagramLevel.ts");




class NomnomlEntityCodeGenerator {
    entityIdentityPropertyCodeGenerator = new _erdiagram_converter_diagram_nomnoml_entity_NomnomlEntityIdentityPropertyCodeGenerator__WEBPACK_IMPORTED_MODULE_0__["default"]();
    entityPropertyCodeGenerator = new _erdiagram_converter_diagram_nomnoml_entity_NomnomlEntityPropertyCodeGenerator__WEBPACK_IMPORTED_MODULE_1__["default"]();
    diagramLevel;
    constructor(diagramLevel) {
        this.diagramLevel = diagramLevel;
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
        if (this.diagramLevel === _erdiagram_converter_diagram_common_config_DiagramLevel__WEBPACK_IMPORTED_MODULE_3__["default"].CONCEPTUAL) {
            return '';
        }
        const { identityPropertyName, properties } = entity;
        const propertiesCode = properties.map(property => this.entityPropertyCodeGenerator.generateEntityPropertyCode(property));
        if (identityPropertyName) {
            propertiesCode.unshift(this.entityIdentityPropertyCodeGenerator.generateEntityIdentityPropertyCode(identityPropertyName));
        }
        return (0,_erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_2__.indentLines)(propertiesCode).join('\n');
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/diagram/nomnoml/entity/NomnomlEntityIdentityPropertyCodeGenerator.ts":
/*!***********************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/diagram/nomnoml/entity/NomnomlEntityIdentityPropertyCodeGenerator.ts ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NomnomlEntityIdentityPropertyCodeGenerator)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/entity-relationship-model-types */ "./src/main/erdiagram/parser/types/entity-relationship-model-types.ts");

class NomnomlEntityIdentityPropertyCodeGenerator {
    generateEntityIdentityPropertyCode(identityPropertyName) {
        return `${identityPropertyName}: ${_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.IDENTITY}`;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/diagram/nomnoml/entity/NomnomlEntityPropertyCodeGenerator.ts":
/*!***************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/diagram/nomnoml/entity/NomnomlEntityPropertyCodeGenerator.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NomnomlEntityPropertyCodeGenerator)
/* harmony export */ });
class NomnomlEntityPropertyCodeGenerator {
    generateEntityPropertyCode(property) {
        const { name, type, length, optional, unique } = property;
        const typeWithLengthCode = this.getTypeWithLengthCode(type, length);
        const modifiersCode = this.getModifiersCode(optional, unique);
        return `${name}${modifiersCode}: ${typeWithLengthCode}`;
    }
    getTypeWithLengthCode(type, length) {
        if (length.length === 0) {
            return type;
        }
        return `${type}(${length.join(', ')})`;
    }
    getModifiersCode(optional, unique) {
        const optionalModifierCode = optional ? '?' : '';
        const uniqueModifierCode = unique ? '!' : '';
        return optionalModifierCode + uniqueModifierCode;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/diagram/nomnoml/exports.ts":
/*!*****************************************************************!*\
  !*** ./src/main/erdiagram/converter/diagram/nomnoml/exports.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NomnomlConfigManager: () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_1__.NomnomlConfigManager),
/* harmony export */   NomnomlSourceCodeGenerator: () => (/* reexport safe */ _NomnomlSourceCodeGenerator__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   nomnomlConfigManager: () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_1__.nomnomlConfigManager)
/* harmony export */ });
/* harmony import */ var _NomnomlSourceCodeGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NomnomlSourceCodeGenerator */ "./src/main/erdiagram/converter/diagram/nomnoml/NomnomlSourceCodeGenerator.ts");
/* harmony import */ var _config_exports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config/exports */ "./src/main/erdiagram/converter/diagram/nomnoml/config/exports.ts");





/***/ }),

/***/ "./src/main/erdiagram/converter/diagram/nomnoml/relationship/NomnomlNamedRelationshipCodeGenerator.ts":
/*!************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/diagram/nomnoml/relationship/NomnomlNamedRelationshipCodeGenerator.ts ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NomnomlNamedRelationshipCodeGenerator)
/* harmony export */ });
class NomnomlNamedRelationshipCodeGenerator {
    relationshipDirectionCodeGenerator;
    relationshipCardinalityCodeGenerator;
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

/***/ "./src/main/erdiagram/converter/diagram/nomnoml/relationship/NomnomlRelationshipCardinalityCodeGenerator.ts":
/*!******************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/diagram/nomnoml/relationship/NomnomlRelationshipCardinalityCodeGenerator.ts ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NomnomlRelationshipCardinalityCodeGenerator)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/entity-relationship-model-types */ "./src/main/erdiagram/parser/types/entity-relationship-model-types.ts");

class NomnomlRelationshipCardinalityCodeGenerator {
    generateCardinalityCode(cardinality) {
        switch (cardinality) {
            case _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.Cardinality.ZERO_OR_ONE:
                return '0..1';
            case _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.Cardinality.ONE:
                return '1';
            case _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.Cardinality.MANY:
                return '*';
        }
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/diagram/nomnoml/relationship/NomnomlRelationshipCodeGenerator.ts":
/*!*******************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/diagram/nomnoml/relationship/NomnomlRelationshipCodeGenerator.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NomnomlRelationshipCodeGenerator)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_diagram_nomnoml_relationship_NomnomlRelationshipDirectionCodeGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/diagram/nomnoml/relationship/NomnomlRelationshipDirectionCodeGenerator */ "./src/main/erdiagram/converter/diagram/nomnoml/relationship/NomnomlRelationshipDirectionCodeGenerator.ts");
/* harmony import */ var _erdiagram_converter_diagram_nomnoml_relationship_NomnomlRelationshipCardinalityCodeGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/diagram/nomnoml/relationship/NomnomlRelationshipCardinalityCodeGenerator */ "./src/main/erdiagram/converter/diagram/nomnoml/relationship/NomnomlRelationshipCardinalityCodeGenerator.ts");
/* harmony import */ var _erdiagram_converter_diagram_nomnoml_relationship_NomnomlUnnamedRelationshipCodeGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/diagram/nomnoml/relationship/NomnomlUnnamedRelationshipCodeGenerator */ "./src/main/erdiagram/converter/diagram/nomnoml/relationship/NomnomlUnnamedRelationshipCodeGenerator.ts");
/* harmony import */ var _erdiagram_converter_diagram_nomnoml_relationship_NomnomlNamedRelationshipCodeGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/converter/diagram/nomnoml/relationship/NomnomlNamedRelationshipCodeGenerator */ "./src/main/erdiagram/converter/diagram/nomnoml/relationship/NomnomlNamedRelationshipCodeGenerator.ts");




class NomnomlRelationshipCodeGenerator {
    relationshipDirectionCodeGenerator = new _erdiagram_converter_diagram_nomnoml_relationship_NomnomlRelationshipDirectionCodeGenerator__WEBPACK_IMPORTED_MODULE_0__["default"]();
    relationshipCardinalityCodeGenerator = new _erdiagram_converter_diagram_nomnoml_relationship_NomnomlRelationshipCardinalityCodeGenerator__WEBPACK_IMPORTED_MODULE_1__["default"]();
    namedRelationshipCodeGenerator = new _erdiagram_converter_diagram_nomnoml_relationship_NomnomlNamedRelationshipCodeGenerator__WEBPACK_IMPORTED_MODULE_3__["default"](this.relationshipDirectionCodeGenerator, this.relationshipCardinalityCodeGenerator);
    unnamedRelationshipCodeGenerator = new _erdiagram_converter_diagram_nomnoml_relationship_NomnomlUnnamedRelationshipCodeGenerator__WEBPACK_IMPORTED_MODULE_2__["default"](this.relationshipDirectionCodeGenerator, this.relationshipCardinalityCodeGenerator);
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

/***/ "./src/main/erdiagram/converter/diagram/nomnoml/relationship/NomnomlRelationshipDirectionCodeGenerator.ts":
/*!****************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/diagram/nomnoml/relationship/NomnomlRelationshipDirectionCodeGenerator.ts ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NomnomlRelationshipDirectionCodeGenerator)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/entity-relationship-model-types */ "./src/main/erdiagram/parser/types/entity-relationship-model-types.ts");

class NomnomlRelationshipDirectionCodeGenerator {
    generateDirectionCode(direction) {
        switch (direction) {
            case _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.Direction.LEFT_TO_RIGHT:
                return '->';
            case _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.Direction.RIGHT_TO_LEFT:
                return '<-';
            case _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.Direction.BIDIRECTIONAL:
                return '<->';
        }
    }
    generateLeftSideDirectionCode(direction) {
        return [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.Direction.RIGHT_TO_LEFT, _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.Direction.BIDIRECTIONAL].includes(direction) ? '<-' : '-';
    }
    generateRightSideDirectionCode(direction) {
        return [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.Direction.LEFT_TO_RIGHT, _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.Direction.BIDIRECTIONAL].includes(direction) ? '->' : '-';
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/diagram/nomnoml/relationship/NomnomlUnnamedRelationshipCodeGenerator.ts":
/*!**************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/diagram/nomnoml/relationship/NomnomlUnnamedRelationshipCodeGenerator.ts ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NomnomlUnnamedRelationshipCodeGenerator)
/* harmony export */ });
class NomnomlUnnamedRelationshipCodeGenerator {
    relationshipDirectionCodeGenerator;
    relationshipCardinalityCodeGenerator;
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

/***/ "./src/main/erdiagram/converter/diagram/plantuml/PlantUmlSourceCodeGenerator.ts":
/*!**************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/diagram/plantuml/PlantUmlSourceCodeGenerator.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PlantUmlSourceCodeGenerator)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_diagram_plantuml_entity_PlantUmlEntityCodeGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/diagram/plantuml/entity/PlantUmlEntityCodeGenerator */ "./src/main/erdiagram/converter/diagram/plantuml/entity/PlantUmlEntityCodeGenerator.ts");
/* harmony import */ var _erdiagram_converter_diagram_plantuml_relationship_PlantUmlRelationshipCodeGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/diagram/plantuml/relationship/PlantUmlRelationshipCodeGenerator */ "./src/main/erdiagram/converter/diagram/plantuml/relationship/PlantUmlRelationshipCodeGenerator.ts");
/* harmony import */ var _erdiagram_converter_diagram_plantuml_config_PlantUmlConfigManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/diagram/plantuml/config/PlantUmlConfigManager */ "./src/main/erdiagram/converter/diagram/plantuml/config/PlantUmlConfigManager.ts");
/* harmony import */ var _erdiagram_converter_diagram_plantuml_entity_PlantUmlDirectivesCodeGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/converter/diagram/plantuml/entity/PlantUmlDirectivesCodeGenerator */ "./src/main/erdiagram/converter/diagram/plantuml/entity/PlantUmlDirectivesCodeGenerator.ts");




class PlantUmlSourceCodeGenerator {
    config;
    entityCodeGenerator;
    relationshipCodeGenerator;
    directivesCodeGenerator;
    constructor(config) {
        this.config = _erdiagram_converter_diagram_plantuml_config_PlantUmlConfigManager__WEBPACK_IMPORTED_MODULE_2__["default"].mergeWithDefaultConfig(config);
        this.entityCodeGenerator = new _erdiagram_converter_diagram_plantuml_entity_PlantUmlEntityCodeGenerator__WEBPACK_IMPORTED_MODULE_0__["default"](this.config.diagramLevel);
        this.relationshipCodeGenerator = new _erdiagram_converter_diagram_plantuml_relationship_PlantUmlRelationshipCodeGenerator__WEBPACK_IMPORTED_MODULE_1__["default"]();
        this.directivesCodeGenerator = new _erdiagram_converter_diagram_plantuml_entity_PlantUmlDirectivesCodeGenerator__WEBPACK_IMPORTED_MODULE_3__["default"](this.config.diagramLevel);
    }
    generateSourceCode(model) {
        const codeBlocks = [
            '@startuml',
            ...model.entities.map(entity => this.entityCodeGenerator.generateEntityCode(entity)),
            ...model.relationships.map(relationship => this.relationshipCodeGenerator.generateRelationshipCode(relationship)),
        ];
        const directivesCode = this.directivesCodeGenerator.generate();
        if (directivesCode) {
            codeBlocks.push(directivesCode);
        }
        codeBlocks.push('@enduml');
        return codeBlocks.join('\n\n');
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/diagram/plantuml/config/PlantUmlConfigManager.ts":
/*!***************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/diagram/plantuml/config/PlantUmlConfigManager.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlantUmlConfigManager: () => (/* binding */ PlantUmlConfigManager),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _erdiagram_common_config_AbstractConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/common/config/AbstractConfigManager */ "./src/main/erdiagram/common/config/AbstractConfigManager.ts");
/* harmony import */ var _erdiagram_converter_diagram_common_config_DiagramLevel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/diagram/common/config/DiagramLevel */ "./src/main/erdiagram/converter/diagram/common/config/DiagramLevel.ts");


class PlantUmlConfigManager extends _erdiagram_common_config_AbstractConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"] {
    getDefaultConfig() {
        return {
            diagramLevel: _erdiagram_converter_diagram_common_config_DiagramLevel__WEBPACK_IMPORTED_MODULE_1__["default"].LOGICAL,
        };
    }
    mergeConfigs(fullConfig, partialConfig) {
        return {
            ...fullConfig,
            ...partialConfig,
        };
    }
}
const plantUmlConfigManager = new PlantUmlConfigManager();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plantUmlConfigManager);


/***/ }),

/***/ "./src/main/erdiagram/converter/diagram/plantuml/config/exports.ts":
/*!*************************************************************************!*\
  !*** ./src/main/erdiagram/converter/diagram/plantuml/config/exports.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlantUmlConfigManager: () => (/* reexport safe */ _PlantUmlConfigManager__WEBPACK_IMPORTED_MODULE_0__.PlantUmlConfigManager),
/* harmony export */   plantUmlConfigManager: () => (/* reexport safe */ _PlantUmlConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _PlantUmlConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PlantUmlConfigManager */ "./src/main/erdiagram/converter/diagram/plantuml/config/PlantUmlConfigManager.ts");




/***/ }),

/***/ "./src/main/erdiagram/converter/diagram/plantuml/entity/PlantUmlDirectivesCodeGenerator.ts":
/*!*************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/diagram/plantuml/entity/PlantUmlDirectivesCodeGenerator.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PlantUmlDirectivesCodeGenerator)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_diagram_common_config_DiagramLevel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/diagram/common/config/DiagramLevel */ "./src/main/erdiagram/converter/diagram/common/config/DiagramLevel.ts");

class PlantUmlDirectivesCodeGenerator {
    diagramLevel;
    constructor(diagramLevel) {
        this.diagramLevel = diagramLevel;
    }
    generate() {
        if (this.diagramLevel !== _erdiagram_converter_diagram_common_config_DiagramLevel__WEBPACK_IMPORTED_MODULE_0__["default"].CONCEPTUAL) {
            return '';
        }
        return `hide members
hide methods`;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/diagram/plantuml/entity/PlantUmlEntityCodeGenerator.ts":
/*!*********************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/diagram/plantuml/entity/PlantUmlEntityCodeGenerator.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PlantUmlEntityCodeGenerator)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_diagram_plantuml_entity_PlantUmlEntityIdentityPropertyCodeGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/diagram/plantuml/entity/PlantUmlEntityIdentityPropertyCodeGenerator */ "./src/main/erdiagram/converter/diagram/plantuml/entity/PlantUmlEntityIdentityPropertyCodeGenerator.ts");
/* harmony import */ var _erdiagram_converter_diagram_plantuml_entity_PlantUmlEntityPropertyCodeGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/diagram/plantuml/entity/PlantUmlEntityPropertyCodeGenerator */ "./src/main/erdiagram/converter/diagram/plantuml/entity/PlantUmlEntityPropertyCodeGenerator.ts");
/* harmony import */ var _erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/util/indent-utils */ "./src/main/erdiagram/util/indent-utils.ts");
/* harmony import */ var _erdiagram_converter_diagram_common_config_DiagramLevel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/converter/diagram/common/config/DiagramLevel */ "./src/main/erdiagram/converter/diagram/common/config/DiagramLevel.ts");




class PlantUmlEntityCodeGenerator {
    entityIdentityPropertyCodeGenerator = new _erdiagram_converter_diagram_plantuml_entity_PlantUmlEntityIdentityPropertyCodeGenerator__WEBPACK_IMPORTED_MODULE_0__["default"]();
    entityPropertyCodeGenerator = new _erdiagram_converter_diagram_plantuml_entity_PlantUmlEntityPropertyCodeGenerator__WEBPACK_IMPORTED_MODULE_1__["default"]();
    diagramLevel;
    constructor(diagramLevel) {
        this.diagramLevel = diagramLevel;
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
        if (this.diagramLevel === _erdiagram_converter_diagram_common_config_DiagramLevel__WEBPACK_IMPORTED_MODULE_3__["default"].CONCEPTUAL) {
            return '';
        }
        const { identityPropertyName, properties } = entity;
        const propertiesCode = properties.map(property => this.entityPropertyCodeGenerator.generateEntityPropertyCode(property));
        if (identityPropertyName) {
            propertiesCode.unshift(this.entityIdentityPropertyCodeGenerator.generateEntityIdentityPropertyCode(identityPropertyName));
        }
        return (0,_erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_2__.indentLines)(propertiesCode).join('\n');
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/diagram/plantuml/entity/PlantUmlEntityIdentityPropertyCodeGenerator.ts":
/*!*************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/diagram/plantuml/entity/PlantUmlEntityIdentityPropertyCodeGenerator.ts ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PlantUmlEntityIdentityPropertyCodeGenerator)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/entity-relationship-model-types */ "./src/main/erdiagram/parser/types/entity-relationship-model-types.ts");

class PlantUmlEntityIdentityPropertyCodeGenerator {
    generateEntityIdentityPropertyCode(identityPropertyName) {
        return `{field} ${identityPropertyName}: ${_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.IDENTITY}`;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/diagram/plantuml/entity/PlantUmlEntityPropertyCodeGenerator.ts":
/*!*****************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/diagram/plantuml/entity/PlantUmlEntityPropertyCodeGenerator.ts ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PlantUmlEntityPropertyCodeGenerator)
/* harmony export */ });
class PlantUmlEntityPropertyCodeGenerator {
    generateEntityPropertyCode(property) {
        const { name, type, length, optional, unique } = property;
        const typeWithLengthCode = this.getTypeWithLengthCode(type, length);
        const modifiersCode = this.getModifiersCode(optional, unique);
        return `{field} ${name}${modifiersCode}: ${typeWithLengthCode}`;
    }
    getTypeWithLengthCode(type, length) {
        if (length.length === 0) {
            return type;
        }
        return `${type}(${length.join(', ')})`;
    }
    getModifiersCode(optional, unique) {
        const optionalModifierCode = optional ? '?' : '';
        const uniqueModifierCode = unique ? '!' : '';
        return optionalModifierCode + uniqueModifierCode;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/diagram/plantuml/exports.ts":
/*!******************************************************************!*\
  !*** ./src/main/erdiagram/converter/diagram/plantuml/exports.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlantUmlConfigManager: () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_1__.PlantUmlConfigManager),
/* harmony export */   PlantUmlSourceCodeGenerator: () => (/* reexport safe */ _PlantUmlSourceCodeGenerator__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   plantUmlConfigManager: () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_1__.plantUmlConfigManager)
/* harmony export */ });
/* harmony import */ var _PlantUmlSourceCodeGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PlantUmlSourceCodeGenerator */ "./src/main/erdiagram/converter/diagram/plantuml/PlantUmlSourceCodeGenerator.ts");
/* harmony import */ var _config_exports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config/exports */ "./src/main/erdiagram/converter/diagram/plantuml/config/exports.ts");





/***/ }),

/***/ "./src/main/erdiagram/converter/diagram/plantuml/relationship/PlantUmlRelationshipCardinalityCodeGenerator.ts":
/*!********************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/diagram/plantuml/relationship/PlantUmlRelationshipCardinalityCodeGenerator.ts ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PlantUmlRelationshipCardinalityCodeGenerator)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/entity-relationship-model-types */ "./src/main/erdiagram/parser/types/entity-relationship-model-types.ts");

class PlantUmlRelationshipCardinalityCodeGenerator {
    generateCardinalityCode(cardinality) {
        switch (cardinality) {
            case _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.Cardinality.ZERO_OR_ONE:
                return '0..1';
            case _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.Cardinality.ONE:
                return '1';
            case _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.Cardinality.MANY:
                return '*';
        }
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/diagram/plantuml/relationship/PlantUmlRelationshipCodeGenerator.ts":
/*!*********************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/diagram/plantuml/relationship/PlantUmlRelationshipCodeGenerator.ts ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PlantUmlRelationshipCodeGenerator)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_diagram_plantuml_relationship_PlantUmlRelationshipDirectionCodeGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/diagram/plantuml/relationship/PlantUmlRelationshipDirectionCodeGenerator */ "./src/main/erdiagram/converter/diagram/plantuml/relationship/PlantUmlRelationshipDirectionCodeGenerator.ts");
/* harmony import */ var _erdiagram_converter_diagram_plantuml_relationship_PlantUmlRelationshipCardinalityCodeGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/diagram/plantuml/relationship/PlantUmlRelationshipCardinalityCodeGenerator */ "./src/main/erdiagram/converter/diagram/plantuml/relationship/PlantUmlRelationshipCardinalityCodeGenerator.ts");


class PlantUmlRelationshipCodeGenerator {
    relationshipDirectionCodeGenerator = new _erdiagram_converter_diagram_plantuml_relationship_PlantUmlRelationshipDirectionCodeGenerator__WEBPACK_IMPORTED_MODULE_0__["default"]();
    relationshipCardinalityCodeGenerator = new _erdiagram_converter_diagram_plantuml_relationship_PlantUmlRelationshipCardinalityCodeGenerator__WEBPACK_IMPORTED_MODULE_1__["default"]();
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

/***/ "./src/main/erdiagram/converter/diagram/plantuml/relationship/PlantUmlRelationshipDirectionCodeGenerator.ts":
/*!******************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/diagram/plantuml/relationship/PlantUmlRelationshipDirectionCodeGenerator.ts ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PlantUmlRelationshipDirectionCodeGenerator)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/entity-relationship-model-types */ "./src/main/erdiagram/parser/types/entity-relationship-model-types.ts");

class PlantUmlRelationshipDirectionCodeGenerator {
    generateDirectionCode(direction) {
        switch (direction) {
            case _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.Direction.LEFT_TO_RIGHT:
                return '-->';
            case _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.Direction.RIGHT_TO_LEFT:
                return '<--';
            case _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.Direction.BIDIRECTIONAL:
                return '<-->';
        }
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/exports.ts":
/*!*************************************************!*\
  !*** ./src/main/erdiagram/converter/exports.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BeanValidationConfigManager: () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.BeanValidationConfigManager),
/* harmony export */   BeanValidationTransformer: () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.BeanValidationTransformer),
/* harmony export */   CaseConverter: () => (/* reexport safe */ _common_exports__WEBPACK_IMPORTED_MODULE_1__.CaseConverter),
/* harmony export */   ClassModelConfigManager: () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.ClassModelConfigManager),
/* harmony export */   ClassModelGenerator: () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.ClassModelGenerator),
/* harmony export */   DatabaseModelConfigManager: () => (/* reexport safe */ _database_exports__WEBPACK_IMPORTED_MODULE_2__.DatabaseModelConfigManager),
/* harmony export */   DatabaseModelGenerator: () => (/* reexport safe */ _database_exports__WEBPACK_IMPORTED_MODULE_2__.DatabaseModelGenerator),
/* harmony export */   DatabaseModelToSqlCodeConverter: () => (/* reexport safe */ _database_exports__WEBPACK_IMPORTED_MODULE_2__.DatabaseModelToSqlCodeConverter),
/* harmony export */   DiagramLevel: () => (/* reexport safe */ _diagram_exports__WEBPACK_IMPORTED_MODULE_4__.DiagramLevel),
/* harmony export */   JavaAnnotation: () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.JavaAnnotation),
/* harmony export */   JavaClassModelConfigManager: () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.JavaClassModelConfigManager),
/* harmony export */   JavaClassModelGenerator: () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.JavaClassModelGenerator),
/* harmony export */   JavaExtendedPackage: () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.JavaExtendedPackage),
/* harmony export */   JavaSourceCodeGenerator: () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.JavaSourceCodeGenerator),
/* harmony export */   JavaSourceCodeGeneratorBuilder: () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.JavaSourceCodeGeneratorBuilder),
/* harmony export */   JavaVisibility: () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.JavaVisibility),
/* harmony export */   JpaConfigManager: () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.JpaConfigManager),
/* harmony export */   JpaTransformer: () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.JpaTransformer),
/* harmony export */   JpaTransformerBuilder: () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.JpaTransformerBuilder),
/* harmony export */   LombokConfigManager: () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.LombokConfigManager),
/* harmony export */   LombokTransformer: () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.LombokTransformer),
/* harmony export */   MysqlDialect: () => (/* reexport safe */ _database_exports__WEBPACK_IMPORTED_MODULE_2__.MysqlDialect),
/* harmony export */   MysqlDialectConfigManager: () => (/* reexport safe */ _database_exports__WEBPACK_IMPORTED_MODULE_2__.MysqlDialectConfigManager),
/* harmony export */   NomnomlConfigManager: () => (/* reexport safe */ _diagram_exports__WEBPACK_IMPORTED_MODULE_4__.NomnomlConfigManager),
/* harmony export */   NomnomlSourceCodeGenerator: () => (/* reexport safe */ _diagram_exports__WEBPACK_IMPORTED_MODULE_4__.NomnomlSourceCodeGenerator),
/* harmony export */   NotNullBlobValidationStrategy: () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.NotNullBlobValidationStrategy),
/* harmony export */   NotNullTextValidationStrategy: () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.NotNullTextValidationStrategy),
/* harmony export */   OracleDialect: () => (/* reexport safe */ _database_exports__WEBPACK_IMPORTED_MODULE_2__.OracleDialect),
/* harmony export */   OracleDialectConfigManager: () => (/* reexport safe */ _database_exports__WEBPACK_IMPORTED_MODULE_2__.OracleDialectConfigManager),
/* harmony export */   PlantUmlConfigManager: () => (/* reexport safe */ _diagram_exports__WEBPACK_IMPORTED_MODULE_4__.PlantUmlConfigManager),
/* harmony export */   PlantUmlSourceCodeGenerator: () => (/* reexport safe */ _diagram_exports__WEBPACK_IMPORTED_MODULE_4__.PlantUmlSourceCodeGenerator),
/* harmony export */   PostgresqlDialect: () => (/* reexport safe */ _database_exports__WEBPACK_IMPORTED_MODULE_2__.PostgresqlDialect),
/* harmony export */   PostgresqlDialectConfigManager: () => (/* reexport safe */ _database_exports__WEBPACK_IMPORTED_MODULE_2__.PostgresqlDialectConfigManager),
/* harmony export */   SqlServerDialect: () => (/* reexport safe */ _database_exports__WEBPACK_IMPORTED_MODULE_2__.SqlServerDialect),
/* harmony export */   SqlServerDialectConfigManager: () => (/* reexport safe */ _database_exports__WEBPACK_IMPORTED_MODULE_2__.SqlServerDialectConfigManager),
/* harmony export */   SqlSourceCodeGenerator: () => (/* reexport safe */ _database_exports__WEBPACK_IMPORTED_MODULE_2__.SqlSourceCodeGenerator),
/* harmony export */   SqlSourceCodeGeneratorBuilder: () => (/* reexport safe */ _database_exports__WEBPACK_IMPORTED_MODULE_2__.SqlSourceCodeGeneratorBuilder),
/* harmony export */   SqliteDialect: () => (/* reexport safe */ _database_exports__WEBPACK_IMPORTED_MODULE_2__.SqliteDialect),
/* harmony export */   SqliteDialectConfigManager: () => (/* reexport safe */ _database_exports__WEBPACK_IMPORTED_MODULE_2__.SqliteDialectConfigManager),
/* harmony export */   StandardCaseFormats: () => (/* reexport safe */ _common_exports__WEBPACK_IMPORTED_MODULE_1__.StandardCaseFormats),
/* harmony export */   StandardIdNamingStrategies: () => (/* reexport safe */ _common_exports__WEBPACK_IMPORTED_MODULE_1__.StandardIdNamingStrategies),
/* harmony export */   TypeScriptClassModelToCodeConverter: () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.TypeScriptClassModelToCodeConverter),
/* harmony export */   TypeScriptConfigManager: () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.TypeScriptConfigManager),
/* harmony export */   TypeScriptSourceCodeGenerator: () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.TypeScriptSourceCodeGenerator),
/* harmony export */   TypeScriptSourceCodeGeneratorBuilder: () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.TypeScriptSourceCodeGeneratorBuilder),
/* harmony export */   beanValidationConfigManager: () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.beanValidationConfigManager),
/* harmony export */   classModelConfigManager: () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.classModelConfigManager),
/* harmony export */   createJavaArrayType: () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.createJavaArrayType),
/* harmony export */   createJavaParameterizedType: () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.createJavaParameterizedType),
/* harmony export */   createJavaSimpleType: () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.createJavaSimpleType),
/* harmony export */   createTypeScriptArrayType: () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.createTypeScriptArrayType),
/* harmony export */   createTypeScriptParameterizedType: () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.createTypeScriptParameterizedType),
/* harmony export */   createTypeScriptSimpleType: () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.createTypeScriptSimpleType),
/* harmony export */   databaseModelConfigManager: () => (/* reexport safe */ _database_exports__WEBPACK_IMPORTED_MODULE_2__.databaseModelConfigManager),
/* harmony export */   isJavaParameterizedType: () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.isJavaParameterizedType),
/* harmony export */   isMultipleFileSourceCodeGenerator: () => (/* reexport safe */ _erdiagram_converter_MultipleFileSourceCodeGenerator__WEBPACK_IMPORTED_MODULE_0__.isMultipleFileSourceCodeGenerator),
/* harmony export */   isTypeScriptParameterizedType: () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.isTypeScriptParameterizedType),
/* harmony export */   javaClassModelConfigManager: () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.javaClassModelConfigManager),
/* harmony export */   jpaConfigManager: () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.jpaConfigManager),
/* harmony export */   lombokConfigManager: () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.lombokConfigManager),
/* harmony export */   mysqlDialectConfigManager: () => (/* reexport safe */ _database_exports__WEBPACK_IMPORTED_MODULE_2__.mysqlDialectConfigManager),
/* harmony export */   nomnomlConfigManager: () => (/* reexport safe */ _diagram_exports__WEBPACK_IMPORTED_MODULE_4__.nomnomlConfigManager),
/* harmony export */   oracleDialectConfigManager: () => (/* reexport safe */ _database_exports__WEBPACK_IMPORTED_MODULE_2__.oracleDialectConfigManager),
/* harmony export */   parseJavaType: () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.parseJavaType),
/* harmony export */   parseTypeScriptType: () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.parseTypeScriptType),
/* harmony export */   plantUmlConfigManager: () => (/* reexport safe */ _diagram_exports__WEBPACK_IMPORTED_MODULE_4__.plantUmlConfigManager),
/* harmony export */   postgresqlDialectConfigManager: () => (/* reexport safe */ _database_exports__WEBPACK_IMPORTED_MODULE_2__.postgresqlDialectConfigManager),
/* harmony export */   sqlServerDialectConfigManager: () => (/* reexport safe */ _database_exports__WEBPACK_IMPORTED_MODULE_2__.sqlServerDialectConfigManager),
/* harmony export */   sqliteDialectConfigManager: () => (/* reexport safe */ _database_exports__WEBPACK_IMPORTED_MODULE_2__.sqliteDialectConfigManager),
/* harmony export */   typescriptConfigManager: () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.typescriptConfigManager)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_MultipleFileSourceCodeGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/MultipleFileSourceCodeGenerator */ "./src/main/erdiagram/converter/MultipleFileSourceCodeGenerator.ts");
/* harmony import */ var _common_exports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/exports */ "./src/main/erdiagram/converter/common/exports.ts");
/* harmony import */ var _database_exports__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./database/exports */ "./src/main/erdiagram/converter/database/exports.ts");
/* harmony import */ var _oop_exports__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./oop/exports */ "./src/main/erdiagram/converter/oop/exports.ts");
/* harmony import */ var _diagram_exports__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./diagram/exports */ "./src/main/erdiagram/converter/diagram/exports.ts");








/***/ }),

/***/ "./src/main/erdiagram/converter/oop/exports.ts":
/*!*****************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/exports.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BeanValidationConfigManager: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.BeanValidationConfigManager),
/* harmony export */   BeanValidationTransformer: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.BeanValidationTransformer),
/* harmony export */   ClassModelConfigManager: () => (/* reexport safe */ _model_exports__WEBPACK_IMPORTED_MODULE_1__.ClassModelConfigManager),
/* harmony export */   ClassModelGenerator: () => (/* reexport safe */ _model_exports__WEBPACK_IMPORTED_MODULE_1__.ClassModelGenerator),
/* harmony export */   JavaAnnotation: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.JavaAnnotation),
/* harmony export */   JavaClassModelConfigManager: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.JavaClassModelConfigManager),
/* harmony export */   JavaClassModelGenerator: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.JavaClassModelGenerator),
/* harmony export */   JavaExtendedPackage: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.JavaExtendedPackage),
/* harmony export */   JavaSourceCodeGenerator: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.JavaSourceCodeGenerator),
/* harmony export */   JavaSourceCodeGeneratorBuilder: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.JavaSourceCodeGeneratorBuilder),
/* harmony export */   JavaVisibility: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.JavaVisibility),
/* harmony export */   JpaConfigManager: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.JpaConfigManager),
/* harmony export */   JpaTransformer: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.JpaTransformer),
/* harmony export */   JpaTransformerBuilder: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.JpaTransformerBuilder),
/* harmony export */   LombokConfigManager: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.LombokConfigManager),
/* harmony export */   LombokTransformer: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.LombokTransformer),
/* harmony export */   NotNullBlobValidationStrategy: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.NotNullBlobValidationStrategy),
/* harmony export */   NotNullTextValidationStrategy: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.NotNullTextValidationStrategy),
/* harmony export */   TypeScriptClassModelToCodeConverter: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.TypeScriptClassModelToCodeConverter),
/* harmony export */   TypeScriptConfigManager: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.TypeScriptConfigManager),
/* harmony export */   TypeScriptSourceCodeGenerator: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.TypeScriptSourceCodeGenerator),
/* harmony export */   TypeScriptSourceCodeGeneratorBuilder: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.TypeScriptSourceCodeGeneratorBuilder),
/* harmony export */   beanValidationConfigManager: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.beanValidationConfigManager),
/* harmony export */   classModelConfigManager: () => (/* reexport safe */ _model_exports__WEBPACK_IMPORTED_MODULE_1__.classModelConfigManager),
/* harmony export */   createJavaArrayType: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.createJavaArrayType),
/* harmony export */   createJavaParameterizedType: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.createJavaParameterizedType),
/* harmony export */   createJavaSimpleType: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.createJavaSimpleType),
/* harmony export */   createTypeScriptArrayType: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.createTypeScriptArrayType),
/* harmony export */   createTypeScriptParameterizedType: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.createTypeScriptParameterizedType),
/* harmony export */   createTypeScriptSimpleType: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.createTypeScriptSimpleType),
/* harmony export */   isJavaParameterizedType: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.isJavaParameterizedType),
/* harmony export */   isTypeScriptParameterizedType: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.isTypeScriptParameterizedType),
/* harmony export */   javaClassModelConfigManager: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.javaClassModelConfigManager),
/* harmony export */   jpaConfigManager: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.jpaConfigManager),
/* harmony export */   lombokConfigManager: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.lombokConfigManager),
/* harmony export */   parseJavaType: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.parseJavaType),
/* harmony export */   parseTypeScriptType: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.parseTypeScriptType),
/* harmony export */   typescriptConfigManager: () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.typescriptConfigManager)
/* harmony export */ });
/* harmony import */ var _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./source-code-generator/exports */ "./src/main/erdiagram/converter/oop/source-code-generator/exports.ts");
/* harmony import */ var _model_exports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model/exports */ "./src/main/erdiagram/converter/oop/model/exports.ts");




/***/ }),

/***/ "./src/main/erdiagram/converter/oop/model/ClassModelGenerator.ts":
/*!***********************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/model/ClassModelGenerator.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ClassModelGenerator)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_oop_model_config_ClassModelConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/model/config/ClassModelConfigManager */ "./src/main/erdiagram/converter/oop/model/config/ClassModelConfigManager.ts");
/* harmony import */ var _erdiagram_converter_oop_model_class_EntityToClassMapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/oop/model/class/EntityToClassMapper */ "./src/main/erdiagram/converter/oop/model/class/EntityToClassMapper.ts");


class ClassModelGenerator {
    config;
    entityToClassMapper;
    constructor(config) {
        this.config = _erdiagram_converter_oop_model_config_ClassModelConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"].mergeWithDefaultConfig(config);
        this.entityToClassMapper = new _erdiagram_converter_oop_model_class_EntityToClassMapper__WEBPACK_IMPORTED_MODULE_1__["default"](this.config);
    }
    generateClassModel(model) {
        const { entities, relationships } = model;
        const classes = entities.map(entity => this.entityToClassMapper.mapEntityToClass(entity, relationships));
        return {
            classes
        };
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/model/class-model-types.ts":
/*!*********************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/model/class-model-types.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./src/main/erdiagram/converter/oop/model/class/EntityToClassMapper.ts":
/*!*****************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/model/class/EntityToClassMapper.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EntityToClassMapper)
/* harmony export */ });
/* harmony import */ var _erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/util/string-utils */ "./src/main/erdiagram/util/string-utils.ts");
/* harmony import */ var _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/parser/types/entity-relationship-model-types */ "./src/main/erdiagram/parser/types/entity-relationship-model-types.ts");
/* harmony import */ var _erdiagram_converter_oop_model_class_field_RelationshipMemberToClassFieldMapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/oop/model/class/field/RelationshipMemberToClassFieldMapper */ "./src/main/erdiagram/converter/oop/model/class/field/RelationshipMemberToClassFieldMapper.ts");
/* harmony import */ var _erdiagram_converter_oop_model_class_field_EntityPropertyToClassFieldMapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/converter/oop/model/class/field/EntityPropertyToClassFieldMapper */ "./src/main/erdiagram/converter/oop/model/class/field/EntityPropertyToClassFieldMapper.ts");
/* harmony import */ var _erdiagram_converter_oop_model_class_field_EntityToIdClassFieldMapper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/erdiagram/converter/oop/model/class/field/EntityToIdClassFieldMapper */ "./src/main/erdiagram/converter/oop/model/class/field/EntityToIdClassFieldMapper.ts");
/* harmony import */ var _erdiagram_converter_oop_model_source_metadata_source_metadata_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/erdiagram/converter/oop/model/source-metadata/source-metadata-types */ "./src/main/erdiagram/converter/oop/model/source-metadata/source-metadata-types.ts");






class EntityToClassMapper {
    config;
    entityToIdClassFieldMapper;
    entityPropertyToClassFieldMapper;
    relationshipMemberToClassFieldMapper;
    constructor(config) {
        this.config = config;
        this.entityToIdClassFieldMapper = new _erdiagram_converter_oop_model_class_field_EntityToIdClassFieldMapper__WEBPACK_IMPORTED_MODULE_4__["default"](this.config.idNamingStrategy);
        this.entityPropertyToClassFieldMapper = new _erdiagram_converter_oop_model_class_field_EntityPropertyToClassFieldMapper__WEBPACK_IMPORTED_MODULE_3__["default"]();
        this.relationshipMemberToClassFieldMapper = new _erdiagram_converter_oop_model_class_field_RelationshipMemberToClassFieldMapper__WEBPACK_IMPORTED_MODULE_2__["default"]();
    }
    mapEntityToClass(entity, relationships) {
        const name = (0,_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_0__.capitalizeWord)(entity.name);
        const fields = [
            this.entityToIdClassFieldMapper.mapEntityToIdClassField(entity)
        ];
        for (const property of entity.properties) {
            fields.push(this.entityPropertyToClassFieldMapper.mapPropertyToField(entity, property));
        }
        for (const relationship of relationships) {
            const { leftMember, rightMember, direction } = relationship;
            if (leftMember.entity === entity.name && [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_1__.Direction.LEFT_TO_RIGHT, _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_1__.Direction.BIDIRECTIONAL].includes(direction)) {
                fields.push(this.relationshipMemberToClassFieldMapper.mapRelationshipMemberToField(relationship, rightMember));
            }
            if (rightMember.entity === entity.name && [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_1__.Direction.RIGHT_TO_LEFT, _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_1__.Direction.BIDIRECTIONAL].includes(direction)) {
                fields.push(this.relationshipMemberToClassFieldMapper.mapRelationshipMemberToField(relationship, leftMember));
            }
        }
        return {
            name,
            fields,
            sourceMetadata: {
                sourceType: _erdiagram_converter_oop_model_source_metadata_source_metadata_types__WEBPACK_IMPORTED_MODULE_5__.SourceType.ENTITY,
                entity
            }
        };
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/model/class/field/EntityPropertyToClassFieldMapper.ts":
/*!************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/model/class/field/EntityPropertyToClassFieldMapper.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EntityPropertyToClassFieldMapper)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/entity-relationship-model-types */ "./src/main/erdiagram/parser/types/entity-relationship-model-types.ts");
/* harmony import */ var _erdiagram_converter_oop_model_source_metadata_source_metadata_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/oop/model/source-metadata/source-metadata-types */ "./src/main/erdiagram/converter/oop/model/source-metadata/source-metadata-types.ts");


const TYPES_WITH_MAX_SIZE_SUPPORT = [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.TEXT, _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.BLOB];
class EntityPropertyToClassFieldMapper {
    mapPropertyToField(entity, property) {
        const { name, optional, type, length } = property;
        return {
            name,
            nullable: optional,
            primitiveType: type,
            list: false,
            maxSize: TYPES_WITH_MAX_SIZE_SUPPORT.includes(type) ? length[0] : undefined,
            sourceMetadata: {
                sourceType: _erdiagram_converter_oop_model_source_metadata_source_metadata_types__WEBPACK_IMPORTED_MODULE_1__.SourceType.ENTITY_PROPERTY,
                entity,
                property
            }
        };
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/model/class/field/EntityToIdClassFieldMapper.ts":
/*!******************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/model/class/field/EntityToIdClassFieldMapper.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EntityToIdClassFieldMapper)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/entity-relationship-model-types */ "./src/main/erdiagram/parser/types/entity-relationship-model-types.ts");
/* harmony import */ var _erdiagram_converter_oop_model_source_metadata_source_metadata_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/oop/model/source-metadata/source-metadata-types */ "./src/main/erdiagram/converter/oop/model/source-metadata/source-metadata-types.ts");


class EntityToIdClassFieldMapper {
    idNamingStrategy;
    constructor(idNamingStrategy) {
        this.idNamingStrategy = idNamingStrategy;
    }
    mapEntityToIdClassField(entity) {
        return {
            name: this.getIdentityFieldName(entity),
            primitiveType: _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.IDENTITY,
            // ID field must be nullable, so NULL value can be used to represent an unsaved instance
            nullable: true,
            list: false,
            sourceMetadata: {
                sourceType: _erdiagram_converter_oop_model_source_metadata_source_metadata_types__WEBPACK_IMPORTED_MODULE_1__.SourceType.ENTITY_IDENTITY,
                entity
            }
        };
    }
    getIdentityFieldName(entity) {
        if (entity.identityPropertyName) {
            return entity.identityPropertyName;
        }
        const { idNamingStrategy } = this;
        return idNamingStrategy(entity.name);
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/model/class/field/RelationshipMemberToClassFieldMapper.ts":
/*!****************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/model/class/field/RelationshipMemberToClassFieldMapper.ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RelationshipMemberToClassFieldMapper)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/entity-relationship-model-types */ "./src/main/erdiagram/parser/types/entity-relationship-model-types.ts");
/* harmony import */ var pluralize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! pluralize */ "./node_modules/pluralize/pluralize.js");
/* harmony import */ var pluralize__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(pluralize__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _erdiagram_converter_oop_model_source_metadata_source_metadata_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/oop/model/source-metadata/source-metadata-types */ "./src/main/erdiagram/converter/oop/model/source-metadata/source-metadata-types.ts");



class RelationshipMemberToClassFieldMapper {
    mapRelationshipMemberToField(relationship, toMember) {
        const list = toMember.cardinality === _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.Cardinality.MANY;
        const name = list ? pluralize__WEBPACK_IMPORTED_MODULE_1___default()(toMember.entityAlias) : toMember.entityAlias;
        return {
            name,
            nullable: toMember.cardinality === _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.Cardinality.ZERO_OR_ONE,
            entityType: toMember.entity,
            list,
            sourceMetadata: {
                sourceType: _erdiagram_converter_oop_model_source_metadata_source_metadata_types__WEBPACK_IMPORTED_MODULE_2__.SourceType.RELATIONSHIP_MEMBER,
                relationship,
                referencedMember: toMember
            }
        };
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/model/config/ClassModelConfigManager.ts":
/*!**********************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/model/config/ClassModelConfigManager.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ClassModelConfigManager: () => (/* binding */ ClassModelConfigManager),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _erdiagram_common_config_AbstractConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/common/config/AbstractConfigManager */ "./src/main/erdiagram/common/config/AbstractConfigManager.ts");
/* harmony import */ var _erdiagram_converter_common_id_naming_strategy_StandardIdNamingStrategies__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/common/id-naming-strategy/StandardIdNamingStrategies */ "./src/main/erdiagram/converter/common/id-naming-strategy/StandardIdNamingStrategies.ts");
/* harmony import */ var true_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! true-json */ "./node_modules/true-json/dist/true-json.umd.js");
/* harmony import */ var true_json__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(true_json__WEBPACK_IMPORTED_MODULE_2__);



class ClassModelConfigManager extends _erdiagram_common_config_AbstractConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"] {
    getDefaultConfig() {
        return {
            idNamingStrategy: _erdiagram_converter_common_id_naming_strategy_StandardIdNamingStrategies__WEBPACK_IMPORTED_MODULE_1__["default"].DEFAULT
        };
    }
    mergeConfigs(fullConfig, partialConfig) {
        return {
            ...fullConfig,
            ...partialConfig
        };
    }
    getJsonAdapter() {
        return true_json__WEBPACK_IMPORTED_MODULE_2__.JsonAdapters.object({
            idNamingStrategy: true_json__WEBPACK_IMPORTED_MODULE_2__.JsonAdapters.byKeyLenient(_erdiagram_converter_common_id_naming_strategy_StandardIdNamingStrategies__WEBPACK_IMPORTED_MODULE_1__["default"], 'DEFAULT')
        });
    }
}
const classModelConfigManager = new ClassModelConfigManager();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (classModelConfigManager);


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/model/config/exports.ts":
/*!******************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/model/config/exports.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ClassModelConfigManager: () => (/* reexport safe */ _ClassModelConfigManager__WEBPACK_IMPORTED_MODULE_0__.ClassModelConfigManager),
/* harmony export */   classModelConfigManager: () => (/* reexport safe */ _ClassModelConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _ClassModelConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ClassModelConfigManager */ "./src/main/erdiagram/converter/oop/model/config/ClassModelConfigManager.ts");




/***/ }),

/***/ "./src/main/erdiagram/converter/oop/model/exports.ts":
/*!***********************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/model/exports.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ClassModelConfigManager: () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_2__.ClassModelConfigManager),
/* harmony export */   ClassModelGenerator: () => (/* reexport safe */ _ClassModelGenerator__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   classModelConfigManager: () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_2__.classModelConfigManager)
/* harmony export */ });
/* harmony import */ var _ClassModelGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ClassModelGenerator */ "./src/main/erdiagram/converter/oop/model/ClassModelGenerator.ts");
/* harmony import */ var _class_model_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./class-model-types */ "./src/main/erdiagram/converter/oop/model/class-model-types.ts");
/* harmony import */ var _config_exports__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config/exports */ "./src/main/erdiagram/converter/oop/model/config/exports.ts");






/***/ }),

/***/ "./src/main/erdiagram/converter/oop/model/source-metadata/source-metadata-types.ts":
/*!*****************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/model/source-metadata/source-metadata-types.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SourceType: () => (/* binding */ SourceType)
/* harmony export */ });
var SourceType;
(function (SourceType) {
    SourceType["ENTITY_RELATIONSHIP_MODEL"] = "entity_relationship_model";
    SourceType["ENTITY"] = "entity";
    SourceType["ENTITY_IDENTITY"] = "entity_identity";
    SourceType["ENTITY_PROPERTY"] = "entity_property";
    SourceType["RELATIONSHIP"] = "relationship";
    SourceType["RELATIONSHIP_MEMBER"] = "relationship_member";
})(SourceType || (SourceType = {}));


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/model/source-metadata/source-metadata-utils.ts":
/*!*****************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/model/source-metadata/source-metadata-utils.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isEntityIdentitySourceMetadata: () => (/* binding */ isEntityIdentitySourceMetadata),
/* harmony export */   isEntityPropertySourceMetadata: () => (/* binding */ isEntityPropertySourceMetadata),
/* harmony export */   isEntityRelationshipModelSourceMetadata: () => (/* binding */ isEntityRelationshipModelSourceMetadata),
/* harmony export */   isEntitySourceMetadata: () => (/* binding */ isEntitySourceMetadata),
/* harmony export */   isRelationshipMemberSourceMetadata: () => (/* binding */ isRelationshipMemberSourceMetadata),
/* harmony export */   isRelationshipSourceMetadata: () => (/* binding */ isRelationshipSourceMetadata)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_oop_model_source_metadata_source_metadata_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/model/source-metadata/source-metadata-types */ "./src/main/erdiagram/converter/oop/model/source-metadata/source-metadata-types.ts");

function isEntityRelationshipModelSourceMetadata(sourceMetadata) {
    return sourceMetadata.sourceType === _erdiagram_converter_oop_model_source_metadata_source_metadata_types__WEBPACK_IMPORTED_MODULE_0__.SourceType.ENTITY_RELATIONSHIP_MODEL;
}
function isEntitySourceMetadata(sourceMetadata) {
    return sourceMetadata.sourceType === _erdiagram_converter_oop_model_source_metadata_source_metadata_types__WEBPACK_IMPORTED_MODULE_0__.SourceType.ENTITY;
}
function isEntityIdentitySourceMetadata(sourceMetadata) {
    return sourceMetadata.sourceType === _erdiagram_converter_oop_model_source_metadata_source_metadata_types__WEBPACK_IMPORTED_MODULE_0__.SourceType.ENTITY_IDENTITY;
}
function isEntityPropertySourceMetadata(sourceMetadata) {
    return sourceMetadata.sourceType === _erdiagram_converter_oop_model_source_metadata_source_metadata_types__WEBPACK_IMPORTED_MODULE_0__.SourceType.ENTITY_PROPERTY;
}
function isRelationshipSourceMetadata(sourceMetadata) {
    return sourceMetadata.sourceType === _erdiagram_converter_oop_model_source_metadata_source_metadata_types__WEBPACK_IMPORTED_MODULE_0__.SourceType.RELATIONSHIP;
}
function isRelationshipMemberSourceMetadata(sourceMetadata) {
    return sourceMetadata.sourceType === _erdiagram_converter_oop_model_source_metadata_source_metadata_types__WEBPACK_IMPORTED_MODULE_0__.SourceType.RELATIONSHIP_MEMBER;
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/exports.ts":
/*!***************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/exports.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BeanValidationConfigManager: () => (/* reexport safe */ _java_exports__WEBPACK_IMPORTED_MODULE_0__.BeanValidationConfigManager),
/* harmony export */   BeanValidationTransformer: () => (/* reexport safe */ _java_exports__WEBPACK_IMPORTED_MODULE_0__.BeanValidationTransformer),
/* harmony export */   JavaAnnotation: () => (/* reexport safe */ _java_exports__WEBPACK_IMPORTED_MODULE_0__.JavaAnnotation),
/* harmony export */   JavaClassModelConfigManager: () => (/* reexport safe */ _java_exports__WEBPACK_IMPORTED_MODULE_0__.JavaClassModelConfigManager),
/* harmony export */   JavaClassModelGenerator: () => (/* reexport safe */ _java_exports__WEBPACK_IMPORTED_MODULE_0__.JavaClassModelGenerator),
/* harmony export */   JavaExtendedPackage: () => (/* reexport safe */ _java_exports__WEBPACK_IMPORTED_MODULE_0__.JavaExtendedPackage),
/* harmony export */   JavaSourceCodeGenerator: () => (/* reexport safe */ _java_exports__WEBPACK_IMPORTED_MODULE_0__.JavaSourceCodeGenerator),
/* harmony export */   JavaSourceCodeGeneratorBuilder: () => (/* reexport safe */ _java_exports__WEBPACK_IMPORTED_MODULE_0__.JavaSourceCodeGeneratorBuilder),
/* harmony export */   JavaVisibility: () => (/* reexport safe */ _java_exports__WEBPACK_IMPORTED_MODULE_0__.JavaVisibility),
/* harmony export */   JpaConfigManager: () => (/* reexport safe */ _java_exports__WEBPACK_IMPORTED_MODULE_0__.JpaConfigManager),
/* harmony export */   JpaTransformer: () => (/* reexport safe */ _java_exports__WEBPACK_IMPORTED_MODULE_0__.JpaTransformer),
/* harmony export */   JpaTransformerBuilder: () => (/* reexport safe */ _java_exports__WEBPACK_IMPORTED_MODULE_0__.JpaTransformerBuilder),
/* harmony export */   LombokConfigManager: () => (/* reexport safe */ _java_exports__WEBPACK_IMPORTED_MODULE_0__.LombokConfigManager),
/* harmony export */   LombokTransformer: () => (/* reexport safe */ _java_exports__WEBPACK_IMPORTED_MODULE_0__.LombokTransformer),
/* harmony export */   NotNullBlobValidationStrategy: () => (/* reexport safe */ _java_exports__WEBPACK_IMPORTED_MODULE_0__.NotNullBlobValidationStrategy),
/* harmony export */   NotNullTextValidationStrategy: () => (/* reexport safe */ _java_exports__WEBPACK_IMPORTED_MODULE_0__.NotNullTextValidationStrategy),
/* harmony export */   TypeScriptClassModelToCodeConverter: () => (/* reexport safe */ _typescript_exports__WEBPACK_IMPORTED_MODULE_1__.TypeScriptClassModelToCodeConverter),
/* harmony export */   TypeScriptConfigManager: () => (/* reexport safe */ _typescript_exports__WEBPACK_IMPORTED_MODULE_1__.TypeScriptConfigManager),
/* harmony export */   TypeScriptSourceCodeGenerator: () => (/* reexport safe */ _typescript_exports__WEBPACK_IMPORTED_MODULE_1__.TypeScriptSourceCodeGenerator),
/* harmony export */   TypeScriptSourceCodeGeneratorBuilder: () => (/* reexport safe */ _typescript_exports__WEBPACK_IMPORTED_MODULE_1__.TypeScriptSourceCodeGeneratorBuilder),
/* harmony export */   beanValidationConfigManager: () => (/* reexport safe */ _java_exports__WEBPACK_IMPORTED_MODULE_0__.beanValidationConfigManager),
/* harmony export */   createJavaArrayType: () => (/* reexport safe */ _java_exports__WEBPACK_IMPORTED_MODULE_0__.createJavaArrayType),
/* harmony export */   createJavaParameterizedType: () => (/* reexport safe */ _java_exports__WEBPACK_IMPORTED_MODULE_0__.createJavaParameterizedType),
/* harmony export */   createJavaSimpleType: () => (/* reexport safe */ _java_exports__WEBPACK_IMPORTED_MODULE_0__.createJavaSimpleType),
/* harmony export */   createTypeScriptArrayType: () => (/* reexport safe */ _typescript_exports__WEBPACK_IMPORTED_MODULE_1__.createTypeScriptArrayType),
/* harmony export */   createTypeScriptParameterizedType: () => (/* reexport safe */ _typescript_exports__WEBPACK_IMPORTED_MODULE_1__.createTypeScriptParameterizedType),
/* harmony export */   createTypeScriptSimpleType: () => (/* reexport safe */ _typescript_exports__WEBPACK_IMPORTED_MODULE_1__.createTypeScriptSimpleType),
/* harmony export */   isJavaParameterizedType: () => (/* reexport safe */ _java_exports__WEBPACK_IMPORTED_MODULE_0__.isJavaParameterizedType),
/* harmony export */   isTypeScriptParameterizedType: () => (/* reexport safe */ _typescript_exports__WEBPACK_IMPORTED_MODULE_1__.isTypeScriptParameterizedType),
/* harmony export */   javaClassModelConfigManager: () => (/* reexport safe */ _java_exports__WEBPACK_IMPORTED_MODULE_0__.javaClassModelConfigManager),
/* harmony export */   jpaConfigManager: () => (/* reexport safe */ _java_exports__WEBPACK_IMPORTED_MODULE_0__.jpaConfigManager),
/* harmony export */   lombokConfigManager: () => (/* reexport safe */ _java_exports__WEBPACK_IMPORTED_MODULE_0__.lombokConfigManager),
/* harmony export */   parseJavaType: () => (/* reexport safe */ _java_exports__WEBPACK_IMPORTED_MODULE_0__.parseJavaType),
/* harmony export */   parseTypeScriptType: () => (/* reexport safe */ _typescript_exports__WEBPACK_IMPORTED_MODULE_1__.parseTypeScriptType),
/* harmony export */   typescriptConfigManager: () => (/* reexport safe */ _typescript_exports__WEBPACK_IMPORTED_MODULE_1__.typescriptConfigManager)
/* harmony export */ });
/* harmony import */ var _java_exports__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./java/exports */ "./src/main/erdiagram/converter/oop/source-code-generator/java/exports.ts");
/* harmony import */ var _typescript_exports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./typescript/exports */ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/exports.ts");




/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/JavaSourceCodeGenerator.ts":
/*!************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/JavaSourceCodeGenerator.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ JavaSourceCodeGenerator)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_model_transformer_ApplyTransformersCommand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/model/transformer/ApplyTransformersCommand */ "./src/main/erdiagram/converter/oop/source-code-generator/java/model/transformer/ApplyTransformersCommand.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_JavaSourceCodeGeneratorBuilder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/JavaSourceCodeGeneratorBuilder */ "./src/main/erdiagram/converter/oop/source-code-generator/java/JavaSourceCodeGeneratorBuilder.ts");


class JavaSourceCodeGenerator {
    _classModelGenerator;
    _javaClassModelGenerator;
    _javaClassModelTransformers;
    _javaClassModelCodeGenerator;
    _javaClassModelSourceFilesGenerator;
    // FIXME too many dependencies?
    constructor(classModelGenerator, javaClassModelGenerator, javaClassModelTransformers, javaClassModelCodeGenerator, javaClassModelSourceFilesGenerator) {
        this._classModelGenerator = classModelGenerator;
        this._javaClassModelGenerator = javaClassModelGenerator;
        this._javaClassModelTransformers = javaClassModelTransformers;
        this._javaClassModelCodeGenerator = javaClassModelCodeGenerator;
        this._javaClassModelSourceFilesGenerator = javaClassModelSourceFilesGenerator;
    }
    generateSourceCode(entityRelationshipModel) {
        const javaClassModel = this.getJavaClassModel(entityRelationshipModel);
        return this._javaClassModelCodeGenerator.generateCode(javaClassModel);
    }
    generateSourceFiles(entityRelationshipModel) {
        const javaClassModel = this.getJavaClassModel(entityRelationshipModel);
        return this._javaClassModelSourceFilesGenerator.generateSourceFiles(javaClassModel);
    }
    getJavaClassModel(entityRelationshipModel) {
        const classModel = this._classModelGenerator.generateClassModel(entityRelationshipModel);
        const { javaClassModel, javaClassModelDescriptorsRepository } = this._javaClassModelGenerator.generateJavaClassModel(classModel);
        const applyTransformersCommandContext = {
            entityRelationshipModel,
            classModel,
            javaClassModel
        };
        new _erdiagram_converter_oop_source_code_generator_java_model_transformer_ApplyTransformersCommand__WEBPACK_IMPORTED_MODULE_0__["default"](applyTransformersCommandContext, javaClassModelDescriptorsRepository, this._javaClassModelTransformers).execute();
        return javaClassModel;
    }
    static withDefaultConfig() {
        return this.builder().build();
    }
    static builder() {
        return new _erdiagram_converter_oop_source_code_generator_java_JavaSourceCodeGeneratorBuilder__WEBPACK_IMPORTED_MODULE_1__["default"]();
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/JavaSourceCodeGeneratorBuilder.ts":
/*!*******************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/JavaSourceCodeGeneratorBuilder.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ JavaSourceCodeGeneratorBuilder)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_oop_model_ClassModelGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/model/ClassModelGenerator */ "./src/main/erdiagram/converter/oop/model/ClassModelGenerator.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_model_generator_JavaClassModelGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/model/generator/JavaClassModelGenerator */ "./src/main/erdiagram/converter/oop/source-code-generator/java/model/generator/JavaClassModelGenerator.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_JavaSourceCodeGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/JavaSourceCodeGenerator */ "./src/main/erdiagram/converter/oop/source-code-generator/java/JavaSourceCodeGenerator.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_code_JavaClassModelCodeGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/code/JavaClassModelCodeGenerator */ "./src/main/erdiagram/converter/oop/source-code-generator/java/code/JavaClassModelCodeGenerator.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_code_JavaClassCodeGenerator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/code/JavaClassCodeGenerator */ "./src/main/erdiagram/converter/oop/source-code-generator/java/code/JavaClassCodeGenerator.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_code_JavaClassModelSourceFilesGenerator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/code/JavaClassModelSourceFilesGenerator */ "./src/main/erdiagram/converter/oop/source-code-generator/java/code/JavaClassModelSourceFilesGenerator.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_type_import_JavaClassUsedTypesCompiler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/type/import/JavaClassUsedTypesCompiler */ "./src/main/erdiagram/converter/oop/source-code-generator/java/type/import/JavaClassUsedTypesCompiler.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_type_import_JavaAnnotationUsedTypesCompiler__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/type/import/JavaAnnotationUsedTypesCompiler */ "./src/main/erdiagram/converter/oop/source-code-generator/java/type/import/JavaAnnotationUsedTypesCompiler.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_code_JavaFieldCodeGenerator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/code/JavaFieldCodeGenerator */ "./src/main/erdiagram/converter/oop/source-code-generator/java/code/JavaFieldCodeGenerator.ts");









class JavaSourceCodeGeneratorBuilder {
    _classModelConfig = {};
    _javaClassModelConfig = {};
    _javaClassModelTransformers = [];
    configureClassModel(config) {
        this._classModelConfig = config;
        return this;
    }
    configureJavaClassModel(config) {
        this._javaClassModelConfig = config;
        return this;
    }
    addTransformers(...javaClassModelTransformers) {
        this._javaClassModelTransformers.push(...javaClassModelTransformers);
        return this;
    }
    build() {
        const classModelGenerator = new _erdiagram_converter_oop_model_ClassModelGenerator__WEBPACK_IMPORTED_MODULE_0__["default"](this._classModelConfig);
        const javaClassModelGenerator = new _erdiagram_converter_oop_source_code_generator_java_model_generator_JavaClassModelGenerator__WEBPACK_IMPORTED_MODULE_1__["default"](this._javaClassModelConfig);
        // TODO find a better way to instantiate this stateless components --> use DI container?
        const javaAnnotationUsedTypesCompiler = new _erdiagram_converter_oop_source_code_generator_java_type_import_JavaAnnotationUsedTypesCompiler__WEBPACK_IMPORTED_MODULE_7__["default"]();
        const javaClassUsedTypesCompiler = new _erdiagram_converter_oop_source_code_generator_java_type_import_JavaClassUsedTypesCompiler__WEBPACK_IMPORTED_MODULE_6__["default"](javaAnnotationUsedTypesCompiler);
        const javaFieldCodeGenerator = new _erdiagram_converter_oop_source_code_generator_java_code_JavaFieldCodeGenerator__WEBPACK_IMPORTED_MODULE_8__["default"]();
        const javaClassCodeGenerator = new _erdiagram_converter_oop_source_code_generator_java_code_JavaClassCodeGenerator__WEBPACK_IMPORTED_MODULE_4__["default"](javaClassUsedTypesCompiler, javaFieldCodeGenerator);
        const javaClassModelCodeGenerator = new _erdiagram_converter_oop_source_code_generator_java_code_JavaClassModelCodeGenerator__WEBPACK_IMPORTED_MODULE_3__["default"](javaClassCodeGenerator);
        const javaClassModelSourceFilesGenerator = new _erdiagram_converter_oop_source_code_generator_java_code_JavaClassModelSourceFilesGenerator__WEBPACK_IMPORTED_MODULE_5__["default"](javaClassCodeGenerator);
        return new _erdiagram_converter_oop_source_code_generator_java_JavaSourceCodeGenerator__WEBPACK_IMPORTED_MODULE_2__["default"](classModelGenerator, javaClassModelGenerator, [...this._javaClassModelTransformers], javaClassModelCodeGenerator, javaClassModelSourceFilesGenerator);
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/annotation/JavaAnnotation.ts":
/*!**************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/annotation/JavaAnnotation.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ JavaAnnotation)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_annotation_utils_formatJavaAnnotation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/annotation/utils/formatJavaAnnotation */ "./src/main/erdiagram/converter/oop/source-code-generator/java/annotation/utils/formatJavaAnnotation.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_annotation_utils_RawAnnotationParameterValue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/annotation/utils/RawAnnotationParameterValue */ "./src/main/erdiagram/converter/oop/source-code-generator/java/annotation/utils/RawAnnotationParameterValue.ts");


class JavaAnnotation {
    _type;
    _parameters;
    constructor(annotationType, parameters = {}) {
        this._type = annotationType;
        this._parameters = parameters;
    }
    get type() {
        return this._type;
    }
    get parameters() {
        return this._parameters;
    }
    format() {
        return (0,_erdiagram_converter_oop_source_code_generator_java_annotation_utils_formatJavaAnnotation__WEBPACK_IMPORTED_MODULE_0__["default"])(this);
    }
    static createRawParameterValue = _erdiagram_converter_oop_source_code_generator_java_annotation_utils_RawAnnotationParameterValue__WEBPACK_IMPORTED_MODULE_1__.createRawParameterValue;
    static isRawParameterValue = _erdiagram_converter_oop_source_code_generator_java_annotation_utils_RawAnnotationParameterValue__WEBPACK_IMPORTED_MODULE_1__.isRawParameterValue;
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/annotation/annotation-parameter-types.ts":
/*!**************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/annotation/annotation-parameter-types.ts ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/annotation/exports.ts":
/*!*******************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/annotation/exports.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JavaAnnotation: () => (/* reexport safe */ _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/annotation/JavaAnnotation */ "./src/main/erdiagram/converter/oop/source-code-generator/java/annotation/JavaAnnotation.ts");
/* harmony import */ var _annotation_parameter_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./annotation-parameter-types */ "./src/main/erdiagram/converter/oop/source-code-generator/java/annotation/annotation-parameter-types.ts");





/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/annotation/utils/RawAnnotationParameterValue.ts":
/*!*********************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/annotation/utils/RawAnnotationParameterValue.ts ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createRawParameterValue: () => (/* binding */ createRawParameterValue),
/* harmony export */   isRawParameterValue: () => (/* binding */ isRawParameterValue)
/* harmony export */ });
const RAW_ANNOTATION_PARAMETER_VALUE_SYMBOL = Symbol('RawAnnotationParameterValue');
function createRawParameterValue(code, ...usedTypes) {
    return {
        [RAW_ANNOTATION_PARAMETER_VALUE_SYMBOL]: true,
        code,
        usedTypes
    };
}
function isRawParameterValue(value) {
    return value != null && typeof value === 'object' && value[RAW_ANNOTATION_PARAMETER_VALUE_SYMBOL];
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/annotation/utils/formatJavaAnnotation.ts":
/*!**************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/annotation/utils/formatJavaAnnotation.ts ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ formatJavaAnnotation)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/annotation/JavaAnnotation */ "./src/main/erdiagram/converter/oop/source-code-generator/java/annotation/JavaAnnotation.ts");

const VALUE_PARAMETER_NAME = 'value';
function formatJavaAnnotation(annotation) {
    const simpleName = annotation.type.formatSimple();
    const formattedParams = formatAnnotationParameters(annotation.parameters);
    return `@${simpleName}${formattedParams}`;
}
function formatAnnotationParameters(annotationParameters) {
    const annotationParamsEntries = Object.entries(annotationParameters)
        .filter(([, paramValue]) => paramValue != null);
    if (annotationParamsEntries.length === 0) {
        return '';
    }
    const formattedParams = formatAnnotationParametersEntries(annotationParamsEntries);
    return `(${formattedParams})`;
}
function formatAnnotationParametersEntries(annotationParamsEntries) {
    if (hasOnlyValueParameter(annotationParamsEntries)) {
        const [[, value]] = annotationParamsEntries;
        return formatAnnotationParameterValue(value);
    }
    return annotationParamsEntries.map(formatAnnotationParameterEntry).join(', ');
}
function formatAnnotationParameterEntry(paramEntry) {
    const [paramName, paramValue] = paramEntry;
    const formattedValue = formatAnnotationParameterValue(paramValue);
    return `${paramName} = ${formattedValue}`;
}
function hasOnlyValueParameter(annotationParamsEntries) {
    if (annotationParamsEntries.length !== 1) {
        return false;
    }
    const [[key]] = annotationParamsEntries;
    return key === VALUE_PARAMETER_NAME;
}
function formatAnnotationParameterValue(value) {
    if (!Array.isArray(value)) {
        return formatAnnotationParameterSingleValue(value);
    }
    const formattedValues = value.map(formatAnnotationParameterSingleValue);
    return `{${formattedValues.join(', ')}}`;
}
function formatAnnotationParameterSingleValue(value) {
    switch (typeof value) {
        case 'number':
        case 'boolean':
            return String(value);
        case 'string':
            return `"${value}"`;
        default:
            if (_erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__["default"].isRawParameterValue(value)) {
                return value.code;
            }
            return formatJavaAnnotation(value);
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/code/JavaClassCodeGenerator.ts":
/*!****************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/code/JavaClassCodeGenerator.ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ JavaClassCodeGenerator)
/* harmony export */ });
/* harmony import */ var _erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/util/indent-utils */ "./src/main/erdiagram/util/indent-utils.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_type_import_JavaImportStatementsGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/type/import/JavaImportStatementsGenerator */ "./src/main/erdiagram/converter/oop/source-code-generator/java/type/import/JavaImportStatementsGenerator.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_code_util_prependVisibility__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/code/util/prependVisibility */ "./src/main/erdiagram/converter/oop/source-code-generator/java/code/util/prependVisibility.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_code_util_getAnnotationsLines__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/code/util/getAnnotationsLines */ "./src/main/erdiagram/converter/oop/source-code-generator/java/code/util/getAnnotationsLines.ts");




const EMPTY_LINE = '';
class JavaClassCodeGenerator {
    _usedTypesCompiler;
    _fieldCodeGenerator;
    constructor(usedTypesCompiler, fieldCodeGenerator) {
        this._usedTypesCompiler = usedTypesCompiler;
        this._fieldCodeGenerator = fieldCodeGenerator;
    }
    generateCode(javaClass) {
        const fieldsLines = [];
        const methodsLines = [];
        for (const javaField of javaClass.fields) {
            const { fieldLines, getterLines, setterLines } = this._fieldCodeGenerator.generateCode(javaClass.name, javaField);
            fieldsLines.push(...fieldLines);
            methodsLines.push(...getterLines, ...setterLines);
        }
        const classOuterLines = [];
        if (javaClass.packageName) {
            classOuterLines.push(`package ${javaClass.packageName};`, EMPTY_LINE);
        }
        const importLines = this.generateImportLines(javaClass);
        if (importLines.length > 0) {
            classOuterLines.push(...importLines, EMPTY_LINE);
        }
        classOuterLines.push(...(0,_erdiagram_converter_oop_source_code_generator_java_code_util_getAnnotationsLines__WEBPACK_IMPORTED_MODULE_3__["default"])(javaClass.annotations), (0,_erdiagram_converter_oop_source_code_generator_java_code_util_prependVisibility__WEBPACK_IMPORTED_MODULE_2__["default"])(`class ${javaClass.name} {`, javaClass.visibility), EMPTY_LINE);
        if (fieldsLines.length > 0) {
            classOuterLines.push(...(0,_erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_0__.indentLines)(fieldsLines), EMPTY_LINE);
        }
        if (methodsLines.length > 0) {
            classOuterLines.push(...(0,_erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_0__.indentLines)(methodsLines));
        }
        classOuterLines.push(`}`);
        return classOuterLines.join('\n');
    }
    generateImportLines(javaClass) {
        const usedTypes = this._usedTypesCompiler.getUsedTypes(javaClass);
        const javaImportStatementsGenerator = new _erdiagram_converter_oop_source_code_generator_java_type_import_JavaImportStatementsGenerator__WEBPACK_IMPORTED_MODULE_1__["default"](javaClass.packageName);
        return javaImportStatementsGenerator.generateImportStatements(usedTypes);
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/code/JavaClassModelCodeGenerator.ts":
/*!*********************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/code/JavaClassModelCodeGenerator.ts ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ JavaClassModelCodeGenerator)
/* harmony export */ });
class JavaClassModelCodeGenerator {
    _javaClassCodeGenerator;
    constructor(javaClassCodeGenerator) {
        this._javaClassCodeGenerator = javaClassCodeGenerator;
    }
    generateCode(javaClassModel) {
        return javaClassModel.classes
            .map(javaClass => this.generateClassCode(javaClass))
            .join('\n\n');
    }
    generateClassCode(javaClass) {
        const headerComment = this.generateClassHeaderComment(javaClass);
        const classCode = this._javaClassCodeGenerator.generateCode(javaClass);
        return `${headerComment}\n\n${classCode}`;
    }
    generateClassHeaderComment(javaClass) {
        return `/* ========== ${javaClass.name} class ========== */`;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/code/JavaClassModelSourceFilesGenerator.ts":
/*!****************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/code/JavaClassModelSourceFilesGenerator.ts ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ JavaClassModelSourceFilesGenerator)
/* harmony export */ });
class JavaClassModelSourceFilesGenerator {
    _javaClassCodeGenerator;
    constructor(javaClassCodeGenerator) {
        this._javaClassCodeGenerator = javaClassCodeGenerator;
    }
    generateSourceFiles(javaClassModel) {
        return javaClassModel.classes.map(javaClass => this.generateClassSourceFile(javaClass));
    }
    generateClassSourceFile(javaClass) {
        return {
            folder: this.generateClassSourceFileFolder(javaClass),
            filename: this.generateClassSourceFileName(javaClass),
            contents: this._javaClassCodeGenerator.generateCode(javaClass)
        };
    }
    generateClassSourceFileFolder(javaClass) {
        return javaClass.packageName?.split('.') ?? [];
    }
    generateClassSourceFileName(javaClass) {
        return `${javaClass.name}.java`;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/code/JavaFieldCodeGenerator.ts":
/*!****************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/code/JavaFieldCodeGenerator.ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ JavaFieldCodeGenerator)
/* harmony export */ });
/* harmony import */ var _erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/util/indent-utils */ "./src/main/erdiagram/util/indent-utils.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_code_util_prependVisibility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/code/util/prependVisibility */ "./src/main/erdiagram/converter/oop/source-code-generator/java/code/util/prependVisibility.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_code_util_getAnnotationsLines__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/code/util/getAnnotationsLines */ "./src/main/erdiagram/converter/oop/source-code-generator/java/code/util/getAnnotationsLines.ts");



const EMPTY_LINE = '';
class JavaFieldCodeGenerator {
    generateCode(className, javaField) {
        const fieldLines = [];
        const fieldName = javaField.name;
        const formattedJavaType = javaField.type.formatSimple();
        fieldLines.push(...(0,_erdiagram_converter_oop_source_code_generator_java_code_util_getAnnotationsLines__WEBPACK_IMPORTED_MODULE_2__["default"])(javaField.annotations));
        fieldLines.push((0,_erdiagram_converter_oop_source_code_generator_java_code_util_prependVisibility__WEBPACK_IMPORTED_MODULE_1__["default"])(`${formattedJavaType} ${fieldName};`, javaField.visibility));
        const getterLines = this.createGetterLines(fieldName, formattedJavaType, javaField.getter);
        const setterLines = this.createSetterLines(className, fieldName, formattedJavaType, javaField.setter);
        return {
            fieldLines,
            getterLines,
            setterLines
        };
    }
    createGetterLines(fieldName, formattedJavaType, getter) {
        if (getter == null) {
            return [];
        }
        return [
            ...(0,_erdiagram_converter_oop_source_code_generator_java_code_util_getAnnotationsLines__WEBPACK_IMPORTED_MODULE_2__["default"])(getter.annotations),
            (0,_erdiagram_converter_oop_source_code_generator_java_code_util_prependVisibility__WEBPACK_IMPORTED_MODULE_1__["default"])(`${formattedJavaType} ${getter.name}() {`, getter.visibility),
            (0,_erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_0__.indentLine)(`return ${fieldName};`),
            '}',
            EMPTY_LINE
        ];
    }
    createSetterLines(className, fieldName, formattedJavaType, setter) {
        if (setter == null) {
            return [];
        }
        const returnType = setter.fluent ? className : 'void';
        const implementationLines = [
            `this.${fieldName} = ${fieldName};`
        ];
        if (setter.fluent) {
            implementationLines.push('return this;');
        }
        return [
            ...(0,_erdiagram_converter_oop_source_code_generator_java_code_util_getAnnotationsLines__WEBPACK_IMPORTED_MODULE_2__["default"])(setter.annotations),
            (0,_erdiagram_converter_oop_source_code_generator_java_code_util_prependVisibility__WEBPACK_IMPORTED_MODULE_1__["default"])(`${returnType} ${setter.name}(${formattedJavaType} ${fieldName}) {`, setter.visibility),
            ...(0,_erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_0__.indentLines)(implementationLines),
            '}',
            EMPTY_LINE
        ];
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/code/util/getAnnotationsLines.ts":
/*!******************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/code/util/getAnnotationsLines.ts ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getAnnotationsLines)
/* harmony export */ });
function getAnnotationsLines(annotations) {
    return annotations.map(annotation => annotation.format());
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/code/util/prependVisibility.ts":
/*!****************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/code/util/prependVisibility.ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ prependVisibility)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_model_java_class_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types */ "./src/main/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types.ts");

function prependVisibility(text, visibility) {
    if (visibility === _erdiagram_converter_oop_source_code_generator_java_model_java_class_model_types__WEBPACK_IMPORTED_MODULE_0__.JavaVisibility.PACKAGE_PRIVATE) {
        return text;
    }
    return visibility + ' ' + text;
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/exports.ts":
/*!********************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/exports.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BeanValidationConfigManager: () => (/* reexport safe */ _validation_exports__WEBPACK_IMPORTED_MODULE_6__.BeanValidationConfigManager),
/* harmony export */   BeanValidationTransformer: () => (/* reexport safe */ _validation_exports__WEBPACK_IMPORTED_MODULE_6__.BeanValidationTransformer),
/* harmony export */   JavaAnnotation: () => (/* reexport safe */ _annotation_exports__WEBPACK_IMPORTED_MODULE_2__.JavaAnnotation),
/* harmony export */   JavaClassModelConfigManager: () => (/* reexport safe */ _model_exports__WEBPACK_IMPORTED_MODULE_3__.JavaClassModelConfigManager),
/* harmony export */   JavaClassModelGenerator: () => (/* reexport safe */ _model_exports__WEBPACK_IMPORTED_MODULE_3__.JavaClassModelGenerator),
/* harmony export */   JavaExtendedPackage: () => (/* reexport safe */ _type_exports__WEBPACK_IMPORTED_MODULE_7__.JavaExtendedPackage),
/* harmony export */   JavaSourceCodeGenerator: () => (/* reexport safe */ _JavaSourceCodeGenerator__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   JavaSourceCodeGeneratorBuilder: () => (/* reexport safe */ _JavaSourceCodeGeneratorBuilder__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   JavaVisibility: () => (/* reexport safe */ _model_exports__WEBPACK_IMPORTED_MODULE_3__.JavaVisibility),
/* harmony export */   JpaConfigManager: () => (/* reexport safe */ _jpa_exports__WEBPACK_IMPORTED_MODULE_4__.JpaConfigManager),
/* harmony export */   JpaTransformer: () => (/* reexport safe */ _jpa_exports__WEBPACK_IMPORTED_MODULE_4__.JpaTransformer),
/* harmony export */   JpaTransformerBuilder: () => (/* reexport safe */ _jpa_exports__WEBPACK_IMPORTED_MODULE_4__.JpaTransformerBuilder),
/* harmony export */   LombokConfigManager: () => (/* reexport safe */ _lombok_exports__WEBPACK_IMPORTED_MODULE_5__.LombokConfigManager),
/* harmony export */   LombokTransformer: () => (/* reexport safe */ _lombok_exports__WEBPACK_IMPORTED_MODULE_5__.LombokTransformer),
/* harmony export */   NotNullBlobValidationStrategy: () => (/* reexport safe */ _validation_exports__WEBPACK_IMPORTED_MODULE_6__.NotNullBlobValidationStrategy),
/* harmony export */   NotNullTextValidationStrategy: () => (/* reexport safe */ _validation_exports__WEBPACK_IMPORTED_MODULE_6__.NotNullTextValidationStrategy),
/* harmony export */   beanValidationConfigManager: () => (/* reexport safe */ _validation_exports__WEBPACK_IMPORTED_MODULE_6__.beanValidationConfigManager),
/* harmony export */   createJavaArrayType: () => (/* reexport safe */ _type_exports__WEBPACK_IMPORTED_MODULE_7__.createJavaArrayType),
/* harmony export */   createJavaParameterizedType: () => (/* reexport safe */ _type_exports__WEBPACK_IMPORTED_MODULE_7__.createJavaParameterizedType),
/* harmony export */   createJavaSimpleType: () => (/* reexport safe */ _type_exports__WEBPACK_IMPORTED_MODULE_7__.createJavaSimpleType),
/* harmony export */   isJavaParameterizedType: () => (/* reexport safe */ _type_exports__WEBPACK_IMPORTED_MODULE_7__.isJavaParameterizedType),
/* harmony export */   javaClassModelConfigManager: () => (/* reexport safe */ _model_exports__WEBPACK_IMPORTED_MODULE_3__.javaClassModelConfigManager),
/* harmony export */   jpaConfigManager: () => (/* reexport safe */ _jpa_exports__WEBPACK_IMPORTED_MODULE_4__.jpaConfigManager),
/* harmony export */   lombokConfigManager: () => (/* reexport safe */ _lombok_exports__WEBPACK_IMPORTED_MODULE_5__.lombokConfigManager),
/* harmony export */   parseJavaType: () => (/* reexport safe */ _type_exports__WEBPACK_IMPORTED_MODULE_7__.parseJavaType)
/* harmony export */ });
/* harmony import */ var _JavaSourceCodeGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./JavaSourceCodeGenerator */ "./src/main/erdiagram/converter/oop/source-code-generator/java/JavaSourceCodeGenerator.ts");
/* harmony import */ var _JavaSourceCodeGeneratorBuilder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./JavaSourceCodeGeneratorBuilder */ "./src/main/erdiagram/converter/oop/source-code-generator/java/JavaSourceCodeGeneratorBuilder.ts");
/* harmony import */ var _annotation_exports__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./annotation/exports */ "./src/main/erdiagram/converter/oop/source-code-generator/java/annotation/exports.ts");
/* harmony import */ var _model_exports__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./model/exports */ "./src/main/erdiagram/converter/oop/source-code-generator/java/model/exports.ts");
/* harmony import */ var _jpa_exports__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./jpa/exports */ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/exports.ts");
/* harmony import */ var _lombok_exports__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lombok/exports */ "./src/main/erdiagram/converter/oop/source-code-generator/java/lombok/exports.ts");
/* harmony import */ var _validation_exports__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./validation/exports */ "./src/main/erdiagram/converter/oop/source-code-generator/java/validation/exports.ts");
/* harmony import */ var _type_exports__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./type/exports */ "./src/main/erdiagram/converter/oop/source-code-generator/java/type/exports.ts");











/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/JpaAnnotationTypesProvider.ts":
/*!*******************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/JpaAnnotationTypesProvider.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ JpaAnnotationTypesProvider)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/type/simple/createJavaSimpleType */ "./src/main/erdiagram/converter/oop/source-code-generator/java/type/simple/createJavaSimpleType.ts");

class JpaAnnotationTypesProvider {
    _packageName;
    constructor(javaExtendedPackage) {
        this._packageName = `${javaExtendedPackage}.persistence`;
    }
    entity() {
        return (0,_erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__["default"])('Entity', this._packageName);
    }
    table() {
        return (0,_erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__["default"])('Table', this._packageName);
    }
    column() {
        return (0,_erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__["default"])('Column', this._packageName);
    }
    id() {
        return (0,_erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__["default"])('Id', this._packageName);
    }
    generatedValue() {
        return (0,_erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__["default"])('GeneratedValue', this._packageName);
    }
    oneToOne() {
        return (0,_erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__["default"])('OneToOne', this._packageName);
    }
    oneToMany() {
        return (0,_erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__["default"])('OneToMany', this._packageName);
    }
    manyToOne() {
        return (0,_erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__["default"])('ManyToOne', this._packageName);
    }
    manyToMany() {
        return (0,_erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__["default"])('ManyToMany', this._packageName);
    }
    joinTable() {
        return (0,_erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__["default"])('JoinTable', this._packageName);
    }
    joinColumn() {
        return (0,_erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__["default"])('JoinColumn', this._packageName);
    }
    joinColumns() {
        return (0,_erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__["default"])('JoinColumns', this._packageName);
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/JpaEnumTypesProvider.ts":
/*!*************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/JpaEnumTypesProvider.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ JpaEnumTypesProvider)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/type/simple/createJavaSimpleType */ "./src/main/erdiagram/converter/oop/source-code-generator/java/type/simple/createJavaSimpleType.ts");

class JpaEnumTypesProvider {
    _packageName;
    constructor(javaExtendedPackage) {
        this._packageName = `${javaExtendedPackage}.persistence`;
    }
    generationType() {
        return (0,_erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__["default"])('GenerationType', this._packageName);
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/config/JpaConfigManager.ts":
/*!****************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/config/JpaConfigManager.ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JpaConfigManager: () => (/* binding */ JpaConfigManager),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _erdiagram_common_config_AbstractConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/common/config/AbstractConfigManager */ "./src/main/erdiagram/common/config/AbstractConfigManager.ts");
/* harmony import */ var true_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! true-json */ "./node_modules/true-json/dist/true-json.umd.js");
/* harmony import */ var true_json__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(true_json__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/common/case-format/StandardCaseFormats */ "./src/main/erdiagram/converter/common/case-format/StandardCaseFormats.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_type_JavaExtendedPackage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/type/JavaExtendedPackage */ "./src/main/erdiagram/converter/oop/source-code-generator/java/type/JavaExtendedPackage.ts");




class JpaConfigManager extends _erdiagram_common_config_AbstractConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"] {
    getDefaultConfig() {
        return {
            tableNameCaseFormat: _erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_2__["default"].UPPER_CAMEL,
            columnNameCaseFormat: _erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_2__["default"].LOWER_CAMEL,
            annotateGetters: false,
            useExplicitTableName: false,
            useExplicitColumnName: false,
            javaExtendedPackage: _erdiagram_converter_oop_source_code_generator_java_type_JavaExtendedPackage__WEBPACK_IMPORTED_MODULE_3__["default"].JAKARTA
        };
    }
    mergeConfigs(fullConfig, partialConfig) {
        return {
            ...fullConfig,
            ...partialConfig
        };
    }
    getJsonAdapter() {
        return true_json__WEBPACK_IMPORTED_MODULE_1__.JsonAdapters.object({
            tableNameCaseFormat: true_json__WEBPACK_IMPORTED_MODULE_1__.JsonAdapters.byKeyLenient(_erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_2__["default"], 'UPPER_CAMEL'),
            columnNameCaseFormat: true_json__WEBPACK_IMPORTED_MODULE_1__.JsonAdapters.byKeyLenient(_erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_2__["default"], 'LOWER_CAMEL')
        });
    }
}
const jpaConfigManager = new JpaConfigManager();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (jpaConfigManager);


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/config/exports.ts":
/*!*******************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/config/exports.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JpaConfigManager: () => (/* reexport safe */ _JpaConfigManager__WEBPACK_IMPORTED_MODULE_0__.JpaConfigManager),
/* harmony export */   jpaConfigManager: () => (/* reexport safe */ _JpaConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _JpaConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./JpaConfigManager */ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/config/JpaConfigManager.ts");




/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/exports.ts":
/*!************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/exports.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JpaConfigManager: () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_0__.JpaConfigManager),
/* harmony export */   JpaTransformer: () => (/* reexport safe */ _transformer_exports__WEBPACK_IMPORTED_MODULE_1__.JpaTransformer),
/* harmony export */   JpaTransformerBuilder: () => (/* reexport safe */ _transformer_exports__WEBPACK_IMPORTED_MODULE_1__.JpaTransformerBuilder),
/* harmony export */   jpaConfigManager: () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_0__.jpaConfigManager)
/* harmony export */ });
/* harmony import */ var _config_exports__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config/exports */ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/config/exports.ts");
/* harmony import */ var _transformer_exports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transformer/exports */ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/exports.ts");




/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/JpaTransformer.ts":
/*!*******************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/JpaTransformer.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JpaTransformer: () => (/* binding */ JpaTransformer)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_jpa_config_JpaConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/jpa/config/JpaConfigManager */ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/config/JpaConfigManager.ts");
/* harmony import */ var _erdiagram_converter_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/common/case-format/CaseConverter */ "./src/main/erdiagram/converter/common/case-format/CaseConverter.ts");
/* harmony import */ var _erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/common/case-format/StandardCaseFormats */ "./src/main/erdiagram/converter/common/case-format/StandardCaseFormats.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_jpa_transformer_visitor_field_JpaTransformerFieldVisitor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/visitor/field/JpaTransformerFieldVisitor */ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/visitor/field/JpaTransformerFieldVisitor.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_jpa_transformer_visitor_class_JpaTransformerClassVisitor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/visitor/class/JpaTransformerClassVisitor */ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/visitor/class/JpaTransformerClassVisitor.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_jpa_transformer_setup_JpaTransformerSetupDataGenerator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/setup/JpaTransformerSetupDataGenerator */ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/setup/JpaTransformerSetupDataGenerator.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_jpa_transformer_JpaTransformerBuilder__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/JpaTransformerBuilder */ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/JpaTransformerBuilder.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_jpa_JpaAnnotationTypesProvider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/jpa/JpaAnnotationTypesProvider */ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/JpaAnnotationTypesProvider.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_jpa_JpaEnumTypesProvider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/jpa/JpaEnumTypesProvider */ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/JpaEnumTypesProvider.ts");









class JpaTransformer {
    _setupDataGenerator;
    _fieldVisitor;
    _classVisitor;
    constructor(databaseModelGenerator, config) {
        const { tableNameCaseFormat, columnNameCaseFormat, annotateGetters, useExplicitTableName, useExplicitColumnName, javaExtendedPackage } = _erdiagram_converter_oop_source_code_generator_java_jpa_config_JpaConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"].mergeWithDefaultConfig(config);
        const tableNameCaseConverter = new _erdiagram_converter_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_1__["default"](_erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_2__["default"].UPPER_CAMEL, tableNameCaseFormat);
        const columnNameCaseConverter = new _erdiagram_converter_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_1__["default"](_erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_2__["default"].UPPER_CAMEL, columnNameCaseFormat);
        const annotationTypesProvider = new _erdiagram_converter_oop_source_code_generator_java_jpa_JpaAnnotationTypesProvider__WEBPACK_IMPORTED_MODULE_7__["default"](javaExtendedPackage);
        const enumTypesProvider = new _erdiagram_converter_oop_source_code_generator_java_jpa_JpaEnumTypesProvider__WEBPACK_IMPORTED_MODULE_8__["default"](javaExtendedPackage);
        this._setupDataGenerator = new _erdiagram_converter_oop_source_code_generator_java_jpa_transformer_setup_JpaTransformerSetupDataGenerator__WEBPACK_IMPORTED_MODULE_5__["default"](databaseModelGenerator);
        this._fieldVisitor = new _erdiagram_converter_oop_source_code_generator_java_jpa_transformer_visitor_field_JpaTransformerFieldVisitor__WEBPACK_IMPORTED_MODULE_3__["default"](tableNameCaseConverter, columnNameCaseConverter, annotateGetters, useExplicitColumnName, annotationTypesProvider, enumTypesProvider);
        this._classVisitor = new _erdiagram_converter_oop_source_code_generator_java_jpa_transformer_visitor_class_JpaTransformerClassVisitor__WEBPACK_IMPORTED_MODULE_4__["default"](tableNameCaseConverter, useExplicitTableName, annotationTypesProvider);
    }
    setup(context) {
        return this._setupDataGenerator.setup(context);
    }
    visitField(javaField, context) {
        this._fieldVisitor.visitField(javaField, context);
    }
    visitClass(javaClass, context) {
        this._classVisitor.visitClass(javaClass, context);
    }
    visitModel() {
        // Do nothing
    }
    static withDefaultConfig() {
        return this.builder().build();
    }
    static builder() {
        return new _erdiagram_converter_oop_source_code_generator_java_jpa_transformer_JpaTransformerBuilder__WEBPACK_IMPORTED_MODULE_6__["default"]();
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/JpaTransformerBuilder.ts":
/*!**************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/JpaTransformerBuilder.ts ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ JpaTransformerBuilder)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_database_model_DatabaseModelGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/database/model/DatabaseModelGenerator */ "./src/main/erdiagram/converter/database/model/DatabaseModelGenerator.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_jpa_transformer_JpaTransformer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/JpaTransformer */ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/JpaTransformer.ts");


class JpaTransformerBuilder {
    _databaseModelConfig = {};
    _config = {};
    configureDatabaseModel(config) {
        this._databaseModelConfig = config;
        return this;
    }
    configureJpa(config) {
        this._config = config;
        return this;
    }
    build() {
        return new _erdiagram_converter_oop_source_code_generator_java_jpa_transformer_JpaTransformer__WEBPACK_IMPORTED_MODULE_1__.JpaTransformer(new _erdiagram_converter_database_model_DatabaseModelGenerator__WEBPACK_IMPORTED_MODULE_0__["default"](this._databaseModelConfig), this._config);
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/exports.ts":
/*!************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/exports.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JpaTransformer: () => (/* reexport safe */ _JpaTransformer__WEBPACK_IMPORTED_MODULE_0__.JpaTransformer),
/* harmony export */   JpaTransformerBuilder: () => (/* reexport safe */ _JpaTransformerBuilder__WEBPACK_IMPORTED_MODULE_1__["default"])
/* harmony export */ });
/* harmony import */ var _JpaTransformer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./JpaTransformer */ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/JpaTransformer.ts");
/* harmony import */ var _JpaTransformerBuilder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./JpaTransformerBuilder */ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/JpaTransformerBuilder.ts");





/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/finder/ClassModelSourceFinder.ts":
/*!**********************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/finder/ClassModelSourceFinder.ts ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ClassModelSourceFinder)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_oop_model_source_metadata_source_metadata_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/model/source-metadata/source-metadata-utils */ "./src/main/erdiagram/converter/oop/model/source-metadata/source-metadata-utils.ts");

class ClassModelSourceFinder {
    findClassAndFieldFromReferencedMember(classModel, referencedMember) {
        for (const classDescriptor of classModel.classes) {
            const foundField = classDescriptor.fields.find(field => this.isCorrespondingField(field, referencedMember));
            if (foundField != null) {
                return {
                    classDescriptor,
                    field: foundField
                };
            }
        }
        throw new Error(`Cannot find field from target member "${referencedMember.entityAlias}"`);
    }
    isCorrespondingField(field, referencedMember) {
        return (0,_erdiagram_converter_oop_model_source_metadata_source_metadata_utils__WEBPACK_IMPORTED_MODULE_0__.isRelationshipMemberSourceMetadata)(field.sourceMetadata) && field.sourceMetadata.referencedMember === referencedMember;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/finder/DatabaseModelSourceFinder.ts":
/*!*************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/finder/DatabaseModelSourceFinder.ts ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DatabaseModelSourceFinder)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_oop_model_source_metadata_source_metadata_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/model/source-metadata/source-metadata-utils */ "./src/main/erdiagram/converter/oop/model/source-metadata/source-metadata-utils.ts");

// FIXME change this name or refactor this class, as it also retrieves field and class descriptors, not only database ones
class DatabaseModelSourceFinder {
    findTableAndReferenceFromReferencedMember(databaseModel, referencedMember) {
        for (const table of databaseModel.tables) {
            for (const reference of table.references) {
                if (reference.sourceMetadata.referencedMember === referencedMember) {
                    return {
                        table,
                        reference
                    };
                }
            }
        }
        throw new Error(`Cannot find reference from target member "${referencedMember.entityAlias}"`);
    }
    findTableFromEntity(databaseModel, entity) {
        const foundTable = databaseModel.tables.find(table => this.isCorrespondingTable(entity, table));
        if (foundTable == null) {
            throw new Error(`Cannot find the corresponding table for entity "${entity.name}"`);
        }
        return foundTable;
    }
    isCorrespondingTable(entity, tableDescriptor) {
        return (0,_erdiagram_converter_oop_model_source_metadata_source_metadata_utils__WEBPACK_IMPORTED_MODULE_0__.isEntitySourceMetadata)(tableDescriptor.sourceMetadata) && tableDescriptor.sourceMetadata.entity === entity;
    }
    findColumnFromProperty(databaseModel, property) {
        for (const table of databaseModel.tables) {
            for (const column of table.columns) {
                if (column.sourceMetadata.property === property) {
                    return column;
                }
            }
        }
        throw new Error(`Cannot find the corresponding column for property "${property.name}"`);
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/setup/JpaTransformerSetupDataGenerator.ts":
/*!*******************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/setup/JpaTransformerSetupDataGenerator.ts ***!
  \*******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ JpaTransformerSetupDataGenerator)
/* harmony export */ });
class JpaTransformerSetupDataGenerator {
    _databaseModelGenerator;
    constructor(databaseModelGenerator) {
        this._databaseModelGenerator = databaseModelGenerator;
    }
    setup(context) {
        return {
            databaseModel: this._databaseModelGenerator.generateDatabaseModel(context.entityRelationshipModel)
        };
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/visitor/class/JpaTransformerClassVisitor.ts":
/*!*********************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/visitor/class/JpaTransformerClassVisitor.ts ***!
  \*********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ JpaTransformerClassVisitor)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/annotation/JavaAnnotation */ "./src/main/erdiagram/converter/oop/source-code-generator/java/annotation/JavaAnnotation.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_jpa_transformer_finder_DatabaseModelSourceFinder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/finder/DatabaseModelSourceFinder */ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/finder/DatabaseModelSourceFinder.ts");


class JpaTransformerClassVisitor {
    _tableNameCaseConverter;
    _useExplicitTableName;
    _annotationTypesProvider;
    _databaseModelSourceFinder;
    constructor(_tableNameCaseConverter, _useExplicitTableName, _annotationTypesProvider) {
        this._tableNameCaseConverter = _tableNameCaseConverter;
        this._useExplicitTableName = _useExplicitTableName;
        this._annotationTypesProvider = _annotationTypesProvider;
        this._databaseModelSourceFinder = new _erdiagram_converter_oop_source_code_generator_java_jpa_transformer_finder_DatabaseModelSourceFinder__WEBPACK_IMPORTED_MODULE_1__["default"]();
    }
    visitClass(javaClass, context) {
        const table = this._databaseModelSourceFinder.findTableFromEntity(context.setupData.databaseModel, context.classDescriptor.sourceMetadata.entity);
        javaClass.annotations.push(new _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__["default"](this._annotationTypesProvider.entity()));
        if (this._useExplicitTableName) {
            this.addTableAnnotation(javaClass, table);
        }
    }
    addTableAnnotation(javaClass, table) {
        const tableAnnotation = new _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__["default"](this._annotationTypesProvider.table(), {
            name: this.formatTableName(table.name)
        });
        javaClass.annotations.push(tableAnnotation);
    }
    formatTableName(tableName) {
        return this._tableNameCaseConverter.convertCase(tableName);
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/visitor/field/ColumnFieldAnnotationsSupplier.ts":
/*!*************************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/visitor/field/ColumnFieldAnnotationsSupplier.ts ***!
  \*************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ColumnFieldAnnotationsSupplier)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/annotation/JavaAnnotation */ "./src/main/erdiagram/converter/oop/source-code-generator/java/annotation/JavaAnnotation.ts");
/* harmony import */ var _erdiagram_converter_oop_model_source_metadata_source_metadata_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/oop/model/source-metadata/source-metadata-utils */ "./src/main/erdiagram/converter/oop/model/source-metadata/source-metadata-utils.ts");


class ColumnFieldAnnotationsSupplier {
    _databaseModelSourceFinder;
    _columnNameCaseConverter;
    _useExplicitColumnName;
    _annotationTypesProvider;
    constructor(_databaseModelSourceFinder, _columnNameCaseConverter, _useExplicitColumnName, _annotationTypesProvider) {
        this._databaseModelSourceFinder = _databaseModelSourceFinder;
        this._columnNameCaseConverter = _columnNameCaseConverter;
        this._useExplicitColumnName = _useExplicitColumnName;
        this._annotationTypesProvider = _annotationTypesProvider;
    }
    getAnnotations(javaField, context) {
        const columnAnnotation = this.getColumnAnnotation(context.fieldDescriptor, context.setupData.databaseModel);
        return columnAnnotation != null ? [columnAnnotation] : [];
    }
    getColumnAnnotation(fieldDescriptor, databaseModel) {
        const columnName = this.getColumnName(fieldDescriptor, databaseModel);
        if (columnName == null) {
            return null;
        }
        const columnAnnotationParameters = {
            name: this._useExplicitColumnName ? this.formatColumnName(columnName) : undefined,
            nullable: fieldDescriptor.nullable ? undefined : false
        };
        const allValuesAreUndefined = Object.values(columnAnnotationParameters).every(parameterValue => parameterValue === undefined);
        if (allValuesAreUndefined) {
            // Column annotation is not needed
            return null;
        }
        return new _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__["default"](this._annotationTypesProvider.column(), columnAnnotationParameters);
    }
    getColumnName(fieldDescriptor, databaseModel) {
        const { sourceMetadata } = fieldDescriptor;
        if ((0,_erdiagram_converter_oop_model_source_metadata_source_metadata_utils__WEBPACK_IMPORTED_MODULE_1__.isEntityIdentitySourceMetadata)(sourceMetadata)) {
            const table = this._databaseModelSourceFinder.findTableFromEntity(databaseModel, sourceMetadata.entity);
            return table.identityColumnName;
        }
        if ((0,_erdiagram_converter_oop_model_source_metadata_source_metadata_utils__WEBPACK_IMPORTED_MODULE_1__.isEntityPropertySourceMetadata)(sourceMetadata)) {
            const column = this._databaseModelSourceFinder.findColumnFromProperty(databaseModel, sourceMetadata.property);
            return column.name;
        }
        return null;
    }
    formatColumnName(columnName) {
        return this._columnNameCaseConverter.convertCase(columnName);
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/visitor/field/IdentityFieldAnnotationsSupplier.ts":
/*!***************************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/visitor/field/IdentityFieldAnnotationsSupplier.ts ***!
  \***************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IdentityFieldAnnotationsSupplier)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/annotation/JavaAnnotation */ "./src/main/erdiagram/converter/oop/source-code-generator/java/annotation/JavaAnnotation.ts");
/* harmony import */ var _erdiagram_converter_oop_model_source_metadata_source_metadata_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/oop/model/source-metadata/source-metadata-utils */ "./src/main/erdiagram/converter/oop/model/source-metadata/source-metadata-utils.ts");


class IdentityFieldAnnotationsSupplier {
    _annotationTypesProvider;
    _enumTypesProvider;
    constructor(_annotationTypesProvider, _enumTypesProvider) {
        this._annotationTypesProvider = _annotationTypesProvider;
        this._enumTypesProvider = _enumTypesProvider;
    }
    getAnnotations(javaField, context) {
        if (!(0,_erdiagram_converter_oop_model_source_metadata_source_metadata_utils__WEBPACK_IMPORTED_MODULE_1__.isEntityIdentitySourceMetadata)(context.fieldDescriptor.sourceMetadata)) {
            return [];
        }
        return [
            new _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__["default"](this._annotationTypesProvider.id()),
            new _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__["default"](this._annotationTypesProvider.generatedValue(), {
                // FIXME allow configuring the generation type (if IDENTITY is not valid for all scenarios)
                strategy: _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__["default"].createRawParameterValue('GenerationType.IDENTITY', this._enumTypesProvider.generationType())
            })
        ];
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/visitor/field/JpaTransformerFieldVisitor.ts":
/*!*********************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/visitor/field/JpaTransformerFieldVisitor.ts ***!
  \*********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ JpaTransformerFieldVisitor)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_jpa_transformer_finder_DatabaseModelSourceFinder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/finder/DatabaseModelSourceFinder */ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/finder/DatabaseModelSourceFinder.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_jpa_transformer_visitor_field_IdentityFieldAnnotationsSupplier__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/visitor/field/IdentityFieldAnnotationsSupplier */ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/visitor/field/IdentityFieldAnnotationsSupplier.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_jpa_transformer_visitor_field_ColumnFieldAnnotationsSupplier__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/visitor/field/ColumnFieldAnnotationsSupplier */ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/visitor/field/ColumnFieldAnnotationsSupplier.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_jpa_transformer_visitor_field_relationship_RelationshipFieldAnnotationsSupplier__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/visitor/field/relationship/RelationshipFieldAnnotationsSupplier */ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/visitor/field/relationship/RelationshipFieldAnnotationsSupplier.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_jpa_transformer_finder_ClassModelSourceFinder__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/finder/ClassModelSourceFinder */ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/finder/ClassModelSourceFinder.ts");





class JpaTransformerFieldVisitor {
    _annotateGetters;
    _fieldAnnotationsSuppliers;
    constructor(tableNameCaseConverter, columnNameCaseConverter, annotateGetters, useExplicitColumnName, annotationTypesProvider, enumTypesProvider) {
        this._annotateGetters = annotateGetters;
        const databaseModelSourceFinder = new _erdiagram_converter_oop_source_code_generator_java_jpa_transformer_finder_DatabaseModelSourceFinder__WEBPACK_IMPORTED_MODULE_0__["default"]();
        const classModelSourceFinder = new _erdiagram_converter_oop_source_code_generator_java_jpa_transformer_finder_ClassModelSourceFinder__WEBPACK_IMPORTED_MODULE_4__["default"]();
        this._fieldAnnotationsSuppliers = [
            new _erdiagram_converter_oop_source_code_generator_java_jpa_transformer_visitor_field_IdentityFieldAnnotationsSupplier__WEBPACK_IMPORTED_MODULE_1__["default"](annotationTypesProvider, enumTypesProvider),
            new _erdiagram_converter_oop_source_code_generator_java_jpa_transformer_visitor_field_ColumnFieldAnnotationsSupplier__WEBPACK_IMPORTED_MODULE_2__["default"](databaseModelSourceFinder, columnNameCaseConverter, useExplicitColumnName, annotationTypesProvider),
            new _erdiagram_converter_oop_source_code_generator_java_jpa_transformer_visitor_field_relationship_RelationshipFieldAnnotationsSupplier__WEBPACK_IMPORTED_MODULE_3__["default"](databaseModelSourceFinder, classModelSourceFinder, tableNameCaseConverter, columnNameCaseConverter, annotationTypesProvider)
        ];
    }
    visitField(javaField, context) {
        const annotations = this.getFieldAnnotations(javaField, context);
        const elementToAnnotate = this.getElementToAnnotate(javaField);
        elementToAnnotate.annotations.push(...annotations);
    }
    getFieldAnnotations(javaField, context) {
        return this._fieldAnnotationsSuppliers.flatMap(supplier => supplier.getAnnotations(javaField, context));
    }
    getElementToAnnotate(javaField) {
        if (this._annotateGetters && javaField.getter != null) {
            return javaField.getter;
        }
        return javaField;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/visitor/field/relationship/RelationshipFieldAnnotationsSupplier.ts":
/*!********************************************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/visitor/field/relationship/RelationshipFieldAnnotationsSupplier.ts ***!
  \********************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RelationshipFieldAnnotationsSupplier)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/annotation/JavaAnnotation */ "./src/main/erdiagram/converter/oop/source-code-generator/java/annotation/JavaAnnotation.ts");
/* harmony import */ var _erdiagram_converter_oop_model_source_metadata_source_metadata_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/oop/model/source-metadata/source-metadata-utils */ "./src/main/erdiagram/converter/oop/model/source-metadata/source-metadata-utils.ts");
/* harmony import */ var _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/parser/types/entity-relationship-model-types */ "./src/main/erdiagram/parser/types/entity-relationship-model-types.ts");



var RelationshipCardinality;
(function (RelationshipCardinality) {
    RelationshipCardinality["ONE_TO_ONE"] = "one_to_one";
    RelationshipCardinality["ONE_TO_MANY"] = "one_to_many";
    RelationshipCardinality["MANY_TO_ONE"] = "many_to_one";
    RelationshipCardinality["MANY_TO_MANY"] = "many_to_many";
})(RelationshipCardinality || (RelationshipCardinality = {}));
// TODO split this class
class RelationshipFieldAnnotationsSupplier {
    _databaseModelSourceFinder;
    _classModelSourceFinder;
    _tableNameCaseConverter;
    _columnNameCaseConverter;
    _annotationTypesProvider;
    constructor(_databaseModelSourceFinder, _classModelSourceFinder, _tableNameCaseConverter, _columnNameCaseConverter, _annotationTypesProvider) {
        this._databaseModelSourceFinder = _databaseModelSourceFinder;
        this._classModelSourceFinder = _classModelSourceFinder;
        this._tableNameCaseConverter = _tableNameCaseConverter;
        this._columnNameCaseConverter = _columnNameCaseConverter;
        this._annotationTypesProvider = _annotationTypesProvider;
    }
    getAnnotations(javaField, context) {
        const { fieldDescriptor: { sourceMetadata }, classModel, setupData: { databaseModel } } = context;
        if (!(0,_erdiagram_converter_oop_model_source_metadata_source_metadata_utils__WEBPACK_IMPORTED_MODULE_1__.isRelationshipMemberSourceMetadata)(sourceMetadata)) {
            return [];
        }
        const { relationship, referencedMember } = sourceMetadata;
        const fieldBelongsToLeftMember = referencedMember === relationship.rightMember;
        const relationshipCardinality = this.getRelationshipCardinality(relationship);
        switch (relationshipCardinality) {
            case RelationshipCardinality.ONE_TO_ONE:
                if (fieldBelongsToLeftMember) {
                    return this.getOneToOneRelationshipAnnotations(relationship.rightMember, databaseModel);
                }
                if (relationship.direction === _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__.Direction.BIDIRECTIONAL) {
                    return this.getMappedByOneToOneRelationshipAnnotations(relationship.rightMember, relationship.leftMember, classModel);
                }
                return this.getInverseOneToOneRelationshipAnnotations(relationship.rightMember, relationship.leftMember, databaseModel);
            case RelationshipCardinality.MANY_TO_ONE:
                if (fieldBelongsToLeftMember) {
                    return this.getManyToOneRelationshipAnnotations(relationship.rightMember, databaseModel);
                }
                if (relationship.direction === _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__.Direction.BIDIRECTIONAL) {
                    return this.getMappedByOneToManyRelationshipAnnotations(relationship.rightMember, classModel);
                }
                return this.getInverseOneToManyRelationshipAnnotations(relationship.rightMember, databaseModel);
            case RelationshipCardinality.ONE_TO_MANY:
                if (!fieldBelongsToLeftMember) {
                    return this.getManyToOneRelationshipAnnotations(relationship.leftMember, databaseModel);
                }
                if (relationship.direction === _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__.Direction.BIDIRECTIONAL) {
                    return this.getMappedByOneToManyRelationshipAnnotations(relationship.leftMember, classModel);
                }
                return this.getInverseOneToManyRelationshipAnnotations(relationship.leftMember, databaseModel);
            case RelationshipCardinality.MANY_TO_MANY:
                if (fieldBelongsToLeftMember) {
                    return this.getManyToManyRelationshipAnnotations(relationship.leftMember, databaseModel);
                }
                if (relationship.direction === _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__.Direction.BIDIRECTIONAL) {
                    return this.getMappedByManyToManyRelationshipAnnotations(relationship.rightMember, classModel);
                }
                return this.getManyToManyRelationshipAnnotations(relationship.rightMember, databaseModel);
        }
    }
    getRelationshipCardinality(relationship) {
        const isLeftMemberMany = relationship.leftMember.cardinality === _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__.Cardinality.MANY;
        const isRightMemberMany = relationship.rightMember.cardinality === _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__.Cardinality.MANY;
        if (isLeftMemberMany) {
            return isRightMemberMany ? RelationshipCardinality.MANY_TO_MANY : RelationshipCardinality.MANY_TO_ONE;
        }
        else {
            return isRightMemberMany ? RelationshipCardinality.ONE_TO_MANY : RelationshipCardinality.ONE_TO_ONE;
        }
    }
    getOneToOneRelationshipAnnotations(foreignMember, databaseModel) {
        const { reference } = this._databaseModelSourceFinder.findTableAndReferenceFromReferencedMember(databaseModel, foreignMember);
        const optionalRelationship = foreignMember.cardinality === _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__.Cardinality.ZERO_OR_ONE;
        return [
            new _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__["default"](this._annotationTypesProvider.oneToOne(), {
                optional: optionalRelationship ? undefined : false
            }),
            new _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__["default"](this._annotationTypesProvider.joinColumn(), {
                name: this.formatColumnName(reference.columnName),
                nullable: optionalRelationship ? undefined : false
            }),
        ];
    }
    getMappedByOneToOneRelationshipAnnotations(ownMember, foreignMember, classModel) {
        const { field } = this._classModelSourceFinder.findClassAndFieldFromReferencedMember(classModel, ownMember);
        return [
            new _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__["default"](this._annotationTypesProvider.oneToOne(), {
                mappedBy: field.name,
                optional: foreignMember.cardinality === _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__.Cardinality.ZERO_OR_ONE ? undefined : false
            }),
        ];
    }
    getInverseOneToOneRelationshipAnnotations(ownMember, foreignMember, databaseModel) {
        const { table, reference } = this._databaseModelSourceFinder.findTableAndReferenceFromReferencedMember(databaseModel, ownMember);
        return [
            new _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__["default"](this._annotationTypesProvider.oneToOne(), {
                optional: foreignMember.cardinality === _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__.Cardinality.ZERO_OR_ONE ? undefined : false
            }),
            new _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__["default"](this._annotationTypesProvider.joinTable(), {
                name: this.formatTableName(table.name),
                inverseJoinColumns: new _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__["default"](this._annotationTypesProvider.joinColumn(), {
                    name: this.formatColumnName(reference.columnName),
                    nullable: ownMember.cardinality === _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__.Cardinality.ZERO_OR_ONE ? undefined : false
                }),
            }),
        ];
    }
    getManyToOneRelationshipAnnotations(foreignMember, databaseModel) {
        const { reference } = this._databaseModelSourceFinder.findTableAndReferenceFromReferencedMember(databaseModel, foreignMember);
        const optionalRelationship = foreignMember.cardinality === _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__.Cardinality.ZERO_OR_ONE;
        return [
            new _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__["default"](this._annotationTypesProvider.manyToOne(), {
                optional: optionalRelationship ? undefined : false
            }),
            new _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__["default"](this._annotationTypesProvider.joinColumn(), {
                name: this.formatColumnName(reference.columnName),
                nullable: optionalRelationship ? undefined : false
            }),
        ];
    }
    getMappedByOneToManyRelationshipAnnotations(ownMember, classModel) {
        const { field } = this._classModelSourceFinder.findClassAndFieldFromReferencedMember(classModel, ownMember);
        return [
            new _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__["default"](this._annotationTypesProvider.oneToMany(), {
                mappedBy: field.name
            }),
        ];
    }
    getInverseOneToManyRelationshipAnnotations(ownMember, databaseModel) {
        const { table, reference } = this._databaseModelSourceFinder.findTableAndReferenceFromReferencedMember(databaseModel, ownMember);
        return [
            new _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__["default"](this._annotationTypesProvider.oneToMany()),
            new _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__["default"](this._annotationTypesProvider.joinTable(), {
                name: this.formatTableName(table.name),
                inverseJoinColumns: new _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__["default"](this._annotationTypesProvider.joinColumn(), {
                    name: this.formatColumnName(reference.columnName),
                    nullable: ownMember.cardinality === _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__.Cardinality.ZERO_OR_ONE ? undefined : false
                }),
            }),
        ];
    }
    getManyToManyRelationshipAnnotations(ownMember, databaseModel) {
        const { table, reference: ownReference } = this._databaseModelSourceFinder.findTableAndReferenceFromReferencedMember(databaseModel, ownMember);
        /* istanbul ignore next */
        if (table.references.length !== 2) {
            throw new Error('Relationship table has more than 2 references');
        }
        const foreignReference = table.references.find(reference => reference !== ownReference);
        return [
            new _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__["default"](this._annotationTypesProvider.manyToMany()),
            new _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__["default"](this._annotationTypesProvider.joinTable(), {
                name: this.formatTableName(table.name),
                joinColumns: new _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__["default"](this._annotationTypesProvider.joinColumn(), {
                    name: this.formatColumnName(ownReference.columnName),
                    nullable: false
                }),
                inverseJoinColumns: new _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__["default"](this._annotationTypesProvider.joinColumn(), {
                    name: this.formatColumnName(foreignReference.columnName),
                    nullable: false
                }),
            }),
        ];
    }
    getMappedByManyToManyRelationshipAnnotations(sourceMember, classModel) {
        const { field: referencedField } = this._classModelSourceFinder.findClassAndFieldFromReferencedMember(classModel, sourceMember);
        return [
            new _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__["default"](this._annotationTypesProvider.manyToMany(), {
                mappedBy: referencedField.name
            }),
        ];
    }
    formatColumnName(columnName) {
        return this._columnNameCaseConverter.convertCase(columnName);
    }
    formatTableName(tableName) {
        return this._tableNameCaseConverter.convertCase(tableName);
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/lombok/config/LombokConfigManager.ts":
/*!**********************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/lombok/config/LombokConfigManager.ts ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LombokConfigManager: () => (/* binding */ LombokConfigManager),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _erdiagram_common_config_AbstractConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/common/config/AbstractConfigManager */ "./src/main/erdiagram/common/config/AbstractConfigManager.ts");

class LombokConfigManager extends _erdiagram_common_config_AbstractConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"] {
    getDefaultConfig() {
        return {
            builderAnnotation: false,
            dataAnnotation: false,
            getterAnnotation: false,
            setterAnnotation: false,
            toStringAnnotation: false,
            equalsAndHashCodeAnnotation: false
        };
    }
    mergeConfigs(fullConfig, partialConfig) {
        return {
            ...fullConfig,
            ...partialConfig
        };
    }
}
const lombokConfigManager = new LombokConfigManager();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lombokConfigManager);


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/lombok/config/exports.ts":
/*!**********************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/lombok/config/exports.ts ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LombokConfigManager: () => (/* reexport safe */ _LombokConfigManager__WEBPACK_IMPORTED_MODULE_0__.LombokConfigManager),
/* harmony export */   lombokConfigManager: () => (/* reexport safe */ _LombokConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _LombokConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LombokConfigManager */ "./src/main/erdiagram/converter/oop/source-code-generator/java/lombok/config/LombokConfigManager.ts");




/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/lombok/exports.ts":
/*!***************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/lombok/exports.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LombokConfigManager: () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_0__.LombokConfigManager),
/* harmony export */   LombokTransformer: () => (/* reexport safe */ _transformer_exports__WEBPACK_IMPORTED_MODULE_1__.LombokTransformer),
/* harmony export */   lombokConfigManager: () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_0__.lombokConfigManager)
/* harmony export */ });
/* harmony import */ var _config_exports__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config/exports */ "./src/main/erdiagram/converter/oop/source-code-generator/java/lombok/config/exports.ts");
/* harmony import */ var _transformer_exports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transformer/exports */ "./src/main/erdiagram/converter/oop/source-code-generator/java/lombok/transformer/exports.ts");




/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/lombok/lombok-java-types.ts":
/*!*************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/lombok/lombok-java-types.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LombokAnnotationTypes: () => (/* binding */ LombokAnnotationTypes)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/type/simple/createJavaSimpleType */ "./src/main/erdiagram/converter/oop/source-code-generator/java/type/simple/createJavaSimpleType.ts");

const LOMBOK_PACKAGE = 'lombok';
const LombokAnnotationTypes = {
    Builder: (0,_erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__["default"])('Builder', LOMBOK_PACKAGE),
    Data: (0,_erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__["default"])('Data', LOMBOK_PACKAGE),
    Getter: (0,_erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__["default"])('Getter', LOMBOK_PACKAGE),
    Setter: (0,_erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__["default"])('Setter', LOMBOK_PACKAGE),
    ToString: (0,_erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__["default"])('ToString', LOMBOK_PACKAGE),
    EqualsAndHashCode: (0,_erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__["default"])('EqualsAndHashCode', LOMBOK_PACKAGE)
};


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/lombok/transformer/LombokTransformer.ts":
/*!*************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/lombok/transformer/LombokTransformer.ts ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LombokTransformer: () => (/* binding */ LombokTransformer)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_lombok_config_LombokConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/lombok/config/LombokConfigManager */ "./src/main/erdiagram/converter/oop/source-code-generator/java/lombok/config/LombokConfigManager.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_lombok_transformer_visitor_class_LombokTransformerClassVisitor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/lombok/transformer/visitor/class/LombokTransformerClassVisitor */ "./src/main/erdiagram/converter/oop/source-code-generator/java/lombok/transformer/visitor/class/LombokTransformerClassVisitor.ts");


class LombokTransformer {
    _classVisitor;
    constructor(config) {
        const fullConfig = _erdiagram_converter_oop_source_code_generator_java_lombok_config_LombokConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"].mergeWithDefaultConfig(config);
        this._classVisitor = new _erdiagram_converter_oop_source_code_generator_java_lombok_transformer_visitor_class_LombokTransformerClassVisitor__WEBPACK_IMPORTED_MODULE_1__["default"](fullConfig);
    }
    setup() {
        return undefined;
    }
    visitField() {
        // Do nothing
    }
    visitClass(javaClass) {
        this._classVisitor.visitClass(javaClass);
    }
    visitModel() {
        // Do nothing
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/lombok/transformer/exports.ts":
/*!***************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/lombok/transformer/exports.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LombokTransformer: () => (/* reexport safe */ _LombokTransformer__WEBPACK_IMPORTED_MODULE_0__.LombokTransformer)
/* harmony export */ });
/* harmony import */ var _LombokTransformer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LombokTransformer */ "./src/main/erdiagram/converter/oop/source-code-generator/java/lombok/transformer/LombokTransformer.ts");




/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/lombok/transformer/visitor/class/LombokTransformerClassVisitor.ts":
/*!***************************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/lombok/transformer/visitor/class/LombokTransformerClassVisitor.ts ***!
  \***************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LombokTransformerClassVisitor)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/annotation/JavaAnnotation */ "./src/main/erdiagram/converter/oop/source-code-generator/java/annotation/JavaAnnotation.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_lombok_lombok_java_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/lombok/lombok-java-types */ "./src/main/erdiagram/converter/oop/source-code-generator/java/lombok/lombok-java-types.ts");


class LombokTransformerClassVisitor {
    _config;
    constructor(config) {
        this._config = config;
    }
    visitClass(javaClass) {
        this.annotateClass(javaClass);
        if (this._config.dataAnnotation || this._config.getterAnnotation) {
            for (const field of javaClass.fields) {
                delete field.getter;
            }
        }
        if (this._config.dataAnnotation || this._config.setterAnnotation) {
            for (const field of javaClass.fields) {
                delete field.setter;
            }
        }
    }
    annotateClass(javaClass) {
        for (const annotationType of this.getAnnotationTypes()) {
            javaClass.annotations.push(new _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__["default"](annotationType));
        }
    }
    getAnnotationTypes() {
        const annotationTypes = [];
        if (this._config.builderAnnotation) {
            annotationTypes.push(_erdiagram_converter_oop_source_code_generator_java_lombok_lombok_java_types__WEBPACK_IMPORTED_MODULE_1__.LombokAnnotationTypes.Builder);
        }
        if (this._config.dataAnnotation) {
            annotationTypes.push(_erdiagram_converter_oop_source_code_generator_java_lombok_lombok_java_types__WEBPACK_IMPORTED_MODULE_1__.LombokAnnotationTypes.Data);
        }
        if (this._config.getterAnnotation) {
            annotationTypes.push(_erdiagram_converter_oop_source_code_generator_java_lombok_lombok_java_types__WEBPACK_IMPORTED_MODULE_1__.LombokAnnotationTypes.Getter);
        }
        if (this._config.setterAnnotation) {
            annotationTypes.push(_erdiagram_converter_oop_source_code_generator_java_lombok_lombok_java_types__WEBPACK_IMPORTED_MODULE_1__.LombokAnnotationTypes.Setter);
        }
        if (this._config.toStringAnnotation) {
            annotationTypes.push(_erdiagram_converter_oop_source_code_generator_java_lombok_lombok_java_types__WEBPACK_IMPORTED_MODULE_1__.LombokAnnotationTypes.ToString);
        }
        if (this._config.equalsAndHashCodeAnnotation) {
            annotationTypes.push(_erdiagram_converter_oop_source_code_generator_java_lombok_lombok_java_types__WEBPACK_IMPORTED_MODULE_1__.LombokAnnotationTypes.EqualsAndHashCode);
        }
        return annotationTypes;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/model/exports.ts":
/*!**************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/model/exports.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JavaClassModelConfigManager: () => (/* reexport safe */ _generator_exports__WEBPACK_IMPORTED_MODULE_0__.JavaClassModelConfigManager),
/* harmony export */   JavaClassModelGenerator: () => (/* reexport safe */ _generator_exports__WEBPACK_IMPORTED_MODULE_0__.JavaClassModelGenerator),
/* harmony export */   JavaVisibility: () => (/* reexport safe */ _java_class_model_types__WEBPACK_IMPORTED_MODULE_1__.JavaVisibility),
/* harmony export */   javaClassModelConfigManager: () => (/* reexport safe */ _generator_exports__WEBPACK_IMPORTED_MODULE_0__.javaClassModelConfigManager)
/* harmony export */ });
/* harmony import */ var _generator_exports__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./generator/exports */ "./src/main/erdiagram/converter/oop/source-code-generator/java/model/generator/exports.ts");
/* harmony import */ var _java_class_model_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./java-class-model-types */ "./src/main/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types.ts");




/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/model/generator/JavaClassGenerator.ts":
/*!***********************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/model/generator/JavaClassGenerator.ts ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ JavaClassGenerator)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_model_java_class_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types */ "./src/main/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types.ts");

class JavaClassGenerator {
    _generatedClassesPackage;
    _fieldGenerator;
    constructor(generatedClassesPackage, fieldGenerator) {
        this._generatedClassesPackage = generatedClassesPackage;
        this._fieldGenerator = fieldGenerator;
    }
    generateJavaClass(classDescriptor, fieldGeneratedEventListener) {
        return {
            packageName: this._generatedClassesPackage,
            visibility: _erdiagram_converter_oop_source_code_generator_java_model_java_class_model_types__WEBPACK_IMPORTED_MODULE_0__.JavaVisibility.PUBLIC,
            name: classDescriptor.name,
            annotations: [],
            fields: classDescriptor.fields.map(fieldDescriptor => {
                const javaField = this._fieldGenerator.generateJavaField(fieldDescriptor);
                fieldGeneratedEventListener({ javaField, fieldDescriptor });
                return javaField;
            })
        };
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/model/generator/JavaClassModelGenerator.ts":
/*!****************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/model/generator/JavaClassModelGenerator.ts ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ JavaClassModelGenerator)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_type_JavaFieldTypeResolver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/type/JavaFieldTypeResolver */ "./src/main/erdiagram/converter/oop/source-code-generator/java/type/JavaFieldTypeResolver.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_model_generator_config_JavaClassModelConfigManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/model/generator/config/JavaClassModelConfigManager */ "./src/main/erdiagram/converter/oop/source-code-generator/java/model/generator/config/JavaClassModelConfigManager.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_model_generator_source_JavaClassModelDescriptorsRepositoryBuilder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/model/generator/source/JavaClassModelDescriptorsRepositoryBuilder */ "./src/main/erdiagram/converter/oop/source-code-generator/java/model/generator/source/JavaClassModelDescriptorsRepositoryBuilder.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_model_generator_JavaClassGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/model/generator/JavaClassGenerator */ "./src/main/erdiagram/converter/oop/source-code-generator/java/model/generator/JavaClassGenerator.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_model_generator_JavaFieldGenerator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/model/generator/JavaFieldGenerator */ "./src/main/erdiagram/converter/oop/source-code-generator/java/model/generator/JavaFieldGenerator.ts");





class JavaClassModelGenerator {
    _javaClassGenerator;
    constructor(config) {
        const fullConfig = _erdiagram_converter_oop_source_code_generator_java_model_generator_config_JavaClassModelConfigManager__WEBPACK_IMPORTED_MODULE_1__["default"].mergeWithDefaultConfig(config);
        const generatedClassesPackage = fullConfig.generatedClassesPackage;
        const typeResolver = new _erdiagram_converter_oop_source_code_generator_java_type_JavaFieldTypeResolver__WEBPACK_IMPORTED_MODULE_0__["default"](fullConfig.typeBindings, generatedClassesPackage);
        const javaFieldGenerator = new _erdiagram_converter_oop_source_code_generator_java_model_generator_JavaFieldGenerator__WEBPACK_IMPORTED_MODULE_4__["default"](typeResolver, fullConfig.fluentSetters);
        this._javaClassGenerator = new _erdiagram_converter_oop_source_code_generator_java_model_generator_JavaClassGenerator__WEBPACK_IMPORTED_MODULE_3__["default"](generatedClassesPackage, javaFieldGenerator);
    }
    generateJavaClassModel(classModel) {
        const descriptorsRepositoryBuilder = new _erdiagram_converter_oop_source_code_generator_java_model_generator_source_JavaClassModelDescriptorsRepositoryBuilder__WEBPACK_IMPORTED_MODULE_2__["default"]();
        const javaClasses = classModel.classes
            .map(classDescriptor => {
            const javaClass = this._javaClassGenerator.generateJavaClass(classDescriptor, event => {
                descriptorsRepositoryBuilder.addField(event.javaField, event.fieldDescriptor);
            });
            descriptorsRepositoryBuilder.addClass(javaClass, classDescriptor);
            return javaClass;
        });
        return {
            javaClassModel: {
                classes: javaClasses
            },
            javaClassModelDescriptorsRepository: descriptorsRepositoryBuilder.build()
        };
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/model/generator/JavaFieldGenerator.ts":
/*!***********************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/model/generator/JavaFieldGenerator.ts ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ JavaFieldGenerator)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_model_java_class_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types */ "./src/main/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types.ts");
/* harmony import */ var _erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/util/string-utils */ "./src/main/erdiagram/util/string-utils.ts");


class JavaFieldGenerator {
    _typeResolver;
    _fluentSetters;
    constructor(typeResolver, fluentSetters) {
        this._typeResolver = typeResolver;
        this._fluentSetters = fluentSetters;
    }
    generateJavaField(fieldDescriptor) {
        const fieldType = this._typeResolver.resolveFieldType(fieldDescriptor);
        return {
            visibility: _erdiagram_converter_oop_source_code_generator_java_model_java_class_model_types__WEBPACK_IMPORTED_MODULE_0__.JavaVisibility.PRIVATE,
            name: fieldDescriptor.name,
            type: fieldType,
            annotations: [],
            getter: {
                visibility: _erdiagram_converter_oop_source_code_generator_java_model_java_class_model_types__WEBPACK_IMPORTED_MODULE_0__.JavaVisibility.PUBLIC,
                annotations: [],
                name: this.getGetterName(fieldDescriptor.name, fieldType)
            },
            setter: {
                visibility: _erdiagram_converter_oop_source_code_generator_java_model_java_class_model_types__WEBPACK_IMPORTED_MODULE_0__.JavaVisibility.PUBLIC,
                annotations: [],
                name: this.getSetterName(fieldDescriptor.name),
                fluent: this._fluentSetters
            }
        };
    }
    getGetterName(fieldName, fieldType) {
        const capitalizedFieldName = (0,_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_1__.capitalizeWord)(fieldName);
        return this.isBooleanType(fieldType) ? `is${capitalizedFieldName}` : `get${capitalizedFieldName}`;
    }
    isBooleanType(fieldType) {
        return fieldType.formatCanonical() === 'boolean';
    }
    getSetterName(fieldName) {
        const capitalizedFieldName = (0,_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_1__.capitalizeWord)(fieldName);
        return `set${capitalizedFieldName}`;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/model/generator/config/JavaClassModelConfigManager.ts":
/*!***************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/model/generator/config/JavaClassModelConfigManager.ts ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JavaClassModelConfigManager: () => (/* binding */ JavaClassModelConfigManager),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/entity-relationship-model-types */ "./src/main/erdiagram/parser/types/entity-relationship-model-types.ts");
/* harmony import */ var _erdiagram_common_config_AbstractConfigManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/common/config/AbstractConfigManager */ "./src/main/erdiagram/common/config/AbstractConfigManager.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/type/parseJavaType */ "./src/main/erdiagram/converter/oop/source-code-generator/java/type/parseJavaType.ts");
/* harmony import */ var true_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! true-json */ "./node_modules/true-json/dist/true-json.umd.js");
/* harmony import */ var true_json__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(true_json__WEBPACK_IMPORTED_MODULE_3__);




class JavaClassModelConfigManager extends _erdiagram_common_config_AbstractConfigManager__WEBPACK_IMPORTED_MODULE_1__["default"] {
    getDefaultConfig() {
        return {
            fluentSetters: false,
            typeBindings: {
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.IDENTITY]: (0,_erdiagram_converter_oop_source_code_generator_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__["default"])('java.lang.Long'),
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.TEXT]: (0,_erdiagram_converter_oop_source_code_generator_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__["default"])('java.lang.String'),
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.LONG]: (0,_erdiagram_converter_oop_source_code_generator_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__["default"])('java.lang.Long'),
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.INT]: (0,_erdiagram_converter_oop_source_code_generator_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__["default"])('java.lang.Integer'),
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.SHORT]: (0,_erdiagram_converter_oop_source_code_generator_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__["default"])('java.lang.Short'),
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.DECIMAL]: (0,_erdiagram_converter_oop_source_code_generator_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__["default"])('java.math.BigDecimal'),
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.BOOLEAN]: (0,_erdiagram_converter_oop_source_code_generator_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__["default"])('java.lang.Boolean'),
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.DATE]: (0,_erdiagram_converter_oop_source_code_generator_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__["default"])('java.time.LocalDate'),
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.TIME]: (0,_erdiagram_converter_oop_source_code_generator_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__["default"])('java.time.LocalTime'),
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.DATETIME]: (0,_erdiagram_converter_oop_source_code_generator_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__["default"])('java.time.LocalDateTime'),
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.BLOB]: (0,_erdiagram_converter_oop_source_code_generator_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__["default"])('byte[]')
            }
        };
    }
    mergeConfigs(fullConfig, partialConfig) {
        return {
            ...fullConfig,
            ...partialConfig,
            typeBindings: {
                ...fullConfig.typeBindings,
                ...partialConfig?.typeBindings
            }
        };
    }
    getJsonAdapter() {
        return true_json__WEBPACK_IMPORTED_MODULE_3__.JsonAdapters.object({
            typeBindings: true_json__WEBPACK_IMPORTED_MODULE_3__.JsonAdapters.record(true_json__WEBPACK_IMPORTED_MODULE_3__.JsonAdapters.custom({
                adaptToJson(value) {
                    return value.formatCanonical();
                },
                recoverFromJson(value) {
                    return (0,_erdiagram_converter_oop_source_code_generator_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__["default"])(value);
                }
            }))
        });
    }
}
const javaClassModelConfigManager = new JavaClassModelConfigManager();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (javaClassModelConfigManager);


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/model/generator/config/exports.ts":
/*!*******************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/model/generator/config/exports.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JavaClassModelConfigManager: () => (/* reexport safe */ _JavaClassModelConfigManager__WEBPACK_IMPORTED_MODULE_0__.JavaClassModelConfigManager),
/* harmony export */   javaClassModelConfigManager: () => (/* reexport safe */ _JavaClassModelConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _JavaClassModelConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./JavaClassModelConfigManager */ "./src/main/erdiagram/converter/oop/source-code-generator/java/model/generator/config/JavaClassModelConfigManager.ts");




/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/model/generator/exports.ts":
/*!************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/model/generator/exports.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JavaClassModelConfigManager: () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_1__.JavaClassModelConfigManager),
/* harmony export */   JavaClassModelGenerator: () => (/* reexport safe */ _erdiagram_converter_oop_source_code_generator_java_model_generator_JavaClassModelGenerator__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   javaClassModelConfigManager: () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_1__.javaClassModelConfigManager)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_model_generator_JavaClassModelGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/model/generator/JavaClassModelGenerator */ "./src/main/erdiagram/converter/oop/source-code-generator/java/model/generator/JavaClassModelGenerator.ts");
/* harmony import */ var _config_exports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config/exports */ "./src/main/erdiagram/converter/oop/source-code-generator/java/model/generator/config/exports.ts");





/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/model/generator/source/JavaClassModelDescriptorsRepository.ts":
/*!***********************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/model/generator/source/JavaClassModelDescriptorsRepository.ts ***!
  \***********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ JavaClassModelDescriptorsRepository)
/* harmony export */ });
class JavaClassModelDescriptorsRepository {
    _classDescriptorsMap;
    _fieldDescriptorsMap;
    constructor(classDescriptorsMap, fieldDescriptorsMap) {
        this._classDescriptorsMap = classDescriptorsMap;
        this._fieldDescriptorsMap = fieldDescriptorsMap;
    }
    getClassDescriptor(javaClass) {
        const classDescriptor = this._classDescriptorsMap.get(javaClass);
        if (classDescriptor == null) {
            throw new Error(`Cannot find descriptor for Java class "${javaClass.name}"`);
        }
        return classDescriptor;
    }
    getFieldDescriptor(javaField) {
        const fieldDescriptor = this._fieldDescriptorsMap.get(javaField);
        if (fieldDescriptor == null) {
            throw new Error(`Cannot find descriptor for Java field "${javaField.name}"`);
        }
        return fieldDescriptor;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/model/generator/source/JavaClassModelDescriptorsRepositoryBuilder.ts":
/*!******************************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/model/generator/source/JavaClassModelDescriptorsRepositoryBuilder.ts ***!
  \******************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ JavaClassModelDescriptorsRepositoryBuilder)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_model_generator_source_JavaClassModelDescriptorsRepository__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/model/generator/source/JavaClassModelDescriptorsRepository */ "./src/main/erdiagram/converter/oop/source-code-generator/java/model/generator/source/JavaClassModelDescriptorsRepository.ts");

class JavaClassModelDescriptorsRepositoryBuilder {
    _classDescriptorsMap = new Map();
    _fieldDescriptorsMap = new Map();
    addClass(javaClass, classDescriptor) {
        this._classDescriptorsMap.set(javaClass, classDescriptor);
        return this;
    }
    addField(javaField, fieldDescriptor) {
        this._fieldDescriptorsMap.set(javaField, fieldDescriptor);
        return this;
    }
    build() {
        return new _erdiagram_converter_oop_source_code_generator_java_model_generator_source_JavaClassModelDescriptorsRepository__WEBPACK_IMPORTED_MODULE_0__["default"](new Map(this._classDescriptorsMap.entries()), new Map(this._fieldDescriptorsMap.entries()));
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types.ts":
/*!*****************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types.ts ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JavaVisibility: () => (/* binding */ JavaVisibility)
/* harmony export */ });
var JavaVisibility;
(function (JavaVisibility) {
    JavaVisibility["PRIVATE"] = "private";
    JavaVisibility["PROTECTED"] = "protected";
    JavaVisibility["PUBLIC"] = "public";
    JavaVisibility["PACKAGE_PRIVATE"] = "package-private";
})(JavaVisibility || (JavaVisibility = {}));


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/model/transformer/ApplyTransformersCommand.ts":
/*!*******************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/model/transformer/ApplyTransformersCommand.ts ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ApplyTransformersCommand)
/* harmony export */ });
class ApplyTransformersCommand {
    _setupContext;
    _javaClassModelDescriptorsRepository;
    _transformers;
    constructor(setupContext, javaClassModelDescriptorsRepository, transformers) {
        this._setupContext = setupContext;
        this._javaClassModelDescriptorsRepository = javaClassModelDescriptorsRepository;
        this._transformers = transformers;
    }
    execute() {
        this._transformers.forEach(transformer => this.applyTransformer(transformer));
    }
    applyTransformer(transformer) {
        const { javaClassModel } = this._setupContext;
        const setupData = transformer.setup(this._setupContext);
        javaClassModel.classes.forEach(javaClass => {
            const classDescriptor = this._javaClassModelDescriptorsRepository.getClassDescriptor(javaClass);
            javaClass.fields.forEach(javaField => {
                const fieldDescriptor = this._javaClassModelDescriptorsRepository.getFieldDescriptor(javaField);
                return transformer.visitField(javaField, {
                    ...this._setupContext,
                    setupData,
                    javaClass: javaClass,
                    classDescriptor,
                    fieldDescriptor
                });
            });
            transformer.visitClass(javaClass, {
                ...this._setupContext,
                setupData,
                classDescriptor
            });
        });
        transformer.visitModel(javaClassModel, {
            ...this._setupContext,
            setupData
        });
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/type/JavaExtendedPackage.ts":
/*!*************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/type/JavaExtendedPackage.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var JavaExtendedPackage;
(function (JavaExtendedPackage) {
    JavaExtendedPackage["JAVAX"] = "javax";
    JavaExtendedPackage["JAKARTA"] = "jakarta";
})(JavaExtendedPackage || (JavaExtendedPackage = {}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (JavaExtendedPackage);


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/type/JavaFieldTypeResolver.ts":
/*!***************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/type/JavaFieldTypeResolver.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ JavaFieldTypeResolver)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/type/simple/createJavaSimpleType */ "./src/main/erdiagram/converter/oop/source-code-generator/java/type/simple/createJavaSimpleType.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_type_parameterized_createJavaParameterizedType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/type/parameterized/createJavaParameterizedType */ "./src/main/erdiagram/converter/oop/source-code-generator/java/type/parameterized/createJavaParameterizedType.ts");


class JavaFieldTypeResolver {
    typeBindings;
    generatedClassesPackage;
    constructor(typeBindings, generatedClassesPackage) {
        this.typeBindings = typeBindings;
        this.generatedClassesPackage = generatedClassesPackage;
    }
    resolveFieldType(field) {
        if (field.list) {
            return this.resolveListType(field);
        }
        else {
            return this.resolveSingleType(field);
        }
    }
    resolveListType(field) {
        return (0,_erdiagram_converter_oop_source_code_generator_java_type_parameterized_createJavaParameterizedType__WEBPACK_IMPORTED_MODULE_1__["default"])('List', 'java.util', [this.resolveSingleType(field)]);
    }
    resolveSingleType(field) {
        const { entityType, primitiveType } = field;
        if (entityType) {
            if (primitiveType) {
                throw new Error('Invalid field descriptor: provided both primitive and entity types');
            }
            return (0,_erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__["default"])(entityType, this.generatedClassesPackage);
        }
        if (!primitiveType) {
            throw new Error('Invalid field descriptor: missing type');
        }
        /* istanbul ignore next */
        if (!Object.hasOwn(this.typeBindings, primitiveType)) {
            throw new Error('Unsupported type: ' + primitiveType);
        }
        return this.typeBindings[primitiveType];
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/type/exports.ts":
/*!*************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/type/exports.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JavaExtendedPackage: () => (/* reexport safe */ _JavaExtendedPackage__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   createJavaArrayType: () => (/* reexport safe */ _parameterized_createJavaArrayType__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   createJavaParameterizedType: () => (/* reexport safe */ _parameterized_createJavaParameterizedType__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   createJavaSimpleType: () => (/* reexport safe */ _simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   isJavaParameterizedType: () => (/* reexport safe */ _parameterized_isJavaParameterizedType__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   parseJavaType: () => (/* reexport safe */ _parseJavaType__WEBPACK_IMPORTED_MODULE_1__["default"])
/* harmony export */ });
/* harmony import */ var _JavaExtendedPackage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./JavaExtendedPackage */ "./src/main/erdiagram/converter/oop/source-code-generator/java/type/JavaExtendedPackage.ts");
/* harmony import */ var _parseJavaType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parseJavaType */ "./src/main/erdiagram/converter/oop/source-code-generator/java/type/parseJavaType.ts");
/* harmony import */ var _simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./simple/createJavaSimpleType */ "./src/main/erdiagram/converter/oop/source-code-generator/java/type/simple/createJavaSimpleType.ts");
/* harmony import */ var _parameterized_createJavaParameterizedType__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./parameterized/createJavaParameterizedType */ "./src/main/erdiagram/converter/oop/source-code-generator/java/type/parameterized/createJavaParameterizedType.ts");
/* harmony import */ var _parameterized_createJavaArrayType__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./parameterized/createJavaArrayType */ "./src/main/erdiagram/converter/oop/source-code-generator/java/type/parameterized/createJavaArrayType.ts");
/* harmony import */ var _parameterized_isJavaParameterizedType__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./parameterized/isJavaParameterizedType */ "./src/main/erdiagram/converter/oop/source-code-generator/java/type/parameterized/isJavaParameterizedType.ts");









/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/type/import/JavaAnnotationUsedTypesCompiler.ts":
/*!********************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/type/import/JavaAnnotationUsedTypesCompiler.ts ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ JavaAnnotationUsedTypesCompiler)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/annotation/JavaAnnotation */ "./src/main/erdiagram/converter/oop/source-code-generator/java/annotation/JavaAnnotation.ts");

class JavaAnnotationUsedTypesCompiler {
    getUsedTypes(annotation) {
        const parametersUsedTypes = Object.values(annotation.parameters)
            .filter(parameterValue => parameterValue != null)
            .flatMap(parameterValue => this.getAnnotationParameterUsedTypes(parameterValue));
        return [
            annotation.type,
            ...parametersUsedTypes
        ];
    }
    getAnnotationParameterUsedTypes(parameterValue) {
        if (!Array.isArray(parameterValue)) {
            return this.getAnnotationSingleParameterUsedTypes(parameterValue);
        }
        return parameterValue.flatMap(singleParameterValue => this.getAnnotationSingleParameterUsedTypes(singleParameterValue));
    }
    getAnnotationSingleParameterUsedTypes(parameterValue) {
        if (_erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__["default"].isRawParameterValue(parameterValue)) {
            return parameterValue.usedTypes;
        }
        if (parameterValue instanceof _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__["default"]) {
            return this.getUsedTypes(parameterValue);
        }
        return [];
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/type/import/JavaClassUsedTypesCompiler.ts":
/*!***************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/type/import/JavaClassUsedTypesCompiler.ts ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ JavaClassUsedTypesCompiler)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_type_import_JavaAnnotationUsedTypesCompiler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/type/import/JavaAnnotationUsedTypesCompiler */ "./src/main/erdiagram/converter/oop/source-code-generator/java/type/import/JavaAnnotationUsedTypesCompiler.ts");

// TODO add unit tests
class JavaClassUsedTypesCompiler {
    _javaAnnotationUsedTypesCompiler = new _erdiagram_converter_oop_source_code_generator_java_type_import_JavaAnnotationUsedTypesCompiler__WEBPACK_IMPORTED_MODULE_0__["default"]();
    constructor(javaAnnotationUsedTypesCompiler) {
        this._javaAnnotationUsedTypesCompiler = javaAnnotationUsedTypesCompiler;
    }
    getUsedTypes(javaClass) {
        const usedTypes = [];
        usedTypes.push(...this.getAnnotationsUsedTypes(javaClass.annotations));
        javaClass.fields.forEach(javaField => {
            usedTypes.push(javaField.type);
            usedTypes.push(...this.getAnnotationsUsedTypes(javaField.annotations));
            usedTypes.push(...this.getAnnotationsUsedTypes(javaField.getter?.annotations ?? []));
            usedTypes.push(...this.getAnnotationsUsedTypes(javaField.setter?.annotations ?? []));
        });
        return usedTypes;
    }
    getAnnotationsUsedTypes(annotations) {
        return annotations.flatMap(annotation => this._javaAnnotationUsedTypesCompiler.getUsedTypes(annotation));
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/type/import/JavaImportStatementsGenerator.ts":
/*!******************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/type/import/JavaImportStatementsGenerator.ts ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ JavaImportStatementsGenerator)
/* harmony export */ });
/* harmony import */ var _erdiagram_util_array_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/util/array-utils */ "./src/main/erdiagram/util/array-utils.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_type_parameterized_isJavaParameterizedType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/type/parameterized/isJavaParameterizedType */ "./src/main/erdiagram/converter/oop/source-code-generator/java/type/parameterized/isJavaParameterizedType.ts");


const JAVA_LANG_PACKAGE = 'java.lang';
// TODO add unit tests
class JavaImportStatementsGenerator {
    _currentPackage;
    constructor(currentPackage) {
        this._currentPackage = currentPackage;
    }
    generateImportStatements(javaTypes) {
        const cannonicalNames = this.unrollTypesRecursively(javaTypes)
            .filter(javaType => this.isImportRequired(javaType))
            .map(javaType => javaType.canonicalName);
        return (0,_erdiagram_util_array_utils__WEBPACK_IMPORTED_MODULE_0__.removeDuplicates)(cannonicalNames)
            .sort()
            .map(cannonicalName => `import ${cannonicalName};`);
    }
    unrollTypesRecursively(javaTypes, appendTo = []) {
        for (const javaType of javaTypes) {
            appendTo.push(javaType);
            if ((0,_erdiagram_converter_oop_source_code_generator_java_type_parameterized_isJavaParameterizedType__WEBPACK_IMPORTED_MODULE_1__["default"])(javaType)) {
                this.unrollTypesRecursively(javaType.parameterTypes, appendTo);
            }
        }
        return appendTo;
    }
    isImportRequired(javaType) {
        return !!javaType.packageName
            && javaType.packageName !== JAVA_LANG_PACKAGE
            && javaType.packageName !== this._currentPackage;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/type/parameterized/createJavaArrayType.ts":
/*!***************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/type/parameterized/createJavaArrayType.ts ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createJavaArrayType)
/* harmony export */ });
function createJavaArrayType(parameterType) {
    return new JavaArrayTypeImpl(parameterType);
}
class JavaArrayTypeImpl {
    _name;
    _canonicalName;
    _parameterType;
    constructor(parameterType) {
        this._name = `${parameterType.name}[]`;
        this._canonicalName = `${parameterType.canonicalName}[]`;
        this._parameterType = parameterType;
    }
    get canonicalName() {
        return this._canonicalName;
    }
    get name() {
        return this._name;
    }
    get packageName() {
        return undefined;
    }
    get parameterTypes() {
        return [this._parameterType];
    }
    formatSimple() {
        const formattedParameterType = this._parameterType.formatSimple();
        return `${formattedParameterType}[]`;
    }
    formatCanonical() {
        const formattedParameterType = this._parameterType.formatCanonical();
        return `${formattedParameterType}[]`;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/type/parameterized/createJavaParameterizedType.ts":
/*!***********************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/type/parameterized/createJavaParameterizedType.ts ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createJavaParameterizedType)
/* harmony export */ });
function createJavaParameterizedType(name, packageName, parameterTypes) {
    return new JavaParameterizedTypeImpl(name, packageName, parameterTypes);
}
class JavaParameterizedTypeImpl {
    _name;
    _packageName;
    _canonicalName;
    _parameterTypes;
    constructor(name, packageName, parameterTypes) {
        this._name = name;
        this._packageName = packageName;
        this._canonicalName = packageName ? `${packageName}.${name}` : name;
        this._parameterTypes = parameterTypes;
    }
    get canonicalName() {
        return this._canonicalName;
    }
    get name() {
        return this._name;
    }
    get packageName() {
        return this._packageName;
    }
    get parameterTypes() {
        return this._parameterTypes;
    }
    formatSimple() {
        const formattedParameterTypes = this._parameterTypes.map(parameterType => parameterType.formatSimple()).join(', ');
        return `${this._name}<${formattedParameterTypes}>`;
    }
    formatCanonical() {
        const formattedParameterTypes = this._parameterTypes.map(parameterType => parameterType.formatCanonical()).join(', ');
        return `${this._canonicalName}<${formattedParameterTypes}>`;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/type/parameterized/isJavaParameterizedType.ts":
/*!*******************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/type/parameterized/isJavaParameterizedType.ts ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isJavaParameterizedType)
/* harmony export */ });
function isJavaParameterizedType(javaType) {
    return Array.isArray(javaType.parameterTypes);
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/type/parseJavaType.ts":
/*!*******************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/type/parseJavaType.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ parseJavaType)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/type/simple/createJavaSimpleType */ "./src/main/erdiagram/converter/oop/source-code-generator/java/type/simple/createJavaSimpleType.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_type_parameterized_createJavaParameterizedType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/type/parameterized/createJavaParameterizedType */ "./src/main/erdiagram/converter/oop/source-code-generator/java/type/parameterized/createJavaParameterizedType.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_type_parameterized_createJavaArrayType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/type/parameterized/createJavaArrayType */ "./src/main/erdiagram/converter/oop/source-code-generator/java/type/parameterized/createJavaArrayType.ts");



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
        const [, rawTypeText] = ARRAY_TYPE_REGEX.exec(trimmedText);
        return (0,_erdiagram_converter_oop_source_code_generator_java_type_parameterized_createJavaArrayType__WEBPACK_IMPORTED_MODULE_2__["default"])(parseJavaTypeInternal(rawTypeText));
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
    return (0,_erdiagram_converter_oop_source_code_generator_java_type_parameterized_createJavaParameterizedType__WEBPACK_IMPORTED_MODULE_1__["default"])(rawType.name, rawType.packageName, parameterTypes);
}
function parseJavaRawType(text) {
    const trimmedText = trimRawJavaTypeParts(text.trim());
    if (!RAW_TYPE_REGEX.test(trimmedText)) {
        throw new Error(`Illegal Java type format: ${text}`);
    }
    const lastDotIndex = trimmedText.lastIndexOf(PACKAGE_SEPARATOR);
    if (lastDotIndex === -1) {
        return (0,_erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__["default"])(trimmedText);
    }
    const packageName = trimmedText.substring(0, lastDotIndex);
    const className = trimmedText.substring(lastDotIndex + 1);
    return (0,_erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__["default"])(className, packageName);
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
                /* istanbul ignore next */
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

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/type/simple/createJavaSimpleType.ts":
/*!*********************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/type/simple/createJavaSimpleType.ts ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createJavaSimpleType)
/* harmony export */ });
function createJavaSimpleType(name, packageName) {
    return new JavaSimpleTypeImpl(name, packageName);
}
class JavaSimpleTypeImpl {
    _name;
    _packageName;
    _canonicalName;
    constructor(name, packageName) {
        this._name = name;
        this._packageName = packageName;
        this._canonicalName = packageName ? `${packageName}.${name}` : name;
    }
    get canonicalName() {
        return this._canonicalName;
    }
    get name() {
        return this._name;
    }
    get packageName() {
        return this._packageName;
    }
    formatSimple() {
        return this._name;
    }
    formatCanonical() {
        return this._canonicalName;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/validation/BeanValidationTransformer.ts":
/*!*************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/validation/BeanValidationTransformer.ts ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BeanValidationTransformer)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_validation_visitor_BeanValidationAnnotationsSupplier__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/validation/visitor/BeanValidationAnnotationsSupplier */ "./src/main/erdiagram/converter/oop/source-code-generator/java/validation/visitor/BeanValidationAnnotationsSupplier.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_validation_config_BeanValidationConfigManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/validation/config/BeanValidationConfigManager */ "./src/main/erdiagram/converter/oop/source-code-generator/java/validation/config/BeanValidationConfigManager.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_validation_visitor_BeanValidationFieldVisitor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/validation/visitor/BeanValidationFieldVisitor */ "./src/main/erdiagram/converter/oop/source-code-generator/java/validation/visitor/BeanValidationFieldVisitor.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_validation_JavaValidationAnnotationTypesProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/validation/JavaValidationAnnotationTypesProvider */ "./src/main/erdiagram/converter/oop/source-code-generator/java/validation/JavaValidationAnnotationTypesProvider.ts");




class BeanValidationTransformer {
    _beanValidationFieldVisitor;
    constructor(config) {
        const { notNullTextValidationStrategy, notNullBlobValidationStrategy, javaExtendedPackage, annotateGetters } = _erdiagram_converter_oop_source_code_generator_java_validation_config_BeanValidationConfigManager__WEBPACK_IMPORTED_MODULE_1__["default"].mergeWithDefaultConfig(config);
        const beanValidationAnnotationsSupplier = new _erdiagram_converter_oop_source_code_generator_java_validation_visitor_BeanValidationAnnotationsSupplier__WEBPACK_IMPORTED_MODULE_0__["default"](notNullTextValidationStrategy, notNullBlobValidationStrategy, new _erdiagram_converter_oop_source_code_generator_java_validation_JavaValidationAnnotationTypesProvider__WEBPACK_IMPORTED_MODULE_3__["default"](javaExtendedPackage));
        this._beanValidationFieldVisitor = new _erdiagram_converter_oop_source_code_generator_java_validation_visitor_BeanValidationFieldVisitor__WEBPACK_IMPORTED_MODULE_2__["default"](beanValidationAnnotationsSupplier, annotateGetters);
    }
    setup() {
        return undefined;
    }
    visitField(javaField, context) {
        this._beanValidationFieldVisitor.visitField(javaField, context);
    }
    visitClass() {
        // Do nothing
    }
    visitModel() {
        // Do nothing
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/validation/JavaValidationAnnotationTypesProvider.ts":
/*!*************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/validation/JavaValidationAnnotationTypesProvider.ts ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ JavaValidationAnnotationTypesProvider)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/type/simple/createJavaSimpleType */ "./src/main/erdiagram/converter/oop/source-code-generator/java/type/simple/createJavaSimpleType.ts");

class JavaValidationAnnotationTypesProvider {
    _packageName;
    constructor(javaExtendedPackage) {
        this._packageName = `${javaExtendedPackage}.validation.constraints`;
    }
    notNull() {
        return (0,_erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__["default"])('NotNull', this._packageName);
    }
    notEmpty() {
        return (0,_erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__["default"])('NotEmpty', this._packageName);
    }
    notBlank() {
        return (0,_erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__["default"])('NotBlank', this._packageName);
    }
    size() {
        return (0,_erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__["default"])('Size', this._packageName);
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/validation/config/BeanValidationConfigManager.ts":
/*!**********************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/validation/config/BeanValidationConfigManager.ts ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BeanValidationConfigManager: () => (/* binding */ BeanValidationConfigManager),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _erdiagram_common_config_AbstractConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/common/config/AbstractConfigManager */ "./src/main/erdiagram/common/config/AbstractConfigManager.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_validation_strategy_NotNullTextValidationStrategy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/validation/strategy/NotNullTextValidationStrategy */ "./src/main/erdiagram/converter/oop/source-code-generator/java/validation/strategy/NotNullTextValidationStrategy.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_validation_strategy_NotNullBlobValidationStrategy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/validation/strategy/NotNullBlobValidationStrategy */ "./src/main/erdiagram/converter/oop/source-code-generator/java/validation/strategy/NotNullBlobValidationStrategy.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_type_JavaExtendedPackage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/type/JavaExtendedPackage */ "./src/main/erdiagram/converter/oop/source-code-generator/java/type/JavaExtendedPackage.ts");




class BeanValidationConfigManager extends _erdiagram_common_config_AbstractConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"] {
    getDefaultConfig() {
        return {
            notNullTextValidationStrategy: _erdiagram_converter_oop_source_code_generator_java_validation_strategy_NotNullTextValidationStrategy__WEBPACK_IMPORTED_MODULE_1__["default"].NOT_NULL,
            notNullBlobValidationStrategy: _erdiagram_converter_oop_source_code_generator_java_validation_strategy_NotNullBlobValidationStrategy__WEBPACK_IMPORTED_MODULE_2__["default"].NOT_NULL,
            javaExtendedPackage: _erdiagram_converter_oop_source_code_generator_java_type_JavaExtendedPackage__WEBPACK_IMPORTED_MODULE_3__["default"].JAKARTA,
            annotateGetters: false
        };
    }
    mergeConfigs(fullConfig, partialConfig) {
        return {
            ...fullConfig,
            ...partialConfig
        };
    }
}
const beanValidationConfigManager = new BeanValidationConfigManager();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (beanValidationConfigManager);


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/validation/config/exports.ts":
/*!**************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/validation/config/exports.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BeanValidationConfigManager: () => (/* reexport safe */ _BeanValidationConfigManager__WEBPACK_IMPORTED_MODULE_0__.BeanValidationConfigManager),
/* harmony export */   beanValidationConfigManager: () => (/* reexport safe */ _BeanValidationConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _BeanValidationConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BeanValidationConfigManager */ "./src/main/erdiagram/converter/oop/source-code-generator/java/validation/config/BeanValidationConfigManager.ts");




/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/validation/exports.ts":
/*!*******************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/validation/exports.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BeanValidationConfigManager: () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_3__.BeanValidationConfigManager),
/* harmony export */   BeanValidationTransformer: () => (/* reexport safe */ _erdiagram_converter_oop_source_code_generator_java_validation_BeanValidationTransformer__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   NotNullBlobValidationStrategy: () => (/* reexport safe */ _erdiagram_converter_oop_source_code_generator_java_validation_strategy_NotNullBlobValidationStrategy__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   NotNullTextValidationStrategy: () => (/* reexport safe */ _erdiagram_converter_oop_source_code_generator_java_validation_strategy_NotNullTextValidationStrategy__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   beanValidationConfigManager: () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_3__.beanValidationConfigManager)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_validation_strategy_NotNullTextValidationStrategy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/validation/strategy/NotNullTextValidationStrategy */ "./src/main/erdiagram/converter/oop/source-code-generator/java/validation/strategy/NotNullTextValidationStrategy.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_validation_strategy_NotNullBlobValidationStrategy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/validation/strategy/NotNullBlobValidationStrategy */ "./src/main/erdiagram/converter/oop/source-code-generator/java/validation/strategy/NotNullBlobValidationStrategy.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_validation_BeanValidationTransformer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/validation/BeanValidationTransformer */ "./src/main/erdiagram/converter/oop/source-code-generator/java/validation/BeanValidationTransformer.ts");
/* harmony import */ var _config_exports__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config/exports */ "./src/main/erdiagram/converter/oop/source-code-generator/java/validation/config/exports.ts");







/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/validation/strategy/NotNullBlobValidationStrategy.ts":
/*!**************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/validation/strategy/NotNullBlobValidationStrategy.ts ***!
  \**************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var NotNullBlobValidationStrategy;
(function (NotNullBlobValidationStrategy) {
    NotNullBlobValidationStrategy["NOT_NULL"] = "not_null";
    NotNullBlobValidationStrategy["NOT_EMPTY"] = "not_empty";
})(NotNullBlobValidationStrategy || (NotNullBlobValidationStrategy = {}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NotNullBlobValidationStrategy);


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/validation/strategy/NotNullTextValidationStrategy.ts":
/*!**************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/validation/strategy/NotNullTextValidationStrategy.ts ***!
  \**************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var NotNullTextValidationStrategy;
(function (NotNullTextValidationStrategy) {
    NotNullTextValidationStrategy["NOT_NULL"] = "not_null";
    NotNullTextValidationStrategy["NOT_EMPTY"] = "not_empty";
    NotNullTextValidationStrategy["NOT_BLANK"] = "not_blank";
})(NotNullTextValidationStrategy || (NotNullTextValidationStrategy = {}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NotNullTextValidationStrategy);


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/validation/visitor/BeanValidationAnnotationsSupplier.ts":
/*!*****************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/validation/visitor/BeanValidationAnnotationsSupplier.ts ***!
  \*****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BeanValidationAnnotationsSupplier)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/entity-relationship-model-types */ "./src/main/erdiagram/parser/types/entity-relationship-model-types.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_validation_strategy_NotNullTextValidationStrategy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/validation/strategy/NotNullTextValidationStrategy */ "./src/main/erdiagram/converter/oop/source-code-generator/java/validation/strategy/NotNullTextValidationStrategy.ts");
/* harmony import */ var _erdiagram_util_array_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/util/array-utils */ "./src/main/erdiagram/util/array-utils.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_validation_strategy_NotNullBlobValidationStrategy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/validation/strategy/NotNullBlobValidationStrategy */ "./src/main/erdiagram/converter/oop/source-code-generator/java/validation/strategy/NotNullBlobValidationStrategy.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/annotation/JavaAnnotation */ "./src/main/erdiagram/converter/oop/source-code-generator/java/annotation/JavaAnnotation.ts");
/* harmony import */ var _erdiagram_parser_types_error_ERDiagramSyntaxError__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/erdiagram/parser/types/error/ERDiagramSyntaxError */ "./src/main/erdiagram/parser/types/error/ERDiagramSyntaxError.ts");






class BeanValidationAnnotationsSupplier {
    _notNullTextValidationStrategy;
    _notNullBlobValidationStrategy;
    _annotationTypesProvider;
    constructor(_notNullTextValidationStrategy, _notNullBlobValidationStrategy, _annotationTypesProvider) {
        this._notNullTextValidationStrategy = _notNullTextValidationStrategy;
        this._notNullBlobValidationStrategy = _notNullBlobValidationStrategy;
        this._annotationTypesProvider = _annotationTypesProvider;
    }
    getAnnotations(field) {
        return (0,_erdiagram_util_array_utils__WEBPACK_IMPORTED_MODULE_2__.removeNullableValues)([
            this.getNotNullAnnotation(field),
            this.getSizeAnnotation(field)
        ]);
    }
    getNotNullAnnotation(field) {
        if (field.nullable) {
            return null;
        }
        const annotationType = this.getNotNullAnnotationForField(field);
        return new _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_4__["default"](annotationType);
    }
    getSizeAnnotation(field) {
        const { maxSize } = field;
        if (maxSize == null) {
            return null;
        }
        return new _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_4__["default"](this._annotationTypesProvider.size(), { max: maxSize });
    }
    getNotNullAnnotationForField(field) {
        switch (field.primitiveType) {
            case _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.TEXT:
                return this.getNotNullAnnotationForTextType();
            case _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.BLOB:
                return this.getNotNullAnnotationForBlobType();
            default:
                return this._annotationTypesProvider.notNull();
        }
    }
    getNotNullAnnotationForTextType() {
        switch (this._notNullTextValidationStrategy) {
            case _erdiagram_converter_oop_source_code_generator_java_validation_strategy_NotNullTextValidationStrategy__WEBPACK_IMPORTED_MODULE_1__["default"].NOT_NULL:
                return this._annotationTypesProvider.notNull();
            case _erdiagram_converter_oop_source_code_generator_java_validation_strategy_NotNullTextValidationStrategy__WEBPACK_IMPORTED_MODULE_1__["default"].NOT_EMPTY:
                return this._annotationTypesProvider.notEmpty();
            case _erdiagram_converter_oop_source_code_generator_java_validation_strategy_NotNullTextValidationStrategy__WEBPACK_IMPORTED_MODULE_1__["default"].NOT_BLANK:
                return this._annotationTypesProvider.notBlank();
            /* istanbul ignore next */
            default:
                /* istanbul ignore next */
                throw new _erdiagram_parser_types_error_ERDiagramSyntaxError__WEBPACK_IMPORTED_MODULE_5__["default"](`Unknown statement type`);
        }
    }
    getNotNullAnnotationForBlobType() {
        switch (this._notNullBlobValidationStrategy) {
            case _erdiagram_converter_oop_source_code_generator_java_validation_strategy_NotNullBlobValidationStrategy__WEBPACK_IMPORTED_MODULE_3__["default"].NOT_NULL:
                return this._annotationTypesProvider.notNull();
            case _erdiagram_converter_oop_source_code_generator_java_validation_strategy_NotNullBlobValidationStrategy__WEBPACK_IMPORTED_MODULE_3__["default"].NOT_EMPTY:
                return this._annotationTypesProvider.notEmpty();
            /* istanbul ignore next */
            default:
                /* istanbul ignore next */
                throw new _erdiagram_parser_types_error_ERDiagramSyntaxError__WEBPACK_IMPORTED_MODULE_5__["default"](`Unknown statement type`);
        }
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/validation/visitor/BeanValidationFieldVisitor.ts":
/*!**********************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/validation/visitor/BeanValidationFieldVisitor.ts ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BeanValidationFieldVisitor)
/* harmony export */ });
class BeanValidationFieldVisitor {
    _beanValidationAnnotationsGenerator;
    _annotateGetters;
    constructor(beanValidationAnnotationsGenerator, annotateGetters) {
        this._beanValidationAnnotationsGenerator = beanValidationAnnotationsGenerator;
        this._annotateGetters = annotateGetters;
    }
    visitField(javaField, context) {
        const annotations = this._beanValidationAnnotationsGenerator.getAnnotations(context.fieldDescriptor);
        const elementToAnnotate = this.getElementToAnnotate(javaField);
        elementToAnnotate.annotations.push(...annotations);
    }
    getElementToAnnotate(javaField) {
        if (this._annotateGetters && javaField.getter != null) {
            return javaField.getter;
        }
        return javaField;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/TypeScriptClassModelToCodeConverter.ts":
/*!******************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/typescript/TypeScriptClassModelToCodeConverter.ts ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TypeScriptClassModelToCodeConverter)
/* harmony export */ });
/* harmony import */ var _erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/util/string-utils */ "./src/main/erdiagram/util/string-utils.ts");
/* harmony import */ var _erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/util/indent-utils */ "./src/main/erdiagram/util/indent-utils.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_typescript_config_TypeScriptConfigManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/typescript/config/TypeScriptConfigManager */ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/config/TypeScriptConfigManager.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_typescript_type_TypeScriptTypeResolver__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/typescript/type/TypeScriptTypeResolver */ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/type/TypeScriptTypeResolver.ts");




class TypeScriptClassModelToCodeConverter {
    config;
    typeResolver;
    constructor(config) {
        this.config = _erdiagram_converter_oop_source_code_generator_typescript_config_TypeScriptConfigManager__WEBPACK_IMPORTED_MODULE_2__["default"].mergeWithDefaultConfig(config);
        this.typeResolver = new _erdiagram_converter_oop_source_code_generator_typescript_type_TypeScriptTypeResolver__WEBPACK_IMPORTED_MODULE_3__["default"](this.config.typeBindings);
    }
    convertToCode(classModel) {
        return classModel.classes
            .map(classDescriptor => this.generateClass(classDescriptor))
            .join('\n\n');
    }
    generateClass(classDescriptor) {
        const interfaceName = (0,_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_0__.capitalizeWord)(classDescriptor.name);
        const fieldsLines = classDescriptor.fields
            .map(field => this.createField(field));
        const classOuterLines = [
            `interface ${interfaceName} {`
        ];
        classOuterLines.push(...(0,_erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_1__.indentLines)(fieldsLines));
        classOuterLines.push(`}`);
        return classOuterLines.join('\n');
    }
    createField(field) {
        const fieldName = field.name;
        const typescriptType = this.typeResolver.resolveFieldType(field);
        const formattedTypeScriptType = typescriptType.format();
        const optionalIndicatorChar = field.nullable ? '?' : '';
        return `${fieldName}${optionalIndicatorChar}: ${formattedTypeScriptType};`;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/TypeScriptSourceCodeGenerator.ts":
/*!************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/typescript/TypeScriptSourceCodeGenerator.ts ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TypeScriptSourceCodeGenerator)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_typescript_TypeScriptSourceCodeGeneratorBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/typescript/TypeScriptSourceCodeGeneratorBuilder */ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/TypeScriptSourceCodeGeneratorBuilder.ts");

class TypeScriptSourceCodeGenerator {
    _classModelGenerator;
    _typeScriptClassModelToCodeConverter;
    constructor(classModelGenerator, typeScriptClassModelToCodeConverter) {
        this._classModelGenerator = classModelGenerator;
        this._typeScriptClassModelToCodeConverter = typeScriptClassModelToCodeConverter;
    }
    generateSourceCode(entityRelationshipModel) {
        const classModel = this._classModelGenerator.generateClassModel(entityRelationshipModel);
        return this._typeScriptClassModelToCodeConverter.convertToCode(classModel);
    }
    static withDefaultConfig() {
        return this.builder().build();
    }
    static builder() {
        return new _erdiagram_converter_oop_source_code_generator_typescript_TypeScriptSourceCodeGeneratorBuilder__WEBPACK_IMPORTED_MODULE_0__["default"]();
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/TypeScriptSourceCodeGeneratorBuilder.ts":
/*!*******************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/typescript/TypeScriptSourceCodeGeneratorBuilder.ts ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TypeScriptSourceCodeGeneratorBuilder)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_oop_model_ClassModelGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/model/ClassModelGenerator */ "./src/main/erdiagram/converter/oop/model/ClassModelGenerator.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_typescript_TypeScriptClassModelToCodeConverter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/typescript/TypeScriptClassModelToCodeConverter */ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/TypeScriptClassModelToCodeConverter.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_typescript_TypeScriptSourceCodeGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/typescript/TypeScriptSourceCodeGenerator */ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/TypeScriptSourceCodeGenerator.ts");



class TypeScriptSourceCodeGeneratorBuilder {
    _classModelConfig = {};
    _typeScriptConfig = {};
    configureClassModel(config) {
        this._classModelConfig = config;
        return this;
    }
    configureTypeScript(config) {
        this._typeScriptConfig = config;
        return this;
    }
    build() {
        return new _erdiagram_converter_oop_source_code_generator_typescript_TypeScriptSourceCodeGenerator__WEBPACK_IMPORTED_MODULE_2__["default"](new _erdiagram_converter_oop_model_ClassModelGenerator__WEBPACK_IMPORTED_MODULE_0__["default"](this._classModelConfig), new _erdiagram_converter_oop_source_code_generator_typescript_TypeScriptClassModelToCodeConverter__WEBPACK_IMPORTED_MODULE_1__["default"](this._typeScriptConfig));
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/config/TypeScriptConfigManager.ts":
/*!*************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/typescript/config/TypeScriptConfigManager.ts ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TypeScriptConfigManager: () => (/* binding */ TypeScriptConfigManager),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/entity-relationship-model-types */ "./src/main/erdiagram/parser/types/entity-relationship-model-types.ts");
/* harmony import */ var _erdiagram_common_config_AbstractConfigManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/common/config/AbstractConfigManager */ "./src/main/erdiagram/common/config/AbstractConfigManager.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/typescript/type/parseTypeScriptType */ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/type/parseTypeScriptType.ts");
/* harmony import */ var true_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! true-json */ "./node_modules/true-json/dist/true-json.umd.js");
/* harmony import */ var true_json__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(true_json__WEBPACK_IMPORTED_MODULE_3__);




class TypeScriptConfigManager extends _erdiagram_common_config_AbstractConfigManager__WEBPACK_IMPORTED_MODULE_1__["default"] {
    getDefaultConfig() {
        return {
            typeBindings: {
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.IDENTITY]: (0,_erdiagram_converter_oop_source_code_generator_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__["default"])('number'),
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.TEXT]: (0,_erdiagram_converter_oop_source_code_generator_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__["default"])('string'),
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.LONG]: (0,_erdiagram_converter_oop_source_code_generator_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__["default"])('number'),
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.INT]: (0,_erdiagram_converter_oop_source_code_generator_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__["default"])('number'),
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.SHORT]: (0,_erdiagram_converter_oop_source_code_generator_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__["default"])('number'),
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.DECIMAL]: (0,_erdiagram_converter_oop_source_code_generator_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__["default"])('number'),
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.BOOLEAN]: (0,_erdiagram_converter_oop_source_code_generator_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__["default"])('boolean'),
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.DATE]: (0,_erdiagram_converter_oop_source_code_generator_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__["default"])('Date'),
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.TIME]: (0,_erdiagram_converter_oop_source_code_generator_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__["default"])('Date'),
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.DATETIME]: (0,_erdiagram_converter_oop_source_code_generator_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__["default"])('Date'),
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.BLOB]: (0,_erdiagram_converter_oop_source_code_generator_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__["default"])('Uint8Array'),
            }
        };
    }
    mergeConfigs(fullConfig, partialConfig) {
        return {
            ...fullConfig,
            ...partialConfig,
            typeBindings: {
                ...fullConfig.typeBindings,
                ...partialConfig?.typeBindings
            }
        };
    }
    getJsonAdapter() {
        return true_json__WEBPACK_IMPORTED_MODULE_3__.JsonAdapters.object({
            typeBindings: true_json__WEBPACK_IMPORTED_MODULE_3__.JsonAdapters.record(true_json__WEBPACK_IMPORTED_MODULE_3__.JsonAdapters.custom({
                adaptToJson(value) {
                    return value.format();
                },
                recoverFromJson(value) {
                    return (0,_erdiagram_converter_oop_source_code_generator_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__["default"])(value);
                }
            }))
        });
    }
}
const typescriptConfigManager = new TypeScriptConfigManager();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (typescriptConfigManager);


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/config/exports.ts":
/*!*********************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/typescript/config/exports.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TypeScriptConfigManager: () => (/* reexport safe */ _TypeScriptConfigManager__WEBPACK_IMPORTED_MODULE_0__.TypeScriptConfigManager),
/* harmony export */   typescriptConfigManager: () => (/* reexport safe */ _TypeScriptConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _TypeScriptConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TypeScriptConfigManager */ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/config/TypeScriptConfigManager.ts");




/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/exports.ts":
/*!**************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/typescript/exports.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TypeScriptClassModelToCodeConverter: () => (/* reexport safe */ _TypeScriptClassModelToCodeConverter__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   TypeScriptConfigManager: () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_3__.TypeScriptConfigManager),
/* harmony export */   TypeScriptSourceCodeGenerator: () => (/* reexport safe */ _erdiagram_converter_oop_source_code_generator_typescript_TypeScriptSourceCodeGenerator__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   TypeScriptSourceCodeGeneratorBuilder: () => (/* reexport safe */ _erdiagram_converter_oop_source_code_generator_typescript_TypeScriptSourceCodeGeneratorBuilder__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   createTypeScriptArrayType: () => (/* reexport safe */ _type_exports__WEBPACK_IMPORTED_MODULE_4__.createTypeScriptArrayType),
/* harmony export */   createTypeScriptParameterizedType: () => (/* reexport safe */ _type_exports__WEBPACK_IMPORTED_MODULE_4__.createTypeScriptParameterizedType),
/* harmony export */   createTypeScriptSimpleType: () => (/* reexport safe */ _type_exports__WEBPACK_IMPORTED_MODULE_4__.createTypeScriptSimpleType),
/* harmony export */   isTypeScriptParameterizedType: () => (/* reexport safe */ _type_exports__WEBPACK_IMPORTED_MODULE_4__.isTypeScriptParameterizedType),
/* harmony export */   parseTypeScriptType: () => (/* reexport safe */ _type_exports__WEBPACK_IMPORTED_MODULE_4__.parseTypeScriptType),
/* harmony export */   typescriptConfigManager: () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_3__.typescriptConfigManager)
/* harmony export */ });
/* harmony import */ var _TypeScriptClassModelToCodeConverter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TypeScriptClassModelToCodeConverter */ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/TypeScriptClassModelToCodeConverter.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_typescript_TypeScriptSourceCodeGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/typescript/TypeScriptSourceCodeGenerator */ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/TypeScriptSourceCodeGenerator.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_typescript_TypeScriptSourceCodeGeneratorBuilder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/typescript/TypeScriptSourceCodeGeneratorBuilder */ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/TypeScriptSourceCodeGeneratorBuilder.ts");
/* harmony import */ var _config_exports__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config/exports */ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/config/exports.ts");
/* harmony import */ var _type_exports__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./type/exports */ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/type/exports.ts");








/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/type/TypeScriptTypeResolver.ts":
/*!**********************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/typescript/type/TypeScriptTypeResolver.ts ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TypeScriptTypeResolver)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_typescript_type_parameterized_createTypeScriptArrayType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/typescript/type/parameterized/createTypeScriptArrayType */ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/type/parameterized/createTypeScriptArrayType.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_typescript_type_simple_createTypeScriptSimpleType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/typescript/type/simple/createTypeScriptSimpleType */ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/type/simple/createTypeScriptSimpleType.ts");


class TypeScriptTypeResolver {
    typeBindings;
    constructor(typeBindings) {
        this.typeBindings = typeBindings;
    }
    resolveFieldType(field) {
        if (field.list) {
            return this.resolveListType(field);
        }
        else {
            return this.resolveSingleType(field);
        }
    }
    resolveListType(field) {
        return (0,_erdiagram_converter_oop_source_code_generator_typescript_type_parameterized_createTypeScriptArrayType__WEBPACK_IMPORTED_MODULE_0__["default"])(this.resolveSingleType(field));
    }
    resolveSingleType(field) {
        const { entityType, primitiveType } = field;
        if (entityType) {
            if (primitiveType) {
                throw new Error('Invalid field descriptor: provided both primitive and entity types');
            }
            return (0,_erdiagram_converter_oop_source_code_generator_typescript_type_simple_createTypeScriptSimpleType__WEBPACK_IMPORTED_MODULE_1__["default"])(entityType);
        }
        if (!primitiveType) {
            throw new Error('Invalid field descriptor: missing type');
        }
        /* istanbul ignore next */
        if (!Object.hasOwn(this.typeBindings, primitiveType)) {
            throw new Error('Unsupported type: ' + primitiveType);
        }
        return this.typeBindings[primitiveType];
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/type/exports.ts":
/*!*******************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/typescript/type/exports.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createTypeScriptArrayType: () => (/* reexport safe */ _parameterized_createTypeScriptArrayType__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   createTypeScriptParameterizedType: () => (/* reexport safe */ _parameterized_createTypeScriptParameterizedType__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   createTypeScriptSimpleType: () => (/* reexport safe */ _simple_createTypeScriptSimpleType__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   isTypeScriptParameterizedType: () => (/* reexport safe */ _parameterized_isTypeScriptParameterizedType__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   parseTypeScriptType: () => (/* reexport safe */ _parseTypeScriptType__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _parseTypeScriptType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parseTypeScriptType */ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/type/parseTypeScriptType.ts");
/* harmony import */ var _parameterized_createTypeScriptParameterizedType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parameterized/createTypeScriptParameterizedType */ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/type/parameterized/createTypeScriptParameterizedType.ts");
/* harmony import */ var _parameterized_createTypeScriptArrayType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parameterized/createTypeScriptArrayType */ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/type/parameterized/createTypeScriptArrayType.ts");
/* harmony import */ var _parameterized_isTypeScriptParameterizedType__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./parameterized/isTypeScriptParameterizedType */ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/type/parameterized/isTypeScriptParameterizedType.ts");
/* harmony import */ var _simple_createTypeScriptSimpleType__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./simple/createTypeScriptSimpleType */ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/type/simple/createTypeScriptSimpleType.ts");








/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/type/parameterized/createTypeScriptArrayType.ts":
/*!***************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/typescript/type/parameterized/createTypeScriptArrayType.ts ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createTypeScriptArrayType)
/* harmony export */ });
function createTypeScriptArrayType(parameterType) {
    return new TypeScriptArrayTypeImpl(parameterType);
}
class TypeScriptArrayTypeImpl {
    _parameterType;
    constructor(parameterType) {
        this._parameterType = parameterType;
    }
    get name() {
        return 'Array';
    }
    get parameterTypes() {
        return [this._parameterType];
    }
    format() {
        const formattedParameterType = this._parameterType.format();
        return `${formattedParameterType}[]`;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/type/parameterized/createTypeScriptParameterizedType.ts":
/*!***********************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/typescript/type/parameterized/createTypeScriptParameterizedType.ts ***!
  \***********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createTypeScriptParameterizedType)
/* harmony export */ });
function createTypeScriptParameterizedType(name, parameterTypes) {
    return new TypeScriptParameterizedTypeImpl(name, parameterTypes);
}
class TypeScriptParameterizedTypeImpl {
    _name;
    _parameterTypes;
    constructor(name, parameterTypes) {
        this._name = name;
        this._parameterTypes = parameterTypes;
    }
    get name() {
        return this._name;
    }
    get parameterTypes() {
        return this._parameterTypes;
    }
    format() {
        const formattedParameterTypes = this._parameterTypes.map(parameterType => parameterType.format()).join(', ');
        return `${this._name}<${formattedParameterTypes}>`;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/type/parameterized/isTypeScriptParameterizedType.ts":
/*!*******************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/typescript/type/parameterized/isTypeScriptParameterizedType.ts ***!
  \*******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isTypeScriptParameterizedType)
/* harmony export */ });
function isTypeScriptParameterizedType(javaType) {
    return Array.isArray(javaType.parameterTypes);
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/type/parseTypeScriptType.ts":
/*!*******************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/typescript/type/parseTypeScriptType.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ parseTypeScriptType)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_typescript_type_parameterized_createTypeScriptParameterizedType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/typescript/type/parameterized/createTypeScriptParameterizedType */ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/type/parameterized/createTypeScriptParameterizedType.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_typescript_type_parameterized_createTypeScriptArrayType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/typescript/type/parameterized/createTypeScriptArrayType */ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/type/parameterized/createTypeScriptArrayType.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_typescript_type_simple_createTypeScriptSimpleType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/typescript/type/simple/createTypeScriptSimpleType */ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/type/simple/createTypeScriptSimpleType.ts");



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
        const [, rawTypeText] = ARRAY_TYPE_REGEX.exec(trimmedText);
        return (0,_erdiagram_converter_oop_source_code_generator_typescript_type_parameterized_createTypeScriptArrayType__WEBPACK_IMPORTED_MODULE_1__["default"])(parseTypeScriptTypeInternal(rawTypeText));
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
    return (0,_erdiagram_converter_oop_source_code_generator_typescript_type_parameterized_createTypeScriptParameterizedType__WEBPACK_IMPORTED_MODULE_0__["default"])(rawType.name, parameterTypes);
}
function parseTypeScriptRawType(text) {
    const trimmedText = text.trim();
    if (!RAW_TYPE_REGEX.test(trimmedText)) {
        throw new Error(`Illegal TypeScript type format: ${text}`);
    }
    return (0,_erdiagram_converter_oop_source_code_generator_typescript_type_simple_createTypeScriptSimpleType__WEBPACK_IMPORTED_MODULE_2__["default"])(trimmedText);
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
                /* istanbul ignore next */
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

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/type/simple/createTypeScriptSimpleType.ts":
/*!*********************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/typescript/type/simple/createTypeScriptSimpleType.ts ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createTypeScriptSimpleType)
/* harmony export */ });
function createTypeScriptSimpleType(name) {
    return new TypeScriptSimpleTypeImpl(name);
}
class TypeScriptSimpleTypeImpl {
    _name;
    constructor(name) {
        this._name = name;
    }
    get name() {
        return this._name;
    }
    format() {
        return this._name;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/exports.ts":
/*!***************************************!*\
  !*** ./src/main/erdiagram/exports.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbstractConfigManager: () => (/* reexport safe */ _common_exports__WEBPACK_IMPORTED_MODULE_0__.AbstractConfigManager),
/* harmony export */   BeanValidationConfigManager: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.BeanValidationConfigManager),
/* harmony export */   BeanValidationTransformer: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.BeanValidationTransformer),
/* harmony export */   Cardinality: () => (/* reexport safe */ _parser_exports__WEBPACK_IMPORTED_MODULE_2__.Cardinality),
/* harmony export */   CaseConverter: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.CaseConverter),
/* harmony export */   ClassModelConfigManager: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.ClassModelConfigManager),
/* harmony export */   ClassModelGenerator: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.ClassModelGenerator),
/* harmony export */   DatabaseModelConfigManager: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.DatabaseModelConfigManager),
/* harmony export */   DatabaseModelGenerator: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.DatabaseModelGenerator),
/* harmony export */   DatabaseModelToSqlCodeConverter: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.DatabaseModelToSqlCodeConverter),
/* harmony export */   DiagramLevel: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.DiagramLevel),
/* harmony export */   Direction: () => (/* reexport safe */ _parser_exports__WEBPACK_IMPORTED_MODULE_2__.Direction),
/* harmony export */   ERDiagramDuplicatedEntityNameError: () => (/* reexport safe */ _parser_exports__WEBPACK_IMPORTED_MODULE_2__.ERDiagramDuplicatedEntityNameError),
/* harmony export */   ERDiagramDuplicatedPropertyNameError: () => (/* reexport safe */ _parser_exports__WEBPACK_IMPORTED_MODULE_2__.ERDiagramDuplicatedPropertyNameError),
/* harmony export */   ERDiagramEntityError: () => (/* reexport safe */ _parser_exports__WEBPACK_IMPORTED_MODULE_2__.ERDiagramEntityError),
/* harmony export */   ERDiagramEntityPropertyError: () => (/* reexport safe */ _parser_exports__WEBPACK_IMPORTED_MODULE_2__.ERDiagramEntityPropertyError),
/* harmony export */   ERDiagramError: () => (/* reexport safe */ _parser_exports__WEBPACK_IMPORTED_MODULE_2__.ERDiagramError),
/* harmony export */   ERDiagramInvalidIdentityDefinitionError: () => (/* reexport safe */ _parser_exports__WEBPACK_IMPORTED_MODULE_2__.ERDiagramInvalidIdentityDefinitionError),
/* harmony export */   ERDiagramMultipleIdentitiesError: () => (/* reexport safe */ _parser_exports__WEBPACK_IMPORTED_MODULE_2__.ERDiagramMultipleIdentitiesError),
/* harmony export */   ERDiagramParseLineError: () => (/* reexport safe */ _parser_exports__WEBPACK_IMPORTED_MODULE_2__.ERDiagramParseLineError),
/* harmony export */   ERDiagramRelationshipError: () => (/* reexport safe */ _parser_exports__WEBPACK_IMPORTED_MODULE_2__.ERDiagramRelationshipError),
/* harmony export */   ERDiagramSyntaxError: () => (/* reexport safe */ _parser_exports__WEBPACK_IMPORTED_MODULE_2__.ERDiagramSyntaxError),
/* harmony export */   ERDiagramUnknownEntityError: () => (/* reexport safe */ _parser_exports__WEBPACK_IMPORTED_MODULE_2__.ERDiagramUnknownEntityError),
/* harmony export */   ERDiagramUnknownTypeError: () => (/* reexport safe */ _parser_exports__WEBPACK_IMPORTED_MODULE_2__.ERDiagramUnknownTypeError),
/* harmony export */   EntityPropertyType: () => (/* reexport safe */ _parser_exports__WEBPACK_IMPORTED_MODULE_2__.EntityPropertyType),
/* harmony export */   EntityRelationshipModelParser: () => (/* reexport safe */ _parser_exports__WEBPACK_IMPORTED_MODULE_2__.EntityRelationshipModelParser),
/* harmony export */   EntityRelationshipModelParserConfigManager: () => (/* reexport safe */ _parser_exports__WEBPACK_IMPORTED_MODULE_2__.EntityRelationshipModelParserConfigManager),
/* harmony export */   JavaAnnotation: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.JavaAnnotation),
/* harmony export */   JavaClassModelConfigManager: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.JavaClassModelConfigManager),
/* harmony export */   JavaClassModelGenerator: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.JavaClassModelGenerator),
/* harmony export */   JavaExtendedPackage: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.JavaExtendedPackage),
/* harmony export */   JavaSourceCodeGenerator: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.JavaSourceCodeGenerator),
/* harmony export */   JavaSourceCodeGeneratorBuilder: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.JavaSourceCodeGeneratorBuilder),
/* harmony export */   JavaVisibility: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.JavaVisibility),
/* harmony export */   JpaConfigManager: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.JpaConfigManager),
/* harmony export */   JpaTransformer: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.JpaTransformer),
/* harmony export */   JpaTransformerBuilder: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.JpaTransformerBuilder),
/* harmony export */   LombokConfigManager: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.LombokConfigManager),
/* harmony export */   LombokTransformer: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.LombokTransformer),
/* harmony export */   MysqlDialect: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.MysqlDialect),
/* harmony export */   MysqlDialectConfigManager: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.MysqlDialectConfigManager),
/* harmony export */   NomnomlConfigManager: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.NomnomlConfigManager),
/* harmony export */   NomnomlSourceCodeGenerator: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.NomnomlSourceCodeGenerator),
/* harmony export */   NotNullBlobValidationStrategy: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.NotNullBlobValidationStrategy),
/* harmony export */   NotNullTextValidationStrategy: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.NotNullTextValidationStrategy),
/* harmony export */   OracleDialect: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.OracleDialect),
/* harmony export */   OracleDialectConfigManager: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.OracleDialectConfigManager),
/* harmony export */   PlantUmlConfigManager: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.PlantUmlConfigManager),
/* harmony export */   PlantUmlSourceCodeGenerator: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.PlantUmlSourceCodeGenerator),
/* harmony export */   PostgresqlDialect: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.PostgresqlDialect),
/* harmony export */   PostgresqlDialectConfigManager: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.PostgresqlDialectConfigManager),
/* harmony export */   SqlServerDialect: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.SqlServerDialect),
/* harmony export */   SqlServerDialectConfigManager: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.SqlServerDialectConfigManager),
/* harmony export */   SqlSourceCodeGenerator: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.SqlSourceCodeGenerator),
/* harmony export */   SqlSourceCodeGeneratorBuilder: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.SqlSourceCodeGeneratorBuilder),
/* harmony export */   SqliteDialect: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.SqliteDialect),
/* harmony export */   SqliteDialectConfigManager: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.SqliteDialectConfigManager),
/* harmony export */   StandardCaseFormats: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.StandardCaseFormats),
/* harmony export */   StandardIdNamingStrategies: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.StandardIdNamingStrategies),
/* harmony export */   TypeScriptClassModelToCodeConverter: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.TypeScriptClassModelToCodeConverter),
/* harmony export */   TypeScriptConfigManager: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.TypeScriptConfigManager),
/* harmony export */   TypeScriptSourceCodeGenerator: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.TypeScriptSourceCodeGenerator),
/* harmony export */   TypeScriptSourceCodeGeneratorBuilder: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.TypeScriptSourceCodeGeneratorBuilder),
/* harmony export */   beanValidationConfigManager: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.beanValidationConfigManager),
/* harmony export */   classModelConfigManager: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.classModelConfigManager),
/* harmony export */   createJavaArrayType: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.createJavaArrayType),
/* harmony export */   createJavaParameterizedType: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.createJavaParameterizedType),
/* harmony export */   createJavaSimpleType: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.createJavaSimpleType),
/* harmony export */   createTypeScriptArrayType: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.createTypeScriptArrayType),
/* harmony export */   createTypeScriptParameterizedType: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.createTypeScriptParameterizedType),
/* harmony export */   createTypeScriptSimpleType: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.createTypeScriptSimpleType),
/* harmony export */   databaseModelConfigManager: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.databaseModelConfigManager),
/* harmony export */   entityRelationshipModelParserConfigManager: () => (/* reexport safe */ _parser_exports__WEBPACK_IMPORTED_MODULE_2__.entityRelationshipModelParserConfigManager),
/* harmony export */   isJavaParameterizedType: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.isJavaParameterizedType),
/* harmony export */   isMultipleFileSourceCodeGenerator: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.isMultipleFileSourceCodeGenerator),
/* harmony export */   isTypeScriptParameterizedType: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.isTypeScriptParameterizedType),
/* harmony export */   javaClassModelConfigManager: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.javaClassModelConfigManager),
/* harmony export */   jpaConfigManager: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.jpaConfigManager),
/* harmony export */   lombokConfigManager: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.lombokConfigManager),
/* harmony export */   mysqlDialectConfigManager: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.mysqlDialectConfigManager),
/* harmony export */   nomnomlConfigManager: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.nomnomlConfigManager),
/* harmony export */   oracleDialectConfigManager: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.oracleDialectConfigManager),
/* harmony export */   parseJavaType: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.parseJavaType),
/* harmony export */   parseTypeScriptType: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.parseTypeScriptType),
/* harmony export */   plantUmlConfigManager: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.plantUmlConfigManager),
/* harmony export */   postgresqlDialectConfigManager: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.postgresqlDialectConfigManager),
/* harmony export */   sqlServerDialectConfigManager: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.sqlServerDialectConfigManager),
/* harmony export */   sqliteDialectConfigManager: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.sqliteDialectConfigManager),
/* harmony export */   typescriptConfigManager: () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.typescriptConfigManager)
/* harmony export */ });
/* harmony import */ var _common_exports__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common/exports */ "./src/main/erdiagram/common/exports.ts");
/* harmony import */ var _converter_exports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./converter/exports */ "./src/main/erdiagram/converter/exports.ts");
/* harmony import */ var _parser_exports__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parser/exports */ "./src/main/erdiagram/parser/exports.ts");





/***/ }),

/***/ "./src/main/erdiagram/parser/EntityRelationshipModelParser.ts":
/*!********************************************************************!*\
  !*** ./src/main/erdiagram/parser/EntityRelationshipModelParser.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EntityRelationshipModelParser)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_validator_EntityRelationshipModelParseResultValidator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/validator/EntityRelationshipModelParseResultValidator */ "./src/main/erdiagram/parser/validator/EntityRelationshipModelParseResultValidator.ts");
/* harmony import */ var _erdiagram_parser_config_EntityRelationshipModelParserConfigManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/parser/config/EntityRelationshipModelParserConfigManager */ "./src/main/erdiagram/parser/config/EntityRelationshipModelParserConfigManager.ts");
/* harmony import */ var _erdiagram_parser_ParsedModelToPublicModelConverter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/parser/ParsedModelToPublicModelConverter */ "./src/main/erdiagram/parser/ParsedModelToPublicModelConverter.ts");
/* harmony import */ var _erdiagram_parser_EntityRelationshipModelParserWithoutValidation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/parser/EntityRelationshipModelParserWithoutValidation */ "./src/main/erdiagram/parser/EntityRelationshipModelParserWithoutValidation.ts");




class EntityRelationshipModelParser {
    config;
    entityRelationshipModelParserWithoutValidation;
    validator;
    parsedModelToPublicModelConverter;
    constructor(config) {
        this.config = _erdiagram_parser_config_EntityRelationshipModelParserConfigManager__WEBPACK_IMPORTED_MODULE_1__["default"].mergeWithDefaultConfig(config);
        this.entityRelationshipModelParserWithoutValidation = new _erdiagram_parser_EntityRelationshipModelParserWithoutValidation__WEBPACK_IMPORTED_MODULE_3__["default"]();
        this.validator = new _erdiagram_parser_validator_EntityRelationshipModelParseResultValidator__WEBPACK_IMPORTED_MODULE_0__["default"](this.config.allowUnknownEntities);
        this.parsedModelToPublicModelConverter = new _erdiagram_parser_ParsedModelToPublicModelConverter__WEBPACK_IMPORTED_MODULE_2__["default"]();
    }
    parseModel(code) {
        const parseResult = this.entityRelationshipModelParserWithoutValidation.parseModelWithoutValidation(code);
        this.validator.validateParseResult(parseResult);
        return this.parsedModelToPublicModelConverter.convertParsedModelToPublicModel(parseResult.model);
    }
}


/***/ }),

/***/ "./src/main/erdiagram/parser/EntityRelationshipModelParserWithoutValidation.ts":
/*!*************************************************************************************!*\
  !*** ./src/main/erdiagram/parser/EntityRelationshipModelParserWithoutValidation.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EntityRelationshipModelParserWithoutValidation)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_line_EntityRelationshipModelLineParser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/line/EntityRelationshipModelLineParser */ "./src/main/erdiagram/parser/line/EntityRelationshipModelLineParser.ts");

const LINE_SEPARATOR = '\n';
class EntityRelationshipModelParserWithoutValidation {
    lineParser;
    constructor() {
        this.lineParser = new _erdiagram_parser_line_EntityRelationshipModelLineParser__WEBPACK_IMPORTED_MODULE_0__["default"]();
    }
    parseModelWithoutValidation(code) {
        const state = this.createInitialParseState();
        this.parseCode(code, state);
        return this.mapParseStateToParseResult(state);
    }
    createInitialParseState() {
        return {
            entities: [],
            relationships: [],
            entityBeingParsed: null,
            statementResultToLineMap: new Map()
        };
    }
    parseCode(code, state) {
        const lines = code.split(LINE_SEPARATOR);
        this.lineParser.parseLines(lines, state);
    }
    mapParseStateToParseResult(state) {
        const { entities, relationships, statementResultToLineMap } = state;
        return {
            model: {
                entities,
                relationships
            },
            statementResultToLineMap
        };
    }
}


/***/ }),

/***/ "./src/main/erdiagram/parser/ParsedModelToPublicModelConverter.ts":
/*!************************************************************************!*\
  !*** ./src/main/erdiagram/parser/ParsedModelToPublicModelConverter.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ParsedModelToPublicModelConverter)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/entity-relationship-model-types */ "./src/main/erdiagram/parser/types/entity-relationship-model-types.ts");

class ParsedModelToPublicModelConverter {
    convertParsedModelToPublicModel(parsedModel) {
        return {
            entities: parsedModel.entities.map(parsedEntity => this.convertParsedEntityToPublicEntity(parsedEntity)),
            relationships: parsedModel.relationships
        };
    }
    convertParsedEntityToPublicEntity(parsedEntity) {
        const identityProperty = this.getEntityIdentityProperty(parsedEntity);
        return {
            name: parsedEntity.name,
            identityPropertyName: identityProperty?.name,
            properties: parsedEntity.properties.filter(property => property != identityProperty)
        };
    }
    getEntityIdentityProperty(parsedEntity) {
        return parsedEntity.properties.find(property => property.type === _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.IDENTITY);
    }
}


/***/ }),

/***/ "./src/main/erdiagram/parser/config/EntityRelationshipModelParserConfigManager.ts":
/*!****************************************************************************************!*\
  !*** ./src/main/erdiagram/parser/config/EntityRelationshipModelParserConfigManager.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EntityRelationshipModelParserConfigManager: () => (/* binding */ EntityRelationshipModelParserConfigManager),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _erdiagram_common_config_AbstractConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/common/config/AbstractConfigManager */ "./src/main/erdiagram/common/config/AbstractConfigManager.ts");

class EntityRelationshipModelParserConfigManager extends _erdiagram_common_config_AbstractConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"] {
    getDefaultConfig() {
        return {
            allowUnknownEntities: false
        };
    }
    mergeConfigs(fullConfig, partialConfig) {
        return {
            ...fullConfig,
            ...partialConfig
        };
    }
}
const entityRelationshipModelParserConfigManager = new EntityRelationshipModelParserConfigManager();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (entityRelationshipModelParserConfigManager);


/***/ }),

/***/ "./src/main/erdiagram/parser/config/exports.ts":
/*!*****************************************************!*\
  !*** ./src/main/erdiagram/parser/config/exports.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EntityRelationshipModelParserConfigManager: () => (/* reexport safe */ _EntityRelationshipModelParserConfigManager__WEBPACK_IMPORTED_MODULE_0__.EntityRelationshipModelParserConfigManager),
/* harmony export */   entityRelationshipModelParserConfigManager: () => (/* reexport safe */ _EntityRelationshipModelParserConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _EntityRelationshipModelParserConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EntityRelationshipModelParserConfigManager */ "./src/main/erdiagram/parser/config/EntityRelationshipModelParserConfigManager.ts");




/***/ }),

/***/ "./src/main/erdiagram/parser/exports.ts":
/*!**********************************************!*\
  !*** ./src/main/erdiagram/parser/exports.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Cardinality: () => (/* reexport safe */ _types_exports__WEBPACK_IMPORTED_MODULE_2__.Cardinality),
/* harmony export */   Direction: () => (/* reexport safe */ _types_exports__WEBPACK_IMPORTED_MODULE_2__.Direction),
/* harmony export */   ERDiagramDuplicatedEntityNameError: () => (/* reexport safe */ _types_exports__WEBPACK_IMPORTED_MODULE_2__.ERDiagramDuplicatedEntityNameError),
/* harmony export */   ERDiagramDuplicatedPropertyNameError: () => (/* reexport safe */ _types_exports__WEBPACK_IMPORTED_MODULE_2__.ERDiagramDuplicatedPropertyNameError),
/* harmony export */   ERDiagramEntityError: () => (/* reexport safe */ _types_exports__WEBPACK_IMPORTED_MODULE_2__.ERDiagramEntityError),
/* harmony export */   ERDiagramEntityPropertyError: () => (/* reexport safe */ _types_exports__WEBPACK_IMPORTED_MODULE_2__.ERDiagramEntityPropertyError),
/* harmony export */   ERDiagramError: () => (/* reexport safe */ _types_exports__WEBPACK_IMPORTED_MODULE_2__.ERDiagramError),
/* harmony export */   ERDiagramInvalidIdentityDefinitionError: () => (/* reexport safe */ _types_exports__WEBPACK_IMPORTED_MODULE_2__.ERDiagramInvalidIdentityDefinitionError),
/* harmony export */   ERDiagramMultipleIdentitiesError: () => (/* reexport safe */ _types_exports__WEBPACK_IMPORTED_MODULE_2__.ERDiagramMultipleIdentitiesError),
/* harmony export */   ERDiagramParseLineError: () => (/* reexport safe */ _types_exports__WEBPACK_IMPORTED_MODULE_2__.ERDiagramParseLineError),
/* harmony export */   ERDiagramRelationshipError: () => (/* reexport safe */ _types_exports__WEBPACK_IMPORTED_MODULE_2__.ERDiagramRelationshipError),
/* harmony export */   ERDiagramSyntaxError: () => (/* reexport safe */ _types_exports__WEBPACK_IMPORTED_MODULE_2__.ERDiagramSyntaxError),
/* harmony export */   ERDiagramUnknownEntityError: () => (/* reexport safe */ _types_exports__WEBPACK_IMPORTED_MODULE_2__.ERDiagramUnknownEntityError),
/* harmony export */   ERDiagramUnknownTypeError: () => (/* reexport safe */ _types_exports__WEBPACK_IMPORTED_MODULE_2__.ERDiagramUnknownTypeError),
/* harmony export */   EntityPropertyType: () => (/* reexport safe */ _types_exports__WEBPACK_IMPORTED_MODULE_2__.EntityPropertyType),
/* harmony export */   EntityRelationshipModelParser: () => (/* reexport safe */ _EntityRelationshipModelParser__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   EntityRelationshipModelParserConfigManager: () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_1__.EntityRelationshipModelParserConfigManager),
/* harmony export */   entityRelationshipModelParserConfigManager: () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_1__.entityRelationshipModelParserConfigManager)
/* harmony export */ });
/* harmony import */ var _EntityRelationshipModelParser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EntityRelationshipModelParser */ "./src/main/erdiagram/parser/EntityRelationshipModelParser.ts");
/* harmony import */ var _config_exports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config/exports */ "./src/main/erdiagram/parser/config/exports.ts");
/* harmony import */ var _types_exports__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types/exports */ "./src/main/erdiagram/parser/types/exports.ts");






/***/ }),

/***/ "./src/main/erdiagram/parser/line/EntityRelationshipModelLineParser.ts":
/*!*****************************************************************************!*\
  !*** ./src/main/erdiagram/parser/line/EntityRelationshipModelLineParser.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EntityRelationshipModelLineParser)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_statement_statement_types_parse_functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/statement/statement-types-parse-functions */ "./src/main/erdiagram/parser/statement/statement-types-parse-functions.ts");
/* harmony import */ var _erdiagram_parser_statement_statement_type_guesser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/parser/statement/statement-type-guesser */ "./src/main/erdiagram/parser/statement/statement-type-guesser.ts");
/* harmony import */ var _erdiagram_parser_line_EntityRelationshipModelLineParserErrorHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/parser/line/EntityRelationshipModelLineParserErrorHandler */ "./src/main/erdiagram/parser/line/EntityRelationshipModelLineParserErrorHandler.ts");
/* harmony import */ var _erdiagram_parser_types_error_ERDiagramSyntaxError__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/parser/types/error/ERDiagramSyntaxError */ "./src/main/erdiagram/parser/types/error/ERDiagramSyntaxError.ts");




class EntityRelationshipModelLineParser {
    errorHandler;
    constructor() {
        this.errorHandler = new _erdiagram_parser_line_EntityRelationshipModelLineParserErrorHandler__WEBPACK_IMPORTED_MODULE_2__["default"]();
    }
    parseLines(lines, state) {
        lines.forEach((line, lineIndex) => {
            try {
                this.parseLine(line, lineIndex, state);
            }
            catch (error) {
                this.errorHandler.handleLineError(error, lineIndex);
            }
        });
    }
    parseLine(line, lineIndex, state) {
        const statementType = (0,_erdiagram_parser_statement_statement_type_guesser__WEBPACK_IMPORTED_MODULE_1__.guessStatementType)(line);
        switch (statementType) {
            case _erdiagram_parser_statement_statement_type_guesser__WEBPACK_IMPORTED_MODULE_1__.StatementType.ENTITY_NAME:
                this.parseEntityNameLine(line, state, lineIndex);
                break;
            case _erdiagram_parser_statement_statement_type_guesser__WEBPACK_IMPORTED_MODULE_1__.StatementType.ENTITY_PROPERTY:
                this.parseEntityPropertyLine(state, line, lineIndex);
                break;
            case _erdiagram_parser_statement_statement_type_guesser__WEBPACK_IMPORTED_MODULE_1__.StatementType.RELATIONSHIP:
                this.parseRelationshipLine(line, state, lineIndex);
                break;
            case _erdiagram_parser_statement_statement_type_guesser__WEBPACK_IMPORTED_MODULE_1__.StatementType.BLANK_LINE:
                // Ignore
                break;
            default:
                throw new _erdiagram_parser_types_error_ERDiagramSyntaxError__WEBPACK_IMPORTED_MODULE_3__["default"](`Unknown statement type`);
        }
    }
    parseEntityNameLine(line, state, lineIndex) {
        const entityDescriptor = {
            name: (0,_erdiagram_parser_statement_statement_types_parse_functions__WEBPACK_IMPORTED_MODULE_0__.parseEntityNameStatement)(line),
            properties: []
        };
        state.entities.push(entityDescriptor);
        state.entityBeingParsed = entityDescriptor;
        state.statementResultToLineMap.set(entityDescriptor, lineIndex);
    }
    parseEntityPropertyLine(state, line, lineIndex) {
        if (state.entityBeingParsed == null) {
            throw new _erdiagram_parser_types_error_ERDiagramSyntaxError__WEBPACK_IMPORTED_MODULE_3__["default"]('Unexpected entity property statement');
        }
        const entityPropertyDescriptor = (0,_erdiagram_parser_statement_statement_types_parse_functions__WEBPACK_IMPORTED_MODULE_0__.parseEntityPropertyStatement)(line);
        state.entityBeingParsed.properties.push(entityPropertyDescriptor);
        state.statementResultToLineMap.set(entityPropertyDescriptor, lineIndex);
    }
    parseRelationshipLine(line, state, lineIndex) {
        const relationshipDescriptor = (0,_erdiagram_parser_statement_statement_types_parse_functions__WEBPACK_IMPORTED_MODULE_0__.parseRelationshipStatement)(line);
        state.relationships.push(relationshipDescriptor);
        state.entityBeingParsed = null;
        state.statementResultToLineMap.set(relationshipDescriptor, lineIndex);
    }
}


/***/ }),

/***/ "./src/main/erdiagram/parser/line/EntityRelationshipModelLineParserErrorHandler.ts":
/*!*****************************************************************************************!*\
  !*** ./src/main/erdiagram/parser/line/EntityRelationshipModelLineParserErrorHandler.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EntityRelationshipModelLineParserErrorHandler)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_error_ERDiagramError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/error/ERDiagramError */ "./src/main/erdiagram/parser/types/error/ERDiagramError.ts");
/* harmony import */ var _erdiagram_parser_types_error_ERDiagramParseLineError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/parser/types/error/ERDiagramParseLineError */ "./src/main/erdiagram/parser/types/error/ERDiagramParseLineError.ts");


class EntityRelationshipModelLineParserErrorHandler {
    handleLineError(error, lineIndex) {
        /* istanbul ignore else */
        if (error instanceof _erdiagram_parser_types_error_ERDiagramError__WEBPACK_IMPORTED_MODULE_0__["default"]) {
            throw new _erdiagram_parser_types_error_ERDiagramParseLineError__WEBPACK_IMPORTED_MODULE_1__["default"](error, lineIndex);
        }
        /* istanbul ignore next */
        throw error;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/parser/statement/statement-type-guesser.ts":
/*!***********************************************************************!*\
  !*** ./src/main/erdiagram/parser/statement/statement-type-guesser.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StatementType: () => (/* binding */ StatementType),
/* harmony export */   guessStatementType: () => (/* binding */ guessStatementType)
/* harmony export */ });
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
    if (_erdiagram_parser_statement_statement_types_regexes__WEBPACK_IMPORTED_MODULE_0__.ENTITY_NAME_LINE_REGEX.test(line)) {
        return StatementType.ENTITY_NAME;
    }
    else if (_erdiagram_parser_statement_statement_types_regexes__WEBPACK_IMPORTED_MODULE_0__.ENTITY_PROPERTY_LINE_REGEX.test(line)) {
        return StatementType.ENTITY_PROPERTY;
    }
    else if (_erdiagram_parser_statement_statement_types_regexes__WEBPACK_IMPORTED_MODULE_0__.RELATIONSHIP_LINE_REGEX.test(line)) {
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseEntityNameStatement: () => (/* binding */ parseEntityNameStatement),
/* harmony export */   parseEntityPropertyStatement: () => (/* binding */ parseEntityPropertyStatement),
/* harmony export */   parseRelationshipStatement: () => (/* binding */ parseRelationshipStatement)
/* harmony export */ });
/* harmony import */ var _erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/util/string-utils */ "./src/main/erdiagram/util/string-utils.ts");
/* harmony import */ var _erdiagram_parser_statement_statement_types_regexes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/parser/statement/statement-types-regexes */ "./src/main/erdiagram/parser/statement/statement-types-regexes.ts");
/* harmony import */ var _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/parser/types/entity-relationship-model-types */ "./src/main/erdiagram/parser/types/entity-relationship-model-types.ts");
/* harmony import */ var _erdiagram_parser_types_error_ERDiagramSyntaxError__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/parser/types/error/ERDiagramSyntaxError */ "./src/main/erdiagram/parser/types/error/ERDiagramSyntaxError.ts");
/* harmony import */ var _erdiagram_parser_types_error_ERDiagramUnknownTypeError__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/erdiagram/parser/types/error/ERDiagramUnknownTypeError */ "./src/main/erdiagram/parser/types/error/ERDiagramUnknownTypeError.ts");





function parseEntityNameStatement(line) {
    const result = _erdiagram_parser_statement_statement_types_regexes__WEBPACK_IMPORTED_MODULE_1__.ENTITY_NAME_LINE_REGEX.exec(line);
    if (result == null) {
        throw new _erdiagram_parser_types_error_ERDiagramSyntaxError__WEBPACK_IMPORTED_MODULE_3__["default"]('Syntax error');
    }
    const [, entityName] = result;
    return (0,_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_0__.capitalizeWord)(entityName);
}
function parseEntityPropertyStatement(line) {
    const result = _erdiagram_parser_statement_statement_types_regexes__WEBPACK_IMPORTED_MODULE_1__.ENTITY_PROPERTY_LINE_REGEX.exec(line);
    if (result == null) {
        throw new _erdiagram_parser_types_error_ERDiagramSyntaxError__WEBPACK_IMPORTED_MODULE_3__["default"]('Syntax error');
    }
    const [
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fullMatch, name, modifiers, type, length] = result;
    const mappedType = type.toLowerCase();
    if (!Object.values(_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__.EntityPropertyType).includes(mappedType)) {
        throw new _erdiagram_parser_types_error_ERDiagramUnknownTypeError__WEBPACK_IMPORTED_MODULE_4__["default"]('Unknown type: ' + type);
    }
    return {
        name: (0,_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_0__.uncapitalizeWord)(name),
        optional: modifiers.includes('?'),
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
    const result = _erdiagram_parser_statement_statement_types_regexes__WEBPACK_IMPORTED_MODULE_1__.RELATIONSHIP_LINE_REGEX.exec(line);
    if (result == null) {
        throw new _erdiagram_parser_types_error_ERDiagramSyntaxError__WEBPACK_IMPORTED_MODULE_3__["default"]('Syntax error');
    }
    const [
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fullMatch, leftEntity, leftEntityAlias = leftEntity, leftCardinalityCharacter, direction, rightCardinalityCharacter, rightEntity, rightEntityAlias = rightEntity, relationshipName] = result;
    return {
        relationshipName: relationshipName ? (0,_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_0__.capitalizeWord)(relationshipName) : undefined,
        direction: direction === '->' ? _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__.Direction.LEFT_TO_RIGHT : (direction === '<-' ? _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__.Direction.RIGHT_TO_LEFT : _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__.Direction.BIDIRECTIONAL),
        leftMember: {
            entity: (0,_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_0__.capitalizeWord)(leftEntity),
            entityAlias: (0,_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_0__.uncapitalizeWord)(leftEntityAlias),
            cardinality: parseRelationshipMemberCardinality(leftCardinalityCharacter)
        },
        rightMember: {
            entity: (0,_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_0__.capitalizeWord)(rightEntity),
            entityAlias: (0,_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_0__.uncapitalizeWord)(rightEntityAlias),
            cardinality: parseRelationshipMemberCardinality(rightCardinalityCharacter)
        }
    };
}
function parseRelationshipMemberCardinality(leftCardinalityCharacter) {
    switch (leftCardinalityCharacter) {
        case '*':
            return _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__.Cardinality.MANY;
        case '?':
            return _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__.Cardinality.ZERO_OR_ONE;
        default:
            return _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__.Cardinality.ONE;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/parser/statement/statement-types-regexes.ts":
/*!************************************************************************!*\
  !*** ./src/main/erdiagram/parser/statement/statement-types-regexes.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ENTITY_NAME_LINE_REGEX: () => (/* binding */ ENTITY_NAME_LINE_REGEX),
/* harmony export */   ENTITY_PROPERTY_LINE_REGEX: () => (/* binding */ ENTITY_PROPERTY_LINE_REGEX),
/* harmony export */   RELATIONSHIP_LINE_REGEX: () => (/* binding */ RELATIONSHIP_LINE_REGEX)
/* harmony export */ });
/* harmony import */ var _erdiagram_util_regex_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/util/regex-utils */ "./src/main/erdiagram/util/regex-utils.ts");

const IDENTITY_REGEX = /[a-zA-Z_][a-zA-Z_0-9]*/;
const OPTIONAL_TRAILING_SPACES_AND_COMMENT = /\s*(#.*)?$/;
// Entity name
const ENTITY_NAME_LINE_REGEX = new RegExp(`^(${IDENTITY_REGEX.source})${OPTIONAL_TRAILING_SPACES_AND_COMMENT.source}`);
// Entity property
const PROPERTY_NAME_REGEX = new RegExp(`(${IDENTITY_REGEX.source})`);
const PROPERTY_MODIFIERS_REGEX = new RegExp(`([?!]*)`);
const PROPERTY_TYPE_NAME_REGEX = new RegExp(`(${IDENTITY_REGEX.source})`);
const PROPERTY_TYPE_LENGTH_REGEX = new RegExp(`(?:\\((\\s*\\d+\\s*(?:,\\s*\\d+\\s*)*)\\))?`);
const ENTITY_PROPERTY_REGEX = (0,_erdiagram_util_regex_utils__WEBPACK_IMPORTED_MODULE_0__.joinRegExps)(PROPERTY_NAME_REGEX, PROPERTY_MODIFIERS_REGEX, /\s+/, PROPERTY_TYPE_NAME_REGEX, PROPERTY_TYPE_LENGTH_REGEX);
const ENTITY_PROPERTY_LINE_REGEX = new RegExp(`^\\s+${ENTITY_PROPERTY_REGEX.source}${OPTIONAL_TRAILING_SPACES_AND_COMMENT.source}`);
// Relationship
const RELATIONSHIP_DIRECTION_REGEX = /(<-|->|<->)/;
const RELATIONSHIP_CARDINALITY_REGEX = /([?1*])?/;
const DIRECTION_AND_CARDINALITY_REGEX = (0,_erdiagram_util_regex_utils__WEBPACK_IMPORTED_MODULE_0__.joinRegExps)(RELATIONSHIP_CARDINALITY_REGEX, RELATIONSHIP_DIRECTION_REGEX, RELATIONSHIP_CARDINALITY_REGEX);
const ENTITY_AND_ALIAS_REGEX = new RegExp(`(${IDENTITY_REGEX.source})(?:\\s+(${IDENTITY_REGEX.source}))?`);
const RELATIONSHIP_LINE_REGEX = new RegExp(`^${ENTITY_AND_ALIAS_REGEX.source}\\s*?${DIRECTION_AND_CARDINALITY_REGEX.source}\\s*?${ENTITY_AND_ALIAS_REGEX.source}(?:\\s+\\(\\s*(${IDENTITY_REGEX.source})\\s*\\))?${OPTIONAL_TRAILING_SPACES_AND_COMMENT.source}`);


/***/ }),

/***/ "./src/main/erdiagram/parser/types/entity-relationship-model-types.ts":
/*!****************************************************************************!*\
  !*** ./src/main/erdiagram/parser/types/entity-relationship-model-types.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Cardinality: () => (/* binding */ Cardinality),
/* harmony export */   Direction: () => (/* binding */ Direction),
/* harmony export */   EntityPropertyType: () => (/* binding */ EntityPropertyType)
/* harmony export */ });
var EntityPropertyType;
(function (EntityPropertyType) {
    EntityPropertyType["IDENTITY"] = "identity";
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

/***/ "./src/main/erdiagram/parser/types/error/ERDiagramDuplicatedEntityNameError.ts":
/*!*************************************************************************************!*\
  !*** ./src/main/erdiagram/parser/types/error/ERDiagramDuplicatedEntityNameError.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ERDiagramDuplicatedEntityNameError)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_error_ERDiagramEntityError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/error/ERDiagramEntityError */ "./src/main/erdiagram/parser/types/error/ERDiagramEntityError.ts");

class ERDiagramDuplicatedEntityNameError extends _erdiagram_parser_types_error_ERDiagramEntityError__WEBPACK_IMPORTED_MODULE_0__["default"] {
}


/***/ }),

/***/ "./src/main/erdiagram/parser/types/error/ERDiagramDuplicatedPropertyNameError.ts":
/*!***************************************************************************************!*\
  !*** ./src/main/erdiagram/parser/types/error/ERDiagramDuplicatedPropertyNameError.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ERDiagramDuplicatedPropertyNameError)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_error_ERDiagramEntityPropertyError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/error/ERDiagramEntityPropertyError */ "./src/main/erdiagram/parser/types/error/ERDiagramEntityPropertyError.ts");

class ERDiagramDuplicatedPropertyNameError extends _erdiagram_parser_types_error_ERDiagramEntityPropertyError__WEBPACK_IMPORTED_MODULE_0__["default"] {
}


/***/ }),

/***/ "./src/main/erdiagram/parser/types/error/ERDiagramEntityError.ts":
/*!***********************************************************************!*\
  !*** ./src/main/erdiagram/parser/types/error/ERDiagramEntityError.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ERDiagramEntityError)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_error_ERDiagramError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/error/ERDiagramError */ "./src/main/erdiagram/parser/types/error/ERDiagramError.ts");

class ERDiagramEntityError extends _erdiagram_parser_types_error_ERDiagramError__WEBPACK_IMPORTED_MODULE_0__["default"] {
    entity;
    constructor(message, entity) {
        super(message);
        this.entity = entity;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/parser/types/error/ERDiagramEntityPropertyError.ts":
/*!*******************************************************************************!*\
  !*** ./src/main/erdiagram/parser/types/error/ERDiagramEntityPropertyError.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ERDiagramEntityPropertyError)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_error_ERDiagramEntityError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/error/ERDiagramEntityError */ "./src/main/erdiagram/parser/types/error/ERDiagramEntityError.ts");

class ERDiagramEntityPropertyError extends _erdiagram_parser_types_error_ERDiagramEntityError__WEBPACK_IMPORTED_MODULE_0__["default"] {
    property;
    constructor(message, entity, property) {
        super(message, entity);
        this.property = property;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/parser/types/error/ERDiagramError.ts":
/*!*****************************************************************!*\
  !*** ./src/main/erdiagram/parser/types/error/ERDiagramError.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ERDiagramError)
/* harmony export */ });
class ERDiagramError extends Error {
}


/***/ }),

/***/ "./src/main/erdiagram/parser/types/error/ERDiagramInvalidIdentityDefinitionError.ts":
/*!******************************************************************************************!*\
  !*** ./src/main/erdiagram/parser/types/error/ERDiagramInvalidIdentityDefinitionError.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ERDiagramInvalidIdentityDefinitionError)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_error_ERDiagramEntityPropertyError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/error/ERDiagramEntityPropertyError */ "./src/main/erdiagram/parser/types/error/ERDiagramEntityPropertyError.ts");

class ERDiagramInvalidIdentityDefinitionError extends _erdiagram_parser_types_error_ERDiagramEntityPropertyError__WEBPACK_IMPORTED_MODULE_0__["default"] {
}


/***/ }),

/***/ "./src/main/erdiagram/parser/types/error/ERDiagramMultipleIdentitiesError.ts":
/*!***********************************************************************************!*\
  !*** ./src/main/erdiagram/parser/types/error/ERDiagramMultipleIdentitiesError.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ERDiagramMultipleIdentitiesError)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_error_ERDiagramEntityPropertyError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/error/ERDiagramEntityPropertyError */ "./src/main/erdiagram/parser/types/error/ERDiagramEntityPropertyError.ts");

class ERDiagramMultipleIdentitiesError extends _erdiagram_parser_types_error_ERDiagramEntityPropertyError__WEBPACK_IMPORTED_MODULE_0__["default"] {
    identityProperties;
    constructor(message, entity, identityProperties) {
        const firstDuplicateApparition = identityProperties[1];
        super(message, entity, firstDuplicateApparition);
        this.identityProperties = identityProperties;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/parser/types/error/ERDiagramParseLineError.ts":
/*!**************************************************************************!*\
  !*** ./src/main/erdiagram/parser/types/error/ERDiagramParseLineError.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ERDiagramParseLineError)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_error_ERDiagramError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/error/ERDiagramError */ "./src/main/erdiagram/parser/types/error/ERDiagramError.ts");

class ERDiagramParseLineError extends _erdiagram_parser_types_error_ERDiagramError__WEBPACK_IMPORTED_MODULE_0__["default"] {
    cause;
    lineIndex;
    constructor(cause, lineIndex) {
        super(cause.message);
        this.cause = cause;
        this.lineIndex = lineIndex;
    }
    get lineNumber() {
        return this.lineIndex + 1;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/parser/types/error/ERDiagramRelationshipError.ts":
/*!*****************************************************************************!*\
  !*** ./src/main/erdiagram/parser/types/error/ERDiagramRelationshipError.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ERDiagramRelationshipError)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_error_ERDiagramError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/error/ERDiagramError */ "./src/main/erdiagram/parser/types/error/ERDiagramError.ts");

class ERDiagramRelationshipError extends _erdiagram_parser_types_error_ERDiagramError__WEBPACK_IMPORTED_MODULE_0__["default"] {
    relationship;
    constructor(message, relationship) {
        super(message);
        this.relationship = relationship;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/parser/types/error/ERDiagramSyntaxError.ts":
/*!***********************************************************************!*\
  !*** ./src/main/erdiagram/parser/types/error/ERDiagramSyntaxError.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ERDiagramSyntaxError)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_error_ERDiagramError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/error/ERDiagramError */ "./src/main/erdiagram/parser/types/error/ERDiagramError.ts");

class ERDiagramSyntaxError extends _erdiagram_parser_types_error_ERDiagramError__WEBPACK_IMPORTED_MODULE_0__["default"] {
}


/***/ }),

/***/ "./src/main/erdiagram/parser/types/error/ERDiagramUnknownEntityError.ts":
/*!******************************************************************************!*\
  !*** ./src/main/erdiagram/parser/types/error/ERDiagramUnknownEntityError.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ERDiagramUnknownEntityError)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_error_ERDiagramRelationshipError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/error/ERDiagramRelationshipError */ "./src/main/erdiagram/parser/types/error/ERDiagramRelationshipError.ts");

class ERDiagramUnknownEntityError extends _erdiagram_parser_types_error_ERDiagramRelationshipError__WEBPACK_IMPORTED_MODULE_0__["default"] {
    member;
    constructor(message, relationship, member) {
        super(message, relationship);
        this.member = member;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/parser/types/error/ERDiagramUnknownTypeError.ts":
/*!****************************************************************************!*\
  !*** ./src/main/erdiagram/parser/types/error/ERDiagramUnknownTypeError.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ERDiagramUnknownTypeError)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_error_ERDiagramError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/error/ERDiagramError */ "./src/main/erdiagram/parser/types/error/ERDiagramError.ts");

class ERDiagramUnknownTypeError extends _erdiagram_parser_types_error_ERDiagramError__WEBPACK_IMPORTED_MODULE_0__["default"] {
}


/***/ }),

/***/ "./src/main/erdiagram/parser/types/error/exports.ts":
/*!**********************************************************!*\
  !*** ./src/main/erdiagram/parser/types/error/exports.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ERDiagramDuplicatedEntityNameError: () => (/* reexport safe */ _ERDiagramDuplicatedEntityNameError__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   ERDiagramDuplicatedPropertyNameError: () => (/* reexport safe */ _ERDiagramDuplicatedPropertyNameError__WEBPACK_IMPORTED_MODULE_11__["default"]),
/* harmony export */   ERDiagramEntityError: () => (/* reexport safe */ _ERDiagramEntityError__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   ERDiagramEntityPropertyError: () => (/* reexport safe */ _ERDiagramEntityPropertyError__WEBPACK_IMPORTED_MODULE_8__["default"]),
/* harmony export */   ERDiagramError: () => (/* reexport safe */ _ERDiagramError__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   ERDiagramInvalidIdentityDefinitionError: () => (/* reexport safe */ _ERDiagramInvalidIdentityDefinitionError__WEBPACK_IMPORTED_MODULE_10__["default"]),
/* harmony export */   ERDiagramMultipleIdentitiesError: () => (/* reexport safe */ _ERDiagramMultipleIdentitiesError__WEBPACK_IMPORTED_MODULE_9__["default"]),
/* harmony export */   ERDiagramParseLineError: () => (/* reexport safe */ _ERDiagramParseLineError__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   ERDiagramRelationshipError: () => (/* reexport safe */ _ERDiagramRelationshipError__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   ERDiagramSyntaxError: () => (/* reexport safe */ _ERDiagramSyntaxError__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   ERDiagramUnknownEntityError: () => (/* reexport safe */ _ERDiagramUnknownEntityError__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   ERDiagramUnknownTypeError: () => (/* reexport safe */ _ERDiagramUnknownTypeError__WEBPACK_IMPORTED_MODULE_3__["default"])
/* harmony export */ });
/* harmony import */ var _ERDiagramError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ERDiagramError */ "./src/main/erdiagram/parser/types/error/ERDiagramError.ts");
/* harmony import */ var _ERDiagramParseLineError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ERDiagramParseLineError */ "./src/main/erdiagram/parser/types/error/ERDiagramParseLineError.ts");
/* harmony import */ var _ERDiagramSyntaxError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ERDiagramSyntaxError */ "./src/main/erdiagram/parser/types/error/ERDiagramSyntaxError.ts");
/* harmony import */ var _ERDiagramUnknownTypeError__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ERDiagramUnknownTypeError */ "./src/main/erdiagram/parser/types/error/ERDiagramUnknownTypeError.ts");
/* harmony import */ var _ERDiagramRelationshipError__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ERDiagramRelationshipError */ "./src/main/erdiagram/parser/types/error/ERDiagramRelationshipError.ts");
/* harmony import */ var _ERDiagramUnknownEntityError__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ERDiagramUnknownEntityError */ "./src/main/erdiagram/parser/types/error/ERDiagramUnknownEntityError.ts");
/* harmony import */ var _ERDiagramEntityError__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ERDiagramEntityError */ "./src/main/erdiagram/parser/types/error/ERDiagramEntityError.ts");
/* harmony import */ var _ERDiagramDuplicatedEntityNameError__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ERDiagramDuplicatedEntityNameError */ "./src/main/erdiagram/parser/types/error/ERDiagramDuplicatedEntityNameError.ts");
/* harmony import */ var _ERDiagramEntityPropertyError__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ERDiagramEntityPropertyError */ "./src/main/erdiagram/parser/types/error/ERDiagramEntityPropertyError.ts");
/* harmony import */ var _ERDiagramMultipleIdentitiesError__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ERDiagramMultipleIdentitiesError */ "./src/main/erdiagram/parser/types/error/ERDiagramMultipleIdentitiesError.ts");
/* harmony import */ var _ERDiagramInvalidIdentityDefinitionError__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ERDiagramInvalidIdentityDefinitionError */ "./src/main/erdiagram/parser/types/error/ERDiagramInvalidIdentityDefinitionError.ts");
/* harmony import */ var _ERDiagramDuplicatedPropertyNameError__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./ERDiagramDuplicatedPropertyNameError */ "./src/main/erdiagram/parser/types/error/ERDiagramDuplicatedPropertyNameError.ts");















/***/ }),

/***/ "./src/main/erdiagram/parser/types/exports.ts":
/*!****************************************************!*\
  !*** ./src/main/erdiagram/parser/types/exports.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Cardinality: () => (/* reexport safe */ _entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.Cardinality),
/* harmony export */   Direction: () => (/* reexport safe */ _entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.Direction),
/* harmony export */   ERDiagramDuplicatedEntityNameError: () => (/* reexport safe */ _error_exports__WEBPACK_IMPORTED_MODULE_1__.ERDiagramDuplicatedEntityNameError),
/* harmony export */   ERDiagramDuplicatedPropertyNameError: () => (/* reexport safe */ _error_exports__WEBPACK_IMPORTED_MODULE_1__.ERDiagramDuplicatedPropertyNameError),
/* harmony export */   ERDiagramEntityError: () => (/* reexport safe */ _error_exports__WEBPACK_IMPORTED_MODULE_1__.ERDiagramEntityError),
/* harmony export */   ERDiagramEntityPropertyError: () => (/* reexport safe */ _error_exports__WEBPACK_IMPORTED_MODULE_1__.ERDiagramEntityPropertyError),
/* harmony export */   ERDiagramError: () => (/* reexport safe */ _error_exports__WEBPACK_IMPORTED_MODULE_1__.ERDiagramError),
/* harmony export */   ERDiagramInvalidIdentityDefinitionError: () => (/* reexport safe */ _error_exports__WEBPACK_IMPORTED_MODULE_1__.ERDiagramInvalidIdentityDefinitionError),
/* harmony export */   ERDiagramMultipleIdentitiesError: () => (/* reexport safe */ _error_exports__WEBPACK_IMPORTED_MODULE_1__.ERDiagramMultipleIdentitiesError),
/* harmony export */   ERDiagramParseLineError: () => (/* reexport safe */ _error_exports__WEBPACK_IMPORTED_MODULE_1__.ERDiagramParseLineError),
/* harmony export */   ERDiagramRelationshipError: () => (/* reexport safe */ _error_exports__WEBPACK_IMPORTED_MODULE_1__.ERDiagramRelationshipError),
/* harmony export */   ERDiagramSyntaxError: () => (/* reexport safe */ _error_exports__WEBPACK_IMPORTED_MODULE_1__.ERDiagramSyntaxError),
/* harmony export */   ERDiagramUnknownEntityError: () => (/* reexport safe */ _error_exports__WEBPACK_IMPORTED_MODULE_1__.ERDiagramUnknownEntityError),
/* harmony export */   ERDiagramUnknownTypeError: () => (/* reexport safe */ _error_exports__WEBPACK_IMPORTED_MODULE_1__.ERDiagramUnknownTypeError),
/* harmony export */   EntityPropertyType: () => (/* reexport safe */ _entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType)
/* harmony export */ });
/* harmony import */ var _entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entity-relationship-model-types */ "./src/main/erdiagram/parser/types/entity-relationship-model-types.ts");
/* harmony import */ var _error_exports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./error/exports */ "./src/main/erdiagram/parser/types/error/exports.ts");




/***/ }),

/***/ "./src/main/erdiagram/parser/validator/EntityRelationshipModelParseResultValidator.ts":
/*!********************************************************************************************!*\
  !*** ./src/main/erdiagram/parser/validator/EntityRelationshipModelParseResultValidator.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EntityRelationshipModelParseResultValidator)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/entity-relationship-model-types */ "./src/main/erdiagram/parser/types/entity-relationship-model-types.ts");
/* harmony import */ var _erdiagram_parser_validator_EntityRelationshipModelParseResultValidatorErrorHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/parser/validator/EntityRelationshipModelParseResultValidatorErrorHandler */ "./src/main/erdiagram/parser/validator/EntityRelationshipModelParseResultValidatorErrorHandler.ts");
/* harmony import */ var _erdiagram_parser_types_error_ERDiagramUnknownEntityError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/parser/types/error/ERDiagramUnknownEntityError */ "./src/main/erdiagram/parser/types/error/ERDiagramUnknownEntityError.ts");
/* harmony import */ var _erdiagram_parser_types_error_ERDiagramDuplicatedEntityNameError__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/parser/types/error/ERDiagramDuplicatedEntityNameError */ "./src/main/erdiagram/parser/types/error/ERDiagramDuplicatedEntityNameError.ts");
/* harmony import */ var _erdiagram_parser_types_error_ERDiagramMultipleIdentitiesError__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/erdiagram/parser/types/error/ERDiagramMultipleIdentitiesError */ "./src/main/erdiagram/parser/types/error/ERDiagramMultipleIdentitiesError.ts");
/* harmony import */ var _erdiagram_parser_types_error_ERDiagramInvalidIdentityDefinitionError__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/erdiagram/parser/types/error/ERDiagramInvalidIdentityDefinitionError */ "./src/main/erdiagram/parser/types/error/ERDiagramInvalidIdentityDefinitionError.ts");
/* harmony import */ var _erdiagram_parser_types_error_ERDiagramDuplicatedPropertyNameError__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/erdiagram/parser/types/error/ERDiagramDuplicatedPropertyNameError */ "./src/main/erdiagram/parser/types/error/ERDiagramDuplicatedPropertyNameError.ts");







class EntityRelationshipModelParseResultValidator {
    allowUnknownEntities;
    errorHandler;
    constructor(allowUnknownEntities) {
        this.allowUnknownEntities = allowUnknownEntities;
        this.errorHandler = new _erdiagram_parser_validator_EntityRelationshipModelParseResultValidatorErrorHandler__WEBPACK_IMPORTED_MODULE_1__["default"]();
    }
    validateParseResult(parseResult) {
        const { model, statementResultToLineMap } = parseResult;
        try {
            this.validateParsedModel(model);
        }
        catch (error) {
            this.errorHandler.handleValidationError(error, statementResultToLineMap);
        }
    }
    validateParsedModel(model) {
        this.validateNonRepeatedEntityNames(model);
        this.validateNonRepeatedPropertyNames(model);
        this.validateIdentityProperties(model);
        if (!this.allowUnknownEntities) {
            this.validateRelationshipsHaveNoUnknownEntities(model);
        }
    }
    validateNonRepeatedEntityNames(model) {
        const entityNames = new Set();
        model.entities.forEach(entity => {
            const entityName = entity.name;
            if (entityNames.has(entityName)) {
                throw new _erdiagram_parser_types_error_ERDiagramDuplicatedEntityNameError__WEBPACK_IMPORTED_MODULE_3__["default"](`Repeated entity "${entityName}"`, entity);
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
                    throw new _erdiagram_parser_types_error_ERDiagramDuplicatedPropertyNameError__WEBPACK_IMPORTED_MODULE_6__["default"](`Repeated property "${propertyName}" in "${entity.name}" entity`, entity, property);
                }
                entityPropertyNames.add(propertyName);
            });
        });
    }
    validateIdentityProperties(model) {
        model.entities.forEach(entity => {
            const identityProperties = entity.properties.filter(property => property.type === _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.IDENTITY);
            if (identityProperties.length > 1) {
                throw new _erdiagram_parser_types_error_ERDiagramMultipleIdentitiesError__WEBPACK_IMPORTED_MODULE_4__["default"](`Entity ${entity.name} has more than one identity property`, entity, identityProperties);
            }
            const identityProperty = identityProperties[0];
            if (identityProperty != null) {
                if (identityProperty.optional) {
                    throw new _erdiagram_parser_types_error_ERDiagramInvalidIdentityDefinitionError__WEBPACK_IMPORTED_MODULE_5__["default"]('Optional modifier (?) cannot be used in identity properties', entity, identityProperty);
                }
                if (identityProperty.unique) {
                    throw new _erdiagram_parser_types_error_ERDiagramInvalidIdentityDefinitionError__WEBPACK_IMPORTED_MODULE_5__["default"]('Unique modifier (!) cannot be used in identity properties', entity, identityProperty);
                }
                if (identityProperty.length.length > 0) {
                    throw new _erdiagram_parser_types_error_ERDiagramInvalidIdentityDefinitionError__WEBPACK_IMPORTED_MODULE_5__["default"]('Identity properties cannot have a length', entity, identityProperty);
                }
            }
        });
    }
    validateRelationshipsHaveNoUnknownEntities(model) {
        const entityNames = model.entities.map(e => e.name);
        model.relationships.forEach(relationship => {
            if (!entityNames.includes(relationship.leftMember.entity)) {
                throw new _erdiagram_parser_types_error_ERDiagramUnknownEntityError__WEBPACK_IMPORTED_MODULE_2__["default"](`Uknown entity "${relationship.leftMember.entity}" in relationship's left member`, relationship, relationship.leftMember);
            }
            if (!entityNames.includes(relationship.rightMember.entity)) {
                throw new _erdiagram_parser_types_error_ERDiagramUnknownEntityError__WEBPACK_IMPORTED_MODULE_2__["default"](`Uknown entity "${relationship.rightMember.entity}" in relationship's right member`, relationship, relationship.rightMember);
            }
        });
    }
}


/***/ }),

/***/ "./src/main/erdiagram/parser/validator/EntityRelationshipModelParseResultValidatorErrorHandler.ts":
/*!********************************************************************************************************!*\
  !*** ./src/main/erdiagram/parser/validator/EntityRelationshipModelParseResultValidatorErrorHandler.ts ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EntityRelationshipModelParseResultValidatorErrorHandler)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_error_ERDiagramParseLineError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/error/ERDiagramParseLineError */ "./src/main/erdiagram/parser/types/error/ERDiagramParseLineError.ts");
/* harmony import */ var _erdiagram_parser_types_error_ERDiagramRelationshipError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/parser/types/error/ERDiagramRelationshipError */ "./src/main/erdiagram/parser/types/error/ERDiagramRelationshipError.ts");
/* harmony import */ var _erdiagram_parser_types_error_ERDiagramEntityError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/parser/types/error/ERDiagramEntityError */ "./src/main/erdiagram/parser/types/error/ERDiagramEntityError.ts");
/* harmony import */ var _erdiagram_parser_types_error_ERDiagramEntityPropertyError__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/parser/types/error/ERDiagramEntityPropertyError */ "./src/main/erdiagram/parser/types/error/ERDiagramEntityPropertyError.ts");




class EntityRelationshipModelParseResultValidatorErrorHandler {
    handleValidationError(error, statementResultToLineMap) {
        if (error instanceof _erdiagram_parser_types_error_ERDiagramEntityPropertyError__WEBPACK_IMPORTED_MODULE_3__["default"]) {
            throw new _erdiagram_parser_types_error_ERDiagramParseLineError__WEBPACK_IMPORTED_MODULE_0__["default"](error, statementResultToLineMap.get(error.property));
        }
        if (error instanceof _erdiagram_parser_types_error_ERDiagramEntityError__WEBPACK_IMPORTED_MODULE_2__["default"]) {
            throw new _erdiagram_parser_types_error_ERDiagramParseLineError__WEBPACK_IMPORTED_MODULE_0__["default"](error, statementResultToLineMap.get(error.entity));
        }
        /* istanbul ignore else */
        if (error instanceof _erdiagram_parser_types_error_ERDiagramRelationshipError__WEBPACK_IMPORTED_MODULE_1__["default"]) {
            throw new _erdiagram_parser_types_error_ERDiagramParseLineError__WEBPACK_IMPORTED_MODULE_0__["default"](error, statementResultToLineMap.get(error.relationship));
        }
        /* istanbul ignore next */
        throw error;
    }
}


/***/ }),

/***/ "./src/main/erdiagram/util/array-utils.ts":
/*!************************************************!*\
  !*** ./src/main/erdiagram/util/array-utils.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   removeDuplicates: () => (/* binding */ removeDuplicates),
/* harmony export */   removeNullableValues: () => (/* binding */ removeNullableValues)
/* harmony export */ });
function removeDuplicates(array) {
    return [...new Set(array)];
}
function removeNullableValues(array) {
    return array.filter(e => e != null);
}


/***/ }),

/***/ "./src/main/erdiagram/util/indent-utils.ts":
/*!*************************************************!*\
  !*** ./src/main/erdiagram/util/indent-utils.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   indentLine: () => (/* binding */ indentLine),
/* harmony export */   indentLines: () => (/* binding */ indentLines)
/* harmony export */ });
const DEFAULT_INDENT = '    ';
function indentLines(lines, indent) {
    const indentText = generateIndentText(indent);
    return lines.map(line => indentLineUsingIndentText(line, indentText));
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   classifyBy: () => (/* binding */ classifyBy)
/* harmony export */ });
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

/***/ "./src/main/erdiagram/util/regex-utils.ts":
/*!************************************************!*\
  !*** ./src/main/erdiagram/util/regex-utils.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   escapeRegExpSpecialChars: () => (/* binding */ escapeRegExpSpecialChars),
/* harmony export */   joinRegExps: () => (/* binding */ joinRegExps)
/* harmony export */ });
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   capitalizeWord: () => (/* binding */ capitalizeWord),
/* harmony export */   removeNonEmptyStrings: () => (/* binding */ removeNonEmptyStrings),
/* harmony export */   uncapitalizeWord: () => (/* binding */ uncapitalizeWord)
/* harmony export */ });
function capitalizeWord(text) {
    return text[0].toUpperCase() + text.substring(1);
}
function uncapitalizeWord(text) {
    return text[0].toLowerCase() + text.substring(1);
}
function removeNonEmptyStrings(strings) {
    return strings.filter(chunk => chunk.length > 0);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**************************************!*\
  !*** ./src/main/standalone-entry.js ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./erdiagram/exports */ "./src/main/erdiagram/exports.ts");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__);

})();

ERDiagram = __webpack_exports__["default"];
/******/ })()
;
//# sourceMappingURL=erdiagram.js.map