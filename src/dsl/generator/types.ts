import {EntityRelationshipModel} from '../parser/er-model-parser';

export interface ModelCodeGenerator {

	generateCode(model: EntityRelationshipModel): string;

}
