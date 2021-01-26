import {ModelCodeGenerator} from '../../types';
import {EntityRelationshipModel} from '../../../parser/er-model-parser';
import {
	Cardinality,
	Direction,
	EntityDescriptor,
	EntityPropertyType,
	RelationshipMember
} from '../../../parser/statement/statement-types-parse-functions';
import {capitalize} from '../../../util/string-utils';

const INDENT: string = '    ';
const BLANK_LINE: string = '';

interface JavaFieldDescriptor {
	name: string;
	nullable: boolean;
	type: string;
}

export default class JavaCodeGenerator implements ModelCodeGenerator {

	public generateCode(model: EntityRelationshipModel): string {

		return model.entities
				.map(entity => this.generateClass(entity, model))
				.join('\n\n');

	}

	private generateClass(entity: EntityDescriptor, model: EntityRelationshipModel): string {

		const className = capitalize(entity.name);

		const fieldsLines: string[] = [];
		const methodsLines: string[] = [];

		const {
			fieldLines: idFieldLines,
			getterLines: idGetterLines,
			setterLines: idSetterLines
		} = this.createIdField();

		fieldsLines.push(...idFieldLines);
		methodsLines.push(...idGetterLines, BLANK_LINE, ...idSetterLines);

		for (const property of entity.properties) {

			const {
				fieldLines,
				getterLines,
				setterLines
			} = this.createField({
				name: property.name,
				type: mapPropertyTypeToJavaType(property.type),
				nullable: property.optional
			});

			fieldsLines.push(...fieldLines);
			methodsLines.push(BLANK_LINE, ...getterLines, BLANK_LINE, ...setterLines);

		}

		for (const relationship of model.relationships) {

			const {
				leftMember,
				rightMember,
				direction
			} = relationship;

			let fieldData;

			if (leftMember.entity === entity.name && [Direction.RIGHT, Direction.BOTH].includes(direction)) {
				fieldData = this.createRelationshipField(rightMember);
			} else if (rightMember.entity === entity.name && [Direction.LEFT, Direction.BOTH].includes(direction)) {
				fieldData = this.createRelationshipField(leftMember);
			} else {
				continue;
			}

			const {
				fieldLines,
				getterLines,
				setterLines
			} = fieldData;

			fieldsLines.push(...fieldLines);
			methodsLines.push(BLANK_LINE, ...getterLines, BLANK_LINE, ...setterLines);

		}

		const classContentLines: string[] = [
			BLANK_LINE,
			...fieldsLines,
			BLANK_LINE,
			...methodsLines,
			BLANK_LINE
		];

		return [
			`public class ${className} {`,
			indentLines(classContentLines).join('\n'),
			'}'
		].join('\n');

	}

	private createIdField() {
		return this.createField({
			name: 'id',
			type: mapPropertyTypeToJavaType(EntityPropertyType.LONG),
			nullable: false
		});
	}

	private createField(property: JavaFieldDescriptor) {

		const {
			name,
			nullable,
			type
		} = property;

		const fieldLines = [];

		// TODO use length for validation annotations?

		if (nullable) {
			fieldLines.push('@Nullable');
		}

		fieldLines.push(`private ${type} ${name};`);

		const capitalizedName = capitalize(name);

		const getterLines: string[] = [
			`public ${type} get${capitalizedName}() {`,
			`${INDENT}return ${name};`,
			'}',
		];

		const setterLines: string[] = [
			`public ${type} set${capitalizedName}(${type} ${name}) {`,
			`${INDENT}this.${name} = ${name};`,
			'}',
		];

		return {
			fieldLines,
			getterLines,
			setterLines
		};

	}

	private createRelationshipField(toMember: RelationshipMember) {
		return this.createField({
			name: toMember.entityAlias,
			type: toMember.cardinality === Cardinality.MANY ? `List<${toMember.entity}>` : toMember.entity,
			nullable: toMember.optional
		});
	}

}

function indentLines(lines: string[]) {
	return lines.map(e => {
		if (e.trim().length === 0) {
			return e;
		}
		return INDENT + e;
	});
}

function mapPropertyTypeToJavaType(type: EntityPropertyType): string {

	const typesMap: Record<string, string> = {
		[EntityPropertyType.TEXT]: 'String',
		[EntityPropertyType.LONG]: 'Long',
		[EntityPropertyType.INT]: 'Integer',
		[EntityPropertyType.DECIMAL]: 'BigDecimal',
		[EntityPropertyType.BOOLEAN]: 'Boolean',
		[EntityPropertyType.DATE]: 'LocalDate',
		[EntityPropertyType.TIME]: 'LocalTime',
		[EntityPropertyType.DATETIME]: 'LocalDateTime'
	};

	if (!typesMap.hasOwnProperty(type)) {
		throw new Error('Unsupported type: ' + type);
	}

	return typesMap[type];

}
