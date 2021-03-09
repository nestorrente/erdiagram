import {EntityRelationshipModel} from '@/erdiagram/parser/entity-relationship-model-types';
import NomnomlEntityRelationshipModelToDiagramCodeConverter
	from '@/erdiagram/generator/diagram/nomnoml/NomnomlEntityRelationshipModelToDiagramCodeConverter';
import {BaseEntityRelationshipModelToDiagramConverter} from '@/erdiagram/generator/EntityRelationshipModelToDiagramConverter';
import nomnoml from 'nomnoml';

export default class NomnomlEntityRelationshipModelToDiagramConverter extends BaseEntityRelationshipModelToDiagramConverter {

	constructor(
			private readonly erModelToDiagramCodeConverter: NomnomlEntityRelationshipModelToDiagramCodeConverter
	) {
		super();
	}

	protected convertNonEmptyModelToDiagram(model: EntityRelationshipModel): Promise<string> {
		const diagramCode = this.erModelToDiagramCodeConverter.convertToCode(model);
		return Promise.resolve(nomnoml.renderSvg(diagramCode));
	}

}
