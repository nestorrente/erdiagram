import EntityRelationshipModelToCodeConverter from '@/erdiagram/generator/entity-relationship-to-code-converter';
import {EntityRelationshipModel} from '@/erdiagram/parser/er-model-parser';
import {EntityPropertyType} from '@/erdiagram/parser/statement/statement-types-parse-functions';
import {capitalizeWord} from '@/erdiagram/util/string-utils';
import classModelGenerator from '@/erdiagram/generator/oop/class-model/ClassModelGenerator';
import {ClassDescriptor, FieldDescriptor} from '@/erdiagram/generator/oop/class-model/class-model-types';
import {indentLine, indentLines} from '@/erdiagram/util/indent-utils';

const BLANK_LINE: string = '';

export default class JavaEntityRelationshipModelToCodeConverter implements EntityRelationshipModelToCodeConverter {

	public generateCode(entityRelationshipModel: EntityRelationshipModel): string {

		const classModel = classModelGenerator.generateClassModel(entityRelationshipModel);

		return classModel.classes
				.map(classDescriptor => this.generateClass(classDescriptor))
				.join('\n\n');

	}

	private generateClass(classDescriptor: ClassDescriptor): string {

		const className = capitalizeWord(classDescriptor.name);

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
		const capitalizedFieldName = capitalizeWord(fieldName);

		const fieldLines = [];

		// TODO use length for validation annotations?

		if (field.nullable) {
			fieldLines.push('@Nullable');
		}

		const javaType = mapFieldTypeToJavaType(field);

		fieldLines.push(`private ${javaType} ${fieldName};`);

		const getterLines: string[] = [
			`public ${javaType} get${capitalizedFieldName}() {`,
			indentLine(`return ${fieldName};`),
			'}',
		];

		const setterLines: string[] = [
			`public ${javaType} set${capitalizedFieldName}(${javaType} ${fieldName}) {`,
			indentLine(`this.${fieldName} = ${fieldName};`),
			'}',
		];

		return {
			fieldLines,
			getterLines,
			setterLines
		};

	}

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
		[EntityPropertyType.SHORT]: 'Short',
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
