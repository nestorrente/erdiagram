import { EntityRelationshipModel } from '@/dsl/parser/er-model-parser';
import { ClassModel } from './class-model-types';
export interface ClassModelGenerator {
    generateClassModel(model: EntityRelationshipModel): ClassModel;
}
declare const classModelGenerator: ClassModelGenerator;
export default classModelGenerator;
//# sourceMappingURL=ClassModelGenerator.d.ts.map