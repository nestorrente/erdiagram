import {EntityRelationshipModel} from '@/erdiagram/parser/entity-relationship-model-types';

export default interface EntityRelationshipModelToCodeConverter {

	convertToCode(model: EntityRelationshipModel): string;

}
