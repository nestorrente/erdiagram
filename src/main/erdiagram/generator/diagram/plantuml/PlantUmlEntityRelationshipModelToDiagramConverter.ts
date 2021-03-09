import {EntityRelationshipModel} from '@/erdiagram/parser/entity-relationship-model-types';
import PlantUmlEntityRelationshipModelToDiagramCodeConverter
	from '@/erdiagram/generator/diagram/plantuml/PlantUmlEntityRelationshipModelToDiagramCodeConverter';
import {BaseEntityRelationshipModelToDiagramConverter} from '@/erdiagram/generator/EntityRelationshipModelToDiagramConverter';

export default class PlantUmlEntityRelationshipModelToDiagramConverter extends BaseEntityRelationshipModelToDiagramConverter {

	constructor(
			private readonly erModelToDiagramCodeConverter: PlantUmlEntityRelationshipModelToDiagramCodeConverter
	) {
		super();
	}

	protected convertNonEmptyModelToDiagram(model: EntityRelationshipModel): Promise<string> {
		const diagramCode = this.erModelToDiagramCodeConverter.convertToCode(model);
		const diagramUrl = this.getDiagramUrl(diagramCode);
		return this.fetchDiagram(diagramUrl);
	}

	private getDiagramUrl(diagramCode: string) {
		const diagramHexCode = this.convertToHexString(diagramCode);
		return `https://www.plantuml.com/plantuml/svg/~h${diagramHexCode}`;
	}

	private convertToHexString(text: string) {
		return [...text].map(character => this.convertToHexChar(character)).join('');
	}

	private convertToHexChar(character: string) {
		return character.charCodeAt(0)
				.toString(16)
				.padStart(2, '0');
	}

	private fetchDiagram(diagramUrl: string): Promise<string> {
		return fetch(diagramUrl, {
			// TODO allow to customize this option
			//cache: ''
		}).then(response => response.text());
	}

}
