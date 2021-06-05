# Configuration options

In this page you will find information about the configuration options of the different components of the _ERDiagram_ library.

## Table of contents

* [EntityRelationshipModelParser](#entityrelationshipmodelparser)
* [Database](#database)
    + [DatabaseModelGenerator](#databasemodelgenerator)
    + [SqlDialect (MysqlDialect, OracleDialect, PostgresqlDialect, SqliteDialect, and SqlServerDialect)](#sqldialect-mysqldialect-oracledialect-postgresqldialect-sqlitedialect-and-sqlserverdialect)
        + [Type bindings (SQL)](#type-bindings-sql)
        + [Case formats](#case-formats)
* [OOP classes](#oop-classes)
    + [ClassModelGenerator](#classmodelgenerator)
    + [JavaClassModelToCodeConverter](#javaclassmodeltocodeconverter)
        + [Type bindings (Java)](#type-bindings-java)
    + [TypeScriptClassModelToCodeConverter](#typescriptclassmodeltocodeconverter)
        + [Type bindings (TypeScript)](#type-bindings-typescript)
* [Diagram](#diagram)
    + [NomnomlSourceCodeGeneratorConfig](#nomnomlsourcecodegeneratorconfig)

## EntityRelationshipModelParser

| Property               | Type      | Default value | description |
|------------------------|-----------|---------------|-------------|
| `allowUnknownEntities` | `boolean` | `false`       | Allows to define relationships using undefined entities. This is very useful when you are modelling new entities for an existing project and you need to define relationships between the new entities and the existing ones. |

## Database

### DatabaseModelGenerator

| Property              | Type                             | Default value                        | description |
|-----------------------|----------------------------------|--------------------------------------|-------------|
| `usePluralTableNames` | `boolean`                        | `false`                              | When `true`, _ERDiagram_ will name the database tables using the plural of the entities' names. For example, the entity `User` will be modelled using the `Users` table. |
| `idNamingStrategy`    | `(entityName: string) => string` | `StandardIdNamingStrategies.DEFAULT` | Allows to customize the naming strategy for the identity column of the table. You can use any of the standard values (defined in the `StandardIdNamingStrategies` object) or write your own. |

### SqlDialect (MysqlDialect, OracleDialect, PostgresqlDialect, SqliteDialect, and SqlServerDialect)

| Property               | Type                                         | Default value                           | description |
|------------------------|----------------------------------------------|-----------------------------------------|-------------|
| `typeBindings`         | `Record<EntityPropertyType, TypeScriptType>` | See [type bindings](#type-bindings-sql) | Allows to customize the corresponding SQL type for each _ERDiagram_ type |
| `tableNameCaseFormat`  | `CaseFormat`                                 | See [case formats](#case-formats)       | Allows to customize the case of the database tables |
| `columnNameCaseFormat` | `CaseFormat`                                 | See [case formats](#case-formats)       | Allows to customize the case of the database columns |

#### Type bindings (SQL)

These are the default values for the `typeBindings` property for each dialect:

| _ERDiagram_ type | MySQL type  | Oracle type    | PostgreSQL type | SQLite type | SQL Server type  |
|------------------|-------------|----------------|-----------------|-------------|------------------|
| `identity`       | `BIGINT`    | `NUMBER`       | `BIGINT`        | `INTEGER`   | `BIGINT`         |
| `text`           | `VARCHAR`   | `VARCHAR2`     | `VARCHAR`       | `TEXT`      | `NVARCHAR`       |
| `long`           | `BIGINT`    | `NUMBER`       | `BIGINT`        | `INTEGER`   | `BIGINT`         |
| `int`            | `INT`       | `NUMBER`       | `INTEGER`       | `INTEGER`   | `INT`            |
| `short`          | `SHORT`     | `NUMBER`       | `SMALLINT`      | `INTEGER`   | `SMALLINT`       |
| `decimal`        | `DECIMAL`   | `NUMBER`       | `DECIMAL`       | `REAL`      | `DECIMAL`        |
| `bool`           | `BOOLEAN`   | `NUMBER(1, 0)` | `BOOLEAN`       | `INTEGER`   | `BIT`            |
| `date`           | `DATE`      | `DATE`         | `DATE`          | `INTEGER`   | `DATE`           |
| `time`           | `TIME`      | `TIMESTAMP`    | `TIME`          | `INTEGER`   | `TIME`           |
| `datetime`       | `TIMESTAMP` | `TIMESTAMP`    | `TIMESTAMP`     | `INTEGER`   | `DATETIME2`      |
| `blob`           | `BLOB`      | `BLOB`         | `BYTEA`         | `BLOB`      | `VARBINARY(MAX)` |

#### Case formats

These are the standard case formats:

| Case format                                  | Example text |
|----------------------------------------------|--------------|
| `StandardCaseFormats.LOWER_CAMEL`            | dontBeEvil   |
| `StandardCaseFormats.UPPER_CAMEL`            | DontBeEvil   |
| `StandardCaseFormats.LOWER_UNDERSCORE`       | dont_be_evil |
| `StandardCaseFormats.CAPITALIZED_UNDERSCORE` | Dont_Be_Evil |
| `StandardCaseFormats.UPPER_UNDERSCORE`       | DONT_BE_EVIL |

If none of these apply to you, you can create your own by implementing the `CaseFormat` interface:

```typescript
interface CaseFormat {
    splitWords(text: string): string[];
    joinWords(words: string[]): string;
}
```

These are the default case formats for each dialect:

| Dialect    | Table name case format | Column name case format |
|------------|------------------------|-------------------------|
| MySQL      | `UpperCamel`           | `lowerCamel`            |
| Oracle     | `UPPER_UNDERSCORE`     | `UPPER_UNDERSCORE`      |
| PostgreSQL | `lower_underscore`     | `lower_underscore`      |
| SQLite     | `lower_underscore`     | `lower_underscore`      |
| SQL Server | `UpperCamel`           | `UpperCamel`            |

## OOP classes

### ClassModelGenerator

| Property           | Type       | Default value                        | description |
|--------------------|------------|--------------------------------------|-------------|
| `idNamingStrategy` | `function` | `StandardIdNamingStrategies.DEFAULT` | Allows to customize the naming strategy for the identity property of the table. You can use any of the standard values (defined in the `StandardIdNamingStrategies` object) or write your own function `(entityName: string) => string`. |

### JavaClassModelToCodeConverter

| Property                        | Type                                   | Default value                            | description |
|---------------------------------|----------------------------------------|------------------------------------------|-------------|
| `typeBindings`                  | `Record<EntityPropertyType, JavaType>` | See [type bindings](#type-bindings-java) | Allows to customize the corresponding Java type for each _ERDiagram_ type |
| `generatedClassesPackage`       | <code>string &#124; undefined</code>   | `undefined`                              | Allows to define the package name of the generated classes |
| `useValidationAnnotations`      | `boolean`                              | `false`                                  | Uses annotations from Java Validation API (JSR-303). Only `@NotNull`, `@NotEmpty`, `@NotBlank` and `@Size` are supported so far. |
| `notNullTextValidationStrategy` | `enum NotNullTextValidationStrategy`   | `NOT_NULL`                               | Defines which validation strategy (and thus, which JSR-303 annotation &ndash; `@NotNull`, `@NotEmpty` or `@NotBlank`) to use for _not-null_ `text` fields |
| `notNullBlobValidationStrategy` | `enum NotNullBlobValidationStrategy`   | `NOT_NULL`                               | Defines which validation strategy (and thus, which JSR-303 annotation &ndash; `@NotNull` or `@NotEmpty`) to use for _not-null_ `blob` fields |

#### Type bindings (Java)

These are the default values for the `typeBindings` property:

| _ERDiagram_ type | Java type                 |
|------------------|---------------------------|
| `identity`       | `java.lang.Long`          |
| `text`           | `java.lang.String`        |
| `long`           | `java.lang.Long`          |
| `int`            | `java.lang.Integer`       |
| `short`          | `java.lang.Short`         |
| `decimal`        | `java.math.BigDecimal`    |
| `bool`           | `java.lang.Boolean`       |
| `date`           | `java.time.LocalDate`     |
| `time`           | `java.time.LocalTime`     |
| `datetime`       | `java.time.LocalDateTime` |
| `blob`           | `byte[]`                  |

_ERDiagram_ exports some functions that you can use to create `JavaType` instances:

```javascript
import {
    createJavaSimpleType,
    createJavaArrayType,
    createJavaParameterizedType,
    parseJavaType
} from '@nestorrente/erdiagram';

// createJavaSimpleType(name: string, packageName?: string): JavaType

const intType = createJavaSimpleType('int'); // int
const integerType = createJavaSimpleType('Integer', 'java.lang'); // Integer
const myClassType = createJavaSimpleType('MyClass', 'com.example'); // MyClass

// createJavaArrayType(parameterType: JavaType): JavaParameterizedType

const intArrayType = createJavaArrayType(intType); // int[]

// createJavaParameterizedType(name: string, packageName: string | undefined, parameterTypes: JavaType[]): JavaParameterizedType

const listOfMyClassType = createJavaParameterizedType('List', 'java.util', [myClassType]); // List<MyClass>
const mapFromIntegerToMyClassType = createJavaParameterizedType('Map', 'java.util', [integerType, myClassType]) // Map<Integer, MyClass>

// ... or you can just write the formatted version of the Java type and let ERDiagram parse for you

// parseJavaType(text: string): JavaType

parseJavaType('long') // long
parseJavaType('java.lang.Long') // Long
parseJavaType('java.util.Map<java.lang.Long, java.util.List<com.example.MyClass>>') // Map<Long, List<MyClass>>
```

### TypeScriptClassModelToCodeConverter

| Property       | Type                                         | Default value                                  | description |
|----------------|----------------------------------------------|------------------------------------------------|-------------|
| `typeBindings` | `Record<EntityPropertyType, TypeScriptType>` | See [type bindings](#type-bindings-typescript) | Allows to customize the corresponding TypeScript type for each _ERDiagram_ type |

#### Type bindings (TypeScript)

These are the default values for the `typeBindings` property:

| _ERDiagram_ type | TypeScript type |
|------------------|-----------------|
| `identity`       | `number`        |
| `text`           | `string`        |
| `long`           | `number`        |
| `int`            | `number`        |
| `short`          | `number`        |
| `decimal`        | `number`        |
| `bool`           | `boolean`       |
| `date`           | `Date`          |
| `time`           | `Date`          |
| `datetime`       | `Date`          |
| `blob`           | `Uint8Array`    |

_ERDiagram_ exports some functions that you can use to create your own `TypeScriptType` instances:

```javascript
import {
    createTypeScriptSimpleType,
    createTypeScriptArrayType,
    createTypeScriptParameterizedType,
    parseTypeScriptType
} from '@nestorrente/erdiagram';

// createTypeScriptSimpleType(name: string): TypeScriptType

const numberType = createTypeScriptSimpleType('number'); // number
const dateType = createTypeScriptSimpleType('Date'); // Date
const myClassType = createTypeScriptSimpleType('MyClass'); // MyClass

// createTypeScriptArrayType(parameterType: TypeScriptType): TypeScriptParameterizedType

const numberArrayType = createTypeScriptArrayType(numberType); // number[] a.k.a. Array<number>

// createTypeScriptParameterizedType(name: string, parameterTypes: TypeScriptType[]): TypeScriptParameterizedType

const setOfMyDateType = createJavaParameterizedType('Set', [dateType]); // Set<MyDate>
const mapFromIntegerToMyClassType = createJavaParameterizedType('Map', [numberType, myClassType]) // Map<number, MyClass>

// ... or you can just write the formatted version of the Java type and let ERDiagram parse for you

// parseTypeScriptTypeInternal(text: string): TypeScriptType

parseJavaType('boolean') // boolean
parseJavaType('Array<string>') // string[] a.k.a. Array<string>
parseJavaType('Map<number, Date[]>') // Map<number, Date[]> a.k.a. Map<number, Array<Date>>
```

## Diagram

### NomnomlSourceCodeGeneratorConfig

_ERDiagram_ allows customizing the values of some Nomnoml directives. You can learn more about those directives in
[Nomnoml's Github repo](https://github.com/skanaar/nomnoml).

Here is the full list of directives that are supported by _ERDiagram_:

| Nomnoml directive | Type                                                                     | _ERDiagram_ opinionated default value |
|-------------------|--------------------------------------------------------------------------|---------------------------------------|
| arrowSize         | `number`                                                                 | `1`                                   |
| bendSize          | `number`                                                                 | `undefined`                           |
| direction         | <code>'down' &#124; 'right'</code>                                       | `undefined`                           |
| gutter            | `number`                                                                 | `undefined`                           |
| edgeMargin        | `number`                                                                 | `undefined`                           |
| gravity           | `number`                                                                 | `1.5`                                 |
| edges             | <code>'hard' &#124; 'rounded'</code>                                     | `undefined`                           |
| background        | `string`                                                                 | `'transparent'`                       |
| fill              | `string`                                                                 | `'#eef6ff'`                           |
| fillArrows        | `boolean`                                                                | `undefined`                           |
| font              | `string`                                                                 | `undefined`                           |
| fontSize          | `number`                                                                 | `undefined`                           |
| leading           | `number`                                                                 | `undefined`                           |
| lineWidth         | `number`                                                                 | `1`                                   |
| padding           | `number`                                                                 | `undefined`                           |
| spacing           | `number`                                                                 | `undefined`                           |
| stroke            | `string`                                                                 | `'#333333'`                           |
| title             | `string`                                                                 | `undefined`                           |
| zoom              | `number`                                                                 | `undefined`                           |
| acyclicer         | `'greedy'`                                                               | `undefined`                           |
| ranker            | <code>'network-simplex' &#124; 'tight-tree' &#124; 'longest-path'</code> | `'longest-path'`                      |
