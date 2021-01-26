/*!
 * DSL Test v1.0.5
 * https://github.com/nestorrente/dsl-test
 * 
 * Released under the MIT License.
 * 
 * Build date: 2021-01-26T17:44:38.647Z
 */
var DslTest =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dsl/generator/database/database-model/database-model-generator.ts":
/*!*******************************************************************************!*\
  !*** ./src/dsl/generator/database/database-model/database-model-generator.ts ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _parser_statement_statement_types_parse_functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../parser/statement/statement-types-parse-functions */ "./src/dsl/parser/statement/statement-types-parse-functions.ts");
/* harmony import */ var _util_string_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../util/string-utils */ "./src/dsl/util/string-utils.ts");


var databaseModelGenerator = {
    generateDatabaseModel: function (model) {
        var tables = [];
        model.entities
            .map(function (entity) { return generateEntityTable(entity, model); })
            .forEach(function (sentence) { return tables.push(sentence); });
        model.relationships
            .filter(isManyToManyRelationship)
            .map(function (relationship) { return generateRelationshipTable(relationship); })
            .forEach(function (sentence) { return tables.push(sentence); });
        return {
            tables: tables
        };
    }
};
/* harmony default export */ __webpack_exports__["default"] = (databaseModelGenerator);
function generateEntityTable(entity, model) {
    var name = Object(_util_string_utils__WEBPACK_IMPORTED_MODULE_1__["capitalize"])(entity.name);
    var id = getTableIdColumnName(name);
    var columns = [];
    var references = [];
    for (var _i = 0, _a = entity.properties; _i < _a.length; _i++) {
        var property = _a[_i];
        columns.push(mapPropertyToColumn(property));
    }
    for (var _b = 0, _c = model.relationships; _b < _c.length; _b++) {
        var relationship = _c[_b];
        if (relationship.rightMember.cardinality === _parser_statement_statement_types_parse_functions__WEBPACK_IMPORTED_MODULE_0__["Cardinality"].ONE) {
            if (relationship.leftMember.entity === entity.name) {
                references.push(createTableReference(relationship.rightMember));
            }
        }
        else if (relationship.leftMember.cardinality === _parser_statement_statement_types_parse_functions__WEBPACK_IMPORTED_MODULE_0__["Cardinality"].ONE) {
            if (relationship.rightMember.entity === entity.name) {
                references.push(createTableReference(relationship.leftMember));
            }
        }
    }
    return {
        name: name,
        id: id,
        columns: columns,
        references: references
    };
}
function generateRelationshipTable(relationship) {
    var name = Object(_util_string_utils__WEBPACK_IMPORTED_MODULE_1__["capitalize"])(relationship.relationShipName);
    var id = getTableIdColumnName(name);
    return {
        name: name,
        id: id,
        columns: [],
        references: [
            createTableReference(relationship.leftMember),
            createTableReference(relationship.rightMember)
        ]
    };
}
function createTableReference(toMember) {
    return {
        alias: toMember.entityAlias,
        columnName: toMember.entityAlias + "Id",
        targetTableName: toMember.entity,
        notNull: !toMember.optional
    };
}
function mapRelationshipMemberToColumn(toMember) {
    return {
        name: toMember.entityAlias,
        notNull: !toMember.optional,
        type: _parser_statement_statement_types_parse_functions__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].LONG
    };
}
function getTableIdColumnName(tableName) {
    // TODO definir diferentes estrategias
    // return uncapitalize(tableName) + 'Id';
    return 'id';
}
function mapPropertyToColumn(property) {
    var name = property.name, optional = property.optional, type = property.type, length = property.length;
    return {
        name: name,
        notNull: !optional,
        type: type,
        length: length
    };
}
function isManyToManyRelationship(relationship) {
    return [
        relationship.leftMember,
        relationship.rightMember
    ].every(function (member) { return member.cardinality === _parser_statement_statement_types_parse_functions__WEBPACK_IMPORTED_MODULE_0__["Cardinality"].MANY; });
}


/***/ }),

/***/ "./src/dsl/generator/database/sql/my-sql-code-generator.ts":
/*!*****************************************************************!*\
  !*** ./src/dsl/generator/database/sql/my-sql-code-generator.ts ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _parser_statement_statement_types_parse_functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../parser/statement/statement-types-parse-functions */ "./src/dsl/parser/statement/statement-types-parse-functions.ts");
/* harmony import */ var _database_model_database_model_generator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../database-model/database-model-generator */ "./src/dsl/generator/database/database-model/database-model-generator.ts");
var __spreadArrays = (undefined && undefined.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};


var INDENT = '    ';
var MySqlCodeGenerator = /** @class */ (function () {
    function MySqlCodeGenerator() {
    }
    MySqlCodeGenerator.prototype.generateCode = function (entityRelationshipModel) {
        var _this = this;
        var databaseModel = _database_model_database_model_generator__WEBPACK_IMPORTED_MODULE_1__["default"].generateDatabaseModel(entityRelationshipModel);
        return databaseModel.tables
            .map(function (table) { return _this.generateTable(table, databaseModel); })
            .join('\n\n');
    };
    MySqlCodeGenerator.prototype.generateTable = function (table, model) {
        var tableId = getTableId(table.name);
        var columnLines = [
            this.createIdColumn(tableId)
        ];
        var constraintLines = [
            this.createPrimaryKeyConstraint(table, tableId)
        ];
        for (var _i = 0, _a = table.columns; _i < _a.length; _i++) {
            var column = _a[_i];
            columnLines.push(this.createColumn(column));
        }
        for (var _b = 0, _c = table.references; _b < _c.length; _b++) {
            var reference = _c[_b];
            var _d = this.createForeignColumn(table.name, reference, model), columnLine = _d.columnLine, constraintLine = _d.constraintLine;
            columnLines.push(columnLine);
            constraintLines.push(constraintLine);
        }
        var lines = __spreadArrays(columnLines, constraintLines);
        return [
            "CREATE TABLE " + table.name + " (",
            indentLines(lines).join(',\n'),
            ');'
        ].join('\n');
    };
    MySqlCodeGenerator.prototype.createPrimaryKeyConstraint = function (table, tableId) {
        return "CONSTRAINT " + table.name + "_pk PRIMARY KEY (" + tableId + ")";
    };
    MySqlCodeGenerator.prototype.createIdColumn = function (tableId) {
        var columnCode = this.createColumn({
            name: tableId,
            type: _parser_statement_statement_types_parse_functions__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].LONG,
            notNull: true
        });
        return columnCode + ' AUTO_INCREMENT';
    };
    MySqlCodeGenerator.prototype.createColumn = function (column) {
        var name = column.name, notNull = column.notNull, type = column.type, length = column.length;
        var lineParts = [];
        lineParts.push(name);
        var mappedType = mapPropertyTypeToSqlType(type);
        if (length) {
            lineParts.push(type + "(" + length + ")");
        }
        else {
            lineParts.push(type);
        }
        if (notNull) {
            lineParts.push('NOT NULL');
        }
        return lineParts.join(' ');
    };
    MySqlCodeGenerator.prototype.createForeignColumn = function (sourceTableName, reference, model) {
        var column = {
            name: reference.columnName,
            type: _parser_statement_statement_types_parse_functions__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].LONG,
            notNull: reference.notNull
        };
        return {
            columnLine: this.createColumn(column),
            constraintLine: this.createForeignKey(sourceTableName, reference)
        };
    };
    MySqlCodeGenerator.prototype.createForeignKey = function (sourceTableName, reference) {
        return "CONSTRAINT " + sourceTableName + "_" + reference.alias + "_fk FOREIGN KEY (" + reference.columnName + ")"
            + (" REFERENCES " + reference.targetTableName + " (" + getTableId(reference.targetTableName) + ")");
    };
    return MySqlCodeGenerator;
}());
/* harmony default export */ __webpack_exports__["default"] = (MySqlCodeGenerator);
function indentLines(lines) {
    return lines.map(function (e) { return INDENT + e; });
}
function getTableId(entityName) {
    // return uncapitalize(entityName) + 'Id';
    return 'id';
}
function mapPropertyTypeToSqlType(type) {
    var _a;
    var typesMap = (_a = {},
        _a[_parser_statement_statement_types_parse_functions__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].TEXT] = 'VARCHAR',
        _a[_parser_statement_statement_types_parse_functions__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].LONG] = 'BIGINT',
        _a[_parser_statement_statement_types_parse_functions__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].INT] = 'INT',
        _a[_parser_statement_statement_types_parse_functions__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].DECIMAL] = 'DECIMAL',
        _a[_parser_statement_statement_types_parse_functions__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].BOOLEAN] = 'BOOLEAN',
        _a[_parser_statement_statement_types_parse_functions__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].DATE] = 'DATE',
        _a[_parser_statement_statement_types_parse_functions__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].TIME] = 'TIME',
        _a[_parser_statement_statement_types_parse_functions__WEBPACK_IMPORTED_MODULE_0__["EntityPropertyType"].DATETIME] = 'TIMESTAMP',
        _a);
    if (!typesMap.hasOwnProperty(type)) {
        throw new Error('Unsupported type: ' + type);
    }
    return typesMap[type];
}


/***/ }),

/***/ "./src/dsl/parser/er-model-parser.ts":
/*!*******************************************!*\
  !*** ./src/dsl/parser/er-model-parser.ts ***!
  \*******************************************/
/*! exports provided: parseEntityRelationshipModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseEntityRelationshipModel", function() { return parseEntityRelationshipModel; });
/* harmony import */ var _statement_statement_types_parse_functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./statement/statement-types-parse-functions */ "./src/dsl/parser/statement/statement-types-parse-functions.ts");
/* harmony import */ var _statement_statement_type_guesser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./statement/statement-type-guesser */ "./src/dsl/parser/statement/statement-type-guesser.ts");


function parseEntityRelationshipModel(code) {
    var lines = code.split('\n');
    var entities = [];
    var relationships = [];
    var lastDescriptorRead = null;
    var parsingEntity = false;
    lines.forEach(function (line) {
        var statementType = Object(_statement_statement_type_guesser__WEBPACK_IMPORTED_MODULE_1__["guessStatementType"])(line);
        switch (statementType) {
            case _statement_statement_type_guesser__WEBPACK_IMPORTED_MODULE_1__["StatementType"].ENTITY_NAME:
                var entityDescriptor = {
                    name: Object(_statement_statement_types_parse_functions__WEBPACK_IMPORTED_MODULE_0__["parseEntityNameStatement"])(line),
                    properties: [],
                    metadata: []
                };
                entities.push(entityDescriptor);
                lastDescriptorRead = entityDescriptor;
                parsingEntity = true;
                break;
            case _statement_statement_type_guesser__WEBPACK_IMPORTED_MODULE_1__["StatementType"].ENTITY_PROPERTY:
                if (!parsingEntity) {
                    throw new Error('Unexpected entity property statement');
                }
                var lastEntity = entities[entities.length - 1];
                var entityPropertyDescriptor = Object(_statement_statement_types_parse_functions__WEBPACK_IMPORTED_MODULE_0__["parseEntityPropertyStatement"])(line);
                lastEntity.properties.push(entityPropertyDescriptor);
                lastDescriptorRead = entityPropertyDescriptor;
                break;
            case _statement_statement_type_guesser__WEBPACK_IMPORTED_MODULE_1__["StatementType"].RELATIONSHIP:
                var relationshipDescriptor = Object(_statement_statement_types_parse_functions__WEBPACK_IMPORTED_MODULE_0__["parseRelationshipStatement"])(line);
                relationships.push(relationshipDescriptor);
                lastDescriptorRead = relationshipDescriptor;
                parsingEntity = false;
                break;
            case _statement_statement_type_guesser__WEBPACK_IMPORTED_MODULE_1__["StatementType"].METADATA:
                if (lastDescriptorRead == null) {
                    throw new Error('Unexpected metadata statement');
                }
                var metadata = Object(_statement_statement_types_parse_functions__WEBPACK_IMPORTED_MODULE_0__["parseMetadataStatement"])(line);
                lastDescriptorRead.metadata.push(metadata);
                break;
            case _statement_statement_type_guesser__WEBPACK_IMPORTED_MODULE_1__["StatementType"].BLANK_LINE:
            case _statement_statement_type_guesser__WEBPACK_IMPORTED_MODULE_1__["StatementType"].COMMENT:
                // Ignore
                break;
            default:
                throw new Error('Unknown statement type: ' + statementType);
        }
    });
    return validateModel({
        entities: entities,
        relationships: relationships
    });
}
function validateModel(model) {
    var entityNames = model.entities.map(function (e) { return e.name; });
    model.relationships.forEach(function (r) {
        if (!entityNames.includes(r.leftMember.entity)) {
            throw new Error("Uknown entity in relationship's left side: " + r.leftMember.entity);
        }
        if (!entityNames.includes(r.rightMember.entity)) {
            throw new Error("Uknown entity in relationship's right side: " + r.rightMember.entity);
        }
    });
    return model;
}


/***/ }),

/***/ "./src/dsl/parser/statement/statement-type-guesser.ts":
/*!************************************************************!*\
  !*** ./src/dsl/parser/statement/statement-type-guesser.ts ***!
  \************************************************************/
/*! exports provided: StatementType, guessStatementType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatementType", function() { return StatementType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "guessStatementType", function() { return guessStatementType; });
/* harmony import */ var _statement_types_regexes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./statement-types-regexes */ "./src/dsl/parser/statement/statement-types-regexes.ts");

var StatementType;
(function (StatementType) {
    StatementType["ENTITY_NAME"] = "entityName";
    StatementType["ENTITY_PROPERTY"] = "entityProperty";
    StatementType["RELATIONSHIP"] = "relationship";
    StatementType["METADATA"] = "metadata";
    StatementType["COMMENT"] = "comment";
    StatementType["BLANK_LINE"] = "blankLine";
    StatementType["UNKNOWN"] = "unknown";
})(StatementType || (StatementType = {}));
function guessStatementType(line) {
    if (_statement_types_regexes__WEBPACK_IMPORTED_MODULE_0__["ENTITY_NAME_LINE_REGEX"].test(line)) {
        return StatementType.ENTITY_NAME;
    }
    else if (_statement_types_regexes__WEBPACK_IMPORTED_MODULE_0__["ENTITY_PROPERTY_LINE_REGEX"].test(line)) {
        return StatementType.ENTITY_PROPERTY;
    }
    else if (_statement_types_regexes__WEBPACK_IMPORTED_MODULE_0__["RELATIONSHIP_LINE_REGEX"].test(line)) {
        return StatementType.RELATIONSHIP;
    }
    else if (_statement_types_regexes__WEBPACK_IMPORTED_MODULE_0__["METADATA_LINE_REGEX"].test(line)) {
        return StatementType.METADATA;
    }
    else if (isBlankLine(line)) {
        return StatementType.BLANK_LINE;
    }
    else if (isCommentLine(line)) {
        return StatementType.COMMENT;
    }
    else {
        return StatementType.UNKNOWN;
    }
}
function isBlankLine(line) {
    return line.trim().length === 0;
}
function isCommentLine(line) {
    return line.trim()[0] === '#';
}


/***/ }),

/***/ "./src/dsl/parser/statement/statement-types-parse-functions.ts":
/*!*********************************************************************!*\
  !*** ./src/dsl/parser/statement/statement-types-parse-functions.ts ***!
  \*********************************************************************/
/*! exports provided: Cardinality, Direction, EntityPropertyType, parseEntityNameStatement, parseEntityPropertyStatement, parseRelationshipStatement, parseMetadataStatement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cardinality", function() { return Cardinality; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Direction", function() { return Direction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntityPropertyType", function() { return EntityPropertyType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseEntityNameStatement", function() { return parseEntityNameStatement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseEntityPropertyStatement", function() { return parseEntityPropertyStatement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseRelationshipStatement", function() { return parseRelationshipStatement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseMetadataStatement", function() { return parseMetadataStatement; });
/* harmony import */ var _util_string_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/string-utils */ "./src/dsl/util/string-utils.ts");
/* harmony import */ var _statement_types_regexes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./statement-types-regexes */ "./src/dsl/parser/statement/statement-types-regexes.ts");


var Cardinality;
(function (Cardinality) {
    Cardinality["MANY"] = "many";
    Cardinality["ONE"] = "one";
})(Cardinality || (Cardinality = {}));
var Direction;
(function (Direction) {
    Direction["LEFT"] = "left";
    Direction["RIGHT"] = "right";
    Direction["BOTH"] = "both";
})(Direction || (Direction = {}));
var EntityPropertyType;
(function (EntityPropertyType) {
    EntityPropertyType["TEXT"] = "text";
    EntityPropertyType["LONG"] = "long";
    EntityPropertyType["INT"] = "int";
    EntityPropertyType["DECIMAL"] = "decimal";
    EntityPropertyType["BOOLEAN"] = "bool";
    EntityPropertyType["DATE"] = "date";
    EntityPropertyType["TIME"] = "time";
    EntityPropertyType["DATETIME"] = "datetime";
})(EntityPropertyType || (EntityPropertyType = {}));
function parseEntityNameStatement(line) {
    var result = _statement_types_regexes__WEBPACK_IMPORTED_MODULE_1__["ENTITY_NAME_LINE_REGEX"].exec(line);
    if (result == null) {
        throw new Error('Syntax error');
    }
    var entityName = result[0];
    return entityName;
}
function parseEntityPropertyStatement(line) {
    var result = _statement_types_regexes__WEBPACK_IMPORTED_MODULE_1__["ENTITY_PROPERTY_LINE_REGEX"].exec(line);
    if (result == null) {
        throw new Error('Syntax error');
    }
    var fullMatch = result[0], name = result[1], optionalModifier = result[2], type = result[3], length = result[4];
    var mappedType = type.toLowerCase();
    if (!Object.values(EntityPropertyType).includes(mappedType)) {
        throw new Error('Unknown type: ' + type);
    }
    return {
        name: name,
        optional: optionalModifier === '?',
        type: mappedType,
        length: length ? parseInt(length, 10) : undefined,
        metadata: []
    };
}
function parseRelationshipStatement(line) {
    var result = _statement_types_regexes__WEBPACK_IMPORTED_MODULE_1__["RELATIONSHIP_LINE_REGEX"].exec(line);
    if (result == null) {
        throw new Error('Syntax error');
    }
    var fullMatch = result[0], leftEntity = result[1], _a = result[2], leftEntityAlias = _a === void 0 ? Object(_util_string_utils__WEBPACK_IMPORTED_MODULE_0__["uncapitalize"])(leftEntity) : _a, leftCardinality = result[3], direction = result[4], rightCardinality = result[5], rightEntity = result[6], _b = result[7], rightEntityAlias = _b === void 0 ? Object(_util_string_utils__WEBPACK_IMPORTED_MODULE_0__["uncapitalize"])(rightEntity) : _b, _c = result[8], relationShipName = _c === void 0 ? "" + leftEntity + Object(_util_string_utils__WEBPACK_IMPORTED_MODULE_0__["capitalize"])(rightEntity) : _c;
    return {
        leftMember: {
            entity: leftEntity,
            entityAlias: leftEntityAlias,
            cardinality: leftCardinality === '*' ? Cardinality.MANY : Cardinality.ONE,
            optional: leftCardinality === '?'
        },
        rightMember: {
            entity: rightEntity,
            entityAlias: rightEntityAlias,
            cardinality: rightCardinality === '*' ? Cardinality.MANY : Cardinality.ONE,
            optional: rightCardinality === '?'
        },
        direction: direction === '->' ? Direction.RIGHT : (direction === '<-' ? Direction.LEFT : Direction.BOTH),
        relationShipName: relationShipName,
        metadata: []
    };
}
function parseMetadataStatement(line) {
    var result = _statement_types_regexes__WEBPACK_IMPORTED_MODULE_1__["METADATA_LINE_REGEX"].exec(line);
    if (result == null) {
        throw new Error('Syntax error');
    }
    var fullMatch = result[0], key = result[1], value = result[2];
    return {
        key: key,
        value: value
    };
}


/***/ }),

/***/ "./src/dsl/parser/statement/statement-types-regexes.ts":
/*!*************************************************************!*\
  !*** ./src/dsl/parser/statement/statement-types-regexes.ts ***!
  \*************************************************************/
/*! exports provided: ENTITY_NAME_LINE_REGEX, ENTITY_PROPERTY_LINE_REGEX, RELATIONSHIP_LINE_REGEX, METADATA_LINE_REGEX */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ENTITY_NAME_LINE_REGEX", function() { return ENTITY_NAME_LINE_REGEX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ENTITY_PROPERTY_LINE_REGEX", function() { return ENTITY_PROPERTY_LINE_REGEX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RELATIONSHIP_LINE_REGEX", function() { return RELATIONSHIP_LINE_REGEX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "METADATA_LINE_REGEX", function() { return METADATA_LINE_REGEX; });
/* harmony import */ var _util_regex_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/regex-utils */ "./src/dsl/util/regex-utils.ts");

var IDENTIFIER_REGEX = /[a-zA-Z_][a-zA-Z_0-9]*/;
// Entity name
var ENTITY_NAME_LINE_REGEX = new RegExp("^" + IDENTIFIER_REGEX.source + "$");
// Entity property
var PROPERTY_NAME_REGEX = new RegExp("(" + IDENTIFIER_REGEX.source + ")");
var OPTIONAL_PROPERTY_MODIFIER_REGEX = new RegExp("(\\?)?");
var PROPERTY_TYPE_NAME_REGEX = new RegExp("(" + IDENTIFIER_REGEX.source + ")");
var PROPERTY_TYPE_LENGTH_REGEX = new RegExp("(?:\\((\\d*)\\))?");
var ENTITY_PROPERTY_REGEX = Object(_util_regex_utils__WEBPACK_IMPORTED_MODULE_0__["joinRegExps"])(PROPERTY_NAME_REGEX, OPTIONAL_PROPERTY_MODIFIER_REGEX, /\s+/, PROPERTY_TYPE_NAME_REGEX, PROPERTY_TYPE_LENGTH_REGEX);
var ENTITY_PROPERTY_LINE_REGEX = new RegExp("^\\s*" + ENTITY_PROPERTY_REGEX.source + "$");
// Relationship
var DIRECTION_REGEX = /(<-|->|<->)/;
var CARDINALITY_REGEX = /([?1*])?/;
var DIRECTION_AND_CARDINALITY_REGEX = Object(_util_regex_utils__WEBPACK_IMPORTED_MODULE_0__["joinRegExps"])(CARDINALITY_REGEX, DIRECTION_REGEX, CARDINALITY_REGEX);
var ENTITY_AND_ALIAS_REGEX = new RegExp("(" + IDENTIFIER_REGEX.source + ")(?:\\s+(" + IDENTIFIER_REGEX.source + "))?");
var RELATIONSHIP_LINE_REGEX = new RegExp("^" + ENTITY_AND_ALIAS_REGEX.source + "\\s*?" + DIRECTION_AND_CARDINALITY_REGEX.source + "\\s*?" + ENTITY_AND_ALIAS_REGEX.source + "(?:\\s+\\((" + IDENTIFIER_REGEX.source + ")\\))?$");
// Metadata
var METADATA_VALUE_REGEX = new RegExp("(.*)");
var METADATA_ENTRY_REGEX = new RegExp("-\\s*(" + IDENTIFIER_REGEX.source + ")\\s*:\\s*" + METADATA_VALUE_REGEX.source + "\\s*");
var METADATA_LINE_REGEX = new RegExp("^\\s*" + METADATA_ENTRY_REGEX.source + "$");


/***/ }),

/***/ "./src/dsl/util/regex-utils.ts":
/*!*************************************!*\
  !*** ./src/dsl/util/regex-utils.ts ***!
  \*************************************/
/*! exports provided: escapeRegExp, joinRegExps */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "escapeRegExp", function() { return escapeRegExp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "joinRegExps", function() { return joinRegExps; });
function escapeRegExp(text) {
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
            return escapeRegExp(e);
        }
        else {
            return e.source;
        }
    })
        .join('');
    return new RegExp(source);
}


/***/ }),

/***/ "./src/dsl/util/string-utils.ts":
/*!**************************************!*\
  !*** ./src/dsl/util/string-utils.ts ***!
  \**************************************/
/*! exports provided: capitalize, uncapitalize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "capitalize", function() { return capitalize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uncapitalize", function() { return uncapitalize; });
function capitalize(text) {
    return text[0].toUpperCase() + text.substring(1);
}
function uncapitalize(text) {
    return text[0].toLowerCase() + text.substring(1);
}


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dsl_parser_er_model_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dsl/parser/er-model-parser */ "./src/dsl/parser/er-model-parser.ts");
/* harmony import */ var _dsl_generator_database_sql_my_sql_code_generator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dsl/generator/database/sql/my-sql-code-generator */ "./src/dsl/generator/database/sql/my-sql-code-generator.ts");


// [
// 	'User follower *<->* User followed (a)',
// 	'User->Shift',
// ].map(parseRelationshipStatement).forEach(e => console.log(e));
//
// [
// 	'User',
// 	'Shift',
// ].map(parseEntityNameStatement).forEach(e => console.log(e));
//
// [
// 	'  username text(50)',
// 	'  name text(50)',
// 	'  birthday? date',
// 	'  registrationDate datetime()',
// 	'  active bool',
// ].map(parseEntityPropertyStatement).forEach(e => console.log(e));
// const model = parseEntityRelationshipModel(`
//
// User
// 	username text(50)
// 	name text(50)
// 	birthday? date
// 	registrationDate datetime
// 	active bool
//
// # comment
// Shift
// 	fromTime time
// 	# other comment :)
// 	toTime time
//
// Country
// 	code text(5)
// 	name text(100)
//
// User ->? Shift
// User people *-> Country
//
// User follower *<->* User follow (Follows)
//
// `);
var model = Object(_dsl_parser_er_model_parser__WEBPACK_IMPORTED_MODULE_0__["parseEntityRelationshipModel"])("\n\nUser\n\tusername text(50)\n\tname text(50)\n\tbirthday? date\n\tactive bool\n\nCountry\n\tcode text(5)\n\tname text(100)\n\nUser *-> Country\n\nUser ->? Country alternativeCountry\n\nPermission\n\t- permissionTableMeta: el valor de la meta\n\tcode text(30)\n\t\t- codeColumnMeta1: 1\n\t\t- codeColumnMeta2: false\n\tdescription text(200)\n\nUser *<->* Permission\n\n");
var modelCodeGenerator = new _dsl_generator_database_sql_my_sql_code_generator__WEBPACK_IMPORTED_MODULE_1__["default"]();
// const modelCodeGenerator: ModelCodeGenerator = new JavaCodeGenerator();
// console.log(JSON.stringify(model, null, 4));
console.log(modelCodeGenerator.generateCode(model));
// console.log(JSON.stringify(databaseModelGenerator.generateDatabaseModel(model), null, 4));
// console.log(JSON.stringify(classModelGenerator.generateClassModel(model), null, 4));


/***/ })

/******/ })["default"];
//# sourceMappingURL=dsl-test.js.map