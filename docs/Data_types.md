# Data types

In this page you will find information about some data types of the _ERDiagram_ library.

## Table of contents

* [BeanValidationConfig](#beanvalidationconfig)
* [BeanValidationTransformer](#beanvalidationtransformer)
* [CaseFormat](#caseformat)
* [ClassModelConfig](#classmodelconfig)
* [ClassModelGenerator](#classmodelgenerator)
* [DatabaseModelConfig](#databasemodelconfig)
* [DatabaseModelGenerator](#databasemodelgenerator)
* [EntityRelationshipModelParser](#entityrelationshipmodelparser)
* [EntityRelationshipModelParserConfig](#entityrelationshipmodelparserconfig)
* [IdNamingStrategy](#idnamingstrategy)
* [JavaClassModelConfig](#javaclassmodelconfig)
* [JavaClassModelTransformer](#javaclassmodeltransformer)
* [JavaSourceCodeGenerator](#javasourcecodegenerator)
* [JpaConfig](#jpaconfig)
* [JpaTransformer](#jpatransformer)
* [MultipleFileSourceCodeGenerator](#multiplefilesourcecodegenerator)
* [MysqlDialect](#mysqldialect)
* [MysqlDialectConfig](#mysqldialectconfig)
* [NomnomlConfig](#nomnomlconfig)
* [NomnomlSourceCodeGenerator](#nomnomlsourcecodegenerator)
* [NotNullBlobValidationStrategy](#notnullblobvalidationstrategy)
* [NotNullTextValidationStrategy](#notnulltextvalidationstrategy)
* [OracleDialect](#oracledialect)
* [OracleDialectConfig](#oracledialectconfig)
* [PlantUmlSourceCodeGenerator](#plantumlsourcecodegenerator)
* [PostgresqlDialect](#postgresqldialect)
* [PostgresqlDialectConfig](#postgresqldialectconfig)
* [SourceCodeGenerator](#sourcecodegenerator)
* [SourceFileInfo](#sourcefileinfo)
* [SqlDialect](#sqldialect)
* [SqlDialectConfig](#sqldialectconfig)
* [SqlServerDialect](#sqlserverdialect)
* [SqlServerDialectConfig](#sqlserverdialectconfig)
* [SqlSourceCodeGenerator](#sqlsourcecodegenerator)
* [SqliteDialect](#sqlitedialect)
* [SqliteDialectConfig](#sqlitedialectconfig)
* [StandardCaseFormats](#standardcaseformats)
* [StandardIdNamingStrategies](#standardidnamingstrategies)
* [TypeScriptConfig](#typescriptconfig)
* [TypeScriptSourceCodeGenerator](#typescriptsourcecodegenerator)

## BeanValidationConfig

```typescript
interface BeanValidationConfig {
    notNullTextValidationStrategy: NotNullTextValidationStrategy;
    notNullBlobValidationStrategy: NotNullBlobValidationStrategy;
    annotateGetters: boolean;
}
```

| Property                        | Type                                                                   | Default value | description |
|---------------------------------|------------------------------------------------------------------------|---------------|-------------|
| `notNullTextValidationStrategy` | [`enum NotNullTextValidationStrategy`](#notnulltextvalidationstrategy) | `NOT_NULL`    | Defines which validation strategy (and thus, which JSR-303 annotation &ndash; `@NotNull`, `@NotEmpty` or `@NotBlank`) to use for _not-null_ `text` fields |
| `notNullBlobValidationStrategy` | [`enum NotNullBlobValidationStrategy`](#notnullblobvalidationstrategy) | `NOT_NULL`    | Defines which validation strategy (and thus, which JSR-303 annotation &ndash; `@NotNull` or `@NotEmpty`) to use for _not-null_ `blob` fields |
| `annotateGetters`               | `boolean`                                                              | `false`       | Move annotations from fields to its corresponding getter methods. |

## BeanValidationTransformer

```typescript
declare class BeanValidationTransformer implements JavaClassModelTransformer {
    constructor(config?: Partial<BeanValidationConfig>);
}
```

## CaseFormat

interface CaseFormat

## ClassModelConfig

interface ClassModelConfig

## ClassModelGenerator

class ClassModelGenerator

## DatabaseModelConfig

interface DatabaseModelConfig

## DatabaseModelGenerator

class DatabaseModelGenerator

## EntityRelationshipModelParser

class EntityRelationshipModelParser

## EntityRelationshipModelParserConfig

interface EntityRelationshipModelParserConfig

## IdNamingStrategy

type IdNamingStrategy = (entityName: string) => string;

## JavaClassModelConfig

interface JavaClassModelConfig

## JavaClassModelTransformer

interface JavaClassModelTransformer<T = unknown>

## JavaSourceCodeGenerator

class JavaSourceCodeGenerator implements MultipleFileSourceCodeGenerator

## JpaConfig

interface JpaConfig

## JpaTransformer

class JpaTransformer implements JavaClassModelTransformer<JpaTransformerSetupData>

## MultipleFileSourceCodeGenerator

interface MultipleFileSourceCodeGenerator extends SourceCodeGenerator

## MysqlDialect

class MysqlDialect implements SqlDialect

## MysqlDialectConfig

interface MysqlDialectConfig extends SqlDialectConfig

## NomnomlConfig

interface NomnomlConfig

## NomnomlSourceCodeGenerator

class NomnomlSourceCodeGenerator implements SourceCodeGenerator

## NotNullBlobValidationStrategy

enum NotNullBlobValidationStrategy

## NotNullTextValidationStrategy

enum NotNullTextValidationStrategy

## OracleDialect

class OracleDialect implements SqlDialect

## OracleDialectConfig

interface OracleDialectConfig extends SqlDialectConfig

## PlantUmlSourceCodeGenerator

class PlantUmlSourceCodeGenerator implements SourceCodeGenerator

## PostgresqlDialect

class PostgresqlDialect implements SqlDialect

## PostgresqlDialectConfig

interface PostgresqlDialectConfig extends SqlDialectConfig

## SourceCodeGenerator

interface SourceCodeGenerator

## SourceFileInfo

interface SourceFileInfo

## SqlDialect

interface SqlDialect

## SqlDialectConfig

interface SqlDialectConfig

## SqlServerDialect

class SqlServerDialect implements SqlDialect

## SqlServerDialectConfig

interface SqlServerDialectConfig extends SqlDialectConfig

## SqlSourceCodeGenerator

class SqlSourceCodeGenerator implements SourceCodeGenerator

## SqliteDialect

class SqliteDialect implements SqlDialect

## SqliteDialectConfig

interface SqliteDialectConfig extends SqlDialectConfig

## StandardCaseFormats

const StandardCaseFormats

## StandardIdNamingStrategies

const StandardIdNamingStrategies

## TypeScriptConfig

interface TypeScriptConfig

## TypeScriptSourceCodeGenerator

class TypeScriptSourceCodeGenerator implements SourceCodeGenerator
