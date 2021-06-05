import {EntityRelationshipModel} from '@/erdiagram/parser/types/entity-relationship-model-types';

export default interface SourceCodeGenerator {

	generateSourceCode(model: EntityRelationshipModel): string;

}
