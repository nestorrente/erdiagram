import {EntityRelationshipModel} from '@/erdiagram/parser/types/entity-relationship-model-types';
import {createEntityWithoutProperties} from '#/erdiagram/parser/entity-relationship-model-mothers';
import StandardIdNamingStrategies from '@/erdiagram/converter/common/id-naming-strategy/StandardIdNamingStrategies';
import SqlSourceCodeGenerator from '@/erdiagram/converter/database/source-code-generator/SqlSourceCodeGenerator';
import MysqlDialect from '@/erdiagram/converter/database/source-code-generator/sql/dialect/mysql/MysqlDialect';

test('With default config', () => {

	const entityRelationshipModel: EntityRelationshipModel = {
		entities: [
			createEntityWithoutProperties('MyEntity')
		],
		relationships: []
	};

	const sqlSourceCodeGenerator = SqlSourceCodeGenerator.withDefaultConfig(new MysqlDialect());

	const result = sqlSourceCodeGenerator.generateSourceCode(entityRelationshipModel);

	expect(result).toBe(`CREATE TABLE \`MyEntity\` (
    \`id\` BIGINT NOT NULL AUTO_INCREMENT,
    CONSTRAINT \`MyEntity_pk\` PRIMARY KEY (\`id\`)
);`);

});

test('With custom config', () => {

	const entityRelationshipModel: EntityRelationshipModel = {
		entities: [
			createEntityWithoutProperties('MyEntity')
		],
		relationships: []
	};

	const sqlSourceCodeGenerator = SqlSourceCodeGenerator.builder(new MysqlDialect())
			.configureDatabaseModel({
				usePluralTableNames: true,
				idNamingStrategy: StandardIdNamingStrategies.ENTITY_NAME_PREFIX
			})
			.build();

	const result = sqlSourceCodeGenerator.generateSourceCode(entityRelationshipModel);

	expect(result).toBe(`CREATE TABLE \`MyEntities\` (
    \`myEntityId\` BIGINT NOT NULL AUTO_INCREMENT,
    CONSTRAINT \`MyEntities_pk\` PRIMARY KEY (\`myEntityId\`)
);`);

});
