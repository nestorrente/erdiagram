import {indentLine, indentLines} from '@/erdiagram/util/indent-utils';
import JavaImportStatementsGenerator
	from '@/erdiagram/converter/oop/source-code-generator/java/type/import/JavaImportStatementsGenerator';
import {
	JavaClass,
	JavaField,
	JavaFieldGetter,
	JavaFieldSetter,
	JavaVisibility
} from '@/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types';
import JavaAnnotation from '@/erdiagram/converter/oop/source-code-generator/java/annotation/JavaAnnotation';
import JavaClassUsedTypesCompiler
	from '@/erdiagram/converter/oop/source-code-generator/java/type/import/JavaClassUsedTypesCompiler';

const EMPTY_STRING: string = '';

export default class JavaClassCodeGenerator {

	private readonly _javaUsedTypesCompiler: JavaClassUsedTypesCompiler;

	constructor() {
		this._javaUsedTypesCompiler = new JavaClassUsedTypesCompiler();
	}

	public generateCode(javaClass: JavaClass): string {

		const fieldsLines: string[] = [];
		const methodsLines: string[] = [];

		for (const javaField of javaClass.fields) {

			const {
				fieldLines,
				getterLines,
				setterLines
			} = this.createField(javaField);

			fieldsLines.push(...fieldLines);
			methodsLines.push(...getterLines, ...setterLines);

		}

		const classOuterLines = [];

		if (javaClass.packageName) {
			classOuterLines.push(`package ${javaClass.packageName};`, EMPTY_STRING);
		}

		const importLines = this.generateImportLines(javaClass);

		if (importLines.length > 0) {
			classOuterLines.push(...importLines, EMPTY_STRING);
		}

		classOuterLines.push(
				...this.getAnnotationsLines(javaClass.annotations),
				this.prependVisibility(`class ${javaClass.name} {`, javaClass.visibility),
				EMPTY_STRING
		);

		if (fieldsLines.length > 0) {
			classOuterLines.push(...indentLines(fieldsLines), EMPTY_STRING);
		}

		if (methodsLines.length > 0) {
			classOuterLines.push(...indentLines(methodsLines));
		}

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

		const usedTypes = this._javaUsedTypesCompiler.getUsedTypes(javaClass);

		const javaImportStatementsGenerator = new JavaImportStatementsGenerator(javaClass.packageName);
		return javaImportStatementsGenerator.generateImportStatements(usedTypes);

	}

}
