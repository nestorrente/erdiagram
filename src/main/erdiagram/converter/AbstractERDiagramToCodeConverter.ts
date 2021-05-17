import ERDiagramToCodeConverter from '@/erdiagram/converter/ERDiagramToCodeConverter';
import {EntityRelationshipModel} from '@/erdiagram/parser/types/entity-relationship-model-types';
import EntityRelationshipModelParser from '@/erdiagram/parser/EntityRelationshipModelParser';
import EntityRelationshipModelParserConfig, {PartialEntityRelationshipModelParserConfig} from '@/erdiagram/parser/config/EntityRelationshipModelParserConfig';

export default abstract class AbstractERDiagramToCodeConverter implements ERDiagramToCodeConverter {

	private readonly parser: EntityRelationshipModelParser;

	constructor(config?: PartialAbstractERDiagramToCodeConverterConfig) {
		this.parser = new EntityRelationshipModelParser(config?.parser);
	}

	convert(erdiagramCode: string): string {
		const erModel = this.parser.parseModel(erdiagramCode);
		return this.convertModel(erModel);
	}

	protected abstract convertModel(erModel: EntityRelationshipModel): string;

}

export interface AbstractERDiagramToCodeConverterConfig {
	parser: EntityRelationshipModelParserConfig;
}

export interface PartialAbstractERDiagramToCodeConverterConfig {
	parser?: PartialEntityRelationshipModelParserConfig;
}
