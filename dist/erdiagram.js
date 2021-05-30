/*!
 * Entity-Relationship Diagram Code Generator v1.0.0-rc2
 * https://github.com/nestorrente/erdiagram
 *
 * Released under the MIT License.
 *
 * Build date: 2021-05-30T10:00:48.523Z
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
 * v1.0.0-alpha.4
 *
 * https://github.com/nestorrente/true-json
 *
 * Released under the MIT License.
 *
 * Build date: 2021-05-22T18:22:58.182Z
 */
!function(o,e){ true?module.exports=e():0}("undefined"!=typeof self?self:this,(function(){return(()=>{"use strict";var o={d:(e,r)=>{for(var n in r)o.o(r,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:r[n]})},o:(o,e)=>Object.prototype.hasOwnProperty.call(o,e),r:o=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(o,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(o,"__esModule",{value:!0})}},e={};o.r(e),o.d(e,{JsonAdapters:()=>p,JsonConverter:()=>a});var r,n,t=function(o,e,r){if(!e.has(o))throw new TypeError("attempted to set private field on non-instance");return e.set(o,r),r},s=function(o,e){if(!e.has(o))throw new TypeError("attempted to get private field on non-instance");return e.get(o)};class a{constructor(o,e=JSON){r.set(this,void 0),n.set(this,void 0),t(this,r,e),t(this,n,o)}stringify(o,e){return s(this,r).stringify(s(this,n).adaptToJson(o),void 0,e)}parse(o){return s(this,n).recoverFromJson(s(this,r).parse(o))}}function i(){return{adaptToJson:o=>o,recoverFromJson:o=>o}}function c(o){return{adaptToJson:e=>e.map((e=>o.adaptToJson(e))),recoverFromJson:e=>e.map((e=>o.recoverFromJson(e)))}}function u(o){var e,r;const n=null!==(e=null==o?void 0:o.keyAdapter)&&void 0!==e?e:{adaptToJson:o=>o,recoverFromJson:o=>o},t=null!==(r=null==o?void 0:o.valueAdapter)&&void 0!==r?r:{adaptToJson:o=>o,recoverFromJson:o=>o},s=c({adaptToJson(o){const[e,r]=o;return[n.adaptToJson(e),t.adaptToJson(r)]},recoverFromJson(o){const[e,r]=o;return[n.recoverFromJson(e),t.recoverFromJson(r)]}});return{adaptToJson:o=>s.adaptToJson([...o]),recoverFromJson:o=>new Map(s.recoverFromJson(o))}}function d(o,e,r){const{omitUnmappedProperties:n,omittedProperties:t}=r,s=Object.entries(o);return n||0!==t.length?s.filter((([o])=>!function(o,e,r){return function(o,e){const{omittedProperties:r}=e;return r.includes(o)}(o,r)||r.omitUnmappedProperties&&function(o,e){return!e.hasOwnProperty(o)}(o,e)}(o,e,r))):s}r=new WeakMap,n=new WeakMap;const p={identity:i,isoDate:function(){return{adaptToJson:o=>o.toJSON(),recoverFromJson:o=>new Date(o)}},dateTimestamp:function(){return{adaptToJson:o=>o.getTime(),recoverFromJson:o=>new Date(o)}},array:c,set:function(o={adaptToJson:o=>o,recoverFromJson:o=>o}){const e=c(o);return{adaptToJson:o=>e.adaptToJson([...o]),recoverFromJson:o=>new Set(e.recoverFromJson(o))}},record:function(o){return{adaptToJson(e){const r=Object.entries(e).map((([e,r])=>[e,o.adaptToJson(r)]));return Object.fromEntries(r)},recoverFromJson(e){const r=Object.entries(e).map((([e,r])=>[e,o.recoverFromJson(r)]));return Object.fromEntries(r)}}},mapAsEntries:u,mapAsRecord:function(o){const e=u(o);return{adaptToJson(o){const r=e.adaptToJson(o);return Object.fromEntries(r)},recoverFromJson(o){const r=Object.entries(o);return e.recoverFromJson(r)}}},object:function(o,e){const r=(n=e,Object.assign({omitUnmappedProperties:!1,omittedProperties:[]},n));var n;return{adaptToJson(e){const n=d(e,o,r).map((([e,r])=>{const n=o[e];return[e,n?n.adaptToJson(r):r]}));return Object.fromEntries(n)},recoverFromJson(e){const n=d(e,o,r).map((([e,r])=>{const n=o[e];return[e,n?n.recoverFromJson(r):r]}));return Object.fromEntries(n)}}},byKey:function(o){return{adaptToJson(e){const r=Object.entries(o).find((([,o])=>e===o));if(!r)throw new Error("Provided value is not associated with any key");const[n]=r;return n},recoverFromJson(e){if(null==e||!o.hasOwnProperty(e))throw new Error("Provided key is not associated with any value");return o[e]}}},byKeyLenient:function(o,e){return{adaptToJson(r){const n=Object.entries(o).find((([,o])=>r===o));if(!n)return e;const[t]=n;return t},recoverFromJson:r=>null!=r&&o.hasOwnProperty(r)?o[r]:null!=e?o[e]:void 0}},custom:function(o){return o},nullAware:function(o){return{adaptToJson:e=>null===e?null:o.adaptToJson(e),recoverFromJson:e=>null===e?null:o.recoverFromJson(e)}},undefinedAware:function(o){return{adaptToJson:e=>void 0===e?void 0:o.adaptToJson(e),recoverFromJson:e=>void 0===e?void 0:o.recoverFromJson(e)}},nullishAware:function(o){return{adaptToJson:e=>null===e?null:void 0===e?void 0:o.adaptToJson(e),recoverFromJson:e=>null===e?null:void 0===e?void 0:o.recoverFromJson(e)}}};return e})()}));
//# sourceMappingURL=true-json.umd.js.map

/***/ }),

/***/ "./src/main/erdiagram/common/config/AbstractComponentConfigManager.ts":
/*!****************************************************************************!*\
  !*** ./src/main/erdiagram/common/config/AbstractComponentConfigManager.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AbstractComponentConfigManager)
/* harmony export */ });
/* harmony import */ var true_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! true-json */ "./node_modules/true-json/dist/true-json.umd.js");
/* harmony import */ var true_json__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(true_json__WEBPACK_IMPORTED_MODULE_0__);
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _jsonAdapter;

class AbstractComponentConfigManager {
    constructor() {
        _jsonAdapter.set(this, void 0);
        __classPrivateFieldSet(this, _jsonAdapter, this.getJsonAdapter());
    }
    mergeWithDefaultConfig(partialConfig) {
        return this.mergeConfigs(this.getDefaultConfig(), partialConfig);
    }
    convertToSerializableObject(fullConfig) {
        return __classPrivateFieldGet(this, _jsonAdapter).adaptToJson(fullConfig);
    }
    convertFromSerializableObject(serializableConfig) {
        return __classPrivateFieldGet(this, _jsonAdapter).recoverFromJson(serializableConfig);
    }
    getJsonAdapter() {
        return true_json__WEBPACK_IMPORTED_MODULE_0__.JsonAdapters.identity();
    }
}
_jsonAdapter = new WeakMap();


/***/ }),

/***/ "./src/main/erdiagram/common/config/exports.ts":
/*!*****************************************************!*\
  !*** ./src/main/erdiagram/common/config/exports.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractComponentConfigManager": () => (/* reexport safe */ _AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractComponentConfigManager */ "./src/main/erdiagram/common/config/AbstractComponentConfigManager.ts");




/***/ }),

/***/ "./src/main/erdiagram/common/exports.ts":
/*!**********************************************!*\
  !*** ./src/main/erdiagram/common/exports.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractComponentConfigManager": () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_0__.AbstractComponentConfigManager)
/* harmony export */ });
/* harmony import */ var _config_exports__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config/exports */ "./src/main/erdiagram/common/config/exports.ts");



/***/ }),

/***/ "./src/main/erdiagram/converter/MultipleFileEntityRelationshipModelSourceCodeGenerator.ts":
/*!************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/MultipleFileEntityRelationshipModelSourceCodeGenerator.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isMultipleFileEntityRelationshipModelSourceCodeGenerator": () => (/* binding */ isMultipleFileEntityRelationshipModelSourceCodeGenerator)
/* harmony export */ });
function isMultipleFileEntityRelationshipModelSourceCodeGenerator(generator) {
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


class CapitalizedUnderscoreCaseFormat extends _erdiagram_converter_common_case_format_AbstractUnderscoreCaseFormat__WEBPACK_IMPORTED_MODULE_0__.default {
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


class LowerCamelCaseFormat extends _erdiagram_converter_common_case_format_AbstractCamelCaseFormat__WEBPACK_IMPORTED_MODULE_0__.default {
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


class LowerUnderscoreCaseFormat extends _erdiagram_converter_common_case_format_AbstractUnderscoreCaseFormat__WEBPACK_IMPORTED_MODULE_0__.default {
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
    LOWER_CAMEL: new _erdiagram_converter_common_case_format_LowerCamelCaseFormat__WEBPACK_IMPORTED_MODULE_0__.default(),
    UPPER_CAMEL: new _erdiagram_converter_common_case_format_UpperCamelCaseFormat__WEBPACK_IMPORTED_MODULE_1__.default(),
    LOWER_UNDERSCORE: new _erdiagram_converter_common_case_format_LowerUnderscoreCaseFormat__WEBPACK_IMPORTED_MODULE_2__.default(),
    CAPITALIZED_UNDERSCORE: new _erdiagram_converter_common_case_format_CapitalizedUnderscoreCaseFormat__WEBPACK_IMPORTED_MODULE_3__.default(),
    UPPER_UNDERSCORE: new _erdiagram_converter_common_case_format_UpperUnderscoreCaseFormat__WEBPACK_IMPORTED_MODULE_4__.default(),
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


class UpperCamelCaseFormat extends _erdiagram_converter_common_case_format_AbstractCamelCaseFormat__WEBPACK_IMPORTED_MODULE_0__.default {
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


class UpperUnderscoreCaseFormat extends _erdiagram_converter_common_case_format_AbstractUnderscoreCaseFormat__WEBPACK_IMPORTED_MODULE_0__.default {
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
/* harmony export */   "StandardCaseFormats": () => (/* reexport safe */ _StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__.default),
/* harmony export */   "CaseConverter": () => (/* reexport safe */ _CaseConverter__WEBPACK_IMPORTED_MODULE_0__.default)
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
/* harmony export */   "CaseConverter": () => (/* reexport safe */ _case_format_exports__WEBPACK_IMPORTED_MODULE_0__.CaseConverter),
/* harmony export */   "StandardCaseFormats": () => (/* reexport safe */ _case_format_exports__WEBPACK_IMPORTED_MODULE_0__.StandardCaseFormats),
/* harmony export */   "StandardIdNamingStrategies": () => (/* reexport safe */ _id_naming_strategy_exports__WEBPACK_IMPORTED_MODULE_1__.StandardIdNamingStrategies)
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
/* harmony export */   "StandardIdNamingStrategies": () => (/* reexport safe */ _StandardIdNamingStrategies__WEBPACK_IMPORTED_MODULE_0__.default)
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
/* harmony export */   "DatabaseModelToSqlCodeConverter": () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.DatabaseModelToSqlCodeConverter),
/* harmony export */   "MysqlDialect": () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.MysqlDialect),
/* harmony export */   "MysqlDialectConfigManager": () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.MysqlDialectConfigManager),
/* harmony export */   "OracleDialect": () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.OracleDialect),
/* harmony export */   "OracleDialectConfigManager": () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.OracleDialectConfigManager),
/* harmony export */   "PostgresqlDialect": () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.PostgresqlDialect),
/* harmony export */   "PostgresqlDialectConfigManager": () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.PostgresqlDialectConfigManager),
/* harmony export */   "SqlEntityRelationshipModelSourceCodeGenerator": () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.SqlEntityRelationshipModelSourceCodeGenerator),
/* harmony export */   "SqlServerDialect": () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.SqlServerDialect),
/* harmony export */   "SqlServerDialectConfigManager": () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.SqlServerDialectConfigManager),
/* harmony export */   "SqliteDialect": () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.SqliteDialect),
/* harmony export */   "SqliteDialectConfigManager": () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.SqliteDialectConfigManager),
/* harmony export */   "mysqlDialectConfigManager": () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.mysqlDialectConfigManager),
/* harmony export */   "oracleDialectConfigManager": () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.oracleDialectConfigManager),
/* harmony export */   "postgresqlDialectConfigManager": () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.postgresqlDialectConfigManager),
/* harmony export */   "sqlServerDialectConfigManager": () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.sqlServerDialectConfigManager),
/* harmony export */   "sqliteDialectConfigManager": () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.sqliteDialectConfigManager),
/* harmony export */   "DatabaseModelGenerator": () => (/* reexport safe */ _model_exports__WEBPACK_IMPORTED_MODULE_1__.DatabaseModelGenerator),
/* harmony export */   "DatabaseModelGeneratorConfigManager": () => (/* reexport safe */ _model_exports__WEBPACK_IMPORTED_MODULE_1__.DatabaseModelGeneratorConfigManager),
/* harmony export */   "databaseModelGeneratorConfigManager": () => (/* reexport safe */ _model_exports__WEBPACK_IMPORTED_MODULE_1__.databaseModelGeneratorConfigManager)
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
/* harmony import */ var _erdiagram_converter_database_model_config_DatabaseModelGeneratorConfigManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/database/model/config/DatabaseModelGeneratorConfigManager */ "./src/main/erdiagram/converter/database/model/config/DatabaseModelGeneratorConfigManager.ts");
/* harmony import */ var _erdiagram_util_map_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/util/map-utils */ "./src/main/erdiagram/util/map-utils.ts");
/* harmony import */ var _erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/erdiagram/util/string-utils */ "./src/main/erdiagram/util/string-utils.ts");
/* harmony import */ var _erdiagram_converter_oop_model_source_metadata_source_metadata_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/erdiagram/converter/oop/model/source-metadata/source-metadata-types */ "./src/main/erdiagram/converter/oop/model/source-metadata/source-metadata-types.ts");






class DatabaseModelGenerator {
    constructor(config) {
        this.config = _erdiagram_converter_database_model_config_DatabaseModelGeneratorConfigManager__WEBPACK_IMPORTED_MODULE_2__.default.mergeWithDefaultConfig(config);
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

/***/ "./src/main/erdiagram/converter/database/model/config/DatabaseModelGeneratorConfigManager.ts":
/*!***************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/model/config/DatabaseModelGeneratorConfigManager.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DatabaseModelGeneratorConfigManager": () => (/* binding */ DatabaseModelGeneratorConfigManager),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/common/config/AbstractComponentConfigManager */ "./src/main/erdiagram/common/config/AbstractComponentConfigManager.ts");
/* harmony import */ var _erdiagram_converter_common_id_naming_strategy_StandardIdNamingStrategies__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/common/id-naming-strategy/StandardIdNamingStrategies */ "./src/main/erdiagram/converter/common/id-naming-strategy/StandardIdNamingStrategies.ts");
/* harmony import */ var true_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! true-json */ "./node_modules/true-json/dist/true-json.umd.js");
/* harmony import */ var true_json__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(true_json__WEBPACK_IMPORTED_MODULE_2__);



class DatabaseModelGeneratorConfigManager extends _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_0__.default {
    getDefaultConfig() {
        return {
            usePluralTableNames: false,
            idNamingStrategy: _erdiagram_converter_common_id_naming_strategy_StandardIdNamingStrategies__WEBPACK_IMPORTED_MODULE_1__.default.DEFAULT
        };
    }
    mergeConfigs(fullConfig, partialConfig) {
        return Object.assign(Object.assign({}, fullConfig), partialConfig);
    }
    getJsonAdapter() {
        return true_json__WEBPACK_IMPORTED_MODULE_2__.JsonAdapters.object({
            idNamingStrategy: true_json__WEBPACK_IMPORTED_MODULE_2__.JsonAdapters.byKeyLenient(_erdiagram_converter_common_id_naming_strategy_StandardIdNamingStrategies__WEBPACK_IMPORTED_MODULE_1__.default, 'DEFAULT')
        });
    }
}
const databaseModelGeneratorConfigManager = new DatabaseModelGeneratorConfigManager();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (databaseModelGeneratorConfigManager);


/***/ }),

/***/ "./src/main/erdiagram/converter/database/model/config/exports.ts":
/*!***********************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/model/config/exports.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DatabaseModelGeneratorConfigManager": () => (/* reexport safe */ _DatabaseModelGeneratorConfigManager__WEBPACK_IMPORTED_MODULE_0__.DatabaseModelGeneratorConfigManager),
/* harmony export */   "databaseModelGeneratorConfigManager": () => (/* reexport safe */ _DatabaseModelGeneratorConfigManager__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _DatabaseModelGeneratorConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DatabaseModelGeneratorConfigManager */ "./src/main/erdiagram/converter/database/model/config/DatabaseModelGeneratorConfigManager.ts");




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
/* harmony export */   "DatabaseModelGeneratorConfigManager": () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_2__.DatabaseModelGeneratorConfigManager),
/* harmony export */   "databaseModelGeneratorConfigManager": () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_2__.databaseModelGeneratorConfigManager),
/* harmony export */   "DatabaseModelGenerator": () => (/* reexport safe */ _DatabaseModelGenerator__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _DatabaseModelGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DatabaseModelGenerator */ "./src/main/erdiagram/converter/database/model/DatabaseModelGenerator.ts");
/* harmony import */ var _database_model_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./database-model-types */ "./src/main/erdiagram/converter/database/model/database-model-types.ts");
/* harmony import */ var _config_exports__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config/exports */ "./src/main/erdiagram/converter/database/model/config/exports.ts");






/***/ }),

/***/ "./src/main/erdiagram/converter/database/source-code-generator/SqlEntityRelationshipModelSourceCodeGenerator.ts":
/*!**********************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/source-code-generator/SqlEntityRelationshipModelSourceCodeGenerator.ts ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SqlEntityRelationshipModelSourceCodeGenerator)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_database_source_code_generator_SqlEntityRelationshipModelSourceCodeGeneratorBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/database/source-code-generator/SqlEntityRelationshipModelSourceCodeGeneratorBuilder */ "./src/main/erdiagram/converter/database/source-code-generator/SqlEntityRelationshipModelSourceCodeGeneratorBuilder.ts");

class SqlEntityRelationshipModelSourceCodeGenerator {
    constructor(databaseModelGenerator, databaseModelToSqlCodeConverter) {
        this.databaseModelGenerator = databaseModelGenerator;
        this.databaseModelToSqlCodeConverter = databaseModelToSqlCodeConverter;
    }
    generateSourceCode(entityRelationshipModel) {
        const databaseModel = this.databaseModelGenerator.generateDatabaseModel(entityRelationshipModel);
        return this.databaseModelToSqlCodeConverter.convertToCode(databaseModel);
    }
    static withDefaultConfig() {
        return this.builder().build();
    }
    static builder() {
        return new _erdiagram_converter_database_source_code_generator_SqlEntityRelationshipModelSourceCodeGeneratorBuilder__WEBPACK_IMPORTED_MODULE_0__.default();
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/database/source-code-generator/SqlEntityRelationshipModelSourceCodeGeneratorBuilder.ts":
/*!*****************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/source-code-generator/SqlEntityRelationshipModelSourceCodeGeneratorBuilder.ts ***!
  \*****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SqlEntityRelationshipModelSourceCodeGeneratorBuilder)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_database_model_DatabaseModelGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/database/model/DatabaseModelGenerator */ "./src/main/erdiagram/converter/database/model/DatabaseModelGenerator.ts");
/* harmony import */ var _erdiagram_converter_database_source_code_generator_SqlEntityRelationshipModelSourceCodeGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/database/source-code-generator/SqlEntityRelationshipModelSourceCodeGenerator */ "./src/main/erdiagram/converter/database/source-code-generator/SqlEntityRelationshipModelSourceCodeGenerator.ts");
/* harmony import */ var _erdiagram_converter_database_source_code_generator_sql_DatabaseModelToSqlCodeConverter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/database/source-code-generator/sql/DatabaseModelToSqlCodeConverter */ "./src/main/erdiagram/converter/database/source-code-generator/sql/DatabaseModelToSqlCodeConverter.ts");
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _databaseModelGeneratorConfig, _sqlDialect;



class SqlEntityRelationshipModelSourceCodeGeneratorBuilder {
    constructor() {
        _databaseModelGeneratorConfig.set(this, {});
        _sqlDialect.set(this, void 0);
    }
    withDatabaseModelGeneratorConfig(config) {
        __classPrivateFieldSet(this, _databaseModelGeneratorConfig, config);
        return this;
    }
    withSqlDialect(sqlDialect) {
        __classPrivateFieldSet(this, _sqlDialect, sqlDialect);
        return this;
    }
    build() {
        if (__classPrivateFieldGet(this, _sqlDialect) == null) {
            throw new Error('SqlDialect is not configured');
        }
        return new _erdiagram_converter_database_source_code_generator_SqlEntityRelationshipModelSourceCodeGenerator__WEBPACK_IMPORTED_MODULE_1__.default(new _erdiagram_converter_database_model_DatabaseModelGenerator__WEBPACK_IMPORTED_MODULE_0__.default(__classPrivateFieldGet(this, _databaseModelGeneratorConfig)), new _erdiagram_converter_database_source_code_generator_sql_DatabaseModelToSqlCodeConverter__WEBPACK_IMPORTED_MODULE_2__.default(__classPrivateFieldGet(this, _sqlDialect)));
    }
}
_databaseModelGeneratorConfig = new WeakMap(), _sqlDialect = new WeakMap();


/***/ }),

/***/ "./src/main/erdiagram/converter/database/source-code-generator/exports.ts":
/*!********************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/source-code-generator/exports.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DatabaseModelToSqlCodeConverter": () => (/* reexport safe */ _sql_exports__WEBPACK_IMPORTED_MODULE_1__.DatabaseModelToSqlCodeConverter),
/* harmony export */   "MysqlDialect": () => (/* reexport safe */ _sql_exports__WEBPACK_IMPORTED_MODULE_1__.MysqlDialect),
/* harmony export */   "MysqlDialectConfigManager": () => (/* reexport safe */ _sql_exports__WEBPACK_IMPORTED_MODULE_1__.MysqlDialectConfigManager),
/* harmony export */   "OracleDialect": () => (/* reexport safe */ _sql_exports__WEBPACK_IMPORTED_MODULE_1__.OracleDialect),
/* harmony export */   "OracleDialectConfigManager": () => (/* reexport safe */ _sql_exports__WEBPACK_IMPORTED_MODULE_1__.OracleDialectConfigManager),
/* harmony export */   "PostgresqlDialect": () => (/* reexport safe */ _sql_exports__WEBPACK_IMPORTED_MODULE_1__.PostgresqlDialect),
/* harmony export */   "PostgresqlDialectConfigManager": () => (/* reexport safe */ _sql_exports__WEBPACK_IMPORTED_MODULE_1__.PostgresqlDialectConfigManager),
/* harmony export */   "SqlServerDialect": () => (/* reexport safe */ _sql_exports__WEBPACK_IMPORTED_MODULE_1__.SqlServerDialect),
/* harmony export */   "SqlServerDialectConfigManager": () => (/* reexport safe */ _sql_exports__WEBPACK_IMPORTED_MODULE_1__.SqlServerDialectConfigManager),
/* harmony export */   "SqliteDialect": () => (/* reexport safe */ _sql_exports__WEBPACK_IMPORTED_MODULE_1__.SqliteDialect),
/* harmony export */   "SqliteDialectConfigManager": () => (/* reexport safe */ _sql_exports__WEBPACK_IMPORTED_MODULE_1__.SqliteDialectConfigManager),
/* harmony export */   "mysqlDialectConfigManager": () => (/* reexport safe */ _sql_exports__WEBPACK_IMPORTED_MODULE_1__.mysqlDialectConfigManager),
/* harmony export */   "oracleDialectConfigManager": () => (/* reexport safe */ _sql_exports__WEBPACK_IMPORTED_MODULE_1__.oracleDialectConfigManager),
/* harmony export */   "postgresqlDialectConfigManager": () => (/* reexport safe */ _sql_exports__WEBPACK_IMPORTED_MODULE_1__.postgresqlDialectConfigManager),
/* harmony export */   "sqlServerDialectConfigManager": () => (/* reexport safe */ _sql_exports__WEBPACK_IMPORTED_MODULE_1__.sqlServerDialectConfigManager),
/* harmony export */   "sqliteDialectConfigManager": () => (/* reexport safe */ _sql_exports__WEBPACK_IMPORTED_MODULE_1__.sqliteDialectConfigManager),
/* harmony export */   "SqlEntityRelationshipModelSourceCodeGenerator": () => (/* reexport safe */ _SqlEntityRelationshipModelSourceCodeGenerator__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _SqlEntityRelationshipModelSourceCodeGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SqlEntityRelationshipModelSourceCodeGenerator */ "./src/main/erdiagram/converter/database/source-code-generator/SqlEntityRelationshipModelSourceCodeGenerator.ts");
/* harmony import */ var _sql_exports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sql/exports */ "./src/main/erdiagram/converter/database/source-code-generator/sql/exports.ts");





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
    constructor(typeBindings) {
        this.typeBindings = typeBindings;
    }
    resolveSqlType(type) {
        /* istanbul ignore next */
        if (!this.typeBindings.hasOwnProperty(type)) {
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

/***/ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/exports.ts":
/*!********************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/exports.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MysqlDialect": () => (/* reexport safe */ _mysql_exports__WEBPACK_IMPORTED_MODULE_1__.MysqlDialect),
/* harmony export */   "MysqlDialectConfigManager": () => (/* reexport safe */ _mysql_exports__WEBPACK_IMPORTED_MODULE_1__.MysqlDialectConfigManager),
/* harmony export */   "mysqlDialectConfigManager": () => (/* reexport safe */ _mysql_exports__WEBPACK_IMPORTED_MODULE_1__.mysqlDialectConfigManager),
/* harmony export */   "OracleDialect": () => (/* reexport safe */ _oracle_exports__WEBPACK_IMPORTED_MODULE_2__.OracleDialect),
/* harmony export */   "OracleDialectConfigManager": () => (/* reexport safe */ _oracle_exports__WEBPACK_IMPORTED_MODULE_2__.OracleDialectConfigManager),
/* harmony export */   "oracleDialectConfigManager": () => (/* reexport safe */ _oracle_exports__WEBPACK_IMPORTED_MODULE_2__.oracleDialectConfigManager),
/* harmony export */   "SqliteDialect": () => (/* reexport safe */ _sqlite_exports__WEBPACK_IMPORTED_MODULE_3__.SqliteDialect),
/* harmony export */   "SqliteDialectConfigManager": () => (/* reexport safe */ _sqlite_exports__WEBPACK_IMPORTED_MODULE_3__.SqliteDialectConfigManager),
/* harmony export */   "sqliteDialectConfigManager": () => (/* reexport safe */ _sqlite_exports__WEBPACK_IMPORTED_MODULE_3__.sqliteDialectConfigManager),
/* harmony export */   "SqlServerDialect": () => (/* reexport safe */ _sqlserver_exports__WEBPACK_IMPORTED_MODULE_4__.SqlServerDialect),
/* harmony export */   "SqlServerDialectConfigManager": () => (/* reexport safe */ _sqlserver_exports__WEBPACK_IMPORTED_MODULE_4__.SqlServerDialectConfigManager),
/* harmony export */   "sqlServerDialectConfigManager": () => (/* reexport safe */ _sqlserver_exports__WEBPACK_IMPORTED_MODULE_4__.sqlServerDialectConfigManager),
/* harmony export */   "PostgresqlDialect": () => (/* reexport safe */ _postgresql_exports__WEBPACK_IMPORTED_MODULE_5__.PostgresqlDialect),
/* harmony export */   "PostgresqlDialectConfigManager": () => (/* reexport safe */ _postgresql_exports__WEBPACK_IMPORTED_MODULE_5__.PostgresqlDialectConfigManager),
/* harmony export */   "postgresqlDialectConfigManager": () => (/* reexport safe */ _postgresql_exports__WEBPACK_IMPORTED_MODULE_5__.postgresqlDialectConfigManager)
/* harmony export */ });
/* harmony import */ var _common_config_exports__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common/config/exports */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/common/config/exports.ts");
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
    constructor(config) {
        const fullConfig = _erdiagram_converter_database_source_code_generator_sql_dialect_mysql_config_MysqlDialectConfigManager__WEBPACK_IMPORTED_MODULE_5__.default.mergeWithDefaultConfig(config);
        this.tableNameCaseConverter = new _erdiagram_converter_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_0__.default(_erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_6__.default.LOWER_CAMEL, fullConfig.tableNameCaseFormat);
        const columnNameCaseConverter = new _erdiagram_converter_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_0__.default(_erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_6__.default.LOWER_CAMEL, fullConfig.columnNameCaseFormat);
        const sqlTypeResolver = new _erdiagram_converter_database_source_code_generator_sql_dialect_common_SqlTypeResolver__WEBPACK_IMPORTED_MODULE_4__.default(fullConfig.typeBindings);
        this.columnCodeGenerator = new _erdiagram_converter_database_source_code_generator_sql_dialect_mysql_column_MysqlColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_1__.default(sqlTypeResolver, columnNameCaseConverter);
        this.idColumnCodeGenerator = new _erdiagram_converter_database_source_code_generator_sql_dialect_mysql_column_MysqlIdColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_2__.default(sqlTypeResolver, columnNameCaseConverter);
        this.foreignColumnCodeGenerator = new _erdiagram_converter_database_source_code_generator_sql_dialect_mysql_column_MysqlForeignColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_3__.default(this.columnCodeGenerator, this.tableNameCaseConverter, columnNameCaseConverter);
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
/* harmony export */   "MysqlDialectConfigManager": () => (/* binding */ MysqlDialectConfigManager),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/entity-relationship-model-types */ "./src/main/erdiagram/parser/types/entity-relationship-model-types.ts");
/* harmony import */ var _erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/common/case-format/StandardCaseFormats */ "./src/main/erdiagram/converter/common/case-format/StandardCaseFormats.ts");
/* harmony import */ var _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/common/config/AbstractComponentConfigManager */ "./src/main/erdiagram/common/config/AbstractComponentConfigManager.ts");
/* harmony import */ var true_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! true-json */ "./node_modules/true-json/dist/true-json.umd.js");
/* harmony import */ var true_json__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(true_json__WEBPACK_IMPORTED_MODULE_3__);




class MysqlDialectConfigManager extends _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_2__.default {
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
            tableNameCaseFormat: _erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__.default.UPPER_CAMEL,
            columnNameCaseFormat: _erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__.default.LOWER_CAMEL,
        };
    }
    mergeConfigs(fullConfig, partialConfig) {
        return Object.assign(Object.assign(Object.assign({}, fullConfig), partialConfig), { typeBindings: Object.assign(Object.assign({}, fullConfig.typeBindings), partialConfig === null || partialConfig === void 0 ? void 0 : partialConfig.typeBindings) });
    }
    getJsonAdapter() {
        return true_json__WEBPACK_IMPORTED_MODULE_3__.JsonAdapters.object({
            tableNameCaseFormat: true_json__WEBPACK_IMPORTED_MODULE_3__.JsonAdapters.byKeyLenient(_erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__.default, 'UPPER_CAMEL'),
            columnNameCaseFormat: true_json__WEBPACK_IMPORTED_MODULE_3__.JsonAdapters.byKeyLenient(_erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__.default, 'LOWER_CAMEL')
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
/* harmony export */   "MysqlDialectConfigManager": () => (/* reexport safe */ _MysqlDialectConfigManager__WEBPACK_IMPORTED_MODULE_0__.MysqlDialectConfigManager),
/* harmony export */   "mysqlDialectConfigManager": () => (/* reexport safe */ _MysqlDialectConfigManager__WEBPACK_IMPORTED_MODULE_0__.default)
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
/* harmony export */   "MysqlDialectConfigManager": () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_1__.MysqlDialectConfigManager),
/* harmony export */   "mysqlDialectConfigManager": () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_1__.mysqlDialectConfigManager),
/* harmony export */   "MysqlDialect": () => (/* reexport safe */ _erdiagram_converter_database_source_code_generator_sql_dialect_mysql_MysqlDialect__WEBPACK_IMPORTED_MODULE_0__.default)
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
    constructor(config) {
        const fullConfig = _erdiagram_converter_database_source_code_generator_sql_dialect_oracle_config_OracleDialectConfigManager__WEBPACK_IMPORTED_MODULE_4__.default.mergeWithDefaultConfig(config);
        this.tableNameCaseConverter = new _erdiagram_converter_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_0__.default(_erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_5__.default.LOWER_CAMEL, fullConfig.tableNameCaseFormat);
        const columnNameCaseConverter = new _erdiagram_converter_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_0__.default(_erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_5__.default.LOWER_CAMEL, fullConfig.columnNameCaseFormat);
        const sqlTypeResolver = new _erdiagram_converter_database_source_code_generator_sql_dialect_common_SqlTypeResolver__WEBPACK_IMPORTED_MODULE_6__.default(fullConfig.typeBindings);
        this.columnCodeGenerator = new _erdiagram_converter_database_source_code_generator_sql_dialect_oracle_column_OracleColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_1__.default(sqlTypeResolver, columnNameCaseConverter);
        this.idColumnCodeGenerator = new _erdiagram_converter_database_source_code_generator_sql_dialect_oracle_column_OracleIdColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_2__.default(sqlTypeResolver, columnNameCaseConverter);
        this.foreignColumnCodeGenerator = new _erdiagram_converter_database_source_code_generator_sql_dialect_oracle_column_OracleForeignColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_3__.default(this.columnCodeGenerator, this.tableNameCaseConverter, columnNameCaseConverter);
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
/* harmony export */   "OracleDialectConfigManager": () => (/* binding */ OracleDialectConfigManager),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/entity-relationship-model-types */ "./src/main/erdiagram/parser/types/entity-relationship-model-types.ts");
/* harmony import */ var _erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/common/case-format/StandardCaseFormats */ "./src/main/erdiagram/converter/common/case-format/StandardCaseFormats.ts");
/* harmony import */ var _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/common/config/AbstractComponentConfigManager */ "./src/main/erdiagram/common/config/AbstractComponentConfigManager.ts");
/* harmony import */ var true_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! true-json */ "./node_modules/true-json/dist/true-json.umd.js");
/* harmony import */ var true_json__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(true_json__WEBPACK_IMPORTED_MODULE_3__);




class OracleDialectConfigManager extends _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_2__.default {
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
            tableNameCaseFormat: _erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__.default.UPPER_UNDERSCORE,
            columnNameCaseFormat: _erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__.default.UPPER_UNDERSCORE,
        };
    }
    mergeConfigs(fullConfig, partialConfig) {
        return Object.assign(Object.assign(Object.assign({}, fullConfig), partialConfig), { typeBindings: Object.assign(Object.assign({}, fullConfig.typeBindings), partialConfig === null || partialConfig === void 0 ? void 0 : partialConfig.typeBindings) });
    }
    getJsonAdapter() {
        return true_json__WEBPACK_IMPORTED_MODULE_3__.JsonAdapters.object({
            tableNameCaseFormat: true_json__WEBPACK_IMPORTED_MODULE_3__.JsonAdapters.byKeyLenient(_erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__.default, 'UPPER_UNDERSCORE'),
            columnNameCaseFormat: true_json__WEBPACK_IMPORTED_MODULE_3__.JsonAdapters.byKeyLenient(_erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__.default, 'UPPER_UNDERSCORE')
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
/* harmony export */   "OracleDialectConfigManager": () => (/* reexport safe */ _OracleDialectConfigManager__WEBPACK_IMPORTED_MODULE_0__.OracleDialectConfigManager),
/* harmony export */   "oracleDialectConfigManager": () => (/* reexport safe */ _OracleDialectConfigManager__WEBPACK_IMPORTED_MODULE_0__.default)
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
/* harmony export */   "OracleDialectConfigManager": () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_1__.OracleDialectConfigManager),
/* harmony export */   "oracleDialectConfigManager": () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_1__.oracleDialectConfigManager),
/* harmony export */   "OracleDialect": () => (/* reexport safe */ _erdiagram_converter_database_source_code_generator_sql_dialect_oracle_OracleDialect__WEBPACK_IMPORTED_MODULE_0__.default)
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
    constructor(config) {
        const fullConfig = _erdiagram_converter_database_source_code_generator_sql_dialect_postgresql_config_PostgresqlDialectConfigManager__WEBPACK_IMPORTED_MODULE_6__.default.mergeWithDefaultConfig(config);
        this.tableNameCaseConverter = new _erdiagram_converter_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_0__.default(_erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__.default.LOWER_CAMEL, fullConfig.tableNameCaseFormat);
        const columnNameCaseConverter = new _erdiagram_converter_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_0__.default(_erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__.default.LOWER_CAMEL, fullConfig.columnNameCaseFormat);
        const sqlTypeResolver = new _erdiagram_converter_database_source_code_generator_sql_dialect_common_SqlTypeResolver__WEBPACK_IMPORTED_MODULE_2__.default(fullConfig.typeBindings);
        this.columnCodeGenerator = new _erdiagram_converter_database_source_code_generator_sql_dialect_postgresql_column_PostgresqlColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_3__.default(sqlTypeResolver, columnNameCaseConverter);
        this.idColumnCodeGenerator = new _erdiagram_converter_database_source_code_generator_sql_dialect_postgresql_column_PostgresqlIdColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_4__.default(sqlTypeResolver, columnNameCaseConverter);
        this.foreignColumnCodeGenerator = new _erdiagram_converter_database_source_code_generator_sql_dialect_postgresql_column_PostgresqlForeignColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_5__.default(this.columnCodeGenerator, this.tableNameCaseConverter, columnNameCaseConverter);
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
/* harmony export */   "PostgresqlDialectConfigManager": () => (/* binding */ PostgresqlDialectConfigManager),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/entity-relationship-model-types */ "./src/main/erdiagram/parser/types/entity-relationship-model-types.ts");
/* harmony import */ var _erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/common/case-format/StandardCaseFormats */ "./src/main/erdiagram/converter/common/case-format/StandardCaseFormats.ts");
/* harmony import */ var _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/common/config/AbstractComponentConfigManager */ "./src/main/erdiagram/common/config/AbstractComponentConfigManager.ts");
/* harmony import */ var true_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! true-json */ "./node_modules/true-json/dist/true-json.umd.js");
/* harmony import */ var true_json__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(true_json__WEBPACK_IMPORTED_MODULE_3__);




class PostgresqlDialectConfigManager extends _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_2__.default {
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
            tableNameCaseFormat: _erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__.default.LOWER_UNDERSCORE,
            columnNameCaseFormat: _erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__.default.LOWER_UNDERSCORE,
        };
    }
    mergeConfigs(fullConfig, partialConfig) {
        return Object.assign(Object.assign(Object.assign({}, fullConfig), partialConfig), { typeBindings: Object.assign(Object.assign({}, fullConfig.typeBindings), partialConfig === null || partialConfig === void 0 ? void 0 : partialConfig.typeBindings) });
    }
    getJsonAdapter() {
        return true_json__WEBPACK_IMPORTED_MODULE_3__.JsonAdapters.object({
            tableNameCaseFormat: true_json__WEBPACK_IMPORTED_MODULE_3__.JsonAdapters.byKeyLenient(_erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__.default, 'LOWER_UNDERSCORE'),
            columnNameCaseFormat: true_json__WEBPACK_IMPORTED_MODULE_3__.JsonAdapters.byKeyLenient(_erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__.default, 'LOWER_UNDERSCORE')
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
/* harmony export */   "PostgresqlDialectConfigManager": () => (/* reexport safe */ _PostgresqlDialectConfigManager__WEBPACK_IMPORTED_MODULE_0__.PostgresqlDialectConfigManager),
/* harmony export */   "postgresqlDialectConfigManager": () => (/* reexport safe */ _PostgresqlDialectConfigManager__WEBPACK_IMPORTED_MODULE_0__.default)
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
/* harmony export */   "PostgresqlDialectConfigManager": () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_1__.PostgresqlDialectConfigManager),
/* harmony export */   "postgresqlDialectConfigManager": () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_1__.postgresqlDialectConfigManager),
/* harmony export */   "PostgresqlDialect": () => (/* reexport safe */ _erdiagram_converter_database_source_code_generator_sql_dialect_postgresql_PostgresqlDialect__WEBPACK_IMPORTED_MODULE_0__.default)
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
    constructor(config) {
        const fullConfig = _erdiagram_converter_database_source_code_generator_sql_dialect_sqlite_config_SqliteDialectConfigManager__WEBPACK_IMPORTED_MODULE_6__.default.mergeWithDefaultConfig(config);
        this.tableNameCaseConverter = new _erdiagram_converter_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_0__.default(_erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__.default.LOWER_CAMEL, fullConfig.tableNameCaseFormat);
        const columnNameCaseConverter = new _erdiagram_converter_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_0__.default(_erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__.default.LOWER_CAMEL, fullConfig.columnNameCaseFormat);
        const sqlTypeResolver = new _erdiagram_converter_database_source_code_generator_sql_dialect_common_SqlTypeResolver__WEBPACK_IMPORTED_MODULE_2__.default(fullConfig.typeBindings);
        this.columnCodeGenerator = new _erdiagram_converter_database_source_code_generator_sql_dialect_sqlite_column_SqliteColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_3__.default(sqlTypeResolver, columnNameCaseConverter);
        this.idColumnCodeGenerator = new _erdiagram_converter_database_source_code_generator_sql_dialect_sqlite_column_SqliteIdColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_4__.default(sqlTypeResolver, columnNameCaseConverter);
        this.foreignColumnCodeGenerator = new _erdiagram_converter_database_source_code_generator_sql_dialect_sqlite_column_SqliteForeignColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_5__.default(this.columnCodeGenerator, this.tableNameCaseConverter, columnNameCaseConverter);
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
    getAlterTableAddCode(tableName, constraintCode) {
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
/* harmony export */   "SqliteDialectConfigManager": () => (/* binding */ SqliteDialectConfigManager),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/entity-relationship-model-types */ "./src/main/erdiagram/parser/types/entity-relationship-model-types.ts");
/* harmony import */ var _erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/common/case-format/StandardCaseFormats */ "./src/main/erdiagram/converter/common/case-format/StandardCaseFormats.ts");
/* harmony import */ var _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/common/config/AbstractComponentConfigManager */ "./src/main/erdiagram/common/config/AbstractComponentConfigManager.ts");
/* harmony import */ var true_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! true-json */ "./node_modules/true-json/dist/true-json.umd.js");
/* harmony import */ var true_json__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(true_json__WEBPACK_IMPORTED_MODULE_3__);




class SqliteDialectConfigManager extends _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_2__.default {
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
            tableNameCaseFormat: _erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__.default.LOWER_UNDERSCORE,
            columnNameCaseFormat: _erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__.default.LOWER_UNDERSCORE,
        };
    }
    mergeConfigs(fullConfig, partialConfig) {
        return Object.assign(Object.assign(Object.assign({}, fullConfig), partialConfig), { typeBindings: Object.assign(Object.assign({}, fullConfig.typeBindings), partialConfig === null || partialConfig === void 0 ? void 0 : partialConfig.typeBindings) });
    }
    getJsonAdapter() {
        return true_json__WEBPACK_IMPORTED_MODULE_3__.JsonAdapters.object({
            tableNameCaseFormat: true_json__WEBPACK_IMPORTED_MODULE_3__.JsonAdapters.byKeyLenient(_erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__.default, 'LOWER_UNDERSCORE'),
            columnNameCaseFormat: true_json__WEBPACK_IMPORTED_MODULE_3__.JsonAdapters.byKeyLenient(_erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__.default, 'LOWER_UNDERSCORE')
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
/* harmony export */   "SqliteDialectConfigManager": () => (/* reexport safe */ _SqliteDialectConfigManager__WEBPACK_IMPORTED_MODULE_0__.SqliteDialectConfigManager),
/* harmony export */   "sqliteDialectConfigManager": () => (/* reexport safe */ _SqliteDialectConfigManager__WEBPACK_IMPORTED_MODULE_0__.default)
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
/* harmony export */   "SqliteDialectConfigManager": () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_1__.SqliteDialectConfigManager),
/* harmony export */   "sqliteDialectConfigManager": () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_1__.sqliteDialectConfigManager),
/* harmony export */   "SqliteDialect": () => (/* reexport safe */ _erdiagram_converter_database_source_code_generator_sql_dialect_sqlite_SqliteDialect__WEBPACK_IMPORTED_MODULE_0__.default)
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
    constructor(config) {
        const fullConfig = _erdiagram_converter_database_source_code_generator_sql_dialect_sqlserver_config_SqlServerDialectConfigManager__WEBPACK_IMPORTED_MODULE_4__.default.mergeWithDefaultConfig(config);
        this.tableNameCaseConverter = new _erdiagram_converter_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_0__.default(_erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_5__.default.LOWER_CAMEL, fullConfig.tableNameCaseFormat);
        const columnNameCaseConverter = new _erdiagram_converter_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_0__.default(_erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_5__.default.LOWER_CAMEL, fullConfig.columnNameCaseFormat);
        const sqlTypeResolver = new _erdiagram_converter_database_source_code_generator_sql_dialect_common_SqlTypeResolver__WEBPACK_IMPORTED_MODULE_6__.default(fullConfig.typeBindings);
        this.columnCodeGenerator = new _erdiagram_converter_database_source_code_generator_sql_dialect_sqlserver_column_SqlServerColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_1__.default(sqlTypeResolver, columnNameCaseConverter);
        this.idColumnCodeGenerator = new _erdiagram_converter_database_source_code_generator_sql_dialect_sqlserver_column_SqlServerIdColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_2__.default(sqlTypeResolver, columnNameCaseConverter);
        this.foreignColumnCodeGenerator = new _erdiagram_converter_database_source_code_generator_sql_dialect_sqlserver_column_SqlServerForeignColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_3__.default(this.columnCodeGenerator, this.tableNameCaseConverter, columnNameCaseConverter);
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
/* harmony export */   "SqlServerDialectConfigManager": () => (/* binding */ SqlServerDialectConfigManager),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/entity-relationship-model-types */ "./src/main/erdiagram/parser/types/entity-relationship-model-types.ts");
/* harmony import */ var _erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/common/case-format/StandardCaseFormats */ "./src/main/erdiagram/converter/common/case-format/StandardCaseFormats.ts");
/* harmony import */ var _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/common/config/AbstractComponentConfigManager */ "./src/main/erdiagram/common/config/AbstractComponentConfigManager.ts");
/* harmony import */ var true_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! true-json */ "./node_modules/true-json/dist/true-json.umd.js");
/* harmony import */ var true_json__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(true_json__WEBPACK_IMPORTED_MODULE_3__);




class SqlServerDialectConfigManager extends _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_2__.default {
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
            tableNameCaseFormat: _erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__.default.UPPER_CAMEL,
            columnNameCaseFormat: _erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__.default.UPPER_CAMEL,
        };
    }
    mergeConfigs(fullConfig, partialConfig) {
        return Object.assign(Object.assign(Object.assign({}, fullConfig), partialConfig), { typeBindings: Object.assign(Object.assign({}, fullConfig.typeBindings), partialConfig === null || partialConfig === void 0 ? void 0 : partialConfig.typeBindings) });
    }
    getJsonAdapter() {
        return true_json__WEBPACK_IMPORTED_MODULE_3__.JsonAdapters.object({
            tableNameCaseFormat: true_json__WEBPACK_IMPORTED_MODULE_3__.JsonAdapters.byKeyLenient(_erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__.default, 'UPPER_CAMEL'),
            columnNameCaseFormat: true_json__WEBPACK_IMPORTED_MODULE_3__.JsonAdapters.byKeyLenient(_erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__.default, 'UPPER_CAMEL')
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
/* harmony export */   "SqlServerDialectConfigManager": () => (/* reexport safe */ _SqlServerDialectConfigManager__WEBPACK_IMPORTED_MODULE_0__.SqlServerDialectConfigManager),
/* harmony export */   "sqlServerDialectConfigManager": () => (/* reexport safe */ _SqlServerDialectConfigManager__WEBPACK_IMPORTED_MODULE_0__.default)
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
/* harmony export */   "SqlServerDialectConfigManager": () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_1__.SqlServerDialectConfigManager),
/* harmony export */   "sqlServerDialectConfigManager": () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_1__.sqlServerDialectConfigManager),
/* harmony export */   "SqlServerDialect": () => (/* reexport safe */ _erdiagram_converter_database_source_code_generator_sql_dialect_sqlserver_SqlServerDialect__WEBPACK_IMPORTED_MODULE_0__.default)
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
/* harmony export */   "MysqlDialect": () => (/* reexport safe */ _dialect_exports__WEBPACK_IMPORTED_MODULE_1__.MysqlDialect),
/* harmony export */   "MysqlDialectConfigManager": () => (/* reexport safe */ _dialect_exports__WEBPACK_IMPORTED_MODULE_1__.MysqlDialectConfigManager),
/* harmony export */   "OracleDialect": () => (/* reexport safe */ _dialect_exports__WEBPACK_IMPORTED_MODULE_1__.OracleDialect),
/* harmony export */   "OracleDialectConfigManager": () => (/* reexport safe */ _dialect_exports__WEBPACK_IMPORTED_MODULE_1__.OracleDialectConfigManager),
/* harmony export */   "PostgresqlDialect": () => (/* reexport safe */ _dialect_exports__WEBPACK_IMPORTED_MODULE_1__.PostgresqlDialect),
/* harmony export */   "PostgresqlDialectConfigManager": () => (/* reexport safe */ _dialect_exports__WEBPACK_IMPORTED_MODULE_1__.PostgresqlDialectConfigManager),
/* harmony export */   "SqlServerDialect": () => (/* reexport safe */ _dialect_exports__WEBPACK_IMPORTED_MODULE_1__.SqlServerDialect),
/* harmony export */   "SqlServerDialectConfigManager": () => (/* reexport safe */ _dialect_exports__WEBPACK_IMPORTED_MODULE_1__.SqlServerDialectConfigManager),
/* harmony export */   "SqliteDialect": () => (/* reexport safe */ _dialect_exports__WEBPACK_IMPORTED_MODULE_1__.SqliteDialect),
/* harmony export */   "SqliteDialectConfigManager": () => (/* reexport safe */ _dialect_exports__WEBPACK_IMPORTED_MODULE_1__.SqliteDialectConfigManager),
/* harmony export */   "mysqlDialectConfigManager": () => (/* reexport safe */ _dialect_exports__WEBPACK_IMPORTED_MODULE_1__.mysqlDialectConfigManager),
/* harmony export */   "oracleDialectConfigManager": () => (/* reexport safe */ _dialect_exports__WEBPACK_IMPORTED_MODULE_1__.oracleDialectConfigManager),
/* harmony export */   "postgresqlDialectConfigManager": () => (/* reexport safe */ _dialect_exports__WEBPACK_IMPORTED_MODULE_1__.postgresqlDialectConfigManager),
/* harmony export */   "sqlServerDialectConfigManager": () => (/* reexport safe */ _dialect_exports__WEBPACK_IMPORTED_MODULE_1__.sqlServerDialectConfigManager),
/* harmony export */   "sqliteDialectConfigManager": () => (/* reexport safe */ _dialect_exports__WEBPACK_IMPORTED_MODULE_1__.sqliteDialectConfigManager),
/* harmony export */   "DatabaseModelToSqlCodeConverter": () => (/* reexport safe */ _erdiagram_converter_database_source_code_generator_sql_DatabaseModelToSqlCodeConverter__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_database_source_code_generator_sql_DatabaseModelToSqlCodeConverter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/database/source-code-generator/sql/DatabaseModelToSqlCodeConverter */ "./src/main/erdiagram/converter/database/source-code-generator/sql/DatabaseModelToSqlCodeConverter.ts");
/* harmony import */ var _dialect_exports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dialect/exports */ "./src/main/erdiagram/converter/database/source-code-generator/sql/dialect/exports.ts");





/***/ }),

/***/ "./src/main/erdiagram/converter/diagram/exports.ts":
/*!*********************************************************!*\
  !*** ./src/main/erdiagram/converter/diagram/exports.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NomnomlEntityRelationshipModelSourceCodeGenerator": () => (/* reexport safe */ _nomnoml_exports__WEBPACK_IMPORTED_MODULE_0__.NomnomlEntityRelationshipModelSourceCodeGenerator),
/* harmony export */   "NomnomlEntityRelationshipModelSourceCodeGeneratorConfigManager": () => (/* reexport safe */ _nomnoml_exports__WEBPACK_IMPORTED_MODULE_0__.NomnomlEntityRelationshipModelSourceCodeGeneratorConfigManager),
/* harmony export */   "nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager": () => (/* reexport safe */ _nomnoml_exports__WEBPACK_IMPORTED_MODULE_0__.nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager),
/* harmony export */   "PlantUmlEntityRelationshipModelSourceCodeGenerator": () => (/* reexport safe */ _plantuml_exports__WEBPACK_IMPORTED_MODULE_1__.PlantUmlEntityRelationshipModelSourceCodeGenerator)
/* harmony export */ });
/* harmony import */ var _nomnoml_exports__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nomnoml/exports */ "./src/main/erdiagram/converter/diagram/nomnoml/exports.ts");
/* harmony import */ var _plantuml_exports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plantuml/exports */ "./src/main/erdiagram/converter/diagram/plantuml/exports.ts");




/***/ }),

/***/ "./src/main/erdiagram/converter/diagram/nomnoml/NomnomlEntityRelationshipModelSourceCodeGenerator.ts":
/*!***********************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/diagram/nomnoml/NomnomlEntityRelationshipModelSourceCodeGenerator.ts ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NomnomlEntityRelationshipModelSourceCodeGenerator)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_diagram_nomnoml_entity_NomnomlEntityCodeGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/diagram/nomnoml/entity/NomnomlEntityCodeGenerator */ "./src/main/erdiagram/converter/diagram/nomnoml/entity/NomnomlEntityCodeGenerator.ts");
/* harmony import */ var _erdiagram_converter_diagram_nomnoml_relationship_NomnomlRelationshipCodeGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/diagram/nomnoml/relationship/NomnomlRelationshipCodeGenerator */ "./src/main/erdiagram/converter/diagram/nomnoml/relationship/NomnomlRelationshipCodeGenerator.ts");
/* harmony import */ var _erdiagram_converter_diagram_nomnoml_config_NomnomlEntityRelationshipModelSourceCodeGeneratorConfigManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/diagram/nomnoml/config/NomnomlEntityRelationshipModelSourceCodeGeneratorConfigManager */ "./src/main/erdiagram/converter/diagram/nomnoml/config/NomnomlEntityRelationshipModelSourceCodeGeneratorConfigManager.ts");
/* harmony import */ var _erdiagram_converter_diagram_nomnoml_directive_NomnomlDirectivesCodeGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/converter/diagram/nomnoml/directive/NomnomlDirectivesCodeGenerator */ "./src/main/erdiagram/converter/diagram/nomnoml/directive/NomnomlDirectivesCodeGenerator.ts");




class NomnomlEntityRelationshipModelSourceCodeGenerator {
    constructor(config) {
        this.entityCodeGenerator = new _erdiagram_converter_diagram_nomnoml_entity_NomnomlEntityCodeGenerator__WEBPACK_IMPORTED_MODULE_0__.default();
        this.relationshipCodeGenerator = new _erdiagram_converter_diagram_nomnoml_relationship_NomnomlRelationshipCodeGenerator__WEBPACK_IMPORTED_MODULE_1__.default();
        this.directivesCodeGenerator = new _erdiagram_converter_diagram_nomnoml_directive_NomnomlDirectivesCodeGenerator__WEBPACK_IMPORTED_MODULE_3__.default();
        this.config = _erdiagram_converter_diagram_nomnoml_config_NomnomlEntityRelationshipModelSourceCodeGeneratorConfigManager__WEBPACK_IMPORTED_MODULE_2__.default.mergeWithDefaultConfig(config);
    }
    generateSourceCode(model) {
        return [
            ...model.entities.map(entity => this.entityCodeGenerator.generateEntityCode(entity)),
            ...model.relationships.map(relationship => this.relationshipCodeGenerator.generateRelationshipCode(relationship)),
            this.directivesCodeGenerator.generateDirectivesCode(this.config)
        ].join('\n\n');
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/diagram/nomnoml/config/NomnomlEntityRelationshipModelSourceCodeGeneratorConfigManager.ts":
/*!*******************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/diagram/nomnoml/config/NomnomlEntityRelationshipModelSourceCodeGeneratorConfigManager.ts ***!
  \*******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NomnomlEntityRelationshipModelSourceCodeGeneratorConfigManager": () => (/* binding */ NomnomlEntityRelationshipModelSourceCodeGeneratorConfigManager),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/common/config/AbstractComponentConfigManager */ "./src/main/erdiagram/common/config/AbstractComponentConfigManager.ts");

class NomnomlEntityRelationshipModelSourceCodeGeneratorConfigManager extends _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_0__.default {
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
        };
    }
    mergeConfigs(fullConfig, partialConfig) {
        return Object.assign(Object.assign({}, fullConfig), partialConfig);
    }
}
const nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager = new NomnomlEntityRelationshipModelSourceCodeGeneratorConfigManager();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager);


/***/ }),

/***/ "./src/main/erdiagram/converter/diagram/nomnoml/config/exports.ts":
/*!************************************************************************!*\
  !*** ./src/main/erdiagram/converter/diagram/nomnoml/config/exports.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NomnomlEntityRelationshipModelSourceCodeGeneratorConfigManager": () => (/* reexport safe */ _NomnomlEntityRelationshipModelSourceCodeGeneratorConfigManager__WEBPACK_IMPORTED_MODULE_0__.NomnomlEntityRelationshipModelSourceCodeGeneratorConfigManager),
/* harmony export */   "nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager": () => (/* reexport safe */ _NomnomlEntityRelationshipModelSourceCodeGeneratorConfigManager__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _NomnomlEntityRelationshipModelSourceCodeGeneratorConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NomnomlEntityRelationshipModelSourceCodeGeneratorConfigManager */ "./src/main/erdiagram/converter/diagram/nomnoml/config/NomnomlEntityRelationshipModelSourceCodeGeneratorConfigManager.ts");




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
    generateDirectivesCode(config) {
        return Object.entries(config)
            .filter(([key, value]) => value != null && value !== '')
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



class NomnomlEntityCodeGenerator {
    constructor() {
        this.entityIdentityPropertyCodeGenerator = new _erdiagram_converter_diagram_nomnoml_entity_NomnomlEntityIdentityPropertyCodeGenerator__WEBPACK_IMPORTED_MODULE_0__.default();
        this.entityPropertyCodeGenerator = new _erdiagram_converter_diagram_nomnoml_entity_NomnomlEntityPropertyCodeGenerator__WEBPACK_IMPORTED_MODULE_1__.default();
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
/* harmony export */   "NomnomlEntityRelationshipModelSourceCodeGeneratorConfigManager": () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_1__.NomnomlEntityRelationshipModelSourceCodeGeneratorConfigManager),
/* harmony export */   "nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager": () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_1__.nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager),
/* harmony export */   "NomnomlEntityRelationshipModelSourceCodeGenerator": () => (/* reexport safe */ _NomnomlEntityRelationshipModelSourceCodeGenerator__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _NomnomlEntityRelationshipModelSourceCodeGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NomnomlEntityRelationshipModelSourceCodeGenerator */ "./src/main/erdiagram/converter/diagram/nomnoml/NomnomlEntityRelationshipModelSourceCodeGenerator.ts");
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
    constructor() {
        this.relationshipDirectionCodeGenerator = new _erdiagram_converter_diagram_nomnoml_relationship_NomnomlRelationshipDirectionCodeGenerator__WEBPACK_IMPORTED_MODULE_0__.default();
        this.relationshipCardinalityCodeGenerator = new _erdiagram_converter_diagram_nomnoml_relationship_NomnomlRelationshipCardinalityCodeGenerator__WEBPACK_IMPORTED_MODULE_1__.default();
        this.namedRelationshipCodeGenerator = new _erdiagram_converter_diagram_nomnoml_relationship_NomnomlNamedRelationshipCodeGenerator__WEBPACK_IMPORTED_MODULE_3__.default(this.relationshipDirectionCodeGenerator, this.relationshipCardinalityCodeGenerator);
        this.unnamedRelationshipCodeGenerator = new _erdiagram_converter_diagram_nomnoml_relationship_NomnomlUnnamedRelationshipCodeGenerator__WEBPACK_IMPORTED_MODULE_2__.default(this.relationshipDirectionCodeGenerator, this.relationshipCardinalityCodeGenerator);
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

/***/ "./src/main/erdiagram/converter/diagram/plantuml/PlantUmlEntityRelationshipModelSourceCodeGenerator.ts":
/*!*************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/diagram/plantuml/PlantUmlEntityRelationshipModelSourceCodeGenerator.ts ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PlantUmlEntityRelationshipModelSourceCodeGenerator)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_diagram_plantuml_entity_PlantUmlEntityCodeGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/diagram/plantuml/entity/PlantUmlEntityCodeGenerator */ "./src/main/erdiagram/converter/diagram/plantuml/entity/PlantUmlEntityCodeGenerator.ts");
/* harmony import */ var _erdiagram_converter_diagram_plantuml_relationship_PlantUmlRelationshipCodeGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/diagram/plantuml/relationship/PlantUmlRelationshipCodeGenerator */ "./src/main/erdiagram/converter/diagram/plantuml/relationship/PlantUmlRelationshipCodeGenerator.ts");


class PlantUmlEntityRelationshipModelSourceCodeGenerator {
    constructor() {
        this.entityCodeGenerator = new _erdiagram_converter_diagram_plantuml_entity_PlantUmlEntityCodeGenerator__WEBPACK_IMPORTED_MODULE_0__.default();
        this.relationshipCodeGenerator = new _erdiagram_converter_diagram_plantuml_relationship_PlantUmlRelationshipCodeGenerator__WEBPACK_IMPORTED_MODULE_1__.default();
    }
    generateSourceCode(model) {
        return [
            '@startuml',
            ...model.entities.map(entity => this.entityCodeGenerator.generateEntityCode(entity)),
            ...model.relationships.map(relationship => this.relationshipCodeGenerator.generateRelationshipCode(relationship)),
            '@enduml'
        ].join('\n\n');
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



class PlantUmlEntityCodeGenerator {
    constructor() {
        this.entityIdentityPropertyCodeGenerator = new _erdiagram_converter_diagram_plantuml_entity_PlantUmlEntityIdentityPropertyCodeGenerator__WEBPACK_IMPORTED_MODULE_0__.default();
        this.entityPropertyCodeGenerator = new _erdiagram_converter_diagram_plantuml_entity_PlantUmlEntityPropertyCodeGenerator__WEBPACK_IMPORTED_MODULE_1__.default();
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
/* harmony export */   "PlantUmlEntityRelationshipModelSourceCodeGenerator": () => (/* reexport safe */ _PlantUmlEntityRelationshipModelSourceCodeGenerator__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _PlantUmlEntityRelationshipModelSourceCodeGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PlantUmlEntityRelationshipModelSourceCodeGenerator */ "./src/main/erdiagram/converter/diagram/plantuml/PlantUmlEntityRelationshipModelSourceCodeGenerator.ts");




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
    constructor() {
        this.relationshipDirectionCodeGenerator = new _erdiagram_converter_diagram_plantuml_relationship_PlantUmlRelationshipDirectionCodeGenerator__WEBPACK_IMPORTED_MODULE_0__.default();
        this.relationshipCardinalityCodeGenerator = new _erdiagram_converter_diagram_plantuml_relationship_PlantUmlRelationshipCardinalityCodeGenerator__WEBPACK_IMPORTED_MODULE_1__.default();
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
/* harmony export */   "CaseConverter": () => (/* reexport safe */ _common_exports__WEBPACK_IMPORTED_MODULE_1__.CaseConverter),
/* harmony export */   "StandardCaseFormats": () => (/* reexport safe */ _common_exports__WEBPACK_IMPORTED_MODULE_1__.StandardCaseFormats),
/* harmony export */   "StandardIdNamingStrategies": () => (/* reexport safe */ _common_exports__WEBPACK_IMPORTED_MODULE_1__.StandardIdNamingStrategies),
/* harmony export */   "DatabaseModelGenerator": () => (/* reexport safe */ _database_exports__WEBPACK_IMPORTED_MODULE_2__.DatabaseModelGenerator),
/* harmony export */   "DatabaseModelGeneratorConfigManager": () => (/* reexport safe */ _database_exports__WEBPACK_IMPORTED_MODULE_2__.DatabaseModelGeneratorConfigManager),
/* harmony export */   "DatabaseModelToSqlCodeConverter": () => (/* reexport safe */ _database_exports__WEBPACK_IMPORTED_MODULE_2__.DatabaseModelToSqlCodeConverter),
/* harmony export */   "MysqlDialect": () => (/* reexport safe */ _database_exports__WEBPACK_IMPORTED_MODULE_2__.MysqlDialect),
/* harmony export */   "MysqlDialectConfigManager": () => (/* reexport safe */ _database_exports__WEBPACK_IMPORTED_MODULE_2__.MysqlDialectConfigManager),
/* harmony export */   "OracleDialect": () => (/* reexport safe */ _database_exports__WEBPACK_IMPORTED_MODULE_2__.OracleDialect),
/* harmony export */   "OracleDialectConfigManager": () => (/* reexport safe */ _database_exports__WEBPACK_IMPORTED_MODULE_2__.OracleDialectConfigManager),
/* harmony export */   "PostgresqlDialect": () => (/* reexport safe */ _database_exports__WEBPACK_IMPORTED_MODULE_2__.PostgresqlDialect),
/* harmony export */   "PostgresqlDialectConfigManager": () => (/* reexport safe */ _database_exports__WEBPACK_IMPORTED_MODULE_2__.PostgresqlDialectConfigManager),
/* harmony export */   "SqlEntityRelationshipModelSourceCodeGenerator": () => (/* reexport safe */ _database_exports__WEBPACK_IMPORTED_MODULE_2__.SqlEntityRelationshipModelSourceCodeGenerator),
/* harmony export */   "SqlServerDialect": () => (/* reexport safe */ _database_exports__WEBPACK_IMPORTED_MODULE_2__.SqlServerDialect),
/* harmony export */   "SqlServerDialectConfigManager": () => (/* reexport safe */ _database_exports__WEBPACK_IMPORTED_MODULE_2__.SqlServerDialectConfigManager),
/* harmony export */   "SqliteDialect": () => (/* reexport safe */ _database_exports__WEBPACK_IMPORTED_MODULE_2__.SqliteDialect),
/* harmony export */   "SqliteDialectConfigManager": () => (/* reexport safe */ _database_exports__WEBPACK_IMPORTED_MODULE_2__.SqliteDialectConfigManager),
/* harmony export */   "databaseModelGeneratorConfigManager": () => (/* reexport safe */ _database_exports__WEBPACK_IMPORTED_MODULE_2__.databaseModelGeneratorConfigManager),
/* harmony export */   "mysqlDialectConfigManager": () => (/* reexport safe */ _database_exports__WEBPACK_IMPORTED_MODULE_2__.mysqlDialectConfigManager),
/* harmony export */   "oracleDialectConfigManager": () => (/* reexport safe */ _database_exports__WEBPACK_IMPORTED_MODULE_2__.oracleDialectConfigManager),
/* harmony export */   "postgresqlDialectConfigManager": () => (/* reexport safe */ _database_exports__WEBPACK_IMPORTED_MODULE_2__.postgresqlDialectConfigManager),
/* harmony export */   "sqlServerDialectConfigManager": () => (/* reexport safe */ _database_exports__WEBPACK_IMPORTED_MODULE_2__.sqlServerDialectConfigManager),
/* harmony export */   "sqliteDialectConfigManager": () => (/* reexport safe */ _database_exports__WEBPACK_IMPORTED_MODULE_2__.sqliteDialectConfigManager),
/* harmony export */   "ClassModelGenerator": () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.ClassModelGenerator),
/* harmony export */   "ClassModelGeneratorConfigManager": () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.ClassModelGeneratorConfigManager),
/* harmony export */   "JavaAnnotation": () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.JavaAnnotation),
/* harmony export */   "JavaClassModelGenerator": () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.JavaClassModelGenerator),
/* harmony export */   "JavaClassModelGeneratorConfigManager": () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.JavaClassModelGeneratorConfigManager),
/* harmony export */   "JavaEntityRelationshipModelSourceCodeGenerator": () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.JavaEntityRelationshipModelSourceCodeGenerator),
/* harmony export */   "JavaEntityRelationshipModelSourceCodeGeneratorBuilder": () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.JavaEntityRelationshipModelSourceCodeGeneratorBuilder),
/* harmony export */   "JavaVisibility": () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.JavaVisibility),
/* harmony export */   "JavaxValidationTransformer": () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.JavaxValidationTransformer),
/* harmony export */   "JavaxValidationTransformerConfigManager": () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.JavaxValidationTransformerConfigManager),
/* harmony export */   "JpaTransformer": () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.JpaTransformer),
/* harmony export */   "JpaTransformerBuilder": () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.JpaTransformerBuilder),
/* harmony export */   "JpaTransformerConfigManager": () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.JpaTransformerConfigManager),
/* harmony export */   "NotNullBlobValidationStrategy": () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.NotNullBlobValidationStrategy),
/* harmony export */   "NotNullTextValidationStrategy": () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.NotNullTextValidationStrategy),
/* harmony export */   "TypeScriptClassModelToCodeConverter": () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.TypeScriptClassModelToCodeConverter),
/* harmony export */   "TypeScriptClassModelToCodeConverterConfigManager": () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.TypeScriptClassModelToCodeConverterConfigManager),
/* harmony export */   "TypeScriptEntityRelationshipModelSourceCodeGenerator": () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.TypeScriptEntityRelationshipModelSourceCodeGenerator),
/* harmony export */   "TypeScriptEntityRelationshipModelSourceCodeGeneratorBuilder": () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.TypeScriptEntityRelationshipModelSourceCodeGeneratorBuilder),
/* harmony export */   "classModelGeneratorConfigManager": () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.classModelGeneratorConfigManager),
/* harmony export */   "createJavaArrayType": () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.createJavaArrayType),
/* harmony export */   "createJavaParameterizedType": () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.createJavaParameterizedType),
/* harmony export */   "createJavaSimpleType": () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.createJavaSimpleType),
/* harmony export */   "createTypeScriptArrayType": () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.createTypeScriptArrayType),
/* harmony export */   "createTypeScriptParameterizedType": () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.createTypeScriptParameterizedType),
/* harmony export */   "createTypeScriptSimpleType": () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.createTypeScriptSimpleType),
/* harmony export */   "isJavaParameterizedType": () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.isJavaParameterizedType),
/* harmony export */   "isTypeScriptParameterizedType": () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.isTypeScriptParameterizedType),
/* harmony export */   "javaClassModelGeneratorConfigManager": () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.javaClassModelGeneratorConfigManager),
/* harmony export */   "javaxValidationTransformerConfigManager": () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.javaxValidationTransformerConfigManager),
/* harmony export */   "jpaTransformerConfigManager": () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.jpaTransformerConfigManager),
/* harmony export */   "parseJavaType": () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.parseJavaType),
/* harmony export */   "parseTypeScriptType": () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.parseTypeScriptType),
/* harmony export */   "typescriptClassModelToCodeConverterConfigManager": () => (/* reexport safe */ _oop_exports__WEBPACK_IMPORTED_MODULE_3__.typescriptClassModelToCodeConverterConfigManager),
/* harmony export */   "NomnomlEntityRelationshipModelSourceCodeGenerator": () => (/* reexport safe */ _diagram_exports__WEBPACK_IMPORTED_MODULE_4__.NomnomlEntityRelationshipModelSourceCodeGenerator),
/* harmony export */   "NomnomlEntityRelationshipModelSourceCodeGeneratorConfigManager": () => (/* reexport safe */ _diagram_exports__WEBPACK_IMPORTED_MODULE_4__.NomnomlEntityRelationshipModelSourceCodeGeneratorConfigManager),
/* harmony export */   "PlantUmlEntityRelationshipModelSourceCodeGenerator": () => (/* reexport safe */ _diagram_exports__WEBPACK_IMPORTED_MODULE_4__.PlantUmlEntityRelationshipModelSourceCodeGenerator),
/* harmony export */   "nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager": () => (/* reexport safe */ _diagram_exports__WEBPACK_IMPORTED_MODULE_4__.nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager),
/* harmony export */   "isMultipleFileEntityRelationshipModelSourceCodeGenerator": () => (/* reexport safe */ _erdiagram_converter_MultipleFileEntityRelationshipModelSourceCodeGenerator__WEBPACK_IMPORTED_MODULE_0__.isMultipleFileEntityRelationshipModelSourceCodeGenerator)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_MultipleFileEntityRelationshipModelSourceCodeGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/MultipleFileEntityRelationshipModelSourceCodeGenerator */ "./src/main/erdiagram/converter/MultipleFileEntityRelationshipModelSourceCodeGenerator.ts");
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
/* harmony export */   "JavaAnnotation": () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.JavaAnnotation),
/* harmony export */   "JavaClassModelGenerator": () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.JavaClassModelGenerator),
/* harmony export */   "JavaClassModelGeneratorConfigManager": () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.JavaClassModelGeneratorConfigManager),
/* harmony export */   "JavaEntityRelationshipModelSourceCodeGenerator": () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.JavaEntityRelationshipModelSourceCodeGenerator),
/* harmony export */   "JavaEntityRelationshipModelSourceCodeGeneratorBuilder": () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.JavaEntityRelationshipModelSourceCodeGeneratorBuilder),
/* harmony export */   "JavaVisibility": () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.JavaVisibility),
/* harmony export */   "JavaxValidationTransformer": () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.JavaxValidationTransformer),
/* harmony export */   "JavaxValidationTransformerConfigManager": () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.JavaxValidationTransformerConfigManager),
/* harmony export */   "JpaTransformer": () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.JpaTransformer),
/* harmony export */   "JpaTransformerBuilder": () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.JpaTransformerBuilder),
/* harmony export */   "JpaTransformerConfigManager": () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.JpaTransformerConfigManager),
/* harmony export */   "NotNullBlobValidationStrategy": () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.NotNullBlobValidationStrategy),
/* harmony export */   "NotNullTextValidationStrategy": () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.NotNullTextValidationStrategy),
/* harmony export */   "TypeScriptClassModelToCodeConverter": () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.TypeScriptClassModelToCodeConverter),
/* harmony export */   "TypeScriptClassModelToCodeConverterConfigManager": () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.TypeScriptClassModelToCodeConverterConfigManager),
/* harmony export */   "TypeScriptEntityRelationshipModelSourceCodeGenerator": () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.TypeScriptEntityRelationshipModelSourceCodeGenerator),
/* harmony export */   "TypeScriptEntityRelationshipModelSourceCodeGeneratorBuilder": () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.TypeScriptEntityRelationshipModelSourceCodeGeneratorBuilder),
/* harmony export */   "createJavaArrayType": () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.createJavaArrayType),
/* harmony export */   "createJavaParameterizedType": () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.createJavaParameterizedType),
/* harmony export */   "createJavaSimpleType": () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.createJavaSimpleType),
/* harmony export */   "createTypeScriptArrayType": () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.createTypeScriptArrayType),
/* harmony export */   "createTypeScriptParameterizedType": () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.createTypeScriptParameterizedType),
/* harmony export */   "createTypeScriptSimpleType": () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.createTypeScriptSimpleType),
/* harmony export */   "isJavaParameterizedType": () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.isJavaParameterizedType),
/* harmony export */   "isTypeScriptParameterizedType": () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.isTypeScriptParameterizedType),
/* harmony export */   "javaClassModelGeneratorConfigManager": () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.javaClassModelGeneratorConfigManager),
/* harmony export */   "javaxValidationTransformerConfigManager": () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.javaxValidationTransformerConfigManager),
/* harmony export */   "jpaTransformerConfigManager": () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.jpaTransformerConfigManager),
/* harmony export */   "parseJavaType": () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.parseJavaType),
/* harmony export */   "parseTypeScriptType": () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.parseTypeScriptType),
/* harmony export */   "typescriptClassModelToCodeConverterConfigManager": () => (/* reexport safe */ _source_code_generator_exports__WEBPACK_IMPORTED_MODULE_0__.typescriptClassModelToCodeConverterConfigManager),
/* harmony export */   "ClassModelGenerator": () => (/* reexport safe */ _model_exports__WEBPACK_IMPORTED_MODULE_1__.ClassModelGenerator),
/* harmony export */   "ClassModelGeneratorConfigManager": () => (/* reexport safe */ _model_exports__WEBPACK_IMPORTED_MODULE_1__.ClassModelGeneratorConfigManager),
/* harmony export */   "classModelGeneratorConfigManager": () => (/* reexport safe */ _model_exports__WEBPACK_IMPORTED_MODULE_1__.classModelGeneratorConfigManager)
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
/* harmony import */ var _erdiagram_converter_oop_model_config_ClassModelGeneratorConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/model/config/ClassModelGeneratorConfigManager */ "./src/main/erdiagram/converter/oop/model/config/ClassModelGeneratorConfigManager.ts");
/* harmony import */ var _erdiagram_converter_oop_model_class_EntityToClassMapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/oop/model/class/EntityToClassMapper */ "./src/main/erdiagram/converter/oop/model/class/EntityToClassMapper.ts");


class ClassModelGenerator {
    constructor(config) {
        this.config = _erdiagram_converter_oop_model_config_ClassModelGeneratorConfigManager__WEBPACK_IMPORTED_MODULE_0__.default.mergeWithDefaultConfig(config);
        this.entityToClassMapper = new _erdiagram_converter_oop_model_class_EntityToClassMapper__WEBPACK_IMPORTED_MODULE_1__.default(this.config);
    }
    generateClassModel(model) {
        const { entities, relationships } = model;
        const classes = entities.map(entity => this.entityToClassMapper.mapEntityToClass(entity, relationships));
        return {
            classes
        };
    }
}
;


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
    constructor(config) {
        this.config = config;
        this.entityToIdClassFieldMapper = new _erdiagram_converter_oop_model_class_field_EntityToIdClassFieldMapper__WEBPACK_IMPORTED_MODULE_4__.default(this.config.idNamingStrategy);
        this.entityPropertyToClassFieldMapper = new _erdiagram_converter_oop_model_class_field_EntityPropertyToClassFieldMapper__WEBPACK_IMPORTED_MODULE_3__.default();
        this.relationshipMemberToClassFieldMapper = new _erdiagram_converter_oop_model_class_field_RelationshipMemberToClassFieldMapper__WEBPACK_IMPORTED_MODULE_2__.default();
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
;


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
;


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
;


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

/***/ "./src/main/erdiagram/converter/oop/model/config/ClassModelGeneratorConfigManager.ts":
/*!*******************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/model/config/ClassModelGeneratorConfigManager.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClassModelGeneratorConfigManager": () => (/* binding */ ClassModelGeneratorConfigManager),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/common/config/AbstractComponentConfigManager */ "./src/main/erdiagram/common/config/AbstractComponentConfigManager.ts");
/* harmony import */ var _erdiagram_converter_common_id_naming_strategy_StandardIdNamingStrategies__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/common/id-naming-strategy/StandardIdNamingStrategies */ "./src/main/erdiagram/converter/common/id-naming-strategy/StandardIdNamingStrategies.ts");
/* harmony import */ var true_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! true-json */ "./node_modules/true-json/dist/true-json.umd.js");
/* harmony import */ var true_json__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(true_json__WEBPACK_IMPORTED_MODULE_2__);



class ClassModelGeneratorConfigManager extends _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_0__.default {
    getDefaultConfig() {
        return {
            idNamingStrategy: _erdiagram_converter_common_id_naming_strategy_StandardIdNamingStrategies__WEBPACK_IMPORTED_MODULE_1__.default.DEFAULT
        };
    }
    mergeConfigs(fullConfig, partialConfig) {
        return Object.assign(Object.assign({}, fullConfig), partialConfig);
    }
    getJsonAdapter() {
        return true_json__WEBPACK_IMPORTED_MODULE_2__.JsonAdapters.object({
            idNamingStrategy: true_json__WEBPACK_IMPORTED_MODULE_2__.JsonAdapters.byKeyLenient(_erdiagram_converter_common_id_naming_strategy_StandardIdNamingStrategies__WEBPACK_IMPORTED_MODULE_1__.default, 'DEFAULT')
        });
    }
}
const classModelGeneratorConfigManager = new ClassModelGeneratorConfigManager();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (classModelGeneratorConfigManager);


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/model/config/exports.ts":
/*!******************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/model/config/exports.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClassModelGeneratorConfigManager": () => (/* reexport safe */ _ClassModelGeneratorConfigManager__WEBPACK_IMPORTED_MODULE_0__.ClassModelGeneratorConfigManager),
/* harmony export */   "classModelGeneratorConfigManager": () => (/* reexport safe */ _ClassModelGeneratorConfigManager__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _ClassModelGeneratorConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ClassModelGeneratorConfigManager */ "./src/main/erdiagram/converter/oop/model/config/ClassModelGeneratorConfigManager.ts");




/***/ }),

/***/ "./src/main/erdiagram/converter/oop/model/exports.ts":
/*!***********************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/model/exports.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClassModelGeneratorConfigManager": () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_2__.ClassModelGeneratorConfigManager),
/* harmony export */   "classModelGeneratorConfigManager": () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_2__.classModelGeneratorConfigManager),
/* harmony export */   "ClassModelGenerator": () => (/* reexport safe */ _ClassModelGenerator__WEBPACK_IMPORTED_MODULE_0__.default)
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
/* harmony export */   "SourceType": () => (/* binding */ SourceType)
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
/* harmony export */   "isEntityRelationshipModelSourceMetadata": () => (/* binding */ isEntityRelationshipModelSourceMetadata),
/* harmony export */   "isEntitySourceMetadata": () => (/* binding */ isEntitySourceMetadata),
/* harmony export */   "isEntityIdentitySourceMetadata": () => (/* binding */ isEntityIdentitySourceMetadata),
/* harmony export */   "isEntityPropertySourceMetadata": () => (/* binding */ isEntityPropertySourceMetadata),
/* harmony export */   "isRelationshipSourceMetadata": () => (/* binding */ isRelationshipSourceMetadata),
/* harmony export */   "isRelationshipMemberSourceMetadata": () => (/* binding */ isRelationshipMemberSourceMetadata)
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
/* harmony export */   "JavaAnnotation": () => (/* reexport safe */ _java_exports__WEBPACK_IMPORTED_MODULE_0__.JavaAnnotation),
/* harmony export */   "JavaClassModelGenerator": () => (/* reexport safe */ _java_exports__WEBPACK_IMPORTED_MODULE_0__.JavaClassModelGenerator),
/* harmony export */   "JavaClassModelGeneratorConfigManager": () => (/* reexport safe */ _java_exports__WEBPACK_IMPORTED_MODULE_0__.JavaClassModelGeneratorConfigManager),
/* harmony export */   "JavaEntityRelationshipModelSourceCodeGenerator": () => (/* reexport safe */ _java_exports__WEBPACK_IMPORTED_MODULE_0__.JavaEntityRelationshipModelSourceCodeGenerator),
/* harmony export */   "JavaEntityRelationshipModelSourceCodeGeneratorBuilder": () => (/* reexport safe */ _java_exports__WEBPACK_IMPORTED_MODULE_0__.JavaEntityRelationshipModelSourceCodeGeneratorBuilder),
/* harmony export */   "JavaVisibility": () => (/* reexport safe */ _java_exports__WEBPACK_IMPORTED_MODULE_0__.JavaVisibility),
/* harmony export */   "JavaxValidationTransformer": () => (/* reexport safe */ _java_exports__WEBPACK_IMPORTED_MODULE_0__.JavaxValidationTransformer),
/* harmony export */   "JavaxValidationTransformerConfigManager": () => (/* reexport safe */ _java_exports__WEBPACK_IMPORTED_MODULE_0__.JavaxValidationTransformerConfigManager),
/* harmony export */   "JpaTransformer": () => (/* reexport safe */ _java_exports__WEBPACK_IMPORTED_MODULE_0__.JpaTransformer),
/* harmony export */   "JpaTransformerBuilder": () => (/* reexport safe */ _java_exports__WEBPACK_IMPORTED_MODULE_0__.JpaTransformerBuilder),
/* harmony export */   "JpaTransformerConfigManager": () => (/* reexport safe */ _java_exports__WEBPACK_IMPORTED_MODULE_0__.JpaTransformerConfigManager),
/* harmony export */   "NotNullBlobValidationStrategy": () => (/* reexport safe */ _java_exports__WEBPACK_IMPORTED_MODULE_0__.NotNullBlobValidationStrategy),
/* harmony export */   "NotNullTextValidationStrategy": () => (/* reexport safe */ _java_exports__WEBPACK_IMPORTED_MODULE_0__.NotNullTextValidationStrategy),
/* harmony export */   "createJavaArrayType": () => (/* reexport safe */ _java_exports__WEBPACK_IMPORTED_MODULE_0__.createJavaArrayType),
/* harmony export */   "createJavaParameterizedType": () => (/* reexport safe */ _java_exports__WEBPACK_IMPORTED_MODULE_0__.createJavaParameterizedType),
/* harmony export */   "createJavaSimpleType": () => (/* reexport safe */ _java_exports__WEBPACK_IMPORTED_MODULE_0__.createJavaSimpleType),
/* harmony export */   "isJavaParameterizedType": () => (/* reexport safe */ _java_exports__WEBPACK_IMPORTED_MODULE_0__.isJavaParameterizedType),
/* harmony export */   "javaClassModelGeneratorConfigManager": () => (/* reexport safe */ _java_exports__WEBPACK_IMPORTED_MODULE_0__.javaClassModelGeneratorConfigManager),
/* harmony export */   "javaxValidationTransformerConfigManager": () => (/* reexport safe */ _java_exports__WEBPACK_IMPORTED_MODULE_0__.javaxValidationTransformerConfigManager),
/* harmony export */   "jpaTransformerConfigManager": () => (/* reexport safe */ _java_exports__WEBPACK_IMPORTED_MODULE_0__.jpaTransformerConfigManager),
/* harmony export */   "parseJavaType": () => (/* reexport safe */ _java_exports__WEBPACK_IMPORTED_MODULE_0__.parseJavaType),
/* harmony export */   "TypeScriptClassModelToCodeConverter": () => (/* reexport safe */ _typescript_exports__WEBPACK_IMPORTED_MODULE_1__.TypeScriptClassModelToCodeConverter),
/* harmony export */   "TypeScriptClassModelToCodeConverterConfigManager": () => (/* reexport safe */ _typescript_exports__WEBPACK_IMPORTED_MODULE_1__.TypeScriptClassModelToCodeConverterConfigManager),
/* harmony export */   "TypeScriptEntityRelationshipModelSourceCodeGenerator": () => (/* reexport safe */ _typescript_exports__WEBPACK_IMPORTED_MODULE_1__.TypeScriptEntityRelationshipModelSourceCodeGenerator),
/* harmony export */   "TypeScriptEntityRelationshipModelSourceCodeGeneratorBuilder": () => (/* reexport safe */ _typescript_exports__WEBPACK_IMPORTED_MODULE_1__.TypeScriptEntityRelationshipModelSourceCodeGeneratorBuilder),
/* harmony export */   "createTypeScriptArrayType": () => (/* reexport safe */ _typescript_exports__WEBPACK_IMPORTED_MODULE_1__.createTypeScriptArrayType),
/* harmony export */   "createTypeScriptParameterizedType": () => (/* reexport safe */ _typescript_exports__WEBPACK_IMPORTED_MODULE_1__.createTypeScriptParameterizedType),
/* harmony export */   "createTypeScriptSimpleType": () => (/* reexport safe */ _typescript_exports__WEBPACK_IMPORTED_MODULE_1__.createTypeScriptSimpleType),
/* harmony export */   "isTypeScriptParameterizedType": () => (/* reexport safe */ _typescript_exports__WEBPACK_IMPORTED_MODULE_1__.isTypeScriptParameterizedType),
/* harmony export */   "parseTypeScriptType": () => (/* reexport safe */ _typescript_exports__WEBPACK_IMPORTED_MODULE_1__.parseTypeScriptType),
/* harmony export */   "typescriptClassModelToCodeConverterConfigManager": () => (/* reexport safe */ _typescript_exports__WEBPACK_IMPORTED_MODULE_1__.typescriptClassModelToCodeConverterConfigManager)
/* harmony export */ });
/* harmony import */ var _java_exports__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./java/exports */ "./src/main/erdiagram/converter/oop/source-code-generator/java/exports.ts");
/* harmony import */ var _typescript_exports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./typescript/exports */ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/exports.ts");




/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/JavaEntityRelationshipModelSourceCodeGenerator.ts":
/*!***********************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/JavaEntityRelationshipModelSourceCodeGenerator.ts ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ JavaEntityRelationshipModelSourceCodeGenerator)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_model_transformer_ApplyTransformersCommand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/model/transformer/ApplyTransformersCommand */ "./src/main/erdiagram/converter/oop/source-code-generator/java/model/transformer/ApplyTransformersCommand.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_JavaEntityRelationshipModelSourceCodeGeneratorBuilder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/JavaEntityRelationshipModelSourceCodeGeneratorBuilder */ "./src/main/erdiagram/converter/oop/source-code-generator/java/JavaEntityRelationshipModelSourceCodeGeneratorBuilder.ts");
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _classModelGenerator, _javaClassModelGenerator, _javaClassModelTransformers, _javaClassModelCodeGenerator, _javaClassModelSourceFilesGenerator;


class JavaEntityRelationshipModelSourceCodeGenerator {
    constructor(classModelGenerator, javaClassModelGenerator, javaClassModelTransformers, javaClassModelCodeGenerator, javaClassModelSourceFilesGenerator) {
        _classModelGenerator.set(this, void 0);
        _javaClassModelGenerator.set(this, void 0);
        _javaClassModelTransformers.set(this, void 0);
        _javaClassModelCodeGenerator.set(this, void 0);
        _javaClassModelSourceFilesGenerator.set(this, void 0);
        __classPrivateFieldSet(this, _classModelGenerator, classModelGenerator);
        __classPrivateFieldSet(this, _javaClassModelGenerator, javaClassModelGenerator);
        __classPrivateFieldSet(this, _javaClassModelTransformers, javaClassModelTransformers);
        __classPrivateFieldSet(this, _javaClassModelCodeGenerator, javaClassModelCodeGenerator);
        __classPrivateFieldSet(this, _javaClassModelSourceFilesGenerator, javaClassModelSourceFilesGenerator);
    }
    generateSourceCode(entityRelationshipModel) {
        const javaClassModel = this.getJavaClassModel(entityRelationshipModel);
        return __classPrivateFieldGet(this, _javaClassModelCodeGenerator).generateCode(javaClassModel);
    }
    generateSourceFiles(entityRelationshipModel) {
        const javaClassModel = this.getJavaClassModel(entityRelationshipModel);
        return __classPrivateFieldGet(this, _javaClassModelSourceFilesGenerator).generateSourceFiles(javaClassModel);
    }
    getJavaClassModel(entityRelationshipModel) {
        const classModel = __classPrivateFieldGet(this, _classModelGenerator).generateClassModel(entityRelationshipModel);
        const { javaClassModel, javaClassModelDescriptorsRepository } = __classPrivateFieldGet(this, _javaClassModelGenerator).generateJavaClassModel(classModel);
        // FIXME too much dependencies?
        const applyTransformersCommandContext = {
            entityRelationshipModel,
            classModel,
            javaClassModel
        };
        new _erdiagram_converter_oop_source_code_generator_java_model_transformer_ApplyTransformersCommand__WEBPACK_IMPORTED_MODULE_0__.default(applyTransformersCommandContext, javaClassModelDescriptorsRepository, __classPrivateFieldGet(this, _javaClassModelTransformers)).execute();
        return javaClassModel;
    }
    static withDefaultConfig() {
        return this.builder().build();
    }
    static builder() {
        return new _erdiagram_converter_oop_source_code_generator_java_JavaEntityRelationshipModelSourceCodeGeneratorBuilder__WEBPACK_IMPORTED_MODULE_1__.default();
    }
}
_classModelGenerator = new WeakMap(), _javaClassModelGenerator = new WeakMap(), _javaClassModelTransformers = new WeakMap(), _javaClassModelCodeGenerator = new WeakMap(), _javaClassModelSourceFilesGenerator = new WeakMap();


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/JavaEntityRelationshipModelSourceCodeGeneratorBuilder.ts":
/*!******************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/JavaEntityRelationshipModelSourceCodeGeneratorBuilder.ts ***!
  \******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ JavaEntityRelationshipModelSourceCodeGeneratorBuilder)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_oop_model_ClassModelGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/model/ClassModelGenerator */ "./src/main/erdiagram/converter/oop/model/ClassModelGenerator.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_model_generator_JavaClassModelGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/model/generator/JavaClassModelGenerator */ "./src/main/erdiagram/converter/oop/source-code-generator/java/model/generator/JavaClassModelGenerator.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_JavaEntityRelationshipModelSourceCodeGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/JavaEntityRelationshipModelSourceCodeGenerator */ "./src/main/erdiagram/converter/oop/source-code-generator/java/JavaEntityRelationshipModelSourceCodeGenerator.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_code_JavaClassModelCodeGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/code/JavaClassModelCodeGenerator */ "./src/main/erdiagram/converter/oop/source-code-generator/java/code/JavaClassModelCodeGenerator.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_code_JavaClassCodeGenerator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/code/JavaClassCodeGenerator */ "./src/main/erdiagram/converter/oop/source-code-generator/java/code/JavaClassCodeGenerator.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_code_JavaClassModelSourceFilesGenerator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/code/JavaClassModelSourceFilesGenerator */ "./src/main/erdiagram/converter/oop/source-code-generator/java/code/JavaClassModelSourceFilesGenerator.ts");
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _classModelGeneratorConfig, _javaClassModelGeneratorConfig, _javaClassModelTransformers;






class JavaEntityRelationshipModelSourceCodeGeneratorBuilder {
    constructor() {
        _classModelGeneratorConfig.set(this, {});
        _javaClassModelGeneratorConfig.set(this, {});
        _javaClassModelTransformers.set(this, []);
    }
    withClassModelGeneratorConfig(config) {
        __classPrivateFieldSet(this, _classModelGeneratorConfig, config);
        return this;
    }
    withJavaClassModelGeneratorConfig(config) {
        __classPrivateFieldSet(this, _javaClassModelGeneratorConfig, config);
        return this;
    }
    addJavaClassModelTransformers(...javaClassModelTransformers) {
        __classPrivateFieldGet(this, _javaClassModelTransformers).push(...javaClassModelTransformers);
        return this;
    }
    build() {
        const classModelGenerator = new _erdiagram_converter_oop_model_ClassModelGenerator__WEBPACK_IMPORTED_MODULE_0__.default(__classPrivateFieldGet(this, _classModelGeneratorConfig));
        const javaClassModelGenerator = new _erdiagram_converter_oop_source_code_generator_java_model_generator_JavaClassModelGenerator__WEBPACK_IMPORTED_MODULE_1__.default(__classPrivateFieldGet(this, _javaClassModelGeneratorConfig));
        const javaClassCodeGenerator = new _erdiagram_converter_oop_source_code_generator_java_code_JavaClassCodeGenerator__WEBPACK_IMPORTED_MODULE_4__.default();
        const javaClassModelCodeGenerator = new _erdiagram_converter_oop_source_code_generator_java_code_JavaClassModelCodeGenerator__WEBPACK_IMPORTED_MODULE_3__.default(javaClassCodeGenerator);
        const javaClassModelSourceFilesGenerator = new _erdiagram_converter_oop_source_code_generator_java_code_JavaClassModelSourceFilesGenerator__WEBPACK_IMPORTED_MODULE_5__.default(javaClassCodeGenerator);
        return new _erdiagram_converter_oop_source_code_generator_java_JavaEntityRelationshipModelSourceCodeGenerator__WEBPACK_IMPORTED_MODULE_2__.default(classModelGenerator, javaClassModelGenerator, [...__classPrivateFieldGet(this, _javaClassModelTransformers)], javaClassModelCodeGenerator, javaClassModelSourceFilesGenerator);
    }
}
_classModelGeneratorConfig = new WeakMap(), _javaClassModelGeneratorConfig = new WeakMap(), _javaClassModelTransformers = new WeakMap();


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
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _type, _parameters;


class JavaAnnotation {
    constructor(annotationType, parameters = {}) {
        _type.set(this, void 0);
        _parameters.set(this, void 0);
        __classPrivateFieldSet(this, _type, annotationType);
        __classPrivateFieldSet(this, _parameters, parameters);
    }
    get type() {
        return __classPrivateFieldGet(this, _type);
    }
    get parameters() {
        return __classPrivateFieldGet(this, _parameters);
    }
    format() {
        return (0,_erdiagram_converter_oop_source_code_generator_java_annotation_utils_formatJavaAnnotation__WEBPACK_IMPORTED_MODULE_0__.default)(this);
    }
}
_type = new WeakMap(), _parameters = new WeakMap();
JavaAnnotation.createRawParameterValue = _erdiagram_converter_oop_source_code_generator_java_annotation_utils_RawAnnotationParameterValue__WEBPACK_IMPORTED_MODULE_1__.createRawParameterValue;
JavaAnnotation.isRawParameterValue = _erdiagram_converter_oop_source_code_generator_java_annotation_utils_RawAnnotationParameterValue__WEBPACK_IMPORTED_MODULE_1__.isRawParameterValue;


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
/* harmony export */   "JavaAnnotation": () => (/* reexport safe */ _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__.default)
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
/* harmony export */   "createRawParameterValue": () => (/* binding */ createRawParameterValue),
/* harmony export */   "isRawParameterValue": () => (/* binding */ isRawParameterValue)
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
    const formattedParams = annotationParamsEntries.map(([paramName, paramValue]) => `${paramName} = ${(formatAnnotationParameterValue(paramValue))}`);
    return `(${formattedParams.join(', ')})`;
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
            if (_erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__.default.isRawParameterValue(value)) {
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
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_model_java_class_model_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types */ "./src/main/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_type_import_JavaClassUsedTypesCompiler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/type/import/JavaClassUsedTypesCompiler */ "./src/main/erdiagram/converter/oop/source-code-generator/java/type/import/JavaClassUsedTypesCompiler.ts");
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _javaUsedTypesCompiler;




const EMPTY_STRING = '';
class JavaClassCodeGenerator {
    constructor() {
        _javaUsedTypesCompiler.set(this, void 0);
        __classPrivateFieldSet(this, _javaUsedTypesCompiler, new _erdiagram_converter_oop_source_code_generator_java_type_import_JavaClassUsedTypesCompiler__WEBPACK_IMPORTED_MODULE_3__.default());
    }
    generateCode(javaClass) {
        const fieldsLines = [];
        const methodsLines = [];
        for (const javaField of javaClass.fields) {
            const { fieldLines, getterLines, setterLines } = this.createField(javaField);
            fieldsLines.push(...fieldLines);
            methodsLines.push(...getterLines, ...setterLines);
        }
        const classOuterLines = [];
        if (javaClass.packageName) {
            classOuterLines.push(`package ${javaClass.packageName};`, EMPTY_STRING);
        }
        const importLines = this.generateImportLines(javaClass);
        if (importLines.length > 0) {
            classOuterLines.push(...importLines, EMPTY_STRING);
        }
        classOuterLines.push(...this.getAnnotationsLines(javaClass.annotations), this.prependVisibility(`class ${javaClass.name} {`, javaClass.visibility), EMPTY_STRING);
        if (fieldsLines.length > 0) {
            classOuterLines.push(...(0,_erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_0__.indentLines)(fieldsLines), EMPTY_STRING);
        }
        if (methodsLines.length > 0) {
            classOuterLines.push(...(0,_erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_0__.indentLines)(methodsLines));
        }
        classOuterLines.push(`}`);
        return classOuterLines.join('\n');
    }
    // TODO move the field generator to a separate class
    createField(javaField) {
        const fieldLines = [];
        const fieldName = javaField.name;
        const formattedJavaType = javaField.type.formatSimple();
        fieldLines.push(...this.getAnnotationsLines(javaField.annotations));
        fieldLines.push(this.prependVisibility(`${formattedJavaType} ${fieldName};`, javaField.visibility));
        const getterLines = this.createGetterLines(fieldName, formattedJavaType, javaField.getter);
        const setterLines = this.createSetterLines(fieldName, formattedJavaType, javaField.setter);
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
            ...this.getAnnotationsLines(getter.annotations),
            this.prependVisibility(`${formattedJavaType} ${getter.name}() {`, getter.visibility),
            (0,_erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_0__.indentLine)(`return ${fieldName};`),
            '}',
            EMPTY_STRING
        ];
    }
    createSetterLines(fieldName, formattedJavaType, setter) {
        if (setter == null) {
            return [];
        }
        return [
            ...this.getAnnotationsLines(setter.annotations),
            this.prependVisibility(`void ${setter.name}(${formattedJavaType} ${fieldName}) {`, setter.visibility),
            (0,_erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_0__.indentLine)(`this.${fieldName} = ${fieldName};`),
            '}',
            EMPTY_STRING
        ];
    }
    getAnnotationsLines(annotations) {
        return annotations.map(annotation => annotation.format());
    }
    prependVisibility(text, visibility) {
        if (visibility === _erdiagram_converter_oop_source_code_generator_java_model_java_class_model_types__WEBPACK_IMPORTED_MODULE_2__.JavaVisibility.PACKAGE_PRIVATE) {
            return text;
        }
        return visibility + ' ' + text;
    }
    generateImportLines(javaClass) {
        const usedTypes = __classPrivateFieldGet(this, _javaUsedTypesCompiler).getUsedTypes(javaClass);
        const javaImportStatementsGenerator = new _erdiagram_converter_oop_source_code_generator_java_type_import_JavaImportStatementsGenerator__WEBPACK_IMPORTED_MODULE_1__.default(javaClass.packageName);
        return javaImportStatementsGenerator.generateImportStatements(usedTypes);
    }
}
_javaUsedTypesCompiler = new WeakMap();


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
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _javaClassCodeGenerator;
class JavaClassModelCodeGenerator {
    constructor(javaClassCodeGenerator) {
        _javaClassCodeGenerator.set(this, void 0);
        __classPrivateFieldSet(this, _javaClassCodeGenerator, javaClassCodeGenerator);
    }
    generateCode(javaClassModel) {
        return javaClassModel.classes
            .map(javaClass => this.generateClassCode(javaClass))
            .join('\n\n');
    }
    generateClassCode(javaClass) {
        const headerComment = this.generateClassHeaderComment(javaClass);
        const classCode = __classPrivateFieldGet(this, _javaClassCodeGenerator).generateCode(javaClass);
        return `${headerComment}\n\n${classCode}`;
    }
    generateClassHeaderComment(javaClass) {
        return `/* ========== ${javaClass.name} class ========== */`;
    }
}
_javaClassCodeGenerator = new WeakMap();


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
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _javaClassCodeGenerator;
class JavaClassModelSourceFilesGenerator {
    constructor(javaClassCodeGenerator) {
        _javaClassCodeGenerator.set(this, void 0);
        __classPrivateFieldSet(this, _javaClassCodeGenerator, javaClassCodeGenerator);
    }
    generateSourceFiles(javaClassModel) {
        return javaClassModel.classes.map(javaClass => this.generateClassSourceFile(javaClass));
    }
    generateClassSourceFile(javaClass) {
        return {
            folder: this.generateClassSourceFileFolder(javaClass),
            filename: this.generateClassSourceFileName(javaClass),
            contents: __classPrivateFieldGet(this, _javaClassCodeGenerator).generateCode(javaClass)
        };
    }
    generateClassSourceFileFolder(javaClass) {
        var _a, _b;
        return (_b = (_a = javaClass.packageName) === null || _a === void 0 ? void 0 : _a.split('.')) !== null && _b !== void 0 ? _b : [];
    }
    generateClassSourceFileName(javaClass) {
        return `${javaClass.name}.java`;
    }
}
_javaClassCodeGenerator = new WeakMap();


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/exports.ts":
/*!********************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/exports.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JavaAnnotation": () => (/* reexport safe */ _annotation_exports__WEBPACK_IMPORTED_MODULE_2__.JavaAnnotation),
/* harmony export */   "JavaClassModelGenerator": () => (/* reexport safe */ _model_exports__WEBPACK_IMPORTED_MODULE_3__.JavaClassModelGenerator),
/* harmony export */   "JavaClassModelGeneratorConfigManager": () => (/* reexport safe */ _model_exports__WEBPACK_IMPORTED_MODULE_3__.JavaClassModelGeneratorConfigManager),
/* harmony export */   "JavaVisibility": () => (/* reexport safe */ _model_exports__WEBPACK_IMPORTED_MODULE_3__.JavaVisibility),
/* harmony export */   "javaClassModelGeneratorConfigManager": () => (/* reexport safe */ _model_exports__WEBPACK_IMPORTED_MODULE_3__.javaClassModelGeneratorConfigManager),
/* harmony export */   "JpaTransformer": () => (/* reexport safe */ _jpa_exports__WEBPACK_IMPORTED_MODULE_4__.JpaTransformer),
/* harmony export */   "JpaTransformerBuilder": () => (/* reexport safe */ _jpa_exports__WEBPACK_IMPORTED_MODULE_4__.JpaTransformerBuilder),
/* harmony export */   "JpaTransformerConfigManager": () => (/* reexport safe */ _jpa_exports__WEBPACK_IMPORTED_MODULE_4__.JpaTransformerConfigManager),
/* harmony export */   "jpaTransformerConfigManager": () => (/* reexport safe */ _jpa_exports__WEBPACK_IMPORTED_MODULE_4__.jpaTransformerConfigManager),
/* harmony export */   "JavaxValidationTransformer": () => (/* reexport safe */ _validation_exports__WEBPACK_IMPORTED_MODULE_5__.JavaxValidationTransformer),
/* harmony export */   "JavaxValidationTransformerConfigManager": () => (/* reexport safe */ _validation_exports__WEBPACK_IMPORTED_MODULE_5__.JavaxValidationTransformerConfigManager),
/* harmony export */   "NotNullBlobValidationStrategy": () => (/* reexport safe */ _validation_exports__WEBPACK_IMPORTED_MODULE_5__.NotNullBlobValidationStrategy),
/* harmony export */   "NotNullTextValidationStrategy": () => (/* reexport safe */ _validation_exports__WEBPACK_IMPORTED_MODULE_5__.NotNullTextValidationStrategy),
/* harmony export */   "javaxValidationTransformerConfigManager": () => (/* reexport safe */ _validation_exports__WEBPACK_IMPORTED_MODULE_5__.javaxValidationTransformerConfigManager),
/* harmony export */   "createJavaArrayType": () => (/* reexport safe */ _type_exports__WEBPACK_IMPORTED_MODULE_6__.createJavaArrayType),
/* harmony export */   "createJavaParameterizedType": () => (/* reexport safe */ _type_exports__WEBPACK_IMPORTED_MODULE_6__.createJavaParameterizedType),
/* harmony export */   "createJavaSimpleType": () => (/* reexport safe */ _type_exports__WEBPACK_IMPORTED_MODULE_6__.createJavaSimpleType),
/* harmony export */   "isJavaParameterizedType": () => (/* reexport safe */ _type_exports__WEBPACK_IMPORTED_MODULE_6__.isJavaParameterizedType),
/* harmony export */   "parseJavaType": () => (/* reexport safe */ _type_exports__WEBPACK_IMPORTED_MODULE_6__.parseJavaType),
/* harmony export */   "JavaEntityRelationshipModelSourceCodeGenerator": () => (/* reexport safe */ _JavaEntityRelationshipModelSourceCodeGenerator__WEBPACK_IMPORTED_MODULE_0__.default),
/* harmony export */   "JavaEntityRelationshipModelSourceCodeGeneratorBuilder": () => (/* reexport safe */ _JavaEntityRelationshipModelSourceCodeGeneratorBuilder__WEBPACK_IMPORTED_MODULE_1__.default)
/* harmony export */ });
/* harmony import */ var _JavaEntityRelationshipModelSourceCodeGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./JavaEntityRelationshipModelSourceCodeGenerator */ "./src/main/erdiagram/converter/oop/source-code-generator/java/JavaEntityRelationshipModelSourceCodeGenerator.ts");
/* harmony import */ var _JavaEntityRelationshipModelSourceCodeGeneratorBuilder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./JavaEntityRelationshipModelSourceCodeGeneratorBuilder */ "./src/main/erdiagram/converter/oop/source-code-generator/java/JavaEntityRelationshipModelSourceCodeGeneratorBuilder.ts");
/* harmony import */ var _annotation_exports__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./annotation/exports */ "./src/main/erdiagram/converter/oop/source-code-generator/java/annotation/exports.ts");
/* harmony import */ var _model_exports__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./model/exports */ "./src/main/erdiagram/converter/oop/source-code-generator/java/model/exports.ts");
/* harmony import */ var _jpa_exports__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./jpa/exports */ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/exports.ts");
/* harmony import */ var _validation_exports__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./validation/exports */ "./src/main/erdiagram/converter/oop/source-code-generator/java/validation/exports.ts");
/* harmony import */ var _type_exports__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./type/exports */ "./src/main/erdiagram/converter/oop/source-code-generator/java/type/exports.ts");










/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/config/JpaTransformerConfigManager.ts":
/*!***************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/config/JpaTransformerConfigManager.ts ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JpaTransformerConfigManager": () => (/* binding */ JpaTransformerConfigManager),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/common/config/AbstractComponentConfigManager */ "./src/main/erdiagram/common/config/AbstractComponentConfigManager.ts");
/* harmony import */ var true_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! true-json */ "./node_modules/true-json/dist/true-json.umd.js");
/* harmony import */ var true_json__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(true_json__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/common/case-format/StandardCaseFormats */ "./src/main/erdiagram/converter/common/case-format/StandardCaseFormats.ts");



class JpaTransformerConfigManager extends _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_0__.default {
    getDefaultConfig() {
        return {
            tableNameCaseFormat: _erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_2__.default.UPPER_CAMEL,
            columnNameCaseFormat: _erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_2__.default.LOWER_CAMEL,
            annotateGetters: false
        };
    }
    mergeConfigs(fullConfig, partialConfig) {
        return Object.assign(Object.assign({}, fullConfig), partialConfig);
    }
    getJsonAdapter() {
        return true_json__WEBPACK_IMPORTED_MODULE_1__.JsonAdapters.object({
            tableNameCaseFormat: true_json__WEBPACK_IMPORTED_MODULE_1__.JsonAdapters.byKeyLenient(_erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_2__.default, 'UPPER_CAMEL'),
            columnNameCaseFormat: true_json__WEBPACK_IMPORTED_MODULE_1__.JsonAdapters.byKeyLenient(_erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_2__.default, 'LOWER_CAMEL')
        });
    }
}
const jpaTransformerConfigManager = new JpaTransformerConfigManager();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (jpaTransformerConfigManager);


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/config/exports.ts":
/*!*******************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/config/exports.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JpaTransformerConfigManager": () => (/* reexport safe */ _JpaTransformerConfigManager__WEBPACK_IMPORTED_MODULE_0__.JpaTransformerConfigManager),
/* harmony export */   "jpaTransformerConfigManager": () => (/* reexport safe */ _JpaTransformerConfigManager__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _JpaTransformerConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./JpaTransformerConfigManager */ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/config/JpaTransformerConfigManager.ts");




/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/exports.ts":
/*!************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/exports.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JpaTransformerConfigManager": () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_0__.JpaTransformerConfigManager),
/* harmony export */   "jpaTransformerConfigManager": () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_0__.jpaTransformerConfigManager),
/* harmony export */   "JpaTransformer": () => (/* reexport safe */ _transformer_exports__WEBPACK_IMPORTED_MODULE_1__.JpaTransformer),
/* harmony export */   "JpaTransformerBuilder": () => (/* reexport safe */ _transformer_exports__WEBPACK_IMPORTED_MODULE_1__.JpaTransformerBuilder)
/* harmony export */ });
/* harmony import */ var _config_exports__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config/exports */ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/config/exports.ts");
/* harmony import */ var _transformer_exports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transformer/exports */ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/exports.ts");




/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/jpa-java-types.ts":
/*!*******************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/jpa-java-types.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JpaAnnotationTypes": () => (/* binding */ JpaAnnotationTypes),
/* harmony export */   "JpaEnumTypes": () => (/* binding */ JpaEnumTypes)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/type/simple/createJavaSimpleType */ "./src/main/erdiagram/converter/oop/source-code-generator/java/type/simple/createJavaSimpleType.ts");

const JPA_PACKAGE = 'javax.persistence';
const JpaAnnotationTypes = {
    Entity: (0,_erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__.default)('Entity', JPA_PACKAGE),
    Table: (0,_erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__.default)('Table', JPA_PACKAGE),
    Column: (0,_erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__.default)('Column', JPA_PACKAGE),
    Id: (0,_erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__.default)('Id', JPA_PACKAGE),
    GeneratedValue: (0,_erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__.default)('GeneratedValue', JPA_PACKAGE),
    OneToOne: (0,_erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__.default)('OneToOne', JPA_PACKAGE),
    OneToMany: (0,_erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__.default)('OneToMany', JPA_PACKAGE),
    ManyToOne: (0,_erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__.default)('ManyToOne', JPA_PACKAGE),
    ManyToMany: (0,_erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__.default)('ManyToMany', JPA_PACKAGE),
    JoinTable: (0,_erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__.default)('JoinTable', JPA_PACKAGE),
    JoinColumn: (0,_erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__.default)('JoinColumn', JPA_PACKAGE),
    JoinColumns: (0,_erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__.default)('JoinColumns', JPA_PACKAGE),
};
const JpaEnumTypes = {
    GenerationType: (0,_erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__.default)('GenerationType', JPA_PACKAGE),
};


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/JpaTransformer.ts":
/*!*******************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/JpaTransformer.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JpaTransformer": () => (/* binding */ JpaTransformer)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_jpa_config_JpaTransformerConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/jpa/config/JpaTransformerConfigManager */ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/config/JpaTransformerConfigManager.ts");
/* harmony import */ var _erdiagram_converter_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/common/case-format/CaseConverter */ "./src/main/erdiagram/converter/common/case-format/CaseConverter.ts");
/* harmony import */ var _erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/common/case-format/StandardCaseFormats */ "./src/main/erdiagram/converter/common/case-format/StandardCaseFormats.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_jpa_transformer_visitor_field_JpaTransformerFieldVisitor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/visitor/field/JpaTransformerFieldVisitor */ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/visitor/field/JpaTransformerFieldVisitor.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_jpa_transformer_visitor_class_JpaTransformerClassVisitor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/visitor/class/JpaTransformerClassVisitor */ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/visitor/class/JpaTransformerClassVisitor.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_jpa_transformer_setup_JpaTransformerSetupDataGenerator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/setup/JpaTransformerSetupDataGenerator */ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/setup/JpaTransformerSetupDataGenerator.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_jpa_transformer_JpaTransformerBuilder__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/JpaTransformerBuilder */ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/JpaTransformerBuilder.ts");
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _setupDataGenerator, _fieldVisitor, _classVisitor;







class JpaTransformer {
    constructor(databaseModelGenerator, config) {
        _setupDataGenerator.set(this, void 0);
        _fieldVisitor.set(this, void 0);
        _classVisitor.set(this, void 0);
        const { tableNameCaseFormat, columnNameCaseFormat, annotateGetters } = _erdiagram_converter_oop_source_code_generator_java_jpa_config_JpaTransformerConfigManager__WEBPACK_IMPORTED_MODULE_0__.default.mergeWithDefaultConfig(config);
        const tableNameCaseConverter = new _erdiagram_converter_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_1__.default(_erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_2__.default.UPPER_CAMEL, tableNameCaseFormat);
        const columnNameCaseConverter = new _erdiagram_converter_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_1__.default(_erdiagram_converter_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_2__.default.UPPER_CAMEL, columnNameCaseFormat);
        __classPrivateFieldSet(this, _setupDataGenerator, new _erdiagram_converter_oop_source_code_generator_java_jpa_transformer_setup_JpaTransformerSetupDataGenerator__WEBPACK_IMPORTED_MODULE_5__.default(databaseModelGenerator));
        __classPrivateFieldSet(this, _fieldVisitor, new _erdiagram_converter_oop_source_code_generator_java_jpa_transformer_visitor_field_JpaTransformerFieldVisitor__WEBPACK_IMPORTED_MODULE_3__.default(tableNameCaseConverter, columnNameCaseConverter, annotateGetters));
        __classPrivateFieldSet(this, _classVisitor, new _erdiagram_converter_oop_source_code_generator_java_jpa_transformer_visitor_class_JpaTransformerClassVisitor__WEBPACK_IMPORTED_MODULE_4__.default(tableNameCaseConverter));
    }
    setup(context) {
        return __classPrivateFieldGet(this, _setupDataGenerator).setup(context);
    }
    visitField(javaField, context) {
        __classPrivateFieldGet(this, _fieldVisitor).visitField(javaField, context);
    }
    visitClass(javaClass, context) {
        __classPrivateFieldGet(this, _classVisitor).visitClass(javaClass, context);
    }
    visitModel(javaClassModel, context) {
        // Do nothing
    }
    static withDefaultConfig() {
        return this.builder().build();
    }
    static builder() {
        return new _erdiagram_converter_oop_source_code_generator_java_jpa_transformer_JpaTransformerBuilder__WEBPACK_IMPORTED_MODULE_6__.default();
    }
}
_setupDataGenerator = new WeakMap(), _fieldVisitor = new WeakMap(), _classVisitor = new WeakMap();


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
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _databaseModelGeneratorConfig, _config;


class JpaTransformerBuilder {
    constructor() {
        _databaseModelGeneratorConfig.set(this, {});
        _config.set(this, {});
    }
    withDatabaseModelGeneratorConfig(config) {
        __classPrivateFieldSet(this, _databaseModelGeneratorConfig, config);
        return this;
    }
    withConfig(config) {
        __classPrivateFieldSet(this, _config, config);
        return this;
    }
    build() {
        return new _erdiagram_converter_oop_source_code_generator_java_jpa_transformer_JpaTransformer__WEBPACK_IMPORTED_MODULE_1__.JpaTransformer(new _erdiagram_converter_database_model_DatabaseModelGenerator__WEBPACK_IMPORTED_MODULE_0__.default(__classPrivateFieldGet(this, _databaseModelGeneratorConfig)), __classPrivateFieldGet(this, _config));
    }
}
_databaseModelGeneratorConfig = new WeakMap(), _config = new WeakMap();


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/exports.ts":
/*!************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/exports.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JpaTransformer": () => (/* reexport safe */ _JpaTransformer__WEBPACK_IMPORTED_MODULE_0__.JpaTransformer),
/* harmony export */   "JpaTransformerBuilder": () => (/* reexport safe */ _JpaTransformerBuilder__WEBPACK_IMPORTED_MODULE_1__.default)
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
            for (const field of classDescriptor.fields) {
                if ((0,_erdiagram_converter_oop_model_source_metadata_source_metadata_utils__WEBPACK_IMPORTED_MODULE_0__.isRelationshipMemberSourceMetadata)(field.sourceMetadata) && field.sourceMetadata.referencedMember === referencedMember) {
                    return {
                        classDescriptor,
                        field
                    };
                }
            }
        }
        throw new Error(`Cannot find field from target member "${referencedMember.entityAlias}"`);
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/finder/EntityRelationshipModelSourceFinder.ts":
/*!***********************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/finder/EntityRelationshipModelSourceFinder.ts ***!
  \***********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EntityRelationshipModelSourceFinder)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_oop_model_source_metadata_source_metadata_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/model/source-metadata/source-metadata-utils */ "./src/main/erdiagram/converter/oop/model/source-metadata/source-metadata-utils.ts");

// FIXME change this name or refactor this class, as it also retrieves field and class descriptors, not only database ones
class EntityRelationshipModelSourceFinder {
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
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _databaseModelGenerator;
class JpaTransformerSetupDataGenerator {
    constructor(databaseModelGenerator) {
        _databaseModelGenerator.set(this, void 0);
        __classPrivateFieldSet(this, _databaseModelGenerator, databaseModelGenerator);
    }
    setup(context) {
        return {
            databaseModel: __classPrivateFieldGet(this, _databaseModelGenerator).generateDatabaseModel(context.entityRelationshipModel)
        };
    }
}
_databaseModelGenerator = new WeakMap();


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
/* harmony import */ var _erdiagram_converter_oop_model_source_metadata_source_metadata_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/oop/model/source-metadata/source-metadata-utils */ "./src/main/erdiagram/converter/oop/model/source-metadata/source-metadata-utils.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_jpa_jpa_java_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/jpa/jpa-java-types */ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/jpa-java-types.ts");
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _tableNameCaseConverter;



class JpaTransformerClassVisitor {
    constructor(tableNameCaseConverter) {
        _tableNameCaseConverter.set(this, void 0);
        __classPrivateFieldSet(this, _tableNameCaseConverter, tableNameCaseConverter);
    }
    visitClass(javaClass, context) {
        const table = this.findTableFromEntity(context.classDescriptor.sourceMetadata.entity, context.setupData.databaseModel);
        javaClass.annotations.push(new _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__.default(_erdiagram_converter_oop_source_code_generator_java_jpa_jpa_java_types__WEBPACK_IMPORTED_MODULE_2__.JpaAnnotationTypes.Entity), new _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__.default(_erdiagram_converter_oop_source_code_generator_java_jpa_jpa_java_types__WEBPACK_IMPORTED_MODULE_2__.JpaAnnotationTypes.Table, {
            name: this.formatTableName(table.name)
        }));
    }
    findTableFromEntity(entity, databaseModel) {
        const foundTable = databaseModel.tables.find(table => this.isCorrespondingTable(entity, table));
        if (foundTable == null) {
            throw new Error(`Cannot find the corresponding table for entity "${entity.name}"`);
        }
        return foundTable;
    }
    isCorrespondingTable(entity, tableDescriptor) {
        return (0,_erdiagram_converter_oop_model_source_metadata_source_metadata_utils__WEBPACK_IMPORTED_MODULE_1__.isEntitySourceMetadata)(tableDescriptor.sourceMetadata) && tableDescriptor.sourceMetadata.entity === entity;
    }
    formatTableName(tableName) {
        return __classPrivateFieldGet(this, _tableNameCaseConverter).convertCase(tableName);
    }
}
_tableNameCaseConverter = new WeakMap();


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
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_jpa_jpa_java_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/jpa/jpa-java-types */ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/jpa-java-types.ts");
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _entityRelationshipModelSourceFinder, _columnNameCaseConverter;



class ColumnFieldAnnotationsSupplier {
    constructor(entityRelationshipModelSourceFinder, columnNameCaseConverter) {
        _entityRelationshipModelSourceFinder.set(this, void 0);
        _columnNameCaseConverter.set(this, void 0);
        __classPrivateFieldSet(this, _entityRelationshipModelSourceFinder, entityRelationshipModelSourceFinder);
        __classPrivateFieldSet(this, _columnNameCaseConverter, columnNameCaseConverter);
    }
    getAnnotations(javaField, context) {
        const columnAnnotation = this.getColumnAnnotation(context.fieldDescriptor, context.setupData.databaseModel);
        return columnAnnotation != null ? [columnAnnotation] : [];
    }
    getColumnAnnotation(fieldDescriptor, databaseModel) {
        const { sourceMetadata } = fieldDescriptor;
        const columnName = this.getColumnName(fieldDescriptor, databaseModel);
        if (columnName == null) {
            return null;
        }
        return new _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__.default(_erdiagram_converter_oop_source_code_generator_java_jpa_jpa_java_types__WEBPACK_IMPORTED_MODULE_2__.JpaAnnotationTypes.Column, {
            name: this.formatColumnName(columnName),
            nullable: fieldDescriptor.nullable ? undefined : false
        });
    }
    getColumnName(fieldDescriptor, databaseModel) {
        const { sourceMetadata } = fieldDescriptor;
        if ((0,_erdiagram_converter_oop_model_source_metadata_source_metadata_utils__WEBPACK_IMPORTED_MODULE_1__.isEntityIdentitySourceMetadata)(sourceMetadata)) {
            const table = __classPrivateFieldGet(this, _entityRelationshipModelSourceFinder).findTableFromEntity(databaseModel, sourceMetadata.entity);
            return table.identityColumnName;
        }
        if ((0,_erdiagram_converter_oop_model_source_metadata_source_metadata_utils__WEBPACK_IMPORTED_MODULE_1__.isEntityPropertySourceMetadata)(sourceMetadata)) {
            const column = __classPrivateFieldGet(this, _entityRelationshipModelSourceFinder).findColumnFromProperty(databaseModel, sourceMetadata.property);
            return column.name;
        }
        return null;
    }
    formatColumnName(columnName) {
        return __classPrivateFieldGet(this, _columnNameCaseConverter).convertCase(columnName);
    }
}
_entityRelationshipModelSourceFinder = new WeakMap(), _columnNameCaseConverter = new WeakMap();


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
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_jpa_jpa_java_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/jpa/jpa-java-types */ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/jpa-java-types.ts");



class IdentityFieldAnnotationsSupplier {
    getAnnotations(javaField, context) {
        if (!(0,_erdiagram_converter_oop_model_source_metadata_source_metadata_utils__WEBPACK_IMPORTED_MODULE_1__.isEntityIdentitySourceMetadata)(context.fieldDescriptor.sourceMetadata)) {
            return [];
        }
        return [
            new _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__.default(_erdiagram_converter_oop_source_code_generator_java_jpa_jpa_java_types__WEBPACK_IMPORTED_MODULE_2__.JpaAnnotationTypes.Id),
            new _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__.default(_erdiagram_converter_oop_source_code_generator_java_jpa_jpa_java_types__WEBPACK_IMPORTED_MODULE_2__.JpaAnnotationTypes.GeneratedValue, {
                // FIXME allow configuring the generation type (if IDENTITY is not valid for all scenarios)
                strategy: _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__.default.createRawParameterValue('GenerationType.IDENTITY', _erdiagram_converter_oop_source_code_generator_java_jpa_jpa_java_types__WEBPACK_IMPORTED_MODULE_2__.JpaEnumTypes.GenerationType)
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
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_jpa_transformer_finder_EntityRelationshipModelSourceFinder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/finder/EntityRelationshipModelSourceFinder */ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/finder/EntityRelationshipModelSourceFinder.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_jpa_transformer_visitor_field_IdentityFieldAnnotationsSupplier__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/visitor/field/IdentityFieldAnnotationsSupplier */ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/visitor/field/IdentityFieldAnnotationsSupplier.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_jpa_transformer_visitor_field_ColumnFieldAnnotationsSupplier__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/visitor/field/ColumnFieldAnnotationsSupplier */ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/visitor/field/ColumnFieldAnnotationsSupplier.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_jpa_transformer_visitor_field_relationship_RelationshipFieldAnnotationsSupplier__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/visitor/field/relationship/RelationshipFieldAnnotationsSupplier */ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/visitor/field/relationship/RelationshipFieldAnnotationsSupplier.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_jpa_transformer_finder_ClassModelSourceFinder__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/finder/ClassModelSourceFinder */ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/finder/ClassModelSourceFinder.ts");
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _annotateGetters, _fieldAnnotationsSuppliers;





class JpaTransformerFieldVisitor {
    constructor(tableNameCaseConverter, columnNameCaseConverter, annotateGetters) {
        _annotateGetters.set(this, void 0);
        _fieldAnnotationsSuppliers.set(this, void 0);
        __classPrivateFieldSet(this, _annotateGetters, annotateGetters);
        const entityRelationshipModelSourceFinder = new _erdiagram_converter_oop_source_code_generator_java_jpa_transformer_finder_EntityRelationshipModelSourceFinder__WEBPACK_IMPORTED_MODULE_0__.default();
        const classModelSourceFinder = new _erdiagram_converter_oop_source_code_generator_java_jpa_transformer_finder_ClassModelSourceFinder__WEBPACK_IMPORTED_MODULE_4__.default();
        __classPrivateFieldSet(this, _fieldAnnotationsSuppliers, [
            new _erdiagram_converter_oop_source_code_generator_java_jpa_transformer_visitor_field_IdentityFieldAnnotationsSupplier__WEBPACK_IMPORTED_MODULE_1__.default(),
            new _erdiagram_converter_oop_source_code_generator_java_jpa_transformer_visitor_field_ColumnFieldAnnotationsSupplier__WEBPACK_IMPORTED_MODULE_2__.default(entityRelationshipModelSourceFinder, columnNameCaseConverter),
            new _erdiagram_converter_oop_source_code_generator_java_jpa_transformer_visitor_field_relationship_RelationshipFieldAnnotationsSupplier__WEBPACK_IMPORTED_MODULE_3__.default(entityRelationshipModelSourceFinder, classModelSourceFinder, tableNameCaseConverter, columnNameCaseConverter)
        ]);
    }
    visitField(javaField, context) {
        const annotations = this.getFieldAnnotations(javaField, context);
        const elementToAnnotate = this.getElementToAnnotate(javaField);
        elementToAnnotate.annotations.push(...annotations);
    }
    getFieldAnnotations(javaField, context) {
        return __classPrivateFieldGet(this, _fieldAnnotationsSuppliers).flatMap(supplier => supplier.getAnnotations(javaField, context));
    }
    getElementToAnnotate(javaField) {
        if (__classPrivateFieldGet(this, _annotateGetters) && javaField.getter != null) {
            return javaField.getter;
        }
        return javaField;
    }
}
_annotateGetters = new WeakMap(), _fieldAnnotationsSuppliers = new WeakMap();


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
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_jpa_jpa_java_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/jpa/jpa-java-types */ "./src/main/erdiagram/converter/oop/source-code-generator/java/jpa/jpa-java-types.ts");
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _entityRelationshipModelSourceFinder, _classModelSourceFinder, _tableNameCaseConverter, _columnNameCaseConverter;




var RelationshipCardinality;
(function (RelationshipCardinality) {
    RelationshipCardinality["ONE_TO_ONE"] = "one_to_one";
    RelationshipCardinality["ONE_TO_MANY"] = "one_to_many";
    RelationshipCardinality["MANY_TO_ONE"] = "many_to_one";
    RelationshipCardinality["MANY_TO_MANY"] = "many_to_many";
})(RelationshipCardinality || (RelationshipCardinality = {}));
// TODO split this class
class RelationshipFieldAnnotationsSupplier {
    constructor(entityRelationshipModelSourceFinder, classModelSourceFinder, tableNameCaseConverter, columnNameCaseConverter) {
        _entityRelationshipModelSourceFinder.set(this, void 0);
        _classModelSourceFinder.set(this, void 0);
        _tableNameCaseConverter.set(this, void 0);
        _columnNameCaseConverter.set(this, void 0);
        __classPrivateFieldSet(this, _entityRelationshipModelSourceFinder, entityRelationshipModelSourceFinder);
        __classPrivateFieldSet(this, _classModelSourceFinder, classModelSourceFinder);
        __classPrivateFieldSet(this, _tableNameCaseConverter, tableNameCaseConverter);
        __classPrivateFieldSet(this, _columnNameCaseConverter, columnNameCaseConverter);
    }
    getAnnotations(javaField, context) {
        const { fieldDescriptor: { sourceMetadata }, classModel, setupData: { databaseModel } } = context;
        if (!(0,_erdiagram_converter_oop_model_source_metadata_source_metadata_utils__WEBPACK_IMPORTED_MODULE_1__.isRelationshipMemberSourceMetadata)(sourceMetadata)) {
            return [];
        }
        const { relationship, referencedMember } = sourceMetadata;
        const fieldBelongsToLeftMember = referencedMember === relationship.rightMember;
        const relationshipCardinality = this.getRelationshipCardinality(relationship);
        if (relationshipCardinality === RelationshipCardinality.ONE_TO_ONE) {
            if (fieldBelongsToLeftMember) {
                return this.getOneToOneRelationshipAnnotations(relationship.rightMember, databaseModel);
            }
            if (relationship.direction === _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__.Direction.BIDIRECTIONAL) {
                return this.getMappedByOneToOneRelationshipAnnotations(relationship.rightMember, relationship.leftMember, classModel);
            }
            return this.getInverseOneToOneRelationshipAnnotations(relationship.rightMember, relationship.leftMember, databaseModel);
        }
        if (relationshipCardinality === RelationshipCardinality.MANY_TO_ONE) {
            if (fieldBelongsToLeftMember) {
                return this.getManyToOneRelationshipAnnotations(relationship.rightMember, databaseModel);
            }
            if (relationship.direction === _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__.Direction.BIDIRECTIONAL) {
                return this.getMappedByOneToManyRelationshipAnnotations(relationship.rightMember, classModel);
            }
            return this.getInverseOneToManyRelationshipAnnotations(relationship.rightMember, databaseModel);
        }
        if (relationshipCardinality === RelationshipCardinality.ONE_TO_MANY) {
            if (!fieldBelongsToLeftMember) {
                return this.getManyToOneRelationshipAnnotations(relationship.leftMember, databaseModel);
            }
            if (relationship.direction === _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__.Direction.BIDIRECTIONAL) {
                return this.getMappedByOneToManyRelationshipAnnotations(relationship.leftMember, classModel);
            }
            return this.getInverseOneToManyRelationshipAnnotations(relationship.leftMember, databaseModel);
        }
        if (relationshipCardinality === RelationshipCardinality.MANY_TO_MANY) {
            if (fieldBelongsToLeftMember) {
                return this.getManyToManyRelationshipAnnotations(relationship.leftMember, databaseModel);
            }
            if (relationship.direction === _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__.Direction.BIDIRECTIONAL) {
                return this.getMappedByManyToManyRelationshipAnnotations(relationship.rightMember, classModel);
            }
            return this.getManyToManyRelationshipAnnotations(relationship.rightMember, databaseModel);
        }
        return [];
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
        const { reference } = __classPrivateFieldGet(this, _entityRelationshipModelSourceFinder).findTableAndReferenceFromReferencedMember(databaseModel, foreignMember);
        const optionalRelationship = foreignMember.cardinality === _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__.Cardinality.ZERO_OR_ONE;
        return [
            new _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__.default(_erdiagram_converter_oop_source_code_generator_java_jpa_jpa_java_types__WEBPACK_IMPORTED_MODULE_3__.JpaAnnotationTypes.OneToOne, {
                optional: optionalRelationship ? undefined : false
            }),
            new _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__.default(_erdiagram_converter_oop_source_code_generator_java_jpa_jpa_java_types__WEBPACK_IMPORTED_MODULE_3__.JpaAnnotationTypes.JoinColumn, {
                name: this.formatColumnName(reference.columnName),
                nullable: optionalRelationship ? undefined : false
            }),
        ];
    }
    getMappedByOneToOneRelationshipAnnotations(ownMember, foreignMember, classModel) {
        const { field } = __classPrivateFieldGet(this, _classModelSourceFinder).findClassAndFieldFromReferencedMember(classModel, ownMember);
        return [
            new _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__.default(_erdiagram_converter_oop_source_code_generator_java_jpa_jpa_java_types__WEBPACK_IMPORTED_MODULE_3__.JpaAnnotationTypes.OneToOne, {
                mappedBy: field.name,
                optional: foreignMember.cardinality === _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__.Cardinality.ZERO_OR_ONE ? undefined : false
            }),
        ];
    }
    getInverseOneToOneRelationshipAnnotations(ownMember, foreignMember, databaseModel) {
        const { table, reference } = __classPrivateFieldGet(this, _entityRelationshipModelSourceFinder).findTableAndReferenceFromReferencedMember(databaseModel, ownMember);
        return [
            new _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__.default(_erdiagram_converter_oop_source_code_generator_java_jpa_jpa_java_types__WEBPACK_IMPORTED_MODULE_3__.JpaAnnotationTypes.OneToOne, {
                optional: foreignMember.cardinality === _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__.Cardinality.ZERO_OR_ONE ? undefined : false
            }),
            new _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__.default(_erdiagram_converter_oop_source_code_generator_java_jpa_jpa_java_types__WEBPACK_IMPORTED_MODULE_3__.JpaAnnotationTypes.JoinTable, {
                name: this.formatTableName(table.name),
                inverseJoinColumns: new _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__.default(_erdiagram_converter_oop_source_code_generator_java_jpa_jpa_java_types__WEBPACK_IMPORTED_MODULE_3__.JpaAnnotationTypes.JoinColumn, {
                    name: this.formatColumnName(reference.columnName),
                    nullable: ownMember.cardinality === _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__.Cardinality.ZERO_OR_ONE ? undefined : false
                }),
            }),
        ];
    }
    getManyToOneRelationshipAnnotations(foreignMember, databaseModel) {
        const { reference } = __classPrivateFieldGet(this, _entityRelationshipModelSourceFinder).findTableAndReferenceFromReferencedMember(databaseModel, foreignMember);
        const optionalRelationship = foreignMember.cardinality === _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__.Cardinality.ZERO_OR_ONE;
        return [
            new _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__.default(_erdiagram_converter_oop_source_code_generator_java_jpa_jpa_java_types__WEBPACK_IMPORTED_MODULE_3__.JpaAnnotationTypes.ManyToOne, {
                optional: optionalRelationship ? undefined : false
            }),
            new _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__.default(_erdiagram_converter_oop_source_code_generator_java_jpa_jpa_java_types__WEBPACK_IMPORTED_MODULE_3__.JpaAnnotationTypes.JoinColumn, {
                name: this.formatColumnName(reference.columnName),
                nullable: optionalRelationship ? undefined : false
            }),
        ];
    }
    getMappedByOneToManyRelationshipAnnotations(ownMember, classModel) {
        const { field } = __classPrivateFieldGet(this, _classModelSourceFinder).findClassAndFieldFromReferencedMember(classModel, ownMember);
        return [
            new _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__.default(_erdiagram_converter_oop_source_code_generator_java_jpa_jpa_java_types__WEBPACK_IMPORTED_MODULE_3__.JpaAnnotationTypes.OneToMany, {
                mappedBy: field.name
            }),
        ];
    }
    getInverseOneToManyRelationshipAnnotations(ownMember, databaseModel) {
        const { table, reference } = __classPrivateFieldGet(this, _entityRelationshipModelSourceFinder).findTableAndReferenceFromReferencedMember(databaseModel, ownMember);
        return [
            new _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__.default(_erdiagram_converter_oop_source_code_generator_java_jpa_jpa_java_types__WEBPACK_IMPORTED_MODULE_3__.JpaAnnotationTypes.OneToMany),
            new _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__.default(_erdiagram_converter_oop_source_code_generator_java_jpa_jpa_java_types__WEBPACK_IMPORTED_MODULE_3__.JpaAnnotationTypes.JoinTable, {
                name: this.formatTableName(table.name),
                inverseJoinColumns: new _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__.default(_erdiagram_converter_oop_source_code_generator_java_jpa_jpa_java_types__WEBPACK_IMPORTED_MODULE_3__.JpaAnnotationTypes.JoinColumn, {
                    name: this.formatColumnName(reference.columnName),
                    nullable: ownMember.cardinality === _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__.Cardinality.ZERO_OR_ONE ? undefined : false
                }),
            }),
        ];
    }
    getManyToManyRelationshipAnnotations(ownMember, databaseModel) {
        const { table, reference: ownReference } = __classPrivateFieldGet(this, _entityRelationshipModelSourceFinder).findTableAndReferenceFromReferencedMember(databaseModel, ownMember);
        if (table.references.length !== 2) {
            throw new Error('Relationship table has more than 2 references');
        }
        const foreignReference = table.references.find(reference => reference !== ownReference);
        return [
            new _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__.default(_erdiagram_converter_oop_source_code_generator_java_jpa_jpa_java_types__WEBPACK_IMPORTED_MODULE_3__.JpaAnnotationTypes.ManyToMany),
            new _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__.default(_erdiagram_converter_oop_source_code_generator_java_jpa_jpa_java_types__WEBPACK_IMPORTED_MODULE_3__.JpaAnnotationTypes.JoinTable, {
                name: this.formatTableName(table.name),
                joinColumns: new _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__.default(_erdiagram_converter_oop_source_code_generator_java_jpa_jpa_java_types__WEBPACK_IMPORTED_MODULE_3__.JpaAnnotationTypes.JoinColumn, {
                    name: this.formatColumnName(ownReference.columnName),
                    nullable: false
                }),
                inverseJoinColumns: new _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__.default(_erdiagram_converter_oop_source_code_generator_java_jpa_jpa_java_types__WEBPACK_IMPORTED_MODULE_3__.JpaAnnotationTypes.JoinColumn, {
                    name: this.formatColumnName(foreignReference.columnName),
                    nullable: false
                }),
            }),
        ];
    }
    getMappedByManyToManyRelationshipAnnotations(sourceMember, classModel) {
        const { field: referencedField } = __classPrivateFieldGet(this, _classModelSourceFinder).findClassAndFieldFromReferencedMember(classModel, sourceMember);
        return [
            new _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__.default(_erdiagram_converter_oop_source_code_generator_java_jpa_jpa_java_types__WEBPACK_IMPORTED_MODULE_3__.JpaAnnotationTypes.ManyToMany, {
                mappedBy: referencedField.name
            }),
        ];
    }
    formatColumnName(columnName) {
        return __classPrivateFieldGet(this, _columnNameCaseConverter).convertCase(columnName);
    }
    formatTableName(tableName) {
        return __classPrivateFieldGet(this, _tableNameCaseConverter).convertCase(tableName);
    }
}
_entityRelationshipModelSourceFinder = new WeakMap(), _classModelSourceFinder = new WeakMap(), _tableNameCaseConverter = new WeakMap(), _columnNameCaseConverter = new WeakMap();


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/model/exports.ts":
/*!**************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/model/exports.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JavaClassModelGenerator": () => (/* reexport safe */ _generator_exports__WEBPACK_IMPORTED_MODULE_0__.JavaClassModelGenerator),
/* harmony export */   "JavaClassModelGeneratorConfigManager": () => (/* reexport safe */ _generator_exports__WEBPACK_IMPORTED_MODULE_0__.JavaClassModelGeneratorConfigManager),
/* harmony export */   "javaClassModelGeneratorConfigManager": () => (/* reexport safe */ _generator_exports__WEBPACK_IMPORTED_MODULE_0__.javaClassModelGeneratorConfigManager),
/* harmony export */   "JavaVisibility": () => (/* reexport safe */ _java_class_model_types__WEBPACK_IMPORTED_MODULE_1__.JavaVisibility)
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
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_model_generator_JavaFieldGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/model/generator/JavaFieldGenerator */ "./src/main/erdiagram/converter/oop/source-code-generator/java/model/generator/JavaFieldGenerator.ts");
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _generatedClassesPackage, _javaFieldGenerator;


class JavaClassGenerator {
    constructor(generatedClassesPackage, typeResolver) {
        _generatedClassesPackage.set(this, void 0);
        _javaFieldGenerator.set(this, void 0);
        __classPrivateFieldSet(this, _generatedClassesPackage, generatedClassesPackage);
        __classPrivateFieldSet(this, _javaFieldGenerator, new _erdiagram_converter_oop_source_code_generator_java_model_generator_JavaFieldGenerator__WEBPACK_IMPORTED_MODULE_1__.default(typeResolver));
    }
    generateJavaClass(classDescriptor, fieldGeneratedEventListener) {
        return {
            packageName: __classPrivateFieldGet(this, _generatedClassesPackage),
            visibility: _erdiagram_converter_oop_source_code_generator_java_model_java_class_model_types__WEBPACK_IMPORTED_MODULE_0__.JavaVisibility.PUBLIC,
            name: classDescriptor.name,
            annotations: [],
            fields: classDescriptor.fields.map(fieldDescriptor => {
                const javaField = __classPrivateFieldGet(this, _javaFieldGenerator).generateJavaField(fieldDescriptor);
                fieldGeneratedEventListener({ javaField, fieldDescriptor });
                return javaField;
            })
        };
    }
}
_generatedClassesPackage = new WeakMap(), _javaFieldGenerator = new WeakMap();


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
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_model_generator_config_JavaClassModelGeneratorConfigManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/model/generator/config/JavaClassModelGeneratorConfigManager */ "./src/main/erdiagram/converter/oop/source-code-generator/java/model/generator/config/JavaClassModelGeneratorConfigManager.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_model_generator_source_JavaClassModelDescriptorsRepositoryBuilder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/model/generator/source/JavaClassModelDescriptorsRepositoryBuilder */ "./src/main/erdiagram/converter/oop/source-code-generator/java/model/generator/source/JavaClassModelDescriptorsRepositoryBuilder.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_model_generator_JavaClassGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/model/generator/JavaClassGenerator */ "./src/main/erdiagram/converter/oop/source-code-generator/java/model/generator/JavaClassGenerator.ts");
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _javaClassGenerator;




class JavaClassModelGenerator {
    constructor(config) {
        _javaClassGenerator.set(this, void 0);
        const fullConfig = _erdiagram_converter_oop_source_code_generator_java_model_generator_config_JavaClassModelGeneratorConfigManager__WEBPACK_IMPORTED_MODULE_1__.default.mergeWithDefaultConfig(config);
        const generatedClassesPackage = fullConfig.generatedClassesPackage;
        const typeResolver = new _erdiagram_converter_oop_source_code_generator_java_type_JavaFieldTypeResolver__WEBPACK_IMPORTED_MODULE_0__.default(fullConfig.typeBindings, generatedClassesPackage);
        __classPrivateFieldSet(this, _javaClassGenerator, new _erdiagram_converter_oop_source_code_generator_java_model_generator_JavaClassGenerator__WEBPACK_IMPORTED_MODULE_3__.default(generatedClassesPackage, typeResolver));
    }
    generateJavaClassModel(classModel) {
        const descriptorsRepositoryBuilder = new _erdiagram_converter_oop_source_code_generator_java_model_generator_source_JavaClassModelDescriptorsRepositoryBuilder__WEBPACK_IMPORTED_MODULE_2__.default();
        const javaClasses = classModel.classes
            .map(classDescriptor => {
            const javaClass = __classPrivateFieldGet(this, _javaClassGenerator).generateJavaClass(classDescriptor, event => {
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
_javaClassGenerator = new WeakMap();


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
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _typeResolver;


class JavaFieldGenerator {
    constructor(typeResolver) {
        _typeResolver.set(this, void 0);
        __classPrivateFieldSet(this, _typeResolver, typeResolver);
    }
    generateJavaField(fieldDescriptor) {
        const fieldType = __classPrivateFieldGet(this, _typeResolver).resolveFieldType(fieldDescriptor);
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
                name: this.getSetterName(fieldDescriptor.name)
            },
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
_typeResolver = new WeakMap();


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/model/generator/config/JavaClassModelGeneratorConfigManager.ts":
/*!************************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/model/generator/config/JavaClassModelGeneratorConfigManager.ts ***!
  \************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JavaClassModelGeneratorConfigManager": () => (/* binding */ JavaClassModelGeneratorConfigManager),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/entity-relationship-model-types */ "./src/main/erdiagram/parser/types/entity-relationship-model-types.ts");
/* harmony import */ var _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/common/config/AbstractComponentConfigManager */ "./src/main/erdiagram/common/config/AbstractComponentConfigManager.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/type/parseJavaType */ "./src/main/erdiagram/converter/oop/source-code-generator/java/type/parseJavaType.ts");
/* harmony import */ var true_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! true-json */ "./node_modules/true-json/dist/true-json.umd.js");
/* harmony import */ var true_json__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(true_json__WEBPACK_IMPORTED_MODULE_3__);




class JavaClassModelGeneratorConfigManager extends _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_1__.default {
    getDefaultConfig() {
        return {
            typeBindings: {
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.IDENTITY]: (0,_erdiagram_converter_oop_source_code_generator_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__.default)('java.lang.Long'),
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.TEXT]: (0,_erdiagram_converter_oop_source_code_generator_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__.default)('java.lang.String'),
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.LONG]: (0,_erdiagram_converter_oop_source_code_generator_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__.default)('java.lang.Long'),
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.INT]: (0,_erdiagram_converter_oop_source_code_generator_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__.default)('java.lang.Integer'),
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.SHORT]: (0,_erdiagram_converter_oop_source_code_generator_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__.default)('java.lang.Short'),
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.DECIMAL]: (0,_erdiagram_converter_oop_source_code_generator_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__.default)('java.math.BigDecimal'),
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.BOOLEAN]: (0,_erdiagram_converter_oop_source_code_generator_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__.default)('java.lang.Boolean'),
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.DATE]: (0,_erdiagram_converter_oop_source_code_generator_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__.default)('java.time.LocalDate'),
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.TIME]: (0,_erdiagram_converter_oop_source_code_generator_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__.default)('java.time.LocalTime'),
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.DATETIME]: (0,_erdiagram_converter_oop_source_code_generator_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__.default)('java.time.LocalDateTime'),
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.BLOB]: (0,_erdiagram_converter_oop_source_code_generator_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__.default)('byte[]')
            }
        };
    }
    mergeConfigs(fullConfig, partialConfig) {
        return Object.assign(Object.assign(Object.assign({}, fullConfig), partialConfig), { typeBindings: Object.assign(Object.assign({}, fullConfig.typeBindings), partialConfig === null || partialConfig === void 0 ? void 0 : partialConfig.typeBindings) });
    }
    getJsonAdapter() {
        return true_json__WEBPACK_IMPORTED_MODULE_3__.JsonAdapters.object({
            typeBindings: true_json__WEBPACK_IMPORTED_MODULE_3__.JsonAdapters.record(true_json__WEBPACK_IMPORTED_MODULE_3__.JsonAdapters.custom({
                adaptToJson(value) {
                    return value.formatCanonical();
                },
                recoverFromJson(value) {
                    return (0,_erdiagram_converter_oop_source_code_generator_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__.default)(value);
                }
            }))
        });
    }
}
const javaClassModelGeneratorConfigManager = new JavaClassModelGeneratorConfigManager();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (javaClassModelGeneratorConfigManager);


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/model/generator/config/exports.ts":
/*!*******************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/model/generator/config/exports.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JavaClassModelGeneratorConfigManager": () => (/* reexport safe */ _JavaClassModelGeneratorConfigManager__WEBPACK_IMPORTED_MODULE_0__.JavaClassModelGeneratorConfigManager),
/* harmony export */   "javaClassModelGeneratorConfigManager": () => (/* reexport safe */ _JavaClassModelGeneratorConfigManager__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _JavaClassModelGeneratorConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./JavaClassModelGeneratorConfigManager */ "./src/main/erdiagram/converter/oop/source-code-generator/java/model/generator/config/JavaClassModelGeneratorConfigManager.ts");




/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/model/generator/exports.ts":
/*!************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/model/generator/exports.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JavaClassModelGeneratorConfigManager": () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_1__.JavaClassModelGeneratorConfigManager),
/* harmony export */   "javaClassModelGeneratorConfigManager": () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_1__.javaClassModelGeneratorConfigManager),
/* harmony export */   "JavaClassModelGenerator": () => (/* reexport safe */ _erdiagram_converter_oop_source_code_generator_java_model_generator_JavaClassModelGenerator__WEBPACK_IMPORTED_MODULE_0__.default)
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
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_model_generator_source_JavaClassModelDescriptorsRepositoryBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/model/generator/source/JavaClassModelDescriptorsRepositoryBuilder */ "./src/main/erdiagram/converter/oop/source-code-generator/java/model/generator/source/JavaClassModelDescriptorsRepositoryBuilder.ts");
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _classDescriptorsMap, _fieldDescriptorsMap;

class JavaClassModelDescriptorsRepository {
    constructor(classDescriptorsMap, fieldDescriptorsMap) {
        _classDescriptorsMap.set(this, void 0);
        _fieldDescriptorsMap.set(this, void 0);
        __classPrivateFieldSet(this, _classDescriptorsMap, classDescriptorsMap);
        __classPrivateFieldSet(this, _fieldDescriptorsMap, fieldDescriptorsMap);
    }
    getClassDescriptor(javaClass) {
        const classDescriptor = __classPrivateFieldGet(this, _classDescriptorsMap).get(javaClass);
        if (classDescriptor == null) {
            throw new Error(`Cannot find descriptor for Java class "${javaClass.name}"`);
        }
        return classDescriptor;
    }
    getFieldDescriptor(javaField) {
        const fieldDescriptor = __classPrivateFieldGet(this, _fieldDescriptorsMap).get(javaField);
        if (fieldDescriptor == null) {
            throw new Error(`Cannot find descriptor for Java field "${javaField.name}"`);
        }
        return fieldDescriptor;
    }
    static builder() {
        return new _erdiagram_converter_oop_source_code_generator_java_model_generator_source_JavaClassModelDescriptorsRepositoryBuilder__WEBPACK_IMPORTED_MODULE_0__.default();
    }
}
_classDescriptorsMap = new WeakMap(), _fieldDescriptorsMap = new WeakMap();


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
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _classDescriptorsMap, _fieldDescriptorsMap;

class JavaClassModelDescriptorsRepositoryBuilder {
    constructor() {
        _classDescriptorsMap.set(this, new Map());
        _fieldDescriptorsMap.set(this, new Map());
    }
    addClass(javaClass, classDescriptor) {
        __classPrivateFieldGet(this, _classDescriptorsMap).set(javaClass, classDescriptor);
        return this;
    }
    addField(javaField, fieldDescriptor) {
        __classPrivateFieldGet(this, _fieldDescriptorsMap).set(javaField, fieldDescriptor);
        return this;
    }
    build() {
        return new _erdiagram_converter_oop_source_code_generator_java_model_generator_source_JavaClassModelDescriptorsRepository__WEBPACK_IMPORTED_MODULE_0__.default(new Map(__classPrivateFieldGet(this, _classDescriptorsMap).entries()), new Map(__classPrivateFieldGet(this, _fieldDescriptorsMap).entries()));
    }
}
_classDescriptorsMap = new WeakMap(), _fieldDescriptorsMap = new WeakMap();


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types.ts":
/*!*****************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types.ts ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JavaVisibility": () => (/* binding */ JavaVisibility)
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
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _setupContext, _javaClassModelDescriptorsRepository, _transformers;
class ApplyTransformersCommand {
    constructor(setupContext, javaClassModelDescriptorsRepository, transformers) {
        _setupContext.set(this, void 0);
        _javaClassModelDescriptorsRepository.set(this, void 0);
        _transformers.set(this, void 0);
        __classPrivateFieldSet(this, _setupContext, setupContext);
        __classPrivateFieldSet(this, _javaClassModelDescriptorsRepository, javaClassModelDescriptorsRepository);
        __classPrivateFieldSet(this, _transformers, transformers);
    }
    execute() {
        __classPrivateFieldGet(this, _transformers).forEach(transformer => this.applyTransformer(transformer));
    }
    applyTransformer(transformer) {
        const { javaClassModel } = __classPrivateFieldGet(this, _setupContext);
        const setupData = transformer.setup(__classPrivateFieldGet(this, _setupContext));
        javaClassModel.classes.forEach(javaClass => {
            const classDescriptor = __classPrivateFieldGet(this, _javaClassModelDescriptorsRepository).getClassDescriptor(javaClass);
            javaClass.fields.forEach(javaField => {
                const fieldDescriptor = __classPrivateFieldGet(this, _javaClassModelDescriptorsRepository).getFieldDescriptor(javaField);
                return transformer.visitField(javaField, Object.assign(Object.assign({}, __classPrivateFieldGet(this, _setupContext)), { setupData, javaClass: javaClass, classDescriptor,
                    fieldDescriptor }));
            });
            transformer.visitClass(javaClass, Object.assign(Object.assign({}, __classPrivateFieldGet(this, _setupContext)), { setupData,
                classDescriptor }));
        });
        transformer.visitModel(javaClassModel, Object.assign(Object.assign({}, __classPrivateFieldGet(this, _setupContext)), { setupData }));
    }
}
_setupContext = new WeakMap(), _javaClassModelDescriptorsRepository = new WeakMap(), _transformers = new WeakMap();


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
        return (0,_erdiagram_converter_oop_source_code_generator_java_type_parameterized_createJavaParameterizedType__WEBPACK_IMPORTED_MODULE_1__.default)('List', 'java.util', [this.resolveSingleType(field)]);
    }
    resolveSingleType(field) {
        const { entityType, primitiveType } = field;
        if (entityType) {
            if (primitiveType) {
                throw new Error('Invalid field descriptor: provided both primitive and entity types');
            }
            return (0,_erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__.default)(entityType, this.generatedClassesPackage);
        }
        if (!primitiveType) {
            throw new Error('Invalid field descriptor: missing type');
        }
        /* istanbul ignore next */
        if (!this.typeBindings.hasOwnProperty(primitiveType)) {
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
/* harmony export */   "createJavaSimpleType": () => (/* reexport safe */ _simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_1__.default),
/* harmony export */   "createJavaParameterizedType": () => (/* reexport safe */ _parameterized_createJavaParameterizedType__WEBPACK_IMPORTED_MODULE_2__.default),
/* harmony export */   "createJavaArrayType": () => (/* reexport safe */ _parameterized_createJavaArrayType__WEBPACK_IMPORTED_MODULE_3__.default),
/* harmony export */   "isJavaParameterizedType": () => (/* reexport safe */ _parameterized_isJavaParameterizedType__WEBPACK_IMPORTED_MODULE_4__.default),
/* harmony export */   "parseJavaType": () => (/* reexport safe */ _parseJavaType__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _parseJavaType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parseJavaType */ "./src/main/erdiagram/converter/oop/source-code-generator/java/type/parseJavaType.ts");
/* harmony import */ var _simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./simple/createJavaSimpleType */ "./src/main/erdiagram/converter/oop/source-code-generator/java/type/simple/createJavaSimpleType.ts");
/* harmony import */ var _parameterized_createJavaParameterizedType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parameterized/createJavaParameterizedType */ "./src/main/erdiagram/converter/oop/source-code-generator/java/type/parameterized/createJavaParameterizedType.ts");
/* harmony import */ var _parameterized_createJavaArrayType__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./parameterized/createJavaArrayType */ "./src/main/erdiagram/converter/oop/source-code-generator/java/type/parameterized/createJavaArrayType.ts");
/* harmony import */ var _parameterized_isJavaParameterizedType__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./parameterized/isJavaParameterizedType */ "./src/main/erdiagram/converter/oop/source-code-generator/java/type/parameterized/isJavaParameterizedType.ts");








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

// TODO add unit tests
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
        if (_erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__.default.isRawParameterValue(parameterValue)) {
            return parameterValue.usedTypes;
        }
        if (parameterValue instanceof _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_0__.default) {
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
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _javaAnnotationUsedTypesCompiler;

// TODO add unit tests
class JavaClassUsedTypesCompiler {
    constructor() {
        _javaAnnotationUsedTypesCompiler.set(this, new _erdiagram_converter_oop_source_code_generator_java_type_import_JavaAnnotationUsedTypesCompiler__WEBPACK_IMPORTED_MODULE_0__.default());
    }
    getUsedTypes(javaClass) {
        const usedTypes = [];
        usedTypes.push(...this.getAnnotationsUsedTypes(javaClass.annotations));
        javaClass.fields.forEach(javaField => {
            var _a, _b, _c, _d;
            usedTypes.push(javaField.type);
            usedTypes.push(...this.getAnnotationsUsedTypes(javaField.annotations));
            usedTypes.push(...this.getAnnotationsUsedTypes((_b = (_a = javaField.getter) === null || _a === void 0 ? void 0 : _a.annotations) !== null && _b !== void 0 ? _b : []));
            usedTypes.push(...this.getAnnotationsUsedTypes((_d = (_c = javaField.setter) === null || _c === void 0 ? void 0 : _c.annotations) !== null && _d !== void 0 ? _d : []));
        });
        return usedTypes;
    }
    getAnnotationsUsedTypes(annotations) {
        return annotations.flatMap(annotation => __classPrivateFieldGet(this, _javaAnnotationUsedTypesCompiler).getUsedTypes(annotation));
    }
}
_javaAnnotationUsedTypesCompiler = new WeakMap();


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
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _currentPackage;


const JAVA_LANG_PACKAGE = 'java.lang';
// TODO add unit tests
class JavaImportStatementsGenerator {
    constructor(currentPackage) {
        _currentPackage.set(this, void 0);
        __classPrivateFieldSet(this, _currentPackage, currentPackage);
    }
    generateImportStatements(javaTypes) {
        const importStatements = this.unrollTypesRecursively(javaTypes)
            .filter(javaType => this.isImportRequired(javaType))
            .map(javaType => `import ${javaType.canonicalName};`);
        return (0,_erdiagram_util_array_utils__WEBPACK_IMPORTED_MODULE_0__.removeDuplicates)(importStatements).sort();
    }
    unrollTypesRecursively(javaTypes, appendTo = []) {
        for (const javaType of javaTypes) {
            appendTo.push(javaType);
            if ((0,_erdiagram_converter_oop_source_code_generator_java_type_parameterized_isJavaParameterizedType__WEBPACK_IMPORTED_MODULE_1__.default)(javaType)) {
                this.unrollTypesRecursively(javaType.parameterTypes, appendTo);
            }
        }
        return appendTo;
    }
    isImportRequired(javaType) {
        return !!javaType.packageName
            && javaType.packageName !== JAVA_LANG_PACKAGE
            && javaType.packageName !== __classPrivateFieldGet(this, _currentPackage);
    }
}
_currentPackage = new WeakMap();


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
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _name, _canonicalName, _parameterType;
function createJavaArrayType(parameterType) {
    return new JavaArrayTypeImpl(parameterType);
}
class JavaArrayTypeImpl {
    constructor(parameterType) {
        _name.set(this, void 0);
        _canonicalName.set(this, void 0);
        _parameterType.set(this, void 0);
        __classPrivateFieldSet(this, _name, `${parameterType.name}[]`);
        __classPrivateFieldSet(this, _canonicalName, `${parameterType.canonicalName}[]`);
        __classPrivateFieldSet(this, _parameterType, parameterType);
    }
    get canonicalName() {
        return __classPrivateFieldGet(this, _canonicalName);
    }
    get name() {
        return __classPrivateFieldGet(this, _name);
    }
    get packageName() {
        return undefined;
    }
    get parameterTypes() {
        return [__classPrivateFieldGet(this, _parameterType)];
    }
    formatSimple() {
        const formattedParameterType = __classPrivateFieldGet(this, _parameterType).formatSimple();
        return `${formattedParameterType}[]`;
    }
    formatCanonical() {
        const formattedParameterType = __classPrivateFieldGet(this, _parameterType).formatCanonical();
        return `${formattedParameterType}[]`;
    }
}
_name = new WeakMap(), _canonicalName = new WeakMap(), _parameterType = new WeakMap();


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
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _name, _packageName, _canonicalName, _parameterTypes;
function createJavaParameterizedType(name, packageName, parameterTypes) {
    return new JavaParameterizedTypeImpl(name, packageName, parameterTypes);
}
class JavaParameterizedTypeImpl {
    constructor(name, packageName, parameterTypes) {
        _name.set(this, void 0);
        _packageName.set(this, void 0);
        _canonicalName.set(this, void 0);
        _parameterTypes.set(this, void 0);
        __classPrivateFieldSet(this, _name, name);
        __classPrivateFieldSet(this, _packageName, packageName);
        __classPrivateFieldSet(this, _canonicalName, packageName ? `${packageName}.${name}` : name);
        __classPrivateFieldSet(this, _parameterTypes, parameterTypes);
    }
    get canonicalName() {
        return __classPrivateFieldGet(this, _canonicalName);
    }
    get name() {
        return __classPrivateFieldGet(this, _name);
    }
    get packageName() {
        return __classPrivateFieldGet(this, _packageName);
    }
    get parameterTypes() {
        return __classPrivateFieldGet(this, _parameterTypes);
    }
    formatSimple() {
        const formattedParameterTypes = __classPrivateFieldGet(this, _parameterTypes).map(parameterType => parameterType.formatSimple()).join(', ');
        return `${__classPrivateFieldGet(this, _name)}<${formattedParameterTypes}>`;
    }
    formatCanonical() {
        const formattedParameterTypes = __classPrivateFieldGet(this, _parameterTypes).map(parameterType => parameterType.formatCanonical()).join(', ');
        return `${__classPrivateFieldGet(this, _canonicalName)}<${formattedParameterTypes}>`;
    }
}
_name = new WeakMap(), _packageName = new WeakMap(), _canonicalName = new WeakMap(), _parameterTypes = new WeakMap();


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
        const [fullMatch, rawTypeText] = ARRAY_TYPE_REGEX.exec(trimmedText);
        return (0,_erdiagram_converter_oop_source_code_generator_java_type_parameterized_createJavaArrayType__WEBPACK_IMPORTED_MODULE_2__.default)(parseJavaTypeInternal(rawTypeText));
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
    return (0,_erdiagram_converter_oop_source_code_generator_java_type_parameterized_createJavaParameterizedType__WEBPACK_IMPORTED_MODULE_1__.default)(rawType.name, rawType.packageName, parameterTypes);
}
function parseJavaRawType(text) {
    const trimmedText = trimRawJavaTypeParts(text.trim());
    if (!RAW_TYPE_REGEX.test(trimmedText)) {
        throw new Error(`Illegal Java type format: ${text}`);
    }
    const lastDotIndex = trimmedText.lastIndexOf(PACKAGE_SEPARATOR);
    if (lastDotIndex === -1) {
        return (0,_erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__.default)(trimmedText);
    }
    const packageName = trimmedText.substring(0, lastDotIndex);
    const className = trimmedText.substring(lastDotIndex + 1);
    return (0,_erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__.default)(className, packageName);
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
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _name, _packageName, _canonicalName;
function createJavaSimpleType(name, packageName) {
    return new JavaSimpleTypeImpl(name, packageName);
}
class JavaSimpleTypeImpl {
    constructor(name, packageName) {
        _name.set(this, void 0);
        _packageName.set(this, void 0);
        _canonicalName.set(this, void 0);
        __classPrivateFieldSet(this, _name, name);
        __classPrivateFieldSet(this, _packageName, packageName);
        __classPrivateFieldSet(this, _canonicalName, packageName ? `${packageName}.${name}` : name);
    }
    get canonicalName() {
        return __classPrivateFieldGet(this, _canonicalName);
    }
    get name() {
        return __classPrivateFieldGet(this, _name);
    }
    get packageName() {
        return __classPrivateFieldGet(this, _packageName);
    }
    formatSimple() {
        return __classPrivateFieldGet(this, _name);
    }
    formatCanonical() {
        return __classPrivateFieldGet(this, _canonicalName);
    }
}
_name = new WeakMap(), _packageName = new WeakMap(), _canonicalName = new WeakMap();


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/validation/JavaValidationAnnotationTypes.ts":
/*!*****************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/validation/JavaValidationAnnotationTypes.ts ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/type/simple/createJavaSimpleType */ "./src/main/erdiagram/converter/oop/source-code-generator/java/type/simple/createJavaSimpleType.ts");

const VALIDATION_ANNOTATIONS_PACKAGE = 'javax.validation.constraints';
const JavaValidationAnnotationTypes = {
    NotNull: (0,_erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__.default)('NotNull', VALIDATION_ANNOTATIONS_PACKAGE),
    NotEmpty: (0,_erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__.default)('NotEmpty', VALIDATION_ANNOTATIONS_PACKAGE),
    NotBlank: (0,_erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__.default)('NotBlank', VALIDATION_ANNOTATIONS_PACKAGE),
    Size: (0,_erdiagram_converter_oop_source_code_generator_java_type_simple_createJavaSimpleType__WEBPACK_IMPORTED_MODULE_0__.default)('Size', VALIDATION_ANNOTATIONS_PACKAGE)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (JavaValidationAnnotationTypes);


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/validation/JavaxValidationTransformer.ts":
/*!**************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/validation/JavaxValidationTransformer.ts ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ JavaxValidationTransformer)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_validation_visitor_JavaxValidationAnnotationsSupplier__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/validation/visitor/JavaxValidationAnnotationsSupplier */ "./src/main/erdiagram/converter/oop/source-code-generator/java/validation/visitor/JavaxValidationAnnotationsSupplier.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_validation_config_JavaxValidationTransformerConfigManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/validation/config/JavaxValidationTransformerConfigManager */ "./src/main/erdiagram/converter/oop/source-code-generator/java/validation/config/JavaxValidationTransformerConfigManager.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_validation_visitor_JavaxValidationFieldVisitor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/validation/visitor/JavaxValidationFieldVisitor */ "./src/main/erdiagram/converter/oop/source-code-generator/java/validation/visitor/JavaxValidationFieldVisitor.ts");
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _javaxValidationFieldVisitor;



class JavaxValidationTransformer {
    constructor(config) {
        _javaxValidationFieldVisitor.set(this, void 0);
        const { notNullTextValidationStrategy, notNullBlobValidationStrategy, annotateGetters } = _erdiagram_converter_oop_source_code_generator_java_validation_config_JavaxValidationTransformerConfigManager__WEBPACK_IMPORTED_MODULE_1__.default.mergeWithDefaultConfig(config);
        const javaxValidationAnnotationsSupplier = new _erdiagram_converter_oop_source_code_generator_java_validation_visitor_JavaxValidationAnnotationsSupplier__WEBPACK_IMPORTED_MODULE_0__.default(notNullTextValidationStrategy, notNullBlobValidationStrategy);
        __classPrivateFieldSet(this, _javaxValidationFieldVisitor, new _erdiagram_converter_oop_source_code_generator_java_validation_visitor_JavaxValidationFieldVisitor__WEBPACK_IMPORTED_MODULE_2__.default(javaxValidationAnnotationsSupplier, annotateGetters));
    }
    setup(context) {
        return undefined;
    }
    visitField(javaField, context) {
        __classPrivateFieldGet(this, _javaxValidationFieldVisitor).visitField(javaField, context);
    }
    visitClass(javaClass, context) {
        // Do nothing
    }
    visitModel(javaClassModel, context) {
        // Do nothing
    }
}
_javaxValidationFieldVisitor = new WeakMap();


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/validation/config/JavaxValidationTransformerConfigManager.ts":
/*!**********************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/validation/config/JavaxValidationTransformerConfigManager.ts ***!
  \**********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JavaxValidationTransformerConfigManager": () => (/* binding */ JavaxValidationTransformerConfigManager),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/common/config/AbstractComponentConfigManager */ "./src/main/erdiagram/common/config/AbstractComponentConfigManager.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_validation_strategy_NotNullTextValidationStrategy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/validation/strategy/NotNullTextValidationStrategy */ "./src/main/erdiagram/converter/oop/source-code-generator/java/validation/strategy/NotNullTextValidationStrategy.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_validation_strategy_NotNullBlobValidationStrategy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/validation/strategy/NotNullBlobValidationStrategy */ "./src/main/erdiagram/converter/oop/source-code-generator/java/validation/strategy/NotNullBlobValidationStrategy.ts");



class JavaxValidationTransformerConfigManager extends _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_0__.default {
    getDefaultConfig() {
        return {
            notNullTextValidationStrategy: _erdiagram_converter_oop_source_code_generator_java_validation_strategy_NotNullTextValidationStrategy__WEBPACK_IMPORTED_MODULE_1__.default.NOT_NULL,
            notNullBlobValidationStrategy: _erdiagram_converter_oop_source_code_generator_java_validation_strategy_NotNullBlobValidationStrategy__WEBPACK_IMPORTED_MODULE_2__.default.NOT_NULL,
            annotateGetters: false
        };
    }
    mergeConfigs(fullConfig, partialConfig) {
        return Object.assign(Object.assign({}, fullConfig), partialConfig);
    }
}
const javaxValidationTransformerConfigManager = new JavaxValidationTransformerConfigManager();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (javaxValidationTransformerConfigManager);


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/validation/config/exports.ts":
/*!**************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/validation/config/exports.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JavaxValidationTransformerConfigManager": () => (/* reexport safe */ _JavaxValidationTransformerConfigManager__WEBPACK_IMPORTED_MODULE_0__.JavaxValidationTransformerConfigManager),
/* harmony export */   "javaxValidationTransformerConfigManager": () => (/* reexport safe */ _JavaxValidationTransformerConfigManager__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _JavaxValidationTransformerConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./JavaxValidationTransformerConfigManager */ "./src/main/erdiagram/converter/oop/source-code-generator/java/validation/config/JavaxValidationTransformerConfigManager.ts");




/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/validation/exports.ts":
/*!*******************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/validation/exports.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JavaxValidationTransformerConfigManager": () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_3__.JavaxValidationTransformerConfigManager),
/* harmony export */   "javaxValidationTransformerConfigManager": () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_3__.javaxValidationTransformerConfigManager),
/* harmony export */   "NotNullTextValidationStrategy": () => (/* reexport safe */ _erdiagram_converter_oop_source_code_generator_java_validation_strategy_NotNullTextValidationStrategy__WEBPACK_IMPORTED_MODULE_0__.default),
/* harmony export */   "NotNullBlobValidationStrategy": () => (/* reexport safe */ _erdiagram_converter_oop_source_code_generator_java_validation_strategy_NotNullBlobValidationStrategy__WEBPACK_IMPORTED_MODULE_1__.default),
/* harmony export */   "JavaxValidationTransformer": () => (/* reexport safe */ _erdiagram_converter_oop_source_code_generator_java_validation_JavaxValidationTransformer__WEBPACK_IMPORTED_MODULE_2__.default)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_validation_strategy_NotNullTextValidationStrategy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/validation/strategy/NotNullTextValidationStrategy */ "./src/main/erdiagram/converter/oop/source-code-generator/java/validation/strategy/NotNullTextValidationStrategy.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_validation_strategy_NotNullBlobValidationStrategy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/validation/strategy/NotNullBlobValidationStrategy */ "./src/main/erdiagram/converter/oop/source-code-generator/java/validation/strategy/NotNullBlobValidationStrategy.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_validation_JavaxValidationTransformer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/validation/JavaxValidationTransformer */ "./src/main/erdiagram/converter/oop/source-code-generator/java/validation/JavaxValidationTransformer.ts");
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

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/validation/visitor/JavaxValidationAnnotationsSupplier.ts":
/*!******************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/validation/visitor/JavaxValidationAnnotationsSupplier.ts ***!
  \******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ JavaxValidationAnnotationsSupplier)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/entity-relationship-model-types */ "./src/main/erdiagram/parser/types/entity-relationship-model-types.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_validation_strategy_NotNullTextValidationStrategy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/validation/strategy/NotNullTextValidationStrategy */ "./src/main/erdiagram/converter/oop/source-code-generator/java/validation/strategy/NotNullTextValidationStrategy.ts");
/* harmony import */ var _erdiagram_util_array_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/util/array-utils */ "./src/main/erdiagram/util/array-utils.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_validation_JavaValidationAnnotationTypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/validation/JavaValidationAnnotationTypes */ "./src/main/erdiagram/converter/oop/source-code-generator/java/validation/JavaValidationAnnotationTypes.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_validation_strategy_NotNullBlobValidationStrategy__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/validation/strategy/NotNullBlobValidationStrategy */ "./src/main/erdiagram/converter/oop/source-code-generator/java/validation/strategy/NotNullBlobValidationStrategy.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/java/annotation/JavaAnnotation */ "./src/main/erdiagram/converter/oop/source-code-generator/java/annotation/JavaAnnotation.ts");
/* harmony import */ var _erdiagram_parser_types_error_ERDiagramSyntaxError__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/erdiagram/parser/types/error/ERDiagramSyntaxError */ "./src/main/erdiagram/parser/types/error/ERDiagramSyntaxError.ts");







class JavaxValidationAnnotationsSupplier {
    constructor(notNullTextValidationStrategy, notNullBlobValidationStrategy) {
        this.notNullTextValidationStrategy = notNullTextValidationStrategy;
        this.notNullBlobValidationStrategy = notNullBlobValidationStrategy;
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
        return new _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_5__.default(annotationType);
    }
    getSizeAnnotation(field) {
        const { maxSize } = field;
        if (maxSize == null) {
            return null;
        }
        return new _erdiagram_converter_oop_source_code_generator_java_annotation_JavaAnnotation__WEBPACK_IMPORTED_MODULE_5__.default(_erdiagram_converter_oop_source_code_generator_java_validation_JavaValidationAnnotationTypes__WEBPACK_IMPORTED_MODULE_3__.default.Size, { max: maxSize });
    }
    getNotNullAnnotationForField(field) {
        switch (field.primitiveType) {
            case _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.TEXT:
                return this.getNotNullAnnotationForTextType();
            case _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.BLOB:
                return this.getNotNullAnnotationForBlobType();
            default:
                return _erdiagram_converter_oop_source_code_generator_java_validation_JavaValidationAnnotationTypes__WEBPACK_IMPORTED_MODULE_3__.default.NotNull;
        }
    }
    getNotNullAnnotationForTextType() {
        switch (this.notNullTextValidationStrategy) {
            case _erdiagram_converter_oop_source_code_generator_java_validation_strategy_NotNullTextValidationStrategy__WEBPACK_IMPORTED_MODULE_1__.default.NOT_NULL:
                return _erdiagram_converter_oop_source_code_generator_java_validation_JavaValidationAnnotationTypes__WEBPACK_IMPORTED_MODULE_3__.default.NotNull;
            case _erdiagram_converter_oop_source_code_generator_java_validation_strategy_NotNullTextValidationStrategy__WEBPACK_IMPORTED_MODULE_1__.default.NOT_EMPTY:
                return _erdiagram_converter_oop_source_code_generator_java_validation_JavaValidationAnnotationTypes__WEBPACK_IMPORTED_MODULE_3__.default.NotEmpty;
            case _erdiagram_converter_oop_source_code_generator_java_validation_strategy_NotNullTextValidationStrategy__WEBPACK_IMPORTED_MODULE_1__.default.NOT_BLANK:
                return _erdiagram_converter_oop_source_code_generator_java_validation_JavaValidationAnnotationTypes__WEBPACK_IMPORTED_MODULE_3__.default.NotBlank;
            /* istanbul ignore next */
            default:
                /* istanbul ignore next */
                throw new _erdiagram_parser_types_error_ERDiagramSyntaxError__WEBPACK_IMPORTED_MODULE_6__.default(`Unknown statement type`);
        }
    }
    getNotNullAnnotationForBlobType() {
        switch (this.notNullBlobValidationStrategy) {
            case _erdiagram_converter_oop_source_code_generator_java_validation_strategy_NotNullBlobValidationStrategy__WEBPACK_IMPORTED_MODULE_4__.default.NOT_NULL:
                return _erdiagram_converter_oop_source_code_generator_java_validation_JavaValidationAnnotationTypes__WEBPACK_IMPORTED_MODULE_3__.default.NotNull;
            case _erdiagram_converter_oop_source_code_generator_java_validation_strategy_NotNullBlobValidationStrategy__WEBPACK_IMPORTED_MODULE_4__.default.NOT_EMPTY:
                return _erdiagram_converter_oop_source_code_generator_java_validation_JavaValidationAnnotationTypes__WEBPACK_IMPORTED_MODULE_3__.default.NotEmpty;
            /* istanbul ignore next */
            default:
                /* istanbul ignore next */
                throw new _erdiagram_parser_types_error_ERDiagramSyntaxError__WEBPACK_IMPORTED_MODULE_6__.default(`Unknown statement type`);
        }
    }
}


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/java/validation/visitor/JavaxValidationFieldVisitor.ts":
/*!***********************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/java/validation/visitor/JavaxValidationFieldVisitor.ts ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ JavaxValidationFieldVisitor)
/* harmony export */ });
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _javaValidationAnnotationsGenerator, _annotateGetters;
class JavaxValidationFieldVisitor {
    constructor(javaValidationAnnotationsGenerator, annotateGetters) {
        _javaValidationAnnotationsGenerator.set(this, void 0);
        _annotateGetters.set(this, void 0);
        __classPrivateFieldSet(this, _javaValidationAnnotationsGenerator, javaValidationAnnotationsGenerator);
        __classPrivateFieldSet(this, _annotateGetters, annotateGetters);
    }
    visitField(javaField, context) {
        const annotations = __classPrivateFieldGet(this, _javaValidationAnnotationsGenerator).getAnnotations(context.fieldDescriptor);
        const elementToAnnotate = this.getElementToAnnotate(javaField);
        elementToAnnotate.annotations.push(...annotations);
    }
    getElementToAnnotate(javaField) {
        if (__classPrivateFieldGet(this, _annotateGetters) && javaField.getter != null) {
            return javaField.getter;
        }
        return javaField;
    }
}
_javaValidationAnnotationsGenerator = new WeakMap(), _annotateGetters = new WeakMap();


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
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_typescript_config_TypeScriptClassModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/typescript/config/TypeScriptClassModelToCodeConverterConfigManager */ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/config/TypeScriptClassModelToCodeConverterConfigManager.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_typescript_type_TypeScriptTypeResolver__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/typescript/type/TypeScriptTypeResolver */ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/type/TypeScriptTypeResolver.ts");




class TypeScriptClassModelToCodeConverter {
    constructor(config) {
        this.config = _erdiagram_converter_oop_source_code_generator_typescript_config_TypeScriptClassModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_2__.default.mergeWithDefaultConfig(config);
        this.typeResolver = new _erdiagram_converter_oop_source_code_generator_typescript_type_TypeScriptTypeResolver__WEBPACK_IMPORTED_MODULE_3__.default(this.config.typeBindings);
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

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/TypeScriptEntityRelationshipModelSourceCodeGenerator.ts":
/*!***********************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/typescript/TypeScriptEntityRelationshipModelSourceCodeGenerator.ts ***!
  \***********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TypeScriptEntityRelationshipModelSourceCodeGenerator)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_typescript_TypeScriptEntityRelationshipModelSourceCodeGeneratorBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/typescript/TypeScriptEntityRelationshipModelSourceCodeGeneratorBuilder */ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/TypeScriptEntityRelationshipModelSourceCodeGeneratorBuilder.ts");
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _classModelGenerator, _typeScriptClassModelToCodeConverter;

class TypeScriptEntityRelationshipModelSourceCodeGenerator {
    constructor(classModelGenerator, typeScriptClassModelToCodeConverter) {
        _classModelGenerator.set(this, void 0);
        _typeScriptClassModelToCodeConverter.set(this, void 0);
        __classPrivateFieldSet(this, _classModelGenerator, classModelGenerator);
        __classPrivateFieldSet(this, _typeScriptClassModelToCodeConverter, typeScriptClassModelToCodeConverter);
    }
    generateSourceCode(entityRelationshipModel) {
        const classModel = __classPrivateFieldGet(this, _classModelGenerator).generateClassModel(entityRelationshipModel);
        return __classPrivateFieldGet(this, _typeScriptClassModelToCodeConverter).convertToCode(classModel);
    }
    static withDefaultConfig() {
        return this.builder().build();
    }
    static builder() {
        return new _erdiagram_converter_oop_source_code_generator_typescript_TypeScriptEntityRelationshipModelSourceCodeGeneratorBuilder__WEBPACK_IMPORTED_MODULE_0__.default();
    }
}
_classModelGenerator = new WeakMap(), _typeScriptClassModelToCodeConverter = new WeakMap();


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/TypeScriptEntityRelationshipModelSourceCodeGeneratorBuilder.ts":
/*!******************************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/typescript/TypeScriptEntityRelationshipModelSourceCodeGeneratorBuilder.ts ***!
  \******************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TypeScriptEntityRelationshipModelSourceCodeGeneratorBuilder)
/* harmony export */ });
/* harmony import */ var _erdiagram_converter_oop_model_ClassModelGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/converter/oop/model/ClassModelGenerator */ "./src/main/erdiagram/converter/oop/model/ClassModelGenerator.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_typescript_TypeScriptClassModelToCodeConverter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/typescript/TypeScriptClassModelToCodeConverter */ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/TypeScriptClassModelToCodeConverter.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_typescript_TypeScriptEntityRelationshipModelSourceCodeGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/typescript/TypeScriptEntityRelationshipModelSourceCodeGenerator */ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/TypeScriptEntityRelationshipModelSourceCodeGenerator.ts");
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _classModelGeneratorConfig, _typeScriptClassModelToCodeConverterConfig;



class TypeScriptEntityRelationshipModelSourceCodeGeneratorBuilder {
    constructor() {
        _classModelGeneratorConfig.set(this, {});
        _typeScriptClassModelToCodeConverterConfig.set(this, {});
    }
    withClassModelGeneratorConfig(config) {
        __classPrivateFieldSet(this, _classModelGeneratorConfig, config);
        return this;
    }
    withTypeScriptClassModelToCodeConverterConfig(config) {
        __classPrivateFieldSet(this, _typeScriptClassModelToCodeConverterConfig, config);
        return this;
    }
    build() {
        return new _erdiagram_converter_oop_source_code_generator_typescript_TypeScriptEntityRelationshipModelSourceCodeGenerator__WEBPACK_IMPORTED_MODULE_2__.default(new _erdiagram_converter_oop_model_ClassModelGenerator__WEBPACK_IMPORTED_MODULE_0__.default(__classPrivateFieldGet(this, _classModelGeneratorConfig)), new _erdiagram_converter_oop_source_code_generator_typescript_TypeScriptClassModelToCodeConverter__WEBPACK_IMPORTED_MODULE_1__.default(__classPrivateFieldGet(this, _typeScriptClassModelToCodeConverterConfig)));
    }
}
_classModelGeneratorConfig = new WeakMap(), _typeScriptClassModelToCodeConverterConfig = new WeakMap();


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/config/TypeScriptClassModelToCodeConverterConfigManager.ts":
/*!**************************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/typescript/config/TypeScriptClassModelToCodeConverterConfigManager.ts ***!
  \**************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TypeScriptClassModelToCodeConverterConfigManager": () => (/* binding */ TypeScriptClassModelToCodeConverterConfigManager),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/types/entity-relationship-model-types */ "./src/main/erdiagram/parser/types/entity-relationship-model-types.ts");
/* harmony import */ var _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/common/config/AbstractComponentConfigManager */ "./src/main/erdiagram/common/config/AbstractComponentConfigManager.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/typescript/type/parseTypeScriptType */ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/type/parseTypeScriptType.ts");
/* harmony import */ var true_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! true-json */ "./node_modules/true-json/dist/true-json.umd.js");
/* harmony import */ var true_json__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(true_json__WEBPACK_IMPORTED_MODULE_3__);




class TypeScriptClassModelToCodeConverterConfigManager extends _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_1__.default {
    getDefaultConfig() {
        return {
            typeBindings: {
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.IDENTITY]: (0,_erdiagram_converter_oop_source_code_generator_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__.default)('number'),
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.TEXT]: (0,_erdiagram_converter_oop_source_code_generator_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__.default)('string'),
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.LONG]: (0,_erdiagram_converter_oop_source_code_generator_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__.default)('number'),
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.INT]: (0,_erdiagram_converter_oop_source_code_generator_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__.default)('number'),
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.SHORT]: (0,_erdiagram_converter_oop_source_code_generator_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__.default)('number'),
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.DECIMAL]: (0,_erdiagram_converter_oop_source_code_generator_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__.default)('number'),
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.BOOLEAN]: (0,_erdiagram_converter_oop_source_code_generator_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__.default)('boolean'),
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.DATE]: (0,_erdiagram_converter_oop_source_code_generator_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__.default)('Date'),
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.TIME]: (0,_erdiagram_converter_oop_source_code_generator_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__.default)('Date'),
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.DATETIME]: (0,_erdiagram_converter_oop_source_code_generator_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__.default)('Date'),
                [_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.BLOB]: (0,_erdiagram_converter_oop_source_code_generator_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__.default)('Uint8Array'),
            }
        };
    }
    mergeConfigs(fullConfig, partialConfig) {
        return Object.assign(Object.assign(Object.assign({}, fullConfig), partialConfig), { typeBindings: Object.assign(Object.assign({}, fullConfig.typeBindings), partialConfig === null || partialConfig === void 0 ? void 0 : partialConfig.typeBindings) });
    }
    getJsonAdapter() {
        return true_json__WEBPACK_IMPORTED_MODULE_3__.JsonAdapters.object({
            typeBindings: true_json__WEBPACK_IMPORTED_MODULE_3__.JsonAdapters.record(true_json__WEBPACK_IMPORTED_MODULE_3__.JsonAdapters.custom({
                adaptToJson(value) {
                    return value.format();
                },
                recoverFromJson(value) {
                    return (0,_erdiagram_converter_oop_source_code_generator_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__.default)(value);
                }
            }))
        });
    }
}
const typescriptClassModelToCodeConverterConfigManager = new TypeScriptClassModelToCodeConverterConfigManager();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (typescriptClassModelToCodeConverterConfigManager);


/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/config/exports.ts":
/*!*********************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/typescript/config/exports.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TypeScriptClassModelToCodeConverterConfigManager": () => (/* reexport safe */ _TypeScriptClassModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_0__.TypeScriptClassModelToCodeConverterConfigManager),
/* harmony export */   "typescriptClassModelToCodeConverterConfigManager": () => (/* reexport safe */ _TypeScriptClassModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _TypeScriptClassModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TypeScriptClassModelToCodeConverterConfigManager */ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/config/TypeScriptClassModelToCodeConverterConfigManager.ts");




/***/ }),

/***/ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/exports.ts":
/*!**************************************************************************************!*\
  !*** ./src/main/erdiagram/converter/oop/source-code-generator/typescript/exports.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TypeScriptClassModelToCodeConverterConfigManager": () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_3__.TypeScriptClassModelToCodeConverterConfigManager),
/* harmony export */   "typescriptClassModelToCodeConverterConfigManager": () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_3__.typescriptClassModelToCodeConverterConfigManager),
/* harmony export */   "createTypeScriptArrayType": () => (/* reexport safe */ _type_exports__WEBPACK_IMPORTED_MODULE_4__.createTypeScriptArrayType),
/* harmony export */   "createTypeScriptParameterizedType": () => (/* reexport safe */ _type_exports__WEBPACK_IMPORTED_MODULE_4__.createTypeScriptParameterizedType),
/* harmony export */   "createTypeScriptSimpleType": () => (/* reexport safe */ _type_exports__WEBPACK_IMPORTED_MODULE_4__.createTypeScriptSimpleType),
/* harmony export */   "isTypeScriptParameterizedType": () => (/* reexport safe */ _type_exports__WEBPACK_IMPORTED_MODULE_4__.isTypeScriptParameterizedType),
/* harmony export */   "parseTypeScriptType": () => (/* reexport safe */ _type_exports__WEBPACK_IMPORTED_MODULE_4__.parseTypeScriptType),
/* harmony export */   "TypeScriptClassModelToCodeConverter": () => (/* reexport safe */ _TypeScriptClassModelToCodeConverter__WEBPACK_IMPORTED_MODULE_0__.default),
/* harmony export */   "TypeScriptEntityRelationshipModelSourceCodeGenerator": () => (/* reexport safe */ _erdiagram_converter_oop_source_code_generator_typescript_TypeScriptEntityRelationshipModelSourceCodeGenerator__WEBPACK_IMPORTED_MODULE_1__.default),
/* harmony export */   "TypeScriptEntityRelationshipModelSourceCodeGeneratorBuilder": () => (/* reexport safe */ _erdiagram_converter_oop_source_code_generator_typescript_TypeScriptEntityRelationshipModelSourceCodeGeneratorBuilder__WEBPACK_IMPORTED_MODULE_2__.default)
/* harmony export */ });
/* harmony import */ var _TypeScriptClassModelToCodeConverter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TypeScriptClassModelToCodeConverter */ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/TypeScriptClassModelToCodeConverter.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_typescript_TypeScriptEntityRelationshipModelSourceCodeGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/typescript/TypeScriptEntityRelationshipModelSourceCodeGenerator */ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/TypeScriptEntityRelationshipModelSourceCodeGenerator.ts");
/* harmony import */ var _erdiagram_converter_oop_source_code_generator_typescript_TypeScriptEntityRelationshipModelSourceCodeGeneratorBuilder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/converter/oop/source-code-generator/typescript/TypeScriptEntityRelationshipModelSourceCodeGeneratorBuilder */ "./src/main/erdiagram/converter/oop/source-code-generator/typescript/TypeScriptEntityRelationshipModelSourceCodeGeneratorBuilder.ts");
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
        return (0,_erdiagram_converter_oop_source_code_generator_typescript_type_parameterized_createTypeScriptArrayType__WEBPACK_IMPORTED_MODULE_0__.default)(this.resolveSingleType(field));
    }
    resolveSingleType(field) {
        const { entityType, primitiveType } = field;
        if (entityType) {
            if (primitiveType) {
                throw new Error('Invalid field descriptor: provided both primitive and entity types');
            }
            return (0,_erdiagram_converter_oop_source_code_generator_typescript_type_simple_createTypeScriptSimpleType__WEBPACK_IMPORTED_MODULE_1__.default)(entityType);
        }
        if (!primitiveType) {
            throw new Error('Invalid field descriptor: missing type');
        }
        /* istanbul ignore next */
        if (!this.typeBindings.hasOwnProperty(primitiveType)) {
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
/* harmony export */   "createTypeScriptSimpleType": () => (/* reexport safe */ _simple_createTypeScriptSimpleType__WEBPACK_IMPORTED_MODULE_4__.default),
/* harmony export */   "createTypeScriptParameterizedType": () => (/* reexport safe */ _parameterized_createTypeScriptParameterizedType__WEBPACK_IMPORTED_MODULE_1__.default),
/* harmony export */   "createTypeScriptArrayType": () => (/* reexport safe */ _parameterized_createTypeScriptArrayType__WEBPACK_IMPORTED_MODULE_2__.default),
/* harmony export */   "isTypeScriptParameterizedType": () => (/* reexport safe */ _parameterized_isTypeScriptParameterizedType__WEBPACK_IMPORTED_MODULE_3__.default),
/* harmony export */   "parseTypeScriptType": () => (/* reexport safe */ _parseTypeScriptType__WEBPACK_IMPORTED_MODULE_0__.default)
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
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _parameterType;
function createTypeScriptArrayType(parameterType) {
    return new TypeScriptArrayTypeImpl(parameterType);
}
class TypeScriptArrayTypeImpl {
    constructor(parameterType) {
        _parameterType.set(this, void 0);
        __classPrivateFieldSet(this, _parameterType, parameterType);
    }
    get name() {
        return 'Array';
    }
    get parameterTypes() {
        return [__classPrivateFieldGet(this, _parameterType)];
    }
    format() {
        const formattedParameterType = __classPrivateFieldGet(this, _parameterType).format();
        return `${formattedParameterType}[]`;
    }
}
_parameterType = new WeakMap();


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
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _name, _parameterTypes;
function createTypeScriptParameterizedType(name, parameterTypes) {
    return new TypeScriptParameterizedTypeImpl(name, parameterTypes);
}
class TypeScriptParameterizedTypeImpl {
    constructor(name, parameterTypes) {
        _name.set(this, void 0);
        _parameterTypes.set(this, void 0);
        __classPrivateFieldSet(this, _name, name);
        __classPrivateFieldSet(this, _parameterTypes, parameterTypes);
    }
    get name() {
        return __classPrivateFieldGet(this, _name);
    }
    get parameterTypes() {
        return __classPrivateFieldGet(this, _parameterTypes);
    }
    format() {
        const formattedParameterTypes = __classPrivateFieldGet(this, _parameterTypes).map(parameterType => parameterType.format()).join(', ');
        return `${__classPrivateFieldGet(this, _name)}<${formattedParameterTypes}>`;
    }
}
_name = new WeakMap(), _parameterTypes = new WeakMap();


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
        const [fullMatch, rawTypeText] = ARRAY_TYPE_REGEX.exec(trimmedText);
        return (0,_erdiagram_converter_oop_source_code_generator_typescript_type_parameterized_createTypeScriptArrayType__WEBPACK_IMPORTED_MODULE_1__.default)(parseTypeScriptTypeInternal(rawTypeText));
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
    return (0,_erdiagram_converter_oop_source_code_generator_typescript_type_parameterized_createTypeScriptParameterizedType__WEBPACK_IMPORTED_MODULE_0__.default)(rawType.name, parameterTypes);
}
function parseTypeScriptRawType(text) {
    const trimmedText = text.trim();
    if (!RAW_TYPE_REGEX.test(trimmedText)) {
        throw new Error(`Illegal TypeScript type format: ${text}`);
    }
    return (0,_erdiagram_converter_oop_source_code_generator_typescript_type_simple_createTypeScriptSimpleType__WEBPACK_IMPORTED_MODULE_2__.default)(trimmedText);
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
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _name;
function createTypeScriptSimpleType(name) {
    return new TypeScriptSimpleTypeImpl(name);
}
class TypeScriptSimpleTypeImpl {
    constructor(name) {
        _name.set(this, void 0);
        __classPrivateFieldSet(this, _name, name);
    }
    get name() {
        return __classPrivateFieldGet(this, _name);
    }
    format() {
        return __classPrivateFieldGet(this, _name);
    }
}
_name = new WeakMap();


/***/ }),

/***/ "./src/main/erdiagram/exports.ts":
/*!***************************************!*\
  !*** ./src/main/erdiagram/exports.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractComponentConfigManager": () => (/* reexport safe */ _common_exports__WEBPACK_IMPORTED_MODULE_0__.AbstractComponentConfigManager),
/* harmony export */   "CaseConverter": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.CaseConverter),
/* harmony export */   "ClassModelGenerator": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.ClassModelGenerator),
/* harmony export */   "ClassModelGeneratorConfigManager": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.ClassModelGeneratorConfigManager),
/* harmony export */   "DatabaseModelGenerator": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.DatabaseModelGenerator),
/* harmony export */   "DatabaseModelGeneratorConfigManager": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.DatabaseModelGeneratorConfigManager),
/* harmony export */   "DatabaseModelToSqlCodeConverter": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.DatabaseModelToSqlCodeConverter),
/* harmony export */   "JavaAnnotation": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.JavaAnnotation),
/* harmony export */   "JavaClassModelGenerator": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.JavaClassModelGenerator),
/* harmony export */   "JavaClassModelGeneratorConfigManager": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.JavaClassModelGeneratorConfigManager),
/* harmony export */   "JavaEntityRelationshipModelSourceCodeGenerator": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.JavaEntityRelationshipModelSourceCodeGenerator),
/* harmony export */   "JavaEntityRelationshipModelSourceCodeGeneratorBuilder": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.JavaEntityRelationshipModelSourceCodeGeneratorBuilder),
/* harmony export */   "JavaVisibility": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.JavaVisibility),
/* harmony export */   "JavaxValidationTransformer": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.JavaxValidationTransformer),
/* harmony export */   "JavaxValidationTransformerConfigManager": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.JavaxValidationTransformerConfigManager),
/* harmony export */   "JpaTransformer": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.JpaTransformer),
/* harmony export */   "JpaTransformerBuilder": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.JpaTransformerBuilder),
/* harmony export */   "JpaTransformerConfigManager": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.JpaTransformerConfigManager),
/* harmony export */   "MysqlDialect": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.MysqlDialect),
/* harmony export */   "MysqlDialectConfigManager": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.MysqlDialectConfigManager),
/* harmony export */   "NomnomlEntityRelationshipModelSourceCodeGenerator": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.NomnomlEntityRelationshipModelSourceCodeGenerator),
/* harmony export */   "NomnomlEntityRelationshipModelSourceCodeGeneratorConfigManager": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.NomnomlEntityRelationshipModelSourceCodeGeneratorConfigManager),
/* harmony export */   "NotNullBlobValidationStrategy": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.NotNullBlobValidationStrategy),
/* harmony export */   "NotNullTextValidationStrategy": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.NotNullTextValidationStrategy),
/* harmony export */   "OracleDialect": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.OracleDialect),
/* harmony export */   "OracleDialectConfigManager": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.OracleDialectConfigManager),
/* harmony export */   "PlantUmlEntityRelationshipModelSourceCodeGenerator": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.PlantUmlEntityRelationshipModelSourceCodeGenerator),
/* harmony export */   "PostgresqlDialect": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.PostgresqlDialect),
/* harmony export */   "PostgresqlDialectConfigManager": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.PostgresqlDialectConfigManager),
/* harmony export */   "SqlEntityRelationshipModelSourceCodeGenerator": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.SqlEntityRelationshipModelSourceCodeGenerator),
/* harmony export */   "SqlServerDialect": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.SqlServerDialect),
/* harmony export */   "SqlServerDialectConfigManager": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.SqlServerDialectConfigManager),
/* harmony export */   "SqliteDialect": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.SqliteDialect),
/* harmony export */   "SqliteDialectConfigManager": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.SqliteDialectConfigManager),
/* harmony export */   "StandardCaseFormats": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.StandardCaseFormats),
/* harmony export */   "StandardIdNamingStrategies": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.StandardIdNamingStrategies),
/* harmony export */   "TypeScriptClassModelToCodeConverter": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.TypeScriptClassModelToCodeConverter),
/* harmony export */   "TypeScriptClassModelToCodeConverterConfigManager": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.TypeScriptClassModelToCodeConverterConfigManager),
/* harmony export */   "TypeScriptEntityRelationshipModelSourceCodeGenerator": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.TypeScriptEntityRelationshipModelSourceCodeGenerator),
/* harmony export */   "TypeScriptEntityRelationshipModelSourceCodeGeneratorBuilder": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.TypeScriptEntityRelationshipModelSourceCodeGeneratorBuilder),
/* harmony export */   "classModelGeneratorConfigManager": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.classModelGeneratorConfigManager),
/* harmony export */   "createJavaArrayType": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.createJavaArrayType),
/* harmony export */   "createJavaParameterizedType": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.createJavaParameterizedType),
/* harmony export */   "createJavaSimpleType": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.createJavaSimpleType),
/* harmony export */   "createTypeScriptArrayType": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.createTypeScriptArrayType),
/* harmony export */   "createTypeScriptParameterizedType": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.createTypeScriptParameterizedType),
/* harmony export */   "createTypeScriptSimpleType": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.createTypeScriptSimpleType),
/* harmony export */   "databaseModelGeneratorConfigManager": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.databaseModelGeneratorConfigManager),
/* harmony export */   "isJavaParameterizedType": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.isJavaParameterizedType),
/* harmony export */   "isMultipleFileEntityRelationshipModelSourceCodeGenerator": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.isMultipleFileEntityRelationshipModelSourceCodeGenerator),
/* harmony export */   "isTypeScriptParameterizedType": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.isTypeScriptParameterizedType),
/* harmony export */   "javaClassModelGeneratorConfigManager": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.javaClassModelGeneratorConfigManager),
/* harmony export */   "javaxValidationTransformerConfigManager": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.javaxValidationTransformerConfigManager),
/* harmony export */   "jpaTransformerConfigManager": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.jpaTransformerConfigManager),
/* harmony export */   "mysqlDialectConfigManager": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.mysqlDialectConfigManager),
/* harmony export */   "nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager),
/* harmony export */   "oracleDialectConfigManager": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.oracleDialectConfigManager),
/* harmony export */   "parseJavaType": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.parseJavaType),
/* harmony export */   "parseTypeScriptType": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.parseTypeScriptType),
/* harmony export */   "postgresqlDialectConfigManager": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.postgresqlDialectConfigManager),
/* harmony export */   "sqlServerDialectConfigManager": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.sqlServerDialectConfigManager),
/* harmony export */   "sqliteDialectConfigManager": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.sqliteDialectConfigManager),
/* harmony export */   "typescriptClassModelToCodeConverterConfigManager": () => (/* reexport safe */ _converter_exports__WEBPACK_IMPORTED_MODULE_1__.typescriptClassModelToCodeConverterConfigManager),
/* harmony export */   "Cardinality": () => (/* reexport safe */ _parser_exports__WEBPACK_IMPORTED_MODULE_2__.Cardinality),
/* harmony export */   "Direction": () => (/* reexport safe */ _parser_exports__WEBPACK_IMPORTED_MODULE_2__.Direction),
/* harmony export */   "ERDiagramDuplicatedEntityNameError": () => (/* reexport safe */ _parser_exports__WEBPACK_IMPORTED_MODULE_2__.ERDiagramDuplicatedEntityNameError),
/* harmony export */   "ERDiagramDuplicatedPropertyNameError": () => (/* reexport safe */ _parser_exports__WEBPACK_IMPORTED_MODULE_2__.ERDiagramDuplicatedPropertyNameError),
/* harmony export */   "ERDiagramEntityError": () => (/* reexport safe */ _parser_exports__WEBPACK_IMPORTED_MODULE_2__.ERDiagramEntityError),
/* harmony export */   "ERDiagramEntityPropertyError": () => (/* reexport safe */ _parser_exports__WEBPACK_IMPORTED_MODULE_2__.ERDiagramEntityPropertyError),
/* harmony export */   "ERDiagramError": () => (/* reexport safe */ _parser_exports__WEBPACK_IMPORTED_MODULE_2__.ERDiagramError),
/* harmony export */   "ERDiagramInvalidIdentityDefinitionError": () => (/* reexport safe */ _parser_exports__WEBPACK_IMPORTED_MODULE_2__.ERDiagramInvalidIdentityDefinitionError),
/* harmony export */   "ERDiagramMultipleIdentitiesError": () => (/* reexport safe */ _parser_exports__WEBPACK_IMPORTED_MODULE_2__.ERDiagramMultipleIdentitiesError),
/* harmony export */   "ERDiagramParseLineError": () => (/* reexport safe */ _parser_exports__WEBPACK_IMPORTED_MODULE_2__.ERDiagramParseLineError),
/* harmony export */   "ERDiagramRelationshipError": () => (/* reexport safe */ _parser_exports__WEBPACK_IMPORTED_MODULE_2__.ERDiagramRelationshipError),
/* harmony export */   "ERDiagramSyntaxError": () => (/* reexport safe */ _parser_exports__WEBPACK_IMPORTED_MODULE_2__.ERDiagramSyntaxError),
/* harmony export */   "ERDiagramUnknownEntityError": () => (/* reexport safe */ _parser_exports__WEBPACK_IMPORTED_MODULE_2__.ERDiagramUnknownEntityError),
/* harmony export */   "ERDiagramUnknownTypeError": () => (/* reexport safe */ _parser_exports__WEBPACK_IMPORTED_MODULE_2__.ERDiagramUnknownTypeError),
/* harmony export */   "EntityPropertyType": () => (/* reexport safe */ _parser_exports__WEBPACK_IMPORTED_MODULE_2__.EntityPropertyType),
/* harmony export */   "EntityRelationshipModelParser": () => (/* reexport safe */ _parser_exports__WEBPACK_IMPORTED_MODULE_2__.EntityRelationshipModelParser),
/* harmony export */   "EntityRelationshipModelParserConfigManager": () => (/* reexport safe */ _parser_exports__WEBPACK_IMPORTED_MODULE_2__.EntityRelationshipModelParserConfigManager),
/* harmony export */   "entityRelationshipModelParserConfigManager": () => (/* reexport safe */ _parser_exports__WEBPACK_IMPORTED_MODULE_2__.entityRelationshipModelParserConfigManager)
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
    constructor(config) {
        this.config = _erdiagram_parser_config_EntityRelationshipModelParserConfigManager__WEBPACK_IMPORTED_MODULE_1__.default.mergeWithDefaultConfig(config);
        this.entityRelationshipModelParserWithoutValidation = new _erdiagram_parser_EntityRelationshipModelParserWithoutValidation__WEBPACK_IMPORTED_MODULE_3__.default();
        this.validator = new _erdiagram_parser_validator_EntityRelationshipModelParseResultValidator__WEBPACK_IMPORTED_MODULE_0__.default(this.config.allowUnknownEntities);
        this.parsedModelToPublicModelConverter = new _erdiagram_parser_ParsedModelToPublicModelConverter__WEBPACK_IMPORTED_MODULE_2__.default();
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
    constructor() {
        this.lineParser = new _erdiagram_parser_line_EntityRelationshipModelLineParser__WEBPACK_IMPORTED_MODULE_0__.default();
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
            identityPropertyName: identityProperty === null || identityProperty === void 0 ? void 0 : identityProperty.name,
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
/* harmony export */   "EntityRelationshipModelParserConfigManager": () => (/* binding */ EntityRelationshipModelParserConfigManager),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/common/config/AbstractComponentConfigManager */ "./src/main/erdiagram/common/config/AbstractComponentConfigManager.ts");

class EntityRelationshipModelParserConfigManager extends _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_0__.default {
    getDefaultConfig() {
        return {
            allowUnknownEntities: false
        };
    }
    mergeConfigs(fullConfig, partialConfig) {
        return Object.assign(Object.assign({}, fullConfig), partialConfig);
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
/* harmony export */   "EntityRelationshipModelParserConfigManager": () => (/* reexport safe */ _EntityRelationshipModelParserConfigManager__WEBPACK_IMPORTED_MODULE_0__.EntityRelationshipModelParserConfigManager),
/* harmony export */   "entityRelationshipModelParserConfigManager": () => (/* reexport safe */ _EntityRelationshipModelParserConfigManager__WEBPACK_IMPORTED_MODULE_0__.default)
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
/* harmony export */   "EntityRelationshipModelParserConfigManager": () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_1__.EntityRelationshipModelParserConfigManager),
/* harmony export */   "entityRelationshipModelParserConfigManager": () => (/* reexport safe */ _config_exports__WEBPACK_IMPORTED_MODULE_1__.entityRelationshipModelParserConfigManager),
/* harmony export */   "Cardinality": () => (/* reexport safe */ _types_exports__WEBPACK_IMPORTED_MODULE_2__.Cardinality),
/* harmony export */   "Direction": () => (/* reexport safe */ _types_exports__WEBPACK_IMPORTED_MODULE_2__.Direction),
/* harmony export */   "ERDiagramDuplicatedEntityNameError": () => (/* reexport safe */ _types_exports__WEBPACK_IMPORTED_MODULE_2__.ERDiagramDuplicatedEntityNameError),
/* harmony export */   "ERDiagramDuplicatedPropertyNameError": () => (/* reexport safe */ _types_exports__WEBPACK_IMPORTED_MODULE_2__.ERDiagramDuplicatedPropertyNameError),
/* harmony export */   "ERDiagramEntityError": () => (/* reexport safe */ _types_exports__WEBPACK_IMPORTED_MODULE_2__.ERDiagramEntityError),
/* harmony export */   "ERDiagramEntityPropertyError": () => (/* reexport safe */ _types_exports__WEBPACK_IMPORTED_MODULE_2__.ERDiagramEntityPropertyError),
/* harmony export */   "ERDiagramError": () => (/* reexport safe */ _types_exports__WEBPACK_IMPORTED_MODULE_2__.ERDiagramError),
/* harmony export */   "ERDiagramInvalidIdentityDefinitionError": () => (/* reexport safe */ _types_exports__WEBPACK_IMPORTED_MODULE_2__.ERDiagramInvalidIdentityDefinitionError),
/* harmony export */   "ERDiagramMultipleIdentitiesError": () => (/* reexport safe */ _types_exports__WEBPACK_IMPORTED_MODULE_2__.ERDiagramMultipleIdentitiesError),
/* harmony export */   "ERDiagramParseLineError": () => (/* reexport safe */ _types_exports__WEBPACK_IMPORTED_MODULE_2__.ERDiagramParseLineError),
/* harmony export */   "ERDiagramRelationshipError": () => (/* reexport safe */ _types_exports__WEBPACK_IMPORTED_MODULE_2__.ERDiagramRelationshipError),
/* harmony export */   "ERDiagramSyntaxError": () => (/* reexport safe */ _types_exports__WEBPACK_IMPORTED_MODULE_2__.ERDiagramSyntaxError),
/* harmony export */   "ERDiagramUnknownEntityError": () => (/* reexport safe */ _types_exports__WEBPACK_IMPORTED_MODULE_2__.ERDiagramUnknownEntityError),
/* harmony export */   "ERDiagramUnknownTypeError": () => (/* reexport safe */ _types_exports__WEBPACK_IMPORTED_MODULE_2__.ERDiagramUnknownTypeError),
/* harmony export */   "EntityPropertyType": () => (/* reexport safe */ _types_exports__WEBPACK_IMPORTED_MODULE_2__.EntityPropertyType),
/* harmony export */   "EntityRelationshipModelParser": () => (/* reexport safe */ _EntityRelationshipModelParser__WEBPACK_IMPORTED_MODULE_0__.default)
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
    constructor() {
        this.errorHandler = new _erdiagram_parser_line_EntityRelationshipModelLineParserErrorHandler__WEBPACK_IMPORTED_MODULE_2__.default();
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
                throw new _erdiagram_parser_types_error_ERDiagramSyntaxError__WEBPACK_IMPORTED_MODULE_3__.default(`Unknown statement type`);
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
            throw new _erdiagram_parser_types_error_ERDiagramSyntaxError__WEBPACK_IMPORTED_MODULE_3__.default('Unexpected entity property statement');
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
        if (error instanceof _erdiagram_parser_types_error_ERDiagramError__WEBPACK_IMPORTED_MODULE_0__.default) {
            throw new _erdiagram_parser_types_error_ERDiagramParseLineError__WEBPACK_IMPORTED_MODULE_1__.default(error, lineIndex);
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
/* harmony export */   "StatementType": () => (/* binding */ StatementType),
/* harmony export */   "guessStatementType": () => (/* binding */ guessStatementType)
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
/* harmony export */   "parseEntityNameStatement": () => (/* binding */ parseEntityNameStatement),
/* harmony export */   "parseEntityPropertyStatement": () => (/* binding */ parseEntityPropertyStatement),
/* harmony export */   "parseRelationshipStatement": () => (/* binding */ parseRelationshipStatement)
/* harmony export */ });
/* harmony import */ var _erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/util/string-utils */ "./src/main/erdiagram/util/string-utils.ts");
/* harmony import */ var _erdiagram_parser_statement_statement_types_regexes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/parser/statement/statement-types-regexes */ "./src/main/erdiagram/parser/statement/statement-types-regexes.ts");
/* harmony import */ var _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/parser/types/entity-relationship-model-types */ "./src/main/erdiagram/parser/types/entity-relationship-model-types.ts");
/* harmony import */ var _erdiagram_parser_types_error_ERDiagramSyntaxError__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/parser/types/error/ERDiagramSyntaxError */ "./src/main/erdiagram/parser/types/error/ERDiagramSyntaxError.ts");
/* harmony import */ var _erdiagram_parser_types_error_ERDiagramUnknownTypeError__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/erdiagram/parser/types/error/ERDiagramUnknownTypeError */ "./src/main/erdiagram/parser/types/error/ERDiagramUnknownTypeError.ts");





function parseEntityNameStatement(line) {
    const result = _erdiagram_parser_statement_statement_types_regexes__WEBPACK_IMPORTED_MODULE_1__.ENTITY_NAME_LINE_REGEX.exec(line);
    if (result == null) {
        throw new _erdiagram_parser_types_error_ERDiagramSyntaxError__WEBPACK_IMPORTED_MODULE_3__.default('Syntax error');
    }
    const [fullMatch, entityName] = result;
    return (0,_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_0__.capitalizeWord)(entityName);
}
function parseEntityPropertyStatement(line) {
    const result = _erdiagram_parser_statement_statement_types_regexes__WEBPACK_IMPORTED_MODULE_1__.ENTITY_PROPERTY_LINE_REGEX.exec(line);
    if (result == null) {
        throw new _erdiagram_parser_types_error_ERDiagramSyntaxError__WEBPACK_IMPORTED_MODULE_3__.default('Syntax error');
    }
    const [fullMatch, name, modifiers, type, length] = result;
    const mappedType = type.toLowerCase();
    if (!Object.values(_erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__.EntityPropertyType).includes(mappedType)) {
        throw new _erdiagram_parser_types_error_ERDiagramUnknownTypeError__WEBPACK_IMPORTED_MODULE_4__.default('Unknown type: ' + type);
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
        throw new _erdiagram_parser_types_error_ERDiagramSyntaxError__WEBPACK_IMPORTED_MODULE_3__.default('Syntax error');
    }
    const [fullMatch, leftEntity, leftEntityAlias = leftEntity, leftCardinalityCharacter, direction, rightCardinalityCharacter, rightEntity, rightEntityAlias = rightEntity, relationshipName] = result;
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
/* harmony export */   "ENTITY_NAME_LINE_REGEX": () => (/* binding */ ENTITY_NAME_LINE_REGEX),
/* harmony export */   "ENTITY_PROPERTY_LINE_REGEX": () => (/* binding */ ENTITY_PROPERTY_LINE_REGEX),
/* harmony export */   "RELATIONSHIP_LINE_REGEX": () => (/* binding */ RELATIONSHIP_LINE_REGEX)
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
/* harmony export */   "EntityPropertyType": () => (/* binding */ EntityPropertyType),
/* harmony export */   "Cardinality": () => (/* binding */ Cardinality),
/* harmony export */   "Direction": () => (/* binding */ Direction)
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

class ERDiagramDuplicatedEntityNameError extends _erdiagram_parser_types_error_ERDiagramEntityError__WEBPACK_IMPORTED_MODULE_0__.default {
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

class ERDiagramDuplicatedPropertyNameError extends _erdiagram_parser_types_error_ERDiagramEntityPropertyError__WEBPACK_IMPORTED_MODULE_0__.default {
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

class ERDiagramEntityError extends _erdiagram_parser_types_error_ERDiagramError__WEBPACK_IMPORTED_MODULE_0__.default {
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

class ERDiagramEntityPropertyError extends _erdiagram_parser_types_error_ERDiagramEntityError__WEBPACK_IMPORTED_MODULE_0__.default {
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

class ERDiagramInvalidIdentityDefinitionError extends _erdiagram_parser_types_error_ERDiagramEntityPropertyError__WEBPACK_IMPORTED_MODULE_0__.default {
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

class ERDiagramMultipleIdentitiesError extends _erdiagram_parser_types_error_ERDiagramEntityPropertyError__WEBPACK_IMPORTED_MODULE_0__.default {
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

class ERDiagramParseLineError extends _erdiagram_parser_types_error_ERDiagramError__WEBPACK_IMPORTED_MODULE_0__.default {
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

class ERDiagramRelationshipError extends _erdiagram_parser_types_error_ERDiagramError__WEBPACK_IMPORTED_MODULE_0__.default {
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

class ERDiagramSyntaxError extends _erdiagram_parser_types_error_ERDiagramError__WEBPACK_IMPORTED_MODULE_0__.default {
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

class ERDiagramUnknownEntityError extends _erdiagram_parser_types_error_ERDiagramRelationshipError__WEBPACK_IMPORTED_MODULE_0__.default {
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

class ERDiagramUnknownTypeError extends _erdiagram_parser_types_error_ERDiagramError__WEBPACK_IMPORTED_MODULE_0__.default {
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
/* harmony export */   "ERDiagramError": () => (/* reexport safe */ _ERDiagramError__WEBPACK_IMPORTED_MODULE_0__.default),
/* harmony export */   "ERDiagramParseLineError": () => (/* reexport safe */ _ERDiagramParseLineError__WEBPACK_IMPORTED_MODULE_1__.default),
/* harmony export */   "ERDiagramSyntaxError": () => (/* reexport safe */ _ERDiagramSyntaxError__WEBPACK_IMPORTED_MODULE_2__.default),
/* harmony export */   "ERDiagramUnknownTypeError": () => (/* reexport safe */ _ERDiagramUnknownTypeError__WEBPACK_IMPORTED_MODULE_3__.default),
/* harmony export */   "ERDiagramRelationshipError": () => (/* reexport safe */ _ERDiagramRelationshipError__WEBPACK_IMPORTED_MODULE_4__.default),
/* harmony export */   "ERDiagramUnknownEntityError": () => (/* reexport safe */ _ERDiagramUnknownEntityError__WEBPACK_IMPORTED_MODULE_5__.default),
/* harmony export */   "ERDiagramEntityError": () => (/* reexport safe */ _ERDiagramEntityError__WEBPACK_IMPORTED_MODULE_6__.default),
/* harmony export */   "ERDiagramDuplicatedEntityNameError": () => (/* reexport safe */ _ERDiagramDuplicatedEntityNameError__WEBPACK_IMPORTED_MODULE_7__.default),
/* harmony export */   "ERDiagramEntityPropertyError": () => (/* reexport safe */ _ERDiagramEntityPropertyError__WEBPACK_IMPORTED_MODULE_8__.default),
/* harmony export */   "ERDiagramMultipleIdentitiesError": () => (/* reexport safe */ _ERDiagramMultipleIdentitiesError__WEBPACK_IMPORTED_MODULE_9__.default),
/* harmony export */   "ERDiagramInvalidIdentityDefinitionError": () => (/* reexport safe */ _ERDiagramInvalidIdentityDefinitionError__WEBPACK_IMPORTED_MODULE_10__.default),
/* harmony export */   "ERDiagramDuplicatedPropertyNameError": () => (/* reexport safe */ _ERDiagramDuplicatedPropertyNameError__WEBPACK_IMPORTED_MODULE_11__.default)
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
/* harmony export */   "Cardinality": () => (/* reexport safe */ _entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.Cardinality),
/* harmony export */   "Direction": () => (/* reexport safe */ _entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.Direction),
/* harmony export */   "EntityPropertyType": () => (/* reexport safe */ _entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType),
/* harmony export */   "ERDiagramDuplicatedEntityNameError": () => (/* reexport safe */ _error_exports__WEBPACK_IMPORTED_MODULE_1__.ERDiagramDuplicatedEntityNameError),
/* harmony export */   "ERDiagramDuplicatedPropertyNameError": () => (/* reexport safe */ _error_exports__WEBPACK_IMPORTED_MODULE_1__.ERDiagramDuplicatedPropertyNameError),
/* harmony export */   "ERDiagramEntityError": () => (/* reexport safe */ _error_exports__WEBPACK_IMPORTED_MODULE_1__.ERDiagramEntityError),
/* harmony export */   "ERDiagramEntityPropertyError": () => (/* reexport safe */ _error_exports__WEBPACK_IMPORTED_MODULE_1__.ERDiagramEntityPropertyError),
/* harmony export */   "ERDiagramError": () => (/* reexport safe */ _error_exports__WEBPACK_IMPORTED_MODULE_1__.ERDiagramError),
/* harmony export */   "ERDiagramInvalidIdentityDefinitionError": () => (/* reexport safe */ _error_exports__WEBPACK_IMPORTED_MODULE_1__.ERDiagramInvalidIdentityDefinitionError),
/* harmony export */   "ERDiagramMultipleIdentitiesError": () => (/* reexport safe */ _error_exports__WEBPACK_IMPORTED_MODULE_1__.ERDiagramMultipleIdentitiesError),
/* harmony export */   "ERDiagramParseLineError": () => (/* reexport safe */ _error_exports__WEBPACK_IMPORTED_MODULE_1__.ERDiagramParseLineError),
/* harmony export */   "ERDiagramRelationshipError": () => (/* reexport safe */ _error_exports__WEBPACK_IMPORTED_MODULE_1__.ERDiagramRelationshipError),
/* harmony export */   "ERDiagramSyntaxError": () => (/* reexport safe */ _error_exports__WEBPACK_IMPORTED_MODULE_1__.ERDiagramSyntaxError),
/* harmony export */   "ERDiagramUnknownEntityError": () => (/* reexport safe */ _error_exports__WEBPACK_IMPORTED_MODULE_1__.ERDiagramUnknownEntityError),
/* harmony export */   "ERDiagramUnknownTypeError": () => (/* reexport safe */ _error_exports__WEBPACK_IMPORTED_MODULE_1__.ERDiagramUnknownTypeError)
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
    constructor(allowUnknownEntities) {
        this.allowUnknownEntities = allowUnknownEntities;
        this.errorHandler = new _erdiagram_parser_validator_EntityRelationshipModelParseResultValidatorErrorHandler__WEBPACK_IMPORTED_MODULE_1__.default();
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
                throw new _erdiagram_parser_types_error_ERDiagramDuplicatedEntityNameError__WEBPACK_IMPORTED_MODULE_3__.default(`Repeated entity "${entityName}"`, entity);
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
                    throw new _erdiagram_parser_types_error_ERDiagramDuplicatedPropertyNameError__WEBPACK_IMPORTED_MODULE_6__.default(`Repeated property "${propertyName}" in "${entity.name}" entity`, entity, property);
                }
                entityPropertyNames.add(propertyName);
            });
        });
    }
    validateIdentityProperties(model) {
        model.entities.forEach(entity => {
            const identityProperties = entity.properties.filter(property => property.type === _erdiagram_parser_types_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__.EntityPropertyType.IDENTITY);
            if (identityProperties.length > 1) {
                throw new _erdiagram_parser_types_error_ERDiagramMultipleIdentitiesError__WEBPACK_IMPORTED_MODULE_4__.default(`Entity ${entity.name} has more than one identity property`, entity, identityProperties);
            }
            const identityProperty = identityProperties[0];
            if (identityProperty != null) {
                if (identityProperty.optional) {
                    throw new _erdiagram_parser_types_error_ERDiagramInvalidIdentityDefinitionError__WEBPACK_IMPORTED_MODULE_5__.default('Optional modifier (?) cannot be used in identity properties', entity, identityProperty);
                }
                if (identityProperty.unique) {
                    throw new _erdiagram_parser_types_error_ERDiagramInvalidIdentityDefinitionError__WEBPACK_IMPORTED_MODULE_5__.default('Unique modifier (!) cannot be used in identity properties', entity, identityProperty);
                }
                if (identityProperty.length.length > 0) {
                    throw new _erdiagram_parser_types_error_ERDiagramInvalidIdentityDefinitionError__WEBPACK_IMPORTED_MODULE_5__.default('Identity properties cannot have a length', entity, identityProperty);
                }
            }
        });
    }
    validateRelationshipsHaveNoUnknownEntities(model) {
        const entityNames = model.entities.map(e => e.name);
        model.relationships.forEach(relationship => {
            if (!entityNames.includes(relationship.leftMember.entity)) {
                throw new _erdiagram_parser_types_error_ERDiagramUnknownEntityError__WEBPACK_IMPORTED_MODULE_2__.default(`Uknown entity "${relationship.leftMember.entity}" in relationship's left member`, relationship, relationship.leftMember);
            }
            if (!entityNames.includes(relationship.rightMember.entity)) {
                throw new _erdiagram_parser_types_error_ERDiagramUnknownEntityError__WEBPACK_IMPORTED_MODULE_2__.default(`Uknown entity "${relationship.rightMember.entity}" in relationship's right member`, relationship, relationship.rightMember);
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
        if (error instanceof _erdiagram_parser_types_error_ERDiagramEntityPropertyError__WEBPACK_IMPORTED_MODULE_3__.default) {
            throw new _erdiagram_parser_types_error_ERDiagramParseLineError__WEBPACK_IMPORTED_MODULE_0__.default(error, statementResultToLineMap.get(error.property));
        }
        if (error instanceof _erdiagram_parser_types_error_ERDiagramEntityError__WEBPACK_IMPORTED_MODULE_2__.default) {
            throw new _erdiagram_parser_types_error_ERDiagramParseLineError__WEBPACK_IMPORTED_MODULE_0__.default(error, statementResultToLineMap.get(error.entity));
        }
        /* istanbul ignore else */
        if (error instanceof _erdiagram_parser_types_error_ERDiagramRelationshipError__WEBPACK_IMPORTED_MODULE_1__.default) {
            throw new _erdiagram_parser_types_error_ERDiagramParseLineError__WEBPACK_IMPORTED_MODULE_0__.default(error, statementResultToLineMap.get(error.relationship));
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
/* harmony export */   "removeDuplicates": () => (/* binding */ removeDuplicates),
/* harmony export */   "removeNullableValues": () => (/* binding */ removeNullableValues)
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
/* harmony export */   "indentLines": () => (/* binding */ indentLines),
/* harmony export */   "indentLine": () => (/* binding */ indentLine)
/* harmony export */ });
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "classifyBy": () => (/* binding */ classifyBy)
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
/* harmony export */   "escapeRegExpSpecialChars": () => (/* binding */ escapeRegExpSpecialChars),
/* harmony export */   "joinRegExps": () => (/* binding */ joinRegExps)
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
/* harmony export */   "capitalizeWord": () => (/* binding */ capitalizeWord),
/* harmony export */   "uncapitalizeWord": () => (/* binding */ uncapitalizeWord),
/* harmony export */   "removeNonEmptyStrings": () => (/* binding */ removeNonEmptyStrings)
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

ERDiagram = __webpack_exports__.default;
/******/ })()
;
//# sourceMappingURL=erdiagram.js.map