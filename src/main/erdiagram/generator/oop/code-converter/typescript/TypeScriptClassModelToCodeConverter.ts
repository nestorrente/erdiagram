import {capitalizeWord} from '@/erdiagram/util/string-utils';
import {ClassDescriptor, ClassModel, NonEntityFieldDescriptor} from '@/erdiagram/generator/oop/model/class-model-types';
import {indentLines} from '@/erdiagram/util/indent-utils';
import TypeScriptParameterizedType, {createTypeScriptParameterizedType} from '@/erdiagram/generator/oop/code-converter/typescript/type/TypeScriptParameterizedType';
import TypeScriptType, {createTypeScriptType} from '@/erdiagram/generator/oop/code-converter/typescript/type/TypeScriptType';
import ClassModelToCodeConverter from '@/erdiagram/generator/oop/code-converter/ClassModelToCodeConverter';
import TypeScriptClassModelToCodeConverterConfig, {mergeWithDefaultTypeScriptClassModelToCodeConverterConfig} from '@/erdiagram/generator/oop/code-converter/typescript/TypeScriptClassModelToCodeConverterConfig';

export default class TypeScriptClassModelToCodeConverter implements ClassModelToCodeConverter {

	private readonly config: TypeScriptClassModelToCodeConverterConfig;

	constructor(config?: Partial<TypeScriptClassModelToCodeConverterConfig>) {
		this.config = mergeWithDefaultTypeScriptClassModelToCodeConverterConfig(config);
	}

	public generateCode(classModel: ClassModel): string {
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

	private createField(field: NonEntityFieldDescriptor) {

		const fieldName = field.name;

		const typeScriptType = this.mapFieldTypeToTypeScriptType(field);
		const formattedTypeScriptType = typeScriptType.format();
		const optionalIndicatorChar = field.nullable ? '?' : '';

		return `${fieldName}${optionalIndicatorChar}: ${formattedTypeScriptType};`;

	}

	private mapFieldTypeToTypeScriptType(field: NonEntityFieldDescriptor): TypeScriptType {
		if (field.list) {
			return this.mapListTypeToTypeScriptType(field);
		} else {
			return this.mapSingleTypeToTypeScriptType(field);
		}
	}

	private mapListTypeToTypeScriptType(field: NonEntityFieldDescriptor): TypeScriptParameterizedType {
		return createTypeScriptParameterizedType(
				'List',
				[
					this.mapSingleTypeToTypeScriptType(field)
				]
		);
	}

	private mapSingleTypeToTypeScriptType(field: NonEntityFieldDescriptor): TypeScriptType {

		const {
			entityType,
			primitiveType
		} = field;

		if (entityType) {

			if (primitiveType) {
				throw new Error('Invalid field descriptor: provided both primitive and entity types');
			}

			return createTypeScriptType(entityType);

		}

		if (!primitiveType) {
			throw new Error('Invalid field descriptor: missing type');
		}

		if (!this.config.typesMap.hasOwnProperty(primitiveType)) {
			throw new Error('Unsupported type: ' + primitiveType);
		}

		return this.config.typesMap[primitiveType]!;

	}

}
