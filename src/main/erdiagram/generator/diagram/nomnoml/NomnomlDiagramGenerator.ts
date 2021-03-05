import {EntityRelationshipModel} from '@/erdiagram/parser/entity-relationship-model-types';
import EntityRelationshipModelToNomnomlCodeConverter
	from '@/erdiagram/generator/diagram/nomnoml/EntityRelationshipModelToNomnomlCodeConverter';
import nomnoml from 'nomnoml';

const NOMNOML_DIAGRAM_PROPERTIES = `
#background: white
#fill: #eef6ff
#gravity: 2
##font: monospace
#lineWidth: 1
##gutter: 10
#stroke: #555
#arrowSize: 1
##ranker: network-simplex
##ranker: tight-tree
#ranker: longest-path
`;

export default class NomnomlDiagramGenerator {

	private erModelToNomnomlCodeConverter = new EntityRelationshipModelToNomnomlCodeConverter();

	public generateSvgDiagram(model: EntityRelationshipModel) {
		return nomnoml.renderSvg(this.generateCode(model));
	}

	public drawDiagram(model: EntityRelationshipModel, canvas: HTMLCanvasElement) {
		return nomnoml.draw(canvas, this.generateCode(model));
	}

	private generateCode(model: EntityRelationshipModel) {
		const nomnomlCode = this.erModelToNomnomlCodeConverter.generateCode(model);
		return nomnomlCode + NOMNOML_DIAGRAM_PROPERTIES;
	}

}
