import ClassModelToCodeConverterConfig from '@/erdiagram/converter/oop/code-converter/ClassModelToCodeConverterConfig';
import TypeScriptType from '@/erdiagram/converter/oop/code-converter/typescript/type/TypeScriptType';
import {WithPartial} from '@/erdiagram/util/types';

export default interface TypeScriptClassModelToCodeConverterConfig extends ClassModelToCodeConverterConfig<TypeScriptType> {

}

export type PartialTypeScriptClassModelToCodeConverterConfig = Partial<WithPartial<TypeScriptClassModelToCodeConverterConfig, 'typeBindings'>>;
