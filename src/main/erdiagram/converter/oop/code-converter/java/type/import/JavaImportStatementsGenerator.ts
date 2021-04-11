import {isJavaParameterizedType} from '@/erdiagram/converter/oop/code-converter/java/type/JavaParameterizedType';
import JavaType from '@/erdiagram/converter/oop/code-converter/java/type/JavaType';
import {removeDuplicates} from '@/erdiagram/util/array-utils';

export default class JavaImportStatementsGenerator {

	constructor(
			private readonly generatedClassesPackage?: string
	) {

	}

	public generateImportStatements(javaTypes: JavaType[]): string[] {

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
				&& this.generatedClassesPackage !== javaType.packageName;
	}

}
