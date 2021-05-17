import {EntityRelationshipModelParserConfigManager} from '@/erdiagram/parser/config/EntityRelationshipModelParserConfigManager';
import EntityRelationshipModelParserConfig, {EntityRelationshipModelParserSerializableConfig} from '../../../../main/erdiagram/parser/config/EntityRelationshipModelParserConfig';

const configManager = new EntityRelationshipModelParserConfigManager();

describe('Serialization', () => {

	[true, false].forEach(allowUnknownEntities => {

		const config: EntityRelationshipModelParserConfig = {
			allowUnknownEntities
		};

		const serializableConfig: EntityRelationshipModelParserSerializableConfig = {
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
