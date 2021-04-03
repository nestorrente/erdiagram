import {capitalizeWord} from '@/erdiagram/util/string-utils';
import {ClassDescriptor, ClassFieldDescriptor, ClassModel} from '@/erdiagram/generator/oop/model/class-model-types';
import {indentLine, indentLines} from '@/erdiagram/util/indent-utils';
import {isJavaParameterizedType} from '@/erdiagram/generator/oop/code-converter/java/type/JavaParameterizedType';
import JavaType, {createJavaType} from '@/erdiagram/generator/oop/code-converter/java/type/JavaType';
import {removeDuplicates} from '@/erdiagram/util/array-utils';
import ClassModelToCodeConverter from '@/erdiagram/generator/oop/code-converter/ClassModelToCodeConverter';
import JavaClassModelToCodeConverterConfig
	from '@/erdiagram/generator/oop/code-converter/java/config/JavaClassModelToCodeConverterConfig';
import javaClassModelToCodeConverterConfigManager
	from '@/erdiagram/generator/oop/code-converter/java/config/JavaClassModelToCodeConverterConfigManager';
import JavaFieldTypeResolver from '@/erdiagram/generator/oop/code-converter/java/type/JavaFieldTypeResolver';

const EMPTY_STRING: string = '';

export default class JavaClassModelToCodeConverter implements ClassModelToCodeConverter {

	private readonly config: JavaClassModelToCodeConverterConfig;
	private readonly typeResolver: JavaFieldTypeResolver;

	constructor(config?: Partial<JavaClassModelToCodeConverterConfig>) {
		this.config = javaClassModelToCodeConverterConfigManager.mergeWithDefaultConfig(config);
		this.typeResolver = new JavaFieldTypeResolver(this.config.typeBindings, this.config.generatedClassesPackage);
	}

	public convertToCode(classModel: ClassModel): string {
		return classModel.classes
				.map(classDescriptor => this.generateClass(classDescriptor))
				.join('\n\n');
	}

	private generateClass(classDescriptor: ClassDescriptor): string {

		const className = capitalizeWord(classDescriptor.name);

		const usedTypes: JavaType[] = [];
		const fieldsLines: string[] = [];
		const methodsLines: string[] = [];

		for (const field of classDescriptor.fields) {

			const {
				usedTypes: fieldUsedTypes,
				fieldLines,
				getterLines,
				setterLines
			} = this.createField(field);

			usedTypes.push(...fieldUsedTypes);
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

		const importLines = this.createImportStatements(usedTypes, classDescriptor.fields);

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

	private createField(field: ClassFieldDescriptor) {

		const fieldName = field.name;
		const capitalizedFieldName = capitalizeWord(fieldName);

		const fieldLines: string[] = [];
		const usedTypes: JavaType[] = [];

		// TODO use length for validation annotations?

		if (this.config.useSpringNullabilityAnnotations) {
			if (field.nullable) {
				fieldLines.push('@Nullable');
				usedTypes.push(createJavaType('Nullable', 'org.springframework.lang'));
			} else {
				fieldLines.push('@NonNull');
				usedTypes.push(createJavaType('NonNull', 'org.springframework.lang'));
			}
		}

		const fieldType = this.typeResolver.resolveFieldType(field);
		usedTypes.push(fieldType);

		const formattedJavaType = fieldType.formatSimple();

		fieldLines.push(`private ${formattedJavaType} ${fieldName};`);

		const getterLines: string[] = [
			`public ${formattedJavaType} get${capitalizedFieldName}() {`,
			indentLine(`return ${fieldName};`),
			'}',
		];

		const setterLines: string[] = [
			`public void set${capitalizedFieldName}(${formattedJavaType} ${fieldName}) {`,
			indentLine(`this.${fieldName} = ${fieldName};`),
			'}',
		];

		return {
			usedTypes,
			fieldLines,
			getterLines,
			setterLines
		};

	}

	private createImportStatements(javaTypes: JavaType[], classFields: ClassFieldDescriptor[]): string[] {

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
