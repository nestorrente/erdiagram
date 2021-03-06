import {EntityRelationshipModel} from '@/erdiagram/parser/entity-relationship-model-types';

export default interface EntityRelationshipModelToDiagramConverter {

	convertToDiagram(model: EntityRelationshipModel): string | null;

}
