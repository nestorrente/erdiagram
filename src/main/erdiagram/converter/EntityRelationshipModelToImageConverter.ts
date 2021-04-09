import {EntityRelationshipModel} from '@/erdiagram/parser/types/entity-relationship-model-types';

export default interface EntityRelationshipModelToImageConverter {

	convertToDiagram(model: EntityRelationshipModel): Promise<string>;

}
