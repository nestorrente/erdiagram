import {EntityPropertyType} from '@/erdiagram/parser/statement/statement-types-parse-functions';
import {capitalizeWord} from '@/erdiagram/util/string-utils';
import {
	ClassDescriptor,
	ClassModel,
	NonEntityFieldDescriptor
} from '@/erdiagram/generator/oop/class-model/class-model-types';
import {indentLine, indentLines} from '@/erdiagram/util/indent-utils';
import JavaParameterizedType, {
	createJavaParameterizedType,
	isParameterizedType
} from '@/erdiagram/generator/oop/code-converter/java/type/JavaParameterizedType';
import JavaType, {createJavaType} from '@/erdiagram/generator/oop/code-converter/java/type/JavaType';
import {removeDuplicates} from '@/erdiagram/util/array-utils';
import ClassModelToCodeConverter from '@/erdiagram/generator/oop/code-converter/ClassModelToCodeConverter';
import JavaClassModelToCodeConverterConfig, {mergeWithDefaultConfig} from '@/erdiagram/generator/oop/code-converter/java/JavaClassModelToCodeConverterConfig';

const BLANK_LINE: string = '';

export default class JavaClassModelToCodeConverter implements ClassModelToCodeConverter {

	private readonly config: JavaClassModelToCodeConverterConfig;

	constructor(config?: Partial<JavaClassModelToCodeConverterConfig>) {
		this.config = mergeWithDefaultConfig(config);
	}

	public generateCode(classModel: ClassModel): string {
		return classModel.classes
				.map(classDescriptor => this.generateClass(classDescriptor))
				.join('\n\n');
	}

	private generateClass(classDescriptor: ClassDescriptor): string {

		const className = capitalizeWord(classDescriptor.name);

		const fieldsTypes: JavaType[] = [];
		const fieldsLines: string[] = [];
		const methodsLines: string[] = [];

		for (const field of classDescriptor.fields) {

			const {
				fieldType,
				fieldLines,
				getterLines,
				setterLines
			} = this.createField(field);

			fieldsTypes.push(fieldType);
			fieldsLines.push(...fieldLines);
			methodsLines.push(...getterLines, BLANK_LINE, ...setterLines, BLANK_LINE);

		}

		const classOuterLines = [
			`/* ========================= ${classDescriptor.name} class ========================= */`,
			BLANK_LINE
		];

		if (this.config.generatedClassesPackage) {
			classOuterLines.push(`package ${this.config.generatedClassesPackage};`, BLANK_LINE);
		}

		const importLines = createImportStatements(fieldsTypes);

		if (importLines.length !== 0) {
			classOuterLines.push(...importLines, BLANK_LINE);
		}

		classOuterLines.push(`public class ${className} {`);

		const classContentLines: string[] = [
			BLANK_LINE,
			...fieldsLines,
			BLANK_LINE,
			...methodsLines
		];

		classOuterLines.push(...indentLines(classContentLines));

		classOuterLines.push(`}`);

		return classOuterLines.join('\n');

	}

	private createField(field: NonEntityFieldDescriptor) {

		const fieldName = field.name;
		const capitalizedFieldName = capitalizeWord(fieldName);

		const fieldLines: string[] = [];

		// TODO use length for validation annotations?

		if (field.nullable) {
			fieldLines.push('@Nullable');
		}

		const javaType = this.mapFieldTypeToJavaType(field);
		const formattedJavaType = javaType.format();

		fieldLines.push(`private ${formattedJavaType} ${fieldName};`);

		const getterLines: string[] = [
			`public ${formattedJavaType} get${capitalizedFieldName}() {`,
			indentLine(`return ${fieldName};`),
			'}',
		];

		const setterLines: string[] = [
			`public ${formattedJavaType} set${capitalizedFieldName}(${formattedJavaType} ${fieldName}) {`,
			indentLine(`this.${fieldName} = ${fieldName};`),
			'}',
		];

		return {
			fieldType: javaType,
			fieldLines,
			getterLines,
			setterLines
		};

	}

	private mapFieldTypeToJavaType(field: NonEntityFieldDescriptor): JavaType {
		if (field.list) {
			return this.mapListTypeToJavaType(field);
		} else {
			return this.mapSingleTypeToJavaType(field);
		}
	}

	private mapListTypeToJavaType(field: NonEntityFieldDescriptor): JavaParameterizedType {
		return createJavaParameterizedType(
				'List',
				'java.util',
				[
					this.mapSingleTypeToJavaType(field)
				]
		);
	}

	private mapSingleTypeToJavaType(field: NonEntityFieldDescriptor): JavaType {

		const {
			entityType,
			primitiveType
		} = field;

		if (entityType) {

			if (primitiveType) {
				throw new Error('Invalid field descriptor: provided both primitive and entity types');
			}

			return createJavaType(entityType, this.config.generatedClassesPackage);

		}

		if (!primitiveType) {
			throw new Error('Invalid field descriptor: missing type');
		}

		const typesMap: Record<EntityPropertyType, JavaType> = {
			[EntityPropertyType.TEXT]: createJavaType('String', 'java.lang'),
			[EntityPropertyType.LONG]: createJavaType('Long', 'java.lang'),
			[EntityPropertyType.INT]: createJavaType('Integer', 'java.lang'),
			[EntityPropertyType.SHORT]: createJavaType('Short', 'java.lang'),
			[EntityPropertyType.DECIMAL]: createJavaType('BigDecimal', 'java.math'),
			[EntityPropertyType.BOOLEAN]: createJavaType('Boolean', 'java.lang'),
			[EntityPropertyType.DATE]: createJavaType('LocalDate', 'java.util.time'),
			[EntityPropertyType.TIME]: createJavaType('LocalTime', 'java.util.time'),
			[EntityPropertyType.DATETIME]: createJavaType('LocalDateTime', 'java.util.time')
		};

		if (!typesMap.hasOwnProperty(primitiveType)) {
			throw new Error('Unsupported type: ' + primitiveType);
		}

		return typesMap[primitiveType];

	}

}

function createImportStatements(javaTypes: JavaType[]): string[] {

	const importStatements = unrollTypesRecursively(javaTypes)
			.filter(javaType => javaType.packageName && javaType.packageName !== 'java.lang')
			.map(javaType => `import ${javaType.canonicalName};`);

	return removeDuplicates(importStatements).sort();

}

function unrollTypesRecursively(javaTypes: JavaType[], appendTo: JavaType[] = []): JavaType[] {

	for (const javaType of javaTypes) {

		appendTo.push(javaType);

		if (isParameterizedType(javaType)) {
			unrollTypesRecursively(javaType.parameterTypes, appendTo);
		}

	}

	return appendTo;

}
