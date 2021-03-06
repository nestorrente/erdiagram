import {EntityRelationshipModel} from '@/erdiagram/parser/entity-relationship-model-types';
import NomnomlEntityRelationshipModelToDiagramCodeConverter
	from '@/erdiagram/generator/diagram/nomnoml/NomnomlEntityRelationshipModelToDiagramCodeConverter';
import nomnoml from 'nomnoml';
import EntityRelationshipModelToDiagramConverter from '@/erdiagram/generator/EntityRelationshipModelToDiagramConverter';

export default class NomnomlEntityRelationshipModelToDiagramConverter implements EntityRelationshipModelToDiagramConverter {

	constructor(
			private readonly erModelToDiagramCodeConverter: NomnomlEntityRelationshipModelToDiagramCodeConverter
	) {

	}

	public convertToDiagram(model: EntityRelationshipModel) {

		if (model.entities.length === 0 && model.relationships.length === 0) {
			return null;
		}

		let diagramCode = this.erModelToDiagramCodeConverter.convertToCode(model);
		return nomnoml.renderSvg(diagramCode);

	}

}
