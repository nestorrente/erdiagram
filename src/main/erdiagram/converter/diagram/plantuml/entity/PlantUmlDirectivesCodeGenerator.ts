import DiagramLevel from '@/erdiagram/converter/diagram/common/config/DiagramLevel';

export default class PlantUmlDirectivesCodeGenerator {

	private readonly diagramLevel: DiagramLevel;

	constructor(diagramLevel: DiagramLevel) {
		this.diagramLevel = diagramLevel;
	}

	public generate(): string {

		if (this.diagramLevel !== DiagramLevel.CONCEPTUAL) {
			return '';
		}

		return `hide members
hide methods`;

	}

}
