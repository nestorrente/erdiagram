import { ClassModel } from '../../model/class-model-types';
import ClassModelToCodeConverter from '../ClassModelToCodeConverter';
import JavaClassModelToCodeConverterConfig from './config/JavaClassModelToCodeConverterConfig';
export default class JavaClassModelToCodeConverter implements ClassModelToCodeConverter {
    private readonly config;
    constructor(config?: Partial<JavaClassModelToCodeConverterConfig>);
    generateCode(classModel: ClassModel): string;
    private generateClass;
    private createField;
    private mapFieldTypeToJavaType;
    private mapListTypeToJavaType;
    private mapSingleTypeToJavaType;
    private createImportStatements;
    private unrollTypesRecursively;
    private isImportRequired;
}
//# sourceMappingURL=JavaClassModelToCodeConverter.d.ts.map