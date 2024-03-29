import {capitalizeWord} from '@/erdiagram/util/string-utils';
import {ClassDescriptor, ClassFieldDescriptor, ClassModel} from '@/erdiagram/converter/oop/model/class-model-types';
import {indentLines} from '@/erdiagram/util/indent-utils';
import TypeScriptConfig, {PartialTypeScriptConfig} from '@/erdiagram/converter/oop/source-code-generator/typescript/config/TypeScriptConfig';
import typescriptConfigManager
	from '@/erdiagram/converter/oop/source-code-generator/typescript/config/TypeScriptConfigManager';
import TypeScriptTypeResolver
	from '@/erdiagram/converter/oop/source-code-generator/typescript/type/TypeScriptTypeResolver';

export default class TypeScriptClassModelToCodeConverter {

	private readonly config: TypeScriptConfig;
	private readonly typeResolver: TypeScriptTypeResolver;

	constructor(config?: PartialTypeScriptConfig) {
		this.config = typescriptConfigManager.mergeWithDefaultConfig(config);
		this.typeResolver = new TypeScriptTypeResolver(this.config.typeBindings);
	}

	public convertToCode(classModel: ClassModel): string {
		return classModel.classes
				.map(classDescriptor => this.generateClass(classDescriptor))
				.join('\n\n');
	}

	private generateClass(classDescriptor: ClassDescriptor): string {

		const interfaceName = capitalizeWord(classDescriptor.name);

		const fieldsLines: string[] = classDescriptor.fields
				.map(field => this.createField(field));

		const classOuterLines = [
			`interface ${interfaceName} {`
		];

		classOuterLines.push(...indentLines(fieldsLines));

		classOuterLines.push(`}`);

		return classOuterLines.join('\n');

	}

	private createField(field: ClassFieldDescriptor) {

		const fieldName = field.name;

		const typescriptType = this.typeResolver.resolveFieldType(field);
		const formattedTypeScriptType = typescriptType.format();
		const optionalIndicatorChar = field.nullable ? '?' : '';

		return `${fieldName}${optionalIndicatorChar}: ${formattedTypeScriptType};`;

	}

}
