import {EntityRelationshipModel} from '@/erdiagram/parser/types/entity-relationship-model-types';

export default interface EntityRelationshipModelToDiagramConverter {

	convertToDiagram(model: EntityRelationshipModel): Promise<string>;

}

const EMPTY_SVG_FILE = '<svg width="0" height="0"></svg>';

export abstract class BaseEntityRelationshipModelToDiagramConverter implements EntityRelationshipModelToDiagramConverter {

	public convertToDiagram(model: EntityRelationshipModel) {

		if (model.entities.length === 0 && model.relationships.length === 0) {
			return Promise.resolve(EMPTY_SVG_FILE);
		}

		return this.convertNonEmptyModelToDiagram(model);

	}

	protected abstract convertNonEmptyModelToDiagram(model: EntityRelationshipModel): Promise<string>;

}
