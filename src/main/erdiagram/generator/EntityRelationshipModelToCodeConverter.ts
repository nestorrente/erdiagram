import {EntityRelationshipModel} from '@/erdiagram/parser/entity-relationship-model-types';

export default interface EntityRelationshipModelToCodeConverter {

	generateCode(model: EntityRelationshipModel): string;

}
