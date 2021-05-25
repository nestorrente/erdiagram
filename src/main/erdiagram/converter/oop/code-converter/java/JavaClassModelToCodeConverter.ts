import {indentLine, indentLines} from '@/erdiagram/util/indent-utils';
import JavaImportStatementsGenerator
	from '@/erdiagram/converter/oop/code-converter/java/type/import/JavaImportStatementsGenerator';
import {
	JavaClass,
	JavaClassModel,
	JavaField,
	JavaFieldGetter,
	JavaFieldSetter,
	JavaVisibility
} from '@/erdiagram/converter/oop/code-converter/java/model/java-class-model-types';
import JavaAnnotation from '@/erdiagram/converter/oop/code-converter/java/annotation/JavaAnnotation';
import JavaClassUsedTypesCompiler
	from '@/erdiagram/converter/oop/code-converter/java/type/import/JavaClassUsedTypesCompiler';

const EMPTY_STRING: string = '';

export default class JavaClassModelToCodeConverter {

	readonly #importStatementsGenerator: JavaImportStatementsGenerator;
	readonly #javaUsedTypesCompiler: JavaClassUsedTypesCompiler;

	constructor(generatedClassesPackage?: string) {
		this.#javaUsedTypesCompiler = new JavaClassUsedTypesCompiler();
		this.#importStatementsGenerator = new JavaImportStatementsGenerator(generatedClassesPackage);
	}

	public convertToCode(javaClassModel: JavaClassModel): string {
		return javaClassModel.classes
				.map(javaClass => this.generateClassCode(javaClass))
				.join('\n\n');
	}

	private generateClassCode(javaClass: JavaClass): string {

		const fieldsLines: string[] = [];
		const methodsLines: string[] = [];

		for (const javaField of javaClass.properties) {

			const {
				fieldLines,
				getterLines,
				setterLines
			} = this.createField(javaField);

			fieldsLines.push(...fieldLines);
			methodsLines.push(...getterLines, ...setterLines);

		}

		const classOuterLines = [
			`/* ========== ${javaClass.name} class ========== */`,
			EMPTY_STRING
		];

		if (javaClass.packageName) {
			classOuterLines.push(`package ${javaClass.packageName};`, EMPTY_STRING);
		}
		const importLines = this.generateImportLines(javaClass);

		if (importLines.length !== 0) {
			classOuterLines.push(...importLines, EMPTY_STRING);
		}

		classOuterLines.push(...this.getAnnotationsLines(javaClass.annotations));

		classOuterLines.push(this.prependVisibility(`class ${javaClass.name} {`, javaClass.visibility));

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

	// TODO move the field generator to a separate class

	private createField(javaField: JavaField) {

		const fieldLines: string[] = [];

		const fieldName = javaField.name;
		const formattedJavaType = javaField.type.formatSimple();

		fieldLines.push(...this.getAnnotationsLines(javaField.annotations));
		fieldLines.push(this.prependVisibility(`${formattedJavaType} ${fieldName};`, javaField.visibility));

		const getterLines: string[] = this.createGetterLines(fieldName, formattedJavaType, javaField.getter);
		const setterLines: string[] = this.createSetterLines(fieldName, formattedJavaType, javaField.setter);

		return {
			fieldLines,
			getterLines,
			setterLines
		};

	}

	private createGetterLines(fieldName: string, formattedJavaType: string, getter: JavaFieldGetter | undefined) {

		if (getter == null) {
			return [];
		}

		return [
			...this.getAnnotationsLines(getter.annotations),
			this.prependVisibility(`${formattedJavaType} ${getter.name}() {`, getter.visibility),
			indentLine(`return ${fieldName};`),
			'}',
			EMPTY_STRING
		];

	}

	private createSetterLines(fieldName: string, formattedJavaType: string, setter: JavaFieldSetter | undefined) {

		if (setter == null) {
			return [];
		}

		return [
			...this.getAnnotationsLines(setter.annotations),
			this.prependVisibility(`void ${setter.name}(${formattedJavaType} ${fieldName}) {`, setter.visibility),
			indentLine(`this.${fieldName} = ${fieldName};`),
			'}',
			EMPTY_STRING
		];

	}

	private getAnnotationsLines(annotations: JavaAnnotation[]) {
		return annotations.map(annotation => annotation.format());
	}

	private prependVisibility(text: string, visibility: JavaVisibility): string {
		if (visibility === JavaVisibility.PACKAGE_PRIVATE) {
			return text;
		}
		return visibility + ' ' + text;
	}

	private generateImportLines(javaClass: JavaClass) {
		const usedTypes = this.#javaUsedTypesCompiler.getUsedTypes(javaClass);
		return this.#importStatementsGenerator.generateImportStatements(usedTypes);
	}

}
