import {capitalizeWord} from '@/erdiagram/util/string-utils';
import {ClassDescriptor, ClassModel, NonEntityFieldDescriptor} from '@/erdiagram/generator/oop/model/class-model-types';
import {indentLine, indentLines} from '@/erdiagram/util/indent-utils';
import JavaParameterizedType, {
	createJavaParameterizedType,
	isJavaParameterizedType
} from '@/erdiagram/generator/oop/code-converter/java/type/JavaParameterizedType';
import JavaType, {createJavaType} from '@/erdiagram/generator/oop/code-converter/java/type/JavaType';
import {removeDuplicates} from '@/erdiagram/util/array-utils';
import ClassModelToCodeConverter from '@/erdiagram/generator/oop/code-converter/ClassModelToCodeConverter';
import JavaClassModelToCodeConverterConfig
	from '@/erdiagram/generator/oop/code-converter/java/config/JavaClassModelToCodeConverterConfig';
import javaClassModelToCodeConverterConfigManager
	from '@/erdiagram/generator/oop/code-converter/java/config/JavaClassModelToCodeConverterConfigManager';

const EMPTY_STRING: string = '';

export default class JavaClassModelToCodeConverter implements ClassModelToCodeConverter {

	private readonly config: JavaClassModelToCodeConverterConfig;

	constructor(config?: Partial<JavaClassModelToCodeConverterConfig>) {
		this.config = javaClassModelToCodeConverterConfigManager.mergeWithDefaultConfig(config);
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
			methodsLines.push(...getterLines, EMPTY_STRING, ...setterLines, EMPTY_STRING);

		}

		const classOuterLines = [
			`/* ========== ${className} class ========== */`,
			EMPTY_STRING
		];

		if (this.config.generatedClassesPackage) {
			classOuterLines.push(`package ${this.config.generatedClassesPackage};`, EMPTY_STRING);
		}

		const importLines = this.createImportStatements(fieldsTypes);

		if (this.config.useSpringNullabilityAnnotations) {
			// FIXME gestionar estos imports de otra forma
			// Quizás hacer que createField() devuelva qué tipos utiliza, y no solo el tipo del campo
			const importNonNullAnnotation = classDescriptor.fields.some(f => !f.nullable);
			if (importNonNullAnnotation) {
				importLines.push('import org.springframework.lang.NonNull;');
			}
			const importNullableAnnotation = classDescriptor.fields.some(f => f.nullable);
			if (importNullableAnnotation) {
				importLines.push('import org.springframework.lang.Nullable;');
			}
		}

		if (importLines.length !== 0) {
			classOuterLines.push(...importLines, EMPTY_STRING);
		}

		classOuterLines.push(`public class ${className} {`);

		const classContentLines: string[] = [
			EMPTY_STRING,
			...fieldsLines,
			EMPTY_STRING,
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

		if (this.config.useSpringNullabilityAnnotations) {
			if (field.nullable) {
				fieldLines.push('@Nullable');
			} else {
				fieldLines.push('@NonNull');
			}
		}

		const javaType = this.mapFieldTypeToJavaType(field);
		const formattedJavaType = javaType.formatSimple();

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

		if (!this.config.typeBindings.hasOwnProperty(primitiveType)) {
			throw new Error('Unsupported type: ' + primitiveType);
		}

		return this.config.typeBindings[primitiveType]!;

	}

	private createImportStatements(javaTypes: JavaType[]): string[] {

		const importStatements = this.unrollTypesRecursively(javaTypes)
				.filter(javaType => this.isImportRequired(javaType))
				.map(javaType => `import ${javaType.canonicalName};`);

		return removeDuplicates(importStatements).sort();

	}

	private unrollTypesRecursively(javaTypes: JavaType[], appendTo: JavaType[] = []): JavaType[] {

		for (const javaType of javaTypes) {

			appendTo.push(javaType);

			if (isJavaParameterizedType(javaType)) {
				this.unrollTypesRecursively(javaType.parameterTypes, appendTo);
			}

		}

		return appendTo;

	}

	private isImportRequired(javaType: JavaType): boolean {
		return !!javaType.packageName
				&& javaType.packageName !== 'java.lang'
				&& this.config.generatedClassesPackage !== javaType.packageName;
	}

}
