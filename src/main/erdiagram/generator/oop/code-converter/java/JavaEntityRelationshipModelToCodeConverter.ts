import EntityRelationshipModelToCodeConverter from '@/erdiagram/generator/entity-relationship-to-code-converter';
import {EntityRelationshipModel} from '@/erdiagram/parser/er-model-parser';
import {EntityPropertyType} from '@/erdiagram/parser/statement/statement-types-parse-functions';
import {capitalizeWord} from '@/erdiagram/util/string-utils';
import classModelGenerator from '@/erdiagram/generator/oop/class-model/ClassModelGenerator';
import {ClassDescriptor, NonEntityFieldDescriptor} from '@/erdiagram/generator/oop/class-model/class-model-types';
import {indentLine, indentLines} from '@/erdiagram/util/indent-utils';

const BLANK_LINE: string = '';

export default class JavaEntityRelationshipModelToCodeConverter implements EntityRelationshipModelToCodeConverter {

	constructor(
			private readonly outputPackage: string
	) {

	}

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

	private createField(field: NonEntityFieldDescriptor) {

		const fieldName = field.name;
		const capitalizedFieldName = capitalizeWord(fieldName);

		const importLines: string[] = [];
		const fieldLines: string[] = [];

		// TODO use length for validation annotations?

		if (field.nullable) {
			fieldLines.push('@Nullable');
		}

		const javaType = mapFieldTypeToJavaType(field, this.outputPackage);

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
			importLines,
			fieldLines,
			getterLines,
			setterLines
		};

	}

}

function mapFieldTypeToJavaType(field: NonEntityFieldDescriptor, outputPackage: string): JavaType {
	if (field.list) {
		return mapListTypeToJavaType(field, outputPackage);
	} else {
		return mapSingleTypeToJavaType(field, outputPackage);
	}
}

function mapListTypeToJavaType(field: NonEntityFieldDescriptor, outputPackage: string): JavaParameterizedType {
	return createJavaParameterizedType(
			'List',
			'java.util',
			[
				mapSingleTypeToJavaType(field, outputPackage)
			]
	);
}

function mapSingleTypeToJavaType(field: NonEntityFieldDescriptor, outputPackage: string): JavaType {

	const {
		entityType,
		primitiveType
	} = field;

	if (entityType) {

		if (primitiveType) {
			throw new Error('Invalid field descriptor: provided both primitive and entity types');
		}

		return createJavaType(entityType, outputPackage);

	}

	if (!primitiveType) {
		throw new Error('Invalid field descriptor: missing type');
	}

	const typesMap: Record<string, JavaType> = {
		[EntityPropertyType.TEXT]: createJavaType('String', 'java.lang'),
		[EntityPropertyType.LONG]: createJavaType('Long', 'java.lang'),
		[EntityPropertyType.INT]: createJavaType('Integer', 'java.lang'),
		[EntityPropertyType.SHORT]: createJavaType('Short', 'java.lang'),
		[EntityPropertyType.DECIMAL]: createJavaType('BigDecimal', 'java.lang'),
		[EntityPropertyType.BOOLEAN]: createJavaType('Boolean', 'java.lang'),
		[EntityPropertyType.DATE]: createJavaType('LocalDate', 'java.lang'),
		[EntityPropertyType.TIME]: createJavaType('LocalTime', 'java.lang'),
		[EntityPropertyType.DATETIME]: createJavaType('LocalDateTime', 'java.lang')
	};

	if (!typesMap.hasOwnProperty(primitiveType)) {
		throw new Error('Unsupported type: ' + primitiveType);
	}

	return typesMap[primitiveType];

}

interface JavaType {
	packageName?: string;
	name: string;
	readonly canonicalName: string;
	format(): string;
}

interface JavaParameterizedType extends JavaType {
	parameterTypes: JavaType[];
}

function createJavaType(name: string, packageName?: string): JavaType {
	return {
		packageName,
		name,
		get canonicalName() {
			return `${packageName}.${name}`;
		},
		format: () => name
	};
}

function createJavaParameterizedType(name: string, packageName: string, parameterTypes: JavaType[]): JavaParameterizedType {
	return {
		packageName,
		name,
		parameterTypes,
		get canonicalName() {
			return `${packageName}.${name}`;
		},
		format: () => {
			const formattedParameterTypes = parameterTypes.map(t => t.format()).join(', ');
			return `${name}<${formattedParameterTypes}>`;
		}
	};
}
