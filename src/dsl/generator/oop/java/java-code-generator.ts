import EntityRelationshipModelToCodeConverter from 'src/dsl/generator/entity-relationship-to-code-converter';
import {EntityRelationshipModel} from '../../../parser/er-model-parser';
import {EntityPropertyType} from '../../../parser/statement/statement-types-parse-functions';
import {capitalize} from '../../../util/string-utils';
import classModelGenerator from '../class-model/class-model-generator';
import {ClassDescriptor, FieldDescriptor} from '../class-model/class-model-types';

const INDENT: string = '    ';
const BLANK_LINE: string = '';

export default class JavaCodeGenerator implements EntityRelationshipModelToCodeConverter {

	public generateCode(entityRelationshipModel: EntityRelationshipModel): string {

		const classModel = classModelGenerator.generateClassModel(entityRelationshipModel);

		return classModel.classes
				.map(classDescriptor => this.generateClass(classDescriptor))
				.join('\n\n');

	}

	private generateClass(classDescriptor: ClassDescriptor): string {

		const className = capitalize(classDescriptor.name);

		const fieldsLines: string[] = [];
		const methodsLines: string[] = [];

		for (const field of classDescriptor.fields) {

			const {
				fieldLines,
				getterLines,
				setterLines
			} = this.createField(field);

			fieldsLines.push(...fieldLines);
			methodsLines.push(...getterLines, BLANK_LINE, ...setterLines, BLANK_LINE);

		}

		const classContentLines: string[] = [
			BLANK_LINE,
			...fieldsLines,
			BLANK_LINE,
			...methodsLines
		];

		return [
			`public class ${className} {`,
			indentLines(classContentLines).join('\n'),
			'}'
		].join('\n');

	}

	private createField(field: FieldDescriptor) {

		const fieldName = field.name;
		const capitalizedFieldName = capitalize(fieldName);

		const fieldLines = [];

		// TODO use length for validation annotations?

		if (field.nullable) {
			fieldLines.push('@Nullable');
		}

		const javaType = mapFieldTypeToJavaType(field);

		fieldLines.push(`private ${javaType} ${fieldName};`);

		const getterLines: string[] = [
			`public ${javaType} get${capitalizedFieldName}() {`,
			`${INDENT}return ${fieldName};`,
			'}',
		];

		const setterLines: string[] = [
			`public ${javaType} set${capitalizedFieldName}(${javaType} ${fieldName}) {`,
			`${INDENT}this.${fieldName} = ${fieldName};`,
			'}',
		];

		return {
			fieldLines,
			getterLines,
			setterLines
		};

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

function mapFieldTypeToJavaType(field: FieldDescriptor): string {
	if (field.list) {
		return mapListTypeToJavaType(field);
	} else {
		return mapSingleTypeToJavaType(field);
	}
}

function mapListTypeToJavaType(field: FieldDescriptor): string {
	return `List<${mapSingleTypeToJavaType(field)}>`;
}

function mapSingleTypeToJavaType(field: FieldDescriptor): string {

	const {
		entityType,
		primitiveType
	} = field;

	if (entityType) {

		if (primitiveType) {
			throw new Error('Invalid field descriptor: provided both primitive and entity types');
		}

		return entityType;

	}

	if (!primitiveType) {
		throw new Error('Invalid field descriptor: missing type');
	}

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

	if (!typesMap.hasOwnProperty(primitiveType)) {
		throw new Error('Unsupported type: ' + primitiveType);
	}

	return typesMap[primitiveType];

}
