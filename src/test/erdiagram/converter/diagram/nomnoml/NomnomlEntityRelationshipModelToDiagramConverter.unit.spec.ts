import NomnomlEntityRelationshipModelToDiagramCodeConverter
	from '@/erdiagram/converter/diagram/nomnoml/NomnomlEntityRelationshipModelToDiagramCodeConverter';
import NomnomlEntityRelationshipModelToDiagramImageConverter
	from '@/erdiagram/converter/diagram/nomnoml/NomnomlEntityRelationshipModelToDiagramImageConverter';
import {EntityRelationshipModel} from '@/erdiagram/parser/types/entity-relationship-model-types';
import {renderSvg} from 'nomnoml';

const renderSvgMockResult = '<svg data-mock-svg></svg>';

jest.mock('nomnoml', () => {
	return {
		renderSvg: jest.fn(() => renderSvgMockResult)
	};
});

test('Empty model should return an empty SVG image without calling converter', async () => {

	// Given

	const model: EntityRelationshipModel = {
		entities: [],
		relationships: []
	};

	const erModelToDiagramCodeConverterMock = {
		convertToCode: jest.fn()
	};

	const erModelToDiagramImageConverter = new NomnomlEntityRelationshipModelToDiagramImageConverter(
			erModelToDiagramCodeConverterMock as unknown as NomnomlEntityRelationshipModelToDiagramCodeConverter
	);

	// When

	const result = await erModelToDiagramImageConverter.convertToDiagram(model);

	// Then

	const convertToCodeCalls = erModelToDiagramCodeConverterMock.convertToCode.mock.calls;
	expect(convertToCodeCalls.length).toBe(0);

	const renderSvgCalls = (renderSvg as jest.Mock).mock.calls;
	expect(renderSvgCalls.length).toBe(0);

	expect(result).toBe('<svg width="0" height="0"></svg>');

});

test('Non-empty model should call converter and Nomnoml, then return the Nomnoml diagram', async () => {

	// Given

	const model: EntityRelationshipModel = {
		entities: [
			{
				name: 'Entity',
				properties: []
			}
		],
		relationships: []
	};

	const diagramCode = '[Entity]';

	const erModelToDiagramCodeConverterMock = {
		convertToCode: jest.fn(() => diagramCode)
	};

	const erModelToDiagramImageConverter = new NomnomlEntityRelationshipModelToDiagramImageConverter(
			erModelToDiagramCodeConverterMock as unknown as NomnomlEntityRelationshipModelToDiagramCodeConverter
	);

	// When

	const result = await erModelToDiagramImageConverter.convertToDiagram(model);

	// Then

	expect(erModelToDiagramCodeConverterMock.convertToCode.mock.calls).toEqual([
		[model]
	]);

	expect((renderSvg as jest.Mock).mock.calls).toEqual([
		[diagramCode]
	]);

	expect(result).toBe(renderSvgMockResult);

});
