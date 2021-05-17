import {NomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager} from '@/erdiagram/converter/diagram/nomnoml/config/NomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager';
import NomnomlEntityRelationshipModelToDiagramCodeConverterSerializableConfig
	from '@/erdiagram/converter/diagram/nomnoml/config/NomnomlEntityRelationshipModelToDiagramCodeConverterSerializableConfig';
import NomnomlEntityRelationshipModelToDiagramCodeConverterConfig
	from '@/erdiagram/converter/diagram/nomnoml/config/NomnomlEntityRelationshipModelToDiagramCodeConverterConfig';

const configManager = new NomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager();

describe('Serialization', () => {

	const config: NomnomlEntityRelationshipModelToDiagramCodeConverterConfig = {
		arrowSize: 1,
		bendSize: undefined,
		direction: undefined,
		gutter: undefined,
		edgeMargin: undefined,
		gravity: 1.5,
		edges: undefined,
		background: 'transparent',
		fill: '#fefece',
		fillArrows: undefined,
		font: undefined,
		fontSize: undefined,
		leading: undefined,
		lineWidth: 1,
		padding: undefined,
		spacing: undefined,
		stroke: '#333333',
		title: undefined,
		zoom: undefined,
		acyclicer: undefined,
		ranker: 'longest-path'
	};

	const serializableConfig: NomnomlEntityRelationshipModelToDiagramCodeConverterSerializableConfig = {
		arrowSize: 1,
		bendSize: undefined,
		direction: undefined,
		gutter: undefined,
		edgeMargin: undefined,
		gravity: 1.5,
		edges: undefined,
		background: 'transparent',
		fill: '#fefece',
		fillArrows: undefined,
		font: undefined,
		fontSize: undefined,
		leading: undefined,
		lineWidth: 1,
		padding: undefined,
		spacing: undefined,
		stroke: '#333333',
		title: undefined,
		zoom: undefined,
		acyclicer: undefined,
		ranker: 'longest-path'
	};

	test(`Convert to serializable object`, () => {

		const result = configManager.convertToSerializableObject(config);

		expect(result).toStrictEqual(serializableConfig);

	});

	test(`Convert from serializable object`, () => {

		const result = configManager.convertFromSerializableObject(serializableConfig);

		expect(result).toStrictEqual(config);

	});

});
