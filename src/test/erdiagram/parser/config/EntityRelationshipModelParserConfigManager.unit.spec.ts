import {EntityRelationshipModelParserConfigManager} from '@/erdiagram/parser/config/EntityRelationshipModelParserConfigManager';
import EntityRelationshipModelParserConfig from '@/erdiagram/parser/config/EntityRelationshipModelParserConfig';
import {JsonValue} from 'true-json';

const configManager = new EntityRelationshipModelParserConfigManager();

describe('Serialization', () => {

	[true, false].forEach(allowUnknownEntities => {

		const config: EntityRelationshipModelParserConfig = {
			allowUnknownEntities
		};

		const serializableConfig: JsonValue = {
			allowUnknownEntities
		};

		test(`Convert to serializable object (allowUnknownEntities = ${allowUnknownEntities})`, () => {

			const result = configManager.convertToSerializableObject(config);

			expect(result).toStrictEqual(serializableConfig);

		});

		test(`Convert from serializable object (allowUnknownEntities = ${allowUnknownEntities})`, () => {

			const result = configManager.convertFromSerializableObject(serializableConfig);

			expect(result).toStrictEqual(config);

		});

	});

});
