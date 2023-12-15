import { indentLines } from '@/erdiagram/util/indent-utils';
import JavaImportStatementsGenerator
	from '@/erdiagram/converter/oop/source-code-generator/java/type/import/JavaImportStatementsGenerator';
import { JavaClass } from '@/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types';
import JavaClassUsedTypesCompiler
	from '@/erdiagram/converter/oop/source-code-generator/java/type/import/JavaClassUsedTypesCompiler';
import prependVisibility from '@/erdiagram/converter/oop/source-code-generator/java/code/util/prependVisibility';
import getAnnotationsLines from '@/erdiagram/converter/oop/source-code-generator/java/code/util/getAnnotationsLines';
import JavaFieldCodeGenerator from '@/erdiagram/converter/oop/source-code-generator/java/code/JavaFieldCodeGenerator';

const EMPTY_LINE: string = '';

export default class JavaClassCodeGenerator {

	private readonly _usedTypesCompiler: JavaClassUsedTypesCompiler;
	private readonly _fieldCodeGenerator: JavaFieldCodeGenerator;

	constructor(
			usedTypesCompiler: JavaClassUsedTypesCompiler,
			fieldCodeGenerator: JavaFieldCodeGenerator
	) {
		this._usedTypesCompiler = usedTypesCompiler;
		this._fieldCodeGenerator = fieldCodeGenerator;
	}

	public generateCode(javaClass: JavaClass): string {

		const fieldsLines: string[] = [];
		const methodsLines: string[] = [];

		for (const javaField of javaClass.fields) {

			const {
				fieldLines,
				getterLines,
				setterLines
			} = this._fieldCodeGenerator.generateCode(javaClass.name, javaField);

			fieldsLines.push(...fieldLines);
			methodsLines.push(...getterLines, ...setterLines);

		}

		const classOuterLines = [];

		if (javaClass.packageName) {
			classOuterLines.push(
					`package ${javaClass.packageName};`,
					EMPTY_LINE
			);
		}

		const importLines = this.generateImportLines(javaClass);

		if (importLines.length > 0) {
			classOuterLines.push(
					...importLines,
					EMPTY_LINE
			);
		}

		classOuterLines.push(
				...getAnnotationsLines(javaClass.annotations),
				prependVisibility(`class ${javaClass.name} {`, javaClass.visibility),
				EMPTY_LINE
		);

		if (fieldsLines.length > 0) {
			classOuterLines.push(
					...indentLines(fieldsLines),
					EMPTY_LINE
			);
		}

		if (methodsLines.length > 0) {
			classOuterLines.push(...indentLines(methodsLines));
		}

		classOuterLines.push(`}`);

		return classOuterLines.join('\n');

	}

	private generateImportLines(javaClass: JavaClass) {

		const usedTypes = this._usedTypesCompiler.getUsedTypes(javaClass);

		const javaImportStatementsGenerator = new JavaImportStatementsGenerator(javaClass.packageName);
		return javaImportStatementsGenerator.generateImportStatements(usedTypes);

	}

}
