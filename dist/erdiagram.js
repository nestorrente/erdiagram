/*!
 * Entity-Relationship Diagram Code Generator v0.1.0-alpha.2
 * https://github.com/nestorrente/erdiagram
 * 
 * Released under the MIT License.
 * 
 * Build date: 2021-03-04T22:55:52.800Z
 */
var ERDiagram =
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main/standalone-entry.js");
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

/***/ "./src/main/erdiagram/generator/common/case-format/AbstractCamelCaseFormat.ts":
/*!************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/common/case-format/AbstractCamelCaseFormat.ts ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AbstractCamelCaseFormat; });
const CAMEL_CASE_WORD_BOUNDARIES_REGEX = /((?<=[^A-Z])(?=[A-Z])|(?=[A-Z][a-z]))/;
class AbstractCamelCaseFormat {
    splitWords(text) {
        return text.split(CAMEL_CASE_WORD_BOUNDARIES_REGEX)
            .filter(chunk => chunk.length > 0);
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
class AbstractUnderscoreCaseFormat {
    splitWords(text) {
        return text.split('_');
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
        return words
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

class CaseInsensitiveUnderscoreCaseFormat extends _erdiagram_generator_common_case_format_AbstractUnderscoreCaseFormat__WEBPACK_IMPORTED_MODULE_0__["default"] {
    joinWords(words) {
        return words.join('_');
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
        if (words.length === 0) {
            return '';
        }
        const [firstWord, ...otherWords] = words;
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

class LowerUnderscoreCaseFormat extends _erdiagram_generator_common_case_format_AbstractUnderscoreCaseFormat__WEBPACK_IMPORTED_MODULE_0__["default"] {
    joinWords(words) {
        return words
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
        return words
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

class UpperUnderscoreCaseFormat extends _erdiagram_generator_common_case_format_AbstractUnderscoreCaseFormat__WEBPACK_IMPORTED_MODULE_0__["default"] {
    joinWords(words) {
        return words
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
    generateCode(entityRelationshipModel) {
        const databaseModel = this.databaseModelGenerator.generateDatabaseModel(entityRelationshipModel);
        return this.databaseModelToCodeConverter.generateCode(databaseModel);
    }
}


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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MySqlDatabaseModelToCodeConverter; });
/* harmony import */ var _erdiagram_generator_database_code_converter_mysql_column_MySqlColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/generator/database/code-converter/mysql/column/MySqlColumnCodeGenerator */ "./src/main/erdiagram/generator/database/code-converter/mysql/column/MySqlColumnCodeGenerator.ts");
/* harmony import */ var _erdiagram_generator_database_code_converter_mysql_type_MySqlTypeResolver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/generator/database/code-converter/mysql/type/MySqlTypeResolver */ "./src/main/erdiagram/generator/database/code-converter/mysql/type/MySqlTypeResolver.ts");
/* harmony import */ var _erdiagram_generator_database_code_converter_mysql_column_MySqlIdColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/generator/database/code-converter/mysql/column/MySqlIdColumnCodeGenerator */ "./src/main/erdiagram/generator/database/code-converter/mysql/column/MySqlIdColumnCodeGenerator.ts");
/* harmony import */ var _erdiagram_generator_database_code_converter_mysql_column_MySqlForeignColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/generator/database/code-converter/mysql/column/MySqlForeignColumnCodeGenerator */ "./src/main/erdiagram/generator/database/code-converter/mysql/column/MySqlForeignColumnCodeGenerator.ts");
/* harmony import */ var _erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/erdiagram/util/indent-utils */ "./src/main/erdiagram/util/indent-utils.ts");
/* harmony import */ var _erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/erdiagram/generator/common/case-format/StandardCaseFormats */ "./src/main/erdiagram/generator/common/case-format/StandardCaseFormats.ts");
/* harmony import */ var _erdiagram_generator_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/erdiagram/generator/common/case-format/CaseConverter */ "./src/main/erdiagram/generator/common/case-format/CaseConverter.ts");
/* harmony import */ var _erdiagram_generator_database_code_converter_mysql_config_MysqlDatabaseModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/erdiagram/generator/database/code-converter/mysql/config/MysqlDatabaseModelToCodeConverterConfigManager */ "./src/main/erdiagram/generator/database/code-converter/mysql/config/MysqlDatabaseModelToCodeConverterConfigManager.ts");








class MySqlDatabaseModelToCodeConverter {
    constructor(config) {
        this.config = _erdiagram_generator_database_code_converter_mysql_config_MysqlDatabaseModelToCodeConverterConfigManager__WEBPACK_IMPORTED_MODULE_7__["default"].mergeWithDefaultConfig(config);
        this.tableNameCaseConverter = new _erdiagram_generator_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_6__["default"](_erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_5__["default"].LOWER_CAMEL, this.config.tableNameCaseFormat);
        const columnNameCaseConverter = new _erdiagram_generator_common_case_format_CaseConverter__WEBPACK_IMPORTED_MODULE_6__["default"](_erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_5__["default"].LOWER_CAMEL, this.config.columnNameCaseFormat);
        this.columnCodeGenerator = new _erdiagram_generator_database_code_converter_mysql_column_MySqlColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_0__["default"](new _erdiagram_generator_database_code_converter_mysql_type_MySqlTypeResolver__WEBPACK_IMPORTED_MODULE_1__["default"](this.config.typeBindings), columnNameCaseConverter);
        this.idColumnCodeGenerator = new _erdiagram_generator_database_code_converter_mysql_column_MySqlIdColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_2__["default"](this.columnCodeGenerator, columnNameCaseConverter);
        this.foreignColumnCodeGenerator = new _erdiagram_generator_database_code_converter_mysql_column_MySqlForeignColumnCodeGenerator__WEBPACK_IMPORTED_MODULE_3__["default"](this.columnCodeGenerator, this.tableNameCaseConverter, columnNameCaseConverter);
    }
    generateCode(databaseModel) {
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
        return allCreateTableStatements.join('\n\n')
            + '\n\n'
            + allAlterTableStatements.join('\n\n');
    }
    // FIXME split this method
    generateTableCode(table) {
        const columnLines = [];
        const fkConstraintLines = [];
        const otherConstraintLines = [];
        const outputTableName = this.tableNameCaseConverter.convertCase(table.name);
        const { columnLine: idColumnLine, pkConstraintLine } = this.idColumnCodeGenerator.generateIdColumnCode(outputTableName, table.identifierColumnName);
        columnLines.push(idColumnLine);
        otherConstraintLines.push(pkConstraintLine);
        this.processColumns(outputTableName, table.columns, columnLines, otherConstraintLines);
        this.processReferences(outputTableName, table.references, columnLines, fkConstraintLines, otherConstraintLines);
        const createTableInnerLines = [
            ...columnLines,
            ...otherConstraintLines
        ];
        const createTableLines = [
            `CREATE TABLE \`${outputTableName}\` (`,
            Object(_erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_4__["indentLines"])(createTableInnerLines).join(',\n'),
            ');'
        ];
        const createTableStatement = createTableLines.join('\n');
        const alterTableStatements = fkConstraintLines.map(fkConstraintLine => {
            return `ALTER TABLE \`${outputTableName}\` ADD ${fkConstraintLine};`;
        }).join('\n');
        return {
            createTableStatement,
            alterTableStatements
        };
    }
    processReferences(outputTableName, references, columnLines, fkConstraintLines, otherConstraintLines) {
        for (const reference of references) {
            const { columnLine, uniqueConstraintLine, fkConstraintLine } = this.foreignColumnCodeGenerator.generateForeignColumnCode(outputTableName, reference);
            columnLines.push(columnLine);
            fkConstraintLines.push(fkConstraintLine);
            if (uniqueConstraintLine) {
                otherConstraintLines.push(uniqueConstraintLine);
            }
        }
    }
    processColumns(outputTableName, columns, columnLines, otherConstraintLines) {
        for (const column of columns) {
            const { columnLine, uniqueConstraintLine } = this.columnCodeGenerator.generateColumnCode(outputTableName, column);
            columnLines.push(columnLine);
            if (uniqueConstraintLine) {
                otherConstraintLines.push(uniqueConstraintLine);
            }
        }
    }
}


/***/ }),

/***/ "./src/main/erdiagram/generator/database/code-converter/mysql/column/MySqlColumnCodeGenerator.ts":
/*!*******************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/mysql/column/MySqlColumnCodeGenerator.ts ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MySqlColumnCodeGenerator; });
class MySqlColumnCodeGenerator {
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
            this.generateMySqlTypeDeclaration(type, length)
        ];
        if (notNull) {
            lineParts.push('NOT NULL');
        }
        if (autoincremental) {
            lineParts.push('AUTO_INCREMENT');
        }
        return lineParts.join(' ');
    }
    generateMySqlTypeDeclaration(type, length) {
        const mysqlType = this.typeResolver.resolveMySqlType(type);
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

/***/ "./src/main/erdiagram/generator/database/code-converter/mysql/column/MySqlForeignColumnCodeGenerator.ts":
/*!**************************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/mysql/column/MySqlForeignColumnCodeGenerator.ts ***!
  \**************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MySqlForeignColumnCodeGenerator; });
/* harmony import */ var _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/entity-relationship-model-types */ "./src/main/erdiagram/parser/entity-relationship-model-types.ts");

class MySqlForeignColumnCodeGenerator {
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

/***/ "./src/main/erdiagram/generator/database/code-converter/mysql/column/MySqlIdColumnCodeGenerator.ts":
/*!*********************************************************************************************************!*\
  !*** ./src/main/erdiagram/generator/database/code-converter/mysql/column/MySqlIdColumnCodeGenerator.ts ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MySqlIdColumnCodeGenerator; });
/* harmony import */ var _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/entity-relationship-model-types */ "./src/main/erdiagram/parser/entity-relationship-model-types.ts");

class MySqlIdColumnCodeGenerator {
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
/*! exports provided: MySqlDatabaseModelToCodeConverterConfigManager, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MySqlDatabaseModelToCodeConverterConfigManager", function() { return MySqlDatabaseModelToCodeConverterConfigManager; });
/* harmony import */ var _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erdiagram/parser/entity-relationship-model-types */ "./src/main/erdiagram/parser/entity-relationship-model-types.ts");
/* harmony import */ var _erdiagram_generator_common_case_format_StandardCaseFormats__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/generator/common/case-format/StandardCaseFormats */ "./src/main/erdiagram/generator/common/case-format/StandardCaseFormats.ts");
/* harmony import */ var _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/common/config/AbstractComponentConfigManager */ "./src/main/erdiagram/common/config/AbstractComponentConfigManager.ts");
/* harmony import */ var _erdiagram_util_record_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/util/record-utils */ "./src/main/erdiagram/util/record-utils.ts");




class MySqlDatabaseModelToCodeConverterConfigManager extends _erdiagram_common_config_AbstractComponentConfigManager__WEBPACK_IMPORTED_MODULE_2__["default"] {
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
const mysqlDatabaseModelToCodeConverterConfigManager = new MySqlDatabaseModelToCodeConverterConfigManager();
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MySqlTypeResolver; });
class MySqlTypeResolver {
    constructor(typeBindings) {
        this.typeBindings = typeBindings;
    }
    resolveMySqlType(type) {
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
    generateCode(databaseModel) {
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
        return allCreateTableStatements.join('\n\n')
            + '\n\n'
            + allAlterTableStatements.join('\n\n');
    }
    // FIXME split this method
    generateTableCode(table) {
        const columnLines = [];
        const createSequenceLines = [];
        const fkConstraintLines = [];
        const otherConstraintLines = [];
        const outputTableName = this.tableNameCaseConverter.convertCase(table.name);
        const { createSequenceLine: idCreateSequenceLine, columnLine: idColumnLine, pkConstraintLine } = this.idColumnCodeGenerator.generateIdColumnCode(outputTableName, table.identifierColumnName);
        createSequenceLines.push(idCreateSequenceLine);
        columnLines.push(idColumnLine);
        otherConstraintLines.push(pkConstraintLine);
        this.processColumns(outputTableName, table.columns, columnLines, createSequenceLines, otherConstraintLines);
        this.processReferences(outputTableName, table.references, columnLines, fkConstraintLines, otherConstraintLines);
        const createTableInnerLines = [
            ...columnLines,
            ...otherConstraintLines
        ];
        const createTableLines = [
            ...createSequenceLines,
            `CREATE TABLE "${outputTableName}" (`,
            Object(_erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_4__["indentLines"])(createTableInnerLines).join(',\n'),
            ');'
        ];
        const createTableStatement = createTableLines.join('\n');
        const alterTableStatements = fkConstraintLines.map(fkConstraintLine => {
            return `ALTER TABLE "${outputTableName}" ADD ${fkConstraintLine};`;
        }).join('\n');
        return {
            createTableStatement,
            alterTableStatements
        };
    }
    processReferences(outputTableName, references, columnLines, fkConstraintLines, otherConstraintLines) {
        for (const reference of references) {
            const { columnLine, uniqueConstraintLine, fkConstraintLine } = this.foreignColumnCodeGenerator.generateForeignColumnCode(outputTableName, reference);
            columnLines.push(columnLine);
            fkConstraintLines.push(fkConstraintLine);
            if (uniqueConstraintLine) {
                otherConstraintLines.push(uniqueConstraintLine);
            }
        }
    }
    processColumns(outputTableName, columns, columnLines, createSequenceLines, otherConstraintLines) {
        for (const column of columns) {
            const { columnLine, createSequenceLine, uniqueConstraintLine } = this.columnCodeGenerator.generateColumnCode(outputTableName, column);
            columnLines.push(columnLine);
            if (createSequenceLine) {
                createSequenceLines.push(createSequenceLine);
            }
            if (uniqueConstraintLine) {
                otherConstraintLines.push(uniqueConstraintLine);
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
    // FIXME refactor this methods - it receives too much arguments
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
    generateCode(databaseModel) {
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
        return allCreateTableStatements.join('\n\n')
            + '\n\n'
            + allAlterTableStatements.join('\n\n');
    }
    // FIXME split this method
    generateTableCode(table) {
        const columnLines = [];
        const createSequenceLines = [];
        const fkConstraintLines = [];
        const otherConstraintLines = [];
        const outputTableName = this.tableNameCaseConverter.convertCase(table.name);
        const { columnLine: idColumnLine, pkConstraintLine } = this.idColumnCodeGenerator.generateIdColumnCode(outputTableName, table.identifierColumnName);
        columnLines.push(idColumnLine);
        otherConstraintLines.push(pkConstraintLine);
        this.processColumns(outputTableName, table.columns, columnLines, createSequenceLines, otherConstraintLines);
        this.processReferences(outputTableName, table.references, columnLines, fkConstraintLines, otherConstraintLines);
        const createTableInnerLines = [
            ...columnLines,
            ...otherConstraintLines
        ];
        const createTableLines = [
            ...createSequenceLines,
            `CREATE TABLE "${outputTableName}" (`,
            Object(_erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_4__["indentLines"])(createTableInnerLines).join(',\n'),
            ');'
        ];
        const createTableStatement = createTableLines.join('\n');
        const alterTableStatements = fkConstraintLines.map(fkConstraintLine => {
            return `ALTER TABLE "${outputTableName}" ADD ${fkConstraintLine};`;
        }).join('\n');
        return {
            createTableStatement,
            alterTableStatements
        };
    }
    processReferences(outputTableName, references, columnLines, fkConstraintLines, otherConstraintLines) {
        for (const reference of references) {
            const { columnLine, uniqueConstraintLine, fkConstraintLine } = this.foreignColumnCodeGenerator.generateForeignColumnCode(outputTableName, reference);
            columnLines.push(columnLine);
            fkConstraintLines.push(fkConstraintLine);
            if (uniqueConstraintLine) {
                otherConstraintLines.push(uniqueConstraintLine);
            }
        }
    }
    processColumns(outputTableName, columns, columnLines, createSequenceLines, otherConstraintLines) {
        for (const column of columns) {
            const { columnLine, createSequenceLine, uniqueConstraintLine } = this.columnCodeGenerator.generateColumnCode(outputTableName, column);
            columnLines.push(columnLine);
            if (createSequenceLine) {
                createSequenceLines.push(createSequenceLine);
            }
            if (uniqueConstraintLine) {
                otherConstraintLines.push(uniqueConstraintLine);
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SqlServerTypeResolver; });
class SqlServerTypeResolver {
    constructor(typeBindings) {
        this.typeBindings = typeBindings;
    }
    resolveSqlServerType(type) {
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DatabaseModelGenerator; });
/* harmony import */ var pluralize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pluralize */ "./node_modules/pluralize/pluralize.js");
/* harmony import */ var pluralize__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pluralize__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _erdiagram_parser_entity_relationship_model_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erdiagram/parser/entity-relationship-model-types */ "./src/main/erdiagram/parser/entity-relationship-model-types.ts");
/* harmony import */ var _erdiagram_generator_database_model_config_DatabaseModelGeneratorConfigManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/erdiagram/generator/database/model/config/DatabaseModelGeneratorConfigManager */ "./src/main/erdiagram/generator/database/model/config/DatabaseModelGeneratorConfigManager.ts");
/* harmony import */ var _erdiagram_util_map_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/erdiagram/util/map-utils */ "./src/main/erdiagram/util/map-utils.ts");




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
        const { relationShipName, leftMember, rightMember } = relationship;
        if (relationShipName) {
            return relationShipName;
        }
        return this.pluralizeEntityNameIfApplies(leftMember.entity)
            + this.pluralizeEntityNameIfApplies(rightMember.entity);
    }
    getRelationshipTableIdentifierColumnName(relationship, entityIdentifiersMap) {
        const { relationShipName, leftMember, rightMember } = relationship;
        if (relationShipName) {
            return this.getIdentifierColumnName(relationShipName, entityIdentifiersMap);
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
        if (this.config.usePluralTableNames) {
            return pluralize__WEBPACK_IMPORTED_MODULE_0___default()(entityName);
        }
        else {
            return entityName;
        }
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EntityRelationshipModelToClassCodeConverter; });
class EntityRelationshipModelToClassCodeConverter {
    constructor(classModelGenerator, classModelToCodeConverter) {
        this.classModelGenerator = classModelGenerator;
        this.classModelToCodeConverter = classModelToCodeConverter;
    }
    generateCode(entityRelationshipModel) {
        const classModel = this.classModelGenerator.generateClassModel(entityRelationshipModel);
        return this.classModelToCodeConverter.generateCode(classModel);
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
    generateCode(classModel) {
        return classModel.classes
            .map(classDescriptor => this.generateClass(classDescriptor))
            .join('\n\n');
    }
    generateClass(classDescriptor) {
        const className = Object(_erdiagram_util_string_utils__WEBPACK_IMPORTED_MODULE_0__["capitalizeWord"])(classDescriptor.name);
        const fieldsTypes = [];
        const fieldsLines = [];
        const methodsLines = [];
        for (const field of classDescriptor.fields) {
            const { fieldType, fieldLines, getterLines, setterLines } = this.createField(field);
            fieldsTypes.push(fieldType);
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
        const importLines = this.createImportStatements(fieldsTypes);
        if (this.config.useSpringNullabilityAnnotations) {
            // FIXME gestionar estos imports de otra forma
            // Quizás hacer que createField() devuelva qué tipos utiliza, y no solo el tipo del campo
            const importNonNullAnnotation = classDescriptor.fields.some(f => !f.nullable);
            if (importNonNullAnnotation) {
                importLines.push('import org.springframework.lang.NonNull;');
            }
            const importNullableAnnotation = classDescriptor.fields.some(f => f.nullable);
            if (importNullableAnnotation) {
                importLines.push('import org.springframework.lang.Nullable;');
            }
        }
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
        // TODO use length for validation annotations?
        if (this.config.useSpringNullabilityAnnotations) {
            if (field.nullable) {
                fieldLines.push('@Nullable');
            }
            else {
                fieldLines.push('@NonNull');
            }
        }
        const javaType = this.mapFieldTypeToJavaType(field);
        const formattedJavaType = javaType.formatSimple();
        fieldLines.push(`private ${formattedJavaType} ${fieldName};`);
        const getterLines = [
            `public ${formattedJavaType} get${capitalizedFieldName}() {`,
            Object(_erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_1__["indentLine"])(`return ${fieldName};`),
            '}',
        ];
        const setterLines = [
            `public ${formattedJavaType} set${capitalizedFieldName}(${formattedJavaType} ${fieldName}) {`,
            Object(_erdiagram_util_indent_utils__WEBPACK_IMPORTED_MODULE_1__["indentLine"])(`this.${fieldName} = ${fieldName};`),
            '}',
        ];
        return {
            fieldType: javaType,
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
        if (!this.config.typeBindings.hasOwnProperty(primitiveType)) {
            throw new Error('Unsupported type: ' + primitiveType);
        }
        return this.config.typeBindings[primitiveType];
    }
    createImportStatements(javaTypes) {
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
    if (trimmedText.endsWith('[]')) {
        const parameterType = trimmedText.substring(0, trimmedText.length - 2);
        return Object(_erdiagram_generator_oop_code_converter_java_type_JavaParameterizedType__WEBPACK_IMPORTED_MODULE_0__["createJavaArrayType"])(parseJavaType(parameterType));
    }
    const startOfParameterTypes = trimmedText.indexOf('<');
    if (startOfParameterTypes === -1) {
        return parseJavaSimpleType(trimmedText);
    }
    const endOfParameterTypes = trimmedText.lastIndexOf('>');
    if (endOfParameterTypes === -1) {
        throw new Error('Missing end character of parameter types (>)');
    }
    if (endOfParameterTypes !== trimmedText.length - 1) {
        throw new Error('Unexpected characters found after parameter types');
    }
    const rawType = parseJavaSimpleType(trimmedText.substring(0, startOfParameterTypes));
    const parameterTypes = splitParameterTypes(trimmedText.substring(startOfParameterTypes + 1, endOfParameterTypes))
        .map(parameterType => parseJavaType(parameterType));
    return Object(_erdiagram_generator_oop_code_converter_java_type_JavaParameterizedType__WEBPACK_IMPORTED_MODULE_0__["createJavaParameterizedType"])(rawType.name, rawType.packageName, parameterTypes);
}
function parseJavaSimpleType(text) {
    const trimmedText = text.trim();
    const lastDotIndex = trimmedText.lastIndexOf('.');
    if (lastDotIndex === -1) {
        return Object(_erdiagram_generator_oop_code_converter_java_type_JavaType__WEBPACK_IMPORTED_MODULE_1__["createJavaType"])(trimmedText);
    }
    const packageName = trimmedText.substring(0, lastDotIndex);
    const className = trimmedText.substring(lastDotIndex + 1);
    return Object(_erdiagram_generator_oop_code_converter_java_type_JavaType__WEBPACK_IMPORTED_MODULE_1__["createJavaType"])(className, packageName);
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
    generateCode(classModel) {
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


function parseTypeScriptType(text) {
    const trimmedText = text.trim();
    if (trimmedText.endsWith('[]')) {
        const parameterType = trimmedText.substring(0, trimmedText.length - 2);
        return Object(_erdiagram_generator_oop_code_converter_typescript_type_TypeScriptParameterizedType__WEBPACK_IMPORTED_MODULE_1__["createTypeScriptArrayType"])(parseTypeScriptType(parameterType));
    }
    const startOfParameterTypes = trimmedText.indexOf('<');
    if (startOfParameterTypes === -1) {
        return parseTypeScriptSimpleType(trimmedText);
    }
    const endOfParameterTypes = trimmedText.lastIndexOf('>');
    if (endOfParameterTypes === -1 || endOfParameterTypes !== trimmedText.length - 1) {
        throw new Error('Malformed TypeScript type: ' + trimmedText);
    }
    const rawType = parseTypeScriptSimpleType(trimmedText.substring(0, startOfParameterTypes));
    const parameterTypes = splitParameterTypes(trimmedText.substring(startOfParameterTypes + 1, endOfParameterTypes))
        .map(parameterType => parseTypeScriptType(parameterType));
    return Object(_erdiagram_generator_oop_code_converter_typescript_type_TypeScriptParameterizedType__WEBPACK_IMPORTED_MODULE_1__["createTypeScriptParameterizedType"])(rawType.name, parameterTypes);
}
function parseTypeScriptSimpleType(text) {
    return Object(_erdiagram_generator_oop_code_converter_typescript_type_TypeScriptType__WEBPACK_IMPORTED_MODULE_0__["createTypeScriptType"])(text.trim());
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
            nullable: false,
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
        throw error;
    }
    handleValidationError(error, statementResultToLineMap) {
        if (error instanceof _erdiagram_parser_parse_errors__WEBPACK_IMPORTED_MODULE_4__["ERDiagramParseLineError"]) {
            throw error;
        }
        if (error instanceof _erdiagram_parser_parse_errors__WEBPACK_IMPORTED_MODULE_4__["ERDiagramEntityPropertyError"]) {
            throw new _erdiagram_parser_parse_errors__WEBPACK_IMPORTED_MODULE_4__["ERDiagramParseLineError"](error, statementResultToLineMap.get(error.property));
        }
        if (error instanceof _erdiagram_parser_parse_errors__WEBPACK_IMPORTED_MODULE_4__["ERDiagramEntityError"]) {
            throw new _erdiagram_parser_parse_errors__WEBPACK_IMPORTED_MODULE_4__["ERDiagramParseLineError"](error, statementResultToLineMap.get(error.entity));
        }
        if (error instanceof _erdiagram_parser_parse_errors__WEBPACK_IMPORTED_MODULE_4__["ERDiagramRelationshipError"]) {
            throw new _erdiagram_parser_parse_errors__WEBPACK_IMPORTED_MODULE_4__["ERDiagramParseLineError"](error, statementResultToLineMap.get(error.relationship));
        }
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
    const [fullMatch, leftEntity, leftEntityAlias = leftEntity, leftCardinalityCharacter, direction, rightCardinalityCharacter, rightEntity, rightEntityAlias = rightEntity, relationShipName] = result;
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
    return lines.map(line => indentLine(line, indent));
}
function indentLine(line, indent = DEFAULT_INDENT) {
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

/***/ "./src/main/standalone-entry.js":
/*!**************************************!*\
  !*** ./src/main/standalone-entry.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./erdiagram/exports */ "./src/main/erdiagram/exports.ts");


/* harmony default export */ __webpack_exports__["default"] = (_erdiagram_exports__WEBPACK_IMPORTED_MODULE_0__);


/***/ })

/******/ })["default"];
//# sourceMappingURL=erdiagram.js.map