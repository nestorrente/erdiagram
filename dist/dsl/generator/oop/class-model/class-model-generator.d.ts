import { EntityRelationshipModel } from '../../../parser/er-model-parser';
import { ClassModel } from './class-model-types';
export interface ClassModelGenerator {
    generateClassModel(model: EntityRelationshipModel): ClassModel;
}
declare const classModelGenerator: ClassModelGenerator;
export default classModelGenerator;
//# sourceMappingURL=class-model-generator.d.ts.map