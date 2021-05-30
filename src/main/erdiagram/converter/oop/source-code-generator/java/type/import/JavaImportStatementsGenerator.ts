import JavaType from '@/erdiagram/converter/oop/source-code-generator/java/type/JavaType';
import {removeDuplicates} from '@/erdiagram/util/array-utils';
import isJavaParameterizedType
	from '@/erdiagram/converter/oop/source-code-generator/java/type/parameterized/isJavaParameterizedType';

const JAVA_LANG_PACKAGE = 'java.lang';

// TODO add unit tests
export default class JavaImportStatementsGenerator {

	readonly #currentPackage?: string;

	constructor(currentPackage?: string) {
		this.#currentPackage = currentPackage;
	}

	public generateImportStatements(javaTypes: JavaType[]): string[] {

		const importStatements = this.unrollTypesRecursively(javaTypes)
				.filter(javaType => this.isImportRequired(javaType))
				.map(javaType => `import ${javaType.canonicalName};`);

		return removeDuplicates(importStatements).sort();

	}

	private unrollTypesRecursively(javaTypes: ReadonlyArray<JavaType>, appendTo: JavaType[] = []): JavaType[] {

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
				&& javaType.packageName !== JAVA_LANG_PACKAGE
				&& javaType.packageName !== this.#currentPackage;
	}

}
