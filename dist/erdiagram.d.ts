// Generated by dts-bundle-generator v5.8.0

export interface ComponentConfigManager<C, P, S> {
	getDefaultConfig(): C;
	mergeConfigs(fullConfig: C, partialConfig: P): C;
	mergeWithDefaultConfig(partialConfig: P): C;
	cloneConfig(fullConfig: C): C;
	convertToSerializableObject(fullConfig: C): S;
	convertFromSerializableObject(serializableConfig: S): C;
}
export declare abstract class AbstractComponentConfigManager<C, P = Partial<C>, S = C> implements ComponentConfigManager<C, P, S> {
	abstract getDefaultConfig(): C;
	abstract mergeConfigs(fullConfig: C, partialConfig?: P): C;
	mergeWithDefaultConfig(partialConfig?: P): C;
	cloneConfig(fullConfig: C): C;
	abstract convertToSerializableObject(fullConfig: C): S;
	abstract convertFromSerializableObject(serializableConfig: S): C;
}
export interface EntityRelationshipModel {
	entities: EntityDescriptor[];
	relationships: RelationshipDescriptor[];
}
export interface EntityDescriptor {
	name: string;
	identityPropertyName?: string;
	properties: EntityPropertyDescriptor[];
}
export interface EntityPropertyDescriptor {
	name: string;
	optional: boolean;
	unique: boolean;
	type: EntityPropertyType;
	length: number[];
}
export declare enum EntityPropertyType {
	IDENTITY = "identity",
	BOOLEAN = "bool",
	SHORT = "short",
	INT = "int",
	LONG = "long",
	DECIMAL = "decimal",
	TEXT = "text",
	DATE = "date",
	TIME = "time",
	DATETIME = "datetime",
	BLOB = "blob"
}
export interface RelationshipDescriptor {
	leftMember: RelationshipMember;
	rightMember: RelationshipMember;
	direction: Direction;
	relationshipName?: string;
}
export interface RelationshipMember {
	entity: string;
	entityAlias: string;
	cardinality: Cardinality;
}
export declare enum Cardinality {
	MANY = "many",
	ONE = "one",
	ZERO_OR_ONE = "zero_or_one"
}
export declare enum Direction {
	LEFT_TO_RIGHT = "left_to_right",
	RIGHT_TO_LEFT = "right_to_left",
	BIDIRECTIONAL = "bidirectional"
}
export interface EntityRelationshipModelToCodeConverter {
	convertToCode(model: EntityRelationshipModel): string;
}
export interface CaseFormat {
	splitWords(text: string): string[];
	joinWords(words: string[]): string;
}
export declare class CaseConverter {
	private readonly originCaseFormat;
	private readonly targetCaseFormat;
	constructor(originCaseFormat: CaseFormat, targetCaseFormat: CaseFormat);
	convertCase(text: string): string;
}
export declare const StandardCaseFormats: {
	LOWER_CAMEL: CaseFormat;
	UPPER_CAMEL: CaseFormat;
	LOWER_UNDERSCORE: CaseFormat;
	CAPITALIZED_UNDERSCORE: CaseFormat;
	UPPER_UNDERSCORE: CaseFormat;
};
export declare type IdNamingStrategy = (entityName: string) => string;
export declare const StandardIdNamingStrategies: {
	DEFAULT: IdNamingStrategy;
	ENTITY_NAME_PREFIX: IdNamingStrategy;
};
export interface DatabaseModel {
	tables: TableDescriptor[];
}
export interface TableDescriptor {
	name: string;
	identityColumnName: string;
	columns: TableColumnDescriptor[];
	references: TableReferenceDescriptor[];
}
export interface TableColumnDescriptor {
	name: string;
	notNull: boolean;
	unique: boolean;
	type: EntityPropertyType;
	length: number[];
}
export interface TableReferenceDescriptor {
	columnName: string;
	targetTableName: string;
	targetTableIdentityColumnName: string;
	notNull: boolean;
	unique: boolean;
}
export interface DatabaseModelToCodeConverter {
	convertToCode(databaseModel: DatabaseModel): string;
}
export interface DatabaseModelGeneratorConfig {
	usePluralTableNames: boolean;
	idNamingStrategy: IdNamingStrategy;
}
export declare class DatabaseModelGenerator {
	private readonly config;
	constructor(config?: Partial<DatabaseModelGeneratorConfig>);
	generateDatabaseModel(model: EntityRelationshipModel): DatabaseModel;
	private generateEntityTables;
	private generateEntityTable;
	private generateRelationshipTables;
	private generateRelationshipTable;
	private getRelationshipTableName;
	private getRelationshipTableIdentityColumnName;
	private createTableReference;
	private pluralizeEntityNameIfApplies;
	private getIdentityColumnName;
	private mapPropertyToColumn;
	private isManyToManyRelationship;
}
export declare class EntityRelationshipModelToDatabaseCodeConverter implements EntityRelationshipModelToCodeConverter {
	private readonly databaseModelGenerator;
	private readonly databaseModelToCodeConverter;
	constructor(databaseModelGenerator: DatabaseModelGenerator, databaseModelToCodeConverter: DatabaseModelToCodeConverter);
	convertToCode(entityRelationshipModel: EntityRelationshipModel): string;
}
export interface IdColumnCode {
	createSequenceLine?: string;
	columnLine: string;
	pkConstraintLine?: string;
}
export interface RegularColumnCode {
	columnLine: string;
	uniqueConstraintLine?: string;
}
export interface ForeignKeyColumnCode extends RegularColumnCode {
	fkConstraintLine: string;
}
export interface SqlDialect {
	getScriptStartCode(): string;
	getScriptEndCode(): string;
	mustUseAlterTableForForeignKeys(): boolean;
	getCreateTableStartCode(tableName: string): string;
	getIdColumnCode(tableName: string, identityColumnName: string): IdColumnCode;
	getColumnCode(tableName: string, column: TableColumnDescriptor): RegularColumnCode;
	getForeignColumnCode(tableName: string, reference: TableReferenceDescriptor): ForeignKeyColumnCode;
	getCreateTableEndCode(): string;
	getAlterTableAddCode(tableName: string, constraintCode: string): string;
}
export declare class DatabaseModelToSqlCodeConverter implements DatabaseModelToCodeConverter {
	private readonly sqlDialect;
	constructor(sqlDialect: SqlDialect);
	convertToCode(databaseModel: DatabaseModel): string;
	private generateTableCode;
	private processColumns;
	private processReferences;
	private getCreateTableInnerLines;
	private getAlterTableLines;
}
export interface SqlDialectConfig {
	typeBindings: Partial<Record<EntityPropertyType, string>>;
	tableNameCaseFormat: CaseFormat;
	columnNameCaseFormat: CaseFormat;
}
export interface SqlDialectSerializableConfig {
	typeBindings: Partial<Record<EntityPropertyType, string>>;
	tableNameCaseFormat?: string;
	columnNameCaseFormat?: string;
}
export interface MysqlDialectConfig extends SqlDialectConfig {
}
export declare class MysqlDialect implements SqlDialect {
	private readonly tableNameCaseConverter;
	private readonly columnCodeGenerator;
	private readonly idColumnCodeGenerator;
	private readonly foreignColumnCodeGenerator;
	constructor(config?: Partial<MysqlDialectConfig>);
	getScriptStartCode(): string;
	getScriptEndCode(): string;
	mustUseAlterTableForForeignKeys(): boolean;
	getCreateTableStartCode(tableName: string): string;
	getCreateTableEndCode(): string;
	getIdColumnCode(tableName: string, identityColumnName: string): IdColumnCode;
	getColumnCode(tableName: string, column: TableColumnDescriptor): RegularColumnCode;
	getForeignColumnCode(tableName: string, reference: TableReferenceDescriptor): ForeignKeyColumnCode;
	getAlterTableAddCode(tableName: string, constraintCode: string): string;
}
export interface MysqlDialectSerializableConfig extends SqlDialectSerializableConfig {
}
export declare class MysqlDialectConfigManager extends AbstractComponentConfigManager<MysqlDialectConfig, Partial<MysqlDialectConfig>, MysqlDialectSerializableConfig> {
	getDefaultConfig(): MysqlDialectConfig;
	mergeConfigs(fullConfig: MysqlDialectConfig, partialConfig?: Partial<MysqlDialectConfig>): MysqlDialectConfig;
	convertToSerializableObject(fullConfig: MysqlDialectConfig): MysqlDialectSerializableConfig;
	convertFromSerializableObject(serializableConfig: MysqlDialectSerializableConfig): MysqlDialectConfig;
}
export declare const mysqlDialectConfigManager: MysqlDialectConfigManager;
export interface OracleDialectConfig extends SqlDialectConfig {
}
export declare class OracleDialect implements SqlDialect {
	private readonly tableNameCaseConverter;
	private readonly columnCodeGenerator;
	private readonly idColumnCodeGenerator;
	private readonly foreignColumnCodeGenerator;
	constructor(config?: Partial<OracleDialectConfig>);
	getScriptStartCode(): string;
	getScriptEndCode(): string;
	mustUseAlterTableForForeignKeys(): boolean;
	getCreateTableStartCode(tableName: string): string;
	getCreateTableEndCode(): string;
	getIdColumnCode(tableName: string, identityColumnName: string): IdColumnCode;
	getColumnCode(tableName: string, column: TableColumnDescriptor): RegularColumnCode;
	getForeignColumnCode(tableName: string, reference: TableReferenceDescriptor): ForeignKeyColumnCode;
	getAlterTableAddCode(tableName: string, constraintCode: string): string;
}
export interface OracleDialectSerializableConfig extends SqlDialectSerializableConfig {
}
export declare class OracleDialectConfigManager extends AbstractComponentConfigManager<OracleDialectConfig, Partial<OracleDialectConfig>, OracleDialectSerializableConfig> {
	getDefaultConfig(): OracleDialectConfig;
	mergeConfigs(fullConfig: OracleDialectConfig, partialConfig?: Partial<OracleDialectConfig>): OracleDialectConfig;
	convertToSerializableObject(fullConfig: OracleDialectConfig): OracleDialectSerializableConfig;
	convertFromSerializableObject(serializableConfig: OracleDialectSerializableConfig): OracleDialectConfig;
}
export declare const oracleDialectConfigManager: OracleDialectConfigManager;
export interface SqliteDialectConfig extends SqlDialectConfig {
}
export declare class SqliteDialect implements SqlDialect {
	private readonly tableNameCaseConverter;
	private readonly columnCodeGenerator;
	private readonly idColumnCodeGenerator;
	private readonly foreignColumnCodeGenerator;
	constructor(config?: Partial<SqliteDialectConfig>);
	getScriptStartCode(): string;
	getScriptEndCode(): string;
	mustUseAlterTableForForeignKeys(): boolean;
	getCreateTableStartCode(tableName: string): string;
	getCreateTableEndCode(): string;
	getIdColumnCode(tableName: string, identityColumnName: string): IdColumnCode;
	getColumnCode(tableName: string, column: TableColumnDescriptor): RegularColumnCode;
	getForeignColumnCode(tableName: string, reference: TableReferenceDescriptor): ForeignKeyColumnCode;
	getAlterTableAddCode(tableName: string, constraintCode: string): string;
}
export interface SqliteDialectSerializableConfig extends SqlDialectSerializableConfig {
}
export declare class SqliteDialectConfigManager extends AbstractComponentConfigManager<SqliteDialectConfig, Partial<SqliteDialectConfig>, SqliteDialectSerializableConfig> {
	getDefaultConfig(): SqliteDialectConfig;
	mergeConfigs(fullConfig: SqliteDialectConfig, partialConfig?: Partial<SqliteDialectConfig>): SqliteDialectConfig;
	convertToSerializableObject(fullConfig: SqliteDialectConfig): SqliteDialectSerializableConfig;
	convertFromSerializableObject(serializableConfig: SqliteDialectSerializableConfig): SqliteDialectConfig;
}
export declare const sqliteDialectConfigManager: SqliteDialectConfigManager;
export interface SqlServerDialectConfig extends SqlDialectConfig {
}
export declare class SqlServerDialect implements SqlDialect {
	private readonly tableNameCaseConverter;
	private readonly columnCodeGenerator;
	private readonly idColumnCodeGenerator;
	private readonly foreignColumnCodeGenerator;
	constructor(config?: Partial<SqlServerDialectConfig>);
	getScriptStartCode(): string;
	getScriptEndCode(): string;
	mustUseAlterTableForForeignKeys(): boolean;
	getCreateTableStartCode(tableName: string): string;
	getCreateTableEndCode(): string;
	getIdColumnCode(tableName: string, identityColumnName: string): IdColumnCode;
	getColumnCode(tableName: string, column: TableColumnDescriptor): RegularColumnCode;
	getForeignColumnCode(tableName: string, reference: TableReferenceDescriptor): ForeignKeyColumnCode;
	getAlterTableAddCode(tableName: string, constraintCode: string): string;
}
export interface SqlServerDialectSerializableConfig extends SqlDialectSerializableConfig {
}
export declare class SqlServerDialectConfigManager extends AbstractComponentConfigManager<SqlServerDialectConfig, Partial<SqlServerDialectConfig>, SqlServerDialectSerializableConfig> {
	getDefaultConfig(): SqlServerDialectConfig;
	mergeConfigs(fullConfig: SqlServerDialectConfig, partialConfig?: Partial<SqlServerDialectConfig>): SqlServerDialectConfig;
	convertToSerializableObject(fullConfig: SqlServerDialectConfig): SqlServerDialectSerializableConfig;
	convertFromSerializableObject(serializableConfig: SqlServerDialectSerializableConfig): SqlServerDialectConfig;
}
export declare const sqlServerDialectConfigManager: SqlServerDialectConfigManager;
export interface PostgresqlDialectConfig extends SqlDialectConfig {
}
export declare class PostgresqlDialect implements SqlDialect {
	private readonly tableNameCaseConverter;
	private readonly columnCodeGenerator;
	private readonly idColumnCodeGenerator;
	private readonly foreignColumnCodeGenerator;
	constructor(config?: Partial<PostgresqlDialectConfig>);
	getScriptStartCode(): string;
	getScriptEndCode(): string;
	mustUseAlterTableForForeignKeys(): boolean;
	getCreateTableStartCode(tableName: string): string;
	getCreateTableEndCode(): string;
	getIdColumnCode(tableName: string, identityColumnName: string): IdColumnCode;
	getColumnCode(tableName: string, column: TableColumnDescriptor): RegularColumnCode;
	getForeignColumnCode(tableName: string, reference: TableReferenceDescriptor): ForeignKeyColumnCode;
	getAlterTableAddCode(tableName: string, constraintCode: string): string;
}
export interface PostgresqlDialectSerializableConfig extends SqlDialectSerializableConfig {
}
export declare class PostgresqlDialectConfigManager extends AbstractComponentConfigManager<PostgresqlDialectConfig, Partial<PostgresqlDialectConfig>, PostgresqlDialectSerializableConfig> {
	getDefaultConfig(): PostgresqlDialectConfig;
	mergeConfigs(fullConfig: PostgresqlDialectConfig, partialConfig?: Partial<PostgresqlDialectConfig>): PostgresqlDialectConfig;
	convertToSerializableObject(fullConfig: PostgresqlDialectConfig): PostgresqlDialectSerializableConfig;
	convertFromSerializableObject(serializableConfig: PostgresqlDialectSerializableConfig): PostgresqlDialectConfig;
}
export declare const postgresqlDialectConfigManager: PostgresqlDialectConfigManager;
export interface DatabaseModelGeneratorSerializableConfig {
	usePluralTableNames: boolean;
	idNamingStrategy?: string;
}
export declare class DatabaseModelGeneratorConfigManager extends AbstractComponentConfigManager<DatabaseModelGeneratorConfig, Partial<DatabaseModelGeneratorConfig>, DatabaseModelGeneratorSerializableConfig> {
	getDefaultConfig(): DatabaseModelGeneratorConfig;
	mergeConfigs(fullConfig: DatabaseModelGeneratorConfig, partialConfig?: Partial<DatabaseModelGeneratorConfig>): DatabaseModelGeneratorConfig;
	convertToSerializableObject(fullConfig: DatabaseModelGeneratorConfig): DatabaseModelGeneratorSerializableConfig;
	convertFromSerializableObject(serializableConfig: DatabaseModelGeneratorSerializableConfig): DatabaseModelGeneratorConfig;
}
export declare const databaseModelGeneratorConfigManager: DatabaseModelGeneratorConfigManager;
export interface ClassModelToCodeConverterConfig<T> {
	typeBindings: Partial<Record<EntityPropertyType, T>>;
}
export interface ClassModelToCodeConverterSerializableConfig {
	typeBindings: Record<EntityPropertyType, string>;
}
export interface ClassModel {
	classes: ClassDescriptor[];
}
export interface ClassDescriptor {
	name: string;
	fields: ClassFieldDescriptor[];
}
export interface ClassFieldDescriptor {
	name: string;
	nullable: boolean;
	list: boolean;
	maxSize?: number;
	primitiveType?: EntityPropertyType;
	entityType?: string;
}
export interface ClassModelToCodeConverter {
	convertToCode(classModel: ClassModel): string;
}
export interface ClassModelGeneratorConfig {
	idNamingStrategy: IdNamingStrategy;
}
export declare class ClassModelGenerator {
	private readonly config;
	private readonly entityToClassMapper;
	constructor(config?: Partial<ClassModelGeneratorConfig>);
	generateClassModel(model: EntityRelationshipModel): ClassModel;
}
export declare class EntityRelationshipModelToClassCodeConverter implements EntityRelationshipModelToCodeConverter {
	private readonly classModelGenerator;
	private readonly classModelToCodeConverter;
	constructor(classModelGenerator: ClassModelGenerator, classModelToCodeConverter: ClassModelToCodeConverter);
	convertToCode(entityRelationshipModel: EntityRelationshipModel): string;
}
export interface JavaType {
	packageName?: string;
	name: string;
	canonicalName: string;
	formatSimple(): string;
	formatCanonical(): string;
}
export declare function createJavaType(name: string, packageName?: string): JavaType;
export interface JavaParameterizedType extends JavaType {
	parameterTypes: JavaType[];
}
export declare function createJavaParameterizedType(name: string, packageName: string | undefined, parameterTypes: JavaType[]): JavaParameterizedType;
export declare function createJavaArrayType(parameterType: JavaType): JavaParameterizedType;
export declare function isJavaParameterizedType(javaType: JavaType): javaType is JavaParameterizedType;
export function parseJavaType(text: string): JavaType;
export declare enum NotNullTextValidationStrategy {
	NOT_NULL = "not_null",
	NOT_EMPTY = "not_empty",
	NOT_BLANK = "not_blank"
}
export declare enum NotNullBlobValidationStrategy {
	NOT_NULL = "not_null",
	NOT_EMPTY = "not_empty"
}
export interface JavaClassModelToCodeConverterConfig extends ClassModelToCodeConverterConfig<JavaType> {
	generatedClassesPackage?: string;
	useValidationAnnotations: boolean;
	notNullTextValidationStrategy: NotNullTextValidationStrategy;
	notNullBlobValidationStrategy: NotNullBlobValidationStrategy;
}
export declare class JavaClassModelToCodeConverter implements ClassModelToCodeConverter {
	private readonly config;
	private readonly typeResolver;
	private readonly validationAnnotationsGenerator;
	private readonly importStatementsGenerator;
	constructor(config?: Partial<JavaClassModelToCodeConverterConfig>);
	convertToCode(classModel: ClassModel): string;
	private generateClass;
	private createField;
	private addValidationAnnotationsIfApply;
}
export interface JavaClassModelToCodeConverterSerializableConfig extends ClassModelToCodeConverterSerializableConfig {
	generatedClassesPackage?: string;
	useValidationAnnotations: boolean;
	notNullTextValidationStrategy: NotNullTextValidationStrategy;
	notNullBlobValidationStrategy: NotNullBlobValidationStrategy;
}
export declare class JavaClassModelToCodeConverterConfigManager extends AbstractComponentConfigManager<JavaClassModelToCodeConverterConfig, Partial<JavaClassModelToCodeConverterConfig>, JavaClassModelToCodeConverterSerializableConfig> {
	getDefaultConfig(): JavaClassModelToCodeConverterConfig;
	mergeConfigs(fullConfig: JavaClassModelToCodeConverterConfig, partialConfig?: Partial<JavaClassModelToCodeConverterConfig>): JavaClassModelToCodeConverterConfig;
	convertToSerializableObject(fullConfig: JavaClassModelToCodeConverterConfig): JavaClassModelToCodeConverterSerializableConfig;
	convertFromSerializableObject(serializableConfig: JavaClassModelToCodeConverterSerializableConfig): JavaClassModelToCodeConverterConfig;
}
export declare const javaClassModelToCodeConverterConfigManager: JavaClassModelToCodeConverterConfigManager;
export interface TypeScriptType {
	name: string;
	format(): string;
}
export declare function createTypeScriptType(name: string): TypeScriptType;
export interface TypeScriptParameterizedType extends TypeScriptType {
	parameterTypes: TypeScriptType[];
}
export declare function createTypeScriptParameterizedType(name: string, parameterTypes: TypeScriptType[]): TypeScriptParameterizedType;
export declare function createTypeScriptArrayType(parameterType: TypeScriptType): TypeScriptParameterizedType;
export declare function isTypeScriptParameterizedType(javaType: TypeScriptType): javaType is TypeScriptParameterizedType;
export function parseTypeScriptType(text: string): TypeScriptType;
export interface TypeScriptClassModelToCodeConverterConfig extends ClassModelToCodeConverterConfig<TypeScriptType> {
}
export declare class TypeScriptClassModelToCodeConverter implements ClassModelToCodeConverter {
	private readonly config;
	private readonly typeResolver;
	constructor(config?: Partial<TypeScriptClassModelToCodeConverterConfig>);
	convertToCode(classModel: ClassModel): string;
	private generateClass;
	private createField;
}
export interface TypeScriptClassModelToCodeConverterSerializableConfig extends ClassModelToCodeConverterSerializableConfig {
}
export declare class TypeScriptClassModelToCodeConverterConfigManager extends AbstractComponentConfigManager<TypeScriptClassModelToCodeConverterConfig, Partial<TypeScriptClassModelToCodeConverterConfig>, TypeScriptClassModelToCodeConverterSerializableConfig> {
	getDefaultConfig(): TypeScriptClassModelToCodeConverterConfig;
	mergeConfigs(fullConfig: TypeScriptClassModelToCodeConverterConfig, partialConfig?: Partial<TypeScriptClassModelToCodeConverterConfig>): TypeScriptClassModelToCodeConverterConfig;
	convertToSerializableObject(fullConfig: TypeScriptClassModelToCodeConverterConfig): TypeScriptClassModelToCodeConverterSerializableConfig;
	convertFromSerializableObject(serializableConfig: TypeScriptClassModelToCodeConverterSerializableConfig): TypeScriptClassModelToCodeConverterConfig;
}
export declare const typescriptClassModelToCodeConverterConfigManager: TypeScriptClassModelToCodeConverterConfigManager;
export interface ClassModelGeneratorSerializableConfig {
	idNamingStrategy?: string;
}
export declare class ClassModelGeneratorConfigManager extends AbstractComponentConfigManager<ClassModelGeneratorConfig, Partial<ClassModelGeneratorConfig>, ClassModelGeneratorSerializableConfig> {
	getDefaultConfig(): ClassModelGeneratorConfig;
	mergeConfigs(fullConfig: ClassModelGeneratorConfig, partialConfig?: Partial<ClassModelGeneratorConfig>): ClassModelGeneratorConfig;
	convertToSerializableObject(fullConfig: ClassModelGeneratorConfig): ClassModelGeneratorSerializableConfig;
	convertFromSerializableObject(serializableConfig: ClassModelGeneratorSerializableConfig): ClassModelGeneratorConfig;
}
export declare const classModelGeneratorConfigManager: ClassModelGeneratorConfigManager;
export interface NomnomlEntityRelationshipModelToDiagramCodeConverterConfig {
	arrowSize?: number;
	bendSize?: number;
	direction?: "down" | "right";
	gutter?: number;
	edgeMargin?: number;
	gravity?: number;
	edges?: "hard" | "rounded";
	background?: string;
	fill?: string;
	fillArrows?: boolean;
	font?: string;
	fontSize?: number;
	leading?: number;
	lineWidth?: number;
	padding?: number;
	spacing?: number;
	stroke?: string;
	title?: string;
	zoom?: number;
	acyclicer?: "greedy";
	ranker?: "network-simplex" | "tight-tree" | "longest-path";
}
export declare class NomnomlEntityRelationshipModelToDiagramCodeConverter implements EntityRelationshipModelToCodeConverter {
	private readonly config;
	private readonly entityCodeGenerator;
	private readonly relationshipCodeGenerator;
	private readonly directivesCodeGenerator;
	constructor(config?: Partial<NomnomlEntityRelationshipModelToDiagramCodeConverterConfig>);
	convertToCode(model: EntityRelationshipModel): string;
}
export declare type NomnomlEntityRelationshipModelToDiagramCodeConverterSerializableConfig = NomnomlEntityRelationshipModelToDiagramCodeConverterConfig;
export declare class NomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager extends AbstractComponentConfigManager<NomnomlEntityRelationshipModelToDiagramCodeConverterConfig, NomnomlEntityRelationshipModelToDiagramCodeConverterConfig, NomnomlEntityRelationshipModelToDiagramCodeConverterSerializableConfig> {
	getDefaultConfig(): NomnomlEntityRelationshipModelToDiagramCodeConverterConfig;
	mergeConfigs(fullConfig: NomnomlEntityRelationshipModelToDiagramCodeConverterConfig, partialConfig?: Partial<NomnomlEntityRelationshipModelToDiagramCodeConverterConfig>): NomnomlEntityRelationshipModelToDiagramCodeConverterConfig;
	convertToSerializableObject(fullConfig: NomnomlEntityRelationshipModelToDiagramCodeConverterConfig): NomnomlEntityRelationshipModelToDiagramCodeConverterSerializableConfig;
	convertFromSerializableObject(serializableConfig: NomnomlEntityRelationshipModelToDiagramCodeConverterSerializableConfig): NomnomlEntityRelationshipModelToDiagramCodeConverterConfig;
}
export declare const nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager: NomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager;
export declare class PlantUmlEntityRelationshipModelToDiagramCodeConverter implements EntityRelationshipModelToCodeConverter {
	private readonly entityCodeGenerator;
	private readonly relationshipCodeGenerator;
	convertToCode(model: EntityRelationshipModel): string;
}
export interface EntityRelationshipModelParserConfig {
	allowUnknownEntities: boolean;
}
export declare class EntityRelationshipModelParser {
	private readonly config;
	private readonly entityRelationshipModelParserWithoutValidation;
	private readonly validator;
	private readonly parsedModelToPublicModelConverter;
	constructor(config?: Partial<EntityRelationshipModelParserConfig>);
	parseModel(code: string): EntityRelationshipModel;
}
export interface EntityRelationshipModelParserSerializableConfig {
	allowUnknownEntities: boolean;
}
export declare class EntityRelationshipModelParserConfigManager extends AbstractComponentConfigManager<EntityRelationshipModelParserConfig, Partial<EntityRelationshipModelParserConfig>, EntityRelationshipModelParserSerializableConfig> {
	getDefaultConfig(): EntityRelationshipModelParserConfig;
	mergeConfigs(fullConfig: EntityRelationshipModelParserConfig, partialConfig?: Partial<EntityRelationshipModelParserConfig>): EntityRelationshipModelParserConfig;
	convertToSerializableObject(fullConfig: EntityRelationshipModelParserConfig): EntityRelationshipModelParserSerializableConfig;
	convertFromSerializableObject(serializableConfig: EntityRelationshipModelParserSerializableConfig): EntityRelationshipModelParserConfig;
}
export declare const entityRelationshipModelParserConfigManager: EntityRelationshipModelParserConfigManager;
export interface ParsedEntityDescriptor {
	name: string;
	properties: ParsedEntityPropertyDescriptor[];
}
export interface ParsedEntityPropertyDescriptor {
	name: string;
	optional: boolean;
	unique: boolean;
	type: EntityPropertyType;
	length: number[];
}
export interface ParsedRelationshipDescriptor {
	leftMember: RelationshipMember;
	rightMember: RelationshipMember;
	direction: Direction;
	relationshipName?: string;
}
export declare class ERDiagramError extends Error {
}
export declare class ERDiagramParseLineError extends ERDiagramError {
	private readonly cause;
	readonly lineIndex: number;
	constructor(cause: ERDiagramError, lineIndex: number);
	get lineNumber(): number;
}
export declare class ERDiagramSyntaxError extends ERDiagramError {
}
export declare class ERDiagramUnknownTypeError extends ERDiagramError {
}
export declare class ERDiagramRelationshipError extends ERDiagramError {
	readonly relationship: ParsedRelationshipDescriptor;
	constructor(message: string, relationship: ParsedRelationshipDescriptor);
}
export declare class ERDiagramUnknownEntityError extends ERDiagramRelationshipError {
	readonly member: RelationshipMember;
	constructor(message: string, relationship: ParsedRelationshipDescriptor, member: RelationshipMember);
}
export declare class ERDiagramEntityError extends ERDiagramError {
	readonly entity: ParsedEntityDescriptor;
	constructor(message: string, entity: ParsedEntityDescriptor);
}
export declare class ERDiagramDuplicatedEntityNameError extends ERDiagramEntityError {
}
export declare class ERDiagramEntityPropertyError extends ERDiagramEntityError {
	readonly property: ParsedEntityPropertyDescriptor;
	constructor(message: string, entity: ParsedEntityDescriptor, property: ParsedEntityPropertyDescriptor);
}
export declare class ERDiagramMultipleIdentitiesError extends ERDiagramEntityPropertyError {
	readonly identityProperties: ParsedEntityPropertyDescriptor[];
	constructor(message: string, entity: ParsedEntityDescriptor, identityProperties: ParsedEntityPropertyDescriptor[]);
}
export declare class ERDiagramInvalidIdentityDefinitionError extends ERDiagramEntityPropertyError {
}
export declare class ERDiagramDuplicatedPropertyNameError extends ERDiagramEntityPropertyError {
}

export {};
