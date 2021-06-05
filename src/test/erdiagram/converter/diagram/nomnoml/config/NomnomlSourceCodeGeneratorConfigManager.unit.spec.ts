import {NomnomlSourceCodeGeneratorConfigManager} from '../../../../../../main/erdiagram/converter/diagram/nomnoml/config/NomnomlSourceCodeGeneratorConfigManager';
import NomnomlSourceCodeGeneratorConfig
	from '../../../../../../main/erdiagram/converter/diagram/nomnoml/config/NomnomlSourceCodeGeneratorConfig';
import {JsonValue} from 'true-json';

const configManager = new NomnomlSourceCodeGeneratorConfigManager();

describe('Serialization', () => {

	const config: NomnomlSourceCodeGeneratorConfig = {
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

	const serializableConfig: JsonValue = {
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
