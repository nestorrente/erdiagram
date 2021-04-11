## EntityRelationshipModelParser

| Property | Type | Allowed values | Default value | description |
|----------|------|----------------|---------------|-------------|
| `allowUnknownEntities` | `boolean` | `true`, `false` | `false` | Allows to define relationships using undefined entities. This is very useful when you are modelling new entities for an existing project and you need to define relationships between the new entities and the existing ones. |

## DatabaseModelGenerator

| Property | Type | Allowed values | Default value | description |
|----------|------|----------------|---------------|-------------|
| `usePluralTableNames` | `boolean` | `true`, `false` | `false` | When `true`, _ERDiagram_ will name the database tables using the plural of the entities' names. For example, the entity `User` will be modelled using the `Users` table. |
| `idNamingStrategy` | `function` | _many_ | `StandardIdNamingStrategies.DEFAULT` | Allows to customize the naming strategy for the identity column of the table. You can use any of the standard values (defined in the `StandardIdNamingStrategies` object) or write your own function `(entityName: string) => string`. |

## ClassModelGenerator

| Property | Type | Allowed values | Default value | description |
|----------|------|----------------|---------------|-------------|
| `idNamingStrategy` | `function` | _many_ | `StandardIdNamingStrategies.DEFAULT` | Allows to customize the naming strategy for the identity property of the table. You can use any of the standard values (defined in the `StandardIdNamingStrategies` object) or write your own function `(entityName: string) => string`. |

## JavaClassModelToCodeConverter

| Property | Type | Allowed values | Default value | description |
|----------|------|----------------|---------------|-------------|
| `typeBindings` | `Record<EntityPropertyType, JavaType>` | _many_ | See below | Allows to customize the corresponding Java type for each _ERDiagram_ type |
| `generatedClassesPackage` | <code>string &#124; undefined</code> | _many_ | `undefined` | Allows to define the package name of the generated classes |
| `useValidationAnnotations` | `boolean` | `true`, `false` | `false` | Uses annotations from Java Validation API (JSR-303). Only `@NotNull`, `@NotEmpty`, `@NotBlank` and `@Size` are supported so far. |
| `notNullTextValidationStrategy` | `enum` | `not_null` (`NotNullTextValidationStrategy.NOT_NULL`), `not_empty` (`NotNullTextValidationStrategy.NOT_EMPTY`), `not_blank` (`NotNullTextValidationStrategy.NOT_BLANK`) | `not_null` | Defines which validation strategy (and thus, which JSR-303 annotation) to use for _not-null_ `text` fields |
| `notNullBlobValidationStrategy` | `enum` | `not_null` (`NotNullBlobValidationStrategy.NOT_NULL`), `not_empty` (`NotNullBlobValidationStrategy.NOT_EMPTY`) | `not_null` | Defines which validation strategy (and thus, which JSR-303 annotation) to use for _not-null_ `blob` fields |

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

## TypeScriptClassModelToCodeConverter

| Property | Type | Allowed values | Default value | description |
|----------|------|----------------|---------------|-------------|
| `typeBindings` | `Record<EntityPropertyType, TypeScriptType>` | _many_ | See below | Allows to customize the corresponding TypeScript type for each _ERDiagram_ type |

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

## TODO

* NomnomlEntityRelationshipModelToDiagramCodeConverter
* SqlDialect (MySQL, SQLite, SQL Server, PostgreSQL and Oracle DB).
