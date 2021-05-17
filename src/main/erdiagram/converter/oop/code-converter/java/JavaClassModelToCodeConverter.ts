import {capitalizeWord} from '@/erdiagram/util/string-utils';
import {ClassDescriptor, ClassFieldDescriptor, ClassModel} from '@/erdiagram/converter/oop/model/class-model-types';
import {indentLine, indentLines} from '@/erdiagram/util/indent-utils';
import JavaType from '@/erdiagram/converter/oop/code-converter/java/type/JavaType';
import ClassModelToCodeConverter from '@/erdiagram/converter/oop/code-converter/ClassModelToCodeConverter';
import JavaClassModelToCodeConverterConfig, {PartialJavaClassModelToCodeConverterConfig} from '@/erdiagram/converter/oop/code-converter/java/config/JavaClassModelToCodeConverterConfig';
import javaClassModelToCodeConverterConfigManager
	from '@/erdiagram/converter/oop/code-converter/java/config/JavaClassModelToCodeConverterConfigManager';
import JavaFieldTypeResolver from '@/erdiagram/converter/oop/code-converter/java/type/JavaFieldTypeResolver';
import JavaImportStatementsGenerator
	from '@/erdiagram/converter/oop/code-converter/java/type/import/JavaImportStatementsGenerator';
import JavaValidationAnnotationsGenerator
	from '@/erdiagram/converter/oop/code-converter/java/annotation/validation/JavaValidationAnnotationsGenerator';
import JpaAnnotationsGenerator
	from '@/erdiagram/converter/oop/code-converter/java/annotation/jpa/JpaAnnotationsGenerator';
import JavaAnnotation from '@/erdiagram/converter/oop/code-converter/java/annotation/JavaAnnotation';

const EMPTY_STRING: string = '';

export default class JavaClassModelToCodeConverter implements ClassModelToCodeConverter {

	private readonly config: JavaClassModelToCodeConverterConfig;
	private readonly typeResolver: JavaFieldTypeResolver;
	private readonly jpaAnnotationsGenerator: JpaAnnotationsGenerator;
	private readonly validationAnnotationsGenerator: JavaValidationAnnotationsGenerator;
	private readonly importStatementsGenerator: JavaImportStatementsGenerator;

	constructor(config?: PartialJavaClassModelToCodeConverterConfig) {

		this.config = javaClassModelToCodeConverterConfigManager.mergeWithDefaultConfig(config);

		this.typeResolver = new JavaFieldTypeResolver(this.config.typeBindings, this.config.generatedClassesPackage);

		this.jpaAnnotationsGenerator = new JpaAnnotationsGenerator();

		this.validationAnnotationsGenerator = new JavaValidationAnnotationsGenerator(
				this.config.notNullTextValidationStrategy,
				this.config.notNullBlobValidationStrategy
		);

		this.importStatementsGenerator = new JavaImportStatementsGenerator(this.config.generatedClassesPackage);

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

		const importLines = this.importStatementsGenerator.generateImportStatements(usedTypes);

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

		this.addValidationAnnotationsToFieldIfApply(field, fieldLines, usedTypes);
		this.addJpaAnnotationsToFieldIfApply(field, fieldLines, usedTypes);

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

	// FIXME use this method
	private addJpaAnnotationsToClassIfApply(classDescriptor: ClassDescriptor, classLines: string[], usedTypes: JavaType[]) {
		// FIXME add JPA config
		// if (this.config.useJpaAnnotations) {
		const annotations = this.jpaAnnotationsGenerator.getJpaAnnotationsForClass(classDescriptor);
		this.addAnnotations(annotations, classLines, usedTypes);
		// }
	}

	private addJpaAnnotationsToFieldIfApply(field: ClassFieldDescriptor, fieldLines: string[], usedTypes: JavaType[]) {
		// FIXME add JPA config
		// if (this.config.useJpaAnnotations) {
		const annotations = this.jpaAnnotationsGenerator.getJpaAnnotationsForField(field);
		this.addAnnotations(annotations, fieldLines, usedTypes);
		// }
	}

	private addValidationAnnotationsToFieldIfApply(field: ClassFieldDescriptor, fieldLines: string[], usedTypes: JavaType[]) {
		if (this.config.useValidationAnnotations) {
			const annotations = this.validationAnnotationsGenerator.getValidationAnnotations(field);
			this.addAnnotations(annotations, fieldLines, usedTypes);
		}
	}

	private addAnnotations(annotations: JavaAnnotation[], lines: string[], usedTypes: JavaType[]) {
		annotations.forEach(annotation => {
			usedTypes.push(annotation.type);
			lines.push(annotation.format());
		});
	}

}
