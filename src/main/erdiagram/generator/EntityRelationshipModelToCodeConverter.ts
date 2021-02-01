import {EntityRelationshipModel} from '@/erdiagram/parser/EntityRelationshipModelParser';

export default interface EntityRelationshipModelToCodeConverter {

	generateCode(model: EntityRelationshipModel): string;

}
