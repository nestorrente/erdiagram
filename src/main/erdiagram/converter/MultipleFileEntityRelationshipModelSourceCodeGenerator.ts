import {EntityRelationshipModel} from '@/erdiagram/parser/types/entity-relationship-model-types';
import SourceFileInfo from '@/erdiagram/converter/common/SourceFileInfo';
import EntityRelationshipModelSourceCodeGenerator
	from '@/erdiagram/converter/EntityRelationshipModelSourceCodeGenerator';

export default interface MultipleFileEntityRelationshipModelSourceCodeGenerator
		extends EntityRelationshipModelSourceCodeGenerator {

	generateSourceFiles(model: EntityRelationshipModel): SourceFileInfo[];

}

export function isMultipleFileEntityRelationshipModelSourceCodeGenerator(
		generator: EntityRelationshipModelSourceCodeGenerator
): generator is MultipleFileEntityRelationshipModelSourceCodeGenerator {
	const uncheckedCastedGenerator = generator as MultipleFileEntityRelationshipModelSourceCodeGenerator;
	return typeof uncheckedCastedGenerator.generateSourceFiles === 'function';
}
