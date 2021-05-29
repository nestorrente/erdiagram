import {EntityRelationshipModel} from '@/erdiagram/parser/types/entity-relationship-model-types';

export default interface EntityRelationshipModelSourceCodeGenerator {

	generateSourceCode(model: EntityRelationshipModel): string;

}
