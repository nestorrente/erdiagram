import ClassModelGenerator from '@/erdiagram/converter/oop/model/ClassModelGenerator';
import {PartialClassModelGeneratorConfig} from '@/erdiagram/converter/oop/model/config/ClassModelGeneratorConfig';
import TypeScriptClassModelToCodeConverter
	from '@/erdiagram/converter/oop/code-converter/typescript/TypeScriptClassModelToCodeConverter';
import {PartialTypeScriptClassModelToCodeConverterConfig} from '@/erdiagram/converter/oop/code-converter/typescript/config/TypeScriptClassModelToCodeConverterConfig';
import TypeScriptEntityRelationshipModelSourceCodeGenerator
	from '@/erdiagram/converter/oop/code-converter/typescript/TypeScriptEntityRelationshipModelSourceCodeGenerator';

export default class TypeScriptEntityRelationshipModelSourceCodeGeneratorBuilder {

	#classModelGeneratorConfig: PartialClassModelGeneratorConfig = {};
	#typeScriptClassModelToCodeConverterConfig: PartialTypeScriptClassModelToCodeConverterConfig = {};

	public withClassModelGeneratorConfig(config: PartialClassModelGeneratorConfig) {
		this.#classModelGeneratorConfig = config;
		return this;
	}

	public withTypeScriptClassModelToCodeConverterConfig(config: PartialTypeScriptClassModelToCodeConverterConfig) {
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
