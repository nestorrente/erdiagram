# Configuration options

In this page you will find information about the configuration options of the different components of the _ERDiagram_ library.

## Table of contents

* [Entity-relationship model parser](#entity-relationship-model-parser)
* [Database](#database)
    + [Database model](#database-model)
    + [SQL dialects](#sql-dialects)
        + [Type bindings (SQL)](#type-bindings-sql)
        + [Case formats](#case-formats)
* [OOP classes](#oop-classes)
    + [Class model](#class-model)
    + [Java class model](#java-class-model)
        + [Type bindings (Java)](#type-bindings-java)
        + [JPA](#jpa)
        + [Bean Validation](#bean-validation)
        + [Lombok](#lombok)
    + [TypeScript](#typescript)
        + [Type bindings (TypeScript)](#type-bindings-typescript)
* [Diagram](#diagram)
    + [Nomnoml](#nomnoml)
    + [PlantUML](#plantuml)

## Entity-relationship model parser

These are the configuration options corresponding to the `EntityRelationshipModelParserConfig` interface:

| Property               | Type      | Default value | description |
|------------------------|-----------|---------------|-------------|
| `allowUnknownEntities` | `boolean` | `false`       | Allows to define relationships using undefined entities. This is very useful when you are modelling new entities for an existing project and you need to define relationships between the new entities and the existing ones. |

## Database

### Database model

These are the configuration options corresponding to the `DatabaseModelConfig` interface:

| Property              | Type                             | Default value                        | description |
|-----------------------|----------------------------------|--------------------------------------|-------------|
| `usePluralTableNames` | `boolean`                        | `false`                              | When `true`, _ERDiagram_ will name the database tables using the plural of the entities' names. For example, the entity `User` will be modelled using the `Users` table. |
| `idNamingStrategy`    | `(entityName: string) => string` | `StandardIdNamingStrategies.DEFAULT` | Allows to customize the naming strategy for the identity column of the table. You can use any of the standard values (defined in the `StandardIdNamingStrategies` object) or write your own. |

### SQL dialects

These are the configuration options corresponding to the following interfaces:

* `MysqlDialectConfig`
* `OracleDialectConfig`
* `PostgresqlDialectConfig`
* `SqliteDialectConfig`
* `SqlServerDialectConfig`

| Property               | Type                                         | Default value                           | description                                                               |
|------------------------|----------------------------------------------|-----------------------------------------|---------------------------------------------------------------------------|
| `typeBindings`         | `Record<EntityPropertyType, TypeScriptType>` | See [type bindings](#type-bindings-sql) | Allows to customize the corresponding SQL type for each _ERDiagram_ type. |
| `tableNameCaseFormat`  | `CaseFormat`                                 | See [case formats](#case-formats)       | Allows to customize the case of the database tables.                      |
| `columnNameCaseFormat` | `CaseFormat`                                 | See [case formats](#case-formats)       | Allows to customize the case of the database columns.                     |

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

### Class model

These are the configuration options corresponding to the `ClassModelConfig` interface:

| Property           | Type       | Default value                        | description |
|--------------------|------------|--------------------------------------|-------------|
| `idNamingStrategy` | `function` | `StandardIdNamingStrategies.DEFAULT` | Allows to customize the naming strategy for the identity property of the table. You can use any of the standard values (defined in the `StandardIdNamingStrategies` object) or write your own function `(entityName: string) => string`. |

### Java class model

These are the configuration options corresponding to the `JavaClassModelConfig` interface:

| Property                        | Type                                   | Default value                            | description                                                                |
|---------------------------------|----------------------------------------|------------------------------------------|----------------------------------------------------------------------------|
| `typeBindings`                  | `Record<EntityPropertyType, JavaType>` | See [type bindings](#type-bindings-java) | Allows to customize the corresponding Java type for each _ERDiagram_ type. |
| `generatedClassesPackage`       | <code>string &#124; undefined</code>   | `undefined`                              | Allows to define the package name of the generated classes.                |

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

// ... or you can just write the formatted version of the Java type and let ERDiagram parse it for you

// parseJavaType(text: string): JavaType

parseJavaType('long') // long
parseJavaType('java.lang.Long') // Long
parseJavaType('java.util.Map<java.lang.Long, java.util.List<com.example.MyClass>>') // Map<Long, List<MyClass>>
```

#### JPA

| Property                | Type                  | Default value                     | description                                                                                         |
|-------------------------|-----------------------|-----------------------------------|-----------------------------------------------------------------------------------------------------|
| `tableNameCaseFormat`   | `CaseFormat`          | See [case formats](#case-formats) | Allows to customize the case of the database tables.                                                |
| `columnNameCaseFormat`  | `CaseFormat`          | See [case formats](#case-formats) | Allows to customize the case of the database columns.                                               |
| `annotateGetters`       | `boolean`             | `false`                           | Move annotations from fields to its corresponding getter methods.                                   |
| `useExplicitTableName`  | `boolean`             | `false`                           | Add the name of the table using the `@Table(name = "TableName")` annotation.                        |
| `useExplicitColumnName` | `boolean`             | `false`                           | Add the name of the column using the `@Column(name = "columnName")` annotation.                     |
| `javaExtendedPackage`   | `JavaExtendedPackage` | `JavaExtendedPackage.JAKARTA`     | Indicates which Java package must be used for importing the persistence classes (jakarta or javax). |

#### Bean validation

| Property                        | Type                                 | Default value                     | description                                                                                                                                                |
|---------------------------------|--------------------------------------|-----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `notNullTextValidationStrategy` | `enum NotNullTextValidationStrategy` | `NOT_NULL`                        | Defines which validation strategy (and thus, which JSR-303 annotation &ndash; `@NotNull`, `@NotEmpty` or `@NotBlank`) to use for _not-null_ `text` fields. |
| `notNullBlobValidationStrategy` | `enum NotNullBlobValidationStrategy` | `NOT_NULL`                        | Defines which validation strategy (and thus, which JSR-303 annotation &ndash; `@NotNull` or `@NotEmpty`) to use for _not-null_ `blob` fields.              |
| `annotateGetters`               | `boolean`                            | `false`                           | Move annotations from fields to its corresponding getter methods.                                                                                          |
| `javaExtendedPackage`           | `JavaExtendedPackage`                | `JavaExtendedPackage.JAKARTA`     | Indicates which Java package must be used for importing the validation annotations (jakarta or javax).                                                     |

#### Lombok

| Property                      | Type      | Default value | description                                                                             |
|-------------------------------|-----------|---------------|-----------------------------------------------------------------------------------------|
| `builderAnnotation`           | `boolean` | `false`       | Annotates the class with `@Builder`.                                                    |
| `dataAnnotation`              | `boolean` | `false`       | Annotates the class with `@Data` and removes the getters and setters of all the fields. |
| `getterAnnotation`            | `boolean` | `false`       | Annotates the class with `@Data` and removes the getters of all the fields.             |
| `setterAnnotation`            | `boolean` | `false`       | Annotates the class with `@Data` and removes the setters of all the fields.             |
| `toStringAnnotation`          | `boolean` | `false`       | Annotates the class with `@ToString`.                                                   |
| `equalsAndHashCodeAnnotation` | `boolean` | `false`       | Annotates the class with `@EqualsAndHashCode`.                                          |

### TypeScript

These are the configuration options corresponding to the `TypeScriptConfig` interface:

| Property       | Type                                         | Default value                                  | description                                                                      |
|----------------|----------------------------------------------|------------------------------------------------|----------------------------------------------------------------------------------|
| `typeBindings` | `Record<EntityPropertyType, TypeScriptType>` | See [type bindings](#type-bindings-typescript) | Allows to customize the corresponding TypeScript type for each _ERDiagram_ type. |

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

const setOfMyDateType = createTypeScriptParameterizedType('Set', [dateType]); // Set<MyDate>
const mapFromIntegerToMyClassType = createTypeScriptParameterizedType('Map', [numberType, myClassType]) // Map<number, MyClass>

// ... or you can just write the formatted version of the TypeScript type and let ERDiagram parse it for you

// parseTypeScriptType(text: string): TypeScriptType

parseTypeScriptType('boolean') // boolean
parseTypeScriptType('Array<string>') // string[] a.k.a. Array<string>
parseTypeScriptType('Map<number, Date[]>') // Map<number, Date[]> a.k.a. Map<number, Array<Date>>
```

## Diagram

### Nomnoml

These are the configuration options corresponding to the `NomnomlConfig` interface:

| Property       | Type                 | Default value                 | description                                                                                      |
|----------------|----------------------|-------------------------------|--------------------------------------------------------------------------------------------------|
| `diagramLevel` | `enum DiagramLevel`  | `LOGICAL`                     | Allows to customize the detail level of the generated diagram.                                   |
| `style`        | `NomnomlStyleConfig` | See [directives](#directives) | Allows to customize the style of the diagram by defining custom values for Nomnoml's directives. |

#### Directives

As mentioned above, the `style` configuration option can be used to customize the values of some Nomnoml's directives.
You can learn more about those directives in [Nomnoml's Github repo](https://github.com/skanaar/nomnoml).

The full list of supported directives and their default opinionated values is presented below:

| Nomnoml directive | Type                                                                     | _ERDiagram_'s opinionated default value |
|-------------------|--------------------------------------------------------------------------|-----------------------------------------|
| arrowSize         | `number`                                                                 | `1`                                     |
| bendSize          | `number`                                                                 | _Nomnoml's default_                     |
| direction         | <code>'down' &#124; 'right'</code>                                       | _Nomnoml's default_                     |
| gutter            | `number`                                                                 | _Nomnoml's default_                     |
| edgeMargin        | `number`                                                                 | _Nomnoml's default_                     |
| gravity           | `number`                                                                 | `1.5`                                   |
| edges             | <code>'hard' &#124; 'rounded'</code>                                     | _Nomnoml's default_                     |
| background        | `string`                                                                 | `'transparent'`                         |
| fill              | `string`                                                                 | `'#eef6ff'`                             |
| fillArrows        | `boolean`                                                                | _Nomnoml's default_                     |
| font              | `string`                                                                 | _Nomnoml's default_                     |
| fontSize          | `number`                                                                 | _Nomnoml's default_                     |
| leading           | `number`                                                                 | _Nomnoml's default_                     |
| lineWidth         | `number`                                                                 | `1`                                     |
| padding           | `number`                                                                 | _Nomnoml's default_                     |
| spacing           | `number`                                                                 | _Nomnoml's default_                     |
| stroke            | `string`                                                                 | `'#333333'`                             |
| title             | `string`                                                                 | _Nomnoml's default_                     |
| zoom              | `number`                                                                 | _Nomnoml's default_                     |
| acyclicer         | `'greedy'`                                                               | _Nomnoml's default_                     |
| ranker            | <code>'network-simplex' &#124; 'tight-tree' &#124; 'longest-path'</code> | `'longest-path'`                        |

### PlantUML

These are the configuration options corresponding to the `PlantUmlConfig` interface:

| Property       | Type                 | Default value | description                                                    |
|----------------|----------------------|---------------|----------------------------------------------------------------|
| `diagramLevel` | `enum DiagramLevel`  | `LOGICAL`     | Allows to customize the detail level of the generated diagram. |
