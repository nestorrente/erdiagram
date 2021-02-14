import {
	CaseFormat,
	DatabaseModelGeneratorConfig,
	EntityRelationshipModelParserConfig,
	JavaClassModelToCodeConverterConfig,
	parseJavaType,
	parseTypeScriptType,
	StandardCaseFormats,
	StandardIdNamingStrategies,
	TypeScriptClassModelToCodeConverterConfig
} from '@/erdiagram/exports';
import IdNamingStrategy from '@/erdiagram/generator/common/id-naming-strategy/IdNamingStrategy';
import {EntityPropertyType} from '@/erdiagram/parser/entity-relationship-model-types';
import DatabaseModelToCodeConverterConfig
	from '@/erdiagram/generator/database/code-converter/DatabaseModelToCodeConverterConfig';
import DatabaseModelToCodeConverterSerializedConfig
	from '@/erdiagram/generator/database/code-converter/DatabaseModelToCodeConverterSerializedConfig';
import {findKeyFromValue, findValueFromNullableKey, mapValues} from '@/erdiagram/util/record-utils';

/* EntityRelationshipModelParserConfig */

function serializeEntityRelationshipModelParserConfig(config: EntityRelationshipModelParserConfig): EntityRelationshipModelParserSerializedConfig {
	return {
		...config
	};
}

function deserializeEntityRelationshipModelParserConfig(config: EntityRelationshipModelParserSerializedConfig): EntityRelationshipModelParserConfig {
	return {
		...config
	};
}

/* DatabaseModelGeneratorConfig */

function serializeDatabaseModelGeneratorConfig(config: DatabaseModelGeneratorConfig): DatabaseModelGeneratorSerializedConfig {
	return {
		...config,
		idNamingStrategy: serializeIdNamingStrategy(config.idNamingStrategy)
	};
}

function deserializeDatabaseModelGeneratorConfig(config: DatabaseModelGeneratorSerializedConfig): DatabaseModelGeneratorConfig {
	return {
		...config,
		idNamingStrategy: deserializeIdNamingStrategy(config.idNamingStrategy)
	};
}

/* IdNamingStrategy */

function serializeIdNamingStrategy(idNamingStrategy: IdNamingStrategy) {
	return findKeyFromValue(StandardIdNamingStrategies, idNamingStrategy);
}

function deserializeIdNamingStrategy(idNamingStrategy: string | undefined) {
	return findValueFromNullableKey(StandardIdNamingStrategies, idNamingStrategy, StandardIdNamingStrategies.DEFAULT);
}

/* DatabaseModelToCodeConverterConfig */

function serializeDatabaseModelToCodeConverterConfig(config: DatabaseModelToCodeConverterConfig): DatabaseModelToCodeConverterSerializedConfig {
	return {
		...config,
		tableNameCaseFormat: findKeyFromValue(StandardCaseFormats, config.tableNameCaseFormat),
		columnNameCaseFormat: findKeyFromValue(StandardCaseFormats, config.columnNameCaseFormat),
	};
}

function deserializeDatabaseModelToCodeConverterConfig(
		config: DatabaseModelToCodeConverterSerializedConfig,
		defaultTableNameCaseFormat: CaseFormat,
		defaultColumnNameCaseFormat: CaseFormat
): DatabaseModelToCodeConverterConfig {
	return {
		...config,
		tableNameCaseFormat: findValueFromNullableKey(StandardCaseFormats, config.tableNameCaseFormat, defaultTableNameCaseFormat),
		columnNameCaseFormat: findValueFromNullableKey(StandardCaseFormats, config.columnNameCaseFormat, defaultColumnNameCaseFormat),
	};
}

/* JavaClassModelToCodeConverterConfig */

function serializeJavaClassModelToCodeConverterSerializedConfig(config: JavaClassModelToCodeConverterConfig): JavaClassModelToCodeConverterSerializedConfig {
	return {
		...config,
		typeMappings: mapValues(config.typeMappings, javaType => javaType!.formatCanonical()),
	};
}

function deserializeJavaClassModelToCodeConverterSerializedConfig(config: JavaClassModelToCodeConverterSerializedConfig): JavaClassModelToCodeConverterConfig {
	return {
		...config,
		typeMappings: mapValues(config.typeMappings, parseJavaType),
	};
}

/* TypeScriptClassModelToCodeConverterConfig */

function serializeTypeScriptClassModelToCodeConverterSerializedConfig(config: TypeScriptClassModelToCodeConverterConfig): TypeScriptClassModelToCodeConverterSerializedConfig {
	return {
		...config,
		typeMappings: mapValues(config.typeMappings, typeScriptType => typeScriptType!.format()),
	};
}

function deserializeTypeScriptClassModelToCodeConverterSerializedConfig(config: TypeScriptClassModelToCodeConverterSerializedConfig): TypeScriptClassModelToCodeConverterConfig {
	return {
		...config,
		typeMappings: mapValues(config.typeMappings, parseTypeScriptType),
	};
}

/* Type interfaces */

type EntityRelationshipModelParserSerializedConfig = EntityRelationshipModelParserConfig;

interface MySqlDatabaseModelToCodeConverterSerializedConfig extends DatabaseModelToCodeConverterSerializedConfig {

}

interface OracleDatabaseModelToCodeConverterSerializedConfig extends DatabaseModelToCodeConverterSerializedConfig {

}

interface ClassModelToCodeConverterSerializedConfig {
	typeMappings: Record<EntityPropertyType, string>;
}

interface JavaClassModelToCodeConverterSerializedConfig extends ClassModelToCodeConverterSerializedConfig {
	generatedClassesPackage?: string;
	useSpringNullabilityAnnotations: boolean;
}

interface TypeScriptClassModelToCodeConverterSerializedConfig extends ClassModelToCodeConverterSerializedConfig {

}

interface DatabaseModelGeneratorSerializedConfig {
	usePluralTableNames: boolean;
	idNamingStrategy?: string;
}
