import {
	EntityDescriptor,
	parseEntityNameStatement,
	parseEntityPropertyStatement,
	parseRelationshipStatement,
	RelationshipDescriptor
} from '@/erdiagram/parser/statement/statement-types-parse-functions';
import {guessStatementType, StatementType} from '@/erdiagram/parser/statement/statement-type-guesser';

export interface EntityRelationshipModel {
	entities: EntityDescriptor[];
	relationships: RelationshipDescriptor[];
}

export class EntityRelationshipModelParser {

	public parseModel(code: string): EntityRelationshipModel {
		return parseEntityRelationshipModel(code);
	}

}

const entityRelationshipModelParser = new EntityRelationshipModelParser();
export default entityRelationshipModelParser;

function parseEntityRelationshipModel(code: string): EntityRelationshipModel {

	const lines = code.split('\n');

	const entities: EntityDescriptor[] = [];
	const relationships: RelationshipDescriptor[] = [];

	let parsingEntity = false;

	lines.forEach(line => {

		const statementType = guessStatementType(line);

		switch (statementType) {
			case StatementType.ENTITY_NAME:
				entities.push({
					name: parseEntityNameStatement(line),
					properties: []
				});
				parsingEntity = true;
				break;
			case StatementType.ENTITY_PROPERTY:
				if (!parsingEntity) {
					throw new Error('Unexpected entity property statement');
				}
				const lastEntity = entities[entities.length - 1];
				const entityPropertyDescriptor = parseEntityPropertyStatement(line);
				lastEntity.properties.push(entityPropertyDescriptor);
				break;
			case StatementType.RELATIONSHIP:
				const relationshipDescriptor = parseRelationshipStatement(line);
				relationships.push(relationshipDescriptor);
				parsingEntity = false;
				break;
			case StatementType.BLANK_LINE:
			case StatementType.COMMENT:
				// Ignore
				break;
			default:
				throw new Error(`Unknown statement type (${statementType}) for line: ${line}`);
		}

	});

	return validateModel({
		entities,
		relationships
	});

}

function validateModel(model: EntityRelationshipModel) {

	const entityNames = model.entities.map(e => e.name);

	model.relationships.forEach(r => {
		if (!entityNames.includes(r.leftMember.entity)) {
			throw new Error(`Uknown entity in relationship's left side: ${r.leftMember.entity}`);
		}
		if (!entityNames.includes(r.rightMember.entity)) {
			throw new Error(`Uknown entity in relationship's right side: ${r.rightMember.entity}`);
		}
	});

	return model;

}