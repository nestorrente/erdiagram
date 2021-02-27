/*!
 * Entity-Relationship Diagram Code Generator v0.1.0-alpha.1
 * https://github.com/nestorrente/erdiagram
 * 
 * Released under the MIT License.
 * 
 * Build date: 2021-02-27T11:09:31.562Z
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

/***/ "./src/main/erdiagram/common/config/AbstractComponentConfigManager.ts":
/*!****************************************************************************!*\
  !*** ./src/main/erdiagram/common/config/AbstractComponentConfigManager.ts ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var AbstractComponentConfigManager = /** @class */ (function () {
    function AbstractComponentConfigManager() {
    }
    AbstractComponentConfigManager.prototype.mergeWithDefaultConfig = function (partialConfig) {
        return this.mergeConfigs(this.getDefaultConfig(), partialConfig);
    };
    AbstractComponentConfigManager.prototype.cloneConfig = function (fullConfig) {
        return this.mergeConfigs(fullConfig);
    };
    return AbstractComponentConfigManager;
}());
/* harmony default export */ __webpack_exports__["default"] = (AbstractComponentConfigManager);


/***/ }),

/***/ "./src/main/erdiagram/common/config/exports.ts":
/*!*****************************************************!*\
  !*** ./src/main/erdiagram/common/config/exports.ts ***!
  \*****************************************************/
/*! exports provided: AbstractComponentConfigManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/common/config/AbstractComponentConfigManager */ "./src/main/erdiagram/common/config/AbstractComponentConfigManager.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AbstractComponentConfigManager", function() { return _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"]; });





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
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_exports__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common/exports */ "./src/main/erdiagram/common/exports.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AbstractComponentConfigManager", function() { return _common_exports__WEBPACK_IMPORTED_MODULE_0__["AbstractComponentConfigManager"]; });

/* harmony import */ var _generator_exports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./generator/exports */ "./src/main/erdiagram/generator/exports.ts");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _generator_exports__WEBPACK_IMPORTED_MODULE_1__) if(["default","AbstractComponentConfigManager"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _generator_exports__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _parser_exports__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parser/exports */ "./src/main/erdiagram/parser/exports.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EntityRelationshipModelParserConfigManager", function() { return _parser_exports__WEBPACK_IMPORTED_MODULE_2__["EntityRelationshipModelParserConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "entityRelationshipModelParserConfigManager", function() { return _parser_exports__WEBPACK_IMPORTED_MODULE_2__["entityRelationshipModelParserConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Cardinality", function() { return _parser_exports__WEBPACK_IMPORTED_MODULE_2__["Cardinality"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Direction", function() { return _parser_exports__WEBPACK_IMPORTED_MODULE_2__["Direction"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EntityPropertyType", function() { return _parser_exports__WEBPACK_IMPORTED_MODULE_2__["EntityPropertyType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERDiagramParseError", function() { return _parser_exports__WEBPACK_IMPORTED_MODULE_2__["ERDiagramParseError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERDiagramSyntaxError", function() { return _parser_exports__WEBPACK_IMPORTED_MODULE_2__["ERDiagramSyntaxError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERDiagramUnknownTypeError", function() { return _parser_exports__WEBPACK_IMPORTED_MODULE_2__["ERDiagramUnknownTypeError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERDiagramUnknownEntityError", function() { return _parser_exports__WEBPACK_IMPORTED_MODULE_2__["ERDiagramUnknownEntityError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERDiagramMultipleIdentifiersError", function() { return _parser_exports__WEBPACK_IMPORTED_MODULE_2__["ERDiagramMultipleIdentifiersError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERDiagramDuplicatedPropertyNameError", function() { return _parser_exports__WEBPACK_IMPORTED_MODULE_2__["ERDiagramDuplicatedPropertyNameError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EntityRelationshipModelParser", function() { return _parser_exports__WEBPACK_IMPORTED_MODULE_2__["EntityRelationshipModelParser"]; });






/***/ }),

/***/ "./src/main/erdiagram/generator/common/case-format/AbstractCamelCaseFormat.ts":
/*!************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/common/case-format/AbstractCamelCaseFormat.ts ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var CAMEL_CASE_WORD_BOUNDARIES_REGEX = /((?<=[^A-Z])(?=[A-Z])|(?=[A-Z][a-z]))/;
var AbstractCamelCaseFormat = /** @class */ (function () {
    function AbstractCamelCaseFormat() {
    }
    AbstractCamelCaseFormat.prototype.splitWords = function (text) {
        return text.split(CAMEL_CASE_WORD_BOUNDARIES_REGEX)
            .filter(function (chunk) { return chunk.length > 0; });
    };
    return AbstractCamelCaseFormat;
}());
/* harmony default export */ __webpack_exports__["default"] = (AbstractCamelCaseFormat);


/***/ }),

/***/ "./src/main/erdiagram/generator/common/case-format/AbstractUnderscoreCaseFormat.ts":
/*!*****************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/common/case-format/AbstractUnderscoreCaseFormat.ts ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var AbstractUnderscoreCaseFormat = /** @class */ (function () {
    function AbstractUnderscoreCaseFormat() {
    }
    AbstractUnderscoreCaseFormat.prototype.splitWords = function (text) {
        return text.split('_');
    };
    return AbstractUnderscoreCaseFormat;
}());
/* harmony default export */ __webpack_exports__["default"] = (AbstractUnderscoreCaseFormat);


/***/ }),

/***/ "./src/main/erdiagram/generator/common/case-format/CapitalizedUnderscoreCaseFormat.ts":
/*!********************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/common/case-format/CapitalizedUnderscoreCaseFormat.ts ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _erdiagram_generator_common_case_format_AbstractUnderscoreCaseFormat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/generator/common/case-format/AbstractUnderscoreCaseFormat */ "./src/main/erdiagram/generator/common/case-format/AbstractUnderscoreCaseFormat.ts");
/* harmony import */ var _erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/util/string-utils */ "./src/main/erdiagram/util/string-utils.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var CapitalizedUnderscoreCaseFormat = /** @class */ (function (_super) {
    __extends(CapitalizedUnderscoreCaseFormat, _super);
    function CapitalizedUnderscoreCaseFormat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CapitalizedUnderscoreCaseFormat.prototype.joinWords = function (words) {
        return words
            .map(function (word) { return word.toLowerCase(); })
            .map(_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_1__["capitalizeWord"])
            .join('_');
    };
    return CapitalizedUnderscoreCaseFormat;
}(_erdiagram_generator_common_case_format_AbstractUnderscoreCaseFormat__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (CapitalizedUnderscoreCaseFormat);


/***/ }),

/***/ "./src/main/erdiagram/generator/common/case-format/CaseConverter.ts":
/*!**************************************************************************!*\
  !*** ./src/main/erdiagram/generator/common/case-format/CaseConverter.ts ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var CaseConverter = /** @class */ (function () {
    function CaseConverter(originCaseFormat, targetCaseFormat) {
        this.originCaseFormat = originCaseFormat;
        this.targetCaseFormat = targetCaseFormat;
    }
    CaseConverter.prototype.convertCase = function (text) {
        var words = this.originCaseFormat.splitWords(text);
        return this.targetCaseFormat.joinWords(words);
    };
    return CaseConverter;
}());
/* harmony default export */ __webpack_exports__["default"] = (CaseConverter);


/***/ }),

/***/ "./src/main/erdiagram/generator/common/case-format/CaseInsensitiveUnderscoreCaseFormat.ts":
/*!************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/common/case-format/CaseInsensitiveUnderscoreCaseFormat.ts ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _erdiagram_generator_common_case_format_AbstractUnderscoreCaseFormat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/generator/common/case-format/AbstractUnderscoreCaseFormat */ "./src/main/erdiagram/generator/common/case-format/AbstractUnderscoreCaseFormat.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var CaseInsensitiveUnderscoreCaseFormat = /** @class */ (function (_super) {
    __extends(CaseInsensitiveUnderscoreCaseFormat, _super);
    function CaseInsensitiveUnderscoreCaseFormat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CaseInsensitiveUnderscoreCaseFormat.prototype.joinWords = function (words) {
        return words.join('_');
    };
    return CaseInsensitiveUnderscoreCaseFormat;
}(_erdiagram_generator_common_case_format_AbstractUnderscoreCaseFormat__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (CaseInsensitiveUnderscoreCaseFormat);


/***/ }),

/***/ "./src/main/erdiagram/generator/common/case-format/LowerCamelCaseFormat.ts":
/*!*********************************************************************************!*\
  !*** ./src/main/erdiagram/generator/common/case-format/LowerCamelCaseFormat.ts ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _erdiagram_generator_common_case_format_AbstractCamelCaseFormat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/generator/common/case-format/AbstractCamelCaseFormat */ "./src/main/erdiagram/generator/common/case-format/AbstractCamelCaseFormat.ts");
/* harmony import */ var _erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/util/string-utils */ "./src/main/erdiagram/util/string-utils.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};


var LowerCamelCaseFormat = /** @class */ (function (_super) {
    __extends(LowerCamelCaseFormat, _super);
    function LowerCamelCaseFormat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LowerCamelCaseFormat.prototype.joinWords = function (words) {
        if (words.length === 0) {
            return '';
        }
        var _a = __read(words), firstWord = _a[0], otherWords = _a.slice(1);
        var lowerCaseFirstWord = firstWord.toLowerCase();
        var capitalizedOtherWords = otherWords
            .map(function (word) { return word.toLowerCase(); })
            .map(_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_1__["capitalizeWord"]);
        return lowerCaseFirstWord + capitalizedOtherWords.join('');
    };
    return LowerCamelCaseFormat;
}(_erdiagram_generator_common_case_format_AbstractCamelCaseFormat__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (LowerCamelCaseFormat);


/***/ }),

/***/ "./src/main/erdiagram/generator/common/case-format/LowerUnderscoreCaseFormat.ts":
/*!**************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/common/case-format/LowerUnderscoreCaseFormat.ts ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _erdiagram_generator_common_case_format_AbstractUnderscoreCaseFormat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/generator/common/case-format/AbstractUnderscoreCaseFormat */ "./src/main/erdiagram/generator/common/case-format/AbstractUnderscoreCaseFormat.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var LowerUnderscoreCaseFormat = /** @class */ (function (_super) {
    __extends(LowerUnderscoreCaseFormat, _super);
    function LowerUnderscoreCaseFormat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LowerUnderscoreCaseFormat.prototype.joinWords = function (words) {
        return words
            .map(function (word) { return word.toLowerCase(); })
            .join('_');
    };
    return LowerUnderscoreCaseFormat;
}(_erdiagram_generator_common_case_format_AbstractUnderscoreCaseFormat__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (LowerUnderscoreCaseFormat);


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






var StandardCaseFormats = {
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
/* harmony import */ var _erdiagram_generator_common_case_format_AbstractCamelCaseFormat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/generator/common/case-format/AbstractCamelCaseFormat */ "./src/main/erdiagram/generator/common/case-format/AbstractCamelCaseFormat.ts");
/* harmony import */ var _erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/util/string-utils */ "./src/main/erdiagram/util/string-utils.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var UpperCamelCaseFormat = /** @class */ (function (_super) {
    __extends(UpperCamelCaseFormat, _super);
    function UpperCamelCaseFormat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UpperCamelCaseFormat.prototype.joinWords = function (words) {
        return words
            .map(function (word) { return word.toLowerCase(); })
            .map(_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_1__["capitalizeWord"])
            .join('');
    };
    return UpperCamelCaseFormat;
}(_erdiagram_generator_common_case_format_AbstractCamelCaseFormat__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (UpperCamelCaseFormat);


/***/ }),

/***/ "./src/main/erdiagram/generator/common/case-format/UpperUnderscoreCaseFormat.ts":
/*!**************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/common/case-format/UpperUnderscoreCaseFormat.ts ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _erdiagram_generator_common_case_format_AbstractUnderscoreCaseFormat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/generator/common/case-format/AbstractUnderscoreCaseFormat */ "./src/main/erdiagram/generator/common/case-format/AbstractUnderscoreCaseFormat.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var UpperUnderscoreCaseFormat = /** @class */ (function (_super) {
    __extends(UpperUnderscoreCaseFormat, _super);
    function UpperUnderscoreCaseFormat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UpperUnderscoreCaseFormat.prototype.joinWords = function (words) {
        return words
            .map(function (word) { return word.toUpperCase(); })
            .join('_');
    };
    return UpperUnderscoreCaseFormat;
}(_erdiagram_generator_common_case_format_AbstractUnderscoreCaseFormat__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (UpperUnderscoreCaseFormat);


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

var defaultIdNamingStrategy = function () { return 'id'; };
var entityNamePrefixIdNamingStrategy = function (entityName) { return Object(_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_0__["uncapitalizeWord"])(entityName) + "Id"; };
var StandardIdNamingStrategies = {
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
var EntityRelationshipModelToDatabaseCodeConverter = /** @class */ (function () {
    function EntityRelationshipModelToDatabaseCodeConverter(databaseModelGenerator, databaseModelToCodeConverter) {
        this.databaseModelGenerator = databaseModelGenerator;
        this.databaseModelToCodeConverter = databaseModelToCodeConverter;
    }
    EntityRelationshipModelToDatabaseCodeConverter.prototype.generateCode = function (entityRelationshipModel) {
        var databaseModel = this.databaseModelGenerator.generateDatabaseModel(entityRelationshipModel);
        return this.databaseModelToCodeConverter.generateCode(databaseModel);
    };
    return EntityRelationshipModelToDatabaseCodeConverter;
}());
/* harmony default export */ __webpack_exports__["default"] = (EntityRelationshipModelToDatabaseCodeConverter);


/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/exports.ts":
/*!*************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/exports.ts ***!
  \*************************************************************************/
/*! exports provided: MySqlDatabaseModelToCodeConverterConfigManager, mysqlDatabaseModelToCodeConverterConfigManager, MySqlDatabaseModelToCodeConverter, OracleDatabaseModelToCodeConverterConfigManager, oracleDatabaseModelToCodeConverterConfigManager, OracleDatabaseModelToCodeConverter, SqlServerDatabaseModelToCodeConverterConfigManager, sqlServerDatabaseModelToCodeConverterConfigManager, SqlServerDatabaseModelToCodeConverter, EntityRelationshipModelToDatabaseCodeConverter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EntityRelationshipModelToDatabaseCodeConverter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EntityRelationshipModelToDatabaseCodeConverter */ "./src/main/erdiagram/generator/database/code-converter/EntityRelationshipModelToDatabaseCodeConverter.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EntityRelationshipModelToDatabaseCodeConverter", function() { return _EntityRelationshipModelToDatabaseCodeConverter__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _mysql_exports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mysql/exports */ "./src/main/erdiagram/generator/database/code-converter/mysql/exports.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MySqlDatabaseModelToCodeConverterConfigManager", function() { return _mysql_exports__WEBPACK_IMPORTED_MODULE_1__["MySqlDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mysqlDatabaseModelToCodeConverterConfigManager", function() { return _mysql_exports__WEBPACK_IMPORTED_MODULE_1__["mysqlDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MySqlDatabaseModelToCodeConverter", function() { return _mysql_exports__WEBPACK_IMPORTED_MODULE_1__["MySqlDatabaseModelToCodeConverter"]; });

/* harmony import */ var _oracle_exports__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./oracle/exports */ "./src/main/erdiagram/generator/database/code-converter/oracle/exports.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OracleDatabaseModelToCodeConverterConfigManager", function() { return _oracle_exports__WEBPACK_IMPORTED_MODULE_2__["OracleDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "oracleDatabaseModelToCodeConverterConfigManager", function() { return _oracle_exports__WEBPACK_IMPORTED_MODULE_2__["oracleDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OracleDatabaseModelToCodeConverter", function() { return _oracle_exports__WEBPACK_IMPORTED_MODULE_2__["OracleDatabaseModelToCodeConverter"]; });

/* harmony import */ var _sqlserver_exports__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sqlserver/exports */ "./src/main/erdiagram/generator/database/code-converter/sqlserver/exports.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SqlServerDatabaseModelToCodeConverterConfigManager", function() { return _sqlserver_exports__WEBPACK_IMPORTED_MODULE_3__["SqlServerDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sqlServerDatabaseModelToCodeConverterConfigManager", function() { return _sqlserver_exports__WEBPACK_IMPORTED_MODULE_3__["sqlServerDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SqlServerDatabaseModelToCodeConverter", function() { return _sqlserver_exports__WEBPACK_IMPORTED_MODULE_3__["SqlServerDatabaseModelToCodeConverter"]; });








/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/mysql/MySqlDatabaseModelToCodeConverter.ts":
/*!*********************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/mysql/MySqlDatabaseModelToCodeConverter.ts ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _erdiagram_generator_database_code_converter_mysql_column_MySqlColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/generator/database/code-converter/mysql/column/MySqlColumnCodeGenerator */ "./src/main/erdiagram/generator/database/code-converter/mysql/column/MySqlColumnCodeGenerator.ts");
/* harmony import */ var _erdiagram_generator_database_code_converter_mysql_type_MySqlTypeResolver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/generator/database/code-converter/mysql/type/MySqlTypeResolver */ "./src/main/erdiagram/generator/database/code-converter/mysql/type/MySqlTypeResolver.ts");
/* harmony import */ var _erdiagram_generator_database_code_converter_mysql_column_MySqlIdColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/generator/database/code-converter/mysql/column/MySqlIdColumnCodeGenerator */ "./src/main/erdiagram/generator/database/code-converter/mysql/column/MySqlIdColumnCodeGenerator.ts");
/* harmony import */ var _erdiagram_generator_database_code_converter_mysql_column_MySqlForeignColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/generator/database/code-converter/mysql/column/MySqlForeignColumnCodeGenerator */ "./src/main/erdiagram/generator/database/code-converter/mysql/column/MySqlForeignColumnCodeGenerator.ts");
/* harmony import */ var _erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/erdiagram/util/indent-utils */ "./src/main/erdiagram/util/indent-utils.ts");
/* harmony import */ var _erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/erdiagram/generator/common/case-format/StandardCaseFormats */ "./src/main/erdiagram/generator/common/case-format/StandardCaseFormats.ts");
/* harmony import */ var _erdiagram_generator_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/erdiagram/generator/common/case-format/CaseConverter */ "./src/main/erdiagram/generator/common/case-format/CaseConverter.ts");
/* harmony import */ var _erdiagram_generator_database_code_converter_mysql_config_MysqlDatabaseModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/erdiagram/generator/database/code-converter/mysql/config/MysqlDatabaseModelToCodeConverterConfigManager */ "./src/main/erdiagram/generator/database/code-converter/mysql/config/MysqlDatabaseModelToCodeConverterConfigManager.ts");
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (undefined && undefined.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};








var MySqlDatabaseModelToCodeConverter = /** @class */ (function () {
    function MySqlDatabaseModelToCodeConverter(config) {
        this.config = _erdiagram_generator_database_code_converter_mysql_config_MysqlDatabaseModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_7__["default"].mergeWithDefaultConfig(config);
        this.tableNameCaseConverter = new _erdiagram_generator_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_6__["default"](_erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_5__["default"].LOWER_CAMEL, this.config.tableNameCaseFormat);
        var columnNameCaseConverter = new _erdiagram_generator_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_6__["default"](_erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_5__["default"].LOWER_CAMEL, this.config.columnNameCaseFormat);
        this.columnCodeGenerator = new _erdiagram_generator_database_code_converter_mysql_column_MySqlColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_0__["default"](new _erdiagram_generator_database_code_converter_mysql_type_MySqlTypeResolver__WEBPACK_IMPORTED_MODULE_1__["default"](this.config.typeBindings), columnNameCaseConverter);
        this.idColumnCodeGenerator = new _erdiagram_generator_database_code_converter_mysql_column_MySqlIdColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_2__["default"](this.columnCodeGenerator, columnNameCaseConverter, this.config.idColumnType);
        this.foreignColumnCodeGenerator = new _erdiagram_generator_database_code_converter_mysql_column_MySqlForeignColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_3__["default"](this.columnCodeGenerator, this.tableNameCaseConverter, columnNameCaseConverter);
    }
    MySqlDatabaseModelToCodeConverter.prototype.generateCode = function (databaseModel) {
        var _this = this;
        var allCreateTableStatements = [];
        var allAlterTableStatements = [];
        databaseModel.tables
            .map(function (table) { return _this.generateTableCode(table); })
            .forEach(function (_a) {
            var createTableStatement = _a.createTableStatement, alterTableStatements = _a.alterTableStatements;
            allCreateTableStatements.push(createTableStatement);
            if (alterTableStatements) {
                allAlterTableStatements.push(alterTableStatements);
            }
        });
        return allCreateTableStatements.join('\n\n')
            + '\n\n'
            + allAlterTableStatements.join('\n\n');
    };
    // FIXME split this method
    MySqlDatabaseModelToCodeConverter.prototype.generateTableCode = function (table) {
        var columnLines = [];
        var fkConstraintLines = [];
        var otherConstraintLines = [];
        var outputTableName = this.tableNameCaseConverter.convertCase(table.name);
        var _a = this.idColumnCodeGenerator.generateIdColumnCode(outputTableName, table.identifierColumnName), idColumnLine = _a.columnLine, pkConstraintLine = _a.pkConstraintLine;
        columnLines.push(idColumnLine);
        otherConstraintLines.push(pkConstraintLine);
        this.processColumns(outputTableName, table.columns, columnLines, otherConstraintLines);
        this.processReferences(outputTableName, table.references, columnLines, fkConstraintLines, otherConstraintLines);
        var createTableInnerLines = __spread(columnLines, otherConstraintLines);
        var createTableLines = [
            "CREATE TABLE `" + outputTableName + "` (",
            Object(_erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_4__["indentLines"])(createTableInnerLines).join(',\n'),
            ');'
        ];
        var createTableStatement = createTableLines.join('\n');
        var alterTableStatements = fkConstraintLines.map(function (fkConstraintLine) {
            return "ALTER TABLE `" + outputTableName + "` ADD " + fkConstraintLine + ";";
        }).join('\n');
        return {
            createTableStatement: createTableStatement,
            alterTableStatements: alterTableStatements
        };
    };
    MySqlDatabaseModelToCodeConverter.prototype.processReferences = function (outputTableName, references, columnLines, fkConstraintLines, otherConstraintLines) {
        var e_1, _a;
        try {
            for (var references_1 = __values(references), references_1_1 = references_1.next(); !references_1_1.done; references_1_1 = references_1.next()) {
                var reference = references_1_1.value;
                var _b = this.foreignColumnCodeGenerator.generateForeignColumnCode(outputTableName, reference), columnLine = _b.columnLine, uniqueConstraintLine = _b.uniqueConstraintLine, fkConstraintLine = _b.fkConstraintLine;
                columnLines.push(columnLine);
                fkConstraintLines.push(fkConstraintLine);
                if (uniqueConstraintLine) {
                    otherConstraintLines.push(uniqueConstraintLine);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (references_1_1 && !references_1_1.done && (_a = references_1.return)) _a.call(references_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    MySqlDatabaseModelToCodeConverter.prototype.processColumns = function (outputTableName, columns, columnLines, otherConstraintLines) {
        var e_2, _a;
        try {
            for (var columns_1 = __values(columns), columns_1_1 = columns_1.next(); !columns_1_1.done; columns_1_1 = columns_1.next()) {
                var column = columns_1_1.value;
                var _b = this.columnCodeGenerator.generateColumnCode(outputTableName, column), columnLine = _b.columnLine, uniqueConstraintLine = _b.uniqueConstraintLine;
                columnLines.push(columnLine);
                if (uniqueConstraintLine) {
                    otherConstraintLines.push(uniqueConstraintLine);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (columns_1_1 && !columns_1_1.done && (_a = columns_1.return)) _a.call(columns_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    return MySqlDatabaseModelToCodeConverter;
}());
/* harmony default export */ __webpack_exports__["default"] = (MySqlDatabaseModelToCodeConverter);


/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/mysql/column/MySqlColumnCodeGenerator.ts":
/*!*******************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/mysql/column/MySqlColumnCodeGenerator.ts ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var MySqlColumnCodeGenerator = /** @class */ (function () {
    function MySqlColumnCodeGenerator(typeResolver, columnNameCaseConverter) {
        this.typeResolver = typeResolver;
        this.columnNameCaseConverter = columnNameCaseConverter;
    }
    MySqlColumnCodeGenerator.prototype.generateColumnCode = function (outputTableName, column) {
        var outputColumnName = this.columnNameCaseConverter.convertCase(column.name);
        return {
            columnLine: this.generateColumnDeclarationLine(outputColumnName, column),
            uniqueConstraintLine: column.unique ? this.generateUniqueConstraintLine(outputTableName, outputColumnName) : undefined
        };
    };
    MySqlColumnCodeGenerator.prototype.generateColumnDeclarationLine = function (outputColumnName, column) {
        var notNull = column.notNull, autoincremental = column.autoincremental, type = column.type, length = column.length;
        var lineParts = [
            "`" + outputColumnName + "`",
            this.generateMySqlTypeDeclaration(type, length)
        ];
        if (notNull) {
            lineParts.push('NOT NULL');
        }
        if (autoincremental) {
            lineParts.push('AUTO_INCREMENT');
        }
        return lineParts.join(' ');
    };
    MySqlColumnCodeGenerator.prototype.generateMySqlTypeDeclaration = function (type, length) {
        var mysqlType = this.typeResolver.resolveMySqlType(type);
        var lengthCode = this.generateLengthCode(length);
        return mysqlType + lengthCode;
    };
    MySqlColumnCodeGenerator.prototype.generateLengthCode = function (length) {
        if (length.length === 0) {
            return '';
        }
        return "(" + length.join(', ') + ")";
    };
    MySqlColumnCodeGenerator.prototype.generateUniqueConstraintLine = function (outputTableName, outputColumnName) {
        return "CONSTRAINT `" + outputTableName + "_" + outputColumnName + "_unique` UNIQUE (`" + outputColumnName + "`)";
    };
    return MySqlColumnCodeGenerator;
}());
/* harmony default export */ __webpack_exports__["default"] = (MySqlColumnCodeGenerator);


/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/mysql/column/MySqlForeignColumnCodeGenerator.ts":
/*!**************************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/mysql/column/MySqlForeignColumnCodeGenerator.ts ***!
  \**************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/entity-relationship-model-types */ "./src/main/erdiagram/parser/entity-relationship-model-types.ts");

var MySqlForeignColumnCodeGenerator = /** @class */ (function () {
    function MySqlForeignColumnCodeGenerator(columnCodeGenerator, tableNameCaseConverter, columnNameCaseConverter) {
        this.columnCodeGenerator = columnCodeGenerator;
        this.tableNameCaseConverter = tableNameCaseConverter;
        this.columnNameCaseConverter = columnNameCaseConverter;
    }
    MySqlForeignColumnCodeGenerator.prototype.generateForeignColumnCode = function (outputTableName, reference) {
        var columnDescriptor = this.createForeignKeyColumnDescriptor(reference);
        var _a = this.columnCodeGenerator.generateColumnCode(outputTableName, columnDescriptor), columnLine = _a.columnLine, uniqueConstraintLine = _a.uniqueConstraintLine;
        return {
            columnLine: columnLine,
            uniqueConstraintLine: uniqueConstraintLine,
            fkConstraintLine: this.createForeignKeyConstraint(outputTableName, reference)
        };
    };
    MySqlForeignColumnCodeGenerator.prototype.createForeignKeyColumnDescriptor = function (reference) {
        var columnName = reference.columnName, notNull = reference.notNull, unique = reference.unique;
        return {
            name: columnName,
            type: _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].LONG,
            length: [],
            notNull: notNull,
            unique: unique,
            autoincremental: false
        };
    };
    MySqlForeignColumnCodeGenerator.prototype.createForeignKeyConstraint = function (outputTableName, reference) {
        var outputColumnName = this.columnNameCaseConverter.convertCase(reference.columnName);
        var outputTargetTableName = this.tableNameCaseConverter.convertCase(reference.targetTableName);
        var outputTargetColumnName = this.columnNameCaseConverter.convertCase(reference.targetTableIdentifierColumnName);
        return "CONSTRAINT `" + outputTableName + "_" + outputColumnName + "_fk` FOREIGN KEY (`" + outputColumnName + "`)"
            + (" REFERENCES `" + outputTargetTableName + "` (`" + outputTargetColumnName + "`)");
    };
    return MySqlForeignColumnCodeGenerator;
}());
/* harmony default export */ __webpack_exports__["default"] = (MySqlForeignColumnCodeGenerator);


/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/mysql/column/MySqlIdColumnCodeGenerator.ts":
/*!*********************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/mysql/column/MySqlIdColumnCodeGenerator.ts ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var MySqlIdColumnCodeGenerator = /** @class */ (function () {
    function MySqlIdColumnCodeGenerator(columnCodeGenerator, columnNameCaseConverter, idColumnType) {
        this.columnCodeGenerator = columnCodeGenerator;
        this.columnNameCaseConverter = columnNameCaseConverter;
        this.idColumnType = idColumnType;
    }
    MySqlIdColumnCodeGenerator.prototype.generateIdColumnCode = function (outputTableName, identifierColumnName) {
        var column = this.createIdColumnDescriptor(identifierColumnName);
        var columnLine = this.columnCodeGenerator.generateColumnCode(outputTableName, column).columnLine;
        var pkConstraintLine = this.createPrimaryKeyConstraint(outputTableName, column);
        return {
            columnLine: columnLine,
            pkConstraintLine: pkConstraintLine
        };
    };
    MySqlIdColumnCodeGenerator.prototype.createIdColumnDescriptor = function (identifierColumnName) {
        return {
            name: identifierColumnName,
            type: this.idColumnType,
            length: [],
            notNull: true,
            autoincremental: true,
            // As primary keys are unique by default, we don't
            // need to manually define an UNIQUE KEY constraint
            unique: false
        };
    };
    MySqlIdColumnCodeGenerator.prototype.createPrimaryKeyConstraint = function (outputTableName, column) {
        var columnName = this.columnNameCaseConverter.convertCase(column.name);
        return "CONSTRAINT `" + outputTableName + "_pk` PRIMARY KEY (`" + columnName + "`)";
    };
    return MySqlIdColumnCodeGenerator;
}());
/* harmony default export */ __webpack_exports__["default"] = (MySqlIdColumnCodeGenerator);


/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/mysql/config/MysqlDatabaseModelToCodeConverterConfigManager.ts":
/*!*****************************************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/mysql/config/MysqlDatabaseModelToCodeConverterConfigManager.ts ***!
  \*****************************************************************************************************************************/
/*! exports provided: MySqlDatabaseModelToCodeConverterConfigManager, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MySqlDatabaseModelToCodeConverterConfigManager", function() { return MySqlDatabaseModelToCodeConverterConfigManager; });
/* harmony import */ var _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/entity-relationship-model-types */ "./src/main/erdiagram/parser/entity-relationship-model-types.ts");
/* harmony import */ var _erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/generator/common/case-format/StandardCaseFormats */ "./src/main/erdiagram/generator/common/case-format/StandardCaseFormats.ts");
/* harmony import */ var _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/common/config/AbstractComponentConfigManager */ "./src/main/erdiagram/common/config/AbstractComponentConfigManager.ts");
/* harmony import */ var _erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/util/record-utils */ "./src/main/erdiagram/util/record-utils.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};




var MySqlDatabaseModelToCodeConverterConfigManager = /** @class */ (function (_super) {
    __extends(MySqlDatabaseModelToCodeConverterConfigManager, _super);
    function MySqlDatabaseModelToCodeConverterConfigManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MySqlDatabaseModelToCodeConverterConfigManager.prototype.getDefaultConfig = function () {
        var _a;
        return {
            idColumnType: _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].LONG,
            typeBindings: (_a = {},
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].IDENTIFIER] = 'BIGINT',
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].TEXT] = 'VARCHAR',
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].LONG] = 'BIGINT',
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].INT] = 'INT',
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].SHORT] = 'SHORT',
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].DECIMAL] = 'DECIMAL',
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].BOOLEAN] = 'BOOLEAN',
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].DATE] = 'DATE',
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].TIME] = 'TIME',
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].DATETIME] = 'TIMESTAMP',
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].BLOB] = 'BLOB',
                _a),
            tableNameCaseFormat: _erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"].UPPER_CAMEL,
            columnNameCaseFormat: _erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"].LOWER_CAMEL,
        };
    };
    MySqlDatabaseModelToCodeConverterConfigManager.prototype.mergeConfigs = function (fullConfig, partialConfig) {
        return __assign(__assign(__assign({}, fullConfig), partialConfig), { typeBindings: __assign(__assign({}, fullConfig.typeBindings), partialConfig === null || partialConfig === void 0 ? void 0 : partialConfig.typeBindings) });
    };
    MySqlDatabaseModelToCodeConverterConfigManager.prototype.convertToSerializableObject = function (fullConfig) {
        return __assign(__assign({}, fullConfig), { tableNameCaseFormat: Object(_erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_3__["findKeyFromValue"])(_erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"], fullConfig.tableNameCaseFormat), columnNameCaseFormat: Object(_erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_3__["findKeyFromValue"])(_erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"], fullConfig.columnNameCaseFormat) });
    };
    MySqlDatabaseModelToCodeConverterConfigManager.prototype.convertFromSerializableObject = function (serializableConfig) {
        return __assign(__assign({}, serializableConfig), { tableNameCaseFormat: Object(_erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_3__["findValueFromNullableKey"])(_erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"], serializableConfig.tableNameCaseFormat, _erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"].UPPER_CAMEL), columnNameCaseFormat: Object(_erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_3__["findValueFromNullableKey"])(_erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"], serializableConfig.columnNameCaseFormat, _erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"].UPPER_CAMEL) });
    };
    return MySqlDatabaseModelToCodeConverterConfigManager;
}(_erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_2__["default"]));

var mysqlDatabaseModelToCodeConverterConfigManager = new MySqlDatabaseModelToCodeConverterConfigManager();
/* harmony default export */ __webpack_exports__["default"] = (mysqlDatabaseModelToCodeConverterConfigManager);


/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/mysql/config/exports.ts":
/*!**************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/mysql/config/exports.ts ***!
  \**************************************************************************************/
/*! exports provided: MySqlDatabaseModelToCodeConverterConfigManager, mysqlDatabaseModelToCodeConverterConfigManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MysqlDatabaseModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MysqlDatabaseModelToCodeConverterConfigManager */ "./src/main/erdiagram/generator/database/code-converter/mysql/config/MysqlDatabaseModelToCodeConverterConfigManager.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MySqlDatabaseModelToCodeConverterConfigManager", function() { return _MysqlDatabaseModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_0__["MySqlDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mysqlDatabaseModelToCodeConverterConfigManager", function() { return _MysqlDatabaseModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"]; });





/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/mysql/exports.ts":
/*!*******************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/mysql/exports.ts ***!
  \*******************************************************************************/
/*! exports provided: MySqlDatabaseModelToCodeConverterConfigManager, mysqlDatabaseModelToCodeConverterConfigManager, MySqlDatabaseModelToCodeConverter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MySqlDatabaseModelToCodeConverter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MySqlDatabaseModelToCodeConverter */ "./src/main/erdiagram/generator/database/code-converter/mysql/MySqlDatabaseModelToCodeConverter.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MySqlDatabaseModelToCodeConverter", function() { return _MySqlDatabaseModelToCodeConverter__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _config_exports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config/exports */ "./src/main/erdiagram/generator/database/code-converter/mysql/config/exports.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MySqlDatabaseModelToCodeConverterConfigManager", function() { return _config_exports__WEBPACK_IMPORTED_MODULE_1__["MySqlDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mysqlDatabaseModelToCodeConverterConfigManager", function() { return _config_exports__WEBPACK_IMPORTED_MODULE_1__["mysqlDatabaseModelToCodeConverterConfigManager"]; });






/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/mysql/type/MySqlTypeResolver.ts":
/*!**********************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/mysql/type/MySqlTypeResolver.ts ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var MySqlTypeResolver = /** @class */ (function () {
    function MySqlTypeResolver(typeBindings) {
        this.typeBindings = typeBindings;
    }
    MySqlTypeResolver.prototype.resolveMySqlType = function (type) {
        if (!this.typeBindings.hasOwnProperty(type)) {
            throw new Error('Unsupported type: ' + type);
        }
        return this.typeBindings[type];
    };
    return MySqlTypeResolver;
}());
/* harmony default export */ __webpack_exports__["default"] = (MySqlTypeResolver);


/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/oracle/OracleDatabaseModelToCodeConverter.ts":
/*!***********************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/oracle/OracleDatabaseModelToCodeConverter.ts ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _erdiagram_generator_database_code_converter_oracle_column_OracleColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/generator/database/code-converter/oracle/column/OracleColumnCodeGenerator */ "./src/main/erdiagram/generator/database/code-converter/oracle/column/OracleColumnCodeGenerator.ts");
/* harmony import */ var _erdiagram_generator_database_code_converter_oracle_type_OracleTypeResolver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/generator/database/code-converter/oracle/type/OracleTypeResolver */ "./src/main/erdiagram/generator/database/code-converter/oracle/type/OracleTypeResolver.ts");
/* harmony import */ var _erdiagram_generator_database_code_converter_oracle_column_OracleIdColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/generator/database/code-converter/oracle/column/OracleIdColumnCodeGenerator */ "./src/main/erdiagram/generator/database/code-converter/oracle/column/OracleIdColumnCodeGenerator.ts");
/* harmony import */ var _erdiagram_generator_database_code_converter_oracle_column_OracleForeignColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/generator/database/code-converter/oracle/column/OracleForeignColumnCodeGenerator */ "./src/main/erdiagram/generator/database/code-converter/oracle/column/OracleForeignColumnCodeGenerator.ts");
/* harmony import */ var _erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/erdiagram/util/indent-utils */ "./src/main/erdiagram/util/indent-utils.ts");
/* harmony import */ var _erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/erdiagram/generator/common/case-format/StandardCaseFormats */ "./src/main/erdiagram/generator/common/case-format/StandardCaseFormats.ts");
/* harmony import */ var _erdiagram_generator_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/erdiagram/generator/common/case-format/CaseConverter */ "./src/main/erdiagram/generator/common/case-format/CaseConverter.ts");
/* harmony import */ var _erdiagram_generator_database_code_converter_oracle_config_OracleDatabaseModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/erdiagram/generator/database/code-converter/oracle/config/OracleDatabaseModelToCodeConverterConfigManager */ "./src/main/erdiagram/generator/database/code-converter/oracle/config/OracleDatabaseModelToCodeConverterConfigManager.ts");
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (undefined && undefined.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};








var OracleDatabaseModelToCodeConverter = /** @class */ (function () {
    function OracleDatabaseModelToCodeConverter(config) {
        this.config = _erdiagram_generator_database_code_converter_oracle_config_OracleDatabaseModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_7__["default"].mergeWithDefaultConfig(config);
        this.tableNameCaseConverter = new _erdiagram_generator_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_6__["default"](_erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_5__["default"].LOWER_CAMEL, this.config.tableNameCaseFormat);
        var columnNameCaseConverter = new _erdiagram_generator_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_6__["default"](_erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_5__["default"].LOWER_CAMEL, this.config.columnNameCaseFormat);
        this.columnCodeGenerator = new _erdiagram_generator_database_code_converter_oracle_column_OracleColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_0__["default"](new _erdiagram_generator_database_code_converter_oracle_type_OracleTypeResolver__WEBPACK_IMPORTED_MODULE_1__["default"](this.config.typeBindings), columnNameCaseConverter);
        this.idColumnCodeGenerator = new _erdiagram_generator_database_code_converter_oracle_column_OracleIdColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_2__["default"](this.columnCodeGenerator, columnNameCaseConverter, this.config.idColumnType);
        this.foreignColumnCodeGenerator = new _erdiagram_generator_database_code_converter_oracle_column_OracleForeignColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_3__["default"](this.columnCodeGenerator, this.tableNameCaseConverter, columnNameCaseConverter);
    }
    OracleDatabaseModelToCodeConverter.prototype.generateCode = function (databaseModel) {
        var _this = this;
        var allCreateTableStatements = [];
        var allAlterTableStatements = [];
        databaseModel.tables
            .map(function (table) { return _this.generateTableCode(table); })
            .forEach(function (_a) {
            var createTableStatement = _a.createTableStatement, alterTableStatements = _a.alterTableStatements;
            allCreateTableStatements.push(createTableStatement);
            if (alterTableStatements) {
                allAlterTableStatements.push(alterTableStatements);
            }
        });
        return allCreateTableStatements.join('\n\n')
            + '\n\n'
            + allAlterTableStatements.join('\n\n');
    };
    // FIXME split this method
    OracleDatabaseModelToCodeConverter.prototype.generateTableCode = function (table) {
        var columnLines = [];
        var createSequenceLines = [];
        var fkConstraintLines = [];
        var otherConstraintLines = [];
        var outputTableName = this.tableNameCaseConverter.convertCase(table.name);
        var _a = this.idColumnCodeGenerator.generateIdColumnCode(outputTableName, table.identifierColumnName), idCreateSequenceLine = _a.createSequenceLine, idColumnLine = _a.columnLine, pkConstraintLine = _a.pkConstraintLine;
        createSequenceLines.push(idCreateSequenceLine);
        columnLines.push(idColumnLine);
        otherConstraintLines.push(pkConstraintLine);
        this.processColumns(outputTableName, table.columns, columnLines, createSequenceLines, otherConstraintLines);
        this.processReferences(outputTableName, table.references, columnLines, fkConstraintLines, otherConstraintLines);
        var createTableInnerLines = __spread(columnLines, otherConstraintLines);
        var createTableLines = __spread(createSequenceLines, [
            "CREATE TABLE \"" + outputTableName + "\" (",
            Object(_erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_4__["indentLines"])(createTableInnerLines).join(',\n'),
            ');'
        ]);
        var createTableStatement = createTableLines.join('\n');
        var alterTableStatements = fkConstraintLines.map(function (fkConstraintLine) {
            return "ALTER TABLE \"" + outputTableName + "\" ADD " + fkConstraintLine + ";";
        }).join('\n');
        return {
            createTableStatement: createTableStatement,
            alterTableStatements: alterTableStatements
        };
    };
    OracleDatabaseModelToCodeConverter.prototype.processReferences = function (outputTableName, references, columnLines, fkConstraintLines, otherConstraintLines) {
        var e_1, _a;
        try {
            for (var references_1 = __values(references), references_1_1 = references_1.next(); !references_1_1.done; references_1_1 = references_1.next()) {
                var reference = references_1_1.value;
                var _b = this.foreignColumnCodeGenerator.generateForeignColumnCode(outputTableName, reference), columnLine = _b.columnLine, uniqueConstraintLine = _b.uniqueConstraintLine, fkConstraintLine = _b.fkConstraintLine;
                columnLines.push(columnLine);
                fkConstraintLines.push(fkConstraintLine);
                if (uniqueConstraintLine) {
                    otherConstraintLines.push(uniqueConstraintLine);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (references_1_1 && !references_1_1.done && (_a = references_1.return)) _a.call(references_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    OracleDatabaseModelToCodeConverter.prototype.processColumns = function (outputTableName, columns, columnLines, createSequenceLines, otherConstraintLines) {
        var e_2, _a;
        try {
            for (var columns_1 = __values(columns), columns_1_1 = columns_1.next(); !columns_1_1.done; columns_1_1 = columns_1.next()) {
                var column = columns_1_1.value;
                var _b = this.columnCodeGenerator.generateColumnCode(outputTableName, column), columnLine = _b.columnLine, createSequenceLine = _b.createSequenceLine, uniqueConstraintLine = _b.uniqueConstraintLine;
                columnLines.push(columnLine);
                if (createSequenceLine) {
                    createSequenceLines.push(createSequenceLine);
                }
                if (uniqueConstraintLine) {
                    otherConstraintLines.push(uniqueConstraintLine);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (columns_1_1 && !columns_1_1.done && (_a = columns_1.return)) _a.call(columns_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    return OracleDatabaseModelToCodeConverter;
}());
/* harmony default export */ __webpack_exports__["default"] = (OracleDatabaseModelToCodeConverter);


/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/oracle/column/OracleColumnCodeGenerator.ts":
/*!*********************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/oracle/column/OracleColumnCodeGenerator.ts ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var OracleColumnCodeGenerator = /** @class */ (function () {
    function OracleColumnCodeGenerator(typeResolver, columnNameCaseConverter) {
        this.typeResolver = typeResolver;
        this.columnNameCaseConverter = columnNameCaseConverter;
    }
    OracleColumnCodeGenerator.prototype.generateColumnCode = function (outputTableName, column) {
        var outputColumnName = this.columnNameCaseConverter.convertCase(column.name);
        var autoincrementalSequenceName = this.getAutoincrementalSequenceName(outputTableName, outputColumnName);
        return {
            createSequenceLine: column.autoincremental ? this.generateCreateSequenceLine(autoincrementalSequenceName) : undefined,
            columnLine: this.generateColumnDeclarationLine(outputColumnName, column, autoincrementalSequenceName),
            uniqueConstraintLine: column.unique ? this.generateUniqueConstraintLine(outputTableName, outputColumnName) : undefined
        };
    };
    OracleColumnCodeGenerator.prototype.getAutoincrementalSequenceName = function (outputTableName, outputColumnName) {
        return outputTableName + "_" + outputColumnName + "_SEQ";
    };
    OracleColumnCodeGenerator.prototype.generateCreateSequenceLine = function (autoincrementalSequenceName) {
        return "CREATE SEQUENCE \"" + autoincrementalSequenceName + "\" START WITH 1;";
    };
    // FIXME refactor this methods - it receives too much arguments
    OracleColumnCodeGenerator.prototype.generateColumnDeclarationLine = function (outputColumnName, column, autoincrementalSequenceName) {
        var notNull = column.notNull, autoincremental = column.autoincremental, type = column.type, length = column.length;
        var lineParts = [
            "\"" + outputColumnName + "\"",
            this.generateOracleTypeDeclaration(type, length)
        ];
        if (notNull) {
            lineParts.push('NOT NULL');
        }
        if (autoincremental) {
            lineParts.push("DEFAULT \"" + autoincrementalSequenceName + "\".nextval");
        }
        return lineParts.join(' ');
    };
    OracleColumnCodeGenerator.prototype.generateOracleTypeDeclaration = function (type, length) {
        var oracleType = this.typeResolver.resolveOracleType(type);
        var lengthCode = this.generateLengthCode(length);
        return oracleType + lengthCode;
    };
    OracleColumnCodeGenerator.prototype.generateLengthCode = function (length) {
        if (length.length === 0) {
            return '';
        }
        return "(" + length.join(', ') + ")";
    };
    OracleColumnCodeGenerator.prototype.generateUniqueConstraintLine = function (outputTableName, outputColumnName) {
        return "CONSTRAINT \"" + outputTableName + "_" + outputColumnName + "_UNIQUE\" UNIQUE (\"" + outputColumnName + "\")";
    };
    return OracleColumnCodeGenerator;
}());
/* harmony default export */ __webpack_exports__["default"] = (OracleColumnCodeGenerator);


/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/oracle/column/OracleForeignColumnCodeGenerator.ts":
/*!****************************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/oracle/column/OracleForeignColumnCodeGenerator.ts ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/entity-relationship-model-types */ "./src/main/erdiagram/parser/entity-relationship-model-types.ts");

var OracleForeignColumnCodeGenerator = /** @class */ (function () {
    function OracleForeignColumnCodeGenerator(columnCodeGenerator, tableNameCaseConverter, columnNameCaseConverter) {
        this.columnCodeGenerator = columnCodeGenerator;
        this.tableNameCaseConverter = tableNameCaseConverter;
        this.columnNameCaseConverter = columnNameCaseConverter;
    }
    OracleForeignColumnCodeGenerator.prototype.generateForeignColumnCode = function (outputTableName, reference) {
        var columnDescriptor = this.createForeignKeyColumnDescriptor(reference);
        var _a = this.columnCodeGenerator.generateColumnCode(outputTableName, columnDescriptor), columnLine = _a.columnLine, uniqueConstraintLine = _a.uniqueConstraintLine;
        return {
            columnLine: columnLine,
            uniqueConstraintLine: uniqueConstraintLine,
            fkConstraintLine: this.createForeignKeyConstraint(outputTableName, reference)
        };
    };
    OracleForeignColumnCodeGenerator.prototype.createForeignKeyColumnDescriptor = function (reference) {
        var columnName = reference.columnName, notNull = reference.notNull, unique = reference.unique;
        return {
            name: columnName,
            type: _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].LONG,
            length: [],
            notNull: notNull,
            unique: unique,
            autoincremental: false
        };
    };
    OracleForeignColumnCodeGenerator.prototype.createForeignKeyConstraint = function (outputTableName, reference) {
        var outputColumnName = this.columnNameCaseConverter.convertCase(reference.columnName);
        var outputTargetTableName = this.tableNameCaseConverter.convertCase(reference.targetTableName);
        var outputTargetColumnName = this.columnNameCaseConverter.convertCase(reference.targetTableIdentifierColumnName);
        return "CONSTRAINT \"" + outputTableName + "_" + outputColumnName + "_FK\" FOREIGN KEY (\"" + outputColumnName + "\")"
            + (" REFERENCES \"" + outputTargetTableName + "\" (\"" + outputTargetColumnName + "\")");
    };
    return OracleForeignColumnCodeGenerator;
}());
/* harmony default export */ __webpack_exports__["default"] = (OracleForeignColumnCodeGenerator);


/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/oracle/column/OracleIdColumnCodeGenerator.ts":
/*!***********************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/oracle/column/OracleIdColumnCodeGenerator.ts ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var OracleIdColumnCodeGenerator = /** @class */ (function () {
    function OracleIdColumnCodeGenerator(columnCodeGenerator, columnNameCaseConverter, idColumnType) {
        this.columnCodeGenerator = columnCodeGenerator;
        this.columnNameCaseConverter = columnNameCaseConverter;
        this.idColumnType = idColumnType;
    }
    OracleIdColumnCodeGenerator.prototype.generateIdColumnCode = function (outputTableName, identifierColumnName) {
        var column = this.createIdColumnDescriptor(identifierColumnName);
        var _a = this.columnCodeGenerator.generateColumnCode(outputTableName, column), createSequenceLine = _a.createSequenceLine, columnLine = _a.columnLine;
        if (createSequenceLine == null) {
            throw new Error('Unexpected error: missing sequence for primary key column');
        }
        var pkConstraintLine = this.createPrimaryKeyConstraint(outputTableName, column);
        return {
            createSequenceLine: createSequenceLine,
            columnLine: columnLine,
            pkConstraintLine: pkConstraintLine
        };
    };
    OracleIdColumnCodeGenerator.prototype.createIdColumnDescriptor = function (identifierColumnName) {
        return {
            name: identifierColumnName,
            type: this.idColumnType,
            length: [],
            notNull: true,
            // FIXME when different IDENTITY strategies are supported, we must
            //  change this to false and manage the IDENTITY generation manually.
            autoincremental: true,
            // As primary keys are unique by default, we don't
            // need to manually define an UNIQUE KEY constraint
            unique: false
        };
    };
    OracleIdColumnCodeGenerator.prototype.createPrimaryKeyConstraint = function (outputTableName, column) {
        var columnName = this.columnNameCaseConverter.convertCase(column.name);
        return "CONSTRAINT \"" + outputTableName + "_PK\" PRIMARY KEY (\"" + columnName + "\")";
    };
    return OracleIdColumnCodeGenerator;
}());
/* harmony default export */ __webpack_exports__["default"] = (OracleIdColumnCodeGenerator);


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
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};




var OracleDatabaseModelToCodeConverterConfigManager = /** @class */ (function (_super) {
    __extends(OracleDatabaseModelToCodeConverterConfigManager, _super);
    function OracleDatabaseModelToCodeConverterConfigManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OracleDatabaseModelToCodeConverterConfigManager.prototype.getDefaultConfig = function () {
        var _a;
        return {
            idColumnType: _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].LONG,
            typeBindings: (_a = {},
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].IDENTIFIER] = 'NUMBER',
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].TEXT] = 'VARCHAR2',
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].LONG] = 'NUMBER',
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].INT] = 'NUMBER',
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].SHORT] = 'NUMBER',
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].DECIMAL] = 'NUMBER',
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].BOOLEAN] = 'NUMBER(1, 0)',
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].DATE] = 'DATE',
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].TIME] = 'TIMESTAMP',
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].DATETIME] = 'TIMESTAMP',
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].BLOB] = 'BLOB',
                _a),
            tableNameCaseFormat: _erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"].UPPER_UNDERSCORE,
            columnNameCaseFormat: _erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"].UPPER_UNDERSCORE,
        };
    };
    OracleDatabaseModelToCodeConverterConfigManager.prototype.mergeConfigs = function (fullConfig, partialConfig) {
        return __assign(__assign(__assign({}, fullConfig), partialConfig), { typeBindings: __assign(__assign({}, fullConfig.typeBindings), partialConfig === null || partialConfig === void 0 ? void 0 : partialConfig.typeBindings) });
    };
    OracleDatabaseModelToCodeConverterConfigManager.prototype.convertToSerializableObject = function (fullConfig) {
        return __assign(__assign({}, fullConfig), { tableNameCaseFormat: Object(_erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_3__["findKeyFromValue"])(_erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"], fullConfig.tableNameCaseFormat), columnNameCaseFormat: Object(_erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_3__["findKeyFromValue"])(_erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"], fullConfig.columnNameCaseFormat) });
    };
    OracleDatabaseModelToCodeConverterConfigManager.prototype.convertFromSerializableObject = function (serializableConfig) {
        return __assign(__assign({}, serializableConfig), { tableNameCaseFormat: Object(_erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_3__["findValueFromNullableKey"])(_erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"], serializableConfig.tableNameCaseFormat, _erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"].UPPER_CAMEL), columnNameCaseFormat: Object(_erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_3__["findValueFromNullableKey"])(_erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"], serializableConfig.columnNameCaseFormat, _erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"].UPPER_CAMEL) });
    };
    return OracleDatabaseModelToCodeConverterConfigManager;
}(_erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_2__["default"]));

var oracleDatabaseModelToCodeConverterConfigManager = new OracleDatabaseModelToCodeConverterConfigManager();
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
var OracleTypeResolver = /** @class */ (function () {
    function OracleTypeResolver(typeBindings) {
        this.typeBindings = typeBindings;
    }
    OracleTypeResolver.prototype.resolveOracleType = function (type) {
        if (!this.typeBindings.hasOwnProperty(type)) {
            throw new Error('Unsupported type: ' + type);
        }
        return this.typeBindings[type];
    };
    return OracleTypeResolver;
}());
/* harmony default export */ __webpack_exports__["default"] = (OracleTypeResolver);


/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/sqlserver/SqlServerDatabaseModelToCodeConverter.ts":
/*!*****************************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/sqlserver/SqlServerDatabaseModelToCodeConverter.ts ***!
  \*****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _erdiagram_generator_database_code_converter_sqlserver_column_SqlServerColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/generator/database/code-converter/sqlserver/column/SqlServerColumnCodeGenerator */ "./src/main/erdiagram/generator/database/code-converter/sqlserver/column/SqlServerColumnCodeGenerator.ts");
/* harmony import */ var _erdiagram_generator_database_code_converter_sqlserver_type_SqlServerTypeResolver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/generator/database/code-converter/sqlserver/type/SqlServerTypeResolver */ "./src/main/erdiagram/generator/database/code-converter/sqlserver/type/SqlServerTypeResolver.ts");
/* harmony import */ var _erdiagram_generator_database_code_converter_sqlserver_column_SqlServerIdColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/generator/database/code-converter/sqlserver/column/SqlServerIdColumnCodeGenerator */ "./src/main/erdiagram/generator/database/code-converter/sqlserver/column/SqlServerIdColumnCodeGenerator.ts");
/* harmony import */ var _erdiagram_generator_database_code_converter_sqlserver_column_SqlServerForeignColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/generator/database/code-converter/sqlserver/column/SqlServerForeignColumnCodeGenerator */ "./src/main/erdiagram/generator/database/code-converter/sqlserver/column/SqlServerForeignColumnCodeGenerator.ts");
/* harmony import */ var _erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/erdiagram/util/indent-utils */ "./src/main/erdiagram/util/indent-utils.ts");
/* harmony import */ var _erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/erdiagram/generator/common/case-format/StandardCaseFormats */ "./src/main/erdiagram/generator/common/case-format/StandardCaseFormats.ts");
/* harmony import */ var _erdiagram_generator_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/erdiagram/generator/common/case-format/CaseConverter */ "./src/main/erdiagram/generator/common/case-format/CaseConverter.ts");
/* harmony import */ var _erdiagram_generator_database_code_converter_sqlserver_config_SqlServerDatabaseModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/erdiagram/generator/database/code-converter/sqlserver/config/SqlServerDatabaseModelToCodeConverterConfigManager */ "./src/main/erdiagram/generator/database/code-converter/sqlserver/config/SqlServerDatabaseModelToCodeConverterConfigManager.ts");
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (undefined && undefined.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};








var SqlServerDatabaseModelToCodeConverter = /** @class */ (function () {
    function SqlServerDatabaseModelToCodeConverter(config) {
        this.config = _erdiagram_generator_database_code_converter_sqlserver_config_SqlServerDatabaseModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_7__["default"].mergeWithDefaultConfig(config);
        this.tableNameCaseConverter = new _erdiagram_generator_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_6__["default"](_erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_5__["default"].LOWER_CAMEL, this.config.tableNameCaseFormat);
        var columnNameCaseConverter = new _erdiagram_generator_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_6__["default"](_erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_5__["default"].LOWER_CAMEL, this.config.columnNameCaseFormat);
        this.columnCodeGenerator = new _erdiagram_generator_database_code_converter_sqlserver_column_SqlServerColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_0__["default"](new _erdiagram_generator_database_code_converter_sqlserver_type_SqlServerTypeResolver__WEBPACK_IMPORTED_MODULE_1__["default"](this.config.typeBindings), columnNameCaseConverter);
        this.idColumnCodeGenerator = new _erdiagram_generator_database_code_converter_sqlserver_column_SqlServerIdColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_2__["default"](this.columnCodeGenerator, columnNameCaseConverter, this.config.idColumnType);
        this.foreignColumnCodeGenerator = new _erdiagram_generator_database_code_converter_sqlserver_column_SqlServerForeignColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_3__["default"](this.columnCodeGenerator, this.tableNameCaseConverter, columnNameCaseConverter);
    }
    SqlServerDatabaseModelToCodeConverter.prototype.generateCode = function (databaseModel) {
        var _this = this;
        var allCreateTableStatements = [];
        var allAlterTableStatements = [];
        databaseModel.tables
            .map(function (table) { return _this.generateTableCode(table); })
            .forEach(function (_a) {
            var createTableStatement = _a.createTableStatement, alterTableStatements = _a.alterTableStatements;
            allCreateTableStatements.push(createTableStatement);
            if (alterTableStatements) {
                allAlterTableStatements.push(alterTableStatements);
            }
        });
        return allCreateTableStatements.join('\n\n')
            + '\n\n'
            + allAlterTableStatements.join('\n\n');
    };
    // FIXME split this method
    SqlServerDatabaseModelToCodeConverter.prototype.generateTableCode = function (table) {
        var columnLines = [];
        var createSequenceLines = [];
        var fkConstraintLines = [];
        var otherConstraintLines = [];
        var outputTableName = this.tableNameCaseConverter.convertCase(table.name);
        var _a = this.idColumnCodeGenerator.generateIdColumnCode(outputTableName, table.identifierColumnName), idColumnLine = _a.columnLine, pkConstraintLine = _a.pkConstraintLine;
        columnLines.push(idColumnLine);
        otherConstraintLines.push(pkConstraintLine);
        this.processColumns(outputTableName, table.columns, columnLines, createSequenceLines, otherConstraintLines);
        this.processReferences(outputTableName, table.references, columnLines, fkConstraintLines, otherConstraintLines);
        var createTableInnerLines = __spread(columnLines, otherConstraintLines);
        var createTableLines = __spread(createSequenceLines, [
            "CREATE TABLE \"" + outputTableName + "\" (",
            Object(_erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_4__["indentLines"])(createTableInnerLines).join(',\n'),
            ');'
        ]);
        var createTableStatement = createTableLines.join('\n');
        var alterTableStatements = fkConstraintLines.map(function (fkConstraintLine) {
            return "ALTER TABLE \"" + outputTableName + "\" ADD " + fkConstraintLine + ";";
        }).join('\n');
        return {
            createTableStatement: createTableStatement,
            alterTableStatements: alterTableStatements
        };
    };
    SqlServerDatabaseModelToCodeConverter.prototype.processReferences = function (outputTableName, references, columnLines, fkConstraintLines, otherConstraintLines) {
        var e_1, _a;
        try {
            for (var references_1 = __values(references), references_1_1 = references_1.next(); !references_1_1.done; references_1_1 = references_1.next()) {
                var reference = references_1_1.value;
                var _b = this.foreignColumnCodeGenerator.generateForeignColumnCode(outputTableName, reference), columnLine = _b.columnLine, uniqueConstraintLine = _b.uniqueConstraintLine, fkConstraintLine = _b.fkConstraintLine;
                columnLines.push(columnLine);
                fkConstraintLines.push(fkConstraintLine);
                if (uniqueConstraintLine) {
                    otherConstraintLines.push(uniqueConstraintLine);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (references_1_1 && !references_1_1.done && (_a = references_1.return)) _a.call(references_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    SqlServerDatabaseModelToCodeConverter.prototype.processColumns = function (outputTableName, columns, columnLines, createSequenceLines, otherConstraintLines) {
        var e_2, _a;
        try {
            for (var columns_1 = __values(columns), columns_1_1 = columns_1.next(); !columns_1_1.done; columns_1_1 = columns_1.next()) {
                var column = columns_1_1.value;
                var _b = this.columnCodeGenerator.generateColumnCode(outputTableName, column), columnLine = _b.columnLine, createSequenceLine = _b.createSequenceLine, uniqueConstraintLine = _b.uniqueConstraintLine;
                columnLines.push(columnLine);
                if (createSequenceLine) {
                    createSequenceLines.push(createSequenceLine);
                }
                if (uniqueConstraintLine) {
                    otherConstraintLines.push(uniqueConstraintLine);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (columns_1_1 && !columns_1_1.done && (_a = columns_1.return)) _a.call(columns_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    return SqlServerDatabaseModelToCodeConverter;
}());
/* harmony default export */ __webpack_exports__["default"] = (SqlServerDatabaseModelToCodeConverter);


/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/sqlserver/column/SqlServerColumnCodeGenerator.ts":
/*!***************************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/sqlserver/column/SqlServerColumnCodeGenerator.ts ***!
  \***************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var SqlServerColumnCodeGenerator = /** @class */ (function () {
    function SqlServerColumnCodeGenerator(typeResolver, columnNameCaseConverter) {
        this.typeResolver = typeResolver;
        this.columnNameCaseConverter = columnNameCaseConverter;
    }
    // FIXME refactor the way "identity" flag is used
    SqlServerColumnCodeGenerator.prototype.generateColumnCode = function (outputTableName, column, identity) {
        if (identity === void 0) { identity = false; }
        var outputColumnName = this.columnNameCaseConverter.convertCase(column.name);
        var autoincrementalSequenceName = this.getAutoincrementalSequenceName(outputTableName, outputColumnName);
        return {
            createSequenceLine: column.autoincremental ? this.generateCreateSequenceLine(autoincrementalSequenceName) : undefined,
            columnLine: this.generateColumnDeclarationLine(outputColumnName, column, identity, autoincrementalSequenceName),
            uniqueConstraintLine: column.unique ? this.generateUniqueConstraintLine(outputTableName, outputColumnName) : undefined
        };
    };
    SqlServerColumnCodeGenerator.prototype.getAutoincrementalSequenceName = function (outputTableName, outputColumnName) {
        return outputTableName + "_" + outputColumnName + "_seq";
    };
    SqlServerColumnCodeGenerator.prototype.generateCreateSequenceLine = function (autoincrementalSequenceName) {
        return "CREATE SEQUENCE \"" + autoincrementalSequenceName + "\" START WITH 1;";
    };
    // FIXME refactor this methods - it receives too much arguments
    SqlServerColumnCodeGenerator.prototype.generateColumnDeclarationLine = function (outputColumnName, column, identity, autoincrementalSequenceName) {
        var notNull = column.notNull, autoincremental = column.autoincremental, type = column.type, length = column.length;
        var lineParts = [
            "\"" + outputColumnName + "\"",
            this.generateSqlServerTypeDeclaration(type, length)
        ];
        if (notNull) {
            lineParts.push('NOT NULL');
        }
        if (identity) {
            lineParts.push('IDENTITY(1, 1)');
        }
        if (autoincremental) {
            lineParts.push("DEFAULT NEXT VALUE FOR \"" + autoincrementalSequenceName + "\"");
        }
        return lineParts.join(' ');
    };
    SqlServerColumnCodeGenerator.prototype.generateSqlServerTypeDeclaration = function (type, length) {
        var sqlServerType = this.typeResolver.resolveSqlServerType(type);
        var lengthCode = this.generateLengthCode(length);
        return sqlServerType + lengthCode;
    };
    SqlServerColumnCodeGenerator.prototype.generateLengthCode = function (length) {
        if (length.length === 0) {
            return '';
        }
        return "(" + length.join(', ') + ")";
    };
    SqlServerColumnCodeGenerator.prototype.generateUniqueConstraintLine = function (outputTableName, outputColumnName) {
        return "CONSTRAINT \"" + outputTableName + "_" + outputColumnName + "_unique\" UNIQUE (\"" + outputColumnName + "\")";
    };
    return SqlServerColumnCodeGenerator;
}());
/* harmony default export */ __webpack_exports__["default"] = (SqlServerColumnCodeGenerator);


/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/sqlserver/column/SqlServerForeignColumnCodeGenerator.ts":
/*!**********************************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/sqlserver/column/SqlServerForeignColumnCodeGenerator.ts ***!
  \**********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/entity-relationship-model-types */ "./src/main/erdiagram/parser/entity-relationship-model-types.ts");

var SqlServerForeignColumnCodeGenerator = /** @class */ (function () {
    function SqlServerForeignColumnCodeGenerator(columnCodeGenerator, tableNameCaseConverter, columnNameCaseConverter) {
        this.columnCodeGenerator = columnCodeGenerator;
        this.tableNameCaseConverter = tableNameCaseConverter;
        this.columnNameCaseConverter = columnNameCaseConverter;
    }
    SqlServerForeignColumnCodeGenerator.prototype.generateForeignColumnCode = function (outputTableName, reference) {
        var columnDescriptor = this.createForeignKeyColumnDescriptor(reference);
        var _a = this.columnCodeGenerator.generateColumnCode(outputTableName, columnDescriptor), columnLine = _a.columnLine, uniqueConstraintLine = _a.uniqueConstraintLine;
        return {
            columnLine: columnLine,
            uniqueConstraintLine: uniqueConstraintLine,
            fkConstraintLine: this.createForeignKeyConstraint(outputTableName, reference)
        };
    };
    SqlServerForeignColumnCodeGenerator.prototype.createForeignKeyColumnDescriptor = function (reference) {
        var columnName = reference.columnName, notNull = reference.notNull, unique = reference.unique;
        return {
            name: columnName,
            type: _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].LONG,
            length: [],
            notNull: notNull,
            unique: unique,
            autoincremental: false
        };
    };
    SqlServerForeignColumnCodeGenerator.prototype.createForeignKeyConstraint = function (outputTableName, reference) {
        var outputColumnName = this.columnNameCaseConverter.convertCase(reference.columnName);
        var outputTargetTableName = this.tableNameCaseConverter.convertCase(reference.targetTableName);
        var outputTargetColumnName = this.columnNameCaseConverter.convertCase(reference.targetTableIdentifierColumnName);
        return "CONSTRAINT \"" + outputTableName + "_" + outputColumnName + "_fk\" FOREIGN KEY (\"" + outputColumnName + "\")"
            + (" REFERENCES \"" + outputTargetTableName + "\" (\"" + outputTargetColumnName + "\")");
    };
    return SqlServerForeignColumnCodeGenerator;
}());
/* harmony default export */ __webpack_exports__["default"] = (SqlServerForeignColumnCodeGenerator);


/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/sqlserver/column/SqlServerIdColumnCodeGenerator.ts":
/*!*****************************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/sqlserver/column/SqlServerIdColumnCodeGenerator.ts ***!
  \*****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var SqlServerIdColumnCodeGenerator = /** @class */ (function () {
    function SqlServerIdColumnCodeGenerator(columnCodeGenerator, columnNameCaseConverter, idColumnType) {
        this.columnCodeGenerator = columnCodeGenerator;
        this.columnNameCaseConverter = columnNameCaseConverter;
        this.idColumnType = idColumnType;
    }
    SqlServerIdColumnCodeGenerator.prototype.generateIdColumnCode = function (outputTableName, identifierColumnName) {
        var column = this.createIdColumnDescriptor(identifierColumnName);
        var columnLine = this.columnCodeGenerator.generateColumnCode(outputTableName, column, true).columnLine;
        var pkConstraintLine = this.createPrimaryKeyConstraint(outputTableName, column);
        return {
            columnLine: columnLine,
            pkConstraintLine: pkConstraintLine
        };
    };
    SqlServerIdColumnCodeGenerator.prototype.createIdColumnDescriptor = function (identifierColumnName) {
        return {
            name: identifierColumnName,
            type: this.idColumnType,
            length: [],
            notNull: true,
            // Autoincrement of identity columns have to be achieved using IDENTITY,
            // while other autoincremental columns have to use a custom sequence.
            autoincremental: false,
            // As primary keys are unique by default, we don't
            // need to manually define an UNIQUE KEY constraint
            unique: false
        };
    };
    SqlServerIdColumnCodeGenerator.prototype.createPrimaryKeyConstraint = function (outputTableName, column) {
        var columnName = this.columnNameCaseConverter.convertCase(column.name);
        return "CONSTRAINT \"" + outputTableName + "_pk\" PRIMARY KEY (\"" + columnName + "\")";
    };
    return SqlServerIdColumnCodeGenerator;
}());
/* harmony default export */ __webpack_exports__["default"] = (SqlServerIdColumnCodeGenerator);


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
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};




var SqlServerDatabaseModelToCodeConverterConfigManager = /** @class */ (function (_super) {
    __extends(SqlServerDatabaseModelToCodeConverterConfigManager, _super);
    function SqlServerDatabaseModelToCodeConverterConfigManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SqlServerDatabaseModelToCodeConverterConfigManager.prototype.getDefaultConfig = function () {
        var _a;
        return {
            idColumnType: _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].LONG,
            typeBindings: (_a = {},
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].IDENTIFIER] = 'BIGINT',
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].TEXT] = 'NVARCHAR',
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].LONG] = 'BIGINT',
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].INT] = 'INT',
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].SHORT] = 'SMALLINT',
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].DECIMAL] = 'DECIMAL',
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].BOOLEAN] = 'BIT',
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].DATE] = 'DATE',
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].TIME] = 'TIME',
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].DATETIME] = 'DATETIME2',
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].BLOB] = 'VARBINARY(MAX)',
                _a),
            tableNameCaseFormat: _erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"].UPPER_CAMEL,
            columnNameCaseFormat: _erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"].UPPER_CAMEL,
        };
    };
    SqlServerDatabaseModelToCodeConverterConfigManager.prototype.mergeConfigs = function (fullConfig, partialConfig) {
        return __assign(__assign(__assign({}, fullConfig), partialConfig), { typeBindings: __assign(__assign({}, fullConfig.typeBindings), partialConfig === null || partialConfig === void 0 ? void 0 : partialConfig.typeBindings) });
    };
    SqlServerDatabaseModelToCodeConverterConfigManager.prototype.convertToSerializableObject = function (fullConfig) {
        return __assign(__assign({}, fullConfig), { tableNameCaseFormat: Object(_erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_3__["findKeyFromValue"])(_erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"], fullConfig.tableNameCaseFormat), columnNameCaseFormat: Object(_erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_3__["findKeyFromValue"])(_erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"], fullConfig.columnNameCaseFormat) });
    };
    SqlServerDatabaseModelToCodeConverterConfigManager.prototype.convertFromSerializableObject = function (serializableConfig) {
        return __assign(__assign({}, serializableConfig), { tableNameCaseFormat: Object(_erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_3__["findValueFromNullableKey"])(_erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"], serializableConfig.tableNameCaseFormat, _erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"].UPPER_CAMEL), columnNameCaseFormat: Object(_erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_3__["findValueFromNullableKey"])(_erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"], serializableConfig.columnNameCaseFormat, _erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__["default"].UPPER_CAMEL) });
    };
    return SqlServerDatabaseModelToCodeConverterConfigManager;
}(_erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_2__["default"]));

var sqlServerDatabaseModelToCodeConverterConfigManager = new SqlServerDatabaseModelToCodeConverterConfigManager();
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
/* harmony import */ var src_main_erdiagram_generator_database_code_converter_sqlserver_SqlServerDatabaseModelToCodeConverter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/main/erdiagram/generator/database/code-converter/sqlserver/SqlServerDatabaseModelToCodeConverter */ "./src/main/erdiagram/generator/database/code-converter/sqlserver/SqlServerDatabaseModelToCodeConverter.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SqlServerDatabaseModelToCodeConverter", function() { return src_main_erdiagram_generator_database_code_converter_sqlserver_SqlServerDatabaseModelToCodeConverter__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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
var SqlServerTypeResolver = /** @class */ (function () {
    function SqlServerTypeResolver(typeBindings) {
        this.typeBindings = typeBindings;
    }
    SqlServerTypeResolver.prototype.resolveSqlServerType = function (type) {
        if (!this.typeBindings.hasOwnProperty(type)) {
            throw new Error('Unsupported type: ' + type);
        }
        return this.typeBindings[type];
    };
    return SqlServerTypeResolver;
}());
/* harmony default export */ __webpack_exports__["default"] = (SqlServerTypeResolver);


/***/ }),

/***/ "./src/main/erdiagram/generator/database/exports.ts":
/*!**********************************************************!*\
  !*** ./src/main/erdiagram/generator/database/exports.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _code_converter_exports__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./code-converter/exports */ "./src/main/erdiagram/generator/database/code-converter/exports.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MySqlDatabaseModelToCodeConverterConfigManager", function() { return _code_converter_exports__WEBPACK_IMPORTED_MODULE_0__["MySqlDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mysqlDatabaseModelToCodeConverterConfigManager", function() { return _code_converter_exports__WEBPACK_IMPORTED_MODULE_0__["mysqlDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MySqlDatabaseModelToCodeConverter", function() { return _code_converter_exports__WEBPACK_IMPORTED_MODULE_0__["MySqlDatabaseModelToCodeConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OracleDatabaseModelToCodeConverterConfigManager", function() { return _code_converter_exports__WEBPACK_IMPORTED_MODULE_0__["OracleDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "oracleDatabaseModelToCodeConverterConfigManager", function() { return _code_converter_exports__WEBPACK_IMPORTED_MODULE_0__["oracleDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OracleDatabaseModelToCodeConverter", function() { return _code_converter_exports__WEBPACK_IMPORTED_MODULE_0__["OracleDatabaseModelToCodeConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SqlServerDatabaseModelToCodeConverterConfigManager", function() { return _code_converter_exports__WEBPACK_IMPORTED_MODULE_0__["SqlServerDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sqlServerDatabaseModelToCodeConverterConfigManager", function() { return _code_converter_exports__WEBPACK_IMPORTED_MODULE_0__["sqlServerDatabaseModelToCodeConverterConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SqlServerDatabaseModelToCodeConverter", function() { return _code_converter_exports__WEBPACK_IMPORTED_MODULE_0__["SqlServerDatabaseModelToCodeConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EntityRelationshipModelToDatabaseCodeConverter", function() { return _code_converter_exports__WEBPACK_IMPORTED_MODULE_0__["EntityRelationshipModelToDatabaseCodeConverter"]; });

/* harmony import */ var _model_exports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model/exports */ "./src/main/erdiagram/generator/database/model/exports.ts");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _model_exports__WEBPACK_IMPORTED_MODULE_1__) if(["default","MySqlDatabaseModelToCodeConverterConfigManager","mysqlDatabaseModelToCodeConverterConfigManager","MySqlDatabaseModelToCodeConverter","OracleDatabaseModelToCodeConverterConfigManager","oracleDatabaseModelToCodeConverterConfigManager","OracleDatabaseModelToCodeConverter","SqlServerDatabaseModelToCodeConverterConfigManager","sqlServerDatabaseModelToCodeConverterConfigManager","SqlServerDatabaseModelToCodeConverter","EntityRelationshipModelToDatabaseCodeConverter"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _model_exports__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));




/***/ }),

/***/ "./src/main/erdiagram/generator/database/model/DatabaseModelGenerator.ts":
/*!*******************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/model/DatabaseModelGenerator.ts ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var pluralize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pluralize */ "./node_modules/pluralize/pluralize.js");
/* harmony import */ var pluralize__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pluralize__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/parser/entity-relationship-model-types */ "./src/main/erdiagram/parser/entity-relationship-model-types.ts");
/* harmony import */ var _erdiagram_generator_database_model_config_DatabaseModelGeneratorConfigManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/generator/database/model/config/DatabaseModelGeneratorConfigManager */ "./src/main/erdiagram/generator/database/model/config/DatabaseModelGeneratorConfigManager.ts");
/* harmony import */ var _erdiagram_util_map_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/util/map-utils */ "./src/main/erdiagram/util/map-utils.ts");
var __values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};




var DatabaseModelGenerator = /** @class */ (function () {
    function DatabaseModelGenerator(config) {
        this.config = _erdiagram_generator_database_model_config_DatabaseModelGeneratorConfigManager__WEBPACK_IMPORTED_MODULE_2__["default"].mergeWithDefaultConfig(config);
    }
    DatabaseModelGenerator.prototype.generateDatabaseModel = function (model) {
        var entityIdentifiersMap = Object(_erdiagram_util_map_utils__WEBPACK_IMPORTED_MODULE_3__["classifyBy"])(model.entities.filter(function (entity) { return entity.identifierPropertyName; }), function (entity) { return entity.name; }, function (entity) { return entity.identifierPropertyName; });
        var tables = [];
        this.generateEntityTables(model, entityIdentifiersMap, tables);
        this.generateRelationshipTables(model, entityIdentifiersMap, tables);
        return {
            tables: tables
        };
    };
    DatabaseModelGenerator.prototype.generateEntityTables = function (model, entityIdentifiersMap, tables) {
        var _this = this;
        model.entities
            .map(function (entity) { return _this.generateEntityTable(entity, model, entityIdentifiersMap); })
            .forEach(function (sentence) { return tables.push(sentence); });
    };
    DatabaseModelGenerator.prototype.generateEntityTable = function (entity, model, entityIdentifiersMap) {
        var e_1, _a, e_2, _b;
        var columns = [];
        var references = [];
        try {
            for (var _c = __values(entity.properties), _d = _c.next(); !_d.done; _d = _c.next()) {
                var property = _d.value;
                columns.push(this.mapPropertyToColumn(property));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        try {
            for (var _e = __values(model.relationships), _f = _e.next(); !_f.done; _f = _e.next()) {
                var relationship = _f.value;
                if (relationship.rightMember.cardinality !== _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_1__["Cardinality"].MANY) {
                    if (relationship.leftMember.entity === entity.name) {
                        var isOneToOneRelationship = relationship.leftMember.cardinality !== _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_1__["Cardinality"].MANY;
                        references.push(this.createTableReference(relationship.rightMember, entityIdentifiersMap, isOneToOneRelationship));
                    }
                }
                else if (relationship.leftMember.cardinality !== _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_1__["Cardinality"].MANY) {
                    if (relationship.rightMember.entity === entity.name) {
                        references.push(this.createTableReference(relationship.leftMember, entityIdentifiersMap));
                    }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return {
            name: this.pluralizeEntityNameIfApplies(entity.name),
            identifierColumnName: this.getIdentifierColumnName(entity.name, entityIdentifiersMap),
            columns: columns,
            references: references
        };
    };
    DatabaseModelGenerator.prototype.generateRelationshipTables = function (model, entityIdentifiersMap, tables) {
        var _this = this;
        model.relationships
            .filter(function (relationship) { return _this.isManyToManyRelationship(relationship); })
            .map(function (relationship) { return _this.generateRelationshipTable(relationship, entityIdentifiersMap); })
            .forEach(function (sentence) { return tables.push(sentence); });
    };
    DatabaseModelGenerator.prototype.generateRelationshipTable = function (relationship, entityIdentifiersMap) {
        var name = this.getRelationshipTableName(relationship);
        var identifierColumnName = this.getRelationshipTableIdentifierColumnName(relationship, entityIdentifiersMap);
        return {
            name: name,
            identifierColumnName: identifierColumnName,
            columns: [],
            references: [
                this.createTableReference(relationship.leftMember, entityIdentifiersMap),
                this.createTableReference(relationship.rightMember, entityIdentifiersMap)
            ]
        };
    };
    DatabaseModelGenerator.prototype.getRelationshipTableName = function (relationship) {
        var relationShipName = relationship.relationShipName, leftMember = relationship.leftMember, rightMember = relationship.rightMember;
        if (relationShipName) {
            return relationShipName;
        }
        return this.pluralizeEntityNameIfApplies(leftMember.entity)
            + this.pluralizeEntityNameIfApplies(rightMember.entity);
    };
    DatabaseModelGenerator.prototype.getRelationshipTableIdentifierColumnName = function (relationship, entityIdentifiersMap) {
        var relationShipName = relationship.relationShipName, leftMember = relationship.leftMember, rightMember = relationship.rightMember;
        if (relationShipName) {
            return this.getIdentifierColumnName(relationShipName, entityIdentifiersMap);
        }
        return this.getIdentifierColumnName(leftMember.entity + rightMember.entity, entityIdentifiersMap);
    };
    DatabaseModelGenerator.prototype.createTableReference = function (toMember, entityIdentifiersMap, unique) {
        if (unique === void 0) { unique = false; }
        var entityAlias = toMember.entityAlias, entity = toMember.entity, cardinality = toMember.cardinality;
        return {
            columnName: entityAlias + "Id",
            targetTableName: this.pluralizeEntityNameIfApplies(entity),
            targetTableIdentifierColumnName: this.getIdentifierColumnName(entity, entityIdentifiersMap),
            notNull: cardinality !== _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_1__["Cardinality"].ZERO_OR_ONE,
            unique: unique
        };
    };
    DatabaseModelGenerator.prototype.pluralizeEntityNameIfApplies = function (entityName) {
        if (this.config.usePluralTableNames) {
            return pluralize__WEBPACK_IMPORTED_MODULE_0___default()(entityName);
        }
        else {
            return entityName;
        }
    };
    DatabaseModelGenerator.prototype.getIdentifierColumnName = function (entityName, entityIdentifiersMap) {
        if (entityIdentifiersMap.has(entityName)) {
            return entityIdentifiersMap.get(entityName);
        }
        var idNamingStrategy = this.config.idNamingStrategy;
        return idNamingStrategy(entityName);
    };
    DatabaseModelGenerator.prototype.mapPropertyToColumn = function (property) {
        var name = property.name, optional = property.optional, autoincremental = property.autoincremental, unique = property.unique, type = property.type, length = property.length;
        return {
            name: name,
            notNull: !optional,
            autoincremental: autoincremental,
            unique: unique,
            type: type,
            length: length
        };
    };
    DatabaseModelGenerator.prototype.isManyToManyRelationship = function (relationship) {
        return [
            relationship.leftMember,
            relationship.rightMember
        ].every(function (member) { return member.cardinality === _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_1__["Cardinality"].MANY; });
    };
    return DatabaseModelGenerator;
}());
/* harmony default export */ __webpack_exports__["default"] = (DatabaseModelGenerator);


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
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};



var DatabaseModelGeneratorConfigManager = /** @class */ (function (_super) {
    __extends(DatabaseModelGeneratorConfigManager, _super);
    function DatabaseModelGeneratorConfigManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DatabaseModelGeneratorConfigManager.prototype.getDefaultConfig = function () {
        return {
            usePluralTableNames: false,
            idNamingStrategy: _erdiagram_generator_common_id_naming_strategy_StandardIdNamingStrategies__WEBPACK_IMPORTED_MODULE_1__["default"].DEFAULT
        };
    };
    DatabaseModelGeneratorConfigManager.prototype.mergeConfigs = function (fullConfig, partialConfig) {
        return __assign(__assign({}, fullConfig), partialConfig);
    };
    DatabaseModelGeneratorConfigManager.prototype.convertToSerializableObject = function (fullConfig) {
        return __assign(__assign({}, fullConfig), { idNamingStrategy: Object(_erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_2__["findKeyFromValue"])(_erdiagram_generator_common_id_naming_strategy_StandardIdNamingStrategies__WEBPACK_IMPORTED_MODULE_1__["default"], fullConfig.idNamingStrategy) });
    };
    DatabaseModelGeneratorConfigManager.prototype.convertFromSerializableObject = function (serializableConfig) {
        return __assign(__assign({}, serializableConfig), { idNamingStrategy: Object(_erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_2__["findValueFromNullableKey"])(_erdiagram_generator_common_id_naming_strategy_StandardIdNamingStrategies__WEBPACK_IMPORTED_MODULE_1__["default"], serializableConfig.idNamingStrategy, _erdiagram_generator_common_id_naming_strategy_StandardIdNamingStrategies__WEBPACK_IMPORTED_MODULE_1__["default"].DEFAULT) });
    };
    return DatabaseModelGeneratorConfigManager;
}(_erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"]));

var databaseModelGeneratorConfigManager = new DatabaseModelGeneratorConfigManager();
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
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/main/erdiagram/generator/database/model/exports.ts":
/*!****************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/model/exports.ts ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DatabaseModelGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DatabaseModelGenerator */ "./src/main/erdiagram/generator/database/model/DatabaseModelGenerator.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DatabaseModelGenerator", function() { return _DatabaseModelGenerator__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _database_model_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./database-model-types */ "./src/main/erdiagram/generator/database/model/database-model-types.ts");
/* harmony import */ var _database_model_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_database_model_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _database_model_types__WEBPACK_IMPORTED_MODULE_1__) if(["default","DatabaseModelGenerator"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _database_model_types__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _config_exports__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config/exports */ "./src/main/erdiagram/generator/database/model/config/exports.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DatabaseModelGeneratorConfigManager", function() { return _config_exports__WEBPACK_IMPORTED_MODULE_2__["DatabaseModelGeneratorConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "databaseModelGeneratorConfigManager", function() { return _config_exports__WEBPACK_IMPORTED_MODULE_2__["databaseModelGeneratorConfigManager"]; });







/***/ }),

/***/ "./src/main/erdiagram/generator/exports.ts":
/*!*************************************************!*\
  !*** ./src/main/erdiagram/generator/exports.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_exports__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common/exports */ "./src/main/erdiagram/generator/common/exports.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StandardCaseFormats", function() { return _common_exports__WEBPACK_IMPORTED_MODULE_0__["StandardCaseFormats"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CaseConverter", function() { return _common_exports__WEBPACK_IMPORTED_MODULE_0__["CaseConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StandardIdNamingStrategies", function() { return _common_exports__WEBPACK_IMPORTED_MODULE_0__["StandardIdNamingStrategies"]; });

/* harmony import */ var _database_exports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./database/exports */ "./src/main/erdiagram/generator/database/exports.ts");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _database_exports__WEBPACK_IMPORTED_MODULE_1__) if(["default","StandardCaseFormats","CaseConverter","StandardIdNamingStrategies"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _database_exports__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _oop_exports__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./oop/exports */ "./src/main/erdiagram/generator/oop/exports.ts");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _oop_exports__WEBPACK_IMPORTED_MODULE_2__) if(["default","StandardCaseFormats","CaseConverter","StandardIdNamingStrategies"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _oop_exports__WEBPACK_IMPORTED_MODULE_2__[key]; }) }(__WEBPACK_IMPORT_KEY__));





/***/ }),

/***/ "./src/main/erdiagram/generator/oop/code-converter/EntityRelationshipModelToClassCodeConverter.ts":
/*!********************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/oop/code-converter/EntityRelationshipModelToClassCodeConverter.ts ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var EntityRelationshipModelToClassCodeConverter = /** @class */ (function () {
    function EntityRelationshipModelToClassCodeConverter(classModelGenerator, classModelToCodeConverter) {
        this.classModelGenerator = classModelGenerator;
        this.classModelToCodeConverter = classModelToCodeConverter;
    }
    EntityRelationshipModelToClassCodeConverter.prototype.generateCode = function (entityRelationshipModel) {
        var classModel = this.classModelGenerator.generateClassModel(entityRelationshipModel);
        return this.classModelToCodeConverter.generateCode(classModel);
    };
    return EntityRelationshipModelToClassCodeConverter;
}());
/* harmony default export */ __webpack_exports__["default"] = (EntityRelationshipModelToClassCodeConverter);


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
/* harmony import */ var _erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/util/string-utils */ "./src/main/erdiagram/util/string-utils.ts");
/* harmony import */ var _erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/util/indent-utils */ "./src/main/erdiagram/util/indent-utils.ts");
/* harmony import */ var _erdiagram_generator_oop_code_converter_java_type_JavaParameterizedType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/generator/oop/code-converter/java/type/JavaParameterizedType */ "./src/main/erdiagram/generator/oop/code-converter/java/type/JavaParameterizedType.ts");
/* harmony import */ var _erdiagram_generator_oop_code_converter_java_type_JavaType__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/generator/oop/code-converter/java/type/JavaType */ "./src/main/erdiagram/generator/oop/code-converter/java/type/JavaType.ts");
/* harmony import */ var _erdiagram_util_array_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/erdiagram/util/array-utils */ "./src/main/erdiagram/util/array-utils.ts");
/* harmony import */ var _erdiagram_generator_oop_code_converter_java_config_JavaClassModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/erdiagram/generator/oop/code-converter/java/config/JavaClassModelToCodeConverterConfigManager */ "./src/main/erdiagram/generator/oop/code-converter/java/config/JavaClassModelToCodeConverterConfigManager.ts");
var __values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (undefined && undefined.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};






var EMPTY_STRING = '';
var JavaClassModelToCodeConverter = /** @class */ (function () {
    function JavaClassModelToCodeConverter(config) {
        this.config = _erdiagram_generator_oop_code_converter_java_config_JavaClassModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_5__["default"].mergeWithDefaultConfig(config);
    }
    JavaClassModelToCodeConverter.prototype.generateCode = function (classModel) {
        var _this = this;
        return classModel.classes
            .map(function (classDescriptor) { return _this.generateClass(classDescriptor); })
            .join('\n\n');
    };
    JavaClassModelToCodeConverter.prototype.generateClass = function (classDescriptor) {
        var e_1, _a;
        var className = Object(_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_0__["capitalizeWord"])(classDescriptor.name);
        var fieldsTypes = [];
        var fieldsLines = [];
        var methodsLines = [];
        try {
            for (var _b = __values(classDescriptor.fields), _c = _b.next(); !_c.done; _c = _b.next()) {
                var field = _c.value;
                var _d = this.createField(field), fieldType = _d.fieldType, fieldLines = _d.fieldLines, getterLines = _d.getterLines, setterLines = _d.setterLines;
                fieldsTypes.push(fieldType);
                fieldsLines.push.apply(fieldsLines, __spread(fieldLines));
                methodsLines.push.apply(methodsLines, __spread(getterLines, [EMPTY_STRING], setterLines, [EMPTY_STRING]));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var classOuterLines = [
            "/* ========== " + className + " class ========== */",
            EMPTY_STRING
        ];
        if (this.config.generatedClassesPackage) {
            classOuterLines.push("package " + this.config.generatedClassesPackage + ";", EMPTY_STRING);
        }
        var importLines = this.createImportStatements(fieldsTypes);
        if (this.config.useSpringNullabilityAnnotations) {
            // FIXME gestionar estos imports de otra forma
            // Quizás hacer que createField() devuelva qué tipos utiliza, y no solo el tipo del campo
            var importNonNullAnnotation = classDescriptor.fields.some(function (f) { return !f.nullable; });
            if (importNonNullAnnotation) {
                importLines.push('import org.springframework.lang.NonNull;');
            }
            var importNullableAnnotation = classDescriptor.fields.some(function (f) { return f.nullable; });
            if (importNullableAnnotation) {
                importLines.push('import org.springframework.lang.Nullable;');
            }
        }
        if (importLines.length !== 0) {
            classOuterLines.push.apply(classOuterLines, __spread(importLines, [EMPTY_STRING]));
        }
        classOuterLines.push("public class " + className + " {");
        var classContentLines = __spread([
            EMPTY_STRING
        ], fieldsLines, [
            EMPTY_STRING
        ], methodsLines);
        classOuterLines.push.apply(classOuterLines, __spread(Object(_erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_1__["indentLines"])(classContentLines)));
        classOuterLines.push("}");
        return classOuterLines.join('\n');
    };
    JavaClassModelToCodeConverter.prototype.createField = function (field) {
        var fieldName = field.name;
        var capitalizedFieldName = Object(_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_0__["capitalizeWord"])(fieldName);
        var fieldLines = [];
        // TODO use length for validation annotations?
        if (this.config.useSpringNullabilityAnnotations) {
            if (field.nullable) {
                fieldLines.push('@Nullable');
            }
            else {
                fieldLines.push('@NonNull');
            }
        }
        var javaType = this.mapFieldTypeToJavaType(field);
        var formattedJavaType = javaType.formatSimple();
        fieldLines.push("private " + formattedJavaType + " " + fieldName + ";");
        var getterLines = [
            "public " + formattedJavaType + " get" + capitalizedFieldName + "() {",
            Object(_erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_1__["indentLine"])("return " + fieldName + ";"),
            '}',
        ];
        var setterLines = [
            "public " + formattedJavaType + " set" + capitalizedFieldName + "(" + formattedJavaType + " " + fieldName + ") {",
            Object(_erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_1__["indentLine"])("this." + fieldName + " = " + fieldName + ";"),
            '}',
        ];
        return {
            fieldType: javaType,
            fieldLines: fieldLines,
            getterLines: getterLines,
            setterLines: setterLines
        };
    };
    JavaClassModelToCodeConverter.prototype.mapFieldTypeToJavaType = function (field) {
        if (field.list) {
            return this.mapListTypeToJavaType(field);
        }
        else {
            return this.mapSingleTypeToJavaType(field);
        }
    };
    JavaClassModelToCodeConverter.prototype.mapListTypeToJavaType = function (field) {
        return Object(_erdiagram_generator_oop_code_converter_java_type_JavaParameterizedType__WEBPACK_IMPORTED_MODULE_2__["createJavaParameterizedType"])('List', 'java.util', [
            this.mapSingleTypeToJavaType(field)
        ]);
    };
    JavaClassModelToCodeConverter.prototype.mapSingleTypeToJavaType = function (field) {
        var entityType = field.entityType, primitiveType = field.primitiveType;
        if (entityType) {
            if (primitiveType) {
                throw new Error('Invalid field descriptor: provided both primitive and entity types');
            }
            return Object(_erdiagram_generator_oop_code_converter_java_type_JavaType__WEBPACK_IMPORTED_MODULE_3__["createJavaType"])(entityType, this.config.generatedClassesPackage);
        }
        if (!primitiveType) {
            throw new Error('Invalid field descriptor: missing type');
        }
        if (!this.config.typeBindings.hasOwnProperty(primitiveType)) {
            throw new Error('Unsupported type: ' + primitiveType);
        }
        return this.config.typeBindings[primitiveType];
    };
    JavaClassModelToCodeConverter.prototype.createImportStatements = function (javaTypes) {
        var _this = this;
        var importStatements = this.unrollTypesRecursively(javaTypes)
            .filter(function (javaType) { return _this.isImportRequired(javaType); })
            .map(function (javaType) { return "import " + javaType.canonicalName + ";"; });
        return Object(_erdiagram_util_array_utils__WEBPACK_IMPORTED_MODULE_4__["removeDuplicates"])(importStatements).sort();
    };
    JavaClassModelToCodeConverter.prototype.unrollTypesRecursively = function (javaTypes, appendTo) {
        var e_2, _a;
        if (appendTo === void 0) { appendTo = []; }
        try {
            for (var javaTypes_1 = __values(javaTypes), javaTypes_1_1 = javaTypes_1.next(); !javaTypes_1_1.done; javaTypes_1_1 = javaTypes_1.next()) {
                var javaType = javaTypes_1_1.value;
                appendTo.push(javaType);
                if (Object(_erdiagram_generator_oop_code_converter_java_type_JavaParameterizedType__WEBPACK_IMPORTED_MODULE_2__["isJavaParameterizedType"])(javaType)) {
                    this.unrollTypesRecursively(javaType.parameterTypes, appendTo);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (javaTypes_1_1 && !javaTypes_1_1.done && (_a = javaTypes_1.return)) _a.call(javaTypes_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return appendTo;
    };
    JavaClassModelToCodeConverter.prototype.isImportRequired = function (javaType) {
        return !!javaType.packageName
            && javaType.packageName !== 'java.lang'
            && this.config.generatedClassesPackage !== javaType.packageName;
    };
    return JavaClassModelToCodeConverter;
}());
/* harmony default export */ __webpack_exports__["default"] = (JavaClassModelToCodeConverter);


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
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};




var JavaClassModelToCodeConverterConfigManager = /** @class */ (function (_super) {
    __extends(JavaClassModelToCodeConverterConfigManager, _super);
    function JavaClassModelToCodeConverterConfigManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JavaClassModelToCodeConverterConfigManager.prototype.getDefaultConfig = function () {
        var _a;
        return {
            typeBindings: (_a = {},
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].IDENTIFIER] = Object(_erdiagram_generator_oop_code_converter_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__["default"])('java.lang.Long'),
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].TEXT] = Object(_erdiagram_generator_oop_code_converter_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__["default"])('java.lang.String'),
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].LONG] = Object(_erdiagram_generator_oop_code_converter_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__["default"])('java.lang.Long'),
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].INT] = Object(_erdiagram_generator_oop_code_converter_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__["default"])('java.lang.Integer'),
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].SHORT] = Object(_erdiagram_generator_oop_code_converter_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__["default"])('java.lang.Short'),
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].DECIMAL] = Object(_erdiagram_generator_oop_code_converter_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__["default"])('java.math.BigDecimal'),
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].BOOLEAN] = Object(_erdiagram_generator_oop_code_converter_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__["default"])('java.lang.Boolean'),
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].DATE] = Object(_erdiagram_generator_oop_code_converter_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__["default"])('java.time.LocalDate'),
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].TIME] = Object(_erdiagram_generator_oop_code_converter_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__["default"])('java.time.LocalTime'),
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].DATETIME] = Object(_erdiagram_generator_oop_code_converter_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__["default"])('java.time.LocalDateTime'),
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].BLOB] = Object(_erdiagram_generator_oop_code_converter_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__["default"])('byte[]'),
                _a),
            useSpringNullabilityAnnotations: false
        };
    };
    JavaClassModelToCodeConverterConfigManager.prototype.mergeConfigs = function (fullConfig, partialConfig) {
        return __assign(__assign(__assign({}, fullConfig), partialConfig), { typeBindings: __assign(__assign({}, fullConfig.typeBindings), partialConfig === null || partialConfig === void 0 ? void 0 : partialConfig.typeBindings) });
    };
    JavaClassModelToCodeConverterConfigManager.prototype.convertToSerializableObject = function (fullConfig) {
        return __assign(__assign({}, fullConfig), { typeBindings: Object(_erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_3__["mapValues"])(fullConfig.typeBindings, function (javaType) { return javaType.formatCanonical(); }) });
    };
    JavaClassModelToCodeConverterConfigManager.prototype.convertFromSerializableObject = function (serializableConfig) {
        return __assign(__assign({}, serializableConfig), { typeBindings: Object(_erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_3__["mapValues"])(serializableConfig.typeBindings, _erdiagram_generator_oop_code_converter_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_2__["default"]) });
    };
    return JavaClassModelToCodeConverterConfigManager;
}(_erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_1__["default"]));

var javaClassModelToCodeConverterConfigManager = new JavaClassModelToCodeConverterConfigManager();
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

/* harmony import */ var _JavaClassModelToCodeConverter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./JavaClassModelToCodeConverter */ "./src/main/erdiagram/generator/oop/code-converter/java/JavaClassModelToCodeConverter.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JavaClassModelToCodeConverter", function() { return _JavaClassModelToCodeConverter__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _erdiagram_generator_oop_code_converter_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/generator/oop/code-converter/java/type/parseJavaType */ "./src/main/erdiagram/generator/oop/code-converter/java/type/parseJavaType.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseJavaType", function() { return _erdiagram_generator_oop_code_converter_java_type_parseJavaType__WEBPACK_IMPORTED_MODULE_3__["default"]; });

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
    var canonicalName = packageName ? packageName + "." + name : name;
    return {
        packageName: packageName,
        name: name,
        parameterTypes: parameterTypes,
        canonicalName: canonicalName,
        formatSimple: function (canonical) {
            if (canonical === void 0) { canonical = false; }
            var formattedParameterTypes = parameterTypes.map(function (t) { return t.formatSimple(); }).join(', ');
            return name + "<" + formattedParameterTypes + ">";
        },
        formatCanonical: function (canonical) {
            if (canonical === void 0) { canonical = false; }
            var formattedParameterTypes = parameterTypes.map(function (t) { return t.formatCanonical(); }).join(', ');
            return canonicalName + "<" + formattedParameterTypes + ">";
        }
    };
}
function createJavaArrayType(parameterType) {
    var name = parameterType.name + "[]";
    return {
        name: name,
        parameterTypes: [parameterType],
        canonicalName: name,
        formatSimple: function () {
            return parameterType.formatSimple() + "[]";
        },
        formatCanonical: function () {
            return parameterType.formatCanonical() + "[]";
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
    var canonicalName = packageName ? packageName + "." + name : name;
    return {
        packageName: packageName,
        name: name,
        canonicalName: canonicalName,
        formatSimple: function () {
            return name;
        },
        formatCanonical: function () {
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
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (undefined && undefined.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};


function parseJavaType(text) {
    try {
        return parseJavaTypeInternal(text);
    }
    catch (error) {
        throw new Error('Malformed Java type: ' + text);
    }
}
function parseJavaTypeInternal(text) {
    var trimmedText = text.trim();
    if (trimmedText.endsWith('[]')) {
        var parameterType = trimmedText.substring(0, trimmedText.length - 2);
        return Object(_erdiagram_generator_oop_code_converter_java_type_JavaParameterizedType__WEBPACK_IMPORTED_MODULE_0__["createJavaArrayType"])(parseJavaType(parameterType));
    }
    var startOfParameterTypes = trimmedText.indexOf('<');
    if (startOfParameterTypes === -1) {
        return parseJavaSimpleType(trimmedText);
    }
    var endOfParameterTypes = trimmedText.lastIndexOf('>');
    if (endOfParameterTypes === -1) {
        throw new Error('Missing end character of parameter types (>)');
    }
    if (endOfParameterTypes !== trimmedText.length - 1) {
        throw new Error('Unexpected characters found after parameter types');
    }
    var rawType = parseJavaSimpleType(trimmedText.substring(0, startOfParameterTypes));
    var parameterTypes = splitParameterTypes(trimmedText.substring(startOfParameterTypes + 1, endOfParameterTypes))
        .map(function (parameterType) { return parseJavaType(parameterType); });
    return Object(_erdiagram_generator_oop_code_converter_java_type_JavaParameterizedType__WEBPACK_IMPORTED_MODULE_0__["createJavaParameterizedType"])(rawType.name, rawType.packageName, parameterTypes);
}
function parseJavaSimpleType(text) {
    var trimmedText = text.trim();
    var lastDotIndex = trimmedText.lastIndexOf('.');
    if (lastDotIndex === -1) {
        return Object(_erdiagram_generator_oop_code_converter_java_type_JavaType__WEBPACK_IMPORTED_MODULE_1__["createJavaType"])(trimmedText);
    }
    var packageName = trimmedText.substring(0, lastDotIndex);
    var className = trimmedText.substring(lastDotIndex + 1);
    return Object(_erdiagram_generator_oop_code_converter_java_type_JavaType__WEBPACK_IMPORTED_MODULE_1__["createJavaType"])(className, packageName);
}
function splitParameterTypes(parameterTypesText) {
    var e_1, _a;
    if (!parameterTypesText.includes(',')) {
        return [parameterTypesText];
    }
    var commaIndices = [];
    var nestedLevelsCount = 0;
    __spread(parameterTypesText).forEach(function (character, index) {
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
    var splittedParameterTypes = [];
    var startIndex = 0;
    try {
        for (var commaIndices_1 = __values(commaIndices), commaIndices_1_1 = commaIndices_1.next(); !commaIndices_1_1.done; commaIndices_1_1 = commaIndices_1.next()) {
            var commaIndex = commaIndices_1_1.value;
            splittedParameterTypes.push(parameterTypesText.substring(startIndex, commaIndex));
            startIndex = commaIndex + 1;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (commaIndices_1_1 && !commaIndices_1_1.done && (_a = commaIndices_1.return)) _a.call(commaIndices_1);
        }
        finally { if (e_1) throw e_1.error; }
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
/* harmony import */ var _erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/util/string-utils */ "./src/main/erdiagram/util/string-utils.ts");
/* harmony import */ var _erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/util/indent-utils */ "./src/main/erdiagram/util/indent-utils.ts");
/* harmony import */ var _erdiagram_generator_oop_code_converter_typescript_type_TypeScriptParameterizedType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/generator/oop/code-converter/typescript/type/TypeScriptParameterizedType */ "./src/main/erdiagram/generator/oop/code-converter/typescript/type/TypeScriptParameterizedType.ts");
/* harmony import */ var _erdiagram_generator_oop_code_converter_typescript_type_TypeScriptType__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/generator/oop/code-converter/typescript/type/TypeScriptType */ "./src/main/erdiagram/generator/oop/code-converter/typescript/type/TypeScriptType.ts");
/* harmony import */ var _erdiagram_generator_oop_code_converter_typescript_config_TypeScriptClassModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/erdiagram/generator/oop/code-converter/typescript/config/TypeScriptClassModelToCodeConverterConfigManager */ "./src/main/erdiagram/generator/oop/code-converter/typescript/config/TypeScriptClassModelToCodeConverterConfigManager.ts");
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (undefined && undefined.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};





var TypeScriptClassModelToCodeConverter = /** @class */ (function () {
    function TypeScriptClassModelToCodeConverter(config) {
        this.config = _erdiagram_generator_oop_code_converter_typescript_config_TypeScriptClassModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_4__["default"].mergeWithDefaultConfig(config);
    }
    TypeScriptClassModelToCodeConverter.prototype.generateCode = function (classModel) {
        var _this = this;
        return classModel.classes
            .map(function (classDescriptor) { return _this.generateClass(classDescriptor); })
            .join('\n\n');
    };
    TypeScriptClassModelToCodeConverter.prototype.generateClass = function (classDescriptor) {
        var _this = this;
        var interfaceName = Object(_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_0__["capitalizeWord"])(classDescriptor.name);
        var fieldsLines = classDescriptor.fields
            .map(function (field) { return _this.createField(field); });
        var classOuterLines = [
            "interface " + interfaceName + " {"
        ];
        classOuterLines.push.apply(classOuterLines, __spread(Object(_erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_1__["indentLines"])(fieldsLines)));
        classOuterLines.push("}");
        return classOuterLines.join('\n');
    };
    TypeScriptClassModelToCodeConverter.prototype.createField = function (field) {
        var fieldName = field.name;
        var typescriptType = this.mapFieldTypeToTypeScriptType(field);
        var formattedTypeScriptType = typescriptType.format();
        var optionalIndicatorChar = field.nullable ? '?' : '';
        return "" + fieldName + optionalIndicatorChar + ": " + formattedTypeScriptType + ";";
    };
    TypeScriptClassModelToCodeConverter.prototype.mapFieldTypeToTypeScriptType = function (field) {
        if (field.list) {
            return this.mapListTypeToTypeScriptType(field);
        }
        else {
            return this.mapSingleTypeToTypeScriptType(field);
        }
    };
    TypeScriptClassModelToCodeConverter.prototype.mapListTypeToTypeScriptType = function (field) {
        return Object(_erdiagram_generator_oop_code_converter_typescript_type_TypeScriptParameterizedType__WEBPACK_IMPORTED_MODULE_2__["createTypeScriptArrayType"])(this.mapSingleTypeToTypeScriptType(field));
    };
    TypeScriptClassModelToCodeConverter.prototype.mapSingleTypeToTypeScriptType = function (field) {
        var entityType = field.entityType, primitiveType = field.primitiveType;
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
    };
    return TypeScriptClassModelToCodeConverter;
}());
/* harmony default export */ __webpack_exports__["default"] = (TypeScriptClassModelToCodeConverter);


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
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};




var TypeScriptClassModelToCodeConverterConfigManager = /** @class */ (function (_super) {
    __extends(TypeScriptClassModelToCodeConverterConfigManager, _super);
    function TypeScriptClassModelToCodeConverterConfigManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TypeScriptClassModelToCodeConverterConfigManager.prototype.getDefaultConfig = function () {
        var _a;
        return {
            typeBindings: (_a = {},
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].IDENTIFIER] = Object(_erdiagram_generator_oop_code_converter_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__["default"])('number'),
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].TEXT] = Object(_erdiagram_generator_oop_code_converter_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__["default"])('string'),
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].LONG] = Object(_erdiagram_generator_oop_code_converter_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__["default"])('number'),
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].INT] = Object(_erdiagram_generator_oop_code_converter_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__["default"])('number'),
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].SHORT] = Object(_erdiagram_generator_oop_code_converter_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__["default"])('number'),
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].DECIMAL] = Object(_erdiagram_generator_oop_code_converter_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__["default"])('number'),
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].BOOLEAN] = Object(_erdiagram_generator_oop_code_converter_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__["default"])('boolean'),
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].DATE] = Object(_erdiagram_generator_oop_code_converter_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__["default"])('Date'),
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].TIME] = Object(_erdiagram_generator_oop_code_converter_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__["default"])('Date'),
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].DATETIME] = Object(_erdiagram_generator_oop_code_converter_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__["default"])('Date'),
                _a[_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].BLOB] = Object(_erdiagram_generator_oop_code_converter_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__["default"])('Uint8Array'),
                _a)
        };
    };
    TypeScriptClassModelToCodeConverterConfigManager.prototype.mergeConfigs = function (fullConfig, partialConfig) {
        return __assign(__assign(__assign({}, fullConfig), partialConfig), { typeBindings: __assign(__assign({}, fullConfig.typeBindings), partialConfig === null || partialConfig === void 0 ? void 0 : partialConfig.typeBindings) });
    };
    TypeScriptClassModelToCodeConverterConfigManager.prototype.convertToSerializableObject = function (fullConfig) {
        return __assign(__assign({}, fullConfig), { typeBindings: Object(_erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_3__["mapValues"])(fullConfig.typeBindings, function (typeScriptType) { return typeScriptType.format(); }) });
    };
    TypeScriptClassModelToCodeConverterConfigManager.prototype.convertFromSerializableObject = function (serializableConfig) {
        return __assign(__assign({}, serializableConfig), { typeBindings: Object(_erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_3__["mapValues"])(serializableConfig.typeBindings, _erdiagram_generator_oop_code_converter_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_2__["default"]) });
    };
    return TypeScriptClassModelToCodeConverterConfigManager;
}(_erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_1__["default"]));

var typescriptClassModelToCodeConverterConfigManager = new TypeScriptClassModelToCodeConverterConfigManager();
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

/* harmony import */ var _TypeScriptClassModelToCodeConverter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TypeScriptClassModelToCodeConverter */ "./src/main/erdiagram/generator/oop/code-converter/typescript/TypeScriptClassModelToCodeConverter.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TypeScriptClassModelToCodeConverter", function() { return _TypeScriptClassModelToCodeConverter__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _erdiagram_generator_oop_code_converter_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/generator/oop/code-converter/typescript/type/parseTypeScriptType */ "./src/main/erdiagram/generator/oop/code-converter/typescript/type/parseTypeScriptType.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseTypeScriptType", function() { return _erdiagram_generator_oop_code_converter_typescript_type_parseTypeScriptType__WEBPACK_IMPORTED_MODULE_3__["default"]; });

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
        name: name,
        parameterTypes: parameterTypes,
        format: function () {
            var formattedParameterTypes = parameterTypes.map(function (t) { return t.format(); }).join(', ');
            return name + "<" + formattedParameterTypes + ">";
        }
    };
}
function createTypeScriptArrayType(parameterType) {
    return {
        name: 'Array',
        parameterTypes: [parameterType],
        format: function () { return parameterType.format() + "[]"; }
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
        name: name,
        format: function () { return name; }
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
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (undefined && undefined.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};


function parseTypeScriptType(text) {
    var trimmedText = text.trim();
    if (trimmedText.endsWith('[]')) {
        var parameterType = trimmedText.substring(0, trimmedText.length - 2);
        return Object(_erdiagram_generator_oop_code_converter_typescript_type_TypeScriptParameterizedType__WEBPACK_IMPORTED_MODULE_1__["createTypeScriptArrayType"])(parseTypeScriptType(parameterType));
    }
    var startOfParameterTypes = trimmedText.indexOf('<');
    if (startOfParameterTypes === -1) {
        return parseTypeScriptSimpleType(trimmedText);
    }
    var endOfParameterTypes = trimmedText.lastIndexOf('>');
    if (endOfParameterTypes === -1 || endOfParameterTypes !== trimmedText.length - 1) {
        throw new Error('Malformed TypeScript type: ' + trimmedText);
    }
    var rawType = parseTypeScriptSimpleType(trimmedText.substring(0, startOfParameterTypes));
    var parameterTypes = splitParameterTypes(trimmedText.substring(startOfParameterTypes + 1, endOfParameterTypes))
        .map(function (parameterType) { return parseTypeScriptType(parameterType); });
    return Object(_erdiagram_generator_oop_code_converter_typescript_type_TypeScriptParameterizedType__WEBPACK_IMPORTED_MODULE_1__["createTypeScriptParameterizedType"])(rawType.name, parameterTypes);
}
function parseTypeScriptSimpleType(text) {
    return Object(_erdiagram_generator_oop_code_converter_typescript_type_TypeScriptType__WEBPACK_IMPORTED_MODULE_0__["createTypeScriptType"])(text.trim());
}
function splitParameterTypes(parameterTypesText) {
    var e_1, _a;
    if (!parameterTypesText.includes(',')) {
        return [parameterTypesText];
    }
    var commaIndices = [];
    var nestedLevelsCount = 0;
    __spread(parameterTypesText).forEach(function (character, index) {
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
    var splittedParameterTypes = [];
    var startIndex = 0;
    try {
        for (var commaIndices_1 = __values(commaIndices), commaIndices_1_1 = commaIndices_1.next(); !commaIndices_1_1.done; commaIndices_1_1 = commaIndices_1.next()) {
            var commaIndex = commaIndices_1_1.value;
            splittedParameterTypes.push(parameterTypesText.substring(startIndex, commaIndex));
            startIndex = commaIndex + 1;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (commaIndices_1_1 && !commaIndices_1_1.done && (_a = commaIndices_1.return)) _a.call(commaIndices_1);
        }
        finally { if (e_1) throw e_1.error; }
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
/*! no static exports found */
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
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _model_exports__WEBPACK_IMPORTED_MODULE_1__) if(["default","JavaClassModelToCodeConverterConfigManager","javaClassModelToCodeConverterConfigManager","createJavaType","createJavaParameterizedType","createJavaArrayType","isJavaParameterizedType","parseJavaType","JavaClassModelToCodeConverter","TypeScriptClassModelToCodeConverterConfigManager","typescriptClassModelToCodeConverterConfigManager","createTypeScriptType","createTypeScriptParameterizedType","createTypeScriptArrayType","isTypeScriptParameterizedType","parseTypeScriptType","TypeScriptClassModelToCodeConverter","EntityRelationshipModelToClassCodeConverter"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _model_exports__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));




/***/ }),

/***/ "./src/main/erdiagram/generator/oop/model/ClassModelGenerator.ts":
/*!***********************************************************************!*\
  !*** ./src/main/erdiagram/generator/oop/model/ClassModelGenerator.ts ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var pluralize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pluralize */ "./node_modules/pluralize/pluralize.js");
/* harmony import */ var pluralize__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pluralize__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/util/string-utils */ "./src/main/erdiagram/util/string-utils.ts");
/* harmony import */ var _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/parser/entity-relationship-model-types */ "./src/main/erdiagram/parser/entity-relationship-model-types.ts");
/* harmony import */ var _erdiagram_generator_oop_model_config_ClassModelGeneratorConfigManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/generator/oop/model/config/ClassModelGeneratorConfigManager */ "./src/main/erdiagram/generator/oop/model/config/ClassModelGeneratorConfigManager.ts");
var __values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};




var ClassModelGenerator = /** @class */ (function () {
    function ClassModelGenerator(config) {
        this.config = _erdiagram_generator_oop_model_config_ClassModelGeneratorConfigManager__WEBPACK_IMPORTED_MODULE_3__["default"].mergeWithDefaultConfig(config);
    }
    ClassModelGenerator.prototype.generateClassModel = function (model) {
        var _this = this;
        var classes = [];
        model.entities
            .map(function (entity) { return _this.generateEntityTable(entity, model); })
            .forEach(function (sentence) { return classes.push(sentence); });
        return {
            classes: classes
        };
    };
    ClassModelGenerator.prototype.generateEntityTable = function (entity, model) {
        var e_1, _a, e_2, _b;
        var name = Object(_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_1__["capitalizeWord"])(entity.name);
        var fields = [
            this.createIdField(entity)
        ];
        try {
            for (var _c = __values(entity.properties), _d = _c.next(); !_d.done; _d = _c.next()) {
                var property = _d.value;
                fields.push(this.mapPropertyToField(property));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        try {
            for (var _e = __values(model.relationships), _f = _e.next(); !_f.done; _f = _e.next()) {
                var relationship = _f.value;
                var leftMember = relationship.leftMember, rightMember = relationship.rightMember, direction = relationship.direction;
                if (leftMember.entity === entity.name && [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__["Direction"].LEFT_TO_RIGHT, _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__["Direction"].BIDIRECTIONAL].includes(direction)) {
                    fields.push(this.mapRelationshipMemberToField(rightMember));
                }
                if (rightMember.entity === entity.name && [_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__["Direction"].RIGHT_TO_LEFT, _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__["Direction"].BIDIRECTIONAL].includes(direction)) {
                    fields.push(this.mapRelationshipMemberToField(leftMember));
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return {
            name: name,
            fields: fields
        };
    };
    ClassModelGenerator.prototype.createIdField = function (entity) {
        return {
            name: this.getIdentifierFieldName(entity),
            primitiveType: _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__["EntityPropertyType"].LONG,
            nullable: false,
            list: false
        };
    };
    ClassModelGenerator.prototype.getIdentifierFieldName = function (entity) {
        if (entity.identifierPropertyName) {
            return entity.identifierPropertyName;
        }
        var idNamingStrategy = this.config.idNamingStrategy;
        return idNamingStrategy(entity.name);
    };
    ClassModelGenerator.prototype.mapRelationshipMemberToField = function (toMember) {
        var list = toMember.cardinality === _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__["Cardinality"].MANY;
        var name = list ? pluralize__WEBPACK_IMPORTED_MODULE_0___default()(toMember.entityAlias) : toMember.entityAlias;
        return {
            name: name,
            nullable: toMember.cardinality === _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__["Cardinality"].ZERO_OR_ONE,
            entityType: toMember.entity,
            list: list
        };
    };
    ClassModelGenerator.prototype.mapPropertyToField = function (property) {
        var name = property.name, optional = property.optional, type = property.type;
        return {
            name: name,
            nullable: optional,
            primitiveType: type,
            list: false
        };
    };
    return ClassModelGenerator;
}());
/* harmony default export */ __webpack_exports__["default"] = (ClassModelGenerator);
;


/***/ }),

/***/ "./src/main/erdiagram/generator/oop/model/class-model-types.ts":
/*!*********************************************************************!*\
  !*** ./src/main/erdiagram/generator/oop/model/class-model-types.ts ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



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
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};



var ClassModelGeneratorConfigManager = /** @class */ (function (_super) {
    __extends(ClassModelGeneratorConfigManager, _super);
    function ClassModelGeneratorConfigManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClassModelGeneratorConfigManager.prototype.getDefaultConfig = function () {
        return {
            idNamingStrategy: _erdiagram_generator_common_id_naming_strategy_StandardIdNamingStrategies__WEBPACK_IMPORTED_MODULE_1__["default"].DEFAULT
        };
    };
    ClassModelGeneratorConfigManager.prototype.mergeConfigs = function (fullConfig, partialConfig) {
        return __assign(__assign({}, fullConfig), partialConfig);
    };
    ClassModelGeneratorConfigManager.prototype.convertToSerializableObject = function (fullConfig) {
        return __assign(__assign({}, fullConfig), { idNamingStrategy: Object(_erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_2__["findKeyFromValue"])(_erdiagram_generator_common_id_naming_strategy_StandardIdNamingStrategies__WEBPACK_IMPORTED_MODULE_1__["default"], fullConfig.idNamingStrategy) });
    };
    ClassModelGeneratorConfigManager.prototype.convertFromSerializableObject = function (serializableConfig) {
        return __assign(__assign({}, serializableConfig), { idNamingStrategy: Object(_erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_2__["findValueFromNullableKey"])(_erdiagram_generator_common_id_naming_strategy_StandardIdNamingStrategies__WEBPACK_IMPORTED_MODULE_1__["default"], serializableConfig.idNamingStrategy, _erdiagram_generator_common_id_naming_strategy_StandardIdNamingStrategies__WEBPACK_IMPORTED_MODULE_1__["default"].DEFAULT) });
    };
    return ClassModelGeneratorConfigManager;
}(_erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"]));

var classModelGeneratorConfigManager = new ClassModelGeneratorConfigManager();
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
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ClassModelGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ClassModelGenerator */ "./src/main/erdiagram/generator/oop/model/ClassModelGenerator.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ClassModelGenerator", function() { return _ClassModelGenerator__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _class_model_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./class-model-types */ "./src/main/erdiagram/generator/oop/model/class-model-types.ts");
/* harmony import */ var _class_model_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_class_model_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _class_model_types__WEBPACK_IMPORTED_MODULE_1__) if(["default","ClassModelGenerator"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _class_model_types__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _config_exports__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config/exports */ "./src/main/erdiagram/generator/oop/model/config/exports.ts");
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
/* harmony import */ var _erdiagram_parser_statement_statement_types_parse_functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/statement/statement-types-parse-functions */ "./src/main/erdiagram/parser/statement/statement-types-parse-functions.ts");
/* harmony import */ var _erdiagram_parser_statement_statement_type_guesser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/parser/statement/statement-type-guesser */ "./src/main/erdiagram/parser/statement/statement-type-guesser.ts");
/* harmony import */ var _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/parser/entity-relationship-model-types */ "./src/main/erdiagram/parser/entity-relationship-model-types.ts");
/* harmony import */ var _erdiagram_parser_validator_EntityRelationshipModelValidator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/parser/validator/EntityRelationshipModelValidator */ "./src/main/erdiagram/parser/validator/EntityRelationshipModelValidator.ts");
/* harmony import */ var _erdiagram_parser_config_EntityRelationshipModelParserConfigManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/erdiagram/parser/config/EntityRelationshipModelParserConfigManager */ "./src/main/erdiagram/parser/config/EntityRelationshipModelParserConfigManager.ts");
/* harmony import */ var _erdiagram_parser_errors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/erdiagram/parser/errors */ "./src/main/erdiagram/parser/errors.ts");






var EntityRelationshipModelParser = /** @class */ (function () {
    function EntityRelationshipModelParser(config) {
        this.config = _erdiagram_parser_config_EntityRelationshipModelParserConfigManager__WEBPACK_IMPORTED_MODULE_4__["default"].mergeWithDefaultConfig(config);
        this.validator = new _erdiagram_parser_validator_EntityRelationshipModelValidator__WEBPACK_IMPORTED_MODULE_3__["default"](this.config.allowUnknownEntities);
    }
    EntityRelationshipModelParser.prototype.parseModel = function (code) {
        var model = this.parseModelWithoutValidation(code);
        this.validator.validateModel(model);
        return model;
    };
    EntityRelationshipModelParser.prototype.parseModelWithoutValidation = function (code) {
        var lines = code.split('\n');
        var entities = [];
        var relationships = [];
        var parsingEntity = false;
        lines.forEach(function (line) {
            var statementType = Object(_erdiagram_parser_statement_statement_type_guesser__WEBPACK_IMPORTED_MODULE_1__["guessStatementType"])(line);
            switch (statementType) {
                case _erdiagram_parser_statement_statement_type_guesser__WEBPACK_IMPORTED_MODULE_1__["StatementType"].ENTITY_NAME:
                    entities.push({
                        name: Object(_erdiagram_parser_statement_statement_types_parse_functions__WEBPACK_IMPORTED_MODULE_0__["parseEntityNameStatement"])(line),
                        properties: []
                    });
                    parsingEntity = true;
                    break;
                case _erdiagram_parser_statement_statement_type_guesser__WEBPACK_IMPORTED_MODULE_1__["StatementType"].ENTITY_PROPERTY:
                    if (!parsingEntity) {
                        throw new _erdiagram_parser_errors__WEBPACK_IMPORTED_MODULE_5__["ERDiagramSyntaxError"]('Unexpected entity property statement');
                    }
                    var entityPropertyDescriptor = Object(_erdiagram_parser_statement_statement_types_parse_functions__WEBPACK_IMPORTED_MODULE_0__["parseEntityPropertyStatement"])(line);
                    var lastEntity = entities[entities.length - 1];
                    if (entityPropertyDescriptor.type != _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__["EntityPropertyType"].IDENTIFIER) {
                        lastEntity.properties.push(entityPropertyDescriptor);
                    }
                    else if (lastEntity.identifierPropertyName) {
                        throw new _erdiagram_parser_errors__WEBPACK_IMPORTED_MODULE_5__["ERDiagramMultipleIdentifiersError"]("Entity " + lastEntity.name + " has more than one identifier property");
                    }
                    else {
                        lastEntity.identifierPropertyName = entityPropertyDescriptor.name;
                    }
                    break;
                case _erdiagram_parser_statement_statement_type_guesser__WEBPACK_IMPORTED_MODULE_1__["StatementType"].RELATIONSHIP:
                    var relationshipDescriptor = Object(_erdiagram_parser_statement_statement_types_parse_functions__WEBPACK_IMPORTED_MODULE_0__["parseRelationshipStatement"])(line);
                    relationships.push(relationshipDescriptor);
                    parsingEntity = false;
                    break;
                case _erdiagram_parser_statement_statement_type_guesser__WEBPACK_IMPORTED_MODULE_1__["StatementType"].BLANK_LINE:
                    // Ignore
                    break;
                default:
                    throw new _erdiagram_parser_errors__WEBPACK_IMPORTED_MODULE_5__["ERDiagramSyntaxError"]("Unknown statement type (" + statementType + ") for line: " + line);
            }
        });
        return {
            entities: entities,
            relationships: relationships
        };
    };
    return EntityRelationshipModelParser;
}());
/* harmony default export */ __webpack_exports__["default"] = (EntityRelationshipModelParser);


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
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var EntityRelationshipModelParserConfigManager = /** @class */ (function (_super) {
    __extends(EntityRelationshipModelParserConfigManager, _super);
    function EntityRelationshipModelParserConfigManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EntityRelationshipModelParserConfigManager.prototype.getDefaultConfig = function () {
        return {
            allowUnknownEntities: false
        };
    };
    EntityRelationshipModelParserConfigManager.prototype.mergeConfigs = function (fullConfig, partialConfig) {
        return __assign(__assign({}, fullConfig), partialConfig);
    };
    EntityRelationshipModelParserConfigManager.prototype.convertToSerializableObject = function (fullConfig) {
        return __assign({}, fullConfig);
    };
    EntityRelationshipModelParserConfigManager.prototype.convertFromSerializableObject = function (serializableConfig) {
        return __assign({}, serializableConfig);
    };
    return EntityRelationshipModelParserConfigManager;
}(_erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_0__["default"]));

var entityRelationshipModelParserConfigManager = new EntityRelationshipModelParserConfigManager();
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
/*! exports provided: Cardinality, Direction, EntityPropertyType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cardinality", function() { return Cardinality; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Direction", function() { return Direction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntityPropertyType", function() { return EntityPropertyType; });
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


/***/ }),

/***/ "./src/main/erdiagram/parser/errors.ts":
/*!*********************************************!*\
  !*** ./src/main/erdiagram/parser/errors.ts ***!
  \*********************************************/
/*! exports provided: ERDiagramParseError, ERDiagramSyntaxError, ERDiagramUnknownTypeError, ERDiagramUnknownEntityError, ERDiagramMultipleIdentifiersError, ERDiagramDuplicatedPropertyNameError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ERDiagramParseError", function() { return ERDiagramParseError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ERDiagramSyntaxError", function() { return ERDiagramSyntaxError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ERDiagramUnknownTypeError", function() { return ERDiagramUnknownTypeError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ERDiagramUnknownEntityError", function() { return ERDiagramUnknownEntityError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ERDiagramMultipleIdentifiersError", function() { return ERDiagramMultipleIdentifiersError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ERDiagramDuplicatedPropertyNameError", function() { return ERDiagramDuplicatedPropertyNameError; });
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ERDiagramParseError = /** @class */ (function (_super) {
    __extends(ERDiagramParseError, _super);
    function ERDiagramParseError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ERDiagramParseError;
}(Error));

var ERDiagramSyntaxError = /** @class */ (function (_super) {
    __extends(ERDiagramSyntaxError, _super);
    function ERDiagramSyntaxError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ERDiagramSyntaxError;
}(ERDiagramParseError));

var ERDiagramUnknownTypeError = /** @class */ (function (_super) {
    __extends(ERDiagramUnknownTypeError, _super);
    function ERDiagramUnknownTypeError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ERDiagramUnknownTypeError;
}(ERDiagramParseError));

var ERDiagramUnknownEntityError = /** @class */ (function (_super) {
    __extends(ERDiagramUnknownEntityError, _super);
    function ERDiagramUnknownEntityError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ERDiagramUnknownEntityError;
}(ERDiagramParseError));

var ERDiagramMultipleIdentifiersError = /** @class */ (function (_super) {
    __extends(ERDiagramMultipleIdentifiersError, _super);
    function ERDiagramMultipleIdentifiersError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ERDiagramMultipleIdentifiersError;
}(ERDiagramParseError));

var ERDiagramDuplicatedPropertyNameError = /** @class */ (function (_super) {
    __extends(ERDiagramDuplicatedPropertyNameError, _super);
    function ERDiagramDuplicatedPropertyNameError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ERDiagramDuplicatedPropertyNameError;
}(ERDiagramParseError));



/***/ }),

/***/ "./src/main/erdiagram/parser/exports.ts":
/*!**********************************************!*\
  !*** ./src/main/erdiagram/parser/exports.ts ***!
  \**********************************************/
/*! exports provided: EntityRelationshipModelParserConfigManager, entityRelationshipModelParserConfigManager, Cardinality, Direction, EntityPropertyType, ERDiagramParseError, ERDiagramSyntaxError, ERDiagramUnknownTypeError, ERDiagramUnknownEntityError, ERDiagramMultipleIdentifiersError, ERDiagramDuplicatedPropertyNameError, EntityRelationshipModelParser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EntityRelationshipModelParser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EntityRelationshipModelParser */ "./src/main/erdiagram/parser/EntityRelationshipModelParser.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EntityRelationshipModelParser", function() { return _EntityRelationshipModelParser__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _config_exports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config/exports */ "./src/main/erdiagram/parser/config/exports.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EntityRelationshipModelParserConfigManager", function() { return _config_exports__WEBPACK_IMPORTED_MODULE_1__["EntityRelationshipModelParserConfigManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "entityRelationshipModelParserConfigManager", function() { return _config_exports__WEBPACK_IMPORTED_MODULE_1__["entityRelationshipModelParserConfigManager"]; });

/* harmony import */ var _entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./entity-relationship-model-types */ "./src/main/erdiagram/parser/entity-relationship-model-types.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Cardinality", function() { return _entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__["Cardinality"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Direction", function() { return _entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__["Direction"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EntityPropertyType", function() { return _entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__["EntityPropertyType"]; });

/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./errors */ "./src/main/erdiagram/parser/errors.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERDiagramParseError", function() { return _errors__WEBPACK_IMPORTED_MODULE_3__["ERDiagramParseError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERDiagramSyntaxError", function() { return _errors__WEBPACK_IMPORTED_MODULE_3__["ERDiagramSyntaxError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERDiagramUnknownTypeError", function() { return _errors__WEBPACK_IMPORTED_MODULE_3__["ERDiagramUnknownTypeError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERDiagramUnknownEntityError", function() { return _errors__WEBPACK_IMPORTED_MODULE_3__["ERDiagramUnknownEntityError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERDiagramMultipleIdentifiersError", function() { return _errors__WEBPACK_IMPORTED_MODULE_3__["ERDiagramMultipleIdentifiersError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERDiagramDuplicatedPropertyNameError", function() { return _errors__WEBPACK_IMPORTED_MODULE_3__["ERDiagramDuplicatedPropertyNameError"]; });








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
/* harmony import */ var _erdiagram_parser_errors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/parser/errors */ "./src/main/erdiagram/parser/errors.ts");
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};




function parseEntityNameStatement(line) {
    var result = _erdiagram_parser_statement_statement_types_regexes__WEBPACK_IMPORTED_MODULE_1__["ENTITY_NAME_LINE_REGEX"].exec(line);
    if (result == null) {
        throw new _erdiagram_parser_errors__WEBPACK_IMPORTED_MODULE_3__["ERDiagramSyntaxError"]('Syntax error');
    }
    var _a = __read(result, 2), fullMatch = _a[0], entityName = _a[1];
    return Object(_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_0__["capitalizeWord"])(entityName);
}
function parseEntityPropertyStatement(line) {
    var result = _erdiagram_parser_statement_statement_types_regexes__WEBPACK_IMPORTED_MODULE_1__["ENTITY_PROPERTY_LINE_REGEX"].exec(line);
    if (result == null) {
        throw new _erdiagram_parser_errors__WEBPACK_IMPORTED_MODULE_3__["ERDiagramSyntaxError"]('Syntax error');
    }
    var _a = __read(result, 5), fullMatch = _a[0], name = _a[1], modifiers = _a[2], type = _a[3], length = _a[4];
    var mappedType = type.toLowerCase();
    if (!Object.values(_erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_2__["EntityPropertyType"]).includes(mappedType)) {
        throw new _erdiagram_parser_errors__WEBPACK_IMPORTED_MODULE_3__["ERDiagramUnknownTypeError"]('Unknown type: ' + type);
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
        .map(function (lengthNumber) { return parseInt(lengthNumber.trim(), 10); });
}
function parseRelationshipStatement(line) {
    var result = _erdiagram_parser_statement_statement_types_regexes__WEBPACK_IMPORTED_MODULE_1__["RELATIONSHIP_LINE_REGEX"].exec(line);
    if (result == null) {
        throw new _erdiagram_parser_errors__WEBPACK_IMPORTED_MODULE_3__["ERDiagramSyntaxError"]('Syntax error');
    }
    var _a = __read(result, 9), fullMatch = _a[0], leftEntity = _a[1], _b = _a[2], leftEntityAlias = _b === void 0 ? leftEntity : _b, leftCardinalityCharacter = _a[3], direction = _a[4], rightCardinalityCharacter = _a[5], rightEntity = _a[6], _c = _a[7], rightEntityAlias = _c === void 0 ? rightEntity : _c, relationShipName = _a[8];
    return {
        relationShipName: relationShipName ? Object(_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_0__["capitalizeWord"])(relationShipName) : undefined,
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

var IDENTIFIER_REGEX = /[a-zA-Z_][a-zA-Z_0-9]*/;
var OPTIONAL_TRAILING_SPACES_AND_COMMENT = /\s*(#.*)?$/;
// Entity name
var ENTITY_NAME_LINE_REGEX = new RegExp("^(" + IDENTIFIER_REGEX.source + ")" + OPTIONAL_TRAILING_SPACES_AND_COMMENT.source);
// Entity property
var PROPERTY_NAME_REGEX = new RegExp("(" + IDENTIFIER_REGEX.source + ")");
var PROPERTY_MODIFIERS_REGEX = new RegExp("([?!+]*)");
var PROPERTY_TYPE_NAME_REGEX = new RegExp("(" + IDENTIFIER_REGEX.source + ")");
var PROPERTY_TYPE_LENGTH_REGEX = new RegExp("(?:\\((\\s*\\d+\\s*(?:,\\s*\\d+\\s*)*)\\))?");
var ENTITY_PROPERTY_REGEX = Object(_erdiagram_util_regex_utils__WEBPACK_IMPORTED_MODULE_0__["joinRegExps"])(PROPERTY_NAME_REGEX, PROPERTY_MODIFIERS_REGEX, /\s+/, PROPERTY_TYPE_NAME_REGEX, PROPERTY_TYPE_LENGTH_REGEX);
var ENTITY_PROPERTY_LINE_REGEX = new RegExp("^\\s+" + ENTITY_PROPERTY_REGEX.source + OPTIONAL_TRAILING_SPACES_AND_COMMENT.source);
// Relationship
var RELATIONSHIP_DIRECTION_REGEX = /(<-|->|<->)/;
var RELATIONSHIP_CARDINALITY_REGEX = /([?1*])?/;
var DIRECTION_AND_CARDINALITY_REGEX = Object(_erdiagram_util_regex_utils__WEBPACK_IMPORTED_MODULE_0__["joinRegExps"])(RELATIONSHIP_CARDINALITY_REGEX, RELATIONSHIP_DIRECTION_REGEX, RELATIONSHIP_CARDINALITY_REGEX);
var ENTITY_AND_ALIAS_REGEX = new RegExp("(" + IDENTIFIER_REGEX.source + ")(?:\\s+(" + IDENTIFIER_REGEX.source + "))?");
var RELATIONSHIP_LINE_REGEX = new RegExp("^" + ENTITY_AND_ALIAS_REGEX.source + "\\s*?" + DIRECTION_AND_CARDINALITY_REGEX.source + "\\s*?" + ENTITY_AND_ALIAS_REGEX.source + "(?:\\s+\\(\\s*(" + IDENTIFIER_REGEX.source + ")\\s*\\))?" + OPTIONAL_TRAILING_SPACES_AND_COMMENT.source);


/***/ }),

/***/ "./src/main/erdiagram/parser/validator/EntityRelationshipModelValidator.ts":
/*!*********************************************************************************!*\
  !*** ./src/main/erdiagram/parser/validator/EntityRelationshipModelValidator.ts ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _erdiagram_parser_errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/errors */ "./src/main/erdiagram/parser/errors.ts");

var EntityRelationshipModelValidator = /** @class */ (function () {
    function EntityRelationshipModelValidator(allowUnknownEntities) {
        this.allowUnknownEntities = allowUnknownEntities;
    }
    EntityRelationshipModelValidator.prototype.validateModel = function (model) {
        if (!this.allowUnknownEntities) {
            this.validateRelationshipsHaveNoUnknownEntities(model);
        }
        this.validateNonRepeatedPropertyNames(model);
    };
    EntityRelationshipModelValidator.prototype.validateRelationshipsHaveNoUnknownEntities = function (model) {
        var entityNames = model.entities.map(function (e) { return e.name; });
        model.relationships.forEach(function (relationship) {
            if (!entityNames.includes(relationship.leftMember.entity)) {
                throw new _erdiagram_parser_errors__WEBPACK_IMPORTED_MODULE_0__["ERDiagramUnknownEntityError"]("Uknown entity in relationship's left side: " + relationship.leftMember.entity);
            }
            if (!entityNames.includes(relationship.rightMember.entity)) {
                throw new _erdiagram_parser_errors__WEBPACK_IMPORTED_MODULE_0__["ERDiagramUnknownEntityError"]("Uknown entity in relationship's right side: " + relationship.rightMember.entity);
            }
        });
    };
    EntityRelationshipModelValidator.prototype.validateNonRepeatedPropertyNames = function (model) {
        model.entities.forEach(function (entity) {
            var entityPropertyNames = new Set();
            if (entity.identifierPropertyName) {
                entityPropertyNames.add(entity.identifierPropertyName);
            }
            entity.properties.forEach(function (property) {
                var propertyName = property.name;
                if (entityPropertyNames.has(propertyName)) {
                    throw new _erdiagram_parser_errors__WEBPACK_IMPORTED_MODULE_0__["ERDiagramDuplicatedPropertyNameError"]("Repeated property " + propertyName + " in entity " + entity.name);
                }
                entityPropertyNames.add(propertyName);
            });
        });
    };
    return EntityRelationshipModelValidator;
}());
/* harmony default export */ __webpack_exports__["default"] = (EntityRelationshipModelValidator);


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
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (undefined && undefined.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
function removeDuplicates(array) {
    return __spread(new Set(array));
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
var DEFAULT_INDENT = '    ';
function indentLines(lines, indent) {
    return lines.map(function (line) { return indentLine(line, indent); });
}
function indentLine(line, indent) {
    if (indent === void 0) { indent = DEFAULT_INDENT; }
    if (line.trim().length === 0) {
        return line;
    }
    else {
        return generateIndentText(indent) + line;
    }
}
function generateIndentText(indent) {
    if (typeof indent !== 'number') {
        return indent;
    }
    return ''.padEnd(indent, ' ');
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
    var map = new Map();
    objects.forEach(function (object) {
        var key = keyMapper(object);
        var value = valueMapper(object);
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
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
function mapValues(record, mapper) {
    return Object.fromEntries(Object.entries(record).map(function (_a) {
        var _b = __read(_a, 2), key = _b[0], value = _b[1];
        return [key, mapper(value)];
    }));
}
function findKeyFromValue(record, value) {
    var entry = Object.entries(record).find(function (entry) { return value === entry[1]; });
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
function joinRegExps() {
    var regexes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        regexes[_i] = arguments[_i];
    }
    var source = regexes
        .map(function (e) {
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
/*! exports provided: capitalizeWord, uncapitalizeWord */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "capitalizeWord", function() { return capitalizeWord; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uncapitalizeWord", function() { return uncapitalizeWord; });
function capitalizeWord(text) {
    return text[0].toUpperCase() + text.substring(1);
}
function uncapitalizeWord(text) {
    return text[0].toLowerCase() + text.substring(1);
}


/***/ }),

/***/ "./src/main/module-entry.ts":
/*!**********************************!*\
  !*** ./src/main/module-entry.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./erdiagram/exports */ "./src/main/erdiagram/exports.ts");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));



/***/ })

/******/ });
});
//# sourceMappingURL=erdiagram.esm.js.map