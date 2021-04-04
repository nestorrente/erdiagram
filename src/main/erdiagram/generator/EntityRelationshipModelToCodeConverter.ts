import {EntityRelationshipModel} from '@/erdiagram/parser/types/entity-relationship-model-types';

export default interface EntityRelationshipModelToCodeConverter {

	convertToCode(model: EntityRelationshipModel): string;

}
