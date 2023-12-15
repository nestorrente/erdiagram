import {
	indentLine,
	indentLines
} from '@/erdiagram/util/indent-utils';
import {
	JavaField,
	JavaFieldGetter,
	JavaFieldSetter
} from '@/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types';
import prependVisibility from '@/erdiagram/converter/oop/source-code-generator/java/code/util/prependVisibility';
import getAnnotationsLines from '@/erdiagram/converter/oop/source-code-generator/java/code/util/getAnnotationsLines';

const EMPTY_LINE: string = '';

export default class JavaFieldCodeGenerator {

	public generateCode(className: string, javaField: JavaField) {

		const fieldLines: string[] = [];

		const fieldName = javaField.name;
		const formattedJavaType = javaField.type.formatSimple();

		fieldLines.push(...getAnnotationsLines(javaField.annotations));
		fieldLines.push(prependVisibility(`${formattedJavaType} ${fieldName};`, javaField.visibility));

		const getterLines = this.createGetterLines(fieldName, formattedJavaType, javaField.getter);
		const setterLines = this.createSetterLines(className, fieldName, formattedJavaType, javaField.setter);

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
			...getAnnotationsLines(getter.annotations),
			prependVisibility(`${formattedJavaType} ${getter.name}() {`, getter.visibility),
			indentLine(`return ${fieldName};`),
			'}',
			EMPTY_LINE
		];

	}

	private createSetterLines(
			className: string,
			fieldName: string,
			formattedJavaType: string,
			setter: JavaFieldSetter | undefined
	) {

		if (setter == null) {
			return [];
		}

		const returnType = setter.fluent ? className : 'void';

		const implementationLines = [
			`this.${fieldName} = ${fieldName};`
		];

		if (setter.fluent) {
			implementationLines.push('return this;');
		}

		return [
			...getAnnotationsLines(setter.annotations),
			prependVisibility(`${returnType} ${setter.name}(${formattedJavaType} ${fieldName}) {`, setter.visibility),
			...indentLines(implementationLines),
			'}',
			EMPTY_LINE
		];

	}

}
