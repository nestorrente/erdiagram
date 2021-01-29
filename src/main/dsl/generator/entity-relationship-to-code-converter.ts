import {EntityRelationshipModel} from '../parser/er-model-parser';

export default interface EntityRelationshipModelToCodeConverter {

	generateCode(model: EntityRelationshipModel): string;

}
