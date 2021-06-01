import ClassModelGenerator from '@/erdiagram/converter/oop/model/ClassModelGenerator';
import {PartialClassModelGeneratorConfig} from '@/erdiagram/converter/oop/model/config/ClassModelGeneratorConfig';
import TypeScriptClassModelToCodeConverter
	from '@/erdiagram/converter/oop/source-code-generator/typescript/TypeScriptClassModelToCodeConverter';
import {PartialTypeScriptClassModelToCodeConverterConfig} from '@/erdiagram/converter/oop/source-code-generator/typescript/config/TypeScriptClassModelToCodeConverterConfig';
import TypeScriptEntityRelationshipModelSourceCodeGenerator
	from '@/erdiagram/converter/oop/source-code-generator/typescript/TypeScriptEntityRelationshipModelSourceCodeGenerator';

export default class TypeScriptEntityRelationshipModelSourceCodeGeneratorBuilder {

	private _classModelGeneratorConfig: PartialClassModelGeneratorConfig = {};
	private _typeScriptClassModelToCodeConverterConfig: PartialTypeScriptClassModelToCodeConverterConfig = {};

	public configureClassModel(config: PartialClassModelGeneratorConfig) {
		this._classModelGeneratorConfig = config;
		return this;
	}

	public configureTypeScriptCode(config: PartialTypeScriptClassModelToCodeConverterConfig) {
		this._typeScriptClassModelToCodeConverterConfig = config;
		return this;
	}

	public build() {
		return new TypeScriptEntityRelationshipModelSourceCodeGenerator(
				new ClassModelGenerator(this._classModelGeneratorConfig),
				new TypeScriptClassModelToCodeConverter(this._typeScriptClassModelToCodeConverterConfig)
		);
	}

}
