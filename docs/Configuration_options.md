# Configuration options

In this page you will find information about the configuration options of the different components of the _ERDiagram_ library.

## Table of contents

* [EntityRelationshipModelParser](#entityrelationshipmodelparser)
* [Database](#database)
    + [DatabaseModelGenerator](#databasemodelgenerator)
    + [MysqlDialect, OracleDialect, PostgresqlDialect, SqliteDialect, and SqlServerDialect](#mysqldialect-oracledialect-postgresqldialect-sqlitedialect-and-sqlserverdialect)
        + [Type bindings (SQL)](#type-bindings-sql)
        + [Case formats](#case-formats)
* [OOP classes](#oop-classes)
    + [ClassModelGenerator](#classmodelgenerator)
    + [JavaClassModelToCodeConverter](#javaclassmodeltocodeconverter)
        + [Type bindings (Java)](#type-bindings-java)
    + [TypeScriptClassModelToCodeConverter](#typescriptclassmodeltocodeconverter)
        + [Type bindings (TypeScript)](#type-bindings-typescript)
* [Diagram](#diagram)
    + [NomnomlEntityRelationshipModelToDiagramCodeConverter](#nomnomlentityrelationshipmodeltodiagramcodeconverter)

## EntityRelationshipModelParser

| Property | Type | Allowed values | Default value | description |
|----------|------|----------------|---------------|-------------|
| `allowUnknownEntities` | `boolean` | `true`, `false` | `false` | Allows to define relationships using undefined entities. This is very useful when you are modelling new entities for an existing project and you need to define relationships between the new entities and the existing ones. |

## Database

### DatabaseModelGenerator

| Property | Type | Allowed values | Default value | description |
|----------|------|----------------|---------------|-------------|
| `usePluralTableNames` | `boolean` | `true`, `false` | `false` | When `true`, _ERDiagram_ will name the database tables using the plural of the entities' names. For example, the entity `User` will be modelled using the `Users` table. |
| `idNamingStrategy` | `function` | _many_ | `StandardIdNamingStrategies.DEFAULT` | Allows to customize the naming strategy for the identity column of the table. You can use any of the standard values (defined in the `StandardIdNamingStrategies` object) or write your own function `(entityName: string) => string`. |

### MysqlDialect, OracleDialect, PostgresqlDialect, SqliteDialect, and SqlServerDialect

| Property | Type | Allowed values | Default value | description |
|----------|------|----------------|---------------|-------------|
| `typeBindings` | `Record<EntityPropertyType, TypeScriptType>` | _many_ | See below | Allows to customize the corresponding SQL type for each _ERDiagram_ type |
| `tableNameCaseFormat` | `CaseFormat` | _many_ | See below | Allows to customize the case of the database tables |
| `columnNameCaseFormat` | `CaseFormat` | _many_ | See below | Allows to customize the case of the database columns |

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

| Property | Type | Allowed values | Default value | description |
|----------|------|----------------|---------------|-------------|
| `idNamingStrategy` | `function` | _many_ | `StandardIdNamingStrategies.DEFAULT` | Allows to customize the naming strategy for the identity property of the table. You can use any of the standard values (defined in the `StandardIdNamingStrategies` object) or write your own function `(entityName: string) => string`. |

### JavaClassModelToCodeConverter

| Property | Type | Allowed values | Default value | description |
|----------|------|----------------|---------------|-------------|
| `typeBindings` | `Record<EntityPropertyType, JavaType>` | _many_ | See below | Allows to customize the corresponding Java type for each _ERDiagram_ type |
| `generatedClassesPackage` | <code>string &#124; undefined</code> | _many_ | `undefined` | Allows to define the package name of the generated classes |
| `useValidationAnnotations` | `boolean` | `true`, `false` | `false` | Uses annotations from Java Validation API (JSR-303). Only `@NotNull`, `@NotEmpty`, `@NotBlank` and `@Size` are supported so far. |
| `notNullTextValidationStrategy` | `enum` | `NotNullTextValidationStrategy.NOT_NULL`, `NotNullTextValidationStrategy.NOT_EMPTY`, `NotNullTextValidationStrategy.NOT_BLANK` | `NotNullTextValidationStrategy.NOT_NULL` | Defines which validation strategy (and thus, which JSR-303 annotation &ndash; `@NotNull`, `@NotEmpty` or `@NotBlank`) to use for _not-null_ `text` fields |
| `notNullBlobValidationStrategy` | `enum` | `NotNullBlobValidationStrategy.NOT_NULL`, `NotNullBlobValidationStrategy.NOT_EMPTY` | `NotNullBlobValidationStrategy.NOT_NULL` | Defines which validation strategy (and thus, which JSR-303 annotation &ndash; `@NotNull` or `@NotEmpty`) to use for _not-null_ `blob` fields |

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

### TypeScriptClassModelToCodeConverter

| Property | Type | Allowed values | Default value | description |
|----------|------|----------------|---------------|-------------|
| `typeBindings` | `Record<EntityPropertyType, TypeScriptType>` | _many_ | (see table below) | Allows to customize the corresponding TypeScript type for each _ERDiagram_ type |

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

## Diagram

### NomnomlEntityRelationshipModelToDiagramCodeConverter

_ERDiagram_ allows customizing the values of some Nomnoml directives. You can learn more about those directives in
[Nomnoml's Github repo](https://github.com/skanaar/nomnoml).

Here is the full list of directives that are supported by _ERDiagram_:

| Nomnoml directive | Type | Allowed values | _ERDiagram_ opinionated default value |
|-------------------|------|----------------|---------------------------------------|
| arrowSize | `number` | _many_ | `1` |
| bendSize | `number` | _many_ | `undefined` |
| direction | `string` | `'down'`, `'right'` | `undefined` |
| gutter | `number` | _many_ | `undefined` |
| edgeMargin | `number` | _many_ | `undefined` |
| gravity | `number` | _many_ | `1.5` |
| edges | `string` | `'hard'`, `'rounded'` | `undefined` |
| background | `string` | _many_ | `'transparent'` |
| fill | `string` | _many_ | `'#eef6ff'` |
| fillArrows | `boolean` | _many_ | `undefined` |
| font | `string` | _many_ | `undefined` |
| fontSize | `number` | _many_ | `undefined` |
| leading | `number` | _many_ | `undefined` |
| lineWidth | `number` | _many_ | `1` |
| padding | `number` | _many_ | `undefined` |
| spacing | `number` | _many_ | `undefined` |
| stroke | `string` | _many_ | `'#333333'` |
| title | `string` | _many_ | `undefined` |
| zoom | `number` | _many_ | `undefined` |
| acyclicer | `string` | `'greedy'` | `undefined` |
| ranker | `string` | `'network-simplex'`, `'tight-tree'`, `'longest-path'` | `'longest-path'` |
