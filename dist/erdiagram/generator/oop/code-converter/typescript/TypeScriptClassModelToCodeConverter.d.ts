import { ClassModel } from '../../model/class-model-types';
import ClassModelToCodeConverter from '../ClassModelToCodeConverter';
import TypeScriptClassModelToCodeConverterConfig from './config/TypeScriptClassModelToCodeConverterConfig';
export default class TypeScriptClassModelToCodeConverter implements ClassModelToCodeConverter {
    private readonly config;
    constructor(config?: Partial<TypeScriptClassModelToCodeConverterConfig>);
    generateCode(classModel: ClassModel): string;
    private generateClass;
    private createField;
    private mapFieldTypeToTypeScriptType;
    private mapListTypeToTypeScriptType;
    private mapSingleTypeToTypeScriptType;
}
//# sourceMappingURL=TypeScriptClassModelToCodeConverter.d.ts.map