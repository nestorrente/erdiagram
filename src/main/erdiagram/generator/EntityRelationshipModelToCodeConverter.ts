import EntityRelationshipModel from '@/erdiagram/parser/EntityRelationshipModel';

export default interface EntityRelationshipModelToCodeConverter {

	generateCode(model: EntityRelationshipModel): string;

}
