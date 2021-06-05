// Generated by dts-bundle-generator v5.9.0

import { JsonAdapter, JsonValue } from 'true-json';

export interface ConfigManager<C, P> {
	getDefaultConfig(): C;
	mergeConfigs(fullConfig: C, partialConfig: P): C;
	mergeWithDefaultConfig(partialConfig: P): C;
	convertToSerializableObject(fullConfig: C): JsonValue;
	convertFromSerializableObject(serializableConfig: JsonValue): C;
}
export declare abstract class AbstractConfigManager<C, P = Partial<C>> implements ConfigManager<C, P> {
	private readonly _jsonAdapter;
	constructor();
	abstract getDefaultConfig(): C;
	abstract mergeConfigs(fullConfig: C, partialConfig?: P): C;
	mergeWithDefaultConfig(partialConfig?: P): C;
	convertToSerializableObject(fullConfig: C): JsonValue;
	convertFromSerializableObject(serializableConfig: JsonValue): C;
	protected getJsonAdapter(): JsonAdapter<C>;
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
export interface SourceCodeGenerator {
	generateSourceCode(model: EntityRelationshipModel): string;
}
export interface SourceFileInfo {
	folder: string[];
	filename: string;
	contents: string;
}
export interface MultipleFileSourceCodeGenerator extends SourceCodeGenerator {
	generateSourceFiles(model: EntityRelationshipModel): SourceFileInfo[];
}
export declare function isMultipleFileSourceCodeGenerator(generator: SourceCodeGenerator): generator is MultipleFileSourceCodeGenerator;
export interface CaseFormat {
	splitWords(text: string): string[];
	joinWords(words: string[]): string;
}
export declare class CaseConverter {
	private readonly sourceCaseFormat;
	private readonly targetCaseFormat;
	constructor(sourceCaseFormat: CaseFormat, targetCaseFormat: CaseFormat);
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
declare enum SourceType {
	ENTITY_RELATIONSHIP_MODEL = "entity_relationship_model",
	ENTITY = "entity",
	ENTITY_IDENTITY = "entity_identity",
	ENTITY_PROPERTY = "entity_property",
	RELATIONSHIP = "relationship",
	RELATIONSHIP_MEMBER = "relationship_member"
}
export interface SourceMetadata<T extends SourceType = SourceType> {
	readonly sourceType: T;
}
export interface EntitySourceMetadata extends SourceMetadata<SourceType.ENTITY> {
	entity: EntityDescriptor;
}
export interface EntityIdentitySourceMetadata extends SourceMetadata<SourceType.ENTITY_IDENTITY> {
	entity: EntityDescriptor;
}
export interface EntityPropertySourceMetadata extends SourceMetadata<SourceType.ENTITY_PROPERTY> {
	entity: EntityDescriptor;
	property: EntityPropertyDescriptor;
}
export interface RelationshipSourceMetadata extends SourceMetadata<SourceType.RELATIONSHIP> {
	relationship: RelationshipDescriptor;
}
export interface RelationshipMemberSourceMetadata extends SourceMetadata<SourceType.RELATIONSHIP_MEMBER> {
	relationship: RelationshipDescriptor;
	referencedMember: RelationshipMember;
}
export interface DatabaseModel {
	tables: TableDescriptor[];
}
export interface TableDescriptor {
	name: string;
	identityColumnName: string;
	columns: TableColumnDescriptor[];
	references: TableReferenceDescriptor[];
	sourceMetadata: EntitySourceMetadata | RelationshipSourceMetadata;
}
export interface TableColumnDescriptor {
	name: string;
	notNull: boolean;
	unique: boolean;
	type: EntityPropertyType;
	length: number[];
	sourceMetadata: EntityPropertySourceMetadata;
}
export interface TableReferenceDescriptor {
	columnName: string;
	targetTableName: string;
	targetTableIdentityColumnName: string;
	notNull: boolean;
	unique: boolean;
	sourceMetadata: RelationshipMemberSourceMetadata;
}
export interface DatabaseModelConfig {
	usePluralTableNames: boolean;
	idNamingStrategy: IdNamingStrategy;
}
export declare type PartialDatabaseModelConfig = Partial<DatabaseModelConfig>;
export declare class DatabaseModelGenerator {
	private readonly config;
	constructor(config?: PartialDatabaseModelConfig);
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
export declare class DatabaseModelToSqlCodeConverter {
	private readonly sqlDialect;
	constructor(sqlDialect: SqlDialect);
	convertToCode(databaseModel: DatabaseModel): string;
	private generateTableCode;
	private processColumns;
	private processReferences;
	private getCreateTableInnerLines;
	private getAlterTableLines;
}
export declare class SqlSourceCodeGeneratorBuilder {
	private _databaseModelConfig;
	private _sqlDialect?;
	configureDatabaseModel(config: PartialDatabaseModelConfig): this;
	useDialect(sqlDialect: SqlDialect): this;
	build(): SqlSourceCodeGenerator;
}
export declare class SqlSourceCodeGenerator implements SourceCodeGenerator {
	private readonly databaseModelGenerator;
	private readonly databaseModelToSqlCodeConverter;
	constructor(databaseModelGenerator: DatabaseModelGenerator, databaseModelToSqlCodeConverter: DatabaseModelToSqlCodeConverter);
	generateSourceCode(entityRelationshipModel: EntityRelationshipModel): string;
	static withDefaultConfig(sqlDialect: SqlDialect): SqlSourceCodeGenerator;
	static builder(): SqlSourceCodeGeneratorBuilder;
}
export interface SqlDialectConfig {
	typeBindings: Record<EntityPropertyType, string>;
	tableNameCaseFormat: CaseFormat;
	columnNameCaseFormat: CaseFormat;
}
export declare type WithPartial<T, K extends keyof T> = Omit<T, K> & {
	[P in K]: Partial<T[P]>;
};
export interface MysqlDialectConfig extends SqlDialectConfig {
}
export declare type PartialMysqlDialectConfig = Partial<WithPartial<MysqlDialectConfig, "typeBindings">>;
export declare class MysqlDialect implements SqlDialect {
	private readonly tableNameCaseConverter;
	private readonly columnCodeGenerator;
	private readonly idColumnCodeGenerator;
	private readonly foreignColumnCodeGenerator;
	constructor(config?: PartialMysqlDialectConfig);
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
export declare class MysqlDialectConfigManager extends AbstractConfigManager<MysqlDialectConfig, PartialMysqlDialectConfig> {
	getDefaultConfig(): MysqlDialectConfig;
	mergeConfigs(fullConfig: MysqlDialectConfig, partialConfig?: PartialMysqlDialectConfig): MysqlDialectConfig;
	protected getJsonAdapter(): JsonAdapter<MysqlDialectConfig>;
}
export declare const mysqlDialectConfigManager: MysqlDialectConfigManager;
export interface OracleDialectConfig extends SqlDialectConfig {
}
export declare type PartialOracleDialectConfig = Partial<WithPartial<OracleDialectConfig, "typeBindings">>;
export declare class OracleDialect implements SqlDialect {
	private readonly tableNameCaseConverter;
	private readonly columnCodeGenerator;
	private readonly idColumnCodeGenerator;
	private readonly foreignColumnCodeGenerator;
	constructor(config?: PartialOracleDialectConfig);
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
export declare class OracleDialectConfigManager extends AbstractConfigManager<OracleDialectConfig, PartialOracleDialectConfig> {
	getDefaultConfig(): OracleDialectConfig;
	mergeConfigs(fullConfig: OracleDialectConfig, partialConfig?: PartialOracleDialectConfig): OracleDialectConfig;
	protected getJsonAdapter(): JsonAdapter<OracleDialectConfig>;
}
export declare const oracleDialectConfigManager: OracleDialectConfigManager;
export interface SqliteDialectConfig extends SqlDialectConfig {
}
export declare type PartialSqliteDialectConfig = Partial<WithPartial<SqliteDialectConfig, "typeBindings">>;
export declare class SqliteDialect implements SqlDialect {
	private readonly tableNameCaseConverter;
	private readonly columnCodeGenerator;
	private readonly idColumnCodeGenerator;
	private readonly foreignColumnCodeGenerator;
	constructor(config?: PartialSqliteDialectConfig);
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
export declare class SqliteDialectConfigManager extends AbstractConfigManager<SqliteDialectConfig, PartialSqliteDialectConfig> {
	getDefaultConfig(): SqliteDialectConfig;
	mergeConfigs(fullConfig: SqliteDialectConfig, partialConfig?: PartialSqliteDialectConfig): SqliteDialectConfig;
	protected getJsonAdapter(): JsonAdapter<SqliteDialectConfig>;
}
export declare const sqliteDialectConfigManager: SqliteDialectConfigManager;
export interface SqlServerDialectConfig extends SqlDialectConfig {
}
export declare type PartialSqlServerDialectConfig = Partial<WithPartial<SqlServerDialectConfig, "typeBindings">>;
export declare class SqlServerDialect implements SqlDialect {
	private readonly tableNameCaseConverter;
	private readonly columnCodeGenerator;
	private readonly idColumnCodeGenerator;
	private readonly foreignColumnCodeGenerator;
	constructor(config?: PartialSqlServerDialectConfig);
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
export declare class SqlServerDialectConfigManager extends AbstractConfigManager<SqlServerDialectConfig, PartialSqlServerDialectConfig> {
	getDefaultConfig(): SqlServerDialectConfig;
	mergeConfigs(fullConfig: SqlServerDialectConfig, partialConfig?: PartialSqlServerDialectConfig): SqlServerDialectConfig;
	protected getJsonAdapter(): JsonAdapter<SqlServerDialectConfig>;
}
export declare const sqlServerDialectConfigManager: SqlServerDialectConfigManager;
export interface PostgresqlDialectConfig extends SqlDialectConfig {
}
export declare type PartialPostgresqlDialectConfig = Partial<WithPartial<PostgresqlDialectConfig, "typeBindings">>;
export declare class PostgresqlDialect implements SqlDialect {
	private readonly tableNameCaseConverter;
	private readonly columnCodeGenerator;
	private readonly idColumnCodeGenerator;
	private readonly foreignColumnCodeGenerator;
	constructor(config?: PartialPostgresqlDialectConfig);
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
export declare class PostgresqlDialectConfigManager extends AbstractConfigManager<PostgresqlDialectConfig, PartialPostgresqlDialectConfig> {
	getDefaultConfig(): PostgresqlDialectConfig;
	mergeConfigs(fullConfig: PostgresqlDialectConfig, partialConfig?: PartialPostgresqlDialectConfig): PostgresqlDialectConfig;
	protected getJsonAdapter(): JsonAdapter<PostgresqlDialectConfig>;
}
export declare const postgresqlDialectConfigManager: PostgresqlDialectConfigManager;
export declare class DatabaseModelConfigManager extends AbstractConfigManager<DatabaseModelConfig, PartialDatabaseModelConfig> {
	getDefaultConfig(): DatabaseModelConfig;
	mergeConfigs(fullConfig: DatabaseModelConfig, partialConfig?: PartialDatabaseModelConfig): DatabaseModelConfig;
	protected getJsonAdapter(): JsonAdapter<DatabaseModelConfig>;
}
export declare const databaseModelConfigManager: DatabaseModelConfigManager;
export interface ClassModel {
	classes: ClassDescriptor[];
}
export interface ClassDescriptor {
	name: string;
	fields: ClassFieldDescriptor[];
	sourceMetadata: EntitySourceMetadata;
}
export interface ClassFieldDescriptor {
	name: string;
	nullable: boolean;
	list: boolean;
	maxSize?: number;
	primitiveType?: EntityPropertyType;
	entityType?: string;
	sourceMetadata: EntityIdentitySourceMetadata | EntityPropertySourceMetadata | RelationshipMemberSourceMetadata;
}
export interface ClassModelConfig {
	idNamingStrategy: IdNamingStrategy;
}
export declare type PartialClassModelConfig = Partial<ClassModelConfig>;
export declare class ClassModelGenerator {
	private readonly config;
	private readonly entityToClassMapper;
	constructor(config?: PartialClassModelConfig);
	generateClassModel(model: EntityRelationshipModel): ClassModel;
}
export interface JavaType {
	readonly packageName?: string;
	readonly name: string;
	readonly canonicalName: string;
	formatSimple(): string;
	formatCanonical(): string;
}
export declare type JavaAnnotationParameterValue = JavaAnnotationParameterSingleValue | JavaAnnotationParameterSingleValue[];
export declare type JavaAnnotationParameterSingleValue = number | boolean | string | RawAnnotationParameterValue | JavaAnnotation;
declare const RAW_ANNOTATION_PARAMETER_VALUE_SYMBOL: unique symbol;
export interface RawAnnotationParameterValue {
	[RAW_ANNOTATION_PARAMETER_VALUE_SYMBOL]: true;
	code: string;
	usedTypes: JavaType[];
}
declare function createRawParameterValue(code: string, ...usedTypes: JavaType[]): RawAnnotationParameterValue;
declare function isRawParameterValue(value: JavaAnnotationParameterValue): value is RawAnnotationParameterValue;
export declare type JavaAnnotationParametersRecord = Record<string, JavaAnnotationParameterValue | undefined>;
export declare class JavaAnnotation {
	private readonly _type;
	private readonly _parameters;
	constructor(annotationType: JavaType, parameters?: JavaAnnotationParametersRecord);
	get type(): JavaType;
	get parameters(): JavaAnnotationParametersRecord;
	format(): string;
	static createRawParameterValue: typeof createRawParameterValue;
	static isRawParameterValue: typeof isRawParameterValue;
}
export interface JavaClassModel {
	classes: JavaClass[];
}
export interface JavaAnnotatedElement {
	annotations: JavaAnnotation[];
}
export interface JavaAccessibleElement {
	visibility: JavaVisibility;
}
export declare enum JavaVisibility {
	PRIVATE = "private",
	PROTECTED = "protected",
	PUBLIC = "public",
	PACKAGE_PRIVATE = "package-private"
}
export interface JavaClass extends JavaAnnotatedElement, JavaAccessibleElement {
	packageName?: string;
	name: string;
	fields: JavaField[];
}
export interface JavaField extends JavaAnnotatedElement, JavaAccessibleElement {
	name: string;
	type: JavaType;
	getter?: JavaFieldGetter;
	setter?: JavaFieldSetter;
}
export interface JavaFieldGetter extends JavaAnnotatedElement, JavaAccessibleElement {
	name: string;
}
export interface JavaFieldSetter extends JavaAnnotatedElement, JavaAccessibleElement {
	name: string;
}
export interface BaseContext {
	entityRelationshipModel: EntityRelationshipModel;
	classModel: ClassModel;
	javaClassModel: JavaClassModel;
}
export interface SetupContext extends BaseContext {
}
export interface JavaClassModelTransformContext<T> extends BaseContext {
	setupData: T;
}
export interface JavaClassTransformContext<T> extends JavaClassModelTransformContext<T> {
	classDescriptor: ClassDescriptor;
}
export interface JavaFieldTransformContext<T> extends JavaClassTransformContext<T> {
	javaClass: JavaClass;
	fieldDescriptor: ClassFieldDescriptor;
}
export interface JavaClassModelTransformer<T = unknown> {
	setup(context: SetupContext): T;
	visitField(javaField: JavaField, context: JavaFieldTransformContext<T>): void;
	visitClass(javaClass: JavaClass, context: JavaClassTransformContext<T>): void;
	visitModel(javaClassModel: JavaClassModel, context: JavaClassModelTransformContext<T>): void;
}
declare class JavaClassModelDescriptorsRepository {
	private readonly _classDescriptorsMap;
	private readonly _fieldDescriptorsMap;
	constructor(classDescriptorsMap: Map<JavaClass, ClassDescriptor>, fieldDescriptorsMap: Map<JavaField, ClassFieldDescriptor>);
	getClassDescriptor(javaClass: JavaClass): ClassDescriptor;
	getFieldDescriptor(javaField: JavaField): ClassFieldDescriptor;
}
export interface JavaClassModelGenerationResult {
	javaClassModel: JavaClassModel;
	javaClassModelDescriptorsRepository: JavaClassModelDescriptorsRepository;
}
export interface JavaClassModelConfig {
	typeBindings: Record<EntityPropertyType, JavaType>;
	generatedClassesPackage?: string;
}
export declare type PartialJavaClassModelConfig = Partial<WithPartial<JavaClassModelConfig, "typeBindings">>;
export declare class JavaClassModelGenerator {
	private readonly _javaClassGenerator;
	constructor(config?: PartialJavaClassModelConfig);
	generateJavaClassModel(classModel: ClassModel): JavaClassModelGenerationResult;
}
declare class JavaAnnotationUsedTypesCompiler {
	getUsedTypes(annotation: JavaAnnotation): JavaType[];
	private getAnnotationParameterUsedTypes;
	private getAnnotationSingleParameterUsedTypes;
}
declare class JavaClassUsedTypesCompiler {
	private readonly _javaAnnotationUsedTypesCompiler;
	constructor(javaAnnotationUsedTypesCompiler: JavaAnnotationUsedTypesCompiler);
	getUsedTypes(javaClass: JavaClass): JavaType[];
	private getAnnotationsUsedTypes;
}
declare class JavaClassCodeGenerator {
	private readonly _javaUsedTypesCompiler;
	constructor(javaUsedTypesCompiler: JavaClassUsedTypesCompiler);
	generateCode(javaClass: JavaClass): string;
	private createField;
	private createGetterLines;
	private createSetterLines;
	private getAnnotationsLines;
	private prependVisibility;
	private generateImportLines;
}
declare class JavaClassModelCodeGenerator {
	private readonly _javaClassCodeGenerator;
	constructor(javaClassCodeGenerator: JavaClassCodeGenerator);
	generateCode(javaClassModel: JavaClassModel): string;
	private generateClassCode;
	private generateClassHeaderComment;
}
export declare class JavaSourceCodeGeneratorBuilder {
	private _classModelConfig;
	private _javaClassModelConfig;
	private _javaClassModelTransformers;
	configureClassModel(config: PartialClassModelConfig): this;
	configureJavaClassModel(config: PartialJavaClassModelConfig): this;
	addTransformers(...javaClassModelTransformers: JavaClassModelTransformer[]): this;
	build(): JavaSourceCodeGenerator;
}
declare class JavaClassModelSourceFilesGenerator {
	private readonly _javaClassCodeGenerator;
	constructor(javaClassCodeGenerator: JavaClassCodeGenerator);
	generateSourceFiles(javaClassModel: JavaClassModel): SourceFileInfo[];
	private generateClassSourceFile;
	private generateClassSourceFileFolder;
	private generateClassSourceFileName;
}
export declare class JavaSourceCodeGenerator implements MultipleFileSourceCodeGenerator {
	private readonly _classModelGenerator;
	private readonly _javaClassModelGenerator;
	private readonly _javaClassModelTransformers;
	private readonly _javaClassModelCodeGenerator;
	private readonly _javaClassModelSourceFilesGenerator;
	constructor(classModelGenerator: ClassModelGenerator, javaClassModelGenerator: JavaClassModelGenerator, javaClassModelTransformers: JavaClassModelTransformer[], javaClassModelCodeGenerator: JavaClassModelCodeGenerator, javaClassModelSourceFilesGenerator: JavaClassModelSourceFilesGenerator);
	generateSourceCode(entityRelationshipModel: EntityRelationshipModel): string;
	generateSourceFiles(entityRelationshipModel: EntityRelationshipModel): SourceFileInfo[];
	private getJavaClassModel;
	static withDefaultConfig(): JavaSourceCodeGenerator;
	static builder(): JavaSourceCodeGeneratorBuilder;
}
export declare class JavaClassModelConfigManager extends AbstractConfigManager<JavaClassModelConfig, PartialJavaClassModelConfig> {
	getDefaultConfig(): JavaClassModelConfig;
	mergeConfigs(fullConfig: JavaClassModelConfig, partialConfig?: PartialJavaClassModelConfig): JavaClassModelConfig;
	protected getJsonAdapter(): JsonAdapter<JavaClassModelConfig>;
}
export declare const javaClassModelConfigManager: JavaClassModelConfigManager;
export interface JpaConfig {
	tableNameCaseFormat: CaseFormat;
	columnNameCaseFormat: CaseFormat;
	annotateGetters: boolean;
	useExplicitTableName: boolean;
	useExplicitColumnName: boolean;
}
export declare type PartialJpaConfig = Partial<JpaConfig>;
export declare class JpaConfigManager extends AbstractConfigManager<JpaConfig, PartialJpaConfig> {
	getDefaultConfig(): JpaConfig;
	mergeConfigs(fullConfig: JpaConfig, partialConfig?: PartialJpaConfig): JpaConfig;
	protected getJsonAdapter(): JsonAdapter<JpaConfig>;
}
export declare const jpaConfigManager: JpaConfigManager;
export interface JpaTransformerSetupData {
	databaseModel: DatabaseModel;
}
export declare class JpaTransformerBuilder {
	private _databaseModelConfig;
	private _config;
	configureDatabaseModel(config: PartialDatabaseModelConfig): this;
	configureJpa(config: PartialJpaConfig): this;
	build(): JpaTransformer;
}
export declare class JpaTransformer implements JavaClassModelTransformer<JpaTransformerSetupData> {
	private readonly _setupDataGenerator;
	private readonly _fieldVisitor;
	private readonly _classVisitor;
	constructor(databaseModelGenerator: DatabaseModelGenerator, config?: Partial<JpaConfig>);
	setup(context: SetupContext): JpaTransformerSetupData;
	visitField(javaField: JavaField, context: JavaFieldTransformContext<JpaTransformerSetupData>): void;
	visitClass(javaClass: JavaClass, context: JavaClassTransformContext<JpaTransformerSetupData>): void;
	visitModel(javaClassModel: JavaClassModel, context: JavaClassModelTransformContext<JpaTransformerSetupData>): void;
	static withDefaultConfig(): JpaTransformer;
	static builder(): JpaTransformerBuilder;
}
export declare enum NotNullTextValidationStrategy {
	NOT_NULL = "not_null",
	NOT_EMPTY = "not_empty",
	NOT_BLANK = "not_blank"
}
export declare enum NotNullBlobValidationStrategy {
	NOT_NULL = "not_null",
	NOT_EMPTY = "not_empty"
}
export interface BeanValidationConfig {
	notNullTextValidationStrategy: NotNullTextValidationStrategy;
	notNullBlobValidationStrategy: NotNullBlobValidationStrategy;
	annotateGetters: boolean;
}
export declare type PartialBeanValidationConfig = Partial<BeanValidationConfig>;
export declare class BeanValidationTransformer implements JavaClassModelTransformer {
	private readonly _beanValidationFieldVisitor;
	constructor(config?: PartialBeanValidationConfig);
	setup(context: SetupContext): unknown;
	visitField(javaField: JavaField, context: JavaFieldTransformContext<unknown>): void;
	visitClass(javaClass: JavaClass, context: JavaClassTransformContext<unknown>): void;
	visitModel(javaClassModel: JavaClassModel, context: JavaClassModelTransformContext<unknown>): void;
}
export declare class BeanValidationConfigManager extends AbstractConfigManager<BeanValidationConfig, PartialBeanValidationConfig> {
	getDefaultConfig(): BeanValidationConfig;
	mergeConfigs(fullConfig: BeanValidationConfig, partialConfig?: PartialBeanValidationConfig): BeanValidationConfig;
}
export declare const beanValidationConfigManager: BeanValidationConfigManager;
export interface JavaParameterizedType extends JavaType {
	readonly parameterTypes: ReadonlyArray<JavaType>;
}
export function parseJavaType(text: string): JavaType;
export function createJavaSimpleType(name: string, packageName?: string): JavaType;
export function createJavaParameterizedType(name: string, packageName: string | undefined, parameterTypes: JavaType[]): JavaParameterizedType;
export function createJavaArrayType(parameterType: JavaType): JavaParameterizedType;
export function isJavaParameterizedType(javaType: JavaType): javaType is JavaParameterizedType;
export interface TypeScriptType {
	name: string;
	format(): string;
}
export interface TypeScriptConfig {
	typeBindings: Record<EntityPropertyType, TypeScriptType>;
}
export declare type PartialTypeScriptConfig = Partial<WithPartial<TypeScriptConfig, "typeBindings">>;
export declare class TypeScriptClassModelToCodeConverter {
	private readonly config;
	private readonly typeResolver;
	constructor(config?: PartialTypeScriptConfig);
	convertToCode(classModel: ClassModel): string;
	private generateClass;
	private createField;
}
export declare class TypeScriptSourceCodeGeneratorBuilder {
	private _classModelConfig;
	private _typeScriptConfig;
	configureClassModel(config: PartialClassModelConfig): this;
	configureTypeScript(config: PartialTypeScriptConfig): this;
	build(): TypeScriptSourceCodeGenerator;
}
export declare class TypeScriptSourceCodeGenerator implements SourceCodeGenerator {
	private readonly _classModelGenerator;
	private readonly _typeScriptClassModelToCodeConverter;
	constructor(classModelGenerator: ClassModelGenerator, typeScriptClassModelToCodeConverter: TypeScriptClassModelToCodeConverter);
	generateSourceCode(entityRelationshipModel: EntityRelationshipModel): string;
	static withDefaultConfig(): TypeScriptSourceCodeGenerator;
	static builder(): TypeScriptSourceCodeGeneratorBuilder;
}
export declare class TypeScriptConfigManager extends AbstractConfigManager<TypeScriptConfig, PartialTypeScriptConfig> {
	getDefaultConfig(): TypeScriptConfig;
	mergeConfigs(fullConfig: TypeScriptConfig, partialConfig?: PartialTypeScriptConfig): TypeScriptConfig;
	protected getJsonAdapter(): JsonAdapter<TypeScriptConfig>;
}
export declare const typescriptConfigManager: TypeScriptConfigManager;
export interface TypeScriptParameterizedType extends TypeScriptType {
	parameterTypes: TypeScriptType[];
}
export function parseTypeScriptType(text: string): TypeScriptType;
export function createTypeScriptParameterizedType(name: string, parameterTypes: TypeScriptType[]): TypeScriptParameterizedType;
export function createTypeScriptArrayType(parameterType: TypeScriptType): TypeScriptParameterizedType;
export function isTypeScriptParameterizedType(javaType: TypeScriptType): javaType is TypeScriptParameterizedType;
export function createTypeScriptSimpleType(name: string): TypeScriptType;
export declare class ClassModelConfigManager extends AbstractConfigManager<ClassModelConfig, PartialClassModelConfig> {
	getDefaultConfig(): ClassModelConfig;
	mergeConfigs(fullConfig: ClassModelConfig, partialConfig?: PartialClassModelConfig): ClassModelConfig;
	protected getJsonAdapter(): JsonAdapter<ClassModelConfig>;
}
export declare const classModelConfigManager: ClassModelConfigManager;
export interface NomnomlConfig {
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
export declare class NomnomlSourceCodeGenerator implements SourceCodeGenerator {
	private readonly config;
	private readonly entityCodeGenerator;
	private readonly relationshipCodeGenerator;
	private readonly directivesCodeGenerator;
	constructor(config?: NomnomlConfig);
	generateSourceCode(model: EntityRelationshipModel): string;
}
export declare class NomnomlConfigManager extends AbstractConfigManager<NomnomlConfig, NomnomlConfig> {
	getDefaultConfig(): NomnomlConfig;
	mergeConfigs(fullConfig: NomnomlConfig, partialConfig?: Partial<NomnomlConfig>): NomnomlConfig;
}
export declare const nomnomlConfigManager: NomnomlConfigManager;
export declare class PlantUmlSourceCodeGenerator implements SourceCodeGenerator {
	private readonly entityCodeGenerator;
	private readonly relationshipCodeGenerator;
	generateSourceCode(model: EntityRelationshipModel): string;
}
export interface EntityRelationshipModelParserConfig {
	allowUnknownEntities: boolean;
}
export declare type PartialEntityRelationshipModelParserConfig = Partial<EntityRelationshipModelParserConfig>;
export declare class EntityRelationshipModelParser {
	private readonly config;
	private readonly entityRelationshipModelParserWithoutValidation;
	private readonly validator;
	private readonly parsedModelToPublicModelConverter;
	constructor(config?: PartialEntityRelationshipModelParserConfig);
	parseModel(code: string): EntityRelationshipModel;
}
export declare class EntityRelationshipModelParserConfigManager extends AbstractConfigManager<EntityRelationshipModelParserConfig, PartialEntityRelationshipModelParserConfig> {
	getDefaultConfig(): EntityRelationshipModelParserConfig;
	mergeConfigs(fullConfig: EntityRelationshipModelParserConfig, partialConfig?: PartialEntityRelationshipModelParserConfig): EntityRelationshipModelParserConfig;
}
export declare const entityRelationshipModelParserConfigManager: EntityRelationshipModelParserConfigManager;
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
