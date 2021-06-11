import {EntityPropertyType, EntityRelationshipModel} from '@/erdiagram/parser/types/entity-relationship-model-types';
import {createEntityWithoutProperties} from '#/erdiagram/parser/entity-relationship-model-mothers';
import StandardIdNamingStrategies from '@/erdiagram/converter/common/id-naming-strategy/StandardIdNamingStrategies';
import TypeScriptSourceCodeGenerator
	from '@/erdiagram/converter/oop/source-code-generator/typescript/TypeScriptSourceCodeGenerator';
import parseTypeScriptType from '@/erdiagram/converter/oop/source-code-generator/typescript/type/parseTypeScriptType';

test('With default config', () => {

	const entityRelationshipModel: EntityRelationshipModel = {
		entities: [
			createEntityWithoutProperties('MyEntity')
		],
		relationships: []
	};

	const typeScriptSourceCodeGenerator = TypeScriptSourceCodeGenerator.withDefaultConfig();

	const result = typeScriptSourceCodeGenerator.generateSourceCode(entityRelationshipModel);

	expect(result).toBe(`interface MyEntity {
    id?: number;
}`);

});

test('With custom config', () => {

	const entityRelationshipModel: EntityRelationshipModel = {
		entities: [
			createEntityWithoutProperties('MyEntity')
		],
		relationships: []
	};

	const typeScriptSourceCodeGenerator = TypeScriptSourceCodeGenerator.builder()
			.configureClassModel({
				idNamingStrategy: StandardIdNamingStrategies.ENTITY_NAME_PREFIX
			})
			.configureTypeScript({
				typeBindings: {
					[EntityPropertyType.IDENTITY]: parseTypeScriptType('CustomIdentityType')
				}
			})
			.build();

	const result = typeScriptSourceCodeGenerator.generateSourceCode(entityRelationshipModel);

	expect(result).toBe(`interface MyEntity {
    myEntityId?: CustomIdentityType;
}`);

});
