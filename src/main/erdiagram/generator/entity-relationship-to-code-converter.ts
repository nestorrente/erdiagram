import {EntityRelationshipModel} from '@/erdiagram/parser/er-model-parser';

export default interface EntityRelationshipModelToCodeConverter {

	generateCode(model: EntityRelationshipModel): string;

}
