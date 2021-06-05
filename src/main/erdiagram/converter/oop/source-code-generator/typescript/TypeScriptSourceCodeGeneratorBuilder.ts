import ClassModelGenerator from '@/erdiagram/converter/oop/model/ClassModelGenerator';
import {PartialClassModelConfig} from '@/erdiagram/converter/oop/model/config/ClassModelConfig';
import TypeScriptClassModelToCodeConverter
	from '@/erdiagram/converter/oop/source-code-generator/typescript/TypeScriptClassModelToCodeConverter';
import {PartialTypeScriptConfig} from '@/erdiagram/converter/oop/source-code-generator/typescript/config/TypeScriptConfig';
import TypeScriptSourceCodeGenerator
	from '@/erdiagram/converter/oop/source-code-generator/typescript/TypeScriptSourceCodeGenerator';

export default class TypeScriptSourceCodeGeneratorBuilder {

	private _classModelConfig: PartialClassModelConfig = {};
	private _typeScriptConfig: PartialTypeScriptConfig = {};

	public configureClassModel(config: PartialClassModelConfig) {
		this._classModelConfig = config;
		return this;
	}

	public configureTypeScript(config: PartialTypeScriptConfig) {
		this._typeScriptConfig = config;
		return this;
	}

	public build() {
		return new TypeScriptSourceCodeGenerator(
				new ClassModelGenerator(this._classModelConfig),
				new TypeScriptClassModelToCodeConverter(this._typeScriptConfig)
		);
	}

}
