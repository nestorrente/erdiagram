import {EntityRelationshipModel} from '@/erdiagram/parser/entity-relationship-model-types';
import EntityRelationshipModelToNomnomlCodeConverter
	from '@/erdiagram/generator/diagram/nomnoml/EntityRelationshipModelToNomnomlCodeConverter';
import nomnoml from 'nomnoml';

interface NomnomlOptions {
	arrowSize?: number;
	bendSize?: number;
	direction?: 'down' | 'right';
	gutter?: number;
	edgeMargin?: number;
	gravity?: number;
	edges?: 'hard' | 'rounded';
	background?: string;
	fill?: string;
	fillArrows?: boolean;
	font?: string;
	fontSize?: number;
	leading?: number;
	lineWidth?: number;
	padding?: number;
	spacing?: number;
	stroke?: string;
	title?: string;
	zoom?: number;
	acyclicer?: 'greedy';
	ranker?: 'network-simplex' | 'tight-tree' | 'longest-path';
}

const DEFAULT_OPTIONS: NomnomlOptions = {
	background: 'white',
	fill: '#eef6ff',
	gravity: 1.5,
	lineWidth: 1,
	stroke: '#555',
	arrowSize: 1,
	ranker: 'longest-path'
};

export default class NomnomlDiagramGenerator {

	private erModelToNomnomlCodeConverter = new EntityRelationshipModelToNomnomlCodeConverter();

	public generateSvgDiagram(model: EntityRelationshipModel, options?: NomnomlOptions) {
		return nomnoml.renderSvg(this.generateCode(model, options));
	}

	public drawDiagram(model: EntityRelationshipModel, canvas: HTMLCanvasElement, options?: NomnomlOptions) {
		return nomnoml.draw(canvas, this.generateCode(model, options));
	}

	private generateCode(model: EntityRelationshipModel, options?: NomnomlOptions) {

		const directivesCode = this.convertOptionsIntoDirectives({
			...DEFAULT_OPTIONS,
			...options
		});

		const diagramCode = this.erModelToNomnomlCodeConverter.generateCode(model);

		return directivesCode + '\n\n' + diagramCode;

	}

	private convertOptionsIntoDirectives(options: NomnomlOptions): string {
		return Object.entries(options)
				.map(([key, value]) => `#${key}: ${value}`)
				.join('\n');
	}

}
