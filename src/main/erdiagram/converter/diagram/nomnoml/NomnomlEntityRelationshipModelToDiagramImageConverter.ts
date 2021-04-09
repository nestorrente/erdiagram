import {EntityRelationshipModel} from '@/erdiagram/parser/types/entity-relationship-model-types';
import NomnomlEntityRelationshipModelToDiagramCodeConverter
	from '@/erdiagram/converter/diagram/nomnoml/NomnomlEntityRelationshipModelToDiagramCodeConverter';
import AbstractEntityRelationshipModelToSvgImageConverter
	from '@/erdiagram/converter/AbstractEntityRelationshipModelToSvgImageConverter';
import {renderSvg} from 'nomnoml';

export default class NomnomlEntityRelationshipModelToDiagramImageConverter extends AbstractEntityRelationshipModelToSvgImageConverter {

	constructor(
			private readonly erModelToDiagramCodeConverter: NomnomlEntityRelationshipModelToDiagramCodeConverter
	) {
		super();
	}

	protected convertNonEmptyModelToDiagram(model: EntityRelationshipModel): Promise<string> {
		const diagramCode = this.erModelToDiagramCodeConverter.convertToCode(model);
		return Promise.resolve(renderSvg(diagramCode));
	}

}
