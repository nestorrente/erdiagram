import ClassModelGenerator from '@/erdiagram/converter/oop/model/ClassModelGenerator';
import {PartialClassModelGeneratorConfig} from '@/erdiagram/converter/oop/model/config/ClassModelGeneratorConfig';
import TypeScriptClassModelToCodeConverter
	from '@/erdiagram/converter/oop/source-code-generator/typescript/TypeScriptClassModelToCodeConverter';
import {PartialTypeScriptClassModelToCodeConverterConfig} from '@/erdiagram/converter/oop/source-code-generator/typescript/config/TypeScriptClassModelToCodeConverterConfig';
import TypeScriptEntityRelationshipModelSourceCodeGenerator
	from '@/erdiagram/converter/oop/source-code-generator/typescript/TypeScriptEntityRelationshipModelSourceCodeGenerator';

export default class TypeScriptEntityRelationshipModelSourceCodeGeneratorBuilder {

	#classModelGeneratorConfig: PartialClassModelGeneratorConfig = {};
	#typeScriptClassModelToCodeConverterConfig: PartialTypeScriptClassModelToCodeConverterConfig = {};

	public configureClassModel(config: PartialClassModelGeneratorConfig) {
		this.#classModelGeneratorConfig = config;
		return this;
	}

	public configureTypeScriptCode(config: PartialTypeScriptClassModelToCodeConverterConfig) {
		this.#typeScriptClassModelToCodeConverterConfig = config;
		return this;
	}

	public build() {
		return new TypeScriptEntityRelationshipModelSourceCodeGenerator(
				new ClassModelGenerator(this.#classModelGeneratorConfig),
				new TypeScriptClassModelToCodeConverter(this.#typeScriptClassModelToCodeConverterConfig)
		);
	}

}
